const { randomFillSync } = require('crypto');
const { Router } = require('express');
const router = Router();
const fs = require('fs');
const {"v4": v4} = require('uuid');

const json_datos = fs.readFileSync('src/db.json', 'utf-8');
let datos = JSON.parse(json_datos);




router.get('/', (req, res) => {
    res.render('index.ejs', {
        datos
    })
});

router.get('/nueva-entrada', (req, res ) =>{
    res.render('nueva-entrada');
})


router.post('/nueva-entrada',  (req, res) => {

   const {nombre, edad, correo, numero, comentario } = req.body;

if(!nombre || !edad || !correo || !numero|| !comentario){
    res.status(400).send('Recuerde llenar todos los datos por favor');
    return;
}

   let  nuevoDato = {
        fecha: newDate,
        id:v4(),
        nombre,
        edad,
        correo,
        numero,
        comentario
   };
    datos.push(nuevoDato);

    const json_datos = JSON.stringify(datos)

   fs.writeFileSync('src/db.json', json_datos, 'utf-8')

    res.redirect('/');
});


router.get('/delete/:id', (req, res) => {
    datos = datos.filter(datos => datos.id != req.params.id);
    const json_datos = JSON.stringify(datos)

   fs.writeFileSync('src/db.json', json_datos, 'utf-8')
   res.redirect('/');

});

router.put('/edit/:id', async (req, res) => {
    const nota = await datos.findById(req.params.id)
    res.render('edit.ejs', {nota});
});

module.exports = router;