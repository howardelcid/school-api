import { Router } from 'express';

import { IndexController } from '../controllers/indexController';

class indexRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', IndexController.index);
    }
}

const IndexRoutes = new indexRoutes();
export default IndexRoutes.router;