import * as statisticsService from "../services/statisticsService.js";

export const getStatistics = async (req, res) => {
  const { month } = req.query;
  try {
    const statistics = await statisticsService.getStatisticsForMonth(month);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
