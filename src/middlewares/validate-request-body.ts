import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateRequestBody = (schema: ZodSchema)=>{
    return function requestBodyValidator (req: Request, res: Response, next: NextFunction){
        try{
            schema.parse(req.body)
            next();
        }catch(err: any){
            console.log(err.message)
            
            res.status(400).send("Informe os campos corretamente")
        }
    }
}

export default validateRequestBody