import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'completed']
    }
  }
)

taskSchema.index({ description: 1 })

export default mongoose.model('Task', taskSchema)
