import express from 'express';
import * as controller from '../controllers/resources';
import {checkJwt} from "../middlewares/checkJWT";
const router = express.Router();

router.get('/resources/:id([0-9]+)',controller.getResource);
router.get('/resources/', controller.getResources);
router.put('/resources/:id([0-9]+)/versioning/commit', [checkJwt], controller.putResourceVersion)

export = router;