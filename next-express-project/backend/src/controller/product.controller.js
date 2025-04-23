import { productService } from '../services/productServices.js'
import CustomError from '../utils/customError.js'

class ProductController {
  constructor (service) {
    this.service = service
  }

  create = async (req, res, next) => {
    try {
      const productData = req.body

      const response = await this.service.create(productData)

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

      res.status(200).json({
        status: 'success',
        message: 'Products recieved successfully',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params

      const response = await this.service.getById(id)

      res.status(200).json({
        status: 'success',
        message: 'Product adde successfully',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    try {
      const { id } = req.params
      const dataToUpdate = req.body

      if (dataToUpdate._id) throw new CustomError('ID cannot be updated', 400)

      const updatedProduct = await this.service.update(id, dataToUpdate)

      res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: updatedProduct
      })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params

      const response = await this.service.softDelete(id)

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

export const productController = new ProductController(productService)
