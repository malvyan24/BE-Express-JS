// TODO 3: Import data students dari folder data/students.js
const studentsData = require('./students');

class StudentController {
    index(req, res) {
    // TODO 4: Tampilkan data students
    res.json({ message: "Menampilkan semua students", data: studentsData });
    }

    store(req, res) {
    // TODO 5: Tambahkan data students
    const newStudent = req.body.name; // Assuming you get the student name from the request body
    studentsData.push(newStudent);
    res.json({ message: `Menambahkan data student: ${newStudent}`, data: studentsData });
    }

    update(req, res) {
    // TODO 6: Update data students
    const studentId = req.params.id;
    const updatedName = req.body.name; // Assuming you get the updated name from the request body
    studentsData[studentId - 1] = updatedName;
    res.json({ message: `Mengedit student id ${studentId}, nama ${updatedName}`, data: studentsData });
    }

    destroy(req, res) {
    // TODO 7: Hapus data students
    const studentId = req.params.id;
    const deletedStudent = studentsData.splice(studentId - 1, 1)[0];
    res.json({ message: `Menghapus student id ${studentId}`, data: studentsData });
    }
}

const studentObject = new StudentController();

module.exports = studentObject;