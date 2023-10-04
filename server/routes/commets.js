
const router = require('express').Router();
const CommentModel =require('../models/Comments');

router.post('/', async (req, res) => {
    try {
      const newComment = new CommentModel(req.body);
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Failed to create comment' });
    }
  });



router.get('/post/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await CommentModel.find({ postId });
      
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch comments' });
    }
  });


// Update a comment
router.put('/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { desc } = req.body;
    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      { desc },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update the comment' });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId === req.body.userId) {
      await comment.deleteOne();
      res.status(200).json('The comment has been deleted');
    } else {
      res.status(403).json('You can delete only your comment');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete the comment' });
  }
});

// Like/dislike a comment
router.put('/:id/like', async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (!comment.likes.includes(req.body.userId)) {
      await CommentModel.updateOne({ _id: req.params.id }, { $push: { likes: req.body.userId } });
      res.status(200).json('The comment has been liked');
    } else {
      await CommentModel.updateOne({ _id: req.params.id }, { $pull: { likes: req.body.userId } });
      res.status(200).json('The comment has been disliked');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to like/dislike the comment' });
  }
});







module.exports = router;
