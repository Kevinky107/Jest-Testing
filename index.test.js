const {Room, Booking} = require('./index');

const exampleRoom1 = new Room({
    name: 'Suite K-107', 
    bookings: [], 
    rate: 40000, 
    discount: 50
})

const r1Booking1 = new Booking({
    name: 'Kevin', 
    email: 'kevinagudomontil@gmail.com', 
    checkin: '2024-06-08', 
    checkout: '2024-06-09', 
    discount: 10, 
    room: exampleRoom1
})
exampleRoom1.addBooking(r1Booking1)
const r1Booking2 = new Booking({
    name: 'Aitana', 
    email: 'aitana@gmail.com', 
    checkin: '2024-06-05', 
    checkout: '2024-06-06', 
    discount: 0, 
    room: exampleRoom1
})
exampleRoom1.addBooking(r1Booking2)
const r1Booking3 = new Booking({
    name: 'Pablo', 
    email: 'pablo@gmail.com', 
    checkin: '2024-06-10', 
    checkout: '2024-06-12', 
    discount: 20, 
    room: exampleRoom1
})
exampleRoom1.addBooking(r1Booking3)

const exampleRoom2 = new Room({
    name: 'Double Y-107', 
    bookings: [], 
    rate: 20000, 
    discount: 20
})

const r2Booking1 = new Booking({
    name: 'Kevin', 
    email: 'kevinagudomontil@gmail.com', 
    checkin: '2024-06-07', 
    checkout: '2024-06-10', 
    discount: 10, 
    room: exampleRoom2
})
exampleRoom2.addBooking(r2Booking1)
const r2Booking2 = new Booking({
    name: 'Aitana', 
    email: 'aitana@gmail.com', 
    checkin: '2024-06-05', 
    checkout: '2024-06-06', 
    discount: 0, 
    room: exampleRoom2
})
exampleRoom2.addBooking(r2Booking2)
const r2Booking3 = new Booking({
    name: 'Pablo', 
    email: 'pablo@gmail.com', 
    checkin: '2024-06-10', 
    checkout: '2024-06-13', 
    discount: 20, 
    room: exampleRoom2
})
exampleRoom2.addBooking(r2Booking3)


test('should check that room 1 is occupied on the date 2024-06-08', () => {
    const room = {...exampleRoom1}
    expect(room.isOccupied('2024-06-08')).toBe(true);
})

test('should check that room 1 is occupied on the date 2024-06-12', () => {
    const room = {...exampleRoom1}
    expect(room.isOccupied('2024-06-08')).toBe(true);
})

test('should check that room 1 is not occupied on the date 2024-06-07', () => {
    const room = {...exampleRoom1}
    expect(room.isOccupied('2024-06-07')).toBe(false);
});

test('should check that room 1 is not occupied on the date 2024-06-12', () => {
    const room = {...exampleRoom1}
    expect(room.isOccupied('2024-06-12')).toBe(false);
})

test('should return that room 1 has 50% of occupancy between 2024-06-04 and 2024-06-08', () => {
    const room = {...exampleRoom1}
    expect(room.isOccupied('2024-06-04','2024-06-08')).toBe(50);
})

test('should return that room 1 has 0% of occupancy between 2024-06-13 and 2024-06-20', () => {
    const room = {...exampleRoom1}
    expect(room.isOccupied('2024-06-04','2024-06-08')).toBe(50);
})

test('should return that room 1 has 100% of occupancy between 2024-06-10 and 2024-06-11', () => {
    const room = {...exampleRoom1}
    expect(room.isOccupied('2024-06-10','2024-06-11')).toBe(50);
})

test('should return that with both rooms the occupancy is 0% between 2024-06-13 and 2024-06-20', () => {
    const rooms = [{...exampleRoom1}, {...exampleRoom2}]
    expect(Room.totalOccupancyPercetage(rooms, '2024-06-13','2024-06-20')).toBe(0);
})

test('should return that with both rooms the occupancy is 0% between 2024-06-13 and 2024-06-20', () => {
    const rooms = [{...exampleRoom1}, {...exampleRoom2}]
    expect(Room.totalOccupancyPercetage(rooms, '2024-06-13','2024-06-20')).toBe(0);
})

test('should return that with both rooms the occupancy is 100% between 2024-06-10 and 2024-06-11', () => {
    const rooms = [{...exampleRoom1}, {...exampleRoom2}]
    expect(Room.totalOccupancyPercetage(rooms, '2024-06-10','2024-06-11')).toBe(100);
})

test('should return that with both rooms the occupancy is 50% between 2024-06-05 and 2024-06-06', () => {
    const rooms = [{...exampleRoom1}, {...exampleRoom2}]
    expect(Room.totalOccupancyPercetage(rooms, '2024-06-05','2024-06-06')).toBe(50);
})

test('should return both rooms between 2024-06-13 and 2024-06-20', () => {
    const rooms = [{...exampleRoom1}, {...exampleRoom2}]
    expect(Room.availableRooms(rooms, '2024-06-13','2024-06-20')).toEqual([{...exampleRoom1}, {...exampleRoom2}]);
})

test('should return and empty array between 2024-06-10 and 2024-06-11', () => {
    const rooms = [{...exampleRoom1}, {...exampleRoom2}]
    expect(Room.availableRooms(rooms, '2024-06-10','2024-06-11')).toEqual([{...exampleRoom1}, {...exampleRoom2}]);
})

test('should return an array with only exampleRoom1 between 2024-06-12 and 2024-06-14', () => {
    const rooms = [{...exampleRoom1}, {...exampleRoom2}]
    expect(Room.availableRooms(rooms, '2024-06-12','2024-06-14')).toEqual([{...exampleRoom1}]);
})

test('should return 18000 as total fee for the r1Booking1', () => {
    const booking = {...r1Booking1}
    expect(booking.getFee()).toBe(18000);
})

test('should return 20000 as total fee for the r1Booking2', () => {
    const booking = {...r1Booking2}
    expect(booking.getFee()).toBe(20000);
})

test('should return 32000 as total fee for the r1Booking3', () => {
    const booking = {...r1Booking3}
    expect(booking.getFee()).toBe(32000);
})