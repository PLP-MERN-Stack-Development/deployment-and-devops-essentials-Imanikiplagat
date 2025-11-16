// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./src/routes/auth');
const accountRoutes = require('./src/routes/account');
const transactionRoutes = require('./src/routes/transaction');

const app = express();

// ---------------------------
// 🔧 MIDDLEWARE
// ---------------------------
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // logs requests

// ---------------------------
// 📌 ROUTES
// ---------------------------
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

// ---------------------------
// ❌ 404 HANDLER
// ---------------------------
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ---------------------------
// ❗ GLOBAL ERROR HANDLER
// ---------------------------
app.use((err, req, res, next) => {
  console.error('🔥 ERROR:', err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

module.exports = app;
