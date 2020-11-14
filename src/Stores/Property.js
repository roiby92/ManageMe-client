import { action, makeObservable, observable } from 'mobx'

export default class Property {
    constructor(property) {
        this.id = property.id
        this.name = property.propertyName
        this.img = property.img
        this.address = property.address
        this.rooms = property.rooms
        this.bathrooms = property.bathrooms
        this.guests = property.guests
        this.pool = property.pool ? true : false
        this.ac = property.ac ? true : false
        this.wifi = property.wifi ? true : false
        this.kitchen = property.kitchen ? true : false
        this.owner = {
            id: property.ownerId, 
            name: property.ownerName, 
            phone: property.phone, 
            country: property.country, 
            email: property.email
        }
        this.todoList = []
        this.serviceWorkers = []
        this.booking = []

        makeObservable(this, {
            id: observable,
            name: observable,
            img: observable,
            address: observable,
            rooms: observable,
            bathrooms: observable,
            guests: observable,
            pool: observable,
            ac: observable,
            wifi: observable,
            pool: observable,
            kitchen: observable,
            owner: observable,
            serviceWorkers: observable,
            booking: observable,
            todoList: observable,
            addServiceWorker: action
        })
    }

    addServiceWorker = (serviceWorker) => {
        this.serviceWorkers.push(serviceWorker)
    }
}