# Architecture Questions

1. Está desarrollando una función Lambda que procesa notificaciones de eventos de Amazon S3. Se espera que la función tenga: 

- 50 solicitudes por segundo 
- 100 segundos para completar cada solicitud 

¿Qué debe hacer para evitar problemas cuando la función se haya implementado y esté operativa? 


* El aprovisionamiento de recursos de las funciones lambda lo hace aws de forma automatica, sin embargo, presenta un limite de 1000 ejecuciones en el mismo instante de tiempo (AWS Lambda Raises Default Concurrent Execution Limit (amazon.com)) para el caso presentado en el peor escenario se tendrían 50000 ejecuciones simultáneas lo cual supera el límite de aws, para este caso se puede optar por dos estrategias. La primera es el aumento del límite regional de la función lambda comunicándose con el área de soporte de AWS Support Center.  La segunda estrategia es usar una sqs entre los eventos de s3 y la función lambda de tal manera que se pueda encadenar las solicitudes y la función lambda no se ejecute muchos procesos al tipo, de esta manera el límite de procesamiento simultáneo lo determina la cantidad de mensajes que la cola entrega a la lambda y se podría continuar cumpliendo con el límite de aws.

2. Se indica a un desarrollador que configure una nueva arquitectura sin servidor compuesta por AWS Lambda, API Gateway y DynamoDB en un solo stack. La nueva arquitectura debería permitir al desarrollador construir, probar y depurar localmente aplicaciones sin servidor. 

* Los frameworks de testing y mocks de recursos de aws cumplen entonces un papel fundamental ya que permiten probar la aplicación a base de esquemas pre establecidos por aws y generar eventos de comunes y de errores. En caso de hacer uso del paradigma de inyección de dependencias es posible probar cada componente de la aplicación de forma individual e inyectar mock de las dependencias que usa cada componente, generando test unitarios que permitan tener una métrica de la calidad de código y los escenarios de pruebas realizados. Con esta estrategia se ajusta mucho a aplicaciones que necesitan hacer integración continua del código.  