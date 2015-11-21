/**
 * Model to represent a single specimen.
 */
angular.module('boneyard')
    .factory('Specimen', function() {
        'use strict';

        var INSTANCE_PROPERTIES = [
            'id', 'name', 'scans'
        ];

        function Specimen(attributes) {
            _.merge(this, _.pick(attributes, INSTANCE_PROPERTIES));
        }

        return Specimen;

    });
