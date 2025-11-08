import type {
  FeedEventsReply,
  FeedEventsQuerystring,
  Website,
} from "@feed/types";

class ApiClient {
  baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URL ?? "http://localhost:8080";
  }
  private url(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  async getWebsites(): Promise<Website[]> {
    const req = await fetch(this.url("/websites"));
    return (await req.json()) as Website[];
  }

  async getEvents(
    websiteId: number,
    query: FeedEventsQuerystring
  ): Promise<FeedEventsReply> {
    const params = new URLSearchParams({
      page: query.page?.toString() ?? "",
      pageSize: query.pageSize?.toString() ?? "",
      type: query.type ?? "",
      status: query.status ?? "",
    });
    const search = params.toString();
    console.log({ search });
    const url = this.url(`${websiteId}/events?${search}`);

    const req = await fetch(url);
    const data = (await req.json()) as FeedEventsReply;
    return data;
  }
}

const api = new ApiClient();

export default api;
