(function () {
    // Connecter avec firebase
    // Remplacez la configuration Firebase avec vos propres informations d'identification
    const firebaseConfig = {
        apiKey: "votre-clé-api",
        authDomain: "votre-domaine-d'authentification.firebaseapp.com",
        databaseURL: "https://votre-url-de-base-de-données.firebaseio.com",
        projectId: "votre-id-de-projet",
        storageBucket: "votre-bucket-de-stockage.appspot.com",
        messagingSenderId: "votre-id-d'expéditeur-de-messages",
        appId: "votre-id-d'application"
    };



    firebase.initializeApp(firebaseConfig);

    // setup + redirecter non valide url a '/home' page
    angular.module("myApp", ['ngRoute', 'firebase', 'ngMessages', 'myApp.home',
        'myApp.list_Client', 'myApp.ajouter_Client', 'myApp.modifier_Client'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider
                .otherwise({
                    redirectTo: "/home"
                })
        }]);
}());