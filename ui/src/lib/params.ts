import { MediaQueryObject } from "@/types";
import qs from "qs"; // npm install qs

export const buildMediaQueryParams = (query?: Partial<MediaQueryObject>) => {
  const q = createMediaQueryObject(query);
  return qs.stringify(q, { skipNulls: true });
};

export function createMediaQueryObject(
  query: Partial<MediaQueryObject> = {}
): MediaQueryObject {
  const MAX_PAGE_SIZE = 100;

  return {
    pageNumber: query.pageNumber ?? 1,
    pageSize: Math.min(query.pageSize ?? 10, MAX_PAGE_SIZE),
  };
}
