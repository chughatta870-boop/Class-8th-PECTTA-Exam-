const questions = [
  {q: "1. 25% of 200 =?", opts: ["40", "50", "60", "25"], ans: "50", topic: "Percentage"},
  {q: "2. (5)^2 + (12)^2 =?", opts: ["144", "169", "25", "13"], ans: "169", topic: "Algebra"},
  {q: "3. A triangle with all sides equal is called?", opts: ["Scalene", "Isosceles", "Equilateral", "Right"], ans: "Equilateral", topic: "Geometry"},
  {q: "4. 3x + 5 = 20, Value of x =?", opts: ["3", "4", "5", "6"], ans: "5", topic: "Linear Equations"},
  {q: "5. Area of circle formula?", opts: ["2πr", "πr^2", "πd", "2πr^2"], ans: "πr^2", topic: "Mensuration"},
  {q: "6. HCF of 12 and 18 =?", opts: ["3", "6", "9", "12"], ans: "6", topic: "HCF & LCM"},
  {q: "7. 0.75 in fraction =?", opts: ["3/4", "2/3", "1/2", "4/5"], ans: "3/4", topic: "Fractions"},
  {q: "8. Data: 2,4,6,8. Mean =?", opts: ["4", "5", "6", "8"], ans: "5", topic: "Statistics"},
  {q: "9. Volume of cube =?", opts: ["6a^2", "a^3", "4a^2", "a^2"], ans: "a^3", topic: "Mensuration"},
  {q: "10. 2:5 :: 10:?", opts: ["20", "25", "15", "30"], ans: "25", topic: "Ratio"}
];

let current = 0;
let answers = Array(10).fill(null);
let time = 3600;
let timerInterval;

function startExam(){
  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('exam-screen').classList.remove('hide');
  loadQ();
  timerInterval = setInterval(updateTimer, 1000);
}

function loadQ(){
  let q = questions[current];
  document.getElementById('q-count').innerText = `Question ${current+1}/10`;
  let html = `<h3>${q.q}</h3>`;
  q.opts.forEach(opt => {
    html += `<label class="option"><input type="radio" name="opt" value="${opt}" ${answers[current]==opt?'checked':''} onchange="saveAns(this.value)"> ${opt}</label>`;
  });
  document.getElementById('question-box').innerHTML = html;
}

function saveAns(val){ answers[current] = val; }
function nextQ(){ if(current<9){ current++; loadQ(); } }
function prevQ(){ if(current>0){ current--; loadQ(); } }

function updateTimer(){
  time--;
  let m = Math.floor(time/60), s = time%60;
  document.getElementById('timer').innerText = `${m}:${s<10?'0':''+s}`;
  if(time<=0) submitExam();
}

function submitExam(){
  clearInterval(timerInterval);
  let score = 0;
  questions.forEach((q,i)=>{ if(answers[i]==q.ans) score+=10; });
  showResult(score);
}

function showResult(score){
  document.getElementById('exam-screen').classList.add('hide');
  document.getElementById('result-screen').classList.remove('hide');
  let status = score>=33? `<span class="pass">PASS</span>` : `<span class="fail">FAIL</span>`;
  document.getElementById('result-box').innerHTML = `
  <p><b>Student:</b> Class 8</p>
  <p><b>Total Marks:</b> 100</p>
  <p><b>Obtained Marks:</b> ${score}</p>
  <p><b>Percentage:</b> ${score}%</p>
  <p><b>Result:</b> ${status}</p>
  `;
  window.resultData = {score, status: score>=33?'PASS':'FAIL'};
}

function downloadResult(){
  let data = `Class 8 PECTA Result\nObtained: ${window.resultData.score}/100\nStatus: ${window.resultData.status}`;
  let blob = new Blob([data], {type: 'text/plain'});
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Class8_Result.txt';
  a.click();
}

function shareResult(){
  let text = `Class 8 PECTA Result: ${window.resultData.score}/100 - ${window.resultData.status}`;
  if(navigator.share){
    navigator.share({title: 'Result', text: text});
  } else {
    alert(text);
  }
}

function restartExam(){ location.reload(); }
