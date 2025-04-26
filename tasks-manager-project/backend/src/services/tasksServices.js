/* eslint-disable no-useless-catch */
import CustomError from '../utils/customError.js'
import { taskDao } from '../daos/taskDao.js'

class TaskService {
  constructor (dao) {
    this.dao = dao
  }

  create = async (taskData) => {
    try {
      const { description } = taskData

      if (!description) throw new CustomError('Description is required', 400)

      const data = {
        description,
        status: 'pending'
      }

      const response = await this.dao.create(data)

      if (!response) throw new CustomError('Error creating task', 500)

      return response
    } catch (error) {
      throw error
    }
  }

  getAll = async () => {
    try {
      return await this.dao.getAll()
    } catch (error) {
      throw new Error(error)
    }
  }

  delete = async (id) => {
    try {
      if (!id || id.trim === '') throw new CustomError('ID is required', 400)

      const response = await this.dao.delete(id)

      if (!response) throw new CustomError('Task not found', 404)

      return response
    } catch (error) {
      throw error
    }
  }
}

export const taskService = new TaskService(taskDao)
