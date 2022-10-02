### cognito-test-userpool-ensure-user

A simple example on how to use AWS SDK to fetch user info (with AdminGetUser) in cognito user pool using Lambda function and create user if doesn't exist.

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
- The solution gets deployed using SAM and can be deleted through CloudFormation object (visible through AWS Toolkit extension). Ex: cognito-test-ensure-user-app
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
TBD
```
