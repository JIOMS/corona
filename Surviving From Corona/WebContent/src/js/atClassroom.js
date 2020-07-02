const DESK_HOR = 10;
const DESK_VER = 4;
const NUM_OF_VIRUS = 10;
//코로나 지수 변화 비율
const CHANGE_OF_VIRUS = 3;

function change_corona_gauge(virus_change) {
  change_gauge(virus_change);
}

//다음 페이지 이동
function go_to_next() {
	  put_input();
	  const form = document
	    .getElementById("status_form");
	    
	  form.setAttribute("action", "atTestRoom.jsp");
	  form.submit();
	}

var max_distance;
var distance_from_virus;

let roomSets = {
  width: 1200,
  height: 750,
  ver_gap: 30,
  hor_gap: 120,
};

let desk = {
  width: 60,
  height: 150,
  hor_margin: 40,
  ver_margin: 30,
};

let icons = {
  player: 1,
  virus: 2,
  blank: 0,
};

var ctx;
var selected_seat;
let check_seat;
var desks = [];
var virus_locations = [];
var if_select = false;

//교실 그리기
function setClassroom() {
  setBoard();
  // canvas = document.createElement('canvas');
  // canvas.setAttribute('id', 'route');
  // classroom.appendChild(canvas);
  // ctx = canvas.getContext('2d');
  const classroom = document.getElementById("classroom");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "route");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  // path.setAttribute('d', 'M 0,0 L 50,50 Z');
  path.setAttribute("id", "to_clicked");
  svg.appendChild(path);
  classroom.appendChild(svg);

  //뒷문 쪽
  const back = document.createElement("div");
  back.setAttribute("id", "atDoor");
  const door = document.createElement("span");
  door.setAttribute("id", "door");
  door.innerText = "문";
  back.appendChild(door);
  classroom.appendChild(back);

  //가운데 책상들
  const middle = document.createElement("div");
  middle.setAttribute("id", "desks");
  for (r = 0; r < DESK_VER; r++) {
    for (c = 0; c < DESK_HOR; c++) {
      const row = r;
      const col = c;
      //desk = document.createElement('button');
      const desk = document.createElement("button");
      // console.log(row, col);
      if (desks[row][col] == icons.virus) {
        const virus_icon = document.createElement("img");
        virus_icon.setAttribute("src", "../src/images/virus.png");
        virus_icon.setAttribute("class", "virus_icons");
        desk.appendChild(virus_icon);
      }
      desk.setAttribute("type", "button");
      desk.setAttribute("class", "desk");
      const desk_id = "desk" + (row * DESK_HOR + col);
      desk.setAttribute("id", desk_id);
      desk.addEventListener("click", () => {
        const id = desk_id;
        selected_seat = { id: id, row: row, col: col };
        desks[row][col] = icons.player;
        put_character_on_desk(id, row);
        if_select = true;
      });
      // setAttribute(
      //   "onclick",
      //   `selected_seat_id = "${desk_id}";put_selected_seat(${r}, ${c});draw_path();`
      // );
      middle.appendChild(desk);
    }
  }
  classroom.appendChild(middle);

  //칠판 쪽
  const front = document.createElement("div");
  front.setAttribute("id", "atBlackboard");
  const blackboard = document.createElement("span");
  blackboard.setAttribute("id", "blackboard");
  blackboard.innerText = "\n칠판\n\n";
  front.appendChild(blackboard);
  classroom.appendChild(front);

  //게임 안내 페이지
  const initial = document.createElement("div");
  initial.setAttribute("id", "initial");
  const initial_title = document.createElement("h1");
  const initial_detail = document.createElement("p");
  const initial_button = document.createElement("button");
  initial_title.innerText = "안전한 자리 선점하기!";
  initial_detail.innerText =
    "위험 요소를 피해 가장 안전해 보이는 자리를 선택하세요";
  //initial_button.setAttribute("type", "button");
  //initial_button.setAttribute(
  //  "onclick",
  //  'document.getElementById("initial").style.display = "none"'
  //);
  //initial_button.innerText = "OK!";
  initial.appendChild(initial_title);
  initial.appendChild(initial_detail);
  initial.addEventListener("click", () => {
    document.getElementById("initial").style.display = "none";
  });
  //initial.appendChild(initial_button);
  classroom.appendChild(initial);

  //자리 선택 시 확인 창
  check_seat = document.createElement("div");
  check_seat.setAttribute("id", "check_seat");
  check_seat.setAttribute("style", "display: none;");
  const check_title = document.createElement("h5");
  check_title.innerText = "여기?";
  const check_yes = document.createElement("button");
  check_yes.innerText = "네";
  check_yes.setAttribute("onclick", "show_result();");
  const check_no = document.createElement("button");
  check_no.innerText = "아니요";
  check_no.addEventListener("click", () => {
    path.setAttribute("d", "");
    desks[selected_seat.row][selected_seat.col] = icons.blank;
    check_seat.style.display = "none";
    put_character_on_door();

    if_select = false;
  });
  //.setAttribute("onclick", "erase_path();");
  check_seat.appendChild(check_title);
  check_seat.appendChild(check_yes);
  check_seat.appendChild(check_no);
  classroom.appendChild(check_seat);

  //결과 화면
  const result_page = document.createElement("div");
  result_page.setAttribute("id", "result_page");

  const result_p1 = document.createElement("p");
  result_p1.setAttribute("id", "result_p1");
  // result_p1.innerText = `내가 앉은 자리: ${distance_from_virus}`;
  result_page.appendChild(result_p1);

  const result_p2 = document.createElement("p");
  result_p2.setAttribute("id", "result_p2");
  // result_p2.innerText = `바이러스로부터 제일 먼 거리: ${max_distance}`;
  result_page.appendChild(result_p2);

  const result_h5 = document.createElement("h5");
  result_h5.innerText = "(계속하려면 클릭하세요)";
  result_page.appendChild(result_h5);
  //const result_page_button = document.createElement("button");
  //result_page_button.
  result_page.addEventListener("click", () => {
    result_page.style.display = "none";
    document.getElementById("last_page").style.display = "block";
  });
  //result_page_button.innerText = "Next";
  //result_page.appendChild(result_page_button);

  classroom.appendChild(result_page);

  //마지막 페이지
  const last_page = document.createElement("div");
  last_page.setAttribute("id", "last_page");

  const last_page_title = document.createElement("h1");
  last_page_title.innerText =
    "사람과 사람 사이에는 두 팔 간격으로 충분한 간격을 둡니다";
  last_page.appendChild(last_page_title);

  const last_page_p = document.createElement("h3");
  last_page_p.innerText =
    "주변 사람과 2m 거리를, 아무리 좁아도 1m 이상의 거리를 둡시다 ";
  last_page.appendChild(last_page_p);

  const last_h5 = document.createElement("h5");
  last_h5.innerText = "(계속하려면 클릭하세요)";
  last_page.appendChild(last_h5);
  //const last_page_button = document.createElement("button");
  //last_page_button.innerText = "OK";
  //last_page_button
  last_page.addEventListener("click", () => {
    go_to_next();
  });
  // last_page.appendChild(last_page_button);

  classroom.appendChild(last_page);

  //캐릭터 배치
  character = new Image();
  character.src = "../src/images/player_character.png";
  character.setAttribute("id", "character");
  character.style.position = "absolute";
  classroom.appendChild(character);

  put_character_on_door();
}

//문에 캐릭터 놓기
function put_character_on_door() {
  const door_loc = document.getElementById("door").getBoundingClientRect();
  const classroom_loc = document
    .getElementById("classroom")
    .getBoundingClientRect();
  const character = document.getElementById("character");
  const char_loc = character.getBoundingClientRect();

  character.style.bottom = `${door_loc.height}px`;
  character.style.left = `${
    door_loc.x + (door_loc.width - char_loc.width) / 2
  }px`;
}

/* function put_selected_seat(r, c) {
  if (typeof selected_seat != "undefined") {
    desks[selected_seat.row][selected_seat.col] = icons.blank;
  }
  selected_seat = { row: r, col: c };
} */

//책상에 캐릭터 놓기
function put_character_on_desk(id, row) {
  const door_loc = document.getElementById("door").getBoundingClientRect();
  const classroom_loc = document
    .getElementById("classroom")
    .getBoundingClientRect();
  const desk_loc = document.getElementById(id).getBoundingClientRect();

  const character = document.getElementById("character");
  const char_loc = character.getBoundingClientRect();

  character.style.top = `${
    desk_loc.top - (desk_loc.height - char_loc.height)
    // classroom_loc.bottom - desk_loc.bottom + desk_loc.height / 4
  }px`;

  character.style.left = `${
    desk_loc.left - (desk_loc.width - char_loc.width) / 2
  }px`;

  const door_to_desk = {
    x1: door_loc.left - classroom_loc.left + door_loc.width / 2,
    y1: door_loc.top, // - classroom_loc.top,
    y2: desk_loc.bottom - classroom_loc.top + desk_loc.height / 3,
    x2: desk_loc.x - classroom_loc.x + desk_loc.width / 2,
    y3: desk_loc.bottom - classroom_loc.y,
  };

  if (row == 3) {
    door_to_desk.y2 = desk_loc.top - classroom_loc.y - desk_loc.height / 3;
    door_to_desk.y3 = desk_loc.top - classroom_loc.y;
  }

  const path_route = `M ${door_to_desk.x1}, ${door_to_desk.y1} L ${door_to_desk.x1}, ${door_to_desk.y2} L ${door_to_desk.x2}, ${door_to_desk.y2} L ${door_to_desk.x2}, ${door_to_desk.y3}`;

  const path = document.getElementById("to_clicked");

  path.setAttribute("d", path_route);

  const check_seat = document.getElementById("check_seat");
  check_seat.style.display = "block";
  check_seat.style.left = `${desk_loc.right}px`;
  check_seat.style.top = `${desk_loc.top}px`;

  // ctx.strokeStyle = "#F00";
  // ctx.lineWidth = 1;
  // ctx.moveTo(start_point.x, start_point.y);
  // ctx.lineTo(start_point.x, 0);
  // ctx.stroke();
}

window.addEventListener("resize", () => {
  if (if_select == true) {
    const id = selected_seat.id;
    const row = selected_seat.row;
    put_character_on_desk(id, row);
  } else {
    put_character_on_door();
  }
});

//자리 선택 시 경로 그리기 + 선택 확인
/* function draw_path() {
  desk_loc = document.getElementById(selected_seat_id).getBoundingClientRect();

  character.style.bottom = `${
    desk_loc.bottom + desk_loc.height / 2 // classroom_loc.bottom - desk_loc.bottom + desk_loc.height / 4
  }px`;
  character.style.left = `${
    desk_loc.left - classroom_loc.left - desk_loc.width / 4
  }px`;

  desks[selected_seat.row][selected_seat.col] = icons.player;

  const door_to_desk = {
    x1: door_loc.left - classroom_loc.left + door_loc.width / 2,
    y1: door_loc.top - classroom_loc.top,
    y2: desk_loc.bottom - classroom_loc.top + desk_loc.height / 3,
    x2: desk_loc.x - classroom_loc.x + desk_loc.width / 2,
    y3: desk_loc.bottom - classroom_loc.y,
  };

  if (selected_seat.row == 3) {
    door_to_desk.y2 = desk_loc.top - classroom_loc.y - desk_loc.height / 3;
    door_to_desk.y3 = desk_loc.top - classroom_loc.y;
  }

  const path_route = `M ${door_to_desk.x1}, ${door_to_desk.y1} L ${door_to_desk.x1}, ${door_to_desk.y2} L ${door_to_desk.x2}, ${door_to_desk.y2} L ${door_to_desk.x2}, ${door_to_desk.y3}`;

  const path = document.getElementById("to_clicked");
  path.setAttribute("d", path_route);

  check_seat.style.display = "block";
  check_seat.style.left = `${desk_loc.right}px`;
  check_seat.style.top = `${desk_loc.top}px`;

  // ctx.strokeStyle = "#F00";
  // ctx.lineWidth = 1;
  // ctx.moveTo(start_point.x, start_point.y);
  // ctx.lineTo(start_point.x, 0);
  // ctx.stroke();
  if_select = true;
} */

/* function erase_path() {
  path.setAttribute("d", "");
  desks[selected_seat.row][selected_seat.col] = icons.blank;
  check_seat.style.display = "none";
  put_character_on_door();

  if_select = false;
} */

//자리 선택 완료시 점수(위험도) 계산
function make_seat_result() {
  distance_from_virus = DESK_HOR + DESK_VER;
  for (i = 0; i < virus_locations.length; i++) {
    var distance =
      Math.abs(selected_seat.row - virus_locations[i].row) +
      Math.abs(selected_seat.col - virus_locations[i].col);
    distance_from_virus =
      distance_from_virus < distance ? distance_from_virus : distance;
  }
  // distance 차이 * n 만큼 바이러스 위험도 증가
  const change = Math.abs(distance_from_virus - max_distance) * CHANGE_OF_VIRUS;
  change_corona_gauge(change);
}

function show_result() {
  make_seat_result();
  document.getElementById(
    "result_p1"
  ).innerText = `내가 앉은 자리의 거리: ${distance_from_virus}`;
  document.getElementById(
    "result_p2"
  ).innerText = `바이러스로부터 제일 먼 거리: ${max_distance}`;
  document.getElementById("result_page").style.display = "block";
}

function setBoard() {
  for (r = 0; r < DESK_VER; r++) {
    desks[r] = [];
    for (c = 0; c < DESK_HOR; c++) desks[r][c] = icons.blank;
  }

  for (i = 0; i < NUM_OF_VIRUS; i++) {
    var x;
    var y;
    do {
      x = Math.floor(Math.random() * DESK_HOR);
      y = Math.floor(Math.random() * DESK_VER);
    } while (x == DESK_HOR || y == DESK_VER);
    desks[y][x] = icons.virus;
    virus_locations.push({ row: y, col: x });
  }

  var min_distances = [];
  for (r = 0; r < DESK_VER; r++) {
    for (c = 0; c < DESK_HOR; c++) {
      var distances = [];
      for (n = 0; n < virus_locations.length; n++) {
        var distance =
          Math.abs(virus_locations[n].row - r) +
          Math.abs(virus_locations[n].col - c);
        distances.push(distance);
      }
      var min_distance = Math.min.apply(null, distances);
      min_distances.push(min_distance);
    }
  }
  max_distance = Math.max.apply(null, min_distances);
}
