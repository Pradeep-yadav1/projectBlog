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

```
medium-like-blog/
├── frontend/         # React application
├── backend/          # Cloudflare Workers code
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
├── scripts/          # Utility scripts
└── README.md         # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medium-like-blog.git
   cd medium-like-blog
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```

4. Set up the PostgreSQL database:
   - Create a new PostgreSQL database.
   - Update the `.env` file in the `backend/` directory with your database connection string.

5. Apply Prisma migrations:
   ```bash
   npx prisma migrate deploy
   ```

6. Start the development server:
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Backend:
     ```bash
     cd ../backend
     npm run dev
     ```

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
```

## Usage

1. Start the frontend and backend servers as described above.
2. Access the application .
3. Create an account, log in, and start writing blog posts!

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Acknowledgments

- [React](https://reactjs.org/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Hono](https://hono.dev/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [JWT](https://jwt.io/)

