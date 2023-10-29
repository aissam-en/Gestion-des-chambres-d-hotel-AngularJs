angular.module("myApp.list_Client",['ngRoute','ngMessages','firebase']) 
.config(['$routeProvider',function($routeProvider){
    $routeProvider
        //routing
        .when('/list_Client',{
            templateUrl:"list_Client_page/list_Client.html",
            controller:"list_ClientCtrl"
        });
}])
.controller('list_ClientCtrl',function($scope,$firebaseArray){
    console.log('page 2 -- Client List'); //VERIFIER QUE CE CONTROLEUR TRAVAILE BIEN -- SUPPRIMER CE LIGNE

    $scope.msg_supprime=false;

    //connecter avec firebase : 
    var ref = firebase.database().ref().child("clients"); //'clients' EST LE NOM DE DB DANS FIREBASE
    $scope.data = $firebaseArray(ref)

    $scope.deleteClient=function(info){
        console.log("la function deleteClient()"); //VERIFIER QUE LA FCT 'deleteClient()' TRAVAILE BIEN -- SUPPRIMER CE LIGNE
        $scope.data
        .$remove(info)
        .then(
            function(ref){
                $scope.msg_supprime="Client supprime avec succes.";
                window.setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.msg_supprime=false;
                    })
                }, 3000)  //masquer le message 'msg_supprime' apres 3s
                console.log(info);
            },
            //s'il y a des errors :
            function(error){
                console.log(error);
            }
        )
    }
});