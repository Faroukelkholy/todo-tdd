const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

// todoModel.create = jest.fn();
// todoModel.find = jest.fn();
// todoModel.findById = jest.fn();
// todoModel.findByIdAndUpdate = jest.fn();
jest.mock("../../model/todo.model");

let req, res, next;
const todoId = "5d5ecb5a6e598605f06cb945";
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();;
})

describe("todoController.getTodos", () => {

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
        const errorMessage = { message: "no todos found" };
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.find.mockReturnValue(rejectedPromise);
        await todoController.getTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })

});

describe("todoController.getTodoById", () => {

    it('should have getTodoById func', () => {
        expect(typeof todoController.getTodoById).toBe("function");
    })

    it('should have todoModel.findbyID called', async () => {
        req.params.todoId = todoId;
        await todoController.getTodoById(req, res, next);
        expect(todoModel.findById).toBeCalledWith(todoId)
    })

    it('should return status code 200 and response json', async () => {
        // req.params.todoId = todoId;
        // expect(todoModel.findById).toBeCalledWith(todoId)
        todoModel.findById.mockReturnValue(allTodos[0])
        await todoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(allTodos[0])
    })

    it("should handle errors", async () => {
        const errorMessage = { message: "no todo found" };
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.findById.mockReturnValue(rejectedPromise);
        await todoController.getTodoById(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })

    it("should return 404 if no todo found", async () => {
        todoModel.findById.mockReturnValue(null);
        await todoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
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
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.create.mockReturnValue(rejectedPromise);
        await todoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })

});



describe("todoController.updateTodo", () => {
    it("should have a updateTodo func", () => {
        expect(typeof todoController.updateTodo).toBe("function")
    });

    it("should call todomodel.findByIdAndUpdate", async () => {
        req.params.todoId = todoId;
        req.body = newTodo;
        await todoController.updateTodo(req, res, next);
    
        expect(todoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
          new: true,
          useFindAndModify: false
        });
    });

    it("should return status code 200 and update todo", async () => {
        // let updateTodo = newTodo;
        // updateTodo.title = "new title";
        // req.body = updateTodo;
        req.body = newTodo;
        todoModel.findByIdAndUpdate.mockReturnValue(req.body)
        await todoController.updateTodo(req, res, next)
        // expect(todoModel.findByIdAndUpdate).toBeCalledWith(newTodo._id);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(req.body);
    });

    it('handle 404 error , todo not found ', async()=>{
        todoModel.findByIdAndUpdate.mockReturnValue(null)
        await todoController.updateTodo(req, res, next)
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });

    it('handle error ', async()=>{
        const errorMessage = { message: "Error" };
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await todoController.updateTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
})


