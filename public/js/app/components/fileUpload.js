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
var http_1 = require("@angular/http");
var fileUpload_service_1 = require("./fileUpload.service");
var form_service_1 = require("./form.service");
var FileUploadComponent = (function () {
    function FileUploadComponent(_fileUploadService, _http, _formService) {
        this._fileUploadService = _fileUploadService;
        this._http = _http;
        this._formService = _formService;
        this.isUploaded = false;
        this.uploadedFileUrls = [];
        this.display = false;
        this.sent = new core_1.EventEmitter();
    }
    FileUploadComponent.prototype.upload = function () {
    };
    FileUploadComponent.prototype.ngOnInit = function () {
        console.log(this.objStep);
        console.log(this.objStep.configuration.path_model);
    };
    FileUploadComponent.prototype.fileChange = function (event) {
        console.log(event.target);
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            this.fileUploaded = file;
            this._formService.arrayFiles.append('uploadFile', file, this.objStep.name);
            console.log(this._formService.arrayFiles.get('uploadFile'));
            this.url_uploaded_file = 'blabla';
            var fileToUpload = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
            var pattern = /image-*/;
            var reader = new FileReader();
            if (!fileToUpload.type.match(pattern)) {
                alert('invalid format');
                return;
            }
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsDataURL(fileToUpload);
            this.isUploaded = true;
        }
    };
    FileUploadComponent.prototype._handleReaderLoaded = function (e) {
        var reader = e.target;
        this.imageSrc = reader.result;
    };
    FileUploadComponent.prototype.onChange = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        this.file = files[0];
        console.log(this.file);
        this._fileUploadService.storeFile(files[0])
            .subscribe(function (data) {
            console.log(data);
        }, function (error) { return console.log(error); });
    };
    FileUploadComponent.prototype.goToStep = function () {
        this.sent.emit({
            stepIdx: this.stepIdx
        });
    };
    FileUploadComponent.prototype.goToNextStep = function () {
        this.sent.emit({
            valueName: this.objStep.name,
            url_uploaded: this.url_uploaded_file,
            id_img: this.id_img,
            fileUploaded: this.fileUploaded,
            stepIdx: this.stepIdx
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "objStep", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "stepIdx", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "sent", void 0);
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'file-upload',
            template: "\n    <div>\n       <div class=\"panel-heading panel-heading-custom\"><p class=\"text-uppercase\">{{objStep.configuration.labelPanel}}</p> </div>\n       <div class=\"panel-body\">\n        <!--<input type=\"filepicker\" name=\"myName\" onchange=\"alert(event.fpfile.url)\"/>-->\n        <!--<input type=\"file\" ng2FileSelect [uploader]=\"uploader\"/>-->\n        <table>\n            <tr>\n                <td>\n                    <input type=\"file\" (change)=\"fileChange($event)\" placeholder=\"Upload file\" accept=\".jpeg,.jpg,.png,.pdf,.doc,.docx\">\n                </td>\n            <tr>\n            <tr>\n                <td> \n                    <img src=\"{{objStep.configuration.path_model}}\" width=\"480\" height=\"320\"> \n                </td>\n            </tr>\n            <tr>\n                <td *ngIf=\"this.isUploaded\">\n                    <img src=\"{{imageSrc}}\" width=\"480\" height=\"320\">\n                    <!--<img src=\"{{this.url_uploaded_file}}\" width=\"480\" height=\"320\">    -->\n                </td>\n            </tr>\n            \n        \n        </table>\n               <div *ngIf=\"this.isUploaded == false\"><button type=\"button\" btn-default btn-lg (click)=\"goToStep()\">JE NE SOUHAITE PAS AJOUTER DES PHOTOS</button></div>\n               <div *ngIf=\"this.isUploaded\"><button type=\"button\" btn-default btn-lg (click)=\"goToNextStep()\">SUIVANT</button></div>\n        <!--<input name=\"file\" type=\"file\" (change)=\"onChange($event)\"/>-->\n        <!--<input type=\"filepicker\" data-fp-apikey=\"AgaXy7tWgRMuzr11Hh6OJz\"-->\n               <!--onchange=\"console.log(event.fpfile)\">-->\n\n      <!--<input type=\"file\" ng2FileSelect [uploader]=\"uploader\" accept=\"image/*;capture=camera\">-->\n\n    <!--<button (click)=\"upload()\">Upload</button>-->\n\n<!--<cl-image [public-id]=\"imageId\" [cloud-name]=\"uploader.cloudName\"></cl-image>-->\n<!--<input type=\"button\" value=\"Upload\" onclick=\"showPicker()\" />-->\n<!--<input type=\"filepicker-dragdrop\" data-fp-apikey=\"AgaXy7tWgRMuzr11Hh6OJz\" data-fp-mimetypes=\"*/*\" data-fp-container=\"modal\" data-fp-maxsize=\"10000000\" data-fp-store-location=\"S3\" onchange=\"alert(event.fpfile.url)\">-->\n       </div>\n    \n    </div>\n" }), 
        __metadata('design:paramtypes', [fileUpload_service_1.FileUploadService, http_1.Http, form_service_1.FormService])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;

//# sourceMappingURL=data:application/json;base64,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QyxhQUFNLEVBQUU7O3FEQUFBO0lBL0RiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSw4dEVBMENiLEVBQUMsQ0FBQzs7MkJBQUE7SUF5SkgsMEJBQUM7QUFBRCxDQXZKQSxBQXVKQyxJQUFBO0FBdkpZLDJCQUFtQixzQkF1Si9CLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9maWxlVXBsb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gaW1wb3J0IHtGaWxlVXBsb2FkU2VydmljZX0gZnJvbSBcIi4vZmlsZVVwbG9hZC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SHR0cCwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IENsb3VkaW5hcnlPcHRpb25zLCBDbG91ZGluYXJ5VXBsb2FkZXIgfSBmcm9tICduZzItY2xvdWRpbmFyeSc7XHJcbmltcG9ydCB7RmlsZVVwbG9hZFNlcnZpY2V9IGZyb20gXCIuL2ZpbGVVcGxvYWQuc2VydmljZVwiO1xyXG5pbXBvcnQge0dsb2JhbFZhcmlhYmxlfSBmcm9tIFwiLi4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7Rm9ybVNlcnZpY2V9IGZyb20gXCIuL2Zvcm0uc2VydmljZVwiO1xyXG5kZWNsYXJlIGNvbnN0IGZpbGVzdGFjazoge1xyXG4gICAgaW5pdChhcGlLZXk6IHN0cmluZyk6IHtcclxuICAgICAgICBwaWNrKHsgbWF4RmlsZXMgfTogeyBtYXhGaWxlczogbnVtYmVyIH0pOlxyXG4gICAgICAgICAgICBQcm9taXNlPHsgZmlsZXNVcGxvYWRlZDogeyB1cmw6IHN0cmluZyB9W10gfT5cclxuICAgIH1cclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdmaWxlLXVwbG9hZCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdj5cclxuICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nIHBhbmVsLWhlYWRpbmctY3VzdG9tXCI+PHAgY2xhc3M9XCJ0ZXh0LXVwcGVyY2FzZVwiPnt7b2JqU3RlcC5jb25maWd1cmF0aW9uLmxhYmVsUGFuZWx9fTwvcD4gPC9kaXY+XHJcbiAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxyXG4gICAgICAgIDwhLS08aW5wdXQgdHlwZT1cImZpbGVwaWNrZXJcIiBuYW1lPVwibXlOYW1lXCIgb25jaGFuZ2U9XCJhbGVydChldmVudC5mcGZpbGUudXJsKVwiLz4tLT5cclxuICAgICAgICA8IS0tPGlucHV0IHR5cGU9XCJmaWxlXCIgbmcyRmlsZVNlbGVjdCBbdXBsb2FkZXJdPVwidXBsb2FkZXJcIi8+LS0+XHJcbiAgICAgICAgPHRhYmxlPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJmaWxlQ2hhbmdlKCRldmVudClcIiBwbGFjZWhvbGRlcj1cIlVwbG9hZCBmaWxlXCIgYWNjZXB0PVwiLmpwZWcsLmpwZywucG5nLC5wZGYsLmRvYywuZG9jeFwiPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQ+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwie3tvYmpTdGVwLmNvbmZpZ3VyYXRpb24ucGF0aF9tb2RlbH19XCIgd2lkdGg9XCI0ODBcIiBoZWlnaHQ9XCIzMjBcIj4gXHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQgKm5nSWY9XCJ0aGlzLmlzVXBsb2FkZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cInt7aW1hZ2VTcmN9fVwiIHdpZHRoPVwiNDgwXCIgaGVpZ2h0PVwiMzIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLTxpbWcgc3JjPVwie3t0aGlzLnVybF91cGxvYWRlZF9maWxlfX1cIiB3aWR0aD1cIjQ4MFwiIGhlaWdodD1cIjMyMFwiPiAgICAtLT5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJ0aGlzLmlzVXBsb2FkZWQgPT0gZmFsc2VcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBidG4tZGVmYXVsdCBidG4tbGcgKGNsaWNrKT1cImdvVG9TdGVwKClcIj5KRSBORSBTT1VIQUlURSBQQVMgQUpPVVRFUiBERVMgUEhPVE9TPC9idXR0b24+PC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJ0aGlzLmlzVXBsb2FkZWRcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBidG4tZGVmYXVsdCBidG4tbGcgKGNsaWNrKT1cImdvVG9OZXh0U3RlcCgpXCI+U1VJVkFOVDwvYnV0dG9uPjwvZGl2PlxyXG4gICAgICAgIDwhLS08aW5wdXQgbmFtZT1cImZpbGVcIiB0eXBlPVwiZmlsZVwiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiLz4tLT5cclxuICAgICAgICA8IS0tPGlucHV0IHR5cGU9XCJmaWxlcGlja2VyXCIgZGF0YS1mcC1hcGlrZXk9XCJBZ2FYeTd0V2dSTXV6cjExSGg2T0p6XCItLT5cclxuICAgICAgICAgICAgICAgPCEtLW9uY2hhbmdlPVwiY29uc29sZS5sb2coZXZlbnQuZnBmaWxlKVwiPi0tPlxyXG5cclxuICAgICAgPCEtLTxpbnB1dCB0eXBlPVwiZmlsZVwiIG5nMkZpbGVTZWxlY3QgW3VwbG9hZGVyXT1cInVwbG9hZGVyXCIgYWNjZXB0PVwiaW1hZ2UvKjtjYXB0dXJlPWNhbWVyYVwiPi0tPlxyXG5cclxuICAgIDwhLS08YnV0dG9uIChjbGljayk9XCJ1cGxvYWQoKVwiPlVwbG9hZDwvYnV0dG9uPi0tPlxyXG5cclxuPCEtLTxjbC1pbWFnZSBbcHVibGljLWlkXT1cImltYWdlSWRcIiBbY2xvdWQtbmFtZV09XCJ1cGxvYWRlci5jbG91ZE5hbWVcIj48L2NsLWltYWdlPi0tPlxyXG48IS0tPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlVwbG9hZFwiIG9uY2xpY2s9XCJzaG93UGlja2VyKClcIiAvPi0tPlxyXG48IS0tPGlucHV0IHR5cGU9XCJmaWxlcGlja2VyLWRyYWdkcm9wXCIgZGF0YS1mcC1hcGlrZXk9XCJBZ2FYeTd0V2dSTXV6cjExSGg2T0p6XCIgZGF0YS1mcC1taW1ldHlwZXM9XCIqLypcIiBkYXRhLWZwLWNvbnRhaW5lcj1cIm1vZGFsXCIgZGF0YS1mcC1tYXhzaXplPVwiMTAwMDAwMDBcIiBkYXRhLWZwLXN0b3JlLWxvY2F0aW9uPVwiUzNcIiBvbmNoYW5nZT1cImFsZXJ0KGV2ZW50LmZwZmlsZS51cmwpXCI+LS0+XHJcbiAgICAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgPC9kaXY+XHJcbmB9KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRDb21wb25lbnQge1xyXG5cclxuICAgIGlzVXBsb2FkZWQgPSBmYWxzZTtcclxuICAgIGlkX2ltZzogc3RyaW5nO1xyXG4gICAgdXJsX3VwbG9hZGVkX2ZpbGU7XHJcblxyXG4gICAgdXBsb2FkZWRGaWxlVXJsczogc3RyaW5nW10gPSBbXTtcclxuICAgIGltYWdlU3JjOiBzdHJpbmc7XHJcbiAgICBjbG91ZGluYXJ5SW1hZ2U6IGFueTtcclxuICAgIGRpc3BsYXkgPSBmYWxzZTtcclxuICAgICAvLyB1cGxvYWRlcjogQ2xvdWRpbmFyeVVwbG9hZGVyID0gbmV3IENsb3VkaW5hcnlVcGxvYWRlcihcclxuICAgICAvLyAgICAgbmV3IENsb3VkaW5hcnlPcHRpb25zKHsgY2xvdWROYW1lOiAnaGF2amNxcHB2JywgdXBsb2FkUHJlc2V0OiAnb2kyeDYxZGInIH0pXHJcbiAgICAgLy8gKTtcclxuICAgIGZpbGUgOiBGaWxlO1xyXG4gICAgZmlsZVVwbG9hZGVkIDogRmlsZTtcclxuICAgIEBJbnB1dCgpIG9ialN0ZXA7ICAgICAvL1ZhbHVlIHJlY2VpdmVkIGZyb20gTWFpbkNvbXBvbmVudFxyXG4gICAgQElucHV0KCkgc3RlcElkeDsgICAgIC8vVmFsdWUgcmVjZWl2ZWQgZnJvbSBNYWluQ29tcG9uZW50XHJcbiAgICBAT3V0cHV0KCkgc2VudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgLy8gRW1pdHRlciB0byBzZW5kIGJhY2sgZGF0YSB0byBwYXJlbnQgY29tcG9uZW50XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9maWxlVXBsb2FkU2VydmljZSA6IEZpbGVVcGxvYWRTZXJ2aWNlLCBwcml2YXRlIF9odHRwOiBIdHRwLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfZm9ybVNlcnZpY2U6IEZvcm1TZXJ2aWNlKSB7XHJcbiAgICAgICAgLy8gICwgdGhpcy51cGxvYWRlci5vblN1Y2Nlc3NJdGVtID0gKGl0ZW06IGFueSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAvL3Jlc3BvbnNlIGlzIHRoZSBjbG91ZGluYXJ5IHJlc3BvbnNlXHJcbiAgICAgICAgLy8gICAgIC8vc2VlIGh0dHA6Ly9jbG91ZGluYXJ5LmNvbS9kb2N1bWVudGF0aW9uL3VwbG9hZF9pbWFnZXMjdXBsb2FkX3Jlc3BvbnNlXHJcbiAgICAgICAgLy8gICAgIGxldCByZXM6IGFueSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmltYWdlSWQgPSByZXMucHVibGljX2lkO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4geyBpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XHJcbiAgICAgICAgLy8gfTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwbG9hZCgpIHtcclxuICAgICAgICAvLyB0aGlzLnVwbG9hZGVyLnVwbG9hZEFsbCgpO1xyXG4gICAgfVxyXG4gICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub2JqU3RlcCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5vYmpTdGVwLmNvbmZpZ3VyYXRpb24ucGF0aF9tb2RlbClcclxuICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgIC8vXHJcbiAgICAvL1xyXG4gICAgLy8gICAgIC8vIHZhciBjbGllbnQgPSBmaWxlc3RhY2suaW5pdCgnQWdhWHk3dFdnUk11enIxMUhoNk9KeicpO1xyXG4gICAgLy8gICAgIC8vIGZ1bmN0aW9uIHNob3dQaWNrZXIoKSB7XHJcbiAgICAvLyAgICAgLy8gICAgIGNsaWVudC5waWNrKHtcclxuICAgIC8vICAgICAvLyAgICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIC8vICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5maWxlc1VwbG9hZGVkKSlcclxuICAgIC8vICAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgLy8gfVxyXG4gICAgLy8gfVxyXG4gICAgLy9cclxuXHJcbiAgICBmaWxlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xyXG4gIC8vIEdBUkRFUiBGSUNISUVSIERBTlMgTEUgQ0FDSEVcclxuXHJcbiAgICAgICAgIGxldCBmaWxlTGlzdDogRmlsZUxpc3QgPSBldmVudC50YXJnZXQuZmlsZXM7XHJcbiAgICAgaWYoZmlsZUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICBsZXQgZmlsZTogRmlsZSA9IGZpbGVMaXN0WzBdO1xyXG4gICAgICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHJcbiAgICAgICAgIHRoaXMuZmlsZVVwbG9hZGVkID0gZmlsZTtcclxuICAgICAgICAgdGhpcy5fZm9ybVNlcnZpY2UuYXJyYXlGaWxlcy5hcHBlbmQoJ3VwbG9hZEZpbGUnLCBmaWxlLCB0aGlzLm9ialN0ZXAubmFtZSk7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2Zvcm1TZXJ2aWNlLmFycmF5RmlsZXMuZ2V0KCd1cGxvYWRGaWxlJykpO1xyXG5cclxuICAgICAgICAgdGhpcy51cmxfdXBsb2FkZWRfZmlsZSA9ICdibGFibGEnO1xyXG4gICAgICAgICAvL1xyXG4gICAgICAgICB2YXIgZmlsZVRvVXBsb2FkID0gZXZlbnQuZGF0YVRyYW5zZmVyID8gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdIDogZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xyXG5cclxuICAgICAgICAgdmFyIHBhdHRlcm4gPSAvaW1hZ2UtKi87XHJcbiAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgICAgICAgaWYgKCFmaWxlVG9VcGxvYWQudHlwZS5tYXRjaChwYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAgYWxlcnQoJ2ludmFsaWQgZm9ybWF0Jyk7XHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIHRoaXMubG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICByZWFkZXIub25sb2FkID0gdGhpcy5faGFuZGxlUmVhZGVyTG9hZGVkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVUb1VwbG9hZCk7XHJcbi8vIEZJTiBHQVJERVIgRklDSElFUiBEQU5TIExFIENBQ0hFXHJcblxyXG4gICAgICAgICAvLyB0aGlzLl9mb3JtU2VydmljZS5hcnJheVN0ZXBzLnB1c2goe1wibm9tXCI6IHRoaXMub2JqU3RlcC5uYW1lLCBcImZpbGVcIjogRmlsZX0pO1xyXG4gICAgICAgICAvL3RoaXMuX2Zvcm1TZXJ2aWNlLmFycmF5RmlsZXMucHVzaChmb3JtRGF0YSk7XHJcblxyXG5cclxuICAgICAgICAgdGhpcy5pc1VwbG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgIC8vIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICAgLy8gaGVhZGVycy5hcHBlbmQoJ0VuY1R5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpO1xyXG4gICAgICAgICAvLyBoZWFkZXJzLmFwcGVuZCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICAgLy8gbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnM6IGhlYWRlcnN9KTtcclxuICAgICAgICAgLy8gdmFyIGNvbXBsZXRlVXJsID0gR2xvYmFsVmFyaWFibGUuQkFTRV9VUkwgKyAnc3RvcmVfZmlsZSc7XHJcbiAgICAgICAgIC8vIHRoaXMuX2h0dHAucG9zdChgJHtjb21wbGV0ZVVybH1gLCBmb3JtRGF0YSwge2hlYWRlcnM6IGhlYWRlcnN9KVxyXG4gICAgICAgICAvLyAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgLy8gICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yKSlcclxuICAgICAgICAgLy8gICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgIC8vICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcclxuICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy51cmxfdXBsb2FkZWRfZmlsZSA9IGRhdGEudXJsO1xyXG4gICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmlkX2ltZyA9IGRhdGEuaWRfaW1nO1xyXG4gICAgICAgICAvLyAgICAgICAgIH0sXHJcbiAgICAgICAgIC8vICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgIC8vICAgICApXHJcbiAgICAgfSAgICAgICAgfVxyXG5cclxuX2hhbmRsZVJlYWRlckxvYWRlZChlKSB7XHJcbiAgICB2YXIgcmVhZGVyID0gZS50YXJnZXQ7XHJcbiAgICB0aGlzLmltYWdlU3JjID0gcmVhZGVyLnJlc3VsdDtcclxuICAgLy8gY29uc29sZS5sb2codGhpcy5pbWFnZVNyYylcclxuICAgIC8vdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG59XHJcblxyXG4gICAgb25DaGFuZ2UoZXZlbnQ6IEV2ZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgbGV0IGV2ZW50T2JqOiBNU0lucHV0TWV0aG9kQ29udGV4dCA9IDxNU0lucHV0TWV0aG9kQ29udGV4dD4gZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRhcmdldDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PiBldmVudE9iai50YXJnZXQ7XHJcbiAgICAgICAgbGV0IGZpbGVzOiBGaWxlTGlzdCA9IHRhcmdldC5maWxlcztcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlc1swXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbGUpO1xyXG5cclxuICAgICAgICB0aGlzLl9maWxlVXBsb2FkU2VydmljZS5zdG9yZUZpbGUoZmlsZXNbMF0pXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGdvVG9TdGVwKCl7XHJcbiAgICAgICAgdGhpcy5zZW50LmVtaXQoe1xyXG4gICAgICAgICAgICBzdGVwSWR4OiB0aGlzLnN0ZXBJZHhcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdvVG9OZXh0U3RlcCgpIHtcclxuICAgICAgICB0aGlzLnNlbnQuZW1pdCh7XHJcbiAgICAgICAgICAgIHZhbHVlTmFtZSA6IHRoaXMub2JqU3RlcC5uYW1lLFxyXG4gICAgICAgICAgICB1cmxfdXBsb2FkZWQ6IHRoaXMudXJsX3VwbG9hZGVkX2ZpbGUsXHJcbiAgICAgICAgICAgIGlkX2ltZzogdGhpcy5pZF9pbWcsXHJcbiAgICAgICAgICAgIGZpbGVVcGxvYWRlZDogdGhpcy5maWxlVXBsb2FkZWQsXHJcbiAgICAgICAgICAgIHN0ZXBJZHggOiB0aGlzLnN0ZXBJZHhcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vXHJcbiAgICAvLyBhc3luYyBzaG93UGlja2VyKCkge1xyXG4gICAgLy8gICAgIGNvbnN0IGNsaWVudCA9IGZpbGVzdGFjay5pbml0KCdBZ2FYeTd0V2dSTXV6cjExSGg2T0p6Jyk7XHJcbiAgICAvLyAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnBpY2soeyBtYXhGaWxlczogMSB9KTtcclxuICAgIC8vICAgICBjb25zdCB1cmwgPSByZXN1bHQuZmlsZXNVcGxvYWRlZFswXS51cmw7XHJcbiAgICAvLyAgICAgdGhpcy51cGxvYWRlZEZpbGVVcmxzLnB1c2godXJsKTtcclxuICAgIC8vIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
