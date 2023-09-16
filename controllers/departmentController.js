const Department = require("../models/department");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

// Display list of Departments
exports.department_list = asyncHandler(async (req, res, next) => {
  const allDepartments = await Department.find().sort({ name: 1 }).exec();

  res.render("department_list", {
    title: "Department List",
    department_list: allDepartments,
  });
});

exports.department_detail = asyncHandler(async (req, res, next) => {
  const [department, itemsInDepartment] = await Promise.all([
    Department.findById(req.params.id).exec(),
    Item.find({ department: req.params.id }, "name description").exec(),
  ]);
  if (department === null) {
    // No results.
    const err = new Error("Department not found");
    err.status = 404;
    return next(err);
  }

  res.render("department_detail", {
    title: "Department Detail",
    department: department,
    department_items: itemsInDepartment,
  });
});

// Display Department create form on GET.
exports.department_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Department create GET");
});

// Handle Department create on POST.
exports.department_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Department create POST");
});

// Display Department delete form on GET.
exports.department_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Department delete GET");
});

// Handle Department delete on POST.
exports.department_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Department delete POST");
});

// Display Department update form on GET.
exports.department_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Department update GET");
});

// Handle Department update on POST.
exports.department_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Department update POST");
});
