# Portfolio Backend API

Express.js backend with MongoDB for the Portfolio CMS.

## Features

- 🔐 JWT Authentication
- 📝 Content Management API
- 📤 File Upload Support (Videos & Images)
- 🔒 Rate Limiting & Security Headers
- 🐳 Docker Support

## Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start the server:**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | Secret for JWT tokens | - |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `ADMIN_EMAIL` | Initial admin email | `admin@example.com` |
| `ADMIN_PASSWORD` | Initial admin password | `changethispassword` |
| `NODE_ENV` | Environment mode | `development` |

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |
| PUT | `/api/auth/password` | Change password (protected) |

### Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/content` | Get all content (public) |
| PUT | `/api/content` | Update all content (protected) |
| PUT | `/api/content/:section` | Update specific section (protected) |
| POST | `/api/content/projects` | Add project (protected) |
| PUT | `/api/content/projects/:id` | Update project (protected) |
| DELETE | `/api/content/projects/:id` | Delete project (protected) |
| POST | `/api/content/articles` | Add article (protected) |
| DELETE | `/api/content/articles/:id` | Delete article (protected) |

### Uploads

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload file (protected) |
| GET | `/api/upload` | List uploads (protected) |
| DELETE | `/api/upload/:id` | Delete upload (protected) |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## Docker Deployment

### Using Docker Compose (Recommended)

From the project root:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
cd server
docker build -t portfolio-backend .
docker run -p 5000:5000 --env-file .env portfolio-backend
```

## MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP address (or 0.0.0.0/0 for all)
4. Get your connection string and update `MONGODB_URI`

## Deployment Options

### Render.com (Free Tier)

1. Create a new Web Service
2. Connect your GitHub repo
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables

### Railway.app

1. Create new project
2. Add MongoDB and Web Service
3. Connect GitHub repo
4. Auto-detects Node.js

### DigitalOcean App Platform

1. Create new App
2. Select GitHub repo
3. Configure as Web Service
4. Add MongoDB database
5. Deploy

## Frontend Configuration

To connect your React frontend to the API:

1. Create `.env` in the React project root:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

2. For production, update with your deployed API URL:
   ```
   REACT_APP_API_URL=https://your-api.render.com/api
   ```

## Security Notes

- Always use HTTPS in production
- Change default admin credentials
- Use a strong JWT_SECRET (min 32 characters)
- Configure CORS properly for your domain
- Keep dependencies updated

## License

MIT
