const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const companyRoutes = require('./Routes/companyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection (use your local MongoDB URI here)
mongoose.connect('mongodb://127.0.0.1:27017/companyManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
app.use('/api/v1/jobs', companyRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});