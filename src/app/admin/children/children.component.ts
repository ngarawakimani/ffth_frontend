import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ChildrenService } from './children.service';
import Children from './Children';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  public token: string;
  children: any;
  public editForm: FormGroup;
  public submitted = false;
  public error = '';
  public added_success = false; 
  public edit_success = false; 
  public deleted_success = false; 
  public message: string;
  public submit_message: any;

  filePhoto: any;
  childID: any;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public childrenService: ChildrenService) {

    const getdata = JSON.parse(localStorage.getItem('currentUser'));

    this.token = getdata.data.token;
  }

  ngOnInit() {
    // get all chilren
    this.childrenService.getChildren(this.token)
      .subscribe((data: any) => {
        console.log(data);
        this.children = data;
    });
    // handle edit form
    this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      Country: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      photo: [null],
      hobbies: ['', Validators.required],
      history: ['', Validators.required],
      support_amount: ['', Validators.required],
      frequency: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  //
  launchEditModal(id) {

    const allChildren = this.children.data;

    allChildren.forEach( element => {

      console.log(element.frequency);

      if ( element.id === id ) {

        this.childID = id;

        this.f.firstname.setValue(element.first_name);
        this.f.lastname.setValue(element.last_name);
        this.f.Country.setValue(element.Country);
        this.f.gender.setValue(element.gender);
        this.f.date_of_birth.setValue(element.date_of_birth);
        // this.f.photo.setValue(element.photo);
        this.f.hobbies.setValue(element.hobbies);
        this.f.history.setValue(element.history);
        this.f.support_amount.setValue(element.support_amount);
        this.f.frequency.setValue(element.frequency);
      }

    });
  }

  //
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    let first_name = this.f.firstname.value;
    let last_name = this.f.lastname.value;
    let Country = this.f.Country.value;
    let gender = this.f.gender.value;
    let date_of_birth = this.f.date_of_birth.value;
    let photo = this.filePhoto; 
    let hobbies = this.f.hobbies.value;
    let history = this.f.history.value;
    let support_amount = this.f.support_amount.value;
    let frequency = this.f.frequency.value;

    this.childrenService.editChild(this.token, this.childID, {first_name,last_name,Country,gender,date_of_birth,hobbies,history,support_amount,frequency})
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              if( data.message=== "Child Updated successfully."){
                this.edit_success = true; 
                this.submit_message = "Child Updated successfully.";
              }
            },
            error => {
                this.error = error;
                console.log(error);
            });
  }


  onSubmitAddChild() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    let formData = new FormData();

    formData.append('first_name' , this.f.firstname.value)
    formData.append('last_name' , this.f.lastname.value)
    formData.append('Country' , this.f.Country.value)
    formData.append('gender' , this.f.gender.value)
    formData.append('date_of_birth' , this.f.date_of_birth.value)
    formData.append('photo' , this.filePhoto); 
    formData.append('hobbies' , this.f.hobbies.value)
    formData.append('history' , this.f.history.value)
    formData.append('support_amount' , this.f.support_amount.value)
    formData.append('frequency' , this.f.frequency.value)

    console.log(formData);

    this.childrenService.addChild(this.token, formData)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              if( data.message=== "Child Added successfully."){
                this.added_success = true; 
                this.submit_message = "Child Added successfully.";
              }
            },
            error => {
                this.error = error;
                console.log(error);
            });
  }

  uploadFile(event){

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.filePhoto = file
    }
  }

  deleteChild(){
    
    this.childrenService.deleteChild(this.token, this.childID)
    .pipe(first())
    .subscribe(
        data => {
          console.log(data);
          if( data.message=== "Child deleted successfully."){
            this.deleted_success = true; 
            this.submit_message = "Child deleted successfully.";
          }
        },
        error => {
            this.error = error;
            console.log(error);
        });

  }

}
