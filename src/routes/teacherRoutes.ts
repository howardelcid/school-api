import { Router } from 'express';

import { TeacherController } from '../controllers/teacherController';

class teacherRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        this.router.get('/',TeacherController.list);
        this.router.get('/:id',TeacherController.listByID);
        this.router.post('/',TeacherController.create);
        this.router.delete('/:id',TeacherController.delete);
        this.router.put('/:id',TeacherController.update);
    }
}

const TeacherRoutes = new teacherRoutes();
export default TeacherRoutes.router;
