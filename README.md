# Workout Tracker Frontend

This repository contains the Angular frontend for the Workout Tracker project. The application lets users browse exercises, manage a personal exercise list, and log workout progress over time.

## Project Overview

The frontend is built with Angular 20 and communicates with a backend API running locally. It includes:

- a landing page with a short product introduction
- user registration and login
- a simple dashboard for logged-in users
- exercise browsing with name and category filters
- adding custom exercises
- saving exercises to a personal list
- progress log management for individual exercises

## Tech Stack

- Angular 20
- TypeScript
- RxJS
- Bootstrap 5

## Prerequisites

Before starting the frontend, make sure you have:

- Node.js and npm installed
- the Workout Tracker backend API running locally

The frontend is configured to call the backend at:

```text
http://localhost:8000/api/
```

If your backend runs on a different URL or port, update the API base URL in `src/environments/environments.ts`.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

After the app starts, open:

```text
http://localhost:4200/
```

## Available Scripts

Run the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

Run the development build watcher:

```bash
npm run watch
```

## Main Pages

- `/` or `/home`: landing page
- `/user`: login, registration, and user dashboard
- `/exercise`: exercise list and personal exercise management
- `/aboutexercise/:id`: progress log details for a selected exercise

## Notes

- Some features require authentication.
- Authentication state is stored in the browser using `localStorage`.
- The frontend expects the backend to provide the required exercise, category, user, and progress log endpoints.
