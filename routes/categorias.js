


const {Router} = require('express');
const { check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
//get categories
router.get('/', function (req, res) {
    res.json({
        msg:"Hola :D"
    })
    console.log("Hola")
})
//Get category by id

router.get('/id', function (req, res) {
    res.json({
        msg:"Hola :D"
    })
    console.log("Hola")
})
//create category
router.post('/', function (req, res) {
    res.json({
        msg:"Hola :D"
    })
    console.log("Hola")
})
//to update category
router.put('/id', function (req, res) {
    res.json({
        msg:"Hola :D"
    })
    console.log("Hola")
})

//delete category
router.delete('/id', function (req, res) {
    res.json({
        msg:"Hola :D"
    })
    console.log("Hola")
})





module.exports = router;