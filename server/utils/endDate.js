const endDate = (startDate, courseDuration) => {
  const monthsRegex = /(\d+)\s*Months?/;
  const match = courseDuration.match(monthsRegex);
  const durationInMonths = match ? parseInt(match[1], 10) : 0;

  const result = new Date(Date.parse(startDate));
  result.setMonth(result.getMonth() + durationInMonths);
  return result.toISOString();
};

module.exports = endDate;
