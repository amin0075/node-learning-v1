import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputsError } from "./modules/middleware";
import {
  createProduct,
  deletedProduct,
  getOnePRoduct,
  getProducts,
  updateProduct,
} from "./handlers/products";
import {
  createUpdate,
  deletedUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/**
 * product
 */
router.get("/product", getProducts);

router.get("/product/:id", getOnePRoduct);
router.post(
  "/product",
  body("name").isString(),
  handleInputsError,
  createProduct
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputsError,
  updateProduct
);
router.delete("/product/:id", deletedProduct);

/**
 * update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.put(
  "/update/:id",
  body("title").exists().isString().optional,
  body("body").exists().isString().optional,
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional,
  body("version").optional,
  updateUpdate
);
router.delete("/update/:id", deletedUpdate);

/**
 * update point
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("productId").exists().isString(),
  () => {}
);
router.put(
  "/updatepoint/:id",
  body("name").exists().isString().optional,
  body("description").exists().isString().optional,
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
