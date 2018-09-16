//requires
const express = require('express');
app = express();
const bodyParser = require('body-parser');

//globals
const PORT = 5000;

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//spins
app.listen(PORT, () => {
    console.log('SERVER UP AND RUNNING ON PORT: ', PORT);
})

//connect to Mongo via mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todos', ({ useNewUrlParser: true }));

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo');
});
mongoose.connection.on('error', (error) => {
    console.log('Failed connection to Mongo', error);

})

const Schema = mongoose.Schema;
const taskSchema = new Schema({
    task: { type: String },
    category: { type: String },
    completed: {type: Boolean }
});
const Task = mongoose.model('tasks', taskSchema);

app.post('/tasks', (req, res) => {
    console.log('in /tasks POST');
    Task.create(req.body).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

app.get('/tasks', (req, res) => {
    Task.find({}).then(function (response) {
        res.send(response);
    }).catch((error) => {
        console.log("Error in server .find", error);
        res.sendStatus(500);
    })
});

app.put('/tasks', (req, res) => {
    // console.log('PUT to /tasks req.body =', req.body);
    const taskToUpdate = {
        _id: req.query._id,
        task: req.query.task,
        category: req.query.category,
        completed: false
    }
    Task.findByIdAndUpdate(taskToUpdate._id, taskToUpdate).then((results) => {
      res.send(results);
    }).catch((error) => {
      console.log("Error: ", error);
      res.sendStatus(500);
    })
  });

app.delete('/tasks', (req, res) => {
    Task.findByIdAndRemove(req.query._id).then((results) => {
        res.send(results);
    }).catch((error) => {
        console.log("Error: ", error);
        res.sendStatus(500);
    })
});
