const packageJson = require('../../package.json');

export const environment = {
  appName: 'Angular Ngxs Material Starter',
  envName: 'TEST',
  production: false,
  test: true,
  i18nPrefix: '',
  URL_SERVER_API: 'https://cors-anywhere.herokuapp.com',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngxs: packageJson.dependencies['@ngxs/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  }
};
