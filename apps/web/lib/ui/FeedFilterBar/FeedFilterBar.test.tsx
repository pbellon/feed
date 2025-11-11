import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";

import {
  FeedEventStatus,
  FeedEventSubject,
  FeedSortableColumn,
  SortOrder,
} from "@feed/types";

import { FeedFilterBar } from "./FeedFilterBar";
import {
  FeedContextCallbacks,
  FeedContextState,
} from "../../FeedContext/types";

const setStatusMock = vi.fn();
const setSubjectMock = vi.fn();
const resetFiltersMock = vi.fn();

vi.mock(import("@/lib/hooks/useFeedProvider"), () => ({
  useFeedProvider: () => {
    const state: FeedContextState = {
      filters: {
        endDate: "10-11-2025",
        startDate: "09-11-2025",
        status: "",
        subject: "",
      },
      pagination: {
        page: 0,
        pageSize: 10,
      },
      sort: {
        column: FeedSortableColumn.CREATED_AT,
        order: SortOrder.ASCENDING,
      },
    };

    const callbacks: FeedContextCallbacks = {
      resetFilters: resetFiltersMock,
      setEndDate: vi.fn(),
      setStartDate: vi.fn(),
      setStatus: setStatusMock,
      setSubject: setSubjectMock,
      setPage: vi.fn(),
      setPageSize: vi.fn(),
      sortBy: vi.fn(),
    };

    return {
      ...state,
      hasFilters: true,
      ...callbacks,
    };
  },
}));

describe("FeedFilterBar", () => {
  it("should render properly", () => {
    render(<FeedFilterBar />);
    expect(screen.getByLabelText("Status")).toBeDefined();
    expect(screen.getByLabelText("Subject")).toBeDefined();
    expect(screen.getAllByLabelText("Creation start date")[0]).toBeDefined();
    expect(screen.getAllByLabelText("Creation end date")[0]).toBeDefined();
  });

  it("should call useFeedProvider.setStatus on status change", async () => {
    const user = userEvent.setup();
    render(<FeedFilterBar />);
    // Ouvre le dropdown
    await user.click(screen.getByLabelText("Status"));
    await user.click(screen.getByRole("option", { name: "Error" }));

    expect(setStatusMock).toHaveBeenCalledWith(FeedEventStatus.FAILED);
  });

  it("should call useFeedProvider.setSubject on subject change", async () => {
    const user = userEvent.setup();
    render(<FeedFilterBar />);
    // Ouvre le dropdown
    await user.click(screen.getByLabelText("Subject"));
    await user.click(screen.getByRole("option", { name: "Certificate" }));

    expect(setSubjectMock).toHaveBeenCalledWith(FeedEventSubject.CERTIFICATE);
  });

  it("should call useFeedProvider.resetFilters on reset filters button clicked", async () => {
    const user = userEvent.setup();
    render(<FeedFilterBar />);
    await user.click(screen.getByLabelText("Reset filters"));
    expect(resetFiltersMock).toHaveBeenCalled();
  });
});
