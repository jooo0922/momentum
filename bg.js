'use strict';
/*
이미지가 툭툭툭 끊기면서 로드되는게 아닌, 
이미지가 로드 될 때까지 기다렸다가 모든것을 보여주는 식으로 하려고 함.
그래서 js파일을 새로 만들어서 밖에서 배경 이미지를 가져올 수 있게 하고자 함.
*/

const body = document.querySelector("body");

const IMG_NUMBER = 3; //const에 내가 랜덤으로 돌리기 원하는 만큼의 이미지 '개수'를 지정해놓고!

function paintImage(imgNumber){
    const image = new Image(); 
    // const에 img태그를 넣는 거 같음...
    // Image() 는 기능적으로 document.createElement('img') 와 똑같다. Image(width, height)로 원하는 사이즈로 생성 가능
    // new는 새로운 오브젝트를 만들 때 쓰는 키워드 라는데... 드림코딩에서? 왜 ㅅㅂ 이걸 안알려주냐..


    image.src = `${imgNumber + 1}.jpg`; 
    // image 오브젝트(img태그)에 이미지 소스를 넣는 거. 랜덤넘버는 0,1,2를 받지만 실제 파일명은 1,2,3으로 되어있으니까 +1 해준거. 
    
    image.classList.add("bgImage");

    body.appendChild(image); 
    // 앞줄에서 생성한 image(이 안에 있는 img태그)를 body의 자식 노드 리스트 중 마지막 자식으로 붙인다.
    // 참고로 ParentNode.prepend(); 하면 해당 부모노드에서 첫 자식 노드로 붙인다는 거
}

/*
js에서 random number를 생성하는 방법! 아주 간단
js에 Math(수학)라는 모듈을 활용하면 됨. 항상 'Math' 로 적어야 됨. m을 대문자로. 그래야 정의된 모듈을 사용할 수 있음.
그래서 이 모듈에서 Math.random() 을 사용하면 임의적으로 숫자가 생성됨(0~1사이의 소숫점 단위까지 포함한 숫자들...)
만약 내가 1~5사이에 숫자만 받고 싶다면, Math.random() * 5 를 할것! (0.xxx... ~ 4.xxx... 사이의 숫자가 나올 것이다.)
근데 나는 소숫점 자리는 필요없다?
그러면 Math.floor() / Math.ceil() 을 사용할 것. floor는 소수점 이하 버림, ceil은 소수점 이하 올림해주는 함수!

우리는 3개의 이미지로 할거니까, 소수점 이하는 버린 3개의 숫자만 받으면 되겠지?
그러면 Math.floor(Math.random() * 3) 해주면 된다!
*/
function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER); // 즉, 이미지 개수만큼의 랜덤 숫자들을 생성하는 함수가 되겠지!
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();