// import module Patient
const patient = require("../models/patient.model");
// import module StatusPatient
const StatusPatient = require("../models/statusPatient.model");
// import module validation
const { validationResult } = require("express-validator");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const e = require("express");


// buat class PatientController
class PatientController {
    async index(req, res) {
        let filter = {}
        if(req.query.name != undefined && req.query.name != "")  {
            filter.where = {
                name: {
                    [Op.like]: `%${req.query.name}%`
                }
            }
        }
        if(req.query.address != undefined && req.query.address != "") {
            filter.where = {
                '$status_patient.address$': {
                    [Op.like]: `%${req.query.address}%`
                }
            }
        }
        if (req.query.status && req.query.status !== "") {
            filter.where = {
                [Op.and]: [
                    filter.where,
                    {
                        '$status_patient.status$': {
                            [Op.like]: `%${req.query.status}%`,
                        },
                    },
                ],
            };
        }

        let order = ["id","asc"]
        
        if(req.query.sort != undefined) {
            if(req.query.sort == "address" || req.query.sort == "in_date_at" || req.query.sort == "out_date_at"){
                order[0] = "status_patient"
                order[1] = req.query.sort
            }
        }

        if(req.query.order != undefined) {
            if (req.query.order == "asc" || req.query.order == "desc"){
                order[order.length - 1] = req.query.order
            }
        }

        filter.order = [order]

        filter.include = {
            model: StatusPatient,
            attributes: ["address","status","in_date_at","out_date_at"]
        }
        const patient_all = await patient.findAll(filter);

        if (patient_all.length > 0) {
            const data = {
                "Message": "Get All Resource",
                "data": patient_all,
            };
            res.status(200).json(data);
        } else {
            const data = {
                "Message": "Data is Empty",
            };
            res.status(404).json(data);
        };
    };

    async show(req, res) {
        const { id } = req.params;

        const patient_find = await patient.findByPk(id);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const data = {
                "Message": errors,
            };
            res.status(404).json(data);
        } else {
            const data = {
                "Message": "Get Detail Resource",
                "data": patient_find
            };
            res.status(200).json(data);
        };
    };


    async store(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const data = {
                "Message": errors,
            };
            res.status(422).json(data);
        } else {
            const statusPatient_Create = await StatusPatient.create({
                address: req.body.address,
                status: req.body.status,
                in_date_at: req.body.in_date_at,
                out_date_at: req.body.out_date_at
            })
            const patient_create = await patient.create({
                name: req.body.name,
                phone: req.body.phone,
                statusId: statusPatient_Create.id
            });

            const data = {
                "Message": "Resource is added successfully!",
                "data": req.body
            };
            res.status(201).json(data);
        };
    };

    async update(req, res) {
        const { id } = req.params;

        const {
            name,
            phone,
            address,
            status,
            in_date_at,
            out_date_at
        } = req.body

        const errors = validationResult(req);

        // mencari data sebelumnya
        const patients = await patient.findByPk(id);
        // const status_patients = await StatusPatient.findByPk(patients.id);

        // Jika data tidak ada
        if (!patients) {
            const data = {
                Message: "Resource Not Found"
            };
            return res.status(404).json(data);
        } else if (!errors.isEmpty()) {
            const data = {
                "Message": errors,
            };
            res.status(422).json(data);
        } else {
            // Jika data ada
            const updatedPatient = {};
            const updatedStatusPatient = {};
            if (name) {
                updatedPatient.name = name;
            } else {
                updatedPatient.name = patients.name;
            };

            if (phone) {
                updatedPatient.phone = phone;
            } else {
                updatedPatient.phone = patients.phone;
            };

            if (address) {
                updatedStatusPatient.address = address;
            } else {
                updatedStatusPatient.address = patients.address;
            };

            if (status) {
                updatedStatusPatient.status = status;
            } else {
                updatedStatusPatient.status = patients.status;
            };

            if (in_date_at) {
                updatedStatusPatient.in_date_at = in_date_at;
            } else {
                updatedStatusPatient.in_date_at = patients.in_date_at;
            };

            if (out_date_at) {
                updatedStatusPatient.out_date_at = out_date_at;
            } else {
                updatedStatusPatient.out_date_at = patients.out_date_at;
            };

            await patient.update(updatedPatient, {
                where: {
                    id: id
                }
            });

            await StatusPatient.update(updatedStatusPatient, {
                where: {
                    id: patients.id
                }
            });

            const data = {
                "Message": "Resource is update successfully!",
                "data": updatedPatient
            };
            res.status(200).json(data);
        };
    };

    async destroy(req, res) {
        const { id } = req.params;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const data = {
                "Message": errors,
            };
            res.status(404).json(data);
        } else {
            let patients = await patient.findByPk(id);
            await patient.destroy({
                where: {
                    id: id
                }
            });
            await StatusPatient.destroy({
                where: {
                    id: patients.statusId
                }
            });
            const data = {
                Message: "Resource is delete successfully"
            };
            res.status(200).json(data);
        };
    };

    async search(req, res) {
        const { name } = req.params;

        const patient_find = await patient.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: `%${name}%`
                }
            }
        });

        if (!patient_find) {
            const data = {
                Message: "Resource not found",
            };
            res.status(404).json(data);
        } else {
            const data = {
                Message: "Get searched resource",
                data: patient_find
            };
            res.status(200).json(data);
        };
    };

    async positive(req, res) {
        const patient_positive = await patient.findAll({
            where: {
                status: "positive"
            }
        });

        if (patient_positive.length == 0) {
            const data = {
                Message: "Resource not found",
            };
            res.status(404).json(data);
        } else {
            const data = {
                Message: "Get positive resource",
                total: patient_positive.length,
                data: patient_positive
            };
            res.status(200).json(data);
        };
    };

    async recovered(req, res) {
        const patient_recovered = await patient.findAll({
            where: {
                status: "recovered"
            }
        });

        if (patient_recovered.length == 0) {
            const data = {
                Message: "Resource not found",
            };
            res.status(404).json(data);
        } else {
            const data = {
                Message: "Get recovered resource",
                total: patient_recovered.length,
                data: patient_recovered
            };
            res.status(200).json(data);
        };
    };

    async dead(req, res) {
        const patient_dead = await patient.findAll({
            where: {
                status: "dead"
            }
        });

        if (patient_dead.length == 0) {
            const data = {
                Message: "Resource not found",
            };
            res.status(404).json(data);
        } else {
            const data = {
                Message: "Get dead resource",
                total: patient_dead.length,
                data: patient_dead
            };
            res.status(200).json(data);
        };
    };
};

// buat object
const object = new PatientController();

// export PatientController
module.exports = object;