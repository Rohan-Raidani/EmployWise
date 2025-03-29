# EmployWise

# User Management App

This is a **React-based user management application** that allows users to log in, view, edit, delete, and search for users from a list fetched from a RESTful API. It supports pagination for easier navigation through large sets of users. The application also includes a notification system for success and error messages and ensures that only authenticated users can access the main functionality.

## Features

- **Login:** Users can log in using email and password.
- **User List:** Displays a list of users with options to edit or delete them.
- **Search:** Allows searching for users based on their first and last names.
- **Pagination:** Supports navigation through multiple pages of users.
- **Notifications:** Success and error notifications are displayed in a fixed position.
- **Protected Routes:** Ensures the Home page is only accessible after login.

## Technologies Used

- React
- React Router
- Axios (for making HTTP requests)
- Tailwind CSS (for styling)
- Lucide Icons (for iconography)

## Hosted Application

You can view the live application here:

[**User Management App**](https://employ-wisee.vercel.app/)  
(Replace this with the actual hosted URL once the app is deployed.)

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v16+)
- **npm** (v7+)

### 1. Clone the repository

```bash
git clone https://github.com/Rohan-Raidani/EmployWise.git
cd EmployWise
```

### 2. Download the dependencies

```bash
npm i
```

### 4. Create a .env file in same folder as index.html and add the api there with /api at the back

```bash
API_UTL = "<YOUR_API>/api"
```

### 4. Run the command to see output on localhost

```bash
npm run dev
```
