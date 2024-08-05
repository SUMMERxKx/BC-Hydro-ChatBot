import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
     
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const typingEffect = (index,nextword) =>{

    }
    
    const onSent = async(prompt) => {
        // setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(true)
        const response = await run(input)
        let responseArr = response.split("**");
        let newResponse;
        for (let i = 0; i < responseArr.length; i++) {
            if(i === 0 || i %2 !=1){
                newResponse += responseArr[i];
            }
            else{
                newResponse += "<b>"+responseArr[i]+"<b>"
            }
            
        }
        setResultData(newResponse)
        setLoading(false)
        setInput("")
    }
    
    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider