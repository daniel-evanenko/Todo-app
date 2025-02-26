import { store } from "../store.js";
import { todoService } from "../../services/todo.service.js";
import { REMOVE_TODO, SET_IS_LOADING, SET_PROGRESS, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js";

export async function loadTodos() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    try {
        const allTodos = await todoService.query();

        const completedTodos = allTodos.filter(todo => todo.isDone).length;
        const totalTodos = allTodos.length;

        const filterBy = store.getState().todoModule.filterBy;

        const filteredTodos = _applyFilter(allTodos, filterBy);

        const todos = {
            filteredTodos,
            completedTodos,
            totalTodos,
        }
        store.dispatch({ type: SET_TODOS, todos: todos });

    } catch (err) {
        console.error('todo action -> Cannot load todos', err);
        throw err;
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
}




export async function removeTodo(todoId) {
    try {
        await todoService.remove(todoId);
        await store.dispatch({ type: REMOVE_TODO, todoId });
    } catch (err) {
        console.error('todo action -> Cannot remove todo', err);
        throw err;
    }
}


export async function saveTodo(toggledTodo) {
    try {
        const savedTodo = await todoService.save(toggledTodo);
        store.dispatch({ type: UPDATE_TODO, todo: savedTodo });
        return savedTodo;
    } catch (err) {
        console.error('todo action -> Cannot save todo', err);
        throw err;
    }
}




function _applyFilter(todos, filterBy) {
    if (!filterBy) return todos;

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        todos = todos.filter(todo => regExp.test(todo.txt))
    }

    if (filterBy.importance) {
        todos = todos.filter(todo => todo.importance >= filterBy.importance)
    }
    if (filterBy.filterByOpt) {
        if (filterBy.filterByOpt == 'done') {
            todos = todos.filter(todo => todo.isDone == true)
        } else if (filterBy.filterByOpt == 'active') {
            todos = todos.filter(todo => todo.isDone != true)
        }
    }

    return todos
}

function _calculateProgress(todos) {
    const completedTodos = todos.filter(todo => todo.isDone).length;
    const totalTodos = todos.length;
    return totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
}
