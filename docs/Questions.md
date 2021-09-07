# Architecture Questions

1. Está desarrollando una función Lambda que procesa notificaciones de eventos de Amazon S3. Se espera que la función tenga: 

- 50 solicitudes por segundo 
- 100 segundos para completar cada solicitud 

¿Qué debe hacer para evitar problemas cuando la función se haya implementado y esté operativa? 


* El aprovisionamiento de recursos de las funciones lambda lo hace aws de forma automatica, sin embargo, presenta un limite de 1000 ejecuciones en el mismo instante de tiempo (AWS Lambda Raises Default Concurrent Execution Limit (amazon.com)) para el caso presentado en el peor escenario se tendrían 50000 ejecuciones simultáneas lo cual supera el límite de aws, para atender este caso se puede optar por dos estrategias. La primera es el aumento del límite regional de la función lambda comunicándose con el área de soporte de AWS Support Center.  La segunda estrategia es usar una **SQS** entre los eventos de **S3** y la función lambda, con el objetivo que se pueda encadenar las solicitudes y la función lambda no ejecute muchos procesos al tipo, con esta estrategia el límite de procesamiento simultáneo lo determina la cantidad de mensajes que la cola entrega a la lambda y se podría continuar cumpliendo con el límite de aws.

2. Se indica a un desarrollador que configure una nueva arquitectura sin servidor compuesta por AWS Lambda, API Gateway y DynamoDB en un solo stack. La nueva arquitectura debería permitir al desarrollador construir, probar y depurar localmente aplicaciones sin servidor. 
¿Qué herramientas debe utilizar para hacer esto posible? 


* Con elAWS **SAM** interfaz de línea de comandos (CLI), es posible probar localmente y depurar «paso a paso» las aplicaciones sin servidor. Sin embargo estas configuraciones pueden representar un alto esfuerzo de configuración y es completamente necesario que el desarrollador tenga configurado las credenciales de acceso desde en la terminal de comandos lo cual no es una buena práctica. 

Los frameworks de testing y mocks de recursos de aws cumplen entonces un papel fundamental ya que permiten probar la aplicación a base de esquemas pre establecidos por aws y generar eventos de comunes y de errores. En caso de hacer uso del paradigma de inyección de dependencias es posible probar cada componente de la aplicación de forma individual e inyectar mock de las dependencias que usa cada componente, generando test unitarios que permitan tener una métrica de la calidad de código y los escenarios de pruebas realizados. Con esta estrategia se ajusta mucho a aplicaciones que necesitan hacer integración continua del código.  

3. Un desarrollador está construyendo actualmente una arquitectura de microservicios escalable donde las aplicaciones complejas se descomponen en servicios independientes más pequeños. Docker se utilizará como su contenedor de aplicaciones para proporcionar una forma óptima de ejecutar servicios pequeños y desacoplados. El desarrollador también debe tener un control detallado sobre la arquitectura de la aplicación personalizada. 

 ¿Cuál es el servicio de AWS que debería usar para esta solución? 

* AWS cuenta con tres servicios para el despliegue y  administración de aplicaciones basadas en contenedores el primer servicio es **ECR** - Amazon Elastic Container Registry diseñado para el registro de imágenes de docker en la nube de aws, de tal manera que puedan ser accedida por roles y permisos de iam. El segundo servicio es **ECS** - Amazon Elastic Container Service este permite administrar y ejecutar los contenedores de forma totalmente aprovisionada por aws, adicionalmente se puede integrar con herramientas como Step Functions para administrar procesos o algoritmos de alta complejidad y mantener desacoplado la funcionalidad con la lógica de los procesos. Finalmente **EKS** - Amazon Elastic Kubernetes Service es un cluster de kubernetes con servidores ec2 que permiten desplegar aplicaciones en diferentes namespaces y aprovisionar balanceadores de carga para desplegar los servicios de forma externa con un dominio particular.

4. Una empresa utiliza una combinación de servicios de CodeCommit, CodeBuild, CodePipeline y CodeDeploy para su canalización de integración continua y entrega continua (CI / CD) en AWS. Quieren que alguien realice una revisión del código antes de que se permita el paso a la siguiente etapa de una canalización. Si se aprueba la acción, la ejecución de la canalización se reanuda, pero si no lo es, la ejecución de la canalización no continuará. 

¿Cuál es la solución que deben implementar para suplir esta necesidad? 

* La ejecución de pruebas de código, estilos, calidad de código y verificación de seguridad de dependecias deberia hacerce en la etapas de CI. Para estas se plantea el trabajo que permita hacer pruebas unitarias al código usando los utilitarios del framework de testing segun el lenguaje seleccionado, las pruebas de dependencias, estilos de código se hacen con un paquete utilitario del lenguaje y finalmente las pruebas de revición de bug e issues se puede implementar usando un servidor de **SonarQ**, el cual puede ser aprovicionado usando docker o pagar la versión privada. En caso de que alguna de las etapas fallé el código no pasa a la etapa de CD y no podrá llegar al ambiente productivo.

4. Para mejorar su sistema de gestión de seguridad de la información (ISMS), una empresa lanzó recientemente una nueva política que requiere que todas las credenciales de la base de datos estén encriptadas y rotadas automáticamente para evitar el acceso no autorizado.  

¿Cuál es la solución más apropiada para administrar estas credenciales?

* 
 El uso de llaves de seguridad simétricas de los proveedores de nube permiten almacenar, rotar y administrar las llaves de seguridad, para el caso de aws el servicio seleccionado es **KMS**. Las llaves nunca son entregadas por el proveedor de nube a algún usuario pero sí permite a  los recursos usar las llaves para desencriptar la información siempre y cuando el recurso un rol con una política que le permita acceder a la llave
