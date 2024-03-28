import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model("Review", mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rate: {
        type: Number,
        validate() {
            return this.rate || this.content
          }
    },
    content: {
        type: String,
        validate() {
            return this.rate || this.content
          }
    },
    mediaType: {
        type: String,
        enum: ["tv", "movie"],
        required: true
    },
    mediaId: {
        type: String,
        required: true
    },
    mediaTitle: {
        type: String,
        required: true
    },
    mediaPoster: {
        type: String,
        required: true
    }
}, modelOptions))