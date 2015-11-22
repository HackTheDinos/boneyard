angular.module('boneyard')
    .controller('dashboardCtrl', function($scope, $interval, $timeout, SpecimenService) {
        'use strict';

        var LOADER_DOTS = 7;
        var DOT_LOAD_DELAY = 200;
        var DATA_LOAD_DELAY_OFFSET = 100;
        var LOAD_DELAY = (LOADER_DOTS + 3) * DOT_LOAD_DELAY;
        var dotIndex = 0;
        var dotLoader;

        $scope.loadData = false;
        $scope.loaderDots = _.times(LOADER_DOTS, function() {
            return false;
        });

        $scope.filter = function() {
            $('.search-form--advanced').fadeOut(100);
        };

        $('body').on('click', function() {
            $('.search-form--advanced').fadeOut(100);
        });
        $('body').on('click', '.search-form--advanced', function() {
            return false;
        });
        $('body').on('click', '.search-form--advanced .checkbox', function() {
            $('#has-render').prop('checked', !$('#has-render').prop('checked'));
            return false;
        });
        $('body').on('click', '.search-form--advanced .control-check-label', function() {
            $('#has-render').prop('checked', !$('#has-render').prop('checked'));
            return false;
        });
        $('body').on('click', '.search-form--advanced-toggle', function() {
            $('.search-form--advanced').fadeIn(100);
            return false;
        });

        function loadDots() {
            dotLoader = $interval(function() {
                $scope.loaderDots[dotIndex] = true;
                dotIndex++;

                if (dotIndex >= $scope.loaderDots.length) {
                    $interval.cancel(dotLoader);
                }
            }, DOT_LOAD_DELAY);
        }

        $scope.images = [];

        $scope.loadMore = function() {
            var last = $scope.images[$scope.images.length - 1] || -1;
            for (var i = 1; i <= 8; i++) {
                $scope.images.push(last + i);
            }
        };

        function initialize() {
            $scope.specimens = [{}];

            $timeout(function() {
                $scope.isLoaded = true;
            }, LOAD_DELAY);

            $timeout(function() {
                $scope.loadData = true;
            }, LOAD_DELAY + DATA_LOAD_DELAY_OFFSET);

            loadDots();
        }

        initialize();
    });
