import { Item } from './../../model/item';
import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public items: Observable<Item[]>;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.items = this.itemService.getItes();
  }

}
