// Import Student Controller
const AuthController = require("../src/controllers/AuthController");
const PatientController = require("../src/controllers/patients.controller");
const auth = require("../middleware/auth");

// import module validation
const validate = require("../src/validate/validation");


// import module router dan express
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello Express");
});

router.post("/register",validate[3], AuthController.register);
router.post("/login",validate[4], AuthController.login);

router.get("/patients",auth, PatientController.index);
router.get("/patients/:id",auth, validate[1], PatientController.show);
router.post("/patients",auth, validate[0], PatientController.store);
router.put("/patients/:id",auth, validate[2], PatientController.update);
router.delete("/patients/:id",auth, validate[1], PatientController.destroy);
router.get("/patients/search/:name",auth, PatientController.search);
router.get("/patients/status/positive",auth, PatientController.positive);
router.get("/patients/status/recovered",auth, PatientController.recovered);
router.get("/patients/status/dead",auth, PatientController.dead);

// Export router
module.exports = router;