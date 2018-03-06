# qak
A CLI for nested Projects

[![npm version](https://badge.fury.io/js/qak.svg)](https://badge.fury.io/js/qak)
[![dependencies](https://david-dm.org/arupex/qak.svg)](http://github.com/arupex/qak)
![Build Status](https://api.travis-ci.org/arupex/qak.svg?branch=master) 
![Donate]("https://www.patreon.com/bePatron?u=5407448)
![lifetimeDownloadCount](https://img.shields.io/npm/dt/qak.svg?maxAge=35920000)


### Instalation
    npm i -g qak
    
### Usage (get commands)
    qak
    
### Usage if unique command (if not unique qak will give you a table of ambiguity)
    qak uniqueCommand
    
### Usage if you want project scripts
    qak project
    
### Usage if you want to run a command in a specific project when that command is used in multiple projects
    qak project command
    or
    qak command project
    
### passing args thru qak
    qak command project --remoteUrl=localhost
Qak will
 - set env var remoteUrl = 'localhost';
 - set the args on the command call to match as well
 
 ### qak ambiquity (if there is any it will output a table to stdout)
        $> qak postinstall
         ╔══════════════════╤═════════════╤═════════════════════════════════════════════════════════╗
         ║ Project          │ Command     │ Script                                                  ║
         ╟──────────────────┼─────────────┼─────────────────────────────────────────────────────────╢
         ║ integration-test │ postinstall │ ./scripts/download_wiremock.sh;webdriver-manager update ║
         ╟──────────────────┼─────────────┼─────────────────────────────────────────────────────────╢
         ║ system-test      │ postinstall │ webdriver-manager update                                ║
         ╚══════════════════╧═════════════╧═════════════════════════════════════════════════════════╝
     
 ### if you give it a project name but no command qak will tell you the availible commands
         $> qak api
         ╔═════════╤═════════╤══════════════════════════════════════════════════╗
         ║ Project │ Command │ Script                                           ║
         ╟─────────┼─────────┼──────────────────────────────────────────────────╢
         ║ api     │ serve   │ npm run swagger; nodemon src/server.js           ║
         ╟─────────┼─────────┼──────────────────────────────────────────────────╢
         ║ api     │ swagger │ node tasks/buildSwaggerDef.js                    ║
         ║         │         │ ../client/doc/swagger.json swagger.yml localdev  ║
         ╟─────────┼─────────┼──────────────────────────────────────────────────╢
         ║ api     │ test    │ ./../node_modules/.bin/cucumber-js --tags '@wip' ║
         ╚═════════╧═════════╧══════════════════════════════════════════════════╝
 
 ### and if you just do qak you'll get it all
          $> qak
          ╔══════════════════╤═══════════════╤═════════════════════════════════════════════════╗
          ║ Project          │ Command       │ Script                                          ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ admin            │ test          │ npm run test-service;npm run test-ui            ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ admin            │ test-ui       │ cd client;npm test;npm run e2e;cd ..            ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ api              │ serve         │ npm run swagger; nodemon src/server.js          ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ api              │ swagger       │ node tasks/buildSwaggerDef.js                   ║
          ║                  │               │ ../client/doc/swagger.json swagger.yml localdev ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ client           │ ng            │ ng                                              ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ client           │ start         │ webpack-dev-server --port=4200                  ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ client           │ test          │ karma start ./karma.conf.js                     ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ client           │ e2e           │ chimp                                           ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ client           │ lint          │ ng lint                                         ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ client           │ bower-install │ bower install && ./scripts/fix_bower_paths.sh   ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ client           │ i18n          │ node ./scripts/aggregatei18n.js                 ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ integration-test │ postinstall   │ ./scripts/wiremock.sh;webdriver-manager update  ║
          ╟──────────────────┼───────────────┼─────────────────────────────────────────────────╢
          ║ system-test      │ postinstall   │ webdriver-manager update                        ║
          ╚══════════════════╧═══════════════╧═════════════════════════════════════════════════╝
          
      
  ### Partial match - this module uses digital-search which uses a digital trie to search possible choices
       $> qak ap
       ╔═════════╤═════════╤══════════════════════════════════════════════════╗
       ║ Project │ Command │ Script                                           ║
       ╟─────────┼─────────┼──────────────────────────────────────────────────╢
       ║ api     │ serve   │ npm run swagger; nodemon src/server.js           ║
       ╟─────────┼─────────┼──────────────────────────────────────────────────╢
       ║ api     │ swagger │ node tasks/buildSwaggerDef.js                    ║
       ║         │         │ ../client/doc/swagger.json swagger.yml localdev  ║
       ╟─────────┼─────────┼──────────────────────────────────────────────────╢
       ║ api     │ test    │ ./../node_modules/.bin/cucumber-js --tags '@wip' ║
       ╚═════════╧═════════╧══════════════════════════════════════════════════╝
       
       $> qak adm
       ╔═════════╤═══════════════╤═══════════════════════════════════════╗
       ║ Project │ Command       │ Script                                ║
       ╟─────────┼───────────────┼───────────────────────────────────────╢
       ║ admin   │ test          │ npm run test-service;npm run test-ui  ║
       ╟─────────┼───────────────┼───────────────────────────────────────╢
       ║ admin   │ test-ui       │ cd client;npm test;npm run e2e;cd ..  ║
       ╚═════════╧═══════════════╧═══════════════════════════════════════╝
       
### if the partial match has only a single result it will execute!

       $> qak ad tes
       ╔═════════╤═══════════════╤══════════════════════════════════════╗
       ║ Project │ Command       │ Script                               ║
       ╟─────────┼───────────────┼──────────────────────────────────────╢
       ║ admin   │ test          │ npm run test-service;npm run test-ui ║
       ╚═════════╧═══════════════╧══════════════════════════════════════╝
       
       executing test...