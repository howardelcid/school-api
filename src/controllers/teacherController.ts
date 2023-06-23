import { Request, Response } from 'express';

import Pool from '../database';

class teacherController{

    // esto para el metodo GET
    public async list(req: Request, res: Response): Promise<any>{
        try{            
            const teachers = await Pool.query('SELECT * FROM teachers');
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
            const teacherById = await Pool.query('SELECT * FROM teachers WHERE teacher_id = ?', [id]);
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
            const { name } = req.body;
            const { phone } = req.body;
            const { uid } = req.body;            
            const { state } = req.body;            
            
            await Pool.query('INSERT INTO teachers (teacher_name,teacher_uid,teacher_phone,teacher_state) VALUES (?,?,?,?)', [name, phone, uid, state]);
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
            const teacherById = await Pool.query('SELECT * FROM teachers WHERE teacher_id = ?', [id]);
            if(teacherById.length > 0){
                await Pool.query('DELETE FROM teachers WHERE teacher_id = ?', [id]);
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
            const { name } = req.body;
            const { phone } = req.body;
            const { uid } = req.body;            
            const { state } = req.body;            

            await Pool.query('UPDATE teachers SET teacher_name=?, teacher_uid=?, teacher_phone=?, teacher_state=? WHERE teacher_id = ?',[name, uid, phone, state, id]);
            res.json({message: `Profesor con id: ${id} actualizado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }
}

export const TeacherController = new teacherController();
