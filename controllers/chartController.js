import * as chartService from "../services/chartService.js";

export const getBarChartData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month parameter is required." });
  }

  try {
    const data = await chartService.getBarChartData(month);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPieChartData = async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month parameter is required." });
  }

  try {
    const data = await chartService.getPieChartData(month);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
