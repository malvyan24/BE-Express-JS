const express = require('express');
const router = express.Router();
const controllerStudent = require('./StudentController');

// TODO 9: Tentukan rute-rute API untuk StudentController
router.get('/Student', controllerStudent.index);
router.post('/Student', controllerStudent.store);
router.put('/Student/:id', controllerStudent.update);
router.delete('/Student/:id', controllerStudent.destroy);

module.exports = router;