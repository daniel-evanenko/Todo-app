import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {

  return (
    <ul className="todo-list">
      {todos.length > 0 ? todos.map(todo => <li key={todo._id} style={{ backgroundColor: todo.backgroundColor }}>
        <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
        <section>
          <button onClick={() => onRemoveTodo(todo)}>Remove</button>
          <button>
            <Link to={`/todo/${todo._id}`}>Details</Link>
          </button>
          <button>
            <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
          </button>
        </section>
      </li>) : <p>No todos to show</p>}
    </ul>
  )
}