___
## RESTful endpoints
___

### POST /register
##### register new user
___
_Request Body_
```json
{
  "name": <your_name>,
	"email": <your_email>,
	"password":<your_password>
}
```
_Response ( 201 - Succes)_
```json
{
  "access_token": <token>
}
```
_Response (400 - Validation error)_
```json
{
  "message": [
      "password cannot be null"
  ]
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "User already exists"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
___
### POST /login
##### login existing user
___

_Request Body_
```json
{
	"email": <your_email>,
	"password": <your_password
}
```

_Response ( 201 )_
```json
{
  "access_token": <token>
}
```

_Error Response ( 400 - email or password wrong)_
```json
{
  "message": "Email or Password does not match"
}
```

_Error Response ( 404 - user not found )_
```json
{
  "message": "User not found"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```
___
### GET /carts
##### get all carts craeted by admin
___

_Request Header_
```json
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
    {
        "id": <id>,
        "name": <product_name>,
        "image": <product_image>,
        "price": <product_price>,
        "stock": <product_stock>
    },
    ...
]
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### GET /products/:id
##### get one products by id
____________
_Request Header_
```json
not needed
```

_Request Params_
```json
{
  "id": <id>
}
```

_Request Body_
```json
not needed
```

_Response (200)_
```json
{
    "id": <id>,
    "name": <product_name>,
    "image": <product_image>,
    "price": <product_price>,
    "stock": <product_stock>
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Product not found"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

___
### GET /carts
##### get all carts craeted by admin
___

_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "id": <your_id>,
  "name": <your_name>,
  "email": <your_email>,
  "Carts": [
      {
          "id": <cart_id>,
          "amount": <cart_amount>,
          "Product": {
              "id": <product_id>,
              "name": <product_name>,
              "image": <product_image>,
              "price": <product_price>,
              "stock": <product_stock>,
          }
      },
    ...
  ]
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

___
### POST /carts
##### create new cart
___

_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Body_
```json
{
    "ProductId": <product_id>,
    "amount": <amount>
}
```

_Response (200)_
```json
{
    "UserId": <your_id>,
    "ProductId": <product_id>,
    "amount": <amount>,
    "id": <cart_id>
}
```

_Response (400 - Bad Request)_
```json
{
  "message": [
    "ProductId cannot be null",
  ]
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
