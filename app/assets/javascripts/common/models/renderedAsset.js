/**
 * Model to represent a single rendered asset.
 */
angular.module('boneyard')
    .factory('RenderedAsset', function() {
        'use strict';

        var INSTANCE_PROPERTIES = [
            'id', 'specimen_id', 'uri', 'name', 'status', 'created_at', 'updated_at'
        ];

        function RenderedAsset(attributes) {
            _.merge(this, _.pick(attributes, INSTANCE_PROPERTIES));
        }

        return RenderedAsset;

    });
