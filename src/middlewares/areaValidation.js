import { check, body, query } from 'express-validator';

exports.areaValidator = (method) => {
    switch (method) {
        case 'areaValidation': {
            return [
                body('areaname')
                    .not().isEmpty()
                    .withMessage('This Field Must Require !'),
                body('pincode')
                    .isNumeric()
                    .withMessage('pincode is required (Numeric value) !')
            ]
        }
    }
}