interface RoomInput {
    name: string
    bookings: Booking[]
    rate: number
    discount: number
}

class Room {
    _name: string
    _bookings: Booking[]
    _rate: number
    _discount: number

    constructor({name, bookings, rate, discount}: RoomInput){
        this._name = name
        this._bookings = bookings
        this._rate = rate
        this._discount = discount
    }

    addBooking = (booking: Booking) => {
        this._bookings.push(booking)
    }

    isOccupied = (date: string): boolean => {
        let isOccupied: boolean = false
        this._bookings.forEach(booking => {
            if(booking._checkin <= date && date < booking._checkout) {
                isOccupied = true;
                return
            }
        })
        return isOccupied
    }

    occupancyPercetage = (startDate: string, endDate: string): number => {
        const start: number = Date.parse(startDate)
        const end: number = Date.parse(endDate)
        let days: number = 0;
        let occupiedDays: number = 0;
        for(let i = start; i <= end; i+=86400000)
        {
            days++
            const date = new Date(i)
            let year: number = date.getFullYear();
            let month: string = (date.getMonth() + 1).toString().padStart(2, '0');
            let day: string = date.getDate().toString().padStart(2, '0');
            if(this.isOccupied(`${year}-${month}-${day}`))
                occupiedDays++
        }
        return Math.round((occupiedDays/days)*100)
    }

    static totalOccupancyPercetage = (rooms: Room[], startDate: string, endDate: string): number => {
        let percentage: number = 0;
        rooms.forEach(room => {
            percentage += room.occupancyPercetage(startDate, endDate)
        })

        return Math.round(percentage/rooms.length)
    }

    static availableRooms = (rooms: Room[], startDate: string, endDate: string): Room[] => {
        let roomArray: Room[] = []
        rooms.forEach(room => {
            if(room.occupancyPercetage(startDate, endDate) === 0)
                roomArray.push(room)
        })

        return roomArray
    }

}

interface BookingInput {
    name: string
    email: string
    checkin: string
    checkout: string
    discount: number
    room: Room
}

class Booking {
    _name: string
    _email: string
    _checkin: string
    _checkout: string
    _discount: number
    _room: Room

    constructor({name, email, checkin, checkout, discount, room}: BookingInput){
        this._name = name
        this._email = email
        this._checkin = checkin
        this._checkout = checkout
        this._discount = discount
        this._room = room
    }

    getFee = (): number => {
        const start: number = Date.parse(this._checkin)
        const end: number = Date.parse(this._checkout)
        const nights: number = ( end - start ) / 86400000
        const roomPrice: number = (this._room._rate * nights) - ((this._room._rate * nights)*this._room._discount/100)
        return Math.round(roomPrice - (roomPrice*(this._discount/100)))
    }

}

module.exports = {Room, Booking};