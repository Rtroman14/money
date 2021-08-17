import React from "react";

import HelperApi from "../../utils/helpers/Helpers";
const Helper = new HelperApi();

import PostPreview from "../PostPreview/PostPreview";

import styles from "./RecommendedPosts.module.scss";

export default function RecommendedPosts({ categories, posts }) {
    const relatedPosts = Helper.relatedPosts(posts, categories);
    const nonRelatedPosts = Helper.nonRelatedPosts(posts, categories);

    // shuffle posts
    relatedPosts.sort(Helper.shuffle);
    nonRelatedPosts.sort(Helper.shuffle);

    const recommendPosts = [...relatedPosts.slice(0, 2), ...nonRelatedPosts.slice(0, 1)];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>You may also like</h1>
            <div className={styles.recommended}>
                {recommendPosts.map((post) => (
                    <PostPreview key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}
