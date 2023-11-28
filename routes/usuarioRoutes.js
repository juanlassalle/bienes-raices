import express from 'express';
import { formularioLogin,autenticar,cerrarSesion,formularioRegistro,registrar,confirmar,formularioOlvidePassword,resetPassword,comprobarToken,nuevoPassword } from '../controllers/usuarioController.js';


const router=express.Router();//extraigo el router

/*GET SE UTILIZA CUANDO UN USUARIO VISITA UN SITIO WEB
POST CUANDO UN USUARIO LLENA UN FORMULARIO Y SE NECESITA PROCESARLO */
router.get('/login',formularioLogin)
router.post('/login',autenticar)

//Cerrar Sesión
router.post('/cerrar-sesion',cerrarSesion)

router.get('/registro',formularioRegistro)
router.post('/registro',registrar)

router.get('/confirmar-cuenta/:token',confirmar)

router.get('/olvide-password',formularioOlvidePassword)
router.post('/olvide-password',resetPassword)

//Almacena el nuevo password
router.get('/olvide-password/:token',comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)

export default router