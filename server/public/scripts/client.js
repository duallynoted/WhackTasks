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
            alert('Unable to add WhackTask', error);
            console.log('Error', error);
        });
    }
    self.updateTask = function (taskToUpdate) {
        taskToUpdate.ready_to_complete = true;
        $http({
            method: 'PUT',
            url: '/tasks',
            data: taskToUpdate
        }).then(function (results) {
            console.log('Back from Server with PUT', results);
            self.getTask();
        }).catch(function (error) {
            alert('Error updating WhackTask');
            console.log('Error', error);
        })
    }
    self.bool = true;
    self.filterObject = {};

    self.toggle = function () {
        if (self.bool) {
            self.bool = !self.bool;
            self.filterObject = { ready_to_complete: true };
            console.log(self.filterObject);
        }
        else {
            self.filterObject = {};
            self.bool = !self.bool;
            console.log(self.filterObject);
        }
    }
    self.filterObject = {};

    self.deleteTask = function (taskToDelete) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this WhackTask.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $http({
                        method: 'DELETE',
                        url: '/tasks',
                        params: taskToDelete
                    }).then(function (results) {
                        console.log('in /delete', results);
                        self.getTask();
                    }).catch(function (error) {
                        alert('Error updating Task!');
                        console.log('Error', error);
                    })
                    swal("Just like that, your WhackTask is gone.", {
                        icon: "success",
                    });
                } else {
                    swal("Your WhackTask is still ready for you to complete!");
                }
            });
    }
    self.getTask();

}]);


