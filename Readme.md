# API Gateway Service of ArchitechX

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![License](https://img.shields.io/badge/License-MIT-blue)

## Table of Contents
- [Features](#features)
- [Service Routes](#service-routes)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Contributing](#contributing)
- [License](#license)

## Features

✨ **Request Routing**: Intelligent routing to backend services  
🔒 **Security**: Helmet.js for security headers + CORS protection  
⏱ **Rate Limiting**: Protection against brute force attacks  
💓 **Health Checks**: System monitoring endpoints  
📊 **Logging**: Detailed request logging with timestamps  
⚙️ **Configurable**: Environment variable support  


### 🛠 Tech Stack

| Technology                | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| **Node.js**               | Runtime environment                         |
| **Express.js**            | Server framework for routing and middleware |
| **http-proxy-middleware** | Reverse proxy implementation                |
| **dotenv**                | Manage environment variables                |
| **JavaScript**            | Core programming language                   |
| **REST**                  | Communication between gateway and services  |

---

### Description

- **src/middlewares/rateLimiter.js**: Contains Express middleware to limit request rates globally or per route.
- **src/utils/circuitBreaker.js**: Implements circuit breaker logic to protect downstream services.
- **src/proxy-server.js**: The main API Gateway Express app that proxies requests to microservices.
- **.env**: Holds environment variables like service URLs and port settings.
- **Dockerfile**: Container setup for the API Gateway.
- **docker-compose.yml**: Defines and runs multi-container Docker applications, including API Gateway and backend services.

---

## Service Routes

| Route       | Target Service         | Base Path  |
|-------------|------------------------|------------|
| `/layout`   | Layout Service         | `/api/v1`  |
| `/auth`     | Authentication Service | `/api/v1`  |
| `/user`     | User Service           | `/api/v1`  |
| `/export`   | Export Service         | `/api/v1`  |


--- 

## Installation

```bash
# Clone repository
git clone https://github.com/your-org/api-gateway.git
cd api-gateway

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start server
npm start

# For development
npm run dev

```
---

### Configuration

#### Edit the .env file:

* PORT=8000
* TIMEOUT=30s
* RATE_LIMIT_WINDOW=900000  # 15 minutes
* RATE_LIMIT_MAX=100
* LAYOUT_SERVICE=http://localhost:3002
* AUTH_SERVICE=http://localhost:3000
* USER_SERVICE=http://localhost:3001
* EXPORT_SERVICE=http://localhost:3004
* NODE_ENV=development


---

### API Endpoints

#### Health Checks

* GET /health - Basic health status

* GET /health/details - Detailed service status

#### Service Access
* All services follow the pattern:
- /{service-name}/api/v1/{endpoint}

*Example:
- /layout/api/v1/create-layout

### Dependencies

```bash
"dependencies": {
  "express": "^4.x",
  "http-proxy-middleware": "^2.x",
  "helmet": "^7.x",
  "morgan": "^1.x",
  "express-rate-limit": "^6.x",
  "cors": "^2.x",
  "dotenv": "^16.x"
}
```

### Monitoring
#### 📋 Logs Include:

* All incoming requests

* Proxy routing details

* Error traces with timestamps

---

### Contributing

* Fork the repository

* Create your feature branch (git checkout -b feature/awesome-feature)

* Commit your changes (git commit -am 'Add awesome feature')

* Push to the branch (git push origin feature/awesome-feature)

* Open a Pull Request

---

