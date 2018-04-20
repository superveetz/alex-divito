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

    .run(['$rootScope', '$state', function ($rootScope, $state) {
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

        // // attach MvWtSeoService for dynamic Seo
        // $rootScope.MvWtSeoService = MvWtSeoService.public;
        
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

        // // hook into onStateChangeSuccess event
        // $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
        //     // update seo
        //     MvWtSeoService.setTitle(toState.title);
        //     MvWtSeoService.setDescription(toState.description);

        //     // scroll to top on page once state change transition starts
        //     $location.hash(fromState.name);
        //     $anchorScroll();
        //     $location.hash('');

        //     // wait for transitition animation to end after 1s
        //     $timeout(() => {
        //         // allow state changes again
        //         $rootScope.stateChangeOccuring = false;
        //     }, 500);
        // });
        
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
            onEnter: [function() {
                $('body').vide({
                    mp4: "assets/mp4/world.mp4",
                    poster: "assets/img/bg-mobile-fallback.jpg"
                }, {
                    posterType: 'jpg'
                });
            }],
            onExit: [function() {
                
                // Destroy plugin instance
                $('body').vide().stop();
                $('body').data('vide').destroy();
                
            }],
            title: 'About',
            description: ""
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
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
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
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
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
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
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
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
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
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
        })

        .state('app.contact', {
            url: '/contact',
            templateUrl: '/views/contact/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(() => {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Contact | Alex Di Vito',
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