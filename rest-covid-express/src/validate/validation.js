// import module check
const { check } = require("express-validator");
const Patient = require("../models/patient.model");
const User = require("../models/user");

// buat validasi
const requestValidation = [
    check('name')
        .if(check('name')).not().isEmpty().withMessage('Name is Required')
        .if(check('name')).matches(/^[a-zA-Z ]+$/).withMessage('Name must be an alphabet'),
    check('phone')
        .if(check('phone')).not().isEmpty().withMessage('Phone Number is required')
        .if(check('phone')).isMobilePhone().withMessage('Phone must be a phone number'),
    check('address', 'Addres is Required').not().isEmpty(),
    check('status')
        .if(check('status')).isIn(['positive', 'recovered', 'dead']).withMessage('Status must be positive, recovered, or dead')
        .if(check('status')).not().isEmpty().withMessage('Status is Required'),
    check('in_date_at')
        .if(check('in_date_at')).not().isEmpty().withMessage('In Date is Required')
        .if(check('in_date_at')).isDate().withMessage('In Date must be a date with YYYYMMDD format'),
    check('out_date_at', 'Out Date must be a date with YYYYMMDD format').isDate().optional()
];

const requestId = [
    check('id')
        .isNumeric()
        .withMessage('ID harus berupa angka')
        .custom(async (value) => {
            const patient = await Patient.findByPk(value);
            if (!patient) {
                return Promise.reject('Resource not found');
            }
        })
];

const requestUpdate = [
    check('name', 'Name must be an alphabet').optional().matches(/^[a-zA-Z ]+$/),
    check('phone', 'Phone must be a phone number').optional().isMobilePhone(),
    check('address').optional(),
    check('status')
        .if(check('status')).isIn(['positive', 'recovered', 'dead']).withMessage('Status must be positive, recovered, or dead')
        .if(check('status')).optional(),
    check('in_date_at')
        .if(check('in_date_at')).isDate().withMessage('In Date must be a date with YYYYMMDD format')
        .if(check('in_date_at')).optional(),
    check('out_date_at')
        .if(check('out_date_at')).isDate().withMessage('Out Date must be a date with YYYYMMDD format')
        .if(check('out_date_at')).optional(),
];

const requestLogin = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email format').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
];

const requestRegister = [
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'Username must be an alphabet').matches(/^[a-zA-Z ]+$/),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email format').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
];

// export module
module.exports = [
    requestValidation,
    requestId,
    requestUpdate,
    requestRegister,
    requestLogin
];