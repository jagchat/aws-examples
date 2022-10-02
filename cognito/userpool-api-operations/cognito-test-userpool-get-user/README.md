### cognito-test-userpool-get-user

A simple example on how to use AWS SDK to fetch user info (with AdminGetUser) in cognito user pool using Lambda function

#### Heads-up

Following need to installed / configured

- FYI: this was tested using Win 10
- AWS CLI
- AWS SAM CLI
- Needs Docker Desktop installed
- Needs Node.js/NPM installed
- VSCode with Docker and AWS Toolkit Extensions

The AWS CLI profile must have appropriate read/write access to the following services: AWS CloudFormation, IAM, Lambda, Amazon API Gateway, Amazon Simple Storage Service (Amazon S3), and Amazon Elastic Container Registry (Amazon ECR).

#### Important

- The solution was created/deployed/tested/debugged using VSCode and the AWS Toolkit extension.
- The solution gets deployed using SAM and can be deleted through CloudFormation object (visible through AWS Toolkit extension)
- Lambda function should have 'cognito-idp:AdminGetUser' allowed (already part of template.yaml)
- Environment variable (for user pool id) needs to be set using Lambda configuration.
- use Event JSON as follows to test Lambda function (ensure user "scott" exists in user pool).

```
{
  "userId": "scott"
}
```

#### VSCode Run/Debug config file:

```
{
	"folders": [
		{
			"name": "userpool-api-operations",
			"path": "C:\\tests\\cognito-samples\\userpool-api-operations"
		}
	],
	"launch": {
		"configurations": [
			{
				"type": "aws-sam",
				"request": "direct-invoke",
				"name": "cognito-test-userpool-get-user:GetUserFunction",
				"invokeTarget": {
					"target": "template",
					"templatePath": "${workspaceFolder}/cognito-test-userpool-get-user/template.yaml",
					"logicalId": "GetUserFunction"
				},
				"lambda": {
					"payload": {
						"json": {
							"userId": "scott"
						}
					},
					"environmentVariables": {
						"COGNITO_USER_POOL_ID": "us-east-2_32QZBjg1x"
					}
				}
			},
			{
				"type": "aws-sam",
				"request": "direct-invoke",
				"name": "cognito-test-userpool-get-user:GetUserFunction (nodejs14.x)",
				"invokeTarget": {
					"target": "template",
					"templatePath": "${workspaceFolder}/cognito-test-userpool-get-user/template.yaml",
					"logicalId": "GetUserFunction"
				},
				"lambda": {
					"payload": {},
					"environmentVariables": {}
				}
			},
			{
				"type": "aws-sam",
				"request": "direct-invoke",
				"name": "API cognito-test-userpool-get-user:GetUserFunction (nodejs14.x)",
				"invokeTarget": {
					"target": "api",
					"templatePath": "${workspaceFolder}/cognito-test-userpool-get-user/template.yaml",
					"logicalId": "GetUserFunction"
				},
				"api": {
					"path": "/get-user",
					"httpMethod": "get",
					"payload": {
						"json": {}
					}
				},
				"lambda": {
					"runtime": "nodejs14.x"
				}
			}
		]
	}
}
```
