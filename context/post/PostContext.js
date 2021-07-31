import React, { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider(props) {
    // Tabs
    const [index, setIndex] = useState(0);
    const handleChangeIndex = (event, newIndex) => {
        setIndex(newIndex);
        handleChangePosts(newIndex);
    };

    // Posts
    const categories = ["All", "Budgeting", "Investing", "Passive Income"];
    const [posts, setPosts] = useState({
        category: categories[index],
        All: 8,
        Budgeting: 8,
        Investing: 8,
        "Passive Income": 8,
    });
    const handleChangePosts = index => {
        setPosts({
            ...posts,
            category: categories[index],
        });
    };
    const handleClickCategory = event => {
        setPosts({
            ...posts,
            category: event.target.textContent,
        });
        setIndex(categories.indexOf(event.target.textContent));
    };

    // Show More Button
    const handeShowMorePosts = () => {
        setPosts({
            ...posts,
            [categories[index]]: posts[categories[index]] + 4,
        });
    };

    return (
        <PostContext.Provider
            value={{ index, handleChangeIndex, posts, handeShowMorePosts, handleClickCategory }}
        >
            {props.children}
        </PostContext.Provider>
    );
}
