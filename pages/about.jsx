import Layout from "../components/Layout";

export default function AboutPage() {
    return (
        <>
            <section>
                <h2>Our mission</h2>
                <p>
                    To educate as many people how to be financially literate and achieve financial
                    independence.
                </p>
            </section>
            <section>
                <h2></h2>
            </section>
            <section></section>
        </>
    );
}

AboutPage.getLayout = (page) => <Layout>{page}</Layout>;
