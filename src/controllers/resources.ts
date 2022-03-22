import {Request, Response} from "express";
import * as repo from '../repositories/resourceRepository';
import * as versioning from '../services/versioningService';

export const getResource = async (request: Request, res: Response) => {
    let id: string = request.params.id;
    let data = await repo.getResource(Number(id));

    if (!data){
        return getNotFoundResponse(res);
    }

    return res.status(404).json(data);
}

export const getResources = async (request: Request, res: Response) => {
    let page = request.body.page || 1;
    let data = await repo.getResources(page);

    return res.status(200).json(data);
}

export const putResourceVersion = async (request: Request, res: Response) => {
    let id: string = request.params.id;
    let resource = await repo.getResource(Number(id));

    if (!resource){
        return getNotFoundResponse(res);
    }

    if (!request.body.confirmation){
        return res.status(400).json({
            message: 'Body requires confirmation attribute'
        })
    }

    let nextCandidate = versioning.getNextCandidate(resource);
    await repo.saveUpdate(resource.setVersion(nextCandidate));

    return res.status(200).json({
        version: nextCandidate,
        message: 'Version string updated!'
    })
}

export const getResourceCandidateVersion = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let resource = await repo.getResource(Number(id));

    if (!resource){
        return getNotFoundResponse(res);
    }

    return res.status(200).json({
        version: versioning.getNextCandidate(resource)
    })
}

export const getResourceCurrentVersion = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let resource = await repo.getResource(Number(id));

    if (!resource){
        return getNotFoundResponse(res);
    }

    return res.status(200).json({
        version: resource.version,
    })
}

const getNotFoundResponse = (res : Response) => {
    return res.status(404).json({
        message: 'Not found'
    });
}


