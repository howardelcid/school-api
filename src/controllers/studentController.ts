import { Request, Response } from 'express';

import Pool from '../database';

class studentController{

    // esto para el metodo GET
    public async list(req: Request, res: Response): Promise<any>{
        try{            
            const students = await Pool.query('SELECT * FROM alumno WHERE estado > 0');
            if(students.length > 0){
                return res.json(students); 
            } 
            return res.status(404).json({message: 'No existen alumnos.'});
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
            const studentById = await Pool.query('SELECT * FROM alumno WHERE idAlumno = ?', [id]);
            if(studentById.length > 0){
                return res.json(studentById); 
            }
            return res.status(404).json({message: 'Alumno no encontrado.'});
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
            const { carnet } = req.body;
            const { telefono } = req.body;
            const { dpi } = req.body;            
            const { email } = req.body; 
            const { direccion } = req.body; 
            const { fechaNacimiento } = req.body; 
            
            await Pool.query('INSERT INTO alumno (carnet,nombreCompleto,dpi,direccion,telefono,email,fechaNacimiento,estado) VALUES (?,?,?,?,?,?,?,1)', [carnet, nombreCompleto, dpi, direccion, telefono, email, fechaNacimiento]);
            res.json({message: `Alumno guardado.`});
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
            const teacherById = await Pool.query('SELECT * FROM alumno WHERE idAlumno = ?', [id]);
            if(teacherById.length > 0){
                await Pool.query('UPDATE alumno SET estado = 0 WHERE idAlumno = ?', [id]);
                return res.json({message: `Alumno con id: ${id} eliminado.`});
            } else {
                return res.status(404).json({message: 'Alumno no encontrado.'});
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
            const { nombreCompleto } = req.body;
            const { carnet } = req.body;
            const { telefono } = req.body;
            const { dpi } = req.body;            
            const { email } = req.body; 
            const { direccion } = req.body; 
            const { fechaNacimiento } = req.body; 
            
            await Pool.query('UPDATE alumno SET carnet=?, nombreCompleto=?, dpi=?, fechaNacimiento=?, telefono=?, email=?, direccion=? WHERE idAlumno = ?',[carnet, nombreCompleto, dpi, fechaNacimiento, telefono, email, direccion, id]);
            res.json({message: `Alumno con id: ${id} actualizado.`});
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
            
            await Pool.query('UPDATE alumno SET estado=? WHERE idAlumno = ?',[estado, id]);
            res.json({message: `Alumno con id: ${id} actualizado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }
}

export const StudentController = new studentController();
