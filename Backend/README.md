# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It validates the input data, checks if the user already exists, hashes the password, and creates a new user in the database. Upon successful registration, it returns the created user and a JSON Web Token (JWT).

### Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

| Field               | Type   | Required | Description                                   |
|---------------------|--------|----------|-----------------------------------------------|
| `fullname.firstname`| String | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastname` | String | No       | The last name of the user (minimum 3 characters). |
| `email`             | String | Yes      | A valid email address.                        |
| `password`          | String | Yes      | A password with a minimum length of 6 characters. |

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response
The response will be in JSON format and include the created user and a JWT token.

#### Success Response
Status Code: 201 Created

```json
{
  "user": {
    "_id": "64f1b2c3d4e5f6a7b8c9d0e1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": ""
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Validation Error
Status Code: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### User Already Exists
Status Code: 400 Bad Request

```json
{
  "message": "User already exists"
}
```