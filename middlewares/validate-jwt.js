const jwt = require('jsonwebtoken')
const  { response , request } = require('express')

const Usuario = require('../models/usuario')

const validateJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token')
    if( !token ) {
        return res.status(401).json({
            msg:"No token en la peticion"
        });
    }
    try {
         const {uid} =   jwt.verify( token , process.env.SECRETORPRIVATEKEY);

        //leer usuarioque corresponde  al uid
        const usuario = await Usuario.findById( uid );

        //Usuario no existe en la base de datos
        if( !usuario ) {
            return res.status(401).json({
                msg:'token no valido- usuario no existe en la BD'
            })
        }


        //vERIFICAR  si el uid tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg:"Token no valido-usuario con estado:false"
            })
        }

        req.usuario = usuario;


        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no valido"
        })
    }
   
}

module.exports= {
    validateJWT
}