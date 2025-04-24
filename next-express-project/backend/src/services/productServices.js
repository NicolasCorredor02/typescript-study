/* eslint-disable no-useless-catch */
import CustomError from '../utils/customError.js'
import { productDao } from '../daos/productDao.js'

class ProductService {
  constructor (dao) {
    this.dao = dao
  }

  create = async (productData) => {
    try {

      if (!productData) throw new CustomError('Product details are required', 400)

      const codeExists = await this.dao.codeExist({ code: productData.code })
      if (codeExists) throw new CustomError ('Code already exists', 400)

      const producFormated = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        staus: true
      }

      const response = await this.dao.create(producFormated)

      if (!response) throw new CustomError('Error creating product', 500)

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

  getById = async (id) => {
    try {
      if(!id  || id.trim() === '') throw new CustomError('ID is required', 400)

      const response = await this.dao.getById(id)

      if (!response) throw new CustomError('Product not found', 404)

      return response
    } catch (error) {
      throw error
    }
  }

  update = async (id, dataToUpdate) => {
    try {
      if (!id || id.trim() === '') throw new CustomError('ID is required', 400)

      if (dataToUpdate._id) throw new CustomError('ID cannot be updated', 400)

      const currentProduct = await this.dao.getById(id)
      if (!currentProduct) throw new CustomError('Product not found0', 404)

      if (dataToUpdate.code && dataToUpdate.code !== currentProduct.code) {
        const codeExists = await this.dao.codeExist({ code: dataToUpdate.code })
        if (codeExists) throw new CustomError ('Code already exists', 400)
      }

      const response = await this.dao.update(id, dataToUpdate)

      if (!response) throw new CustomError('Error updating product', 500)

      return response
    } catch (error) {
      throw error
    }
  }

  softDelete = async (id) => {
    try {
      if (!id || id.trim === '') throw new CustomError('ID is required', 400)

      const response = await this.dao.delete(id)

      if (!response) throw new CustomError('Product not found', 404)

      return response
    } catch (error) {
      throw error
    }
  }
}

export const productService = new ProductService(productDao)
