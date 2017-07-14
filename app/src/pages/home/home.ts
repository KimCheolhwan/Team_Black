import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
var map;
declare var naver;
var marker;
var markerList = [];
var polyline;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  search: string ="";
  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.loadmap();
  }

  loadmap(){
      map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.601584, 126.954501), //지도의 초기 중심 좌표
        zoom: 8, //지도의 초기 줌 레벨
        minZoom: 1, //지도의 최소 줌 레벨
        zoomControl: true, //줌 컨트롤의 표시 여부
        zoomControlOptions: { //줌 컨트롤의 옵션
          position: naver.maps.Position.TOP_RIGHT
        }
      });
      marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(37.601584, 126.954501),
              map: map
          });
      markerList.push(marker);
      naver.maps.Event.addListener(map, 'click', function(e) {
        if(markerList.length===2){
            return alert('두곳 이상 선택 불가!');
          }

      var marker = new naver.maps.Marker({
          position: e.coord,
          map: map
        });
    markerList.push(marker);
  });
}
  delete_marker(){
    for (var i=0, ii=markerList.length; i<ii; i++) {
      markerList[i].setMap(null);
    }
    markerList = [];
    polyline.setMap(null);
    polyline = null;
}
  searchmap(){
    naver.maps.Service.geocode({
        address:this.search
    }, function(status, response){
      if(status===naver.maps.Service.Status.ERROR){
          return alert('Something Wrong!');
      }

      var item = response.result.items[0],
          point = new naver.maps.Point(item.point.x, item.point.y);
          marker = new naver.maps.Marker({
                  position: new naver.maps.LatLng(item.point.y, item.point.x),
                  map: map
                });
      map.setCenter(point);
      markerList[0]=marker;
      }
    );
  }
  find_road(){
      polyline = new naver.maps.Polyline({
        map: map,
        path: [
          new naver.maps.LatLng(markerList[0].position.y, markerList[0].position.x),
          new naver.maps.LatLng(markerList[1].position.y, markerList[1].position.x)
        ],
        endIcon: naver.maps.PointingIcon.BLOCK_ARROW,
        strokeColor: '#ff0000',
        strokeWeight: 6
    });
  }
}
