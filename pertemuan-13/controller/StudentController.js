import Student from "../models/Student.js";

let StudentController = {};

StudentController.index = async (req, res) => {
    try {
        const students = await Student.findAll();
        const data = {
            message: "Show All Data Students",
            data: students,
        };
        res.json(data);
    } catch (error) {
        const data = {
            message: "Error",
        };
        console.error("Error get Data User: " + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

StudentController.store = async (req, res) => {
    try {
        const { nama, nim, email, jurusan } = req.body;

        if (!nama || !nim || !email || !jurusan) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newStudent = await Student.create({
            nama: nama,
            nim: nim,
            email: email,
            jurusan: jurusan,
        });

        let data = {
            message: "Student Created Successfully",
            data: newStudent,
        };
        res.status(201).json(data);
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

StudentController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, nim, email, jurusan } = req.body;

        if (!nama && !nim && !email && !jurusan) {
            return res
                .status(400)
                .json({ error: "At least one field is required for update" });
        }

        const studentToUpdate = await Student.findByPk(id);

        if (!studentToUpdate) {
            return res.status(404).json({ error: "Student not found" });
        }

        const fieldsToUpdate = {
            nama: nama || studentToUpdate.nama,
            nim: nim || studentToUpdate.nim,
            email: email || studentToUpdate.email,
            jurusan: jurusan || studentToUpdate.jurusan,
        };

        let data = {
            message: "Student Updated Successfully",
            data: fieldsToUpdate,
        };

        await studentToUpdate.update(fieldsToUpdate);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

StudentController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const studentToDelete = await Student.findByPk(id);

        if (!studentToDelete) {
            return res.status(404).json({ error: "Student not found" });
        }

        let data = {
            message: "Student deleted Successfully",
        };

        await studentToDelete.destroy();

        res.status(200).json(data);
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

StudentController.specific = async (req, res) => {
    try {
        const { field, value } = req.query;
        if (!field || !value) {
            return res.status(400).json({ message: "Both 'field' and 'value' parameters are required in the query." });
        }

        const students = await Student.findAll({
            where: {
                [field]: value.toString(),
            },
        });

        if (students.length > 0) {
            const data = {
                message: `Getting students with ${field} ${value}`,
                data: students,
            };
            return res.json(data);
        } else {
            return res.status(404).json({ message: "Students not found" });
        }
    } catch (error) {
        console.error("Error getting specific students:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default StudentController;
