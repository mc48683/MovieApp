import favoriteModel from "../models/favorite.model.js";
import responseHandler from "../handlers/response.handler.js";

const addFavorite = async (req, res) => {

    try {     
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        })

        if (isFavorite) return res.status(200).send(isFavorite);
        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id
        })

        await favorite.save();

        res.status(201).send( favorite );

    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params;

        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id: favoriteId
        })
        
        if (!favorite) return res.status(404).send("Resource not found");
        favorite.deleteOne();
        return res.status(200).send();
    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
};

const getFavoritesOfUser = async (req, res) => {
    try {
        const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");

        return res.status(200).send(favorite);
    } catch {
        responseHandler.ok(res, favorite);
        // return res.status(500).send("Oops!Something went wrong");

    }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };

