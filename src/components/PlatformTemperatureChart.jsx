import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PlatformTemperatureChart = ({ data, threshold }) => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "32px auto",
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
        Temperaturas por Andén
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 30, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis unit="°C" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#e74c3c"
            strokeWidth={2}
            dot={({ cx, cy, payload }) => {
              const isHot = payload.temperature > threshold;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={isHot ? "#e74c3c" : "#3498db"}
                  stroke="#fff"
                  strokeWidth={1}
                />
              );
            }}
            activeDot={({ cx, cy, payload }) => {
              const isHot = payload.temperature > threshold;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={7}
                  fill={isHot ? "#e74c3c" : "#3498db"}
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlatformTemperatureChart;
