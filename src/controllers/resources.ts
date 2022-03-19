import {Request, Response} from "express";

// interface Resource {
//     id: Number,
//     version: Number,
//     title: String,
//     description: String,
// }

const getResource = async (request: Request, res: Response) => {
    let id: string = request.params.id;

    if (id === '1') {
        return res.status(200).json({
            id: 1,
            version: 22.1,
            title: "BedWars1058",
            description: "A Minecraft mini-game"
        });
    }
    return res.status(404).json({
        message: "Not found!"
    })
}

export default {getResource};