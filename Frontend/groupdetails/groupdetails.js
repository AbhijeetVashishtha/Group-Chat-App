let token = localStorage.getItem('token');
let addtogroup = document.querySelector('#add-to-group');
let sendmsg = document.querySelector('.sendmsg');
let inputtext = document.querySelector('#input-text');
let allmsgs = document.querySelector('.all-msgs');

addtogroup.addEventListener('click', async () => {
    try{
        let id = window.location.href.split("=")[1];
        console.log('ID is', id);
        let obj = {
            email: emailId.value,
            admin: adminvalue.value
        };
        console.log(obj);
        const response = await axios.post(`http://localhost:3000/content/addparticipant/${id}`, obj, {headers: {'Authorization': token}});
        if(response.status === 200)
        {
            alert(response.data.message);
            emailId.value = '';
            location.reload();
        }
        else{
            throw new Error('SomeThing Went Wrong');
        }
    }
    catch(err){
        console.log(err);
    }
})

sendmsg.addEventListener('click', async () => {
    try{
        let id = window.location.href.split('=')[1];

        let inputvalue = inputtext.value;
        let obj = {
            message: inputvalue
        }
        const response = await axios.post(`http://localhost:3000/content/sendmessage/${id}`, obj, {headers: {'Authorization': token}});
        if(response.status === 200)
        {
            console.log(response.data.message);
            inputtext.value = '';   
        }
        else{
            throw new Error('Not able to send message, Something went wrong');
        }
    }
    catch(err){
        console.log(err);
    }
})

setInterval( async () => {
    try{
        let id = window.location.href.split('=')[1];

        const response = await axios.get(`http://localhost:3000/content/getgrpmessages/${id}`, {headers: {'Authorization': token}});
        if(response.status === 200){
            let len = '';
            for(let i=0;i<response.data.data.length;i++)
            {
                len += `<div>
                <span>${response.data.data[i].username}: </span>
                <span>${response.data.data[i].message}</span>
            </div>`;
            }
            allmsgs.innerHTML = len;
        }
        else{
            throw new Error('Not able to get Messages');
        }
    }
    catch(err){
        console.log(err);
    }
}, 1000);