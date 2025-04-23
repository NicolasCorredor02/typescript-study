/* eslint-disable no-useless-catch */
import CustomError from '../utils/customError.js'
import mongoose from 'mongoose'

export default class MongoDao {
  constructor (model) {
    this.model = model
  }

  create = async (data) => {
    try {
      return await this.model.create(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  getAll = async () => {
    try {
      return await this.model.find({ status: 'pending' }).lean()
    } catch (error) {
      throw new Error(error)
    }
  }

  delete = async (id) => {
    try {
      // Validación del ID
      if (!mongoose.Types.ObjectId.isValid(id)) { throw new CustomError('Invalid ID format', 400) }

      return await this.model.findByIdAndUpdate(id, { $set: { status: 'completed' } }, { new: true, runValidators: true })
    } catch (error) {
      throw error
    }
  }
}
