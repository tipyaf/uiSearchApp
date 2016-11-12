/**
 * Created by yannickbenchimol on 12/11/2016.
 */
ExampleApp.controller('searchController', function ($scope, client, esFactory, $state, $rootScope, SearchService, $timeout) {
    $.material.init();

 $scope.onMySearch = function (request) {
     $scope.currentSearch = request
     SearchService.requestHomeSearch.query = request;
     SearchService.getSearch()
         .then(function (data) {
             if(!data.data.hits.max_score){
                 $scope.errorMsg = true;
                 $timeout(function () {
                     $scope.errorMsg = false;
                 }, 2500);

                 console.log('error msg')
             }else {
                 $state.go('result')
             }
         }, function (err) {
             switch (err.status) {
                 case 400:
                     $scope.errorNoSearch = true;
                     $timeout(function () {
                         $scope.errorNoSearch = false;
                     }, 2500);
                     break;

                 default:

                     break;
             }
             console.log(err)

         })

 }


    client.cluster.state({
        metric: [
            'cluster_name',
            'nodes',
            'master_node',
            'version'
        ]
    })
        .then(function (resp) {
            $scope.clusterState = resp;
            $scope.error = null;
        })
        .catch(function (err) {
            $scope.clusterState = null;
            $scope.error = err;

            // if the err is a NoConnections error, then the client was not able to
            // connect to elasticsearch. In that case, create a more detailed error
            // message
            if (err instanceof esFactory.errors.NoConnections) {
                $scope.error = new Error('Unable to connect to elasticsearch. ' +
                    'Make sure that it is running and listening at http://localhost:9200');
            }
        });


});
