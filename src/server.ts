import morgan from "morgan";
import express, {Express, Request, Response} from "express";

import resourceRoutes from './routes/resources';
import * as http from "http";
import {AppDataSource} from "./data-source";
// import * as jwtSign from 'jsonwebtoken';

const app: Express = express();

app.use(morgan('tiny'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Allow-Control-Allow-Methods', 'GET PUT DELETE POST');
        return res.status(200).json({});
    }
    next();
})

// Routes
app.use('/v1', resourceRoutes);

// Connect to DB and start App
AppDataSource.initialize().then(() => {
    // Start web server
    const httpServer = http.createServer(app);
    const PORT: any = process.env.PORT ?? 80;
    httpServer.listen(PORT, process.env.APP_BIND_IP, () => {
        console.log(`The server is running on port ${PORT}`);
    })

    // Error handling
    app.use(function (err: any, req: Request, res: Response) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                message: 'Invalid token.',
            });
        }
    });

    // No routes
    app.use((req, res) => {
        const error = new Error('not found');
        return res.status(404).json({
            message: error.message,
        })
    })

}).catch(error => console.log(error));

//
// let token = jwtSign.sign('bedwars-deploy', process.env.APP_SECRET as string);
// console.log(token);