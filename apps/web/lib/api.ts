import type { FeedEventsReply, FeedEventsQuery, Website } from "@feed/types";
import { constructSearchParams } from "./searchParams";
import { convertDateForApi } from "./date";

const baseUrl = process.env.API_BASE_URL ?? "http://localhost:8080";

function url(path: string): string {
  return `${baseUrl}${path}`;
}

export async function getWebsites(): Promise<Website[]> {
  const req = await fetch(url("/websites"));
  return (await req.json()) as Website[];
}

export async function getWebsite(websiteId: number): Promise<Website> {
  const req = await fetch(url(`/websites/${websiteId}`));
  return (await req.json()) as Website;
}

export async function getEvents(
  websiteId: number | string,
  query: FeedEventsQuery
): Promise<FeedEventsReply> {
  const searchQuery = constructSearchParams({
    page: query.page?.toString(),
    pageSize: query.pageSize?.toString(),
    subject: query.subject,
    startDate: query.startDate ? convertDateForApi(query.startDate) : undefined,
    endDate: query.endDate ? convertDateForApi(query.endDate) : undefined,
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
