'use strict';

(function (angular, firebase) {
    // declare app and load dependencies
    angular.module('app', ['firebase',
    // 'angularfire',
    'ui.router', 'ui.bootstrap',
    // 'ui.validate',
    // 'ngAnimate',
    'app.controllers', 'app.directives', 'app.services']
    // 'angulartics',
    // 'angulartics.google.analytics'
    ).run(['$rootScope', '$state', function ($rootScope, $state) {
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
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
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
    }]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // enable html5 mode (otherwise angularjs hashes urls with `#/#!/{config}`)
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        // forced client routing sends to 404 for any unrecognized url
        $urlRouterProvider.otherwise('404');

        // declare all app states
        $stateProvider.state('app', {
            abstract: true,
            url: '',
            templateUrl: '/views/index.html',
            controller: ['$rootScope', '$timeout', function ($rootScope, $timeout) {}]
        }).state('app.about', {
            url: '/',
            templateUrl: '/views/about/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(function () {
                    window.prerenderReady = true;
                }, 500);
            }],
            onEnter: [function () {
                $('body').vide({
                    mp4: "assets/mp4/world.mp4",
                    poster: "assets/img/bg-mobile-fallback.jpg"
                }, {
                    posterType: 'jpg'
                });
            }],
            onExit: [function () {

                // Destroy plugin instance
                $('body').vide().stop();
                $('body').data('vide').destroy();
            }],
            title: 'About',
            description: ""
        }).state('app.experience', {
            url: '/experience',
            templateUrl: '/views/experience/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(function () {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Experience',
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
        }).state('app.education', {
            url: '/education',
            templateUrl: '/views/education/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(function () {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Education',
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
        }).state('app.skills', {
            url: '/skills',
            templateUrl: '/views/skills/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(function () {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Skills',
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
        }).state('app.interests', {
            url: '/interests',
            templateUrl: '/views/interests/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(function () {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Interests',
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
        }).state('app.portfolio', {
            url: '/portfolio',
            templateUrl: '/views/portfolio/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(function () {
                    window.prerenderReady = true;
                }, 500);
            }],
            title: 'Portfolio',
            description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
        }).state('app.contact', {
            url: '/contact',
            templateUrl: '/views/contact/index.html',
            controller: ['$timeout', function ($timeout) {
                $timeout(function () {
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
'use strict';

(function (angular) {
    angular.module('app.controllers', ['app.services']).controller('MainNavCtrl', ['$rootScope', '$timeout', '$scope', '$http', '$window', '$state', 'ModalService', 'AlertService', function ($rootScope, $timeout, $scope, $http, $window, $state, ModalService, AlertService) {
        // init $scope
        // $scope.authObj = $firebaseAuth();

        // $timeout(() => {
        //     window.prerenderReady = true;
        // }, 500);

        // open register account modal
        // $scope.openRegisterAccountModal = function (closeMobileNav) {
        //     AlertService.reset();

        //     if (closeMobileNav) {
        //         $scope.closeMobileSideNav();
        //         // wait for mobile side nav to close, then open modal
        //         $timeout(() => {
        //             ModalService.openRegisterAccountModal();
        //         }, 300);
        //     } else {
        //         ModalService.openRegisterAccountModal();
        //     }
        // };

        // open login modal
        // $scope.openLoginModal = function (closeMobileNav) {
        //     AlertService.reset();

        //     if (closeMobileNav) {
        //         $scope.closeMobileSideNav();
        //         // wait for mobile side nav to close, then open modal
        //         $timeout(() => {
        //             ModalService.openLoginModal();
        //         }, 300);
        //     } else {
        //         ModalService.openLoginModal();
        //     }
        // };

        // toggle mobile getting started
        // $scope.showGettingStarted = false;
        // $scope.toggleGettingStarted = function () {
        //     $scope.showGettingStarted = !$scope.showGettingStarted;
        //     return true;
        // };

        // toggle mobile account options
        // $scope.showAccountOptions = false;
        // $scope.toggleAccountOptions = function () {
        //     $scope.showAccountOptions = !$scope.showAccountOptions;
        //     return true;
        // };

        // logout
        $scope.logOut = function () {
            $scope.authObj.$signOut();
            return true;
        };

        // close mobile side nav
        $scope.closeMobileSideNav = function () {
            // using jasny bootstrap jquery api
            $('#mobile-side-nav').offcanvas('hide');
            return true;
        };

        // open mobile side nav
        $scope.openMobileSideNav = function () {
            // using jasny bootstrap jquery api
            $('#mobile-side-nav').offcanvas('show');
            return true;
        };
    }]).controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$window', '$uibModalInstance', 'AlertService', function ($rootScope, $scope, $http, $window, $uibModalInstance, AlertService, AuthService) {
        // defaults
        var dNewUser = {
            email: '',
            pass: '',
            cPass: ''
        };

        var dExistingUser = {
            email: '',
            pass: ''
        };

        var dServerResponse = {
            loginErr: false,
            signUpErr: false
        };

        // init $scope
        $scope.serverResponse = angular.copy(dServerResponse);
        $scope.authObj = $firebaseAuth();
        $scope.newUser = angular.copy(dNewUser);
        $scope.existingUser = angular.copy(dNewUser);

        // submit sign up form
        $scope.submitSignUpForm = function () {
            // turn on loading spinner
            $scope.signUpSubmit = true;

            // make sign up request to our firebase API
            $scope.authObj.$createUserWithEmailAndPassword($scope.newUser.email, $scope.newUser.pass).then(function (response) {
                // success
                $scope.signUpSubmit = false;
                $scope.closeModal();
            }).catch(function (err) {
                // error
                $scope.signUpSubmit = false;
                AlertService.setAlert({
                    show: true,
                    type: 'error',
                    title: err.message
                });
            });
        };

        // submit log in form
        $scope.submitLoginForm = function () {
            // turn on loading spinner
            $scope.loginSubmit = true;

            // login with email and password
            $scope.authObj.$signInWithEmailAndPassword($scope.existingUser.email, $scope.existingUser.pass).then(function (response) {
                // success
                $scope.loginSubmit = false;
                $scope.closeModal();
            }).catch(function (err) {
                // error
                $scope.loginSubmit = false;
                AlertService.setAlert({
                    show: true,
                    type: 'error',
                    title: err.message
                });
            });
        };

        // login with fb
        $scope.loginWithFacebook = function () {
            $scope.fbSubmit = true;

            $scope.authObj.$signInWithPopup("facebook").then(function (res) {
                // success
                $scope.fbSubmit = false;
                $scope.closeModal();
            }).catch(function (err) {
                // error
                $scope.fbSubmit = false;
                AlertService.setAlert({
                    show: true,
                    type: 'error',
                    title: err.message
                });
            });
        };

        // login with twitter
        $scope.loginWithTwitter = function () {
            $scope.twitSubmit = true;

            $scope.authObj.$signInWithPopup("twitter").then(function (res) {
                // success
                $scope.twitSubmit = false;
                $scope.closeModal();
            }).catch(function (err) {
                // error
                $scope.twitSubmit = false;
                AlertService.setAlert({
                    show: true,
                    type: 'error',
                    title: err.message
                });
            });
        };

        // login with google
        $scope.loginWithGoogle = function () {
            $scope.googSubmit = true;

            $scope.authObj.$signInWithPopup("google").then(function (res) {
                // success
                $scope.googSubmit = false;
                $scope.closeModal();
            }).catch(function (err) {
                // error
                $scope.googSubmit = false;
                AlertService.setAlert({
                    show: true,
                    type: 'error',
                    title: err.message
                });
            });
        };

        // close modal
        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // validate confirm password matches password
        $scope.isPassConfirmed = function (confirmPass) {
            return confirmPass.signUpForm.newUserPass.$$rawModelValue === confirmPass.signUpForm.newUserCPass.$$rawModelValue;
        };
    }]).controller('MainFooterCtrl', ['$scope', '$document', '$location', '$state', function ($scope, $document, $location, $state) {}]).controller('AppCtrl', ['$rootScope', '$state', function ($rootScope, $state) {}]);

    // .controller('ContactCtrl', ['$scope', '$http', '$timeout', 'AlertService', function ($scope, $http, $timeout, AlertService) {
    //     $timeout(() => {
    //         window.prerenderReady = true;
    //     }, 500);

    //     // defaults
    //     const dUser = {
    //         name: '',
    //         email: '',
    //         phone: '',
    //         subject: '',
    //         message: ''
    //     };

    //     const dServerResponse = {
    //         loginErr: false,
    //         signUpErr: false
    //     };

    //     // init $scope
    //     $scope.user             = angular.copy(dUser);
    //     $scope.serverResponse   = angular.copy(dServerResponse);

    //     $scope.sendEmail = function () {
    //         $scope.submitSendEmail = true;
    //         Mail.send({
    //             name: $scope.user.name,
    //             email: $scope.user.email,
    //             phone: $scope.user.phone,
    //             subject: $scope.user.subject,
    //             message: $scope.user.message
    //         })
    //         .$promise
    //         .then(res => {
    //             // console.log('res: ', res);
    //             $scope.submitSendEmail = false;
    //             $scope.user = angular.copy(dUser);
    //             $scope.contactForm.$setPristine();
    //             $scope.contactForm.$setUntouched();
    //             AlertService.setAlert({
    //                 show: true,
    //                 type: 'success',
    //                 title: 'We have received your request and will get back to you as soon as we can.'
    //             });
    //         })
    //         .catch(err => {
    //             // console.log('err: ', err);
    //             $scope.submitSendEmail = false;
    //             AlertService.setAlert({
    //                 show: true,
    //                 type: 'error',
    //                 title: 'An unexpected error occured.'
    //             });
    //         });
    //     };
    // }]);
})(angular);
'use strict';

(function (angular) {
    angular.module('app.directives', ['app.controllers']).directive('mainNav', ['$window', function ($window) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/directives/templates/main-nav/main-nav.html',
            controller: 'MainNavCtrl'
        };
    }]).directive('mainFooter', [function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/directives/templates/main-footer/main-footer.html',
            controller: 'MainFooterCtrl'
        };
    }]).directive('alertBox', ['AlertService', function (AlertService) {
        return {
            restrict: 'E',
            templateUrl: function templateUrl(scope, elem) {
                // Use default theme if no theme is provided
                if (elem.theme) {
                    return '/js/directives/templates/alert-box/' + elem.theme + '.html';
                } else {
                    return '/js/directives/templates/alert-box/default.html';
                }
            },
            link: function link(scope) {
                scope.AlertService = AlertService;
            }
        };
    }]).directive('fadeInOnLoad', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function link(scope, elem, attr) {
                elem.addClass('animated fadeIn');
            }
        };
    }]);
})(angular);
'use strict';

(function (angular) {
    angular.module('app.services', ['app.controllers']).service('MvWtSeoService', [function () {
        var seoObj = {
            title: '',
            description: ''
        };

        return {
            public: {
                getTitle: function getTitle() {
                    return seoObj.title;
                },
                getDescription: function getDescription() {
                    return seoObj.description;
                }
            },
            setTitle: function setTitle(title) {
                seoObj.title = title;
            },
            setDescription: function setDescription(description) {
                seoObj.description = description;
            }
        };
    }]).service('ModalService', ['$uibModal', '$timeout', function ($uibModal, $timeout) {
        return {
            openRegisterAccountModal: function openRegisterAccountModal() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'register-account-title',
                    ariaDescribedBy: 'register-account-body',
                    templateUrl: 'register-account-modal.html', // found nested in main-nav.html template
                    controller: 'RegisterAccountCtrl',
                    backdrop: true,
                    size: 'md'
                });

                // catch the promise propgated by the modal to avoid any errors (required)
                modalInstance.result.then(function (result) {}).catch(function (err) {});
            },

            openLoginModal: function openLoginModal() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'login-title',
                    ariaDescribedBy: 'login-body',
                    templateUrl: 'login-modal.html', // found nested in main-nav.html template
                    controller: 'LoginCtrl',
                    backdrop: true,
                    size: 'md'
                });

                // catch the promise propgated by the modal to avoid any errors (required)
                modalInstance.result.then(function (result) {}).catch(function (err) {});
            }
        };
    }]).service('AlertService', ['$timeout', function ($timeout) {

        var alert = {
            show: false,
            type: 'success'
        };

        return {
            showAlert: function showAlert() {
                alert.show = true;
                return true;
            },
            hideAlert: function hideAlert() {
                alert.show = false;
                return true;
            },
            hasAlert: function hasAlert() {
                return alert.show;
            },
            reset: function reset() {
                alert = {};
                return true;
            },
            setAlert: function setAlert(alertObj) {
                // update alert 
                alert = angular.copy(alertObj);

                // parse slim application server error
                if (alert.type == 'error' && alert.slimErr) {
                    alert.errList = [];
                    alert.title = alert.slimErr && alert.slimErr.data && alert.slimErr.data.exception && alert.slimErr.data.exception[0] && alert.slimErr.data.exception[0].message ? alert.slimErr.data.exception[0].message : 'Error';
                }

                return true;
            },
            getAlert: function getAlert() {
                return alert;
            }
        };
    }]);
})(angular);
'use strict';

(function (angular) {
    // declare app and load dependencies
    angular.module('canvas-raining', []).directive('canvasRaining', ['$interval', function ($interval) {
        return {
            restrict: 'A',
            link: function link(scope, elem) {
                // canvas animation taken from: https://codepen.io/ruigewaard/pen/JHDdF
                elem.ready(function () {
                    var ctx = elem[0].getContext('2d');
                    var w = elem.width();
                    var h = elem.height();

                    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
                    // ctx.strokeStyle              = 'rgba(0,0,0,1)';
                    ctx.lineWidth = 0.5;
                    ctx.lineCap = 'round';
                    ctx.globalCompositeOperation = 'destination-over';

                    var init = [];
                    var maxParts = 2000;
                    for (var a = 0; a < maxParts; a++) {
                        init.push({
                            x: Math.random() * w,
                            y: Math.random() * h,
                            l: Math.random() * 1,
                            xs: -4 + Math.random() * 4 + 2,
                            ys: Math.random() * 10 + 5
                        });
                    }

                    var particles = [];
                    for (var b = 0; b < maxParts; b++) {
                        particles[b] = init[b];
                    }

                    function draw() {
                        ctx.clearRect(0, 0, w, h);
                        for (var c = 0; c < particles.length; c++) {
                            var p = particles[c];
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                            ctx.stroke();
                        }
                        move();
                    }

                    function move() {
                        for (var b = 0; b < particles.length; b++) {
                            var p = particles[b];
                            p.x += p.xs + mousePositionRatio * (Math.random() * 20);
                            p.y += p.ys;

                            if (p.x > w || p.y > h) {
                                p.x = Math.random() * w;
                                p.y = -20;
                            }
                        }
                    }

                    $interval(draw, 60);

                    // register mousemove listener
                    var mousePositionRatio = 0;
                    elem.bind('mousemove', function (event) {
                        mousePositionRatio = event.clientX / elem.width() - 0.5;
                    });
                });
            }
        };
    }]);
})(angular);
'use strict';

(function (angular) {
    // declare app and load dependencies
    angular.module('canvas-raining', []).directive('canvasRaining', ['$interval', 'CanvasSystem', function ($interval, CanvasSystem) {
        return {
            restrict: 'A',
            link: function link(scope, elem) {
                // canvas animation taken from: https://codepen.io/ruigewaard/pen/JHDdF
                elem.ready(function () {
                    // let 
                    // ctx     = elem[0].getContext('2d'), 
                    // w       = elem.width(),
                    // h       = elem.height();

                    // ctx.strokeStyle              = 'rgba(174,194,224,0.5)';
                    // // ctx.strokeStyle              = 'rgba(0,0,0,1)';
                    // ctx.lineWidth                = 0.5;
                    // ctx.lineCap                  = 'round';
                    // ctx.globalCompositeOperation ='source-over'; // https://www.w3schools.com/tags/canvas_globalcompositeoperation.asp

                    // start

                });
            }
        };
    }]).factory('CanvasSystem', [function () {
        var cSystem = function cSystem(elem) {
            this.ctx = elem[0].getContext('2d');
            this.w = elem.width();
            this.h = elem.height();
            this.x = 0;
            this.y = 0;
            console.log("this.ctx:", this.ctx);
        };

        cSystem.prototype.draw = function () {
            this.x += 1;
            this.y += 1;
            console.log("this:", this);

            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.w, this.h);

            this.ctx.fillStyle = "#ffffff";
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
            this.ctx.closePath();

            this.ctx.fill();

            requestAnimationFrame(this.draw);
        };

        return cSystem;
    }]);
})(angular);