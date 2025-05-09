# EmployWise User Management App

![App Screenshot](![image](https://github.com/user-attachments/assets/624409fe-d0d8-4f8d-8be0-34ce30cdc63e)
)

A React application that integrates with the Regres API to perform user management functions with authentication, user listing, and CRUD operations.

## Features

### Level 1: Authentication Screen
- Login with email and password
- Uses Regres API endpoint: `POST /api/login`
- Pre-filled demo credentials: 
  - Email: `eve.holt@reqres.in`
  - Password: `cityslicka`
- JWT token storage in localStorage
- Redirect to Users List on successful login

### Level 2: List All Users
- Paginated user listing
- Fetches data from: `GET /api/users?page=1`
- Displays user details (avatar, first name, last name)
- Dual view modes:
  - **Table View**: With pagination
  - **Card View**: With lazy loading
- Responsive design for all screen sizes

### Level 3: Edit, Delete, and Update Users
- Edit user details:
  - Pre-filled form with user data
  - Updates via `PUT /api/users/{id}`
- Delete users:
  - Confirmation dialog
  - Deletes via `DELETE /api/users/{id}`
- Real-time UI updates with notifications

## Bonus Features
- Client-side search and filtering
- React Router for navigation
- Responsive design (mobile-friendly)
- Beautiful UI with Material-UI
- Error handling and form validation
- Loading states for API calls

## Technologies Used
- React 18
- Vite (Build Tool)
- Material-UI (MUI)
- React Router
- Axios (HTTP Client)
- Context API (State Management)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GANESHSHARMA1/EmployWise
   cd employwise-app
   npm install
  bash```
