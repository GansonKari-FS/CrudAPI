const express = require("express");
const router = express.Router();

//restful endpoints f
// get, post, patch, delete

const getStudent = async (req, res, next) => {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: "Cannot find student" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.student = student;
  next();
};

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE STUDENT
router.get("/:id", getStudent, async (req, res) => {
  res.json(res.student);
});

//post create
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    class: req.body.class,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//patch update
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.class != null) {
    res.student.class = req.body.class;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete
router.delete("/:id", getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: "Deleted Student" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
