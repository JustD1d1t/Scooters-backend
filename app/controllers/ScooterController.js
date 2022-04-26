import { Scooter } from "../db/models/scooter.js";

class ScooterControllerClass {
  async getScooters(req, res) {
    const where = {};
    const queries = req.query;
    for (const query in queries) {
      const singleQueries = queries[query].split(".");
      singleQueries.forEach((query, index) => {
        singleQueries[index] = query.replace("_", " ");
      });
      where[query] = singleQueries;
    }
    const scooters = await Scooter.find(where);
    res.json(scooters);
  }

  async getScooter(req, res) {
    const id = req.params.sid;
    let scooter;
    try {
      scooter = await Scooter.findById(id);
    } catch (err) {}
    res.json({ scooter: scooter });
  }

  async addScooter(req, res) {
    const scooter = new Scooter({
      name: req.body.name,
      price: req.body.price,
      manufacturer: req.body.manufacturer,
      country: req.body.country,
      color: [
        {
          color: req.body.colorFirstName,
          url: req.body.colorFirstUrl,
        },
        {
          color: req.body.colorSecondName,
          url: req.body.colorSecondUrl,
        },
      ],
      powerType: req.body.powerType,
      engineCapacity: req.body.engineCapacity,
      wheelSize: req.body.wheelSize,
      seats: req.body.seats,
      topSpeed: req.body.topSpeed,
      description: req.body.description,
    });
    try {
      await scooter.save();
      res.status(201).json(scooter);
    } catch (e) {
      console.log(e);
      res.status(422).json({ errors: e.errors });
    }
  }
}
export const ScooterController = new ScooterControllerClass();
