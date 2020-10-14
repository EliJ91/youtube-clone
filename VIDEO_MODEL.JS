

{
    mongoId,
    title:"Test Video",
    description: "A test video.",
    uploadDate: 10/12/2020,
    author: "userMongoId",
    thumbnail: "image url here",
    views: 0,  
    likes,
    dislikes  
    metaData,
    comments: [
        {
            mongoId,
            username,
            comment,
            likes,
            dislikes,
            reply:
            [
                {
                mongoId,
                username,
                comment,
                likes,
                dislikes,
                }
            ]
        }
    ]
}

{
    mongoId,
    username,
    password,
    recentMetaData = [ up to 10],
    subscribers,
    subscribedTo



}