
import { Router } from 'express';

import { TCourseController } from '../controllers/tcourseController';

class tcourseRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        //this.router.get('/',TCourseController.list);
        this.router.get('/:id',TCourseController.listByID);
        this.router.post('/',TCourseController.create);
        this.router.delete('/:id',TCourseController.delete);
        this.router.put('/:id',TCourseController.update);
    }
}

const TCourseRoutes = new tcourseRoutes();
export default TCourseRoutes.router;
