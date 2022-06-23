const mysql = require("mysql");
// Let's create a pool of connections to the database
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "node",
    connectionLimit: 10,
});

let db = {};
// get all bookings
db.all = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                let sql = "SELECT * FROM bookings";
                connection.query(sql, (err, rows) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }
        });
    });
};
// get a booking by id
db.find = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                let sql = "SELECT * FROM bookings WHERE id = ?";
                connection.query(sql, [id], (err, rows) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows[0]);
                    }
                });
            }
        });
    });
};
// create a booking
db.create = (booking) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                let sql = "INSERT INTO bookings SET ?";
                connection.query(sql, booking, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
};
// update a booking
db.update = (booking) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                let sql = "UPDATE bookings SET ? WHERE id = ?";
                connection.query(sql, [booking, booking.id], (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
};
// delete a booking
db.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                let sql = "DELETE FROM bookings WHERE id = ?";
                connection.query(sql, [id], (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
};

module.exports = db;
