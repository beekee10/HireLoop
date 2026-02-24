import mongoose from "mongoose";
import Company from "../models/company.model.js";
import Roadmap from "../models/roadmap.model.js";

const createCompany = async (req, res) => {
  const { name, roles, avgPackage, difficultyLevel } = req.body;

  try {
    if(!name) {
      return res.status(400).json({message: "Company name is required"});
    }

    const existing = await Company.findOne({ name: req.body.name });
    if (existing) {
      return res.status(409).json({ message: "Company already exists" });
    }

    const company = new Company({
      name,
      roles,
      avgPackage,
      difficultyLevel
    });

    await company.save();
    res.status(201).json({company});
  } catch (err) {
    res.json({message: `Something went wrong ${err}`});
  }
}

const createRoadmap = async (req, res) => {
  const { topics, interviewRounds, preparationTimeline } = req.body;

  try {
    const company = await Company.findOne({name: req.body.companyName});

    if (!company) {
      return res.status(404).json({message: "Company not found"});
    }

    const roadmap = await Roadmap.create({
      companyId: company._id,
      topics,
      interviewRounds,
      preparationTimeline
    });

    res.status(201).json({roadmap});
  } catch (err) {
    res.json({message: `Something went wrong ${err}`});
  }
}

const getRoadmap = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID"
      });
    }

    const roadmap = await Roadmap.findOne({ companyId });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found"
      });
    }

    res.status(200).json(roadmap);

  } catch (err) {
    res.json({message: `Something went wrong ${err}`});
  }
};

export { createCompany, createRoadmap, getRoadmap };