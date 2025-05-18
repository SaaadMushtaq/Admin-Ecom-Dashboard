import { defineStore } from "pinia";

function generateDummyRevenue(range: string, category: string | null) {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = { daily: 1, weekly: 7, monthly: 30, annually: 365 }[range] || 7;

  const trendLabels: string[] = [];
  const trendData: number[] = [];
  let totalRevenue = 0;
  const baseDate = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    const dayMultiplier = date.getDay() === 0 ? 1.5 : 1;
    const revenue = Math.floor((Math.random() * 8000 + 2000) * dayMultiplier);

    trendLabels.push(`${weekday[date.getDay()]} ${date.getDate()}`);
    trendData.push(revenue);
    totalRevenue += revenue;
  }

  const totalOrders = Math.floor(totalRevenue / 150);
  const avgOrderValue = Number((totalRevenue / totalOrders).toFixed(2));
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Toys",
  ];
  const categoryValues = categories.map(() =>
    Math.floor(Math.random() * 50000 + 10000)
  );
  const selectedCategoryIndex = categories.indexOf(category || "");
  const othersTotal = categoryValues.reduce(
    (sum, val, i) => (i === selectedCategoryIndex ? sum : sum + val),
    0
  );

  return {
    metrics: { totalOrders, totalRevenue, averageOrderValue: avgOrderValue },
    trend: {
      labels: trendLabels,
      datasets: [
        {
          label: "Revenue",
          data: trendData,
          borderColor: "#4CAF50",
          tension: 0.1,
        },
      ],
    },
    categories: {
      labels: category ? [category, "Others"] : categories,
      datasets: [
        {
          data: category
            ? [categoryValues[selectedCategoryIndex], othersTotal]
            : categoryValues,
          backgroundColor: category
            ? ["#4CAF50", "#E0E0E0"]
            : ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
        },
      ],
    },
  };
}

export const useRevenueStore = defineStore("revenue", {
  state: () => ({
    metrics: { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 },
    chartData: { datasets: [], labels: [] },
    categoryData: { labels: [], datasets: [] },
    filters: { range: "weekly", category: null },
    isLoading: false,
  }),
  actions: {
    fetchRevenueData() {
      this.isLoading = true;
      const data = generateDummyRevenue(
        this.filters.range,
        this.filters.category
      );
      this.metrics = data.metrics;
      this.chartData = data.trend;
      this.categoryData = data.categories;
      this.isLoading = false;
    },
    updateFilters(newFilters: { range: string; category: string | null }) {
      this.filters = newFilters;
      this.fetchRevenueData();
    },
  },
});
