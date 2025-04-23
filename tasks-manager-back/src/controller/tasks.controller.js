import { taskService } from '../services/tasksServices.js'

class TaskController {
  constructor (service) {
    this.service = service
  }

  create = async (req, res, next) => {
    try {
      const taskData = req.body

      const response = await this.service.create(taskData)

      res.status(201).json({
        status: 'success',
        message: 'Task created successfully',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll()

      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params

      const response = await this.service.delete(id)

      res.status(200).json({
        status: 'success',
        message: 'Task deleted successfully',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
}

export const taskController = new TaskController(taskService)
