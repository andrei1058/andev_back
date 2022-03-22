import {Resource} from "../entity/Resource";
import {AppDataSource} from "../data-source";

const repo = AppDataSource.getRepository(Resource);
const resourcesPerPage: number = 15;

export const getResources = async (page: number) => {
    return await repo.find({
        skip: (page - 1) * resourcesPerPage,
        take: resourcesPerPage,
    });
}

export const getResource = async (id: number): Promise<Resource | null> => {
    return await repo.findOneBy({id: id});
}

export async function saveUpdate(resource: Resource) {
    await repo.save(resource);
}