import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();

    const fetching = async ()=>{
        try {
            setIsLoading(true);
            await callback();
        } catch (error) {
            setIsLoading(false);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, errorMessage];
}