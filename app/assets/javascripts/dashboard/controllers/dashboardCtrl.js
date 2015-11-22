angular.module('boneyard')
    .controller('dashboardCtrl', function($scope, SpecimenService) {
        'use strict';

        //SpecimenService
        //    .all()
        //    .then(function(specimens) {
        //        $scope.specimens = specimens;
        //    });

        $scope.search = function() {

        };

        $scope.images = [];

        $scope.loadMore = function() {
            var last = $scope.images[$scope.images.length - 1] || -1;
            for (var i = 1; i <= 8; i++) {
                $scope.images.push(last + i);
            }
        };

        function initialize() {
            $scope.specimens = [{}];
        }

        initialize();
    });
