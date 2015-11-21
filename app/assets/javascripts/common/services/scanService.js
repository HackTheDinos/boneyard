angular.module('boneyard')
    .factory('ScanService', function ($resource, Scan) {
        'use strict';

        var service = $resource('/scans', {}, {});

        function all() {
            return service.query().$promise
                .then(buildInstances);
        }

        function buildInstances(attributes) {
            return _.map(attributes, buildInstance);
        }

        function buildInstance(attributes) {
            return new Scan(attributes);
        }

        return {
            all: all
        };

    });
