const bcryptjs = require('bcryptjs');
const { response  } = require('express');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generate-jwt')



const login =async ( req, res = response ) => {

    const { correo , password } = req.body;

    try {
        //Verificar si el email Existe
        const usuario = await  Usuario.findOne({ correo })
        if (!usuario){
            return res.status(400).json({
                msg: "Usuario/Password incorrecto"
            })
        }
        //Verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: "Usuario/Password incorrecto -Estado false"
            })
        }

        //Verificar la contraseña

        const validarPassword = bcryptjs.compareSync(password ,usuario.password);
        if ( !validarPassword){
            return res.status(400).json({
                msg: "Usuario/Password incorrecto -Password incorrecta"
            })
        }
        //Generar JWT
        const token  = await  generarJWT( usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Hable con el admin"})
    }
    
    

}


module.exports ={
    login
}