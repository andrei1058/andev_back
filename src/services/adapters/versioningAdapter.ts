import {Resource} from "../../entity/Resource";

export interface VersioningAdapter {
    getNext(resource: Resource) : string;
}