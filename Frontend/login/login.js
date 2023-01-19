async function login(event){
    try{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        const loginDetails = {
            email,
            password
        }
        console.log(loginDetails);
        const response = await axios.post('http://localhost:3000/user/login', loginDetails)
        alert(response.data.message);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        window.location.href = '..';
    }
    catch(err){
        console.log(JSON.stringify(err));
    }
}