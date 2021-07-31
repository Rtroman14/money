import React, { useContext } from "react";

import PostPreview from "../PostPreview/PostPreview";
import { PostContext } from "../../context/post/PostContext";

import styles from "./PostPreviewCollection.module.scss";

export default function PostPreviewCollection({ postCollection }) {
    const { posts } = useContext(PostContext);

    const filteredPosts = postCollection
        .filter((post) =>
            posts.category === "All"
                ? post.categories[0].title !== posts.category
                : post.categories[0].title === posts.category
        )
        .filter((post, i) => i < posts[posts.category])
        .map((post) => <PostPreview post={post} />);

    return (
        <div>
            <div className={styles.collection}>{filteredPosts}</div>
        </div>
    );
}
