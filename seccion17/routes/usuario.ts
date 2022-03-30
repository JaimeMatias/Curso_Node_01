import { Router } from 'express';
import { DeleteUsuario, GetUsuario, GetUsuarios, PostUsuario, PutUsuario } from '../controllers/usuarios';

const router = Router();
router.get('/',GetUsuarios);
router.get('/:id',GetUsuario);
router.post('/',PostUsuario);
router.put('/:id',PutUsuario);
router.delete('/:id',DeleteUsuario);


export default router