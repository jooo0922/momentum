'use strict';

//다른 JS문서에서 const form 을 쓰고 있으므로 다른걸 써줘야 함. 왜? const는 값이 변하면 안되니까!
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"), //항상 object에는 태그명이 바로 들어온다거나 하면 안됨!! const에 집어넣어서 그걸로 접근해야지!
    toDoList = document.querySelector(".js-todoList");

const TODOS_LS = 'toDos';

let toDos = []; // 투두리스트 항목이 많아질 수 있으니 이를 저장하려면 array 방식이 적합하겠지

//버튼을 눌렀을 때 호출해서 해당 리스트 삭제를 수행해줄 함수
function deleteToDo(event){
    const btn = event.target; //event.target은 event가 전달한 객체에 대한 참조 즉, 이벤트가 click이면 클릭된 요소를 반환해서 사용할 때 씀..
    const li = btn.parentNode;
    toDoList.removeChild(li); //a.removeChild(b) a의 자식노드 중 b를 삭제하는 함수
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //parseInt() 는 li.id가 string으로 나와서 이걸 숫자로 바꿔주는거
        //이 함수는 filter함수에 의해 삭제된 li의 id와 다른 toDo의 id들(얘내들은 true니까)을, 즉 삭제되지 않은 애들을 체크해서 반환해주는거!
        //즉, toDo.id !== li.id; 이라는 조건문이 true인 toDo만 반환하고, 반환한 애들끼리의 array를 만들어주는거!
    }); 
    //filter는 마치 forEach에서 처럼 array의 모든 item을 통해 함수를 실행하고,
    //true값인 아이템들만 가지고 새로운 array를 만드는거
    //cleanToDos와 filter가 하는 것은 'fiterFn'이 체크가 된 아이템들의 array를 주는거다.
    toDos = cleanToDos
    saveToDos();
}

//saveToDos()는 painToDo()에서 toDos에 array 방식으로 저장한 데이터들을 가져와서 
//input을 입력해서 리스트를 추가할 때마다 갱신된 toDos array에 담긴 object 데이터들을 로컬 스토리지에 저장하려고 만듦.
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
// 그런데 로컬 스토리지는 모든 데이터를 string으로 저장하려고 함.
// 그래서 실제로 local storage에 검색해봐도 object라는 문자열밖에 안나옴.
// 따라서 처음부터 toDos에 있는 object들을 string으로 바꿔주는게 JSON.string임. 나중에 다 설명해준다 함. 

function paintToDo(text){
    const li = document.createElement("li"); // 이거는 html 문서에 접근해서 새로운 태그를 '생성'하는거! 
    const delBtn = document.createElement("button"); // 추가된 리스트 옆에 삭제버튼도 만들거임!
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    const newId = toDos.length + 1;
    li.appendChild(delBtn);
    li.appendChild(span); // a.appendChild(b) 이거는 b를 child element로 a를 father element로 해서 a안에 넣는거
    li.id = newId // newID 안에 있는 값을 li에 id로 부여하는 함수겠지? 나중에 버튼 눌러서 어떤 li를 지워야할지 알아야하니까 id를 각각 부여하는거!
    toDoList.appendChild(li); // 즉, 원래 ul태그 안에 js문서에서 생성한 li 태그(span과 button도 생성되서 자식으로 들어간)를 넣는거!
    const toDoObj = {
        text: text,
        id: newId // array.length는 해당 array에 들어있는 element의 개수를 반환해줌
    };
    toDos.push(toDoObj); 
    /* 
    array.push(object) 이 구조인데, 이러면 object안에 여러개의 데이터가 아닌, 
    toDoObj라는 object 덩어리 하나가 array 목록에 들어가는 거로 인식해서
    array.length는 1로 반환이 되겠지!
    */ 
    saveToDos(); // 당연히 toDos 에 push한 다음 로컬에 저장하는 함수를 호출해야겠지? 로컬에 저장할 toDoObj들이 push되어있어야 하니깐! 
}
//투두를 왜 이런식으로 저장하느냐? 로컬 스토리지에도 투두를 저장해둬야 하기 때문!

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; 
    //투두리스트는 여러개 입력해야 하니까 한 번 입력한 input값은 input창에서 없애고 다음 input값을 받을 준비를 해야지!
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);

    //greeting과 달리 todo는 투두리스트 입력창을 항상 띄워놓은 상태이니까 showing/hiding을 안해도 되기 때문에
    //null값이 아닐때에만 뭘 실행하면 되겠지. null값일 때는 아무것도 안해도 됨.
    if(loadedToDos !== null){ 

        //JSON = 'JavaScript Object Notation': 데이터를 전달할 때, 자바스크립트가 그걸 다룰수 있게 object로 바꿔주는 기능
        //그래서 js의 object->string 또는 string->object로 변환해주는 기능!
        const parsedToDos = JSON.parse(loadedToDos); //이거는 로컬 스토리지에 string으로 저장된걸 다시 object로 변환하는거
        
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text); // toDo라는 각각의 오브젝트 안에서도 text라는 lable이 붙은 데이터만 paintToDo() 를 실행시켜라!
        });
        // array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜주는 함수...
        //why need? parsedToDos에 담긴 object들을 paintToDo()를 각각 실행시켜서 화면에 뿌려주고 싶거든...
        //forEach() 괄호 안에 함수를 호출하는게 아닌 바로 그 안에서 함수를 만들어서 array안에 각각에 대해 실행시킬 것
        //toDo는 바로 그 '각각의 object들'이 오게 될 argument에 임의로 이름을 붙인거임.
        // 그래서 array.forEach() 는 array를 위한 함수임. array, string, object 모두 다 function을 가지고 있다.
        // array가 있고, 그 안에 있는 각각에 대해 뭔가를 해줄때. 자바스크립트가 그걸 도와줄거고. 그런게 forEach() 인거지.
    }
}
function init(){
    loadToDos(); //greeting이랑 비슷. 뭔가를 load 해야하는데, 그건 로컬 스토리지에서 온거니까.
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

/*
전체적으로 기억해야 할 건 array.filter(), array.forEach()
이것들은 list에 있는 모든 item들을 위한 함수를 실행시키는거야
*/