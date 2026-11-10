import { Router } from 'express';

import { list, show, edit, destroy, create } from 'controllers/cars';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

import { validatorCreate, validatorDestroy, validatorEdit, validatorShow } from '../../middleware/validation/cars';

const router = Router();

router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);

router.post('/', [checkJwt, checkRole(['ADMINISTRATOR']), validatorCreate], create);

router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorShow], show);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorEdit], edit);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorDestroy], destroy);

export default router;
