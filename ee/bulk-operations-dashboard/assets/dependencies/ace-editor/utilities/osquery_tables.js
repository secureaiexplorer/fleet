// Assuming lodash is available in your Sails.js application

// Load the JSON directly, assuming it's within the accessible path
var osqueryFleetTablesJSON = [
  {
    "name": "account_policy_data",
    "description": "Additional macOS user account data from the AccountPolicy section of [OpenDirectory](https://en.wikipedia.org/wiki/Apple_Open_Directory), the identity provider used by Apple.",
    "url": "https://fleetdm.com/tables/account_policy_data",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- The values in this OpenDirectory table are related to account creation.  In the past, it was fairly common to use OpenDirectory to have a home folder (`~`) on a server, and then log in and get that folder wherever they are.  (These days, this use case is more uncommon.)\n- To determine who is logged in to the Mac, or for example, to check the record name versus the computer's \"short name\", consider using the data in [the DSCL table](https://fleetdm.com/tables/dscl).",
    "examples": "Query the creation date of user accounts. You could also query the date of the last failed login attempt or password change.\n```\nSELECT strftime('%Y-%m-%d %H:%M:%S',creation_time,'unixepoch') AS creationdate FROM account_policy_data;\n```\n\nSee each user's last password set date and number of failed logins since last successful login to detect any intrusion attempts.\n```\nSELECT u.username u.uid, strftime('%Y-%m-%dT%H:%M:%S', a.password_last_set_time, 'unixepoch') AS password_last_set_time, a.failed_login_count, strftime('%Y-%m-%dT%H:%M:%S', a.failed_login_timestamp, 'unixepoch') AS failed_login_timestamp FROM account_policy_data AS a CROSS JOIN users AS u USING (uid) ORDER BY password_last_set_time ASC;\n```",
    "columns": [
      {
        "name": "uid",
        "description": "[User ID](https://superuser.com/a/1108201)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "creation_time",
        "description": "When the account was first created",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "failed_login_count",
        "description": "The number of failed login attempts using an incorrect password. Count resets after a correct password is entered.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "failed_login_timestamp",
        "description": "The time of the last failed login attempt. Resets after a correct password is entered",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "password_last_set_time",
        "description": "The time the password was last changed",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/account_policy_data.yml"
  },
  {
    "name": "acpi_tables",
    "description": "Firmware ACPI functional table common metadata and content.",
    "url": "https://fleetdm.com/tables/acpi_tables",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "ACPI table name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of compiled table data",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "md5",
        "description": "MD5 hash of table content",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "hidden": true,
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/acpi_tables.yml"
  },
  {
    "name": "ad_config",
    "description": "macOS Active Directory configuration.",
    "url": "https://fleetdm.com/tables/ad_config",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "\n- Active Directory is a directory service used to manage users and computers. A domain is the high level grouping of these objects, which a workstation must join in order to provide the user with features such as Single Sign-On to internal applications using Kerberos. \n- If a host is not bound to an Active Directory domain, then the table returns no results.",
    "examples": "See the [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) domain, if any, that the Mac is bound to.\n```\nSELECT domain FROM ad_config;\n```",
    "columns": [
      {
        "name": "name",
        "description": "The macOS-specific configuration name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "domain",
        "description": "Active Directory trust domain",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "option",
        "description": "Canonical name of option",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Variable typed option value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/ad_config.yml"
  },
  {
    "name": "alf",
    "description": "Details about the status of the built-in firewall protection on this Mac.",
    "url": "https://fleetdm.com/tables/alf",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- This table provides information about the built-in firewall in macOS, also known as [Application Layer Firewall (ALF)](https://support.apple.com/guide/mac-help/block-connections-to-your-mac-with-a-firewall-mh34041/mac)",
    "examples": "See the state of the Application Layer Firewall on a Mac. A result of 0 means it is disabled, 1 means it is enabled, and 2 means it is enabled and blocking all inbound connections. See our standard query library for an example policy query using this.\n```\nSELECT global_state FROM alf;\n```",
    "columns": [
      {
        "name": "allow_signed_enabled",
        "description": "1 If allow signed mode is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "firewall_unload",
        "description": "1 If firewall unloading enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "global_state",
        "description": "1 If the firewall is enabled with exceptions, 2 if the firewall is configured to block all incoming connections, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logging_enabled",
        "description": "1 If logging mode is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logging_option",
        "description": "Firewall logging option",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "stealth_enabled",
        "description": "1 If stealth mode is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Application Layer Firewall version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/alf.yml"
  },
  {
    "name": "alf_exceptions",
    "description": "The exceptions configured for the [built-in firewall protection](https://fleetdm.com/tables/alf) on this Mac.",
    "url": "https://fleetdm.com/tables/alf_exceptions",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List applications that are able to receive inbound connections across the firewall. This is useful when looking to see if vulnerable software is exposed to networks. \n```\nSELECT * FROM alf_exceptions;\n```",
    "columns": [
      {
        "name": "path",
        "description": "Path to the executable that is excepted",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "Firewall [exception state](https://krypted.com/mac-security/command-line-alf-on-mac-os-x/)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/alf_exceptions.yml"
  },
  {
    "name": "alf_explicit_auths",
    "description": "ALF services explicitly allowed to perform networking.",
    "url": "https://fleetdm.com/tables/alf_explicit_auths",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "This table is currently affected by a [bug](https://github.com/osquery/osquery/issues/2322) and not returning applications visible in the preferences interface.",
    "examples": "List applications were granted explicit access through the firewall. This is useful when looking to see if vulnerable software is exposed to networks. \n```\nSELECT * FROM alf_exceptions;\n```",
    "columns": [
      {
        "name": "process",
        "description": "Process name explicitly allowed",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/alf_explicit_auths.yml"
  },
  {
    "name": "apfs_physical_stores",
    "platforms": [
      "darwin"
    ],
    "description": "Information about APFS physical stores from the `diskutil apfs list -plist` command.",
    "columns": [
      {
        "name": "container_uuid",
        "type": "text",
        "required": false,
        "description": "The UUID of the APFS Contianer"
      },
      {
        "name": "container_designated_physical_store",
        "type": "text",
        "required": false,
        "description": "The disk displayed as the backing store of the container. There may be multiple, use `apfs_physical_stores` to see all actual physical stores"
      },
      {
        "name": "container_reference",
        "type": "text",
        "required": false,
        "description": "The current reference for the APFS container, e.g. \"disk3\""
      },
      {
        "name": "container_fusion",
        "type": "text",
        "required": false,
        "description": "Whether this container is on a \"fusion drive\" (i.e. SSHD)"
      },
      {
        "name": "container_capacity_ceiling",
        "type": "bigint",
        "required": false,
        "description": "The total amount of space in the container"
      },
      {
        "name": "container_capacity_free",
        "type": "bigint",
        "required": false,
        "description": "The amount of remaining free space in the container"
      },
      {
        "name": "uuid",
        "type": "text",
        "required": false,
        "description": "The UUID of the physical store"
      },
      {
        "name": "identifier",
        "type": "text",
        "required": false,
        "description": "The current identifier of the physical store (e.g. disk1s2)"
      },
      {
        "name": "size",
        "type": "bigint",
        "required": false,
        "description": "The size of the physical store in byptes"
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/apfs_physical_stores",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/apfs_physical_stores.yml"
  },
  {
    "name": "apfs_volumes",
    "platforms": [
      "darwin"
    ],
    "description": "Information about APFS volumes from the `diskutil apfs list -plist` command.",
    "columns": [
      {
        "name": "container_uuid",
        "type": "text",
        "required": false,
        "description": "The UUID of the APFS Contianer"
      },
      {
        "name": "container_designated_physical_store",
        "type": "text",
        "required": false,
        "description": "The disk displayed as the backing store of the container. There may be multiple, use `apfs_physical_stores` to see all actual physical stores"
      },
      {
        "name": "container_reference",
        "type": "text",
        "required": false,
        "description": "The current reference for the APFS container, e.g. \"disk3\""
      },
      {
        "name": "container_fusion",
        "type": "text",
        "required": false,
        "description": "Whether this container is on a \"fusion drive\" (i.e. SSHD)"
      },
      {
        "name": "container_capacity_ceiling",
        "type": "bigint",
        "required": false,
        "description": "The total amount of space in the container"
      },
      {
        "name": "container_capacity_free",
        "type": "bigint",
        "required": false,
        "description": "The amount of remaining free space in the container"
      },
      {
        "name": "uuid",
        "type": "text",
        "required": false,
        "description": "The UUID of the volume"
      },
      {
        "name": "device_identifier",
        "type": "text",
        "required": false,
        "description": "The current identifier of the volume (e.g. disk3s2)"
      },
      {
        "name": "name",
        "type": "text",
        "required": false,
        "description": "The user-selected name of the volume (e.g. \"Macintosh HD\")"
      },
      {
        "name": "role",
        "type": "text",
        "required": false,
        "description": "The first role of the volume. User-created volumes will have no role (this will be empty). System volumes might have roles like \"Data\", \"Hardware\", etc."
      },
      {
        "name": "capacity_in_use",
        "type": "bigint",
        "required": false,
        "description": "Storage space used by the volume"
      },
      {
        "name": "capacity_quota",
        "type": "bigint",
        "required": false,
        "description": "Storage quota for the volume, or 0 if disabled"
      },
      {
        "name": "capacity_reserve",
        "type": "bigint",
        "required": false,
        "description": "Storage reserved for this volume even if contianer is otherwise full, or 0 if disabled"
      },
      {
        "name": "crypto_migration_on",
        "type": "integer",
        "required": false,
        "description": "Whether the volume is in the process of being encrypted"
      },
      {
        "name": "encryption",
        "type": "integer",
        "required": false,
        "description": "Whether the volume is encrypted, including without requiring a password"
      },
      {
        "name": "filevault",
        "type": "integer",
        "required": false,
        "description": "Whether the volume requires a password to decrypt"
      },
      {
        "name": "locked",
        "type": "integer",
        "required": false,
        "description": "Whether the volume is unreadable because it does not have a key entered"
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/apfs_volumes",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/apfs_volumes.yml"
  },
  {
    "name": "app_icons",
    "description": "Icons and their locations for macOS applications.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "darwin"
    ],
    "columns": [
      {
        "name": "path",
        "description": "The icon's path.",
        "type": "text",
        "required": false
      },
      {
        "name": "icon",
        "description": "The icon.",
        "type": "text",
        "required": false
      },
      {
        "name": "hash",
        "description": "The icon's hash.",
        "type": "text",
        "required": false
      }
    ],
    "url": "https://fleetdm.com/tables/app_icons",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/app_icons.yml"
  },
  {
    "name": "app_schemes",
    "description": "macOS application schemes and handlers (e.g., http, file, mailto).",
    "url": "https://fleetdm.com/tables/app_schemes",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List applications that have registered the URL scheme \"mailto\" to handle email links.\n```\nSELECT * FROM app_schemes WHERE scheme='mailto';\n```",
    "columns": [
      {
        "name": "scheme",
        "description": "Name of the scheme/protocol",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "handler",
        "description": "Application label for the handler",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled",
        "description": "1 if this handler is the OS default, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "external",
        "description": "1 if this handler does NOT exist on macOS by default, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protected",
        "description": "1 if this handler is protected (reserved) by macOS, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/app_schemes.yml"
  },
  {
    "name": "apparmor_events",
    "description": "Track AppArmor events.",
    "url": "https://fleetdm.com/tables/apparmor_events",
    "platforms": [
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "type",
        "description": "Event type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "message",
        "description": "Raw audit message",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uptime",
        "description": "Time of execution in system uptime",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "apparmor",
        "description": "Apparmor Status like ALLOWED, DENIED etc.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "operation",
        "description": "Permission requested by the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Parent process PID",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "profile",
        "description": "Apparmor profile name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Process name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "comm",
        "description": "Command-line name of the command that was used to invoke the analyzed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "denied_mask",
        "description": "Denied permissions for the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "capname",
        "description": "Capability requested by the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fsuid",
        "description": "Filesystem user ID",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ouid",
        "description": "Object owner's user ID",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "capability",
        "description": "Capability number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "requested_mask",
        "description": "Requested access mask",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "info",
        "description": "Additional information",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "error",
        "description": "Error information",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "namespace",
        "description": "AppArmor namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "label",
        "description": "AppArmor label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/apparmor_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fapparmor_events.yml&value=name%3A%20apparmor_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "apparmor_profiles",
    "description": "Track active AppArmor profiles.",
    "url": "https://fleetdm.com/tables/apparmor_profiles",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nSELECT * FROM apparmor_profiles WHERE mode = 'complain'\n```",
    "columns": [
      {
        "name": "path",
        "description": "Unique, aa-status compatible, policy identifier.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Policy name.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "attach",
        "description": "Which executable(s) a profile will attach to.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "How the policy is applied.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha1",
        "description": "A unique hash that identifies this policy.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/apparmor_profiles.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fapparmor_profiles.yml&value=name%3A%20apparmor_profiles%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "appcompat_shims",
    "description": "Application Compatibility shims are a way to persist malware. This table presents the AppCompat Shim information from the registry in a nice format. See http://files.brucon.org/2015/Tomczak_and_Ballenthin_Shims_for_the_Win.pdf for more details.",
    "url": "https://fleetdm.com/tables/appcompat_shims",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from appcompat_shims;\n```",
    "columns": [
      {
        "name": "executable",
        "description": "Name of the executable that is being shimmed. This is pulled from the registry.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "This is the path to the SDB database.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Description of the SDB.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "install_time",
        "description": "Install time of the SDB",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of the SDB database.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sdb_id",
        "description": "Unique GUID of the SDB.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/appcompat_shims.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fappcompat_shims.yml&value=name%3A%20appcompat_shims%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "apps",
    "description": "macOS applications installed in known search paths (e.g., /Applications).",
    "url": "https://fleetdm.com/tables/apps",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "See the last time applications were used. Useful to know if a vulnerable application is being used as well as for licensing purposes.\n```\nSELECT *, strftime('%Y-%m-%d %H:%M:%S',last_opened_time,'unixepoch') as LastUseDate FROM apps WHERE last_opened_time!='-1.0';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of the Name.app folder",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Absolute and full Name.app path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "bundle_executable",
        "description": "Info properties CFBundleExecutable label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bundle_identifier",
        "description": "Info properties CFBundleIdentifier label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bundle_name",
        "description": "Info properties CFBundleName label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bundle_short_version",
        "description": "Info properties CFBundleShortVersionString label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bundle_version",
        "description": "Info properties CFBundleVersion label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bundle_package_type",
        "description": "Info properties CFBundlePackageType label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "environment",
        "description": "Application-set environment variables",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "element",
        "description": "Does the app identify as a background agent",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "compiler",
        "description": "Info properties DTCompiler label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "development_region",
        "description": "Info properties CFBundleDevelopmentRegion label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "display_name",
        "description": "Info properties CFBundleDisplayName label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "info_string",
        "description": "Info properties CFBundleGetInfoString label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minimum_system_version",
        "description": "Minimum version of macOS required for the app to run",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "category",
        "description": "The UTI that categorizes the app for the App Store",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "applescript_enabled",
        "description": "Info properties NSAppleScriptEnabled label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "copyright",
        "description": "Info properties NSHumanReadableCopyright label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_opened_time",
        "description": "The time that the app was last used",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/apps.yml"
  },
  {
    "name": "apt_sources",
    "description": "Current list of APT repositories or software channels.",
    "url": "https://fleetdm.com/tables/apt_sources",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "On Ubuntu or other Debian based systems, identify APT repositories that are not maintained by Ubuntu.\n```\nSELECT * FROM apt_sources WHERE maintainer!='Ubuntu';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Repository name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Source file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "base_uri",
        "description": "Repository base URI",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "release",
        "description": "Release name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Repository source version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "maintainer",
        "description": "Repository maintainer",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "components",
        "description": "Repository components",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "architectures",
        "description": "Repository architectures",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/apt_sources.yml"
  },
  {
    "name": "arp_cache",
    "description": "Address resolution cache, both static and dynamic (from ARP, NDP).",
    "url": "https://fleetdm.com/tables/arp_cache",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "* The first six digits of a MAC address is the [Organizationally Unique Identifier (OUI)](https://en.wikipedia.org/wiki/Organizationally_unique_identifier).\n* You can lookup the manufacturer and model via the MAC address using a tool like [wireshark OUI lookup](https://www.wireshark.org/tools/oui-lookup.html).",
    "examples": "List the content of the ARP cache.\n```\nSELECT address, interface, mac FROM arp_cache;\n```\nOn systems located in an office or datacenter, you can use this to watch for network attacks by checking for gateway IPs that do not have the expected MAC address. This could indicate an [ARP spoofing](https://en.wikipedia.org/wiki/ARP_spoofing) attack, in which an attacker that controls a system on the LAN attempts to funnel all remote traffic through it so they can inspect it.\n```\nSELECT * FROM arp_cache WHERE address IN (INSERT_GATEWAY_IPS) AND mac NOT IN (INSERT_EXPECTED_MAC_ADDRESSES);\n```",
    "columns": [
      {
        "name": "address",
        "description": "IPv4 address target",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mac",
        "description": "MAC address of broadcasted address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "interface",
        "description": "Interface of the network for the MAC",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "permanent",
        "description": "1 for true, 0 for false",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/arp_cache.yml"
  },
  {
    "name": "asl",
    "description": "Queries the Apple System Log data structure for system events.",
    "url": "https://fleetdm.com/tables/asl",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Apple System Logger (ASL) is deprecated since macOS 10.12. On older Macs, this table can be used to read logs. On newer ones, see the *unified_log* table. This example is from the osquery documentation.\n```\nSELECT time, message FROM asl WHERE facility = 'authpriv' AND sender = 'sudo' AND message LIKE '%python%';\n```",
    "columns": [
      {
        "name": "time",
        "description": "Unix timestamp.  Set automatically",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time_nano_sec",
        "description": "Nanosecond time.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "host",
        "description": "Sender's address (set by the server).",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sender",
        "description": "Sender's identification string.  Default is process name.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "facility",
        "description": "Sender's facility.  Default is 'user'.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Sending process ID encoded as a string.  Set automatically.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "GID that sent the log message (set by the server).",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "UID that sent the log message (set by the server).",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "level",
        "description": "Log level number.  See levels in asl.h.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "message",
        "description": "Message text.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ref_pid",
        "description": "Reference PID for messages proxied by launchd",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ref_proc",
        "description": "Reference process for messages proxied by launchd",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "extra",
        "description": "Extra columns, in JSON format. Queries against this column are performed entirely in SQLite, so do not benefit from efficient querying via asl.h.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/asl.yml"
  },
  {
    "name": "augeas",
    "description": "Configuration files parsed by [augeas](https://augeas.net/).",
    "url": "https://fleetdm.com/tables/augeas",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "This table requires augeas [lenses](https://augeas.net/docs/lenses.html) to be installed in their default location. This query will output *sshd_config* as if it was a table. This is especially useful to check for specific configurations in text files.\n```\nSELECT * FROM augeas WHERE path='/etc/ssh/sshd_config';\n```",
    "columns": [
      {
        "name": "node",
        "description": "The node path of the configuration item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "value",
        "description": "The value of the configuration item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "label",
        "description": "The label of the configuration item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "The path to the configuration file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/augeas.yml"
  },
  {
    "name": "authdb",
    "platforms": [
      "darwin"
    ],
    "description": "Returns JSON output for the `authorizationdb read <right_name>` command.",
    "columns": [
      {
        "name": "right_name",
        "type": "text",
        "required": true,
        "description": "The right_name to query in the `authorizationdb read <right_name>` command."
      },
      {
        "name": "json_result",
        "type": "text",
        "required": false,
        "description": "The JSON output parsed from the plist output of the `authorizationdb read <right_name>` command. "
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/authdb",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/authdb.yml"
  },
  {
    "name": "authenticode",
    "description": "File (executable, bundle, installer, disk) code signing status.",
    "url": "https://fleetdm.com/tables/authenticode",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nSELECT process.pid, process.path, signature.result FROM processes as process LEFT JOIN authenticode AS signature ON process.path = signature.path;\n```",
    "columns": [
      {
        "name": "path",
        "description": "Must provide a path or directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "original_program_name",
        "description": "The original program name that the publisher has signed",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial_number",
        "description": "The certificate serial number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "issuer_name",
        "description": "The certificate issuer name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subject_name",
        "description": "The certificate subject name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "result",
        "description": "The signature check result",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/authenticode.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fauthenticode.yml&value=name%3A%20authenticode%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "authorization_mechanisms",
    "description": "macOS Authorization mechanisms database.",
    "url": "https://fleetdm.com/tables/authorization_mechanisms",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Discover privileged macOS authorization mechanisms, which could include third party software. Finding third party software using this means it is likely an important piece of software that should be kept very up to date.\n```\nSELECT * FROM authorization_mechanisms WHERE privileged='true';\n```",
    "columns": [
      {
        "name": "label",
        "description": "Label of the authorization right",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "plugin",
        "description": "Authorization plugin name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mechanism",
        "description": "Name of the mechanism that will be called",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "privileged",
        "description": "If privileged it will run as root, else as an anonymous user",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "entry",
        "description": "The whole string entry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/authorization_mechanisms.yml"
  },
  {
    "name": "authorizations",
    "description": "macOS Authorization rights database.",
    "url": "https://fleetdm.com/tables/authorizations",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See macOS authorizations that have been modified since their creation. Useful for threat hunting.\n```\nSELECT * FROM authorizations WHERE created!=modified;\n```",
    "columns": [
      {
        "name": "label",
        "description": "Item name, usually in reverse domain format",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "modified",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "allow_root",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "timeout",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tries",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "authenticate_user",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "shared",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "comment",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "session_owner",
        "description": "Label top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/authorizations.yml"
  },
  {
    "name": "authorized_keys",
    "description": "A line-delimited authorized_keys table.",
    "url": "https://fleetdm.com/tables/authorized_keys",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN authorized_keys USING (uid);\n```",
    "columns": [
      {
        "name": "uid",
        "description": "The local owner of authorized_keys file",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "algorithm",
        "description": "Key type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key",
        "description": "Key encoded as base64",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "options",
        "description": "Optional list of login options",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "comment",
        "description": "Optional comment",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key_file",
        "description": "Path to the authorized_keys file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/authorized_keys.yml"
  },
  {
    "name": "autoexec",
    "description": "Aggregate of executables that will automatically execute on the target machine. This is an amalgamation of other tables like services, scheduled_tasks, startup_items and more.",
    "url": "https://fleetdm.com/tables/autoexec",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "path",
        "description": "Path to the executable",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Name of the program",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Source table of the autoexec item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/autoexec.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fautoexec.yml&value=name%3A%20autoexec%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "azure_instance_metadata",
    "description": "Azure instance metadata.",
    "url": "https://fleetdm.com/tables/azure_instance_metadata",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "See in which Azure location a VM is located\n```\nSELECT location FROM azure_instance_metadata;\n```",
    "columns": [
      {
        "name": "location",
        "description": "Azure Region the VM is running in",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Name of the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "offer",
        "description": "Offer information for the VM image (Azure image gallery VMs only)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "publisher",
        "description": "Publisher of the VM image",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sku",
        "description": "SKU for the VM image",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Version of the VM image",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "os_type",
        "description": "Linux or Windows",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "platform_update_domain",
        "description": "Update domain the VM is running in",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "platform_fault_domain",
        "description": "Fault domain the VM is running in",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vm_id",
        "description": "Unique identifier for the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "vm_size",
        "description": "VM size",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subscription_id",
        "description": "Azure subscription for the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "resource_group_name",
        "description": "Resource group for the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "placement_group_id",
        "description": "Placement group for the VM scale set",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vm_scale_set_name",
        "description": "VM scale set name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "zone",
        "description": "Availability zone of the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/azure_instance_metadata.yml"
  },
  {
    "name": "azure_instance_tags",
    "description": "Azure instance tags.",
    "url": "https://fleetdm.com/tables/azure_instance_tags",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "List the tags assigned to an Azure VM\n```\nSELECT key, value FROM azure_instance_tags;\n```",
    "columns": [
      {
        "name": "vm_id",
        "description": "Unique identifier for the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key",
        "description": "The tag key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "The tag value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/azure_instance_tags.yml"
  },
  {
    "name": "background_activities_moderator",
    "description": "Background Activities Moderator (BAM) tracks application execution.",
    "url": "https://fleetdm.com/tables/background_activities_moderator",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from background_activities_moderator;\n```",
    "columns": [
      {
        "name": "path",
        "description": "Application file path.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_execution_time",
        "description": "Most recent time application was executed.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sid",
        "description": "User SID.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/background_activities_moderator.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fbackground_activities_moderator.yml&value=name%3A%20background_activities_moderator%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "battery",
    "description": "Provides information about the internal battery of a Macbook.",
    "url": "https://fleetdm.com/tables/battery",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "This table contains a lot of information about the health of batteries. This query shows how many cycles the battery of a device was used for, allowing you to identify users who put more wear on it and might need more frequent replacements.\n```\nSELECT cycle_count FROM battery;\n```",
    "columns": [
      {
        "name": "manufacturer",
        "description": "The battery manufacturer's name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacture_date",
        "description": "The date the battery was manufactured UNIX Epoch",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model",
        "description": "The battery's model number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial_number",
        "description": "The battery's unique serial number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cycle_count",
        "description": "The number of charge/discharge cycles",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "health",
        "description": "One of the following: \"Good\" describes a well-performing battery, \"Fair\" describes a functional battery with limited capacity, or \"Poor\" describes a battery that's not capable of providing power",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "condition",
        "description": "One of the following: \"Normal\" indicates the condition of the battery is within normal tolerances, \"Service Needed\" indicates that the battery should be checked out by a licensed Mac repair service, \"Permanent Failure\" indicates the battery needs replacement",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "One of the following: \"AC Power\" indicates the battery is connected to an external power source, \"Battery Power\" indicates that the battery is drawing internal power, \"Off Line\" indicates the battery is off-line or no longer connected",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "charging",
        "description": "1 if the battery is currently being charged by a power source. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "charged",
        "description": "1 if the battery is currently completely charged. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "designed_capacity",
        "description": "The battery's designed capacity in mAh",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max_capacity",
        "description": "The battery's actual capacity when it is fully charged in mAh",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "current_capacity",
        "description": "The battery's current charged capacity in mAh",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "percent_remaining",
        "description": "The percentage of battery remaining before it is drained",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "amperage",
        "description": "The battery's current amperage in mA",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "voltage",
        "description": "The battery's current voltage in mV",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minutes_until_empty",
        "description": "The number of minutes until the battery is fully depleted. This value is -1 if this time is still being calculated",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minutes_to_full_charge",
        "description": "The number of minutes until the battery is fully charged. This value is -1 if this time is still being calculated",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/battery.yml"
  },
  {
    "name": "bitlocker_info",
    "description": "Retrieve bitlocker status of the machine.",
    "url": "https://fleetdm.com/tables/bitlocker_info",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "* `protection_status` is quite nuanced - from the [Microsoft documentation](https://learn.microsoft.com/en-us/windows/win32/secprov/getprotectionstatus-win32-encryptablevolume#parameters):\n\n `protection_status = 0`\n\n  For an Internal HD:\n  The volume is unencrypted, partially encrypted, or the volume's encryption key is available in the clear on the hard disk.\n\n  For an External HD:\n  The band for the volume is perpetually unlocked, has no key manager, or is managed by a third party key manager.\n  This can also mean that the band is managed by BitLocker but the DisableKeyProtectors method has been called and the drive is suspended.\n\n `protection_status = 1`\n\n  For an Internal HD:\n  The volume is fully encrypted and the encryption key for the volume is not available in the clear on the hard disk.\n\n  For an External HD:\n  BitLocker is the key manager for the band. The drive can be locked or unlocked but cannot be perpetually unlocked.\n\n `protection_status = 2`\n\n  The volume protection status cannot be determined. This can be caused by the volume being in a locked state.",
    "examples": "Full Disk Encryption (FDE) reduces the risk of compromise when a device is lost or stolen. This query lists any system that does not have BitLocker enabled on its OS drive (typically `C:`). \n```\n   \n SELECT * FROM bitlocker_info WHERE drive_letter='C:' AND protection_status != 1;\n\n```",
    "columns": [
      {
        "name": "device_id",
        "description": "ID of the encrypted drive.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "drive_letter",
        "description": "Drive letter of the encrypted drive.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "persistent_volume_id",
        "description": "Persistent ID of the drive.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "conversion_status",
        "description": "The bitlocker conversion status of the drive.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protection_status",
        "description": "The bitlocker protection status of the drive.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "encryption_method",
        "description": "The encryption type of the device.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "The FVE metadata version of the drive.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "percentage_encrypted",
        "description": "The percentage of the drive that is encrypted.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "lock_status",
        "description": "The accessibility status of the drive from Windows.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/bitlocker_info.yml"
  },
  {
    "name": "block_devices",
    "description": "Block (buffered access) device file nodes: disks, ramdisks, and DMG containers.",
    "url": "https://fleetdm.com/tables/block_devices",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify USB storage in use\n```\nSELECT * FROM block_devices WHERE type='USB';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Block device name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Block device parent name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor",
        "description": "Block device vendor string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model",
        "description": "Block device model string identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Block device size in blocks",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "block_size",
        "description": "Block size in bytes",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uuid",
        "description": "Block device Universally Unique Identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Block device type string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "label",
        "description": "Block device label string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/block_devices.yml"
  },
  {
    "name": "bpf_process_events",
    "description": "Track time/action process executions.",
    "url": "https://fleetdm.com/tables/bpf_process_events",
    "platforms": [
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "tid",
        "description": "Thread ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Parent process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "User ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cid",
        "description": "Cgroup ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exit_code",
        "description": "Exit code of the system call",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "probe_error",
        "description": "Set to 1 if one or more buffers could not be captured",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "syscall",
        "description": "System call name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Binary path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cwd",
        "description": "Current working directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cmdline",
        "description": "Command line arguments",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "duration",
        "description": "How much time was spent inside the syscall (nsecs)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "json_cmdline",
        "description": "Command line arguments, in JSON format",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "ntime",
        "description": "The nsecs uptime timestamp as obtained from BPF",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/bpf_process_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fbpf_process_events.yml&value=name%3A%20bpf_process_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "bpf_socket_events",
    "description": "Track network socket opens and closes.",
    "url": "https://fleetdm.com/tables/bpf_socket_events",
    "platforms": [
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "tid",
        "description": "Thread ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Parent process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "User ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cid",
        "description": "Cgroup ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exit_code",
        "description": "Exit code of the system call",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "probe_error",
        "description": "Set to 1 if one or more buffers could not be captured",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "syscall",
        "description": "System call name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of executed file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fd",
        "description": "The file description for the process socket",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "family",
        "description": "The Internet protocol family ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "The socket type",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protocol",
        "description": "The network protocol ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_address",
        "description": "Local address associated with socket",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_address",
        "description": "Remote address associated with socket",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_port",
        "description": "Local network protocol port number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_port",
        "description": "Remote network protocol port number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "duration",
        "description": "How much time was spent inside the syscall (nsecs)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ntime",
        "description": "The nsecs uptime timestamp as obtained from BPF",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/bpf_socket_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fbpf_socket_events.yml&value=name%3A%20bpf_socket_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "browser_plugins",
    "description": "All C/NPAPI browser plugin details for all users. C/NPAPI has been deprecated on all major browsers. To query for plugins on modern browsers, try: `chrome_extensions` `firefox_addons` `safari_extensions`.",
    "url": "https://fleetdm.com/tables/browser_plugins",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "See classic browser plugins (C/NPAPI) installed by users. These plugins have been deprecated for a long time, so this query will usually not return anything.\n```\nSELECT * FROM users CROSS JOIN browser_plugins USING (uid);\n```",
    "columns": [
      {
        "name": "uid",
        "description": "The local user that owns the plugin",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Plugin display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "identifier",
        "description": "Plugin identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Plugin short version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sdk",
        "description": "Build SDK used to compile plugin",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Plugin description text",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "development_region",
        "description": "Plugin language-localization",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "native",
        "description": "Plugin requires native execution",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to plugin bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "disabled",
        "description": "Is the plugin disabled. 1 = Disabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "hidden": true,
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/browser_plugins.yml"
  },
  {
    "name": "carbon_black_info",
    "description": "Returns info about a Carbon Black sensor install.",
    "url": "https://fleetdm.com/tables/carbon_black_info",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See systems running Carbon Black but which have protection disabled.\n```\nSELECT * FROM carbon_black_info WHERE protection_disabled='1';\n```",
    "columns": [
      {
        "name": "sensor_id",
        "description": "Sensor ID of the Carbon Black sensor",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "config_name",
        "description": "Sensor group",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_store_files",
        "description": "If the sensor is configured to send back binaries to the Carbon Black server",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_module_loads",
        "description": "If the sensor is configured to capture module loads",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_module_info",
        "description": "If the sensor is configured to collect metadata of binaries",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_file_mods",
        "description": "If the sensor is configured to collect file modification events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_reg_mods",
        "description": "If the sensor is configured to collect registry modification events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_net_conns",
        "description": "If the sensor is configured to collect network connections",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_processes",
        "description": "If the sensor is configured to process events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_cross_processes",
        "description": "If the sensor is configured to cross process events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_emet_events",
        "description": "If the sensor is configured to EMET events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_data_file_writes",
        "description": "If the sensor is configured to collect non binary file writes",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_process_user_context",
        "description": "If the sensor is configured to collect the user running a process",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collect_sensor_operations",
        "description": "Unknown",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "log_file_disk_quota_mb",
        "description": "Event file disk quota in MB",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "log_file_disk_quota_percentage",
        "description": "Event file disk quota in a percentage",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protection_disabled",
        "description": "If the sensor is configured to report tamper events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sensor_ip_addr",
        "description": "IP address of the sensor",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sensor_backend_server",
        "description": "Carbon Black server",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "event_queue",
        "description": "Size in bytes of Carbon Black event files on disk",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "binary_queue",
        "description": "Size in bytes of binaries waiting to be sent to Carbon Black server",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/carbon_black_info.yml"
  },
  {
    "name": "carves",
    "description": "List the set of completed and in-progress carves. If carve=1 then the query is treated as a new carve request.",
    "url": "https://fleetdm.com/tables/carves",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from carves where path like '/Users/%/Downloads/%' and carve=1\n```",
    "columns": [
      {
        "name": "time",
        "description": "Time at which the carve was kicked off",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha256",
        "description": "A SHA256 sum of the carved archive",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of the carved archive",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "The path of the requested carve",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Status of the carve, can be STARTING, PENDING, SUCCESS, or FAILED",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "carve_guid",
        "description": "Identifying value of the carve session",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "request_id",
        "description": "Identifying value of the carve request (e.g., scheduled query name, distributed request, etc)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "carve",
        "description": "Set this value to '1' to start a file carve",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/carves.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fcarves.yml&value=name%3A%20carves%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "certificates",
    "description": "[Certificate authorities](https://en.wikipedia.org/wiki/Certificate_authority) installed in Keychains/ca-bundles.",
    "url": "https://fleetdm.com/tables/certificates",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "- This table should be used sparingly as it uses an Apple API which occasionally corrupts the underlying certificate. Learn more [here](https://github.com/fleetdm/fleet/issues/13065#issuecomment-1658849614).",
    "examples": "Replace 1QAZ2WSX with your Apple Developer ID, if you have one. This query will then let you identify Macs that have a copy of your code signing and notarization certificates.\n```\nSELECT * FROM certificates WHERE common_\"name\" LIKE '%%1QAZ2SWX%%';\n```",
    "columns": [
      {
        "name": "common_name",
        "description": "Certificate CommonName",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subject",
        "description": "Certificate distinguished name (deprecated, use subject2)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "issuer",
        "description": "Certificate issuer distinguished name (deprecated, use issuer2)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ca",
        "description": "1 if CA: true (certificate is an authority) else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "self_signed",
        "description": "1 if self-signed, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "not_valid_before",
        "description": "Lower bound of valid date",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "not_valid_after",
        "description": "Certificate expiration data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "signing_algorithm",
        "description": "Signing algorithm used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key_algorithm",
        "description": "Key algorithm used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key_strength",
        "description": "Key size used for RSA/DSA, or curve name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key_usage",
        "description": "Certificate key usage and extended key usage",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subject_key_id",
        "description": "SKID an optionally included SHA1",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "authority_key_id",
        "description": "AKID an optionally included SHA1",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha1",
        "description": "SHA1 hash of the raw certificate contents",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to Keychain or PEM bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial",
        "description": "Certificate serial number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sid",
        "description": "SID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "store_location",
        "description": "Certificate system store location",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "store",
        "description": "Certificate system store",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "username",
        "description": "Username",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "store_id",
        "description": "Exists for service/user stores. Contains raw store id provided by WinAPI.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "issuer2",
        "description": "Certificate issuer distinguished name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux",
          "macOS"
        ]
      },
      {
        "name": "subject2",
        "description": "Certificate distinguished name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux",
          "macOS"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/certificates.yml"
  },
  {
    "name": "chassis_info",
    "description": "Display information pertaining to the chassis and its security status.",
    "url": "https://fleetdm.com/tables/chassis_info",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from chassis_info\n```",
    "columns": [
      {
        "name": "audible_alarm",
        "description": "If TRUE, the frame is equipped with an audible alarm.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "breach_description",
        "description": "If provided, gives a more detailed description of a detected security breach.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "chassis_types",
        "description": "A comma-separated list of chassis types, such as Desktop or Laptop.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "An extended description of the chassis if available.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "lock",
        "description": "If TRUE, the frame is equipped with a lock.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer",
        "description": "The manufacturer of the chassis.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model",
        "description": "The model of the chassis.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "security_breach",
        "description": "The physical status of the chassis such as Breach Successful, Breach Attempted, etc.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial",
        "description": "The serial number of the chassis.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "smbios_tag",
        "description": "The assigned asset tag number of the chassis.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sku",
        "description": "The Stock Keeping Unit number if available.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "If available, gives various operational or nonoperational statuses such as OK, Degraded, and Pred Fail.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "visible_alarm",
        "description": "If TRUE, the frame is equipped with a visual alarm.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/chassis_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fchassis_info.yml&value=name%3A%20chassis_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "chocolatey_packages",
    "description": "Chocolatey packages installed in a system.",
    "url": "https://fleetdm.com/tables/chocolatey_packages",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "Package display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Package-supplied version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "summary",
        "description": "Package-supplied summary",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "author",
        "description": "Optional package author",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "license",
        "description": "License under which package is launched",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path at which this package resides",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/chocolatey_packages.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fchocolatey_packages.yml&value=name%3A%20chocolatey_packages%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "chrome_extension_content_scripts",
    "description": "Chrome browser extension content scripts.",
    "url": "https://fleetdm.com/tables/chrome_extension_content_scripts",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN chrome_extension_content_scripts USING (uid);\n```",
    "columns": [
      {
        "name": "browser_type",
        "description": "The browser type (Valid values: chrome, chromium, opera, yandex, brave)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "The local user that owns the extension",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "identifier",
        "description": "Extension identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Extension-supplied version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "script",
        "description": "The content script used by the extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "match",
        "description": "The pattern that the script is matched against",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "profile_path",
        "description": "The profile path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to extension folder",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "referenced",
        "description": "1 if this extension is referenced by the Preferences file of the profile",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/chrome_extension_content_scripts.yml"
  },
  {
    "name": "chrome_extensions",
    "description": "Installed extensions (plugins) for [Chromium-based](https://en.wikipedia.org/wiki/Chromium_(web_browser)) browsers, including [Google Chrome](https://en.wikipedia.org/wiki/Google_Chrome), [Edge](https://en.wikipedia.org/wiki/Microsoft_Edge), [Brave](https://en.wikipedia.org/wiki/Brave_(web_browser)), [Opera](https://en.wikipedia.org/wiki/Opera_(web_browser)), and [Yandex](https://en.wikipedia.org/wiki/Yandex_Browser).",
    "url": "https://fleetdm.com/tables/chrome_extensions",
    "platforms": [
      "darwin",
      "windows",
      "linux",
      "chrome"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)\nOn ChromeOS, this table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).",
    "examples": "```\nSELECT * FROM users CROSS JOIN chrome_extensions USING (uid);\n```\nList Chrome extensions by user and profile which have full access to HTTPS browsing.\n```\nSELECT u.username, ce.name, ce.description, ce.version, ce.profile, ce.permissions FROM users u CROSS JOIN chrome_extensions ce USING (uid) WHERE ce.permissions LIKE '%%https://*/*%%';\n```",
    "columns": [
      {
        "name": "browser_type",
        "description": "The browser type (Valid values: chrome, chromium, opera, yandex, brave, edge, edge_beta)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "The local user that owns the extension",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "name",
        "description": "Extension display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "profile",
        "description": "The name of the Chrome profile that contains this extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "profile_path",
        "description": "The profile path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "referenced_identifier",
        "description": "Extension identifier, as specified by the preferences file. Empty if the extension is not in the profile.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "identifier",
        "description": "Extension identifier, computed from its manifest. Empty in case of error.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Extension-supplied version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Extension-optional description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "default_locale",
        "description": "Default locale supported by extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "current_locale",
        "description": "Current locale supported by extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "update_url",
        "description": "Extension-supplied update URI",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "author",
        "description": "Optional extension author",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "persistent",
        "description": "1 If extension is persistent across all tabs else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "path",
        "description": "Path to extension folder. Defaults to '' on ChromeOS",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "permissions",
        "description": "The permissions required by the extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "permissions_json",
        "description": "The JSON-encoded permissions required by the extension",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "optional_permissions",
        "description": "The permissions optionally required by the extensions",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "optional_permissions_json",
        "description": "The JSON-encoded permissions optionally required by the extensions",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "manifest_hash",
        "description": "The SHA256 hash of the manifest.json file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "referenced",
        "description": "1 if this extension is referenced by the Preferences file of the profile",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "from_webstore",
        "description": "True if this extension was installed from the web store",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "state",
        "description": "1 if this extension is enabled",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "install_time",
        "description": "Extension install time, in its original Webkit format",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "install_timestamp",
        "description": "Extension install time, converted to unix time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "manifest_json",
        "description": "The manifest file of the extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "key",
        "description": "The extension key, from the manifest file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/chrome_extensions.yml"
  },
  {
    "name": "cis_audit",
    "platforms": [
      "windows"
    ],
    "description": "Enables querying CIS items values.",
    "columns": [
      {
        "name": "item",
        "type": "text",
        "required": false,
        "description": "Contains the input CIS item to query. If empty, no CIS item is queried."
      },
      {
        "name": "value",
        "type": "text",
        "required": false,
        "description": "Contains the value for the queried CIS item."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/cis_audit",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/cis_audit.yml"
  },
  {
    "name": "connected_displays",
    "description": "Provides information about the connected displays of the machine.",
    "url": "https://fleetdm.com/tables/connected_displays",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "The name of the display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "product_id",
        "description": "The product ID of the display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial_number",
        "description": "The serial number of the display. (may not be unique)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor_id",
        "description": "The vendor ID of the display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufactured_week",
        "description": "The manufacture week of the display. This field is 0 if not supported",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufactured_year",
        "description": "The manufacture year of the display. This field is 0 if not supported",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "display_id",
        "description": "The display ID.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pixels",
        "description": "The number of pixels of the display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "resolution",
        "description": "The resolution of the display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ambient_brightness_enabled",
        "description": "The ambient brightness setting associated with the display. This will be 1 if enabled and is 0 if disabled or not supported.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "connection_type",
        "description": "The connection type associated with the display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "display_type",
        "description": "The type of display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "main",
        "description": "If the display is the main display.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mirror",
        "description": "If the display is mirrored or not. This field is 1 if mirrored and 0 if not mirrored.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "online",
        "description": "The online status of the display. This field is 1 if the display is online and 0 if it is offline.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rotation",
        "description": "The orientation of the display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/connected_displays.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fconnected_displays.yml&value=name%3A%20connected_displays%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "connectivity",
    "description": "Provides the overall system's network state.",
    "url": "https://fleetdm.com/tables/connectivity",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect ipv4_internet from connectivity\n```",
    "columns": [
      {
        "name": "disconnected",
        "description": "True if the all interfaces are not connected to any network",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv4_no_traffic",
        "description": "True if any interface is connected via IPv4, but has seen no traffic",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv6_no_traffic",
        "description": "True if any interface is connected via IPv6, but has seen no traffic",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv4_subnet",
        "description": "True if any interface is connected to the local subnet via IPv4",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv4_local_network",
        "description": "True if any interface is connected to a routed network via IPv4",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv4_internet",
        "description": "True if any interface is connected to the Internet via IPv4",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv6_subnet",
        "description": "True if any interface is connected to the local subnet via IPv6",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv6_local_network",
        "description": "True if any interface is connected to a routed network via IPv6",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv6_internet",
        "description": "True if any interface is connected to the Internet via IPv6",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/connectivity.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fconnectivity.yml&value=name%3A%20connectivity%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "corestorage_logical_volume_families",
    "platforms": [
      "darwin"
    ],
    "description": "Information about CoreStorage Logical Volume Families from the `diskutil coreStorage list -plist` command.",
    "columns": [
      {
        "name": "vg_UUID",
        "type": "text",
        "required": false,
        "description": "The unique identifier of the containing volume group"
      },
      {
        "name": "vg_Version",
        "type": "integer",
        "required": false,
        "description": "The version of the volume group, probably 1"
      },
      {
        "name": "vg_FreeSpace",
        "type": "bigint",
        "required": false,
        "description": "Amount of space, in bytes, in the volume group that have not been allocated by any logical volume"
      },
      {
        "name": "vg_FusionDrive",
        "type": "integer",
        "required": false,
        "description": "Whether the volume group is a \"fusion drive\" (i.e. SSHD)"
      },
      {
        "name": "vg_Name",
        "type": "text",
        "required": false,
        "description": "The customizable name of the volume group"
      },
      {
        "name": "vg_Sequence",
        "type": "bigint",
        "required": false,
        "description": "Current sequence number of the volume group"
      },
      {
        "name": "vg_Size",
        "type": "bigint",
        "required": false,
        "description": "Total (i.e. either allocated or unallocated) size of the volume group"
      },
      {
        "name": "vg_Sparse",
        "type": "integer",
        "required": false,
        "description": "Whether the volume group allows overcommitting storage"
      },
      {
        "name": "vg_Status",
        "type": "text",
        "required": false,
        "description": "Status of the volume group, e.g. \"Online\""
      },
      {
        "name": "UUID",
        "type": "text",
        "required": false,
        "description": "Unique ID of the logical volume family"
      },
      {
        "name": "EncryptionStatus",
        "type": "text",
        "required": false,
        "description": "Unlock status of the logical volume family, e.g. \"Locked\" or \"Unlocked\""
      },
      {
        "name": "EncryptionType",
        "type": "text",
        "required": false,
        "description": "Encryption algorithm for the logical volume family, normally \"AES-XTS\" or \"None\""
      },
      {
        "name": "HasVisibleUsers",
        "type": "integer",
        "required": false,
        "description": "Undocumented field returned from `diskutil cs info`"
      },
      {
        "name": "HasVolumeKey",
        "type": "integer",
        "required": false,
        "description": "Whether there is an encryption key assigned for the logical volume"
      },
      {
        "name": "IsAcceptingNewUsers",
        "type": "integer",
        "required": false,
        "description": "Whether new users may be granted access to the logical volume family encryption key"
      },
      {
        "name": "IsFullySecure",
        "type": "integer",
        "required": false,
        "description": "Undocumented field returned from `diskutil cs info`"
      },
      {
        "name": "MayHaveEncryptedEvents",
        "type": "integer",
        "required": false,
        "description": "Undocumented field returned from `diskutil cs info`"
      },
      {
        "name": "RequiresPasswordUnlock",
        "type": "integer",
        "required": false,
        "description": "Whether a password is currently required to unlock the volume"
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/corestorage_logical_volume_families",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/corestorage_logical_volume_families.yml"
  },
  {
    "name": "corestorage_logical_volumes",
    "platforms": [
      "darwin"
    ],
    "description": "Information about CoreStorage Logical Volumes from the `diskutil coreStorage list -plist` command.",
    "columns": [
      {
        "name": "vg_UUID",
        "type": "text",
        "required": false,
        "description": "The unique identifier of the containing volume group"
      },
      {
        "name": "vg_Version",
        "type": "integer",
        "required": false,
        "description": "The version of the volume group, probably 1"
      },
      {
        "name": "vg_FreeSpace",
        "type": "bigint",
        "required": false,
        "description": "Amount of space, in bytes, in the volume group that have not been allocated by any logical volume"
      },
      {
        "name": "vg_FusionDrive",
        "type": "integer",
        "required": false,
        "description": "Whether the volume group is a \"fusion drive\" (i.e. SSHD)"
      },
      {
        "name": "vg_Name",
        "type": "text",
        "required": false,
        "description": "The customizable name of the volume group"
      },
      {
        "name": "vg_Sequence",
        "type": "bigint",
        "required": false,
        "description": "Current sequence number of the volume group"
      },
      {
        "name": "vg_Size",
        "type": "bigint",
        "required": false,
        "description": "Total (i.e. either allocated or unallocated) size of the volume group"
      },
      {
        "name": "vg_Sparse",
        "type": "integer",
        "required": false,
        "description": "Whether the volume group allows overcommitting storage"
      },
      {
        "name": "vg_Status",
        "type": "text",
        "required": false,
        "description": "Status of the volume group, e.g. \"Online\""
      },
      {
        "name": "lvf_UUID",
        "type": "text",
        "required": false,
        "description": "Unique ID of the logical volume family"
      },
      {
        "name": "lvf_EncryptionStatus",
        "type": "text",
        "required": false,
        "description": "Unlock status of the logical volume family, e.g. \"Locked\" or \"Unlocked\""
      },
      {
        "name": "lvf_EncryptionType",
        "type": "text",
        "required": false,
        "description": "Encryption algorithm for the logical volume family, normally \"AES-XTS\" or \"None\""
      },
      {
        "name": "lvf_HasVisibleUsers",
        "type": "integer",
        "required": false,
        "description": "Undocumented field returned from `diskutil cs info`"
      },
      {
        "name": "lvf_HasVolumeKey",
        "type": "integer",
        "required": false,
        "description": "Whether there is an encryption key assigned for the logical volume"
      },
      {
        "name": "lvf_IsAcceptingNewUsers",
        "type": "integer",
        "required": false,
        "description": "Whether new users may be granted access to the logical volume family encryption key"
      },
      {
        "name": "lvf_IsFullySecure",
        "type": "integer",
        "required": false,
        "description": "Undocumented field returned from `diskutil cs info`"
      },
      {
        "name": "lvf_MayHaveEncryptedEvents",
        "type": "integer",
        "required": false,
        "description": "Undocumented field returned from `diskutil cs info`"
      },
      {
        "name": "lvf_RequiresPasswordUnlock",
        "type": "integer",
        "required": false,
        "description": "Whether a password is currently required to unlock the volume"
      },
      {
        "name": "ContentHint",
        "type": "text",
        "required": false,
        "description": "What type of filesystem is on the logical volume, as written in metadata, e.g. \"Apple_HFS\""
      },
      {
        "name": "ConverstionProgressPercent",
        "type": "integer",
        "required": false,
        "description": "How far the current conversion status has progressed, either empty or 0-100"
      },
      {
        "name": "ConversionState",
        "type": "text",
        "required": false,
        "description": "Status of the conversion, e.g. from HFS+ to CoreStorage or encrypting a volume"
      },
      {
        "name": "Name",
        "type": "text",
        "required": false,
        "description": "Name of the logical volume"
      },
      {
        "name": "Sequence",
        "type": "bigint",
        "required": false,
        "description": "Sequence number of the logical volume"
      },
      {
        "name": "Size",
        "type": "bigint",
        "required": false,
        "description": "Size of the logical volume in bytes"
      },
      {
        "name": "Status",
        "type": "text",
        "required": false,
        "description": "Lock status of the logical volume, e.g. \"Locked\""
      },
      {
        "name": "Version",
        "type": "bigint",
        "required": false,
        "description": "CoreStorage version of the logical volume, normally 65536"
      },
      {
        "name": "UUID",
        "type": "text",
        "required": false,
        "description": "Unique ID of the logical volume"
      },
      {
        "name": "DesignatedPhysicalVolume",
        "type": "text",
        "required": false,
        "description": "UUID of one of the physical volumes on which the logical volume is stored"
      },
      {
        "name": "DesignatedPhysicalVolumeIdentifier",
        "type": "text",
        "required": false,
        "description": "Identifier of one of the physical volumes that holds this logical volume (e.g disk0s2)"
      },
      {
        "name": "Identifier",
        "type": "text",
        "required": false,
        "description": "Current identifier of the logical volume (e.g. \"disk5\")"
      },
      {
        "name": "VolumeName",
        "type": "text",
        "required": false,
        "description": "Name of the filesystem in the logical volume"
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/corestorage_logical_volumes",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/corestorage_logical_volumes.yml"
  },
  {
    "name": "cpu_info",
    "description": "Retrieve cpu hardware info of the machine.",
    "url": "https://fleetdm.com/tables/cpu_info",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "device_id",
        "description": "The DeviceID of the CPU.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model",
        "description": "The model of the CPU.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer",
        "description": "The manufacturer of the CPU.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "processor_type",
        "description": "The processor type, such as Central, Math, or Video.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_status",
        "description": "The current operating status of the CPU.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "number_of_cores",
        "description": "The number of cores of the CPU.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logical_processors",
        "description": "The number of logical processors of the CPU.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "address_width",
        "description": "The width of the CPU address bus.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "current_clock_speed",
        "description": "The current frequency of the CPU.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max_clock_speed",
        "description": "The maximum possible frequency of the CPU.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "socket_designation",
        "description": "The assigned socket on the board for the given CPU.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "availability",
        "description": "The availability and status of the CPU.",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "windows",
          "win32",
          "cygwin"
        ]
      },
      {
        "name": "number_of_efficiency_cores",
        "description": "The number of efficiency cores of the CPU. Only available on Apple Silicon",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "darwin"
        ]
      },
      {
        "name": "number_of_performance_cores",
        "description": "The number of performance cores of the CPU. Only available on Apple Silicon",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "darwin"
        ]
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/cpu_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fcpu_info.yml&value=name%3A%20cpu_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "cpu_time",
    "description": "Displays information from /proc/stat file about the time the cpu cores spent in different parts of the system.",
    "url": "https://fleetdm.com/tables/cpu_time",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify overworked CPUs using a ratio of system to user CPU usage. Here, a ratio of 2 was arbitrarily chosen.\n```\nSELECT * FROM cpu_time WHERE user/system>2;\n```",
    "columns": [
      {
        "name": "core",
        "description": "Name of the cpu (core)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user",
        "description": "Time spent in user mode",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "nice",
        "description": "Time spent in user mode with low priority (nice)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "system",
        "description": "Time spent in system mode",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "idle",
        "description": "Time spent in the idle task",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "iowait",
        "description": "Time spent waiting for I/O to complete",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "irq",
        "description": "Time spent servicing interrupts",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "softirq",
        "description": "Time spent servicing softirqs",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "steal",
        "description": "Time spent in other operating systems when running in a virtualized environment",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "guest",
        "description": "Time spent running a virtual CPU for a guest OS under the control of the Linux kernel",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "guest_nice",
        "description": "Time spent running a niced guest ",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/cpu_time.yml"
  },
  {
    "name": "cpuid",
    "description": "Useful CPU features from the cpuid ASM call.",
    "url": "https://fleetdm.com/tables/cpuid",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify Intel powered Macs that support a specific Intel CPU feature, such as sgx1.\n```\nSELECT * from cpuid WHERE feature='sgx1';\n```",
    "columns": [
      {
        "name": "feature",
        "description": "Present feature flags",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Bit value or string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "output_register",
        "description": "Register used to for feature value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "output_bit",
        "description": "Bit in register value for feature value",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "input_eax",
        "description": "Value of EAX used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/cpuid.yml"
  },
  {
    "name": "crashes",
    "description": "Application, System, and Mobile App crash logs.",
    "url": "https://fleetdm.com/tables/crashes",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN crashes USING (uid);\n```",
    "columns": [
      {
        "name": "type",
        "description": "Type of crash log",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process (or thread) ID of the crashed process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "crash_path",
        "description": "Location of log file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "identifier",
        "description": "Identifier of the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Version info of the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Parent PID of the crashed process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "responsible",
        "description": "Process responsible for the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "User ID of the crashed process",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "datetime",
        "description": "Date/Time at which the crash occurred",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "crashed_thread",
        "description": "Thread ID which crashed",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "stack_trace",
        "description": "Most recent frame from the stack trace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exception_type",
        "description": "Exception type of the crash",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exception_codes",
        "description": "Exception codes from the crash",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exception_notes",
        "description": "Exception notes from the crash",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "registers",
        "description": "The value of the system registers",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/crashes.yml"
  },
  {
    "name": "crontab",
    "description": "Line parsed values from system and user cron/tab.",
    "url": "https://fleetdm.com/tables/crontab",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "List commands scheduled for execution as cron jobs\n```\nSELECT * FROM crontab;\n```",
    "columns": [
      {
        "name": "event",
        "description": "The job @event name (rare)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minute",
        "description": "The exact minute for the job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hour",
        "description": "The hour of the day for the job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "day_of_month",
        "description": "The day of the month for the job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "month",
        "description": "The month of the year for the job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "day_of_week",
        "description": "The day of the week for the job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "command",
        "description": "Raw command string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "File parsed",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/crontab.yml"
  },
  {
    "name": "cryptoinfo",
    "description": "Get info about the a certificate on the host.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "columns": [
      {
        "name": "path",
        "description": "Path to the certificate.",
        "type": "text",
        "required": true
      },
      {
        "name": "passphrase",
        "description": "The passphrase for the certificate.",
        "type": "text",
        "required": false
      },
      {
        "name": "key",
        "description": "A specific item that describes the drive.",
        "type": "text",
        "required": false
      },
      {
        "name": "value",
        "description": "The value for the specified key.",
        "type": "text",
        "required": false
      },
      {
        "name": "fullkey",
        "description": "The expanded name of the specific item that describes the drive.",
        "type": "text",
        "required": false
      },
      {
        "name": "parent",
        "description": "The key's parent.",
        "type": "text",
        "required": false
      },
      {
        "name": "query",
        "description": "The query is printed in this column. For example the SQL `SELECT * FROM cryuptsetup_status WHERE name = 'LUKS_DRIVE' will print \"*\"` in the query column.",
        "type": "text",
        "required": false
      }
    ],
    "url": "https://fleetdm.com/tables/cryptoinfo",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/cryptoinfo.yml"
  },
  {
    "name": "cryptsetup_status",
    "description": "Get info about the encrypted drive on the host.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "linux"
    ],
    "columns": [
      {
        "name": "name",
        "required": true,
        "description": "The name of the drive.",
        "type": "text"
      },
      {
        "name": "key",
        "description": "A specific item that describes the drive.",
        "type": "text",
        "required": false
      },
      {
        "name": "value",
        "description": "The value for the specified key.",
        "type": "text",
        "required": false
      },
      {
        "name": "fullkey",
        "description": "The expanded name of the specific item that describes the drive.",
        "type": "text",
        "required": false
      },
      {
        "name": "parent",
        "description": "The key's parent.",
        "type": "text",
        "required": false
      },
      {
        "name": "query",
        "description": "The query is printed in this column. For example the SQL `SELECT * FROM cryuptsetup_status WHERE name = 'LUKS_DRIVE'` will print \"*\" in the query column.",
        "type": "text",
        "required": false
      }
    ],
    "url": "https://fleetdm.com/tables/cryptsetup_status",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/cryptsetup_status.yml"
  },
  {
    "name": "csrutil_info",
    "platforms": [
      "darwin"
    ],
    "description": "Information from csrutil system call.",
    "columns": [
      {
        "name": "ssv_enabled",
        "type": "integer",
        "required": false,
        "description": "Sealed System Volume is a security feature introduced in macOS 11.0 Big Sur. During system installation, a SHA-256 cryptographic hash is calculated for all immutable system files and stored in a Merkle tree which itself is hashed as the Seal. Both are stored in the metadata of the snapshot created of the System volume. The seal is verified by the boot loader at startup. macOS will not boot if system files have been tampered with. If validation fails, the user will be instructed to reinstall the operating system. During read operations for files located in the Sealed System Volume, a hash is calculated and compared to the value stored in the Merkle tree.\n"
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/csrutil_info",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/csrutil_info.yml"
  },
  {
    "name": "cups_destinations",
    "description": "Returns all configured printers.",
    "url": "https://fleetdm.com/tables/cups_destinations",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify the types of printers connected to computers. This query works for both network and local printers.\n```\nSELECT * FROM cups_destinations WHERE option_\"name\"='printer-info';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of the printer",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "option_name",
        "description": "Option name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "option_value",
        "description": "Option value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/cups_destinations.yml"
  },
  {
    "name": "cups_jobs",
    "description": "Returns all completed print jobs from cups.",
    "url": "https://fleetdm.com/tables/cups_jobs",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See what file format are being printed to what printer. This is useful for identifying systems that print a lot, which can help you ensure they have access to faster printers. Using this table, you could also highlight slow print jobs that might benefit from troubleshooting.\n```\nSELECT destination, format, strftime('%Y-%m-%d %H:%M:%S',creation_time,'unixepoch') AS creationDate FROM cups_jobs;\n```",
    "columns": [
      {
        "name": "title",
        "description": "Title of the printed job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "destination",
        "description": "The printer the job was sent to",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user",
        "description": "The user who printed the job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "format",
        "description": "The format of the print job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "The size of the print job",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "completed_time",
        "description": "When the job completed printing",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "processing_time",
        "description": "How long the job took to process",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "creation_time",
        "description": "When the print request was initiated",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/cups_jobs.yml"
  },
  {
    "name": "curl",
    "description": "Perform an http request and return stats about it.",
    "url": "https://fleetdm.com/tables/curl",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Connect over HTTP and retrieve statistics about the process. This is useful to detect machines on slow networks, or that have no Internet access.\n```\nSELECT round_trip_time FROM curl WHERE URL='https://fleetdm.com';\n```",
    "columns": [
      {
        "name": "url",
        "description": "The url for the request",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "method",
        "description": "The HTTP method for the request",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user_agent",
        "description": "The user-agent string to use for the request",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "response_code",
        "description": "The HTTP status code for the response",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "round_trip_time",
        "description": "Time taken to complete the request",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bytes",
        "description": "Number of bytes in the response",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "result",
        "description": "The HTTP response body",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/curl.yml"
  },
  {
    "name": "curl_certificate",
    "description": "Inspect TLS certificates by connecting to input hostnames.",
    "url": "https://fleetdm.com/tables/curl_certificate",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify the certificates being served to osquery clients. This can allow you to detect machines that are behind a proxy or firewall attempting to decrypt TLS, maliciously or not.\n```\nSELECT issuer_organization, signature, sha256_fingerprint FROM curl_certificate WHERE hostname='google.com';\n```",
    "columns": [
      {
        "name": "hostname",
        "description": "Hostname to CURL (domain[:port], e.g. osquery.io)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "common_name",
        "description": "Common name of company issued to",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "organization",
        "description": "Organization issued to",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "organization_unit",
        "description": "Organization unit issued to",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial_number",
        "description": "Certificate serial number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "issuer_common_name",
        "description": "Issuer common name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "issuer_organization",
        "description": "Issuer organization",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "issuer_organization_unit",
        "description": "Issuer organization unit",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "valid_from",
        "description": "Period of validity start date",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "valid_to",
        "description": "Period of validity end date",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha256_fingerprint",
        "description": "SHA-256 fingerprint",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha1_fingerprint",
        "description": "SHA1 fingerprint",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Version Number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "signature_algorithm",
        "description": "Signature Algorithm",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "signature",
        "description": "Signature",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subject_key_identifier",
        "description": "Subject Key Identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "authority_key_identifier",
        "description": "Authority Key Identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key_usage",
        "description": "Usage of key in certificate",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "extended_key_usage",
        "description": "Extended usage of key in certificate",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "policies",
        "description": "Certificate Policies",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subject_alternative_names",
        "description": "Subject Alternative Name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "issuer_alternative_names",
        "description": "Issuer Alternative Name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "info_access",
        "description": "Authority Information Access",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subject_info_access",
        "description": "Subject Information Access",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "policy_mappings",
        "description": "Policy Mappings",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "has_expired",
        "description": "1 if the certificate has expired, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "basic_constraint",
        "description": "Basic Constraints",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name_constraints",
        "description": "Name Constraints",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "policy_constraints",
        "description": "Policy Constraints",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dump_certificate",
        "description": "Set this value to '1' to dump certificate",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "timeout",
        "description": "Set this value to the timeout in seconds to complete the TLS handshake (default 4s, use 0 for no timeout)",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "pem",
        "description": "Certificate PEM format",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/curl_certificate.yml"
  },
  {
    "name": "deb_packages",
    "description": "The installed DEB package database.",
    "url": "https://fleetdm.com/tables/deb_packages",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "Package name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Package version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Package source",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Package size in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "arch",
        "description": "Package architecture",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "revision",
        "description": "Package revision",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Package status",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "maintainer",
        "description": "Package maintainer",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "section",
        "description": "Package section",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "priority",
        "description": "Package priority",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "admindir",
        "description": "libdpkg admindir. Defaults to /var/lib/dpkg",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "mount_namespace_id",
        "description": "Mount namespace id",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/deb_packages.yml"
  },
  {
    "name": "default_environment",
    "description": "Default environment variables and values.",
    "url": "https://fleetdm.com/tables/default_environment",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "variable",
        "description": "Name of the environment variable",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Value of the environment variable",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "expand",
        "description": "1 if the variable needs expanding, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/default_environment.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdefault_environment.yml&value=name%3A%20default_environment%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "device_file",
    "description": "Similar to the file table, but use TSK and allow block address access.",
    "url": "https://fleetdm.com/tables/device_file",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "device",
        "description": "Absolute file path to device node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "partition",
        "description": "A partition number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "path",
        "description": "A logical path within the device node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "filename",
        "description": "Name portion of file path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inode",
        "description": "Filesystem inode number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "uid",
        "description": "Owning user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Owning group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "Permission bits",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of file in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "block_size",
        "description": "Block size of filesystem",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "atime",
        "description": "Last access time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtime",
        "description": "Last modification time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ctime",
        "description": "Creation time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hard_links",
        "description": "Number of hard links",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "File status",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/sleuthkit/device_file.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdevice_file.yml&value=name%3A%20device_file%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "device_firmware",
    "description": "A best-effort list of discovered firmware versions.",
    "url": "https://fleetdm.com/tables/device_firmware",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify the firmware version of hardware on a Mac, such as the SSD controller in this case. Older versions might indicate a problem with software updates, and this information can be useful when troubleshooting various issues.\n```\nSELECT * FROM device_firmware WHERE device='AppleANS3NVMeController';\n```",
    "columns": [
      {
        "name": "type",
        "description": "Type of device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device",
        "description": "The device name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "version",
        "description": "Firmware version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/device_firmware.yml"
  },
  {
    "name": "device_hash",
    "description": "Similar to the hash table, but use TSK and allow block address access.",
    "url": "https://fleetdm.com/tables/device_hash",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "device",
        "description": "Absolute file path to device node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "partition",
        "description": "A partition number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "inode",
        "description": "Filesystem inode number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "md5",
        "description": "MD5 hash of provided inode data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha1",
        "description": "SHA1 hash of provided inode data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha256",
        "description": "SHA256 hash of provided inode data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/sleuthkit/device_hash.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdevice_hash.yml&value=name%3A%20device_hash%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "device_partitions",
    "description": "Use TSK to enumerate details about partitions on a disk device.",
    "url": "https://fleetdm.com/tables/device_partitions",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "device",
        "description": "Absolute file path to device node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "partition",
        "description": "A partition number or description",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "label",
        "description": "",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "offset",
        "description": "",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "blocks_size",
        "description": "Byte size of each block",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "blocks",
        "description": "Number of blocks",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inodes",
        "description": "Number of meta nodes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flags",
        "description": "",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/sleuthkit/device_partitions.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdevice_partitions.yml&value=name%3A%20device_partitions%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "disk_encryption",
    "description": "Disk encryption status and information.",
    "url": "https://fleetdm.com/tables/disk_encryption",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "A policy query to check if Filevault disk encryption is enabled on a Mac.\n```\nSELECT 1 FROM disk_encryption WHERE user_uuid IS NOT '' AND filevault_status = 'on' LIMIT 1;\n```",
    "columns": [
      {
        "name": "name",
        "description": "Disk name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uuid",
        "description": "Disk Universally Unique Identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "encrypted",
        "description": "1 If encrypted: true (disk is encrypted), else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Description of cipher type and mode if available",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "encryption_status",
        "description": "Disk encryption status with one of following values: encrypted | not encrypted | undefined",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "Currently authenticated user if available",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "user_uuid",
        "description": "UUID of authenticated user if available",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "filevault_status",
        "description": "FileVault status with one of following values: on | off | unknown",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/disk_encryption.yml"
  },
  {
    "name": "disk_events",
    "description": "Track DMG disk image events (appearance/disappearance) when opened.",
    "url": "https://fleetdm.com/tables/disk_events",
    "platforms": [
      "darwin"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "examples": "This is an evented table, and as such, is more useful if you are sending osquery logs to a SIEM or other centralized destination via Fleet. Events must be enabled. This query will contain the list of all actions related to connecting and removing disks, including SMB drives and USB storage, which can be very useful for investigative purposes.\n```\nSELECT * FROM disk_events;\n```",
    "columns": [
      {
        "name": "action",
        "description": "Appear or disappear",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of the DMG file accessed",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Disk event name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device",
        "description": "Disk event BSD name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uuid",
        "description": "UUID of the volume inside DMG if available",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of partition in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ejectable",
        "description": "1 if ejectable, 0 if not",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mountable",
        "description": "1 if mountable, 0 if not",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "writable",
        "description": "1 if writable, 0 if not",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "content",
        "description": "Disk event content",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "media_name",
        "description": "Disk event media name string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor",
        "description": "Disk event vendor string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "filesystem",
        "description": "Filesystem if available",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "checksum",
        "description": "UDIF Master checksum if available (CRC32)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of appearance/disappearance in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/disk_events.yml"
  },
  {
    "name": "disk_info",
    "description": "Retrieve basic information about the physical disks of a system.",
    "url": "https://fleetdm.com/tables/disk_info",
    "platforms": [
      "windows",
      "chrome"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- On ChromeOS, this table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).\n- Available for ChromeOS 91+.",
    "examples": "```\nSELECT * FROM disk_info;\n```",
    "columns": [
      {
        "name": "partitions",
        "description": "Number of detected partitions on disk.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "disk_index",
        "description": "Physical drive number of the disk.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "type",
        "description": "The interface type of the disk.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "id",
        "description": "The unique identifier of the drive on the system.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pnp_device_id",
        "description": "The unique identifier of the drive on the system.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "disk_size",
        "description": "Size of the disk.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer",
        "description": "The manufacturer of the disk.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "hardware_model",
        "description": "Hard drive model.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "name",
        "description": "The label of the disk object.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial",
        "description": "The serial number of the disk.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "description",
        "description": "The OS's description of the disk.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/disk_info.yml"
  },
  {
    "name": "dns_cache",
    "description": "Enumerate the DNS cache using the undocumented DnsGetCacheDataTable function in dnsapi.dll.",
    "url": "https://fleetdm.com/tables/dns_cache",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "\nThis table pulls from the local system's DNS cache. By default, the local DNS cache entry for a domain will be removed once the TTL for the domain has expired. For instance, osquery.io has a TTL of 60 seconds. When this domain has been resolved on a local Windows system, the DNS mapping will expire in 60 seconds from the resolution time - so `SELECT * FROM dns_cache WHERE name = 'osquery.io'` will only return results during that 60 second window.\nWindows has a maximum time that it allows a cache entry to exist- by default, it is 1 day. If the domain has a TTL of greater than 1 day, Windows will still remove the DNS entry from its cache after 1 day.",
    "examples": "An integral part of incident response is understanding all systems that may have been compromised. To help with this, a query like the following will return positive for a system that has resolved a domain that contains `baddomain`. It's important to note that a system will only cache the DNS mapping for a limited time - see Notes below for further information. \n```\n   \n SELECT name, type FROM dns_cache WHERE name LIKE '%baddomain%';\n\n```",
    "columns": [
      {
        "name": "name",
        "description": "DNS record name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "DNS record type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flags",
        "description": "DNS record flags",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/dns_cache.yml"
  },
  {
    "name": "dns_resolvers",
    "description": "Resolvers used by this host.",
    "url": "https://fleetdm.com/tables/dns_resolvers",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify computers that are using an external DNS server instead of an internal one. This query also removes null and empty strings that can be returned by this table.\n```\nSELECT address FROM dns_resolvers WHERE type='nameserver' AND address NOT LIKE '192.168%%' AND address NOT LIKE '172.16%%' AND address NOT LIKE '172.17%%' AND address NOT LIKE '172.18%%' AND address NOT LIKE '172.19%%' AND address NOT LIKE '172.20%%' AND address NOT LIKE '172.21%%' AND address NOT LIKE '172.22%%' AND address NOT LIKE '172.23%%' AND address NOT LIKE '10.%%'  AND address NOT LIKE '127.%%' AND address IS NOT NULL AND address IS NOT ' ' AND address IS NOT ''; \n```",
    "columns": [
      {
        "name": "id",
        "description": "Address type index or order",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Address type: sortlist, nameserver, search",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "address",
        "description": "Resolver IP/IPv6 address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "netmask",
        "description": "Address (sortlist) netmask length",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "options",
        "description": "Resolver options",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/dns_resolvers.yml"
  },
  {
    "name": "docker_container_envs",
    "description": "Docker container environment variables.",
    "url": "https://fleetdm.com/tables/docker_container_envs",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "This table allows you to list environment variables for running Docker containers. This query will output the value of a variable called *MYSQL_VERSION* for example.\n```\nSELECT key, value FROM docker_container_envs WHERE key LIKE 'MYSQL_VERSION';\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "key",
        "description": "Environment variable name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Environment variable value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/docker_container_envs.yml"
  },
  {
    "name": "docker_container_fs_changes",
    "description": "Changes to files or directories on container's filesystem.",
    "url": "https://fleetdm.com/tables/docker_container_fs_changes",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_container_fs_changes where id = '11b2399e1426d906e62a0c357650e363426d6c56dbe2f35cbaa9b452250e3355'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "path",
        "description": "FIle or directory path relative to rootfs",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "change_type",
        "description": "Type of change: C:Modified, A:Added, D:Deleted",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_container_fs_changes.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_container_fs_changes.yml&value=name%3A%20docker_container_fs_changes%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_container_labels",
    "description": "Docker container labels.",
    "url": "https://fleetdm.com/tables/docker_container_labels",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "This table exposes all Docker labels on running containers. By joining it to the [docker_containers](https://fleetdm.com/tables/docker_containers)table, we can list containers and their maintainers.\n```\nSELECT dl.value, dc.name, FROM docker_container_labels dl JOIN docker_containers dc ON dl.id = dc.id WHERE key='maintainer';\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "key",
        "description": "Label key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "value",
        "description": "Optional label value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/docker_container_labels.yml"
  },
  {
    "name": "docker_container_mounts",
    "description": "Docker container mounts.",
    "url": "https://fleetdm.com/tables/docker_container_mounts",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List the source and destination of Docker bind and volume mounts.\n```\nSELECT dm.source, dm.destination, dm.mode, dc.name FROM docker_container_mounts dm JOIN docker_containers dc ON dm.id = dc.id;\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "type",
        "description": "Type of mount (bind, volume)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Optional mount name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "source",
        "description": "Source path on host",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "destination",
        "description": "Destination path inside container",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver",
        "description": "Driver providing the mount",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "Mount options (rw, ro)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rw",
        "description": "1 if read/write. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "propagation",
        "description": "Mount propagation",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/docker_container_mounts.yml"
  },
  {
    "name": "docker_container_networks",
    "description": "Docker container networks.",
    "url": "https://fleetdm.com/tables/docker_container_networks",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List the IP address of Docker containers.\n```\nSELECT dn.ip_address, dc.name FROM docker_container_networks dn JOIN docker_containers dc ON dn.id=dc.id;\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Network name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "network_id",
        "description": "Network ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "endpoint_id",
        "description": "Endpoint ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gateway",
        "description": "Gateway",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ip_address",
        "description": "IP address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ip_prefix_len",
        "description": "IP subnet prefix length",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv6_gateway",
        "description": "IPv6 gateway",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv6_address",
        "description": "IPv6 address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv6_prefix_len",
        "description": "IPv6 subnet prefix length",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mac_address",
        "description": "MAC address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/docker_container_networks.yml"
  },
  {
    "name": "docker_container_ports",
    "description": "Docker container ports.",
    "url": "https://fleetdm.com/tables/docker_container_ports",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify the ports exposed at the host level and see which containers they redirect traffic to.\n```\nSELECT dc.name, dp.type, dp.port, dp.host_ip, dp.host_port FROM docker_container_ports dp JOIN docker_containers dc ON dp.id=dc.id WHERE dp.host_port !='0';\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Protocol (tcp, udp)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "port",
        "description": "Port inside the container",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "host_ip",
        "description": "Host IP address on which public port is listening",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "host_port",
        "description": "Host port",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/docker_container_ports.yml"
  },
  {
    "name": "docker_container_processes",
    "description": "Docker container processes.",
    "url": "https://fleetdm.com/tables/docker_container_processes",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_container_processes where id = '11b2399e1426d906e62a0c357650e363426d6c56dbe2f35cbaa9b452250e3355'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "pid",
        "description": "Process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "The process path or shorthand argv[0]",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cmdline",
        "description": "Complete argv",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "Process state",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "User ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "euid",
        "description": "Effective user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "egid",
        "description": "Effective group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "suid",
        "description": "Saved user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sgid",
        "description": "Saved group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "wired_size",
        "description": "Bytes of unpageable memory used by process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "resident_size",
        "description": "Bytes of private memory used by process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "total_size",
        "description": "Total virtual memory size",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "start_time",
        "description": "Process start in seconds since boot (non-sleeping)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Process parent's PID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pgroup",
        "description": "Process group",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "threads",
        "description": "Number of threads used by process",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "nice",
        "description": "Process nice level (-20 to 20, default 0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user",
        "description": "User name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Cumulative CPU time. [DD-]HH:MM:SS format",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu",
        "description": "CPU utilization as percentage",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mem",
        "description": "Memory utilization as percentage",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_container_processes.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_container_processes.yml&value=name%3A%20docker_container_processes%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_container_stats",
    "description": "Docker container statistics. Queries on this table take at least one second.",
    "url": "https://fleetdm.com/tables/docker_container_stats",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_container_stats where id = 'de8cfdc74c850967fd3832e128f4d12e2d5476a4aea282734bfb7e57f66fce2f'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "name",
        "description": "Container name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "pids",
        "description": "Number of processes",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "read",
        "description": "UNIX time when stats were read",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "preread",
        "description": "UNIX time when stats were last read",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "interval",
        "description": "Difference between read and preread in nano-seconds",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "disk_read",
        "description": "Total disk read bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "disk_write",
        "description": "Total disk write bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "num_procs",
        "description": "Number of processors",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_total_usage",
        "description": "Total CPU usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_kernelmode_usage",
        "description": "CPU kernel mode usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_usermode_usage",
        "description": "CPU user mode usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "system_cpu_usage",
        "description": "CPU system usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "online_cpus",
        "description": "Online CPUs",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pre_cpu_total_usage",
        "description": "Last read total CPU usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pre_cpu_kernelmode_usage",
        "description": "Last read CPU kernel mode usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pre_cpu_usermode_usage",
        "description": "Last read CPU user mode usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pre_system_cpu_usage",
        "description": "Last read CPU system usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pre_online_cpus",
        "description": "Last read online CPUs",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_usage",
        "description": "Memory usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_cached",
        "description": "Memory cached",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_max_usage",
        "description": "Memory maximum usage",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_limit",
        "description": "Memory limit",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "network_rx_bytes",
        "description": "Total network bytes read",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "network_tx_bytes",
        "description": "Total network bytes transmitted",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_container_stats.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_container_stats.yml&value=name%3A%20docker_container_stats%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_containers",
    "description": "Docker containers information.",
    "url": "https://fleetdm.com/tables/docker_containers",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify containers that are running with high privileges.\n```\nSELECT state, status, image, image_id FROM docker_containers WHERE privileged='1';\n```",
    "columns": [
      {
        "name": "id",
        "description": "Container ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Container name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "image",
        "description": "Docker image (name) used to launch this container",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "image_id",
        "description": "Docker image ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "command",
        "description": "Command with arguments",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created",
        "description": "Time of creation as UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "Container state (created, restarting, running, removing, paused, exited, dead)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Container status information",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Identifier of the initial process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Container path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "config_entrypoint",
        "description": "Container entrypoint(s)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "started_at",
        "description": "Container start time as string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "finished_at",
        "description": "Container finish time as string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "privileged",
        "description": "Is the container [privileged](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "security_options",
        "description": "List of container security options",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "env_variables",
        "description": "Container environmental variables",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "readonly_rootfs",
        "description": "Is the root filesystem mounted as read only",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cgroup_namespace",
        "description": "cgroup namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "ipc_namespace",
        "description": "IPC namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "mnt_namespace",
        "description": "Mount namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "net_namespace",
        "description": "Network namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "pid_namespace",
        "description": "PID namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "user_namespace",
        "description": "User namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "uts_namespace",
        "description": "UTS namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/docker_containers.yml"
  },
  {
    "name": "docker_image_history",
    "description": "Docker image history information.",
    "url": "https://fleetdm.com/tables/docker_image_history",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_image_history where id = '6a2f32de169d14e6f8a84538eaa28f2629872d7d4f580a303b296c60db36fbd7'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Image ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "created",
        "description": "Time of creation as UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of instruction in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created_by",
        "description": "Created by instruction",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tags",
        "description": "Comma-separated list of tags",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "comment",
        "description": "Instruction comment",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_image_history.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_image_history.yml&value=name%3A%20docker_image_history%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_image_labels",
    "description": "Docker image labels.",
    "url": "https://fleetdm.com/tables/docker_image_labels",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_image_labels where id = '11b2399e1426d906e62a0c357650e363426d6c56dbe2f35cbaa9b452250e3355'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Image ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "key",
        "description": "Label key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Optional label value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_image_labels.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_image_labels.yml&value=name%3A%20docker_image_labels%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_image_layers",
    "description": "Docker image layers information.",
    "url": "https://fleetdm.com/tables/docker_image_layers",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_images where id = '6a2f32de169d14e6f8a84538eaa28f2629872d7d4f580a303b296c60db36fbd7'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Image ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "layer_id",
        "description": "Layer ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "layer_order",
        "description": "Layer Order (1 = base layer)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_image_layers.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_image_layers.yml&value=name%3A%20docker_image_layers%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_images",
    "description": "Docker images information.",
    "url": "https://fleetdm.com/tables/docker_images",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See how much storage is used by Docker images. Requires Docker to be running.\n```\nSELECT ROUND(SUM(size_bytes * 10e-10),2) as gigabytes_of_images FROM docker_images; \n```",
    "columns": [
      {
        "name": "id",
        "description": "Image ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created",
        "description": "Time of creation as UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size_bytes",
        "description": "Size of image in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tags",
        "description": "Comma-separated list of repository tags",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/docker_images.yml"
  },
  {
    "name": "docker_info",
    "description": "Docker system information.",
    "url": "https://fleetdm.com/tables/docker_info",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "```\nselect * from docker_info\n```",
    "columns": [
      {
        "name": "id",
        "description": "Docker system ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "containers",
        "description": "Total number of containers",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "containers_running",
        "description": "Number of containers currently running",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "containers_paused",
        "description": "Number of containers in paused state",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "containers_stopped",
        "description": "Number of containers in stopped state",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "images",
        "description": "Number of images",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "storage_driver",
        "description": "Storage driver",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_limit",
        "description": "1 if memory limit support is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "swap_limit",
        "description": "1 if swap limit support is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "kernel_memory",
        "description": "1 if kernel memory limit support is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_cfs_period",
        "description": "1 if CPU Completely Fair Scheduler (CFS) period support is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_cfs_quota",
        "description": "1 if CPU Completely Fair Scheduler (CFS) quota support is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_shares",
        "description": "1 if CPU share weighting support is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_set",
        "description": "1 if CPU set selection support is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv4_forwarding",
        "description": "1 if IPv4 forwarding is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bridge_nf_iptables",
        "description": "1 if bridge netfilter iptables is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bridge_nf_ip6tables",
        "description": "1 if bridge netfilter ip6tables is enabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "oom_kill_disable",
        "description": "1 if Out-of-memory kill is disabled. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logging_driver",
        "description": "Logging driver",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cgroup_driver",
        "description": "Control groups driver",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "kernel_version",
        "description": "Kernel version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "os",
        "description": "Operating system",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "os_type",
        "description": "Operating system type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "architecture",
        "description": "Hardware architecture",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpus",
        "description": "Number of CPUs",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory",
        "description": "Total memory",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "http_proxy",
        "description": "HTTP proxy",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "https_proxy",
        "description": "HTTPS proxy",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "no_proxy",
        "description": "Comma-separated list of domain extensions proxy should not be used for",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Name of the docker host",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "server_version",
        "description": "Server version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "root_dir",
        "description": "Docker root directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_info.yml&value=name%3A%20docker_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_network_labels",
    "description": "Docker network labels.",
    "url": "https://fleetdm.com/tables/docker_network_labels",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_network_labels where id = '11b2399e1426d906e62a0c357650e363426d6c56dbe2f35cbaa9b452250e3355'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Network ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "key",
        "description": "Label key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Optional label value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_network_labels.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_network_labels.yml&value=name%3A%20docker_network_labels%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_networks",
    "description": "Docker networks information.",
    "url": "https://fleetdm.com/tables/docker_networks",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_networks where id = 'cfd2ffd494395b75d77539761df40cde06a2b6b497e0c9c1adc6c5a79539bfad'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Network ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Network name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver",
        "description": "Network driver",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created",
        "description": "Time of creation as UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enable_ipv6",
        "description": "1 if IPv6 is enabled on this network. 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subnet",
        "description": "Network subnet",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gateway",
        "description": "Network gateway",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_networks.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_networks.yml&value=name%3A%20docker_networks%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_version",
    "description": "Docker version information.",
    "url": "https://fleetdm.com/tables/docker_version",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "```\nselect version from docker_version\n```",
    "columns": [
      {
        "name": "version",
        "description": "Docker version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "api_version",
        "description": "API version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "min_api_version",
        "description": "Minimum API version supported",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "git_commit",
        "description": "Docker build git commit",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "go_version",
        "description": "Go version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "os",
        "description": "Operating system",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "arch",
        "description": "Hardware architecture",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "kernel_version",
        "description": "Kernel version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "build_time",
        "description": "Build time",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_version.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_version.yml&value=name%3A%20docker_version%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_volume_labels",
    "description": "Docker volume labels.",
    "url": "https://fleetdm.com/tables/docker_volume_labels",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_volume_labels where name = 'btrfs'\n```",
    "columns": [
      {
        "name": "name",
        "description": "Volume name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "key",
        "description": "Label key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "value",
        "description": "Optional label value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/docker_volume_labels.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdocker_volume_labels.yml&value=name%3A%20docker_volume_labels%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "docker_volumes",
    "description": "Docker volumes information.",
    "url": "https://fleetdm.com/tables/docker_volumes",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from docker_volumes where name = 'btrfs'\n```",
    "columns": [
      {
        "name": "name",
        "description": "Volume name from `docker volume ls`",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "driver",
        "description": "Volume driver",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mount_point",
        "description": "Mount point",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Volume type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/docker_volumes.yml"
  },
  {
    "name": "drivers",
    "description": "Details for in-use Windows device drivers. This does not display installed but unused drivers.",
    "url": "https://fleetdm.com/tables/drivers",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from drivers\n```",
    "columns": [
      {
        "name": "device_id",
        "description": "Device ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device_name",
        "description": "Device name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "image",
        "description": "Path to driver image file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Driver description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "service",
        "description": "Driver service name, if one exists",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "service_key",
        "description": "Driver service registry key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Driver version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inf",
        "description": "Associated inf file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "Device/driver class name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "provider",
        "description": "Driver provider",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer",
        "description": "Device manufacturer",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver_key",
        "description": "Driver key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "date",
        "description": "Driver date",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "signed",
        "description": "Whether the driver is signed or not",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/drivers.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fdrivers.yml&value=name%3A%20drivers%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "dscl",
    "platforms": [
      "darwin"
    ],
    "description": "Returns the output of the `dscl . -read` command (local domain).",
    "columns": [
      {
        "name": "command",
        "type": "text",
        "required": true,
        "description": "The dscl command to execute, only \"read\" is currently supported."
      },
      {
        "name": "path",
        "type": "text",
        "required": true,
        "description": "The path to use in the read command."
      },
      {
        "name": "key",
        "type": "text",
        "required": true,
        "description": "The key to query on the read command and path."
      },
      {
        "name": "value",
        "type": "text",
        "required": false,
        "description": "The value of the read path and key. The value is the empty string if the key doesn't exist."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/dscl",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/dscl.yml"
  },
  {
    "name": "ec2_instance_metadata",
    "description": "EC2 instance metadata.",
    "url": "https://fleetdm.com/tables/ec2_instance_metadata",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "```\nselect * from ec2_instance_metadata\n```",
    "columns": [
      {
        "name": "instance_id",
        "description": "EC2 instance ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "instance_type",
        "description": "EC2 instance type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "architecture",
        "description": "Hardware architecture of this EC2 instance",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "region",
        "description": "AWS region in which this instance launched",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "availability_zone",
        "description": "Availability zone in which this instance launched",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_hostname",
        "description": "Private IPv4 DNS hostname of the first interface of this instance",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_ipv4",
        "description": "Private IPv4 address of the first interface of this instance",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mac",
        "description": "MAC address for the first network interface of this EC2 instance",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "security_groups",
        "description": "Comma separated list of security group names",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "iam_arn",
        "description": "If there is an IAM role associated with the instance, contains instance profile ARN",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ami_id",
        "description": "AMI ID used to launch this EC2 instance",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "reservation_id",
        "description": "ID of the reservation",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "account_id",
        "description": "AWS account ID which owns this EC2 instance",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ssh_public_key",
        "description": "SSH public key. Only available if supplied at instance launch time",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/ec2_instance_metadata.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fec2_instance_metadata.yml&value=name%3A%20ec2_instance_metadata%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "ec2_instance_tags",
    "description": "EC2 instance tag key value pairs.",
    "url": "https://fleetdm.com/tables/ec2_instance_tags",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "```\nselect * from ec2_instance_tags\n```",
    "columns": [
      {
        "name": "instance_id",
        "description": "EC2 instance ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key",
        "description": "Tag key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Tag value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/ec2_instance_tags.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fec2_instance_tags.yml&value=name%3A%20ec2_instance_tags%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "es_process_events",
    "description": "Process execution events from EndpointSecurity.",
    "url": "https://fleetdm.com/tables/es_process_events",
    "platforms": [
      "darwin"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "version",
        "description": "Version of EndpointSecurity event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "seq_num",
        "description": "Per event sequence number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "global_seq_num",
        "description": "Global sequence number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of executed file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Parent process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "original_parent",
        "description": "Original parent process ID in case of reparenting",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cmdline",
        "description": "Command line arguments (argv)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cmdline_count",
        "description": "Number of command line arguments",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "env",
        "description": "Environment variables delimited by spaces",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "env_count",
        "description": "Number of environment variables",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cwd",
        "description": "The process current working directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "User ID of the process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "euid",
        "description": "Effective User ID of the process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Group ID of the process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "egid",
        "description": "Effective Group ID of the process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "Username",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "signing_id",
        "description": "Signature identifier of the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "team_id",
        "description": "Team identifier of the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cdhash",
        "description": "Codesigning hash of the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "platform_binary",
        "description": "Indicates if the binary is Apple signed binary (1) or not (0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exit_code",
        "description": "Exit code of a process in case of an exit event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "child_pid",
        "description": "Process ID of a child process in case of a fork event",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "event_type",
        "description": "Type of EndpointSecurity event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "codesigning_flags",
        "description": "Codesigning flags matching one of these options, in a comma separated list: NOT_VALID, ADHOC, NOT_RUNTIME, INSTALLER. See kern/cs_blobs.h in XNU for descriptions.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/es_process_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fes_process_events.yml&value=name%3A%20es_process_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "es_process_file_events",
    "description": "File integrity monitoring events from EndpointSecurity including process context.",
    "url": "https://fleetdm.com/tables/es_process_file_events",
    "platforms": [
      "darwin"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "version",
        "description": "Version of EndpointSecurity event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "seq_num",
        "description": "Per event sequence number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "global_seq_num",
        "description": "Global sequence number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Parent process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of executed file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "filename",
        "description": "The source or target filename for the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dest_filename",
        "description": "Destination filename for the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "event_type",
        "description": "Type of EndpointSecurity event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/es_process_file_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fes_process_file_events.yml&value=name%3A%20es_process_file_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "etc_hosts",
    "description": "Line-parsed /etc/hosts.",
    "url": "https://fleetdm.com/tables/etc_hosts",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Identify host\"name\"s pointed to IP addresses using the hosts file. This technique is often abused by malware, but can also indicate services that do not have proper DNS configuration to be reached from workstations.\n```\nSELECT * FROM etc_hosts WHERE address!='127.0.0.1' AND address!='::1' AND address!='255.255.255.255';\n```",
    "columns": [
      {
        "name": "address",
        "description": "IP address mapping",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hostnames",
        "description": "Raw hosts mapping",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/etc_hosts.yml"
  },
  {
    "name": "etc_protocols",
    "description": "Line-parsed /etc/protocols.",
    "url": "https://fleetdm.com/tables/etc_protocols",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "Protocol name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "number",
        "description": "Protocol number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "alias",
        "description": "Protocol alias",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "comment",
        "description": "Comment with protocol description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/etc_protocols.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fetc_protocols.yml&value=name%3A%20etc_protocols%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "etc_services",
    "description": "Line-parsed /etc/services.",
    "url": "https://fleetdm.com/tables/etc_services",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Identify the TCP and UDP ports associated to standard services.\n```\nSELECT * FROM etc_services WHERE name='ftp';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Service name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "port",
        "description": "Service port number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protocol",
        "description": "Transport protocol (TCP/UDP)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "aliases",
        "description": "Optional space separated list of other names for a service",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "comment",
        "description": "Optional comment for a service.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/etc_services.yml"
  },
  {
    "name": "event_taps",
    "description": "Returns information about installed event taps.",
    "url": "https://fleetdm.com/tables/event_taps",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify processes that have a tap into the system, such as access to keystrokes, and view details on the executable including signature status, team identifier if signed and the authority that emitted the signing certificate. This can be used to detect keyloggers and other malicious applications.\n```\nSELECT t.event_tapped, s.identifier, s.signed, s.team_identifier, s.authority FROM event_taps t JOIN processes p ON p.pid = t.tapping_process JOIN signature s on s.path = p.path WHERE s.identifier !='com.apple.ViewBridgeAuxiliary' AND s.identifier !='com.apple.universalaccessd' AND s.identifier !='com.apple.accessibility.AXVisualSupportAgent';\n```",
    "columns": [
      {
        "name": "enabled",
        "description": "Is the Event Tap enabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "event_tap_id",
        "description": "Unique ID for the Tap",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "event_tapped",
        "description": "The mask that identifies the set of events to be observed.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "process_being_tapped",
        "description": "The process ID of the target application",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tapping_process",
        "description": "The process ID of the application that created the event tap.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/event_taps.yml"
  },
  {
    "name": "extended_attributes",
    "description": "Returns the extended attributes for files (similar to Windows ADS).",
    "url": "https://fleetdm.com/tables/extended_attributes",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "path",
        "description": "Absolute file path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "directory",
        "description": "Directory of file(s)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "key",
        "description": "Name of the value generated from the extended attribute",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "The parsed information from the attribute",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "base64",
        "description": "1 if the value is base64 encoded else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/extended_attributes.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fextended_attributes.yml&value=name%3A%20extended_attributes%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "falcon_kernel_check",
    "description": "Get information about Crowdstrike Falcon agent installed on the host.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "linux"
    ],
    "columns": [
      {
        "name": "kernel",
        "description": "Version of the host's kernel.",
        "type": "text",
        "required": false
      },
      {
        "name": "supported",
        "description": "Whether or not the host's kernel supports the Crowdstrike Falcon sensor version.",
        "type": "text",
        "required": false
      },
      {
        "name": "sensor_version",
        "description": "Version of the Crowdstrike Falcon's sensor.",
        "type": "text",
        "required": false
      }
    ],
    "url": "https://fleetdm.com/tables/falcon_kernel_check",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/falcon_kernel_check.yml"
  },
  {
    "name": "falconctl_options",
    "description": "Get information about Crowdstrike Falcon agent installed on the host.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "linux"
    ],
    "columns": [
      {
        "name": "options",
        "description": "The falconctol options to run. Supported values are listed here: `--aid`, `--apd`,`--aph`, `--app`, `--cid`, `--feature`, `--metadata-query`, `--rfm-reason`,`--rfm-state`, `--tags`, `--version`",
        "type": "text",
        "required": true
      }
    ],
    "url": "https://fleetdm.com/tables/falconctl_options",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/falconctl_options.yml"
  },
  {
    "name": "fan_speed_sensors",
    "description": "Fan speeds.",
    "url": "https://fleetdm.com/tables/fan_speed_sensors",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "fan",
        "description": "Fan number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Fan name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "actual",
        "description": "Actual speed",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "min",
        "description": "Minimum speed",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max",
        "description": "Maximum speed",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "target",
        "description": "Target speed",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/fan_speed_sensors.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Ffan_speed_sensors.yml&value=name%3A%20fan_speed_sensors%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "file",
    "description": "Interactive filesystem attributes and metadata.",
    "url": "https://fleetdm.com/tables/file",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List zip files in the downloads folder as well as their associated sha256 hash.\n```\nSELECT f.path, h.sha256 FROM file f JOIN hash h ON f.path = h.path WHERE f.path LIKE '/Users/%/Downloads/%%.zip';\n```",
    "columns": [
      {
        "name": "path",
        "description": "Absolute file path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "directory",
        "description": "Directory of file(s)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "filename",
        "description": "Name portion of file path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inode",
        "description": "Filesystem inode number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "Owning user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Owning group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "Permission bits",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device",
        "description": "Device ID (optional)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of file in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "block_size",
        "description": "Block size of filesystem",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "atime",
        "description": "Last access time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtime",
        "description": "Last modification time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ctime",
        "description": "Last status change time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "btime",
        "description": "(B)irth or (cr)eate time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hard_links",
        "description": "Number of hard links",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "symlink",
        "description": "1 if the path is a symlink, otherwise 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "File status",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "attributes",
        "description": "File attrib string. See: https://ss64.com/nt/attrib.html",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "volume_serial",
        "description": "Volume serial number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "file_id",
        "description": "file ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "file_version",
        "description": "File version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "product_version",
        "description": "File product version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "original_filename",
        "description": "(Executable files only) Original filename",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "shortcut_target_path",
        "description": "Full path to the file the shortcut points to",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "windows",
          "win32",
          "cygwin"
        ]
      },
      {
        "name": "shortcut_target_type",
        "description": "Display name for the target type",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "windows",
          "win32",
          "cygwin"
        ]
      },
      {
        "name": "shortcut_target_location",
        "description": "Folder name where the shortcut target resides",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "windows",
          "win32",
          "cygwin"
        ]
      },
      {
        "name": "shortcut_start_in",
        "description": "Full path to the working directory to use when executing the shortcut target",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "windows",
          "win32",
          "cygwin"
        ]
      },
      {
        "name": "shortcut_run",
        "description": "Window mode the target of the shortcut should be run in",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "windows",
          "win32",
          "cygwin"
        ]
      },
      {
        "name": "shortcut_comment",
        "description": "Comment on the shortcut",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "windows",
          "win32",
          "cygwin"
        ]
      },
      {
        "name": "bsd_flags",
        "description": "The BSD file flags (chflags). Possible values: NODUMP, UF_IMMUTABLE, UF_APPEND, OPAQUE, HIDDEN, ARCHIVED, SF_IMMUTABLE, SF_APPEND",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "mount_namespace_id",
        "description": "Mount namespace id",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/file.yml"
  },
  {
    "name": "file_events",
    "description": "Track time/action changes to files specified in configuration data.",
    "url": "https://fleetdm.com/tables/file_events",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "target_path",
        "description": "The path associated with the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "category",
        "description": "The category of the file defined in the config",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "action",
        "description": "Change action (UPDATE, REMOVE, etc)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "transaction_id",
        "description": "ID used during bulk update",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inode",
        "description": "Filesystem inode number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "Owning user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Owning group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "Permission bits",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of file in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "atime",
        "description": "Last access time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtime",
        "description": "Last modification time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ctime",
        "description": "Last status change time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "md5",
        "description": "The MD5 of the file after change",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha1",
        "description": "The SHA1 of the file after change",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha256",
        "description": "The SHA256 of the file after change",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hashed",
        "description": "1 if the file was hashed, 0 if not, -1 if hashing failed",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of file event",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/file_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Ffile_events.yml&value=name%3A%20file_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "file_lines",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Allows reading an arbitrary file.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "examples": "Output the content of `/etc/hosts` line by line. \n```\nSELECT * FROM file_lines WHERE path='/etc/hosts';\n```",
    "columns": [
      {
        "name": "path",
        "description": "Path of the file to read.",
        "required": true,
        "type": "text"
      },
      {
        "name": "line",
        "description": "Output of the file, line by line.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/file_lines",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/file_lines.yml"
  },
  {
    "name": "filevault_prk",
    "platforms": [
      "darwin"
    ],
    "description": "Returns contents of `/var/db/FileVaultPRK.dat`.",
    "columns": [
      {
        "name": "base64_encrypted",
        "type": "text",
        "required": false,
        "description": "The base64-encoded contents of the encrypted FileVault personal recovery key stored at `/var/db/FileVaultPRK.dat` (see also https://developer.apple.com/documentation/devicemanagement/fderecoverykeyescrow)"
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/filevault_prk",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/filevault_prk.yml"
  },
  {
    "name": "filevault_status",
    "description": "Get current FileVault status.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "darwin"
    ],
    "columns": [
      {
        "name": "status",
        "description": "FileVault status.",
        "type": "text",
        "required": false
      }
    ],
    "url": "https://fleetdm.com/tables/filevault_status",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/filevault_status.yml"
  },
  {
    "name": "filevault_users",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Information on the users able to unlock the current boot volume if protected with FileVault.",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "examples": "List the usernames able to unlock and boot a computer protected by FileVault, joined to [users.username](http://fleetdm.com/tables/users) to obtain the description of the operating system account that owns it.\n```\nSELECT fu.username, u.description FROM filevault_users fu JOIN users u ON fu.uuid=u.uuid;\n```",
    "columns": [
      {
        "name": "username",
        "description": "Username of the FileVault user.",
        "required": false,
        "type": "text"
      },
      {
        "name": "uuid",
        "description": "UUID of the FileVault user, which can be joined to [users.uuid](http://fleetdm.com/tables/users).",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/filevault_users",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/filevault_users.yml"
  },
  {
    "name": "find_cmd",
    "platforms": [
      "darwin"
    ],
    "description": "Uses the /usr/bin/find command to list files and directories.",
    "columns": [
      {
        "name": "directory",
        "type": "text",
        "required": true,
        "description": "The directory passed to find as first argument."
      },
      {
        "name": "type",
        "type": "text",
        "required": false,
        "description": "Sets the value of the `-type` flag."
      },
      {
        "name": "perm",
        "type": "text",
        "required": false,
        "description": "Sets the value of the `-perm` flag."
      },
      {
        "name": "path",
        "type": "text",
        "required": false,
        "description": "Contains the found paths."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd installers can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/find_cmd",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/find_cmd.yml"
  },
  {
    "name": "firefox_addons",
    "description": "Firefox browser [add-ons](https://addons.mozilla.org/en-US/firefox/) (plugins).",
    "url": "https://fleetdm.com/tables/firefox_addons",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN firefox_addons USING (uid);\n```\nSee Firefox extensions by user as well as information about their creator and automatic update status.\n```\nSELECT u.username, f.identifier, f.creator, f.description, f.version, f.autoupdate FROM users u CROSS JOIN firefox_addons f USING (uid) WHERE f.active='1';\n```",
    "columns": [
      {
        "name": "uid",
        "description": "The local user that owns the addon",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Addon display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "identifier",
        "description": "Addon identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "creator",
        "description": "Addon-supported creator string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Extension, addon, webapp",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Addon-supplied version string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Addon-supplied description string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source_url",
        "description": "URL that installed the addon",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "visible",
        "description": "1 If the addon is shown in browser else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "active",
        "description": "1 If the addon is active else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "disabled",
        "description": "1 If the addon is application-disabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "autoupdate",
        "description": "1 If the addon applies background updates else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "location",
        "description": "Global, profile location",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to plugin bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/firefox_addons.yml"
  },
  {
    "name": "firefox_preferences",
    "description": "Get the filepath where the host's Firefox preferences live.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "darwin"
    ],
    "columns": [
      {
        "name": "path",
        "description": "The path to the host's Firefox preferences.",
        "type": "text",
        "required": true
      },
      {
        "name": "key",
        "description": "A specific item that describes the path.",
        "type": "text",
        "required": false
      },
      {
        "name": "value",
        "description": "The value for the specified key.",
        "type": "text",
        "required": false
      },
      {
        "name": "fullkey",
        "description": "The expanded name of the specific item that describes the path.",
        "type": "text",
        "required": false
      },
      {
        "name": "parent",
        "description": "The key's parent.",
        "type": "text",
        "required": false
      },
      {
        "name": "query",
        "description": "The query is printed in this column. For example the SQL `SELECT * FROM firefox_preferences WHERE path = 'testdata/prefs.js'` will print \"*\" in the query column.",
        "type": "text",
        "required": false
      }
    ],
    "url": "https://fleetdm.com/tables/firefox_preferences",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/firefox_preferences.yml"
  },
  {
    "name": "firmware_eficheck_integrity_check",
    "platforms": [
      "darwin"
    ],
    "description": "Performs eficheck's integrity check on macOS Intel T1 chips (CIS 5.9).",
    "columns": [
      {
        "name": "chip",
        "type": "text",
        "required": false,
        "description": "Contains the chip type, values are \"apple\", \"intel-t1\" and \"intel-t2\". If chip type is \"apple\" or \"intel-t2\" then no eficheck integrity check is executed."
      },
      {
        "name": "output",
        "type": "text",
        "required": false,
        "description": "Output of the `/usr/libexec/firmwarecheckers/eficheck/eficheck --integrity-check` command. This value is only valid when chip is \"intel-t1\"."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/firmware_eficheck_integrity_check",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/firmware_eficheck_integrity_check.yml"
  },
  {
    "name": "firmwarepasswd",
    "description": "Information on the device's firmware password. Supported on Intel macOS hosts only. Reference: https://support.apple.com/en-us/HT204455",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "darwin"
    ],
    "columns": [
      {
        "name": "option_roms_allowed",
        "description": "Whether or not option ROMs are allowed.",
        "required": false,
        "type": "text"
      },
      {
        "name": "password_enabled",
        "description": "Whether or not the host has a firmware password.",
        "required": false,
        "type": "text"
      },
      {
        "name": "mode",
        "description": "Host's mode setting.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/firmwarepasswd",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/firmwarepasswd.yml"
  },
  {
    "name": "gatekeeper",
    "description": "macOS Gatekeeper Details.",
    "url": "https://fleetdm.com/tables/gatekeeper",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Policy query to check that Gatekeeper is enabled\n```\nSELECT 1 FROM gatekeeper WHERE assessments_enabled = 1;\n```",
    "columns": [
      {
        "name": "assessments_enabled",
        "description": "1 If a Gatekeeper is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dev_id_enabled",
        "description": "1 If a Gatekeeper allows execution from identified developers else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Version of Gatekeeper's gke.bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "opaque_version",
        "description": "Version of Gatekeeper's gkopaque.bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/gatekeeper.yml"
  },
  {
    "name": "gatekeeper_approved_apps",
    "description": "Gatekeeper apps a user has allowed to run.",
    "url": "https://fleetdm.com/tables/gatekeeper_approved_apps",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "path",
        "description": "Path of executable allowed to run",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "requirement",
        "description": "Code signing requirement language",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ctime",
        "description": "Last change time",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtime",
        "description": "Last modification time",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/gatekeeper_approved_apps.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fgatekeeper_approved_apps.yml&value=name%3A%20gatekeeper_approved_apps%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "geolocation",
    "evented": false,
    "platforms": [
      "chrome"
    ],
    "description": "Last reported geolocation",
    "columns": [
      {
        "name": "ip",
        "type": "text",
        "required": false,
        "description": "IP address"
      },
      {
        "name": "city",
        "type": "text",
        "required": false,
        "description": "City"
      },
      {
        "name": "country",
        "type": "text",
        "required": false,
        "description": "Country"
      },
      {
        "name": "region",
        "type": "text",
        "required": false,
        "description": "Region"
      }
    ],
    "notes": "- This table is not a core osquery table. This table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).",
    "url": "https://fleetdm.com/tables/geolocation",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/geolocation.yml"
  },
  {
    "name": "google_chrome_profiles",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Profiles configured in Google Chrome.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "examples": "List the Google Chrome accounts logged in to with `fleetdm.com` email addresses, joined to the [users](https://fleetdm.com/tables/users) table, to see the description of the operating system account that owns it.\n```\nSELECT gp.email, gp.username, u.description FROM google_chrome_profiles gp JOIN users u ON gp.username=u.username WHERE gp.email LIKE '%fleetdm.com';\n```",
    "columns": [
      {
        "name": "email",
        "description": "Email address linked to the Google account this profile uses, if any.",
        "required": false,
        "type": "text"
      },
      {
        "name": "ephemeral",
        "description": "Boolean indicating if the profile is ephemeral or not.",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "name",
        "description": "Name of the Chrome profile.",
        "required": false,
        "type": "text"
      },
      {
        "name": "username",
        "description": "Operating system level username of the account where this profile is located.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/google_chrome_profiles",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/google_chrome_profiles.yml"
  },
  {
    "name": "groups",
    "description": "Local system groups.",
    "url": "https://fleetdm.com/tables/groups",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "* On Windows, `gid` and `gid_signed` are always the same",
    "examples": "See all groups with the IsHidden OpenDirectory attribute\n```\nSELECT * FROM groups WHERE is_hidden='1';\n```",
    "columns": [
      {
        "name": "gid",
        "description": "Unsigned int64 group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "gid_signed",
        "description": "A signed int64 version of gid",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "groupname",
        "description": "Canonical local group name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "group_sid",
        "description": "Unique group ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "comment",
        "description": "Remarks or comments associated with the group",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "is_hidden",
        "description": "IsHidden attribute set in OpenDirectory",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/groups.yml"
  },
  {
    "name": "hardware_events",
    "description": "Hardware (PCI/USB/HID) events from UDEV or IOKit.",
    "url": "https://fleetdm.com/tables/hardware_events",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "action",
        "description": "Remove, insert, change properties, etc",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Local device path assigned (optional)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of hardware and hardware event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver",
        "description": "Driver claiming the device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor",
        "description": "Hardware device vendor",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor_id",
        "description": "Hex encoded Hardware vendor identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model",
        "description": "Hardware device model",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model_id",
        "description": "Hex encoded Hardware model identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial",
        "description": "Device serial (optional)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "revision",
        "description": "Device revision (optional)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of hardware event",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/hardware_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fhardware_events.yml&value=name%3A%20hardware_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "hash",
    "description": "Filesystem hash data.",
    "url": "https://fleetdm.com/tables/hash",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List zip files in the downloads folder as well as their associated sha256 hash.\n```\nSELECT f.path, h.sha256 FROM file f JOIN hash h ON f.path = h.path WHERE f.path LIKE '/Users/%/Downloads/%%.zip';\n```",
    "columns": [
      {
        "name": "path",
        "description": "Must provide a path or directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "directory",
        "description": "Must provide a path or directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "md5",
        "description": "MD5 hash of provided filesystem data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha1",
        "description": "SHA1 hash of provided filesystem data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha256",
        "description": "SHA256 hash of provided filesystem data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "mount_namespace_id",
        "description": "Mount namespace id",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/hash.yml"
  },
  {
    "name": "homebrew_packages",
    "description": "The installed homebrew package database.",
    "url": "https://fleetdm.com/tables/homebrew_packages",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Check the version of a package installed via homebrew. This example checks the version of ffmeg, which should be replaced by the actual package you want to check for. This is useful for finding problematic or vulnerable installs, though Fleet will detect vulnerable packages automatically.\n```\nSELECT version FROM homebrew_packages WHERE name = 'ffmpeg';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Package name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Package install path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Current 'linked' version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "prefix",
        "description": "Homebrew install prefix",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/homebrew_packages.yml"
  },
  {
    "name": "hvci_status",
    "description": "Retrieve HVCI info of the machine.",
    "url": "https://fleetdm.com/tables/hvci_status",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "version",
        "description": "The version number of the Device Guard build.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "instance_identifier",
        "description": "The instance ID of Device Guard.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vbs_status",
        "description": "The status of the virtualization based security settings. Returns UNKNOWN if an error is encountered.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "code_integrity_policy_enforcement_status",
        "description": "The status of the code integrity policy enforcement settings. Returns UNKNOWN if an error is encountered.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "umci_policy_status",
        "description": "The status of the User Mode Code Integrity security settings. Returns UNKNOWN if an error is encountered.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/hvci_status.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fhvci_status.yml&value=name%3A%20hvci_status%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "ibridge_info",
    "description": "Information about the Apple iBridge hardware controller.",
    "url": "https://fleetdm.com/tables/ibridge_info",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "columns": [
      {
        "name": "boot_uuid",
        "description": "Boot UUID of the iBridge controller",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "coprocessor_version",
        "description": "The manufacturer and chip version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "firmware_version",
        "description": "The build version of the firmware",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "unique_chip_id",
        "description": "Unique id of the iBridge controller",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/ibridge_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fibridge_info.yml&value=name%3A%20ibridge_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "icloud_private_relay",
    "platforms": [
      "darwin"
    ],
    "description": "Whether [iCloud Private Relay](https://support.apple.com/en-us/HT212614) is enabled.",
    "columns": [
      {
        "name": "status",
        "type": "integer",
        "required": false,
        "description": "whether iCloud Private Relay is on or off. 1 is on. 0 is off."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/icloud_private_relay",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/icloud_private_relay.yml"
  },
  {
    "name": "ie_extensions",
    "description": "Installed Internet Explorer (IE) browser extensions (plugins).",
    "url": "https://fleetdm.com/tables/ie_extensions",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "Extension display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "registry_path",
        "description": "Extension identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Version of the executable",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to executable",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/ie_extensions.yml"
  },
  {
    "name": "intel_me_info",
    "description": "Intel ME/CSE Info.",
    "url": "https://fleetdm.com/tables/intel_me_info",
    "platforms": [
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "version",
        "description": "Intel ME version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linwin/intel_me_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fintel_me_info.yml&value=name%3A%20intel_me_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "interface_addresses",
    "description": "Network interfaces and relevant metadata.",
    "url": "https://fleetdm.com/tables/interface_addresses",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Find all interfaces that have a public Internet IP. This query filters out all RFC1918 IPv4 addresses as well as IPv6 localhost.\n```\nSELECT * FROM interface_addresses WHERE address NOT LIKE '192.168%%' AND address NOT LIKE '172.16%%' AND address NOT LIKE '172.17%%' AND address NOT LIKE '172.18%%' AND address NOT LIKE '172.19%%' AND address NOT LIKE '172.20%%' AND address NOT LIKE '172.21%%' AND address NOT LIKE '172.22%%' AND address NOT LIKE '172.23%%' AND address NOT LIKE '10.%%'  AND address NOT LIKE '127.%%' AND address IS NOT NULL AND address IS NOT ' ' AND address IS NOT '' AND address IS NOT '::1' AND mask IS NOT 'ffff:ffff:ffff:ffff::';\n```",
    "columns": [
      {
        "name": "interface",
        "description": "Interface name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "address",
        "description": "Specific address for interface",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mask",
        "description": "Interface netmask",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "broadcast",
        "description": "Broadcast address for the interface",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "point_to_point",
        "description": "PtP address for the interface",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of address. One of dhcp, manual, auto, other, unknown",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "friendly_name",
        "description": "The friendly display name of the interface.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/interface_addresses.yml"
  },
  {
    "name": "interface_details",
    "description": "Detailed information and stats of network interfaces.",
    "url": "https://fleetdm.com/tables/interface_details",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "```\nselect interface, mac, type, flags, (1<<3) as loopback_flag from interface_details where (flags & loopback_flag) > 0;\n```",
    "columns": [
      {
        "name": "interface",
        "description": "Interface name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mac",
        "description": "MAC of interface (optional)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Interface type (includes virtual)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtu",
        "description": "Network MTU",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "metric",
        "description": "Metric based on the speed of the interface",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flags",
        "description": "Flags (netdevice) for the device",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipackets",
        "description": "Input packets",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "opackets",
        "description": "Output packets",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ibytes",
        "description": "Input bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "obytes",
        "description": "Output bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ierrors",
        "description": "Input errors",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "oerrors",
        "description": "Output errors",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "idrops",
        "description": "Input drops",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "odrops",
        "description": "Output drops",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "collisions",
        "description": "Packet Collisions detected",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_change",
        "description": "Time of last device modification (optional)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "link_speed",
        "description": "Interface speed in Mb/s",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux",
          "macOS"
        ]
      },
      {
        "name": "pci_slot",
        "description": "PCI slot number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "friendly_name",
        "description": "The friendly display name of the interface.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "description",
        "description": "Short description of the object a one-line string.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "manufacturer",
        "description": "Name of the network adapter's manufacturer.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "connection_id",
        "description": "Name of the network connection as it appears in the Network Connections Control Panel program.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "connection_status",
        "description": "State of the network adapter connection to the network.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "enabled",
        "description": "Indicates whether the adapter is enabled or not.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "physical_adapter",
        "description": "Indicates whether the adapter is a physical or a logical adapter.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "speed",
        "description": "Estimate of the current bandwidth in bits per second.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "service",
        "description": "The name of the service the network adapter uses.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "dhcp_enabled",
        "description": "If TRUE, the dynamic host configuration protocol (DHCP) server automatically assigns an IP address to the computer system when establishing a network connection.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "dhcp_lease_expires",
        "description": "Expiration date and time for a leased IP address that was assigned to the computer by the dynamic host configuration protocol (DHCP) server.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "dhcp_lease_obtained",
        "description": "Date and time the lease was obtained for the IP address assigned to the computer by the dynamic host configuration protocol (DHCP) server.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "dhcp_server",
        "description": "IP address of the dynamic host configuration protocol (DHCP) server.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "dns_domain",
        "description": "Organization name followed by a period and an extension that indicates the type of organization, such as 'microsoft.com'.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "dns_domain_suffix_search_order",
        "description": "Array of DNS domain suffixes to be appended to the end of host names during name resolution.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "dns_host_name",
        "description": "Host name used to identify the local computer for authentication by some utilities.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "dns_server_search_order",
        "description": "Array of server IP addresses to be used in querying for DNS servers.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/interface_details.yml"
  },
  {
    "name": "interface_ipv6",
    "description": "IPv6 configuration and stats of network interfaces.",
    "url": "https://fleetdm.com/tables/interface_ipv6",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify interfaces using IPv6 with forwarding enabled.\n```\nSELECT interface FROM interface_ipv6 WHERE forwarding_enabled='1';\n```",
    "columns": [
      {
        "name": "interface",
        "description": "Interface name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hop_limit",
        "description": "Current Hop Limit",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "forwarding_enabled",
        "description": "Enable IP forwarding",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "redirect_accept",
        "description": "Accept ICMP redirect messages",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rtadv_accept",
        "description": "Accept ICMP Router Advertisement",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/interface_ipv6.yml"
  },
  {
    "name": "iokit_devicetree",
    "description": "The IOKit registry matching the DeviceTree plane.",
    "url": "https://fleetdm.com/tables/iokit_devicetree",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "List the components in a Mac's device tree\n```\nSELECT * from iokit_devicetree;\n```",
    "columns": [
      {
        "name": "name",
        "description": "Device node name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "Best matching device class (most-specific category)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "id",
        "description": "IOKit internal registry ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Parent device registry ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device_path",
        "description": "Device tree path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "service",
        "description": "1 if the device conforms to IOService else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "busy_state",
        "description": "1 if the device is in a busy state else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "retain_count",
        "description": "The device reference count",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "depth",
        "description": "Device nested depth",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/iokit_devicetree.yml"
  },
  {
    "name": "iokit_registry",
    "description": "The full IOKit registry without selecting a plane.",
    "url": "https://fleetdm.com/tables/iokit_registry",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Identify devices with a Yubikey connected. The name will also contain the protocols supported by the key, such as FIDO.\n```\nSELECT * from iokit_registry WHERE name LIKE 'Yubi%';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Default name of the node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "Best matching device class (most-specific category)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "id",
        "description": "IOKit internal registry ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Parent registry ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "busy_state",
        "description": "1 if the node is in a busy state else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "retain_count",
        "description": "The node reference count",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "depth",
        "description": "Node nested depth",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/iokit_registry.yml"
  },
  {
    "name": "ioreg",
    "description": "Get values from macOS ioreg command. Columns are input options for the command. They match the ioreg command line tool.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "darwin"
    ],
    "columns": [
      {
        "name": "c",
        "description": "List properties of objects with the given class.",
        "required": false,
        "type": "text"
      },
      {
        "name": "d",
        "description": "Limit tree to the given depth.",
        "required": false,
        "type": "text"
      },
      {
        "name": "k",
        "description": "List properties of objects with the given key.",
        "required": false,
        "type": "text"
      },
      {
        "name": "n",
        "description": "List properties of objects with the given name.",
        "required": false,
        "type": "text"
      },
      {
        "name": "p",
        "description": "Traverse registry over the given plane (IOService is default).",
        "required": false,
        "type": "text"
      },
      {
        "name": "r",
        "description": "Show subtrees rooted by the given criteria.",
        "required": false,
        "type": "text"
      },
      {
        "name": "key",
        "description": "A specific item that describes the returned value.",
        "type": "text",
        "required": false
      },
      {
        "name": "value",
        "description": "The value for the specified key.",
        "type": "text",
        "required": false
      },
      {
        "name": "fullkey",
        "description": "The expanded name of the specific item that describes the value.",
        "type": "text",
        "required": false
      },
      {
        "name": "parent",
        "description": "The key's parent.",
        "type": "text",
        "required": false
      },
      {
        "name": "query",
        "description": "The query is printed in this column.",
        "type": "text",
        "required": false
      }
    ],
    "url": "https://fleetdm.com/tables/ioreg",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/ioreg.yml"
  },
  {
    "name": "iptables",
    "description": "Linux IP packet filtering and NAT tool.",
    "url": "https://fleetdm.com/tables/iptables",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "filter_name",
        "description": "Packet matching filter table name.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "chain",
        "description": "Size of module content.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "policy",
        "description": "Policy that applies for this rule.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "target",
        "description": "Target that applies for this rule.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protocol",
        "description": "Protocol number identification.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "src_port",
        "description": "Protocol source port(s).",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dst_port",
        "description": "Protocol destination port(s).",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "src_ip",
        "description": "Source IP address.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "src_mask",
        "description": "Source IP address mask.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "iniface",
        "description": "Input interface for the rule.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "iniface_mask",
        "description": "Input interface mask for the rule.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dst_ip",
        "description": "Destination IP address.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dst_mask",
        "description": "Destination IP address mask.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "outiface",
        "description": "Output interface for the rule.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "outiface_mask",
        "description": "Output interface mask for the rule.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "match",
        "description": "Matching rule that applies.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "packets",
        "description": "Number of matching packets for this rule.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bytes",
        "description": "Number of matching bytes for this rule.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "hidden": true,
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/iptables.yml"
  },
  {
    "name": "kernel_extensions",
    "description": "macOS's kernel extensions, both loaded and within the load search path.",
    "url": "https://fleetdm.com/tables/kernel_extensions",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify third-party kernel extensions.\n```\nSELECT * FROM kernel_extensions WHERE name NOT LIKE 'com.apple%' AND name NOT LIKE '__kernel__';\n```",
    "columns": [
      {
        "name": "idx",
        "description": "Extension load tag or index",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "refs",
        "description": "Reference count",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Bytes of wired memory used by extension",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Extension label",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Extension version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "linked_against",
        "description": "Indexes of extensions this extension is linked against",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Optional path to extension bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/kernel_extensions.yml"
  },
  {
    "name": "kernel_info",
    "description": "Basic active kernel information.",
    "url": "https://fleetdm.com/tables/kernel_info",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "See the kernel version running\n```\nSELECT version FROM kernel_info;\n```",
    "columns": [
      {
        "name": "version",
        "description": "Kernel version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "arguments",
        "description": "Kernel arguments",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Kernel path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device",
        "description": "Kernel device identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/kernel_info.yml"
  },
  {
    "name": "kernel_keys",
    "description": "List of security data, authentication keys and encryption keys.",
    "url": "https://fleetdm.com/tables/kernel_keys",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from kernel_keys\n```",
    "columns": [
      {
        "name": "serial_number",
        "description": "The serial key of the key.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flags",
        "description": "A set of flags describing the state of the key.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "usage",
        "description": "the number of threads and open file references thatrefer to this key.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "timeout",
        "description": "The amount of time until the key will expire,expressed in human-readable form. The string perm heremeans that the key is permanent (no timeout).  Thestring expd means that the key has already expired.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "permissions",
        "description": "The key permissions, expressed as four hexadecimalbytes containing, from left to right, thepossessor, user, group, and other permissions.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "The user ID of the key owner.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "The group ID of the key.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "The key type.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "The key description.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/kernel_keys.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fkernel_keys.yml&value=name%3A%20kernel_keys%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "kernel_modules",
    "description": "Linux kernel modules both loaded and within the load search path.",
    "url": "https://fleetdm.com/tables/kernel_modules",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "Module name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of module content",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "used_by",
        "description": "Module reverse dependencies",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Kernel module status",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "address",
        "description": "Kernel module address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/kernel_modules.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fkernel_modules.yml&value=name%3A%20kernel_modules%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "kernel_panics",
    "description": "System kernel panic logs.",
    "url": "https://fleetdm.com/tables/kernel_panics",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Look for kernel panics and see which module was last loaded before they happened.\n```\nSELECT os_version, name, time, system_model, last_loaded FROM kernel_panics;\n```",
    "columns": [
      {
        "name": "path",
        "description": "Location of log file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Formatted time of the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "registers",
        "description": "A space delimited line of register:value pairs",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "frame_backtrace",
        "description": "Backtrace of the crashed module",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "module_backtrace",
        "description": "Modules appearing in the crashed module's backtrace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dependencies",
        "description": "Module dependencies existing in crashed module's backtrace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Process name corresponding to crashed thread",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "os_version",
        "description": "Version of the operating system",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "kernel_version",
        "description": "Version of the system kernel",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "system_model",
        "description": "Physical system model, for example 'MacBookPro12,1 (Mac-E43C1C25D4880AD6)'",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uptime",
        "description": "System uptime at kernel panic in nanoseconds",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_loaded",
        "description": "Last loaded module before panic",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_unloaded",
        "description": "Last unloaded module before panic",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/kernel_panics.yml"
  },
  {
    "name": "keychain_acls",
    "description": "Applications that have ACL entries in the keychain. NOTE: osquery limits frequent access to keychain files. This limit is controlled by keychain_access_interval flag.",
    "url": "https://fleetdm.com/tables/keychain_acls",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Identify keychain items with permissions granted to Applications at the system or user level.\n```\nSELECT * FROM keychain_acls WHERE path LIKE '/System/Applications/%%' OR path LIKE '/Users/%%/Applications/%%';\n```",
    "columns": [
      {
        "name": "keychain_path",
        "description": "The path of the keychain",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "authorizations",
        "description": "A space delimited set of authorization attributes",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "The path of the authorized application",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "The description included with the ACL entry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "label",
        "description": "An optional label tag that may be included with the keychain entry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/keychain_acls.yml"
  },
  {
    "name": "keychain_items",
    "description": "Generic details about keychain items. NOTE: osquery limits frequent access to keychain files. This limit is controlled by keychain_access_interval flag.",
    "url": "https://fleetdm.com/tables/keychain_items",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- This table should be used sparingly as it uses an Apple API which occasionally corrupts the underlying certificate. Learn more [here](https://github.com/fleetdm/fleet/issues/13065#issuecomment-1658849614).",
    "examples": "Identify Macs that contain certificates related to Apple application signing and notarization. (replace with your Apple Developer ID string)\n```\nSELECT * FROM keychain_items WHERE label LIKE '%8EHZ83LZNU%';\n```",
    "columns": [
      {
        "name": "label",
        "description": "Generic item name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Optional item description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "comment",
        "description": "Optional keychain comment",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "account",
        "description": "Optional item account",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created",
        "description": "Date item was created",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "modified",
        "description": "Date of last modification",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Keychain item type (class)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pk_hash",
        "description": "Hash of associated public key (SHA1 of subjectPublicKey, see RFC 8520 4.2.1.2)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to keychain containing item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/keychain_items.yml"
  },
  {
    "name": "known_hosts",
    "description": "A line-delimited known_hosts table.",
    "url": "https://fleetdm.com/tables/known_hosts",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN known_hosts USING (uid);\n```",
    "columns": [
      {
        "name": "uid",
        "description": "The local user that owns the known_hosts file",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "key",
        "description": "parsed authorized keys line",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key_file",
        "description": "Path to known_hosts file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/known_hosts.yml"
  },
  {
    "name": "kva_speculative_info",
    "description": "Display kernel virtual address and speculative execution information for the system.",
    "url": "https://fleetdm.com/tables/kva_speculative_info",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from kva_speculative_info\n```",
    "columns": [
      {
        "name": "kva_shadow_enabled",
        "description": "Kernel Virtual Address shadowing is enabled.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "kva_shadow_user_global",
        "description": "User pages are marked as global.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "kva_shadow_pcid",
        "description": "Kernel VA PCID flushing optimization is enabled.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "kva_shadow_inv_pcid",
        "description": "Kernel VA INVPCID is enabled.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bp_mitigations",
        "description": "Branch Prediction mitigations are enabled.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bp_system_pol_disabled",
        "description": "Branch Predictions are disabled via system policy.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bp_microcode_disabled",
        "description": "Branch Predictions are disabled due to lack of microcode update.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_spec_ctrl_supported",
        "description": "SPEC_CTRL MSR supported by CPU Microcode.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ibrs_support_enabled",
        "description": "Windows uses IBRS.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "stibp_support_enabled",
        "description": "Windows uses STIBP.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_pred_cmd_supported",
        "description": "PRED_CMD MSR supported by CPU Microcode.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/kva_speculative_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fkva_speculative_info.yml&value=name%3A%20kva_speculative_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "last",
    "description": "System logins and logouts.",
    "url": "https://fleetdm.com/tables/last",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "System logins and logouts with formatted time.\n```\nSELECT strftime('%Y-%m-%d %H:%M:%S',time,'unixepoch') AS formatted_time, username, pid, type  FROM last WHERE tty='console'; \n```",
    "columns": [
      {
        "name": "username",
        "description": "Entry username",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tty",
        "description": "Entry terminal",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Entry type, according to ut_type types (utmp.h)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type_name",
        "description": "Entry type name, according to ut_type types (utmp.h)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Entry timestamp",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "host",
        "description": "Entry hostname",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/last.yml"
  },
  {
    "name": "launchd",
    "description": "LaunchAgents and LaunchDaemons from default search paths.",
    "url": "https://fleetdm.com/tables/launchd",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "List launch daemons that run an application in the Applications directory.\n```\nSELECT * FROM launchd WHERE program LIKE '/Applications/%%' OR program LIKE '/Users/%%/Applications/%%';\n```",
    "columns": [
      {
        "name": "path",
        "description": "Path to daemon or agent plist",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "File name of plist (used by launchd)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "label",
        "description": "Daemon or agent service name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "program",
        "description": "Path to target program",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "run_at_load",
        "description": "Should the program run on launch load",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "keep_alive",
        "description": "Should the process be restarted if killed",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "on_demand",
        "description": "Deprecated key, replaced by keep_alive",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "disabled",
        "description": "Skip loading this daemon or agent on boot",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "Run this daemon or agent as this username",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "groupname",
        "description": "Run this daemon or agent as this group",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "stdout_path",
        "description": "Pipe stdout to a target path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "stderr_path",
        "description": "Pipe stderr to a target path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "start_interval",
        "description": "Frequency to run in seconds",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "program_arguments",
        "description": "Command line arguments passed to program",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "watch_paths",
        "description": "Key that launches daemon or agent if path is modified",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "queue_directories",
        "description": "Similar to watch_paths but only with non-empty directories",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inetd_compatibility",
        "description": "Run this daemon or agent as it was launched from inetd",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "start_on_mount",
        "description": "Run daemon or agent every time a filesystem is mounted",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "root_directory",
        "description": "Key used to specify a directory to chroot to before launch",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "working_directory",
        "description": "Key used to specify a directory to chdir to before launch",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "process_type",
        "description": "Key describes the intended purpose of the job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/launchd.yml"
  },
  {
    "name": "launchd_overrides",
    "description": "Override keys, per user, for LaunchDaemons and Agents.",
    "url": "https://fleetdm.com/tables/launchd_overrides",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "columns": [
      {
        "name": "label",
        "description": "Daemon or agent service name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key",
        "description": "Name of the override key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Overridden value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "User ID applied to the override, 0 applies to all",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to daemon or agent plist",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/launchd_overrides.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flaunchd_overrides.yml&value=name%3A%20launchd_overrides%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "listening_ports",
    "description": "Processes with listening (bound) network sockets/ports.",
    "url": "https://fleetdm.com/tables/listening_ports",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "List executables listening on network ports.\n```\nSELECT l.port, l.pid, p.name, p.path FROM listening_ports l JOIN processes p USING (pid); \n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "port",
        "description": "Transport layer port",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protocol",
        "description": "Transport protocol (TCP/UDP)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "family",
        "description": "Network protocol (IPv4, IPv6)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "address",
        "description": "Specific address for bind",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fd",
        "description": "Socket file descriptor number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "socket",
        "description": "Socket handle or inode number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path for UNIX domain sockets",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "net_namespace",
        "description": "The inode number of the network namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/listening_ports.yml"
  },
  {
    "name": "load_average",
    "description": "Displays information about the system wide load averages.",
    "url": "https://fleetdm.com/tables/load_average",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Find computers with a load average of 3.5 or higher over the last 15 minutes.\n```\nSELECT average from load_average WHERE period='15m' AND average>=3.5;\n```",
    "columns": [
      {
        "name": "period",
        "description": "Period over which the average is calculated.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "average",
        "description": "Load average over the specified period.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/load_average.yml"
  },
  {
    "name": "location_services",
    "description": "Reports the status of the Location Services feature of the OS.",
    "url": "https://fleetdm.com/tables/location_services",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "If this query returns a 1 in the enabled column, location services are enabled on this Mac.\n```\nSELECT enabled from location_services;\n```",
    "columns": [
      {
        "name": "enabled",
        "description": "1 if Location Services are enabled, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/location_services.yml"
  },
  {
    "name": "logged_in_users",
    "description": "Users with an active shell on the system.",
    "url": "https://fleetdm.com/tables/logged_in_users",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "See the user currently logged in on the console of the computer.\n```\nSELECT user, type, tty from logged_in_users WHERE tty='console';\n```",
    "columns": [
      {
        "name": "type",
        "description": "Login type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user",
        "description": "User login name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tty",
        "description": "Device name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "host",
        "description": "Remote hostname",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time entry was made",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sid",
        "description": "The user's unique security identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "registry_hive",
        "description": "HKEY_USERS registry hive",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/logged_in_users.yml"
  },
  {
    "name": "logical_drives",
    "description": "Details for logical drives on the system. A logical drive generally represents a single partition.",
    "url": "https://fleetdm.com/tables/logical_drives",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect free_space from logical_drives where device_id = 'C:'\n```",
    "columns": [
      {
        "name": "device_id",
        "description": "The drive id, usually the drive name, e.g., 'C:'.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Deprecated (always 'Unknown').",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "The canonical description of the drive, e.g. 'Logical Fixed Disk', 'CD-ROM Disk'.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "free_space",
        "description": "The amount of free space, in bytes, of the drive (-1 on failure).",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "The total amount of space, in bytes, of the drive (-1 on failure).",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "file_system",
        "description": "The file system of the drive.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "boot_partition",
        "description": "True if Windows booted from this drive.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/logical_drives.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flogical_drives.yml&value=name%3A%20logical_drives%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "logon_sessions",
    "description": "Windows Logon Session.",
    "url": "https://fleetdm.com/tables/logon_sessions",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from logon_sessions;\n```",
    "columns": [
      {
        "name": "logon_id",
        "description": "A locally unique identifier (LUID) that identifies a logon session.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user",
        "description": "The account name of the security principal that owns the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logon_domain",
        "description": "The name of the domain used to authenticate the owner of the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "authentication_package",
        "description": "The authentication package used to authenticate the owner of the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logon_type",
        "description": "The logon method.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "session_id",
        "description": "The Terminal Services session identifier.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logon_sid",
        "description": "The user's security identifier (SID).",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logon_time",
        "description": "The time the session owner logged on.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logon_server",
        "description": "The name of the server used to authenticate the owner of the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dns_domain_name",
        "description": "The DNS name for the owner of the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "upn",
        "description": "The user principal name (UPN) for the owner of the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logon_script",
        "description": "The script used for logging on.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "profile_path",
        "description": "The home directory for the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "home_directory",
        "description": "The home directory for the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "home_directory_drive",
        "description": "The drive location of the home directory of the logon session.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/logon_sessions.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flogon_sessions.yml&value=name%3A%20logon_sessions%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_certificates",
    "description": "LXD certificates information.",
    "url": "https://fleetdm.com/tables/lxd_certificates",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_certificates\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of the certificate",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of the certificate",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fingerprint",
        "description": "SHA256 hash of the certificate",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "certificate",
        "description": "Certificate content",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_certificates.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_certificates.yml&value=name%3A%20lxd_certificates%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_cluster",
    "description": "LXD cluster information.",
    "url": "https://fleetdm.com/tables/lxd_cluster",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_cluster\n```",
    "columns": [
      {
        "name": "server_name",
        "description": "Name of the LXD server node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled",
        "description": "Whether clustering enabled (1) or not (0) on this node",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "member_config_entity",
        "description": "Type of configuration parameter for this node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "member_config_name",
        "description": "Name of configuration parameter",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "member_config_key",
        "description": "Config key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "member_config_value",
        "description": "Config value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "member_config_description",
        "description": "Config description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_cluster.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_cluster.yml&value=name%3A%20lxd_cluster%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_cluster_members",
    "description": "LXD cluster members information.",
    "url": "https://fleetdm.com/tables/lxd_cluster_members",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_cluster_members\n```",
    "columns": [
      {
        "name": "server_name",
        "description": "Name of the LXD server node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "url",
        "description": "URL of the node",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "database",
        "description": "Whether the server is a database node (1) or not (0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Status of the node (Online/Offline)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "message",
        "description": "Message from the node (Online/Offline)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_cluster_members.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_cluster_members.yml&value=name%3A%20lxd_cluster_members%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_images",
    "description": "LXD images information.",
    "url": "https://fleetdm.com/tables/lxd_images",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_images where id = '0931b693c877ef357b9e17b3195ae952a2450873923ffd2b34b60836ea730cfa'\n```",
    "columns": [
      {
        "name": "id",
        "description": "Image ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "architecture",
        "description": "Target architecture for the image",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "os",
        "description": "OS on which image is based",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "release",
        "description": "OS release version on which the image is based",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Image description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "aliases",
        "description": "Comma-separated list of image aliases",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "filename",
        "description": "Filename of the image file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of image in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "auto_update",
        "description": "Whether the image auto-updates (1) or not (0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cached",
        "description": "Whether image is cached (1) or not (0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "public",
        "description": "Whether image is public (1) or not (0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created_at",
        "description": "ISO time of image creation",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "expires_at",
        "description": "ISO time of image expiration",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uploaded_at",
        "description": "ISO time of image upload",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_used_at",
        "description": "ISO time for the most recent use of this image in terms of container spawn",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "update_source_server",
        "description": "Server for image update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "update_source_protocol",
        "description": "Protocol used for image information update and image import from source server",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "update_source_certificate",
        "description": "Certificate for update source server",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "update_source_alias",
        "description": "Alias of image at update source server",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_images.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_images.yml&value=name%3A%20lxd_images%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_instance_config",
    "description": "LXD instance configuration information.",
    "url": "https://fleetdm.com/tables/lxd_instance_config",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_instance_config where name = 'hello'\n```",
    "columns": [
      {
        "name": "name",
        "description": "Instance name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "key",
        "description": "Configuration parameter name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Configuration parameter value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_instance_config.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_instance_config.yml&value=name%3A%20lxd_instance_config%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_instance_devices",
    "description": "LXD instance devices information.",
    "url": "https://fleetdm.com/tables/lxd_instance_devices",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_instance_devices where name = 'hello'\n```",
    "columns": [
      {
        "name": "name",
        "description": "Instance name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "device",
        "description": "Name of the device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device_type",
        "description": "Device type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key",
        "description": "Device info param name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Device info param value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_instance_devices.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_instance_devices.yml&value=name%3A%20lxd_instance_devices%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_instances",
    "description": "LXD instances information.",
    "url": "https://fleetdm.com/tables/lxd_instances",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_instances where name = 'hello'\n```",
    "columns": [
      {
        "name": "name",
        "description": "Instance name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "status",
        "description": "Instance state (running, stopped, etc.)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "stateful",
        "description": "Whether the instance is stateful(1) or not(0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ephemeral",
        "description": "Whether the instance is ephemeral(1) or not(0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created_at",
        "description": "ISO time of creation",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "base_image",
        "description": "ID of image used to launch this instance",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "architecture",
        "description": "Instance architecture",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "os",
        "description": "The OS of this instance",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Instance description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Instance's process ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "processes",
        "description": "Number of processes running inside this instance",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_instances.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_instances.yml&value=name%3A%20lxd_instances%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_networks",
    "description": "LXD network information.",
    "url": "https://fleetdm.com/tables/lxd_networks",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_networks\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "managed",
        "description": "1 if network created by LXD, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv4_address",
        "description": "IPv4 address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipv6_address",
        "description": "IPv6 address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "used_by",
        "description": "URLs for containers using this network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bytes_received",
        "description": "Number of bytes received on this network",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bytes_sent",
        "description": "Number of bytes sent on this network",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "packets_received",
        "description": "Number of packets received on this network",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "packets_sent",
        "description": "Number of packets sent on this network",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hwaddr",
        "description": "Hardware address for this network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "Network status",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtu",
        "description": "MTU size",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_networks.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_networks.yml&value=name%3A%20lxd_networks%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "lxd_storage_pools",
    "description": "LXD storage pool information.",
    "url": "https://fleetdm.com/tables/lxd_storage_pools",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from lxd_storage_pools\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of the storage pool",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver",
        "description": "Storage driver",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Storage pool source",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of the storage pool",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "space_used",
        "description": "Storage space used in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "space_total",
        "description": "Total available storage space in bytes for this storage pool",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inodes_used",
        "description": "Number of inodes used",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inodes_total",
        "description": "Total number of inodes available in this storage pool",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/lxd_storage_pools.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Flxd_storage_pools.yml&value=name%3A%20lxd_storage_pools%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "macadmins_unified_log",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Allows querying macOS [unified logs](https://developer.apple.com/documentation/os/logging).",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "examples": "Select the log entries that happened during the last minute and are related to `LaunchServices`. Convert the UNIX time to a human readable format,  and the signature table to verify its cryptographic signature.\n```\nSELECT u.category, u.event_message, u.process_id, datetime(u.timestamp, 'unixepoch') AS human_time, p.path, s.signed, s.identifier, s.authority FROM macadmins_unified_log u JOIN processes p ON u.process_id = p.pid JOIN signature s ON p.path = s.path WHERE u.sender_image_path LIKE '%LaunchServices%' AND last = \"1m\";\n```",
    "columns": [
      {
        "name": "trace_id",
        "description": "The ID of a trace event",
        "required": false,
        "type": "text"
      },
      {
        "name": "event_type",
        "description": "The type of event, this can be logEvent, signpostEvent or stateEvent.",
        "required": false,
        "type": "text"
      },
      {
        "name": "format_string",
        "description": "The format string used to convert variable content into a string for output.",
        "required": false,
        "type": "text"
      },
      {
        "name": "activity_identifier",
        "description": "The identifier of the log activity.",
        "required": false,
        "type": "int"
      },
      {
        "name": "subsystem",
        "description": "The subsystem responsible for this activity.",
        "required": false,
        "type": "text"
      },
      {
        "name": "category",
        "description": "The category of the log activity.",
        "required": false,
        "type": "text"
      },
      {
        "name": "thread_id",
        "description": "The ID of the thread that originated the event.",
        "required": false,
        "type": "bigint"
      },
      {
        "name": "sender_image_uuid",
        "description": "The UUID of the library, framework, kernel extension, or mach-o image, that originated the event.",
        "required": false,
        "type": "text"
      },
      {
        "name": "sender_image_path",
        "description": "The full path of the library, framework, kernel extension, or mach-o image, that originated the event.",
        "required": false,
        "type": "text"
      },
      {
        "name": "boot_uuid",
        "description": "The boot UUID of the event.",
        "required": false,
        "type": "text"
      },
      {
        "name": "process_id",
        "description": "Process ID of the process that generated this log item, which can be joined to multiple other tables including a *PID*.",
        "required": false,
        "type": "bigint"
      },
      {
        "name": "process_image_path",
        "description": "The full path of the process that originated the event.",
        "required": false,
        "type": "text"
      },
      {
        "name": "timestamp",
        "description": "Timestamp in [UNIX time format](https://en.wikipedia.org/wiki/Unix_time).",
        "required": false,
        "type": "bigint"
      },
      {
        "name": "event_message",
        "description": "The message of the log entry.",
        "required": false,
        "type": "text"
      },
      {
        "name": "sender_program_counter",
        "description": "The program counter of the library, framework, kernel extension, or mach-o image, that originated the event.",
        "required": false,
        "type": "uint"
      },
      {
        "name": "parent_activity_identifier",
        "description": "ID of the parent activity",
        "required": false,
        "type": "uint"
      },
      {
        "name": "log_level",
        "description": "The log level of this item, such as `default`, `info`, `fault`, etc.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/macadmins_unified_log",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/macadmins_unified_log.yml"
  },
  {
    "name": "macos_profiles",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "High level information on installed profiles enrollment.",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "examples": "Identify all profiles that are not *verified*.\n```\nSELECT display_name, install_date FROM macos_profiles WHERE verification_state!='verified';  \n```",
    "columns": [
      {
        "name": "description",
        "description": "The description of the profile.",
        "required": false,
        "type": "text"
      },
      {
        "name": "display_name",
        "description": "The display name of the profile.",
        "required": false,
        "type": "text"
      },
      {
        "name": "identifier",
        "description": "The identifier of the profile.",
        "required": false,
        "type": "text"
      },
      {
        "name": "install_date",
        "description": "Date and time at which the profile was installed.",
        "required": false,
        "type": "text"
      },
      {
        "name": "organization",
        "description": "The profile's organization value.",
        "required": false,
        "type": "text"
      },
      {
        "name": "type",
        "description": "The type of profile.",
        "required": false,
        "type": "text"
      },
      {
        "name": "uuid",
        "description": "The [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of the profile.",
        "required": false,
        "type": "text"
      },
      {
        "name": "verification_state",
        "description": "The verification state of the profile.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/macos_profiles",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/macos_profiles.yml"
  },
  {
    "name": "macos_rsr",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Returns information about installed Rapid Security Responses (RSRs).",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "columns": [
      {
        "name": "full_macos_version",
        "description": "Full macOS version string (including the RSR suffix)",
        "required": false,
        "type": "text"
      },
      {
        "name": "macos_version",
        "description": "The macOS version string (excluding the RSR suffix)",
        "required": false,
        "type": "text"
      },
      {
        "name": "rsr_supported",
        "description": "Whether this macOS version supports RSRs (>= 13). Possible values are 'true' or 'false'.",
        "required": false,
        "type": "text"
      },
      {
        "name": "rsr_version",
        "description": "RSR version string suffix (with parenthesis included)",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/macos_rsr",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/macos_rsr.yml"
  },
  {
    "name": "magic",
    "description": "Magic number recognition library table.",
    "url": "https://fleetdm.com/tables/magic",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "path",
        "description": "Absolute path to target file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "magic_db_files",
        "description": "Colon(:) separated list of files where the magic db file can be found. By default one of the following is used: /usr/share/file/magic/magic, /usr/share/misc/magic or /usr/share/misc/magic.mgc",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "data",
        "description": "Magic number data from libmagic",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mime_type",
        "description": "MIME type data from libmagic",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mime_encoding",
        "description": "MIME encoding data from libmagic",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/magic.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmagic.yml&value=name%3A%20magic%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "managed_policies",
    "description": "The managed configuration policies from AD, MDM, MCX, etc.",
    "url": "https://fleetdm.com/tables/managed_policies",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Check if critical software update installation is enabled via a profile (1 = enabled)\n```\nSELECT name, value FROM managed_policies WHERE domain='com.apple.SoftwareUpdate' AND name='CriticalUpdateInstall' LIMIT 1;\n```",
    "columns": [
      {
        "name": "domain",
        "description": "System or manager-chosen domain key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uuid",
        "description": "Optional UUID assigned to policy set",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Policy key name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Policy value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "policy only applies to the listed user. Blank if global.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manual",
        "description": "1 if policy was loaded manually, otherwise 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/managed_policies.yml"
  },
  {
    "name": "md_devices",
    "description": "Software RAID array settings.",
    "url": "https://fleetdm.com/tables/md_devices",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "device_name",
        "description": "md device name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Current state of the array",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "raid_level",
        "description": "Current raid level of the array",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "size of the array in blocks",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "chunk_size",
        "description": "chunk size in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "raid_disks",
        "description": "Number of configured RAID disks in array",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "nr_raid_disks",
        "description": "Number of partitions or disk devices to comprise the array",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "working_disks",
        "description": "Number of working disks in array",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "active_disks",
        "description": "Number of active disks in array",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "failed_disks",
        "description": "Number of failed disks in array",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "spare_disks",
        "description": "Number of idle disks in array",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "superblock_state",
        "description": "State of the superblock",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "superblock_version",
        "description": "Version of the superblock",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "superblock_update_time",
        "description": "Unix timestamp of last update",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bitmap_on_mem",
        "description": "Pages allocated in in-memory bitmap, if enabled",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bitmap_chunk_size",
        "description": "Bitmap chunk size",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bitmap_external_file",
        "description": "External referenced bitmap file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "recovery_progress",
        "description": "Progress of the recovery activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "recovery_finish",
        "description": "Estimated duration of recovery activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "recovery_speed",
        "description": "Speed of recovery activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "resync_progress",
        "description": "Progress of the resync activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "resync_finish",
        "description": "Estimated duration of resync activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "resync_speed",
        "description": "Speed of resync activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "reshape_progress",
        "description": "Progress of the reshape activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "reshape_finish",
        "description": "Estimated duration of reshape activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "reshape_speed",
        "description": "Speed of reshape activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "check_array_progress",
        "description": "Progress of the check array activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "check_array_finish",
        "description": "Estimated duration of the check array activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "check_array_speed",
        "description": "Speed of the check array activity",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "unused_devices",
        "description": "Unused devices",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "other",
        "description": "Other information associated with array from /proc/mdstat",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/md_devices.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmd_devices.yml&value=name%3A%20md_devices%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "md_drives",
    "description": "Drive devices used for Software RAID.",
    "url": "https://fleetdm.com/tables/md_drives",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "md_device_name",
        "description": "md device name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "drive_name",
        "description": "Drive device name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "slot",
        "description": "Slot position of disk",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "State of the drive",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/md_drives.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmd_drives.yml&value=name%3A%20md_drives%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "md_personalities",
    "description": "Software RAID setting supported by the kernel.",
    "url": "https://fleetdm.com/tables/md_personalities",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "Name of personality supported by kernel",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/md_personalities.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmd_personalities.yml&value=name%3A%20md_personalities%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "mdfind",
    "description": "Run searches against the spotlight database.",
    "url": "https://fleetdm.com/tables/mdfind",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from mdfind where query in ('kMDItemDisplayName == \"rook.stl\"', 'kMDItemDisplayName == \"video.mp4\"')\n```",
    "columns": [
      {
        "name": "path",
        "description": "Path of the file returned from spotlight",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "query",
        "description": "The query that was run to find the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/mdfind.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmdfind.yml&value=name%3A%20mdfind%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "mdls",
    "description": "Query file metadata in the Spotlight database.",
    "url": "https://fleetdm.com/tables/mdls",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify hidden files that have been indexed by Spotlight. This could reveal files that were recently deleted and are still in the Spotlight database.\n```\nSELECT * FROM mdls WHERE path LIKE '/Users/g/%%' AND key='kMDItemFSIsExtensionHidden' AND value='true';\n```",
    "columns": [
      {
        "name": "path",
        "description": "Path of the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "key",
        "description": "Name of the metadata key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Value stored in the metadata key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "valuetype",
        "description": "CoreFoundation type of data stored in value",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/mdls.yml"
  },
  {
    "name": "mdm",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).<p> Code based on work by [Kolide](https://github.com/kolide/launcher). <p> Due to changes in macOS 12.3, the output of `profiles show -type enrollment` can only be generated once a day. If you are running this command with another tool, you should set the `PROFILES_SHOW_ENROLLMENT_CACHE_PATH` environment variable to the path you are caching this. The cache file should be `json` with the keys `dep_capable` and `rate_limited present`, both booleans representing whether the device is capable of DEP enrollment and whether the response from `profiles show -type enrollment` is being rate limited or not.",
    "description": "Information on the device's MDM enrollment.",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "examples": "Identify Macs that are DEP capable but have not been enrolled to MDM.\n```\nSELECT * FROM mdm WHERE dep_capable='true' AND enrolled='false';\n```",
    "columns": [
      {
        "name": "access_rights",
        "description": "The access rights of the payload. The resulting number is the total of every [AccessRight](https://developer.apple.com/documentation/devicemanagement/mdm) added up.",
        "required": false,
        "type": "integer"
      },
      {
        "name": "checkin_url",
        "description": "The URL the Mac checks in with, which should point to your MDM server.",
        "required": false,
        "type": "text"
      },
      {
        "name": "dep_capable",
        "description": "Indicates if the computer is DEP capable or not, even if it is not currently enrolled into MDM.",
        "required": false,
        "type": "text"
      },
      {
        "name": "enrolled",
        "description": "Indicates if the computer is enrolled into MDM.",
        "required": false,
        "type": "text"
      },
      {
        "name": "has_scep_payload",
        "description": "Indicates if the computer has a certificate used by the MDM server to authenticate it.",
        "required": false,
        "type": "text"
      },
      {
        "name": "identity_certificate_uuid",
        "description": "The [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of the [SCEP](https://en.wikipedia.org/wiki/Simple_Certificate_Enrollment_Protocol) certificate.",
        "required": false,
        "type": "text"
      },
      {
        "name": "install_date",
        "description": "The date on which the MDM payload was installed on the Mac.",
        "required": false,
        "type": "text"
      },
      {
        "name": "installed_from_dep",
        "description": "Indicates if the MDM payload was installed via DEP or not.",
        "required": false,
        "type": "text"
      },
      {
        "name": "payload_identifier",
        "description": "The identifier of the MDM payload.",
        "required": false,
        "type": "text"
      },
      {
        "name": "server_url",
        "description": "The URL of the MDM server used by this computer.",
        "required": false,
        "type": "text"
      },
      {
        "name": "sign_message",
        "description": "Indicates if messages sent and received from the MDM server must be signed.",
        "required": false,
        "type": "text"
      },
      {
        "name": "topic",
        "description": "The topic MDM listens to for push notifications.",
        "required": false,
        "type": "text"
      },
      {
        "name": "user_approved",
        "description": "Indicates if this MDM payload was approved by the user.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/mdm",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/mdm.yml"
  },
  {
    "name": "mdm_bridge",
    "platforms": [
      "windows"
    ],
    "description": "Allows querying MDM enrolled devices using \"get\" commands.",
    "columns": [
      {
        "name": "enrollment_status",
        "type": "text",
        "required": false,
        "description": "Contains the enrollment status of the device, possible values are \"device_enrolled\" and \"device_unenrolled\"."
      },
      {
        "name": "enrolled_user",
        "type": "text",
        "required": false,
        "description": "Contains the enrollment URI of the device."
      },
      {
        "name": "mdm_command_input",
        "type": "text",
        "required": false,
        "description": "The \"get\" command to execute on the device. If empty, no command is executed and the \"enrollment_status\" and \"enrolled_user\" columns are returned."
      },
      {
        "name": "mdm_command_output",
        "type": "text",
        "required": false,
        "description": "Value of the \"Results\" field of the MDM command output."
      },
      {
        "name": "raw_mdm_command_output",
        "type": "text",
        "required": false,
        "description": "The full raw output of the MDM command execution."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/mdm_bridge",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/mdm_bridge.yml"
  },
  {
    "name": "memory_array_mapped_addresses",
    "description": "Data associated for address mapping of physical memory arrays.",
    "url": "https://fleetdm.com/tables/memory_array_mapped_addresses",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "handle",
        "description": "Handle, or instance number, associated with the structure",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_array_handle",
        "description": "Handle of the memory array associated with this structure",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "starting_address",
        "description": "Physical stating address, in kilobytes, of a range of memory mapped to physical memory array",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ending_address",
        "description": "Physical ending address of last kilobyte of a range of memory mapped to physical memory array",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "partition_width",
        "description": "Number of memory devices that form a single row of memory for the address partition of this structure",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/memory_array_mapped_addresses.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmemory_array_mapped_addresses.yml&value=name%3A%20memory_array_mapped_addresses%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "memory_arrays",
    "description": "Data associated with collection of memory devices that operate to form a memory address.",
    "url": "https://fleetdm.com/tables/memory_arrays",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "handle",
        "description": "Handle, or instance number, associated with the array",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "location",
        "description": "Physical location of the memory array",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "use",
        "description": "Function for which the array is used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_error_correction",
        "description": "Primary hardware error correction or detection method supported",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max_capacity",
        "description": "Maximum capacity of array in gigabytes",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_error_info_handle",
        "description": "Handle, or instance number, associated with any error that was detected for the array",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "number_memory_devices",
        "description": "Number of memory devices on array",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/memory_arrays.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmemory_arrays.yml&value=name%3A%20memory_arrays%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "memory_device_mapped_addresses",
    "description": "Data associated for address mapping of physical memory devices.",
    "url": "https://fleetdm.com/tables/memory_device_mapped_addresses",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "handle",
        "description": "Handle, or instance number, associated with the structure",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_device_handle",
        "description": "Handle of the memory device structure associated with this structure",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_array_mapped_address_handle",
        "description": "Handle of the memory array mapped address to which this device range is mapped to",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "starting_address",
        "description": "Physical stating address, in kilobytes, of a range of memory mapped to physical memory array",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ending_address",
        "description": "Physical ending address of last kilobyte of a range of memory mapped to physical memory array",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "partition_row_position",
        "description": "Identifies the position of the referenced memory device in a row of the address partition",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "interleave_position",
        "description": "The position of the device in a interleave, i.e. 0 indicates non-interleave, 1 indicates 1st interleave, 2 indicates 2nd interleave, etc.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "interleave_data_depth",
        "description": "The max number of consecutive rows from memory device that are accessed in a single interleave transfer; 0 indicates device is non-interleave",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/memory_device_mapped_addresses.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmemory_device_mapped_addresses.yml&value=name%3A%20memory_device_mapped_addresses%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "memory_devices",
    "description": "Physical memory device (type 17) information retrieved from SMBIOS.",
    "url": "https://fleetdm.com/tables/memory_devices",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "handle",
        "description": "Handle, or instance number, associated with the structure in SMBIOS",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "array_handle",
        "description": "The memory array that the device is attached to",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "form_factor",
        "description": "Implementation form factor for this memory device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "total_width",
        "description": "Total width, in bits, of this memory device, including any check or error-correction bits",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "data_width",
        "description": "Data width, in bits, of this memory device",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size of memory device in Megabyte",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "set",
        "description": "Identifies if memory device is one of a set of devices.  A value of 0 indicates no set affiliation.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device_locator",
        "description": "String number of the string that identifies the physically-labeled socket or board position where the memory device is located",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bank_locator",
        "description": "String number of the string that identifies the physically-labeled bank where the memory device is located",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_type",
        "description": "Type of memory used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_type_details",
        "description": "Additional details for memory device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max_speed",
        "description": "Max speed of memory device in megatransfers per second (MT/s)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "configured_clock_speed",
        "description": "Configured speed of memory device in megatransfers per second (MT/s)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer",
        "description": "Manufacturer ID string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial_number",
        "description": "Serial number of memory device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "asset_tag",
        "description": "Manufacturer specific asset tag of memory device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "part_number",
        "description": "Manufacturer specific serial number of memory device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "min_voltage",
        "description": "Minimum operating voltage of device in millivolts",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max_voltage",
        "description": "Maximum operating voltage of device in millivolts",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "configured_voltage",
        "description": "Configured operating voltage of device in millivolts",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/memory_devices.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmemory_devices.yml&value=name%3A%20memory_devices%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "memory_error_info",
    "description": "Data associated with errors of a physical memory array.",
    "url": "https://fleetdm.com/tables/memory_error_info",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "handle",
        "description": "Handle, or instance number, associated with the structure",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "error_type",
        "description": "type of error associated with current error status for array or device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "error_granularity",
        "description": "Granularity to which the error can be resolved",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "error_operation",
        "description": "Memory access operation that caused the error",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor_syndrome",
        "description": "Vendor specific ECC syndrome or CRC data associated with the erroneous access",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_array_error_address",
        "description": "32 bit physical address of the error based on the addressing of the bus to which the memory array is connected",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device_error_address",
        "description": "32 bit physical address of the error relative to the start of the failing memory address, in bytes",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "error_resolution",
        "description": "Range, in bytes, within which this error can be determined, when an error address is given",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/memory_error_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmemory_error_info.yml&value=name%3A%20memory_error_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "memory_info",
    "description": "Main memory information in bytes.",
    "url": "https://fleetdm.com/tables/memory_info",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "memory_total",
        "description": "Total amount of physical RAM, in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_free",
        "description": "The amount of physical RAM, in bytes, left unused by the system",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "memory_available",
        "description": "The amount of physical RAM, in bytes, available for starting new applications, without swapping",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "buffers",
        "description": "The amount of physical RAM, in bytes, used for file buffers",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cached",
        "description": "The amount of physical RAM, in bytes, used as cache memory",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "swap_cached",
        "description": "The amount of swap, in bytes, used as cache memory",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "active",
        "description": "The total amount of buffer or page cache memory, in bytes, that is in active use",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inactive",
        "description": "The total amount of buffer or page cache memory, in bytes, that are free and available",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "swap_total",
        "description": "The total amount of swap available, in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "swap_free",
        "description": "The total amount of swap free, in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/memory_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmemory_info.yml&value=name%3A%20memory_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "memory_map",
    "description": "OS memory region map.",
    "url": "https://fleetdm.com/tables/memory_map",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "Region name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "start",
        "description": "Start address of memory region",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "end",
        "description": "End address of memory region",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/memory_map.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmemory_map.yml&value=name%3A%20memory_map%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "mounts",
    "description": "System mounted devices and filesystems (not process specific).",
    "url": "https://fleetdm.com/tables/mounts",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Returns the drive free space in gigabytes and as percentage.\n```\nSELECT path, type, ROUND((blocks_available * blocks_size * 10e-10), 2) AS free_gb, ROUND ((blocks_available * 1.0 / blocks * 1.0) * 100, 2) AS free_pc FROM mounts WHERE path = '/';\n```",
    "columns": [
      {
        "name": "device",
        "description": "Mounted device",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device_alias",
        "description": "Mounted device alias",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Mounted device path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Mounted device type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "blocks_size",
        "description": "Block size in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "blocks",
        "description": "Mounted device used blocks",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "blocks_free",
        "description": "Mounted device free blocks",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "blocks_available",
        "description": "Mounted device available blocks",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inodes",
        "description": "Mounted device used inodes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inodes_free",
        "description": "Mounted device free inodes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flags",
        "description": "Mounted device flags",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/mounts.yml"
  },
  {
    "name": "msr",
    "description": "Various pieces of data stored in the model specific register per processor. NOTE: the msr kernel module must be enabled, and osquery must be run as root.",
    "url": "https://fleetdm.com/tables/msr",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "processor_number",
        "description": "The processor number as reported in /proc/cpuinfo",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "turbo_disabled",
        "description": "Whether the turbo feature is disabled.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "turbo_ratio_limit",
        "description": "The turbo feature ratio limit.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "platform_info",
        "description": "Platform information.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "perf_ctl",
        "description": "Performance setting for the processor.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "perf_status",
        "description": "Performance status for the processor.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "feature_control",
        "description": "Bitfield controlling enabled features.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rapl_power_limit",
        "description": "Run Time Average Power Limiting power limit.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rapl_energy_status",
        "description": "Run Time Average Power Limiting energy status.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rapl_power_units",
        "description": "Run Time Average Power Limiting power units.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/msr.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fmsr.yml&value=name%3A%20msr%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "munki_info",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).<p> Code based on work by [macadmins/osquery-extension](https://github.com/macadmins/osquery-extension) and [Kolide](https://github.com/kolide/launcher).",
    "description": "Information from the last [Munki](https://github.com/munki/munki) run.",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "examples": "Output errors, warnings and problematic installations from Munki.\n```\nSELECT errors, warnings, problem_installs FROM munki_info ;\n```",
    "columns": [
      {
        "name": "console_user",
        "description": "The username of the user currently logged into the console of the Mac.",
        "required": false,
        "type": "text"
      },
      {
        "name": "end_time",
        "description": "The date and time at which the latest Munki run ended.",
        "required": false,
        "type": "text"
      },
      {
        "name": "errors",
        "description": "If Munki encountered any error during the last run, they will be returned in this column.",
        "required": false,
        "type": "text"
      },
      {
        "name": "manifest_name",
        "description": "The internal manifest name",
        "required": false,
        "type": "text"
      },
      {
        "name": "problem_installs",
        "description": "A list of installs that did not succeed, if any.",
        "required": false,
        "type": "text"
      },
      {
        "name": "start_time",
        "description": "The date and time at which the latest Munki run started.",
        "required": false,
        "type": "text"
      },
      {
        "name": "success",
        "description": "Shows if the Munki run was a success (true), or not (false).",
        "required": false,
        "type": "text"
      },
      {
        "name": "version",
        "description": "The version of Munki used during the last run.",
        "required": false,
        "type": "text"
      },
      {
        "name": "warnings",
        "description": "If Munki encountered any error during the last run, they will be returned in this column.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/munki_info",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/munki_info.yml"
  },
  {
    "name": "munki_installs",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).<p> Code based on work by [macadmins/osquery-extension](https://github.com/macadmins/osquery-extension) and [Kolide](https://github.com/kolide/launcher).",
    "description": "Software packages and other items [Munki](https://github.com/munki/munki) is managing.",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "examples": "See the version of software that has been deployed by Munki.\n```\nSELECT name, installed_version FROM munki_installs WHERE installed='true';\n```",
    "columns": [
      {
        "name": "end_time",
        "description": "The end time of the last Munki run.",
        "required": false,
        "type": "text"
      },
      {
        "name": "installed",
        "description": "Shows if Munki installed an item (true) or if it is simply available but not installed (false).",
        "required": false,
        "type": "text"
      },
      {
        "name": "installed_version",
        "description": "The version number of installed items.",
        "required": false,
        "type": "text"
      },
      {
        "name": "name",
        "description": "The name of items managed by Munki.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/munki_installs",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/munki_installs.yml"
  },
  {
    "name": "network_interfaces",
    "evented": false,
    "platforms": [
      "chrome"
    ],
    "description": "Uses the `chrome.enterprise.networkingAttributes` API to read information about the host's current network.",
    "columns": [
      {
        "name": "mac",
        "type": "text",
        "required": false,
        "description": "MAC address (only available to extensions force-installed by enterprise policy)"
      },
      {
        "name": "ipv4",
        "type": "text",
        "required": false,
        "description": "IPv4 address (only available to extensions force-installed by enterprise policy)"
      },
      {
        "name": "ipv6",
        "type": "text",
        "required": false,
        "description": "IPv6 address (only available to extensions force-installed by enterprise policy)"
      }
    ],
    "notes": "- This table is not a core osquery table. This table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).\n- Requires that the fleetd extension is force-installed by enterprise policy",
    "url": "https://fleetdm.com/tables/network_interfaces",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/network_interfaces.yml"
  },
  {
    "name": "nfs_shares",
    "description": "NFS shares exported by the host.",
    "url": "https://fleetdm.com/tables/nfs_shares",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List shares exported via NFS on Macs, and if they are read only (readonly=1) or not.\n```\nSELECT share, readonly FROM nfs_shares;\n```",
    "columns": [
      {
        "name": "share",
        "description": "Filesystem path to the share",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "options",
        "description": "Options string set on the export share",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "readonly",
        "description": "1 if the share is exported readonly else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/nfs_shares.yml"
  },
  {
    "name": "npm_packages",
    "description": "Node.js packages globally installed on a system.",
    "url": "https://fleetdm.com/tables/npm_packages",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List the author, description and more information about the NPM package called `webpack`, if installed:\n```sql SELECT author, description, directory, version FROM npm_packages WHERE name='webpack'; ```",
    "columns": [
      {
        "name": "name",
        "description": "Package display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Package-supplied version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Package-supplied description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "author",
        "description": "Package-supplied author",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "license",
        "description": "License under which package is launched",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "homepage",
        "description": "Package supplied homepage",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path at which this module resides",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "directory",
        "description": "Directory where node_modules are located",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "mount_namespace_id",
        "description": "Mount namespace id",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/npm_packages.yml"
  },
  {
    "name": "ntdomains",
    "description": "Display basic NT domain information of a Windows machine.",
    "url": "https://fleetdm.com/tables/ntdomains",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "If the system is joined to a domain, this query will return the domain name as well as all known domain controllers and their IP addresses.\n```\n   \n SELECT domain_name, domain_controller_name, domain_controller_address, status FROM ntdomains WHERE domain_name != \"\";\n\n```",
    "columns": [
      {
        "name": "name",
        "description": "The label by which the object is known.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "client_site_name",
        "description": "The name of the site where the domain controller is configured.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dc_site_name",
        "description": "The name of the site where the domain controller is located.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dns_forest_name",
        "description": "The name of the root of the DNS tree.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "domain_controller_address",
        "description": "The IP Address of the discovered domain controller..",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "domain_controller_name",
        "description": "The name of the discovered domain controller.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "domain_name",
        "description": "The name of the domain.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "The current status of the domain object.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/ntdomains.yml"
  },
  {
    "name": "ntfs_acl_permissions",
    "description": "Retrieve NTFS ACL permission information for files and directories.",
    "url": "https://fleetdm.com/tables/ntfs_acl_permissions",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "path",
        "description": "Path to the file or directory.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "type",
        "description": "Type of access mode for the access control entry.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "principal",
        "description": "User or group to which the ACE applies.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "access",
        "description": "Specific permissions that indicate the rights described by the ACE.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inherited_from",
        "description": "The inheritance policy of the ACE.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/ntfs_acl_permissions.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fntfs_acl_permissions.yml&value=name%3A%20ntfs_acl_permissions%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "ntfs_journal_events",
    "description": "Track time/action changes to files specified in configuration data.",
    "url": "https://fleetdm.com/tables/ntfs_journal_events",
    "platforms": [
      "windows"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "action",
        "description": "Change action (Write, Delete, etc)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "category",
        "description": "The category that the event originated from",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "old_path",
        "description": "Old path (renames only)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "record_timestamp",
        "description": "Journal record timestamp",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "record_usn",
        "description": "The update sequence number that identifies the journal record",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "node_ref_number",
        "description": "The ordinal that associates a journal record with a filename",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent_ref_number",
        "description": "The ordinal that associates a journal record with a filename's parent directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "drive_letter",
        "description": "The drive letter identifying the source journal",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "file_attributes",
        "description": "File attributes",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "partial",
        "description": "Set to 1 if either path or old_path only contains the file or folder name",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of file event",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/ntfs_journal_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fntfs_journal_events.yml&value=name%3A%20ntfs_journal_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "nvram",
    "description": "Apple NVRAM variable listing.",
    "url": "https://fleetdm.com/tables/nvram",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "If a Mac had a sleep failure, this query will return the reason for it.\n```\nSELECT name, value FROM nvram WHERE name='SleepWakeFailureString';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Variable name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "type",
        "description": "Data type (CFData, CFString, etc)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Raw variable data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/nvram.yml"
  },
  {
    "name": "nvram_info",
    "platforms": [
      "darwin"
    ],
    "description": "Information from nvram system call.",
    "columns": [
      {
        "name": "amfi_enabled",
        "type": "integer",
        "required": false,
        "description": "Apple Mobile File Integrity (AMFI) was first released in macOS 10.12. The daemon and service block attempts to run unsigned code. AMFI uses lanchd, code signatures, certificates, entitlements, and provisioning profiles to create a filtered entitlement dictionary for an app. AMFI is the macOS kernel module that enforces code-signing and library validation. Note: AMFI cannot be disabled with SIP enabled, but a change attempt can be made that will appear successful, and report incorrectly as successful. If the AMFI audit fails, and the SIP audit passes, this is still an issue the admin should research."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/nvram_info",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/nvram_info.yml"
  },
  {
    "name": "oem_strings",
    "description": "OEM defined strings retrieved from SMBIOS.",
    "url": "https://fleetdm.com/tables/oem_strings",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "handle",
        "description": "Handle, or instance number, associated with the Type 11 structure",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "number",
        "description": "The string index of the structure",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "The value of the OEM string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/oem_strings.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Foem_strings.yml&value=name%3A%20oem_strings%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "office_mru",
    "description": "View recently opened Office documents.",
    "url": "https://fleetdm.com/tables/office_mru",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from office_mru;\n```",
    "columns": [
      {
        "name": "application",
        "description": "Associated Office application",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Office application version number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "File path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_opened_time",
        "description": "Most recent opened time file was opened",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sid",
        "description": "User SID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/office_mru.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Foffice_mru.yml&value=name%3A%20office_mru%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "orbit_info",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "description": "Returns information about the orbit instance.",
    "columns": [
      {
        "name": "version",
        "type": "text",
        "required": false,
        "description": "Version of the orbit instance."
      },
      {
        "name": "device_auth_token",
        "type": "text",
        "required": false,
        "description": "Current Fleet Desktop token in the instance."
      },
      {
        "name": "enrolled",
        "type": "text",
        "required": false,
        "description": "Returns whether the Orbit instance is enrolled to Fleet (true/false)."
      },
      {
        "name": "last_recorded_error",
        "type": "text",
        "required": false,
        "description": "Last recorded error in Orbit."
      },
      {
        "name": "orbit_channel",
        "type": "text",
        "required": false,
        "description": "The Update Framework update channel used for the orbit executable."
      },
      {
        "name": "osqueryd_channel",
        "type": "text",
        "required": false,
        "description": "The Update Framework update channel used for the osqueryd executable."
      },
      {
        "name": "desktop_channel",
        "type": "text",
        "required": false,
        "description": "The Update Framework update channel used for the Fleet Desktop executable."
      },
      {
        "name": "desktop_version",
        "type": "text",
        "required": false,
        "description": "The version of the fleet-desktop instance. Blank if fleet-desktop is not installed."
      },
      {
        "name": "uptime",
        "type": "bigint",
        "required": false,
        "description": "Uptime of the orbit process in seconds."
      },
      {
        "name": "scripts_enabled",
        "type": "integer",
        "required": false,
        "description": "1 if running scripts is enabled, 0 if disabled."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/orbit_info",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/orbit_info.yml"
  },
  {
    "name": "os_version",
    "description": "A single row containing the operating system name and version.",
    "url": "https://fleetdm.com/tables/os_version",
    "platforms": [
      "darwin",
      "linux",
      "windows",
      "chrome"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- On ChromeOS, this table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).",
    "examples": "See the OS version as well as the CPU architecture in use (X86 vs ARM for example)\n```\nSELECT arch, version FROM os_version;\n```",
    "columns": [
      {
        "name": "name",
        "description": "Distribution or product name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Pretty, suitable for presentation, OS version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "major",
        "description": "Major release version",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minor",
        "description": "Minor release version",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "patch",
        "description": "Optional patch release",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "build",
        "description": "Optional build-specific or variant string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "platform",
        "description": "OS Platform or ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "platform_like",
        "description": "Closely related platforms",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "codename",
        "description": "OS version codename",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "arch",
        "description": "OS Architecture",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "extra",
        "description": "Optional extra release specification",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "darwin"
        ]
      },
      {
        "name": "install_date",
        "description": "The install date of the OS.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "mount_namespace_id",
        "description": "Mount namespace id",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/os_version.yml"
  },
  {
    "name": "osquery_events",
    "description": "Information about the event publishers and subscribers.",
    "url": "https://fleetdm.com/tables/osquery_events",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify osquery event types which have no subscriber.\n```\nSELECT * from osquery_events WHERE subscriptions='0';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Event publisher or subscriber name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "publisher",
        "description": "Name of the associated publisher",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Either publisher or subscriber",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subscriptions",
        "description": "Number of subscriptions the publisher received or subscriber used",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "events",
        "description": "Number of events emitted or received since osquery started",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "refreshes",
        "description": "Publisher only: number of runloop restarts",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "active",
        "description": "1 if the publisher or subscriber is active else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/osquery_events.yml"
  },
  {
    "name": "osquery_extensions",
    "description": "List of active osquery extensions.",
    "url": "https://fleetdm.com/tables/osquery_extensions",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify osquery extensions in use that are not part of osquery core.\n```\nSELECT name, path from osquery_extensions WHERE type IS NOT 'core';\n```",
    "columns": [
      {
        "name": "uuid",
        "description": "The transient ID assigned for communication",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Extension's name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Extension's version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sdk_version",
        "description": "osquery SDK version used to build the extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of the extension's Thrift connection or library path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "SDK extension type: core, extension, or module",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/osquery_extensions.yml"
  },
  {
    "name": "osquery_flags",
    "description": "Configurable flags that modify osquery's behavior.",
    "url": "https://fleetdm.com/tables/osquery_flags",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "If disable_events has a value of false, events are enabled.\n```\nSELECT description, name, value FROM osquery_flags WHERE name='disable_events';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Flag name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Flag type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Flag description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "default_value",
        "description": "Flag default value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Flag value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "shell_only",
        "description": "Is the flag shell only?",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/osquery_flags.yml"
  },
  {
    "name": "osquery_info",
    "description": "Top level information about the running version of osquery.",
    "url": "https://fleetdm.com/tables/osquery_info",
    "platforms": [
      "darwin",
      "windows",
      "linux",
      "chrome"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- On ChromeOS, this table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).",
    "examples": "See the version of the currently running osquery.\n```\nSELECT version FROM osquery_info; \n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread/handle) ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "uuid",
        "description": "Unique ID provided by the system",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "instance_id",
        "description": "Unique, long-lived ID per instance of osquery",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "version",
        "description": "osquery toolkit version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "config_hash",
        "description": "Hash of the working configuration state",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "config_valid",
        "description": "1 if the config was loaded and considered valid, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "extensions",
        "description": "osquery extensions status",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "build_platform",
        "description": "osquery toolkit build platform",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "build_distro",
        "description": "osquery toolkit platform distribution name (os version)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "start_time",
        "description": "UNIX time in seconds when the process started",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "watcher",
        "description": "Process (or thread/handle) ID of optional watcher process",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "platform_mask",
        "description": "The osquery platform bitmask",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/osquery_info.yml"
  },
  {
    "name": "osquery_packs",
    "description": "Information about the current query packs that are loaded in osquery.",
    "url": "https://fleetdm.com/tables/osquery_packs",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See query packs currently active on osquery.\n```\nSELECT name FROM osquery_packs WHERE active='1';\n```",
    "columns": [
      {
        "name": "name",
        "description": "The given name for this query pack",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "platform",
        "description": "Platforms this query is supported on",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Minimum osquery version that this query will run on",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "shard",
        "description": "Shard restriction limit, 1-100, 0 meaning no restriction",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "discovery_cache_hits",
        "description": "The number of times that the discovery query used cached values since the last time the config was reloaded",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "discovery_executions",
        "description": "The number of times that the discovery queries have been executed since the last time the config was reloaded",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "active",
        "description": "Whether this pack is active (the version, platform and discovery queries match) yes=1, no=0.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/osquery_packs.yml"
  },
  {
    "name": "osquery_registry",
    "description": "List the osquery registry plugins.",
    "url": "https://fleetdm.com/tables/osquery_registry",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See the list of tables available on this instance of osquery.\n```\nSELECT DISTINCT name FROM osquery_registry;\n```",
    "columns": [
      {
        "name": "registry",
        "description": "Name of the osquery registry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Name of the plugin item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "owner_uuid",
        "description": "Extension route UUID (0 for core)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "internal",
        "description": "1 If the plugin is internal else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "active",
        "description": "1 If this plugin is active else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/osquery_registry.yml"
  },
  {
    "name": "osquery_schedule",
    "description": "Information about the current queries that are scheduled in osquery.",
    "url": "https://fleetdm.com/tables/osquery_schedule",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify scheduled queries that have been denylisted by the osquery watchdog. This could indicate queries that required a lot of resources to be executed. They will not be executed again until osquery restarts.\n```\nSELECT name, query FROM osquery_schedule WHERE denylisted='1';\n```",
    "columns": [
      {
        "name": "name",
        "description": "The given name for this query",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "query",
        "description": "The exact query to run",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "interval",
        "description": "The interval in seconds to run this query, not an exact interval",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "executions",
        "description": "Number of times the query was executed",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_executed",
        "description": "UNIX time stamp in seconds of the last completed execution",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "denylisted",
        "description": "1 if the query is denylisted else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "output_size",
        "description": "Cumulative total number of bytes generated by the resultant rows of the query",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "wall_time",
        "description": "Total wall time in seconds spent executing (deprecated), hidden=True",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "wall_time_ms",
        "description": "Total wall time in milliseconds spent executing",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_wall_time_ms",
        "description": "Wall time in milliseconds of the latest execution",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user_time",
        "description": "Total user time in milliseconds spent executing",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_user_time",
        "description": "User time in milliseconds of the latest execution",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "system_time",
        "description": "Total system time in milliseconds spent executing",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_system_time",
        "description": "System time in milliseconds of the latest execution",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "average_memory",
        "description": "Average of the bytes of resident memory left allocated after collecting results",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_memory",
        "description": "Resident memory in bytes left allocated after collecting results of the latest execution",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/osquery_schedule.yml"
  },
  {
    "name": "package_bom",
    "description": "macOS package bill of materials (BOM) file list.",
    "url": "https://fleetdm.com/tables/package_bom",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List the bill of materials of a package. The receipts directory contains packages to installed applications.\n```\nSELECT * FROM package_bom WHERE path='/private/var/db/receipts/com.yubico.ykman.bom';\n```",
    "columns": [
      {
        "name": "filepath",
        "description": "Package file or directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "Expected user of file or directory",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Expected group of file or directory",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "Expected permissions",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Expected file size",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "modified_time",
        "description": "Timestamp the file was installed",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of package bom",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/package_bom.yml"
  },
  {
    "name": "package_install_history",
    "description": "macOS package install history.",
    "url": "https://fleetdm.com/tables/package_install_history",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See a list of packages installed in the last week.\n```\nSELECT name, version, source,  datetime(time,'unixepoch') AS install_time from package_install_history WHERE install_time >= datetime('now','-7 days');\n```",
    "columns": [
      {
        "name": "package_id",
        "description": "Label packageIdentifiers",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Label date as UNIX timestamp",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Package display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Package display version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Install source: usually the installer process name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "content_type",
        "description": "Package content_type (optional)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/package_install_history.yml"
  },
  {
    "name": "package_receipts",
    "description": "macOS package receipt details.",
    "url": "https://fleetdm.com/tables/package_receipts",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List the location of receipt files related to installed packages.\n```\nSELECT * FROM package_receipts;\n```",
    "columns": [
      {
        "name": "package_id",
        "description": "Package domain identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "package_filename",
        "description": "Filename of original .pkg file",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": true
      },
      {
        "name": "version",
        "description": "Installed package version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "location",
        "description": "Optional relative install path on volume",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "install_time",
        "description": "Timestamp of install time",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "installer_name",
        "description": "Name of installer process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of receipt plist",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/package_receipts.yml"
  },
  {
    "name": "parse_ini",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Parse a file as INI configuration.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "columns": [
      {
        "name": "path",
        "description": "Path of the file to read.",
        "required": true,
        "type": "text"
      },
      {
        "name": "fullkey",
        "description": "Key including any parent keys.",
        "type": "text",
        "required": false
      },
      {
        "name": "parent",
        "description": "Parent key when keys are nested in the document.",
        "required": false,
        "type": "text"
      },
      {
        "name": "key",
        "description": "JSON key or array index.",
        "required": false,
        "type": "text"
      },
      {
        "name": "value",
        "description": "JSON value",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/parse_ini",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/parse_ini.yml"
  },
  {
    "name": "parse_json",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Parses an entire file as JSON. See `parse_jsonl` where multiple JSON documents are supported.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "columns": [
      {
        "name": "path",
        "description": "Path of the file to read.",
        "required": true,
        "type": "text"
      },
      {
        "name": "fullkey",
        "description": "Same as `key` in this table. See `parse_jsonl` where multiple JSON documents are supported.",
        "required": false,
        "type": "text"
      },
      {
        "name": "parent",
        "description": "Parent key when keys are nested in the document.",
        "required": false,
        "type": "text"
      },
      {
        "name": "key",
        "description": "JSON key or array index.",
        "required": false,
        "type": "text"
      },
      {
        "name": "value",
        "description": "JSON value",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/parse_json",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/parse_json.yml"
  },
  {
    "name": "parse_jsonl",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Parses each line of a file as a separate JSON document. See `parse_json` to treat an entire file as a single JSON document.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "columns": [
      {
        "name": "path",
        "description": "Path of the file to read.",
        "required": true,
        "type": "text"
      },
      {
        "name": "fullkey",
        "description": "Key including any parent keys or document indices.",
        "required": false,
        "type": "text"
      },
      {
        "name": "parent",
        "description": "Parent key when keys are nested in the document.",
        "required": false,
        "type": "text"
      },
      {
        "name": "key",
        "description": "INI key",
        "required": false,
        "type": "text"
      },
      {
        "name": "value",
        "description": "INI value",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/parse_jsonl",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/parse_jsonl.yml"
  },
  {
    "name": "parse_xml",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Parses a file as an XML document.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "columns": [
      {
        "name": "path",
        "description": "Path of the file to read.",
        "required": true,
        "type": "text"
      },
      {
        "name": "fullkey",
        "description": "Key including any parent keys.",
        "required": false,
        "type": "text"
      },
      {
        "name": "parent",
        "description": "Parent key when keys are nested in the document.",
        "required": false,
        "type": "text"
      },
      {
        "name": "key",
        "description": "XML key",
        "required": false,
        "type": "text"
      },
      {
        "name": "value",
        "description": "XML value",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/parse_xml",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/parse_xml.yml"
  },
  {
    "name": "password_policy",
    "description": "Password Policies for macOS.",
    "url": "https://fleetdm.com/tables/password_policy",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "This policy query will return a 1 if the password policy requires passwords that are 10 characters or longer.\n```\nSELECT 1 FROM (SELECT cast(lengthtxt as integer(2)) minlength FROM (SELECT SUBSTRING(length, 1, 2) AS lengthtxt FROM (SELECT policy_description, policy_identifier, split(policy_content, '{', 1) AS length FROM password_policy WHERE policy_identifier LIKE '%minLength')) WHERE minlength >= 10);\n``` ",
    "columns": [
      {
        "name": "uid",
        "description": "User ID for the policy. Returns `-1` if the policy applies to all users.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "policy_identifier",
        "description": "Policy identifier, such as `ProfilePayload:1d33ef8c-da1c-4534-8458-95a4d43d849e:minLength`.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "policy_content",
        "description": "Policy content, such as `policyAttributePassword matches '.{10,}'`.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "policy_description",
        "description": "Policy description, such as `Contain at least 10 characters.`",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/password_policy.yml"
  },
  {
    "name": "patches",
    "description": "Lists all the patches applied. Note: This does not include patches applied via MSI or downloaded from Windows Update (e.g. Service Packs).",
    "url": "https://fleetdm.com/tables/patches",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from patches\n```",
    "columns": [
      {
        "name": "csname",
        "description": "The name of the host the patch is installed on.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hotfix_id",
        "description": "The KB ID of the patch.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "caption",
        "description": "Short description of the patch.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Fuller description of the patch.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fix_comments",
        "description": "Additional comments about the patch.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "installed_by",
        "description": "The system context in which the patch as installed.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "install_date",
        "description": "Indicates when the patch was installed. Lack of a value does not indicate that the patch was not installed.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "installed_on",
        "description": "The date when the patch was installed.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/patches.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fpatches.yml&value=name%3A%20patches%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "pci_devices",
    "description": "PCI devices active on the host system.",
    "url": "https://fleetdm.com/tables/pci_devices",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "This table allows you to list PCI devices. With this query, identify devices with a specific model ID. This can be useful when trying to identify systems that use common hardware, for example, when trying to target firmware updates or understand similarities between problematic systems.\n```\nSELECT driver, model, vendor, vendor_id FROM pci_devices WHERE model_id='0x1001';\n```",
    "columns": [
      {
        "name": "pci_slot",
        "description": "PCI Device used slot",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pci_class",
        "description": "PCI Device class",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver",
        "description": "PCI Device used driver",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor",
        "description": "PCI Device vendor",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor_id",
        "description": "Hex encoded PCI Device vendor identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model",
        "description": "PCI Device model",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model_id",
        "description": "Hex encoded PCI Device model identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pci_class_id",
        "description": "PCI Device class ID in hex format",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "pci_subclass_id",
        "description": "PCI Device  subclass in hex format",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "pci_subclass",
        "description": "PCI Device subclass",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "subsystem_vendor_id",
        "description": "Vendor ID of PCI device subsystem",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "subsystem_vendor",
        "description": "Vendor of PCI device subsystem",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "subsystem_model_id",
        "description": "Model ID of PCI device subsystem",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "subsystem_model",
        "description": "Device description of PCI device subsystem",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/pci_devices.yml"
  },
  {
    "name": "physical_disk_performance",
    "description": "Provides provides raw data from performance counters that monitor hard or fixed disk drives on the system.",
    "url": "https://fleetdm.com/tables/physical_disk_performance",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "Name of the physical disk",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "avg_disk_bytes_per_read",
        "description": "Average number of bytes transferred from the disk during read operations",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "avg_disk_bytes_per_write",
        "description": "Average number of bytes transferred to the disk during write operations",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "avg_disk_read_queue_length",
        "description": "Average number of read requests that were queued for the selected disk during the sample interval",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "avg_disk_write_queue_length",
        "description": "Average number of write requests that were queued for the selected disk during the sample interval",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "avg_disk_sec_per_read",
        "description": "Average time, in seconds, of a read operation of data from the disk",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "avg_disk_sec_per_write",
        "description": "Average time, in seconds, of a write operation of data to the disk",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "current_disk_queue_length",
        "description": "Number of requests outstanding on the disk at the time the performance data is collected",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "percent_disk_read_time",
        "description": "Percentage of elapsed time that the selected disk drive is busy servicing read requests",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "percent_disk_write_time",
        "description": "Percentage of elapsed time that the selected disk drive is busy servicing write requests",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "percent_disk_time",
        "description": "Percentage of elapsed time that the selected disk drive is busy servicing read or write requests",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "percent_idle_time",
        "description": "Percentage of time during the sample interval that the disk was idle",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/physical_disk_performance.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fphysical_disk_performance.yml&value=name%3A%20physical_disk_performance%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "pipes",
    "description": "Named and Anonymous pipes.",
    "url": "https://fleetdm.com/tables/pipes",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from pipes\n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process ID of the process to which the pipe belongs",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Name of the pipe",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "instances",
        "description": "Number of instances of the named pipe",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max_instances",
        "description": "The maximum number of instances creatable for this pipe",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flags",
        "description": "The flags indicating whether this pipe connection is a server or client end, and if the pipe for sending messages or bytes",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/pipes.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fpipes.yml&value=name%3A%20pipes%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "platform_info",
    "description": "Information about EFI/UEFI/ROM and platform/boot.",
    "url": "https://fleetdm.com/tables/platform_info",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See version information about the boot system, such as iBoot on Apple Silicon\n```\nSELECT version FROM platform_info;\n```",
    "columns": [
      {
        "name": "vendor",
        "description": "Platform code vendor",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Platform code version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "date",
        "description": "Self-reported platform code update date",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "revision",
        "description": "BIOS major and minor revision",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "extra",
        "description": "Platform-specific additional information",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "firmware_type",
        "description": "The type of firmware (uefi, bios, iboot, openfirmware, unknown).",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "address",
        "description": "Relative address of firmware mapping",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux",
          "macOS"
        ]
      },
      {
        "name": "size",
        "description": "Size in bytes of firmware",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux",
          "macOS"
        ]
      },
      {
        "name": "volume_size",
        "description": "(Optional) size of firmware volume",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux",
          "macOS"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/platform_info.yml"
  },
  {
    "name": "plist",
    "description": "Read and parse a plist file.",
    "url": "https://fleetdm.com/tables/plist",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Read the contents of a plist file, formatted into a table\n```\nSELECT key, subkey, value FROM plist WHERE path LIKE '/Users/%%/Library/Preferences/com.apple.Terminal.plist';\n```",
    "columns": [
      {
        "name": "key",
        "description": "Preference top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subkey",
        "description": "Intermediate key path, includes lists/dicts",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "String value of most CF types",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "(required) read preferences from a plist",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/plist.yml"
  },
  {
    "name": "pmset",
    "platforms": [
      "darwin"
    ],
    "description": "Retrieves macOS power settings with the `pmset -g` command.",
    "columns": [
      {
        "name": "getting",
        "type": "text",
        "required": false,
        "description": "Allows specifying a getting option when executing pmset."
      },
      {
        "name": "json_result",
        "type": "text",
        "required": false,
        "description": "Result of the command in JSON format."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd installers can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/pmset",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/pmset.yml"
  },
  {
    "name": "portage_keywords",
    "description": "A summary about portage configurations like keywords, mask and unmask.",
    "url": "https://fleetdm.com/tables/portage_keywords",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "package",
        "description": "Package name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "The version which are affected by the use flags, empty means all",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "keyword",
        "description": "The keyword applied to the package",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mask",
        "description": "If the package is masked",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "unmask",
        "description": "If the package is unmasked",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/portage_keywords.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fportage_keywords.yml&value=name%3A%20portage_keywords%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "portage_packages",
    "description": "List of currently installed packages.",
    "url": "https://fleetdm.com/tables/portage_packages",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "package",
        "description": "Package name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "The version which are affected by the use flags, empty means all",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "slot",
        "description": "The slot used by package",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "build_time",
        "description": "Unix time when package was built",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "repository",
        "description": "From which repository the ebuild was used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eapi",
        "description": "The eapi for the ebuild",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "The size of the package",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "world",
        "description": "If package is in the world file",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/portage_packages.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fportage_packages.yml&value=name%3A%20portage_packages%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "portage_use",
    "description": "List of enabled portage USE values for specific package.",
    "url": "https://fleetdm.com/tables/portage_use",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "package",
        "description": "Package name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "The version of the installed package",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "use",
        "description": "USE flag which has been enabled for package",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/portage_use.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fportage_use.yml&value=name%3A%20portage_use%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "power_sensors",
    "description": "Machine power (currents, voltages, wattages, etc) sensors.",
    "url": "https://fleetdm.com/tables/power_sensors",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Returns useful results on Intel Macs only.",
    "examples": "See the total power usage of an Intel Mac.\n```\nSELECT * FROM power_sensors WHERE key='PSTR';\n```",
    "columns": [
      {
        "name": "key",
        "description": "The SMC key on macOS",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "category",
        "description": "The sensor category: currents, voltage, wattage",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Name of power source",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Power in Watts",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/power_sensors.yml"
  },
  {
    "name": "powershell_events",
    "description": "Powershell script blocks reconstructed to their full script content, this table requires script block logging to be enabled.",
    "url": "https://fleetdm.com/tables/powershell_events",
    "platforms": [
      "windows"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from powershell_events where cosine_similarity < 0.25;\n```",
    "columns": [
      {
        "name": "time",
        "description": "Timestamp the event was received by the osquery event publisher",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "datetime",
        "description": "System time at which the Powershell script event occurred",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "script_block_id",
        "description": "The unique GUID of the powershell script to which this block belongs",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "script_block_count",
        "description": "The total number of script blocks for this script",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "script_text",
        "description": "The text content of the Powershell script",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "script_name",
        "description": "The name of the Powershell script",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "script_path",
        "description": "The path for the Powershell script",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cosine_similarity",
        "description": "How similar the Powershell script is to a provided 'normal' character frequency",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/powershell_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fpowershell_events.yml&value=name%3A%20powershell_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "preferences",
    "description": "macOS defaults and managed preferences.",
    "url": "https://fleetdm.com/tables/preferences",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)\n- The `value` column will be empty for keys that contain binary data.",
    "examples": "This table reads a huge amount of preferences, including on third-party apps.\n```\nSELECT * FROM users CROSS JOIN preferences USING (username);\n```",
    "columns": [
      {
        "name": "domain",
        "description": "Application ID usually in com.name.product format",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "key",
        "description": "Preference top-level key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "subkey",
        "description": "Intemediate key path, includes lists/dicts",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "String value of most CF types",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "forced",
        "description": "1 if the value is forced/managed, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "(optional) read preferences for a specific user",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "host",
        "description": "'current' or 'any' host, where 'current' takes precedence",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/preferences.yml"
  },
  {
    "name": "prefetch",
    "description": "Prefetch files show metadata related to file execution.",
    "url": "https://fleetdm.com/tables/prefetch",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from prefetch;\n```",
    "columns": [
      {
        "name": "path",
        "description": "Prefetch file path.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "filename",
        "description": "Executable filename.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hash",
        "description": "Prefetch CRC hash.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_run_time",
        "description": "Most recent time application was run.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "other_run_times",
        "description": "Other execution times in prefetch file.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "run_count",
        "description": "Number of times the application has been run.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Application file size.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "volume_serial",
        "description": "Volume serial number.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "volume_creation",
        "description": "Volume creation time.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "accessed_files_count",
        "description": "Number of files accessed.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "accessed_directories_count",
        "description": "Number of directories accessed.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "accessed_files",
        "description": "Files accessed by application within ten seconds of launch.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "accessed_directories",
        "description": "Directories accessed by application within ten seconds of launch.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/prefetch.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fprefetch.yml&value=name%3A%20prefetch%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "privacy_preferences",
    "description": "Information on Chrome features that can affect a user's privacy, available from the [chrome.privacy APIs](https://developer.chrome.com/docs/extensions/reference/privacy/)",
    "platforms": [
      "chrome"
    ],
    "evented": false,
    "columns": [
      {
        "name": "network_prediction_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "web_rtc_ip_handling_policy",
        "description": "One of \"default\", \"default_public_and_private_interfaces\", \"default_public_interface_only\", or \"disable_non_proxied_udp\" * Available for Chrome 48+",
        "required": false,
        "type": "text"
      },
      {
        "name": "autofill_address_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "autofill_credit_card_enabled",
        "description": "1 if enabled else 0 * Available for Chrome 70+",
        "required": false,
        "type": "integer"
      },
      {
        "name": "autofill_enabled",
        "description": "1 if enabled else 0 - * Deprecated since Chrome 70, please use privacy.services.autofillAddressEnabled and privacy.services.autofillCreditCardEnabled. This currently remains for backward compatibility and will be removed in the future.",
        "required": false,
        "type": "integer"
      },
      {
        "name": "save_passwords_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "safe_browsing_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "safe_browsing_extended_reporting_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "search_suggest_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "spelling_service_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "translation_service_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "ad_measurement_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "do_not_track_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "fledge_enabled",
        "description": "1 if enabled else 0 * Available for Chrome 111+",
        "required": false,
        "type": "integer"
      },
      {
        "name": "hyperlink_auditing_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "privacy_sandbox_enabled",
        "description": "1 if enabled else 0 - * Available for Chrome 90+ Deprecated since Chrome 111, see https://developer.chrome.com/docs/extensions/reference/privacy/#property-websites-privacySandboxEnabled",
        "required": false,
        "type": "integer"
      },
      {
        "name": "protected_content_enabled",
        "description": "1 if enabled else 0 - * Windows and ChromeOS only",
        "required": false,
        "type": "integer"
      },
      {
        "name": "referrers_enabled",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "third_party_cookies_allowed",
        "description": "1 if enabled else 0",
        "required": false,
        "type": "integer"
      },
      {
        "name": "topics_enabled",
        "description": "1 if enabled else 0 * Available for Chrome 111+",
        "required": false,
        "type": "integer"
      }
    ],
    "notes": "- This table is not a core osquery table. This table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).",
    "url": "https://fleetdm.com/tables/privacy_preferences",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/privacy_preferences.yml"
  },
  {
    "name": "process_envs",
    "description": "A key/value table of environment variables for each process.",
    "url": "https://fleetdm.com/tables/process_envs",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See what PATH is configured as an environment variable.\n```\nSELECT DISTINCT value, key FROM process_envs WHERE key='PATH';\n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "key",
        "description": "Environment variable name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Environment variable value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/process_envs.yml"
  },
  {
    "name": "process_etw_events",
    "description": "Windows process execution events.",
    "url": "https://fleetdm.com/tables/process_etw_events",
    "platforms": [
      "windows"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from process_etw_events WHERE datetime BETWEEN '2022-11-18 16:40:00' AND '2022-11-18 16:50:00';\n```",
    "columns": [
      {
        "name": "type",
        "description": "Event Type (ProcessStart, ProcessStop)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ppid",
        "description": "Parent Process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "session_id",
        "description": "Session ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flags",
        "description": "Process Flags",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exit_code",
        "description": "Exit Code - Present only on ProcessStop events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of executed binary",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cmdline",
        "description": "Command Line",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "User rights - primary token username",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "token_elevation_type",
        "description": "Primary token elevation type - Present only on ProcessStart events",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "token_elevation_status",
        "description": "Primary token elevation status - Present only on ProcessStart events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mandatory_label",
        "description": "Primary token mandatory label sid - Present only on ProcessStart events",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "datetime",
        "description": "Event timestamp in DATETIME format",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time_windows",
        "description": "Event timestamp in Windows format",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Event timestamp in Unix format",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "header_pid",
        "description": "Process ID of the process reporting the event",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "process_sequence_number",
        "description": "Process Sequence Number - Present only on ProcessStart events",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "parent_process_sequence_number",
        "description": "Parent Process Sequence Number - Present only on ProcessStart events",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/process_etw_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fprocess_etw_events.yml&value=name%3A%20process_etw_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "process_events",
    "description": "Track time/action process executions.",
    "url": "https://fleetdm.com/tables/process_events",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of executed file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "File mode permissions",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cmdline",
        "description": "Command line arguments (argv)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cmdline_size",
        "description": "Actual size (bytes) of command line arguments",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "env",
        "description": "Environment variables delimited by spaces",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "env_count",
        "description": "Number of environment variables",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "env_size",
        "description": "Actual size (bytes) of environment list",
        "type": "bigint",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "cwd",
        "description": "The process current working directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "auid",
        "description": "Audit User ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "User ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "euid",
        "description": "Effective user ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Group ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "egid",
        "description": "Effective group ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "owner_uid",
        "description": "File owner user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "owner_gid",
        "description": "File owner group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "atime",
        "description": "File last access in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtime",
        "description": "File modification in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ctime",
        "description": "File last metadata change in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "btime",
        "description": "File creation in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "overflows",
        "description": "List of structures that overflowed",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Process parent's PID, or -1 if cannot be determined.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uptime",
        "description": "Time of execution in system uptime",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "OpenBSM Attribute: Status of the process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "fsuid",
        "description": "Filesystem user ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "suid",
        "description": "Saved user ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "fsgid",
        "description": "Filesystem group ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "sgid",
        "description": "Saved group ID at process start",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "syscall",
        "description": "Syscall name: fork, vfork, clone, execve, execveat",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/process_events.yml"
  },
  {
    "name": "process_file_events",
    "description": "A File Integrity Monitor implementation using the audit service.",
    "url": "https://fleetdm.com/tables/process_file_events",
    "platforms": [
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "This table will only include events for changes and files in directories that existed before the fleetd agent starts.",
    "columns": [
      {
        "name": "operation",
        "description": "Operation type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ppid",
        "description": "Parent process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "executable",
        "description": "The executable path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "partial",
        "description": "True if this is a partial event (i.e.: this process existed before we started osquery)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cwd",
        "description": "The current working directory of the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "The path associated with the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dest_path",
        "description": "The canonical path associated with the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "The uid of the process performing the action",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "The gid of the process performing the action",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "auid",
        "description": "Audit user ID of the process using the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "euid",
        "description": "Effective user ID of the process using the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "egid",
        "description": "Effective group ID of the process using the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fsuid",
        "description": "Filesystem user ID of the process using the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fsgid",
        "description": "Filesystem group ID of the process using the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "suid",
        "description": "Saved user ID of the process using the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sgid",
        "description": "Saved group ID of the process using the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uptime",
        "description": "Time of execution in system uptime",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/process_file_events.yml"
  },
  {
    "name": "process_memory_map",
    "description": "Process memory mapped files and pseudo device/regions.",
    "url": "https://fleetdm.com/tables/process_memory_map",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See the memory ranges with write permissions assigned to processes.\n```\nSELECT * FROM process_memory_map WHERE permissions LIKE '%w%';\n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "start",
        "description": "Virtual start address (hex)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "end",
        "description": "Virtual end address (hex)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "permissions",
        "description": "r=read, w=write, x=execute, p=private (cow)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "offset",
        "description": "Offset into mapped path",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "device",
        "description": "MA:MI Major/minor device ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inode",
        "description": "Mapped path inode, 0 means uninitialized (BSS)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to mapped file or mapped type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pseudo",
        "description": "1 If path is a pseudo path, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/process_memory_map.yml"
  },
  {
    "name": "process_namespaces",
    "description": "Linux namespaces for processes running on the host system.",
    "url": "https://fleetdm.com/tables/process_namespaces",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from process_namespaces where pid = 1\n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "cgroup_namespace",
        "description": "cgroup namespace inode",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ipc_namespace",
        "description": "ipc namespace inode",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mnt_namespace",
        "description": "mnt namespace inode",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "net_namespace",
        "description": "net namespace inode",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_namespace",
        "description": "pid namespace inode",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user_namespace",
        "description": "user namespace inode",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uts_namespace",
        "description": "uts namespace inode",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/process_namespaces.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fprocess_namespaces.yml&value=name%3A%20process_namespaces%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "process_open_files",
    "description": "File descriptors for each process.",
    "url": "https://fleetdm.com/tables/process_open_files",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See what processes have which files open, for example, what processes are currently interacting with files with 1Password in their name?\n```\nSELECT f.path file_path, p.path process_path FROM process_open_files f JOIN processes p ON p.pid = f.pid WHERE f.path LIKE '%1Password%';\n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "fd",
        "description": "Process-specific file descriptor number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Filesystem path of descriptor",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/process_open_files.yml"
  },
  {
    "name": "process_open_pipes",
    "description": "Pipes and partner processes for each process.",
    "url": "https://fleetdm.com/tables/process_open_pipes",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from process_open_pipes\n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fd",
        "description": "File descriptor",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "Pipe open mode (r/w)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inode",
        "description": "Pipe inode number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Pipe Type: named vs unnamed/anonymous",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "partner_pid",
        "description": "Process ID of partner process sharing a particular pipe",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "partner_fd",
        "description": "File descriptor of shared pipe at partner's end",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "partner_mode",
        "description": "Mode of shared pipe at partner's end",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/process_open_pipes.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fprocess_open_pipes.yml&value=name%3A%20process_open_pipes%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "process_open_sockets",
    "description": "Processes which have open network sockets on the system.",
    "url": "https://fleetdm.com/tables/process_open_sockets",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "This table allows you to see network activity by process. With this query, list all connections made to or from a process, excluding connections to localhost and [RFC1918](https://en.wikipedia.org/wiki/Private_network) IP addresses.\n```\nSELECT pos.local_port, pos.remote_port, pos.remote_address, p.pid, p.path FROM process_open_sockets pos JOIN processes p ON pos.pid = p.pid WHERE remote_address NOT LIKE '192.168%' AND remote_address NOT LIKE '10.%' AND remote_address NOT LIKE '172.16.%' AND remote_address NOT LIKE '127.%' AND remote_address!='0.0.0.0' AND remote_address NOT LIKE 'fe80%' AND remote_port!='0'; \n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fd",
        "description": "Socket file descriptor number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "socket",
        "description": "Socket handle or inode number",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "family",
        "description": "Network protocol (IPv4, IPv6)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protocol",
        "description": "Transport protocol (TCP/UDP)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_address",
        "description": "Socket local address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_address",
        "description": "Socket remote address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_port",
        "description": "Socket local port",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_port",
        "description": "Socket remote port",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "For UNIX sockets (family=AF_UNIX), the domain path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "TCP socket state",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows",
          "Linux",
          "macOS"
        ]
      },
      {
        "name": "net_namespace",
        "description": "The inode number of the network namespace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/process_open_sockets.yml"
  },
  {
    "name": "processes",
    "description": "All running processes on the host system.",
    "url": "https://fleetdm.com/tables/processes",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "List executables listening on network ports.\n```\nSELECT l.port, l.pid, p.name, p.path FROM listening_ports l JOIN processes p USING (pid); \n```",
    "columns": [
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "The process path or shorthand argv[0]",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to executed binary",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cmdline",
        "description": "Complete argv",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "Process state",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cwd",
        "description": "Process current working directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "root",
        "description": "Process virtual root directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "Unsigned user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Unsigned group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "euid",
        "description": "Unsigned effective user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "egid",
        "description": "Unsigned effective group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "suid",
        "description": "Unsigned saved user ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sgid",
        "description": "Unsigned saved group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "on_disk",
        "description": "The process path exists yes=1, no=0, unknown=-1",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "wired_size",
        "description": "Bytes of unpageable memory used by process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "resident_size",
        "description": "Bytes of private memory used by process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "total_size",
        "description": "Total virtual memory size",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user_time",
        "description": "CPU time in milliseconds spent in user space",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "system_time",
        "description": "CPU time in milliseconds spent in kernel space",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "disk_bytes_read",
        "description": "Bytes read from disk",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "disk_bytes_written",
        "description": "Bytes written to disk",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "start_time",
        "description": "Process start time in seconds since Epoch, in case of error -1",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "parent",
        "description": "Process parent's PID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pgroup",
        "description": "Process group",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "threads",
        "description": "Number of threads used by process",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "nice",
        "description": "Process nice level (-20 to 20, default 0)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "elevated_token",
        "description": "Process uses elevated token yes=1, no=0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "secure_process",
        "description": "Process is secure (IUM) yes=1, no=0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "protection_type",
        "description": "The protection type of the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "virtual_process",
        "description": "Process is virtual (e.g. System, Registry, vmmem) yes=1, no=0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "elapsed_time",
        "description": "Elapsed time in seconds this process has been running.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "handle_count",
        "description": "Total number of handles that the process has open. This number is the sum of the handles currently opened by each thread in the process.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "percent_processor_time",
        "description": "Returns elapsed time that all of the threads of this process used the processor to execute instructions in 100 nanoseconds ticks.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "upid",
        "description": "A 64bit pid that is never reused. Returns -1 if we couldn't gather them from the system.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "uppid",
        "description": "The 64bit parent pid that is never reused. Returns -1 if we couldn't gather them from the system.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "cpu_type",
        "description": "Indicates the specific processor designed for installation.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "cpu_subtype",
        "description": "Indicates the specific processor on which an entry may be used.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "translated",
        "description": "Indicates whether the process is running under the Rosetta Translation Environment, yes=1, no=0, error=-1.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "cgroup_path",
        "description": "The full hierarchical path of the process's control group",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/processes.yml"
  },
  {
    "name": "programs",
    "description": "Represents products as they are installed by Windows Installer. A product generally correlates to one installation package on Windows. Some fields may be blank as Windows installation details are left to the discretion of the product author.",
    "url": "https://fleetdm.com/tables/programs",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect name, install_location from programs where install_location not like 'C:\\Program Files%';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Commonly used product name.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Product version information.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "install_location",
        "description": "The installation location directory of the product.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "install_source",
        "description": "The installation source of the product.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "language",
        "description": "The language of the product.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "publisher",
        "description": "Name of the product supplier.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uninstall_string",
        "description": "Path and filename of the uninstaller.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "install_date",
        "description": "Date that this product was installed on the system. ",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "identifying_number",
        "description": "Product identification such as a serial number on software, or a die number on a hardware chip.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/programs.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fprograms.yml&value=name%3A%20programs%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "prometheus_metrics",
    "description": "Retrieve metrics from a Prometheus server.",
    "url": "https://fleetdm.com/tables/prometheus_metrics",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "target_name",
        "description": "Address of prometheus target",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "metric_name",
        "description": "Name of collected Prometheus metric",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "metric_value",
        "description": "Value of collected Prometheus metric",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "timestamp_ms",
        "description": "Unix timestamp of collected data in MS",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/prometheus_metrics.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fprometheus_metrics.yml&value=name%3A%20prometheus_metrics%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "puppet_info",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Information on the last [Puppet](https://puppet.com/) run. This table uses data from the `last_run_report` that Puppet creates.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "examples": "List all the information available about the last Puppet run.\n```\nSELECT * FROM puppet_info;\n```",
    "columns": [
      {
        "name": "cached_catalog_status",
        "description": "The status of Puppet catalogs cached on the system.",
        "required": false,
        "type": "text"
      },
      {
        "name": "catalog_uuid",
        "description": "The [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of the catalog downloaded by Puppet.",
        "required": false,
        "type": "text"
      },
      {
        "name": "code_id",
        "description": "The `code_id` links the catalog with the compile-time version of file resources using the `puppet:///` URI.",
        "required": false,
        "type": "text"
      },
      {
        "name": "configuration_version",
        "description": "The version of the Puppet configuration.",
        "required": false,
        "type": "text"
      },
      {
        "name": "corrective_change",
        "description": "A corrective change is triggered when Puppet detects a discrepency between the current state and the expected state of a value.",
        "required": false,
        "type": "text"
      },
      {
        "name": "environment",
        "description": "The environment name.",
        "required": false,
        "type": "text"
      },
      {
        "name": "host",
        "description": "The host on which Puppet is used.",
        "required": false,
        "type": "text"
      },
      {
        "name": "kind",
        "description": "Kind of Puppet run.",
        "required": false,
        "type": "text"
      },
      {
        "name": "master_used",
        "description": "The Puppet server used.",
        "required": false,
        "type": "text"
      },
      {
        "name": "noop",
        "description": "Indicates if Puppet was run in [noop](https://puppet.com/docs/puppet/latest/metaparameter.html#noop) mode.",
        "required": false,
        "type": "text"
      },
      {
        "name": "noop_prending",
        "description": "Items pending from a [noop](https://puppet.com/docs/puppet/latest/metaparameter.html#noop) run.",
        "required": false,
        "type": "text"
      },
      {
        "name": "puppet_version",
        "description": "The version of Puppet used during the last run.",
        "required": false,
        "type": "text"
      },
      {
        "name": "report_format",
        "description": "The format the Puppet report was exported as.",
        "required": false,
        "type": "text"
      },
      {
        "name": "status",
        "description": "The status of Puppet on this system.",
        "required": false,
        "type": "text"
      },
      {
        "name": "time",
        "description": "The time of the last Puppet run.",
        "required": false,
        "type": "text"
      },
      {
        "name": "transaction_completed",
        "description": "Indicates if the transaction completed or not.",
        "required": false,
        "type": "text"
      },
      {
        "name": "transaction_uuid",
        "description": "The [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of the transaction.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/puppet_info",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/puppet_info.yml"
  },
  {
    "name": "puppet_logs",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "Outputs [Puppet](https://puppet.com/) logs from the last run.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "examples": "List Puppet logs that are of a level of anything but informational.\n```\nSELECT * FROM puppet_logs WHERE level!='info';\n```",
    "columns": [
      {
        "name": "level",
        "description": "The level of the log item (info, error, etc).",
        "required": false,
        "type": "text"
      },
      {
        "name": "message",
        "description": "The log message content.",
        "required": false,
        "type": "text"
      },
      {
        "name": "source",
        "description": "The source of the log item.",
        "required": false,
        "type": "text"
      },
      {
        "name": "time",
        "description": "The time at which this item was logged.",
        "required": false,
        "type": "text"
      },
      {
        "name": "file",
        "description": "The file from which osquery read this log.",
        "required": false,
        "type": "text"
      },
      {
        "name": "line",
        "description": "The line from which this log item was read.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/puppet_logs",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/puppet_logs.yml"
  },
  {
    "name": "puppet_state",
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "description": "State of every resource [Puppet](https://puppet.com/) is managing. This table uses data from the `last_run_report` that Puppet creates.",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "evented": false,
    "examples": "List resources that failed or took over a minute to evaluate.\n```\nSELECT * FROM puppet_state WHERE failed='true' OR evaluation_time>'60';\n```",
    "columns": [
      {
        "name": "title",
        "description": "The name of the resource.",
        "required": false,
        "type": "text"
      },
      {
        "name": "file",
        "description": "The file that contains the resource.",
        "required": false,
        "type": "text"
      },
      {
        "name": "line",
        "description": "The line on which the resource is specified.",
        "required": false,
        "type": "text"
      },
      {
        "name": "resource",
        "description": "The resource and its title as `Type[title]`.",
        "required": false,
        "type": "text"
      },
      {
        "name": "resource_type",
        "description": "The resource type.",
        "required": false,
        "type": "text"
      },
      {
        "name": "evaluation_time",
        "description": "The amount of seconds it took to evaluate the resource.",
        "required": false,
        "type": "text"
      },
      {
        "name": "failed",
        "description": "If Puppet failed to evaluate this resource, this column is `true`.",
        "required": false,
        "type": "text"
      },
      {
        "name": "changed",
        "description": "If `change_count` is above `0`, this is `true`.",
        "required": false,
        "type": "text"
      },
      {
        "name": "out_of_sync",
        "description": "If `out_of_sync_count` is above `0`, this is `true`.",
        "required": false,
        "type": "text"
      },
      {
        "name": "skipped",
        "description": "True if this resource was skipped.",
        "required": false,
        "type": "text"
      },
      {
        "name": "change_count",
        "description": "The count of changes to be performed.",
        "required": false,
        "type": "text"
      },
      {
        "name": "out_of_sync_count",
        "description": "The number of properties that are out of sync",
        "required": false,
        "type": "text"
      },
      {
        "name": "corrective_change",
        "description": "True if a change on the system caused unexpected changes between two Puppet runs.",
        "required": false,
        "type": "text"
      }
    ],
    "url": "https://fleetdm.com/tables/puppet_state",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/puppet_state.yml"
  },
  {
    "name": "pwd_policy",
    "platforms": [
      "darwin"
    ],
    "description": "Password Policiy (e.g max failed password attempts).",
    "columns": [
      {
        "name": "max_failed_attempts",
        "type": "integer",
        "required": false,
        "description": "The account lockout threshold specifies the amount of times a user can enter an incorrect password before a lockout will occur. Ensure that a lockout threshold is part of the password policy on the computer."
      },
      {
        "name": "expires_every_n_days",
        "type": "integer",
        "required": false,
        "description": "How many days for a new password to expire."
      },
      {
        "name": "days_to_expiration",
        "type": "integer",
        "required": false,
        "description": "How many days are left for the expiration of the current password."
      },
      {
        "name": "history_depth",
        "type": "integer",
        "required": false,
        "description": "This parameter indicates the depth of password history which a new password can't be identical to."
      },
      {
        "name": "min_mixed_case_characters",
        "type": "integer",
        "required": false,
        "description": "This parameter indicates the minimum number of mixed characters in a password."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd installers can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/pwd_policy",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/pwd_policy.yml"
  },
  {
    "name": "python_packages",
    "description": "Python packages installed in a system.",
    "url": "https://fleetdm.com/tables/python_packages",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List the versions of pip installed.\n```\nSELECT author, name, summary, version FROM python_packages WHERE name='pip';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Package display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Package-supplied version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "summary",
        "description": "Package-supplied summary",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "author",
        "description": "Optional package author",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "license",
        "description": "License under which package is launched",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path at which this module resides",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "directory",
        "description": "Directory where Python modules are located",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/python_packages.yml"
  },
  {
    "name": "quicklook_cache",
    "description": "Files and thumbnails within macOS's Quicklook Cache.",
    "url": "https://fleetdm.com/tables/quicklook_cache",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "columns": [
      {
        "name": "path",
        "description": "Path of file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rowid",
        "description": "Quicklook file rowid key",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fs_id",
        "description": "Quicklook file fs_id key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "volume_id",
        "description": "Parsed volume ID from fs_id",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inode",
        "description": "Parsed file ID (inode) from fs_id",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtime",
        "description": "Parsed version date field",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Parsed version size field",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "label",
        "description": "Parsed version 'gen' field",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_hit_date",
        "description": "Apple date format for last thumbnail cache hit",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hit_count",
        "description": "Number of cache hits on thumbnail",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "icon_mode",
        "description": "Thumbnail icon mode",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cache_path",
        "description": "Path to cache data",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/quicklook_cache.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fquicklook_cache.yml&value=name%3A%20quicklook_cache%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "registry",
    "description": "All of the Windows registry hives.",
    "url": "https://fleetdm.com/tables/registry",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect name, type, data from registry where key like 'HKEY_USERS\\%\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Wallpapers'; -- same, but filtering by key instead of path\n```",
    "columns": [
      {
        "name": "key",
        "description": "Name of the key to search for",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Full path to the value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Name of the registry value entry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of the registry value, or 'subkey' if item is a subkey",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "data",
        "description": "Data content of registry value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtime",
        "description": "timestamp of the most recent registry write",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/registry.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fregistry.yml&value=name%3A%20registry%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "routes",
    "description": "The active route table for the host system.",
    "url": "https://fleetdm.com/tables/routes",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Identify static routes\n```\nSELECT destination, interface, type FROM routes WHERE type='static';\n```",
    "columns": [
      {
        "name": "destination",
        "description": "Destination IP address",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "netmask",
        "description": "Netmask length",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gateway",
        "description": "Route gateway",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Route source",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flags",
        "description": "Flags to describe route",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "interface",
        "description": "Route local interface",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mtu",
        "description": "Maximum Transmission Unit for the route",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "metric",
        "description": "Cost of route. Lowest is preferred",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of route",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hopcount",
        "description": "Max hops expected",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux",
          "macOS"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/routes.yml"
  },
  {
    "name": "rpm_package_files",
    "description": "RPM packages that are currently installed on the host system.",
    "url": "https://fleetdm.com/tables/rpm_package_files",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "package",
        "description": "RPM package name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "path",
        "description": "File path within the package",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "username",
        "description": "File default username from info DB",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "groupname",
        "description": "File default groupname from info DB",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "File permissions mode from info DB",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Expected file size in bytes from RPM info DB",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha256",
        "description": "SHA256 file digest from RPM info DB",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/rpm_package_files.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Frpm_package_files.yml&value=name%3A%20rpm_package_files%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "rpm_packages",
    "description": "RPM packages that are currently installed on the host system.",
    "url": "https://fleetdm.com/tables/rpm_packages",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "columns": [
      {
        "name": "name",
        "description": "RPM package name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "version",
        "description": "Package version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "release",
        "description": "Package release",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "source",
        "description": "Source RPM package name (optional)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Package size in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sha1",
        "description": "SHA1 hash of the package contents",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "arch",
        "description": "Architecture(s) supported",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "epoch",
        "description": "Package epoch value",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "install_time",
        "description": "When the package was installed",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor",
        "description": "Package vendor",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "package_group",
        "description": "Package group",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "mount_namespace_id",
        "description": "Mount namespace id",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/rpm_packages.yml"
  },
  {
    "name": "running_apps",
    "description": "macOS applications currently running on the host system.",
    "url": "https://fleetdm.com/tables/running_apps",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List all running applications. Filter on is_active='1' to see the application that currently has focus.\n```\nSELECT * FROM running_apps;\n```",
    "columns": [
      {
        "name": "pid",
        "description": "The pid of the application",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "bundle_identifier",
        "description": "The bundle identifier of the application",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "is_active",
        "description": "(DEPRECATED)",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/running_apps.yml"
  },
  {
    "name": "safari_extensions",
    "description": "Installed Safari browser extensions (plugins).",
    "url": "https://fleetdm.com/tables/safari_extensions",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table) - Includes installed extensions for all system users.",
    "examples": "```\nSELECT * FROM users CROSS JOIN safari_extensions USING (uid);\n```",
    "columns": [
      {
        "name": "uid",
        "description": "The local user that owns the extension",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Extension display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "identifier",
        "description": "Extension identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Extension long version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sdk",
        "description": "Bundle SDK used to compile extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "update_url",
        "description": "Extension-supplied update URI",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "author",
        "description": "Optional extension author",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "developer_id",
        "description": "Optional developer identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Optional extension description text",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to extension XAR bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bundle_version",
        "description": "The version of the build that identifies an iteration of the bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "copyright",
        "description": "A human-readable copyright notice for the bundle",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "extension_type",
        "description": "Extension Type: WebOrAppExtension or LegacyExtension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/safari_extensions.yml"
  },
  {
    "name": "sandboxes",
    "description": "macOS application sandboxes container details.",
    "url": "https://fleetdm.com/tables/sandboxes",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "columns": [
      {
        "name": "label",
        "description": "UTI-format bundle or label ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user",
        "description": "Sandbox owner",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled",
        "description": "Application sandboxings enabled on container",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "build_id",
        "description": "Sandbox-specific identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bundle_path",
        "description": "Application bundle used by the sandbox",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to sandbox container directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/sandboxes.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fsandboxes.yml&value=name%3A%20sandboxes%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "scheduled_tasks",
    "description": "Lists all of the tasks in the Windows task scheduler.",
    "url": "https://fleetdm.com/tables/scheduled_tasks",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from scheduled_tasks where hidden=1 and enabled=1\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of the scheduled task",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "action",
        "description": "Actions executed by the scheduled task",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to the executable to be run",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled",
        "description": "Whether or not the scheduled task is enabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "State of the scheduled task",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hidden",
        "description": "Whether or not the task is visible in the UI",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_run_time",
        "description": "Timestamp the task last ran",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "next_run_time",
        "description": "Timestamp the task is scheduled to run next",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_run_message",
        "description": "Exit status message of the last task run",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_run_code",
        "description": "Exit status code of the last task run",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/scheduled_tasks.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fscheduled_tasks.yml&value=name%3A%20scheduled_tasks%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "screenlock",
    "description": "Returns if the screen locks automatically and the time, in seconds, it takes until the screen is locked automatically while idle.  For macOS, this table will return no results if osquery is running as root.",
    "url": "https://fleetdm.com/tables/screenlock",
    "platforms": [
      "darwin",
      "chrome"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- For macOS, this only fetches results for osquery's current logged-in user context. The user must also have recently logged in.\n- For ChromeOS, this table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).\n- For ChromeOS, this table is only available for Chrome 73+.",
    "columns": [
      {
        "name": "enabled",
        "description": "1 If a password is required after sleep or the screensaver begins; else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "grace_period",
        "description": "The amount of time in seconds the screen must be asleep or the screensaver on before a password is required on-wake. 0 = immediately; -1 = no password is required on-wake",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/screenlock.yml"
  },
  {
    "name": "seccomp_events",
    "description": "A virtual table that tracks seccomp events.",
    "url": "https://fleetdm.com/tables/seccomp_events",
    "platforms": [
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uptime",
        "description": "Time of execution in system uptime",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "auid",
        "description": "Audit user ID (loginuid) of the user who started the analyzed process",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "User ID of the user who started the analyzed process",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gid",
        "description": "Group ID of the user who started the analyzed process",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ses",
        "description": "Session ID of the session from which the analyzed process was invoked",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID",
        "type": "unsigned_bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "comm",
        "description": "Command-line name of the command that was used to invoke the analyzed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exe",
        "description": "The path to the executable that was used to invoke the analyzed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sig",
        "description": "Signal value sent to process by seccomp",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "arch",
        "description": "Information about the CPU architecture",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "syscall",
        "description": "Type of the system call",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "compat",
        "description": "Is system call in compatibility mode",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ip",
        "description": "Instruction pointer value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "code",
        "description": "The seccomp action",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/seccomp_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fseccomp_events.yml&value=name%3A%20seccomp_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "secureboot",
    "description": "Secure Boot UEFI Settings.",
    "url": "https://fleetdm.com/tables/secureboot",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See the secure boot status (enabled or not) of Windows and Linux systems. You could create a policy looking for it to be set to 1.\n```\nSELECT secure_boot FROM secureboot;\n```",
    "columns": [
      {
        "name": "secure_boot",
        "description": "Whether secure boot is enabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "secure_mode",
        "description": "(Intel) Secure mode: 0 disabled, 1 full security, 2 medium security",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "description",
        "description": "(Apple Silicon) Human-readable description: 'Full Security', 'Reduced Security', or 'Permissive Security'",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "kernel_extensions",
        "description": "(Apple Silicon) Allow user management of kernel extensions from identified developers (1 if allowed)",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "mdm_operations",
        "description": "(Apple Silicon) Allow remote (MDM) management of kernel extensions and automatic software updates (1 if allowed)",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "setup_mode",
        "description": "Whether setup mode is enabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux",
          "Windows"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/secureboot.yml"
  },
  {
    "name": "security_profile_info",
    "description": "Information on the security profile of a given system by listing the system Account and Audit Policies. This table mimics the exported securitypolicy output from the secedit tool.",
    "url": "https://fleetdm.com/tables/security_profile_info",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "minimum_password_age",
        "description": "Determines the minimum number of days that a password must be used before the user can change it",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "maximum_password_age",
        "description": "Determines the maximum number of days that a password can be used before the client requires the user to change it",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minimum_password_length",
        "description": "Determines the least number of characters that can make up a password for a user account",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "password_complexity",
        "description": "Determines whether passwords must meet a series of strong-password guidelines",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "password_history_size",
        "description": "Number of unique new passwords that must be associated with a user account before an old password can be reused",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "lockout_bad_count",
        "description": "Number of failed logon attempts after which a user account MUST be locked out",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "logon_to_change_password",
        "description": "Determines if logon session is required to change the password",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "force_logoff_when_expire",
        "description": "Determines whether SMB client sessions with the SMB server will be forcibly disconnected when the client's logon hours expire",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "new_administrator_name",
        "description": "Determines the name of the Administrator account on the local computer",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "new_guest_name",
        "description": "Determines the name of the Guest account on the local computer",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "clear_text_password",
        "description": "Determines whether passwords MUST be stored by using reversible encryption",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "lsa_anonymous_name_lookup",
        "description": "Determines if an anonymous user is allowed to query the local LSA policy",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enable_admin_account",
        "description": "Determines whether the Administrator account on the local computer is enabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enable_guest_account",
        "description": "Determines whether the Guest account on the local computer is enabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_system_events",
        "description": "Determines whether the operating system MUST audit System Change, System Startup, System Shutdown, Authentication Component Load, and Loss or Excess of Security events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_logon_events",
        "description": "Determines whether the operating system MUST audit each instance of a user attempt to log on or log off this computer",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_object_access",
        "description": "Determines whether the operating system MUST audit each instance of user attempts to access a non-Active Directory object that has its own SACL specified",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_privilege_use",
        "description": "Determines whether the operating system MUST audit each instance of user attempts to exercise a user right",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_policy_change",
        "description": "Determines whether the operating system MUST audit each instance of user attempts to change user rights assignment policy, audit policy, account policy, or trust policy",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_account_manage",
        "description": "Determines whether the operating system MUST audit each event of account management on a computer",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_process_tracking",
        "description": "Determines whether the operating system MUST audit process-related events",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_ds_access",
        "description": "Determines whether the operating system MUST audit each instance of user attempts to access an Active Directory object that has its own system access control list (SACL) specified",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "audit_account_logon",
        "description": "Determines whether the operating system MUST audit each time this computer validates the credentials of an account",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/security_profile_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fsecurity_profile_info.yml&value=name%3A%20security_profile_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "selinux_events",
    "description": "Track SELinux events.",
    "url": "https://fleetdm.com/tables/selinux_events",
    "platforms": [
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "type",
        "description": "Event type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "message",
        "description": "Message",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uptime",
        "description": "Time of execution in system uptime",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/selinux_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fselinux_events.yml&value=name%3A%20selinux_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "selinux_settings",
    "description": "Track active SELinux settings.",
    "url": "https://fleetdm.com/tables/selinux_settings",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nSELECT * FROM selinux_settings WHERE key = 'enforce'\n```",
    "columns": [
      {
        "name": "scope",
        "description": "Where the key is located inside the SELinuxFS mount point.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key",
        "description": "Key or class name.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Active value.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/selinux_settings.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fselinux_settings.yml&value=name%3A%20selinux_settings%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "services",
    "description": "Lists all installed Windows services and their relevant data.",
    "url": "https://fleetdm.com/tables/services",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from services\n```",
    "columns": [
      {
        "name": "name",
        "description": "Service name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "service_type",
        "description": "Service Type: OWN_PROCESS, SHARE_PROCESS and maybe Interactive (can interact with the desktop)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "display_name",
        "description": "Service Display name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Service Current status: STOPPED, START_PENDING, STOP_PENDING, RUNNING, CONTINUE_PENDING, PAUSE_PENDING, PAUSED",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "the Process ID of the service",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "start_type",
        "description": "Service start type: BOOT_START, SYSTEM_START, AUTO_START, DEMAND_START, DISABLED",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "win32_exit_code",
        "description": "The error code that the service uses to report an error that occurs when it is starting or stopping",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "service_exit_code",
        "description": "The service-specific error code that the service returns when an error occurs while the service is starting or stopping",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to Service Executable",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "module_path",
        "description": "Path to ServiceDll",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Service Description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user_account",
        "description": "The name of the account that the service process will be logged on as when it runs. This name can be of the form Domain\\UserName. If the account belongs to the built-in domain, the name can be of the form .\\UserName.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/services.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fservices.yml&value=name%3A%20services%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "shadow",
    "description": "Local system users encrypted passwords and related information. Please note, that you usually need superuser rights to access `/etc/shadow`.",
    "url": "https://fleetdm.com/tables/shadow",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from shadow where username = 'root'\n```",
    "columns": [
      {
        "name": "password_status",
        "description": "Password status",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hash_alg",
        "description": "Password hashing algorithm",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_change",
        "description": "Date of last password change (starting from UNIX epoch date)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "min",
        "description": "Minimal number of days between password changes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max",
        "description": "Maximum number of days between password changes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "warning",
        "description": "Number of days before password expires to warn user about it",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inactive",
        "description": "Number of days after password expires until account is blocked",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "expire",
        "description": "Number of days since UNIX epoch date until account is disabled",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "flag",
        "description": "Reserved",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "Username",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/shadow.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fshadow.yml&value=name%3A%20shadow%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "shared_folders",
    "description": "Folders available to others via SMB or AFP.",
    "url": "https://fleetdm.com/tables/shared_folders",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "List all shared folders except for the standard public ones.\n```\nSELECT * FROM shared_folders WHERE path NOT LIKE '/Users/%%/Public%';\n```",
    "columns": [
      {
        "name": "name",
        "description": "The shared name of the folder as it appears to other users",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Absolute path of shared folder on the local system",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/shared_folders.yml"
  },
  {
    "name": "shared_memory",
    "description": "OS shared memory regions.",
    "url": "https://fleetdm.com/tables/shared_memory",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "shmid",
        "description": "Shared memory segment ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "owner_uid",
        "description": "User ID of owning process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "creator_uid",
        "description": "User ID of creator process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID to last use the segment",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "creator_pid",
        "description": "Process ID that created the segment",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "atime",
        "description": "Attached time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "dtime",
        "description": "Detached time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ctime",
        "description": "Changed time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "permissions",
        "description": "Memory segment permissions",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Size in bytes",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "attached",
        "description": "Number of attached processes",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Destination/attach status",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "locked",
        "description": "1 if segment is locked else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/shared_memory.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fshared_memory.yml&value=name%3A%20shared_memory%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "shared_resources",
    "description": "Displays shared resources on a computer system running Windows. This may be a disk drive, printer, interprocess communication, or other sharable device.",
    "url": "https://fleetdm.com/tables/shared_resources",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "* `type_name` is a human readable value of the type column. These values can include: \"Disk Drive Admin\", \"IPC Admin\", \"Disk Drive\"",
    "examples": "Network shares with loose access controls are common places that leak sensitive information. This query looks for shared drives on Windows systems that likely contain sensitive data, by listing all shared folders that have the word `backup` in their name. This does not include `ADMIN$` type shares.\n```\nSELECT description,name,path FROM shared_resources WHERE type = 0 and name like '%backup%';\n```",
    "columns": [
      {
        "name": "description",
        "description": "A textual description of the object",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "install_date",
        "description": "Indicates when the object was installed. Lack of a value does not indicate that the object is not installed.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "String that indicates the current status of the object.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "allow_maximum",
        "description": "Number of concurrent users for this resource has been limited. If True, the value in the MaximumAllowed property is ignored.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "maximum_allowed",
        "description": "Limit on the maximum number of users allowed to use this resource concurrently. The value is only valid if the AllowMaximum property is set to FALSE.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Alias given to a path set up as a share on a computer system running Windows.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Local path of the Windows share.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of resource being shared. Types include: disk drives, print queues, interprocess communications (IPC), and general devices.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type_name",
        "description": "Human readable value for the 'type' column",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/shared_resources.yml"
  },
  {
    "name": "sharing_preferences",
    "description": "macOS Sharing preferences.",
    "url": "https://fleetdm.com/tables/sharing_preferences",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify systems where any type of sharing is enabled. This table can be very useful for building policies for specific types of sharing.\n```\nSELECT * FROM sharing_preferences WHERE screen_sharing='1' OR file_sharing='1' OR printer_sharing='1' OR remote_login='1' OR remote_management='1' OR remote_apple_events='1' OR internet_sharing='1' OR bluetooth_sharing='1' OR disc_sharing='1' OR content_caching='1';\n```",
    "columns": [
      {
        "name": "screen_sharing",
        "description": "1 If screen sharing is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "file_sharing",
        "description": "1 If file sharing is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "printer_sharing",
        "description": "1 If printer sharing is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_login",
        "description": "1 If remote login is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_management",
        "description": "1 If remote management is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_apple_events",
        "description": "1 If remote apple events are enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "internet_sharing",
        "description": "1 If internet sharing is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bluetooth_sharing",
        "description": "1 If bluetooth sharing is enabled for any user else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "disc_sharing",
        "description": "1 If CD or DVD sharing is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "content_caching",
        "description": "1 If content caching is enabled else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/sharing_preferences.yml"
  },
  {
    "name": "shell_history",
    "description": "A line-delimited (command) table of per-user .*_history data.",
    "url": "https://fleetdm.com/tables/shell_history",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN shell_history USING (uid);\n```\nSee command line executions and related timestamps. Useful for threat hunting when a device is suspected of being compromised.\n```\nSELECT u.username, s.command, s.time FROM users u CROSS JOIN shell_history s USING (uid);\n```",
    "columns": [
      {
        "name": "uid",
        "description": "Shell history owner",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Entry timestamp. It could be absent, default value is 0.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "command",
        "description": "Unparsed date/line/command history line",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "history_file",
        "description": "Path to the .*_history for this user",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/shell_history.yml"
  },
  {
    "name": "shellbags",
    "description": "Shows directories accessed via Windows Explorer.",
    "url": "https://fleetdm.com/tables/shellbags",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from shellbags;\n```",
    "columns": [
      {
        "name": "sid",
        "description": "User SID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Shellbags source Registry file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Directory name.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "modified_time",
        "description": "Directory Modified time.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "created_time",
        "description": "Directory Created time.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "accessed_time",
        "description": "Directory Accessed time.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mft_entry",
        "description": "Directory master file table entry.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mft_sequence",
        "description": "Directory master file table sequence.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/shellbags.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fshellbags.yml&value=name%3A%20shellbags%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "shimcache",
    "description": "Application Compatibility Cache, contains artifacts of execution.",
    "url": "https://fleetdm.com/tables/shimcache",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "\nSome key caveats to know about this data source:\n* Process execution logs are only written during a reboot, otherwise they are stored in memory. This means you may not be seeing the data you would expect if the system hasn't been rebooted recently.\n* The entry column shows the order of execution - Starting from 1, which is the most-recent process execution, and then on from there.\n* The modified_time column displays the last modified time for the file.\nSource: https://bromiley.medium.com/windows-wednesday-shim-cache-1997ba8b13e7",
    "examples": "As a byproduct of its functionality, the Application Compatibility Cache (also known as the shimcache) logs some details around process execution. These logs can be useful, especially during incident response. The following query looks for a potential IoC (indicator of compromise) - evidence of process execution of a Windows binary named certutil. (Certutil is a legitimate Windows application, but is also known to be a lolbin - living off the land binary. See more details here: https://lolbas-project.github.io/lolbas/Binaries/Certutil/ ) This query joins the local system's uptime to its results because shimcache logs are kept in memory until the system is rebooted, at which point they are written to disk - so we would also want to know the last time this system was rebooted.\n```\n\n SELECT entry AS execution_order, path, DATETIME(modified_time, 'unixepoch') AS file_last_modified,  uptime.days || ' days, ' || uptime.hours || ' hours' AS host_uptime FROM shimcache CROSS JOIN uptime WHERE path LIKE '%certutil%';\n\n```",
    "columns": [
      {
        "name": "entry",
        "description": "Execution order.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "This is the path to the executed file.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "modified_time",
        "description": "File Modified time.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "execution_flag",
        "description": "Boolean Execution flag, 1 for execution, 0 for no execution, -1 for missing (this flag does not exist on Windows 10 and higher).",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/shimcache.yml"
  },
  {
    "name": "signature",
    "description": "File (executable, bundle, installer, disk) code signing status.",
    "url": "https://fleetdm.com/tables/signature",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify system extensions that are not managed via MDM and see their signature status.\n```\nSELECT se.identifier, se.bundle_path, se.category, se.state, s.signed FROM system_extensions se JOIN signature s on s.path = se.bundle_path WHERE se.mdm_managed='0';\n```",
    "columns": [
      {
        "name": "path",
        "description": "Must provide a path or directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "hash_resources",
        "description": "Set to 1 to also hash resources, or 0 otherwise. Default is 1",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "arch",
        "description": "If applicable, the arch of the signed code",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "signed",
        "description": "1 If the file is signed else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "identifier",
        "description": "The signing identifier sealed into the signature",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cdhash",
        "description": "Hash of the application Code Directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "team_identifier",
        "description": "The team signing identifier sealed into the signature",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "authority",
        "description": "Certificate Common Name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/signature.yml"
  },
  {
    "name": "sip_config",
    "description": "Apple's System Integrity Protection (rootless) status.",
    "url": "https://fleetdm.com/tables/sip_config",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "View the status of System Integrity Protection.\n```\nSELECT config_flag, enabled FROM sip_config WHERE config_flag='sip';\n```",
    "columns": [
      {
        "name": "config_flag",
        "description": "The System Integrity Protection config flag",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled",
        "description": "1 if this configuration is enabled, otherwise 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled_nvram",
        "description": "1 if this configuration is enabled, otherwise 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/sip_config.yml"
  },
  {
    "name": "smbios_tables",
    "description": "BIOS (DMI) structure common details and content.",
    "url": "https://fleetdm.com/tables/smbios_tables",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "This table requires an Intel compatible system.",
    "examples": "SMBIOS tables are used to deliver information from the BIOS to the operating system. Use the *md5* field to compare systems and see if their hardware is configured identically.\n```\nSELECT * FROM smbios_tables WHERE md5='dd66d84ec724d35db011883052973eae'\n```",
    "columns": [
      {
        "name": "number",
        "description": "Table entry number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Table entry type",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Table entry description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "handle",
        "description": "Table entry handle",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "header_size",
        "description": "Header size in bytes",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Table entry size in bytes",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "md5",
        "description": "MD5 hash of table entry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/smbios_tables.yml"
  },
  {
    "name": "smc_keys",
    "description": "Apple's system management controller keys.",
    "url": "https://fleetdm.com/tables/smc_keys",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See if the temperature sensor on an Intel Mac is returning values. SMC values aren't officially documented and as such this table is useful if you are troubleshooting and digging into a specific hardware related issue.\n```\nSELECT * FROM smc_keys WHERE key='TC0P';\n```",
    "columns": [
      {
        "name": "key",
        "description": "4-character key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "type",
        "description": "SMC-reported type literal type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "Reported size of data in bytes",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "A type-encoded representation of the key value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hidden",
        "description": "1 if this key is normally hidden, otherwise 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/smc_keys.yml"
  },
  {
    "name": "sntp_request",
    "platforms": [
      "darwin",
      "windows",
      "linux"
    ],
    "description": "Allows querying the timestamp and clock offset from a SNTP server (in millisecond precision).",
    "columns": [
      {
        "name": "server",
        "type": "text",
        "required": true,
        "description": "Address of the SNTP server to query."
      },
      {
        "name": "timestamp_ms",
        "type": "bigint",
        "required": false,
        "description": "Timestamp returned by the SNTP server in milliseconds."
      },
      {
        "name": "clock_offset_ms",
        "type": "bigint",
        "required": false,
        "description": "Offset between the host's time and the SNTP time in milliseconds."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd installers can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/sntp_request",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/sntp_request.yml"
  },
  {
    "name": "socket_events",
    "description": "Track network socket opens and closes.",
    "url": "https://fleetdm.com/tables/socket_events",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "action",
        "description": "The socket action (bind, listen, close)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of executed file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fd",
        "description": "The file description for the process socket",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "auid",
        "description": "Audit User ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Either 'succeeded', 'failed', 'in_progress' (connect() on non-blocking socket) or 'no_client' (null accept() on non-blocking socket)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "family",
        "description": "The Internet protocol family ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protocol",
        "description": "The network protocol ID",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "local_address",
        "description": "Local address associated with socket",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_address",
        "description": "Remote address associated with socket",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_port",
        "description": "Local network protocol port number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_port",
        "description": "Remote network protocol port number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "socket",
        "description": "The local path (UNIX domain socket only)",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uptime",
        "description": "Time of execution in system uptime",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "success",
        "description": "Deprecated. Use the 'status' column instead",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/socket_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fsocket_events.yml&value=name%3A%20socket_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "software_update",
    "platforms": [
      "darwin"
    ],
    "description": "Information about available Apple software updates.",
    "columns": [
      {
        "name": "software_update_required",
        "type": "integer",
        "required": false,
        "description": "If true, means one of the Apple softwares installed on this machine has a new available upgrade."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/software_update",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/software_update.yml"
  },
  {
    "name": "ssh_configs",
    "description": "A table of parsed ssh_configs.",
    "url": "https://fleetdm.com/tables/ssh_configs",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN ssh_configs USING (uid);\n```\nIdentify SSH clients configured to send their locales to the server.\n```\nSELECT * FROM ssh_configs WHERE option='sendenv lang lc_*'; \n```",
    "columns": [
      {
        "name": "uid",
        "description": "The local owner of the ssh_config file",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "block",
        "description": "The host or match block",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "option",
        "description": "The option and value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ssh_config_file",
        "description": "Path to the ssh_config file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/ssh_configs.yml"
  },
  {
    "name": "startup_items",
    "description": "Applications and binaries set as user/login startup items.",
    "url": "https://fleetdm.com/tables/startup_items",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "List commands executed as user/logon startup items.\n```\nSELECT name, type FROM startup_items WHERE status='enabled';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of startup item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of startup item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "args",
        "description": "Arguments provided to startup executable",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Startup Item or Login Item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Directory or plist containing startup item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "status",
        "description": "Startup status; either enabled or disabled",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "The user associated with the startup item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/startup_items.yml"
  },
  {
    "name": "sudo_info",
    "platforms": [
      "darwin"
    ],
    "description": "Returns the output of `sudo -V` in JSON format.",
    "columns": [
      {
        "name": "json_result",
        "type": "text",
        "required": false,
        "description": "A JSON document with the key value pairs parsed from `sudo -V` output."
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/sudo_info",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/sudo_info.yml"
  },
  {
    "name": "sudoers",
    "description": "Rules for running commands as other users via sudo.",
    "url": "https://fleetdm.com/tables/sudoers",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify systems where sudo is configured in a way to allow users to retain their existing environment variables, which is a security risk.\n```\nSELECT header, source, rule_details FROM sudoers WHERE rule_details='!env_reset';\n```",
    "columns": [
      {
        "name": "source",
        "description": "Source file containing the given rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "header",
        "description": "Symbol for given rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rule_details",
        "description": "Rule definition",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/sudoers.yml"
  },
  {
    "name": "suid_bin",
    "description": "suid binaries in common locations.",
    "url": "https://fleetdm.com/tables/suid_bin",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Identify unsigned executables with suid privileges.\n```\nSELECT s.path, s.username, s.permissions, sig.signed, sig.team_identifier, sig.authority FROM suid_bin s JOIN signature sig on s.path = sig.path WHERE sig.signed='0';\n```",
    "columns": [
      {
        "name": "path",
        "description": "Binary path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "Binary owner username",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "groupname",
        "description": "Binary owner group",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "permissions",
        "description": "Binary permissions",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/suid_bin.yml"
  },
  {
    "name": "syslog_events",
    "description": "",
    "url": "https://fleetdm.com/tables/syslog_events",
    "platforms": [
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "time",
        "description": "Current unix epoch time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "datetime",
        "description": "Time known to syslog",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "host",
        "description": "Hostname configured for syslog",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "severity",
        "description": "Syslog severity",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "facility",
        "description": "Syslog facility",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tag",
        "description": "The syslog tag",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "message",
        "description": "The syslog message",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/syslog_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fsyslog_events.yml&value=name%3A%20syslog_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "system_controls",
    "description": "sysctl names, values, and settings information.",
    "url": "https://fleetdm.com/tables/system_controls",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See if IP forwarding is enabled (value=1) or not (current_value=0). This table provides access to a large quantity of low-level settings and is ideal to build policies.\n```\nSELECT current_value, name FROM system_controls WHERE name='net.inet.ip.forwarding';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Full sysctl MIB name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "oid",
        "description": "Control MIB",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subsystem",
        "description": "Subsystem ID, control type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "current_value",
        "description": "Value of setting",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "config_value",
        "description": "The MIB value set in /etc/sysctl.conf",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Data type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "field_name",
        "description": "Specific attribute of opaque type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/system_controls.yml"
  },
  {
    "name": "system_extensions",
    "description": "macOS (>= 10.15) system extension table.",
    "url": "https://fleetdm.com/tables/system_extensions",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify system extensions that are not managed via MDM and see their signature status.\n```\nSELECT se.identifier, se.bundle_path, se.category, se.state, s.signed FROM system_extensions se JOIN signature s on s.path = se.bundle_path WHERE se.mdm_managed='0';\n```",
    "columns": [
      {
        "name": "path",
        "description": "Original path of system extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "UUID",
        "description": "Extension unique id",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "System extension state",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "identifier",
        "description": "Identifier name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "System extension version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "category",
        "description": "System extension category",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bundle_path",
        "description": "System extension bundle path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "team",
        "description": "Signing team ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mdm_managed",
        "description": "1 if managed by MDM system extension payload configuration, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/system_extensions.yml"
  },
  {
    "name": "system_info",
    "description": "System information for identification.",
    "url": "https://fleetdm.com/tables/system_info",
    "platforms": [
      "windows",
      "darwin",
      "linux",
      "chrome"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- This table is not a core osquery table. This table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).",
    "examples": "See the CPU architecture of a machine as well as who made it and what its serial number is.\n```\nSELECT CPU_type, hardware_vendor, hardware_model, hardware_serial FROM system_info;\n```",
    "columns": [
      {
        "name": "hostname",
        "description": "Network hostname including domain. For ChromeOS, this is only available if the extension was force-installed by an enterprise policy",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uuid",
        "description": "Unique ID provided by the system",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_type",
        "description": "CPU type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_subtype",
        "description": "CPU subtype",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "cpu_brand",
        "description": "CPU brand string, contains vendor and model",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_physical_cores",
        "description": "Number of physical CPU cores in to the system",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "cpu_logical_cores",
        "description": "Number of logical CPU cores available to the system",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "cpu_sockets",
        "description": "Number of processor sockets in the system",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cpu_microcode",
        "description": "Microcode version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "physical_memory",
        "description": "Total physical memory in bytes",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hardware_vendor",
        "description": "Hardware vendor. For ChromeOS, this is only available if the extension was force-installed by an enterprise policy",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hardware_model",
        "description": "Hardware model. For ChromeOS, this is only available if the extension was force-installed by an enterprise policy",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hardware_version",
        "description": "Hardware version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "hardware_serial",
        "description": "The device's serial number. For ChromeOS, this is only available if the extension was force-installed by an enterprise policy",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "board_vendor",
        "description": "Board vendor",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "board_model",
        "description": "Board model",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "board_version",
        "description": "Board version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "board_serial",
        "description": "Board serial number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "computer_name",
        "description": "Friendly computer name (optional). For ChromeOS, if the extension wasn't force-installed by an enterprise policy this will default to 'ChromeOS' only",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_hostname",
        "description": "Local hostname (optional)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/system_info.yml"
  },
  {
    "name": "system_state",
    "platforms": [
      "chrome"
    ],
    "description": "Returns \"locked\" if the system is locked, \"idle\" if the user has not generated any input for a specified number of seconds, or \"active\" otherwise. Idle time is set to 20% of the user's autolock time or defaults to 30 seconds if autolock is not set.",
    "examples": "Returns \"locked\", \"idle\", or \"active\".\n```\nSELECT idle_state FROM system_state;\n```",
    "columns": [
      {
        "name": "idle_state",
        "type": "text",
        "description": "Returns \"locked\", \"idle\", or \"active\".",
        "required": false
      }
    ],
    "evented": false,
    "notes": "- This table is not a core osquery table. This table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).",
    "url": "https://fleetdm.com/tables/system_state",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/system_state.yml"
  },
  {
    "name": "systemd_units",
    "description": "Track systemd units.",
    "url": "https://fleetdm.com/tables/systemd_units",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "id",
        "description": "Unique unit identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Unit description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "load_state",
        "description": "Reflects whether the unit definition was properly loaded",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "active_state",
        "description": "The high-level unit activation state, i.e. generalization of SUB",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sub_state",
        "description": "The low-level unit activation state, values depend on unit type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "unit_file_state",
        "description": "Whether the unit file is enabled, e.g. `enabled`, `masked`, `disabled`, etc",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "following",
        "description": "The name of another unit that this unit follows in state",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "object_path",
        "description": "The object path for this unit",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "job_id",
        "description": "Next queued job id",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "job_type",
        "description": "Job type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "job_path",
        "description": "The object path for the job",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fragment_path",
        "description": "The unit file path this unit was read from, if there is any",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user",
        "description": "The configured user, if any",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source_path",
        "description": "Path to the (possibly generated) unit configuration file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/linux/systemd_units.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fsystemd_units.yml&value=name%3A%20systemd_units%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "temperature_sensors",
    "description": "Machine's temperature sensors.",
    "url": "https://fleetdm.com/tables/temperature_sensors",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify systems with CPU temperature sensors above or equal to 90c.\n```\nSELECT name, celsius FROM temperature_sensors WHERE name LIKE 'CPU%' AND celsius>='90';\n```",
    "columns": [
      {
        "name": "key",
        "description": "The SMC key on macOS",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "name",
        "description": "Name of temperature source",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "celsius",
        "description": "Temperature in Celsius",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "fahrenheit",
        "description": "Temperature in Fahrenheit",
        "type": "double",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/temperature_sensors.yml"
  },
  {
    "name": "time",
    "description": "Track current date and time in UTC.",
    "url": "https://fleetdm.com/tables/time",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "View the timezone a system is configured in. \n```\nSELECT local_timezone FROM time;\n```",
    "columns": [
      {
        "name": "weekday",
        "description": "Current weekday in UTC",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "year",
        "description": "Current year in UTC",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "month",
        "description": "Current month in UTC",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "day",
        "description": "Current day in UTC",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hour",
        "description": "Current hour in UTC",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minutes",
        "description": "Current minutes in UTC",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "seconds",
        "description": "Current seconds in UTC",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "timezone",
        "description": "Timezone for reported time (hardcoded to UTC)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_timezone",
        "description": "Current local timezone in of the system",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "unix_time",
        "description": "Current UNIX time in UTC",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "timestamp",
        "description": "Current timestamp (log format) in UTC",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "datetime",
        "description": "Current date and time (ISO format) in UTC",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "iso_8601",
        "description": "Current time (ISO format) in UTC",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "win_timestamp",
        "description": "Timestamp value in 100 nanosecond units",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/time.yml"
  },
  {
    "name": "time_machine_backups",
    "description": "Backups to drives using TimeMachine.",
    "url": "https://fleetdm.com/tables/time_machine_backups",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See the time of the latest backup. In environments where you want to encourage backups, this can be useful to remind users to perform them, and in environments where you do not allow backups, to detect that they are happening.\n```\nSELECT strftime('%Y-%m-%d %H:%M:%S',backup_date,'unixepoch') AS last_backup FROM time_machine_backups;\n```",
    "columns": [
      {
        "name": "destination_id",
        "description": "Time Machine destination ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "backup_date",
        "description": "Backup Date",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/time_machine_backups.yml"
  },
  {
    "name": "time_machine_destinations",
    "description": "Locations backed up to using Time Machine.",
    "url": "https://fleetdm.com/tables/time_machine_destinations",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "If Time Machine is configured, see what destination it is configured to go to. \n```\nSELECT alias FROM time_machine_destinations;\n```",
    "columns": [
      {
        "name": "alias",
        "description": "Human readable name of drive",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "destination_id",
        "description": "Time Machine destination ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "consistency_scan_date",
        "description": "Consistency scan date",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "root_volume_uuid",
        "description": "Root UUID of backup volume",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bytes_available",
        "description": "Bytes available on volume",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bytes_used",
        "description": "Bytes used on volume",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "encryption",
        "description": "Last known encrypted state",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/time_machine_destinations.yml"
  },
  {
    "name": "tpm_info",
    "description": "A table that lists the TPM related information.",
    "url": "https://fleetdm.com/tables/tpm_info",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from tpm_info\n```",
    "columns": [
      {
        "name": "activated",
        "description": "TPM is activated",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled",
        "description": "TPM is enabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "owned",
        "description": "TPM is owned",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer_version",
        "description": "TPM version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer_id",
        "description": "TPM manufacturers ID",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer_name",
        "description": "TPM manufacturers name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "product_name",
        "description": "Product name of the TPM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "physical_presence_version",
        "description": "Version of the Physical Presence Interface",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "spec_version",
        "description": "Trusted Computing Group specification that the TPM supports",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/tpm_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Ftpm_info.yml&value=name%3A%20tpm_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "ulimit_info",
    "description": "System resource usage limits.",
    "url": "https://fleetdm.com/tables/ulimit_info",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Check the stack size limit\n```\nSELECT * FROM ulimit_info WHERE type='stack';\n```",
    "columns": [
      {
        "name": "type",
        "description": "System resource to be limited",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "soft_limit",
        "description": "Current limit value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hard_limit",
        "description": "Maximum limit value",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/ulimit_info.yml"
  },
  {
    "name": "unified_log",
    "description": "Queries the OSLog framework for entries in the system log. The maximum number of rows returned is limited for performance issues. Use timestamp > or >= constraints to optimize query performance. This table introduces a new idiom for extracting sequential data in batches using multiple queries, ordered by timestamp. To trigger it, the user should include the condition \"timestamp > -1\", and the table will handle pagination. Note that the saved pagination counter is incremented globally across all queries and table invocations within a query. To avoid multiple table invocations within a query, use only AND and = constraints in WHERE clause.",
    "url": "https://fleetdm.com/tables/unified_log",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from unified_log where timestamp > -1 and timestamp > (select unix_time - 86400 from time)\n```",
    "columns": [
      {
        "name": "timestamp",
        "description": "unix timestamp associated with the entry",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "storage",
        "description": "the storage category for the entry",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "message",
        "description": "composed message",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "activity",
        "description": "the activity ID associate with the entry",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "process",
        "description": "the name of the process that made the entry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "the pid of the process that made the entry",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sender",
        "description": "the name of the binary image that made the entry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tid",
        "description": "the tid of the thread that made the entry",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "category",
        "description": "the category of the os_log_t used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subsystem",
        "description": "the subsystem of the os_log_t used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "level",
        "description": "the severity level of the entry",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "max_rows",
        "description": "the max number of rows returned (defaults to 100)",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "predicate",
        "description": "predicate to search (see `log help predicates`), note that this is merged into the predicate created from the column constraints",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/unified_log.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Funified_log.yml&value=name%3A%20unified_log%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "uptime",
    "description": "Track time passed since last boot. Some systems track this as calendar time, some as runtime.",
    "url": "https://fleetdm.com/tables/uptime",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "See how long hosts that have been up for more than a month have been up. This could indicate systems that are not ephemeral as expected, or not being patched as frequently as they should be.\n```\nSELECT days FROM uptime WHERE days>='31'\n```",
    "columns": [
      {
        "name": "days",
        "description": "Days of uptime",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hours",
        "description": "Hours of uptime",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minutes",
        "description": "Minutes of uptime",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "seconds",
        "description": "Seconds of uptime",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "total_seconds",
        "description": "Total uptime seconds",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/uptime.yml"
  },
  {
    "name": "usb_devices",
    "description": "USB devices that are actively plugged into the host system.",
    "url": "https://fleetdm.com/tables/usb_devices",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify Yubikeys currently connected. The model field contains information about what authentication protocols the keys are configured to support. This table can be used to track any type of USB device.\n```\nSELECT model, vendor, version FROM usb_devices WHERE vendor='Yubico';\n```",
    "columns": [
      {
        "name": "usb_address",
        "description": "USB Device used address",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "usb_port",
        "description": "USB Device used port",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor",
        "description": "USB Device vendor string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "vendor_id",
        "description": "Hex encoded USB Device vendor identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "USB Device version number",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model",
        "description": "USB Device model string",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model_id",
        "description": "Hex encoded USB Device model identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial",
        "description": "USB Device serial connection",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "USB Device class",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "subclass",
        "description": "USB Device subclass",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protocol",
        "description": "USB Device protocol",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "removable",
        "description": "1 If USB device is removable else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/usb_devices.yml"
  },
  {
    "name": "user_events",
    "description": "Track user events from the audit framework.",
    "url": "https://fleetdm.com/tables/user_events",
    "platforms": [
      "darwin",
      "linux"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "uid",
        "description": "User ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "auid",
        "description": "Audit User ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process (or thread) ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "message",
        "description": "Message from the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "The file description for the process socket",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Supplied path from event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "address",
        "description": "The Internet protocol address or family ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "terminal",
        "description": "The network protocol ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of execution in UNIX time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uptime",
        "description": "Time of execution in system uptime",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/posix/user_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fuser_events.yml&value=name%3A%20user_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "user_groups",
    "description": "Local system user group relationships.",
    "url": "https://fleetdm.com/tables/user_groups",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "uid",
        "description": "User ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "gid",
        "description": "Group ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/user_groups.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fuser_groups.yml&value=name%3A%20user_groups%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "user_interaction_events",
    "description": "Track user interaction events from macOS' event tapping framework.",
    "url": "https://fleetdm.com/tables/user_interaction_events",
    "platforms": [
      "darwin"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "time",
        "description": "Time",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/darwin/user_interaction_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fuser_interaction_events.yml&value=name%3A%20user_interaction_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "user_login_settings",
    "platforms": [
      "darwin"
    ],
    "description": "Options of login and password (e.g password hints enabled) for all users.",
    "columns": [
      {
        "name": "password_hint_enabled",
        "type": "integer",
        "required": false,
        "description": "whether password hint is enabled for any user. 1 means one or more users has a password hint set, 0 means no user has a password hint set"
      }
    ],
    "notes": "This table is not a core osquery table. It is included as part of [Fleetd](https://fleetdm.com/docs/using-fleet/orbit), the osquery manager from Fleet. Fleetd can be built with [fleetctl](https://fleetdm.com/docs/using-fleet/adding-hosts#osquery-installer).",
    "evented": false,
    "url": "https://fleetdm.com/tables/user_login_settings",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/user_login_settings.yml"
  },
  {
    "name": "user_ssh_keys",
    "description": "Returns the private keys in the users ~/.ssh directory and whether or not they are encrypted.",
    "url": "https://fleetdm.com/tables/user_ssh_keys",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN user_ssh_keys USING (uid);\n```\nIdentify SSH keys stored in clear text in user directories\n```\nSELECT * FROM users JOIN user_ssh_keys USING (uid) WHERE encrypted = 0;\n```",
    "columns": [
      {
        "name": "uid",
        "description": "The local user that owns the key file",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path to key file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "encrypted",
        "description": "1 if key is encrypted, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "key_type",
        "description": "The type of the private key. One of [rsa, dsa, dh, ec, hmac, cmac], or the empty string.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/user_ssh_keys.yml"
  },
  {
    "name": "userassist",
    "description": "UserAssist Registry Key tracks when a user executes an application from Windows Explorer.",
    "url": "https://fleetdm.com/tables/userassist",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "The User Assist featureset allows Windows to keep track of most recently used applications. Because of that, it is a useful datasource to pull from during investigations and incident response. The following example queries the userassist table and converts the last_execution_time into a human readable format (using UTC) and then sorts the results by this column, descending. It also joins the users table to change the user SID into a human readable username.  The output from this query displays most recently used applications, sorted by most recent timestamp as well as the username of who ran it.\n```\n   \n  SELECT userassist.path, datetime(userassist.last_execution_time, 'unixepoch') AS timestamp_of_last_exec, userassist.count as execution_count, users.username FROM userassist join users ON users.uuid = userassist.sid  ORDER BY timestamp_of_last_exec DESC;\n\n```",
    "columns": [
      {
        "name": "path",
        "description": "Application file path.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_execution_time",
        "description": "Most recent time application was executed.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "count",
        "description": "Number of times the application has been executed.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sid",
        "description": "User SID.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/userassist.yml"
  },
  {
    "name": "users",
    "description": "Local user accounts (including domain accounts that have logged on locally (Windows)).",
    "url": "https://fleetdm.com/tables/users",
    "platforms": [
      "darwin",
      "windows",
      "linux",
      "chrome"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- On ChromeOS, this table requires the [fleetd Chrome extension](https://fleetdm.com/docs/using-fleet/chromeos).",
    "examples": "List users that have interactive access via a shell that isn't false.\n```\nSELECT * FROM users WHERE shell!='/usr/bin/false';\n```",
    "columns": [
      {
        "name": "uid",
        "description": "User ID",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "gid",
        "description": "Group ID (unsigned)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "uid_signed",
        "description": "User ID as int64 signed (Apple)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "gid_signed",
        "description": "Default group ID as int64 signed (Apple)",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "username",
        "description": "Username",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Optional user description",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "directory",
        "description": "User's home directory",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "shell",
        "description": "User's configured default shell",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS",
          "Windows",
          "Linux"
        ]
      },
      {
        "name": "uuid",
        "description": "User's UUID (Apple) or SID (Windows)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "type",
        "description": "Whether the account is roaming (domain), local, or a system profile",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Windows"
        ]
      },
      {
        "name": "is_hidden",
        "description": "IsHidden attribute set in OpenDirectory",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "macOS"
        ]
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      },
      {
        "name": "email",
        "required": false,
        "type": "text",
        "description": "Email",
        "platforms": [
          "chrome"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/users.yml"
  },
  {
    "name": "video_info",
    "description": "Retrieve video card information of the machine.",
    "url": "https://fleetdm.com/tables/video_info",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "color_depth",
        "description": "The amount of bits per pixel to represent color.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver",
        "description": "The driver of the device.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver_date",
        "description": "The date listed on the installed driver.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "driver_version",
        "description": "The version of the installed driver.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "manufacturer",
        "description": "The manufacturer of the gpu.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "model",
        "description": "The model of the gpu.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "series",
        "description": "The series of the gpu.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "video_mode",
        "description": "The current resolution of the display.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/video_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fvideo_info.yml&value=name%3A%20video_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "virtual_memory_info",
    "description": "Darwin Virtual Memory statistics.",
    "url": "https://fleetdm.com/tables/virtual_memory_info",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Identify systems where memory swapping is occuring. These systems might benefit from more RAM.\n```\nSELECT * FROM virtual_memory_info WHERE swap_ins>'0';\n```",
    "columns": [
      {
        "name": "free",
        "description": "Total number of free pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "active",
        "description": "Total number of active pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "inactive",
        "description": "Total number of inactive pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "speculative",
        "description": "Total number of speculative pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "throttled",
        "description": "Total number of throttled pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "wired",
        "description": "Total number of wired down pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "purgeable",
        "description": "Total number of purgeable pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "faults",
        "description": "Total number of calls to vm_faults.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "copy",
        "description": "Total number of copy-on-write pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "zero_fill",
        "description": "Total number of zero filled pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "reactivated",
        "description": "Total number of reactivated pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "purged",
        "description": "Total number of purged pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "file_backed",
        "description": "Total number of file backed pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "anonymous",
        "description": "Total number of anonymous pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uncompressed",
        "description": "Total number of uncompressed pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "compressor",
        "description": "The number of pages used to store compressed VM pages.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "decompressed",
        "description": "The total number of pages that have been decompressed by the VM compressor.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "compressed",
        "description": "The total number of pages that have been compressed by the VM compressor.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "page_ins",
        "description": "The total number of requests for pages from a pager.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "page_outs",
        "description": "Total number of pages paged out.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "swap_ins",
        "description": "The total number of compressed pages that have been swapped out to disk.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "swap_outs",
        "description": "The total number of compressed pages that have been swapped back in from disk.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/virtual_memory_info.yml"
  },
  {
    "name": "vscode_extensions",
    "description": "Installed extensions for [Visual Studio (VS) Code](https://code.visualstudio.com/).",
    "url": "https://fleetdm.com/tables/vscode_extensions",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "Querying this table requires joining against the `users` table. [Learn more](https://fleetdm.com/guides/osquery-consider-joining-against-the-users-table)",
    "examples": "```\nSELECT * FROM users CROSS JOIN vscode_extensions USING (uid);\n```\n\nList the name, publisher, and version of the Visual Studio (VS) Code extensions installed on hosts.\n```\nSELECT extension.name, extension.publisher, extension.version FROM users JOIN vscode_extensions extension USING (uid);\n```",
    "columns": [
      {
        "name": "name",
        "description": "Extension Name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uuid",
        "description": "Extension UUID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "Extension version",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Extension path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "publisher",
        "description": "Publisher Name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "publisher_id",
        "description": "Publisher ID",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "installed_at",
        "description": "Installed Timestamp",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "prerelease",
        "description": "Pre release version",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uid",
        "description": "The local user that owns the plugin",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/vscode_extensions.yml"
  },
  {
    "name": "wifi_networks",
    "description": "Wi-Fi networks previously connected to by this Mac, or that are otherwise in this computer's known/remembered Wi-Fi networks list.",
    "url": "https://fleetdm.com/tables/wifi_networks",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Find WiFi networks configured on Macs that are unencrypted and require a captive portal. This can be useful to understand how much people use laptops in hotels, airports and other environments, and is a good indicator that tools such as DNS-over-HTTPS would improve privacy of connectivity.\n```\nSELECT network_name FROM wifi_networks WHERE security_type='Open' AND captive_portal='1';\n```",
    "columns": [
      {
        "name": "ssid",
        "description": "SSID octets of the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "network_name",
        "description": "Name of the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "security_type",
        "description": "Type of security on this network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "last_connected",
        "description": "Last time this network was connected to as a unix_time",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "passpoint",
        "description": "1 if Passpoint is supported, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "possibly_hidden",
        "description": "1 if network is possibly a hidden network, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "roaming",
        "description": "1 if roaming is supported, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "roaming_profile",
        "description": "Describe the roaming profile, usually one of Single, Dual  or Multi",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "auto_login",
        "description": "1 if auto login is enabled, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "temporarily_disabled",
        "description": "1 if this network is temporarily disabled, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "disabled",
        "description": "1 if this network is disabled, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "add_reason",
        "description": "Shows why this network was added, via menubar or command line or something else ",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "added_at",
        "description": "Time this network was added as a unix_time",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "captive_portal",
        "description": "1 if this network has a captive portal, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "captive_login_date",
        "description": "Time this network logged in to a captive portal as unix_time",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "was_captive_network",
        "description": "1 if this network was previously a captive network, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "auto_join",
        "description": "1 if this network set to join automatically, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "personal_hotspot",
        "description": "1 if this network is a personal hotspot, 0 otherwise",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/wifi_networks.yml"
  },
  {
    "name": "wifi_status",
    "description": "macOS current WiFi status.",
    "url": "https://fleetdm.com/tables/wifi_status",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "- `bssid` and `country code` are only available for macOS 11 and earlier because they would enable geolocation. ",
    "examples": "See the current speed of the WiFi connection, in megabits per second.\n```\nSELECT transmit_rate FROM wifi_status;\n```",
    "columns": [
      {
        "name": "interface",
        "description": "Name of the interface",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ssid",
        "description": "SSID octets of the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bssid",
        "description": "The current basic service set identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "network_name",
        "description": "Name of the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "country_code",
        "description": "The country code (ISO/IEC 3166-1:1997) for the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "security_type",
        "description": "Type of security on this network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rssi",
        "description": "The current received signal strength indication (dbm)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "noise",
        "description": "The current noise measurement (dBm)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "channel",
        "description": "Channel number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "channel_width",
        "description": "Channel width",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "channel_band",
        "description": "Channel band",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "transmit_rate",
        "description": "The current transmit rate",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mode",
        "description": "The current operating mode for the Wi-Fi interface",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/wifi_status.yml"
  },
  {
    "name": "wifi_survey",
    "description": "Scan for nearby WiFi networks.",
    "url": "https://fleetdm.com/tables/wifi_survey",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "- `bssid` and `country code` are only available for macOS 11 and earlier because they would enable geolocation. ",
    "examples": "Count the amount of wireless networks visible to the computer.\n```\nSELECT COUNT ( DISTINCT network_name ) AS \"Number of wireless networks visible\"  FROM wifi_survey;\n```",
    "columns": [
      {
        "name": "interface",
        "description": "Name of the interface",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ssid",
        "description": "SSID octets of the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "bssid",
        "description": "The current basic service set identifier",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "network_name",
        "description": "Name of the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "country_code",
        "description": "The country code (ISO/IEC 3166-1:1997) for the network",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "rssi",
        "description": "The current received signal strength indication (dbm)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "noise",
        "description": "The current noise measurement (dBm)",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "channel",
        "description": "Channel number",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "channel_width",
        "description": "Channel width",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "channel_band",
        "description": "Channel band",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/wifi_survey.yml"
  },
  {
    "name": "winbaseobj",
    "description": "Lists named Windows objects in the default object directories, across all terminal services sessions.  Example Windows ojbect types include Mutexes, Events, Jobs and Semaphors.",
    "url": "https://fleetdm.com/tables/winbaseobj",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from winbaseobj where type='Mutant'\n```",
    "columns": [
      {
        "name": "session_id",
        "description": "Terminal Services Session Id",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "object_name",
        "description": "Object Name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "object_type",
        "description": "Object Type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/winbaseobj.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwinbaseobj.yml&value=name%3A%20winbaseobj%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "windows_crashes",
    "description": "Extracted information from Windows crash logs (Minidumps).",
    "url": "https://fleetdm.com/tables/windows_crashes",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from windows_crashes where stack_trace like '%vlc%'\n```",
    "columns": [
      {
        "name": "datetime",
        "description": "Timestamp (log format) of the crash",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "module",
        "description": "Path of the crashed module within the process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "Path of the executable file for the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID of the crashed process",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tid",
        "description": "Thread ID of the crashed thread",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "version",
        "description": "File version info of the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "process_uptime",
        "description": "Uptime of the process in seconds",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "stack_trace",
        "description": "Multiple stack frames from the stack trace",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exception_code",
        "description": "The Windows exception code",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exception_message",
        "description": "The NTSTATUS error message associated with the exception code",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "exception_address",
        "description": "Address (in hex) where the exception occurred",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "registers",
        "description": "The values of the system registers",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "command_line",
        "description": "Command-line string passed to the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "current_directory",
        "description": "Current working directory of the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "username",
        "description": "Username of the user who ran the crashed process",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "machine_name",
        "description": "Name of the machine where the crash happened",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "major_version",
        "description": "Windows major version of the machine",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "minor_version",
        "description": "Windows minor version of the machine",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "build_number",
        "description": "Windows build number of the crashing machine",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Type of crash log",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "crash_path",
        "description": "Path of the log file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/windows_crashes.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwindows_crashes.yml&value=name%3A%20windows_crashes%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "windows_eventlog",
    "description": "Table for querying all recorded Windows event logs.",
    "url": "https://fleetdm.com/tables/windows_eventlog",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "* This is not an evented table - instead, it pulls directly from the local system's existing eventlogs. \n* The information returned in the `data` column will be JSON formatted, which will require additional parsing.  ",
    "examples": "Tracking user account changes is a key part of both detection & incident response. This query lists all Windows Eventlogs from the Security channel with an EventID of 4720 - A user account was created. There are many other relevant EventIDs that should be monitored as well: \n- [4722: Account enabled](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventID=4722)\n- [4724: Password reset](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=4724)\n- [4728: Added to a security-enabled global group](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=4728)\n\n```\nSELECT datetime,computer_name,data FROM windows_eventlog WHERE eventid=4720 AND channel='Security'\"\n```",
    "columns": [
      {
        "name": "channel",
        "description": "Source or channel of the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": false
      },
      {
        "name": "datetime",
        "description": "System time at which the event occurred",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "task",
        "description": "Task value associated with the event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "level",
        "description": "Severity level associated with the event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "provider_name",
        "description": "Provider name of the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "provider_guid",
        "description": "Provider guid of the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "computer_name",
        "description": "Hostname of system where event was generated",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eventid",
        "description": "Event ID of the event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "keywords",
        "description": "A bitmask of the keywords defined in the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "data",
        "description": "Data associated with the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid",
        "description": "Process ID which emitted the event record",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tid",
        "description": "Thread ID which emitted the event record",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time_range",
        "description": "System time to selectively filter the events",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "timestamp",
        "description": "Timestamp to selectively filter the events",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "xpath",
        "description": "The custom query to filter events",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": true,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/windows_eventlog.yml"
  },
  {
    "name": "windows_events",
    "description": "Windows Event logs.",
    "url": "https://fleetdm.com/tables/windows_events",
    "platforms": [
      "windows"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from windows_events where eventid=4104 and source='Security'\n```",
    "columns": [
      {
        "name": "time",
        "description": "Timestamp the event was received",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "datetime",
        "description": "System time at which the event occurred",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "source",
        "description": "Source or channel of the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "provider_name",
        "description": "Provider name of the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "provider_guid",
        "description": "Provider guid of the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "computer_name",
        "description": "Hostname of system where event was generated",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eventid",
        "description": "Event ID of the event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "task",
        "description": "Task value associated with the event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "level",
        "description": "The severity level associated with the event",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "keywords",
        "description": "A bitmask of the keywords defined in the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "data",
        "description": "Data associated with the event",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/windows_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwindows_events.yml&value=name%3A%20windows_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "windows_firewall_rules",
    "description": "Provides the list of Windows firewall rules.",
    "url": "https://fleetdm.com/tables/windows_firewall_rules",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "* A rule can exist, but it has to be part of the currently enabled firewall profile to be enforced.",
    "examples": "Controlling inbound access to remote services is essential for maintaining security on a system. This query lists all enabled Windows Firewall rules that allow inbound RDP, WinRM & VNC connections on the public firewall profile.\n```\n\n SELECT name,app_name,local_ports FROM windows_firewall_rules WHERE enabled = 1 AND direction = \"In\" AND remote_addresses=\"*\" AND profile_public = 1 AND action = \"Allow\" AND local_ports IN (\"3389\",\"5985\",\"5986\",\"5900\");\n\n```",
    "columns": [
      {
        "name": "name",
        "description": "Friendly name of the rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "app_name",
        "description": "Friendly name of the application to which the rule applies",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "action",
        "description": "Action for the rule or default setting",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled",
        "description": "1 if the rule is enabled",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "grouping",
        "description": "Group to which an individual rule belongs",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "direction",
        "description": "Direction of traffic for which the rule applies",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "protocol",
        "description": "IP protocol of the rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_addresses",
        "description": "Local addresses for the rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_addresses",
        "description": "Remote addresses for the rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "local_ports",
        "description": "Local ports for the rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remote_ports",
        "description": "Remote ports for the rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "icmp_types_codes",
        "description": "ICMP types and codes for the rule",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "profile_domain",
        "description": "1 if the rule profile type is domain",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "profile_private",
        "description": "1 if the rule profile type is private",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "profile_public",
        "description": "1 if the rule profile type is public",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "service_name",
        "description": "Service name property of the application",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/windows_firewall_rules.yml"
  },
  {
    "name": "windows_optional_features",
    "description": "Lists names and installation states of windows features. Maps to Win32_OptionalFeature WMI class.",
    "url": "https://fleetdm.com/tables/windows_optional_features",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "SMBv1 is deprecated and has known, unpatched vulnerablities; it should be disabled whenever possible. This query lists enabled SMBv1 services (client and/or server).\n```\n   \n SELECT name,caption,statename FROM windows_optional_features WHERE name LIKE 'SMB1Protocol%' AND state = 1;\n\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of the feature",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "caption",
        "description": "Caption of feature in settings UI",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "Installation state value. 1 == Enabled, 2 == Disabled, 3 == Absent",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "statename",
        "description": "Installation state name. 'Enabled','Disabled','Absent'",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/windows_optional_features.yml"
  },
  {
    "name": "windows_search",
    "description": "Run searches against the Windows system index database using Advanced Query Syntax. See https://learn.microsoft.com/en-us/windows/win32/search/-search-3x-advancedquerysyntax for details.",
    "url": "https://fleetdm.com/tables/windows_search",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect *, datetime(date_created, 'unixepoch') as datetime from windows_search WHERE query = 'folder:documents' AND datetime BETWEEN '2022-11-18 16:40:00' AND '2023-11-18 16:50:00'\n```",
    "columns": [
      {
        "name": "name",
        "description": "The name of the item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "path",
        "description": "The full path of the item.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "size",
        "description": "The item size in bytes.",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "date_created",
        "description": "The unix timestamp of when the item was created.",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "date_modified",
        "description": "The unix timestamp of when the item was last modified",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "owner",
        "description": "The owner of the item",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "The item type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "properties",
        "description": "Additional property values JSON",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "query",
        "description": "Windows search query",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "sort",
        "description": "Sort for windows api",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "max_results",
        "description": "Maximum number of results returned by windows api, set to -1 for unlimited",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "additional_properties",
        "description": "Comma separated list of columns to include in properties JSON",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/windows_search.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwindows_search.yml&value=name%3A%20windows_search%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "windows_security_center",
    "description": "The health status of Window Security features. Health values can be \"Good\", \"Poor\". \"Snoozed\", \"Not Monitored\", and \"Error\".",
    "url": "https://fleetdm.com/tables/windows_security_center",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from windows_security_center\n```",
    "columns": [
      {
        "name": "firewall",
        "description": "The health of the monitored Firewall (see windows_security_products)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "autoupdate",
        "description": "The health of the Windows Autoupdate feature",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "antivirus",
        "description": "The health of the monitored Antivirus solution (see windows_security_products)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "antispyware",
        "description": "Deprecated (always 'Good').",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "internet_settings",
        "description": "The health of the Internet Settings",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "windows_security_center_service",
        "description": "The health of the Windows Security Center Service",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user_account_control",
        "description": "The health of the User Account Control (UAC) capability in Windows",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/windows_security_center.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwindows_security_center.yml&value=name%3A%20windows_security_center%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "windows_security_products",
    "description": "Enumeration of registered Windows security products. Note: Not compatible with Windows Server.",
    "url": "https://fleetdm.com/tables/windows_security_products",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from windows_security_products\n```",
    "columns": [
      {
        "name": "type",
        "description": "Type of security product",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Name of product",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state",
        "description": "State of protection",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "state_timestamp",
        "description": "Timestamp for the product state",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "remediation_path",
        "description": "Remediation path",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "signatures_up_to_date",
        "description": "1 if product signatures are up to date, else 0",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/windows_security_products.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwindows_security_products.yml&value=name%3A%20windows_security_products%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "windows_update_history",
    "description": "Provides the history of the windows update events.",
    "url": "https://fleetdm.com/tables/windows_update_history",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from windows_update_history\n```",
    "columns": [
      {
        "name": "client_app_id",
        "description": "Identifier of the client application that processed an update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "date",
        "description": "Date and the time an update was applied",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Description of an update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hresult",
        "description": "HRESULT value that is returned from the operation on an update",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "operation",
        "description": "Operation on an update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "result_code",
        "description": "Result of an operation on an update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "server_selection",
        "description": "Value that indicates which server provided an update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "service_id",
        "description": "Service identifier of an update service that is not a Windows update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "support_url",
        "description": "Hyperlink to the language-specific support information for an update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "title",
        "description": "Title of an update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "update_id",
        "description": "Revision-independent identifier of an update",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "update_revision",
        "description": "Revision number of an update",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/windows_update_history.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwindows_update_history.yml&value=name%3A%20windows_update_history%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "windows_updates",
    "description": "Returns information about Windows updates that are available for installation.",
    "evented": false,
    "notes": "This table is not a core osquery table. It is included as part of fleetd, the osquery manager from Fleet. Code based on work by [Kolide](https://github.com/kolide/launcher).",
    "platforms": [
      "windows"
    ],
    "columns": [
      {
        "name": "locale",
        "description": "Location of the update.",
        "required": false,
        "type": "text"
      },
      {
        "name": "is_default",
        "description": "Whether or not the update is the default.",
        "required": false,
        "type": "text"
      },
      {
        "name": "key",
        "description": "A specific item that describes the update.",
        "type": "text",
        "required": false
      },
      {
        "name": "value",
        "description": "The value for the specified key.",
        "type": "text",
        "required": false
      },
      {
        "name": "fullkey",
        "description": "The expanded name of the specific item that describes the update.",
        "type": "text",
        "required": false
      },
      {
        "name": "parent",
        "description": "The key's parent.",
        "type": "text",
        "required": false
      },
      {
        "name": "query",
        "description": "The query is printed in this column.",
        "type": "text",
        "required": false
      }
    ],
    "url": "https://fleetdm.com/tables/windows_updates",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/windows_updates.yml"
  },
  {
    "name": "wmi_bios_info",
    "description": "Lists important information from the system bios.",
    "url": "https://fleetdm.com/tables/wmi_bios_info",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from wmi_bios_info where name = 'AMTControl'\n```",
    "columns": [
      {
        "name": "name",
        "description": "Name of the Bios setting",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "value",
        "description": "Value of the Bios setting",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/wmi_bios_info.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwmi_bios_info.yml&value=name%3A%20wmi_bios_info%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "wmi_cli_event_consumers",
    "description": "WMI CommandLineEventConsumer, which can be used for persistence on Windows. See https://www.blackhat.com/docs/us-15/materials/us-15-Graeber-Abusing-Windows-Management-Instrumentation-WMI-To-Build-A-Persistent%20Asynchronous-And-Fileless-Backdoor-wp.pdf for more details.",
    "url": "https://fleetdm.com/tables/wmi_cli_event_consumers",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect filter,consumer,query,command_line_template,wcec.name from wmi_cli_event_consumers wcec left outer join wmi_filter_consumer_binding wcb on consumer = wcec.relative_path left outer join wmi_event_filters wef on wef.relative_path = wcb.filter;\n```",
    "columns": [
      {
        "name": "name",
        "description": "Unique name of a consumer.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "command_line_template",
        "description": "Standard string template that specifies the process to be started. This property can be NULL, and the ExecutablePath property is used as the command line.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "executable_path",
        "description": "Module to execute. The string can specify the full path and file name of the module to execute, or it can specify a partial name. If a partial name is specified, the current drive and current directory are assumed.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "The name of the class.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "relative_path",
        "description": "Relative path to the class or instance.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/wmi_cli_event_consumers.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwmi_cli_event_consumers.yml&value=name%3A%20wmi_cli_event_consumers%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "wmi_event_filters",
    "description": "Lists WMI event filters.",
    "url": "https://fleetdm.com/tables/wmi_event_filters",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from wmi_event_filters\n```",
    "columns": [
      {
        "name": "name",
        "description": "Unique identifier of an event filter.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "query",
        "description": "Windows Management Instrumentation Query Language (WQL) event query that specifies the set of events for consumer notification, and the specific conditions for notification.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "query_language",
        "description": "Query language that the query is written in.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "The name of the class.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "relative_path",
        "description": "Relative path to the class or instance.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/wmi_event_filters.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwmi_event_filters.yml&value=name%3A%20wmi_event_filters%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "wmi_filter_consumer_binding",
    "description": "Lists the relationship between event consumers and filters.",
    "url": "https://fleetdm.com/tables/wmi_filter_consumer_binding",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect * from wmi_filter_consumer_binding\n```",
    "columns": [
      {
        "name": "consumer",
        "description": "Reference to an instance of __EventConsumer that represents the object path to a logical consumer, the recipient of an event.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "filter",
        "description": "Reference to an instance of __EventFilter that represents the object path to an event filter which is a query that specifies the type of event to be received.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "The name of the class.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "relative_path",
        "description": "Relative path to the class or instance.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/wmi_filter_consumer_binding.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwmi_filter_consumer_binding.yml&value=name%3A%20wmi_filter_consumer_binding%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "wmi_script_event_consumers",
    "description": "WMI ActiveScriptEventConsumer, which can be used for persistence on Windows. See https://www.blackhat.com/docs/us-15/materials/us-15-Graeber-Abusing-Windows-Management-Instrumentation-WMI-To-Build-A-Persistent%20Asynchronous-And-Fileless-Backdoor-wp.pdf for more details.",
    "url": "https://fleetdm.com/tables/wmi_script_event_consumers",
    "platforms": [
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "```\nselect filter,consumer,query,scripting_engine,script_file_name,script_text,wsec.name from wmi_script_event_consumers wsec left outer join wmi_filter_consumer_binding wcb on consumer = wsec.relative_path left outer join wmi_event_filters wef on wef.relative_path = wcb.filter;\n```",
    "columns": [
      {
        "name": "name",
        "description": "Unique identifier for the event consumer. ",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "scripting_engine",
        "description": "Name of the scripting engine to use, for example, 'VBScript'. This property cannot be NULL.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "script_file_name",
        "description": "Name of the file from which the script text is read, intended as an alternative to specifying the text of the script in the ScriptText property.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "script_text",
        "description": "Text of the script that is expressed in a language known to the scripting engine. This property must be NULL if the ScriptFileName property is not NULL.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "class",
        "description": "The name of the class.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "relative_path",
        "description": "Relative path to the class or instance.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/windows/wmi_script_event_consumers.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fwmi_script_event_consumers.yml&value=name%3A%20wmi_script_event_consumers%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "xprotect_entries",
    "description": "Database of the machine's XProtect signatures.",
    "url": "https://fleetdm.com/tables/xprotect_entries",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "Identify the Bundlore variants Xprotect protects the computer from\n```\nSELECT * FROM xprotect_entries WHERE name LIKE 'OSX.Bundlore%';\n```",
    "columns": [
      {
        "name": "name",
        "description": "Description of XProtected malware",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "launch_type",
        "description": "Launch services content type",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "identity",
        "description": "XProtect identity (SHA1) of content",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "filename",
        "description": "Use this file name to match",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "filetype",
        "description": "Use this file type to match",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "optional",
        "description": "Match any of the identities/patterns for this XProtect name",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "uses_pattern",
        "description": "Uses a match pattern instead of identity",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/xprotect_entries.yml"
  },
  {
    "name": "xprotect_meta",
    "description": "This Mac's browser-related [XProtect](https://support.apple.com/en-ca/guide/security/sec469d47bd8/web) signatures.",
    "url": "https://fleetdm.com/tables/xprotect_meta",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "See the minimum version of specific components allowed by Xprotect. This usually means the previous versions have vulnerabilities that are being exploited at scale, or were exploited at scale at some point in time.\n```\nSELECT * FROM xprotect_meta WHERE min_version!='any';\n```",
    "columns": [
      {
        "name": "identifier",
        "description": "Browser extension or plugin [identifier](https://fleetdm.com/tables/safari_extensions)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "type",
        "description": "Either plugin or extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "developer_id",
        "description": "Developer identity (SHA1) of extension",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "min_version",
        "description": "The minimum allowed plugin version, or 'any' if no version is allowed.",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/xprotect_meta.yml"
  },
  {
    "name": "xprotect_reports",
    "description": "Database of XProtect matches (if user generated/sent an XProtect report).",
    "url": "https://fleetdm.com/tables/xprotect_reports",
    "platforms": [
      "darwin"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "- In [very specific circumstances](https://github.com/osquery/osquery/issues/6588#issuecomment-1410934706) this table will return empty because xprotect will detect and remediate without generating an eicar file. ",
    "examples": "See all Xprotect activity reports, if any are present. This indicates potentially malicious software was blocked by Xprotect.\n```\nSELECT * FROM xprotect_reports;\n```",
    "columns": [
      {
        "name": "name",
        "description": "Description of XProtected malware",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "user_action",
        "description": "Action taken by user after prompted",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Quarantine alert time",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/xprotect_reports.yml"
  },
  {
    "name": "yara",
    "description": "Triggers one-off YARA query for files at the specified path. Requires one of `sig_group`, `sigfile`, or `sigrule`.",
    "url": "https://fleetdm.com/tables/yara",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Look for files under `/root` that match a Yara signature. This example uses the [EICAR test file](https://www.eicar.org/download-anti-malware-testfile/).\n```\nSELECT * FROM yara WHERE path like '/root/%%' AND sigrule IN (\n  'rule eicar {\n  strings:\n  $s1 = \"X5O!P%@AP[4\\\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*\" fullword ascii\n  condition:\n  all of them\n}'\n ) AND matches='eicar';\n\n```",
    "columns": [
      {
        "name": "path",
        "description": "The path scanned",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": true,
        "index": true
      },
      {
        "name": "matches",
        "description": "List of YARA matches",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "count",
        "description": "Number of YARA matches",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sig_group",
        "description": "Signature group used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sigfile",
        "description": "Signature file used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sigrule",
        "description": "Signature strings used",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "strings",
        "description": "Matching strings",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tags",
        "description": "Matching tags",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "sigurl",
        "description": "Signature url",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/yara.yml"
  },
  {
    "name": "yara_events",
    "description": "Track YARA matches for files specified in configuration data.",
    "url": "https://fleetdm.com/tables/yara_events",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": true,
    "cacheable": false,
    "notes": "",
    "columns": [
      {
        "name": "target_path",
        "description": "The path scanned",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "category",
        "description": "The category of the file",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "action",
        "description": "Change action (UPDATE, REMOVE, etc)",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "transaction_id",
        "description": "ID used during bulk update",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "matches",
        "description": "List of YARA matches",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "count",
        "description": "Number of YARA matches",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "strings",
        "description": "Matching strings",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "tags",
        "description": "Matching tags",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "time",
        "description": "Time of the scan",
        "type": "bigint",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "eid",
        "description": "Event ID",
        "type": "text",
        "notes": "",
        "hidden": true,
        "required": false,
        "index": false
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/yara/yara_events.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fyara_events.yml&value=name%3A%20yara_events%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "ycloud_instance_metadata",
    "description": "Yandex.Cloud instance metadata.",
    "url": "https://fleetdm.com/tables/ycloud_instance_metadata",
    "platforms": [
      "darwin",
      "linux",
      "windows"
    ],
    "evented": false,
    "cacheable": true,
    "notes": "",
    "examples": "```\nselect * from ycloud_instance_metadata where metadata_endpoint=\"http://169.254.169.254\"\n```",
    "columns": [
      {
        "name": "instance_id",
        "description": "Unique identifier for the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      },
      {
        "name": "folder_id",
        "description": "Folder identifier for the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "cloud_id",
        "description": "Cloud identifier for the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "name",
        "description": "Name of the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "description",
        "description": "Description of the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "hostname",
        "description": "Hostname of the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "zone",
        "description": "Availability zone of the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "ssh_public_key",
        "description": "SSH public key. Only available if supplied at instance launch time",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "serial_port_enabled",
        "description": "Indicates if serial port is enabled for the VM",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "metadata_endpoint",
        "description": "Endpoint used to fetch VM metadata",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": true
      }
    ],
    "osqueryRepoUrl": "https://github.com/osquery/osquery/blob/master/specs/ycloud_instance_metadata.table",
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/new/main/schema?filename=tables%2Fycloud_instance_metadata.yml&value=name%3A%20ycloud_instance_metadata%0Adescription%3A%20%3E-%20%23%20(required)%20string%20-%20The%20description%20for%20this%20table.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%23%20Add%20description%20here%0Aexamples%3A%20%3E-%20%23%20(optional)%20string%20-%20An%20example%20query%20for%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown%0A%09%23%20Add%20examples%20here%0Anotes%3A%20%3E-%20%23%20(optional)%20string%20-%20Notes%20about%20this%20table.%20Note%3A%20This%20field%20supports%20Markdown.%0A%09%23%20Add%20notes%20here%0Acolumns%3A%20%23%20(required)%0A%09-%20name%3A%20%23%20(required)%20string%20-%20The%20name%20of%20the%20column%0A%09%20%20description%3A%20%23%20(required)%20string%20-%20The%20column's%20description.%20Note%3A%20this%20field%20supports%20Markdown%0A%09%20%20type%3A%20%23%20(required)%20string%20-%20the%20column's%20data%20type%0A%09%20%20required%3A%20%23%20(required)%20boolean%20-%20whether%20or%20not%20this%20column%20is%20required%20to%20query%20this%20table."
  },
  {
    "name": "yum_sources",
    "description": "Current list of Yum repositories or software channels.",
    "url": "https://fleetdm.com/tables/yum_sources",
    "platforms": [
      "linux"
    ],
    "evented": false,
    "cacheable": false,
    "notes": "",
    "examples": "Find yum repositories on Linux servers for which cryptographic verification via GPG is disabled. This could allow untrusted packages to be injected into a repository that could then be installed.\n```\nSELECT * FROM yum_sources WHERE gpgcheck='0'; \n```",
    "columns": [
      {
        "name": "name",
        "description": "Repository name",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "baseurl",
        "description": "Repository base URL",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "mirrorlist",
        "description": "Mirrorlist URL",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "enabled",
        "description": "Whether the repository is used",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gpgcheck",
        "description": "Whether packages are GPG checked",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "gpgkey",
        "description": "URL to GPG key",
        "type": "text",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false
      },
      {
        "name": "pid_with_namespace",
        "description": "Pids that contain a namespace",
        "type": "integer",
        "notes": "",
        "hidden": false,
        "required": false,
        "index": false,
        "platforms": [
          "Linux"
        ]
      }
    ],
    "fleetRepoUrl": "https://github.com/fleetdm/fleet/blob/main/schema/tables/yum_sources.yml"
  }
]


// No typecasting is needed in plain JavaScript
var queryTable = osqueryFleetTablesJSON;

// Sorting the tables by name
var osqueryTables = queryTable.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});

// Getting the table names, excluding hidden ones
var osqueryTableNames = _.flatten(_.map(osqueryTables, function (table) {
  return table.hidden ? [] : table.name;
}));

// Getting the column names, excluding those from hidden tables
var osqueryTableColumnNames = _.flatten(_.map(osqueryTables, function (table) {
  return table.hidden ? [] : _.map(table.columns, function (column) {
    return column.name;
  });
}));

// Getting the table columns, excluding those from hidden tables
var osqueryTableColumns = _.flatten(_.map(osqueryTables, function (table) {
  return table.hidden ? [] : table.columns;
}), true);

// Function to filter columns by selected tables, excluding hidden columns and tables
var selectedTableColumns = function (selectedTables) {
  var columnsFilteredBySelection = _.flatten(_.map(osqueryTables, function (table) {
    var hideColumns = function () {
      if (table.hidden) {
        return true;
      }
      if (selectedTables.length > 0 && !_.includes(selectedTables, table.name)) {
        return true;
      }
      return false;
    };

    return hideColumns() ? [] : table.columns;
  }), true);

  return columnsFilteredBySelection;
};

// // Exports for use in other parts of your Sails.js app
// module.exports = {
//   osqueryTables: osqueryTables,
//   osqueryTableNames: osqueryTableNames,
//   osqueryTableColumnNames: osqueryTableColumnNames,
//   osqueryTableColumns: osqueryTableColumns,
//   selectedTableColumns: selectedTableColumns
// };
