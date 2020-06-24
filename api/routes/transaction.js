import { Router } from 'express';
import { get, add, remove } from '../controller/transaction';

const router = Router();
router.get('/', get);
router.post('/', add);
router.delete('/:id', remove);

export { router as transaction };