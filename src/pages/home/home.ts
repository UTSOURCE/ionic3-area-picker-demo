import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AreaModalPage } from "../area-modal/area-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedAreaData = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  doSelectAreaAction(): void {
    let modal = this.modalCtrl.create(AreaModalPage, {params: this.selectedAreaData});
    modal.onDidDismiss(data => {
      if (data) {
        this.selectedAreaData = data;
      }
    });
    modal.present();
  }

}
