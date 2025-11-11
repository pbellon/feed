import { type Metadata } from "next/types";

import { getWebsite } from "./api";

type Props = {
  params: Promise<{ websiteId: number }>;
};

type MetadataGenerator = (props: Props) => Promise<Metadata>;

export function metadataGenerator(subtitle: string): MetadataGenerator {
  return async function generator(props: Props) {
    const { websiteId } = await props.params;
    const website = await getWebsite(websiteId);

    return {
      title: `Console | ${website.domain} | ${subtitle}`,
    };
  };
}
