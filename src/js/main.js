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

  // initialize the chosen city & corresponding data
  $scope.selectedCity = 1;
  var cityIDX = $scope.selectedCity-1;
  $scope.rainRow = rainData[cityIDX];

  //rain slider default setup
  $scope.rain_slider = {
    value: $scope.rainRow.current_rainfall,
    options: {
      floor: rain_floor,
      ceil: rain_ceil,
    }
  };
  $scope.rain_percent = Math.round($scope.rainRow.current_rainfall/$scope.rainRow.normal_rainfall*100);

  // snow slider default setup
  $scope.snow_slider = {
    value: $scope.snowData[0].current_inches,
    options: {
      floor: snow_floor,
      ceil: snow_ceil
    }
  };

  $scope.round_rain_numbers = function (slider_val) {
    $scope.rain_percent = Math.round(slider_val/$scope.rainRow.normal_rainfall*100);
    console.log($scope.rain_percent);
  }


  $scope.reset = function () {
    // reset city and corresponding data
    cityIDX = $scope.selectedCity-1;
    $scope.rainRow = rainData[cityIDX];

    // rain slider default setup for new city
    $scope.rain_slider = {
      value: $scope.rainRow.current_rainfall,
      options: {
        floor: rain_floor,
        ceil: rain_ceil,
      }
    };
    $scope.rain_percent = Math.round($scope.rainRow.current_rainfall/$scope.rainRow.normal_rainfall*100);
    // snow slider default setup
    $scope.snow_slider = {
      value: $scope.snowData[0].current_inches,
      options: {
        floor: snow_floor,
        ceil: snow_ceil
      }
    };
  }

}]);
