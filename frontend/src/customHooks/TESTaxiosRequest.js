// https://isamatov.com/useful-react-hooks/#
import {useState, useCallback} from 'react';
import axios from 'axios';


export const useAxiosRequest = () => {

    const [fetchedData, setFetchedData] = useState({});
    const [message, setMessage] = useState('');

    const execute = async (params) => {
        
        try {
            const {data} = await axios(params);
            setFetchedData(data.data);
            setMessage(data.message);
            //console.log(data);
        } catch (err) {
            if (err.response) setMessage(err.response.data.message);
            setMessage(err.message);
        }
    };
    // const execute = useCallback(async (...params) => {
    //     try {
    //         const {data} = await asyncFn(params);
    //         setFetchedData(data.data);
    //     } catch (err) {
    //         if (err.response) setErrorMsg();
    //         setErrorMsg(err.message);
    //     }
    // }, [asyncFn]);

    return {execute, fetchedData, message};
}
