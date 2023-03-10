import { httpService } from './http.service'
import { socketService } from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    saveDiscColor
}

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    try {
        const user = await httpService.get(`user/${userId}`)
        return user
    } catch (err) {
        console.log('something went wrong', err)
        throw err
    }
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update({ _id }) {
    try {
        const user = await httpService.put(`user/${_id}`, { _id })
        if (getLoggedinUser()._id === user._id) saveLocalUser(user)
        return user

    } catch (err) {
        console.log('something went wrong', err)
        throw err
    }
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            socketService.login(user._id)
            return saveLocalUser(user)
        }

    } catch (err) {
        console.log('something went wrong', err)
        throw err
    }
}
async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred)
        socketService.login(user._id)
        return saveLocalUser(user)
    } catch (err) {
        console.log('something went wrong', err)
        throw err
    }
}
async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        socketService.logout()
        return await httpService.post('auth/logout')
    } catch (err) {
        console.log('something went wrong', err)
        throw err
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, discColor: user.discColor }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveDiscColor(discColor) {
    let user = getLoggedinUser()
    user.discColor = discColor
    saveLocalUser(user)
    return user
}

