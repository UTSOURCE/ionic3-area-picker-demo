# ionic3-area-picker-demo
### ionic3地区（省、市、区）选择器Demo

1. demo基于ionic的tabs模板，ionic start MyApp tabs。

2. 生成地区选择modal页面以及ts和scss文件，ionic generate page area-modal --no-module。
--no-module：generate命令的参数，根据字面意思也能猜出来，不生成module。在实际项目中根据实际情况来选择是否生成module来实现模块封装。

3. 在demo中使用了modal来完成地区的选择，主要是为了方便反向传值。
viewCtrl传值给modalCtrl属于正向传值，通过构造函数即可完成。
modalCtrl传值给viewCtrl属于反向传值，通过dismiss(data)完成。

    //在viewCtrl 中
    // viewCtrl正向传值给modalCtrl
    let modal = this.modalCtrl.create(AreaModalPage, {params: this.selectedAreaData}); 
    modal.onDidDismiss(data => {
      // viewCtrl接收到modalCtrl反向传值的处理
      if (data) {
        this.selectedAreaData = data;
      }
    });

    // 在modalCtrl中反向传值
    this.viewCtrl.dismiss(this.selectedArea);

4.  生成provider，提供Http服务，ionic generate provider area-modal。
在demo中，地区数据并不是从远端服务器中获取的，读取的是存放在项目中的area.json文件。
在实际开发中，http.get("远端url")即可获取远端服务器上的数据。
area.json文件存放到www目录中才能被访问到。以此推理，其他资源文件比如项目中的图标文件或许也该放到www目录中去。

5. 自定义头部导航条
在modal页面使用<ion-header>+<ion-toolbar>自定义顶部导航条
第一个<ion-toolbar>用于显示页面title和close按钮
第二个<ion-toolbar>用于显示已选中的地区信息

    <ion-header>
    <ion-toolbar>
    <ion-title>选择地区</ion-title>
    <ion-buttons left>
    <button ion-button (click)="dismiss()" icon-only>
    <ion-icon name="close"></ion-icon>
    </button>
    </ion-buttons>
    </ion-toolbar>
    <ion-toolbar>
    <ion-row>
    <ion-col *ngFor="let data of selectedArea; let i = index">
    <button ion-button full small clear (click)="doSwitchAreaAction(i)">{{data.text}}</button>
    </ion-col>
    </ion-row>
    </ion-toolbar>
    </ion-header>

6. 地区选择页面未实现滑动效果
