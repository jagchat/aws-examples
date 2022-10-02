### Demo

A simple example on how to use AWS SAM CLI to test and debug AWS API Gateway (HTTP Endpoint) along with AWS Lambda function locally using VSCode.

NOTE: This mostly follows instructions/images in "02-\*" sample from lambda debugging perspective

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

- It should start service
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

- Place a breakpoint in index.js
- Click on "Run & Debug" from left panel
- Click "Continue(F5)" till you reach the breakpoint
- Press "Continue(F5)" after debugging.
- The result will be shown at the prompt

#### Debug HTTP API Endpoint locally using VSCode

- this part assumes that the previous section is follows and still VSCode is open
- use following command to start debugging service (at port 9999)

`> sam local start-api --port 3000 --debug-port 9999 `

- The above ensures configures webserver at port 3000 and debug port at 9999 (for VSCode)
- It initially kicks off only web server (not debug port yet) (01.png)
- Open browser and point to http://localhost:3000. The browser would just be spinning (waiting).
- At this moment the debug port gets kicked in (02.png)
- Switch to VSCode and click on "Run & Debug" to hit breakpoint in index.js
- Hit "Continue(F5)" till it hits the breakpoint (03.png)
- Press "Continue(F5)" to continue after debugging
- And now, the browser gives the result (04.png)
- Live reloading should work (not tested)
- Press Ctrl+C to cancel debugging (may take a while to respond)
