async function sendMessage(event) {
    event.preventDefault();
    try{
        const token = localStorage.getItem('token');
        const message = document.getElementById('message').value;
        console.log(message);
        const response = await axios.post('http://localhost:3000/message/send',{message: message}, {headers:{'Authorization':token}});
        console.log(response.data.message);
    }
    catch(err){
        console.log('Error while sending message', err);
    }
}


window.addEventListener('DOMContentLoaded', async() => {
    try{
        // setInterval(() => {
        //     fetchMessages();
        // },1000)
        fetchMessages();
    }
    catch(err){
        console.log(err);
    }
});

async function fetchMessages() {
    try{
        let oldMsg = JSON.parse(localStorage.getItem('messages'));
        let lastMsgId;
        if(oldMsg === 0)
        {
            oldMsg = [];
            lastMsgId = 0;
        }
        if(lastMsgId !== 0)
        {
            lastMsgId = oldMsg[oldMsg.length - 1].id;
        }
        console.log('Last Message ID', lastMsgId);
        const res = await axios.get(`http://localhost:3000/message/fetchmessage/?lastMsgId=${lastMsgId}`);
        if(res.status === 200){
            const newmessages = res.data.message;
            let messages = oldMsg.concat(newmessages);
            if(messages.length > 10)
            {
                messages = messages.slice(messages.length - 10, messages.length);
            }
            localStorage.setItem('messages', JSON.stringify(messages));
            showChatToUser(messages);
        }
    }
    catch(err){
        console.log(err);
    }
}

function showChatToUser(messages){
    try{
        const chats = document.getElementById('chat-body');
        chats.innerHTML += '';
        messages.forEach(message => {
            chats.innerHTML += message.message + `<br>`;
        }); 
    }
    catch(err){
        console.log(err);
    }
}