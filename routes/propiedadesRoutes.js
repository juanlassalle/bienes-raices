import express from 'express'
import { body } from 'express-validator';
import { admin,crear,guardar,agregarImagen, almacenarImagen,editar,guardarCambios,eliminar,mostrarPropiedad } from '../controllers/propiedadController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js';

const router =express.Router();

router.get('/mis-propiedades',protegerRuta,admin)
router.get('/propiedades/crear',protegerRuta,crear)
router.post('/propiedades/crear',protegerRuta,
    body('titulo').notEmpty().withMessage('El Titulo del anuncio es obligatorio'),
    body('descripcion')
      .notEmpty().withMessage('La Descripción no puede ir vacía')
      .isLength({max:200}).withMessage('La Descripcion es muy Larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoría'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de Habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de Estaconamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de Baños'),
    body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    guardar
    
)
//router.get('/mis-propiedades',propiedadesFiltro)

router.get('/propiedades/agregar-imagen/:id', 
    protegerRuta,
    agregarImagen
)
router.post('/propiedades/agregar-imagen/:id',
  protegerRuta,
  upload.single('imagen'),
  almacenarImagen
)

router.get('/propiedades/editar/:id',
  protegerRuta,
  editar
)
router.post('/propiedades/editar/:id',protegerRuta,
    body('titulo').notEmpty().withMessage('El Titulo del anuncio es obligatorio'),
    body('descripcion')
      .notEmpty().withMessage('La Descripción no puede ir vacía')
      .isLength({max:200}).withMessage('La Descripcion es muy Larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoría'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de Habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de Estaconamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de Baños'),
    body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    guardarCambios
    
)
router.post('/propiedades/eliminar/:id',
    protegerRuta,
    eliminar
)
//Area publica
router.get('/propiedad/:id',
    mostrarPropiedad    
)
export default router
