# Angular, NGXS and Angular Material Starter 
por [@iago_aa](https://twitter.com/iago_aa) baseado em Angular, NGRX and Angular Material Starter por [@tomastrajan](https://twitter.com/tomastrajan) 

[![license](https://img.shields.io/github/license/Zuiago/angular-ngxs-material-starter.svg)](https://github.com/Zuiago/angular-ngxs-material-starter/blob/master/LICENSE) [![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/Zuiago/angular-ngxs-material-starter.svg?branch=master)](https://travis-ci.org/Zuiago/angular-ngxs-material-starter) [![Twitter Follow](https://img.shields.io/twitter/follow/iago_aa.svg?style=social&label=Follow)](https://twitter.com/iago_aa)


![intro](https://raw.githubusercontent.com/Zuiago/angular-ngxs-material-starter/master/meta-assets/intro.png)
![themes](https://raw.githubusercontent.com/Zuiago/angular-ngxs-material-starter/master/meta-assets/themes.png)

## Table of Content

  * [Live Demo](https://https://zuiago.github.io//angular-ngxs-material-starter)
  * [Getting Started](#getting-started)
  * [Useful Commands](#useful-commands)
  * [Make It Your Own](#torne-isso-um-projeto-seu)
  * [Learning Materials](#estude-material)
  * [Lista de Projectos construidos usando este projeto starter](https://github.com/Zuiago/angular-ngxs-material-starter/blob/master/BUILT_WITH.md)
  * [Features](#features)
  * [Stack](#stack)
  * [Code of Conduct](https://github.com/Zuiago/angular-ngxs-material-starter/blob/master/CODE_OF_CONDUCT.md)
  * [Contributors Guide](https://github.com/Zuiago/angular-ngxs-material-starter/blob/master/CONTRIBUTING.md)
  * [Changelog](https://github.com/Zuiago/angular-ngxs-material-starter/blob/master/CHANGELOG.md) ( get notified about the newest releases, [follow Release Butler](https://twitter.com/releasebutler) on Twitter )


## Getting started
```bash
git clone https://github.com/Zuiago/angular-ngxs-material-starter.git new-project
cd new-project
npm install
npm start
```

## Useful Commands
  * `npm start` - inicia um servidor de desenvolvimento e abre o navegador com a aplicação rodando
  * `npm run test` - roda tarefas de lint e testes
  * `npm run watch` - roda tarefas de teste em watch mode (Faz com que cada alteração de arquivo dispare o teste)
  * `npm run prod` - roda todo o build preparado para produção e cria o prod bundle
  * `npm run prettier` - roda o prettier para formatar todo codigo escrito em typescript e scss 
  * `npm run analyze` - roda todo o build preparado para produção e o pluguin do webpack`webpack-bundle-analyzer` para visualizar dependencias e gerenciar o tamanho da aplicação 

![analzye](https://raw.githubusercontent.com/Zuiago/angular-ngxs-material-starter/master/meta-assets/analyze.png)

## Torne isso um projeto seu
When using this starter project to build your own app you might consider some of the following steps:
  
  * use `search and replace` functionality of your favourite IDE to replace `anms` with `<your-app-prefix>`
  * rename project in `package.json` `name` property and set appropriate version (eg `0.0.0` or `1.0.0`)
  * rename app in `src/environments/` files (will be shown in browser tab)
  * delete pre-existing `CHANGELOG.md` (you will generate your own with future releases of your features)
  * delete `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md` and `BUILT_WITH.md` files as they are relevant only if project is open sourced on Github
  * remove or adjust links in the [footer](https://github.com/Zuiago/angular-ngxs-material-starter/blob/master/src/app/app.component.html#L79)
  * replace logo in `src/assets` folder ( currently 128 x 128 pixel `png` file )
  * adjust colors in `src/themes/default-theme.scss`
  * create a pull request in the [original repository](https://github.com/Zuiago/angular-ngxs-material-starter/) to update `BUILT_WITH.md` [file](https://github.com/Zuiago/angular-ngxs-material-starter/blob/master/BUILT_WITH.md) with a link and short description of your project
  
#### Integração contínua
Starter project estã usando [Travis CI](https://travis-ci.org/) para rodar linters e testes em cada commit realizado.
Baseado na sua preferência você pode:

  * não usar ou usar de outro CI server e deletar tanto`.travis.yml` e `.travis-deploy.sh`
  * Segue o artigo em Inglês que explica como criar uma conta no Travis CI e fazer o link com o projeto no repositório do Github [configure build](https://medium.com/@tomastrajan/continuous-deployment-of-client-side-apps-with-github-pages-travis-ci-10e9d641a889) 
    com `GH_REF` e `GH_TOKEN` environment variables para automaticamente fazer deploy das releases para Paginas do Github
  

## Estude Material
Estes artigos possuem conteudo que explica varias abordagens usadas para construir este starter project.

  * [Blog post about Best subscribing to RxJS Observable data by Components](https://medium.com/@tomastrajan/angular-question-rxjs-subscribe-vs-async-pipe-in-component-templates-c956c8c0c794): subscribe() vs | async pipe
  * [Blog post about Best Practices for Angular CLI](https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81) used in this starter project
  * [Blog post about Typescript tips for Ngrx reducer code](https://medium.com/@tomastrajan/object-assign-vs-object-spread-in-angular-ngrx-reducers-3d62ecb4a4b0)
  * [Blog post about building responsive layouts with Bootstrap 4 in Angular apps](https://medium.com/@tomastrajan/how-to-build-responsive-layouts-with-bootstrap-4-and-angular-6-cfbb108d797b)
  * [Blog post about configuration of animations during runtime](https://medium.com/tomastrajan/total-guide-to-dynamic-angular-animations-that-can-be-toggled-at-runtime-be5bb6778a0a)
  * [Blog post about unit testing of components with NgRx TestStore](https://medium.com/@tomastrajan/how-to-unit-test-angular-components-with-fake-ngrx-teststore-f0500cc5fc26)
  * [Blog post about Angular CLI budgets](https://medium.com/@tomastrajan/how-did-angular-cli-budgets-save-my-day-and-how-they-can-save-yours-300d534aae7a)
  * [Blog post about the best way to unsubscribe RxJs streams](https://medium.com/@tomastrajan/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0)
  * [Blog post about Angular 6+ DI with providedIn](https://medium.com/@tomastrajan/total-guide-to-angular-6-dependency-injection-providedin-vs-providers-85b7a347b59f)

#### Temas 

  * [Blog post](https://medium.com/@tomastrajan/the-complete-guide-to-angular-material-themes-4d165a9d24d1)
  * [Presentation (Slides)](http://slides.com/tomastrajan/angular-material-themes-guide#/)
  * [Live coding Video Tutorial](https://www.youtube.com/watch?v=PsgZjFTAleI)
  * [Meetup Presentation & Live coding Video](https://www.youtube.com/watch?v=7auj9RfCNrE)

 
## Features

* suporte a temas customizados (5 temas incluídos)
* carregamento lazy-loading de feature modules
* localStorage ui state persistence
* `@Action Handlers` for API requests
* Design totalmente responsivo
* angular-material e componentes customizados ficam em `SharedModule`
 
## Stack

* Angular
* ngxs ([ngrx](https://github.com/ngrx/store) for more mature state manager or try [ngx-model](https://github.com/tomastrajan/ngx-model) if you prefer less boilerplate)
* Angular Material
* Bootstrap 4 (only reset, utils and grids)

## Troubleshooting

* **Blocking at emitting LicenseWebpackPlugin when npm start** - try using [cnpm](https://github.com/cnpm/cnpm) instead of npm

## Contribuidores
Quer contribuir com este projeto angular feito para desenvolvedores brasileiros?

Deixe sua marca e ingresse nesse time de contribuidores que está começando!

Comece verificando as issues localizadas em [issues](https://github.com/Zuiago/angular-ngxs-material-starter/issues) e leia [Contributor Guide](https://github.com/Zuiago/angular-ngxs-material-starter/blob/master/CONTRIBUTING.md)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!--| [<img src="https://avatars0.githubusercontent.com/u/8050831?s=460&v=4" width="100px;"/><br /><sub><b>Iago Andrade</b></sub>](https://medium.com/@iagoquest)<br />💻 📖 ⚠ 🎨 📝 |  |  |  |  |  |  |-->
<!--| :---: | :---: | :---: | :---: | :---: | :---: | :---: |-->
<!--|  |  |  |  |-->
| [<img src="https://avatars0.githubusercontent.com/u/8050831?s=460&v=4" width="100px;"/><br /><sub><b>Iago Andrade</b></sub>](https://medium.com/@iagoquest)<br />💻 📖 ⚠ 🎨 📝 |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->
