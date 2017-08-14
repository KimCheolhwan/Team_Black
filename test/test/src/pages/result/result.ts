import { ElementRef,Component } from '@angular/core';
import { NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users'
import { Media, MediaObject } from '@ionic-native/media';

import * as $ from 'jquery';


/**
 * Generated class for the ResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var map,icon,marker,startX,startY,endX,endY,routeLayer,tdata,loadInfo,startName,endName,pr_3857,pr_4326,index=0,loadInfoIndex=0;
var markers = new Tmap.Layer.Markers('MarkerLayer');
var icon = new Tmap.Icon('https://developers.skplanetx.com/upload/tmap/marker/pin_b_m_a.png',size,offset);
var routeFormat = new Tmap.Format.KML({extractStyles:true, extractAttributes:true});
var mapW, mapH;     // 지도의 가로, 세로 크기(Pixel단위) 를 지정 합니다.
var cLonLat, zoom;      //중심 좌표와 지도레벨을 정의 합니다.
declare var Tmap;
var description:Array<string> = [];
var size = new Tmap.Size(21,25);
var offset = new Tmap.Pixel(-(size.w/2), -size.h);
var list: Object[]=[];
var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000
};
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  users: any;
  destination : string='';
  track : any;

  constructor(private media: Media,public elRef:ElementRef,public viewCtrl: ViewController,public userService: UsersProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,) {

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
        pr_3857 = new Tmap.Projection("EPSG:3857"); //EPSG3857
        pr_4326 = new Tmap.Projection("EPSG:4326"); // WSG84
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
    $('.lists').html('');  //리스트 화면 초기화
    if($(tdata.responseXML).find("searchPoiInfo pois poi").text() != ''){
        $(tdata.responseXML).find("searchPoiInfo pois poi").each(function(){
            var name = $(this).find("name").text();
            var lon = $(this).find("frontLon").text();
            var lat = $(this).find("frontLat").text();
            var options= {
                label:new Tmap.Label(name),
                lonlat:new Tmap.LonLat(lon,lat)
            };

            $(".lists").append(`<li><button id='${list.length}'>${name}</button></li>`);
            //리스트 선택시
            document.getElementById(`${list.length}`).addEventListener("click",function(e){
              description=[]; //description 초기화
              var index = $(this).attr('id');
              map.setCenter(list[index].lonlat,15);
              marker = new Tmap.Marker(list[index].lonlat,icon);
              markers.addMarker(marker);

              if(routeLayer)
                map.removeLayer(routeLayer);
              var routeFormat = new Tmap.Format.KML({extractStyles:true, extractAttributes:true});
              endX = list[index].lonlat.lon;
              endY = list[index].lonlat.lat;
              startName = '출발지';
              endName = list[index].label.labelHtml;
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

              var url = 'https://apis.skplanetx.com/tmap/routes/pedestrian?version=1';
              var params = {
                    startX : startX,
                    startY : startY,
                    endX : endX,
                    endY : endY,
                    startName : startName,
                    endName : endName
                  }

            $.ajax({
                method: 'POST',
                url: url,
                data: params,
                beforeSend : function(xhr){
                    xhr.setRequestHeader("appKey", "be55ebdb-cdfc-3824-8d96-0baad638511c");
                    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                },
                complete: function(data) {
                    loadInfo = data.responseJSON.features;
                      for(var i in loadInfo){
                        description.push(loadInfo[i].properties.description);
                      }
                  }
              });
            });
            list.push(options);
        });

      }else {
          alert('검색결과가 없습니다.');
      }
    }
    navigate(){
      index=0;
      map.addLayer(routeLayer);
      map.setCenter( new Tmap.LonLat(startX, startY),15);

      // this.userService.pushDescription(description).then((data)=>{
      //   console.log('description push complete' );
      //
      // });


      // id = navigator.geolocation.watchPosition(this.success, this.geo_error, geo_options);
      this.userService.getTTS().then((data)=>{


      });


    }
    test(){
      console.log('getTTS result:' + index);
      var file : MediaObject= this.media.create('./test.mp3');
      file.play();
    }
    // success(position){
    //   var lonlat = new Tmap.LonLat(position.coords.longitude,position.coords.latitude).transform(pr_4326,pr_3857);
    //   startX = Math.floor(lonlat.lon);
    //   startY = Math.floor(lonlat.lat);
    //
    //   if(typeof(loadInfo[loadInfoIndex].geometry.coordinates[0])==='number'){
    //
    //     if(startX===loadInfo[loadInfoIndex].geometry.coordinates[0] && startY === loadInfo[loadInfoIndex].geometry.coordinates[1]){
    //       this.userService.getTTS().then((data)=>{
    //         console.log('getTTS result:' + index);
    //         $('#audio').attr('src','C:/test/server/audio/test.mp3');
    //         index++;
    //       });
    //       loadInfoIndex++;
    //     }
    //   }else{
    //     if(startX === loadInfo[loadInfoIndex].geometry.coordinates[2][0] && startY ===loadInfo[loadInfoIndex].geometry.coordinates[2][1]){
    //       this.userService.getTTS().then((data)=>{
    //         console.log('getTTS result:' + index);
    //         $('#audio').attr('src','C:/test/server/audio/tts'+index+'.mp3');
    //         index++;
    //       });
    //       loadInfoIndex++;
    //     }
    //   }
    // }
    // geo_error() {
    //   alert("위치 정보를 사용할 수 없습니다.");
    // }

}
