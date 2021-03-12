
import { check, body, qury } from 'express-validator';


exports.authValidator = (method) => {
    console.log("email", method)
    switch (method) {
        case 'registration': {
            return [
                body('username')
                    .exists().withMessage('username is required')
                    .contains()
                    .not().isEmpty().withMessage('Username must be required !'),
                body('email')
                    .exists().withMessage('Email is required')
                    .not().isEmpty().withMessage('Please enter email.')
                    .isEmail().withMessage('Email is must be required !.'),
                body('dob')
                    .exists()
                    .withMessage('DOB must be required')
                    .not().isEmpty().withMessage('Enter birthdate '),
                body('mobile')
                    .exists()
                    .isLength({ min: 10, max: 10 })
                    .withMessage('mobile number must be contain 10 numbers')
                    .not().isEmpty().withMessage('Please enter your contact.'),
                body('gender')
                    .exists()
                    .withMessage('gender is required')
                    .not().isEmpty().withMessage('gender is required !'),
                body('password')
                    .exists()
                    .withMessage('Password must be required')
                    .isLength({ min: 6 })
                    .not().isEmpty().withMessage('Please enter password.'),
            ];
        }
    }
}
