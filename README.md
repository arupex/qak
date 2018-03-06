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