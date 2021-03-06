/**
 * Created by Vaishampayan Reddy on 4/19/2016.
 */
var sensorcloud = angular.module('sensorcloud', [ 'ngRoute' ]);

sensorcloud.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'projects/default.html',
        controller: 'defaultController'
    }).when('/login', {
        templateUrl: 'projects/login.html',
        controller: 'loginController'
    }).when('/signup', {
        templateUrl : 'projects/signup.html',
        controller : 'signupController'
    }).when('/home', {
        templateUrl : 'projects/home.html',
        controller : 'homeController'
    }).when('/home/sensors/:sensorid', {
        templateUrl : 'projects/sensor.html',
        controller : 'sensorController'
    }).when('/billing', {
        templateUrl : 'projects/billing.html',
        controller : 'billingController'
    }).when('/contactus', {
        templateUrl : 'projects/contact.html',
        controller : 'contactController'
    }).otherwise({
        redirectTo : '/'
    });
    //$locationProvider.html5Mode(true);
}
]);

sensorcloud.directive( 'goClick', function ( $location ) {
    return function ( scope, element, attrs ) {
        var path;

        attrs.$observe( 'goClick', function (val) {
            path = val;
        });

        element.bind( 'click', function () {
            scope.$apply( function () {
                $location.path( path );
            });
        });
    };
});

sensorcloud.controller('billingController', function($scope, $routeParams, $http) {
    var checkLogin = $http.get('/api/login');
    checkLogin.success(function(data) {
        if(data == 401) {
            window.location = "#/login"
        }
    });

    var userProfileResponse = $http.get('/api/profile');
    userProfileResponse.success(function(profile) {
        console.log(profile);
        $scope.profile = profile;
        loadBilling();
    });

    var loadBilling = function() {
        var billingDetailsResponse = $http.get('/api/sensor/' + $scope.profile.userid + '/pricing');
        billingDetailsResponse.success(function(data) {
            $scope.billing = data;
            $scope.total_price = 0;
            $scope.total_hours = 0;
            data.forEach(function(bill) {
                $scope.total_price += parseInt(bill.billing_hours) * 2;
                $scope.total_hours += parseInt(bill.billing_hours);
            });
        });
    }
});

sensorcloud.controller('contactController', function($scope, $routeParams, $http) {
    var checkLogin = $http.get('/api/login');
    checkLogin.success(function(data) {
        if(data == 401) {
            window.location = "#/login"
        }
    });
});

sensorcloud.controller('defaultController', function($scope, $routeParams, $http) {
    var chart = AmCharts.makeChart("demoOne", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [ {
            "country": "USA",
            "visits": 2025
        }, {
            "country": "China",
            "visits": 1882
        }, {
            "country": "Japan",
            "visits": 1809
        }, {
            "country": "UK",
            "visits": 1122
        }, {
            "country": "France",
            "visits": 1114
        }, {
            "country": "India",
            "visits": 984
        }, {
            "country": "Russia",
            "visits": 580
        } ],
        "valueAxes": [ {
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
        } ],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [ {
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "visits"
        } ],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "country",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20
        },
        "export": {
            "enabled": true
        }

    } );

    var chart2 = AmCharts.makeChart("demoTwo", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [ {
            "country": "USA",
            "litres": 2025
        }, {
            "country": "China",
            "litres": 1882
        }, {
            "country": "Japan",
            "litres": 1809
        }, {
            "country": "UK",
            "litres": 1122
        }, {
            "country": "France",
            "litres": 1114
        }, {
            "country": "India",
            "litres": 984
        }, {
            "country": "Russia",
            "litres": 580
        } ],
        "valueField": "litres",
        "titleField": "country",
        "balloon":{
            "fixedPosition":true
        },
        "export": {
            "enabled": true
        }
    });

    var chart3 = AmCharts.makeChart("demoThree", {
        "type": "serial",
        "theme": "light",
        "marginRight":80,
        "autoMarginOffset":20,
        "dataDateFormat": "YYYY-MM-DD HH:NN",
        "dataProvider": [ {
            "date": "2012-01-02",
            "color":"#CC0000",
            "value": 10
        }, {
            "date": "2012-01-03",
            "value": 12
        }, {
            "date": "2012-01-04",
            "value": 14
        }, {
            "date": "2012-01-05",
            "value": 11
        }, {
            "date": "2012-01-06",
            "value": 6
        }, {
            "date": "2012-01-07",
            "value": 7
        }, {
            "date": "2012-01-08",
            "value": 9
        }, {
            "date": "2012-01-09",
            "value": 13
        }, {
            "date": "2012-01-10",
            "value": 15
        }, {
            "date": "2012-01-11",
            "color":"#CC0000",
            "value": 19
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "guides": [{
                "fillAlpha": 0.1,
                "fillColor": "#888888",
                "lineAlpha": 0,
                "toValue": 16,
                "value": 10
            }],
            "position": "left",
            "tickLength": 0
        }],
        "graphs": [{
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>value:[[value]]</span></b>",
            "bullet": "round",
            "dashLength": 3,
            "colorField":"color",
            "valueField": "value"
        }],
        "trendLines": [{
            "finalDate": "2012-01-11 12",
            "finalValue": 19,
            "initialDate": "2012-01-02 12",
            "initialValue": 10,
            "lineColor": "#CC0000"
        }, {
            "finalDate": "2012-01-22 12",
            "finalValue": 10,
            "initialDate": "2012-01-17 12",
            "initialValue": 16,
            "lineColor": "#CC0000"
        }],
        "chartScrollbar": {
            "scrollbarHeight":2,
            "offset":-1,
            "backgroundAlpha":0.1,
            "backgroundColor":"#888888",
            "selectedBackgroundColor":"#67b7dc",
            "selectedBackgroundAlpha":1
        },
        "chartCursor": {
            "fullWidth":true,
            "valueLineEabled":true,
            "valueLineBalloonEnabled":true,
            "valueLineAlpha":0.5,
            "cursorAlpha":0
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisAlpha": 0,
            "gridAlpha": 0.1,
            "minorGridAlpha": 0.1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        }
    });

    chart.addListener("dataUpdated", zoomChart);

    function zoomChart(){
        chart.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
    }
});

sensorcloud.controller('loginController', function($scope, $routeParams, $http) {
    $scope.formData = {};
    $scope.spinner = true;
    $scope.login = function() {
        $scope.spinner = false;
        $http({
            method : 'POST',
            url : '/api/login',
            data : $.param($scope.formData),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            console.log(data);
            $scope.spinner = true;
            if(data.status === 200) {
                window.location = "#/home";
            }
            else {
                $scope.spinner = true;
                $scope.errmsg = data.message;
                $("#myModal").modal();
            }
        });
    };
});

sensorcloud.controller('signupController', function($scope, $routeParams, $http) {
    $scope.formData = {};
    $scope.spinner = true;
    $scope.signup = function() {
        $scope.spinner = false;
        $http({
            method : 'POST',
            url : '/api/register',
            data : $.param($scope.formData),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            console.log(data);
            $scope.spinner = true;
            if(data.status == 201) {
                window.location = "#/login";
            }
            else {
                $scope.spinner = true;
                $scope.errmsg = data.message;
                $("#myModal").modal();
            }
        });
    };
});

sensorcloud.controller('homeController', function($scope, $routeParams, $http) {
    $scope.spinner = true;
    console.log("***** controller");
     var amsterdam1=new google.maps.LatLng(40.293210, -121.939071);
     var amsterdam2=new google.maps.LatLng(36.8502863, -119.8259927);
     var amsterdam3=new google.maps.LatLng(33.7648594, -116.1897527);

    var homeMapDiv = document.getElementById("googleMap");
    var mapDiv = document.getElementById("googleMap2");

    // function initialize()
    // {
    //     console.log("***** initialize");
    var mapProp = {
        center: amsterdam1,
        zoom:5,
        zoomControl: true,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var homeMapProp = {
        center:amsterdam2,
        zoom:6,
        zoomControl: true,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(mapDiv, mapProp);
    var homeMap = new google.maps.Map(homeMapDiv, homeMapProp);

    $("#myModal").on("shown.bs.modal", function () {
        google.maps.event.trigger(map, "resize");
    });

    var myCity1 = new google.maps.Circle({
        map: map,
        center:amsterdam1,
        radius:210000,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
    });

    var myCity2 = new google.maps.Circle({
        map: map,
        center:amsterdam2,
        radius:240000,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
    });

    var myCity3 = new google.maps.Circle({
        map: map,
        center:amsterdam3,
        radius:270000,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
    });

    var mycityHome1 = new google.maps.Circle({
        map: map,
        center:amsterdam1,
        radius:210000,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#9574b6",
        fillOpacity:0.4
    });

    var mycityHome2 = new google.maps.Circle({
        map: map,
        center:amsterdam2,
        radius:240000,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#9574b6",
        fillOpacity:0.4
    });

    var mycityHome3 = new google.maps.Circle({
        map: map,
        center:amsterdam3,
        radius:270000,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#9574b6",
        fillOpacity:0.4
    });

    mycityHome1.setMap(homeMap);
    mycityHome2.setMap(homeMap);
    mycityHome3.setMap(homeMap);

    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        // position: myLatLng
    });

    google.maps.event.addListener(myCity1, 'click', function (event) {
        $scope.latitude = "";
        $scope.longitude = "";
        marker.setPosition(event.latLng);
        $scope.latitude = marker.getPosition().lat();
        $scope.longitude = marker.getPosition().lng();
    });

    google.maps.event.addListener(myCity2, 'click', function (event) {
        $scope.latitude = "";
        $scope.longitude = "";
        marker.setPosition(event.latLng);
        $scope.latitude = marker.getPosition().lat();
        $scope.longitude = marker.getPosition().lng();
    });

    google.maps.event.addListener(myCity3, 'click', function (event) {
        $scope.latitude = "";
        $scope.longitude = "";
        marker.setPosition(event.latLng);
        $scope.latitude = marker.getPosition().lat();
        $scope.longitude = marker.getPosition().lng();
    });

    // TODO - add the functionality for drag events
    google.maps.event.addListener(marker, 'dragend', function () {});

    // }

    // google.maps.event.addaddDomListener(mapDiv, 'load', initialize);

    $scope.changeLatLng = function() {
        if($scope.longitude !== null && $scope.latitude !== null) {
            var myLatlng = new google.maps.LatLng($scope.latitude, $scope.longitude);
            marker.setPosition(myLatlng);
        }
    };

    var checkLogin = $http.get('/api/login');
    checkLogin.success(function(data) {
        if(data == 401) {
            window.location = "#/login"
        }
    });

    var userProfileResponse = $http.get('/api/profile');
    userProfileResponse.success(function(profile) {
        console.log(profile);
        $scope.profile = profile;
        loadSensors();
    });

    $scope.logout = function() {
        var logoutResponse = $http.get('/api/logout');
        logoutResponse.success(function(data) {
            if(data.status == 200) {
                window.location = "#/login";
            }
        });
    };
    
    $scope.createNewSensor = function() {
        $scope.spinner = false;
        var postBody = {};
        postBody.latitude = $scope.latitude;
        postBody.longitude = $scope.longitude;
        postBody.userid = $scope.profile.userid;
        postBody.name = $scope.name;
        $http({
            method : 'POST',
            url : '/api/sensor/create',
            data : postBody,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).success(function(data) {
            console.log(data);
            $scope.spinner = true;
            if(data.status == 201) {
                $('#myModal').modal('hide');
                window.location = "#/home";
            }
            else {
                $scope.spinner = true;
                $scope.errmsg = data.message;
            }
        });
    };

    $scope.hideSensorTable = true;
    var sensorMarkers = [];
    var loadSensors = function() {
        var loadMySensors = $http.get('api/sensor/' + $scope.profile.userid);
        loadMySensors.success(function(data) {
            console.log(data);
            if(data.length != 0) {
                $scope.hideSensorTable = false;
            }
            $scope.sensors = data;
            $scope.sensors.forEach(function(sensor) {
                var myCenter=new google.maps.LatLng(sensor.latitude, sensor.longitude);
                var mymarker=new google.maps.Marker({
                    position: myCenter,
                    animation:google.maps.Animation.BOUNCE
                });
                mymarker.setMap(homeMap);
                sensorMarkers.push(mymarker);
            });
        });
    }
});

sensorcloud.controller('sensorController', function($scope, $routeParams, $http) {
    $scope.spinner = true;
    var userProfileResponse = $http.get('/api/profile');
    userProfileResponse.success(function(profile) {
        console.log(profile);
        $scope.profile = profile;
    });
    
    $scope.logout = function() {
        var logoutResponse = $http.get('/api/logout');
        logoutResponse.success(function(data) {
            if(data.status == 200) {
                window.location = "#/login";
            }
        });
    };
    
    $scope.fetchData = function() {
        $scope.spinner = false;
        var time1 = new Date($scope.time1);
        var time2 = new Date($scope.time2);
        function generateChartData() {
            var chartData = [];
            var firstDate = new Date($scope.time1);
            firstDate.setMinutes(firstDate.getDate() - 1000);
            var time3 = new Date();
            if(time2 > time3)
            {
                time2 = time3;
            }
            var diff = time2 - time1;
            var max = 1100;
            var min = 1050;
            console.log((diff/(60*60*1000))*4);
            var newDate = new Date(firstDate);
            for (var i = 0; i < (diff/(60*60*1000))*4; i++) {
                // each time we add one minute
                var tempDate = new Date(newDate.getTime() + 15*60000)
                // some random number
                var value = Math.round(Math.random() * (max - min) + min);
                // add data item to the array
                chartData.push({
                    date: tempDate,
                    value: value
                });
                newDate = tempDate;
            }
            console.log(chartData);
            return chartData;
        }
        var chartData = generateChartData();
        var dataResponse = $http.get('/api/sensor/' + $scope.profile.userid + '/' + $routeParams.sensorid + '/data?time1=' + time1 + '&time2='+ time2);
        dataResponse.success(function(data) {

            for(var index = 0; index < data.length; index++) {
                var temp = {};
                temp.date = new Date(data[index].time);
                temp.value = data[index].value;
                chartData.push(temp);
            }
            var chart = AmCharts.makeChart("chartdiv", {
                "type": "serial",
                "theme": "light",
                "marginRight": 80,
                "dataProvider": chartData,
                "valueAxes": [{
                    "position": "left",
                    "title": "Atmosphere in millibars:"
                }],
                "graphs": [{
                    "id": "g1",
                    "fillAlphas": 0.4,
                    "valueField": "value",
                    "balloonText": "<div style='margin:5px; font-size:19px;'>Atmosphere in millibars:<b>[[value]]</b></div>"
                }],
                "chartScrollbar": {
                    "graph": "g1",
                    "scrollbarHeight": 80,
                    "backgroundAlpha": 0,
                    "selectedBackgroundAlpha": 0.1,
                    "selectedBackgroundColor": "#888888",
                    "graphFillAlpha": 0,
                    "graphLineAlpha": 0.5,
                    "selectedGraphFillAlpha": 0,
                    "selectedGraphLineAlpha": 1,
                    "autoGridCount": true,
                    "color": "#AAAAAA"
                },
                "chartCursor": {
                    "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
                    "cursorPosition": "mouse"
                },
                "categoryField": "date",
                "categoryAxis": {
                    "minPeriod": "mm",
                    "parseDates": true
                },
                "export": {
                    "enabled": true,
                    "dateFormat": "YYYY-MM-DD HH:NN:SS"
                }
            });

            $scope.spinner = true;

            chart.addListener("dataUpdated", zoomChart);
                // when we apply theme, the dataUpdated event is fired even before we add listener, so
                // we need to call zoomChart here
            zoomChart();
                // this method is called when chart is first inited as we listen for "dataUpdated" event
            function zoomChart() {
                // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
                chart.zoomToIndexes(chartData.length - 250, chartData.length - 100);
            }
        });
    };
});

