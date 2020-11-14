import { makeObservable, observable } from 'mobx'

export default class Booking {
    constructor(booking) {
        this.id = booking.id
        this.startDate = booking.startDate
        this.endDate = booking.endDate
        this.guests = booking.guests
        this.channel = booking.channel
        this.name = booking.name
        this.phone = booking.phone
        this.email = booking.email
        this.property = booking.property

        makeObservable(this, {
            id: observable,
            startDate: observable,
            endDate: observable,
            guests: observable,
            channel: observable,
            phone: observable,
            email: observable,
            name: observable,
            property: observable
        })
    }
}