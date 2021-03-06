const importLazy = require('import-lazy')(require);

const Okapi = importLazy('../../okapi');
const ModuleService = importLazy('../../okapi/module-service');
const { okapiRequired } = importLazy('../common-options');


function pullModuleDescriptorsCommand(argv) {
  const okapi = new Okapi(argv.okapi, argv.tenant);
  const moduleService = new ModuleService(okapi);

  return moduleService.pullModuleDescriptorsFromRemote(argv.remote)
    .then((response) => {
      if (Array.isArray(response)) {
        response.forEach(mod => console.log(mod));
      } else {
        console.log(response);
      }
    });
}

module.exports = {
  command: 'pull',
  describe: 'Pull module descriptors from a remote okapi',
  builder: (yargs) => {
    yargs
      .option('remote', {
        describe: 'Remote Okapi to pull from',
        type: 'string',
        required: true,
      })
      .option(okapiRequired)
      .example('$0 mod pull --okapi http://localhost:9130 --remote http://folio-registry.aws.indexdata.com', 'Pull module descriptors from remote Okapi');
  },
  handler: pullModuleDescriptorsCommand,
};
