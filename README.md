# cloud-solution-bc
 
This repository deploy application in de cloud for manage of files
 
## Architecture
 
Se plantea la siguiente arquitectura con el fin de aprovechar el procesamiento de servicios como s3 para carga y almacenamiento de archivos en la nube.
 
![Alt text](docs/Architecture.png?raw=true "Architecture")
 
Una vez el cliente pase las validaciones del correo, tipo de archivo y tamaño de archivo se hará una consulta a un **API Gateway** para que a su vez llame una función **Lambda** que genere una URL pre firmada válida por periodo de tiempo y lista para hacer la carga del archivo directamente a **S3**.
 
Una vez el cliente recibe la url pre firmada pasa a cargar el archivo en forma de binario al **S3** para que posteriormente se desencadene otra lambda que haga el procesamiento del archivo y el envío del correo, si todo sale bien la función lambda guarda un archivo json en una carpeta pública con el mismo nombre del archivo de la url pre firmada, el cual va a consultar el frontend después de un periodo de tiempo para obtener la respuesta. Se destaca que el archivo final se elimina después de un periodo de tiempo. 
 
## Stack
 
Las tecnologías usadas se detallan en la siguiente tabla
 
| Recurso        | Lenguaje            | Framework Test |
| -------------- | ------------------- | -------------- |
| Nube           | AWS                 | NA             |
| IaaS           | Terraform - aws cli | NA             |
| Función lambda | Node 14 -Typescript | Jasmine        |
| Frontend       | Vue 3 - Javascript  | --             |
 
## Nube
 
La nube seleccionada es aws. Se hace uso terraform como sistema para aprovicionamiento de infraestructura, la carpeta [aws-deploy](https://github.com/nickdpz/cloud-solution-bc/tree/master/aws-deploy), la lógica de nombramiento de archivos y carpetas se detalla en la siguiente tabla :
 
| **Archivo/Carpeta** | **Objetivo**                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| variables.tf        | Define las variables del proyecto como el proveedor de nube, el nombre del datacenter y el ambiente |
| provider.tf         | Define el provedor de nube junto al sistema de envío de correos                                    |
| locals.tf           | Centralización de parámetros variables. Ej. Commons tags en función de la variable de ambiente     |
| files/              | Carpeta con archivos de implementación base de api gateway, lambdas, step function etc             |
| config/             | Carpeta para guardar los valores de las variables según el ambiente                                |
| data.tf             | Definición de politicas o estructuras de datos con una configuración basada en un esquema          |
| ima.tf              | Define roles, usuarios o grupos y asocia políticas                                                 |
| api.tf              | Define los recursos de tipo apigateway                                                             |
| lambda.tf           | Define las funciones de procesamiento en la nube                                                   |
| lambda_trigger.tf   | Define y asocia los desencadenadores de las funciones de procesamiento en la nube                  |
| s3.tf               | Define los sistemas de almacenamiento de archivos en la nube                                       |
| ses.tf              | Define sistema de envio de correos                                                                 |
 
## Procesamiento en la nube ( lambdas )
 
Al usar la nube aws es natural el desarrollo de funciones lambda para el procesamiento de la información con cualquier tipo de eventos en este caso la solicitud se generación de la url pre firmada para subir archivos al bucket de s3 [signed-urls-lambda](https://github.com/nickdpz/cloud-solution-bc/tree/master/signed-urls-lambda) y el procesamiento del archivo y la notificación via correo electrónico [verify-file-and-notify-lambda](https://github.com/nickdpz/cloud-solution-bc/tree/master/verify-file-and-notify-lambda) . Las funciones lambdas se desarrollaron usando el lenguaje **typescript** y se compilan a **javascript** y empaquetan usando paquetes utilitarios de npm para finalmente ser ejecutadas en la nube con el entorno de ejecución **node JS** en su versión **14**. Las funciones lambdas se desarrollaron con una arquitectura de inyección de dependencias usando el framework **Inversify**, la siguiente tabla da una vista general a las carpetas y archivos que componen las funciones lambas: 
 
 
| **Archivo/Carpeta**   | **Objectivo**                                                                                                     |
|---------------------  |---------------------------------------------------------------------------------------------------------------    |
| src/                  | Carpeta de implementación de la lambda                                                                            |
| test/                 | Carpeta de pruebas unitarias de la lambda                                                                         |
| src/index.ts          | Recibe el evento y el contexto del recurso que desencadena la lambda                                              |
| src/controllers/      | Carpeta con definición de archivos para la extracción de datos del evento que desencadenó la lambda               |
| src/config/           | Fusión entre la definición de los esquemas y la implementación                                                     |
| src/service/          | Lógica principal de la función lambda encargada de orquestar las respuestas de los recursos que se consumen       |
| src/presenter/        | Capa de presentación de los datos finales dependiendo del recurso que espera la respuesta de la lambda            |
| src/models/           | Definición de los esquemas de las estructuras de datos que usa la lambda                                           |
| src/adapters          | Recursos utilitarios que usa el servicio para procesar la información del evento (axios, aws-sdk, luxon, etc)     |
 
## Frontend
 
Las interfaces se construyeron con el framework **vue 3** usando composition api. Los estilos de la aplicación se diseñaron en el con el framework de utilidades **tailwind**. Al ser un proyecto tan minimalista desde el punto de vista de frontend se condensó la mayor parte de la lógica en el archivo "App.vue". A Continuación se presenta una captura de pantalla de la interfaz diseñada: 
 
![Frontend](docs/Frontend.png?raw=true "Frontend")
 
## Utils

Comandos utilitarios para actualización de definición de lambda y api gateway sin necesidad de desplegar infraestructura.

- Update Lambda Signed Code
 
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