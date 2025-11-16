//starts the server and connects to the database
require('dotenv').config();
const connectDB = require('./src/config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// connect to MongoDB Atlas
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
