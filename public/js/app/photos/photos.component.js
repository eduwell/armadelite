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
const core_1 = require("@angular/core");
const photos_service_1 = require("./photos.service");
const router_1 = require("@angular/router");
let PhotosComponent = class PhotosComponent {
    constructor(router, _photoService) {
        this.router = router;
        this._photoService = _photoService;
        this.progressPhoto = 0;
        this.showPhoto1 = true;
        this.showPhoto2 = false;
        this.showPhoto3 = false;
        this.showPhoto4 = false;
        this.showPhoto5 = false;
    }
    upload() {
        this.progressPhoto = this.progressPhoto + 20;
        if (this.progressPhoto == 100) {
            this.router.navigate(['/profile']);
        }
    }
    fileChangeEvent(fileInput) {
        console.log('fileChangeEvent');
        console.log(fileInput.target.files);
        var objectURL = window.URL.createObjectURL(fileInput.target.files[0]);
        console.log(objectURL);
        console.log('apres');
        this.data = objectURL;
    }
};
PhotosComponent = __decorate([
    core_1.Component({
        selector: 'upload-photo',
        template: `
                <progress class="progress progress-danger" [attr.value]="progressPhoto" max="100" aria-describedby="example-caption-1"></progress>
                <div class="panel panel-default" *ngIf="showPhoto1">
                    <form method="post" enctype="multipart/form-data">
                        <div>
                            <img height="300" width="360" src="/images/modele/photo1.jpg">
                        </div>
                        <div>
                            
                            <input type="file" class="btn btn-primary btn-primary-custom"  (change)="fileChangeEvent($event)" placeholder="Upload file...">
                            <button type="button" (click)="upload(); this.showPhoto2 = true; this.showPhoto1 = false;" class="btn btn-primary btn-primary-custom">Upload</button>    
                       </div>
                   </form>
                </div>
                <div class="panel panel-default" *ngIf="showPhoto2">
                    <form method="post" enctype="multipart/form-data">
                        <div>
                            <img height="300" width="360" src="/images/modele/photo2.jpg">
                        </div>
                       <div>
                            <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." class="btn btn-primary btn-primary-custom">
                            <button type="button" (click)="upload();this.showPhoto3 = true; this.showPhoto2 = false;" class="btn btn-primary btn-primary-custom">Upload</button>
                       </div>
                       </form>
                </div>
                <div class="panel panel-default" *ngIf="showPhoto3">
                    <form method="post" enctype="multipart/form-data">
                        <div>
                            <img height="300" width="360" src="/images/modele/photo3.jpg">
                        </div>
                       <div>
                            <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." class="btn btn-primary btn-primary-custom">
                            <button type="button" (click)="upload();this.showPhoto4 = true; this.showPhoto3 = false;" class="btn btn-primary btn-primary-custom">Upload</button>
                       </div>
                       </form>
                </div>
                <div class="panel panel-default" *ngIf="showPhoto4">
                    <form method="post" enctype="multipart/form-data">
                        <div>
                            <img height="300" width="360" src="/images/modele/photo4.jpg">
                        </div>
                       <div>
                            <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." class="btn btn-primary btn-primary-custom">
                            <button type="button" (click)="upload();this.showPhoto5 = true; this.showPhoto4 = false;" class="btn btn-primary btn-primary-custom">Upload</button>
                       </div>
                       </form>
                </div>
                                <div class="panel panel-default" *ngIf="showPhoto5">
                    <form method="post" enctype="multipart/form-data">
                        <div>
                            <img height="300" width="360" src="/images/modele/photo5.jpg">
                        </div>
                       <div>
                            <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." class="btn btn-primary btn-primary-custom">
                            <button type="button" (click)="upload()" class="btn btn-primary btn-primary-custom">Upload</button>
                       </div>
                       </form>
                </div>
               <!--<div>-->
                    <!--<input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file...">-->
               <!--</div>-->
               <!---->
               <div >
               <!--<input type="submit"/>-->
                
               </div>
               
        <!--ngFileSelect-->
       <!--[options]="basicOptions"-->
    <!--(onUpload)="handleUpload($event)">-->
 ><br>
<nav>
    <div><a [routerLink]="['/profile']"> SUIVANT </a></div>
</nav>

`
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, photos_service_1.PhotosService])
], PhotosComponent);
exports.PhotosComponent = PhotosComponent;
var _a;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy9waG90b3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1QkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsaUNBQTRCLGtCQUFrQixDQUFDLENBQUE7QUFDL0MseUJBQXFCLGlCQUFpQixDQUFDLENBQUE7QUEyRnZDO0lBWUksWUFBb0IsTUFBYyxFQUFTLGFBQTZCO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFWeEUsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFFbEIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixlQUFVLEdBQVksS0FBSyxDQUFDO0lBSzVCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUU3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7WUFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFZZCxDQUFDO0lBaUJELGVBQWUsQ0FBQyxTQUFjO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7SUFHbEIsQ0FBQztBQXdDTCxDQUFDO0FBekxEO0lBQUMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkViO0tBTUEsQ0FBQzs7bUJBQUE7QUFFVyx1QkFBZSxrQkFvRzNCLENBQUEiLCJmaWxlIjoicGhvdG9zL3Bob3Rvcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1Bob3Rvc1NlcnZpY2V9IGZyb20gXCIuL3Bob3Rvcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuLy9pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCIuLi8uLi8uLi9wdWJsaWMvanMvdmVuZG9yL3J4anMvc3JjL09ic2VydmFibGVcIjtcclxuLy9pbXBvcnQge05nWm9uZX0gZnJvbSBcIi4uLy4uLy4uL3B1YmxpYy9qcy92ZW5kb3IvQGFuZ3VsYXIvY29yZS9lc20vc3JjL3pvbmUvbmdfem9uZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3VwbG9hZC1waG90bycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgICAgICAgPHByb2dyZXNzIGNsYXNzPVwicHJvZ3Jlc3MgcHJvZ3Jlc3MtZGFuZ2VyXCIgW2F0dHIudmFsdWVdPVwicHJvZ3Jlc3NQaG90b1wiIG1heD1cIjEwMFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJleGFtcGxlLWNhcHRpb24tMVwiPjwvcHJvZ3Jlc3M+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiICpuZ0lmPVwic2hvd1Bob3RvMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBlbmN0eXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBoZWlnaHQ9XCIzMDBcIiB3aWR0aD1cIjM2MFwiIHNyYz1cIi9pbWFnZXMvbW9kZWxlL3Bob3RvMS5qcGdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1wcmltYXJ5LWN1c3RvbVwiICAoY2hhbmdlKT1cImZpbGVDaGFuZ2VFdmVudCgkZXZlbnQpXCIgcGxhY2Vob2xkZXI9XCJVcGxvYWQgZmlsZS4uLlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZCgpOyB0aGlzLnNob3dQaG90bzIgPSB0cnVlOyB0aGlzLnNob3dQaG90bzEgPSBmYWxzZTtcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tcHJpbWFyeS1jdXN0b21cIj5VcGxvYWQ8L2J1dHRvbj4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgKm5nSWY9XCJzaG93UGhvdG8yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGVuY3R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGhlaWdodD1cIjMwMFwiIHdpZHRoPVwiMzYwXCIgc3JjPVwiL2ltYWdlcy9tb2RlbGUvcGhvdG8yLmpwZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJmaWxlQ2hhbmdlRXZlbnQoJGV2ZW50KVwiIHBsYWNlaG9sZGVyPVwiVXBsb2FkIGZpbGUuLi5cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tcHJpbWFyeS1jdXN0b21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKTt0aGlzLnNob3dQaG90bzMgPSB0cnVlOyB0aGlzLnNob3dQaG90bzIgPSBmYWxzZTtcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tcHJpbWFyeS1jdXN0b21cIj5VcGxvYWQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgKm5nSWY9XCJzaG93UGhvdG8zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGVuY3R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGhlaWdodD1cIjMwMFwiIHdpZHRoPVwiMzYwXCIgc3JjPVwiL2ltYWdlcy9tb2RlbGUvcGhvdG8zLmpwZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJmaWxlQ2hhbmdlRXZlbnQoJGV2ZW50KVwiIHBsYWNlaG9sZGVyPVwiVXBsb2FkIGZpbGUuLi5cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tcHJpbWFyeS1jdXN0b21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKTt0aGlzLnNob3dQaG90bzQgPSB0cnVlOyB0aGlzLnNob3dQaG90bzMgPSBmYWxzZTtcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tcHJpbWFyeS1jdXN0b21cIj5VcGxvYWQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgKm5nSWY9XCJzaG93UGhvdG80XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGVuY3R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGhlaWdodD1cIjMwMFwiIHdpZHRoPVwiMzYwXCIgc3JjPVwiL2ltYWdlcy9tb2RlbGUvcGhvdG80LmpwZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJmaWxlQ2hhbmdlRXZlbnQoJGV2ZW50KVwiIHBsYWNlaG9sZGVyPVwiVXBsb2FkIGZpbGUuLi5cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tcHJpbWFyeS1jdXN0b21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKTt0aGlzLnNob3dQaG90bzUgPSB0cnVlOyB0aGlzLnNob3dQaG90bzQgPSBmYWxzZTtcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tcHJpbWFyeS1jdXN0b21cIj5VcGxvYWQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiICpuZ0lmPVwic2hvd1Bob3RvNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG1ldGhvZD1cInBvc3RcIiBlbmN0eXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBoZWlnaHQ9XCIzMDBcIiB3aWR0aD1cIjM2MFwiIHNyYz1cIi9pbWFnZXMvbW9kZWxlL3Bob3RvNS5qcGdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIChjaGFuZ2UpPVwiZmlsZUNoYW5nZUV2ZW50KCRldmVudClcIiBwbGFjZWhvbGRlcj1cIlVwbG9hZCBmaWxlLi4uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXByaW1hcnktY3VzdG9tXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwidXBsb2FkKClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tcHJpbWFyeS1jdXN0b21cIj5VcGxvYWQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPCEtLTxkaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLTxpbnB1dCB0eXBlPVwiZmlsZVwiIChjaGFuZ2UpPVwiZmlsZUNoYW5nZUV2ZW50KCRldmVudClcIiBwbGFjZWhvbGRlcj1cIlVwbG9hZCBmaWxlLi4uXCI+LS0+XHJcbiAgICAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgPCEtLS0tPlxyXG4gICAgICAgICAgICAgICA8ZGl2ID5cclxuICAgICAgICAgICAgICAgPCEtLTxpbnB1dCB0eXBlPVwic3VibWl0XCIvPi0tPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICA8IS0tbmdGaWxlU2VsZWN0LS0+XHJcbiAgICAgICA8IS0tW29wdGlvbnNdPVwiYmFzaWNPcHRpb25zXCItLT5cclxuICAgIDwhLS0ob25VcGxvYWQpPVwiaGFuZGxlVXBsb2FkKCRldmVudClcIj4tLT5cclxuID48YnI+XHJcbjxuYXY+XHJcbiAgICA8ZGl2PjxhIFtyb3V0ZXJMaW5rXT1cIlsnL3Byb2ZpbGUnXVwiPiBTVUlWQU5UIDwvYT48L2Rpdj5cclxuPC9uYXY+XHJcblxyXG5gXHJcblxyXG4gICAgLy9cclxuICAgIC8vIDxkaXY+XHJcbiAgICAvLyAgIFJlc3BvbnNlOiB7eyByZXNwb25zZSB8IGpzb24gfX1cclxuICAgIC8vIDwvZGl2PmBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBQaG90b3NDb21wb25lbnQgIHtcclxuXHJcbiAgICBwcm9ncmVzc1Bob3RvID0gMDtcclxuXHJcbiAgICBzaG93UGhvdG8xOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHNob3dQaG90bzI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dQaG90bzM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dQaG90bzQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dQaG90bzU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBmaWxlc1RvVXBsb2FkOiBGaWxlO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHVibGljIF9waG90b1NlcnZpY2UgOiBQaG90b3NTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkKCkge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NQaG90byA9IHRoaXMucHJvZ3Jlc3NQaG90byArIDIwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc1Bob3RvID09IDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ST09UIFZFUlMgTEEgUEFHRSBTVUlWQU5URVxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcHJvZmlsZSddKTtcclxuICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyB0aGlzLl9waG90b1NlcnZpY2UudXBsb2FkKHRoaXMuZGF0YSlcclxuICAgICAgICAgLy8gICAgIC5zdWJzY3JpYmVcclxuICAgICAgICAgLy8gICAgKFxyXG4gICAgICAgICAvLyAgICAgICAgIGxvYWRfaW1hZ2UgPT4ge1xyXG4gICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2FkX2ltYWdlKTtcclxuICAgICAgICAgLy8gICAgICAgICB9LFxyXG4gICAgICAgICAvLyAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1bmUgZXJyZXVyIHMnZXN0IHByb2R1aXRlXCIpO1xyXG4gICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcikgfVxyXG4gICAgICAgICAvLyAgICApO1xyXG4gICAgfVxyXG5cclxuICAgICAgICAvLyByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwczovL215c2F2ZXIuaGVyb2t1YXBwLmNvbS9kZW1hbmQvJylcclxuICAgICAgICAvLyAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLy8gICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm1ha2VGaWxlUmVxdWVzdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91cGxvYWRcIiwgW10sIHRoaXMuZmlsZXNUb1VwbG9hZCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICBpZiAodGhpcy5wcm9ncmVzc1Bob3RvID09IDEwMCl7XHJcbiAgICAgICAgLy8gICAgICAgICAvL1JPT1QgVkVSUyBMQSBQQUdFIFNVSVZBTlRFXHJcbiAgICAgICAgLy8gICAgICAgICAgLy8gW3JvdXRlckxpbmtdID0gIFwiWycvcHJvZmlsZSddXCI7XHJcbiAgICAgICAgLy8gICAgICB9XHJcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgIC8vICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAvLyAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIC8vICB9KTtcclxuXHJcblxyXG4gICAgZmlsZUNoYW5nZUV2ZW50KGZpbGVJbnB1dDogYW55KXtcclxuICAgICAgICBjb25zb2xlLmxvZygnZmlsZUNoYW5nZUV2ZW50Jyk7XHJcbmNvbnNvbGUubG9nKGZpbGVJbnB1dC50YXJnZXQuZmlsZXMpO1xyXG4gICAgICAgIHZhciBvYmplY3RVUkwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQudGFyZ2V0LmZpbGVzWzBdKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhvYmplY3RVUkwpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhcHJlcycpO1xyXG4gICAgLy8gICAgdGhpcy5maWxlc1RvVXBsb2FkID0gPEZpbGU+IGZpbGVJbnB1dC50YXJnZXQuZmlsZXNbMF07XHJcbnRoaXMuZGF0YSA9IG9iamVjdFVSTDtcclxuICAgICAgICAvL1NpIHBsdXNpZXVycyBmaWNoaWVyIMOgIHVwbG9hZGVyIGVuIG1lbWUgdGVtcHNcclxuICAgICAgICAvLyB0aGlzLmZpbGVzVG9VcGxvYWQucHVzaChmaWxlSW5wdXQudGFyZ2V0LmZpbGVzWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYWtlRmlsZVJlcXVlc3QodXJsOiBzdHJpbmcsIHBhcmFtczogQXJyYXk8c3RyaW5nPiwgZmlsZXM6IEFycmF5PEZpbGU+KSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIC8vICAgICAgICAgdmFyIGZvcm1EYXRhOiBhbnkgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIC8vICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgLy8gICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcInVwbG9hZHNbXVwiLCBmaWxlc1tpXSwgZmlsZXNbaV0ubmFtZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICByZWplY3QoeGhyLnJlc3BvbnNlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZm9ybURhdGEpO1xyXG4gICAgLy8gICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKTtcclxuICAgIC8vICAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gcHJpdmF0ZSB6b25lOiBOZ1pvbmU7XHJcbiAgICAvLyBwcml2YXRlIGJhc2ljT3B0aW9uczogT2JqZWN0O1xyXG4gICAgLy8gcHJpdmF0ZSBwcm9ncmVzczogbnVtYmVyID0gMDtcclxuICAgIC8vIHByaXZhdGUgcmVzcG9uc2U6IGFueSA9IHt9O1xyXG4gICAgLy9cclxuICAgIC8vIG5nT25Jbml0KCkge1xyXG4gICAgLy8gdGhpcy56b25lID0gbmV3IE5nWm9uZSh7IGVuYWJsZUxvbmdTdGFja1RyYWNlOiBmYWxzZX0pO1xyXG4gICAgLy8gdGhpcy5iYXNpY09wdGlvbnMgPSB7IHVybDogJ2h0dHA6Ly9hcGkubmcyLXVwbG9hZGVyLmNvbToxMDA1MC91cGxvYWQnfTtcclxuICAgIC8vIH1cclxuICAgIC8vXHJcbiAgICAvLyBoYW5kbGVVcGxvYWQoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAvLyAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucmVzcG9uc2UgPSBkYXRhO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
