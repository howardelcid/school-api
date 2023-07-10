import { Request, Response } from 'express';

import Pool from '../database';

class teacherController{

    // esto para el metodo GET
    public async list(req: Request, res: Response): Promise<any>{
        try{            
            const teachers = await Pool.query('SELECT * FROM maestro WHERE estado > 0');
            if(teachers.length > 0){
                return res.json(teachers); 
            } 
            return res.status(404).json({message: 'No existen profesores.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    } 

    // esto para el metodo GET con un ID
    public async listByID(req: Request, res: Response): Promise<any>{
        try{
            console.log(req.params);
            const { id } = req.params;
            const teacherById = await Pool.query('SELECT * FROM maestro WHERE idMaestro = ?', [id]);
            if(teacherById.length > 0){
                return res.json(teacherById); 
            }
            return res.status(404).json({message: 'Profesor no encontrado.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo POST
    public async create(req: Request, res: Response): Promise<void>{
        try{
            const { nombreCompleto } = req.body;
            const { codigoCatedratico } = req.body;
            const { telefono } = req.body;
            const { dpi } = req.body;            
            const { email } = req.body; 
            const { nivelIngles } = req.body; 
            const { aptitudCurso1 } = req.body; 
            const { aptitudCurso2 } = req.body; 
            const { aptitudCurso3 } = req.body; 
            const { aptitudCurso4 } = req.body; 
            const { aptitudCurso5 } = req.body;  
            
            await Pool.query('INSERT INTO maestro (codigoCatedratico,nombreCompleto,dpi,telefono,email,nivelIngles,aptitudCurso1,aptitudCurso2,aptitudCurso3,aptitudCurso4,aptitudCurso5,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,1)', [codigoCatedratico, nombreCompleto, dpi, telefono, email, nivelIngles, aptitudCurso1, aptitudCurso2, aptitudCurso3, aptitudCurso4, aptitudCurso5]);
            res.json({message: `Profesor guardado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo DELETE con un ID
    public async delete(req: Request, res: Response): Promise<any>{
        try{
            const { id } = req.params;
            const teacherById = await Pool.query('SELECT * FROM maestro WHERE idMaestro = ?', [id]);
            if(teacherById.length > 0){
                await Pool.query('UPDATE maestro SET estado = 0 WHERE idMaestro = ?', [id]);
                return res.json({message: `Profesor con id: ${id} eliminado.`});
            } else {
                return res.status(404).json({message: 'Profesor no encontrado.'});
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo PUT (actualizar), vamos a recibir un parametro ID
    public async update(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params;
            const { codigoCatedratico } = req.body;
            const { nombreCompleto } = req.body;            
            const { telefono } = req.body;
            const { dpi } = req.body;            
            const { email } = req.body; 
            const { nivelIngles } = req.body; 
            const { aptitudCurso1 } = req.body; 
            const { aptitudCurso2 } = req.body; 
            const { aptitudCurso3 } = req.body; 
            const { aptitudCurso4 } = req.body; 
            const { aptitudCurso5 } = req.body;  
            
            await Pool.query('UPDATE maestro SET codigoCatedratico=?, nombreCompleto=?, dpi=?, telefono=?, email=?,nivelIngles=?,aptitudCurso1=?,aptitudCurso2=?,aptitudCurso3=?,aptitudCurso4=?,aptitudCurso5=? WHERE idMaestro = ?',[codigoCatedratico, nombreCompleto, dpi, telefono, email, nivelIngles, aptitudCurso1, aptitudCurso2, aptitudCurso3, aptitudCurso4, aptitudCurso5, id]);
            res.json({message: `Profesor con id: ${id} actualizado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo PUT (actualizar), vamos a recibir un parametro ID
    public async state(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params;
            const { estado } = req.body;      
            
            await Pool.query('UPDATE maestro SET estado=? WHERE idMaestro = ?',[estado, id]);
            res.json({message: `Profesor con id: ${id} actualizado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }
}

export const TeacherController = new teacherController();
