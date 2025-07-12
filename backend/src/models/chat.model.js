import { Schema } from "mongoose";

const chatSchema = new Schema(
    {
        isGroup: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: "",
            maxlength: 50,
        },
        description: {
            type: String,
            default: "",
            maxlength: 120,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
