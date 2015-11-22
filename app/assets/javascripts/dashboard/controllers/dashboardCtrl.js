angular.module('boneyard')
    .controller('dashboardCtrl', function($scope, $interval, $timeout, SpecimenService) {
        'use strict';

        var LOADER_DOTS = 7;
        var DOT_LOAD_DELAY = 200;
        var DATA_LOAD_DELAY_OFFSET = 100;
        var LOAD_DELAY = (LOADER_DOTS + 3) * DOT_LOAD_DELAY;
        var dotIndex = 0;
        var dotLoader;

        $scope.loadData = false;
        $scope.loaderDots = _.times(LOADER_DOTS, function() {
            return false;
        });
        $scope.rowSelected = false;

        $scope.filter = function() {
            $('.search-form--advanced').fadeOut(100);
            search();
        };

        $scope.quickSearch = function(keyEvent) {
            if (keyEvent.which === 13) {
                search();
            }
        };

        $scope.search = search;

        $('body').on('click', function() {
            $('.search-form--advanced').fadeOut(100);
        });
        $('body').on('click', '.search-form--advanced', function() {
            return false;
        });
        $('body').on('click', '.search-form--advanced .checkbox', function() {
            $('#has-render').prop('checked', !$('#has-render').prop('checked'));
            return false;
        });
        $('body').on('click', '.search-form--advanced .control-check-label', function() {
            $('#has-render').prop('checked', !$('#has-render').prop('checked'));
            return false;
        });
        $('body').on('click', '.search-form--advanced-toggle', function() {
            $('.search-form--advanced').fadeIn(100);
            return false;
        });

        function playDots() {
            dotIndex = 0;
            _.times(LOADER_DOTS, function(index) {
                $scope.loaderDots[index] = false;
            });

            dotLoader = $interval(function() {
                $scope.loaderDots[dotIndex] = true;
                dotIndex++;

                if (dotIndex >= $scope.loaderDots.length) {
                    $interval.cancel(dotLoader);
                }
            }, DOT_LOAD_DELAY);
        }

        $scope.specimens = [];

        $scope.loadMore = function() {
            for (var i = 1; i <= 8; i++) {
                $scope.specimens.push({});
            }
            //$scope.openDetails($scope.specimens[0]);
        };

        $scope.openDetails = function(specimen) {
            specimen.selected = true;
            $scope.rowSelected = true;

            $timeout(function() {
                $scope.isListLoaded = false;
                $scope.isDotsLoaded = false;

                $('html, body').animate({
                    scrollTop: $('.specimens--list').offset().top
                }, 400);
                scrubberInit();
            }, 600);

            $timeout(function() {
                $scope.isDetailLoaded = true;
            }, 1000);
        };

        function resetDetails() {
            _.forEach($scope.specimens, function(specimen) {
                specimen.selected = false;
            });

            $scope.rowSelected = false;
            $scope.isDetailLoaded = false;
        }

        function resetSearch() {
            $scope.isDotsLoaded = true;
            $scope.loadData = false;
            $scope.isListLoaded = false;
        }

        function search() {
            // Reset if detailed view if open
            if ($scope.isDetailLoaded) {
                resetDetails();
            }

            // Reset search
            resetSearch();
            playSearch();
        }

        function playSearch() {
            $timeout(function() {
                $scope.isListLoaded = true;
            }, LOAD_DELAY);

            $timeout(function() {
                $scope.loadData = true;
            }, LOAD_DELAY + DATA_LOAD_DELAY_OFFSET);

            playDots();
        }

        function initialize() {
            $scope.specimens = [{}];

            search();
        }

        function scrubberInit(){
          // use a dummy element as the target since we don't really need anything visual to drag around
          var spriteslider = document.createElement('div');
          // the dummy element needs to be added to the DOM in latest Draggable
          document.body.appendChild(spriteslider);

          // attach all vars to the dummy element so globals aren't needed:
          // element that initiates dragging
          spriteslider.slider = document.getElementById('spriteslider');
          // element with the sprite sheet to control
          spriteslider.sprite = document.getElementById('spritetarget');
          // size of each sprite frame
          spriteslider.spritesize = 640;
          // number of sprite frames - used to keep multiplier in a reasonable range
          spriteslider.spritecount = 50;
          // pixels to drag per sprite update
          spriteslider.pixelsperincrement = 25;
          // values used by the sprite changer
          spriteslider.multiplier = spriteslider.lastmultiplier = 0;


          // create the 360 degree slider
          Draggable.create(spriteslider, {
            	type: 'x',
            trigger: spriteslider.slider,
            // reset the targets position after drag ends, so onDrag doesn't need to deal with an offset
            bounds: { minX:0, maxX:0, minY:0, maxY:0 },
            // don't need to slow down as you drag further away
          	  edgeResistance: 0,
            cursor: 'e-resize',
            onDrag: function() {
              // there is an extra drag event fired on mouse up that has x = 0, so check this.isDragging to skip that last one
              if (this.isDragging) {
                var t = this.target; // the dummy div
                t.multiplier = Math.floor(this.x / t.pixelsperincrement) + t.lastmultiplier;
                TweenLite.set(t.sprite, { backgroundPosition: (-t.multiplier * t.spritesize) + "px 0"});
              }
            },
          	onDragEnd: function()	{
              // saves the current multiplier, and keeps multiplier small so that backgroundPosition doesn't end up too large for the browser to render
              var t = this.target; // the dummy div
              t.lastmultiplier = t.multiplier % t.spritecount;
            }
          });
        }

        initialize();
    });
