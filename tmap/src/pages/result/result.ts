import { ElementRef,Component } from '@angular/core';
import { NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the ResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var map,icon,marker,startX,startY,routeLayer,tdata;
var markers = new Tmap.Layer.Markers('MarkerLayer');
var icon = new Tmap.Icon('https://developers.skplanetx.com/upload/tmap/marker/pin_b_m_a.png',size,offset);
var routeFormat = new Tmap.Format.KML({extractStyles:true, extractAttributes:true});
var mapW, mapH;     // 지도의 가로, 세로 크기(Pixel단위) 를 지정 합니다.
var cLonLat, zoom;      //중심 좌표와 지도레벨을 정의 합니다.
declare var Tmap;
var size = new Tmap.Size(21,25);
var offset = new Tmap.Pixel(-(size.w/2), -size.h);
var list: Object[]=[];
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  users: any;
  destination : string='';
  constructor(public elRef:ElementRef,public viewCtrl: ViewController,public userService:UsersProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
      this.init();
      this.getGeolocation();
  }
  setVariables(){
   cLonLat = new Tmap.LonLat(14135912.880612050, 4518334.160091842);
                   //중심점 좌표 입니다. EPSG3857 좌표계 형식 입니다.
   zoom = 11;  // zoom level입니다.  0~19 레벨을 서비스 하고 있습니다.
   mapW = '300px';  // 지도의 가로 크기 입니다.
   mapH = '300px';  // 지도의 세로 크기 입니다.
  }

  init() {
    this.setVariables();
    map = new Tmap.Map({div:'map_div', width:mapW, height:mapH, animation:true});
    map.setCenter(cLonLat,zoom);
    map.addLayer(markers);
    marker = new Tmap.Marker(cLonLat,icon);
    markers.addMarker(marker);
  }

  getGeolocation(){
    //현재위치 가져오기
      navigator.geolocation.getCurrentPosition(function(position){
        var pr_3857 = new Tmap.Projection("EPSG:3857"); //EPSG3857
        var pr_4326 = new Tmap.Projection("EPSG:4326"); // WSG84
        //WSG82를 EPSG3857로 변환
        var lonlat = new Tmap.LonLat(position.coords.longitude,position.coords.latitude).transform(pr_4326,pr_3857);
        startX = lonlat.lon;
        startY = lonlat.lat;
      },function(error){
        console.error(error);
      });
  }

  back(){
    this.viewCtrl.dismiss();
  }

  find(){
    tdata = new Tmap.TData();
    tdata.events.register("onComplete", tdata, this.onCompleteTData);
    var options = {version:1};
    var searchText = this.destination;
    var encodingSearchText= encodeURIComponent(searchText);
    tdata.getPOIDataFromSearch(encodingSearchText,options);
  }

  onCompleteTData(){
    list.splice(0,list.length); //리스트 초기화
    jQuery('.lists').html('');  //리스트 화면 초기화
    if(jQuery(tdata.responseXML).find("searchPoiInfo pois poi").text() != ''){
        jQuery(tdata.responseXML).find("searchPoiInfo pois poi").each(function(){
            var name = jQuery(this).find("name").text();
            var lon = jQuery(this).find("frontLon").text();
            var lat = jQuery(this).find("frontLat").text();
            var options= {
                label:new Tmap.Label(name),
                lonlat:new Tmap.LonLat(lon,lat)
            };

            jQuery(".lists").append(`<li><button id='${list.length}'>${name}</button></li>`);
            //리스트 선택시
            document.getElementById(`${list.length}`).addEventListener("click",function(e){
              var index = jQuery(this).attr('id');
              map.setCenter(list[index].lonlat,zoom);
              marker = new Tmap.Marker(list[index].lonlat,icon);
              markers.addMarker(marker);

              // let option = {
              //   message:document.getElementById(index).innerHTML
              // };
              // this.userService.getCSS(option).then((data)=>{
              //
              // })

              if(routeLayer)
                map.removeLayer(routeLayer);
              var routeFormat = new Tmap.Format.KML({extractStyles:true, extractAttributes:true});
              var endX = list[index].lonlat.lon;
              var endY = list[index].lonlat.lat;
              var startName = '출발지';
              var endName = list[index].label.labelHtml;
              var urlStr = "https://apis.skplanetx.com/tmap/routes/pedestrian?version=1&format=xml";
                  urlStr += "&startX="+startX;
                  urlStr += "&startY="+startY;
                  urlStr += "&endX="+endX;
                  urlStr += "&endY="+endY;
                  urlStr += "&startName="+encodeURIComponent(startName);
                  urlStr += "&endName="+encodeURIComponent(endName);
                  urlStr += "&appKey=be55ebdb-cdfc-3824-8d96-0baad638511c";

              var prtcl = new Tmap.Protocol.HTTP({
                                                  url: urlStr,
                                                  format:routeFormat
                                                  });
              routeLayer = new Tmap.Layer.Vector("route", {protocol:prtcl, strategies:[new Tmap.Strategy.Fixed()]});
              routeLayer.events.register("featuresadded", routeLayer);
              map.addLayer(routeLayer);
              console.log(routeLayer);

            });
            list.push(options);
        });
      }else {
          alert('검색결과가 없습니다.');
      }
    }
}
