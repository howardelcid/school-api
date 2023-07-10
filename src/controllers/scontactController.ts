import { Request, Response } from 'express';

import Pool from '../database';

class scontactController{

    // esto para el metodo GET con un ID
    public async listByID(req: Request, res: Response): Promise<any>{
        try{
            console.log(req.params);
            const { id } = req.params;
            const teacherById = await Pool.query('SELECT * FROM contactoalumno WHERE carnetAlumno in (select carnetAlumno from alumno where idAlumno = ? ) and estado = 1', [id]);
            if(teacherById.length > 0){
                return res.json(teacherById); 
            }
            return res.status(404).json({message: 'Contactos de Alumno no encontrado.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo POST
    public async create(req: Request, res: Response): Promise<void>{
        try{
            const { tid } = req.body;
            const { name } = req.body;
            const { phone } = req.body;
            
            await Pool.query('INSERT INTO contactoalumno (carnetAlumno,nombreCompleto,telefono,estado) VALUES (?,?,?,1)', [tid, name, phone]);
            res.json({message: `Contacto guardado.`});
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
            const teacherById = await Pool.query('SELECT * FROM contactoalumno WHERE idContacto = ?', [id]);
            if(teacherById.length > 0){
                await Pool.query('UPDATE contactoalumno SET estado = 0 WHERE idContacto = ?', [id]);
                return res.json({message: `Contacto de Alumno con id: ${id} eliminado.`});
            } else {
                return res.status(404).json({message: 'Contacto no encontrado.'});
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

            //await Pool.query('INSERT INTO teacher_contacts (teacher_id,tcontact_name,tcontact_phone,tcontact_state) VALUES (?,?,?,?)', [tid, name, phone, state]);

            await Pool.query('UPDATE contactoalumno SET nombreCompleto=?, telefono=? WHERE idContacto = ?',[name, phone, id]);
            res.json({message: `Contacto con id: ${id} actualizado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }
}

export const SContactController = new scontactController();
