import { Request, Response } from 'express';
import Pool from '../database';

class logsController{
    /************************************ BITACORA ************************************/
    // esto para el metodo GET
    public async listBit(req: Request, res: Response): Promise<any>{
        try{
            const bit = await Pool.query('SELECT * FROM bitacora');
            if(bit.length > 0){
                return res.json(bit); 
            } 
            return res.status(404).json({message: 'Registros no encontrados.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    } 

    // esto para el metodo GET con un ID
    public async listByIDBit(req: Request, res: Response): Promise<any>{
        try{
            const { idRegistro } = req.params;
            const BitById = await Pool.query('SELECT * FROM bitacora WHERE idRegistro = ?', [idRegistro]);
            if(BitById.length > 0){
                return res.json(BitById); 
            }
            return res.status(404).json({message: 'Registro no Encontrado'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo POST
    public async createBit(req: Request, res: Response): Promise<any>{
        try{
            const { idEvento } = req.body;
            const BitById = await Pool.query('SELECT * FROM evento WHERE idEvento = ?', [idEvento]);
            if(BitById.length > 0){
                await Pool.query('INSERT INTO bitacora VALUES (idRegistro, idEvento, detalle, fechaHoraEvento) values (?,?,?,?) ', [req.body]);
                return res.json({message: `Registro guardado.`});
            }
            return res.status(404).json({message: 'No existe el evento'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    /************************************ EVENTOS ************************************/
    // esto para el metodo GET
    public async listEv(req: Request, res: Response): Promise<any>{
        try{
            const event = await Pool.query('SELECT * FROM evento WHERE estado = 1');
            if(event.length > 0){
                return res.json(event); 
            } 
            return res.status(404).json({message: 'Eventos no encontrados.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    } 

    // esto para el metodo GET con un ID
    public async listByIDEv(req: Request, res: Response): Promise<any>{
        try{
            const { idEvento } = req.params;
            const eventById = await Pool.query('SELECT * FROM evento WHERE idEvento = ? AND estado = 1', [idEvento]);
            if(eventById.length > 0){
                return res.json(eventById); 
            }
            return res.status(404).json({message: 'Evento no encontrado.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo POST
    public async createEv(req: Request, res: Response): Promise<void>{
        try{        
            await Pool.query('INSERT INTO evento VALUES (idEvento, nombreEvento, estado) values (?,?,1) ', [req.body]);
            res.json({message: `Evento guardado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo DELETE con un ID
    public async deleteEv(req: Request, res: Response): Promise<any>{
        try{
            const { idEvento } = req.params;
            const eventById = await Pool.query('SELECT * FROM evento WHERE idEvento = ? AND estado = 1', [idEvento]);
            if(eventById.length > 0){
                await Pool.query('UPDATE evento SET estado = 0 WHERE idEvento = ?', [idEvento]);
                return res.json({message: `Evento con id: ${idEvento} eliminado.`});
            } else {
                return res.status(404).json({message: 'Evento no encontrado, no se puede eliminar.'});
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo PUT (actualizar), vamos a recibir un parametro ID
    public async updateEv(req: Request, res: Response): Promise<void>{
        try{
            const { idEvento } = req.params;
            const { nombreEvento } = req.body;            

            await Pool.query('UPDATE evento SET nombreEvento = ? WHERE idEvento = ?', [nombreEvento, idEvento]);
            res.json({message: `Evento con id: ${idEvento} actualizado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }
}

export const LogsController = new logsController();