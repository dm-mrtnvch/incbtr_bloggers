import {commentsRepository} from "../repositories/comments-repository";

export const commentsService = {
    async getCommentsPost(
        pageSize: number,
        pageNumber: number,
        postId: string
    ): Promise<any> {
        const { items, totalCount } = await commentsRepository.getCommentAll(
            pageSize,
            pageNumber,
            postId
        );

        console.log(totalCount, "totalCount");
        console.log(items, "items");

        let pagesCount = Number(Math.ceil(totalCount / pageSize));
        const result: any = {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: items,
        };
        return result;
    },
    async createComments(
        userId: string,
        userLogin: string,
        postId: string,
        content: string
    ): Promise<any> {
        const commentNew: any = {
            id: Number(new Date()).toString(),
            content: content,
            userId: userId,
            userLogin: userLogin,
            addedAt: new Date().toString(),
            postId: postId,
        };
        const result = await commentsRepository.createComment(commentNew);
        return result;
    },
}
