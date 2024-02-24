# Todo List Application

## Overview

This is a simple Todo List application built with React. The application allows users to manage their tasks by adding new todos, marking them as completed, updating existing todos, and deleting todos.

## Features

- **Add Todo**: Users can add new todos by entering a task title and pressing Enter or clicking the "Add" button.

- **Update Todo**: Users can update the title of an existing todo by clicking on it and editing the text. Changes are saved automatically when the user finishes editing.

- **Mark as Completed**: Users can mark a todo as completed by clicking on the checkbox next to the todo title. Completed todos are visually distinguished from active todos.

- **Delete Todo**: Users can delete a todo by clicking on the delete button next to the todo. Once deleted, the todo is permanently removed from the list.

- **Filter Todos**: Users can filter the todo list to show all todos, only active todos, or only completed todos using the filter options.

- **Tracking completed**: Users can track the progress of how many lists are done.

## Technologies Used

- **React**: The project is built using React, a popular JavaScript library for building user interfaces.

- **CSS Modules**: Styling is done using CSS Modules, which allows for scoped styles and better organization of CSS code.

- **React Context API**: The Todo list state is managed using the React Context API, providing a centralized state management solution.

## Development Approach

In creating this project, I paid close attention to every detail, including how the app looks and feels, the way it functions, and how it's built behind the scenes. This involved making sure the code is well-organized and easy to understand, using custom tools when needed, and ensuring the app can grow without issues. I also focused on making it run smoothly and efficiently. Overall, I aimed to follow the best practices in software development to deliver a high-quality product.

## Installation

To run the application locally, follow these steps:

1. Clone the repository to your local machine:

```bash
$ git clone git@github.com:WaiyanPhyoaung/todo-app.git
```

2. Install dependencies:

```bash
$ npm install
```

4. Change env variable with your todo server

```bash
$ VITE_BASE_API_URL=http://localhost:3001
```

5. Start the development server:

```bash
$ npm run dev
```

This will start the development server and open the application in your default web browser.
