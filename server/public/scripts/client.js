const taskApp = angular.module('TaskApp', []);
self.objectToSend = {};
self.tasks = [];
taskApp.controller('TaskController', ['$http', function ($http) {
    self = this;
    self.message = ('Well, hello there.');

    self.addTask = function () {
        console.log(self.objectToSend);
        $http({
            method: 'POST',
            url: '/tasks',
            data: self.objectToSend
        }).then(function (response) {
            console.log('Back from Server with POST', response);
            self.objectToSend = {};
        }).catch(function (error) {
            alert('Unable to add Task', error);
            console.log('Error', error);
        });
    }
    self.getTask = function () {
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function (response) {
            console.log('Back from Server with GET', response);
            self.tasks = response.data;
        }).catch(function(error) {
            alert('Unable to GET from Server', error);
            console.log('Error', error);
        })
    }
}]);
