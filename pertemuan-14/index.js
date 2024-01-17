const express = require('express');
const aplikasi = express();
const routerAPI = require('./routes/api');

// Middleware
import logger from "./middleware/logger.js";

const app = express();

//memasang middleware logger
app.use(logger);

app.use("/" , apiRouting);

aplikasi.use('/api', routerAPI);

const port = 3000;
aplikasi.listen(port, () => {
console.log(`Server berjalan di port ${port}`);
});