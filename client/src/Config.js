/**
 * @module Config
 * @see Application
 * @param {Object} $stateProvider - Ui-router module for right nesting.
 * @param {Object} $urlRouterProvider - Configures how the application routing.
 * @param {Object} $locationProvider - Configures how the application deep linking paths are stored.
 * @param {Object} $logProvider - Configures how the application logs messages.
 */
const Config = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', ($stateProvider, $urlRouterProvider, $locationProvider, $logProvider) => {
    'ngInject';
  
    $logProvider.debugEnabled(true);  /** Turn debug mode on/off */
    // enable html5 mode (otherwise angularjs hashes urls with `#/#!/{config}`)
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
    $urlRouterProvider.otherwise('/');  /** If current route not in routes then redirect to home */
  
    /**
     * Url processing.
     * @param {Object} $injector - Ability to inject providers.
     * @param {Object} $location - Current location.
     */
    $urlRouterProvider.rule(($injector, $location) => {
      const path = $location.path();
      /** If route like as /home/ then /home */
      $location.path(path[path.length - 1] === '/' ? path.slice(0, -1) : path).replace();
    });

    /** Describe our states */
    $stateProvider 

      .state('app', {
        abstract: true,
        url: '',
        templateUrl: require('./views/index.html')
      })

      .state('app.about', {
        url: '/',
        controller: ['$timeout', ($timeout) => {
          $timeout(() => {
              window.prerenderReady = true;
          }, 500);

          // init sweet btns
          $('.sweet-btn').sweetButton();
        }],
        templateUrl: require('./views/about/index.html'),
        onEnter: ['$window', 'BgVid', ($window, BgVid) => {
            // on desktop show video background
            if ($window.innerWidth > 991) {
              BgVid.start();  
            }
        }],
        onExit: ['BgVid', (BgVid) => {
          if ($('body .video-bg').length) {
              // Destroy plugin instance
              BgVid.destroy();
          }
        }],
        title: 'About',
        description: "Located in British Columbia's Fraer Valley, I am a web developer and technology fanatic with several years of professional experience creating interactive web applications and business tools using an array of different technologies and system design methodologies."
      })
      
      .state('app.experience', {
        url: '/experience',
        templateUrl: require('./views/experience/index.html'),
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
        templateUrl: require('./views/education/index.html'),
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
        templateUrl: require('./views/skills/index.html'),
        controller: ['$timeout', function ($timeout) {
            $timeout(() => {
                window.prerenderReady = true;
            }, 500);
        }],
        title: 'Skills',
        description: "I prefer to use open source frameworks and technologies when building web sites and information systems. I focus on writing clean, reusable code that can be used across multiple applications and focus on using tools that allow me to do that in the most intuitive way possible."
    })

    // .state('app.interests', {
    //     url: '/interests',
    //     templateUrl: require('./views/interests/index.html'),
    //     controller: ['$timeout', function ($timeout) {
    //         $timeout(() => {
    //             window.prerenderReady = true;
    //         }, 500);
    //     }],
    //     title: 'Interests',
    //     description: "I follow a number of sci-fi and fantasy genre movies and television shows, I am an aspiring chef, fishkeeper and I spend a large amount of my free time exploring the latest technology advancements in the front-end web development world."
    // })

    .state('app.work', {
        url: '/work',
        templateUrl: require('./views/work/index.html'),
        controller: ['$timeout', function ($timeout) {
            $timeout(() => {
                window.prerenderReady = true;
            }, 500);
        }],
        title: 'Work',
        description: "Take a look at the websites i've worked on for clients as well as my own personal projects. All of my work is created using the latest and greatest technologies and I often times like to experiment with other languages and platforms."
    });

    // .state('app.contact', {
    //     url: '/contact',
    //     templateUrl: require('./views/contact/index.html'),
    //     controller: ['$timeout', function ($timeout) {
    //         $timeout(() => {
    //             window.prerenderReady = true;
    //         }, 500);
    //     }],
    //     title: 'Contact',
    //     description: "We are a small startup based out of the Fraser Valley that is passionate about building digital stories and business solutions since 2017."
    // });
    // end states
  }];
  
  /** Export our config */
  export default Config;