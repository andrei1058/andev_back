import jwt from 'express-jwt';

export const checkJwt = jwt({
    secret: process.env.APP_SECRET as string,
    algorithms: ['HS256'],
});