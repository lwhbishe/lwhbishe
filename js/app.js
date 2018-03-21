/**
 * Created by Administrator on 2018/1/8.
 */
(function(){
    angular.module('app',['ngRoute','app.controllers','app.directive'])
        .config(function($routeProvider,$locationProvider){
            $locationProvider.hashPrefix('');
            $routeProvider
                .when('/' , {
                    templateUrl:'app/home.html'
                })
                .when('/homepage' , {
                    templateUrl:'app/homepage.html',
                    controller:'homepageController'
                })
                .when('/sort' , {
                    templateUrl:'app/sort.html',
                    controller:'categoryController'
                })
                .when('/discover' , {
                    templateUrl:'app/discover.html',
                    controller:'discoverController'
                })
                .when('/mine' , {
                    templateUrl:'app/mine.html',
                    controller:'mineController'
                })
                .when('/detail/:bookId' , {
                    templateUrl:'app/detail.html',
                    controller:'detailController'
                })
                .when('/libList' , {
                    templateUrl:'app/libList.html',
                    controller:'libListController'
                })
                .when('/search' , {
                    templateUrl:'app/search.html',
                    controller:'goSearchController'
                })
                .when('/login' , {
                    templateUrl:'app/login.html',
                    controller:'loginController'
                })
                .when('/revise' , {
                    templateUrl:'app/revise.html',
                    controller:'reviseController'
                })
                .when('/confirmRevise' , {
                    templateUrl:'app/confirmRevise.html',
                    controller:'confirmReviseController'
                })
                .when('/goLogout' , {
                    templateUrl:'app/goLogout.html',
                    controller:'goLogoutController'
                })
                .when('/myCart' , {
                    templateUrl:'app/myCart.html',
                    controller:'myCartController'
                })
                .when('/myOrder' , {
                    templateUrl:'app/myOrder.html',
                    controller:'myOrderController'
                })
                .when('/myBack' , {
                    templateUrl:'app/myBack.html',
                    controller:'myBackController'
                })
                .when('/aboutUs' , {
                    templateUrl:'app/aboutUs.html',
                    controller:'aboutUsController'
                })
                .when('/question' , {
                    templateUrl:'app/question.html',
                    controller:'questionController'
                })
                .when('/register' , {
                    templateUrl:'app/register.html',
                    controller:'registerController'
                })
                .when('/registerSuccess' , {
                    templateUrl:'app/registerSuccess.html',
                    controller:'registerSuccessController'
                })
                .otherwise({redirectTo:'/'});
        });
})();