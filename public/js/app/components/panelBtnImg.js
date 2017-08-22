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
const core_1 = require('@angular/core');
let PanelBtnComponent = class PanelBtnComponent {
    constructor() {
        this.footNote = '';
        this.change = new core_1.EventEmitter();
        this.currentList = [];
        this.display = false;
    }
    ngOnInit() {
        console.log("ngOnInitStart");
        if (typeof this.listOfElements != 'undefined') {
            console.log(this.listOfElements);
            for (let datas of this.listOfElements) {
                console.log(datas.name);
                this.currentList.push({ "name": datas.name, "url": datas.url });
            }
            console.log(this.currentList);
            this.display = true;
        }
    }
    onChooseVal(val) {
        this.change.emit({
            valueName: this.objStep.configuration.form_value.name,
            valueSelected: val,
            stepIdx: this.stepIdx
        });
    }
    ;
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], PanelBtnComponent.prototype, "objStep", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], PanelBtnComponent.prototype, "listOfElements", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], PanelBtnComponent.prototype, "valueSelected", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], PanelBtnComponent.prototype, "stepIdx", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], PanelBtnComponent.prototype, "footNote", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], PanelBtnComponent.prototype, "change", void 0);
PanelBtnComponent = __decorate([
    core_1.Component({
        selector: 'panel-btn-img',
        template: `
     <div *ngIf="display">
         <div class="panel-heading panel-heading-custom" align="center">{{objStep.labelPanel}} </div>
         <div class="panel-body" >       
             <ul class="items" *ngIf="objStep.type == 'image_selection'">
                    <li *ngFor="let valeurList of currentList">
                            <a (click)="onChooseVal(valeurList.name)"> <img src="{{valeurList.url}} " />  </a>       
                    </li>
            </ul>
         </div>
         <span class="label label-info"  *ngIf="footNote != ''" >{{footNote}} </span>
     </div>
`
    }), 
    __metadata('design:paramtypes', [])
], PanelBtnComponent);
exports.PanelBtnComponent = PanelBtnComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFuZWxCdG5JbWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVCQUFxRCxlQUVyRCxDQUFDLENBRm1FO0FBNEJwRTtJQUFBO1FBS2EsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNiLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN0QyxnQkFBVyxHQUFFLEVBQUUsQ0FBQztRQUVoQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBMENwQixDQUFDO0lBeENHLFFBQVE7UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBYzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBR2hDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFHbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7WUFFeEUsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXhCLENBQUM7SUFDTCxDQUFDO0lBQ0QsV0FBVyxDQUFDLEdBQUc7UUFHWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLFNBQVMsRUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSTtZQUN0RCxhQUFhLEVBQUcsR0FBRztZQUNuQixPQUFPLEVBQUcsSUFBSSxDQUFDLE9BQU87U0FDekIsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7QUFDTCxDQUFDO0FBbERHO0lBQUMsWUFBSyxFQUFFOztrREFBQTtBQUNSO0lBQUMsWUFBSyxFQUFFOzt5REFBQTtBQUNSO0lBQUMsWUFBSyxFQUFFOzt3REFBQTtBQUNSO0lBQUMsWUFBSyxFQUFFOztrREFBQTtBQUNSO0lBQUMsWUFBSyxFQUFFOzttREFBQTtBQUNSO0lBQUMsYUFBTSxFQUFFOztpREFBQTtBQWhDYjtJQUFDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztDQVliO0tBQ0EsQ0FBQzs7cUJBQUE7QUFXVyx5QkFBaUIsb0JBbUQ3QixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvcGFuZWxCdG5JbWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3BhbmVsLWJ0bi1pbWcnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICA8ZGl2ICpuZ0lmPVwiZGlzcGxheVwiPlxyXG4gICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZyBwYW5lbC1oZWFkaW5nLWN1c3RvbVwiIGFsaWduPVwiY2VudGVyXCI+e3tvYmpTdGVwLmxhYmVsUGFuZWx9fSA8L2Rpdj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiA+ICAgICAgIFxyXG4gICAgICAgICAgICAgPHVsIGNsYXNzPVwiaXRlbXNcIiAqbmdJZj1cIm9ialN0ZXAudHlwZSA9PSAnaW1hZ2Vfc2VsZWN0aW9uJ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgdmFsZXVyTGlzdCBvZiBjdXJyZW50TGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uQ2hvb3NlVmFsKHZhbGV1ckxpc3QubmFtZSlcIj4gPGltZyBzcmM9XCJ7e3ZhbGV1ckxpc3QudXJsfX0gXCIgLz4gIDwvYT4gICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtaW5mb1wiICAqbmdJZj1cImZvb3ROb3RlICE9ICcnXCIgPnt7Zm9vdE5vdGV9fSA8L3NwYW4+XHJcbiAgICAgPC9kaXY+XHJcbmBcclxufSlcclxuXHJcbi8qXHJcbiAgPGJ1dHRvbiAqbmdJZj1cInZhbHVlU2VsZWN0ZWQgPT0gdmFsZXVyTGlzdFwiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvLWN1c3RvbVwiIHR5cGU9XCJidXR0b25cIiBcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DaG9vc2VWYWwoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7e3ZhbGV1ckxpc3R9fVwiPnt7dmFsZXVyTGlzdH19XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiovXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsQnRuQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIG9ialN0ZXA7XHJcbiAgICBASW5wdXQoKSBsaXN0T2ZFbGVtZW50cztcclxuICAgIEBJbnB1dCgpIHZhbHVlU2VsZWN0ZWQ7IC8vIFZhbHVlIHRvIHBhc3MgdG8gdGhlIGZvcm1TZXJ2aWNlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvblxyXG4gICAgQElucHV0KCkgc3RlcElkeDsgICAgICAgIC8vIFNlbmQgdGhlIGN1cnJlbnQgc3RlcCBpbiBvcmRlciB0byBpbmNyZW1lbnQgaXRcclxuICAgIEBJbnB1dCgpIGZvb3ROb3RlID0gJyc7IC8vT3B0aW9uYWwgaW5zZXJ0IGEgZm9vdG5vdGUgaW4gY29tcG9uZW50XHJcbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpOyAvLyBFbWl0dGVyIHRvIHNlbmQgYmFjayBkYXRhIHRvIHBhcmVudCBjb21wb25lbnRcclxuICAgIGN1cnJlbnRMaXN0PSBbXTtcclxuXHJcbiAgICBkaXNwbGF5ID0gZmFsc2U7XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuZ09uSW5pdFN0YXJ0XCIpO1xyXG4gICAgICAgIC8vIEZST00gSEFSRENPREVEIExJU1RcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmxpc3RPZkVsZW1lbnRzKTtcclxuICAgICAgICAvLyBmb3IgKGxldCBkYXRhcyBvZiB0aGlzLmxpc3RPZkVsZW1lbnRzKXtcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coZGF0YXMpO1xyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhkYXRhcy5uYW1lKTtcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2codGhpcy5vYmpTdGVwLm5hbWUpO1xyXG4gICAgICAgIC8vICAgICBpZiAoZGF0YXMubmFtZSA9PSB0aGlzLm9ialN0ZXAubmFtZSl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRMaXN0ID0gZGF0YXMubGlzdDtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuXHJcblxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubGlzdE9mRWxlbWVudHMgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5saXN0T2ZFbGVtZW50cylcclxuXHJcbiAgICAgICAgICAgIC8vIEZST00gQ09MTEVDVElPTlxyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXRhcyBvZiB0aGlzLmxpc3RPZkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMub2JqU3RlcC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChkYXRhcy5uYW1lID09IHRoaXMub2JqU3RlcC5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGlzdC5wdXNoKHsgXCJuYW1lXCI6IGRhdGFzLm5hbWUsIFwidXJsXCI6IGRhdGFzLnVybH0pO1xyXG4gICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRMaXN0KTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vYmpTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkNob29zZVZhbCh2YWwpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZWxlY3Rpb24nKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWwpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoe1xyXG4gICAgICAgICAgICB2YWx1ZU5hbWUgOiB0aGlzLm9ialN0ZXAuY29uZmlndXJhdGlvbi5mb3JtX3ZhbHVlLm5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlU2VsZWN0ZWQgOiB2YWwsXHJcbiAgICAgICAgICAgIHN0ZXBJZHggOiB0aGlzLnN0ZXBJZHhcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
