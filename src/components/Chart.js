import Chart from "react-apexcharts";

export default function MyChart(props) {
  const options = {
    chart: {
      type: "bar",
      height: "100%",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 2000,
        },
      },
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + " Cases";
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: props.categories,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: "xx",
      data: props.data,
    },
  ];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" />
    </div>
  );
}
