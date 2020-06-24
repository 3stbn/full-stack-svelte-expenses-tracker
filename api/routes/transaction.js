import { Router } from 'express';
import { get, add, remove } from '../controller/transaction';

const router = Router();
router.get('/', (req, res) => get);
router.post('/', (req, res) => add);
router.delete('/:id', (req, res) => remove);

export { router as transaction };