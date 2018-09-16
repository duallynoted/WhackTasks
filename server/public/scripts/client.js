const taskApp = angular.module('TaskApp', []);

taskApp.controller('TaskController', ['$http', function ($http) {
    const self = this;
    self.message = ('Did you remember to ride in a helicopter today?');
    self.objectToSend = {};
    self.getTask = function () {
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function (response) {
            self.tasksArray = response.data;
        }).catch(function (error) {
            alert('Unable to GET from Server', error);
            console.log('Error', error);
        })
    };
    self.addTask = function (newTask) {
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
        swal({
            title: "WhackTastic!",
            text: "Get on With Your Day!",
            icon: "success",
            button: "Ooooh, click me, click ME!",
        });
        $http({
            method: 'PUT',
            url: '/tasks',
            params: taskToUpdate
        }).then(function (results) {
            console.log('Back from Server with PUT', results);
            self.getTask();
        }).catch(function (error) {
            alert('Error updating WhackTask');
            console.log('Error', error);
        })
    }

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
                    swal("Your WhackTask is gone. Go forth and be awesome.", {
                        icon: "success",
                    });
                } else {
                    swal("Well, go get it done then!");
                }
            });
    }
    self.getTask();

}]);


