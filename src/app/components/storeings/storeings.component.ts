import { Component, OnInit, ViewChild } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
// import { ChecklistDirective } from 'ng2-checklist';
@Component({
  selector: 'app-storeings',
  templateUrl: './storeings.component.html',
  styleUrls: ['./storeings.component.css'],
})
// @Directive({ directives: ChecklistDirective })
export class StoreingsComponent implements OnInit {
    id;
    name;
    priceonce;
    numnow;
    newNumNow;
    numsell;
    newNumSell;
    by;
    storeings:any;
    oncestore:any;
    @ViewChild('modaladd')
    modaladd: ModalComponent;
    @ViewChild('modalsell')
    modalsell: ModalComponent;
    searchData;
    filterargs;
    userFilter: any = { name: '' };
    btnDel: boolean = true;
    idCheck:any;
   
  	constructor(
        private firebaseService:FirebaseService,
        public flashMessage:FlashMessagesService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

  	ngOnInit() {
    		this.firebaseService.getstores().subscribe(storeings => {
          this.storeings = storeings;
      	});

  	}

    delClick(){
        this.btnDel = !this.btnDel;
    }

    del(ele){
      this.btnDel = !this.btnDel;
      // console.log(this.idCheck)
      console.log(ele)
    }

    addNumNow(oncestore){
        this.id = oncestore.$key;
        this.name = oncestore.name;
        this.priceonce = oncestore.priceonce;
        this.numnow = oncestore.numnow;
        this.by = oncestore.by;
        this.modaladd.open();
    }

    onAddSubmit(){

      let storeing = {
          numnow: this.numnow+this.newNumNow,
          by: this.by
      }
      this.firebaseService.updateStoreing(this.id, storeing);
      this.modaladd.close();
      this.flashMessage.show('อัพเดตรายการ '+this.name +
          'จาก '+(this.numnow)+' หน่วย เป็น '+(this.numnow+this.newNumNow)+' หน่วย',
          {cssClass: 'alert-success', timeout: 3000});
    }

    numSell(oncestore){
        this.id = oncestore.$key;
        this.name = oncestore.name;
        this.priceonce = oncestore.priceonce;
        this.numnow = oncestore.numnow;
        this.numsell = oncestore.numsell;
        this.by = oncestore.by;
        this.modalsell.open();
    }

    numSellSubmit(){
      let storeing = {
          numnow: this.numnow-this.newNumSell,
          numsell: this.numsell+this.newNumSell,
      }
      this.firebaseService.updateStoreing(this.id, storeing);

      this.modalsell.close();
      this.flashMessage.show('อัพเดตรายการ '+this.name +
          'จาก '+this.numnow+' หน่วย เป็น '+(this.numnow-this.newNumSell)+' หน่วย',
          {cssClass: 'alert-success', timeout: 3000});
    }
}   
