import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery'
import { Geolocation } from '@ionic-native/geolocation';
import { TextToSpeech } from '@ionic-native/text-to-speech';

declare var Tmap;

var map, markerLayer, marker1, marker2;
var result = new Array();
var startingP = {};
var endingP = {};
var tdata = new Tmap.TData();
var name, id, lon, lat, options;
var status = 0;
var clonlat;
var loadInfo;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    Geolocation,
    TextToSpeech
  ]
})

export class HomePage {

  start: string = "";
  end: string = "";

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private tts:TextToSpeech) {

  }

  ionViewDidLoad(){

    this.init();

  }

  init(){

    map = new Tmap.Map({div: 'map_div', width: '100%', height:'400px'});

    //map.setCenter(new Tmap.LonLat(37.5633, 126.993), 14);
    this.geolocation.getCurrentPosition().then((resp) => {
          var epsg = new Tmap.Projection("EPSG:3857");  //tmap 좌표계 변환부분
          var wsg = new Tmap.Projection("EPSG:4326");
          clonlat = new Tmap.LonLat(resp.coords.longitude,resp.coords.latitude).transform(wsg, epsg);

          console.log(clonlat.lon +"d"+clonlat.lat);

          map.setCenter(new Tmap.LonLat(clonlat.lon, clonlat.lat),14);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  searchPlace(place){

        if(place != ""){
          tdata.events.register("onComplete", tdata, this.onCompleteTData);
          var center = map.getCenter();

            tdata.getPOIDataFromSearch(encodeURIComponent(place), { centerLon: center.lon, centerLat: center.lat });

        }
        else {
            alert("출발, 도착지를 입력하세요.");
        }
  }

  onCompleteTData(e) {

  //      result.splice(0, result.length);
        $('.result').remove();
        $('br').remove();

        if ($(tdata.responseXML).find("searchPoiInfo pois poi").text() != '') {
           $(tdata.responseXML).find("searchPoiInfo pois poi").each(function () {
                 name = $(this).find("name").text();
                 id = $(this).find("id").text();
                 lon = $(this).find("frontLon").text();
                 lat = $(this).find("frontLat").text();
                 options = {
                    label: new Tmap.Label(name),
                    lonlat: new Tmap.LonLat(lon, lat)
                };

                result.push({ lon: options.lonlat.lon,
                              lat: options.lonlat.lat,
                              label: options.label.labelHtml });

                $('#list').append("<button class='result' id='" + id + "'>" + name + "</button><br>");
            });

        } else {
            alert('검색결과가 없습니다.');
        }

        map.setCenter(new Tmap.LonLat(lon, lat), 14);

       var size = new Tmap.Size(24, 38);
       var offset = new Tmap.Pixel(-(size.w / 2), -size.h);
       var icon = new Tmap.Icon('https://developers.skplanetx.com/upload/tmap/marker/pin_b_m_a.png', size, offset);

       markerLayer = new Tmap.Layer.Markers();
       map.addLayer(markerLayer);

       $('.result').click(function(){
       var atname = $(this).text();

       //var atid = $(this).attr('id');
         if(status == 0){
           status = 1;
        for(var i = 0 ; i < result.length; i++){
          if(atname == result[i].label){
            startingP = {label : result[i].label,
                         lon : result[i].lon,
                         lat : result[i].lat};
                         console.log(startingP["label"]);

                         marker1 = new Tmap.Marker(new Tmap.LonLat(startingP["lon"],startingP["lat"]), icon);
                         markerLayer.addMarker(marker1);

                         break;

          }
        }
      }

      else {
        status = 0;
      for(i = 0 ; i < result.length; i++){
        if(atname == result[i].label){
          endingP = {label : result[i].label,
                     lon : result[i].lon,
                     lat : result[i].lat};
                     console.log(endingP["label"]);


                     marker2 = new Tmap.Marker(new Tmap.LonLat(endingP["lon"],endingP["lat"]), icon);
                     markerLayer.addMarker(marker2);

                     break;

        }
      }
    }
  });
      }

          searchRoute() {

              markerLayer.removeMarker(marker1);
              markerLayer.removeMarker(marker2);

             console.log(endingP["label"]+"  "+endingP["lon"]+"  "+endingP["lat"]);
              var routeFormat = new Tmap.Format.KML({ extractStyles: true, extractAttributes: true });
              var startX = startingP["lon"];
              var startY = startingP["lat"];
              var endX = endingP["lon"];
              var endY = endingP["lat"];
              var startName = startingP["label"];
              var endName = endingP["label"];
              var urlStr = "https://apis.skplanetx.com/tmap/routes/pedestrian?version=1&format=xml";
              urlStr += "&startX=" + startX;
              urlStr += "&startY=" + startY;
              urlStr += "&endX=" + endX;
              urlStr += "&endY=" + endY;
              urlStr += "&startName=" + encodeURIComponent(startName);
              urlStr += "&endName=" + encodeURIComponent(endName);
              urlStr += "&appKey=cc61f03a-8ad3-3571-bf21-79b856c68632";
              var prtcl = new Tmap.Protocol.HTTP({
                  url: urlStr,
                  format: routeFormat
              });
              var routeLayer = new Tmap.Layer.Vector("route", { protocol: prtcl, strategies: [new Tmap.Strategy.Fixed()] });
              routeLayer.events.register("featuresadded", routeLayer, this.onDrawnFeatures);
              map.addLayer(routeLayer);

              this.infor();

              }

          onDrawnFeatures(e) {

          }

          infor(){
            var url = 'https://apis.skplanetx.com/tmap/routes/pedestrian?version=1';
            var params = {
                    startX : startingP["lon"],
                    startY : startingP["lat"],
                    endX : endingP["lon"],
                    endY : endingP["lat"],
                    startName : startingP["label"],
                    endName : endingP["label"]
            }

            $.ajax({
                method: 'POST',
                url: url,
                data: params,
                beforeSend : function(xhr){
                    xhr.setRequestHeader("appKey", "cc61f03a-8ad3-3571-bf21-79b856c68632");
                    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                },
                complete: function(data) {
                    loadInfo = data.responseJSON.features;

                      for(var i in loadInfo){
                        console.log(loadInfo[i].properties.description);
                      }

                      console.log(location.href);
                }
            });
          }
//tts test
          tt(){
                      this.tts.speak({
            text: "안녕하세요",
            locale: "en-ko_KR"
                      }).then(() => console.log('Success'))
                      .catch((reason: any) => console.log('실패'));
                    }
}
