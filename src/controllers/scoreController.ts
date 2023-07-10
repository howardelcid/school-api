import { Request, Response } from 'express';
import Pool from '../database';


class scoreController{

    // esto para el metodo GET
    public async list(req: Request, res: Response): Promise<any>{
        try{
            const { carnetAlumno } = req.query;
            let qry = 'SELECT * FROM notaalumno WHERE estado > 0';
            if (carnetAlumno != null) {
                qry += ' and carnetAlumno = ' + carnetAlumno;
            }

            const scores = await Pool.query(qry);
            return res.json(scores);
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
            const scoreById = await Pool.query('SELECT * FROM notaalumno WHERE idNota = ? and estado != 0', [id]);
            if(scoreById.length > 0){
                return res.json(scoreById); 
            }
            return res.status(404).json({message: 'Nota no encontrado.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo POST
    public async create(req: Request, res: Response): Promise<void>{
        try{
            const { carnetAlumno } = req.body;
            const { idCurso } = req.body;
            const { nota } = req.body;
            const { actividad } = req.body;

            const findAlumno = await Pool.query(`SELECT 1 FROM alumno WHERE estado > 0 and carnet=?`, [carnetAlumno]);
            if (findAlumno.length == 0){
                res.status(400).json({message: `Alumno no encontrado para carnet: ${carnetAlumno}`});
                return;
            }

            const findCurso = await Pool.query(`SELECT 1 FROM curso WHERE estado > 0 and idCurso=?`, [idCurso]);
            if (findCurso.length == 0) {
                res.status(400).json({message: `Curso no encontrado para Id: ${idCurso}`});
                return;
            }

            await Pool.query(`INSERT INTO notaalumno (carnetAlumno,idCurso,nota,actividad,estado) 
            VALUES (?,?,?,?,1)`,
            [carnetAlumno, idCurso, nota, actividad]);
            res.json({message: `Nota guardada.`});
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
            const teacherById = await Pool.query('SELECT * FROM notaalumno WHERE idNota = ?', [id]);
            if(teacherById.length > 0){
                await Pool.query('UPDATE notaalumno SET estado = 0 WHERE idNota = ?', [id]);
                return res.json({message: `Nota con id: ${id} eliminado.`});
            } else {
                return res.status(404).json({message: 'Nota no encontrado.'});
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
            const { nota } = req.body;

            const findNota = await Pool.query('SELECT 1 FROM notaalumno WHERE idNota = ? and estado > 0', [id]);
            if (findNota.length == 0){
                res.status(404).json({message: `Nota no encontrada para id: ${id}`});
                return;
            }

            await Pool.query(`UPDATE notaalumno SET nota = ? WHERE idNota = ?`,
            [nota, id]);
            res.json({message: `Nota actualizada.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }
}

export const ScoreController = new scoreController();
