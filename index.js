class Room {
    constructor({name, bookings, rate, discount}){
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }

    isOccupied = (date) => {

    }

    occupancyPercetage = (startDate, endDate) => {

    }

    static totalOccupancyPercetage = (rooms, startDate, endDate) => {

    }

    static availableRooms = (rooms, startDate, endDate) => {

    }

}

class Booking {
    constructor({name, email, checkin, checkout, discount, room}){
        this.name = name
        this.email = email
        this.checkin = checkin
        this.checkout = checkout
        this.discount = discount
        this.room = room
    }

    getFee = () => {

    }

}

module.exports = {Room, Booking};