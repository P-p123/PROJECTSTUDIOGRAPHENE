# Personal Task Manager

A full-stack Task Manager application built using React, Vite, Node.js, and Express. The application allows users to create, manage, update, and track their daily tasks efficiently.

## Features

* Create new tasks with title, description, and due date
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as completed or active
* Filter tasks by:

  * All Tasks
  * Active Tasks
  * Completed Tasks
* Highlight overdue tasks
* Responsive and user-friendly interface
* Persistent storage using JSON file

## Tech Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Data Storage

* JSON File (`tasks.json`)

## Project Structure

task-manager/
├── client/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── server/
│ ├── routes/
│ ├── data/
│ ├── server.js
│ └── package.json
│
└── README.md

## Installation

### Clone Repository

```bash
git clone https://github.com/P-p123/PROJECTSTUDIOGRAPHENE.git
cd PROJECTSTUDIOGRAPHENE
```

### Backend Setup

```bash
cd task-manager/server
npm install
npm start
```

Backend runs on:

```text
http://localhost:4000
```

### Frontend Setup

```bash
cd task-manager/client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | /api/tasks            | Fetch all tasks    |
| POST   | /api/tasks            | Create a task      |
| PUT    | /api/tasks/:id        | Update a task      |
| PATCH  | /api/tasks/:id/toggle | Toggle task status |
| DELETE | /api/tasks/:id        | Delete a task      |

## Future Improvements

* User Authentication
* Database Integration (MongoDB/PostgreSQL)
* Task Categories
* Search and Sorting
* Notifications and Reminders

## Author

Prachi Pandey
GitHub: https://github.com/P-p123
