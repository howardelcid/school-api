import { Router } from 'express';

import { GamesController } from '../controllers/gamesController';

class gamesRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        this.router.get('/',GamesController.list);
        this.router.get('/:id',GamesController.listByID);
        this.router.post('/',GamesController.create);
        this.router.delete('/:id',GamesController.delete);
        this.router.put('/:id',GamesController.update);
    }
}

const GamesRoutes = new gamesRoutes();
export default GamesRoutes.router;