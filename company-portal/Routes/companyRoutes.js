const express = require('express');
const router = express.Router();
//const companyportal = require('../models/companyportal');
const companyportal = require('../models/companyportal');
const JobApplication = require('../models/JobApplication'); // Import JobApplication model


//post a job to the company portal
 router.post('/postjob', async (req, res) => {
  try {
    const newJob = new companyportal({
     jobId: req.body.jobId,
     name: req.body.name,
     description: req.body.description,
     designation: req.body.designation,
     package: req.body.package,
     jobLocation: req.body.jobLocation,
    });

    const savedJob = await newJob.save();
    res.send(savedJob);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get all jobs from the company portal
 router.get('/', async (req, res) => {
  try {
    const jobs = await companyportal.find();
    res.send(jobs);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get number of job applications from the company portal

// Route to handle job applications
router.post('/apply', async (req, res) => {
  const { jobId, applicantData } = req.body;

  try {
    const application = new JobApplication({ jobId, applicantData });
    await application.save(); // Save the application to the database
    res.status(201).json({ message: 'Application received', application });
  } catch (error) {
    res.status(500).json({ message: 'Error saving application', error });
  }
});

// Get all applications (for administrative purposes)
router.get('/applications', async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.send(applications);
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;