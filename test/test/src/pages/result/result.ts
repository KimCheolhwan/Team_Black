import { ElementRef,Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Geolocation } from '@ionic-native/geolocation';

import * as $ from 'jquery';

var map,marker,startX,startY,endX,endY,routeLayer,tdata,id,loadInfo,startName,endName,pr_3857,pr_4326,index=0,loadInfoIndex=1;
//var markers = new Tmap.Layer.Markers('MarkerLayer');
var markers = new Tmap.Layer.Markers();
var size = new Tmap.Size(21,25);
var offset = new Tmap.Pixel(-(size.w/2), -size.h);
var icon = new Tmap.Icon('https://developers.skplanetx.com/upload/tmap/marker/pin_b_m_a.png',size,offset);
var routeFormat = new Tmap.Format.KML({extractStyles:true, extractAttributes:true});
var mapW, mapH;     // 지도의 가로, 세로 크기(Pixel단위) 를 지정 합니다.
var cLonLat, zoom;      //중심 좌표와 지도레벨을 정의 합니다.
declare var Tmap;
var endIndex = 0;
var first = true;
var description:Array<string> = [];
var list: Object[]=[];
// let audio: HTMLElement = document.getElementById('#audio')
var audio = new Audio();
var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000
};
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
  providers: [
    Geolocation
  ]
})

export class ResultPage {
  @ViewChild("audio") audio;
  users: any;
  destination : string='';

  constructor(private geolocation: Geolocation,public elRef:ElementRef,public viewCtrl: ViewController,public userService: UsersProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
      $('#list').hide();
      this.init();
//      this.getGeolocation();
  }

  // setVariables(){
  //  cLonLat = new Tmap.LonLat(14135912.880612050, 4518334.160091842);
  //                  //중심점 좌표 입니다. EPSG3857 좌표계 형식 입니다.
  //  zoom = 11;  // zoom level입니다.  0~19 레벨을 서비스 하고 있습니다.
  //  mapW = '300px';  // 지도의 가로 크기 입니다.
  //  mapH = '300px';  // 지도의 세로 크기 입니다.
  // }

  init() {
    // this.setVariables();
    // map = new Tmap.Map({div:'map_div', width:mapW, height:mapH, animation:true});
    // map.setCenter(cLonLat,zoom);
    map = new Tmap.Map({div: 'map_div', width:'100%', height:'400px'});

    this.geolocation.getCurrentPosition().then((resp)=>{
      pr_3857 = new Tmap.Projection("EPSG:3857"); //EPSG3857
      pr_4326 = new Tmap.Projection("EPSG:4326"); // WSG84
      //WSG82를 EPSG3857로 변환
      cLonLat = new Tmap.LonLat(resp.coords.longitude,resp.coords.latitude).transform(pr_4326,pr_3857);

      map.setCenter(new Tmap.LonLat(cLonLat.lon, cLonLat.lat),14);
      startX = cLonLat.lon;
      startY = cLonLat.lat;
      console.log('hihi');

      map.addLayer(markers);

      // map.addLayer(markers);
      marker = new Tmap.Marker(new Tmap.LonLat(cLonLat.lon, cLonLat.lat),icon);
      markers.addMarker(marker);
    }).catch((error)=>{
      console.log('error', error);
    });
    // map.addLayer(markers);
    //
    // // map.addLayer(markers);
    // marker = new Tmap.Marker(new Tmap.LonLat(cLonLat.lon, cLonLat.lat),icon);
    // markers.addMarker(marker);
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
    $('#list').show();
    if(searchText!=""){
    tdata = new Tmap.TData();
    tdata.events.register("onComplete", tdata, this.onCompleteTData);
    var options = {version:1};
    var searchText = this.destination;
    var encodingSearchText= encodeURIComponent(searchText);
    tdata.getPOIDataFromSearch(encodingSearchText,options);
    }
    else{
      $('#list').hide();
    }
  }
  onCompleteTData(){
    list.splice(0,list.length); //리스트 초기화
    $('#list').html('');  //리스트 화면 초기화
    if($(tdata.responseXML).find("searchPoiInfo pois poi").text() != ''){
        $(tdata.responseXML).find("searchPoiInfo pois poi").each(function(){
            var name = $(this).find("name").text();
            var lon = $(this).find("frontLon").text();
            var lat = $(this).find("frontLat").text();
            var options= {
                label:new Tmap.Label(name),
                lonlat:new Tmap.LonLat(lon,lat)
            };

            $("#list").append(`<button class='result' id='${list.length}'>${name}</button><br>`);
            //리스트 선택시
            document.getElementById(`${list.length}`).addEventListener("click",function(e){
              $('#list').hide();
              description=[]; //description 초기화
              var index = $(this).attr('id');
              map.setCenter(list[index].lonlat,15);
              marker = new Tmap.Marker(list[index].lonlat,icon);
              markers.addMarker(marker);

              if(routeLayer)
                map.removeLayer(routeLayer);
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
          $('#list').hide();
      }

    }
    navigate(){
      index=0;
      map.addLayer(routeLayer);
      map.setCenter( new Tmap.LonLat(startX, startY),15);

      this.userService.pushDescription(description).then((data)=>{
        console.log('description push complete' );
      });
    }

    success(){
      // var lonlat = new Tmap.LonLat(position.coords.longitude,position.coords.latitude).transform(pr_4326,pr_3857);
      // startX = Math.floor(lonlat.lon);
      // startY = Math.floor(lonlat.lat);
      console.log('success()');

      if (index!= 0) {
      //
      // let watch = this.geolocation.watchPosition();
      // watch.subscribe((data) => {
      //
      //   var lonlat = new Tmap.LonLat(data.coords.longitude,data.coords.latitude).transform(pr_4326,pr_3857);
      //   startX = Math.floor(lonlat.lon);
      //   startY = Math.floor(lonlat.lat);
      //   console.log('success()1');
      //    //
      //   //  if(index == 0){
      //   //    console.log('Tㅆ');
      //   //    this.speak();
      //   //  }
      //   if(typeof(loadInfo[loadInfoIndex].geometry.coordinates[0])==='number'){
      //     if(startX===loadInfo[loadInfoIndex].geometry.coordinates[0] && startY === loadInfo[loadInfoIndex].geometry.coordinates[1]){
      //       this.speak();
      //       loadInfoIndex++;
      //     }
      //   }else{
      //     if(startX === loadInfo[loadInfoIndex].geometry.coordinates[2][0] && startY ===loadInfo[loadInfoIndex].geometry.coordinates[2][1]){
      //       this.speak();
      //       loadInfoIndex++;
      //     }
      //   }
      // });
      //watchPosition() 대신
      this.speak();
    }
    else{
      this.speak();
      //index++;
      loadInfoIndex++;
    }

      // if(typeof(loadInfo[loadInfoIndex].geometry.coordinates[0])==='number'){
      //   if(startX===loadInfo[loadInfoIndex].geometry.coordinates[0] && startY === loadInfo[loadInfoIndex].geometry.coordinates[1]){
      //     this.speak();
      //     loadInfoIndex++;
      //   }
      // }else{
      //   if(startX === loadInfo[loadInfoIndex].geometry.coordinates[2][0] && startY ===loadInfo[loadInfoIndex].geometry.coordinates[2][1]){
      //     this.speak();
      //     loadInfoIndex++;
      //   }
      // }

    }

    geo_error() {
      alert("위치 정보를 사용할 수 없습니다.");
    }

    speak(){
      // this.userService.getTTS()

      audio.src = "assets/audio/tts" + index + '.mp3';
      console.log(audio.src);
      audio.load();
      audio.play();
      index++;

      if(description.length==index){
        console.log(description.length-1);
        index = 0;
    }
    }
}
