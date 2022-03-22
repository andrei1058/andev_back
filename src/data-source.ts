import "reflect-metadata"
import { DataSource } from "typeorm"
import {Resource} from "./entity/Resource";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB,
    synchronize: Boolean(process.env.DATABASE_SYNC),
    logging: Boolean(process.env.DATABASE_LOGGING),
    entities: [Resource],
    migrations: [],
    subscribers: [],
})
