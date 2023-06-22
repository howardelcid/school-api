import { Request, Response } from 'express';

class indexController{
    public index(req: Request, res: Response){
        res.status(404).json({"text": "Melvin Joj "});
    }
}

export const IndexController = new indexController();