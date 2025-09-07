## JobHub

JobHub is a full-stack job portal application designed to connect job seekers with potential employers. It allows users to browse job listings, apply for positions, and manage their profiles seamlessly.

## 🛠️ Tech Stack

Frontend: React.js, HTML5, CSS3, JavaScript

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Deployment: Heroku (Frontend), MongoDB Atlas (Backend)

## 🚀 Features

User Authentication: Secure login and registration using JWT.

Job Listings: Browse and filter job postings by category, location, and company.

Profile Management: Users can create and update their profiles with personal and professional information.

Job Applications: Apply for jobs directly through the platform and track application status.

Admin Dashboard: Admins can post new jobs, manage existing listings, and view applicant details.

Detailed view of a selected job posting.

## ⚙️ Installation
Prerequisites

Node.js and npm installed on your machine.

MongoDB Atlas account for database hosting.

Frontend Setup

Clone the repository:

git clone https://github.com/LayavardhanReddy024/JobHub.git
cd JobHub/frontend


Install dependencies:

npm install


Start the development server:

npm start

Backend Setup

Navigate to the backend directory:

cd ../backend


Install dependencies:

npm install


Set up environment variables:

Create a .env file in the backend directory.

Add the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


# Start the server:

npm start

## 📄 API Documentation

POST /api/auth/register: Register a new user.

POST /api/auth/login: Authenticate and obtain a JWT token.

GET /api/jobs: Retrieve all job listings.

GET /api/jobs/:id: Get details of a specific job posting.

POST /api/jobs: Create a new job listing (Admin only).

PUT /api/jobs/:id: Update an existing job listing (Admin only).

DELETE /api/jobs/:id: Delete a job listing (Admin only).

## 🧪 Testing

Unit tests are written using Jest and can be found in the tests directory.

To run tests:

npm test

## 📦 Deployment

Frontend: Deployed on Heroku. Access the live application at https://jobhub-frontend.herokuapp.com
.

Backend: Deployed on Heroku. API endpoint available at https://jobhub-backend.herokuapp.com/api
.

## 📌 Future Enhancements

Implement real-time chat between job seekers and employers.

Add job recommendation algorithms based on user profiles.

Integrate with LinkedIn for profile import and job applications.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.
