Miembros:
* Barrientos, Juan Pablo: Leg 45838
* Marti, Sebastian: Leg 45852
* Zonta, Sebastian: Leg ?
* Cervillera, Tomas: Leg 45799

Resumen
* En este trabajo practico de TTADS vamos a realizar un diario online, en este los usuarios periodistas van a poder cargar notas periodisticas y los administradores van a poder cargar encuestas que los usuarios van a poder responder. Los usuarios van a poder subscribirse para recibir noticias por email y acceso a noticias exclusivas.

ABMC:

Usuarios:

* Id
* Nombre
* Apellido
* Telefono
* Duracion

Categoria:

* Id
* Descripcion

Provincia:

* Id
* Descripcion

Subscripcion:

* Precio

Nota:

* Id
* IdUsuario
* IdCategoria
* IdProvincia
* Titulo
* Descripcion
* SubscripcionNecesaria
* Imagen

Encuesta:

* Id
* IdCategoria
* Pregunta
* Respuesta

Respuesta:

* IdEncuesta
* NumeroRespuesta
* Descripcion

RespuestaEncuesta

* IdEncuesta
* IdUsuario
* Respuesta

Listado:

* Listado Simple: Mostrar todos los usuarios

* Listado Complejo 1: Mostrar todas las notas periodisticas filtradas por autor/categoria

* Listado Complejo 2: Mostrar todas las encuestas filtradas por categoria

Detalle 1:

Nota

* Titulo
* Descripcion
* Imagen

Detalle 2:

Usuario Autor

* Notas escritas por el autor
* Biografia del autor
