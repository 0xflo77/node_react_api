const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const controlService = require('./control.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    controlService.getAll()
        .then(controls => res.json(controls))
        .catch(next);
}

function getById(req, res, next) {
    controlService.getById(req.params.id)
        .then(control => res.json(control))
        .catch(next);
}

function create(req, res, next) {
    controlService.create(req.body)
        .then(() => res.json({ message: 'Control created' }))
        .catch(next);
}

function update(req, res, next) {
    controlService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Control updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    controlService.delete(req.params.id)
        .then(() => res.json({ message: 'Control deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        family: Joi.string().required(),
        tech: Joi.string().required(),
        type: Joi.string().required(),
        mapping: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        description: Joi.string().empty(''),
        family: Joi.string().empty(''),
        tech: Joi.string().empty(''),
        type: Joi.string().empty(''),
        mapping: Joi.string().empty('')
    })
    validateRequest(req, next, schema);
}
