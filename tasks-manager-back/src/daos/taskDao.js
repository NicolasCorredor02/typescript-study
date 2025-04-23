import MongoDao from './mongoDao.js'
import Task from './models/task.model.js'

class TaskDao extends MongoDao {
  constructor (model) {
    super(model)
    this.model = model
  }
}

export const taskDao = new TaskDao(Task)
