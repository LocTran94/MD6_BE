import { Router } from "express";
import { adminAuth } from "../middleware/admin";
import { auth } from "../middleware/auth";
import adminController from "../controller/AdminController";

export const adminRouter = Router();
adminRouter.use(auth);
adminRouter.get("", adminAuth, adminController.getAllUser);
adminRouter.get("/lock/:id", adminAuth, adminController.lockUser);
adminRouter.delete("/:id", adminAuth, adminController.remove);
adminRouter.get("/checkAsk", adminAuth, adminController.getAskUser);
adminRouter.get("/changeRole/:id", adminAuth, adminController.changeRoleUser);
adminRouter.get("/AddUser", adminAuth, adminController.getAddUser);
adminRouter.get(
  "/changeCategory/:id",
  adminAuth,
  adminController.changeCategoryUser
);
adminRouter.get("/getAddVip", adminAuth, adminController.getAddVip);
adminRouter.get(
  "/changeSellerToVip/:id",
  adminAuth,
  adminController.changeSellerToVip
);
