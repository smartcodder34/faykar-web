import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth";

export const useGetUserApi = () => {
  return useQuery({
    queryKey: ["get-profile"],
    queryFn: getProfile,
  });
};
