import { Router } from 'express';

import { CourseController } from '../controllers/courseController';

class courseRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        this.router.get('/',CourseController.list);
        this.router.get('/:id',CourseController.listByID);
        this.router.post('/',CourseController.create);
        this.router.delete('/:id',CourseController.delete);
        this.router.put('/:id',CourseController.update);
    }
}

const CourseRoutes = new courseRoutes();
export default CourseRoutes.router;