import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from "../store/actions/todo.actions.js"
import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js"
 
import { updateUserBalance } from "../store/actions/user.actions.js"
import { showModal } from "../store/actions/modal.actions.js"
import { userService } from "../services/user.service.js"

const  { Fragment }  = React

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    const dispatch = useDispatch()

    
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)

    // const [searchParams, setSearchParams] = useSearchParams()
    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    useEffect(() => {
        // setSearchParams(filterBy)
        loadTodos()
            .catch(() => showErrorMsg('Cannot load todos'))
    }, [filterBy])


    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveTodo(todoId) {

        dispatch(showModal({message: "Are you sure you want to delete this todo?",
            onConfirm: () =>         
            removeTodo(todoId)
            .then(() => showSuccessMsg(`Todo removed`))
            .catch(() => showErrorMsg('Cannot remove todo ' + todoId)
            )
        }));
    }


    function onToggleTodo(todo) {
        saveTodo({ ...todo, isDone: !todo.isDone })
            .then((savedTodo) => {
                const todoIsDone = savedTodo.isDone;
                updateBalance(todoIsDone);
                showSuccessMsg(`Todo is ${todoIsDone ? 'done' : 'back on your list'}`);
            })
            .catch(err => {
                showErrorMsg('Cannot toggle todo ' + todo._id);
            });
    }
    
    function updateBalance(todoIsDone){
        if(userService.getLoggedinUser() && todoIsDone) {
            updateUserBalance().then(()=> showSuccessMsg('Your balance increased by 10')
        )}
    }
    

    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            { !isLoading ? 
            <Fragment>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
                
            </Fragment>
            : <div className="loader"></div>
            } 
        </section>
    )
}