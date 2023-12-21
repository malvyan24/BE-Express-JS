const express = require('express');
const bodyParser = require('body-parser');
const controllerStudent = require('./StudentController');

const aplikasi = express();
const port = 3000;

aplikasi.use(bodyParser.json());

// TODO 8: Hubungkan rute-rute dari StudentController
aplikasi.get('/Student', controllerStudent.index);
aplikasi.post('/Student', controllerStudent.store);
aplikasi.put('/Student/:id', controllerStudent.update);
aplikasi.delete('/Student/:id', controllerStudent.destroy);

aplikasi.listen(port, () => {
console.log(`Server berjalan di port ${port}`);
});