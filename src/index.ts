import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import authController from './controllers/auth-controller';
import cookieParser from 'cookie-parser';
import productController from './controllers/product-controller';
import categoryController from './controllers/category-controller';
import stockController from './controllers/stock-controller';
import userController from './controllers/user-controller';
import saleController from './controllers/sale-controller';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

authController(app);
productController(app);
categoryController(app);
stockController(app);
userController(app);
saleController(app);

app.listen(port, () =>{
    console.log('Rodando')
})
