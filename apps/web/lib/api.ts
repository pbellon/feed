import type { FeedEventsReply, FeedEventsQuery, Website } from "@feed/types";

import { constructSearchParams } from "./searchParams";

const baseUrl = process.env.API_BASE_URL ?? "http://localhost:8080";

/**
 * Small utility to simulate latency
 *
 * @param amountInMs the number of milliseconds to wait
 * @example
 * ```typescript
 * await delay(1000); // will wait for 1 second
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function delay(amountInMs: number = 300): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, amountInMs);
  });
}

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
