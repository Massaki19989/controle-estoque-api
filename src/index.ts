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

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Controle de Estoque API',
            version: '1.0.0',
            description: 'API para controle de estoque',
        }
    },
    apis: ['./src/controllers/*.ts'],
});

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

authController(app);
productController(app);
categoryController(app);
stockController(app);
userController(app);
saleController(app);

app.listen(port, () =>{
    console.log('Rodando')
})
