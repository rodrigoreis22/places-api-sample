import api from "lambda-api";
import PlacesService from "../services/PlacesService";
const placesRouter = api();
const placesService = new PlacesService();

placesRouter.get("/places/search", async (req, _res) => {
  const { q, near } = req.query;
  // if (!(q && near)) {
  //   return res
  //     .status(400)
  //     .send({ error: "Malformed request. q and near are required." });
  // }
  return placesService.search(q, near);
});

placesRouter.get("/places/:id", async (req, res) => {
  const place = await placesService.getPlaceById(req.params.id);
  if (!place) {
    return res.status(404);
  }
  return place;
});

export default placesRouter;
