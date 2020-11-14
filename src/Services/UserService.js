import axios from 'axios'

const UserService = function () {

    const getUserDetails = async function (email) {
        const user = await axios.get(`http://localhost:3001/user/${email}`)
        return user.data
    }

    const getUserProperties = async (id) => {
        const userProperties = await axios.get(`http://localhost:3001/properties/${id}`)
        return userProperties.data
    }

    const getPropertyTodo = async (id) => {
        const todoList = await axios.get(`http://localhost:3001/todos/${id}`)
        return todoList.data
    }


    const loadAllTodosForNonMengerUser = async (id) => {
        const allTodo = await axios.get(`http://localhost:3001/todo/${id}`)
        return allTodo.data
    }

    const getUserTypes = async (id) => {
        let userTypes
        if (id) {
            userTypes = await axios.get(`http://localhost:3001/usertype/${id}`)
        } else {
            userTypes = await axios.get(`http://localhost:3001/usertype`)
        }
        return userTypes.data
    }

    const getUserServiceProviders = async (managerId, typeId) => {
        const serviceWorkers = await axios.get(`http://localhost:3001/useremployee/${managerId}/${typeId}`)
        return serviceWorkers.data
    }


    const getMostBookingAppetenceForUser = async (managerId) => {
        const serviceWorkers = await axios.get(`http://localhost:3001/analytics/bookingchannels/${managerId}`)
        return serviceWorkers.data
    }
    const getTodoStatus = async (managerId) => {
        const serviceWorkers = await axios.get(`http://localhost:3001/analytics/openTasks/${managerId}`)
        return serviceWorkers.data
    }

    const getPropertyServiceProviders = async (propertyId, userId) => {
        const serviceWorkers = await axios.get(`http://localhost:3001/service/${propertyId}/${userId}`)
        return serviceWorkers.data
    }
    const getOwnerList = async (managerId) => {
        const ownerList = await axios.get(`http://localhost:3001/properties/owners/${managerId}`)
        return ownerList.data
    }

    const getBooking = async (id) => {
        const booking = await axios.get(`http://localhost:3001/booking/${id}`)
        return booking.data
    }

    const addNewUser = async (userInfo) => {
        const id = await axios.post(`http://localhost:3001/user`, userInfo)
        return id.data[0]
    }

    const addNewUserType = async (type) => {
        const newType = await axios.get(`http://localhost:3001/usertype`, { type })
        return newType
    }


    const addNewProperty = async (propertyDetails) => {
        const newProperty = await axios.post(`http://localhost:3001/property`, propertyDetails)
        return newProperty.data
    }

    const addNewTodo = async (todo) => {
        const newTodo = await axios.post('http://localhost:3001/todo', todo)
        return newTodo.data
    }

    const addNewServiceWorker = async (managerId, serviceWorker) => {
        const newServiceWorker = await axios.post('http://localhost:3001/user', serviceWorker)
        await axios.post('http://localhost:3001/useremployee', { managerId, employeeId: newServiceWorker.data[0]})
        return newServiceWorker.data[0]
    }

    const addPropertyServiceWorker = async (propertyId, employeeId) => {
        const PropertyUser = await axios.post('http://localhost:3001/service', {user: employeeId, property: propertyId})
        return PropertyUser.data
    }

    const addNewBooking = async (booking) => {
        const id = await axios.post('http://localhost:3001/booking', booking)
        return id.data[0]
    }

    const updateUserDetails = async (userId, userNewDetails) => {
        const userDetails = await axios.put(`http://localhost:3001/user/${userId}`, userNewDetails)
        return userDetails.data
    }

    const updateProperty = async (propertyId, updateDetails) => {
        const updatedProperty = await axios.put(`http://localhost:3001/property/${propertyId}`, updateDetails)
        return updatedProperty.data
    }

    const updateBookingDetails = async (bookingId, bookingDetails) => {
        const booking = await axios.put(`http://localhost:3001/booking/${bookingId}`, bookingDetails)
        return booking.data
    }

    const updateTodoDetails = async (todoId, todoDetails) => {
        const todo = await axios.put(`http://localhost:3001/todo/${todoId}`, todoDetails)
        return todo.data
    }

    const updateTodoStatus = async (todoId, status) => {
        const todo = await axios.put(`http://localhost:3001/todo/${todoId}`, { status: status })
        return todo.data
    }

    const deleteProperty = async (propertyId) => {

        const property = await axios.delete(`http://localhost:3001/property/${propertyId}`)
        return property.data
    }

    const deleteTodo = async (todoId) => {
        const todo = await axios.delete(`http://localhost:3001/todo/${todoId}`)
        return todo.data
    }

    const deleteServiceWorkers = async (propertyId, ServiceWorkerId) => {
        const deleted = await axios.delete(`http://localhost:3001/service/${propertyId}/${ServiceWorkerId}`)
        return deleted.data
    }

    const deleteServiceWorkerFromUser = async (managerId, ServiceWorkerId) => {
        const deleted = await axios.delete(`http://localhost:3001/useremployee/${managerId}/${ServiceWorkerId}`)
        return deleted.data
    }

    const deleteBooking = async (bookingId) => {
        const deleted = await axios.delete(`http://localhost:3001/booking/${bookingId}`)
        return deleted.data
    }

    return {
        getUserDetails,
        getUserProperties,
        getPropertyTodo,
        getPropertyServiceProviders,
        getUserServiceProviders,
        getOwnerList,
        getMostBookingAppetenceForUser,
        getBooking,
        getTodoStatus,
        getUserTypes,
        addNewUser,
        addNewUserType,
        addNewProperty,
        addNewTodo,
        addNewServiceWorker,
        addPropertyServiceWorker,
        addNewBooking,
        updateUserDetails,
        updateProperty,
        updateTodoDetails,
        updateTodoStatus,
        updateBookingDetails,
        deleteProperty,
        deleteTodo,
        deleteServiceWorkers,
        deleteServiceWorkerFromUser,
        deleteBooking,
        loadAllTodosForNonMengerUser
    }
}

export default UserService;