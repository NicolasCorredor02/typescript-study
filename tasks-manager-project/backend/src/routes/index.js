import { Router } from 'express'
import { taskController } from '../controller/tasks.controller.js'

const router = Router()

router.route('/')
  .get(taskController.getAll)
  .post(taskController.create)

router.route('/:id')
  .delete(taskController.delete)

export default router
