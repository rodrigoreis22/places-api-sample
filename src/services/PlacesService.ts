import foursquare from "../utils/foursquare";

class PlacesService {
  async search(query: string, near: string): Promise<any> {
    if (!(query && near)) {
      throw new Error("Malformed request. query and near are required.");
    }
    return foursquare.searchVenues({ query, near });
  }
  async getPlaceById(id: string): Promise<any> {
    return foursquare.getVenueDetails(id);
  }
}

export default PlacesService;
