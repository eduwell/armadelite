"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var gridPanel_service_1 = require("./gridPanel.service");
var router_1 = require('@angular/router');
var step_service_1 = require("../Engine/step.service");
var http_1 = require("@angular/http");
var balletDetails_service_1 = require("./balletDetails.service");
var BalletDetailsComponent = (function () {
    function BalletDetailsComponent(_stepService, _gridService, router, _balletDetailsService, route, _http) {
        this._stepService = _stepService;
        this._gridService = _gridService;
        this.router = router;
        this._balletDetailsService = _balletDetailsService;
        this.route = route;
        this._http = _http;
        this.list_options = [];
        this.display = false;
        this.details = false;
        this.images_to_show = false;
    }
    BalletDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.obj_id = params['record'];
        });
        console.log(this.obj_id);
        this._balletDetailsService.getDatas(this.obj_id)
            .subscribe(function (data) {
            console.log(data);
            _this.record_details = data;
            _this.display = true;
        }, function (error) { return console.log(error); });
    };
    BalletDetailsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BalletDetailsComponent.prototype.goToCurrentStep = function (item) {
        console.log(item);
        var navigationExtras = {
            queryParams: { 'current_id': item.step_id, '_id': item._id }
        };
        this.router.navigate(['/step'], navigationExtras);
    };
    BalletDetailsComponent.prototype.isObject = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    };
    BalletDetailsComponent = __decorate([
        core_1.Component({
            selector: 'grid-details',
            template: "\n              <style type=\"text/css\">\n.tg  {border-collapse:collapse;border-spacing:0;border-color:#999;}\n.tg td{font-family:Arial, sans-serif;font-size:16px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#444;background-color:#F7FDFA;border-top-width:1px;border-bottom-width:1px;}\n.tg th{font-family:Arial, sans-serif;font-size:16px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#fff;background-color:#26ADE4;border-top-width:1px;border-bottom-width:1px;}\n.tg .tg-bn4o{font-weight:bold;font-size:18px;text-align:center;vertical-align:top}\n.tg .tg-txgi{font-weight:bold;font-family:\"Trebuchet MS\", Helvetica, sans-serif !important;;background-color:#efefef;vertical-align:top}\n.tg .tg-6k2t{background-color:#D2E4FC;vertical-align:top}\n.tg .tg-qjv7{background-color:#D2E4FC;font-size:18px;vertical-align:top}\n.tg .tg-yw4l{vertical-align:top}\n.tg  {border-collapse:collapse;border-spacing:0;border-color:#999;}\n@media screen and (max-width: 767px) {.tg {width: auto !important;}.tg col {width: auto !important;}.tg-wrap {overflow-x: auto;-webkit-overflow-scrolling: touch;}}</style>\n              \n              \n  <!--<previous-page></previous-page>-->\n  <nav class=\"form-navArrow\">\n            <button (click)=\"this.router.navigate(['/menu'])\"><i class=\"glyphicon glyphicon-triangle-left\"> Retour</i></button>\n  </nav>\n  \n    <div class=\"panel-body\" *ngIf=\"display\">\n\n       \n  <!-- Nav tabs -->\n  <ul class=\"nav nav-tabs\" role=\"tablist\">\n    <li role=\"presentation\" class=\"active\"><a href=\"#home\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">Details</a></li>\n    <li role=\"presentation\"><a href=\"#notes\" aria-controls=\"notes\" role=\"tab\" data-toggle=\"tab\">Notes</a></li>\n    \n    <!--<li role=\"presentation\"><a href=\"#photos\" aria-controls=\"photos\" role=\"tab\" data-toggle=\"tab\"  *ngIf=\"images_to_show\">Photos</a></li>-->\n    <!--<li role=\"presentation\"><a href=\"#admin\" aria-controls=\"admin\" role=\"tab\" data-toggle=\"tab\">D\u00E9tails administratifs</a></li>-->\n    <!--<li role=\"presentation\"><a href=\"#tech\" aria-controls=\"tech\" role=\"tab\" data-toggle=\"tab\">Caract\u00E9ristiques techniques</a></li>-->\n  </ul>\n                  \n        <div class=\"tab-content\">  \n            \n            <!-- TAB ALL INFOS -->\n            <div role=\"tabpanel\" class=\"tab-pane active\" id=\"home\">\n                 \n                <div class=\"tg-wrap\">\n                    <table class=\"tg\">\n                      <tr>\n                        <th></th>\n                        <th class=\"tg-bn4o\" colspan=\"3\">{{record_details.profile[0].nom}} {{record_details.profile[1].firstname}} </th>\n                      </tr>\n                      <tr>\n                        <td class=\"tg-txgi\">Birthday</td>\n                        <td class=\"tg-6k2t\"></td>\n                        <td class=\"tg-txgi\">Age</td>\n                        <td class=\"tg-6k2t\">{{record_details.age}}</td>\n                      </tr>\n                      <tr>\n                        <td class=\"tg-txgi\">Country</td>\n                        <td class=\"tg-6k2t\">{{record_details.profile[4].country}}</td>\n                        <td class=\"tg-txgi\">City</td>\n                        <td class=\"tg-6k2t\">{{record_details.profile[5].city}}</td>\n                      </tr>\n                      <tr>\n                        <th class=\"tg-yw4l\"><span class=\"glyphicon glyphicon-earphone\"> {{record_details.profile[2].phone}}</span></th><td class=\"tg-txgi\"></td>\n                        <th class=\"tg-yw4l\"><span class=\"glyphicon glyphicon-envelope\"> {{record_details.profile[3].email}}</span></th>\n                      </tr>\n                     \n                     <!--<tr>-->\n                        <!--<td class=\"tg-txgi\">Portes</td>-->\n                        <!--<td class=\"tg-6k2t\">{{record_details.nbportesSelected}}</td>-->\n                      <!--</tr>-->\n                     <!---->\n                      <!--<tr>      -->\n                        <!--<td colspan=\"4\"></td>-->\n                      <!--</tr>-->\n                      <!---->\n                      <!--<tr>-->\n                        <!--<th class=\"tg-yw4l\" align=\"center\"  colspan=\"3\">{{record_details.profile[0].nom}}</th> -->\n                        <!--<th class=\"tg-yw4l\"><span class=\"glyphicon glyphicon-earphone\"> {{record_details.profile[2].tel}}</span></th>-->\n                      <!--</tr>-->\n                  <!---->\n                      <!--<tr>-->\n                        <!--<td class=\"tg-txgi\"  colspan=\"3\">Code Postal {{record_details.profile[1].adresse}}</td>-->\n                    <!---->\n                        <!---->\n                  <!---->\n                       <!--</tr>-->\n                      <!--<tr><td colspan=\"4\"></td></tr>-->\n                      <!---->\n                      <!---->\n                      <!--<tr>-->\n                        <!---->\n                        <!--<td class=\"tg-txgi\">Valeur catalogue</td>-->\n                        <!--<td class=\"tg-6k2t\" *ngIf=\"details\" >{{tech_details.prix}}</td>-->\n                      <!--</tr>-->\n                         <!--<tr>-->\n                        <!--<td class=\"tg-txgi\" *ngIf=\"record_details.premiere_main == 'OUI'\">Premi\u00E8re main</td>-->\n                        <!--<td class=\"tg-txgi\" *ngIf=\"record_details.premiere_main == 'NON'\">Seconde main</td>-->\n                        <!--<td class=\"tg-6k2t\" ><span class=\"glyphicon glyphicon-ok\"></span></td>-->\n                        <!--<td class=\"tg-txgi\" *ngIf=\"record_details.import == 'OUI'\">Import\u00E9</td>-->\n                        <!--<td class=\"tg-6k2t\" *ngIf=\"record_details.import == 'OUI'\"><span class=\"glyphicon glyphicon-ok\"></span></td>-->\n                      <!--</tr>-->\n                      <!--<tr>-->\n                        <!--<td class=\"tg-txgi\" >Cl\u00E9s</td>-->\n                        <!--<td class=\"tg-6k2t\" >{{record_details.cle}}</td>-->\n                        <!--<td class=\"tg-txgi\" *ngIf=\"record_details.carnet == 'OUI'\">Carnet d'entretien</td>-->\n                        <!--<td class=\"tg-6k2t\" *ngIf=\"record_details.carnet == 'OUI'\"><span class=\"glyphicon glyphicon-ok\"></span></td>-->\n                        <!---->\n                      <!--</tr>-->\n                       <!--<tr *ngIf=\"record_details.options_voiture.length > 0\">-->\n                        <!--<td class=\"tg-txgi\">Options</td>-->\n                        <!--<td class=\"tg-6k2t\" colspan=\"3\"> <ul class=\"items\">-->\n                                                    <!--<li *ngFor=\"let options_voiture of record_details.options_voiture\">-->\n                                                        <!--{{options_voiture}}  -->\n                                                    <!--</li>-->\n                                                <!--</ul></td>-->\n                      <!--</tr>-->\n                    </table>\n                </div>\n                </div>\n                \n            <!-- NOTES -->\n            <div role=\"tabpanel\" class=\"tab-pane\" id=\"notes\" >\n                <textarea rows=\"100\" cols=\"500\">\n                    {{record_details.age }}\n                </textarea>\n            </div>\n            \n                              <!---->\n            <!--</div>-->\n                    <!---->\n            <!--&lt;!&ndash; INFOS CONTACT&ndash;&gt;-->\n            <!--<div role=\"tabpanel\" class=\"tab-pane\" id=\"contact\">-->\n                    <!--<div class=\"tg-wrap\"><table class=\"tg\">-->\n                  <!--<tr>-->\n                    <!--<th class=\"tg-031e\">Nom</th>-->\n                    <!--<th class=\"tg-yw4l\">{{record_details.profile[0].nom}}</th>-->\n                  <!--</tr>-->\n                  <!--<tr>-->\n                    <!--<td class=\"tg-031e\">Code Postal</td>-->\n                    <!--<td class=\"tg-yw4l\">{{record_details.profile[1].adresse}}</td>-->\n                  <!--</tr>-->\n                  <!--<tr>-->\n                    <!--<td class=\"tg-031e\">T\u00E9l\u00E9phone</td>-->\n                    <!--<td class=\"tg-yw4l\">{{record_details.profile[2].tel}}</td>-->\n                  <!--</tr>-->\n                  <!--<tr>-->\n                    <!--<td class=\"tg-031e\">Email</td>-->\n                    <!--<td class=\"tg-yw4l\">{{record_details.profile[3].email}}</td>-->\n                  <!--</tr>-->\n                <!--</table></div>-->\n                    <!---->\n            <!--</div>-->\n                      <!---->\n            <!--&lt;!&ndash; PHOTOS VEHICULE &ndash;&gt;-->\n            <!--<div role=\"tabpanel\" class=\"tab-pane\" id=\"photos\" *ngIf=\"images_to_show\">-->\n                <!--<img class=\"img-thumbnail\"  src=\"{{record_details.fileDetails[0].file_url}}\" width=\"480\" height=\"320\">-->\n                <!--<br>-->\n                <!--<img class=\"img-responsive\" src=\"{{record_details.fileDetails[1].file_url}}\" width=\"480\" height=\"320\">-->\n                <!---->\n                <!--<img class=\"img-responsive\" src=\"{{record_details.fileDetails[2].file_url}}\" width=\"480\" height=\"320\">-->\n                <!--<img class=\"img-responsive\" src=\"{{record_details.fileDetails[3].file_url}}\" width=\"480\" height=\"320\">-->\n                <!--<img class=\"img-responsive\" src=\"{{record_details.fileDetails[4].file_url}}\" width=\"480\" height=\"320\">-->\n            <!--</div>-->\n\n            <!--&lt;!&ndash; INFO ADMINISTRATIVES&ndash;&gt;-->\n            <!--<div role=\"tabpanel\" class=\"tab-pane\" id=\"admin\">          -->\n                <!--<div class=\"row\">-->\n                    <!--<div class=\"col-md-6\">: {{record_details.premiere_main}}</div>-->\n                    <!--<div class=\"col-md-6\">Import\u00E9: {{record_details.import}}</div>-->\n                <!--</div>-->\n                <!---->\n                <!--<div class=\"row\">-->\n                    <!--<div class=\"col-md-6\">Carnet d'entretien: {{record_details.carnet}}</div>-->\n                    <!--<div class=\"col-md-6\">Cl\u00E9s: {{record_details.cle}}</div>-->\n                <!--</div>-->\n                <!---->\n                <!--<div class=\"row\" *ngIf=\"record_details.roule == 'NON'\">-->\n                    <!--<div *ngIf=\"record_details.accident == OUI\"> -->\n                        <!--V\u00E9hicule accident\u00E9<br>-->\n                        <!--Raison: {{record_details.accident}}-->\n                    <!--</div>-->\n                <!--</div>-->\n            <!--</div>-->\n            <!---->\n            <!--&lt;!&ndash; INFO TECHNIQUES &ndash;&gt;-->\n            <!--<div role=\"tabpanel\" class=\"tab-pane\" id=\"tech\">-->\n                <!--<div class=\"row\">-->\n                    <!--<div class=\"col-md-6\">: {{record_details.premiere_main}}</div>-->\n                    <!--<div class=\"col-md-6\">Import\u00E9: {{record_details.import}}</div>-->\n                <!--</div>-->\n                <!---->\n                <!--<div class=\"row\">-->\n                    <!--<div class=\"col-md-6\">Carnet d'entretien: {{record_details.carnet}}</div>-->\n                    <!--<div class=\"col-md-6\">Cl\u00E9s: {{record_details.cle}}</div>-->\n                <!--</div>-->\n                      <!---->\n        </div>\n            \n\n    </div>\n"
        }), 
        __metadata('design:paramtypes', [step_service_1.StepService, gridPanel_service_1.GridPanelService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, balletDetails_service_1.BalletDetailsService, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _c) || Object])
    ], BalletDetailsComponent);
    return BalletDetailsComponent;
    var _a, _b, _c;
}());
exports.BalletDetailsComponent = BalletDetailsComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFsbGV0RGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFxRCxlQUNyRCxDQUFDLENBRG1FO0FBQ3BFLGtDQUErQixxQkFBcUIsQ0FBQyxDQUFBO0FBQ3JELHVCQUF1RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pFLDZCQUEwQix3QkFBd0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUFtQixlQUFlLENBQUMsQ0FBQTtBQUVuQyxzQ0FBbUMseUJBQXlCLENBQUMsQ0FBQTtBQXdNN0Q7SUFHSSxnQ0FBb0IsWUFBeUIsRUFBVSxZQUE4QixFQUFVLE1BQWMsRUFDekYscUJBQTJDLEVBQVMsS0FBcUIsRUFBVSxLQUFXO1FBRDlGLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN6RiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBS2xILGlCQUFZLEdBQUUsRUFBRSxDQUFDO1FBRWpCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixtQkFBYyxHQUFHLEtBQUssQ0FBQztJQVY2RixDQUFDO0lBWXJILHlDQUFRLEdBQVI7UUFBQSxpQkFzQkM7UUFyQkcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR25DLENBQUMsQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFdkIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQzNDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBRTNCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBR3hCLENBQUMsRUFDRCxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQzlCLENBQUE7SUFJVCxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELGdEQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksZ0JBQWdCLEdBQXFCO1lBQ3JDLFdBQVcsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1NBRS9ELENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHlDQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsTUFBTSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQTlQTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsNitXQWtNYjtTQUNBLENBQUM7OzhCQUFBO0lBaUVGLDZCQUFDOztBQUFELENBL0RBLEFBK0RDLElBQUE7QUEvRFksOEJBQXNCLHlCQStEbEMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2JhbGxldERldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtHcmlkUGFuZWxTZXJ2aWNlfSBmcm9tIFwiLi9ncmlkUGFuZWwuc2VydmljZVwiO1xyXG5pbXBvcnQge1JvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7U3RlcFNlcnZpY2V9IGZyb20gXCIuLi9FbmdpbmUvc3RlcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SHR0cH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHtHcmlkRGV0YWlsc1NlcnZpY2V9IGZyb20gXCIuL2dyaWREZXRhaWxzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtCYWxsZXREZXRhaWxzU2VydmljZX0gZnJvbSBcIi4vYmFsbGV0RGV0YWlscy5zZXJ2aWNlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdncmlkLWRldGFpbHMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XHJcbi50ZyAge2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtib3JkZXItc3BhY2luZzowO2JvcmRlci1jb2xvcjojOTk5O31cclxuLnRnIHRke2ZvbnQtZmFtaWx5OkFyaWFsLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O3BhZGRpbmc6MTBweCA1cHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDowcHg7b3ZlcmZsb3c6aGlkZGVuO3dvcmQtYnJlYWs6bm9ybWFsO2JvcmRlci1jb2xvcjojOTk5O2NvbG9yOiM0NDQ7YmFja2dyb3VuZC1jb2xvcjojRjdGREZBO2JvcmRlci10b3Atd2lkdGg6MXB4O2JvcmRlci1ib3R0b20td2lkdGg6MXB4O31cclxuLnRnIHRoe2ZvbnQtZmFtaWx5OkFyaWFsLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0Om5vcm1hbDtwYWRkaW5nOjEwcHggNXB4O2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MHB4O292ZXJmbG93OmhpZGRlbjt3b3JkLWJyZWFrOm5vcm1hbDtib3JkZXItY29sb3I6Izk5OTtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6IzI2QURFNDtib3JkZXItdG9wLXdpZHRoOjFweDtib3JkZXItYm90dG9tLXdpZHRoOjFweDt9XHJcbi50ZyAudGctYm40b3tmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxOHB4O3RleHQtYWxpZ246Y2VudGVyO3ZlcnRpY2FsLWFsaWduOnRvcH1cclxuLnRnIC50Zy10eGdpe2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6XCJUcmVidWNoZXQgTVNcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7O2JhY2tncm91bmQtY29sb3I6I2VmZWZlZjt2ZXJ0aWNhbC1hbGlnbjp0b3B9XHJcbi50ZyAudGctNmsydHtiYWNrZ3JvdW5kLWNvbG9yOiNEMkU0RkM7dmVydGljYWwtYWxpZ246dG9wfVxyXG4udGcgLnRnLXFqdjd7YmFja2dyb3VuZC1jb2xvcjojRDJFNEZDO2ZvbnQtc2l6ZToxOHB4O3ZlcnRpY2FsLWFsaWduOnRvcH1cclxuLnRnIC50Zy15dzRse3ZlcnRpY2FsLWFsaWduOnRvcH1cclxuLnRnICB7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO2JvcmRlci1zcGFjaW5nOjA7Ym9yZGVyLWNvbG9yOiM5OTk7fVxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkgey50ZyB7d2lkdGg6IGF1dG8gIWltcG9ydGFudDt9LnRnIGNvbCB7d2lkdGg6IGF1dG8gIWltcG9ydGFudDt9LnRnLXdyYXAge292ZXJmbG93LXg6IGF1dG87LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO319PC9zdHlsZT5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICA8IS0tPHByZXZpb3VzLXBhZ2U+PC9wcmV2aW91cy1wYWdlPi0tPlxyXG4gIDxuYXYgY2xhc3M9XCJmb3JtLW5hdkFycm93XCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cInRoaXMucm91dGVyLm5hdmlnYXRlKFsnL21lbnUnXSlcIj48aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdHJpYW5nbGUtbGVmdFwiPiBSZXRvdXI8L2k+PC9idXR0b24+XHJcbiAgPC9uYXY+XHJcbiAgXHJcbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiICpuZ0lmPVwiZGlzcGxheVwiPlxyXG5cclxuICAgICAgIFxyXG4gIDwhLS0gTmF2IHRhYnMgLS0+XHJcbiAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCIgcm9sZT1cInRhYmxpc3RcIj5cclxuICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJhY3RpdmVcIj48YSBocmVmPVwiI2hvbWVcIiBhcmlhLWNvbnRyb2xzPVwiaG9tZVwiIHJvbGU9XCJ0YWJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPkRldGFpbHM8L2E+PC9saT5cclxuICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNub3Rlc1wiIGFyaWEtY29udHJvbHM9XCJub3Rlc1wiIHJvbGU9XCJ0YWJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPk5vdGVzPC9hPjwvbGk+XHJcbiAgICBcclxuICAgIDwhLS08bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjcGhvdG9zXCIgYXJpYS1jb250cm9scz1cInBob3Rvc1wiIHJvbGU9XCJ0YWJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiICAqbmdJZj1cImltYWdlc190b19zaG93XCI+UGhvdG9zPC9hPjwvbGk+LS0+XHJcbiAgICA8IS0tPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI2FkbWluXCIgYXJpYS1jb250cm9scz1cImFkbWluXCIgcm9sZT1cInRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+RMOpdGFpbHMgYWRtaW5pc3RyYXRpZnM8L2E+PC9saT4tLT5cclxuICAgIDwhLS08bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjdGVjaFwiIGFyaWEtY29udHJvbHM9XCJ0ZWNoXCIgcm9sZT1cInRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+Q2FyYWN0w6lyaXN0aXF1ZXMgdGVjaG5pcXVlczwvYT48L2xpPi0tPlxyXG4gIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPiAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8IS0tIFRBQiBBTEwgSU5GT1MgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgcm9sZT1cInRhYnBhbmVsXCIgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cImhvbWVcIj5cclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0Zy13cmFwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInRnLWJuNG9cIiBjb2xzcGFuPVwiM1wiPnt7cmVjb3JkX2RldGFpbHMucHJvZmlsZVswXS5ub219fSB7e3JlY29yZF9kZXRhaWxzLnByb2ZpbGVbMV0uZmlyc3RuYW1lfX0gPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRnLXR4Z2lcIj5CaXJ0aGRheTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRnLTZrMnRcIj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0Zy10eGdpXCI+QWdlPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGctNmsydFwiPnt7cmVjb3JkX2RldGFpbHMuYWdlfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGctdHhnaVwiPkNvdW50cnk8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0Zy02azJ0XCI+e3tyZWNvcmRfZGV0YWlscy5wcm9maWxlWzRdLmNvdW50cnl9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRnLXR4Z2lcIj5DaXR5PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGctNmsydFwiPnt7cmVjb3JkX2RldGFpbHMucHJvZmlsZVs1XS5jaXR5fX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwidGcteXc0bFwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1lYXJwaG9uZVwiPiB7e3JlY29yZF9kZXRhaWxzLnByb2ZpbGVbMl0ucGhvbmV9fTwvc3Bhbj48L3RoPjx0ZCBjbGFzcz1cInRnLXR4Z2lcIj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0Zy15dzRsXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWVudmVsb3BlXCI+IHt7cmVjb3JkX2RldGFpbHMucHJvZmlsZVszXS5lbWFpbH19PC9zcGFuPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgPCEtLTx0cj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLXR4Z2lcIj5Qb3J0ZXM8L3RkPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHRkIGNsYXNzPVwidGctNmsydFwiPnt7cmVjb3JkX2RldGFpbHMubmJwb3J0ZXNTZWxlY3RlZH19PC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICA8IS0tLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8IS0tPHRyPiAgICAgIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHRkIGNvbHNwYW49XCI0XCI+PC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPCEtLS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPCEtLTx0cj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0aCBjbGFzcz1cInRnLXl3NGxcIiBhbGlnbj1cImNlbnRlclwiICBjb2xzcGFuPVwiM1wiPnt7cmVjb3JkX2RldGFpbHMucHJvZmlsZVswXS5ub219fTwvdGg+IC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHRoIGNsYXNzPVwidGcteXc0bFwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1lYXJwaG9uZVwiPiB7e3JlY29yZF9kZXRhaWxzLnByb2ZpbGVbMl0udGVsfX08L3NwYW4+PC90aD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8IS0tPHRyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHRkIGNsYXNzPVwidGctdHhnaVwiICBjb2xzcGFuPVwiM1wiPkNvZGUgUG9zdGFsIHt7cmVjb3JkX2RldGFpbHMucHJvZmlsZVsxXS5hZHJlc3NlfX08L3RkPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLS0tPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvdHI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8IS0tPHRyPjx0ZCBjb2xzcGFuPVwiNFwiPjwvdGQ+PC90cj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS08dHI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLXR4Z2lcIj5WYWxldXIgY2F0YWxvZ3VlPC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLTZrMnRcIiAqbmdJZj1cImRldGFpbHNcIiA+e3t0ZWNoX2RldGFpbHMucHJpeH19PC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0cj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLXR4Z2lcIiAqbmdJZj1cInJlY29yZF9kZXRhaWxzLnByZW1pZXJlX21haW4gPT0gJ09VSSdcIj5QcmVtacOocmUgbWFpbjwvdGQ+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy10eGdpXCIgKm5nSWY9XCJyZWNvcmRfZGV0YWlscy5wcmVtaWVyZV9tYWluID09ICdOT04nXCI+U2Vjb25kZSBtYWluPC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLTZrMnRcIiA+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW9rXCI+PC9zcGFuPjwvdGQ+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy10eGdpXCIgKm5nSWY9XCJyZWNvcmRfZGV0YWlscy5pbXBvcnQgPT0gJ09VSSdcIj5JbXBvcnTDqTwvdGQ+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy02azJ0XCIgKm5nSWY9XCJyZWNvcmRfZGV0YWlscy5pbXBvcnQgPT0gJ09VSSdcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tb2tcIj48L3NwYW4+PC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPCEtLTx0cj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLXR4Z2lcIiA+Q2zDqXM8L3RkPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHRkIGNsYXNzPVwidGctNmsydFwiID57e3JlY29yZF9kZXRhaWxzLmNsZX19PC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLXR4Z2lcIiAqbmdJZj1cInJlY29yZF9kZXRhaWxzLmNhcm5ldCA9PSAnT1VJJ1wiPkNhcm5ldCBkJ2VudHJldGllbjwvdGQ+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy02azJ0XCIgKm5nSWY9XCJyZWNvcmRfZGV0YWlscy5jYXJuZXQgPT0gJ09VSSdcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tb2tcIj48L3NwYW4+PC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPCEtLTwvdHI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx0ciAqbmdJZj1cInJlY29yZF9kZXRhaWxzLm9wdGlvbnNfdm9pdHVyZS5sZW5ndGggPiAwXCI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy10eGdpXCI+T3B0aW9uczwvdGQ+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy02azJ0XCIgY29sc3Bhbj1cIjNcIj4gPHVsIGNsYXNzPVwiaXRlbXNcIj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08bGkgKm5nRm9yPVwibGV0IG9wdGlvbnNfdm9pdHVyZSBvZiByZWNvcmRfZGV0YWlscy5vcHRpb25zX3ZvaXR1cmVcIj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0te3tvcHRpb25zX3ZvaXR1cmV9fSAgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPC9saT4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvdWw+PC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwhLS0gTk9URVMgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgcm9sZT1cInRhYnBhbmVsXCIgY2xhc3M9XCJ0YWItcGFuZVwiIGlkPVwibm90ZXNcIiA+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjEwMFwiIGNvbHM9XCI1MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3JlY29yZF9kZXRhaWxzLmFnZSB9fVxyXG4gICAgICAgICAgICAgICAgPC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tLS0+XHJcbiAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tLS0+XHJcbiAgICAgICAgICAgIDwhLS0mbHQ7ISZuZGFzaDsgSU5GT1MgQ09OVEFDVCZuZGFzaDsmZ3Q7LS0+XHJcbiAgICAgICAgICAgIDwhLS08ZGl2IHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmVcIiBpZD1cImNvbnRhY3RcIj4tLT5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInRnLXdyYXBcIj48dGFibGUgY2xhc3M9XCJ0Z1wiPi0tPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tPHRyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08dGggY2xhc3M9XCJ0Zy0wMzFlXCI+Tm9tPC90aD4tLT5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tPHRoIGNsYXNzPVwidGcteXc0bFwiPnt7cmVjb3JkX2RldGFpbHMucHJvZmlsZVswXS5ub219fTwvdGg+LS0+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tPHRyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy0wMzFlXCI+Q29kZSBQb3N0YWw8L3RkPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy15dzRsXCI+e3tyZWNvcmRfZGV0YWlscy5wcm9maWxlWzFdLmFkcmVzc2V9fTwvdGQ+LS0+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tPHRyPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy0wMzFlXCI+VMOpbMOpcGhvbmU8L3RkPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08dGQgY2xhc3M9XCJ0Zy15dzRsXCI+e3tyZWNvcmRfZGV0YWlscy5wcm9maWxlWzJdLnRlbH19PC90ZD4tLT5cclxuICAgICAgICAgICAgICAgICAgPCEtLTwvdHI+LS0+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS08dHI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLTAzMWVcIj5FbWFpbDwvdGQ+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLTx0ZCBjbGFzcz1cInRnLXl3NGxcIj57e3JlY29yZF9kZXRhaWxzLnByb2ZpbGVbM10uZW1haWx9fTwvdGQ+LS0+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS08L3RyPi0tPlxyXG4gICAgICAgICAgICAgICAgPCEtLTwvdGFibGU+PC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLS0tPlxyXG4gICAgICAgICAgICA8IS0tPC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8IS0tLS0+XHJcbiAgICAgICAgICAgIDwhLS0mbHQ7ISZuZGFzaDsgUEhPVE9TIFZFSElDVUxFICZuZGFzaDsmZ3Q7LS0+XHJcbiAgICAgICAgICAgIDwhLS08ZGl2IHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmVcIiBpZD1cInBob3Rvc1wiICpuZ0lmPVwiaW1hZ2VzX3RvX3Nob3dcIj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08aW1nIGNsYXNzPVwiaW1nLXRodW1ibmFpbFwiICBzcmM9XCJ7e3JlY29yZF9kZXRhaWxzLmZpbGVEZXRhaWxzWzBdLmZpbGVfdXJsfX1cIiB3aWR0aD1cIjQ4MFwiIGhlaWdodD1cIjMyMFwiPi0tPlxyXG4gICAgICAgICAgICAgICAgPCEtLTxicj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCJ7e3JlY29yZF9kZXRhaWxzLmZpbGVEZXRhaWxzWzFdLmZpbGVfdXJsfX1cIiB3aWR0aD1cIjQ4MFwiIGhlaWdodD1cIjMyMFwiPi0tPlxyXG4gICAgICAgICAgICAgICAgPCEtLS0tPlxyXG4gICAgICAgICAgICAgICAgPCEtLTxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cInt7cmVjb3JkX2RldGFpbHMuZmlsZURldGFpbHNbMl0uZmlsZV91cmx9fVwiIHdpZHRoPVwiNDgwXCIgaGVpZ2h0PVwiMzIwXCI+LS0+XHJcbiAgICAgICAgICAgICAgICA8IS0tPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwie3tyZWNvcmRfZGV0YWlscy5maWxlRGV0YWlsc1szXS5maWxlX3VybH19XCIgd2lkdGg9XCI0ODBcIiBoZWlnaHQ9XCIzMjBcIj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCJ7e3JlY29yZF9kZXRhaWxzLmZpbGVEZXRhaWxzWzRdLmZpbGVfdXJsfX1cIiB3aWR0aD1cIjQ4MFwiIGhlaWdodD1cIjMyMFwiPi0tPlxyXG4gICAgICAgICAgICA8IS0tPC9kaXY+LS0+XHJcblxyXG4gICAgICAgICAgICA8IS0tJmx0OyEmbmRhc2g7IElORk8gQURNSU5JU1RSQVRJVkVTJm5kYXNoOyZndDstLT5cclxuICAgICAgICAgICAgPCEtLTxkaXYgcm9sZT1cInRhYnBhbmVsXCIgY2xhc3M9XCJ0YWItcGFuZVwiIGlkPVwiYWRtaW5cIj4gICAgICAgICAgLS0+XHJcbiAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInJvd1wiPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiY29sLW1kLTZcIj46IHt7cmVjb3JkX2RldGFpbHMucHJlbWllcmVfbWFpbn19PC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJjb2wtbWQtNlwiPkltcG9ydMOpOiB7e3JlY29yZF9kZXRhaWxzLmltcG9ydH19PC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICA8IS0tPC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICA8IS0tLS0+XHJcbiAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInJvd1wiPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiY29sLW1kLTZcIj5DYXJuZXQgZCdlbnRyZXRpZW46IHt7cmVjb3JkX2RldGFpbHMuY2FybmV0fX08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImNvbC1tZC02XCI+Q2zDqXM6IHt7cmVjb3JkX2RldGFpbHMuY2xlfX08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS0tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicm93XCIgKm5nSWY9XCJyZWNvcmRfZGV0YWlscy5yb3VsZSA9PSAnTk9OJ1wiPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2ICpuZ0lmPVwicmVjb3JkX2RldGFpbHMuYWNjaWRlbnQgPT0gT1VJXCI+IC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tVsOpaGljdWxlIGFjY2lkZW50w6k8YnI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1SYWlzb246IHt7cmVjb3JkX2RldGFpbHMuYWNjaWRlbnR9fS0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxyXG4gICAgICAgICAgICA8IS0tLS0+XHJcbiAgICAgICAgICAgIDwhLS0mbHQ7ISZuZGFzaDsgSU5GTyBURUNITklRVUVTICZuZGFzaDsmZ3Q7LS0+XHJcbiAgICAgICAgICAgIDwhLS08ZGl2IHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmVcIiBpZD1cInRlY2hcIj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicm93XCI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJjb2wtbWQtNlwiPjoge3tyZWNvcmRfZGV0YWlscy5wcmVtaWVyZV9tYWlufX08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImNvbC1tZC02XCI+SW1wb3J0w6k6IHt7cmVjb3JkX2RldGFpbHMuaW1wb3J0fX08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgIDwhLS0tLT5cclxuICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicm93XCI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJjb2wtbWQtNlwiPkNhcm5ldCBkJ2VudHJldGllbjoge3tyZWNvcmRfZGV0YWlscy5jYXJuZXR9fTwvZGl2Pi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiY29sLW1kLTZcIj5DbMOpczoge3tyZWNvcmRfZGV0YWlscy5jbGV9fTwvZGl2Pi0tPlxyXG4gICAgICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPCEtLS0tPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICA8L2Rpdj5cclxuYFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbGxldERldGFpbHNDb21wb25lbnQge1xyXG5cclxuICAgIC8vIHJvdXRlciA9IG5ldyBSb3V0ZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdGVwU2VydmljZTogU3RlcFNlcnZpY2UsIHByaXZhdGUgX2dyaWRTZXJ2aWNlOiBHcmlkUGFuZWxTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfYmFsbGV0RGV0YWlsc1NlcnZpY2U6IEJhbGxldERldGFpbHNTZXJ2aWNlLHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9odHRwOiBIdHRwKXt9XHJcbiAgICByZWNvcmRfZGV0YWlscztcclxuICAgIHRlY2hfZGV0YWlscztcclxuICAgIHByaXZhdGUgc3ViOiBhbnk7XHJcbiAgICBvYmpfaWQ7XHJcbiAgICBsaXN0X29wdGlvbnM9IFtdO1xyXG5cclxuICAgIGRpc3BsYXkgPSBmYWxzZTtcclxuICAgIGRldGFpbHMgPSBmYWxzZTtcclxuXHJcbiAgICBpbWFnZXNfdG9fc2hvdyA9IGZhbHNlO1xyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqX2lkID0gcGFyYW1zWydyZWNvcmQnXTsgLy8gKCspIGNvbnZlcnRzIHN0cmluZyAnaWQnIHRvIGEgbnVtYmVyXHJcblxyXG4gICAgICAgICAgICAvLyBJbiBhIHJlYWwgYXBwOiBkaXNwYXRjaCBhY3Rpb24gdG8gbG9hZCB0aGUgZGV0YWlscyBoZXJlLlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgY29uc29sZS5sb2codGhpcy5vYmpfaWQpXHJcblxyXG4gICAgICAgIHRoaXMuX2JhbGxldERldGFpbHNTZXJ2aWNlLmdldERhdGFzKHRoaXMub2JqX2lkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRfZGV0YWlscyA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgKVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICBnb1RvQ3VycmVudFN0ZXAoaXRlbSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbSk7XHJcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7ICdjdXJyZW50X2lkJzogaXRlbS5zdGVwX2lkLCAnX2lkJzogaXRlbS5faWQgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdGVwJ10sIG5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT2JqZWN0KGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gKHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KGl0ZW0pICYmIGl0ZW0gIT09IG51bGwpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==