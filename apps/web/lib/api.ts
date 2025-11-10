import type { FeedEventsReply, FeedEventsQuery, Website } from "@feed/types";
import { constructSearchParams } from "./searchParams";

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
    endDate: query.endDate,
    page: query.page?.toString(),
    pageSize: query.pageSize?.toString(),
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
    startDate: query.startDate,
    status: query.status,
    subject: query.subject,
  });

  let fullUrl = url(`/websites/${websiteId}/events`);
  if (searchQuery) {
    fullUrl += `?${searchQuery}`;
  }

  const req = await fetch(fullUrl);
  const data = (await req.json()) as FeedEventsReply;
  return data;
}
