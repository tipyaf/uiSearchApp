/**
 * Created by yannickbenchimol on 12/11/2016.
 */
var ExampleApp = angular.module('ExampleApp', ['elasticsearch', 'luegg.directives', 'ui.router', 'ngAnimate'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/search');

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('search', {
                url: '/search',
                templateUrl: 'partials/search.html',
                controller: 'searchController'

            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('result', {
                url: '/result',
                templateUrl: 'partials/result.html',
                controller: 'resultController'
                // resolve: {
                //     error : checkError
                // }
            });

    });

function checkError($q, $http, SearchService, $state) {
    var deferred = $q.defer();
    var recherche = {
        "query": {
            "query_string": {
                "query": SearchService.query
            }
        }
    };
    $http.post('http://localhost:9200/test/first/_search', recherche)
        .then(function (data) {
            // $scope.responses = data.data.hits.hits;
            if(data.status == 200){
                if(data.hits == undefined){
                    $state.go('search');
                    // console.log(recherche, 'verif')
                }else {
                    $state.go('result');
                    console.log('yo')
                }
            }

        });
    console.log(deferred.promise, 'deferred promise');
    return deferred.promise;
}