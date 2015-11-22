angular.module('boneyard')
    .factory('RenderedAssetService', function($resource, RenderedAsset) {
        'use strict';

        var service = $resource('/api/rendered_assets/:id', { id: '@id' }, {});

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
            return new RenderedAsset(attributes);
        }

        return {
            all: all,
            find: find
        };

    });
