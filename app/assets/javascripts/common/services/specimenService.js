angular.module('boneyard')
    .factory('SpecimenService', function ($resource, Specimen) {
        'use strict';

        var service = $resource('/specimens', {}, {});

        function all() {
            return service.query().$promise
                .then(buildInstances);
        }

        function buildInstances(attributes) {
            return _.map(attributes, buildInstance);
        }

        function buildInstance(attributes) {
            return new Specimen(attributes);
        }

        return {
            all: all
        };

    });
