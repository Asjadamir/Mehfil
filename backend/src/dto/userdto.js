export class userDTO {
    constructor(user) {
        this.userId = user._id;
        this.name = user.name || "";
        this.username = user.username || "";
        this.email = user.email;
        this.avatar = user.avatar || "";
        this.description = user.description || "";
        this.isVerified = user.isVerified;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
