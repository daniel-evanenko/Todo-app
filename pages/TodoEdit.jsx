import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo } from "../store/actions/todo.actions.js"
import { addUserActivity } from "../store/actions/user.actions.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        setIsLoading(true)
        todoService.get(params.todoId)
            .then(setTodoToEdit)
            .catch(err => console.log('err:', err))
            . finally(() => setIsLoading(false));

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo({...todoToEdit})
        .then((savedTodo) => {
            navigate('/todo')
            const action = todoToEdit._id ? 'updated' : 'added'
            addUserActivity(`Todo '${todoToEdit.txt}' was ${action} `)
            showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
        })
        .catch(err => {
            showErrorMsg('Cannot save todo')
            console.log('err:', err)
        })

    }

    const { txt, importance, backgroundColor, isDone } = todoToEdit
    const loadingClass = isLoading? "loading" : "";
    
    return (
        <section className={`todo-edit ${loadingClass}`}>
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="backgroundColor">Background color:</label>
                <input onChange={handleChange} value={backgroundColor} type="color" name="backgroundColor" id="backgroundColor" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} checked={isDone} type="checkbox" name="isDone" id="isDone" />


                <button>Save</button>
            </form>
        </section>
    )
}