/**
 GET /event -> Get events list
 GET /event/id -> Get an event with id

 POST /event -> Creqate new event

 PUT /event/id -> Update and event with whole event object
 PATCH /event/id -> Update and event with single modification

 DELETE /event/id -> Delete an event by id
 DELETE /event -> Delete all events
*/

'use strict';

/**
 * Load express libraries
 */
const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

/**
 * Import event model
 */
const eventSchema = require('../models/event.model');

const Event = mongoose.model('Event', eventSchema);

/**
 * Retrieve all events
 *
 * @param req
 * @param res
 */
const getAllEvents = (req, res) => {
    // Recuperar eventos.
    Event.find()
        .then(events => {
            if (events.length > 0) {
                res.status(200).json({result: 'ok', code: 200, data: events});
            } else {
                res.status(204).json();
            }
        })
        .catch(err => res.status(500).json({result: 'error', code: 500, data: {}}));
};

/**
 * Retrieve one event by id
 *
 * @param req
 * @param res
 */
const getEventById = (req, res) => {
    const id = req.params.id;

    if (id) {
        Event.findById(id)
            .then(event => {
                if (event !== null) {
                    res.status(200).json({result: 'ok', code: 200, data: event});
                } else {
                    res.status(204).json();
                }
            })
            .catch(err => res.status(500).json({result: 'error', code: 500, data: {}}));
    } else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

/**
 * Retrieve one event by title
 *
 * @param req
 * @param res
 */
const getEventByTitle = (req, res) => {
    const title = req.params.title;
    if (title) {
        Event.find({title: title})
            .then(event => {
                if (event !== null) {
                    res.status(200).json({result: 'ok', code: 200, data: event});
                } else {
                    res.status(204).json();
                }
            })
            .catch(err => res.status(500).json({result: 'error', code: 500, data: {}}));
    } else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

/**
 * Crete new event
 *
 * @param req
 * @param res
 */
const postEvent = (req, res) => {
    if (req.body) {
        // Creamos un evento con el esquema que hemos hecho para poder guardarlo en la BD.
        let event = new Event(req.body);

        event.save()
            .then(event => {
                res.status(201).json({result: 'ok', code: 201, data: req.body});
            })
            .catch(error => {
                res.status(500).json({result: 'error', code: 500, data: {msg: error}});
            });
    }
    else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

/**
 * Update event with id
 *
 * @param req
 * @param res
 */
const updateEvent = (req, res) => {
    const id = req.params.id;

    if (id) {
        Event.findByIdAndUpdate(id, req.body, {new:true}) //el new:true hace que me devuelva el nuevo.
            .then(event => {
                if (event !== null) {
                    res.status(200).json({result: 'ok', code: 200, data: event});
                } else {
                    res.status(204).json();
                }
            })
            .catch(err => res.status(500).json({result: 'error', code: 500, data: {}}));
    } else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

/**
 * Delete event by id
 *
 * @param req
 * @param res
 */
const deleteEvent = (req, res) => {
    const id = req.params.id;

    if (id) {
        Event.findByIdAndRemove(id, req.body)
            .then(event => {
                if (event !== null) {
                    res.status(200).json({result: 'ok', code: 200, data: event});
                } else {
                    res.status(204).json();
                }
            })
            .catch(err => res.status(500).json({result: 'error', code: 500, data: {}}));
    } else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.get('/title/:title', getEventByTitle);
router.post('/', postEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
