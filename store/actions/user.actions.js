import { userService } from "../../services/user.service.js"
import { ADD_USER_ACTIVITY, SET_USER, SET_USER_BALANCE, SET_USER_DETAILS } from "../reducers/user.reducer.js"
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
 export async function updateUserDetails(newUserDetails) {
    try {
        const updatedUser = await userService.updateUserDetails(newUserDetails);
        await store.dispatch({ type: SET_USER_DETAILS, updatedUser: updatedUser })
        return updatedUser
    } catch (err) {
        console.log('user actions -> Cannot update user details', err)
        throw err
    }
}


export async function addUserActivity(txt) {
    try {
        const newActivity = {
            txt,
            at: Date.now(),
        }; 
        const updatedUser = await userService.updateUserActivities(newActivity);
        await store.dispatch({ type: ADD_USER_ACTIVITY, newActivity: newActivity });
        return updatedUser
        
    } catch (error) {
        console.log('user actions -> Cannot update user activities', err)
        throw err
    }


};
