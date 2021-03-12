import { check, body, qury } from 'express-validator';

exports.categoryValidator = (method) => {
    switch (method) {
        case 'categoryValidation': {
            return [
                body('categoryName')
                    .not().isEmpty().withMessage('Category Name is Must require !'),
                body('hordingsize')
                    .not().isEmpty().withMessage('Hording Size Is Must Required !')
            ]
        }
    }
}