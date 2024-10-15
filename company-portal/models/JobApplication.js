// models/JobApplication.js
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  applicantData: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume: { type: String, required: true },
  },
  submittedAt: { type: Date, default: Date.now },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
module.exports = JobApplication;
