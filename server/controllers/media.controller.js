import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middleware/token.middleware.js";

const getList = async (req, res) => {
    
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;

        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });
        
        res.status(200).send(response);
        
    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
}

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const response = await tmdbApi.mediaGenres({ mediaType });
        res.status(200).send(response);
    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
}


const search = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const { query, page } = req.query;

        const response = await tmdbApi.mediaSearch({ query, page, mediaType });
        res.status(200).send(response);
    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
}

const getDetail = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;

        const media = await tmdbApi.mediaDetail({ mediaType, mediaId });
        
        const credits = await tmdbApi.mediaCredits({ mediaType, mediaId });
        media.credits = credits;

        const videos = await tmdbApi.mediaVideos({ mediaType, mediaId });
        media.videos = videos;

        const recommend = await tmdbApi.mediaRecommend({ mediaType, mediaId });
        media.recommend = recommend.results;

        const images = await tmdbApi.mediaImages({ mediaType, mediaId });
        media.images = images;

        const tokenDecoded = tokenMiddleware.tokenDecode(req);
        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data);

            if (user) {
                const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
                media.isFavorite = isFavorite !== null;
            }
        }

        media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");
        res.status(200).send(media);

    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
};

export default { getList, getGenres, search, getDetail };

