import {getPrisma} from '../services/databaseService';
import {Resource} from "../models/resource";

export async function updateResourceVersion(resource: Resource, newVersion: string) {
    await getPrisma().resource.update({
        where: {
            id: resource.id,
        },
        data: {
            version: newVersion
        }
    });
}


const resourcesPerPage: number = 15;

export const getResources = async (page: number) => {
    return getPrisma().resource.findMany({
        skip: (page - 1) * resourcesPerPage,
        take: resourcesPerPage,
    });
}

export const getResource = async (id: number): Promise<Resource | null> => {
    return getPrisma().resource.findFirst({
        where: {id}
    }) || null;
}