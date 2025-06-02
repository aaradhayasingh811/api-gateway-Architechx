# ArchitechX API Gateway

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Gateway](#running-the-gateway)
- [Service Routing](#service-routing)
- [Middlewares](#middlewares)
- [Proxying & Circuit Breaker](#proxying--circuit-breaker)
- [Rate Limiting](#rate-limiting)
- [Health Checks](#health-checks)
- [Logging & Monitoring](#logging--monitoring)
- [Docker & Deployment](#docker--deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **ArchitechX API Gateway** acts as a single entry point for all client requests in a microservices architecture. It handles routing, security, rate limiting, proxying, and monitoring, forwarding requests to backend services such as authentication, user, layout, export, and chatbot services.

---

## Features

- **Centralized Routing:** Directs requests to appropriate microservices based on URL path.
- **Reverse Proxy:** Uses `http-proxy-middleware` for seamless request forwarding.
- **Security:** Integrates `helmet` for HTTP headers and `cors` for cross-origin requests.
- **Rate Limiting:** Prevents abuse with configurable request limits per IP.
- **Circuit Breaker:** Protects backend services from overload and failure cascades.
- **Health Checks:** Provides endpoints for system and service status.
- **Logging:** Uses `morgan` for detailed request logs.
- **Environment Configurable:** All settings via `.env` file.
- **Dockerized:** Ready for containerized deployment.

---

## Architecture

```
Client
  |
  v
API Gateway (This Project)
  |         |         |         |         |
  v         v         v         v         v
Layout   Auth     User     Export    Chatbot
Service  Service  Service  Service   Service
```

- All client requests go through the API Gateway.
- The gateway proxies requests to backend services based on the route prefix.

---

## Directory Structure

```
.
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── index.js
├── package.json
├── Readme.md
└── src
    ├── controllers/
    ├── middlewares/
    │   └── rateLimiter.js
    ├── models/
    ├── routes/
    │   └── proxyRoutes.js
    └── utility/
        ├── circuitBreaker.js
        └── httpProxy.js
```

- **index.js**: Main entry point, sets up Express app and middleware.
- **src/routes/proxyRoutes.js**: Configures proxy routes for each microservice.
- **src/middlewares/rateLimiter.js**: Express middleware for rate limiting.
- **src/utility/circuitBreaker.js**: Circuit breaker logic using `opossum`.
- **src/utility/httpProxy.js**: Helper for proxy middleware setup.

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-org/api-gateway.git
   cd api-gateway
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Copy and configure environment variables:**
   ```sh
   cp .env.example .env
   # Edit .env as needed
   ```

---

## Configuration

All configuration is managed via the `.env` file. Example:

```
PORT=8000
TIMEOUT=30s
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
LAYOUT_SERVICE_URL=http://localhost:3002
AUTH_SERVICE_URL=http://localhost:3000
USER_SERVICE_URL=http://localhost:3001
EXPORT_SERVICE_URL=http://localhost:3005
CHATBOT_SERVICE_URL=http://localhost:3006
NODE_ENV=development
```

- **PORT**: Port for the API Gateway.
- **RATE_LIMIT_WINDOW**: Time window for rate limiting (ms).
- **RATE_LIMIT_MAX**: Max requests per window per IP.
- ***_SERVICE_URL**: URLs for backend services.

---

## Running the Gateway

**Development:**
```sh
npm run dev
```

**Production:**
```sh
npm start
```

The gateway will be available at `http://localhost:8000` (or your configured port).

---

## Service Routing

| Route Prefix | Target Service         | Example Forwarded Path      |
|--------------|-----------------------|-----------------------------|
| `/layout`    | Layout Service        | `/layout/api/v1/...`        |
| `/auth`      | Authentication Service| `/auth/api/v1/...`          |
| `/user`      | User Service          | `/user/api/v1/...`          |
| `/export`    | Export Service        | `/export/api/v1/...`        |
| `/chatbot`   | Chatbot Service       | `/chatbot/api/v1/...`       |

- Requests to `/layout/*` are proxied to the Layout Service, etc.
- Path rewriting strips the prefix and adds `/api/v1`.

---

## Middlewares

- **Helmet:** Sets secure HTTP headers.
- **CORS:** Allows cross-origin requests from `http://localhost:5173` (configurable).
- **Morgan:** Logs all incoming requests.
- **Rate Limiter:** Limits requests per IP to prevent abuse (currently commented out, enable as needed).

---

## Proxying & Circuit Breaker

- **Proxy:** Uses [`http-proxy-middleware`](https://www.npmjs.com/package/http-proxy-middleware) for forwarding.
- **Circuit Breaker:** [`opossum`](https://www.npmjs.com/package/opossum) protects backend services. If a service fails repeatedly, the circuit opens and returns a 503 error until the service recovers.

---

## Rate Limiting

- Configured in [`src/middlewares/rateLimiter.js`](src/middlewares/rateLimiter.js).
- Default: 100 requests per 15 minutes per IP.
- Customizable via `.env`.
- To enable, uncomment the relevant line in `index.js`.

---

## Health Checks

- `GET /health`: Returns `{ status: 'API Gateway is running' }`.
- Extendable for detailed health checks of downstream services.

---

## Logging & Monitoring

- All requests are logged with method, path, status, and response time.
- Proxy errors and circuit breaker events are logged to the console.

---

## Docker & Deployment

**Build and run with Docker Compose:**
```sh
docker-compose up --build
```

- The gateway and all mock backend services will start.
- Ports are mapped as per `docker-compose.yml`.

**Dockerfile** is provided for standalone builds.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request.

---

## License

This project is licensed under the [ISC License](LICENSE).

---

## Contact

For questions or support, please open an issue or contact the maintainer.

---