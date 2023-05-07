

# Blogging Site

This is a simple blogging site built with the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to create and publish blog posts, and to view posts created by other users. The site includes user authentication and authorization, so users must register and log in to create or edit posts.


## Usage

To use the blogging site, you must register for an account or log in if you already have one. Once you are logged in, you can create a new blog post by clicking the "New Post" button on the home page. You can edit or delete your own posts by clicking the corresponding buttons on the post page.

## Built With

* MongoDB - Database
* Express.js - Server framework
* React - Front-end library
* Node.js - Server runtime
* bcrypt - Password hashing
* jsonwebtoken - User authentication and authorization


## Features

- User authentication using JSON Web Tokens (JWT)
- CRUD operations for blog posts.

## Deployment

This website is deployed on two different platforms:

- Backend: Render ( https://blogosphere-backend.onrender.com )
- Frontend: Netlify ( https://spiffy-chebakia-5f9a8c.netlify.app )

To view the live website, simply visit the frontend deployment link above.

## Installation

To run this website locally, follow these steps:

1. Clone the repository to your local machine
2. Navigate to the project directory and run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and add the required environment variables (e.g. database connection string, JWT secret)
4. Run `npm run start` to start the server and client simultaneously








