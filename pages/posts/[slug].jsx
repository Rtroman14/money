import Image from "next/image";
import moment from "moment";
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaTwitter } from "react-icons/fa";
import { Fab } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

import { sanityClient, urlFor, PortableText } from "../../lib/sanity";

// import RecommendedPosts from "../../components/RecommendedPosts/RecommendedPosts";
import Author from "../../components/Author/Author";
import Layout from "../../components/Layout";

import styles from "./post.module.scss";

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

    const handleClick = (event) => alert(`You click on ${event}`);

    const socialIcons = [
        {
            icon: "Facebook",
            component: <FaFacebookF size="22px" />,
        },
        {
            icon: "Twitter",
            component: <FaTwitter size="22px" />,
        },
        {
            icon: "Pinterest",
            component: <FaPinterestP size="22px" />,
        },
        {
            icon: "Linkedin",
            component: <FaLinkedinIn size="22px" />,
        },
    ];

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
            <div className={styles.post}>
                <div className={styles.body}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <PortableText blocks={post.body} />
                </div>
                <aside>
                    <div className={styles.date}>{publishedDate}</div>
                    <div className={styles.author}>
                        <h4>Author</h4>
                        <div style={{ padding: "1em 0 2em" }}>
                            {post.authors.map((author) => (
                                <Author
                                    key={author.author._id}
                                    name={author.author.name}
                                    image={author.author.image}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.categories}>
                        <h4>Categories</h4>
                        {displayCategories}
                    </div>
                    <div className={styles.social}>
                        <ul>
                            {/* <li>
                                <Tooltip
                                    title="Share on Facebook"
                                    aria-label="Share on Facebook"
                                    placement="left"
                                    arrow>
                                    <Fab size="small" style={{ backgroundColor: "transparent" }}>
                                        <FaFacebookF size="22px" />
                                    </Fab>
                                </Tooltip>
                            </li>
                            <li>
                                <FaTwitter size="22px" />
                            </li>
                            <li>
                                <FaPinterestP size="22px" />
                            </li>
                            <li>
                                <FaLinkedinIn size="22px" />
                            </li> */}
                            {socialIcons.map((icon) => (
                                <li>
                                    <Tooltip
                                        title={`Share on ${icon.icon}`}
                                        aria-label={icon.icon}
                                        placement="left"
                                        arrow>
                                        <Fab
                                            size="small"
                                            style={{ backgroundColor: "transparent" }}
                                            onClick={() => handleClick(icon.icon)}>
                                            {icon.component}
                                        </Fab>
                                    </Tooltip>
                                </li>
                            ))}
                        </ul>
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
