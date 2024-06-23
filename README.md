## API Documentation

# Users

## Create User

URL: /api/user/v1/create

Method: POST

Description: Creates a new user in the application.

Body: {

"username": "string",

"password": "string"

}
username (string): Username of the new user.

password (string): Password of the new user.

### Successful Response:

Code: 201
Content: {
"id": "string",
"username": "string",
"token": "string"
}
id (string): Unique identifier of the created user.
username (string): Username of the created user.
token (string): Authentication token generated for the user.

### Errors:

400: Validation error if the provided data is incorrect.
500: Internal server error if there is an issue during user creation.

## Login User

URL: /api/user/v1/login
Method: POST
Description: Authenticates the user and generates a session token.
Body: {
"username": "string",
"password": "string"
}
username (string): Username of the user attempting to log in.
password (string): Password of the user attempting to log in.

### Successful Response:

Code: 200
Content: {
"token": "string"
}
token (string): Session token generated for the authenticated user.

### Errors:

400: Validation error if the provided data is incorrect.
401: Authorization error if the login credentials are invalid.
500: Internal server error if there is an issue during login.

## Get User Projects

URL: /api/user/v1/:userId/projects
Method: GET
Description: Retrieves projects associated with a specific user.
Parameters:
userId (path): ID of the user whose projects are to be retrieved.
Optional Query:
status (query): Status of the projects to filter (not started, in progress, completed).

### Successful Response:

Code: 200
Content: Array of JSON objects representing the projects.

### Errors:

400: Bad request if the user ID is missing.
500: Internal server error if there is an issue during project retrieval.

### Get User Tasks

URL: /api/user/v1/:userId/tasks
Method: GET
Description: Retrieves tasks assigned to a specific user.
Parameters:
userId (path): ID of the user whose tasks are to be retrieved.
Optional Query:
status (query): Status of the tasks to filter (not started, in progress, completed).

## Successful Response:

Code: 200
Content: Array of JSON objects representing the tasks.

## Errors:

400: Bad request if the user ID is missing.
500: Internal server error if there is an issue during task retrieval.

# Tasks

## Create Task

URL: /api/task/v1/create
Method: POST
Description: Creates a new task in the application.
Authorization: Requires a valid JWT token.
Body: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string", // One of: "not started", "in progress", "completed"
"users": ["string"] // Optional: Array of user IDs associated with the task
}
title (string): Title of the task.
description (string): Description of the task.
dueDate (date): Due date of the task.
status (string): Current status of the task (not started, in progress, completed).
users (array of strings): Optional array of user IDs associated with the task.

### Successful Response:

Code: 201
Content: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string",
"isActive": true,
"users": ["string"]
}
title (string): Title of the created task.
description (string): Description of the created task.
dueDate (date): Due date of the created task.
status (string): Status of the created task.
isActive (boolean): Indicates if the task is active (true) or archived (false).
users (array of strings): Array of user IDs associated with the task.

### Errors:

400: Validation error if the provided data is incorrect.
500: Internal server error if there is an issue during task creation.

## Read Task

URL: /api/task/v1/read/:id
Method: GET
Description: Retrieves details of a specific task.
Authorization: Requires a valid JWT token.
Parameters:
id (path): ID of the task to retrieve.

### Successful Response:

Code: 200
Content: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string",
"isActive": true,
"users": ["string"]
}
title (string): Title of the task.
description (string): Description of the task.
dueDate (date): Due date of the task.
status (string): Status of the task.
isActive (boolean): Indicates if the task is active (true) or archived (false).
users (array of strings): Array of user IDs associated with the task.

### Errors:

400: Bad request if the task ID is missing.
404: Not found if the task with the specified ID does not exist.
500: Internal server error if there is an issue during task retrieval.

## Update Task

URL: /api/task/v1/update/:id
Method: PUT
Description: Updates details of a specific task.
Authorization: Requires a valid JWT token.
Parameters:
id (path): ID of the task to update.
Body: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string", // One of: "not started", "in progress", "completed"
"users": ["string"] // Optional: Array of user IDs associated with the task
}
title (string): Updated title of the task.
description (string): Updated description of the task.
dueDate (date): Updated due date of the task.
status (string): Updated status of the task (not started, in progress, completed).
users (array of strings): Updated array of user IDs associated with the task.

### Successful Response:

Code: 200
Content: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string",
"isActive": true,
"users": ["string"]
}
title (string): Updated title of the task.
description (string): Updated description of the task.
dueDate (date): Updated due date of the task.
status (string): Updated status of the task.
isActive (boolean): Indicates if the task is active (true) or archived (false).
users (array of strings): Updated array of user IDs associated with the task.

### Errors:

400: Bad request if the task ID is missing or if the provided data is incorrect.
404: Not found if the task with the specified ID does not exist.
500: Internal server error if there is an issue during task update.

## Delete Task

URL: /api/task/v1/delete/:id
Method: DELETE
Description: Deletes a specific task.
Authorization: Requires a valid JWT token.
Parameters:
id (path): ID of the task to delete.

### Successful Response:

Code: 200
Content: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string",
"isActive": false,
"users": ["string"]
}
title (string): Title of the deleted task.
description (string): Description of the deleted task.
dueDate (date): Due date of the deleted task.
status (string): Status of the deleted task.
isActive (boolean): Indicates if the task is active (false after deletion).
users (array of strings): Array of user IDs associated with the task.

### Errors:

400: Bad request if the task ID is missing.
404: Not found if the task with the specified ID does not exist.
500: Internal server error if there is an issue during task deletion.

# Projects

## Create Project

URL: /api/project/v1/create
Method: POST
Description: Creates a new project in the application.
Authorization: Requires a valid JWT token.
Body: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string", // One of: "not started", "in progress", "completed"
"users": ["string"], // Optional: Array of user IDs associated with the project
"tasks": ["string"] // Optional: Array of task IDs associated with the project
}
title (string): Title of the project.
description (string): Description of the project.
dueDate (date): Due date of the project.
status (string): Current status of the project (not started, in progress, completed).
users (array of strings): Optional array of user IDs associated with the project.
tasks (array of strings): Optional array of task IDs associated with the project.

### Successful Response:

Code: 201
Content: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string",
"isActive": true,
"users": ["string"],
"tasks": ["string"]
}
title (string): Title of the created project.
description (string): Description of the created project.
dueDate (date): Due date of the created project.
status (string): Status of the created project.
isActive (boolean): Indicates if the project is active (true) or archived (false).
users (array of strings): Array of user IDs associated with the project.
tasks (array of strings): Array of task IDs associated with the project.

### Errors:

400: Validation error if the provided data is incorrect.
500: Internal server error if there is an issue during project creation.

## Read Project

URL: /api/project/v1/read/:id
Method: GET
Description: Retrieves details of a specific project.
Authorization: Requires a valid JWT token.
Parameters:
id (path): ID of the project to retrieve.

### Successful Response:

Code: 200
Content: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string",
"isActive": true,
"users": ["string"],
"tasks": ["string"]
}
title (string): Title of the project.
description (string): Description of the project.
dueDate (date): Due date of the project.
status (string): Status of the project.
isActive (boolean): Indicates if the project is active (true) or archived (false).
users (array of strings): Array of user IDs associated with the project.
tasks (array of strings): Array of task IDs associated with the project.

### Errors:

400: Bad request if the project ID is missing.
404: Not found if the project with the specified ID does not exist.
500: Internal server error if there is an issue during project retrieval.

## Update Project

URL: /api/project/v1/update/:id
Method: PUT
Description: Updates details of a specific project.
Authorization: Requires a valid JWT token.
Parameters:
id (path): ID of the project to update.
Body: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string", // One of: "not started", "in progress", "completed"
"users": ["string"], // Optional: Array of user IDs associated with the project
"tasks": ["string"] // Optional: Array of task IDs associated with the project
}
title (string): Updated title of the project.
description (string): Updated description of the project.
dueDate (date): Updated due date of the project.
status (string): Updated status of the project (not started, in progress, completed).
users (array of strings): Updated array of user IDs associated with the project.
tasks (array of strings): Updated array of task IDs associated with the project.

### Successful Response:

Code: 200
Content: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string",
"isActive": true,
"users": ["string"],
"tasks": ["string"]
}
title (string): Updated title of the project.
description (string): Updated description of the project.
dueDate (date): Updated due date of the project.
status (string): Updated status of the project.
isActive (boolean): Indicates if the project is active (true) or archived (false).
users (array of strings): Updated array of user IDs associated with the project.
tasks (array of strings): Updated array of task IDs associated with the project.

### Errors:

400: Bad request if the project ID is missing or if the provided data is incorrect.
404: Not found if the project with the specified ID does not exist.
500: Internal server error if there is an issue during project update.

## Delete Project

URL: /api/project/v1/delete/:id
Method: DELETE
Description: Deletes a specific project.
Authorization: Requires a valid JWT token.
Parameters:
id (path): ID of the project to delete.

### Successful Response:

Code: 200
Content: {
"title": "string",
"description": "string",
"dueDate": "date",
"status": "string",
"isActive": false,
"users": ["string"],
"tasks": ["string"]
}
title (string): Title of the deleted project.
description (string): Description of the deleted project.
dueDate (date): Due date of the deleted project.
status (string): Status of the deleted project.
isActive (boolean): Indicates if the project is active (false after deletion).
users (array of strings): Array of user IDs associated with the project.
tasks (array of strings): Array of task IDs associated with the project.

### Errors:

400: Bad request if the project ID is missing.
404: Not found if the project with the specified ID does not exist.
500: Internal server error if there is an issue during project deletion.
