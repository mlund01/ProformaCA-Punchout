angular.module('OrderCloud-StickyFooter', []);

angular.module('OrderCloud-StickyFooter')
    .directive('stickyfooter', stickyFooter)
    .controller('stickyfooterCtrl', stickyFooterController);

function stickyFooter() {
    var directive = {
        restrict: 'E',
        template: stickyTemplate,
        controller: 'stickyfooterCtrl'
    };
    return directive;

    function stickyTemplate() {
        return [
            '<footer id="sticky-foot" ng-hide={{cartOrCheckout}}>',
            '<div class="footer-content container">',
            '<h6>Contact info:</h6>',
            '<p>{{contactSelect[select].Name}}</p>',
            '<p>{{contactSelect[select].Title}}</p>',
            '<p>{{contactSelect[select].Address}}</p>',
            '<p>{{contactSelect[select].Phone}}</p>',
            '<p>{{contactSelect[select].Email}}</p>',
            '</div>',
            '</footer>'
        ].join('');
    }
}
stickyFooterController.$inject = ['$scope', '$location', '$rootScope'];
function stickyFooterController($scope, $location, $rootScope) {
    $scope.select = '';
    $scope.contactSelect = {
        CA: {
            Name: 'Tiffany Howard',
            Title: 'Director of Operations North America',
            Phone: 'ph 512-410-7340',
            Email: 'tiffany.howard@proforma.com',
            Address: 'Austin, Texas'
        },
        EMEA: {
            Name: 'Natalie Hyams',
            Title: 'Director of Operations EMEA',
            Phone: 'T 020 8906 9444',
            Email: 'Natalie.hyams@proforma.com',
            Address: '56D The Broadway | Mill Hill | London | NW7 3TE '
        }
    };

    if ($location.absUrl().indexOf('europe') != -1) {
        $scope.select = 'EMEA'
    } else {
        $scope.select = 'CA'
    }

    $rootScope.$on('$routeChangeSuccess', function() {
        if ($location.path().indexOf('checkout') != -1 || $location.path().indexOf('cart') != -1) {
            $scope.cartOrCheckout = true;
        } else {
            $scope.cartOrCheckout = false;
        }
    });

    setInterval(function(){
        var totalHeight, currentScroll, visibleHeight;
        if (document.documentElement.scrollTop) {
            currentScroll = document.documentElement.scrollTop;
        } else {
            currentScroll = document.body.scrollTop;
        }
        var body = document.body,
            html = document.documentElement;
        totalHeight = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        visibleHeight = document.documentElement.clientHeight;
        if (totalHeight <= currentScroll + visibleHeight && !$scope.cartOrCheckout) {
            $('#sticky-foot').removeClass('ng-hide');
            $('#errors').addClass('upFromBottom');
        } else {
            $('#sticky-foot').addClass('ng-hide');
            $('#errors').removeClass('upFromBottom');
        }
    }, 100);
}
