const Item = require("../models/item");
const Department = require("../models/department");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items, department counts (in parallel)
  const [numItems, numDepartments, ,] = await Promise.all([
    Item.countDocuments({}).exec(),
    Department.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Supermarket Inventory Home",
    item_count: numItems,
    department_count: numDepartments,
  });
});

// Display list of all Items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name department price")
    .sort({ name: 1 })
    .populate("department")
    .exec();

  res.render("item_list", { title: "Item List", item_list: allItems });
});

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("department").exec();

  if (item === null) {
    // No results.
    const err = new Error("Item copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: "Item:",
    item: item,
  });
});

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allDepartments = await Department.find({}, "name").exec();

  res.render("item_form", {
    title: "Create Item",
    departments: allDepartments,
  });
});

// Handle Item create on POST.
exports.item_create_post = [
  // Validate and sanitize fields.
  body("name", "name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description").trim().escape(),
  body("department", "Department must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stockCount", "Stock count must be numeric").trim().isNumeric().escape(),

  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      department: req.body.department,
      price: req.body.price,
      stockCount: req.body.stockCount,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all departments for form.
      const allDepartments = await Department.find({}, "name").exec();

      res.render("item_form", {
        title: "Create Item",
        departments: allDepartments,
        item: item,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save item.
      await item.save();
      res.redirect(item.url);
    }
  }),
];

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("department").exec();

  if (item === null) {
    // No results.
    res.redirect("/catalog/items");
  }

  res.render("item_delete", {
    title: "Item:",
    item: item,
  });
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("department").exec();
  if (item === null) {
    // No results.
    res.redirect("/catalog/items");
  }

  await Item.findByIdAndRemove(req.body.itemid);
  res.redirect("/catalog/items");
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle Item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
});
