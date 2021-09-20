import Image from "next/image";
import moment from "moment";
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaTwitter } from "react-icons/fa";
import { Fab, Tooltip, Divider } from "@material-ui/core";

import { Chip, Stack } from "@mui/material";

import { sanityClient, urlFor, PortableText } from "../../lib/sanity";

import RecommendedPosts from "../../components/RecommendedPosts/RecommendedPosts";
import Author from "../../components/Author/Author";
import Layout from "../../components/Layout";
import Subscribe from "../../components/Subscribe/Subscribe";

import styles from "./post.module.scss";

import HelperApi from "../../utils/helpers/Helpers";
const Helper = new HelperApi();

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    authors[]{author->},
    categories[]->{title},
    body,
}`;

const otherPostsQuery = `*[_type == "post" && slug.current != $slug] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    authors[]{author->},
    categories[]->{title},
    body,
}`;

export default function Post({ data: { post, otherPosts } }) {
    const postCategories = Helper.postCategories(post.categories);

    const displayCategories = (
        <Stack direction="row" spacing={1}>
            {post.categories.map((category, index) => (
                <Chip key={index} label={category.title} variant="outlined" />
            ))}
        </Stack>
    );

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
        <div style={{ marginTop: "100px" }}>
            <div className={styles.heading}>
                <div>{displayCategories}</div>

                <h1 className={styles.title}>{post.title}</h1>

                <PortableText blocks={post.excerpt} />

                <p>Bulleted TLDR ???</p>

                <div className={styles.author}>
                    <div style={{ padding: "2em 0" }}>
                        {post.authors.map((author) => (
                            <>
                                <Author
                                    key={author.author._id}
                                    name={author.author.name}
                                    image={author.author.image}
                                />
                            </>
                        ))}
                    </div>
                </div>
                <div className={styles.date}>{publishedDate} - 5 min</div>
            </div>

            <div className={styles.imageContainer}>
                <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.mainImage.alt}
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>

            <div className={styles.body}>
                <PortableText blocks={post.body} />
            </div>

            <div className={styles.social}>
                <ul>
                    {socialIcons.map((icon) => (
                        <li key={icon.icon}>
                            <Tooltip
                                title={`Share on ${icon.icon}`}
                                aria-label={icon.icon}
                                placement="left"
                                arrow>
                                <Fab
                                    size="small"
                                    style={{ backgroundColor: "white" }}
                                    onClick={() => handleClick(icon.icon)}>
                                    {icon.component}
                                </Fab>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </div>

            <Divider />

            <RecommendedPosts categories={postCategories} posts={otherPosts} />

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Subscribe />
            </div>
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
    const otherPosts = await sanityClient.fetch(otherPostsQuery, { slug });

    return { props: { data: { post, otherPosts }, preview: true } };
}
