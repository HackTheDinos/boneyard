angular.module('boneyard')
    .factory('ScanService', function($resource, Scan) {
        'use strict';

        var service = $resource('/api/scans/:id', { id: '@id' }, {});

        function all() {
            return service.query().$promise
                .then(buildInstances);
        }

        function find() {
            return service.get().$promise
                .then(buildInstance);
        }

        function buildInstances(attributes) {
            return _.map(attributes, buildInstance);
        }

        function buildInstance(attributes) {
            return new Scan(attributes);
        }

        return {
            all: all,
            find: find
        };

    });
