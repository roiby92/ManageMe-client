import { makeObservable, observable } from 'mobx'

export default class ServiceWorker {
    constructor(ServiceWorker) {
        this.id = ServiceWorker.id
        this.firstName = ServiceWorker.firstName
        this.lastName = ServiceWorker.lastName
        this.email = ServiceWorker.email
        this.phone = ServiceWorker.phone
        this.dateJoin = ServiceWorker.dateJoin
        this.type = {id: ServiceWorker.typeId, type: ServiceWorker.type}
        this.img = ServiceWorker.img
        this.messages = ServiceWorker.messages

        makeObservable(this, {
            id: observable,
            firstName: observable,
            lastName: observable,
            email: observable,
            phone: observable,
            dateJoin: observable,
            type: observable,
            img: observable,
            messages:observable
        })
    }
}