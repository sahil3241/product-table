import * as combinedService from "../services/combinedService.js";

export const getCombinedData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month parameter is required." });
  }

  try {
    const data = await combinedService.getCombinedData(month);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
