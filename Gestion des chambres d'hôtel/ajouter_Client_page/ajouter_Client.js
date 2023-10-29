angular.module("myApp.ajouter_Client", ['ngRoute', 'ngMessages', 'firebase'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/ajouter_Client', {
                templateUrl: "ajouter_Client_page/ajouter_Client.html",
                controller: "ajouter_ClientCtrl"
            });
    }])
    .controller('ajouter_ClientCtrl', function ($scope, $firebaseArray) {
        console.log("page 3 -- ajouter Client"); //VERIFIER QUE CE CONTROLEUR TRAVAILE BIEN -- SUPPRIMER CE LIGNE

        $scope.client = {};
        //types de chambres availibel : 
        $scope.rooms = [{
            id: 1,
            name: 'Single'
        }, {
            id: 2,
            name: 'Double'
        }, {
            id: 3,
            name: 'Family'
        }];
        //choisir le type 'Single' par defaut
        $scope.client.roomType = {
            id: 1,
            name: 'Single'
        };

        $scope.addClient = function () {

            $scope.client.dateDebut = $scope.client.dateDebut.toDateString();
            $scope.client.dateFin = $scope.client.dateFin.toDateString();
            console.log("la function addClient()");  //VERIFIER QUE LA FCT 'addClient()' TRAVAILE BIEN -- SUPPRIMER CE LIGNE
            $scope.msg_ajoute = "";

            //connecter avec firebase : 
            var ref = firebase.database().ref().child("clients"); //'clients' EST LE NOM DE DB DANS FIREBASE
            $firebaseArray(ref).$add($scope.client)
                .then(
                    function (ref) {
                        //vider les champs de form : 
                        $scope.client.name      = "";
                        $scope.client.email     = "";
                        $scope.client.addresse  = "";
                        $scope.client.nbr_Room  = "";
                        $scope.client.dateDebut = "";
                        $scope.client.dateFin   = "";
                        $scope.client.roomType  = "";
                        $scope.client.isSmoking = "";

                        $scope.msg_ajoute = "Client ajoute avec succes.";
                        window.setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.msg_ajoute = false;
                            })
                        }, 3000) //masquer le message 'msg_ajoute' apres 3s
                    },

                    //s'il y a des errors :
                    function (error) {
                        console.log(error);
                    }
                )
        };
    });
