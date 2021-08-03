const start_btn= document.querySelector(".start_btn button");
const info_box= document.querySelector(".info_box");
const exit_btn= info_box.querySelector(".buttons .quit");
const continue_btn= info_box.querySelector(".buttons .restart");
const quix_box= document.querySelector(".quix_box");
const timeCount= quix_box.querySelector(".timer .timer_sec");
const timeLine= quix_box.querySelector("header .time_line");
const timeOff= quix_box.querySelector("header .time_text");
//const welcome_info= document.querySelector(".welcome h3");

const option_list=document.querySelector(".option_list");

//if start button is clicked
start_btn.onclick=()=>{
     info_box.classList.add("activeInfo");
     //welcome_info.classList.add("activeWelcome");

}

//if exit button is clicked
exit_btn.onclick=()=>{
     info_box.classList.remove("activeInfo");
}

//if continue button is clicked
continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
    quix_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}


//getting question 
 let que_count=0;
 let que_numb=1;
 let counter;
 let counterLine;
 let timeValue=15;
 let widthValue=0;
 let userScore=0;

 const next_btn=quix_box.querySelector(".next_btn");
 const result_box=document.querySelector(".result_box");
 const restart_quiz=result_box.querySelector(".buttons .restart");
 const quit_quiz=result_box.querySelector(".buttons .quit");

 restart_quiz.onclick=()=>{
    result_box.classList.remove("activeResult");
    quix_box.classList.add("activeQuiz");
    que_count=0;
    que_numb=1;
    timeValue=15;
    widthValue=0;
    userScore=0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.classList.remove("show");
    timeOff.textContent="Time left";
    
 }

 quit_quiz.onclick=()=>{
     window.location.reload();
 }

 //if next button clicked
 next_btn.onclick=()=>{
    if(que_count < questions.length -1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display= "none";
        timeOff.textContent="Time left";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed.");
        ShowResultBox();
    }
 }

 function showQuestions(index){ 
     const que_text=document.querySelector(".que_text");
     let que_tag='<span>'+questions[index].numb+". "+ questions[index].question+'</span>';
     let option_tag= '<div class="option">'+questions[index].Options[0]+'<span></span></div>'
                + '<div class="option">'+questions[index].Options[1]+'<span></span></div>'
                + '<div class="option">'+questions[index].Options[2]+'<span></span></div>'
                + '<div class="option">'+questions[index].Options[3]+'<span></span></div>';
     que_text.innerHTML=que_tag;
     option_list.innerHTML=option_tag;
     const option= option_list.querySelectorAll(".option");
     for(let i=0; i<option.length;i++){
         option[i].setAttribute("onclick","optionSelected(this)");
     }
 }

let  tickIcon='<div class="icon tick"><i class="fa fa-check"></i></div>';
let  crossIcon='<div class="icon cross"><i class="fa fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);  
    let userAns=answer.textContent;
    let correctAns= questions[que_count].answer;
    let allOptions= option_list.children.length;

    if(userAns==correctAns){
        userScore +=1;
        console.log(userScore);
        answer.classList.add("correct"); 
        console.log("Answer is correct.");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }
    else{
        answer.classList.add("incorrect"); 
        console.log("Answer is wrong.");
        answer.insertAdjacentHTML("beforeend",crossIcon);

        //if answer is incorrect then automtically select correct answer
        for(let i=0; i<allOptions;i++){
            if(option_list.children[i].textContent==correctAns){
                option_list.children[i].setAttribute("class","option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }

    //once user select disabled all options
    for(let i=0;i<allOptions;i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display= "block";
}

 
function ShowResultBox(){
    info_box.classList.remove("activeInfo");
    quix_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText= result_box.querySelector(".score_text");
    if(userScore>3){
        let scoreTag='<span>and Congrats! You got <p>'+userScore+'</p>out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
    else if(userScore>1){
        let scoreTag='<span>and nice, You got <p>'+userScore+'</p>out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
    else{
        let scoreTag='<span>and sorry, You got only <p>'+userScore+'</p>out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 700);
    function timer(){
        timeCount.textContent=time;
        time--;
        if(time < 9){
            let addZero=timeCount.textContent;
            timeCount.textContent= "0"+ addZero;
        }
        if(time<0){
            clearInterval(counter); 
            timeCount.textContent="00";

            timeOff.textContent="Time Off";

            let correctAns= questions[que_count].answer;
            let allOptions= option_list.children.length;

            for(let i=0; i<allOptions;i++){
                if(option_list.children[i].textContent==correctAns){
                    option_list.children[i].setAttribute("class","option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                }
            }
            for(let i=0;i<allOptions;i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display= "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 21);
    function timer(){
        time+=1;
        timeLine.style.width=time + "px";
        if(time>549){
            clearInterval(counterLine);  
        }
    }
}


 function queCounter(index){
    const bottom_ques_conter= quix_box.querySelector(".total_que");
    let totalQuestionCountTag= '<span><p>'+index+'</p>'+'of'+'<p>'+questions.length+'</p>Question</span>';
    bottom_ques_conter.innerHTML= totalQuestionCountTag;
 }