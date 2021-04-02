export default {

    BASE_API_URL: '/R1',

    USER: {
        BASE_URL: '/users',
        REGISTER: '/Register',
        LOGIN: '/login',
        FORGOTPASSWORD: '/forgotPassword',
        VERIFYTOKEN: '/verifyToken',
        DELETEACCOUNT: '/delete/account/:userId',
        CONTACTUS: '/contactUs',
        FEEDBACK: '/Feedback',
        UPDATE_USER_PROFILE: '/update-user-profile/:userId',
        PAYMENTDATA: '/payment-details',
        USERPROFILE: '/view-user-profile'
    },

    ORDER: {
        BASE_URL: '/Orders',
        MAKE_ORDER: '/Make-Orders',
        VIEW_ORDER: '/view-orders',
        VIEW_ORDER_BY_ID: '/getOrderById/:OrderId'
    },

    ADMIN: {
        BASE_URL: '/admin',
        VIEWUSER: '/viewuser',
        DELETE_USER: '/deleteuser/:userId',
        UPDATE_USER: '/editUser/:userId',
        VIEW_CONTACTUS: '/view/contactUs',
        DELETE_CONTACTUS: '/delete/contactUs/:userId',
        UPDATE_ORDER_STATUS: '/Accept-Reject/Order',
        ALLORDERS: '/view/all-orders',
        VIEW_DELETE_FEEDBACK: '/view-delete/feedback'
    },

    AREA: {
        BASE_URL: '/area',
        ADD_AREA: '/add-area',
        VIEW_AREA: '/view-area',
        DELETE_AREA: '/delete-area/:areaId',
        UPDATE_AREA: '/edit-area/:areaId'
    },

    CATEGORY: {
        BASE_URL: '/category',
        ADD_CATEGORY: '/addcategory',
        VIEW_CATEGORY: '/viewcategory',
        UPDATE_CATEGORY: '/editcategory/:categoryId',
        DELETE_CATEGORY: '/deletecategory/:categoryId'
    },

    PACKAGE: {
        BASE_URL: '/package',
        ADD_PACKAGE: '/add/package',
        VIEW_PACKAGE: '/view/package',
        DELETE_PACKAGE: '/delete/package/:packageId',
        UPDATE_PACKAGE: '/edit/package/:packageId'
    }

}