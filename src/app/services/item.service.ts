import { Item } from './../model/item';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
//import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Observable<Item[]>;
  private collectionName: AngularFirestoreCollection<Item>;

  constructor(private afs: AngularFirestore) { 
    this.collectionName = this.afs.collection<Item>('lists');
    this.items = this.collectionName.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getItes(): Observable<Item[]> {
    return this.items;
  }

  getItem(id: string): Observable<Item> {
    return this.collectionName.doc<Item>(id).valueChanges().pipe(
        take(1),
        map(item => {
          item.id = id;
          return item;
        })
    );
  }


  addItem(item: Item): Promise<DocumentReference> {
    return this.collectionName.add(item);
  //  this.cartItemCount.next(this.cartItemCount.value + 1)
  }

  updateItem(item: Item): Promise<void> {
    return this.collectionName.doc(item.id).update({ name: item.name, imgUrl: item.imgUrl, price:item.price, description: item.description});
  }

  deleteItem(id: string): Promise<void> {
    return this.collectionName.doc(id).delete();
  }




  
}
