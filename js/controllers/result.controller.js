/**
 * Created by yannickbenchimol on 12/11/2016.
 */
ExampleApp.controller('resultController', function ($scope, client, esFactory, $http, $state, $rootScope, SearchService) {

    SearchService.getSearch()
        .then(function (data) {
            console.log(data.data.hits.max_score, 'max score')
            if(!data.data.hits.max_score){
                $state.go('search')
            }else {
                $scope.responses = data.data.hits.hits;
                console.log(data, 'result data ok')
            }

        }, function (err) {
            console.log(err, 'result data error');
            $state.go('search')
        });


console.log(SearchService, 'service data')
// if ($scope.responses == false){
//     $state.go('search')
// }


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
