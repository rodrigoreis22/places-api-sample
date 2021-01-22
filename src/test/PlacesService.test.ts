import PlacesService from "../services/PlacesService";
import foursquare from "../utils/foursquare";
import { MockedFoursquarePlace, MockedFoursquareSearchResponse } from "./mocks";

jest.mock("../utils/foursquare");
const fsSearchVenues = foursquare.searchVenues as jest.Mock<Promise<any>>;
const fsGetVenueDetails = foursquare.getVenueDetails as jest.Mock<Promise<any>>;

describe("search", () => {
  it("should throw error when not all parameters are passed", async () => {
    const service = new PlacesService();
    // @ts-ignore (we force ts-ignore here to create the error condition)
    await expect(service.search()).rejects.toThrow();
    // @ts-ignore
    await expect(service.search(null, "San Francisco")).rejects.toThrow();
    // @ts-ignore
    await expect(service.search("boba")).rejects.toThrow();
  });
  it("should return search results", async () => {
    fsSearchVenues.mockResolvedValue(MockedFoursquareSearchResponse);
    const service = new PlacesService();
    const response = await service.search("boba", "San Francisco, CA");
    expect(response.length).toBe(MockedFoursquareSearchResponse.length);
  });
});

describe("get place by id", () => {
  it("should get place by id", async () => {
    fsGetVenueDetails.mockResolvedValue(MockedFoursquarePlace);
    const service = new PlacesService();
    const response = await service.getPlaceById(MockedFoursquarePlace.id);
    expect(response.id).toBe(MockedFoursquarePlace.id);
  });
  it("should return undefined for non-existent place", async () => {
    fsGetVenueDetails.mockResolvedValue(undefined);
    const service = new PlacesService();
    const response = await service.getPlaceById(MockedFoursquarePlace.id);
    expect(response).toBeFalsy();
  });
});
