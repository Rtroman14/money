import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import PostPreview from "../PostPreview/PostPreview";

import "./RecommendedPosts.scss";

export default function RecommendedPosts({ categories, currentTitle }) {
    const {
        posts: { nodes },
    } = useStaticQuery(getPosts);

    // shuffle posts
    nodes.sort(func);
    function func() {
        return 0.5 - Math.random();
    }

    const similarPosts = nodes
        .filter(node => node.categories[0].title === categories[0].title)
        .filter(node => node.title !== currentTitle)
        .filter((node, i) => i < 2)
        .map(node => <PostPreview key={node._id} post={node} />);

    const randomPost = nodes
        .filter(node => node.categories[0].title !== categories[0].title)
        .filter((node, i) => i < 1)
        .map(node => <PostPreview key={node._id} post={node} />);

    const recommendPosts = [...similarPosts, ...randomPost];

    return (
        <div>
            <h1 style={{ textAlign: "center", padding: "1.5em 0 1em" }}>You may also like</h1>
            <div className="recommended">{recommendPosts}</div>
        </div>
    );
}

const getPosts = graphql`
    query GetPosts($category: String) {
        posts: allSanityPost(filter: { categories: { elemMatch: { title: { eq: $category } } } }) {
            nodes {
                mainImage {
                    asset {
                        fluid {
                            src
                        }
                    }
                }
                title
                _id
                slug {
                    current
                }
                categories {
                    title
                }
                _createdAt(formatString: "MMMM DD, YYYY")
                authors {
                    author {
                        name
                        image {
                            asset {
                                fixed(height: 35, width: 35) {
                                    src
                                }
                            }
                        }
                    }
                }
                _rawExcerpt
            }
        }
    }
`;
