const importLazy = require('import-lazy')(require);

const { mainHandler } = importLazy('../../cli/main-handler');
const Okapi = importLazy('../../okapi');
const PermissionService = importLazy('../../okapi/permission-service');
const { applyOptions, okapiRequired, tenantRequired } = importLazy('../common-options');


function listPermissionsCommand(argv, context) {
  const okapi = new Okapi(argv.okapi, argv.tenant);
  const permissionService = new PermissionService(okapi, context);

  return permissionService.listPermissionsForUser(argv.user)
    .then((response) => {
      if (Array.isArray(response)) {
        response.forEach(perm => console.log(perm));
      } else {
        console.log(response);
      }
    });
}

module.exports = {
  command: 'list',
  describe: 'List permissions for a user',
  aliases: ['view'],
  builder: (yargs) => {
    yargs
      .option('user', {
        describe: 'Username',
        type: 'string',
        required: true,
      })
      .example('$0 perm list --user diku_admin', 'List permissions for user diku_admin');
    return applyOptions(yargs, okapiRequired, tenantRequired);
  },
  handler: mainHandler(listPermissionsCommand),
};