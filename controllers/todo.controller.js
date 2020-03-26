const todoModel = require("../model/todo.model")

exports.createTodo = async (req, res, next) => {
    // console.log(req.body);
    try {
        const createdtodoModel = await todoModel.create(req.body);
        res.status(201).json(createdtodoModel);
    } catch (err) {
        next(err)
    }

};


exports.getTodos = async (req, res, next) => {
    // console.log(req.body);
    try {
        const getTodos = await todoModel.find();
        res.status(200).json(getTodos);
    } catch (err) {
        next(err)
    }

};


exports.getTodoById = async (req, res, next) => {
    try {
        const todo = await todoModel.findById(req.params.todoId);
        if (todo) {
            res.status(200).json(todo);

        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err)
    }

};

exports.updateTodo = async (req, res, next) => {
    try {
        // console.log("req.body.title ;",req.body.title)
        const todo = await todoModel.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            {
              new: true,
              useFindAndModify: false
            }
          );
        // const todo = await todoModel.findByIdAndUpdate({ "_id": req.body._id }, { $set: { "title": req.body.title } });
        // console.log(todo)
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).send();
        }

    } catch (err) {
        console.log("errrprr",err)
        next(err)
    }

};