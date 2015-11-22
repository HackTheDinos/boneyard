/**
 * Model to represent a single specimen.
 */
angular.module('boneyard')
    .factory('Specimen', function() {
        'use strict';

        var INSTANCE_PROPERTIES = [
            'id', 'name', 'scanned_at', 'geometry_voxel_y', 'geometry_voxel_x', 'xray_voltage',
            'xray_current', 'ct_number_images', 'calib_averaging', 'calib_num_image', 'calib_skip',
            'detector_timing_value', 'institutional_id', 'scientific_name', 'common_name',
            'bone_type', 'author', 'status', 'created_at', 'updated_at',
            'fossil_group'
        ];

        function Specimen(attributes) {
            _.merge(this, _.pick(attributes, INSTANCE_PROPERTIES));
        }

        return Specimen;

    });
