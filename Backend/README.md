# API Documentation

## Table of Contents
- [Users Register](#users-register)
- [Users Login](#users-login)
- [Users Logout](#users-logout)
- [User Profile](#user-profile)

---

## Users Register

### Endpoint
`POST /users/register`

### Description
Registers a new user. Validates input, checks if the user already exists, hashes the password, and stores the user in the database. Returns the created user and a JWT token.

### Request Body

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

| Field               | Type   | Required | Description                                      |
|--------------------|--------|----------|--------------------------------------------------|
| `fullname.firstname` | String | Yes      | First name (min 3 characters)                    |
| `fullname.lastname`  | String | No       | Last name (min 3 characters)                     |
| `email`              | String | Yes      | Valid email address                              |
| `password`           | String | Yes      | Password (min 6 characters)                      |

### Success Response

**Status:** `201 Created`

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

### Error Responses

**Validation Error – 400 Bad Request**

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

**User Already Exists – 400 Bad Request**

```json
{
  "message": "User already exists"
}
```

---

## Users Login

### Endpoint
`POST /users/login`

### Description
Authenticates a user using email and password. Returns JWT token and user details on success.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

| Field      | Type   | Required | Description          |
|------------|--------|----------|----------------------|
| `email`    | String | Yes      | Valid email address  |
| `password` | String | Yes      | User's password      |

### Success Response

**Status:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1b2c3d4e5f6a7b8c9d0e1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": ""
  }
}
```

### Error Responses

**Invalid Credentials – 400 Bad Request**

```json
{
  "message": "Invalid email or password"
}
```

**Validation Error – 400 Bad Request**

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## Users Logout

### Endpoint
`POST /users/logout`

### Description
Logs out the user by invalidating or blacklisting the JWT token.

### Headers

| Header         | Value               | Required | Description           |
|----------------|---------------------|----------|-----------------------|
| Authorization  | Bearer `<JWT>`      | Yes      | User's JWT token      |

### Success Response

**Status:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

---

## User Profile

### Endpoint
`GET /users/profile`

### Description
Fetches the currently logged-in user's profile information.

### Headers

| Header         | Value               | Required | Description           |
|----------------|---------------------|----------|-----------------------|
| Authorization  | Bearer `<JWT>`      | Yes      | User's JWT token      |

### Success Response

**Status:** `200 OK`

```json
{
  "_id": "64f1b2c3d4e5f6a7b8c9d0e1",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": ""
}
```

### Error Response

**Unauthorized – 401 Unauthorized**

```json
{
  "message": "Unauthorized"
}
```
