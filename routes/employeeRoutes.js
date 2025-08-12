// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/employeeControllers");
// const cache = require('../middleware/cache');
// router.get('/', cache('employees', 30), employeeController.getAllEmployees);

// router.get("/", controller.getAllEmployees);
// router.get("/:id", controller.getEmployeeById);
// router.post("/", controller.createEmployee);
// router.put("/:id", controller.updateEmployee);
// router.delete("/:id", controller.deleteEmployee);

// module.exports = router;

// backend/routes/employees.js
// backend/routes/employees.js
// import express from 'express';
// import { getAll, getOne, create, update, remove } from '../controllers/employeeController.js';
// import auth from '../middleware/auth.js';
// import cacheMiddleware from '../middleware/cache.js';

// const router = express.Router();
// const cache = cacheMiddleware('cache:employees:all', 60); // 60s TTL
// // Public read of all employees uses cache
// router.get('/', cache, getAll);
// router.get('/:id', getOne);

// // Protected create/update/delete
// router.post('/', auth, create);
// router.put('/:id', auth, update);
// router.delete('/:id', auth, remove);

// export default router;

// backend/routes/employeeRoutes.js
// backend/routes/employeeRoutes.js
// backend/routes/employeeRoutes.js
import express from "express";
import Employee from "../models/Employee.js";
import { ensureAuth } from "../middleware/auth.js";

const router = express.Router();

// All routes here require authentication
router.use(ensureAuth);

// CREATE employee
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
