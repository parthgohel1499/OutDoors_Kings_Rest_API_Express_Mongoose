import express from 'express'
const Router = express.Router();

import userRoutes from '../routes/Users/userRoute';
import OrderRoutes from '../routes/Users/OrderRoutes';
import adminRoute from '../routes/Admin/adminRoute';
import areaRoute from '../routes/Admin/areaRoute';
import categoryRoute from '../routes/Admin/categoryRoute';
import packageRoute from '../routes/Admin/packageRoute';

Router.use('/users', userRoutes);
Router.use('/Orders', OrderRoutes);
Router.use('/admin', adminRoute);
Router.use('/area', areaRoute);
Router.use('/category', categoryRoute);
Router.use('/package', packageRoute);

export { Router }