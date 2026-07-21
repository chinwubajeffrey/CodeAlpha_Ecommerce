# CodeAlpha E-Commerce Application Documentation

## Overview

This is a full-stack e-commerce application built with React (frontend) and Node.js/Express (backend) with PostgreSQL database using Prisma ORM. The application allows users to browse products, add items to a shopping cart, and place orders.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Architecture Overview](#architecture-overview)
3. [Frontend Structure](#frontend-structure)
4. [Backend Structure](#backend-structure)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [State Management](#state-management)
8. [Authentication System](#authentication-system)
9. [Shopping Cart Functionality](#shopping-cart-functionality)
10. [Installation and Setup](#installation-and-setup)
11. [Deployment Information](#deployment-information)

## Technology Stack

### Frontend

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Middleware**: CORS, Express JSON parser
- **Development**: Nodemon for auto-restart

## Architecture Overview

The application follows a client-server architecture:

```
Frontend (React) <--HTTP/JSON--> Backend (Express/Node.js) <--SQL--> PostgreSQL
```

### Key Components:

1. **Client** (`/client`): React application handling UI and user interactions
2. **Server** (`/server`): Express API handling business logic and data persistence
3. **Database** (PostgreSQL): Stores users, products, carts, and orders
4. **Prisma ORM**: Type-safe database client for Node.js and TypeScript

## Frontend Structure

```
client/
├── public/
├── src/
│   ├── api/              # Axios instance configuration
│   ├── assets/           # Static assets (images, etc.)
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── store/            # Zustand state management stores
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
```

### Key Frontend Components:

#### State Management (Zustand)

- **authStore.js**: Manages user authentication state (token, user data)
- **cartStore.js**: Manages shopping cart state (items, quantities, totals)

#### Pages

- **Login.jsx**: User authentication page
- **Register.jsx**: User registration page
- **Products.jsx**: Product listing page with search and filtering
- **ProductDetail.jsx**: Individual product details page
- **Cart.jsx**: Shopping cart view and management
- **Orders.jsx**: User order history

#### Components

- **NavBar.js**: Navigation bar with auth state awareness
- **ProductCard.jsx**: Reusable product display card

## Backend Structure

```
server/
├── src/
│   ├── lib/              # Prisma client initialization
│   ├── middleware/       # Custom Express middleware
│   │   └── auth.js       # JWT authentication middleware
│   ├── routes/           # API route handlers
│   │   ├── auth.js       # Authentication endpoints
│   │   ├── products.js   # Product management endpoints
│   │   ├── cart.js       # Shopping cart endpoints
│   │   └── orders.js     # Order management endpoints
│   └── index.js          # Express app entry point
├── prisma/
│   ├── schema.prisma     # Prisma database schema
│   └── seed.js           # Database seed data
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── server.js             # Server entry point
```

### Key Backend Components:

#### Middleware

- **auth.js**: Verifies JWT tokens and attaches user info to request object

#### Routes

- **auth.js**: Handles user registration and login
- **products.js**: CRUD operations for products (public read, protected write)
- **cart.js**: Cart management (add, remove, update items)
- **orders.js**: Order creation and retrieval

## Database Schema

The application uses Prisma ORM with PostgreSQL. The schema includes:

### Models:

1. **User**: id, name, email, password, role, createdAt
2. **Product**: id, name, description, price, image, stock, category, createdAt
3. **CartItem**: id, quantity, userId, productId (unique constraint on userId+productId)
4. **Order**: id, status, total, createdAt, userId
5. **OrderItem**: id, quantity, price, orderId, productId

### Relationships:

- User has many Orders and CartItems
- Product has many CartItems and OrderItems
- Order has many OrderItems
- CartItem belongs to User and Product
- OrderItem belongs to Order and Product

## API Endpoints

### Authentication Routes

**Base Path**: `/api/auth`

| Method | Endpoint    | Description         | Auth Required |
| ------ | ----------- | ------------------- | ------------- |
| POST   | `/register` | Register a new user | No            |
| POST   | `/login`    | Login user          | No            |

### Product Routes

**Base Path**: `/api`

| Method | Endpoint        | Description          | Auth Required |
| ------ | --------------- | -------------------- | ------------- |
| GET    | `/products`     | Get all products     | No            |
| GET    | `/products/:id` | Get a single product | No            |
| POST   | `/products`     | Create a new product | Yes           |
| PUT    | `/products/:id` | Update a product     | Yes           |
| DELETE | `/products/:id` | Delete a product     | Yes           |

### Cart Routes

**Base Path**: `/api`

| Method | Endpoint        | Description           | Auth Required |
| ------ | --------------- | --------------------- | ------------- |
| GET    | `/cart`         | Get user's cart items | Yes           |
| POST   | `/cart`         | Add item to cart      | Yes           |
| DELETE | `/cart/:itemId` | Remove item from cart | Yes           |

### Order Routes

**Base Path**: `/api`

| Method | Endpoint      | Description          | Auth Required |
| ------ | ------------- | -------------------- | ------------- |
| GET    | `/orders`     | Get user's orders    | Yes           |
| GET    | `/orders/:id` | Get a specific order | Yes           |
| POST   | `/orders`     | Create a new order   | Yes           |

## State Management

The application uses Zustand for state management:

### Auth Store (`src/store/authStore.js`)

- Stores user authentication token and user data
- Provides login and logout functions
- Persists state in localStorage

### Cart Store (`src/store/cartStore.js`)

- Manages cart items array
- Handles loading states
- Provides methods to:
  - Fetch cart from server
  - Add items to cart
  - Update item quantities
  - Remove items from cart
  - Clear cart
  - Calculate item count and total price

## Authentication System

The application uses JWT (JSON Web Tokens) for authentication:

1. **Login**: User submits credentials → Server validates → Returns JWT token
2. **Token Storage**: Token stored in localStorage and auth store
3. **Protected Routes**: Frontend uses ProtectedRoute component to check auth
4. **API Requests**: Axios interceptor automatically adds token to Authorization header
5. **Backend Verification**: Express middleware verifies token on protected routes

### Token Verification:

- Token is extracted from `Authorization: Bearer <token>` header
- Verified using `jsonwebtoken.verify()` with ACCESS_SECRET
- On success, user payload is attached to `req.user`
- On failure, returns 401 Unauthorized

## Shopping Cart Functionality

The shopping cart implements the following features:

1. **Adding Items**: Users can add products to cart with quantity selection
2. **Updating Quantities**: Users can modify item quantities in cart
3. **Removing Items**: Users can remove items from cart
4. **Persistence**: Cart data is stored in database and associated with user
5. **Calculations**: Automatic calculation of item counts and total prices
6. **Persistence Across Sessions**: Cart data persists via user account

### Cart Operations:

- **Add Item**: POST to `/api/cart` with productId and quantity
- **Update Item**: PATCH to `/api/cart/:itemId` with quantity
- **Remove Item**: DELETE to `/api/cart/:itemId`
- **Get Cart**: GET to `/api/cart` returns user's cart items

## Installation and Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL database

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` or create new `.env` file
   - Add required variables:
     ```
     DATABASE_URL="your_postgresql_connection_string"
     ACCESS_SECRET="your_jwt_secret_key"
     ```
4. Set up database:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Seed database (optional):
   ```bash
   npx prisma db seed
   ```
6. Start development server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:5173`

### Environment Variables

#### Backend (.env)

- `DATABASE_URL`: PostgreSQL connection string
- `ACCESS_SECRET`: Secret key for JWT token signing

#### Frontend

- No additional environment variables required for basic operation
- API URL is hardcoded in `src/api/axios.js` pointing to production deployment

## Deployment Information

### Backend Deployment

- Deployed to Render.com
- Environment variables configured in Render dashboard
- Uses PostgreSQL database provided by Render
- Build command: `npm install`
- Start command: `npm start`

### Frontend Deployment

- Deployed to Vercel
- Configured to build from the client directory
- Build command: `npm run build`
- Output directory: `dist`
- Configured to proxy API requests to backend (handled via CORS)

### CORS Configuration

The backend is configured to accept requests from:

- `https://cake-ecommerce-pi.vercel.app` (production frontend)
- With credentials enabled for cookie/session support

## Key Features

1. **User Authentication**: Secure registration and login with JWT
2. **Product Browsing**: Browse products with search and filtering
3. **Product Details**: View detailed product information
4. **Shopping Cart**: Add, update, remove items; view cart totals
5. **Order Management**: Place orders and view order history
6. **Responsive Design**: Mobile-friendly interface
7. **Protected Routes**: Cart and order pages require authentication
8. **Role-Based Access**: Admin users can manage products (inferred from role field)

## Code Quality and Standards

### Frontend

- Functional React components with hooks
- Consistent Tailwind CSS styling
- Modular component structure
- Centralized state management with Zustand
- Proper error handling in API calls

### Backend

- RESTful API design
- Modular route organization
- Prisma ORM for type-safe database operations
- JWT-based authentication
- Proper error handling with try/catch blocks
- Environment variable configuration
- CORS configuration for security

## Potential Improvements

1. **Input Validation**: Add more robust input validation using libraries like Joi or express-validator
2. **Testing**: Implement unit and integration tests
3. **Pagination**: Add pagination to product listings for large datasets
4. **Search Enhancement**: Improve search functionality with debouncing and filtering
5. **Payment Integration**: Add payment processing functionality
6. **Admin Dashboard**: Create dedicated admin interface for product management
7. **Email Notifications**: Add email confirmation for orders and registrations
8. **Reviews/Ratings**: Add product review and rating system
9. **Wishlist Functionality**: Allow users to save products for later
10. **Order Tracking**: Add order status tracking capabilities

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL in .env file
   - Ensure PostgreSQL service is running
   - Run `npx prisma migrate dev` to apply migrations

2. **Authentication Failures**
   - Check ACCESS_SECRET in .env matches between frontend and backend
   - Verify token is being sent in Authorization header
   - Ensure token hasn't expired (7-day expiry)

3. **CORS Issues**
   - Verify frontend URL is correctly configured in backend CORS settings
   - Ensure credentials flag is set correctly

4. **API Connection Errors**
   - Check that backend is running and accessible
   - Verify API base URL in `src/api/axios.js`
   - Check network connectivity and firewall settings

## License

This project is proprietary and part of the CodeAlpha e-commerce initiative.

## Contact

For questions or support, please contact the development team.
