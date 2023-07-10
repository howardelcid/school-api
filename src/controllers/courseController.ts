import { Request, Response } from 'express';

import Pool from '../database';

class courseController{

    // esto para el metodo GET
    public async list(req: Request, res: Response): Promise<any>{
        try{
            const courses = await Pool.query('SELECT * FROM curso WHERE estado = 1');
            if(courses.length > 0){
                return res.json(courses); 
            } 
            return res.status(404).json({message: 'Cursos no encontrados.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    } 

    // esto para el metodo GET con un ID
    public async listByID(req: Request, res: Response): Promise<any>{
        try{
            const { id } = req.params;
            const courseById = await Pool.query('SELECT * FROM curso WHERE idCurso = ? AND estado = 1', [id]);
            if(courseById.length > 0){
                return res.json(courseById); 
            }
            return res.status(404).json({message: 'Curso no encontrado.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo POST
    public async create(req: Request, res: Response): Promise<void>{
        try{
            await Pool.query('INSERT INTO curso values (nombreCurso, estado)  values (?,1) ', [req.body]);
            res.json({message: `Curso guardado.`});
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
            const courseById = await Pool.query('SELECT * FROM curso WHERE idCurso = ? AND estado = 1', [id]);
            if(courseById.length > 0){
                await Pool.query('UPDATE curso SET estado = 0 WHERE idCurso = ?', [id]);
                return res.json({message: `Curso con id: ${id} eliminado.`});
            } else {
                return res.status(404).json({message: 'Curso no encontrado, no se puede eliminar.'});
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

            await Pool.query('UPDATE curso SET nombreCurso = ? WHERE idCurso = ?', [name, id]);
            res.json({message: `Curso con id: ${id} actualizado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }
}

export const CourseController = new courseController();
