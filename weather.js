'use strict';

/*
일단 날씨정보를 불러오려면
현재 위치가 어딘지 알아야 그 위치의 날씨정보를 불러올 수 있겠지?
그러니 위치정보에 접근해서 그 값(즉 위도와 경도)을 가져오는 함수를 일단 먼저 만들기로!
*/
const weather = document.querySelector(".js-weather");

const API_KEY = "36fc1f3ece9ee310d05c4a3a67277bd3";
const COORDS = 'coords';

/*
어떻게 js를 이용해 특정 url(날씨 웹사이트에 있는 API call)을 호출할 수 있나?
js가 웹사이트로 request를 보내고 응답을 통해 데이터를 얻을 수 있는데
가져온 데이터를 refresh없이도 내 웹사이트에 적용가능!
새로고침 하지 않아도 실시간으로 데이터를 가져올 수 있도록 함수를 만들어 본 것!
*/
function getWeather(lat, lon){
    /*
    데이터를 얻는 방법은 간단하다. fetch를 사용할 것
    fetch()안에는 가져올 데이터, 즉 url이 들어가면 됨
    앞에 http:// 넣어주고, 따옴표가 아닌 백틱을 사용할 것!
    lat과 lon은 number이므로, 처리된 값을 string으로 변환해주는 템플릿 리터럴 &{value} 을 사용할 것
    App ID를 끝에 추가할 것 

    이 상태에서 개발자도구 > 네트워크 탭(우리가 request한 내용을 보여준다!)에서 보면
    fetch타입으로 request가 등록된 것을 볼 수 있을것이다. 
    거기에 필요한 데이터가 있으니 해당 name을 클릭해서 확인!

    근데 여기 나온 데이터들의 단위가 우리가 익숙하게 쓰던거랑 좀 다르니까
    Celsius(섭씨)단위를 쓰려면 units=metric 을 url에 추가하라고 웹사이트에 나와있음.
    이런식으로 수정해서 다시 확인해보자
    */
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃ @ ${place}`; 
        // json 오브젝트에서 가져온 number를 string처리해서 span.js-weather태그에 text로 넣는거!
    }); 
}
    //then() 은 데이터가 완전히 넘어왔을 때 ()안에 함수를 호출하는 함수
    //fetch가 완료되서 날씨 정보가 다 넘어올 때까지 기다려야 하기 때문에 then을 사용한거다!
    /*
    호출할 함수안의 변수 response 안에 있는 데이터들중에
    json데이터만 받고자 함. 저 웹사이트 url에서 필요한 건 json데이터임.
    */
    /*
    그 뒤에도 역시 json데이터만 받아올때까지 기다렸다가 다 받고나서 함수를 호출하기 위해 then을 썼다.
    이런식으로 데이터를 모두 가져올때까지 시간이 걸릴 경우 then() 함수를 써서 다 가져오게 하고나서
    그 안에 새로운 함수를 호출하는 식으로!
    */
    /*
    만약에, json데이터 중에서도 뭐 온도만 가져오고 싶다.
    그럼 console.log()로 콘솔창에 찍어봐서 json 데이터 오브젝트가 어떻게 구성되어있는지 확인해보면 됨.
    내가 원하는 데이터에 붙어있는 lable을 json.lable 이렇게 하면 되니까!
    이런식으로 콘솔창에 object를 찍어서 그 안에 내용물들을 확인해보면서
    .lable 이런식으로 원하는 데이터만 골라서 가져오는 방법에 익숙해지자!!
    */

function saveCoords(coordsOBJ){
    localStorage.setItem(COORDS, JSON.stringify(coordsOBJ)); 
    // 로컬 스토리지에는 string으로만 저장 가능하니 JSON으로 변환하는거 알지?
}

/*
내가 만든 웹사이트가 위치정보 접근하는 걸 허용하면
handleGeoSucces항수가 실행됨.
console.log(position)으로 하면
그에 따라 콘솔창에 position 오브젝트 안에 반환된 위치정보 값이 콘솔창에 찍힘.
이거를 계속 아래로 펼쳐서 그 안에 coords, 또 그안에 latitude, longitude 값을 점찍어서 
이 함수 안에서 불러서 const에 저장해두고 쓰는거지!
*/
function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsOBJ = {
        latitude: latitude,
        longitude: longitude 
        /*
        이런식으로 객체의 변수 이름과 key 이름을 같게 저장할때는 그냥 
        latitude, 
        longitude
        이렇게 써도 됨.
        */
    };
    saveCoords(coordsOBJ);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

// 좌표를 요청하는 함수. navigator API를 사용할 예정!
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError); 
    //이 함수는 2개의 requirements가 있어야 함.
    //첫째는 좌표를 가져오는 데 성공했을때 처리하는 함수
    //둘째는 좌표를 가져오는 데 실패했을때 처리하는 함수
    //이런 함수에 대한 정보나 구조같은거는 MDN으로 찾아봐도 되고, 마우스 hover하면 간략설명도 나옴.
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        /* 
        여기에 getWeather() 함수를 호출할 것임!
        이 날씨정보를 가져다쓰려면
        OpenWeatherMap 이라는 사이트에 가입해서
        API key를 가져온 다음 js파일 최상단에 달아놔야 함.
        다른 서버의 API에서 데이터를 가져와야 하는거지

        API (Application Programming Interface)
        다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단
        이런 API는 특정 웹사이트로부터 데이터를 얻거나 컴퓨터끼리 소통하기 위해 고안된 것.
        
        이 사이트에서는 API를 공짜로 사용하라고 제안함. 이걸 살펴보면
        우리가 로컬 스토리지에 저장된 string 데이터처럼 그냥 string 데이터가 저장되어 있음.
        
        이것들은 그냥 문자(string)로 된 자바스크립트 object라고 보면 된다.
        즉, 이 웹사이트에 들어가서 거기 있는 API 주소를 입력하면
        날씨 정보를 찾아볼 수 있고, 이렇게 object로 된 날씨 데이터를 얻을 수 있다는 얘기!

        API call 밑에 있는 url들을 봐라! 여기에 각각의 값을 넣으면 string으로 된 object 정보를 얻을 수 있음.
        우리는 위도와 경도값을 알고 있으니
        By geographic coordinates 에 있는 API call을 살펴볼 것!
        */

        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();