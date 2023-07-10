import { Router } from 'express';

import { ScoreController } from '../controllers/scoreController';

class scoreRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        this.router.get('/',ScoreController.list);
        this.router.get('/:id',ScoreController.listByID);
        this.router.post('/',ScoreController.create);
        this.router.delete('/:id',ScoreController.delete);
        this.router.patch('/:id',ScoreController.update);
    }
}

const ScoreRoutes = new scoreRoutes();
export default ScoreRoutes.router;
