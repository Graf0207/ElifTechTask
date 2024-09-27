import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";


const app = express()

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Oleg0207#",
    database: "eliftechtestdb"
})

// Підключення до бази даних
db.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

app.get("/events", (req, res) => {
    const q = "SELECT * FROM events";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get("/attendees", (req, res) => {
    const q = "SELECT * FROM attendees";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});



// Створення маршруту для отримання даних з форми
app.post("/register", (req, res) => {
    const { full_name, email, date_of_birth, source, event_id } = req.body;

    const q = "INSERT INTO attendees (full_name, email, date_of_birth, source, event_id) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [full_name, email, date_of_birth, source, event_id], (err, result) => {
        if (err) {
            console.error(err); // Виводить помилку в консоль сервера
            return res.status(500).json({ error: 'Error inserting data' });
        }
        return res.status(200).json({ message: 'Data inserted successfully', result });
    });
});



app.listen(8800, () => console.log("Listening on port 8800"));
