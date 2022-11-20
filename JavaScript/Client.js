const socket = io('http://127.0.0.1:8000') 


//GET DOM elements in recpective JS variables
const form  = document.getElementById('send_container');
const messegeInput = document.getElementById('input_messege');
const messegeContainer = document.querySelector('.container');

var audio = new Audio('Ting.mp3'); // Will import audio

// Function Which will append event to the container
const append = (messege,position)=>{
    const messegeElement = document.createElement('div');
    messegeElement.innerHTML = messege;
    messegeElement.classList.add('messege');
    messegeElement.classList.add(position);
    messegeContainer.append(messegeElement);
    if(position == 'left'){
        audio.play();
    }
}

// Ask new user for name
const name = prompt("Enter Your Name To Join");
socket.emit('new-user.joined',name);

//If new user joins let the other users know
socket.on('user-joined', name => {
    append(`${name} Joined The Chat`,'right')
})

//It will show the messeges coming form the server
socket.on('receive', data => {
    append(`${data.name} : ${data.messege}`,'left')
})

// If someone left the chat it will give notification to every other user
socket.on('left', name => {
    append(`${name} left the chat` , 'left')
})

//Function of send function
form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const messege = messegeInput.value;
    append(`You: ${messege}`,'right');
    socket.emit('send',messege);
    messegeInput.value = ''
})