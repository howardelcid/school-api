import { Router } from 'express';
import { LogsController } from '../controllers/logsController';

class logsRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{ 
        //Tabla Bitacora
        this.router.get('/bitacora',LogsController.listBit);
        this.router.get('/bitacora/:idRegistro',LogsController.listByIDBit);
        this.router.post('/bitacora',LogsController.createBit);
        //this.router.delete('/bitacora/:idRegistro',LogsController.deleteBit); POR SER BITACORA NO DEBERIA ELIMINARSE EL REGISTRO
        //this.router.put('/bitacora/:idRegistro',LogsController.updateBit); POR SER BITACORA NO DEBERIA ACTAULIZASE EL REGISTRO
        //Tabla Evento
        this.router.get('/evento',LogsController.listEv);
        this.router.get('/evento/:idEvento',LogsController.listByIDEv);
        this.router.post('/evento',LogsController.createEv);
        this.router.delete('/evento/:idEvento',LogsController.deleteEv);
        this.router.put('/evento/:idEvento',LogsController.updateEv);
    }
}

const LogsRoutes = new logsRoutes();
export default LogsRoutes.router;