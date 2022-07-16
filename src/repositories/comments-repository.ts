import {commentsCollection} from "../db/db";
import {ObjectId} from "mongodb";

export const commentsRepository = {
    async getCommentAll(
        pageSize: number,
        pageNumber: number,
        postId: string
    ): Promise<any> {
        const totalCount = await commentsCollection.countDocuments({
            postId: postId,
        });

        const items = await commentsCollection
            .find({ postId: postId }, { projection: { _id: 0, postId: 0 } })
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray();

        return { items: items, totalCount: totalCount };
    },
    async createComment(comment: any): Promise<any> {
        await commentsCollection.insertOne({ ...comment, _id: new ObjectId() });
        //const {postId,...rest}=comment
        return {
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            userLogin: comment.userLogin,
            addedAt: comment.addedAt,
        };
    },
}
