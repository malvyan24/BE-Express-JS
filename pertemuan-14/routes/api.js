import  express  from "express"
import AuthController from '../controller/AuthController.js'
import StudentController from '../controller/StudentController.js'
import auth from "../middleware/Auth.js"

const router = express.Router()


router.get('/students', auth, StudentController.index)
router.post('/students',auth, StudentController.store)
router.put('/students/:id',auth, StudentController.update)
router.delete('/students/:id',auth, StudentController.delete)
router.get('/students/specific',auth, StudentController.specific)
router.get('/students',auth, StudentController.filter)
router.post('/register',AuthController.register)
router.post('/login',AuthController.login)

export default router;