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
var grid_service_1 = require("./grid.service");
var router_1 = require('@angular/router');
var step_service_1 = require("../Engine/step.service");
var http_1 = require("@angular/http");
var GridPanelComponent = (function () {
    function GridPanelComponent(_stepService, _gridService, router, route, _http) {
        this._stepService = _stepService;
        this._gridService = _gridService;
        this.router = router;
        this.route = route;
        this._http = _http;
        this.display = false;
        this.myListData = [];
        this.keysName = [];
        this.showInput = [];
        this.filterActivated = false;
        this.master = "";
    }
    GridPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.grid_name = this.route.snapshot.queryParams["grid_name"];
        this.master = this.route.snapshot.queryParams["master"];
        console.log(this.master);
        if (this.master != '') {
            this._gridService.getDatas(this.grid_name, this.master)
                .subscribe(function (data) {
                console.log(data);
                console.log(_this._gridService);
            }, function (error) { return console.log(error); });
        }
        else {
            this._gridService.getDatas(this.grid_name, '')
                .subscribe(function (data) {
                console.log(data);
                console.log(_this._gridService);
            }, function (error) { return console.log(error); });
        }
        for (var i = 0; i < this._gridService.colTitle.length; i++) {
            this.showInput.push(false);
        }
        this.myListData = this._gridService.dataGrid;
        this.keysName = this._gridService.keysName;
        console.log(this._gridService.keysName);
        console.log(this._gridService);
        this.display = true;
    };
    GridPanelComponent.prototype.goToCurrentStep = function (item) {
        console.log(item);
        var navigationExtras = {
            queryParams: { 'current_id': item.step_id, '_id': item._id }
        };
        this.router.navigate(['/step'], navigationExtras);
    };
    GridPanelComponent.prototype.isObject = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    };
    GridPanelComponent.prototype.showFilterInput = function (idx) {
        if (this.showInput[idx] == true) {
            this.showInput[idx] = false;
        }
        else {
            this.showInput[idx] = true;
        }
    };
    GridPanelComponent.prototype.checkUndefined = function (value) {
        console.log(value);
        console.log(typeof value === 'undefined');
        return (typeof value === 'undefined');
    };
    GridPanelComponent.prototype.updateCheckBox = function ($event, item) {
        var value = $event.target.checked;
        console.log(item);
        console.log(this.master);
        this._gridService.updateCheckbox(value, item._id, this.master)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    GridPanelComponent.prototype.filter = function (event) {
        console.log(event.target);
        console.log("passe par grid cmp");
        console.log(event);
        console.log(this._gridService.dataGrid);
        this._gridService.filterData(event.target.value, event.srcElement.id);
    };
    GridPanelComponent = __decorate([
        core_1.Component({
            selector: 'grid-panel',
            template: "\n             \n               \n               \n               <div class=\"panel-heading panel-heading-custom\" align=\"center\">\n                 <div  class=\"row\" align=\"left\">\n                  <div class=\"col-md-2\">\n                    <nav class=\"form-navArrow\">\n                       <!--<a [routerLink]=\"['/menu']\" [queryParams]=\"{'firstLoad': false}\">-->\n                       <a [routerLink]=\"['/']\" >\n                           <button class=\"btn btn-warning\"><i class=\"glyphicon glyphicon-triangle-left\" ></i>BACK</button></a>\n                    </nav>\n                  </div>\n                 <div class=\"col-md-10\" align=\"center\">\n                     <h2 *ngIf=\"master != ''\">{{master}}</h2>\n                     <h3>{{grid_name}}</h3>\n                 </div>\n               </div>\n               </div>\n                <div class=\"panel-body\">\n               <div class=\"table-responsive\" *ngIf=\"display\">\n                    <table class=\"table table-hover table-condensed\"  >\n                        <tr>\n                            <th *ngFor=\"let obj of _gridService.colTitle;let i = index\">\n                                <div >{{obj.title}}&nbsp; \n                                    <button *ngIf=\"obj.filterable\" \n                                        class=\"glyphicon glyphicon-filter\" \n                                        type=\"button\" \n                                        (click)=\"showFilterInput(i)\">\n                                    </button>\n                                    <br>\n                                    <input   \n                                        *ngIf=\"obj.filterable && showInput[i]\"\n                                        myAutofocus=\"true\"\n                                        type=\"text\" \n                                        id=\"{{obj.key}}\"\n                                        name=\"{{obj.key}}\"\n                                        (keyup)=\"filter($event)\"\n                                     >\n                                     <br>\n                                     \n                                </div>\n\n                            </th>\n                            \n                        </tr>\n                        <tr *ngFor=\"let item of _gridService.dataGrid;let j = index\">\n                            <td *ngFor=\"let key of _gridService.keysName;let i = index\" align=\"center\">\n                                                     \n                                <span *ngIf=\"!filterActivated && _gridService.colTitle[i].type != 'checkbox' \"> {{item[key]}}  </span>\n                                \n                                <span *ngIf=\"this._gridService.colTitle[i].type == 'checkbox' \"> \n                                    <input *ngIf=\"item[key]\" type=\"checkbox\" value=\"{{item[key]}}\" checked (change)=updateCheckBox($event,item) /> \n                                    <input *ngIf=\"item[key] == false\" type=\"checkbox\" value=\"{{item[key]}}\" (change)=updateCheckBox($event,item) /> \n                                </span>\n                            </td>\n                            \n                            <td *ngIf=\"_stepService.steps[0].master_name == 'ballet'\">\n                                <a [routerLink]=\"['/editStudent', item._id] \"> \n                                    <button class=\"btn btn-primary\" type=\"button\" > \n                                        <i class=\"glyphicon glyphicon-edit\"> </i>\n                                    </button>\n                                </a> \n                            </td>\n\n                            \n                            <!--*ngIf=\"item.group_mgt\"-->\n                            <td *ngIf=\"_stepService.steps[0].master_name == 'ballet'\" >\n                                <a [routerLink]=\"['/groupManagement', item._id, grid_name, valeur] \">\n                                    <button class=\"btn btn-primary\" type=\"button\">{{item.stage}} Group </button>\n                                </a> \n                            </td>\n                            <!-- IF DETAILS IS ACTIVATED IN GRID CONFIG COLLECTION -->\n                            <td *ngIf=\"item.details.activated\">\n                                <a [routerLink]=\"['/details', item._id] \">\n                                    <button class=\"btn btn-primary\" type=\"button\"> Detail </button>\n                                </a> \n                            </td>\n                            <!-- MODAL <td *ngIf=\"item.details.activated\"><button class=\"btn btn-success\" type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\">DETAIL </button></td>-->\n                            \n                            <!--IF WORKFLOW TYPE BTN TO GO BACK TO CURRENT STEP -->\n                            <td *ngIf=\"this._stepService.steps[0].master_type == 'workflow'\"> <button class=\"btn btn-success\" type=\"button\" (click)=\"goToCurrentStep(item)\" value=\"{{item.step_id}} \">Current step </button></td>\n                        \n                            <!--<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">-->\n  <!---->\n                          <!--<div *ngIf=\"item.details.activated\" class=\"modal-dialog\" role=\"document\">-->\n                            <!--<div class=\"modal-content\">-->\n                              <!--<div class=\"modal-header\">-->\n                                <!--<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>-->\n                                <!--<h4 class=\"modal-title\" id=\"myModalLabel\"></h4>-->\n                              <!--</div>-->\n                              <!--<div class=\"modal-body\">-->\n                                <!--BODY ICI {{item.detail[0].power}}-->\n                                <!--<br> {{key}} <br>{{_gridService.keysName_details[0]}}-->\n                                <!--<div *ngFor=\"let fields of _gridService.keysName_details\">-->\n                                    <!--{{fields}}-->\n                                    <!--&lt;!&ndash;l&ndash;&gt;-->\n                                    <!--&lt;!&ndash;{{fields[0].power}}&ndash;&gt;-->\n                                <!--&lt;!&ndash;&ndash;&gt;-->\n                                <!--</div>-->\n                                <!---->\n                              <!--</div>-->\n                              <!--<div class=\"modal-footer\">-->\n                                <!--<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>-->\n                                <!--<button type=\"button\" class=\"btn btn-primary\">Save changes</button>-->\n                              <!--</div>-->\n                            <!--</div>-->\n                          <!--</div>-->\n                        <!--</div>-->\n                        </tr>\n                        \n                    </table>\n                </div>\n               \n            </div>\n            <!-- Modal -->\n\n    "
        }), 
        __metadata('design:paramtypes', [step_service_1.StepService, grid_service_1.GridPanelService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _c) || Object])
    ], GridPanelComponent);
    return GridPanelComponent;
    var _a, _b, _c;
}());
exports.GridPanelComponent = GridPanelComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFxRCxlQUNyRCxDQUFDLENBRG1FO0FBQ3BFLDZCQUErQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2hELHVCQUF1RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pFLDZCQUEwQix3QkFBd0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUFtQixlQUFlLENBQUMsQ0FBQTtBQTJIbEM7SUFHRyw0QkFBb0IsWUFBeUIsRUFBVSxZQUE4QixFQUFVLE1BQWMsRUFDekYsS0FBcUIsRUFBVSxLQUFXO1FBRDFDLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN6RixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFFOUQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRWhCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsV0FBTSxHQUFHLEVBQUUsQ0FBQztJQVJvRCxDQUFDO0lBVWpFLHFDQUFRLEdBQVI7UUFBQSxpQkFtQ0g7UUFqQ08sSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQSxD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LEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsZ29PQXFIVDtTQUNKLENBQUM7OzBCQUFBO0lBNEdGLHlCQUFDOztBQUFELENBMUdDLEFBMEdBLElBQUE7QUExR2EsMEJBQWtCLHFCQTBHL0IsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2dyaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7R3JpZFBhbmVsU2VydmljZX0gZnJvbSBcIi4vZ3JpZC5zZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1N0ZXBTZXJ2aWNlfSBmcm9tIFwiLi4vRW5naW5lL3N0ZXAuc2VydmljZVwiO1xuaW1wb3J0IHtIdHRwfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdncmlkLXBhbmVsJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nIHBhbmVsLWhlYWRpbmctY3VzdG9tXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgPGRpdiAgY2xhc3M9XCJyb3dcIiBhbGlnbj1cImxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bmF2IGNsYXNzPVwiZm9ybS1uYXZBcnJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGEgW3JvdXRlckxpbmtdPVwiWycvbWVudSddXCIgW3F1ZXJ5UGFyYW1zXT1cInsnZmlyc3RMb2FkJzogZmFsc2V9XCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnLyddXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4td2FybmluZ1wiPjxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmlhbmdsZS1sZWZ0XCIgPjwvaT5CQUNLPC9idXR0b24+PC9hPlxuICAgICAgICAgICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEwXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgIDxoMiAqbmdJZj1cIm1hc3RlciAhPSAnJ1wiPnt7bWFzdGVyfX08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgPGgzPnt7Z3JpZF9uYW1lfX08L2gzPlxuICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1yZXNwb25zaXZlXCIgKm5nSWY9XCJkaXNwbGF5XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyIHRhYmxlLWNvbmRlbnNlZFwiICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBvYmogb2YgX2dyaWRTZXJ2aWNlLmNvbFRpdGxlO2xldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA+e3tvYmoudGl0bGV9fSZuYnNwOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJvYmouZmlsdGVyYWJsZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1maWx0ZXJcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNob3dGaWx0ZXJJbnB1dChpKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIm9iai5maWx0ZXJhYmxlICYmIHNob3dJbnB1dFtpXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlBdXRvZm9jdXM9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwie3tvYmoua2V5fX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ7e29iai5rZXl9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwKT1cImZpbHRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9ncmlkU2VydmljZS5kYXRhR3JpZDtsZXQgaiA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBrZXkgb2YgX2dyaWRTZXJ2aWNlLmtleXNOYW1lO2xldCBpID0gaW5kZXhcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZmlsdGVyQWN0aXZhdGVkICYmIF9ncmlkU2VydmljZS5jb2xUaXRsZVtpXS50eXBlICE9ICdjaGVja2JveCcgXCI+IHt7aXRlbVtrZXldfX0gIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidGhpcy5fZ3JpZFNlcnZpY2UuY29sVGl0bGVbaV0udHlwZSA9PSAnY2hlY2tib3gnIFwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cIml0ZW1ba2V5XVwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwie3tpdGVtW2tleV19fVwiIGNoZWNrZWQgKGNoYW5nZSk9dXBkYXRlQ2hlY2tCb3goJGV2ZW50LGl0ZW0pIC8+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiaXRlbVtrZXldID09IGZhbHNlXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJ7e2l0ZW1ba2V5XX19XCIgKGNoYW5nZSk9dXBkYXRlQ2hlY2tCb3goJGV2ZW50LGl0ZW0pIC8+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nSWY9XCJfc3RlcFNlcnZpY2Uuc3RlcHNbMF0ubWFzdGVyX25hbWUgPT0gJ2JhbGxldCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWycvZWRpdFN0dWRlbnQnLCBpdGVtLl9pZF0gXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiA+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1lZGl0XCI+IDwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tKm5nSWY9XCJpdGVtLmdyb3VwX21ndFwiLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0lmPVwiX3N0ZXBTZXJ2aWNlLnN0ZXBzWzBdLm1hc3Rlcl9uYW1lID09ICdiYWxsZXQnXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJy9ncm91cE1hbmFnZW1lbnQnLCBpdGVtLl9pZCwgZ3JpZF9uYW1lLCB2YWxldXJdIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIj57e2l0ZW0uc3RhZ2V9fSBHcm91cCA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gSUYgREVUQUlMUyBJUyBBQ1RJVkFURUQgSU4gR1JJRCBDT05GSUcgQ09MTEVDVElPTiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nSWY9XCJpdGVtLmRldGFpbHMuYWN0aXZhdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL2RldGFpbHMnLCBpdGVtLl9pZF0gXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiPiBEZXRhaWwgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIE1PREFMIDx0ZCAqbmdJZj1cIml0ZW0uZGV0YWlscy5hY3RpdmF0ZWRcIj48YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNteU1vZGFsXCI+REVUQUlMIDwvYnV0dG9uPjwvdGQ+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLUlGIFdPUktGTE9XIFRZUEUgQlROIFRPIEdPIEJBQ0sgVE8gQ1VSUkVOVCBTVEVQIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cInRoaXMuX3N0ZXBTZXJ2aWNlLnN0ZXBzWzBdLm1hc3Rlcl90eXBlID09ICd3b3JrZmxvdydcIj4gPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZ29Ub0N1cnJlbnRTdGVwKGl0ZW0pXCIgdmFsdWU9XCJ7e2l0ZW0uc3RlcF9pZH19IFwiPkN1cnJlbnQgc3RlcCA8L2J1dHRvbj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCIgaWQ9XCJteU1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJteU1vZGFsTGFiZWxcIj4tLT5cbiAgPCEtLS0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiAqbmdJZj1cIml0ZW0uZGV0YWlscy5hY3RpdmF0ZWRcIiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIGlkPVwibXlNb2RhbExhYmVsXCI+PC9oND4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tQk9EWSBJQ0kge3tpdGVtLmRldGFpbFswXS5wb3dlcn19LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08YnI+IHt7a2V5fX0gPGJyPnt7X2dyaWRTZXJ2aWNlLmtleXNOYW1lX2RldGFpbHNbMF19fS0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiAqbmdGb3I9XCJsZXQgZmllbGRzIG9mIF9ncmlkU2VydmljZS5rZXlzTmFtZV9kZXRhaWxzXCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0te3tmaWVsZHN9fS0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSZsdDshJm5kYXNoO2wmbmRhc2g7Jmd0Oy0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSZsdDshJm5kYXNoO3t7ZmllbGRzWzBdLnBvd2VyfX0mbmRhc2g7Jmd0Oy0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tJmx0OyEmbmRhc2g7Jm5kYXNoOyZndDstLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gTW9kYWwgLS0+XG5cbiAgICBgXG59KVxuXG4gZXhwb3J0IGNsYXNzIEdyaWRQYW5lbENvbXBvbmVudCB7XG5cbiAgIC8vIHJvdXRlciA9IG5ldyBSb3V0ZXI7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc3RlcFNlcnZpY2U6IFN0ZXBTZXJ2aWNlLCBwcml2YXRlIF9ncmlkU2VydmljZTogR3JpZFBhbmVsU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfaHR0cDogSHR0cCl7fVxuXG4gICAgZGlzcGxheSA9IGZhbHNlO1xuICAgIG15TGlzdERhdGEgPSBbXTsvLyA9ICB0aGlzLl9ncmlkU2VydmljZS5kYXRhR3JpZDtcbiAgICBncmlkX25hbWU7XG4gICAga2V5c05hbWUgPSBbXTtcbiAgICBzaG93SW5wdXQgPSBbXTtcbiAgICBmaWx0ZXJBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICBtYXN0ZXIgPSBcIlwiO1xuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5ncmlkX25hbWUgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zW1wiZ3JpZF9uYW1lXCJdO1xuICAgICAgICB0aGlzLm1hc3RlciA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbXCJtYXN0ZXJcIl07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFzdGVyKVxuICAgICAgICBpZih0aGlzLm1hc3RlciAhPSAnJyl7XG4gICAgICAgICAgICB0aGlzLl9ncmlkU2VydmljZS5nZXREYXRhcyh0aGlzLmdyaWRfbmFtZSwgdGhpcy5tYXN0ZXIpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9ncmlkU2VydmljZSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ3JpZFNlcnZpY2UuZ2V0RGF0YXModGhpcy5ncmlkX25hbWUsICcnKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2dyaWRTZXJ2aWNlKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZ3JpZFNlcnZpY2UuY29sVGl0bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0lucHV0LnB1c2goZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5teUxpc3REYXRhID0gdGhpcy5fZ3JpZFNlcnZpY2UuZGF0YUdyaWQ7XG4gICAgICAgIHRoaXMua2V5c05hbWUgPSB0aGlzLl9ncmlkU2VydmljZS5rZXlzTmFtZTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9ncmlkU2VydmljZS5rZXlzTmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2dyaWRTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblxufVxuICAgIGdvVG9DdXJyZW50U3RlcChpdGVtKXtcbiAgICAgICAgY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHsgJ2N1cnJlbnRfaWQnOiBpdGVtLnN0ZXBfaWQsICdfaWQnOiBpdGVtLl9pZCB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdGVwJ10sIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgIH1cblxuICAgIGlzT2JqZWN0KGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgaXRlbSA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShpdGVtKSAmJiBpdGVtICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICBzaG93RmlsdGVySW5wdXQoaWR4KXtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0lucHV0W2lkeF0gPT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaG93SW5wdXRbaWR4XSA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2hvd0lucHV0W2lkeF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tVbmRlZmluZWQodmFsdWUpe1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVDaGVja0JveCgkZXZlbnQsIGl0ZW0pe1xuICAgICAgIC8vIGxldCB2YWx1ZSA9ICRldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICBsZXQgdmFsdWUgPSRldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgY29uc29sZS5sb2coaXRlbSlcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tYXN0ZXIpXG4gICAgICAgIHRoaXMuX2dyaWRTZXJ2aWNlLnVwZGF0ZUNoZWNrYm94KHZhbHVlLGl0ZW0uX2lkLHRoaXMubWFzdGVyKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgKVxuICAgICAgLy8gY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgLy8gIGNvbnNvbGUubG9nKHZhbDIpO1xuXG4gICAgfVxuXG4gICAgZmlsdGVyKGV2ZW50OiBhbnkpe1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgICAgICAvL2lmIChldmVudC50YXJnZXQudmFsdWUgPT0nJyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGFzc2UgcGFyIGdyaWQgY21wXCIpO1xuICAgICAgICAgICAgLy99ZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4gX2dyaWRTZXJ2aWNlLmRhdGFHcmlkKTtcbiAgICAgICAgdGhpcy5fZ3JpZFNlcnZpY2UuZmlsdGVyRGF0YShldmVudC50YXJnZXQudmFsdWUsIGV2ZW50LnNyY0VsZW1lbnQuaWQpO31cbiAgICAgICAgLy8gIHRoaXMuZmlsdGVyQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAvL31cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
