import express from 'express';
const router = express.Router();
import adminRoute from './AdminRoute'

import roleRoutes from './RoleRoute';
import userRoutes from './UserRoute';




// Define your routes in an array
const defaultRoutes = [
  {
    path: '/admins',
    route: adminRoute,
  },
  {
    path: '/roles',
    route: roleRoutes,
  },
  
  {
    path: '/users',
    route: userRoutes,
  },
  
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
