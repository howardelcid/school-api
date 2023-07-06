import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// imports para las rutas
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import courseRoutes from './routes/courseRoutes';
import teacherRoutes from './routes/teacherRoutes';
import tcontactRoutes from './routes/tcontactRoutes';
import tcourseRoutes from './routes/tcourseRoutes';

class Server {
    public app: Application

    constructor(){
        this.app = express();
        this.config();
        this.route();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 1400);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    route(): void{ // las rutas del servidor
        this.app.use("/",indexRoutes);
        this.app.use("/api/games", gamesRoutes);
        this.app.use("/api/course", courseRoutes);
        this.app.use("/api/teacher", teacherRoutes);
        this.app.use("/api/teacher/contact", tcontactRoutes);
        this.app.use("/api/teacher/course", tcourseRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('ESCUCHANDO EN EL PUERTO ', this.app.get('port'));
        });
    }
}

const Servidor = new Server();
Servidor.start();
