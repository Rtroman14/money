import React from "react";

import PostPreview from "../PostPreview/PostPreview";

// import "./RecommendedPosts.scss";

export default function RecommendedPosts({ categories, posts }) {
    console.log("categories", categories);
    console.log("posts", posts);
    // // shuffle posts
    // nodes.sort(func);
    // function func() {
    //     return 0.5 - Math.random();
    // }

    // const recommendPosts = [...similarPosts, ...randomPost];

    return (
        <div>
            <h1 style={{ textAlign: "center", padding: "1.5em 0 1em" }}>You may also like</h1>
            {/* <div className="recommended">{recommendPosts}</div> */}
        </div>
    );
}
