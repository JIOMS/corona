let MAX_GAUGE = 100;
var current_gauge = 0;
var money_amount = 0;
var user_name ="";

//실패 확인
function check_life() {
  if (current_gauge >= 100) {
    alert("사망...");
    location.href = "gameOver.jsp";
  }
}

//바이러스 게이지 변화
function change_gauge(amount) {
  const gauge_amount = document.getElementById("gauge_amount");
  current_gauge += amount;
  const ratio = (current_gauge / MAX_GAUGE) * 100;
  gauge_amount.setAttribute("width", `${ratio}%`);
  if (current_gauge < 30) {
    gauge_amount.style.fill = "red";
  }
}

//돈 변화
function change_money_amount(changed_amount) {
  money_amount += changed_amount;
  document.getElementById("money").innerText = money_amount;
}

function setStatus() {
  const status_box = document.getElementById("status");

  const virus_box = document.createElement("div");
  virus_box.setAttribute("class", "status-item");
  virus_box.setAttribute("id", "virus_box");
  status_box.appendChild(virus_box);
  const money_box = document.createElement("div");
  money_box.setAttribute("class", "status-item");
  money_box.setAttribute("id", "money_box");
  status_box.appendChild(money_box);

  const virus_icon = new Image();
  virus_icon.src = "../src/images/virus.png";
  virus_icon.setAttribute("id", "virus_icon");
  virus_box.appendChild(virus_icon);

  const virus_gauge = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  virus_gauge.setAttribute("id", "virus_gauge");
  // virus_gauge.setAttribute("height", "50%");
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const gauge_bound = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  gauge_bound.setAttribute("id", "gauge_bound");
  gauge_bound.setAttribute("x", "0");
  gauge_bound.setAttribute("y", "0");
  // gauge_bound.setAttribute("width", "100%");
  gauge_bound.setAttribute("height", "100%");
  const gauge_amount = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  gauge_amount.setAttribute("id", "gauge_amount");
  gauge_amount.setAttribute("x", "0");
  gauge_amount.setAttribute("y", "0");
  gauge_amount.setAttribute("width", `${current_gauge}%`);
  gauge_amount.setAttribute("height", "100%");
  g.appendChild(gauge_amount);
  g.appendChild(gauge_bound);
  virus_gauge.appendChild(g);
  virus_box.appendChild(virus_gauge);

  const money_icon = new Image();
  money_icon.src = "../src/images/money.png";
  money_icon.setAttribute("id", "money_icon");
  money_box.appendChild(money_icon);
  const money_text = document.createElement("span");
  money_text.innerText = money_amount;
  money_text.setAttribute("id", "money");
  money_box.appendChild(money_text);
}

//폼 태그 만들기
function make_form() {
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("id", "status_form");

  const virus_input = document.createElement("input");
  virus_input.setAttribute("id", "virus_input");
  virus_input.setAttribute("type", "hidden");
  virus_input.setAttribute("name", "virus");
  form.appendChild(virus_input);

  const money_input = document.createElement("input");
  money_input.setAttribute("id", "money_input");
  money_input.setAttribute("type", "hidden");
  money_input.setAttribute("name", "money");
  form.appendChild(money_input);
  
  const name_input = document.createElement("input");
  name_input.setAttribute("id", "name_input");
  name_input.setAttribute("type", "hidden");
  name_input.setAttribute("name", "user_name");
  form.appendChild(name_input);
  
  
  document.body.appendChild(form);
}

function put_input() {
  document.getElementById("virus_input").value = current_gauge;
  document.getElementById("money_input").value = money_amount;
  document.getElementById("name_input").value = user_name;
}
