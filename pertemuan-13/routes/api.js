import  express  from "express"
const router = express.Router()


import StudentController from '../controller/StudentController.js'
router.get('/students',StudentController.index)
router.post('/students',StudentController.store)
router.put('/students/:id',StudentController.update)
router.delete('/students/:id',StudentController.delete)
router.get('/students/specific',StudentController.specific)

export default router;