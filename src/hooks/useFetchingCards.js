import { useEffect, useState } from "react";
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';

export const useFetchingCards = (fetchUrl, cardComponent, callback) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [fetchedCards, setFetchedCards] = useState();
    const fetchHandler = async () => {
        try {
            if(callback){
                await callback();
                setIsLoading(false);
            } else{
                const [data, status] = await EntityDataService.get(fetchUrl);
                if(!status){
                    console.dir(data);
                    throw new Error(data);
                }
                console.dir('EntityDataService.get() response data');
                console.dir(data);
                const cards = data.map(card => {
                    return { card, Component: cardComponent };
                });
                setFetchedCards(cards);
                console.dir('fetched Cards');
                console.dir(fetchedCards);
                setIsLoading(false);
            }
        } catch (error) {
            setErrorMessage(error.message);
            setFetchedCards([]);
            setIsLoading(false);
        } finally {
            console.dir('fin fetchedCards');
            console.dir(fetchedCards);
        }
    }
    useEffect(() => {
        fetchHandler();
    },[])
    return {fetchHandler, isLoading, errorMessage, fetchedCards};
}