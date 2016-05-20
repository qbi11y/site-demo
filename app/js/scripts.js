var app = angular.module('Socket', ['ui-router']);

app.controller('ImageCtrl', ['$scope', function($scope) {
    console.log('controller working');
    $scope.images = [];
    var socket = io();

    socket.on('image:added', function(msg){
        //console.log('image added: ' + indexOf(charAt(0) == '.'));
        if ($scope.images.indexOf(msg) != -1) {
            $scope.$apply(function() {
                $scope.images.splice($scope.images.indexOf(msg), 1);
            });
        } else {
           if (msg.charAt(0) != '.') {
                $scope.$apply(function() {
                    $scope.images.push(msg);
                });
            } 
        }
        
    });

    socket.on('image:init', function(images) {
        console.log('images in folder:', images[0].charAt(0));
        for (var n=0; n < images.length; n++) {
            console.log('inspect', images[n]);
            if(images[n].charAt(0) != '.') {
                $scope.$apply(function() {
                    $scope.images.push(images[n]);
                });
            }
        }
        //console.log('image added: ' + images.indexOf(charAt(0) == '.'));
        /*$scope.$apply(function() {
            $scope.images = images;
        });*/
    });
}]);



