import  express  from "express"
import routes from "./routes/api.js"
import dotenv from 'dotenv';
//import middleware
import logger from "./middleware/logger.js";


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

dotenv.config();

app.use(logger);
app.use(routes);

const port = process.env.APP_PORT
app.listen(port,()=>{
    console.log("Server Berjalan di http://localhost:"+port)
})