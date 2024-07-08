
module.exports = (sequelize, DataTypes) => {
    const employees = sequelize.define('employees', {
        // Define the attributes as per the existing table columns

        first_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        department: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        salary: {
            type: DataTypes.TEXT,
            allowNull: false
        }

        // Add other columns as needed
    }, {
        // This is the name of the table in the database
        tableName: 'employees',
        // Disable automatic timestamps (createdAt, updatedAt)
        timestamps: false
    });
    employees.sync()
    return employees;
};
