// require("./lib/social");
// var track = require("./lib/tracking");
require("angular/angular.min");
require("component-responsive-frame/child");
require("slider.js");
module.exports = 'ui.slider';

var app = angular.module("drought", []);

app.controller("DroughtController", ["$scope", "$filter", function($scope, $filter) {

  // all the data
  $scope.rainData = rainData;
  $scope.snowData = snowData;

  // initialize the chosen city & corresponding data
  $scope.selectedCity = 1;
  var cityIDX = $scope.selectedCity-1;
  $scope.rainRow = rainData[cityIDX];

  // how many tick-marks we have for rain and snow increments
  $scope.rain_list = ["1","2","3","4"];
  $scope.snow_list = ["1","2","3","4"];

  // THESE NEED TO BE SET BASED ON WHAT THE CURRENT VALUE IS AND WHAT OUR INCREMENTS ARE
  // rain variables
  $scope.activeValue = 1;
  $scope.activeInches = "0";
  $scope.activePercent = "0";
  // snow variables
  $scope.activeSnowValue = 1;
  $scope.activeSnowInches = "10";
  $scope.activeSnowPercent = "0.06";

  // TALK TO KURTIS ABOUT WHAT THESE SHOULD BE
  // success cutoffs
  var rainCutoff1 = 0.20;
  var rainCutoff2 = 0.15;
  var snowCutoff1 = 0.20;
  var snowCutoff2 = 0.15;

  // THESE PROBABLY NEED TO BE DIFFERENT DEPENDING ON CURRENT VALUES
  // drought variable
  $scope.droughtValue = 1;
  $scope.snowValue = 1;
  $scope.rainValue = 1;

  $scope.reset = function () {

    // USE COMMON VARIABLES!!!
    // rain variables
    $scope.activeValue = 1;
    $scope.activeInches = "0";
    $scope.activePercent = "0";
    //snow variables
    $scope.activeSnowValue = 1;
    $scope.activeSnowInches = "10";
    $scope.activeSnowPercent = "0.06";
    // result variables
    $scope.droughtValue = 1;
    $scope.snowValue = 1;
    $scope.rainValue = 1;

    // reset city and corresponding data
    cityIDX = $scope.selectedCity-1;
    $scope.rainRow = rainData[cityIDX];
  }

  $scope.setActive = function (item) {
    // set up the rain input values
    $scope.activeValue=item;
    var str_inches = "$scope.rainRow.inches"+item;
    $scope.activeInches=eval(str_inches);
    var str_percent = "$scope.rainRow.percent"+item;
    $scope.activePercent=eval(str_percent);

    // set up the overall outcome variables
    if ($scope.activePercent > rainCutoff1) {
      $scope.rainValue = 3;
    } else if ($scope.activePercent > rainCutoff2) {
      $scope.rainValue = 2;
    } else {
      $scope.rainValue = 1;
    }
    if ($scope.snowValue == 3 && $scope.rainValue == 3) {
      $scope.droughtValue = 3;
    } else if ($scope.snowValue == 1 && $scope.rainValue == 1) {
      $scope.droughtValue = 1;
    } else {
      $scope.droughtValue = 2;
    }
  }

  $scope.setSnowActive = function (item) {

    // set up the snow input values
    $scope.activeSnowValue=item;
    var str_inches = "$scope.snowData[0].inches"+item;
    $scope.activeSnowInches=eval(str_inches);
    var str_percent = "$scope.snowData[0].percent"+item;
    $scope.activeSnowPercent=eval(str_percent);

    // set up the overall outcome variables
    if ($scope.activeSnowPercent > snowCutoff1) {
      $scope.snowValue = 3;
    } else if ($scope.activeSnowPercent > snowCutoff2) {
      $scope.snowValue = 2;
    } else {
      $scope.snowValue = 1;
    }
    if ($scope.snowValue == 3 && $scope.rainValue == 3) {
      $scope.droughtValue = 3;
    } else if ($scope.snowValue == 1 && $scope.rainValue == 1) {
      $scope.droughtValue = 1;
    } else {
      $scope.droughtValue = 2;
    }
  }

}]);
