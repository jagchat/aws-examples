import boto3
client = boto3.client('cognito-idp')
response = client.admin_set_user_password(
    UserPoolId='us-east-2_32QZBjg1x',
    Username='scott',
    Password='Scott123?',
    Permanent=True
)
print(response)
