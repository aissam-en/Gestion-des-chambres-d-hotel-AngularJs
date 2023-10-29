angular.module("myApp.modifier_Client", ['ngRoute', 'ngMessages', 'firebase'])
    .config(['$routeProvider', function ($routeProvider) {
        //routing pour 'modifier_Client' page
        $routeProvider
            .when('/modifier_Client/:id', {
                templateUrl: "modifier_Client_page/modifier_Client.html",
                controller: "modifier_ClientCtrl"
            });
    }])
    .controller('modifier_ClientCtrl', function ($scope, $routeParams, $firebaseObject) {
        console.log("page 4 -- Modifier Client"); //VERIFIER QUE CE CONTROLEUR TRAVAILE BIEN -- SUPPRIMER CE LIGNE

        //l'objet "client" de la "form modifier client"
        $scope.client = {};

        //types de chambres : 
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
        //choisir le type 'Single' par defaut :
        $scope.client.roomType = {
            id: 1,
            name: 'Single'
        };

        $scope.msg_update = "";
        var id = $routeParams.id;

        //connecter avec firebase : 
        var ref = firebase.database().ref().child("clients/" + id); //'clients' EST LE NOM DE DB DANS FIREBASE
        $scope.client = $firebaseObject(ref);

        $scope.editClient = function (id) {
            console.log("la function addClient()"); //VERIFIER QUE LA FCT addClient() TRAVAILE BIEN -- SUPPRIMER CE LIGNE si tv
            var ref = firebase.database().ref().child("clients/" + id);  //'clients' EST LE NOM DE DB DANS FIREBASE
            ref.update({
                name      : $scope.client.name,
                email     : $scope.client.email,
                addresse  : $scope.client.addresse,
                nbr_Room  : $scope.client.nbr_Room,
                dateDebut : $scope.client.dateDebut,
                dateFin   : $scope.client.dateFin,
                roomType  : $scope.client.roomType,
                isSmoking : $scope.client.isSmoking,
            })
                .then(
                    function (ref) {
                        $scope.client.name      = "";
                        $scope.client.email     = "";
                        $scope.client.addresse  = "";
                        $scope.client.nbr_Room  = "";
                        $scope.client.dateDebut = "";
                        $scope.client.dateFin   = "";
                        $scope.client.roomType  = "";
                        $scope.client.isSmoking = "";

                        $scope.msg_update = "Client a ete mise a jour avec succes.";

                        //wait 200ms
                        window.setTimeout(function () {
                            $scope.$apply(function () { })
                        }, 200);
                        //afficher le message 'msg_update' , puis masquer apres 2s : 
                        window.setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.msg_update = false;
                            })
                        }, 2000)  //2000ms = 2s
                    },

                    //s'il y a des errors :
                    function (error) {
                        console.log(error);
                    }
                );
        };
    });
