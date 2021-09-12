// ovo se koristi kod modala, checkboxa - gde god je potrebno da se neka vrednost togluje ili zakljuca
// ukoliko se samo pozove exportovana fja toggleValue bez arg radi kao toggle true/false, false/true
// ukoliko se pozove sa argumentom true/false zakljucava vrednost na vrednost argumenta  
// https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/1-useToggle/useToggle.js
import { useState } from "react"

export default function useToggleValue(defaultValue) {
    const [value, setValue] = useState(defaultValue)

    function toggleValue(value) {
        setValue( currentValue => 
            typeof value === 'boolean' ? value : !currentValue
            )
    }

    return [value, toggleValue]
}