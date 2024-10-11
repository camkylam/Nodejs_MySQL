const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

// Định nghĩa các route
router.get('/', employeeController.findAll); // Hiển thị danh sách nhân viên
router.get('/employee/add', employeeController.showAddForm); // Hiển thị form thêm nhân viên
router.post('/employee', employeeController.create); // Thêm nhân viên
router.get('/employee/:employeeId', employeeController.findOne); // Hiển thị thông tin một nhân viên
router.post('/employee/edit/:employeeId', employeeController.update); // Cập nhật thông tin nhân viên
router.post('/employee/delete/:employeeId', employeeController.del); // Xóa nhân viên

module.exports = router;
