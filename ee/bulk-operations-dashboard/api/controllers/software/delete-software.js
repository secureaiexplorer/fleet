module.exports = {


  friendlyName: 'Delete software',


  description: '',

  inputs: {
    software: {
      type: {},
      description: 'The software that will be deleted.',
      required: true,
    }
  },


  exits: {

  },


  fn: async function ({software}) {
    // If the provided software does not have a teams array and has an ID, it is an undeployed software that will be deleted.
    if(software.id && !software.teams){
      await sails.rm(software.uploadFd);
      await UndeployedSoftware.destroy({id: software.id});
    } else {// Otherwise, this is a deployed software, and we'll use information from the teams array to remove the software.
      for(let team of software.teams){
        await sails.helpers.http.sendHttpRequest.with({
          method: 'DELETE',
          baseUrl: sails.config.custom.fleetBaseUrl,
          url: `/api/v1/fleet/software/titles/${software.fleetApid}/available_for_install?team_id=${team.fleetApid}`,
          headers: {
            Authorization: `Bearer ${sails.config.custom.fleetApiToken}`,
          }
        });
      }
    }
    // All done.
    return;

  }


};