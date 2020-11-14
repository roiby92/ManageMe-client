import {
    makeObservable,
    observable,
    action,
    computed,
} from 'mobx';
import Todo from '../Stores/Todo'
import Property from '../Stores/Property'
import ServiceWorkers from '../Stores/ServiceWorkers'
import Booking from '../Stores/Booking'
import UserService from '../Services/UserService'
import moment from 'moment'


export default class User {

    constructor() {
        this.isAuthenticated = false
        this.id = ''
        this.img = ''
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.phone = ''
        this.dateJoin = ''
        this.type = { id: null, type: null }
        this.properties = []
        this.serviceWorkers = []
        this.allTodos = []

        makeObservable(this, {
            isAuthenticated: observable,
            id: observable,
            img: observable,
            firstName: observable,
            lastName: observable,
            email: observable,
            phone: observable,
            dateJoin: observable,
            properties: observable,
            serviceWorkers: observable,
            userHasAuthenticated: action,
            loadUserDetails: action,
            loadUserProperties: action,
            loadProperteisTodos: action,
            loadPropertiesWorkers: action,
            loadUserTypes: action,
            loadUserServiceProviders: action,
            getOwnerList: action,
            getMostBookingForUser: action,
            getAllTodoStatus: action,
            addNewUserType: action,
            addNewProperty: action,
            addNewTodo: action,
            addNewServiceProperty: action,
            addNewManagerEmployee: action,
            addNewMessage: action,
            updateUserDetails: action,
            updatePropertyDetails: action,
            updateTodoDetails: action,
            updateTodoStatus: action,
            deleteProperty: action,
            deleteTodo: action,
            deleteServiceWorkerFromProperty: action,
            deleteServiceWorkerFromUser: action,
            loadUserAllTodos: action,
            todosCompleted: computed,
            todosNotCompleted: computed,
            mostBookingApartment: computed
        })
    }

    userHasAuthenticated = async (email = undefined, bool) => {
        try {
            this.isAuthenticated = bool
            if (this.isAuthenticated && email) {
                await this.loadUserDetails(email)
                await this.loadUserProperties()
                await this.loadUserServiceProviders()
                await this.loadProperteisBooking()
                await this.loadPropertiesWorkers()
                await this.loadProperteisTodos()
            }
            else {
                this.isAuthenticated = false
                this.id = ''
                this.img = ''
                this.firstName = ''
                this.lastName = ''
                this.email = ''
                this.phone = ''
                this.dateJoin = ''
                this.type = { id: null, type: null }
                this.properties = []
            }
        } catch (error) {
            console.log(error);
        }
    }

    loadUserDetails = async (email) => {
        const user = await UserService().getUserDetails(email)
        this.id = user.id
        this.img = user.img
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.phone = user.phone
        this.dateJoin = user.dateJoin
        this.type = {
            id: user.typeId,
            type: user.type
        }
    };

    loadUserProperties = async () => {
        this.properties = []
        const userProperties = await UserService().getUserProperties(this.id)
        for (let property of userProperties) {
            this.properties.push(new Property(property))
        }
    };


    loadUserAllTodos = async () => {
        this.allTodos = [] //mybe not neccerry here
        const userAllTodos = await UserService().loadAllTodosForNonMengerUser(this.id)
        for (let todo of userAllTodos) {
            this.allTodos.push(todo)
        }
    }

    loadPropertiesWorkers = async () => {
        for (let property of this.properties) {
            let serviceList = await UserService().getPropertyServiceProviders(property.id, this.type.id)
            if (serviceList.length > 0) {
                serviceList.forEach(servicer => {
                    property.serviceWorkers.push(new ServiceWorkers(servicer))
                })
            }
        }
    }

    loadProperteisTodos = async () => {
        for (let property of this.properties) {
            let todoList = await UserService().getPropertyTodo(property.id)
            todoList
                .forEach(todo => {
                    property.todoList.push(new Todo(todo))
                })
        }
    };

    loadProperteisBooking = async () => {
        for (let property of this.properties) {
            let bookingList = await UserService().getBooking(property.id)
            bookingList.forEach(booking => {
                property.booking.push(new Booking(booking))
            })
        }
    };

    loadUserServiceProviders = async () => {
        this.serviceWorkers = []
        const allEmployees = await UserService().getUserServiceProviders(this.id, this.type.id)
        for (let employee of allEmployees) {
            const serviceWorker = new ServiceWorkers(employee)
            this.serviceWorkers.push(serviceWorker)
        }
    };

    loadUserTypes = async (id = undefined) => {
        const allTypes = await UserService().getUserTypes(id)
        return allTypes
    };

    getOwnerList = async () => {
        const ownerList = await UserService().getOwnerList(this.id)
        return ownerList;
    }
    getAllTodoStatus = async () => {
        const ownerList = await UserService().getTodoStatus(this.id)
        return ownerList;
    }

    getMostBookingForUser = async () => {
        const BookingSourceList = await UserService().getMostBookingAppetenceForUser(this.id)
        return BookingSourceList;
    }

    addNewUser = async (user) => {
        this.id = await UserService().addNewUser(user)
        this.img = user.img
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.phone = user.phone
        this.dateJoin = user.dateJoin
        this.type = {
            type: user.type,
            id: user.typeId
        }
    };

    addNewUserType = async (type) => {
        const newType = await UserService().addNewUserType(type)
        return newType
    };

    addNewProperty = async (property) => {
        if (this.type.id === 1) {
            const propertyDetails = { manager: this.id, ...property }
            if (property.owner.id) {
                const propRes = await UserService().addNewProperty(propertyDetails)
                property.id = propRes[0]
                this.properties.push(
                    new Property({
                        ...property,
                        propertyName: property.name,
                        ownerId: property.owner.id,
                        ownerName: property.owner.name,
                        phone: property.owner.phone,
                        email: property.owner.email
                    }))
            }
            else {
                const propertyAndOwnerIds = await UserService().addNewProperty(propertyDetails)
                property.id = propertyAndOwnerIds[0]
                property.owner.id = propertyAndOwnerIds[1]
                this.properties.push(
                    new Property({
                        ...property,
                        propertyName: property.name,
                        ownerId: property.owner.id,
                        ownerName: property.owner.name,
                        phone: property.owner.phone,
                        email: property.owner.email
                    }))
            }
        }
        else {
            console.log('You dont have prommision')
        }
    };

    addNewTodo = async (propertyId, todoDetails) => {
        if (this.type.id === 1) {
            const property = this.properties.find(p => p.id === propertyId)
            const todo = { ...todoDetails, property: propertyId, img: '' }
            const todoId = await UserService().addNewTodo(todo)
            todo.t_id = todoId[0]
            property.todoList.push(new Todo(todo))
        }
        else {
            console.log('You dont have prommision');
        }
    };

    addNewManagerEmployee = async (servicerDetails) => {
        if (this.type.id === 1) {
            servicerDetails.id = await UserService().addNewServiceWorker(this.id, servicerDetails)
            this.serviceWorkers.push(new ServiceWorkers(servicerDetails))
        }
        else {
            console.log('You dont have prommision');
        }
    };

    addNewServiceProperty = async (propertyId, employeeId) => {
        await UserService().addPropertyServiceWorker(propertyId, employeeId)
        const serviceWorker = this.serviceWorkers.find(w => w.id === employeeId)
        const property = this.properties.find(p => p.id === propertyId)
        property.addServiceWorker(serviceWorker)
    }

    addNewBooking = async (bookingDetails) => {
        if (this.type.id === 1) {
            const property = this.properties.find(p => p.id === bookingDetails.property)
            bookingDetails.id = await UserService().addNewBooking(bookingDetails)
            property.booking.push(new Booking(bookingDetails))
            return bookingDetails.id
        }
        else {
            console.log('You dont have prommision');
        }
    };
    addNewMessage = (userId, message) => {
        const getter = this.serviceWorkers.find(sw => sw.id === userId)
        if(!getter.messages.some(m => m.id === message.id)){
            getter.messages.push({...message, date: moment().format()})
        }
    };

    updateUserDetails = async (userDetails) => {
        await UserService().updateUserDetails(this.id, userDetails);
        for (let prop in userDetails) {
            const key = prop === 'first_name' ? "firstName" : prop === 'last_name' ? "lastName" : prop
            this[key] = userDetails[prop]
        }
    };

    updatePropertyDetails = async (propertyId, updateDetails) => {
        if (this.type.id === 1) {
            const property = this.properties.find(p => p.id === propertyId)
            await UserService().updateProperty(property.id, updateDetails)
            for (let prop in updateDetails) {
                property[prop] = updateDetails[prop]
            }
        }
        else {
            console.log('You dont have prommision');
        }
    };

    updateTodoDetails = async (propertyId, todoId, todoDetails) => {
        const property = this.properties.find(p => p.id === propertyId)
        const todo = property.todoList.find(td => td.id === todoId)
        if (this.type === 1) {
            await UserService.updateTodoDetails(todo.id, todoDetails)
            for (let td in todoDetails) {
                todo[td] = todoDetails[td]
            }
        }
    };

    updateTodoStatus = async (propertyId, todoId) => {
        const property = this.properties.find(p => p.id === propertyId)
        const todo = property.todoList.find(td => td.id === todoId)
        todo.complete = !todo.complete
        await UserService().updateTodoStatus(todo.id, todo.complete)
    };

    updateBooking = async (bookingId, bookingDetails) => {
        const booking = this.properties.find(p => p.booking.find(b => b.id === bookingId))
            .booking.find(b => b.id === bookingId)
        if (this.type.id === 1) {
            await UserService().updateBookingDetails(bookingId, bookingDetails)
            for (let b in bookingDetails) {
                const newKey = b === 'start_date' ? 'startDate' : b === "end_date" ? 'endDate' : b
                booking[newKey] = bookingDetails[b]
            }
        }
    };

    deleteProperty = async (propertyId) => {
        if (this.type.id === 1) {
            await UserService().deleteProperty(propertyId)
            const propertyIndex = this.properties.findIndex(p => p.id === propertyId)
            this.properties.splice(propertyIndex, 1)
        }
        else {
            console.log('You dont have prommision');
        }
    };

    deleteTodo = async (propertyId, todoId) => {
        if (this.type.id === 1) {
            const property = this.properties.find(p => p.id === propertyId)
            const todoIndex = property.todoList.findIndex(td => td.id === todoId)
            property.todoList.splice(todoIndex, 1)
            await UserService().deleteTodo(todoId);
        }
        else {
            console.log('You dont have prommision');
        }
    };

    deleteServiceWorkerFromProperty = async (propertyId, ServiceWorkerId) => {
        if (this.type.id === 1) {
            await UserService().deleteServiceWorkers(propertyId, ServiceWorkerId);
            const property = this.properties.find(p => p.id === propertyId)
            const serviceWorkerIndex = property.serviceWorkers.findIndex(sw => sw.id === ServiceWorkerId)
            property.serviceWorkers.splice(serviceWorkerIndex, 1)
        }
        else {
            console.log('You dont have prommision');
        }
    };

    deleteServiceWorkerFromUser = async (ServiceWorkerId) => {
        if (this.type.id === 1) {
            for (let property of this.properties) {
                const serviceWorker = property.serviceWorkers.findIndex(sw => sw.id === ServiceWorkerId)
                if (serviceWorker !== -1) {
                    alert('This service worker is connected to one of your properties. You must detlete it first.')
                    return
                } else {
                    await UserService().deleteServiceWorkerFromUser(this.id, ServiceWorkerId)
                    this.serviceWorkers = this.serviceWorkers.filter(w => w.id !== ServiceWorkerId)
                }
            }
        }
        else {
            console.log('You dont have prommision');
        }
    };

    deleteBooking = async (BookingId) => {
        if (this.type.id === 1) {
            await UserService().deleteBooking(BookingId);
            this.properties = this.properties.map(p => {
                p.booking = p.booking.filter(b => b.id !== BookingId)
                return p
            })
        }
        else {
            console.log('You dont have prommision');
        }
    };

    get todosCompleted() {
        let counter = 0
        for (let property of this.properties) {
            for (let todo of property.todoList) {
                if (todo.complete) {
                    counter++
                }
            }
        }

        return counter
    }

    get todosNotCompleted() {
        let counter = 0
        for (let property of this.properties) {
            for (let todo of property.todoList) {
                if (!todo.complete) {
                    counter++
                }
            }
        }
        return counter
    }

    get mostBookingApartment() {
        console.log(this.properties)
    }

};