import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validateRequestBody = (schema: ZodSchema)=>{
    return function requestBodyValidator (req: Request, res: Response, next: NextFunction){
        try{
            schema.parse(req.body)
            next();
        }catch(err: any){

            if(err instanceof ZodError){
                const errors = err.errors.map(e=>({
                    field: e.path.join('.'),
                    message: e.message
                }))

                res.status(400).json({
                    error: "Falha na validação",
                    details: errors
                })
            }else{
                res.status(500).json({error: "Erro interno no servidor"})
            }

            
        }
    }
}

export default validateRequestBody