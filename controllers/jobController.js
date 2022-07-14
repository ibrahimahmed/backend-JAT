const asyncHandler = require('express-async-handler')

const Jobs = require('../models/jobsModel')
const User = require('../models/userModel')

// @desc    Get Jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find({ user: req.user.id })

  res.status(200).json(jobs)
})

// @desc    create a new job
// @route   POST /api/jobs
// @access  Private
const setJob = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description) {
      res.status(400)
      throw new Error('Title or description is missing')
    }
   
    const job = await Jobs.create({
    title: req.body.title,
      description: req.body.text,
      user: req.user.id,
    })
  
    res.status(200).json(job)
  })


// @desc    Update Job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = asyncHandler(async (req, res) => {
    const job = await Jobs.findById(req.params.id)
  
    if (!job) {
      res.status(400)
      throw new Error('Job not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Make sure the logged in user matches the goal user
    if (job.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedJob)
  })


  // @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = asyncHandler(async (req, res) => {
    const job = await Jobs.findById(req.params.id)
  
    if (!job) {
      res.status(400)
      throw new Error('Job not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Make sure the logged in user matches the goal user
    if (job.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    await job.remove()
  
    res.status(200).json({ id: req.params.id })
  })

  module.exports = {
    getJobs,
    setJob,
    updateJob,
    deleteJob,
  }