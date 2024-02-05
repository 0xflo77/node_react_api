const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Control.findAll();
}

async function getById(id) {
    return await getControl(id);
}

async function create(params) {
    // validate
    if (await db.Control.findOne({ where: { name: params.name } })) {
        throw 'Name "' + params.name + '" already exists';
    }

    const control = new db.Control(params);
    
    
    // save Control
    await control.save();
}

async function update(id, params) {
    const control = await getControl(id);

    // validate
    const nameChanged = params.name && control.name !== params.name;
    if (nameChanged && await db.Control.findOne({ where: { name: params.name } })) {
        throw 'Name "' + params.control + '" already exists';
    }

    // copy params to Control and save
    Object.assign(control, params);
    await control.save();
}

async function _delete(id) {
    const control = await getControl(id);
    await control.destroy();
}

// helper functions

async function getControl(id) {
    const control = await db.Control.findByPk(id);
    if (!control) throw 'Control not found';
    return control;
}
