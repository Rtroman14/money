import {
    createClient,
    createPreviewSubscriptionHook,
    createImageUrlBuilder,
    createPortableTextComponent,
} from "next-sanity";
import Image from "next/image";
import { config } from "./config";

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
    ...config,
    serializers: {
        types: {
            authorReference: ({ node }) => <span>{JSON.stringify(node)}</span>,
            mainImage: ({ node }) => (
                <figure>
                    <Image src={urlFor(node.asset).url()} width={500} height={500} />
                </figure>
            ),
        },
    },
});

// RENDER IMAGES IN PORTABLE TEXT
// https://www.youtube.com/watch?v=fKXGTJ0NA5c
