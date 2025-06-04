const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimiter = require('./src/middlewares/rateLimiter');
const setupProxies = require('./src/routes/proxyRoutes');
dotenv.config();

const app = express();

// Middleware
app.use(helmet());

app.use(cors({
  origin: 'https://architechx.netlify.app',
  credentials: true,
}))
app.use(morgan('dev'));
// app.use(rateLimiter);

// Proxy Routes
setupProxies(app);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running' });
});

// Global Error Handling
app.use((err, req, res, next) => {
  console.error('Gateway Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`\n🚀 API Gateway running at http://localhost:${PORT}`);
  console.log('📡 Available routes:');
  console.log('- /layout  → Layout Service');
  console.log('- /auth    → Auth Service');
  console.log('- /user    → User Service');
  console.log('- /export  → Export Service');
  console.log('- /chatbot  → Chatbot Service');
  console.log('- /health  → Health check\n');
});
