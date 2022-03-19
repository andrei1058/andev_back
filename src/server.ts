import morgan from "morgan";
import express, {Express} from "express";

import resourceRoutes from './routes/resources';
import * as http from "http";

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({extended: false}));
/** Takes care of JSON data */
router.use(express.json());

/** RULES MIDDLEWARE */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Allow-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
})

/** Routes */
router.use('/v1', resourceRoutes);

/** Error handling */
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message,
    })
})

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 80;
httpServer.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})