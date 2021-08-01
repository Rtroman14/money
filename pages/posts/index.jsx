import Layout from "../../components/Layout";
import { sanityClient } from "../../lib/sanity";

const postQuery = `*[_type == "post"] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    authors[]{author->},
    categories[]->,
    body,
}`;

import PostPreviewCollection from "../../components/PostPreviewCollection/PostPreviewCollection";
import Tabs from "../../components/Tabs/Tabs";
import ShowMorePosts from "../../components/ShowMorePosts/ShowMorePosts";
import Subscribe from "../../components/Subscribe/Subscribe";

import { PostProvider } from "../../context/post/PostContext";

export default function BlogPage({ posts }) {
    return (
        <div>
            <section className="section">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <div style={{ width: "500px", margin: "35px 0" }}>
                        <h1>Cash Flows Blog</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                            suscipit sagittis risus, vel convallis purus dictum in. Nulla accumsan
                            id nibh eu auctor. Fusce non condimentum ipsum.
                        </p>
                    </div>
                    <Subscribe />
                </div>
                <PostProvider>
                    <Tabs />
                    <PostPreviewCollection postCollection={posts} />
                    <ShowMorePosts />
                </PostProvider>
                {/* SUBSCRIBE FOR MONTHLY NEWSLETTER WHICH SENDS YOU NEW POSTS YOU MISSED */}
            </section>
        </div>
    );
}

BlogPage.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps(context) {
    const posts = await sanityClient.fetch(postQuery);

    return { props: { posts } };
}

// https://youtu.be/1WmNXEVia8I?t=5612
// https://www.sanity.io/docs/query-cheat-sheet
