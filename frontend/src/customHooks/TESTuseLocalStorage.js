// local storage hook
// bolja verzija https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/8-useStorage/useStorage.js

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);
        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}
