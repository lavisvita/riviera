angular.module('app')
    .controller('registrationCtrl', function($scope, menuMaker){
        $scope.links = menuMaker.getMenu();
    });