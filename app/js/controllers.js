var app = angular.module('Controllers', []);

app.controller('DetailCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
    $scope.image = $stateParams.id;
    $scope.sizes = [2, 4, 6, 8, 10, 12];
}])

app.controller('ImageCtrl', ['$scope', '$state', function($scope, $state) {
    console.log('controller working');
    $scope.images = [];
    var socket = io();

    $scope.showDetails = function(img) {
        $state.go('details', {id: img});
    }

    socket.on('image:added', function(msg){
        console.log('image added', msg)
        //console.log('image added: ' + indexOf(charAt(0) == '.'));
        var split = msg.indexOf('.') + 1;
        if ($scope.images.indexOf(msg) != -1) {
            console.log('added image');
            $scope.$apply(function() {
                $scope.images.splice($scope.images.indexOf(msg), 1);
            });
        } else {
            //place the images into the $scope array
           if (msg.slice(split) == 'JPG' || msg.slice(split) == 'jpg' || msg.slice(split) == 'JPEG' || msg.slice(split) == 'jpeg' || msg.slice(split) == 'PNG' || msg.slice(split) == 'png') {
                console.log('added image to other section', msg);
                $scope.$apply(function() {
                    $scope.images.push(msg);
                });
            } 
        }
        
    });

    socket.on('image:init', function(images) {
        console.log('images in folder:', images[0].charAt(0));
        for (var n=0; n < images.length; n++) {
            var split = images[n].indexOf('.') + 1;
            console.log('inspect', images[n].slice(split));
            //determine file types that will be added to the array
            if(images[n].slice(split) == 'JPG' || images[n].slice(split) == 'jpg' || images[n].slice(split) == 'JPEG' || images[n].slice(split) == 'jpeg' || images[n].slice(split) == 'PNG' || images[n].slice(split) == 'png' ) {
                $scope.$apply(function() {
                    $scope.images.push(images[n]);
                });
            }
        }
    });
}]);



