const { Thought, User } = require('../models');

// Thought controller
const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get thought by ID
    getThoughtById(req, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create a thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true, runValidators: true }
                ).then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res.status(404).json({ message: 'No User found with that ID' })
                    }
                })
                res.json(dbThoughtData)
            })
            .catch(err => {
                res.status(500).json(err)
            });
    },

    // update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // add friend 
    addReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reaction: params.thoughtId } },
            { new: true }
        ).then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                res.json(dbThoughtData);
            }
        })
            .catch(err => res.json(err));
    },

    // delete friend
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionID: params.thoughtId } } },
            { new: true }
        ).then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                res.json(dbUserData);
            }
        })
            .catch(err => res.json(err));
    }



};

module.exports = thoughtController;