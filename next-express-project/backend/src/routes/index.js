import { Router } from 'express'
import { productController } from '../controller/product.controller.js'

const router = Router()

router.route('/')
  .get(productController.getAll)
  .post(productController.create)

router.route('/:id')
  .get(productController.getById)
  .put(productController.update)
  .delete(productController.delete)


export default router
