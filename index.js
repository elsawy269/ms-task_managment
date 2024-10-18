require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/Database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes')
const limiter = require('./Config/rateLimit');
const setupSwagger = require('./Config/swaggerConfig');
const setupMonitoring = require('./Config/monitoring');
const logger = require('./Config/logger'); 

const app = express();

setupSwagger(app);
setupMonitoring(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

// Apply rate limiter to all requests
app.use(limiter);
// Use User Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


app.use((err, req, res, next) => {
  
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// server start

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


