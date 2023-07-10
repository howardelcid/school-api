
import { Router } from 'express';

import { SContactController } from '../controllers/scontactController';

class scontactRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        //this.router.get('/',TContactController.list);
        this.router.get('/:id',SContactController.listByID);
        this.router.post('/',SContactController.create);
        this.router.delete('/:id',SContactController.delete);
        this.router.put('/:id',SContactController.update);
    }
}

const SContactRoutes = new scontactRoutes();
export default SContactRoutes.router;
