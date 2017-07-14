import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

declare var naver;
var map, polyline = null;
var marker = [null, null, null];  //출발, 도착, 검색 시 생성할 마커 3개

@Component({
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    place: string = "";

    constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

    }

    //처음 실행 시
    ionViewDidLoad() {
        this.loadmap();

    }

    startNav() {

        if (marker[0] != null && marker[1] != null) {
            polyline = new naver.maps.Polyline({
                map: map,
                path: [
                    new naver.maps.LatLng(marker[0].getPosition().y, marker[0].getPosition().x),
                    new naver.maps.LatLng(marker[1].getPosition().y, marker[1].getPosition().x)
                ],
                strokeWeight: 5
            });

            console.log(marker[0].getPosition().x, marker[0].getPosition().y);
            console.log(marker[1].getPosition().x, marker[1].getPosition().y);
        }
        else {
            alert("출발지와 목적지를 선택해주세요");
        }
    }

    //주소 검색 시
    searchPlace() {

        naver.maps.Service.geocode({
            address: this.place         //input으로 받은 주소값
        }, function (status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('Something wrong!');
            }

            //검색 결과 중 첫번째꺼 적용
            var item = response.result.items[0],
                point = new naver.maps.Point(item.point.x, item.point.y);

            map.setCenter(point);
            //console.log(point);
            marker[2] = new naver.maps.Marker({         //마커 생성
                position: point,                    //검색한 위치에 마커 생성
                map: map
            });
        });
    }

    //처음 실행 시 호출
    loadmap() {

        //초기 위치 => 나중에 gps통해 현재위치 가져오기로 바꿔야 함
        var mapOptions = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10
        };

        map = new naver.maps.Map('map', mapOptions);

        //지도에서 선택 시 이벤트핸들러 실행
        naver.maps.Event.addListener(map, 'click', function (e) {

            if (marker[0] == null) {                        //출발지 선택 안했을때
                marker[0] = new naver.maps.Marker({         //마커 생성
                    position: e.coord,                      //e.coord = 클릭좌표
                    map: map
                });
            }
            else if (marker[1] == null) {                  //도착지 선택 안했을때
                marker[1] = new naver.maps.Marker({
                    position: e.coord,
                    map: map
                });
            }
            else {
                alert("출발, 도착지 모두 선택함");
                //console.log(marker.length);
            }    //출발, 도착 모두 선택 후 클릭 시
        });
    }

    //마커 전부 삭제
    delMarker() {

        for (var i = 0; i < marker.length; i++) {
            if (marker[i] == null) {
                console.log("tt");
            //    console.log(marker[i]);
            }
            else {
                console.log("else실행");
                marker[i].setMap(null);   //마커 사라지게 함.
                delete marker[i];
            }
        }

        if (polyline != null) {
            polyline.setMap(null);
            polyline = null;
        }

    }

    findwalk() {
        var naverpathUrl: string;

        naverpathUrl = "http://map.naver.com/index.nhn?slng=" + marker[0].position.x + "&slat=" + marker[0].position.y + "&elng=" + marker[1].position.x + "&elat=" + marker[1].position.y + "&menu=route&pathType=3";

        window.open(naverpathUrl, '_blank');
        window.open("http://map.naver.com/findroute2/findWalkRoute.nhn?call=route2&output=json&coord_type=naver&search=0&start=" + marker[0].position.x + "%2C" + marker[0].position.y + "% 2C% EB % AA % 85 % EC % B9 % AD +%EC % 97 % 86 % EC % 9D% 8C& destination=" + marker[1].position.x + " % 2C" + marker[1].position.y+"% 2C% EB % AA % 85 % EC % B9 % AD +%EC % 97 % 86 % EC % 9D% 8C", '_blank');
    }
}