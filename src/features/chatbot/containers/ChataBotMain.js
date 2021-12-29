import React from "react";

export default function ChataBotMain() {
    const some = () => {
        var x = document.getElementById("chatbot");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    };


    return (

        <div><button onClick={() => some()}> 
        <img class="pulsate-bck" style={{ marginLeft: "159px", width: '30%', cursor: "pointer" }}
        src={require("features/common/images/chatbot.png").default} /></button>
        </div>
    )
}