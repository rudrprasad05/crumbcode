import { CakeQueryObject, ESortBy } from "@/types";
import qs from "qs"; // npm install qs

export const buildMediaQueryParams = (query?: CakeQueryObject) => {
  const q = createCakeQueryObject(query);
  return qs.stringify(q, { skipNulls: true });
};

export function createCakeQueryObject(
  query?: CakeQueryObject,
): CakeQueryObject {
  const MAX_PAGE_SIZE = 100;

  if (!query)
    return {
      sortBy: ESortBy.ASC,
    };

  return {
    sortBy: query.sortBy,
    pageNumber: query.pageNumber ?? 1,
    pageSize: Math.min(query.pageSize ?? 10, MAX_PAGE_SIZE),
    showInGallery: query.showInGallery,
    isDeleted: query.isDeleted,
  };
}
