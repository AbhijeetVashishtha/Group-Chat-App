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
        setInterval(() => {
            fetchMessages();
        },1000)
    }
    catch(err){
        console.log(err);
    }
});

async function fetchMessages() {
    try{
        const res = await axios.get('http://localhost:3000/message/fetchmessage');
        if(res.status === 200){
            const messages = res.data.message;
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
        messages.forEach((message) => {
            chats.innerHTML += message.message + `<br>`;
        }); 
    }
    catch(err){
        console.log(err);
    }
}