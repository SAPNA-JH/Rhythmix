#  Music Recommendation System – Backend API

This project is a RESTful backend API for a music recommendation system built using **Node.js**, **Express**, and **PostgreSQL**.
It includes secure user authentication using **JWT** and **bcrypt**, along with song recommendation and search functionalities.

## Features
- User registration & login with JWT authentication
- Secure password hashing using bcrypt
- Fetch all songs
- Rule-based song recommendations (genre, mood, artist)
- Search songs by title, artist, or genre
- Track song play counts
- PostgreSQL database integration

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt

## Authentication Flow
- Passwords are hashed before storing in the database
- JWT token is generated on successful login
- Token is used to protect secured routes

