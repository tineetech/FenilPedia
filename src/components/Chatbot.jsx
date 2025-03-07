import { Send, SendIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import RequestToFinesAi from '../utils/RequestToFinelAi';


const LoaderAi = (
    <div className="bubble bubble-ai rounded-2">
      <span className="sender sender-ai">FinelAi</span>
      <div className="mess-greenai">
        <div className="loader"></div>
      </div>
    </div>
  );

const Chatbot = () => {
    const { requestAi } = RequestToFinesAi();
    const [isClick, setIsClick] = useState(false)
    const [disButton, setDisButton] = useState(false);
    const inputRef = useRef();
    const chatBodyRef = useRef();
    const [chatHistory, setChatHistory] = useState([
      {
        hideInChat: true,
        role: "model",
        text: 'mulai sekarang kamu adalah asisten virtual saya di bisnis FenilPedia, yang menyediakan jasa layanan kebutuhan sosmed seperti suntik followers dan like dan semacamnya, layanilah pelanggan dan hindari jawaban yang keluar dari konteks aturan.',
      },
    ]);  
    const handleSubmitChat = async (e) => {
        e.preventDefault()
        const userMess = e.target.chat.value
        if (!userMess) return alert('silakan isi chat dulu')
        inputRef.current.value = "";

        setChatHistory((history) => [...history, { role: "user", text: userMess }]);

        // Add loader to chat history temporarily
        setChatHistory((history) => [...history, { role: "model", isLoader: true }]);
        
        try {
            setTimeout(async () => {
              const res = await requestAi([
                ...chatHistory,
                { role: "user", text: `By using the details given above and only using Indonesian please answer this question: ${userMess}` },
              ]);
      
              setDisButton(false);
              setChatHistory((prev) =>
                prev.map((msg) =>
                  msg.isLoader ? { role: "model", hideInChat: false, text: res, isError: false } : msg
                )
              );
            }, 2000);
          } catch (error) {
            setChatHistory((prev) =>
              prev.map((msg) =>
                msg.isLoader ? { role: "model", hideInChat: false, text: error.message, isError: true } : msg
              )
            );
          }
        console.log(e.target.chat.value)
    }

    
    useEffect(() => {
        chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }, [chatHistory]);
  return (
    <div className='fixed items-center flex justify-center top-0 left-0 w-screen h-screen z-60'>
        <div className='bg-white rounded-lg border border-gray-300 overflow-hidden shadow w-[70px] h-[70px] absolute right-10 bottom-10 cursor-pointer' onClick={() => setIsClick(!isClick)}>
            <img src="/images/chatbot.jpg" className='' alt="" />
        </div>
        <div className={`absolute flex flex-col container right-10 bottom-30 shadow w-[250px] h-[350px] bg-gray-100 rounded-md ${isClick ? "" : 'hidden'}`}>
            <div className='w-full h-full relative'>
                <div className='px-5 py-3 w-full border-b border-gray-200 text-center'>
                    <span className='font-bold'>Chatbot</span>
                </div>
                <div className='w-full flex flex-col gap-2 body-chat-greenai px-2 overflow-y-auto' ref={chatBodyRef}>
                {chatHistory.length > 1 ? (
                    chatHistory.map((chat, index) => {
                        if (chat.isLoader) {
                            return <div key={index}>{LoaderAi}</div>;
                        }
                        return (
                        !chat.hideInChat && (
                            <div
                            key={index}
                            className={`bubble bubble-${chat.role === "model" ? "ai" : "user"} ${
                                chat.isError ? "text-danger" : ""
                            } rounded-2`}
                            >
                            <span
                                className={`sender sender-${chat.role === "model" ? "ai" : "user"}`}
                            >
                                {chat.role === "model" ? "FinelAi" : "User"}
                            </span>
                            <p className={`mess-greenai ${chat.role !== "model" ? "!text-white" : ""}`}>{chat.text}</p>
                            </div>
                        )
                        );
                    })
                    ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="border-b border-gray-300 pb-2">Ayo Tanya dengan FinelAi!</span>
                    </div>
                    )}
                </div>
                <form onSubmit={(e) => handleSubmitChat(e)} className='absolute flex bottom-0 w-full h-auto  justify-center gap-1 items-center mb-2'>
                    <input type="text" ref={inputRef} name='chat' className='w-auto bg-white hover:border-0 rounded-md h-[35px] p-2' placeholder='Tanya Ke chatbot kami..' />
                    <button disabled={disButton ? true : false} type='submit' className='bg-blue-500 flex items-center justify-center rounded-md text-white w-[35px] h-[35px] cursor-pointer'>
                        <SendIcon size={20} />
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Chatbot