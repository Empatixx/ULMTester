import QUESTIONS from './questions.json';

let _testDone = false;

function Test({questions}){
  const questionsComponents = questions.map(q => <Question key={q.id} question={q}/>);
  return (
  <div className="test" onClick={selectOption}>
    {questionsComponents}
    <SubmitButton/>
  </div>
  );
}
function Question({question}){
  const options = question.options.map(opt =>{
    const [id, text] = opt;
    const optionId = `option--${question.id}--${id}`;
    return <Option key={id} value={id} text={text} id={optionId}/>
  });
  const questionId = `question--${question.id}`;
  return (
    <div className="question" id={questionId}>
      <h2 className="question__message">{question.message}</h2>
      <div className="question__options">
        {options}
      </div>
    </div>
  );
}
function Option({text,id,value}){
  return (
  <>
    <p className="question__option new-line" id={id} value={value}>
      {text}
    </p>
  </>
  );
}
function selectOption(e){
  if(_testDone) return;
  if(e.target.classList.contains("question__option")){
    e.target.classList.toggle("select");
  }
}
function SubmitButton(){
  return (
    <button className="submit-button" onClick={checkCorrectAnwers}>Submit</button>
  );
}
function checkCorrectAnwers(e){
  e.preventDefault();
  const questions = document.getElementsByClassName("question");
  for(let i = 0; i < questions.length; i++){
    const options = questions[i].getElementsByClassName("select");
    for(let j = 0; j < options.length; j++){
      const value = Number(options[j].getAttribute("value"));
      const questionId = questions[i].getAttribute("id");
      const shortId = Number(questionId.split("--")[1]);
      const questionData = QUESTIONS.find(q => q.id === shortId);

      if(!questionData.answers.includes(value)){
        options[j].classList.toggle("wrong");
      } else {
        options[j].classList.toggle("correct");
      }
    }
  }
  e.target.classList.add("hide");
  window.scrollTo({ top: 0, behavior: 'smooth' });
  _testDone = true;
}
export default function Tester(){
  return <Test questions={QUESTIONS} />
}
export function Questions(){
  const questionsComponents = QUESTIONS.map(q => <Question key={q.id} question={q}/>);
  return (
  <>
    {questionsComponents}
  </>
  );
}