import boto3
client = boto3.client('cognito-idp')
response = client.admin_get_user(
    UserPoolId='us-east-2_32QZBjg1x',
    Username='scott'
)
print(response)
