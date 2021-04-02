import express from 'express'
const Router = express.Router();
import LINK from '../utils/InternalLinks'
import userRoutes from '../routes/Users/userRoute';
import OrderRoutes from '../routes/Users/OrderRoutes';
import adminRoute from '../routes/Admin/adminRoute';
import areaRoute from '../routes/Admin/areaRoute';
import categoryRoute from '../routes/Admin/categoryRoute';
import packageRoute from '../routes/Admin/packageRoute';

const { USER, ORDER, ADMIN, AREA, CATEGORY, PACKAGE } = LINK;

Router.use(USER.BASE_URL, userRoutes);
Router.use(ORDER.BASE_URL, OrderRoutes);
Router.use(ADMIN.BASE_URL, adminRoute);
Router.use(AREA.BASE_URL, areaRoute);
Router.use(CATEGORY.BASE_URL, categoryRoute);
Router.use(PACKAGE.BASE_URL, packageRoute);

export { Router }