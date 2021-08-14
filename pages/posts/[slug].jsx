import Image from "next/image";
import moment from "moment";

import { sanityClient, urlFor, PortableText } from "../../lib/sanity";

// import RecommendedPosts from "../../components/RecommendedPosts/RecommendedPosts";
import Author from "../../components/Author/Author";
import Layout from "../../components/Layout";

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
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

export default function Post({ data: { post } }) {
    const displayCategories = post.categories.map((category, index) => (
        <div key={index}>{category.title}</div>
    ));

    const publishedDate = moment(post.publishedAt).format("MMMM Do, YYYY");

    return (
        <div style={{ marginTop: "70px" }}>
            <div style={{ position: "relative", height: "75vh" }}>
                <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.mainImage.alt}
                    layout="fill"
                    objectFit="cover"
                    // width={500}
                    // height={500}
                    priority
                />
            </div>
            <div className="post">
                <div className="post__body">
                    <h1 className="post__title">{post.title}</h1>
                    <PortableText blocks={post.body} />
                </div>
                <aside className="post__meta">
                    <div className="post__meta-date">{publishedDate}</div>
                    <div className="post__meta-author">
                        <h4>Author</h4>
                        <div style={{ padding: "1em 0 2em" }}>
                            {/* <Author authors={authors} dimensions="55px" /> */}
                            {post.authors.map((author) => (
                                <Author
                                    key={author.author._id}
                                    name={author.author.name}
                                    image={author.author.image}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="post__meta-categories">
                        <h4>Categories</h4>
                        {displayCategories}
                    </div>
                </aside>
            </div>
            {/* <RecommendedPosts categories={post.categories} currentTitle={post.title} /> */}
        </div>
    );
}

Post.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "post" && defined(slug.current)]{
        "params": {
          "slug": slug.current
        }
      }`
    );

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const post = await sanityClient.fetch(postQuery, { slug });
    return { props: { data: { post }, preview: true } };
}
