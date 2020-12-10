'use strict';

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
//element.querySelector("") 는 element의 자식중에서 해당 ".class", "#id", "tag"에 해당하는 자식요소를 선택함.

/*
const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1"); 
이런식으로 써도 됨!
*/
/*
`${value}` = ${} 안에서 처리된 결과값을 문자열로 자동 변환한다.
*/

function getTime(){
    const date = new Date(); 
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
    }`; 
}
//innerText는 object 안에 텍스트를 넣기 위한 함수. 문자열은 `` 백틱 사용이 효율적!
/*
0~9까지를 01,02,03... 이렇게 표현하고 싶다.
그럼 만약 숫자가 10보다 작으면 그앞에 0을 넣으면 됨
이걸 위해 tenary operator(삼항연산자) 즉, 작은 if가 필요함.
seconds < 10 ? `0${seconds}` : seconds
seconds가 10보다 작으면 `0${seconds}`를 반환하고, 그렇지 않으면 seconds를 반환해라 라는 뜻 
아주 쉬우면서도 유용하다.
'?'는 일종의 질문 역할. 만약 ~면? true면 ':' 앞에거, false면 뒤에거를 반환하라는 거...
그래서 작은 if라고 하는거지..
*/
/*
여기서 시계가 자동으로 카운팅되려면, date에 넣는 값을 실시간으로 업데이트해야 함.
이걸 하려면 setInterval 함수를 쓸 것
setInterval(function, 1000)  
이 함수는 argument 2개를 받음. 
첫번째는 실행할 함수, 두번째는 함수를 실행할 시간 간격
(millisecond 단위를 사용, 즉 간격을 1초로 하려면 1000이라고 입력해야 한다)
실행할 함수를 호출한 줄 밑에다가 사용할 것!
*/
/*
여기서 new Date(); 라는 문법은 자세히 다루지 않을 것.
이 강좌는 js의 핵심적인 것만 다루기 때문이라고.. 함. 간단히 object 정도라고 생각할 것.
또 코딩 직접 해보기 전에 개발자 도구 콘솔창에서 테스트해보는 것도 좋은 방법.
*/
/*
항상 init이라는 이름으로 형식을 맞춰놓고 init 함수를 쓰고 시작할 것.
이건 위에서 만든 함수들을 원하는 순서대로 함수호출로 때려넣어서 실행, 시작(initiate)하려고 만든 함수
*/
function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();