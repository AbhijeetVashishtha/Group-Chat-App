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
        const res = await axios.get('http://localhost:3000/message/fetchmessage');
        console.log(res.data.message);
    }
    catch(err){
        console.log(err);
    }
})