import { Request, Response } from 'express';

import Pool from '../database';

class gamesController{

    // esto para el metodo GET
    public async list(req: Request, res: Response): Promise<void>{
        try{
            const games = await Pool.query('SELECT * FROM games');
            res.json(games);
        }
        catch(err){
            console.log(err);
        }
    } 

    // esto para el metodo GET con un ID
    public async listByID(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const gameById = await Pool.query('SELECT * FROM game WHERE id = ?', [id]);
        if(gameById.length > 0){
            return res.json(gameById); 
        }
        return res.status(404).json({message: 'Game Not Found'});
    }

    // esto para el metodo POST
    public async create(req: Request, res: Response): Promise<void>{
        await Pool.query('INSERT INTO games set?', [req.body]);
        res.json({message: 'Game Saved!'});
    }

    // esto para el metodo DELETE con un ID
    public async delete(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const gameById = await Pool.query('SELECT * FROM game WHERE id = ?', [id]);
        const deleteGame = await Pool.query('DELETE FROM game WHERE id = ?', [id]);
        if(gameById.length > 0){
            deleteGame;
            return res.json({text: 'Deleting Game id ' + id});
        } else {
            return res.status(404).json({message: 'Game dosent Exist'});
        }
    }

    // esto para el metodo PUT (actualizar), vamos a recibir un parametro ID
    public async update(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params;
            const oldGame = req.body;
            await Pool.query('UPDATE game SET ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The game was Updated" });
        }
        catch(err){
            console.log(err);
        }
    }
}

export const GamesController = new gamesController();