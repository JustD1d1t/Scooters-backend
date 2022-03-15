import { Scooter } from "../db/models/scooter.js";

class ScooterControllerClass {
  async getAllScooters(req, res) {
    const where = {};
    const queries = req.query;
    for (const query in queries) {
      where[query] = queries[query];
    }
    console.log(where);
    const scooters = await Scooter.find(where);
    res.json(scooters);
  }

  async getScooter(req, res) {
    const id = req.params.sid;
    let scooter;
    try {
      scooter = await Scooter.findById(id);
    } catch (err) {
      console.log(err);
    }
    res.json({ scooter: scooter });
  }

  async addScooter(req, res) {
    const scooter = new Scooter({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      color: req.body.color,
      rate: req.body.rate,
      manufacturer: req.body.manufacturer,
      country: req.body.country,
      powerType: req.body.powerType,
      engineCapacity: req.body.engineCapacity,
      wheelSize: req.body.wheelSize,
      seats: req.body.seats,
      description: req.body.description,
      topSpeed: req.body.topSpeed,
    });
    try {
      await scooter.save();
      res.status(201).json(scooter);
    } catch (e) {
      res.status(422).json({ errors: e.errors });
    }
  }
}
export const ScooterController = new ScooterControllerClass();
