# Voyage Volunteer

## Project Overview

Voyage Volunteer solves several key problems in the volunteer placement process:

- Facilitates easy connection between volunteers and meaningful opportunities.
- Enhances transparency in volunteer placement and management.
- Simplifies the process of finding and applying for volunteer positions.
- Ensures secure and convenient user authentication.
- Promotes community engagement through accessible volunteer opportunities.

Join Voyage Volunteer today and start making a difference!

[Live Site](https://voyage-volunteer.web.app/)
[Server Repo](https://github.com/najim2004/voyage-volunteer-server)

## Features:

- **User Authentication:** Enables secure login via email/password and Google integration, ensuring convenient access.

- **Volunteer Post Management:** Facilitates easy creation, update, and deletion of volunteer posts, with visibility into requests, enhancing organization and control.

- **Search Functionality:** Allows users to search for volunteer posts by title, ensuring easy access to relevant opportunities.

## Packages:

React Router DOM, React Hooks, React Icons, React Datepicker, React Fast-Marquee, React Helmet Async, React Hot Toast, React Tooltip, Lottie React, Swiper JS, Sweet Alert, Axios

## Technology:

React, Tailwind CSS,HTML , CSS, React Router Dom Firebase, Node.js, MongoDB, Express.js, JSON Web Token (JWT)

## Setup and Installation

### Prerequisites

- Node.js (>= 14.x)
- MongoDB Atlas account or local MongoDB instance
- Firebase project setup for authentication

### Environment Variables

Create a `.env` file in the root directory of both the client and server projects with the following variables:

#### Client-side `.env`

```
VITE_APIKEY=<your-firebase-api-key>
VITE_AUTHDOMAIN=<your-firebase-auth-domain>
VITE_PROJECTID=<your-firebase-project-id>
VITE_STORAGEBUCKET=<your-firebase-storage-bucket>
VITE_MESSAGINGSENDERID=<your-firebase-messaging-sender-id>
VITE_APPID=<your-firebase-app-id>
```

#### Server-side `.env`

```
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### Installation

#### Client

```bash
cd client
npm install
npm start
```

#### Server

```bash
cd server
npm install
npm start
```
