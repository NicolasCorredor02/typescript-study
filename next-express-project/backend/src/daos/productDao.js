import MongoDao from './mongoDao.js'
import Product from './models/product.model.js'

class ProductDao extends MongoDao {
  constructor (model) {
    super(model)
  }

  codeExist = async (obj) => {
    try {
      return await this.model.findOne(obj)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const productDao = new ProductDao(Product)
