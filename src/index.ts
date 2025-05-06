import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import authController from './controllers/auth-controller';
import cookieParser from 'cookie-parser';
import productController from './controllers/product-controller';
import categoryController from './controllers/category-controller';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

authController(app);
productController(app);
categoryController(app);

app.listen(port, () =>{
    console.log('Rodando')
})
