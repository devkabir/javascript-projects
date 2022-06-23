const express = require("express");
const db = require("./db");
const router = express.Router();
// get all bookings
router.get("/", async (req, res) => {
    db.all()
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.status(500).json(err.sqlMessage);
        });
});
// get a booking by id
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    db.find(id)
        .then((row) => {
            res.json(row);
        })
        .catch((err) => {
            res.status(500).json(err.sqlMessage);
        });
});
// create a booking
router.post("/", async (req, res) => {
    let booking = req.body;
    if (!booking.name || !booking.check_in || !booking.check_out || !booking.nid) {
        res.status(400).json("Missing required fields");
    }
    db.create(booking)
        .then((result) => {
            if (result.affectedRows === 1) {
                booking.id = result.insertId;
                res.status(201).json(booking);
            } else {
                res.status(500).json("Error creating booking");
            }
        })
        .catch((err) => {
            res.status(500).json(err.sqlMessage);
        });
});

// update a booking
router.put("/", async (req, res) => {
    let booking = req.body;
    if (!booking.name || !booking.check_in || !booking.check_out || !booking.nid || !booking.id) {
        res.status(400).json("Missing required fields");
    }
    db.update(booking)
        .then((result) => {
            if (result.changedRows === 1) {
                res.status(200).json(booking);
            } else {
                res.status(404).json({ message: "Booking not found" });
            }
        })
        .catch((err) => {
            res.status(500).json(err.sqlMessage);
        });
});
// delete a booking
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(400).json("Missing required fields");
    }
    db.delete(id)
        .then((result) => {
            if (result.affectedRows === 1) {
                res.status(200).json({ message: "Booking deleted" });
            } else {
                res.status(404).json({ message: "Booking not found" });
            }
        })
        .catch((err) => {
            res.status(500).json(err.sqlMessage);
        });
});

module.exports = router;
