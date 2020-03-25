const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

todoModel.create = jest.fn();
todoModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();;
})

describe("todoController.getTodos", () => {

    beforeEach(() => {
        req.body = newTodo;
    })

    it("should have a getTodos function", () => {
        expect(typeof todoController.getTodos).toBe("function");
    });

    it("should call todoModel.find", async () => {
        await todoController.getTodos(req, res, next);
        expect(todoModel.find).toBeCalledWith();
    })

    it("should return 200 response code", async () => {
        await todoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })

    it("should return json body response", async () => {
        todoModel.find.mockReturnValue(allTodos);
        await todoController.getTodos(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allTodos);
    })
    it("should handle errors", async () => {
        const errorMessage = {message:"no todos found"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.find.mockReturnValue(rejectedPromise);
        await todoController.getTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })

});

describe("todoController.createTodo", () => {

    beforeEach(() => {
        req.body = newTodo;
    })

    it("should have a createTodo function", () => {
        expect(typeof todoController.createTodo).toBe("function");
    });

    it("should call todoModel.create", async () => {
        await todoController.createTodo(req, res, next);
        expect(todoModel.create).toBeCalledWith(newTodo);
    })

    it("should return 201 response code", async () => {
        await todoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled).toBeTruthy();
    })

    it("should return json body response", async () => {
        todoModel.create.mockReturnValue(newTodo);
        await todoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })
    it("should handle errors", async () => {
        const errorMessage = {message:"Done property missing"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.create.mockReturnValue(rejectedPromise);
        await todoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })

});


