import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { urlFor, PortableText } from "../../lib/sanity";

import Author from "../Author/Author";

import styles from "./PostPreview.module.scss";

import { PostContext } from "../../context/post/PostContext";

export default function PostPreview({ post }) {
    const { handleClickCategory } = useContext(PostContext) || "";

    const publishedDate = moment(post.publishedAt).format("MMMM Do, YYYY");

    const portableText = <PortableText blocks={post.excerpt} />;
    const excerpt = portableText.props.blocks[0].children[0].text;

    return (
        <article className={styles.post} key={post._id}>
            <Link href={`/posts/${post.slug.current}`}>
                <a>
                    <div className={styles.imageContainer}>
                        <Image
                            className={styles.image}
                            src={urlFor(post.mainImage).url()}
                            alt={post.mainImage.alt}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </a>
            </Link>
            <div className={styles.content}>
                <div>
                    <p className={styles.date}>{publishedDate}</p>
                </div>
                <div>
                    <Link href={`/posts/${post.slug.current}`}>
                        <a>
                            <h4 className={styles.title}>{post.title}</h4>
                        </a>
                    </Link>
                </div>
                <div className={styles.excerpt}>
                    <p>{excerpt.substring(0, 275)}...</p>
                </div>
                <div>
                    {post.authors.map((author) => (
                        <Author
                            key={author.author._id}
                            id={author.author._id}
                            name={author.author.name}
                            image={author.author.image}
                        />
                    ))}
                </div>
                <div>
                    {post.categories.map((category, index) => (
                        <span key={index} onClick={handleClickCategory} className={styles.category}>
                            {category.title}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

// Estimated reading time --> https://www.sanity.io/schemas/word-count-and-reading-time-estimation-for-groq-and-portable-text-7470eab7
