import { faker } from "@faker-js/faker";
import * as mysql from "mysql";

// TRUNCATE city;
// TRUNCATE hotels;
// TRUNCATE reservations;
// TRUNCATE reviews;
// TRUNCATE rooms;
// TRUNCATE room_type;
// TRUNCATE users;
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "hotel",
})
let min = 1;
let max = 100;
conn.connect(err => {
    for (let i = 0; i < max; i++) {
        if (err) throw err;
        let name = faker.internet.userName();
        let email = faker.internet.email();
        let password = faker.internet.password();
        let phone_number = faker.phone.number("#########");
        let description = faker.lorem.sentences();
        conn.query(`insert into users(name,email,password,phone_number,description) values('${name}','${email}','${password}',${phone_number},'${description}')`, err => { if (err) throw err; });


    }
    for (let i = 0; i < max; i++) {

        if (err) throw err;
        let name = mysql.escape(faker.address.cityName())
        let post_code = faker.address.zipCode();
        conn.query(`insert into city(name,post_code) values(${name},'${post_code}')`, err => { if (err) throw err; });


    }
    for (let i = 0; i < max; i++) {

        if (err) throw err;
        let name = faker.lorem.word();
        let city_id = Math.floor(Math.random() * (max - min + 1)) + min;
        let stars = Math.floor(Math.random() * 6);
        let has_pool = Math.round(Math.random());
        let has_gym = Math.round(Math.random());


        conn.query(`insert into hotels(name,city_id,stars,has_pool,has_gym) values('${name}',${city_id},${stars},${has_pool},${has_gym})`, err => { if (err) throw err; });


    }
    for (let i = 0; i < max; i++) {

        if (err) throw err;
        let name = faker.lorem.word();
        let total_occupancy = faker.random.numeric();
        let total_bedrooms = faker.random.numeric();
        let total_bathrooms = faker.random.numeric();
        let has_tv = Math.round(Math.random())
        let has_kitchen = Math.round(Math.random())
        let has_air_conditioning = Math.round(Math.random())
        let has_heating = Math.round(Math.random())
        let has_internet = Math.round(Math.random())

        conn.query(`insert into room_type(name,total_ocupancy,total_bedrooms,total_bathrooms,has_tv,has_kitchen,has_air_conditioning,has_heating,has_internet) values('${name}',${total_occupancy},${total_bedrooms},${total_bathrooms},${has_tv},${has_kitchen},${has_air_conditioning},${has_heating},${has_internet})`, err => { if (err) throw err; });


    }
    let prices: number[] = [];
    for (let i = 0; i < max; i++) {

        if (err) throw err;
        let room_type_id = Math.floor(Math.random() * (max - min + 1)) + min;
        let price = Number((Math.random() * 100).toFixed(4))
        prices.push(price)
        let room_number = faker.random.alphaNumeric(2)
        let hotel_id = Math.floor(Math.random() * (max - min + 1)) + min;
        conn.query(`insert into rooms(room_type_id,price,room_number,hotel_id) values(${room_type_id},${price},'${room_number}',${hotel_id})`, err => { if (err) throw err; });


    }


    for (let i = 0; i < max; i++) {

        if (err) throw err;
        let user_id = Math.floor(Math.random() * (max - min + 1)) + min;
        let room_id = Math.floor(Math.random() * (max - min + 1)) + min;
        let start_date = faker.date.recent(10)
        let end_date = faker.date.soon(10)
        let time=((new Date(end_date.getTime() - start_date.getTime())).getDate())
        let total = (prices[room_id-1]) * time;
        conn.query(`insert into reservations(user_id,room_id,start_date,end_date,total) values(${user_id},${room_id},'${start_date.toISOString().substring(0, 10)}','${end_date.toISOString().substring(0, 10)}',${total})`, err => { if (err) throw err; });


    }
    for (let i = 0; i < max; i++) {

        if (err) throw err;
        let reservation_id = Math.floor(Math.random() * (max - min + 1)) + min;
        let rating = Math.floor(Math.random() * 11);
        let comment = faker.lorem.paragraph();
        conn.query(`insert into reviews(reservation_id,rating,comment) values(${reservation_id},${rating},'${comment}')`, err => { if (err) throw err; });

    }

})
console.log("hello world");