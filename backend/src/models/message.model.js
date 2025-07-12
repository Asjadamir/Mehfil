import { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            maxlength: 500,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        replyToMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
