const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001; // Use a different port for the applicant service

// Middleware
app.use(bodyParser.json());

// MongoDB connection (use your local MongoDB URI here)
mongoose.connect('mongodb://127.0.0.1:27017/jobApplications', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
// Endpoint to get all jobs from the company microservice
app.get('/api/v1/jobs', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/jobs');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

app.post('/api/v1/apply', async (req, res) => {
    const { jobId, applicantData } = req.body;
  
    try {
      // Send the application to the company service
      const response = await axios.post('http://localhost:3000/api/v1/jobs/apply', {
        jobId,
        applicantData,
      });
      
      res.status(response.status).json(response.data); // Forward the response back to the client
    } catch (error) {
      res.status(500).json({ message: 'Error applying for job', error: error.message });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Applicant service running on port ${PORT}`);
});
