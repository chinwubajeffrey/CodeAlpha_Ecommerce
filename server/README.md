# E-commerce Server

This is the backend server for the e-commerce application. It provides RESTful APIs for authentication, product management, ordering, and cart functionality.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Other Dependencies**: 
  - bcryptjs (for password hashing)
  - cors (for Cross-Origin Resource Sharing)
  - dotenv (for environment variables)
  - nodemon (development dependency for auto-restart)

## Setup Instructions

1. **Clone the repository** (if you haven't already)
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Copy `.env.example` to `.env` (if it exists) or create a new `.env` file
   - Add the following variables:
     ```
     DATABASE_URL="your_postgresql_connection_string"
     ACCESS_SECRET="your_jwt_secret_key"
     ```
5. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```
   (This will run the migration and seed the database if a seed file exists)
6. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000` by default.

To run in production:
```bash
npm start
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `ACCESS_SECRET`: Secret key for signing JWT tokens

## API Endpoints

### Authentication Routes
**Base Path**: `/api/auth`

| Method | Endpoint       | Description               | Auth Required |
|--------|----------------|---------------------------|---------------|
| POST   | `/register`    | Register a new user       | No            |
| POST   | `/login`       | Login user                | No            |

### Product Routes
**Base Path**: `/api`

| Method | Endpoint          | Description               | Auth Required |
|--------|-------------------|---------------------------|---------------|
| GET    | `/products`       | Get all products          | No            |
| GET    | `/products/:id`   | Get a single product      | No            |
| POST   | `/products`       | Create a new product      | Yes (protected)|
| PUT    | `/products/:id`   | Update a product          | Yes (protected)|
| DELETE | `/products/:id`   | Delete a product          | Yes (protected)|

### Cart Routes
**Base Path**: `/api`

| Method | Endpoint          | Description               | Auth Required |
|--------|-------------------|---------------------------|---------------|
| GET    | `/cart`           | Get user's cart items     | Yes           |
| POST   | `/cart`           | Add item to cart          | Yes           |
| DELETE | `/cart/:itemId`   | Remove item from cart     | Yes           |

### Order Routes
**Base Path**: `/api`

| Method | Endpoint          | Description               | Auth Required |
|--------|-------------------|---------------------------|---------------|
| GET    | `/orders`         | Get user's orders         | Yes           |
| GET    | `/orders/:id`     | Get a specific order      | Yes           |
| POST   | `/orders`         | Create a new order        | Yes           |

*Note: The exact routes for products, cart, and orders are mounted under `/api` as seen in `src/index.js`.*

## Middleware

- **CORS**: Configured to allow requests from `https://cake-ecommerce-pi.vercel.app` with credentials.
- **JSON Body Parser**: Built-in Express middleware for parsing JSON request bodies.
- **Authentication**: Custom `protect` middleware verifies JWT token from `Authorization` header and attaches user payload to `req.user`.

## Database Schema (Prisma)

The Prisma schema defines the following models:

- **User**: id, name, email, password, role, createdAt, relations to Order and CartItem
- **Product**: id, name, description, price, image, stock, category, createdAt, relations to CartItem and OrderItem
- **CartItem**: id, quantity, relations to User and Product (with unique constraint on userId+productId)
- **Order**: id, status, total, createdAt, relations to User and OrderItem
- **OrderItem**: id, quantity, price, relations to Order and Product

## Notes

- There are duplicate lines in `src/index.js` for ProductRouter mounting (lines 19 and 20). One of them is redundant.
- The server uses Prisma ORM with a PostgreSQL database.
- JWT authentication is implemented; protected routes require a valid token in the Authorization header.

## Development

- The server uses `nodemon` for automatic restart during development.
- Prisma is used for database interactions; run `npx prisma generate` after schema changes.
- Seeds can be run with `npx prisma db seed`.

## Deployment

The server is configured to work with frontend hosted on Vercel (as seen in CORS origin). For deployment, ensure environment variables are set appropriately in your hosting platform.
