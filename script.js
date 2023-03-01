const secendPage = document.querySelector('.secend-page');
const btns = document.querySelectorAll('.buttons li');
const input = document.querySelector('.secend-page input');
const fristPage = document.querySelector('.frist-page');
const restart = document.querySelector('.restart');
const msg = document.querySelector('.msg');
const confm = document.querySelector('.confirm');
const lockbtn = document.querySelector('.lock');


let pin;
let wrongPin = '';
let = time = 15;

btns.forEach((btn) => {
  btn.addEventListener('click',()=> {
    pass(btn.innerText)
  });
});


function laod(){
  pin = localStorage.getItem('pin');
  if (pin) {
    confm.style.display = 'none';
  }else {
    msg.innerText = 'Enter Your New Pin';
  }
  confm.children[0].disabled = true;
}
laod();


function pass(btn){
  if(btn == 'back') {
      input.value = input.value.slice(0,-1);
  }else {
    input.value += btn;
  }
  //checking input value and local
  //pin are match or not
  if(input.value == pin) {
    secendPage.style.display = 'none';
      fristPage.style.display = 'flex';
      wrongPin = '';
      restart.style.display = 'none';
      return;
    };
    //check for wrong pin
    if(pin && wrongPin < 4) {
      if(input.value.length > pin.length - 1) {
        input.value = '';
        wrongPin++;
        msg.innerHTML = 'Wrong Pin';
      };
    };
    /*check how many time enter wrong pin if three time then call wrong funcrion*/
    if (wrongPin == 3) {
      restart.style.display = 'block';
      wrong();
      wrongPin = '';
      runTime();
    };
    
    if(input.value.length >= 4){
      confm.children[0].disabled = false;
    }else {
      confm.children[0].disabled = true;
    };
    
 }

confm.addEventListener('click',confrim)
//set pin
function confrim(){
  const done = confirm('Are You Sure?');
  
   if(done) {
    secendPage.style.display = 'none';
    fristPage.style.display = 'flex';
    localStorage.setItem('pin', input.value)
    input.value = '';
    laod()
  };
}


lockbtn.addEventListener('click',look);
//power off btn
function look(){
  confm.style.display = 'none';
    fristPage.style.display = 'none';
    msg.innerText = 'Enter Your Pin';
  input.value = '';
  secendPage.style.display = 'flex';
  confm.style.display = 'none';
  fristPage.style.display = 'none';
  msg.innerText = 'Enter Your Pin';
}
//if pin is wrong then disable all btns for 15 secend
function wrong() {
  restart.style.display = 'block';
  btns.forEach(btn => {
    btn.style.pointerEvents = 'none';
  });
}

//after entering wrong pin then 
//start a timer of 15 secends
let interval;
function runTime(){
  interval = setInterval(()=>{
    msg.innerText = `Wait For ${time < 10 ? '0' + time : time}`;
    time--;
    if (time < 0) {
      clearInterval(interval)
      btns.forEach(btn => {
        btn.style.pointerEvents = 'auto';
      });
      //after 15 secends update the time and msg
      msg.innerText = 'Try Again';
      time = 15;
    }
  },1000);
}

restart.addEventListener('click',reset);
//reset pin when 3 time enter wrong pin
function reset(){
  restart.style.display = 'none';
  localStorage.removeItem('pin');
  confm.style.display = 'flex';
  btns.forEach(btn => {
    btn.style.pointerEvents = 'auto';
  });
  clearInterval(interval);
  time = 15;
  msg.innerText = 'Enter Your New Pin';
  laod();
}

//kshapi