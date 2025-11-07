import { TrendingUp, TrendingDown } from "lucide-react";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
export default function SocialMediaDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState("Facebook");
  const [selectedType, setSelectedType] = useState("Post"); // Post | Video
  const [selectedMetric, setSelectedMetric] = useState("Likes"); // Likes | Comments | Shares | Views

  const data = [
    {
      platform: "Facebook",
      followers: [880147, 886738],
      posts: [195, 191],
      videos: [73, 60],
      post_likes: [161172, 212826],
      post_comments: [9389, 23597],
      post_shares: [6985, 6452],
      video_likes: [171532, 68348],
      video_comments: [3500, 2203],
      video_shares: [4029, 3402],
      video_views: [8064933, 2062431],
      engagement: [22834587, 13281196],
    },
    {
      platform: "Twitter",
      followers: [1667801, 1664892],
      posts: [179, 158],
      videos: [61, 47],
      post_likes: [24563, 18564],
      post_comments: [3123, 794],
      post_shares: [4082, 2766],
      video_likes: [5366, 2663],
      video_comments: [543, 236],
      video_shares: [1335, 755],
      video_views: [227500, 96700],
      engagement: [266512, 122478],
    },
    {
      platform: "Instagram",
      followers: [1175729, 1170390],
      posts: [126, 98],
      videos: [70, 64],
      post_likes: [400831, 243955],
      post_comments: [5865, 1371],
      video_likes: [321030, 183599],
      video_comments: [3590, 2382],
      video_shares: [10079, 8191],
      video_views: [9721900, 5336500],
      engagement: [12340568, 7169951],
    },
    {
      platform: "YouTube",
      followers: [87000, 91900],
      videos: [63, 42],
      video_likes: [7547, 4274],
      video_comments: [75, 41],
      video_views: [698920, 768550],
      engagement: [706542, 772865],
    },
  ];

  const selectedData = data.find((d) => d.platform === selectedPlatform);

  // ---- Chart Data ----
  const chartData = data.map((d) => {
    let key = "";
    if (selectedType === "Post") {
      key = `post_${selectedMetric.toLowerCase()}`;
    } else {
      key = `video_${selectedMetric.toLowerCase()}`;
    }

    const sept = d[key] ? d[key][0] : 0;
    const oct = d[key] ? d[key][1] : 0;

    return {
      platform: d.platform,
      September: sept,
      October: oct,
    };
  });

  const calculateChange = (sept, oct) => {
    if (sept === 0 || oct === 0) return { value: "-", isPositive: true };
    const change = ((oct - sept) / sept) * 100;
    return { value: change.toFixed(1), isPositive: change >= 0 };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        📊 AJIT PAWAR's SOCIAL MEDIA PERFORMANCE DASHBOARD (Oct vs Sept) 
      </h1>

      {/* ---- Platform Selector ---- */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["Facebook", "Twitter", "Instagram", "YouTube"].map((platform) => (
          <button
            key={platform}
            onClick={() => setSelectedPlatform(platform)}
            className={`px-6 py-2 rounded-lg font-semibold text-lg transition-all duration-200 ${
              selectedPlatform === platform
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* ---- KPI Section (Top 3) ---- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPI
          title="Followers"
          septValue={selectedData.followers[0]}
          octValue={selectedData.followers[1]}
          color="from-purple-500 to-indigo-500"
          calculateChange={calculateChange}
        />
        <KPI
          title="Total Posts"
          septValue={selectedData.posts ? selectedData.posts[0] : 0}
          octValue={selectedData.posts ? selectedData.posts[1] : 0}
          color="from-blue-500 to-cyan-500"
          calculateChange={calculateChange}
        />
        <KPI
          title="Total Videos"
          septValue={selectedData.videos ? selectedData.videos[0] : 0}
          octValue={selectedData.videos ? selectedData.videos[1] : 0}
          color="from-green-500 to-emerald-500"
          calculateChange={calculateChange}
        />
      </div>

      {/* ---- Lower KPI Section (2) ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <KPI
          title="Total Views"
          septValue={selectedData.video_views ? selectedData.video_views[0] : 0}
          octValue={selectedData.video_views ? selectedData.video_views[1] : 0}
          color="from-orange-500 to-amber-500"
          calculateChange={calculateChange}
        />
        <KPI
          title="Engagement"
          septValue={selectedData.engagement[0]}
          octValue={selectedData.engagement[1]}
          color="from-red-500 to-yellow-500"
          calculateChange={calculateChange}
        />
      </div>

      {/* ---- Platform Comparison ---- */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          PLATFORM-WISE COMPARISON
        </h2>

        {/* Type Buttons: Post / Video */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {["Post", "Video"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedType === type
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Metric Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["Likes", "Comments", "Shares", "Views"].map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedMetric === metric
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {metric}
            </button>
          ))}
        </div>

        {/* ---- Bar Chart ---- */}
        <div className="h-96 flex justify-center items-center">
          <ResponsiveContainer width="90%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="September" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="October" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ---- Platform Statistics with % Change ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {chartData.map((item) => {
            const change = calculateChange(item.September, item.October);
            return (
              <div
                key={item.platform}
                className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200"
              >
                <h4 className="font-bold text-lg text-gray-800 mb-3">
                  {item.platform}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">September:</span>
                    <span className="font-semibold text-purple-600">
                      {item.September === 0 ? "NA" : item.September.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">October:</span>
                    <span className="font-semibold text-cyan-600">
                      {item.October === 0 ? "NA" : item.October.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                    <span className="text-sm font-medium text-gray-700">
                      Change:
                    </span>
                    <div className="flex items-center gap-1">
                      {change.value !== "-" && change.isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : change.value !== "-" ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : null}
                      <span
                        className={`font-bold ${
                          change.value === "-" ? "text-gray-700" : change.isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {change.value === "-" ? "-" : `${change.isPositive ? "+" : ""}${change.value}%`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---- KPI Component ----
const KPI = ({ title, septValue, octValue, color, calculateChange }) => {
  const change = calculateChange(septValue, octValue);
  
  return (
    <div
      className={`bg-gradient-to-r ${color} text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-8 transition-transform transform hover:scale-105 relative`}
    >
      <h3 className="text-xl md:text-2xl font-semibold text-center">{title}</h3>
      <p className="text-4xl md:text-5xl font-extrabold mt-3 text-center tracking-wide">
        {octValue === 0 ? "NA" : octValue?.toLocaleString()}
      </p>
      <p className="text-m opacity-80 mt-1">
        Sept: {septValue === 0 ? "NA" : septValue?.toLocaleString()}
      </p>
      <div className="flex items-center gap-2 mt-3 bg-white text-gray-900 rounded-lg px-4 py-2 shadow-md">
        {change.value !== "-" && change.isPositive ? (
          <TrendingUp className="w-5 h-5 text-green-600" />
        ) : change.value !== "-" ? (
          <TrendingDown className="w-5 h-5 text-red-600" />
        ) : null}
        <span
          className={`text-lg font-bold ${
            change.value === "-" ? "text-gray-700" : change.isPositive ? "text-green-700" : "text-red-700"
          }`}
        >
          {change.value === "-" ? "-" : `${change.isPositive ? "+" : ""}${change.value}%`}
        </span>
      </div>
    </div>
  );
};