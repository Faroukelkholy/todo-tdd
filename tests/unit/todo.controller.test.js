const todoController = require("../../controllers/todo.controller");

const todoModel = require("../../model/todo.model");

todoModel.create = jest.fn();

describe("todoController.createTodo",()=>{
    it("should have a createTodo function",()=>{
        expect(typeof todoController.createTodo).toBe("function");
    });
});


