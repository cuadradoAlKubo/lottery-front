
import { ContestData } from "@/interfaces/prices.interface";
import { useState } from "react";

const usePlayContest = () => {

    const [data, setData] = useState<ContestData>()

    const playContest = async (id:string): Promise<void> => {
        const response = await fetch(
            `https://privatedevs.com/api/v1/playRound/play/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setData(data)
        } else {
            throw new Error("Failed to fetch contests");
        }
    };

    return {data, playContest}
};

export default usePlayContest;