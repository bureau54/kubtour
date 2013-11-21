/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
		document.getElementById('map').addEventListener('click', this.showMap, false);
        
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    scan: function() {
        console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            //document.getElementById("info").innerHTML = result.text;
            console.log(result);
			
			if (result.cancelled < 1){
		
			$.ajax( {
                url: result.text,
                success:function(data) {
                  
				  if (jQuery.trim(data) != ""){
				    $('#kubtour-poi').html(data);
		  
                    $( function() { $( 'audio' ).audioPlayer(); } );
				  }
	            }}); 
				
			}
			
            
            //if (args.format == "QR_CODE") {
            //    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            //}
            

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    },
	
	showMap: function(){
		
		var lat;
        var longitude;
		
		var options = {
        enableHighAccuracy: true,   //  boolean (default: false)
        timeout: 10000,             //  in milliseconds (default: no limit)
        maximumAge: 1000            //  in milliseconds (default: 0)
    };
 
    navigator.geolocation.getCurrentPosition(showPosition, positionError, options);
 
    function showPosition(position) {
        var coords = position.coords;
 
        lat = coords.latitude;
        longitude = coords.longitude;
 
        showMap();
    }
 
    function positionError(e) {
        switch (e.code) {
            case 0: // UNKNOWN_ERROR
                logMsg("The application has encountered an unknown error while trying to determine your current location. Details: " + e.message);
                break;
            case 1: // PERMISSION_DENIED
                logMsg("You chose not to allow this application access to your location.");
                break;
            case 2: // POSITION_UNAVAILABLE
                logMsg("The application was unable to determine your location.");
                break;
            case 3: // TIMEOUT
                logMsg("The request to determine your location has timed out.");
                break;
        }
    }
 
    function logMsg(msg) {
        alert(msg);
    }
 
    function showMap() {
        $('#map_canvas').gmap().bind('init', function () {
            $('#map_canvas').gmap('addMarker', {
                'position': new google.maps.LatLng(lat, longitude),
                'visible': true,
                'bounds': true, //To get the marker in center
                'animation': google.maps.Animation.DROP,
                'icon': 'img/pin.png'
            }).click(function () {
                $('#map_canvas').gmap('openInfoWindow', { 'content': 'You are here' }, this);
            });
           $('#map_canvas').gmap('option', 'zoom', 8);
           $('#map_canvas').gmap('addShape', 'Circle', { 'strokeColor': "#8DAFDB", 'strokeOpacity': 0.8, 'strokeWeight': 2, 'fillColor': "#DADEE0", 'fillOpacity': 0.35, 'center': new google.maps.LatLng(lat, longitude), 'radius': 900 });
 
        });
    }

		$("#kubtour-poi").fadeToggle();
	    $("#map_canvas").css('width', $('#kubtour-poi').width()+'px');
		$("#map_canvas").css('height', $('#kubtour-poi').height()+'px');
	   

		$("#map_canvas").fadeToggle();
		
		
	},

    encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.bureau54.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    }

};