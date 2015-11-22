angular.module('boneyard')
    .factory('SpecimenService', function ($resource, Specimen) {
        'use strict';

        var service = $resource('/api/specimens/:id', { id: '@id' }, {});

        function all(parameters) {
            return service.query(parameters || {}).$promise
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
            return new Specimen(attributes);
        }

        return {
            all: all,
            find: find
        };

    });
