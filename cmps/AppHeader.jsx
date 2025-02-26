const { Link, NavLink } = ReactRouterDOM
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { ProgressBar } from "./ProgressBar.jsx"

const { useSelector } = ReactRedux


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const { completedTodos, totalTodos } = useSelector(state => state.todoModule.todos);

    const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >

                        <Link to={`/user`}>Hello {user.fullname}</Link>
                        <h3>Balance: {user.balance}</h3>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <ProgressBar progress={progress} />

                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
