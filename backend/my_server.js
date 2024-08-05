var express = require("express");
var cors = require("cors");
var mysql = require("mysql");
var form_access = require("formidable");

var app = express();

app.use(cors());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ahmet",
  database: "to_do_app",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database - ", err);
  } else {
    console.log("Connected to database!");
  }
});

function insert_data_to_db(data) {
  var insert_query = "INSERT INTO to_do_info VALUES (?,?,?)";
  var query_data = data;

  connection.query(insert_query, query_data, (err, result) => {
    if (err) {
      console.log("Error writing to table ", err);
    } else {
      console.log("Content written to the table", result);
    }
  });
}

function get_data(res) {
  var select_query = "SELECT *  FROM to_do_info";

  connection.query(select_query, (err, result) => {
    if (err) {
      console.log("Error writing to table ", err);
    } else {
      console.log("Content written to the table", result);
      res.send(result);
    }
  });
}

app.get("/", cors(), function (req, res) {
  res.send("Hello world!");
});

app.get("/get_data", cors(), function (req, res) {
  get_data(res);
});

app.post("/save_data", cors(), function (req, res) {
  var my_form = new form_access.IncomingForm();
  my_form.parse(req, function (err, field, file) {
    if (field.to_do_name != null) {
      var to_do_name = field.to_do_name;
      var to_do_description = field.to_do_description;
      var to_do_status = field.to_do_status;
      var my_db_array = [to_do_name, to_do_description, to_do_status];
      insert_data_to_db(my_db_array);
    }
    res.send("Data inserted!");
  });
});

app.use(express.json());

app.post("/update_to_do_status", cors(), (req, res) => {
  const to_do_name = req.body.to_do_name;
  const to_do_description = req.body.to_do_description;

  const query =
    "UPDATE to_do_info SET to_do_status = 1 WHERE to_do_name = ? AND to_do_description = ?";
  connection.query(query, [to_do_name, to_do_description], (err, result) => {
    if (err) {
      console.error("Error updating to_do_status: ", err);
      res.status(500).send("Error updating to_do_status");
      return;
    }
    console.log("ToDo status updated successfully");
    res.status(200).send("ToDo status updated successfully");
  });
});

app.get("*", cors(), function (req, res) {
  res.send("You have used an incorrect URL, please check!");
});

app.listen(8082);
