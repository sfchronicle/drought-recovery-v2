// require("./lib/social");
// var track = require("./lib/tracking");
require("angular/angular.min");
require("component-responsive-frame/child");
require("angular-ui-bootstrap")
require("angularjs-slider")

var app = angular.module("drought", ["rzModule","ui.bootstrap"]);

app.controller("DroughtController", ["$scope", "$filter", function($scope, $filter, $rootScope, $timeout, $modal) {
  // all the data
  $scope.rainData = rainData;
  $scope.snowData = snowData;
  console.log($scope.snowData);

  //variables
  var rain_floor = 0;
  var rain_ceil = 60;
  var snow_floor = 0;
  var snow_ceil = 60;

  // window size
  $scope.win_width = document.getElementById("head").scrollWidth;
  if ($scope.win_width < 620) {
    $scope.edge_width = 16+0.025*$scope.win_width;
    $scope.add_factor = -1;
  } else {
    $scope.edge_width = 0.025*$scope.win_width;
    $scope.add_factor = 1.2;
  }

  // initialize the chosen city & corresponding data
  $scope.selectedCity = 4;
  var cityIDX = $scope.selectedCity-1;
  $scope.rainRow = rainData[cityIDX];

  //rain slider default setup
  $scope.rain_slider = {
    value: $scope.rainRow.current_rainfall,
    options: {
      floor: rain_floor,
      ceil: rain_ceil,
      onChange: function() {
        $scope.rain_percent = Math.round($scope.rain_slider.value/$scope.rainRow.normal_rainfall*100);
      },
    }
  };
  $scope.rain_percent = Math.round($scope.rainRow.current_rainfall/$scope.rainRow.normal_rainfall*100);

  // snow slider default setup
  $scope.snow_slider = {
    value: $scope.snowData[0].current_inches,
    options: {
      floor: snow_floor,
      ceil: snow_ceil,
      onChange: function() {
        $scope.snow_percent = Math.round($scope.snow_slider.value/snowData[0].normal_inches*100);
      },
    }
  };
  $scope.snow_percent = Math.round($scope.snowData[0].current_inches/snowData[0].normal_inches*100);

  // automatically scroll the page
  $scope.set_page = function () {
    window.location = "#drought";
  }

  // reset operation is done when user changes city
  $scope.reset = function () {

    window.location = "#drought";

    // reset city and corresponding data
    cityIDX = $scope.selectedCity-1;
    $scope.rainRow = rainData[cityIDX];

    // rain slider default setup for new city
    $scope.rain_slider = {
      value: $scope.rainRow.current_rainfall,
      options: {
        floor: rain_floor,
        ceil: rain_ceil,
        onChange: function() {
          $scope.rain_percent = Math.round($scope.rain_slider.value/$scope.rainRow.normal_rainfall*100);
        },
      }
    };
    $scope.rain_percent = Math.round($scope.rainRow.current_rainfall/$scope.rainRow.normal_rainfall*100);

    // snow slider default setup
    $scope.snow_slider = {
      value: $scope.snowData[0].current_inches,
      options: {
        floor: snow_floor,
        ceil: snow_ceil,
        onChange: function() {
          $scope.snow_percent = Math.round($scope.snow_slider.value/snowData[0].normal_inches*100);
        },
      }
    };
    $scope.snow_percent = Math.round($scope.snowData[0].current_inches/snowData[0].normal_inches*100);

  }

}]);
