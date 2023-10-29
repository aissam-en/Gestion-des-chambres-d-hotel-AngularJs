angular.module("myApp.home",['ngRoute','ngMessages','firebase'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/home',{
            templateUrl:"home_page/home.html",
            controller:"homeCtrl"
        });
}])
.controller('homeCtrl',function(){
    console.log("page 1 -- home"); //VERIFIER QUE CE CONTROLEUR EST TRAVAILE BIEN -- SUPPRIMER CE LIGNE
});