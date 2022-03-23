const { Schema , model} = require('mongoose');


const CategoriaSchema = Schema({
    nombre:{
        type:String,
        required:[true , 'Name is requerid']
    },
    estado:{
        type:String,
        default:true,
        requerid:true

    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        requerid:true
    }
});



module.exports = model( 'Categoria' , CategoriaSchema );