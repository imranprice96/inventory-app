const Department = require("../models/department");
const asyncHandler = require("express-async-handler");

// Display list of Departments
exports.department_list = asyncHandler(async (req, res, next) => {
  const allDepartments = await Department.find().sort({ name: 1 }).exec();

  res.render("department_list", {
    title: "Department List",
    department_list: allDepartments,
  });
});

exports.department_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Department detail: ${req.params.id}`);
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
