import { Router } from 'express';

import { StudentController } from '../controllers/studentController';

class studentRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        this.router.get('/',StudentController.list);
        this.router.get('/:id',StudentController.listByID);
        this.router.post('/',StudentController.create);
        this.router.delete('/:id',StudentController.delete);
        this.router.put('/:id',StudentController.update);
        this.router.put('/st/:id',StudentController.state);
    }
}

const StudentRoutes = new studentRoutes();
export default StudentRoutes.router;
