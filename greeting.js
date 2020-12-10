'use strict';
/* 
html input에 내 이름을 입력하면
입력받은 값을 저장한 뒤 화면에 출력해주는 걸 js로 만들려면?

local storage를 배워보자
이건 작은 정보를 내 유저 컴퓨터에 저장하는 방법
f12 > Application > Storage > Local Storage > Value
에 보면 true/false, 문자열, 숫자 등 작은 자바스크립트 정보들이 저장되어 있는 걸 볼수있음.
이걸로 이것저것 장난을 쳐보는 거지!
*/
//참고로 null 은 마치 true/false 같은거. 존재하지 않음. undefined, cannot find 같은거.
/*
localStorage.getItem() 얘는 LS에서 해당 값을 가져오는 함수
locakStorage.setItem("key",value) 얘는 해당 키에 해당 값을 저장하는 함수
*/
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

function saveName(text){
    localStorage.setItem(USER_LS, text);
}
/*
loadName()은 기본적으로 LS에서 사용자 이름값을 불러와서 if구문을 실행시키는 함수.
즉, hi 사용자 이름~ 나왔다고 해도, 사용자 이름이 실제 LS에 저장된 게 아니다.
LS에 저장할 수 있는 유일한 방법인 localStorage.setItem을 안썼잖아!
위에는 그걸 저장하는 함수를 만들어본거.  
*/

/* 
아래 const는 f12 > Application > Local Storage에
currentUser라고 작성해서 새로운 키를 생성하고 나서  
거기에 있는 value를 불러오려고 만든 const 같다. 
그니까 키에도 해당 string을 따로 작성해놔야 loadName()함수에 있는
localStorage.getItem(USER_LS)로 value를 불러와서 실행시키든 뭘하든 할 수 있다는 거지!
*/
const USER_LS = "currentUser", 
SHOWING_CN = "showing";

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value; 
    //input이 가질 수 있는 여러 속성들(type, placeholder, class 등)을 컨트롤 할 수 있는 함수들 중 하나.
    //그 중에서도 value는 input의 값을 얻을 수 있는 함수. 
    paintGreeting(currentValue);
    saveName(currentValue);
}
/* 
event의 preventDefault

form을 submit하는 event가 발생하면
마치 거품처럼 event가 계속 위로 올라가서 
다른 모든 것들이 event에 반응하게 됨.
document까지 올라감. 결국 document는 다른 곳으로 가게 됨.
즉, 페이지가 새로고침 되는 거야.

여기서 우리는 이 event의 기본 동작(default)를 막고 싶은거지.
그럴 때 쓰는게 preventDefault

이렇게 하면 input에 자꾸 뭘 입력해서 enter를 치면
입력한 게 사라지는(submit event의 기본동작)걸 방지할 수 있음.
*/

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        // no user
        askForName();
    } else {
        // user exists
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();

/*
근데 처음 웹사이트에 들어가면 askForName() 이 실행되고,
input값을 받아서 브라우저에도 뿌려주고, LS에도 저장이 되겠지만,
그 이후에도 새로고침하면 LS에 이미 ipout값이 저장이 된 상태이기 때문에
currentUser가 null 값이 아닌 상태가 됨.
그러니 온리 paintGreeting() 만 실행되서 인풋창은 안보이게 되고,
그냥 헬로 주영~ 이거밖에 안보임.

이럴땐 LS에서 key값과 value값을 지우면 처음부터 시작해서 인풋값을 받는 창이 다시 나올거임!

이게 바로 사용자의 이름을 기억하게 하는 방법!
*/

/*
참고로, local storage는 URLs를 기초로 동작함
예를 들어, 이 웹사이트는 Facebook이 거기에 넣은
local storage를 가져올 순 없음.
*/