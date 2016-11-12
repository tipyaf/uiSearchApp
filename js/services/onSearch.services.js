/**
 * Created by yannickbenchimol on 12/11/2016.
 */
ExampleApp.factory("SearchService", function($http){
    var services ={
        requestHomeSearch : requestHomeSearch,
        getSearch: getSearch
    }
    return services;


    function requestHomeSearch() {
        var mySearch = {};
        return mySearch
    }

    function getSearch() {
        var recherche = {
            "query": {
                "query_string": {
                    "query": requestHomeSearch.query
                }
            }
        };
        return $http.post('http://localhost:9200/test/first/_search', recherche)

    }

});
