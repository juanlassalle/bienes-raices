//const express=require('express')//extrae el paquete express
import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import db from './config/db.js'
//Crear la app
const app= express()

//Habilitar lectura de datos de formulario
app.use(express.urlencoded({extended:true}))

//Habilitar Cookie Parser
app.use(cookieParser())

//Habilitar CSRF
app.use(csrf({cookie:true}))
//Conexión a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexión correcta a la base de datos');
} catch (error) {
    console.log(error)
}
//Habilitar pug
//set es para agregar configuraciones
app.set('view engine','pug')
app.set('views', './views')

//Carpeta Pública
app.use(express.static('public'))

//get busca la que sea exacta
//cada linea de codigo el es un mildware
app.use('/',appRoutes)
app.use('/auth',usuarioRoutes)//use busca las rutas que inician con una diagonol
app.use('/',propiedadesRoutes)
app.use('/api',apiRoutes)

//Definir un puerto y arrancar el proyecto
const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});