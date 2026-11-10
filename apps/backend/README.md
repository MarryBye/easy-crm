# Лабораторно-практична робота №6

## Впровадження сервісного шару, валідації та DTO

Мета: Навчитись проектувати та реалізовувати правильну архітектуру бекенд-додатку за принципом розділення відповідальності (Separation of Concerns). Практично реалізувати сервісний шар, впровадити механізм валідації через middleware та навчитись формувати контрольовані відповіді API за допомогою DTO.

[Скриншоти від 5 роботи](./images/1/)  
[Скриншоти від 6 роботи](./images/2/)  

## Короткий опис сутностей та їхніх зв'язків

- Сутності:
  - [`orm.entities.users.User`](src/orm/entities/users/User.ts) — користувачі (адміністратори та стандартні користувачі).
  - [`orm.entities.cars.Car`](src/orm/entities/cars/Car.ts) — автомобілі. 
  - [`orm.entities.ride_orders.RideOrder`](src/orm/entities/ride_orders/RideOrder.ts) — замовлення поїздок.

- Відносини:
  - Один User може мати один Car (OneToOne): властивість в User — `car`.
  - User може бути водієм або клієнтом у RideOrder (OneToMany / ManyToOne): властивості `orders_as_driver`, `orders_as_client`.

- DTO:
  - [`dto.UserResponseDTO`](src/dto/user_response_dto.ts) — контрольоване представлення User
  - [`dto.CarResponseDTO`](src/dto/car_response_dto.ts) — контрольоване представлення Car
  - [`dto.RideOrderResponseDTO`](src/dto/rideorder_response_dto.ts) — контрольоване представлення RideOrder

- Помічні компоненти:
  - Помилка: [`utils.response.custom-error.CustomError`](src/utils/response/custom-error/CustomError.ts)
  - Відповіді: [`src/utils/response/customSuccess.ts`](src/utils/response/customSuccess.ts)

## Перелік реалізованих API ендпоінтів (v1)

Маршрути визначені в [src/routes/v1](src/routes/v1):

- Auth
  - POST /v1/auth/login — логін. Роут: [src/routes/v1/auth.ts](src/routes/v1/auth.ts). Контролер: [`controllers.auth.login`](src/controllers/auth/login.ts)
  - POST /v1/auth/register — реєстрація. Контролер: [`controllers.auth.register`](src/controllers/auth/register.ts)
  - POST /v1/auth/change-password — зміна паролю (вимагає JWT). Контролер: [`controllers.auth.changePassword`](src/controllers/auth/changePassword.ts)

- Users (адміністратор)
  - GET /v1/users — список користувачів. Роут: [src/routes/v1/users.ts](src/routes/v1/users.ts). Контролер: [`controllers.users.list`](src/controllers/users/list.ts)
  - POST /v1/users — створити користувача. Контролер: [`controllers.users.create`](src/controllers/users/create.ts)
  - GET /v1/users/:id — отримати користувача. Контролер: [`controllers.users.show`](src/controllers/users/show.ts)
  - PATCH /v1/users/:id — редагувати користувача. Контролер: [`controllers.users.edit`](src/controllers/users/edit.ts)
  - DELETE /v1/users/:id — видалити користувача. Контролер: [`controllers.users.destroy`](src/controllers/users/destroy.ts)

- Cars (адміністратор)
  - GET /v1/cars — список автомобілів. Роут: [src/routes/v1/cars.ts](src/routes/v1/cars.ts). Контролер: [`controllers.cars.list`](src/controllers/cars/list.ts)
  - POST /v1/cars — створити авто. Контролер: [`controllers.cars.create`](src/controllers/cars/create.ts)
  - GET /v1/cars/:id — деталі авто. Контролер: [`controllers.cars.show`](src/controllers/cars/show.ts)
  - PATCH /v1/cars/:id — редагувати авто. Контролер: [`controllers.cars.edit`](src/controllers/cars/edit.ts)
  - DELETE /v1/cars/:id — видалити авто. Контролер: [`controllers.cars.destroy`](src/controllers/cars/destroy.ts)

- RideOrders (адміністратор)
  - GET /v1/rideorders — список замовлень (включає зв'язані driver та client). Роут: [src/routes/v1/rideorders.ts](src/routes/v1/rideorders.ts). Контролер: [`controllers.rideorders.list`](src/controllers/rideorders/list.ts)
  - POST /v1/rideorders — створити замовлення (можна вказати driverId, clientId). Контролер: [`controllers.rideorders.create`](src/controllers/rideorders/create.ts)
  - GET /v1/rideorders/:id — деталі замовлення (повертає driver та client DTOs). Контролер: [`controllers.rideorders.show`](src/controllers/rideorders/show.ts)
  - PATCH /v1/rideorders/:id — редагувати замовлення. Контролер: [`controllers.rideorders.edit`](src/controllers/rideorders/edit.ts)
  - DELETE /v1/rideorders/:id — видалити замовлення. Контролер: [`controllers.rideorders.destroy`](src/controllers/rideorders/destroy.ts)

## Валідація (middleware)

- Валідація аутентифікації: [src/middleware/validation/auth](src/middleware/validation/auth) — `validatorLogin`, `validatorRegister`, `validatorChangePassword`
- Валідація користувачів: [src/middleware/validation/users](src/middleware/validation/users) — `validatorCreate`, `validatorShow`, `validatorEdit`, `validatorDestroy`
- Валідація rideorders: [src/middleware/validation/rideorders](src/middleware/validation/rideorders) — `validatorCreate`, `validatorShow`, `validatorEdit`, `validatorDestroy`
Файли прикладів: [src/middleware/validation/rideorders/validatorCreate.ts](src/middleware/validation/rideorders/validatorCreate.ts)

## Сервісний шар

Сервіси інкапсулюють доступ до репозиторіїв та логіку:
- [`service.UserService`](src/service/UserService.ts)
- [`service.CarService`](src/service/CarService.ts)
- [`service.RideOrderService`](src/service/RideOrderService.ts)

## Приклади відповідей та скріншоти (Postman)

- Postman collection: [postman/](./postman/)

## Запуск проекту (коротко)

- Встановити залежності:
  npm install

- Запуск в режимі розробки (як у проекті):
  npm run docker:dev

- Міграції та сидування бази (як у Docker entrypoint в scripts/be-node-dev.sh):
  npm run migration:generate -n NAME_OF_MIGRATION
  npm run migration:run:dev
  npm run seed:run

- По завершенню перевірок API використайте Postman collection

## Нова архітектура додатку — шари та їхня роль

- Middleware (валідація)
  - Призначення: зупиняє некоректні запити до контролерів, нормалізує вхідні дані та повертає зрозумілі помилки (400).

- Controller (оркестрація)
  - Призначення: приймає запит після middleware, викликає сервіс, формує та повертає відповідь (HTTP-коди, DTO).

- Service (бізнес-логіка)
  - Призначення: інкапсулює бізнес-правила, обробку даних та роботу з репозиторіями; не займається HTTP-логікою.

- Repository (доступ до даних)
  - Призначення: робота з ORM, тільки CRUD та запити з відношеннями.
