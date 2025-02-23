import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";
import { updateUserDetails } from "../store/actions/user.actions.js";

const { useState } = React
const { useNavigate } = ReactRouterDOM
export function UserDetails(){

    const [user,setUser] = useState(userService.getLoggedinUser());
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate()

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

        setUser(prevUser => ({ ...prevUser, [field]: value }))
    }

    function onSaveUser(ev) {
        ev.preventDefault()
        updateUserDetails(user)
        .then((user) => {
            navigate('/todo')
            showSuccessMsg(`User details saved (id: ${user._id})`)
        })
        .catch(err => {
            showErrorMsg('Cannot save user details')
            console.log('err:', err)
        })

    }


    const { fullname, color, backgroundColor } = user
    const loadingClass = isLoading? "loading" : "";
    
    return (
        <section className={`user-details ${loadingClass}`}>
            <form onSubmit={onSaveUser} >
                <label htmlFor="fullname">Name:</label>
                <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />

                <label htmlFor="color">Color:</label>
                <input onChange={handleChange} value={color} type="color" name="color" id="color" />

                <label htmlFor="backgroundColor">BG color:</label>
                <input onChange={handleChange} value={backgroundColor} type="color" name="backgroundColor" id="backgroundColor" />
                <button>Save</button>
            </form>
        </section>
    )

}