const Role = require("../models/role.js");
const Usuario = require("../models/usuario.js")


const esRolValido = async (rol= '') =>{
    const existeRol = await  Role.findOne({ rol });
    
    console.log( existeRol)
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)

    }

}

const emailExisteRol = async (correo= '') =>{
    const existeemail = await Usuario.findOne({ correo});
    if ( existeemail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}


const existeUsuarioPorId = async (id) =>{
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id }, no existe`);
    }
}



module.exports = {
    esRolValido,
    emailExisteRol,
    existeUsuarioPorId
}