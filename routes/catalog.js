const express = require("express");
const router = express.Router();

// Require controller modules.
const department_controller = require("../controllers/departmentController");
const item_controller = require("../controllers/itemController");

/// ITEM ROUTES ///

// GET catalog home page.
router.get("/", item_controller.index);

// GET request for creating a Item. NOTE This must come before routes that display Item (uses id).
router.get("/item/create", item_controller.item_create_get);

// POST request for creating Item.
router.get("/item/create", item_controller.item_create_post);

// GET request to delete Item.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete Item.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update Item.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update Item.
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one Item.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all Item items.
router.get("/items", item_controller.item_list);

/// DEPARTMENT ROUTES ///

// GET request for creating Department. NOTE This must come before route for id (i.e. display author).
router.get("/department/create", department_controller.department_create_get);

// POST request for creating Department.
router.post("/department/create", department_controller.department_create_post);

// GET request to delete Department.
router.get(
  "/department/:id/delete",
  department_controller.department_delete_get
);

// POST request to delete Department.
router.post(
  "/department/:id/delete",
  department_controller.department_delete_post
);

// GET request to update Department.
router.get(
  "/department/:id/update",
  department_controller.department_update_get
);

// POST request to update Department.
router.post(
  "/department/:id/update",
  department_controller.department_update_post
);

// GET request for one Department.
router.get("/department/:id", department_controller.department_detail);

// GET request for list of all Department.
router.get("/departments", department_controller.department_list);

module.exports = router;
