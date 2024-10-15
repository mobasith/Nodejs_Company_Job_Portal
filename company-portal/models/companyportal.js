const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  jobId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true},
  designation: { type: String, required: true},
  package: { type: String, required: true},
  jobLocation: { type: String, required: true},
  //numberOfApplications: { type: Number, required: true},
});

module.exports = mongoose.model('companyportal', companySchema);