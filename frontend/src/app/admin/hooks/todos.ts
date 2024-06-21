import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useTodos = () => {
  const result = useQuery({
    queryKey: ["todos"],
    queryFn: () => axios.get(""),
  });
};
