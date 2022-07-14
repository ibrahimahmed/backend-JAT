const mongoose = require('mongoose')

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title value'],
    },
    title: {
        type: String,
        required: [true, 'Please add a description value'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Jobs', jobSchema)
