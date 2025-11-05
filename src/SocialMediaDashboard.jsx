import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const rawData = [
  {
    platform: "Facebook",
    data: [
      { metric: "Followers", sept: 880147, oct: 886738 },
      { metric: "Total Graphic Posts", sept: 195, oct: 191 },
      { metric: "Post Reach", sept: 6322526, oct: 8473585 },
      { metric: "Likes (Posts)", sept: 161172, oct: 212826 },
      { metric: "Comments (Posts)", sept: 9389, oct: 23597 },
      { metric: "Share (Posts)", sept: 6985, oct: 6452 },
      { metric: "Engaged Users (Posts)", sept: 911326, oct: 1042778 },
      { metric: "Total Engagement [Posts]", sept: 6500072, oct: 8716460 },
      { metric: "No of Videos", sept: 73, oct: 60 },
      { metric: "Video Reach", sept: 7224881, oct: 1856250 },
      { metric: "Video Views", sept: 8064933, oct: 2062431 },
      { metric: "Likes (Videos)", sept: 171532, oct: 68348 },
      { metric: "Comments (Videos)", sept: 3500, oct: 2203 },
      { metric: "Shares (Videos)", sept: 4029, oct: 3402 },
      { metric: "Engaged Users (Videos)", sept: 466903, oct: 150672 },
      { metric: "Total Engagement [Videos]", sept: 15468875, oct: 3992634 },
      { metric: "Stories Posted", sept: 81, oct: 71 },
      { metric: "Reactions", sept: 831094, oct: 548557 },
      { metric: "Page Visits", sept: 34546, oct: 23545 },
      { metric: "Total Engagement [Stories]", sept: 865640, oct: 572102 },
      { metric: "Total Engagement", sept: 22834587, oct: 13281196 },
    ],
  },
  {
    platform: "Twitter",
    data: [
      { metric: "Followers", sept: 1667801, oct: 1664892 },
      { metric: "Total Posts/Tweets", sept: 179, oct: 158 },
      { metric: "Likes (Posts)", sept: 24563, oct: 18564 },
      { metric: "Comments (Posts)", sept: 3123, oct: 794 },
      { metric: "Retweets (Posts)", sept: 4082, oct: 2766 },
      { metric: "Total Engagement [Posts]", sept: 31768, oct: 22124 },
      { metric: "No of Videos", sept: 61, oct: 47 },
      { metric: "Video Views", sept: 227500, oct: 96700 },
      { metric: "Likes (Videos)", sept: 5366, oct: 2663 },
      { metric: "Comments (Videos)", sept: 543, oct: 236 },
      { metric: "Retweets (Videos)", sept: 1335, oct: 755 },
      { metric: "Total Engagement [Videos]", sept: 234744, oct: 100354 },
      { metric: "Total Engagement", sept: 266512, oct: 122478 },
    ],
  },
  {
    platform: "Instagram",
    data: [
      { metric: "Followers", sept: 1175729, oct: 1170390 },
      { metric: "Graphic Posts", sept: 126, oct: 98 },
      { metric: "Likes (Posts)", sept: 400831, oct: 243955 },
      { metric: "Comments (Posts)", sept: 5865, oct: 1371 },
      { metric: "Total Engagement [Posts]", sept: 406696, oct: 245326 },
      { metric: "No of Videos", sept: 70, oct: 64 },
      { metric: "Video Views", sept: 9721900, oct: 5336500 },
      { metric: "Likes (Videos)", sept: 321030, oct: 183599 },
      { metric: "Comments (Videos)", sept: 3590, oct: 2382 },
      { metric: "Shares (Videos)", sept: 10079, oct: 8191 },
      { metric: "Total Engagement [Videos]", sept: 10056599, oct: 5530672 },
      { metric: "Stories Posted", sept: 91, oct: 80 },
      { metric: "Unique Opens", sept: 1843236, oct: 1368175 },
      { metric: "Page Visits", sept: 4912, oct: 3765 },
      { metric: "Shares (Stories)", sept: 504, oct: 397 },
      { metric: "Swipe-Up Actions", sept: 28618, oct: 21616 },
      { metric: "Replies", sept: 3, oct: 0 },
      { metric: "Total Engagement [Stories]", sept: 1877273, oct: 1393953 },
      { metric: "Total Engagement", sept: 12340568, oct: 7169951 },
    ],
  },
  {
    platform: "YouTube",
    data: [
      { metric: "Subscribers", sept: 87000, oct: 91900 },
      { metric: "Videos Posted", sept: 63, oct: 42 },
      { metric: "Video Views", sept: 698920, oct: 768550 },
      { metric: "Likes", sept: 7547, oct: 4274 },
      { metric: "Comments", sept: 75, oct: 41 },
      { metric: "Total Engagement", sept: 706542, oct: 772865 },
    ],
  },
];

export default function SocialMediaDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState("Facebook");
  const platformData =
    rawData.find((d) => d.platform === selectedPlatform)?.data || [];

  const chartData = platformData.map((d) => ({
    metric: d.metric,
    September: d.sept,
    October: d.oct,
    Growth: ((d.oct - d.sept) / d.sept) * 100,
  }));

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Social Media Performance Dashboard
      </h1>

      <div className="flex justify-center mb-6">
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          {rawData.map((p) => (
            <option key={p.platform} value={p.platform}>
              {p.platform}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="September" fill="#3b82f6" />
            <Bar dataKey="October" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border">
          <thead className="bg-blue-50 text-blue-700 font-semibold">
            <tr>
              <th className="border p-2">Metric</th>
              <th className="border p-2">Sept</th>
              <th className="border p-2">Oct</th>
              <th className="border p-2">% Growth</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((d, i) => (
              <tr key={i} className="hover:bg-blue-50">
                <td className="border p-2">{d.metric}</td>
                <td className="border p-2">
                  {d.September.toLocaleString()}
                </td>
                <td className="border p-2">{d.October.toLocaleString()}</td>
                <td
                  className={`border p-2 font-semibold ${
                    d.Growth > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {d.Growth.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
