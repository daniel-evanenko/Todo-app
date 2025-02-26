import { todoService } from "../../services/todo.service.js"

//* Todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: {
        filteredTodos: [],
        completedTodos: 0,
        totalTodos: 0
    },
    filterBy: todoService.getDefaultFilter(),
    isLoading: false,
}

export function todoReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }

        case ADD_TODO:

            const updatedTodos = [...state.todos.filteredTodos, cmd.todo]
            return {
                ...state,
                todos: {
                    filteredTodos: updatedTodos,
                    completedTodos: cmd.todo.isDone ? state.todos.completedTodos + 1 : state.todos.completedTodos,
                    totalTodos: state.todos.totalTodos + 1
                }
            }

        case REMOVE_TODO:

            const todoToRemove = state.todos.filteredTodos.find((todo) => todo._id === cmd.todoId);

            return {
                ...state,
                todos: {
                    filteredTodos: state.todos.filteredTodos.filter(todo => todo._id !== cmd.todoId),
                    completedTodos: todoToRemove.isDone ? state.todos.completedTodos - 1 : state.todos.completedTodos,
                    totalTodos: state.todos.totalTodos - 1
                }
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    filteredTodos: state.todos.filteredTodos.map(todo =>
                        todo._id === cmd.todo._id ? cmd.todo : todo
                    ),
                    completedTodos: cmd.todo.isDone ? state.todos.completedTodos + 1 : state.todos.completedTodos - 1
                }
            };

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        default:
            return state

    }
}
