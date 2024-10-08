import * as chartService from "./chartService.js";
import * as statisticsService from "./statisticsService.js";

export const getCombinedData = async (month) => {
  const statistics = await statisticsService.getStatisticsForMonth(month);

  const barChartData = await chartService.getBarChartData(month);

  const pieChartData = await chartService.getPieChartData(month);

  return { statistics, barChartData, pieChartData };
};
