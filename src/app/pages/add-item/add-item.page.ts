import { Item } from './../../model/item';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ItemService } from '../../services/item.service';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
require('firebase/firestore');

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  item: Item = {
    name: '',
    imgUrl: '',
    price: 0,
    description: ''
  };

  itemForm: FormGroup;
  //item: Item;

  selectedFile: File = null;
  upLoadedFile: any;

  constructor(
              private fb: FormBuilder,
              private itemService: ItemService,
              private router: Router
  ) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      imgUrl: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = (p) => {
      console.log(p);
    };
    reader.onloadend = (e) => {
      console.log(e.target);
      this.upLoadedFile = reader.result;
      this.itemForm.get('imgUrl').setValue(this.upLoadedFile);
      //console.log(this.upLoadedFile);
    };
  }

  create_Product(){
    if(this.itemForm.valid){
      this.itemService.addItem(this.itemForm.value).then(() => {
        this.router.navigateByUrl('/');
      })
    }
      if(this.itemForm.valid){
       firebase.firestore().collection('products').add(this.item).then(res => {
         console.log(res)
         this.itemForm.reset();
       })
     }
   }

}
