var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var User        = require('./user');

var schema = new Schema({
    name:           { type: String, required: true },
    description:    { type: String, required: true },
    milestones:     { type: String, required: true },
    technologies:   { type: String, required:true },

    create_dt: { type: Date, required: true, default: Date.now},
    update_dt: { type: Date, required: true, default: Date.now},

    owner: { type: Schema.ObjectId, ref: User }
});

module.exports = mongoose.model('Project', schema);