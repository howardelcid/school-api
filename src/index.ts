import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// imports para las rutas
import indexRoutes from './routes/indexRoutes';
import courseRoutes from './routes/courseRoutes';
import teacherRoutes from './routes/teacherRoutes';
import tcontactRoutes from './routes/tcontactRoutes';
import studentRoutes from './routes/studentRoutes';
import scontactRoutes from './routes/scontactRoutes';
import logsRoutes from './routes/logsRoutes';

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
        this.app.use("/api/course", courseRoutes);
        this.app.use("/api/teacher", teacherRoutes);
        this.app.use("/api/teacher/contact", tcontactRoutes);
        this.app.use("/api/student", studentRoutes);
        this.app.use("/api/student/contact", scontactRoutes);
        this.app.use("/api/logs", logsRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('ESCUCHANDO EN EL PUERTO ', this.app.get('port'));
        });
    }
}

const Servidor = new Server();
Servidor.start();
