/* eslint-disable @typescript-eslint/camelcase */
import fetch, { Response } from "node-fetch";
import {
  IFoursquareVenue,
  IFoursquareVenueResponse,
  IFoursquareDetailsResponse,
} from "./types/foursquare";
import { set, sortBy, has } from "lodash";
import { URLSearchParams } from "url";

const BASE_API_PATH = "https://api.foursquare.com";
const VENUES_PATH = "/v2/venues/:venueId";
const VENUE_SEARCH_PATH = "/v2/venues/search";
const DEFAULT_INTENT = "browse";
const DEFAULT_LIMIT = 10;
const FS_VERSION = "20200201";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) throw new Error(await response.text());
  const responseJson = response.json();
  if (responseJson.error) throw responseJson.error;
  return responseJson;
};

const makeRequest = async <T>(
  path: string,
  params: Record<string, unknown>
): Promise<T> => {
  const allParams = {
    ...params,
    client_id: process.env.FOURSQUARE_CLIENT_ID,
    client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
    v: FS_VERSION,
  };
  const url = `${BASE_API_PATH}${path}?`;
  const queryString = new URLSearchParams(allParams);
  const fetchUrl = url + queryString;
  return fetch(fetchUrl)
    .then((response) => handleResponse<T>(response))
    .catch((error) => {
      throw new Error(`Foursquare Error: ${error.message}`);
    });
};

const getVenueDetails = async (venueId: string): Promise<IFoursquareVenue> => {
  const response = await makeRequest<IFoursquareDetailsResponse>(
    `${VENUES_PATH.replace(":venueId", venueId)}`,
    {}
  );
  return response?.response?.venue;
};

// reference: https://developer.foursquare.com/docs/api-reference/venues/search/
export interface ISearchVenuesParams {
  coordinates?: { lat: number; lng: number };
  query?: string;
  intent?: string;
  radius?: number;
  near?: string;
  limit?: number;
  categoryId?: string[];
  useDefaultCredentials?: boolean;
}

const searchVenues = async (
  params: ISearchVenuesParams
): Promise<IFoursquareVenue[]> => {
  const {
    coordinates,
    near,
    query,
    intent = DEFAULT_INTENT,
    radius,
    limit = DEFAULT_LIMIT,
    categoryId,
  } = params;
  if ((!has(coordinates, "lat") || !has(coordinates, "lng")) && !near) {
    throw new Error(`One of coordinates or near is required`);
  }
  const apiParams = {
    intent,
    limit,
  };
  if (coordinates) {
    set(apiParams, "ll", [coordinates.lat, coordinates.lng].toString());
  }
  if (near) {
    set(apiParams, "near", near);
  }
  if (query) {
    set(apiParams, "query", query);
  }
  if (categoryId) {
    set(apiParams, "categoryId", categoryId.join(","));
  }
  if (radius) {
    set(apiParams, "radius", radius);
  }
  const body = await makeRequest<IFoursquareVenueResponse>(
    VENUE_SEARCH_PATH,
    apiParams
  );
  const venues = body?.response?.venues ?? [];
  return sortBy(venues, "location.distance");
};

export default {
  searchVenues,
  getVenueDetails,
};
