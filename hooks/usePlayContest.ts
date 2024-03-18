
import { RoundCreated } from "@/interfaces/round.interface";
import { useState } from "react";

const usePlayContest = () => {

    const [roundData, setRoundData] = useState<RoundCreated>()
    const [lotData, setLotData] = useState()
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No se encontró token");
    }

    const playContest = async (id:string): Promise<void> => {
        const response = await fetch(
            `https://privatedevs.com/api-contest/api/v1/playRound/play/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setLotData(data)
        } else {
            throw new Error("Failed to fetch contests");
        }
    };

    const createRound = async ({idContest, round}:{idContest: string, round: number}): Promise<void> => {
        const response = await fetch(
            `https://privatedevs.com/api-contest/api/v1/playRound/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({contestId: idContest, round})
            }
        );

        if (response.ok) {
            const data = await response.json();
            setRoundData(data)
        } else {
            throw new Error("Failed to fetch contests");
        }
    };

    return {roundData, playContest, createRound, lotData}
};

export default usePlayContest;