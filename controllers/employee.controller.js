const db = require('../config/database.config');

// Hiển thị danh sách nhân viên
const findAll = async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT * FROM EmployeeExample');
        res.render('index', { employees: rows }); // Render view index.ejs với danh sách nhân viên
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving employees"
        });
    }
};

// Hiển thị form thêm nhân viên
const showAddForm = (req, res) => {
    res.render('add'); // Render view add.ejs
};

// Thêm nhân viên
const create = async (req, res) => {
    try {
        const { Name, Age, Position } = req.body;
        const [result] = await db.pool.query(
            'INSERT INTO EmployeeExample (Name, Age, Position) VALUES (?, ?, ?)',
            [Name, Age, Position]
        );
        res.redirect('/'); // Sau khi thêm thành công, chuyển hướng về danh sách nhân viên
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the employee"
        });
    }
};

// Hiển thị thông tin một nhân viên để chỉnh sửa
const findOne = async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT * FROM EmployeeExample WHERE Employee_id = ?', [req.params.employeeId]);
        if (rows.length) {
            res.render('edit', { employee: rows[0] }); // Render view edit.ejs với thông tin nhân viên
        } else {
            res.status(404).send({
                message: `Employee not found with id ${req.params.employeeId}`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving employee with id " + req.params.employeeId
        });
    }
};

// Cập nhật thông tin nhân viên
const update = async (req, res) => {
    try {
        const { Name, Age, Position } = req.body;
        const [result] = await db.pool.query(
            'UPDATE EmployeeExample SET Name = ?, Age = ?, Position = ? WHERE Employee_id = ?',
            [Name, Age, Position, req.params.employeeId]
        );
        if (result.affectedRows > 0) {
            res.redirect('/'); // Sau khi cập nhật thành công, chuyển hướng về danh sách nhân viên
        } else {
            res.status(404).send({
                message: `Cannot update employee with id ${req.params.employeeId}. Maybe employee was not found or req.body is empty!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error updating employee with id " + req.params.employeeId
        });
    }
};

// Xóa nhân viên
const del = async (req, res) => {
    try {
        const [result] = await db.pool.query('DELETE FROM EmployeeExample WHERE Employee_id = ?', [req.params.employeeId]);
        if (result.affectedRows > 0) {
            res.redirect('/'); // Sau khi xóa thành công, chuyển hướng về danh sách nhân viên
        } else {
            res.status(404).send({
                message: `Cannot delete employee with id ${req.params.employeeId}. Maybe employee was not found!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Could not delete employee with id " + req.params.employeeId
        });
    }
};

module.exports = { create, findAll, findOne, update, del, showAddForm };
