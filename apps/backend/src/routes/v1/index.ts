import { Router } from 'express';

import auth from './auth';
import cars from './cars';
import rideorders from './rideorders';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/cars', cars);
router.use('/rideorders', rideorders);

export default router;
