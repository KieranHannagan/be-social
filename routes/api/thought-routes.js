const router = require('express').Router();
const { del } = require('express/lib/application');
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);


// api/thoughts/:id
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

  router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);


module.exports = router;
