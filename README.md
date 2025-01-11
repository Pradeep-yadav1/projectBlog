# Medium-Like Blog Website

A fully-featured Medium-like blog platform built with modern web development tools. The project provides a seamless experience for creating, reading, updating, and deleting blog posts. It includes user authentication, input validation, and scalable backend architecture.

## Features

- **Frontend**: Responsive user interface built with React.
- **Backend**: Serverless backend powered by Cloudflare Workers and the Hono framework.
- **Database**: PostgreSQL database for reliable data storage.
- **ORM**: Prisma for database management and queries.
- **Authentication**: JSON Web Tokens (JWT) for secure user authentication.
- **Validation**: Zod for schema validation.
- **Programming Language**: TypeScript for type-safe development.

## Tech Stack

| Technology        | Purpose                        |
|-------------------|--------------------------------|
| **React**         | Frontend framework            |
| **Cloudflare Workers** | Serverless backend architecture |
| **Hono**          | Lightweight web framework     |
| **PostgreSQL**    | Database                      |
| **Prisma**        | ORM for database operations   |
| **Zod**           | Schema validation library     |
| **JWT**           | Authentication mechanism      |
| **TypeScript**    | Language for type safety      |

## Project Structure


medium-like-blog/ ├── frontend/ # React application ├── backend/ # Cloudflare Workers code ├── prisma/ # Prisma schema and migrations ├── public/ # Static assets ├── scripts/ # Utility scripts └── README.md # Project documentation

bash
Copy code

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medium-like-blog.git
   cd medium-like-blog
Install dependencies for the frontend:

bash
Copy code
cd frontend
npm install
Install dependencies for the backend:

bash
Copy code
cd ../backend
npm install
Set up the PostgreSQL database:

Create a new PostgreSQL database.
Update the .env file in the backend/ directory with your database connection string.
Apply Prisma migrations:

bash
Copy code
npx prisma migrate deploy
Start the development server:

Frontend:
bash
Copy code
cd frontend
npm start
Backend:
bash
Copy code
cd ../backend
npm run dev
Environment Variables
Create a .env file in the backend/ directory with the following variables:

makefile
Copy code
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
Usage
Start the frontend and backend servers as described above.
Access the application at http://localhost:3000.
Create an account, log in, and start writing blog posts!
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch:
bash
Copy code
git checkout -b feature-name
Commit your changes:
bash
Copy code
git commit -m "Add some feature"
Push to the branch:
bash
Copy code
git push origin feature-name
Open a pull request.
#Acknowledgments
-React
-Cloudflare Workers
-Hono
-Prisma
-PostgreSQL
-Zod
-JWT