module.exports = class HelperApi {
    postCategories = (categories) => categories.map((item) => item.title);

    relatedPosts = (posts, categories) =>
        posts.filter((post) => {
            const postCategories = this.postCategories(post.categories);
            const relatedCategory = categories.some((r) => postCategories.indexOf(r) >= 0);

            if (relatedCategory) {
                return post;
            }
        });

    nonRelatedPosts = (posts, categories) =>
        posts.filter((post) => {
            const postCategories = post.categories.map((item) => item.title);
            const relatedCategory = categories.some((r) => postCategories.indexOf(r) >= 0);

            if (!relatedCategory) {
                return post;
            }
        });

    shuffle = () => 0.5 - Math.random();
};
