import './Main.css'
import { assets } from '../../assets/assets'
import { useContext, useEffect } from 'react'
import { Context } from '../../context/Context'

const Main = () => {

  const {onSent,recentPrompt,showResult,resultData,setInput,input,loading} = useContext(Context)

  const  handleEnterKey = async (event) =>{
    if (event.key === 'Enter') {
      await onSent();
    }
  }

  useEffect(() =>{
    window.addEventListener('keydown',handleEnterKey);

    return () =>{
      window.removeEventListener('keydown',handleEnterKey);
    };

  }, []); // Empty dependency array ensures this effect runs once on mount

  //Handle enter key needs to be fixed if the api is running smoothly with the onclick at the bottom if this page but when i use the handle
  //enter key it doesnt work if i remove the remove event listner it the handlekey will run multiple times but i dont want that i just
  //want to use it ones but if i use it ones the enter just sends an empty prompt 
  //fix it

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

      {!showResult
      ?<>
        <div className="greet">
            <p><span>Hello, User.</span></p>
            <p>How can I help you today?</p>
        </div>
        <div className="cards">
            <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
                <p>Brainstorm team bonding activities for out work retreat</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
                <p>Imporve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
      </>
      :<div className='result'>
        <div className="result-title">
          <img src={assets.user_icon} alt="" />
          <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
          <img src={assets.gemini_icon} alt="" />
          {loading
          ?<div className="loader">
            <hr />
            <hr />
            <hr />
          </div>
          :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
          }
        </div>
      </div>
    }
      
        
        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    {input? <img onClick={()=> onSent()} src={assets.send_icon} alt="" />:null}
                </div>
            </div>
            <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check its resposes. Your privacy and Gemini Apps
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main
