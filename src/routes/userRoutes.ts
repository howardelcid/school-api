import { Router } from 'express';

import { UserController } from '../controllers/userController';

class userRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        this.router.get('/',UserController.list);
        this.router.get('/login',UserController.login);
        this.router.post('/',UserController.create);
        this.router.patch('/:id/status',UserController.updateStatus);
        this.router.patch('/:id',UserController.update);
        this.router.patch('/:id/change-pwd', UserController.updatePass);
    }
}

const UserRoutes = new userRoutes();
export default UserRoutes.router;
