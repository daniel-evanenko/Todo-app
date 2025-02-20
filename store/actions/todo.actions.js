import {store} from "../store.js";
import {todoService} from "../../services/todo.service.js";
import { REMOVE_TODO, SET_IS_LOADING, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js";

export async function loadTodos() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    try {
        const filterBy = store.getState().todoModule.filterBy;

        const todos = await todoService.query(filterBy);
        store.dispatch({ type: SET_TODOS, todos });

    } catch (err) {
        console.error('todo action -> Cannot load todos', err);
        throw err;
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
}



export async function removeTodo(todoId) {
    try {
        const removedTodo  = await todoService.remove(todoId);
        store.dispatch({ type: REMOVE_TODO, todoId });
        return removedTodo;
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




