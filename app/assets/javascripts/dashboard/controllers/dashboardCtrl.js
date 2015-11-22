angular.module('boneyard')
    .controller('dashboardCtrl', function($scope, $interval, $timeout, SpecimenService, Specimen) {
        'use strict';

        var LOADER_DOTS = 7;
        var DOT_LOAD_DELAY = 200;
        var DATA_LOAD_DELAY_OFFSET = 100;
        var LOAD_DELAY = (LOADER_DOTS + 3) * DOT_LOAD_DELAY;
        var dotIndex = 0;
        var dotLoader;
        var nextSliceIndex = 0;

        $scope.totalSpecimens = 21805450;
        $scope.loadData = false;
        $scope.loaderDots = _.times(LOADER_DOTS, function() {
            return false;
        });
        $scope.rowSelected = false;
        $scope.form = {};
        $scope.selectedSpecimen;
        $scope.searchQuery = {};

        $scope.filter = function() {
            var parameters = {};
            appendParameter(parameters, 'name');
            appendParameter(parameters, 'scientific_name');
            appendParameter(parameters, 'common_name');
            appendParameter(parameters, 'bone_type');
            appendParameter(parameters, 'museum');

            $scope.searchQuery = _.cloneDeep(parameters);
            $('.search-form--advanced').fadeOut(100);
            search(parameters);
        };

        function appendParameter(object, key) {
            if (!_.isEmpty(_.trim($scope.form[key]))) {
                object[key] = $scope.form[key];
            }
        }

        $scope.quickSearch = function(keyEvent) {
            if (keyEvent.which === 13) {
                var parameters = {};
                 appendParameter(parameters, 'name');
                 appendParameter(parameters, 'scientific_name');
                 appendParameter(parameters, 'common_name');
                 appendParameter(parameters, 'bone_type');
                 appendParameter(parameters, 'museum');

                 $scope.searchQuery = _.cloneDeep(parameters);
                search(parameters);
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

        $scope.loadMore = function() {
            if ($scope.specimens.length >= $scope.rawSpecimens.length) {
                return;
            }

            var nextItems = _.slice($scope.rawSpecimens, nextSliceIndex, _.min([$scope.rawSpecimens.length, nextSliceIndex + 8]));

            _.forEach(nextItems, function(item) {
                $scope.specimens.push(item);
            });

            nextSliceIndex += 8;
        };

        $scope.openDetails = function(specimen) {
            specimen.selected = true;
            $scope.selectedSpecimen = specimen;
            $scope.rowSelected = true;

            $timeout(function() {
                $scope.isListLoaded = false;
                $scope.isDotsLoaded = false;

                $('html, body').animate({
                    scrollTop: $('.specimens--list').offset().top
                }, 400);
                scrubberInit();
                sketchFabInit();
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

        function search(parameters) {
            // Reset if detailed view if open
            if ($scope.isDetailLoaded) {
                resetDetails();
            }

            nextSliceIndex = 0;
            $scope.rawSpecimens.length = 0;
            $scope.specimens.length = 0;

            SpecimenService
                .all(parameters)
                .then(function(allSpecimens) {
                    var specimenList = [];
                    var times = 200;
                    if (_.includes(_.keys($scope.searchQuery), 'name')) {
                        times = 1;
                    }

                    _.times(times, function() {
                        specimenList.push(
                            new Specimen(_.defaults(_.cloneDeep($scope.searchQuery), {
                                created_at: _.random(1, 28) + ' ' + _.sample(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']) + ' ' + _.random(1950, 2014),
                                name: $scope.fake('specimenMuseums') + '-' + _.random(1000) + '' + _.random(999),
                                scientific_name: $scope.fake('scientificName'),
                                common_name: $scope.fake('commonName'),
                                bone_type: $scope.fake('boneType'),
                                fossil_group: $scope.fake('fossilGroup'),
                                museum: $scope.fake('museum'),
                                calib_num_image: _.random(1, 20),
                                calib_averaging: _.random(1, 5),
                                calib_skip: _.random(1, 5),
                                detector_timing_value: _.random(200.0, 500.0),
                                xray_current: _.random(100, 240),
                                xray_voltage: _.random(100, 240),
                                author: $scope.fake('doctor')
                            }))
                        );
                    });

                    $scope.rawSpecimens = specimenList;

                    // Reset search
                    resetSearch();
                    playSearch();
                });
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
            $scope.specimens = [];
            $scope.rawSpecimens = [];

            search();
            addFakeSpecimens();
        }

        function sketchFabInit(){
          var iframe = document.getElementById( 'api-frame' );
          var version = '1.0.0';
          var urlid = '39ca8ccb091642859f680fbc59a24d4b';
          var client = new Sketchfab( version, iframe );

          client.init( urlid, {
              success: function onSuccess( api ){
                  api.start();
                  api.addEventListener( 'viewerready', function() {
                  } );
              },
              error: function onError() {
                  console.log( 'Viewer error' );
              },
              autospin: 1
          } );
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

        function addFakeSpecimens() {
            $interval(function() {
                $scope.totalSpecimens += _.random(1, 10);
            }, 2000);
        }

        $scope.fake = function(type) {
            var faked = {
                specimenMuseums: ['TMP','IGM','AMNH','CM','UUVP','GAD'],
                fossilGroup: [
                    'Non-vertebrates','Other Fish-like Creatures','Amphibians','Mammals and Their Extinct Relatives','Turtles','Lizards, Snakes and Their Relatives','Alligators and Crocodiles','Birds','Dinosaurs and Extinct Relatives','Primates','Bats'
                ],
                commonName: [
                    'Acanthopholis','Acrocanthosaurus','Adasaurus','Aegyptosaurus','Aeolosaurus','Afrovenator','Agilisaurus','Alamosaurus','Albertosaurus','Alectrosaurus','Algoasaurus','Alioramus','Allosaurus','Altispinax','Alvarezsaurus','Alxasaurus','Amargasaurus','Ammosaurus','Amtosaurus','Amygdalodon','Anatotitan','Anchiceratops','Anchisaurus','Andesaurus','Ankylosaurus','Anserimimus','Antarctosaurus','Antrodemus','Apatosaurus','Aralosaurus','Archaeopteryx','Archaeornithoides','Archaeornithomimus','Argentinosaurus','Argyrosaurus','Arrhinoceratops','Atlascopcosaurus','Aublysodon','Austrosaurus','Avaceratops','Avimimus','Bactrosaurus','Bagaceratops','Bahariasaurus','Barapasaurus','Barosaurus','Baryonyx','Bellusaurus','Bothriospondylus','Brachiosaurus','Brachyceratops','Brachylophosaurus','Bradycneme','Caenagnathus','Calamospondylus','Callovosaurus','Camarasaurus','Camelotia','Camptosaurus','Carcharodontosaurus','Carnotaurus','Ceratops','Ceratosaurus','Cetiosauriscus','Cetiosaurus','Chasmosaurus','Chialingosaurus','Chilantaisaurus','Chindesaurus','Chingkankousaurus','Chirostenotes','Chubutisaurus','Chungkingosaurus','Claosaurus','Coelophysis','Coelurus','Coloradisaurus','Compsognathus','Conchoraptor','Corythosaurus','Dacentrurus','Daspletosaurus','Datousaurus','Deinocheirus','Deinodon','Deinonychus','Diceratops','Dicraeosaurus','Dilophosaurus','Diplodocus','Dracopelta','Dravidosaurus','Dromaeosaurus','Dromiceiomimus','Dryosaurus','Dryptosaurus','Dyslocosaurus','Dystylosaurus'
                ],
                scientificName: [
                    'Echinodon','Edmontosaurus','Elaphrosaurus','Elmisaurus','Emausaurus','Enigmosaurus','Eoceratops','Eoraptor','Erectopus','Erlikosaurus','Eucentrosaurus','Euhelopus','Euoplocephalus','Euskelosaurus','Eustreptospondylus','Fabrosaurus','Frenguellisaurus','Gallimimus','Garudimimuss','Gasosauruss','Genyodectess','Geranosauruss','Goyocephales','Gravitholuss','Gryposaurus','Hadrosaurus','Halticosaurus','Haplocanthosaurus','Harpymimus','Heptasteornis','Herrerasaurus','Heterodontosaurus','Homalocephale','Hoplitosaurus','Huayangosaurus','Hylaeosaurus','Hypacrosaurus','Hypselosaurus','Hypsilophodon'
                ],
                boneType: [
                    'Basicranium','Braincase','Cervical vertebra 3','Cervical vertebra 5','Cervical vertebra 6','Dorsal vertebra','Left angular','Left dentary','Left maxilla','Left postorbital','Left quadrate','Left surangular','Right frontal','Right jugal','Right orbitosphenoid','Right postorbital','Right premaxilla','Braincase','Forelimb','Rostrum','Skull'
                ],
                doctor: [
                    'Kimberlee Liddell',
                    'Taunya Levay',
                    'Brook Sotomayor',
                    'Maryln Smartt',
                    'Shavonne Rulison',
                    'Ambrose Melugin',
                    'Kirby Briggs',
                    'Mack Birchfield',
                    'Sang Willmore',
                    'Patsy Saylor',
                    'Margene Rathburn',
                    'Akilah Harewood',
                    'Laverna Stracener',
                    'Nanci Shahan',
                    'Eda Chow',
                    'Tasia Vandermeulen',
                    'Dortha Tiernan',
                    'Cristine Chesley',
                    'Kaleigh Jardine',
                    'Juan Sholar',
                    'Garth Swain',
                    'Elfreda Padmore',
                    'Gail Pinelli',
                    'Demarcus Damm',
                    'Lenora Driggers',
                    'Elaina Shackelford',
                    'Francisca Cromartie',
                    'Raisa Yearout',
                    'Everette Moen',
                    'Stuart Riegel'
                ],
                museum: [
                    'American Museum of Natural History','Badlands National Park','Bat Conservation International','Bath Royal Literary and Scientific Institution','Beijing Natural History Museum','Bell Museum of Natural History','Bishop Museum','Brigham Young University Earth Science Museum','California Academy of Sciences','California Institute of Technology','Carnegie Museum of Natural History','Chelonian Research Institute','Cornell University Division of Biological Sciences','Cornell University Museum of Vertebrates','Dinosaur National Monument','Duke University Primate Center','Field Museum of Natural History, Chicago','Finnish Museum of Natural History','Florida Museum of Natural History','Forest Research Institute Malaysia','Geiseltal Museum','Grant Museum of Zoology and Comparative Anatomy','Houston Museum of Natural Science','Illinois State Museum','Institute of Geology, Mongolian Academy of Science','Institute of Geology, Ulaan Baatar, Mongolia','Institute of Vertebrate Paleontology and Paleoanth','Instituto de Biologia, Universidad Nacional Autóno','Instituto Nacional de Pesquisa da Amazonia','Los Angeles County Museum of Natural History','Louisiana State University Museum of Natural Scien','Massachusetts Museum of Natural History','Mongolian Academy of Sciences','Musée d\'Histoire Naturelle de Miguasha','Musée des Dinosaures, Espéraza, France','Musée National du Niger','Museo Argentino de Ciencias Naturales, Buenos Aire','Museo de Ciencias Naturales, Universidad Nacional','Museo de Historia natural de Cochabamba','Museo de La Plata, Argentina','Museo de Zoología, Facultad de Ciencias, U. N. A.','Museu de Zoologia da Universidade de São Paulo','Museu Historic Municipal de Novelda','Museu Nacional, Universidade Federal do Rio de Jan','Museum für Naturkunde Berlin','Muséum National d\'Histoire Naturelle','Museum of Comparative Zoology, Harvard University','Museum of Northern Arizona','Museum Victoria','National Geographic Society Explorers Hall','National Museum of Natural History','National Park Service','North Carolina Museum of Natural Sciences','Ohio University College of Osteopathic Medicine','Old Dominion University','Private Collection','Queensland Museum','Riken Bioresource Center, Tsukuba, Ibaraki, Japan','Royal Botanic Gardens, Kew, United Kingdom','Royal Ontario Museum','Royal Tyrrell Museum of Palaeontology','Sam Noble Oklahoma Museum of Natural History','San Diego Natural History Museum','San Diego Society of Natural History','Scripps Institution of Oceanography','Shuler Museum of Paleontology','South African Institute for Aquatic Biodiversity','South Dakota School of Mines and Technology','Southwest Foundation for Biomedical Research','Texas Cooperative Wildlife Collection','Texas Memorial Museum','The Academy of Natural Sciences of Philadelphia','The Natural History Museum (London)','Tulane University Museum of Natural History','Universidad Nacional Autonoma de Mexico','Université d\'Antananarivo','University College London','University of Alabama Ichthyological Collection','University of Antananarivo','University of Arizona','University of Calgary','University of California Museum of Paleontology','University of California Museum of Vertebrate Zool','University of California, Los Angeles','University of Chicago','University of Connecticut','University of Kansas Natural History Museum','University of Massachusetts Natural History Collec','University of Michigan Museum of Zoology','University of New Orleans','University of Texas, Austin Geological Sciences Te','University of Texas, Department of Anthropology','University of Washington','UTA Amphibian and Reptile Diversity Research Cente','Utah Museum of Natural History','Western Australia Museum','Yale Peabody Museum','Zoological Museum of Amsterdam','Zoologisches Museum Berlin'
                ]
            };
            return _.sample(faked[type]);
        }
    });
