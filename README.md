Miembros:
* Barrientos, Juan Pablo: Leg 45838
* Marti, Sebastian: Leg 45852
* Zonta, Sebastian: Leg ?
* Cervillera, Tomas: Leg 45799

Resumen
* En este trabajo practico de TTADS vamos a realizar un diario online, en este los usuarios periodistas van a poder cargar notas periodisticas y los administradores van a poder cargar encuestas que los usuarios van a poder responder. Los usuarios van a poder subscribirse para recibir noticias por email y acceso a noticias exclusivas.

ABMC:

User:

* Id
* Name
* Surname
* UserName
* Role
* Telephone
* subscribedUntil

Category

* Id
* Name

Province

* Id
* Name

Subscription:

* Price
* EffectiveDate

Post

* Id
* UserId
* CategoryId
* ProvinceId
* Title
* Body
* RequiresSubscription

Poll

* Id
* CategoryId
* Description

Poll_Value

* Id
* PollId
* Description

User_Vote

* UserId
* PollId
* PollValueId


Listado:

* Listado Simple: Mostrar todos los usuarios

* Listado Complejo 1: Mostrar todas las notas periodisticas filtradas por autor/categoria

* Listado Complejo 2: Mostrar todas las encuestas filtradas por categoria

Detalle 1:

Nota

* Heading
* Body

Detalle 2:

Usuario Autor

* Notas escritas por el autor
* Biografia del autor
