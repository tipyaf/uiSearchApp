/**
 * Created by yannickbenchimol on 12/11/2016.
 */
ExampleApp.service('client', function (esFactory) {
    return esFactory({
        host: 'http://localhost:9200',
        apiVersion: '2.3',
        log: 'trace'
    });
});
