// https://isamatov.com/useful-react-hooks/#
import {useState, useCallback} from 'react';
import axios from 'axios';

export const useAxiosRequest = () => {

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const init = () => {
        setProducts([]);
        setMessage('');
        setIsError(false);
    }

    const execute = async (params) => {
        init();

        try {
            const {data} = await axios(params);
            setProducts(data.data);
            setMessage(data.message);
            //console.log(data);
        } catch (err) {
            if (err.response) setMessage(err.response.data.message);
            setMessage(err.message);
            setIsError(true);
        }
    };
    // const execute = useCallback(async (...params) => {
    //     try {
    //         const {data} = await asyncFn(params);
    //         setProducts(data.data);
    //     } catch (err) {
    //         if (err.response) setErrorMsg();
    //         setErrorMsg(err.message);
    //     }
    // }, [asyncFn]);

    return [execute, {products, message, isError}];
}
