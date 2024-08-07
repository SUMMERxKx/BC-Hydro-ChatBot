import './Main.css'
import { assets } from '../../assets/assets'
import { useContext, useEffect } from 'react'
import { Context } from '../../context/Context'

const Main = () => {
  //Future Improvements
  //Add onclick on buttons to use that prompt 
  //Add react typing instead of using setTimeout for more efficiency 
  //Make a dark mode switch
  //Customize the whole ui to make it a custom ai bot rather than a clone
  
  //Any more improvements add comments below this comment

  const prompt1 = "Suggest beautiful places to see on an upcoming road trip"
  const prompt2 = "Briefly summarize this concept: urban planning"
  const prompt3 = "Brainstorm team bonding activities for out work retreat"
  const prompt4 = "Imporve the readability of the following code"

  const {onSent,recentPrompt,showResult,resultData,setInput,input,loading} = useContext(Context)

  const  handleEnterKey = async (event) =>{
    if (event.key === 'Enter') {
        this.form.submit();
    }
  }

  useEffect(() =>{
    window.addEventListener('keydown',handleEnterKey);

    return () =>{
      window.removeEventListener('keydown',handleEnterKey);
    };

  }, []); // Empty dependency array ensures this effect runs once on mount


  //Used form to fix the bug just used handle submit on the form to fix it 
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    await onSent();
  }
  
  
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
                <p>{prompt1}</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
                <p>{prompt2} </p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
                <p> {prompt3} </p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
                <p>{prompt4} </p>
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
      
        <form onSubmit={handleSubmit} className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    {input? <button style={{border: 'none'}} type="submit"><img src={assets.send_icon} alt="" /></button>:null}
                </div>
            </div>
            <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check its resposes. Your privacy and Gemini Apps
            </p>
            </form>
        </div>
    </div>
  )
}

export default Main
