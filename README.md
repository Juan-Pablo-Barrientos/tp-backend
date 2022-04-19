Miembros:
* Barrientos, Juan Pablo: Leg 45838
* Marti, Sebastian: Leg 45852
* Zonta, Sebastian: Leg 45712
* Cervillera, Tomas: Leg 45799

**Modelo de datos**

![unknown](https://user-images.githubusercontent.com/63053666/161178812-cc688d71-a81c-4780-b409-74f31cedfaab.png)

Resumen
* En este trabajo practico de TTADS vamos a realizar un diario online, en este los usuarios periodistas van a poder cargar notas periodisticas y los administradores van a poder cargar encuestas que los usuarios van a poder responder. Los usuarios van a poder subscribirse para recibir noticias por email y acceso a noticias exclusivas.

ABMC:

Users:

* **Id**
* Name
* Surname
* UserName
* Role
* Telephone
* subscribedUntil

Categories

* **Id**
* Name

Provinces

* **Id**
* Name

Subscriptions:

* Price
* **EffectiveDate**

Posts

* **Id**
* UserId
* CategoryId
* ProvinceId
* Title
* Body
* RequiresSubscription

Polls

* **Id**
* CategoryId
* Description

Poll_Values

* **Id**
* PollId
* Description

User_Votes

* **UserId**
* **PollId**
* **PollValueId**


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
