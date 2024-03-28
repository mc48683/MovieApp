import userModel from "../models/user.model.js";
import reviewModel from "../models/review.model.js";
import favoriteModel from "../models/favorite.model.js";

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({ isAdmin: false });
        res.status(200).send(users);
    } catch {
        return res.status(500).json("Oops!Something went wrong");
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find();
        res.status(200).send(reviews);
    } catch {
        return  res.status(500).json("Oops!Something went wrong");
    }
};

const getUserReviews = async (req, res) => {
    try {
        const userId = req.params.userId;
        const reviews = await reviewModel.find({
            user: userId
        })
        res.status(200).send(reviews);
    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
};

const getDisplayName = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findOne({
            _id: userId
        })
        res.status(200).send(user);
    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
};


const removeUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userModel.findOne({
        _id: userId
      });
      if (!user) return responseHandler.notfound(res);
  
      await user.deleteOne()
      
      await reviewModel.deleteMany({ user: userId });

      await favoriteModel.deleteMany({ user: userId });

      res.status(200).send();
    } catch {
      
      return res.status(500).send("Oops!Something went wrong");
    }
  };

const removeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await reviewModel.findOne({
      _id: reviewId
    });

    if (!review) {
      return responseHandler.notfound(res);
    }

    await review.deleteOne()
    res.status(200).send();
  } catch {
    
    return res.status(500).send("Oops!Something went");
  }
};

export default { getUsers, getReviews, getUserReviews, getDisplayName, removeUser, removeReview };