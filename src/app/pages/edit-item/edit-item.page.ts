import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Item } from './../../model/item';

import { ItemService } from './../../services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  item: Item = {
    name: '',
    imgUrl: '',
    price: 0,
    description: ''
  };

  id: any;
  itemForm: FormGroup;

  selectedFile: File = null;
  upLoadedFile: any;

  constructor(
            private fb: FormBuilder,
            private itemService: ItemService,
            private activatedRoute: ActivatedRoute,
            private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.itemService.getItem(this.id).subscribe(res => {
      this.item = res;
      this.itemForm.controls['name'].setValue(this.item.name);
      this.itemForm.controls['imgUrl'].setValue(this.item.imgUrl);
      this.itemForm.controls['price'].setValue(this.item.price);
      this.itemForm.controls['description'].setValue(this.item.description);
    });

    this.loadUpdateProduct();
  }

  loadUpdateProduct(){
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

  update_Product(){
    if(this.itemForm.valid){
      this.itemService.updateItem(this.itemForm.value).then(() => {
        this.router.navigateByUrl('')
        console.log(this.itemForm.value)
      })
    }
  }

}
