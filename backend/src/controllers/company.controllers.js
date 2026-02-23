import Company from "../models/company.model.js";
import Roadmap from "../models/roadmap.model.js";

const createCompany = async (req, res) => {
  const input = req.body;

  try {
    const company = new Company(input);
    await company.save();
    res.json(company);
  } catch (err) {
    res.json({message: `Something went wrong ${err}`});
  }
}

const createRoadmap = async (req, res) => {
  const input = req.body;

  try {
    const roadmap = new Roadmap(input);
    await roadmap.save();
    res.json(roadmap);
  } catch (err) {
    res.json({message: `Something went wrong ${err}`});
  }
}

export { createCompany, createRoadmap };