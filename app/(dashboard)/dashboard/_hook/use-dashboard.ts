import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { DASHBOARD_API } from "@/constants/api.constants";
import { DashboardData } from "@/types/global";

export const dashboardKeys = {
  all: ["dashboard"] as const,
};

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<DashboardData>(DASHBOARD_API.get);
      return res.data;
    },
  });
}
