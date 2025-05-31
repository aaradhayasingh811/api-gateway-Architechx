const axios = require('axios');
const CircuitBreaker = require('opossum');

// Generic function to make an HTTP request
async function proxyRequest({ method, url, headers, data }) {
  return axios({ method, url, headers, data });
}

// Circuit breaker config
const options = {
  timeout: 5000, // If the request takes longer than 5 seconds, fail
  errorThresholdPercentage: 50, // % of failures before tripping
  resetTimeout: 10000 // After 10s, try again
};

// Create a circuit breaker instance
const breaker = new CircuitBreaker(proxyRequest, options);

// Fallback if service is down
breaker.fallback(() => {
  return { status: 503, data: { error: 'Service temporarily unavailable (Circuit Open)' } };
});

breaker.on('open', () => console.warn('⚠️ Circuit breaker OPEN'));
breaker.on('halfOpen', () => console.info('🟡 Circuit breaker HALF-OPEN'));
breaker.on('close', () => console.info('✅ Circuit breaker CLOSED'));

module.exports = breaker;
