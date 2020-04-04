import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

/**
 * Generated class for the NewactivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newactivity',
  templateUrl: 'newactivity.html',
})
export class NewactivityPage {
  frmActivity: FormGroup;
  title:any;
  description:any;
  price:any;
  addedTodo:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public formBuilder:FormBuilder) {
    this.storage=storage;
    this.frmActivity=this.formBuilder.group({
      title:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewactivityPage');
  }

  saveRecord(){
    if(this.frmActivity.valid){
      let todoObj={ title: "", description: "", price: "" };
      todoObj.title=this.title;
      todoObj.description=this.description;
      todoObj.price=this.price;

      this.storage.get('todoDetails').then((val)=>{
        if(val){
          this.addedTodo=val;
          this.addedTodo.push(todoObj);
          this.storage.set('todoDetails', this.addedTodo);
        }else{
          this.addedTodo.push(todoObj);
          this.storage.set('todoDetails', this.addedTodo);
        }
        this.title="";
        this.description="";
        this.price="";
        this.navCtrl.pop();
      });
    }
  }

}
