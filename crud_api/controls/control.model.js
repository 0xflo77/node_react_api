const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        family: { type: DataTypes.STRING, allowNull: false },
        tech: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        mapping: { type: DataTypes.STRING, allowNull: false }
    };

    
    return sequelize.define('Control', attributes);
}