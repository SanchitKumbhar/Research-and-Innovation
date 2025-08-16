### API Documentation

This document describes the REST API for managing todos. All endpoints are protected and require a JSON Web Token (JWT) for authentication. The JWT has an expiration time of 1 hour.

***

### Authentication

All requests to the endpoints must include a valid JWT in the `Authorization` header with the `Bearer` scheme.

**Header:** `Authorization: Bearer <token>`

* **Error:** If a request is made without a token, or with an invalid/expired token, the server will respond with a **401 Unauthorized** status code.

***

### Endpoints

#### 1. Create a Todo

This endpoint allows you to create a new todo item.

* **Endpoint:** `POST /api/todos`
* **Authentication:** Required
* **Request Body:**
    ```json
    {
      "title": "string"
    }
    ```
* **Success Response (201 Created):**
    ```json
    {
      "id": "integer",
      "title": "string",
      "completed": 0
    }
    ```
* **Error Response (400 Bad Request):**
    * If the `title` is missing from the request body.
    ```json
    {
      "error": "Title is required"
    }
    ```

***

#### 2. Get All Todos

This endpoint retrieves all todo items from the database.

* **Endpoint:** `GET /api/todos`
* **Authentication:** Required
* **Success Response (200 OK):**
    ```json
    [
      {
        "id": "integer",
        "title": "string",
        "completed": "integer (0 or 1)"
      }
    ]
    ```
* **Error Response (500 Internal Server Error):**
    * If there's an issue with the database query.

***

#### 3. Update a Todo

This endpoint updates the completion status of a specific todo item.

* **Endpoint:** `PUT /api/todos/:id`
* **Authentication:** Required
* **URL Parameter:** `id` (integer) - The ID of the todo to update.
* **Request Body:**
    ```json
    {
      "completed": "integer (0 or 1)"
    }
    ```
* **Success Response (200 OK):**
    ```json
    {
      "message": "Todo updated"
    }
    ```
* **Error Response (404 Not Found):**
    * If a todo with the specified `id` does not exist.
    ```json
    {
      "error": "Todo not found"
    }
    ```

***

#### 4. Delete a Todo

This endpoint deletes a specific todo item.

* **Endpoint:** `DELETE /api/todos/:id`
* **Authentication:** Required
* **URL Parameter:** `id` (integer) - The ID of the todo to delete.
* **Success Response (200 OK):**
    ```json
    {
      "message": "Todo deleted"
    }
    ```
* **Error Response (404 Not Found):**
    * If a todo with the specified `id` does not exist.
    ```json
    {
      "error": "Todo not found"
    }
    ```