import { Request, Response } from 'express';
import Pool from '../database';


class userController{

    // esto para el metodo GET
    public async list(req: Request, res: Response): Promise<any>{
        try{            
            const users = await Pool.query('SELECT * FROM usuario WHERE estado > 0');
            return res.json(users);
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
            const userById = await Pool.query('SELECT * FROM usuario WHERE idUsuario = ? and estado != 0', [id]);
            if(userById.length > 0){
                return res.json(userById); 
            }
            return res.status(404).json({message: 'Usuario no encontrado.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo POST
    public async create(req: Request, res: Response): Promise<void>{
        try{
            const { nombreUsuario } = req.body;
            const { nombreEncargado } = req.body;
            const { password } = req.body;
            const { tipoUsuario } = req.body;
            const { email } = req.body;
            const { tipoPreguntaSeguridad } = req.body;
            const { respuestaPregunta } = req.body;

            if (tipoUsuario != 1 && tipoUsuario != 2) {
                res.status(400).json({message: `Tipo de usuario incorrecto: ${tipoUsuario}`});
                return;
            }

            let exUser = await Pool.query('SELECT 1 FROM usuario WHERE nombreUsuario = ? limit 1', [nombreUsuario]);
            if(exUser.length > 0){
                res.status(400).json({message: `Usuario ya existente con nombreUsuario: ${nombreUsuario}`});
                return;
            }

            exUser = await Pool.query('SELECT 1 FROM usuario WHERE email = ? limit 1', [email]);
            if(exUser.length > 0){
                res.status(400).json({message: `Usuario ya existente con email: ${email}`});
                return;
            }

            await Pool.query(`INSERT INTO usuario (nombreUsuario,nombreEncargado,password,tipoUsuario,email,tipoPreguntaSeguridad,respuestaPregunta,estado) 
            VALUES (?,?,MD5(?),?,?,?,?,1)`,
            [nombreUsuario, nombreEncargado, password, tipoUsuario, email, tipoPreguntaSeguridad, respuestaPregunta]);
            res.json({message: `Usuario guardado.`});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    public async login(req: Request, res: Response): Promise<any>{
        try{
            const { nombreUsuario } = req.body;
            const { password } = req.body;

            const userById = await Pool.query('SELECT * FROM usuario WHERE estado = 1 and nombreUsuario = ? and password = MD5(?) limit 1', [nombreUsuario, password]);
            if(userById.length > 0){
                const us = userById[0];
                return res.json(us); 
            }
            return res.status(401).json({message: 'Credenciales invalidas.'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    // esto para el metodo DELETE con un ID
    public async updateStatus(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params;
            const { estado } = req.body;

            if (estado != 1 && estado != 0) {
                res.status(400).json({message: 'El estado recibido es invalido.'});
                return;
            }

            const userById = await Pool.query('SELECT 1 FROM usuario WHERE idUsuario = ? limit 1', [id]);
            if(userById.length > 0){
                await Pool.query('UPDATE usuario SET estado=? WHERE idUsuario = ?',[estado, id]);
                res.json({message: `Estado de usuario actualizado.`});
            } else {
                res.status(404).json({message: 'Usuario no encontrado.'});
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
            const { nombreEncargado } = req.body;
            const { tipoUsuario } = req.body;
            const { tipoPreguntaSeguridad } = req.body;
            const { respuestaPregunta } = req.body;

            const teacherById = await Pool.query('SELECT 1 FROM usuario WHERE idUsuario = ? limit 1', [id]);
            if(teacherById.length > 0){
                let qryUpd = '';
                let params = [];

                if (nombreEncargado != null) {
                    qryUpd = 'nombreEncargado=?'
                    params.push(nombreEncargado);
                }
                if (tipoUsuario != null) {
                    if (qryUpd == '') { 
                        qryUpd = 'tipoUsuario=?';
                    } else {
                        qryUpd += ', tipoUsuario=?';
                    }
                    params.push(tipoUsuario);
                }
                if (tipoPreguntaSeguridad != null) {
                    if (qryUpd == '') { 
                        qryUpd = 'tipoPreguntaSeguridad=?';
                    } else {
                        qryUpd += ', tipoPreguntaSeguridad=?';
                    }
                    params.push(tipoPreguntaSeguridad);
                }
                if (respuestaPregunta != null) {
                    if (qryUpd == '') { 
                        qryUpd = 'respuestaPregunta=?';
                    } else {
                        qryUpd += ', respuestaPregunta=?';
                    }
                    params.push(respuestaPregunta);
                }

                if (qryUpd == '') {
                    res.status(400).json({message: 'Ningun parametro recibido para actualizar'});
                    return;
                }

                params.push(id);
                await Pool.query(`UPDATE usuario SET ${qryUpd} WHERE idUsuario = ?`, params);
                res.json({message: `Usuario con id: ${id} actualizado.`});
            } else {
                res.status(404).json({message: 'Usuario no encontrado.'});
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }

    public async updatePass(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params;
            const { respuestaPregunta } = req.body;
            const { nuevaPass } = req.body;

            const user = await Pool.query('SELECT * FROM usuario WHERE idUsuario = ? and estado != 0 LIMIT 1', [id]);
            if(user.length > 0){
                if (respuestaPregunta == null) {
                    res.status(400).json({message: 'La respuesta de seguridad es requerida.'});
                    return;
                }

                if (nuevaPass == null) {
                    res.status(400).json({message: 'La nueva contraseña es requerida.'});
                    return;
                }

                const us = user[0];
                if (us.respuestaPregunta == respuestaPregunta) {
                    await Pool.query(`UPDATE usuario SET password = MD5(?) WHERE idUsuario = ?`, [nuevaPass,id]);
                    res.json({message: `Contraseña actualizada.`});
                } else {
                    res.status(401).json({message: 'Respuesta de seguridad incorrecta.'});
                    return;
                }
            } else {
                res.status(404).json({message: 'Usuario no encontrado.'});
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: `Error: ${err}`});
        }
    }
}

export const UserController = new userController();
