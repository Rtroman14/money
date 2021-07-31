import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import Divider from "@material-ui/core/Divider";

import { urlFor, PortableText } from "../../lib/sanity";

import Author from "../Author/Author";

import styles from "./PostPreview.module.scss";

import { PostContext } from "../../context/post/PostContext";

export default function PostPreview({ post }) {
    const { handleClickCategory } = useContext(PostContext) || "";

    const categories = post.categories.map((category, index) => (
        <span onClick={handleClickCategory} className={styles.category}>
            {category.title}
        </span>
    ));

    const publishedDate = moment(post.publishedAt).format("MMMM Do, YYYY");

    return (
        <article className={styles.post} key={post._id}>
            <Link href={`/posts/${post.slug.current}`}>
                <a>
                    <div style={{ position: "relative", height: "208px" }}>
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
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        href={`/posts/${post.slug.current}`}>
                        <a>
                            <h4 className={styles.title}>{post.title}</h4>
                        </a>
                    </Link>
                </div>
                <div className={styles.excerpt}>
                    <PortableText blocks={post.excerpt} />
                    {/* <p className="post__excerpt">{excerpt.substring(0, 200)}...</p> */}
                </div>
                {/* <Divider /> */}
                {post.authors.map((author) => (
                    <Author
                        id={author.author._id}
                        name={author.author.name}
                        image={author.author.image}
                    />
                ))}
                {/* <Divider /> */}
                <div>{categories}</div>
            </div>
        </article>
    );
}

// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//     root: {
//         maxWidth: 345,
//     },
//     media: {
//         height: 140,
//     },
// });

// export default function PostPreview({ post }) {
//     const { handleClickCategory } = useContext(PostContext) || "";

//     const excerpt = post._rawExcerpt[0].children[0].text;

//     const categories = post.categories.map(category => (
//         <span onClick={handleClickCategory} className="post__category">
//             {category.title}
//         </span>
//     ));
//     const classes = useStyles();

//     return (
//         <article className="post">
//             <CardActionArea>
//                 <Link
//                     style={{ textDecoration: "none", color: "inherit" }}
//                     to={`/blog/${post.slug.current}`}
//                 >
//                     <Img className="post__image" fluid={post.mainImage.asset.fluid} />
//                 </Link>
//                 <div className="post__content">
//                     <Link
//                         style={{ textDecoration: "none", color: "inherit" }}
//                         to={`/blog/${post.slug.current}`}
//                     >
//                         <div>
//                             <p className="post__date">{post._createdAt}</p>
//                         </div>
//                         <div>
//                             <h4 className="post__title">{post.title}</h4>
//                         </div>
//                         <div>
//                             <p className="post__excerpt">
//                                 <p className="post__excerpt">{excerpt.substring(0, 400)}</p>
//                             </p>
//                         </div>
//                     </Link>
//                     <Author authors={post.authors} dimensions="40px" />
//                     <div>{categories}</div>
//                 </div>
//             </CardActionArea>
//         </article>
//     );
// }
