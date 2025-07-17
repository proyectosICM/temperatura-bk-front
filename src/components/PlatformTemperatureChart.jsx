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

const CustomTooltip = ({ active, payload, label, threshold }) => {
  if (active && payload && payload.length) {
    const temperature = payload[0].value;
    const isHot = temperature > threshold;

    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "8px 12px",
          border: `1px solid ${isHot ? "#e74c3c" : "#3498db"}`,
          borderRadius: "8px",
        }}
      >
        <p style={{ margin: 0, color: "#333" }}>{label}</p>
        <p
          style={{
            margin: 0,
            color: isHot ? "#e74c3c" : "#3498db",
            fontWeight: "bold",
          }}
        >
          Temperatura: {temperature}°C
        </p>
      </div>
    );
  }

  return null;
};

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
          <Tooltip content={<CustomTooltip threshold={threshold} />} />
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
