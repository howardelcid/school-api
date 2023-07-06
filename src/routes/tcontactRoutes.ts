
import { Router } from 'express';

import { TContactController } from '../controllers/tcontactController';

class tcontactRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        //this.router.get('/',TContactController.list);
        this.router.get('/:id',TContactController.listByID);
        this.router.post('/',TContactController.create);
        this.router.delete('/:id',TContactController.delete);
        this.router.put('/:id',TContactController.update);
    }
}

const TContactRoutes = new tcontactRoutes();
export default TContactRoutes.router;
