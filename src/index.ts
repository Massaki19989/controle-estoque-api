import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import authController from './controllers/auth-controller';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

authController(app);

app.listen(port, () =>{
    console.log('Rodando')
})
