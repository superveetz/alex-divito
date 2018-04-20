(function (angular) {
    angular.module('app.directives', [
        'app.controllers'
    ])
    
    .directive('mainNav', ['$window', function ($window) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/directives/templates/main-nav/main-nav.html',
            controller: 'MainNavCtrl'
        };
    }])

    .directive('mainFooter', [function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/directives/templates/main-footer/main-footer.html',
            controller: 'MainFooterCtrl'
        };
    }])
    
    .directive('alertBox', ['AlertService', function (AlertService) {
        return {
            restrict: 'E',
            templateUrl: function (scope, elem) {
                // Use default theme if no theme is provided
                if (elem.theme) {
                    return '/js/directives/templates/alert-box/' + elem.theme + '.html'
                } else {
                    return '/js/directives/templates/alert-box/default.html'
                }
            },
            link: function (scope) {
                scope.AlertService = AlertService;
            }
        };
    }])
    
    .directive('fadeInOnLoad', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                elem.addClass('animated fadeIn');
            }
        };
    }]);
})(angular);