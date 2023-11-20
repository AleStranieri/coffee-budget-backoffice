import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ data }) => {
  const transformedArray = data.getForecastTransactions.map(({ amount, day }) => [
    new Date(day).getTime(),
    amount
  ]);
  const options = {
    chart: {
      id: 'area-datetime',
      type: 'area',
    },
    xaxis: {
      type: 'datetime',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  const series = [
    {
      name: 'series-1',
      data: transformedArray,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height="300"
    />
  );
};

export default LineChart;
