# cloud-solution-bc
This repository deploy application in de cloud for manage of files


## Architecture

Arquitectura para subir archivos a la nube aprovechando el procesamiento y velocidad de S3

![Alt text](docs/Architecture.png?raw=true "Architecture")


## Stack

Las tecnologías usadas se detallan en  la siguiente tabla de la

| Recurso        	| Lenguaje            	| Framework Test 	|
|----------------	|---------------------	|----------------	|
| Nube           	| AWS                 	| NA             	|
| IaaS           	| Terraform - aws cli 	| NA             	|
| Función lambda 	| Node 14 -Typescript 	| Jasmine        	|
| Frontend       	| Vue 3 - Javascript  	| --             	|

## Nube

La nube seleccionada es aws. Se hace uso terraform como sistema para aprovicionamiento de infraestructura, la carpeta [aws-deploy](https://github.com/nickdpz/cloud-solution-bc/tree/master/aws-deploy), la lógica de nombramiento de archivos y carpetas se detalla en la siguiente tabla :

| **Archivo/Carpeta** 	| **Objectivo**                                                                                      	|
|---------------------	|----------------------------------------------------------------------------------------------------	|
| variables.tf        	| Define las variables del proyecto como el provedor de nube, el nombre del datacenter y el ambiente 	|
| provider.tf         	| Define el provedor de nube junto al sistema de envío de correos                                    	|
| locals.tf           	| Centralización de parámetros variables. Ej. Commons tags en función de la variable de ambiente     	|
| files/              	| Carpeta con archivos de implementación base de api gateway, lambdas, step function etc             	|
| config/             	| Carpeta para guardar los valores de las variables según el ambiente                                	|
| data.tf             	| Definición de politicas o estructuras de datos con una configuración basada en un esquema          	|
| ima.tf              	| Define roles, usuarios o grupos y asocia políticas                                                 	|
| api.tf              	| Define los recursos de tipo apigateway                                                             	|
| lambda.tf           	| Define las funciones de procesamiento en la nube                                                   	|
| lambda_trigger.tf   	| Define y asocia los desencadenadores de las funciones de procesamiento en la nube                  	|
| s3.tf               	| Define los sistemas de almacenamiento de archivos en la nube                                       	|
| ses.tf              	| Define sistema de envio de correos                                                                 	|


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

