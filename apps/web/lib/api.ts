import type {
  FeedEventsReply,
  FeedEventsQuerystring,
  Website,
} from "@feed/types";
import { cache } from "react";
import { constructSearchParams } from "./searchParams";

const baseUrl = process.env.API_BASE_URL ?? "http://localhost:8080";

function url(path: string): string {
  return `${baseUrl}${path}`;
}

export const getWebsites = cache(async (): Promise<Website[]> => {
  const req = await fetch(url("/websites"));
  return (await req.json()) as Website[];
});

export const getWebsite = cache(async (websiteId: number): Promise<Website> => {
  "use cache";
  const req = await fetch(url(`/websites/${websiteId}`));
  return (await req.json()) as Website;
});

export async function getEvents(
  websiteId: number | string,
  query: FeedEventsQuerystring
): Promise<FeedEventsReply> {
  const searchQuery = constructSearchParams({
    page: query.page?.toString(),
    pageSize: query.pageSize?.toString(),
    type: query.type,
    status: query.status,
  });

  let fullUrl = url(`/websites/${websiteId}/events`);
  if (searchQuery) {
    fullUrl += `?${searchQuery}`;
  }

  const req = await fetch(fullUrl);
  const data = (await req.json()) as FeedEventsReply;
  return data;
}
