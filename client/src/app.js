(function (angular, firebase) {
    // declare app and load dependencies
    angular.module('app', [
        'firebase',
        // 'angularfire',
        'ui.router',
        'ui.bootstrap',
        // 'ui.validate',
        // 'ngAnimate',
        'app.controllers',
        'app.directives',
        'app.services',
        // 'angulartics',
        // 'angulartics.google.analytics'
    ])

    .run(['$rootScope', '$location', '$anchorScroll', '$state', 'MvWtSeoService', function ($rootScope, $location, $anchorScroll, $state, MvWtSeoService) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCmnUCEFmCGyxEgmmtuSieTE58aj5OVHpQ",
            authDomain: "alex-divito.firebaseapp.com",
            databaseURL: "https://alex-divito.firebaseio.com",
            projectId: "alex-divito",
            storageBucket: "alex-divito.appspot.com",
            messagingSenderId: "227141836833"
        };
        firebase.initializeApp(config);

        // // attach $state to public $rootScope so that it can be used freely in templates
        // $rootScope.$state = $state;
        
        // // store Current User data
        // $rootScope.CurrentUser = undefined;
        
        // // register an event that will listen for firebase authentication
        // $firebaseAuth().$onAuthStateChanged(firebaseUser => {
        //     if (firebaseUser) {
        //         $rootScope.CurrentUser = firebaseUser;
        //     } else {
        //         $rootScope.CurrentUser = undefined;
        //     }
        // });

        // hook into onStateChangeStart event
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            // hide nav on state change when expanded
            if ($('#navbarSupportedContent').hasClass('show')) {
                $('#navbarSupportedContent').collapse('hide');
            }
        });

        // hook into onStateChangeSuccess event
        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            // update seo
            MvWtSeoService.setTitle(toState.title);
            MvWtSeoService.setDescription(toState.description);

            // scroll to top on page once state change transition starts
            $location.hash('top');
            $anchorScroll();
            $location.hash('');
        });
        
    }])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // enable html5 mode (otherwise angularjs hashes urls with `#/#!/{config}`)
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        // forced client routing sends to 404 for any unrecognized url
        $urlRouterProvider.otherwise('404');
        
        // declare all app states
        $stateProvider
        .state('app', {
            abstract: true,
            url: '',
            templateUrl: '/views/index.html',
            controller: ['$rootScope', '$timeout', function ($rootScope, $timeout) {
                
            }],
            onEnter: [function() {
            }]
        })
        
        .state('app.about', {
            url: '/',
            templateUrl: '/views/about/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(() => {
                    window.prerenderReady = true;
                }, 500);
            }],
            onEnter: ['$window', function($window) {
                // on desktop show video background
                if ($window.innerWidth > 991) {
                    $('body').vide({
                        mp4: "assets/mp4/world.mp4",
                        poster: "assets/img/bg-mobile-fallback.jpg"
                    }, {
                        posterType: 'jpg',
                        className: 'video-bg'
                    });
                }
            }],
            onExit: [function() {
                // Get instance of the plugin
                var instance = $('#body').data('vide');
                if (instance) {
                    // Destroy plugin instance
                    instance.stop();
                    instance.destroy();
                }
                
            }],
            title: 'About',
            description: "Located in British Columbia's Fraer Valley, I am a web developer and technology fanatic with several years of professional experience creating interactive web applications and business tools using an array of different technologies and system design methodologies."
        })

        .state('app.experience', {
            url: '/experience',
            templateUrl: '/views/experience/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(() => {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Experience',
            description: "With several years of experience working for a number of different service companies in the Fraser Valley, I have learned to become adaptable and wear many hats in order to produce successful web software that operates exactly the way it is intended to."
        })

        .state('app.education', {
            url: '/education',
            templateUrl: '/views/education/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(() => {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Education',
            description: "My passion for computer science and programming only became apparent to me in 2014. Prior to that, I pursued an education in applied sciences in hopes to become an engineer of some sort, but I lost interest in the complicated math after a few years."
        })

        .state('app.skills', {
            url: '/skills',
            templateUrl: '/views/skills/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(() => {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Skills',
            description: "I prefer to use open source frameworks and technologies when building web sites and information systems. I focus on writing clean, reusable code that can be used across multiple applications and focus on using tools that allow me to do that in the most intuitive way possible."
        })

        .state('app.interests', {
            url: '/interests',
            templateUrl: '/views/interests/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(() => {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Interests',
            description: "I follow a number of sci-fi and fantasy genre movies and television shows, I am an aspiring chef, fishkeeper and I spend a large amount of my free time exploring the latest technology advancements in the front-end web development world."
        })

        .state('app.portfolio', {
            url: '/portfolio',
            templateUrl: '/views/portfolio/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(() => {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Portfolio',
            description: "Take a look at my portfolio to see the work that I have done for myself and my clients. All of my work is created using the latest and greatest technologies and I often times like to experiment with other languages and platforms."
        })

        .state('app.contact', {
            url: '/contact',
            templateUrl: '/views/contact/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(() => {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Contact',
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
        });

        // .state('app.services', {
        //     url: '/services',
        //     templateUrl: '/views/services/index.html',
        //     controller: ['$timeout', function ($timeout) {
        //         $timeout(() => {
        //             window.prerenderReady = true;
        //         }, 500);
        //     }],
        //     title: 'Services | Mountain View Web Tech',
        //     description: "We provide many software related IT services including web development, database administation, media marketing, domain hosting/management and much more. Let's work together to create something amazing."
        // })
        
        // .state('app.contact', {
        //     url: '/contact',
        //     templateUrl: '/views/contact/index.html',
        //     controller: 'ContactCtrl',
        //     title: 'Contact Us | Mountain View Web Tech',
        //     description: "Interested in a quote or want to arrange a meeting? Send us a message."
        // })
        // .state('404', {
        //     url: '/404',
        //     templateUrl: '/views/404/index.html',
        //     controller: ['$timeout', function ($timeout) {
        //     }]
        // });
    }]);
})(angular, firebase);