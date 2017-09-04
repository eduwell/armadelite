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
var core_1 = require("@angular/core");
var global_1 = require("../global");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var GridPanelService = (function () {
    function GridPanelService(_http) {
        this._http = _http;
        this.dataGrid = [];
        this.keysName = [];
        this.colTitle = [];
        this.keysName_details = [];
        this.colTitle_details = [];
        this.originalData = this.dataGrid;
    }
    GridPanelService.prototype.getDatas = function (grid_name, valeur) {
        var _this = this;
        this.dataGrid = [];
        this.keysName = [];
        this.colTitle = [];
        var query = "grid_name=" + grid_name + "&filter=" + valeur;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var completeUrl = global_1.GlobalVariable.BASE_URL + 'data_grid?' + query;
        return this._http.get(completeUrl)
            .map(function (response) {
            var data = response.json();
            console.log(data);
            console.log(data[0].config);
            console.log(data[0].config_details);
            for (var i in data[0].config) {
                console.log(data[0].config[i]);
                var result = "";
                if (typeof data[0].config[i].field_panel_name != 'undefined') {
                    for (var q in data[0].config[i].field_panel_values) {
                        _this.keysName.push(data[0].config[i].field_panel_name + '_' + data[0].config[i].field_panel_values[q].data);
                        var objColTitle = {};
                        objColTitle.title = data[0].config[i].field_panel_values[q].title;
                        objColTitle.key = data[0].config[i].field_panel_name + '_' + data[0].config[i].field_panel_values[q].data;
                        objColTitle.type = "field_panel";
                        ;
                        if (typeof (data[0].config[i].field_panel_values[q].filterable) != 'undefined') {
                            objColTitle.filterable = true;
                        }
                        _this.colTitle.push(objColTitle);
                    }
                }
                else if (typeof data[0].config[i].type != 'undefined') {
                    switch (data[0].config[i].type) {
                        case 'checkbox': {
                            _this.keysName.push(data[0].config[i].data);
                            _this.colTitle.push({ "title": data[0].config[i].title, "key": data[0].config[i].data, "type": "checkbox" });
                            break;
                        }
                    }
                }
                else {
                    _this.keysName.push(data[0].config[i].data);
                    _this.colTitle.push({ "title": data[0].config[i].title, "key": data[0].config[i].data, "type": "value" });
                }
            }
            for (var i_1 in data[0].config_details) {
                switch (data[0].config_details[i_1].type) {
                    case 'file_details': {
                        _this.keysName_details.push(data[0].config_details[i_1].file_name);
                        _this.colTitle_details.push({ "title": data[0].config_details[i_1].label, "key": data[0].config_details[i_1].file_name, "type": "file" });
                        break;
                    }
                    case 'field': {
                        _this.keysName_details.push(data[0].config_details[i_1].data);
                        _this.colTitle_details.push({ "title": data[0].config_details[i_1].label, "key": data[0].config_details[i_1].data, "type": "field", "editable": data[0].config_details[i_1].editable });
                    }
                }
            }
            data.shift();
            console.log(_this.keysName);
            console.log(_this.colTitle);
            _this.dataGrid = data;
            _this.originalData = _this.dataGrid;
            return 'ok';
        })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    GridPanelService.prototype.getActivatedGrids = function (master_name) {
        var body = JSON.stringify({ "master": master_name });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var completeUrl = global_1.GlobalVariable.BASE_URL + 'get_grids';
        return this._http.post(completeUrl, body, { headers: headers })
            .toPromise().then(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    GridPanelService.prototype.filterParNom = function (obj, arg) {
        console.log(obj);
        console.log(arg);
        console.log(this);
        var key = this.key;
        var value = this.value;
        console.log(key);
        console.log(value);
        console.log(obj[key]);
        if (value.indexOf(obj[key]) >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    GridPanelService.prototype.filterData = function (value, key) {
        console.log(value);
        if (value == '') {
            this.dataGrid = this.originalData;
        }
        else {
            var result = this.dataGrid.filter(this.filterParNom, { "key": key, "value": value });
            console.log(result);
            if (result.length > 0) {
                this.dataGrid = result;
            }
            else {
                this.dataGrid = this.originalData;
            }
        }
    };
    GridPanelService.prototype.updateCheckbox = function (value, _id, master) {
        console.log(master);
        var body = JSON.stringify({ "value": value, "_id": _id, "master": master });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var completeUrl = global_1.GlobalVariable.BASE_URL + 'update_checkbox';
        return this._http.post(completeUrl, body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    GridPanelService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], GridPanelService);
    return GridPanelService;
    var _a;
}());
exports.GridPanelService = GridPanelService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZ3JpZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFFekMsdUJBQStCLFdBQVcsQ0FBQyxDQUFBO0FBQzNDLHFCQUE0QyxlQUFlLENBQUMsQ0FBQTtBQUM1RCwyQkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUk3QztJQUVJLDBCQUFxQixLQUFXO1FBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNoQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLGlCQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQU5NLENBQUM7SUFRcEMsbUNBQVEsR0FBUixVQUFTLFNBQVMsRUFBQyxNQUFNO1FBQXpCLGlCQW9HQztRQW5HRyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVuQixJQUFJLEtBQUssR0FBRyxZQUFZLEdBQUMsU0FBUyxHQUFDLFVBQVUsR0FBQyxNQUFNLENBQUM7UUFFckQsSUFBSSxPQUFPLEdBQUUsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksV0FBVyxHQUFHLHVCQUFjLENBQUMsUUFBUSxHQUFDLFlBQVksR0FBQyxLQUFLLENBQUM7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdB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Q0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN0QyxDQUFDO1FBQ0wsQ0FBQztJQUVMLENBQUM7SUFFRCx5Q0FBYyxHQUFkLFVBQWUsS0FBSyxFQUFDLEdBQUcsRUFBQyxNQUFNO1FBR25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFWCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFHLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBSTNFLElBQU0sT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztRQUVsRSxJQUFJLFdBQVcsR0FBRyx1QkFBYyxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztRQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQzthQUN4RCxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLEVBQVIsQ0FBUSxDQUFDO2FBQ3pCLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQWhNTDtRQUFDLGlCQUFVLEVBQUU7O3dCQUFBO0lBa01iLHVCQUFDOztBQUFELENBak1BLEFBaU1DLElBQUE7QUFqTVksd0JBQWdCLG1CQWlNNUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2dyaWQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3RlcE1vZGVsfSBmcm9tIFwiLi4vRW5naW5lL3N0ZXBNb2RlbFwiO1xuaW1wb3J0IHsgR2xvYmFsVmFyaWFibGUgfSBmcm9tIFwiLi4vZ2xvYmFsXCI7XG5pbXBvcnQge0h0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCBpbmNsdWRlcyA9IHJlcXVpcmUoXCJjb3JlLWpzL2ZuL3N0cmluZy9pbmNsdWRlc1wiKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRQYW5lbFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9XG4gICAgZGF0YUdyaWQgPSBbXTtcbiAgICBrZXlzTmFtZSA9IFtdO1xuICAgIGNvbFRpdGxlID0gW107XG4gICAga2V5c05hbWVfZGV0YWlscyA9IFtdO1xuICAgIGNvbFRpdGxlX2RldGFpbHMgPSBbXTtcbiAgICBvcmlnaW5hbERhdGEgPSB0aGlzLmRhdGFHcmlkO1xuXG4gICAgZ2V0RGF0YXMoZ3JpZF9uYW1lLHZhbGV1cil7XG4gICAgICAgIHRoaXMuZGF0YUdyaWQgPSBbXTtcbiAgICAgICAgdGhpcy5rZXlzTmFtZSA9IFtdO1xuICAgICAgICB0aGlzLmNvbFRpdGxlID0gW107XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gXCJncmlkX25hbWU9XCIrZ3JpZF9uYW1lK1wiJmZpbHRlcj1cIit2YWxldXI7XG5cbiAgICAgICAgbGV0IGhlYWRlcnM9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgdmFyIGNvbXBsZXRlVXJsID0gR2xvYmFsVmFyaWFibGUuQkFTRV9VUkwrJ2RhdGFfZ3JpZD8nK3F1ZXJ5O1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoY29tcGxldGVVcmwpXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+XG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhWzBdLmNvbmZpZyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVswXS5jb25maWdfZGV0YWlscyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhWzBdLmNvbmZpZyl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChrZXkgIT0gJ19pZCcgJiYga2V5ICE9ICdzdGVwX2lkJyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbMF0uY29uZmlnW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb3RhWzBdLmNvbmZpZ1tpXSA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgZGF0YVswXS5jb25maWdbaV0uZmllbGRfcGFuZWxfbmFtZSAhPSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcSBpbiBkYXRhWzBdLmNvbmZpZ1tpXS5maWVsZF9wYW5lbF92YWx1ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzdWx0ICs9IHAgKyBcIiAsIFwiICsgZGF0YVswXS5jb2xOYW1lc1tpXVtwXSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocCtcIl9cIitkYXRhWzBdLmNvbE5hbWVzW2ldW3BdW2pdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMua2V5c05hbWUucHVzaChwK1wiX1wiK2RhdGFbMF0uY29sTmFtZXNbaV1bcF1bal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2V5c05hbWUucHVzaChkYXRhWzBdLmNvbmZpZ1tpXS5maWVsZF9wYW5lbF9uYW1lICsgJ18nICsgZGF0YVswXS5jb25maWdbaV0uZmllbGRfcGFuZWxfdmFsdWVzW3FdLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmpDb2xUaXRsZSA9IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ29sVGl0bGUudGl0bGUgPSBkYXRhWzBdLmNvbmZpZ1tpXS5maWVsZF9wYW5lbF92YWx1ZXNbcV0udGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ29sVGl0bGUua2V5ID0gZGF0YVswXS5jb25maWdbaV0uZmllbGRfcGFuZWxfbmFtZSArICdfJyArIGRhdGFbMF0uY29uZmlnW2ldLmZpZWxkX3BhbmVsX3ZhbHVlc1txXS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iakNvbFRpdGxlLnR5cGUgPSBcImZpZWxkX3BhbmVsXCI7XG47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGF0YVswXS5jb25maWdbaV0uZmllbGRfcGFuZWxfdmFsdWVzW3FdLmZpbHRlcmFibGUpICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ29sVGl0bGUuZmlsdGVyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sVGl0bGUucHVzaChvYmpDb2xUaXRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YVswXS5jb2xOYW1lc1tpXVtwXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2orKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHR5cGVvZiBkYXRhWzBdLmNvbmZpZ1tpXS50eXBlICE9ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhWzBdLmNvbmZpZ1tpXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2V5c05hbWUucHVzaChkYXRhWzBdLmNvbmZpZ1tpXS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xUaXRsZS5wdXNoKHtcInRpdGxlXCI6IGRhdGFbMF0uY29uZmlnW2ldLnRpdGxlLCBcImtleVwiOiBkYXRhWzBdLmNvbmZpZ1tpXS5kYXRhLCBcInR5cGVcIjogXCJjaGVja2JveFwifSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtleXNOYW1lLnB1c2goZGF0YVswXS5jb25maWdbaV0uZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbFRpdGxlLnB1c2goe1widGl0bGVcIjogZGF0YVswXS5jb25maWdbaV0udGl0bGUsIFwia2V5XCI6IGRhdGFbMF0uY29uZmlnW2ldLmRhdGEsIFwidHlwZVwiOiBcInZhbHVlXCJ9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIC8vIERFVEFJTFMgREFUQVxuICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGRhdGFbMF0uY29uZmlnX2RldGFpbHMpe1xuICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhWzBdLmNvbmZpZ19kZXRhaWxzW2ldLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbGVfZGV0YWlscyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtleXNOYW1lX2RldGFpbHMucHVzaChkYXRhWzBdLmNvbmZpZ19kZXRhaWxzW2ldLmZpbGVfbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xUaXRsZV9kZXRhaWxzLnB1c2goe1widGl0bGVcIjogZGF0YVswXS5jb25maWdfZGV0YWlsc1tpXS5sYWJlbCwgXCJrZXlcIjogZGF0YVswXS5jb25maWdfZGV0YWlsc1tpXS5maWxlX25hbWUsIFwidHlwZVwiOiBcImZpbGVcIn0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZmllbGQnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2V5c05hbWVfZGV0YWlscy5wdXNoKGRhdGFbMF0uY29uZmlnX2RldGFpbHNbaV0uZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sVGl0bGVfZGV0YWlscy5wdXNoKHtcInRpdGxlXCI6IGRhdGFbMF0uY29uZmlnX2RldGFpbHNbaV0ubGFiZWwsIFwia2V5XCI6IGRhdGFbMF0uY29uZmlnX2RldGFpbHNbaV0uZGF0YSwgXCJ0eXBlXCI6IFwiZmllbGRcIiwgXCJlZGl0YWJsZVwiOiBkYXRhWzBdLmNvbmZpZ19kZXRhaWxzW2ldLmVkaXRhYmxlfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5rZXlzTmFtZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb2xUaXRsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhR3JpZCA9IGRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbERhdGEgPSB0aGlzLmRhdGFHcmlkO1xuICAgICAgICAgICAgICAgIHJldHVybiAnb2snXG4gICAgICAgICAgICB9KVxuXG5cblxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAvLyAgICAgLy8gbGV0IG9ianM6IGFueVtdID0gW107XG4gICAgICAgICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBzdGVwID0gbmV3IFN0ZXBNb2RlbChkYXRhW2ldLnN0ZXBfaWQsIGRhdGFbaV0udHlwZSwgZGF0YVtpXS5jb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgb2Jqcy5wdXNoKHN0ZXApO1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBvYmpzO1xuICAgICAgICAgICAgLy99KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IpKVxuICAgIH1cblxuICAgIGdldEFjdGl2YXRlZEdyaWRzKG1hc3Rlcl9uYW1lKXtcbiAgICAgICAgLy8gbGV0IHF1ZXJ5ID0gXCJtYXN0ZXI9XCIrbWFzdGVyX25hbWU7XG4gICAgICAgIC8vIGxldCBoZWFkZXJzPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICAvLyBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIC8vIHZhciBjb21wbGV0ZVVybCA9IEdsb2JhbFZhcmlhYmxlLkJBU0VfVVJMKydnZXRfZ3JpZHMnO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5faHR0cC5nZXQoY29tcGxldGVVcmwpXG4gICAgICAgIC8vICAgICAudG9Qcm9taXNlKCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC8vICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcikpXG5cbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XCJtYXN0ZXJcIiA6IG1hc3Rlcl9uYW1lfSk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICB2YXIgY29tcGxldGVVcmwgPSBHbG9iYWxWYXJpYWJsZS5CQVNFX1VSTCArICdnZXRfZ3JpZHMnO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KGNvbXBsZXRlVXJsLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAudG9Qcm9taXNlKCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJQYXJOb20ob2JqLCBhcmcpe1xuXG4gICAgICAgIGNvbnNvbGUubG9nKG9iaik7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgICAgIGxldCBrZXkgPSB0aGlzLmtleTtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2coa2V5KTtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhvYmpba2V5XSlcbiAgICAgICAgLy8gdmFyIHJlcyA9IHZhbHVlLm1hdGNoKC9vYmpba2V5XS9nKTtcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2Yob2JqW2tleV0pID49MClcbiAgICAgICAge3JldHVybiB0cnVlfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgLy8gaWYgKHJlcyAhPSBudWxsKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIH1cbiAgICAgICAgLy8gLy8gaWYgKG9ialtrZXldID09PSB2YWx1ZSkge1xuICAgICAgICAvLyAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvL1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhKHZhbHVlLCBrZXkpe1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgIC8vdGhpcy5vcmlnaW5hbERhdGEgPSB0aGlzLmRhdGFHcmlkO1xuICAgICAgICBpZiAodmFsdWUgPT0gJycpe1xuICAgICAgICAgICAgdGhpcy5kYXRhR3JpZCA9IHRoaXMub3JpZ2luYWxEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGF0YUdyaWQuZmlsdGVyKHRoaXMuZmlsdGVyUGFyTm9tLCB7XCJrZXlcIjprZXksIFwidmFsdWVcIjogdmFsdWV9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFHcmlkID0gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFHcmlkID0gdGhpcy5vcmlnaW5hbERhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhhcnJCeU5vbSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2hlY2tib3godmFsdWUsX2lkLG1hc3Rlcil7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzYXZlRGVtYW5kZScpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmb3JtICk7XG5jb25zb2xlLmxvZyhtYXN0ZXIpXG4gICAgICAgIC8vdGhpcy5fZm9ybVNlcnZpY2UuYXJyYXlTdGVwcy5wdXNoKHtcInN0ZXBfaWRcIjogY3VycmVudFN0ZXB9KTtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XCJ2YWx1ZVwiIDogdmFsdWUsIFwiX2lkXCI6IF9pZCwgXCJtYXN0ZXJcIjogbWFzdGVyfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYm9keVwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvZGVtYW5kJywgYm9keSwge2hlYWRlcnM6IGhlYWRlcnN9KVxuICAgICAgICB2YXIgY29tcGxldGVVcmwgPSBHbG9iYWxWYXJpYWJsZS5CQVNFX1VSTCArICd1cGRhdGVfY2hlY2tib3gnO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KGNvbXBsZXRlVXJsLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XG4gICAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
