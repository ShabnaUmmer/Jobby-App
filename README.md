# Jobby App — Job Portal Application

A modern, responsive job portal built with **React.js** that lets users search, filter, and apply for jobs with a smooth and intuitive experience.

---

## Features

- **User Authentication** — Register and login with JWT-based auth
- **Job Search** — Search by title, company, skills, or location
- **Advanced Filters** — Filter by employment type, salary range, and experience level
- **Sort Options** — Sort by relevance, salary (high/low), rating, recency, or experience
- **Job Details** — View full job info: requirements, skills, and company details
- **Similar Jobs** — Recommendations based on current job
- **User Profile** — Avatar with name initial, email, and persistent session
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Smooth Animations** — Framer Motion transitions and hover effects

---

## Tech Stack

| Technology           | Purpose                   |
|----------------------|---------------------------|
| React.js             | Frontend framework        |
| React Router DOM     | Navigation & routing      |
| Framer Motion        | Animations & transitions  |
| React Icons          | Icon library              |
| React Loader Spinner | Loading indicators        |
| Local Storage        | User data persistence     |

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
```
   npm install
```

2. **Start the development server**
```
   npm start
```

3. **Open in browser**

---

## Usage Guide

### Register
1. Click **"Register here"** on the login page
2. Enter your username, email, and password
3. Click **Register** — you'll be redirected to the login page

### Login
1. Enter your registered username and password
2. Click **Login** — you'll be redirected to the home page

### Search & Filter Jobs
1. Navigate to the **Jobs** page
2. Use the search bar to find jobs by title, company, or skills
3. Apply filters from the sidebar:
   - Employment Type (Full Time, Part Time, Freelance, Internship)
   - Salary Range
   - Experience Level
4. Sort results using the dropdown menu
5. Click any job card to view full details

---

## Authentication

JWT-based authentication with localStorage persistence:

- User credentials are stored in the browser's `localStorage`
- Protected routes require a valid JWT token
- Session persists until the user logs out

---

## Local Database

The app ships with **100+ job listings** including:

- Job titles: Frontend Developer, Backend Developer, and more
- Companies: Google, Amazon, Microsoft, and others
- Locations across India
- Salary packages, required skills, experience levels, and descriptions

---

## Available Scripts

| Command         | Description                      |
|-----------------|----------------------------------|
| `npm start`     | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test`      | Launches the test runner |
| `npm run eject` | Ejects from Create React App |

---

## License

This project is for **educational purposes** only.

---

## Developer

Built as part of a **React.js learning journey**.
