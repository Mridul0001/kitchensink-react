# JBoss Migration Demo - React Frontend

## Project Overview

This is a **React** frontend for the JBoss Migration Demo project. It contains:
- A login form using **JWT** for authentication.
- A member management interface to add, edit, delete, and view members after authentication.
- API calls to the **Spring Boot** backend for member-related operations.

## Prerequisites

- Node.js (v14+)
- npm (v6+)

## Project Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Mridul0001/kitchensink-react-service.git
    ```

2. Navigate to the project directory:
    ```bash
    cd kitchensink-react-service
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Running the App

To start the React application locally, run:

```bash
npm start 
```

The app will be accessible at http://localhost:3000

## Application Structure

- **Login Page**: A login form with username and password fields. On successful login, the user is redirected to the member management page.
- **Members** Page: Contains a form to add/edit members and a table displaying existing members with actions to edit and delete them.
    - **Edit**: Populates the form with member details for editing.
    - **Delete**: Removes the member from the list.

## Styling and Libraries
- **Material UI**: Used for form components and layout.
- **Axios**: Used for making HTTP requests to the backend API.
- **React Router**: Manages the routing between ```/login``` and ```/members```.

## Routes
- **Login Route**: ```/login``` (POST) - Authenticates the user and returns a JWT token.
- **Members Route**: ```/members``` (GET, POST, PUT, DELETE) - Manages member data.