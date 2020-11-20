const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "pass123!@",
	database: "db",
});

const sqlInsert = "INSERT INTO tbl (id, name) VALUES (?, ?);";
const sqlGet = "SELECT * FROM tbl;";
const sqlDelete = "DELETE FROM tbl WHERE name = ? ;";
const sqlUpdate = "UPDATE tbl SET name = ?  WHERE id = 22;";

// app.get("/", (req, res) => {
// 	db.query(sqlInsert, (err, result) => {
// 		res.send("hello from sqlinser");
// 	});
// });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
	db.query(sqlGet, (err, result) => {
		res.send(result);
	});
});

app.delete("/api/delete/:movieName", (req, res) => {
	const name = req.params.movieName;
	db.query(sqlDelete, name, (err, result) => {
		if (err) console.log(err);
	});
});

app.put("/api/update", (req, res) => {
	const name = req.body.movieName;
	const review = req.body.movieReview;

	db.query(sqlUpdate, [review, name], (err, result) => {
		console.log(err);
	});
});

app.post("/api/insert", (req, res) => {
	const movieName = req.body.movieName;
	const movieReview = req.body.movieReview;

	db.query(sqlInsert, [movieName, movieReview], (err, result) => {
		console.log(err);
	});
});

app.listen(3001, () => {
	console.log("running ivbnvhbn sda");
});
