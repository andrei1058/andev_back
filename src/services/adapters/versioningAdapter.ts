import {Resource} from "../../models/resource";

export interface VersioningAdapter {
    getNext(resource: Resource) : string;
}