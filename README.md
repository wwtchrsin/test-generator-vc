# Test Generator
A tool that allows you to create web apps containing multiple-choice tests.
There's an admin page that can be used to populate your app's database
with tests (to add and delete tests). The design of the pages is simple and minimalistic
so that it resembles the regular pen-and-paper tests. The project consists of two parts:
a server (`backend` directory, built with express.js) and a client 
(`frontend` directory, built with next.js). The project was initially vibe-coded and than
modified manually.

## Requirements
* Node.js (version >= 24)
* Docker

## Installation
First, go to the `backened` directory and create the `.env` file using
the `.env.example` as a base. Set a proper value for the `ADMIN_TOKEN` entry
which is used to verify request from the admin page. Make sure `DATABASE_URL`
contains the user name, password, database name and port number that match those defined
in the `docker-compose.yml`. Than in the `backend` directory run the following command:
```bash
npm run install
```
Then, go to the `frontend` directory and create the `.env` file from `.env.example`.
Set the `NEXT_PUBLIC_APP_NAME` to define your app's name. Also make sure that
`NEXT_PUBLIC_API_URL` contains a valid address to connect to the server. 
Then in the `frontend` directory run the following command:
```bash
npm run install
```
If you are planning to make your app available to the public
you should set `NODE_ENV` to `production` in both `.env` files - on the server and
on the client - in order to disable the admin page.

## Launching
In the project's root run the following commands:
```bash
docker compose up -d # run database container
# `docker compose down` - to stop the container
npm run start:server
npm run start:client
```

## Configuration
You can define a list of difficulty levels suitable for your application by modifying `LEVELS` 
array in the `shared.js` file located in the project's root. To add or delete a test go to
the `/admin` page in development mode. You can set there the test's name, chapter, difficulty 
levels and a list of tasks. The list of tasks is provided in JSON format and contains an array of objects, 
each representing an individual test task. These objects have the following interface:
```typescript
{
  task: string, // plain string representing the task
  options: string[], // option A) - first element, option B) - second, and so on
  correct: number, // index of the correct answer
}
```
You can explicitly split the task's text into multiple lines by inserting the `\n` character 
between the intended lines (It does not matter which operating system the app is running on).
