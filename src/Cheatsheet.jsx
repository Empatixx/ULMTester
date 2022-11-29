import QUESTIONS from './questions.json';
import { Questions } from './Tester';
import { useEffect } from 'react';

export default function Cheatsheet(){
  useEffect(() => {
    let questions = document.getElementsByClassName("question");
    for(let i = 0; i < questions.length; i++){
      const questionId = questions[i].getAttribute("id");
      const shortId = Number(questionId.split("--")[1]);
      const questionData = QUESTIONS.find(q => q.id === shortId);

      const correctAnwers = questionData.answers;
      const options = questions[i].getElementsByClassName("question__option");
      for(let j = 0; j < options.length; j++){
        const value = Number(options[j].getAttribute("value"));
        if(correctAnwers.includes(value)){
          options[j].classList.add("correct");
        }
      }
    }
  }, []);
  return (
  <div className="cheatsheet">
    <SearchBar/>
    <Questions questions={QUESTIONS} />
  </div>
  );

}
function SearchBar(){
  return (
  <div className="search-bar-div">
    <input onKeyUp={findMatch} type="text" className="search-bar" placeholder="Search" />
  </div>
  );
}
function findMatch(e){
  const search = e.target.value;
  const questions = document.getElementsByClassName("question");
  for(let i = 0; i < questions.length; i++){
    const question = questions[i];
    const messageElement = question.querySelector(".question__message");
    const questionText = messageElement.innerText;
    if(questionText.toLowerCase().includes(search.toLowerCase())){
      question.classList.remove("hide");
      highlight(messageElement, search);
    } else {
      question.classList.add("hide");
    }
  }
}
function highlight(element, search){
  let innerText = element.innerText.slice().toLowerCase();
  const original = element.innerText;
  if(innerText.includes(search.toLowerCase())){
    const index = original.indexOf(search);
    const start = original.substring(0, index);
    const searchedWord = original.substring(index,index+search.length);
    const end = original.substring(index + search.length);
    const highlighted = start + "<span class='highlight'>" + searchedWord + "</span>" + end;
    element.innerHTML = highlighted;
  }
}
