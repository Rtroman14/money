import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { sanityClient, urlFor } from "../lib/sanity";

import Button from "@material-ui/core/Button";
import Typical from "react-typical";

import AreaChart from "../components/AreaChart/AreaChart";
import PostPreview from "../components/PostPreview/PostPreview";
import Blurb from "../components/Blurb/Blurb";

import Investing from "../public/investing.svg";

import Layout from "../components/Layout";

const postQuery = `
    *[_id == "0109f007-67b1-4c0f-8c56-4ce375c4d60b" || 
    _id == "389d5816-2250-401a-a736-89592b6d2e52" ||
    _id == "a72a6c41-4371-4cb9-94b6-10526c8c7cff"
    ] {
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

export default function HomePage({ posts }) {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section
                style={{
                    display: "flex",
                }}>
                <div
                    style={{
                        width: "50%",
                        display: "grid",
                        gap: "25px",
                        justifyContent: "center",
                        height: "min-content",
                        paddingTop: "9em",
                    }}>
                    <h1 style={{ fontSize: "55px", lineHeight: "1" }}>Cash Flows</h1>
                    <p style={{ fontSize: "22px", fontWeight: "300" }}>
                        Work towards financial freedom
                    </p>
                    <div>
                        <Link href="/posts">
                            <Button size="large" className="btn-cta">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
                <div style={{ width: "50%" }}>
                    {/* <Investing style={{ width: "100%", height: "100%" }} /> */}
                </div>
            </section>

            <section>
                <div style={{ display: "grid", justifyContent: "center", paddingBottom: "3em" }}>
                    <span className="lig__line"></span>
                    <div className="lig__number">1</div>
                    <h3 className="lig__word">Learn</h3>
                    <div className="lig__title">
                        Learn{" "}
                        {
                            <Typical
                                className="lig__title-highlight"
                                steps={["Where", 3000, "How", 3000, "Why", 3000]}
                                loop={Infinity}
                                wrapper="h4"
                            />
                        }
                        to grow your money
                    </div>
                </div>
                <div className="lig__row">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                        }}>
                        <div style={{ paddingTop: "2em" }}>
                            <h2 className="title-secondary">
                                Learn From The Best Minds of Our Time
                            </h2>
                            <p style={{ padding: "1em 0 1.5em" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel
                                mi vel dolor consectetur sollicitudin quis a odio. Fusce ornare
                                libero ut condimentum sagittis. Nulla non sagittis neque. Nulla
                                dapibus mauris purus, nec imperdiet felis fermentum consectetur.
                                Morbi sed tincidunt nisi.
                            </p>
                            <Link href="/posts">
                                <Button size="large" className="btn-cta">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="lig__row-grid">
                        {posts.map((post, index) => (
                            <div key={`post-${index}`} className={`lig__row-grid-item-${index}`}>
                                <PostPreview post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div style={{ display: "grid", justifyContent: "center" }}>
                    <span className="lig__line"></span>
                    <div className="lig__number">2</div>
                    <h3 className="lig__word">Invest</h3>
                    <h4 className="lig__title">
                        Make your money <span className="lig__title-highlight">work for you</span>
                    </h4>
                    <div className="lig__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel mi vel
                        dolor consectetur sollicitudin quis a odio. Fusce ornare libero ut
                        condimentum sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                    </div>
                </div>
                <div style={{ padding: "0 8em" }}>
                    <AreaChart title="Investing $500/Month in the Market vs. Savings Account" />
                </div>
                <div className="columns-2 invest__blurbs">
                    <Blurb
                        title="Invest In Yourself"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
                            sapiente delectus natus corrupti ex itaque vel corporis."
                    />
                    <Blurb
                        title="Multiple Income Sources"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
                            sapiente delectus natus corrupti ex itaque vel corporis."
                    />
                    <Blurb
                        title="Think Longterm"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
                            sapiente delectus natus corrupti ex itaque vel corporis."
                    />
                    <Blurb
                        title="Have Discipline"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
                            sapiente delectus natus corrupti ex itaque vel corporis."
                    />
                </div>
            </section>

            <section>
                <div style={{ display: "grid", justifyContent: "center" }}>
                    <span className="lig__line"></span>
                    <div className="lig__number">3</div>
                    <h3 className="lig__word">Earn</h3>
                    <h4 className="lig__title">
                        Achieve <span className="lig__title-highlight">financial freedom</span>
                    </h4>
                    {/* <h4 className="lig__title">Compound your returns for financial freedom</h4> */}
                    {/* <h3 className="lig__word">Grow</h3>
                    <h4 className="lig__title">Compound your returns for financial freedom</h4> */}
                    {/* <h3 className="lig__word">Freedom</h3>
                    <h4 className="lig__title">Liberate yourself from financial burdens</h4> */}
                    <div className="lig__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel mi vel
                        dolor consectetur sollicitudin quis a odio. Fusce ornare libero ut
                        condimentum sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                    </div>
                </div>
            </section>
        </div>
    );
}

HomePage.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps(context) {
    const posts = await sanityClient.fetch(postQuery);

    return { props: { posts } };
}
