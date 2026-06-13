# Task Manager

A simple full-stack Personal Task Manager built with React (Vite) for the frontend and Node.js + Express for the backend.

## Project structure

- `client/` - React frontend application
- `server/` - Express API server
- `server/data/tasks.json` - JSON file that stores tasks

## Features

- Add tasks with title, description, and due date
- View tasks sorted by newest first
- Edit tasks
- Delete tasks with confirmation
- Mark tasks complete/incomplete
- Filter tasks by All, Active, Completed
- Highlight overdue tasks

## Run the backend

1. Open a terminal in `task-manager/server`
2. Run `npm install`
3. Run `npm start`

The backend will run on `http://localhost:4000`.

## Run the frontend

1. Open a terminal in `task-manager/client`
2. Run `npm install`
3. Run `npm run dev`

The frontend will run on `http://localhost:5173`.

## API endpoints

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `PATCH /api/tasks/:id/toggle`
- `DELETE /api/tasks/:id`

## Notes

- The frontend uses Axios for API calls.
- The backend saves tasks to `server/data/tasks.json`.
