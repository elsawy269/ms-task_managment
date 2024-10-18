const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();

// Create a counter metric
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path'],
});

// Register the counter
register.registerMetric(requestCounter);

// Middleware to count requests



module.exports = (app) => {

  app.use((req, _res, next) => {
    requestCounter.inc({ method: req.method, path: req.path });
    next();
  });

  // Expose metrics endpoint
  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

};
