const taskApp = angular.module('TaskApp', []);

taskApp.controller('TaskController', ['$http', function ($http) {
    const self = this;
    self.message = ('Well, hello there.');
    self.objectToSend = {};
    self.getTask = function () {
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function (response) {
            console.log('Back from Server with GET', response);
            self.tasksArray = response.data;
        }).catch(function (error) {
            alert('Unable to GET from Server', error);
            console.log('Error', error);
        })
    };
    self.addTask = function (newTask) {
        console.log(self.objectToSend);
        $http({
            method: 'POST',
            url: '/tasks',
            data: newTask
        }).then(function (response) {
            console.log('Back from Server with POST', response);
            self.objectToSend = {}
            self.getTask();
        }).catch(function (error) {
            alert('Unable to add Task', error);
            console.log('Error', error);
        });
    }

    self.getTask();

}]);
