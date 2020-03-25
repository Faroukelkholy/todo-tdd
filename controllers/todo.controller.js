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