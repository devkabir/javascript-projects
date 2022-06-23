# Rest API build with express and mysql :tada:

REST API that makes queries to MySQL database using NodeJS and Express.

## Installation
:pushpin: Open terminal and paste 
```bash
git clone https://github.com/devkabir/javascript-projects.git
git checkout js-rest-api-with-mysql
yarn 
yarn start
```

## Endpoints
| Endpoint               | Method | Action           |
| ---------------------- | ------ | ---------------- |
| localhost:3000/api     | GET    | All bookings     |
| localhost:3000/api/:id | GET    | Find a booking   |
| localhost:3000/api     | POST   | Create a booking |
| localhost:3000/api     | PUT    | Update a booking |
| localhost:3000/api/:id | DELETE | Delete a booking |


