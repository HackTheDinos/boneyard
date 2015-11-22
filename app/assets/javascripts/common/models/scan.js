/**
 * Model to represent a single scan.
 */
angular.module('boneyard')
    .factory('Scan', function() {
        'use strict';

        var INSTANCE_PROPERTIES = [
            'id', 'specimen_id', 'preview_uri', 'images', 'status', 'created_at', 'updated_at'
        ];

        function Scan(attributes) {
            _.merge(this, _.pick(attributes, INSTANCE_PROPERTIES));
        }

        return Scan;

    });
