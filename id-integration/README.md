`> sam build --template-file template-code-only.yaml`

```
sam deploy `
--template-file template-db-only.yaml `
--stack-name id-integration-template-api-db-only `
--s3-bucket id-integration-api-s3 `
--region us-east-2 `
--capabilities CAPABILITY_IAM
```

```
aws dynamodb put-item `
--table-name IdIntegrationTable `
--item file://../sample-data/item-meta-tcp-for-cli.json
```

```
aws dynamodb get-item `
--table-name IdIntegrationTable `
--key '{\"orgTenantId\":{\"S\":\"TCP\"}, \"entityId\":{\"S\":\"TCP-meta\"}}'
```

```
aws dynamodb get-item `
--table-name IdIntegrationTable `
--key '{\"orgTenantId\":{\"S\":\"TCP\"}, \"entityId\":{\"S\":\"TCP-meta\"}}' `
--projection-expression "#data, #map" `
--expression-attribute-names '{\"#data\":\"data\", \"#map\":\"map\"}'
```

`console> SELECT data, map FROM IdIntegrationTable`

```
aws dynamodb execute-statement --statement `
"SELECT * FROM IdIntegrationTable `
WHERE orgTenantId='TCP' AND entityId='TCP-meta'"
```

```
aws dynamodb execute-statement --statement `
"SELECT * FROM IdIntegrationTable `
WHERE \""orgTenantId\""='TCP' AND \""entityId\""='TCP-meta'"
```

```
sam local invoke IdIntegrationGetItemByKeyLambda `
--template-file template-code-only.yaml `
--event ../sample-data/get-by-key-input.json
```

```
sam local invoke IdIntegrationGetItemsByPartitionLambda `
--template-file template-code-only.yaml `
--event ../sample-data/get-by-partition-input.json
```

```
sam local start-api `
--template-file template-code-only.yaml `
--port 3000 `
--debug-port 9999
```

http://localhost:3000/items
http://localhost:3000/items/TCP
http://localhost:3000/items/TCP/TCP-meta
http://localhost:3000/items/TCP/emp-101

```
sam local invoke IdIntegrationSaveItemLambda `
--template-file template-code-only.yaml `
--event ../sample-data/item-emp-tcp-101.json
```

```
sam local invoke IdIntegrationDeleteItemLambda `
--template-file template-code-only.yaml `
--event ../sample-data/delete-item-input.json
```

```
sam deploy `
--template-file template-code-only.yaml `
--stack-name id-integration-template-api-code-only `
--s3-bucket id-integration-api-s3 `
--region us-east-2 `
--capabilities CAPABILITY_IAM
```

```
sam deploy `
--template-file template-all.yaml `
--stack-name id-integration-template-api-all `
--s3-bucket id-integration-api-s3 `
--region us-east-2 `
--capabilities CAPABILITY_IAM
```

```
sam delete `
--stack-name id-integration-template-api-db-only
```

```
aws dynamodb get-item `
--table-name IdIntegrationTable `
--key '{\"orgTenantId\":{\"S\":\"TCP\"}, \"entityId\":{\"S\":\"emp-101\"}}' `
--projection-expression "#data, #map" `
--expression-attribute-names '{\"#data\":\"data\", \"#map\":\"map\"}'
```

```
aws dynamodb get-item `
--table-name IdIntegrationTable `
--key '{\"orgTenantId\":{\"S\":\"paycor\"}, \"entityId\":{\"S\":\"p-101\"}}' `
--projection-expression "#data, #map" `
--expression-attribute-names '{\"#data\":\"data\", \"#map\":\"map\"}'
```
