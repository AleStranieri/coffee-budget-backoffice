import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ data }) => {
  const transformedArray = data.getForecastTransactions.map(({ amount, day }) => [
    new Date(day).getTime(),
    parseFloat(amount).toFixed(2),
  ]);
  const options = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 450,
      zoom: {
        autoScaleYaxis: true
      }
    },
    annotations: {
      yaxis: [
        {
          y: 10000,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Safety',
            style: {
              color: "#fff",
              background: '#00E396'
            }
          }
        },
        {
          y: 5000,
          borderColor: '#ee0000',
          label: {
            show: false,
            text: 'Risk',
            style: {
              color: "#fff",
              background: '#ee0000'
            }
          }
        }
      ],
      xaxis: [{
        x: new Date('30 Apr 2024').getTime(),
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,
          text: 'NewBorn',
          style: {
            color: "#fff",
            background: '#775DD0'
          }
        }
      }]
    },
    xaxis: {
      type: 'datetime',
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
  };

  const series = [
    {
      name: 'Family Budget',
      data: transformedArray,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height="450"
    />
  );
};

export default LineChart;
