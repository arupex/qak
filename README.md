# qak
A CLI for nested Projects

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
process.env.remoteUrl = 'localhost';
and also set the args on the command call to match as well