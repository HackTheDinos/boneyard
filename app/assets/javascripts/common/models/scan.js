/**
 * Model to represent a single scan.
 */
angular.module('boneyard')
    .factory('Scan', function() {
        'use strict';

        var INSTANCE_PROPERTIES = [
            'tiffs', 'preview'
        ];

        function Scan(attributes) {
            _.merge(this, _.pick(attributes, INSTANCE_PROPERTIES));
        }

        return Scan;

    });
