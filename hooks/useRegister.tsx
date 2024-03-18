import { ContestData } from "@/interfaces/prices.interface";
import { useState } from "react";

const useRegister = (id: string) => {
  const [response, setResponse] = useState<ContestData>();
  const [loading, setLoading] = useState(false);

  const register = async (user: string): Promise<void> => {
    setLoading(true);
    const response = await fetch(
      "https://privatedevs.com/api-contest/api/v1/subscribes/${id}",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discordUser: user }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      setResponse(data);
      setLoading(false);
    } else {
      setLoading(false);
      const data = await response.json();
      setResponse(data);
      // throw new Error("Failed to fetch contests");
    }
  };

  return { response, loading, register };
};

export default useRegister;
