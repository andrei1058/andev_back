import {YearMonthBuildVersionAdapter} from "./adapters/yearMonthBuildVersionAdapter";
import {Resource} from "../models/resource";

const defaultProvider = new YearMonthBuildVersionAdapter();

export const getNextCandidate = (resource : Resource) => {
    return defaultProvider.getNext(resource);
}