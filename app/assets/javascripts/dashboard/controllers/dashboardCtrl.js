angular.module('boneyard')
    .controller('dashboardCtrl', function($scope, SpecimenService) {
        'use strict';

        SpecimenService
            .all()
            .then(function(specimens) {
                $scope.specimens = specimens;
            });

        $scope.search = function() {

        };

        function initialize() {

        }

        initialize();
    });
