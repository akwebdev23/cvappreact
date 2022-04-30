import { useEffect, useState } from "react";
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';

export const useFetchingCards = (fetchUrl, cardComponent, callback) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [cards, setCards] = useState();
    const handler = async () => {
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
                const cards = data.map(card => {
                    return { card, Component: cardComponent };
                });
                setCards(cards);
            }
        } catch (error) {
            setIsLoading(false);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if(!callback){
            handler();
            setIsLoading(false);
        }
    },[])
    return [handler, isLoading, errorMessage, cards];
}