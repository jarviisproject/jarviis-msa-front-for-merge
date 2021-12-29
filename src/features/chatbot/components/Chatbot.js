import ChatBot from "react-simple-chatbot";
import React from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import {  Ask, Ask2, FirstAnswer, ResetMessage } from "./ChatModules";
import 'features/chatbot/style/ChatStyle.scss'

export default function Chat() {
  const some = () => {
    var x = document.getElementById("chatbot");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};
  const dispatch = useDispatch()
  return (
      <div><button onClick={() => some()}> 
        <img class="pulsate-bck" style={{ marginLeft: "159px", width: '30%', cursor: "pointer" }}
        src={require("features/common/images/chatbot.png").default} /></button>
        <div
                        className="chatbotTxT"
                        id="chatbot"
                        style={{
                            display: "none",
                        }}>
           
            <section id="chatApp" class="chatApp">
                <div class="chatApp__loaderWrapper">
                <div className="chatbot">
    <ThemeProvider
      theme={{
        background: "FFF9F9",
        fontFamily: "Helvetica Neue",
        headerBgColor: "wheat",
        headerFontColor: "black",
        headerFontSize: "15px",
        botBubbleColor: "#D6E5FA",
        botFontColor: "black",
        userBubbleColor: "#fff",
        userFontColor: "#4a4a4a",
      }}
    >
      <ChatBot
        steps={[
          {
            id: 'welcome',
            message: '안녕하세요 JARVIS 에요',
            trigger: 'question',
          },
          {
            id: 'question',
            component: <FirstAnswer />,
            asMessage: true,
            trigger: 'userinput',
          },
          {
            id: 'userinput',
            user: true,
            trigger: 'answer'
          },
          {
            id: "answer",
            component: <Ask />,
            asMessage: true,
            trigger: 'userinput'
          },
        ]}
        botAvatar={require("../data/jarvis.png").default}
        userAvatar={require("../data/user.png").default}
      />
    </ThemeProvider>
    </div>
                   




                   
                    <div class="chatApp__loader"></div>
                </div>
            </section>
            </div>
       
   
    </div>
  );
};
