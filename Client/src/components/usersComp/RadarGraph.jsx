import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const values = [
  getRandomBetween(0, 100),
  getRandomBetween(0, 100),
  getRandomBetween(0, 100),
  getRandomBetween(0, 100),
  getRandomBetween(0, 100),
  getRandomBetween(0, 100),
];

const data = [
  { subject: `Mentor ${Math.floor(values[0])}`, value: values[0], fullMark: 100 },
  { subject: `Thinker ${Math.floor(values[1])}`, value: values[1], fullMark: 100 },
  { subject: `Creator ${Math.floor(values[2])}`, value: values[2], fullMark: 100 },
  { subject: `Changemaker ${Math.floor(values[3])}`, value: values[3], fullMark: 100 },
  { subject: `Pioneer ${Math.floor(values[4])}`, value: values[4], fullMark: 100 },
  { subject: `Team member ${Math.floor(values[5])}`, value: values[5], fullMark: 100 },
];

const StatsRadarChart = () => {
  return (
    <div style={{ width: "100%", height: 400, backgroundColor: "#330497" }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
          <PolarGrid 
            stroke="grey"
            strokeDasharray="0"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "#ffffffc0",
              fontWeight: "bold",
            }}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#48d6ca"
            fill="#4b9d96"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsRadarChart;
