// https://isamatov.com/useful-react-hooks/#
import {useState, useCallback} from 'react';

const useAsync = ({asyncFn}) => {

    const [fetchedData, setFetchedData] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const execute = useCallback(async (...params) => {
        try {
            const {data} = await asyncFn(params);
            setFetchedData(data.data);
        } catch (err) {
            if (err.response) setErrorMsg();
            setErrorMsg(err.message);
        }
    }, [asyncFn]);

    return {execute, fetchedData, errorMsg};
}

export default useAsync;