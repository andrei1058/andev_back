import {VersioningAdapter} from "./versioningAdapter";
import {Resource} from "../../models/resource";

export class YearMonthBuildVersionAdapter implements VersioningAdapter {

    getNext(resource: Resource) : string {
        let split = resource.version.split('.');

        if (split.length < 2) {
            throw new Error("Cannot determinate year and month number in current version!");
        }

        let year = Number(split[0]);
        let month = Number(split[1]);
        let build = split.length > 2 ? Number(split[2]) : 0;

        let now = new Date();
        let currentYear : string | number = now.getFullYear().toString();
        currentYear = Number(currentYear.charAt(2)+''+currentYear.charAt(3));
        let currentMonth = now.getUTCMonth()+1;

        if (year === currentYear){
            let version = year + '.';
            if (month === currentMonth) {
                return version + month + '.' + (++build);
            }
            return version + currentMonth + '';
        }

        return currentYear + '.' + currentMonth;
    }
}