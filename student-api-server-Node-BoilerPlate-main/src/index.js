const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const studentArray = require("./InitialData");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// your code goes here

let currentId = studentArray[studentArray.length - 1].id;

//Home page
app.get("/", (req, res) => {
  res.status(200).json({ massage: "Hello" });
});

//Get all data
app.get("/api/student", (req, res) => {
  res.status(200).send(studentArray);
});

//Get by id
app.get("/api/student/:id", (req, res) => {
  let index = studentArray.findIndex((e) => e.id == req.params.id);
  if (index >= 0) res.status(200).send(studentArray[index]);
  else res.status(404).json({ massage: "Id not found" });
});

//post
app.post("/api/student", (req, res) => {
  currentId = currentId + 1;
  if (req.body.name && req.body.currentClass && req.body.division) {
    let newStudent = {
      id: currentId,
      name: req.body.name,
      currentClass: req.body.currentClass,
      division: req.body.division,
    };
    studentArray.push(newStudent);
    res.status(200).json({
      massage: "New student added",
      id : newStudent.id,
    });
  } else res.status(400).json({ massage: "All fields not set" });
});

//update/put
app.put("/api/student/:id", (req, res) => {
  let index = studentArray.findIndex((e) => e.id == req.params.id);
  let student = studentArray[index];
  if (index >= 0) {
    if (req.body.name || req.body.currentClass || req.body.division) {
      if (req.body.name) {
        student.name = req.body.name;
        res.status(200).json({
          massage: "Student name updated",
          updated_student: student,
        });
      } else if (req.body.currentClass) {
        student.currentClass = req.body.currentClass;
        res.status(200).json({
          massage: "Student currentClass updated",
          updated_student: student,
        });
      } else if (req.body.division) {
        student.division = req.body.division;
        res.status(200).json({
          massage: "Student division updated",
          updated_student: student,
        });
      }
    } else res.status(400).json({massage:"Invalid update field"})
  } else res.status(404).json({ massage: "Id not found" });
});

//delete
app.delete("/api/student/:id", (req, res) => {
  let index = studentArray.findIndex((e) => e.id == req.params.id);
  if (index >= 0) {
    studentArray.splice(index, 1);
    res.json({ massage: "Student data deleted" });
  } else res.status(400).json({ massage: "Id not found" });
});

//other cases
app.get("*", (req, res) => {
  res.status(404).json({ massage: "Not Found" });
});
app.post("*", (req, res) => {
  res.status(404).json({ massage: "Not Found" });
});
app.put("*", (req, res) => {
  res.status(404).json({ massage: "Not Found" });
});
app.delete("*", (req, res) => {
  res.status(404).json({ massage: "Not Found" });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
