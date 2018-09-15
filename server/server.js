//requires
const express = require('express');
app = express();
const bodyParser = require('body-parser');

//globals
const PORT = 5000;

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
//spins
app.listen(PORT, () => {
    console.log('SERVER UP AND RUNNING ON PORT: ', PORT);
})

//connect to Mongo via mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todos', ({useNewUrlParser: true}));

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo');
});
mongoose.connection.on('error', (error) => {
    console.log('Failed connection to Mongo', error);

})

const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    description: { type: String },
    category: { type: String },
    completed: { type: Boolean }
});
const Task = mongoose.model('Tasks', TaskSchema);
app.post('/tasks', (req, res) => {
    console.log('in /tasks POST');
    console.log('HEEYYYYY LOOOK', req.body);
    Task.create(req.body).then(() => {
        console.log('Item added', req.body);
        res.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})
