import { userService } from "../../services/user.service.js"
import { SET_USER, SET_USER_BALANCE } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}


export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}


 export async function updateUserBalance() {
    try {
        const newBalance = await userService.updateBalance();
        await store.dispatch({ type: SET_USER_BALANCE, balance: newBalance })

    } catch (err) {
        console.log('user actions -> Cannot update user balance', err)
        throw err
    }
}

