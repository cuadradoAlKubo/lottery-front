import React, { useEffect, useState } from 'react'
import usePrices from './usePrices'
import { Contest } from '@/interfaces/constest.inteface'
import { Prize } from '@/interfaces/prices.interface'
import usePlayContest from './usePlayContest'

interface Props{
    data: Contest | undefined,
}

const useModalSorteo = ({data}: Props) => {
    const {data: dataContest, getPrices} = usePrices(data?._id!)
    const {playContest, createRound, roundData, lotData} = usePlayContest();
    const [prices, setPrices] = useState<Prize[] | undefined>([])
    const [users, setUsers] = useState<any>([])
    const [prepared, setPrepared] = useState(false)

    const handleClick = () => {
        let round = prices?.findIndex((el) => el.markAsDelivery == false)
        createRound({idContest: data?._id!, round: (round! + 1)})
    }

    const handleLot = () => {
        playContest(roundData?.payload._id!)
    }
    useEffect(() => {
        getPrices();
    }, [data])

    useEffect(() => {
        setPrices(dataContest?.payload.prizes)
        setUsers(dataContest?.payload.registeredUsers)
    }, [dataContest])

    useEffect(() => {
        if(roundData?.error == false && users.length > 0){
            setPrepared(true)
        }
    }, [roundData])

    useEffect(() => {
        console.log(lotData)
    }, [lotData])

    return {prices, handleClick, handleLot, prepared, users}
}
 
export default useModalSorteo