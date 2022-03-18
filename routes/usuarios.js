
const { Router } = require('express');
const { check} = require('express-validator')
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExisteRol, existeUsuarioPorId } = require('../helpers/db-validators.js');
const { validateJWT } = require('../middlewares/validate-jwt');
const { esAdminRole } = require('../middlewares/validate-roles');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id' , 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPut );

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({ min:6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo','El correo no es valido').custom(emailExisteRol),

    check('rol').custom( esRolValido),
    
    validarCampos
],usuariosPost );

router.delete('/:id',[
    validateJWT,
    esAdminRole,
    check('id' , 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;