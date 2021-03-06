import {Injectable} from "@angular/core";
import {StepModel} from "../../Engine/stepModel";
import { GlobalVariable } from "../../global";
import {Http, Headers, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Observable";
import includes = require("core-js/fn/string/includes");

@Injectable()
export class CargoDetailsService {

    constructor (private _http: Http) {}
    dataGrid = [];
    keysName = [];
    colTitle = [];
    keysName_details = [];
    colTitle_details = [];
    originalData = this.dataGrid;

    getDatas(origin, destination){

        let query = "origin="+origin+"&destination="+destination;
        let headers= new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        var completeUrl = GlobalVariable.BASE_URL+'cargo_details?'+query;
        return this._http.get(completeUrl)
            .map(response =>
            {
                console.log(response);
                let data = response.json();
                console.log(data);
                return data
            })
            .catch(error => Observable.throw(error))
    }

    //
    // getTechInfos(version){
    //     let query = "version="+version;
    //     let headers= new Headers({'Content-Type': 'application/json'});
    //     let options = new RequestOptions({ headers: headers });
    //     var completeUrl = GlobalVariable.BASE_URL+'tech_details?'+query;
    //     return this._http.get(completeUrl)
    //         .map(response =>
    //         {
    //             let data = response.json();
    //             console.log(data);
    //             return data
    //         })
    //         .catch(error => Observable.throw(error))
    // }

}