# cloud-solution-bc
This repository deploy application in de cloud for manage of files


## Architecture

Arquitectura para subir archivos a la nube aprovechando el procesamiento y velocidad de S3

![Alt text](docs/Architecture.png?raw=true "Architecture")


## Utils

Update Lambda Signed Code

```sh
$ aws lambda update-function-code \
 --function-name bc-test-default-signed-urls \
 --zip-file fileb://signed-urls-lambda/dist/main.zip \
 --publish \
 --output json
```

Test cors api gateway

```sh
curl -v -X OPTIONS https://ohtqk07i4c.execute-api.us-east-2.amazonaws.com/default/endpoint
```

Update Api Gateway Code

```sh
$ aws apigateway put-rest-api \
--rest-api-id ohtqk07i4c \
--cli-binary-format raw-in-base64-out \
--mode merge \
--no-fail-on-warnings \
--body fileb://aws-deploy/files/apidocs.json
```

Update deployment

```sh
$ aws apigateway create-deployment \
--rest-api-id ohtqk07i4c \
--stage-name default \
--stage-description 'Deployment api 3' \
--description 'Deployment to the default 3'
```

