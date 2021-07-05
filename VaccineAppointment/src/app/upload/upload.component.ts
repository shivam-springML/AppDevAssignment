import { NgAuthService, User } from './../auth.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private api:ApiService) { }
  file : File;
  progress: number = 0;
  fileName: string = '';
  fileToUpload: File;
  isFileSubmitted: boolean = false;
  uploadedFiles:any;

  ngOnInit(): void {
    var payload = {
      email:localStorage.getItem('email')
    }
    this.api.getFiles(payload).subscribe(
      res=>{
        console.log(res)
        this.uploadedFiles = res['file']
      },
      error=>{
        console.log(error)
      }
    )
  }

  onFileChange(file) {
    if (file.target.files.length > 0) {
      this.file = file.target.files[0];
    }

    console.log(file);
    file = file.target!.files[0]!
    console.log(file)
    this.isFileSubmitted = false;
    if (file) {
      this.fileToUpload = file;
      this.fileName = this.fileToUpload.name;
      console.log(this.fileName);
    }
  }
  uploadFile(){
    // let payload = {
    //   'file':this.file,
    //   'filename':this.file.name,
    // }
    // var header = {
    //   headers: new HttpHeaders()
    //     .set('Authorization',  `Basic ${btoa()}`)
    // }
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.api.uploadFile(formData).subscribe(
      res=>{
        console.log(res)
        alert('File Uploaded, Please Refresh')
      },
      error=>{
        console.log(error)
        alert(error)
      }
    )
    this.ngOnInit()
  }

  fileIsUploaded()
  {
    let result = false;
    if(this.file && this.file != null )
    {
      result = true;
    }
    return result;
  }

}
