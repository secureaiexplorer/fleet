package server

import (
	"bytes"
	"context"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/fleetdm/fleet/v4/pkg/fleethttp"
	"github.com/fleetdm/fleet/v4/server/bindata"
)

// GenerateRandomText return a string generated by filling in keySize bytes with
// random data and then base64 encoding those bytes
func GenerateRandomText(keySize int) (string, error) {
	key := make([]byte, keySize)
	_, err := rand.Read(key)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(key), nil
}

func httpSuccessStatus(statusCode int) bool {
	return statusCode >= 200 && statusCode <= 299
}

func PostJSONWithTimeout(ctx context.Context, url string, v interface{}) error {
	jsonBytes, err := json.Marshal(v)
	if err != nil {
		return err
	}

	client := fleethttp.NewClient(fleethttp.WithTimeout(30 * time.Second))
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewBuffer(jsonBytes))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to POST to %s: %s, request-size=%d", MaskSecretURLParams(url), MaskURLError(err), len(jsonBytes))
	}
	defer resp.Body.Close()

	if !httpSuccessStatus(resp.StatusCode) {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("error posting to %s: %d. %s", MaskSecretURLParams(url), resp.StatusCode, string(body))
	}

	return nil
}

// MaskSecretURLParams masks URL query values if the query param name includes "secret", "token",
// "key", "password". It accepts a raw string and returns a redacted string if the raw string is
// URL-parseable. If it is not URL-parseable, the raw string is returned unchanged.
func MaskSecretURLParams(rawURL string) string {
	u, err := url.Parse(rawURL)
	if err != nil {
		return rawURL
	}

	keywords := []string{"secret", "token", "key", "password"}
	containsKeyword := func(s string) bool {
		s = strings.ToLower(s)
		for _, kw := range keywords {
			if strings.Contains(s, kw) {
				return true
			}
		}
		return false
	}

	q := u.Query()
	for k := range q {
		if containsKeyword(k) {
			q[k] = []string{"MASKED"}
		}
	}
	u.RawQuery = q.Encode()

	return u.Redacted()
}

// MaskURLError checks if the provided error is a *url.Error. If so, it applies MaskSecretURLParams
// to the URL value and returns the modified error. If not, the error is returned unchanged.
func MaskURLError(e error) error {
	ue, ok := e.(*url.Error)
	if !ok {
		return e
	}
	ue.URL = MaskSecretURLParams(ue.URL)
	return ue
}

// TODO: Consider moving other crypto functions from server/mdm/apple/util to here

// DecodePrivateKeyPEM decodes PEM-encoded private key data.
func DecodePrivateKeyPEM(encoded []byte) (*rsa.PrivateKey, error) {
	block, _ := pem.Decode(encoded)
	if block == nil {
		return nil, errors.New("no PEM-encoded data found")
	}
	if block.Type != "RSA PRIVATE KEY" {
		return nil, fmt.Errorf("unexpected block type %s", block.Type)
	}

	return x509.ParsePKCS1PrivateKey(block.Bytes)
}

// GetTemplate takes a path to a template file and a template name and will
// include the template file in the build binary. It then returns a pointer to
// the template.
func GetTemplate(templatePath string, templateName string) (*template.Template, error) {
	templateData, err := bindata.Asset(templatePath)
	if err != nil {
		return nil, err
	}

	t, err := template.New(templateName).Parse(string(templateData))
	if err != nil {
		return nil, err
	}

	return t, nil
}

// Base64DecodePaddingAgnostic decodes a base64 string that might be encoded
// using raw encoding or standard encoding (padded)
func Base64DecodePaddingAgnostic(s string) ([]byte, error) {
	us := strings.TrimRight(s, string(base64.StdPadding))
	return base64.RawStdEncoding.DecodeString(us)
}

// RemoveDuplicatesFromSlice returns a slice with all the duplicates removed from the input slice.
func RemoveDuplicatesFromSlice[T comparable](slice []T) []T {
	// We are using the allKeys map as a set here
	allKeys := make(map[T]struct{}, len(slice))
	list := make([]T, 0, len(slice))

	for _, i := range slice {
		if _, exists := allKeys[i]; !exists {
			allKeys[i] = struct{}{}
			list = append(list, i)
		}
	}
	return list
}
