const Department = require("../models/department");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

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
  res.render("department_form", { title: "Create Department" });
});

// Handle Department create on POST.
exports.department_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("description").trim().escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Department object with escaped and trimmed data
    const department = new Department({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("department_form", {
        title: "Create Department",
        despartment: department,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save department.
      await department.save();
      // Redirect to new department record.
      res.redirect(department.url);
    }
  }),
];

// Display Department delete form on GET.
exports.department_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of department and all their items (in parallel)
  const [department, allItemsInDepartment] = await Promise.all([
    Department.findById(req.params.id).exec(),
    Item.find({ department: req.params.id }, "name description").exec(),
  ]);

  if (department === null) {
    // No results.
    res.redirect("/catalog/departments");
  }

  res.render("department_delete", {
    title: "Delete Department",
    department: department,
    department_items: allItemsInDepartment,
  });
});

// Handle Department delete on POST.
exports.department_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of department and all their items (in parallel)
  const [department, allItemsInDepartment] = await Promise.all([
    Department.findById(req.params.id).exec(),
    Item.find({ department: req.params.id }, "name description").exec(),
  ]);

  if (allItemsInDepartment.length > 0) {
    // Department has items. Render in same way as for GET route.
    res.render("department_delete", {
      title: "Delete Department",
      department: department,
      department_items: allItemsInDepartment,
    });
    return;
  } else {
    // Department has no items. Delete object and redirect to the list of departments.
    await Department.findByIdAndRemove(req.body.departmentid);
    res.redirect("/catalog/departments");
  }
});

// Display Department update form on GET.
exports.department_update_get = asyncHandler(async (req, res, next) => {
  const department = await Department.findById(req.params.id).exec();
  console.log("-------- " + department);
  if (department === null) {
    // No results.
    const err = new Error("Department not found");
    err.status = 404;
    return next(err);
  }

  res.render("department_form", {
    title: "Update Department",
    department: department,
  });
});

// Handle Department update on POST.
exports.department_update_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("description").trim().escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Department object with escaped and trimmed data (and the old id!)
    const department = new Department({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });
    console.log("********* " + department);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("department_form", {
        title: "Update Department",
        department: department,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      await Department.findByIdAndUpdate(req.params.id, department);
      res.redirect(department.url);
    }
  }),
];
