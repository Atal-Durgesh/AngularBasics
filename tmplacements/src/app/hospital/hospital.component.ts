import { Component, OnInit } from '@angular/core';
import { Hospital } from './hospital.model';
import { FormsModule } from '@angular/forms';
import {HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  hospital : Hospital = new Hospital();
  hospitals : Array<Hospital> = new Array<Hospital>();
  disable : boolean = false;
  isEdited : boolean = false;
  constructor(public http : HttpClient) { }

  addHospital(){
    this.disable = true;
    this.isEdited = false;
    this.http.post("http://localhost:8080/hospital/saveProduct",
  this.hospital).subscribe(res => this.Success(res),
res => this.Error(res));
  }

  Success(res){
    this.getHospital();
    this.disable = false;
    this.hospital = new Hospital();
  }

  getHospital(){
    this.http.get("http://localhost:8080/hospital/getAllHospitals")
    .subscribe(res => this.setHospitals(res),
  res => this.setError(res));
  }

  editHospital(hospitalId){
    this.isEdited = true;
    this.http.get("http://localhost:8080/hospital/getHospitalById/"+hospitalId)
    .subscribe(res => this.setHospital(res),res => this.setError(res));   
   
  }

  deleteHospital(hospitalId){
    this.http.delete("http://localhost:8080/hospital/deleteHospital/"+hospitalId)
    .subscribe( res => this.Success(res),
  res => this.Error(res));
  }

  setHospitals(res){
    this.hospitals = res;
  }
  setHospital(res){
    this.hospital = res;
  }

  setError(res){
    console.log(res);
  }

  Error(res){
    console.log(res);
  }
  ngOnInit() {
  }

}
