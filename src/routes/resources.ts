import express from 'express';
import controller from '../controllers/resources';
const router = express.Router();

router.get('/resources/:id', controller.getResource);

export = router;