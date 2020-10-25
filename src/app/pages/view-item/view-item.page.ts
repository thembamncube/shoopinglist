import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from './../../model/item';

import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.page.html',
  styleUrls: ['./view-item.page.scss'],
})
export class ViewItemPage implements OnInit {

  item: Item = {
    name: '',
    imgUrl: '',
    price: 0,
    description: ''
  };
  
  id: any;

  constructor(
              private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.itemService.getItem(this.id).subscribe(res => {
        this.item = res;
      });
    }
  }

  delete_item() {
    this.itemService.deleteItem(this.item.id).then(() => {
      this.router.navigateByUrl('/');
    }, err => {
    });
  }

}
