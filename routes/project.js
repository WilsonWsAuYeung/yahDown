var express = require('express');
var router  = express.Router();

var Project = require('../models/project');

/**
 * GET route to retrieve all Projects
 */
router.get('/', function (req, res, next) {
    Project.find()
        .populate('user')
        .exec(function (err, projects) {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to find projects',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                projects: projects
            });
        });
});

/**
 * POST Route to creste new projects
 */
router.post('/', function(req, res, next) {
    Project.create(req.body, function(err, project) {
        if (err) {
            return res.status(500).json({
                message: "Failed to save project",
                err: err
            });
        }

        res.status(201).json({
            message: 'Successfully saved project',
            project: project
        });
    });
});

/**
 * PATCH Route to update a project
 */
router.patch('/:id', function (req, res, next) {

    Project.findById(req.params.id, function(err, project) {

        if (err) {
            return res.status(500).json({
                message: 'Project could not be found',
                error: err
            });
        }

        project.update(req.body, function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to update Project',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Successfully Updated Project',
                project: project
            });
        })
    });
});

/**
 * DELETE Route to remove Project
 */
router.delete('/:id', function(req, res, next) {

    Project.findById(req.params.id, function(err, projectFound) {
        if (err) {
            return res.status(500).json({
                'title': 'Failed'
            });
        }

        if (! projectFound) {
            return res.status(500).json({
                message: 'Project could not be found',
                error: {message: 'No Project'}
            });
        }

        projectFound.remove(function (err, result) {
           if (err) {
               return res.status(500).json({
                   message: 'Failed to delete message',
                   err: err
               })
           }

           res.status(200).json({
               message: "Successfully Delete Message",
               result: result
           });
        });
    });
});

module.exports = router;