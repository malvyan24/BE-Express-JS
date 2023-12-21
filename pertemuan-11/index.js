const express = require('express');
const aplikasi = express();
const routerAPI = require('./routes/api');

aplikasi.use('/api', routerAPI);

const port = 3000;
aplikasi.listen(port, () => {
console.log(`Server berjalan di port ${port}`);
});