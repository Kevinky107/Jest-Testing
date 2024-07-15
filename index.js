var Room = /** @class */ (function () {
    function Room(_a) {
        var name = _a.name, bookings = _a.bookings, rate = _a.rate, discount = _a.discount;
        var _this = this;
        this.addBooking = function (booking) {
            _this._bookings.push(booking);
        };
        this.isOccupied = function (date) {
            var isOccupied = false;
            _this._bookings.forEach(function (booking) {
                if (booking._checkin <= date && date < booking._checkout) {
                    isOccupied = true;
                    return;
                }
            });
            return isOccupied;
        };
        this.occupancyPercetage = function (startDate, endDate) {
            var start = Date.parse(startDate);
            var end = Date.parse(endDate);
            var days = 0;
            var occupiedDays = 0;
            for (var i = start; i <= end; i += 86400000) {
                days++;
                var date = new Date(i);
                var year = date.getFullYear();
                var month = (date.getMonth() + 1).toString().padStart(2, '0');
                var day = date.getDate().toString().padStart(2, '0');
                if (_this.isOccupied("".concat(year, "-").concat(month, "-").concat(day)))
                    occupiedDays++;
            }
            return Math.round((occupiedDays / days) * 100);
        };
        this._name = name;
        this._bookings = bookings;
        this._rate = rate;
        this._discount = discount;
    }
    Room.totalOccupancyPercetage = function (rooms, startDate, endDate) {
        var percentage = 0;
        rooms.forEach(function (room) {
            percentage += room.occupancyPercetage(startDate, endDate);
        });
        return Math.round(percentage / rooms.length);
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        var roomArray = [];
        rooms.forEach(function (room) {
            if (room.occupancyPercetage(startDate, endDate) === 0)
                roomArray.push(room);
        });
        return roomArray;
    };
    return Room;
}());
var Booking = /** @class */ (function () {
    function Booking(_a) {
        var name = _a.name, email = _a.email, checkin = _a.checkin, checkout = _a.checkout, discount = _a.discount, room = _a.room;
        var _this = this;
        this.getFee = function () {
            var start = Date.parse(_this._checkin);
            var end = Date.parse(_this._checkout);
            var nights = (end - start) / 86400000;
            var roomPrice = (_this._room._rate * nights) - ((_this._room._rate * nights) * _this._room._discount / 100);
            return Math.round(roomPrice - (roomPrice * (_this._discount / 100)));
        };
        this._name = name;
        this._email = email;
        this._checkin = checkin;
        this._checkout = checkout;
        this._discount = discount;
        this._room = room;
    }
    return Booking;
}());
module.exports = { Room: Room, Booking: Booking };
