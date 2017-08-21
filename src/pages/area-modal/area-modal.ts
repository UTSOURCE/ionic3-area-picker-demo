import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {AreaProvider} from "../../providers/area/area";

/**
 * Generated class for the AreaModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more inf
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-area-modal',
  templateUrl: 'area-modal.html',
})
export class AreaModalPage {

  private area = [];
  showData = [];
  selectedIndex: number = 0;

  selectedArea = [];

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public areaProvider: AreaProvider) {
    areaProvider.load().subscribe(res => {
      this.area = res;
      this.showData = this.area['provs_data'];

      this.selectedArea = navParams.get('params');
      if (this.selectedArea.length == 0) {
        this.selectedArea = [{text: "请选择", value: 0}];
      }

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AreaModalPage');
  }

  doSwitchAreaAction(index: number): void {

    this.selectedIndex = index;

    if (index == 0) {
      this.showData = this.area['provs_data'];
    } else if (index == 1) {
      let citys = this.area['citys_data'];
      this.showData = citys[this.selectedArea[0].value];
    } else if (index == 2) {
      let areas = this.area['dists_data'];
      this.showData = areas[this.selectedArea[1].value];
    }
  }

  itemClicked(data): void {

    let oldData = this.selectedArea[this.selectedIndex];
    if (oldData.value === 0) {
      this.selectedArea[this.selectedIndex] = data;

      if (this.selectedIndex < 2) {
        this.selectedArea.push({text: "请选择", value: 0});
      }
    } else if (oldData.value !== data.value) {
      this.selectedArea[this.selectedIndex] = data;
      if (this.selectedIndex < 2) {
        this.selectedArea = this.selectedArea.slice(0, this.selectedIndex + 1);
        this.selectedArea.push({text: "请选择", value: 0});
      }
    }

    if (this.selectedIndex == 0) {
      let citys = this.area['citys_data'];
      this.showData = citys[data.value];
      this.selectedIndex++;
      return
    }

    if (this.selectedIndex == 1) {
      let areas = this.area['dists_data'];
      this.showData = areas[data.value];
      this.selectedIndex++;
      return
    }

    this.viewCtrl.dismiss(this.selectedArea);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

}
