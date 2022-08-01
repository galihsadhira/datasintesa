import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

const uri = `http://localhost:3000`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Graph"
    }
  }
};

export default function Graph({ datas }) {
  const labels = datas.map(el => {
    return el.resultTime;
  });

  const values = datas.map(el => {
    return el.availability;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Data",
        data: values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  };

  return (
    <div>
      <Line options={options} data={data} />;
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const data = await axios.get(`${uri}`);

    return {
      props: {
        datas: JSON.parse(JSON.stringify(data.data))
      }
    };
  } catch (err) {
    console.log(err);
  }
}
