### Demo

A simple example on how to use AWS SAM CLI to test and debug AWS Lambda function locally using VSCode.

#### Heads-up

- Env: Win 10
- Needs AWS CLI and AWS SAM CLI installed / configured
- Needs Docker Desktop installed
- Needs Node.js/NPM installed
- AWS CLI version: 2.4.9
- SAM CLI version: 1.37.0
- Node version: 14.18.1
- NPM version: 6.14.15
- handcrafted "template.yaml"
- created files manually without using "sam init" command (used "npm init" for package.json)

#### Debug Lambda locally

- use following command to start debugging service (at port 9999)

`> sam local invoke -d 9999 HelloWorldFunction `

- It should start service (00.png)
- Open VSCode and open "app" folder
- Click on "Run & Debug" from left panel and create "launch.json" as follows:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach to SAM CLI",
            "type": "node",
            "request": "attach",
            "address": "localhost",
            "port": 9999,
            "localRoot": "${workspaceRoot}",
            "remoteRoot": "/var/task",
            "protocol": "inspector",
            "stopOnEntry": false
        }
    ]
}
```

NOTE: if parent folder is opened (instead of "app"), modify attribute in launch.json as `"localRoot": "${workspaceRoot}/app"`

- Place a breakpoint in index.js (01.png)
- Click on "Run & Debug" from left panel (02.png)
- Click "Continue(F5)" till you reach the breakpoint (03.png)
- Press "Continue(F5)" after debugging.
- The result will be shown at the prompt (04.png)

#### Simplifying using npm

- modify "package.json" as follows:

```
"scripts": {
  "hello-world": "sam local invoke -d 9999 HelloWorldFunction -e "
},
```

- now we can use following command to start debugging

`> npm run hello-world `
or
`> npm run hello-world -- event.json `

NOTE: event.json is for input params.
