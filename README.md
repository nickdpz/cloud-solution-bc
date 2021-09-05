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

Update Api Gateway Code

```sh
$ aws apigateway put-rest-api \
--rest-api-id ohtqk07i4c \
--mode merge \
--no-fail-on-warnings \
--body file://aws-deploy/files/apidocs.json
```