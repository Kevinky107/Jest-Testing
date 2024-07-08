class Room {
    constructor({name, bookings, rate, discount}){
        this._name = name
        this._bookings = bookings
        this._rate = rate
        this._discount = discount
    }

    addBooking = (booking) => {
        this._bookings.push(booking)
    }

    isOccupied = (date) => {
        let isOccupied = false
        this._bookings.forEach(booking => {
            if(booking._checkin <= date && date < booking._checkout) {
                isOccupied = true;
                return
            }
        })
        return isOccupied
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
        this._name = name
        this._email = email
        this._checkin = checkin
        this._checkout = checkout
        this._discount = discount
        this._room = room
    }

    getFee = () => {

    }

}

module.exports = {Room, Booking};