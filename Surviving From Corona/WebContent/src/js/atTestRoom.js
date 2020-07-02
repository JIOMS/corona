var scene, camera, renderer, controls, domEvents;
var window_right_open = false;
var window_left_open = false;
var control_locked = false;
const PERSPECTIVE_FRAME = 30;
const MOVE_FRAME = 120;

//코로나 지수 변화량
let CHANGE_OF_VIRUS = 3;

//코로나 지수 변화시키기
function change_corona_gauge(virus_change) {
  return;
}

//다음 페이지로 넘어가기 (링크만 넣으면 됨)
function go_to_next() {
	  put_input();
	  const form = document
	    .getElementById("status_form");
	    
	  form.setAttribute("action", "rank.jsp");
	  form.submit();
	}

//책상으로 이동
function go_to_window() {
  let count = 1;
  const move = () => {
    count += 1;
    if (count % MOVE_FRAME != 1) {
      const loc_width =
        desk_location.width * (count / MOVE_FRAME) +
        start_location.width * (1 - count / MOVE_FRAME);
      const loc_height =
        desk_location.height * (count / MOVE_FRAME) +
        start_location.height * (1 - count / MOVE_FRAME);
      const loc_depth =
        desk_location.depth * (count / MOVE_FRAME) +
        start_location.depth * (1 - count / MOVE_FRAME);
      camera.position.set(loc_width, loc_height, loc_depth);

      const pers_width =
        perspective_on_window.width * (count / MOVE_FRAME) +
        start_perspective.width * (1 - count / MOVE_FRAME);
      const pers_height =
        perspective_on_window.height * (count / MOVE_FRAME) +
        start_perspective.height * (1 - count / MOVE_FRAME);
      const pers_depth =
        perspective_on_window.depth * (count / MOVE_FRAME) +
        start_perspective.depth * (1 - count / MOVE_FRAME);

      camera.lookAt(pers_width, pers_height, pers_depth);

      moving = requestAnimationFrame(move);
    } else {
      cancelAnimationFrame(moving);
    }
  };
  let moving = requestAnimationFrame(move);
}

const room_setting = {
  width: 1000,
  depth: 600,
  height: 300,
  wall_color: 0xeeebcb,
  floor_color: 0x000000,
  outer_color: 0xe0e0ff,
  ceil_color: 0xffffff,
};

const front_setting = {
  stage: {
    width: room_setting.width * 0.6,
    height: room_setting.height / 20,
    depth: room_setting.depth / 3,
    color: 0xd5dbdb,
  },
  desk: {
    width: room_setting.wall_color / 5,
    height: room_setting.height * (4 / 15),
    depth: room_setting.depth / 20,
  },
};

const blackboard_setting = {
  board: {
    width: room_setting.width * 0.7,
    height: room_setting.height / 2,
    depth: room_setting.depth / 120,
    color: 0xffffff,
  },
  frame: {
    thickness: room_setting.width / 100,
    depth: room_setting.depth / 60,
    color: 0x834800,
  },
};

const desk_position = {
  start: {
    hor: -room_setting.width * 0.3,
    ver: room_setting.depth / 5,
  },
  row: 2,
  col: 4,
  margin: {
    width: room_setting.width * 0.12,
    depth: room_setting.depth / 12,
  },
};

const desk_setting = {
  frame: {
    width: room_setting.width / 100,
    height: room_setting.height / 30,
    color: 0xb0b0b0,
  },
  panel: {
    width: room_setting.width * 0.12,
    height: room_setting.height / 30,
    depth: room_setting.depth / 9,
    chair_color: 0xe59866,
    desk_color: 0xf8c471,
  },
  width: room_setting.width * 0.06,
  height: room_setting.height * (7 / 30),
  depth: room_setting.depth / 5,
};

const window_setting = {
  width: room_setting.depth * 0.6, ///100,
  height: room_setting.height / 2,
  depth: room_setting.width / 200,
  skycolor: 0x0000ee,
  frame: {
    thickness: room_setting.depth * 0.018,
    depth: room_setting.width / 200,
    outer_color: 0x000000, //0xffffff,
    inner_color: 0xffffff,
    helper_color: 0x000000,
  },
  glass: {
    color: 0xffffff,
    opacity: 0.2,
    transparent: true,
  },
  motion_frame: 40,
};

const start_location = {
  width: room_setting.width / 4,
  height: desk_setting.height * 2.5,
  depth: room_setting.depth / 3,
};

const start_perspective = {
  width: -room_setting.width / 5,
  height: room_setting.height / 2,
  depth: -room_setting.depth / 2,
};

const desk_location = {
  width: desk_position.start.hor + desk_setting.width / 2,
  height: desk_setting.height * (3 - 1),
  depth: desk_position.start.ver - desk_setting.width, //+ desk_setting.width
};

const perspective_on_desk = {
  width: desk_position.start.hor + desk_setting.width / 2,
  height: desk_setting.height,
  depth: desk_position.start.ver - desk_setting.width * 1.5,
};

const perspective_on_window = {
  width: -room_setting.width / 2,
  height: room_setting.height / 2,
  depth: 0,
};

const quiz = {
  wash_hands: {
    title: "다음 중 손을 씻을 때 반드시 해야할 일을 모두 고르시오",
    answers: {
      one: {
        src: "../src/images/atTestRoom/wash_hands1.png",
        selected: false,
        alt: "손바닥과 손바닥을 마주대고 문질러 주세요",
      },
      two: {
        src: "../src/images/atTestRoom/wash_hands2.png",
        selected: false,
        alt: "손등과 손바닥을 마주대고 문질러 주세요",
      },
      three: {
        src: "../src/images/atTestRoom/wash_hands3.png",
        selected: false,
        alt: "손바닥을 마주대고 손까지를 끼고 문질러 주세요",
      },
      four: {
        src: "../src/images/atTestRoom/wash_hands4.png",
        selected: false,
        alt: "손가락을 마주잡고 문질러 주세요",
      },
      five: {
        src: "../src/images/atTestRoom/wash_hands5.png",
        selected: false,
        alt: "엄지손가락을 다른 편 손바닥으로 돌려주면서 문질러 주세요",
      },
      six: {
        src: "../src/images/atTestRoom/wash_hands6.png",
        selected: false,
        alt: "손가락을 반대편 손바닥에 놓고 손톱 밑을 깨끗하게 하세요",
      },
    },
    result: {
      image: "../src/images/atTestRoom/HowToWash.png",
      detail: "올바른 손씻기 만으로 감염병을 절반으로 줄일 수 있습니다.",
    },
  },
  cough: {
    title: "기침을 할 때, 손으로 입을 가리면 된다.",
    answers: {
      yes: "O",
      no: "X",
    },
    selected: false,
    result: {
      answer: "no",
      detail: "기침을 할 때는 휴지, 손수건, 혹은 옷소매로 가립니다.",
    },
  },
  mask: {
    title: "마스크를 벗을 때 어디를 잡고 벗어야 할까요?",
    image: "../src/images/atTestRoom/mask.png",
    answers: [
      {
        detail: "마스크 앞 면의 천",
        result: false,
      },
      {
        detail: "마스크 양 쪽 끈",
        result: true,
      },
    ],
    result:
      "마스크의 앞면에 손을 대지 않고 벗어야 합니다.\n또한 마스크를 벗은 다음 손을 씻는 것이 좋습니다.",
  },
  style: {
    width: desk_setting.panel.width * 0.6,
    height: desk_setting.height,
    paper_color: 0xffffff,
    text_color: 0x000000,
    right_color: "rgba(0,255,0,0.8)",
    wrong_color: "rgba(255,0,0,0.8)",
  },
};

//기침 퀴즈
function make_quiz_cough() {
  const test_page = document.getElementById("test_page");

  const paper = document.createElement("div");
  paper.setAttribute("id", "quiz_cough");

  const title = document.createElement("h1");
  title.innerText = quiz.cough.title;
  paper.appendChild(title);

  for (number in quiz.cough.answers) {
    const answer = number;
    const h1 = document.createElement("h1");
    h1.innerText = quiz.cough.answers[answer];
    h1.style.border = "1px solid black";
    h1.style.borderRadius = "2px";

    h1.addEventListener("click", () => {
      h1.style.backgroundColor = "rgba(0,0,255,0.6)";
      let background_color;
      if (answer == quiz.cough.result.answer) {
        background_color = quiz.style.right_color;
        change_corona_gauge(-CHANGE_OF_VIRUS);
      } else {
        background_color = quiz.style.wrong_color;
        change_corona_gauge(CHANGE_OF_VIRUS);
      }
      test_page.style.backgroundColor = background_color;
      document.getElementById("quiz_cough").style.display = "none";

      document.getElementById("quiz_cough_result").style.display = "block";
    });
    paper.appendChild(h1);
  }
  test_page.appendChild(paper);

  const result = document.createElement("div");
  result.setAttribute("id", "quiz_cough_result");

  const detail = document.createElement("h1");
  detail.innerText = quiz.cough.result.detail;
  result.appendChild(detail);

  const h3 = document.createElement("h3");
  h3.innerText = "(넘어가려면 클릭하세요)";
  result.appendChild(h3);

  result.addEventListener("click", () => {
    document.getElementById("quiz_cough_result").style.display = "none";
    test_page.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
    document.getElementById("quiz_wash_hands").style.display = "block";
  });
  test_page.appendChild(result);
}

//손 씻기 퀴즈
function make_quiz_wash_hands() {
  const test_page = document.getElementById("test_page");

  const paper = document.createElement("div");
  paper.setAttribute("id", "quiz_wash_hands");

  const title = document.createElement("h1");
  title.innerText = quiz.wash_hands.title;
  paper.appendChild(title);

  const pics = document.createElement("div");
  pics.setAttribute("id", "pictures");
  for (answer in quiz.wash_hands.answers) {
    const img = new Image();
    const number = answer;
    img.src = quiz.wash_hands.answers[number].src;
    img.alt = quiz.wash_hands.answers[number].alt;
    img.style.opacity = "0.5";
    img.addEventListener("click", () => {
      if (quiz.wash_hands.answers[number].selected == true) {
        img.style.opacity = "0.5";
        quiz.wash_hands.answers[number].selected = false;
      } else {
        img.style.opacity = "1";
        quiz.wash_hands.answers[number].selected = true;
      }
      // console.log(quiz.wash_hands.answers[number].selected);
    });
    pics.appendChild(img);
  }
  paper.appendChild(pics);

  const button = document.createElement("button");
  button.innerText = "완료";
  button.addEventListener("click", () => {
    let count = 0;
    for (image in quiz.wash_hands.answers) {
      if (quiz.wash_hands.answers[image].selected == true) {
        count += 1;
      }
    }
    let background_color;
    if (count == 6) {
      background_color = quiz.style.right_color;
      change_corona_gauge(-CHANGE_OF_VIRUS);
    } else {
      background_color = quiz.style.wrong_color;
      change_corona_gauge(CHANGE_OF_VIRUS);
    }
    document.getElementById(
      "test_page"
    ).style.backgroundColor = background_color;
    document.getElementById("quiz_wash_hands").style.display = "none";
    document.getElementById("quiz_wash_hands_result").style.display = "block";
  });
  paper.appendChild(button);

  test_page.appendChild(paper);

  const result = document.createElement("div");
  result.setAttribute("id", "quiz_wash_hands_result");

  const poster = new Image();
  poster.src = quiz.wash_hands.result.image;
  result.appendChild(poster);

  const detail = document.createElement("h1");
  detail.innerText = quiz.wash_hands.result.detail;
  result.appendChild(detail);

  const h3 = document.createElement("h3");
  h3.innerText = "(넘어가려면 클릭하세요)";
  result.appendChild(h3);

  result.addEventListener("click", () => {
    document.getElementById("quiz_wash_hands_result").style.display = "none";
    test_page.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
    document.getElementById("quiz_mask").style.display = "block";
  });
  test_page.appendChild(result);
}

//마스크 퀴즈
function make_quiz_mask() {
  const test_page = document.getElementById("test_page");

  const paper = document.createElement("div");
  paper.setAttribute("id", "quiz_mask");

  const title = document.createElement("h1");
  title.innerText = quiz.mask.title;
  paper.appendChild(title);

  const image = new Image();
  image.src = quiz.mask.image;
  image.alt = "마스크";
  paper.appendChild(image);

  for (number in quiz.mask.answers) {
    const answer = number;
    const h1 = document.createElement("h1");
    h1.innerText = quiz.mask.answers[answer].detail;
    h1.style.border = "1px solid black";
    h1.addEventListener("click", () => {
      h1.style.backgroundColor = "rgba(0,0,255,0.6)";
      let background_color;
      if (quiz.mask.answers[answer].result == true) {
        background_color = quiz.style.right_color;
        change_corona_gauge(-CHANGE_OF_VIRUS);
      } else {
        background_color = quiz.style.wrong_color;
        change_corona_gauge(CHANGE_OF_VIRUS);
      }

      document.getElementById(
        "test_page"
      ).style.backgroundColor = background_color;
      document.getElementById("quiz_mask").style.display = "none";
      document.getElementById("quiz_mask_result").style.display = "block";
    });
    paper.appendChild(h1);
  }

  test_page.appendChild(paper);

  const result = document.createElement("div");
  result.setAttribute("id", "quiz_mask_result");

  const detail = document.createElement("h2");
  detail.innerText = quiz.mask.result;
  result.appendChild(detail);

  const h3 = document.createElement("h3");
  h3.innerText = "(넘어가려면 클릭하세요)";
  result.appendChild(h3);

  result.addEventListener("click", () => {
    document.getElementById("test_page").style.display = "none";
    document.getElementById("last_page").style.display = "block";
  });

  test_page.appendChild(result);
}

function set_text_on_blackboard() {
  const cough_quiz = new THREE.Group();

  const paper = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(quiz.style.width, quiz.style.height),
    new THREE.MeshStandardMaterial({ color: quiz.style.paper_color })
  );
  paper.position.set(0, 0, 0);
  cough_quiz.add(paper);

  var loader = new THREE.FontLoader();
  loader.load(
    "../src/js/threeJS/examples/fonts/BM-HANNA-11yrs-old_Regular.json",
    (font) => {
      var title = new THREE.Mesh(
        new THREE.TextBufferGeometry(quiz.cough.title, {
          font: font,
          size: 5,
          height: 1,
        }),
        new THREE.MeshStandardMaterial({ color: quiz.style.text_color })
      );
      title.position.set(-quiz.style.width * (1 / 4), 0, 0);
      cough_quiz.add(title);
    }
  );
  cough_quiz.rotation.x = -Math.PI / 2;
  cough_quiz.position.set(
    desk_position.start.hor + desk_setting.width / 2,
    desk_setting.height + desk_setting.panel.height + 1,
    desk_position.start.ver - (2 - 1 / 2) * desk_setting.width
  );
  scene.add(cough_quiz);
}

function init() {
  const container = document.getElementById("container");

  //초기 페이지
  const initial_page = document.createElement("div");
  initial_page.setAttribute("id", "initial_page");

  const initial_title = document.createElement("h2");
  initial_title.innerText = "시험장 입장!";
  initial_page.appendChild(initial_title);

  const initial_detail = document.createElement("p");
  initial_detail.innerText = "먼저 환기부터 합시다.\n창문을 클릭해 주세요.";
  initial_page.appendChild(initial_detail);

  const initial_h4 = document.createElement("h4");
  initial_h4.innerText = "(넘어가려면 클릭하세요)";
  initial_page.appendChild(initial_h4);

  // const initial_button = document.createElement("button");
  // initial_button.innerText = "OK";
  // initial_button
  initial_page.addEventListener("click", () => {
    initial_page.style.display = "none";
    go_to_window();
  });
  // initial_page.appendChild(initial_button);

  initial_page.style.display = "block";

  container.appendChild(initial_page);

  //창문이 열렸을 때
  const open_widnow1 = document.createElement("div");
  open_widnow1.setAttribute("id", "open_window1");
  const open_widnow1_title = document.createElement("h2");
  open_widnow1_title.innerText = "열어야 할 창문이 더 있을 텐데...";
  const open_window1_h4 = document.createElement("h4");
  open_window1_h4.innerText = "(넘어가려면 클릭하세요)";

  open_widnow1.addEventListener("click", () => {
    document.getElementById("open_window1").style.display = "none";
  });
  // const open_widnow1_button = document.createElement("button");
  // open_widnow1_button.setAttribute(
  //   "onclick",
  //   "document.getElementById('open_window1').style.display = 'none'"
  // );
  // open_widnow1_button.innerText = "OK";
  open_widnow1.appendChild(open_widnow1_title);
  open_widnow1.appendChild(open_window1_h4);
  // open_widnow1.appendChild(open_widnow1_button);
  container.appendChild(open_widnow1);

  const open_widnow2 = document.createElement("div");
  open_widnow2.setAttribute("id", "open_window2");
  const open_widnow2_title = document.createElement("h2");
  open_widnow2_title.innerText =
    "바이러스 감염 예방을 위해서 환기는 필수입니다.";

  const open_window2_h4 = document.createElement("h4");
  open_window2_h4.innerText = "(넘어가려면 클릭하세요)";
  // const open_widnow2_button = document.createElement("button");
  // open_widnow2_button.innerText = "OK";
  // open_widnow2_button
  open_widnow2.addEventListener("click", () => {
    open_widnow2.style.display = "none";
    let count = 1;
    let camera_move = () => {
      count += 1;
      if (count % PERSPECTIVE_FRAME != 1) {
        const pers_width =
          perspective_on_desk.width * (count / PERSPECTIVE_FRAME) -
          (room_setting.width / 2) * (1 - count / PERSPECTIVE_FRAME);
        const pers_height =
          perspective_on_desk.height * (count / PERSPECTIVE_FRAME) -
          (room_setting.height / 2) * (1 - count / PERSPECTIVE_FRAME);
        const pers_depth =
          perspective_on_desk.depth * (count / PERSPECTIVE_FRAME) +
          perspective_on_window.depth * (1 - count / PERSPECTIVE_FRAME);
        camera.lookAt(pers_width, pers_height, pers_depth);
        camera_moving = requestAnimationFrame(camera_move);
        console.log(count);
      } else {
        cancelAnimationFrame(camera_moving);
        setTimeout(() => {
          document.getElementById("test_start").style.display = "block";
        }, 500);
      }
    };
    var camera_moving = requestAnimationFrame(camera_move);
  });

  open_widnow2.appendChild(open_widnow2_title);
  open_widnow2.appendChild(open_window2_h4);
  // open_widnow2.appendChild(open_widnow2_button);
  container.appendChild(open_widnow2);

  //시험 시작 페이지
  const test_start = document.createElement("div");
  test_start.setAttribute("id", "test_start");
  const start_title = document.createElement("h2");
  start_title.innerText = "시험 시작";
  test_start.appendChild(start_title);
  const start_h4 = document.createElement("h4");
  start_h4.innerText = "(계속하려면 클릭하세요)";
  test_start.appendChild(start_h4);
  test_start.addEventListener("click", () => {
    document.getElementById("test_start").style.display = "none";
    document.getElementById("test_page").style.display = "block";
    document.getElementById("quiz_cough").style.display = "block";
  });
  container.appendChild(test_start);

  //시험 페이지
  const test_page = document.createElement("div");
  test_page.setAttribute("id", "test_page");
  container.appendChild(test_page);

  make_quiz_cough();

  make_quiz_wash_hands();

  make_quiz_mask();

  //종료 페이지
  const last_page = document.createElement("div");
  last_page.setAttribute("id", "last_page");

  const last_page_title = document.createElement("h1");
  last_page_title.innerText = "기말고사 종료!\n 수고하셨습니다!";
  last_page.appendChild(last_page_title);

  const last_page_h4 = document.createElement("h4");
  last_page_h4.innerText = "(넘어가려면 클릭하세요)";
  last_page.addEventListener("click", ()=>{
	  go_to_next()
	  console.log('hi');
	  });
  last_page.appendChild(last_page_h4);

  container.appendChild(last_page);
}

function animate() {
  // controls.update();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function setRoom() {
  const container = document.getElementById("container");
  const container_bounds = container.getBoundingClientRect();

  //scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(room_setting.outer_color);

  // camera
  camera = new THREE.PerspectiveCamera(
    70,
    container_bounds.width / container_bounds.height,
    1,
    1000
  );
  // camera.position.set(
  //   -room_setting.width / 4, //room_setting.width / 2,
  //   room_setting.height / 2,
  //   0 // room_setting.depth / 2
  // );
  camera.position.set(
    start_location.width,
    start_location.height,
    start_location.depth
  );

  camera.lookAt(
    start_perspective.width,
    start_perspective.height,
    start_perspective.depth
  );
  // camera.lookAt(
  //   // 0,
  //   // room_setting.height / 2,
  //   // -room_setting.depth / 2
  //   desk_position.start.hor + desk_setting.width / 2,
  //   desk_setting.height,
  //   desk_position.start.ver - desk_setting.width * 1.5
  // );

  //image renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(container_bounds.width, container_bounds.height); //window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //resize event
  window.addEventListener("resize", () => {
    const container_bounds = document
      .getElementById("container")
      .getBoundingClientRect();
    camera.aspect = container_bounds.width / container_bounds.height; //window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container_bounds.width, container_bounds.height);
  });

  //domEvents
  domEvents = new THREEx.DomEvents(camera, renderer.domElement);

  //controller
  // controls = new PointerLockControls(camera, document.body);
  // window.addEventListener("click", (e) => {
  //   if (e.button == 2) {
  //     if (control_locked == true) {
  //       controls.unlock();
  //     } else {
  //       controls.lock();
  //     }
  //   }
  // });
  // controls.unlock();

  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.keys = {
  //   LEFT: 37,
  //   UP: 38,
  //   RIGHT: 39,
  //   BOTTOM: 40
  // };

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  hemiLight.position.set(0, room_setting.height * 0.7, 0);
  scene.add(hemiLight);

  // make_quiz_cough();

  setCeilGround();

  setWalls();

  setWindows();

  //setting front stage
  var front_stage = new THREE.Mesh(
    new THREE.BoxBufferGeometry(
      front_setting.stage.width,
      front_setting.stage.height,
      front_setting.stage.depth
    ),
    new THREE.MeshStandardMaterial({ color: front_setting.stage.color })
  );
  front_stage.position.set(
    0,
    front_setting.stage.height / 2,
    -(room_setting.depth - front_setting.stage.depth) / 2
  );
  scene.add(front_stage);

  //setting front desk
  // var front_desk = new THREE.Group();
  // var front_desk_base = new THREE.Mesh(
  //   new THREE.BoxBufferGeometry(
  //     front_setting.desk.width,
  //     front_setting.desk.height,
  //     front_setting.desk.depth
  //   ),
  //   new THREE.MeshStandardMaterial({ color: 0x979a9a })
  // );

  setBlackboard();

  setDesks();

  animate();
}

function check_window_open() {
  if (window_right_open == true && window_left_open == false) {
    document.getElementById("open_window1").style.display = "block";
  } else if (window_left_open == true && window_right_open == false) {
    document.getElementById("open_window1").style.display = "block";
  } else if (window_left_open == true && window_right_open == true) {
    document.getElementById("open_window2").style.display = "block";
  }
}

function setCeilGround() {
  //setting ground
  var ground = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(room_setting.width, room_setting.depth),
    new THREE.MeshStandardMaterial({ color: room_setting.floor_color })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, 0, 0);
  scene.add(ground);

  //gridhelper
  var grid = new THREE.GridHelper(room_setting.width, 40, 0xffffff, 0xffffff);
  grid.material.opacity = 1;
  grid.material.transparent = true;
  scene.add(grid);

  //setting ceil
  var ceil = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(room_setting.width, room_setting.depth),
    new THREE.MeshStandardMaterial(room_setting.ceil_color)
  );
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set(0, room_setting.height, 0);
  scene.add(ceil);
}

function setWalls() {
  //setting wall
  var wall = new THREE.Group();
  wall_material = new THREE.MeshStandardMaterial({
    color: room_setting.wall_color,
  });

  var wall_atBlackBoard = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(room_setting.width, room_setting.height),
    wall_material
  );
  wall_atBlackBoard.position.set(
    0,
    room_setting.height / 2,
    -room_setting.depth / 2
  );
  wall.add(wall_atBlackBoard);

  var wall_left = new THREE.Group();

  var wall_left_right = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(
      (room_setting.depth -
        window_setting.width -
        2 * window_setting.frame.thickness) /
        2,
      room_setting.height
    ),
    wall_material
  );
  wall_left_right.position.set(
    0,
    0,
    (room_setting.depth / 2 +
      window_setting.width / 2 +
      window_setting.frame.thickness) /
      2
  );
  wall_left_right.rotation.y = Math.PI / 2;
  wall_left.add(wall_left_right);

  var wall_left_left = wall_left_right.clone();
  wall_left_left.position.set(
    0,
    0,
    -(
      room_setting.depth / 2 +
      window_setting.width / 2 +
      window_setting.frame.thickness
    ) / 2
  );
  wall_left_left.rotation.y = Math.PI / 2;
  wall_left.add(wall_left_left);

  var wall_left_top = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(
      window_setting.width + 2 * window_setting.frame.thickness,
      (room_setting.height -
        window_setting.height -
        2 * window_setting.frame.thickness) /
        2
    ),
    wall_material
  );
  wall_left_top.rotation.y = Math.PI / 2;
  wall_left_top.position.set(
    0,
    (room_setting.height / 2 +
      window_setting.height / 2 +
      window_setting.frame.thickness) /
      2,
    0
  );
  wall_left.add(wall_left_top);

  var wall_left_bottom = wall_left_top.clone();
  wall_left_bottom.position.set(
    0,
    -(
      room_setting.height / 2 +
      window_setting.height / 2 +
      window_setting.frame.thickness
    ) / 2,
    0
  );
  wall_left.add(wall_left_bottom);

  wall_left.position.set(-room_setting.width / 2, room_setting.height / 2, 0);
  wall.add(wall_left);

  var wall_right = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(room_setting.depth, room_setting.height),
    wall_material
  );
  wall_right.rotation.y = Math.PI / 2;
  wall_right.position.set(room_setting.width / 2, room_setting.height / 2, 0);
  wall.add(wall_right);

  var wall_back = wall_atBlackBoard.clone();

  wall_back.position.set(0, room_setting.height / 2, room_setting.depth / 2); //room_setting.depth / 2);
  wall.add(wall_back);

  scene.add(wall);
}

function setWindows() {
  //창문
  var windows = new THREE.Group();

  var skyfield = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(window_setting.width, window_setting.height),
    new THREE.MeshStandardMaterial({ color: window_setting.skycolor })
  );
  skyfield.position.set(0, 0, 0);
  skyfield.rotation.y = Math.PI / 2;
  //windows.add(skyfield);

  material = new THREE.MeshStandardMaterial(window_setting.frame.outer_color);

  var window_frame_top = new THREE.Mesh(
    new THREE.BoxBufferGeometry(
      window_setting.frame.depth,
      window_setting.frame.thickness,
      window_setting.width + 2 * window_setting.frame.thickness
    ),
    material
  );
  window_frame_top.position.set(
    window_setting.frame.depth / 2,
    (window_setting.height + window_setting.frame.thickness) / 2,
    0
  );
  windows.add(window_frame_top);
  // var window_frame_top_helper = new THREE.BoxHelper(
  //   window_frame_top,
  //   window_setting.frame.helper_color
  // );
  // windows.add(window_frame_top_helper);

  var window_frame_bottom = window_frame_top.clone();
  window_frame_bottom.position.set(
    window_setting.frame.depth / 2,
    -(window_setting.height + window_setting.frame.thickness) / 2,
    0
  );
  windows.add(window_frame_bottom);
  // var window_frame_bottom_helper = new THREE.BoxHelper(
  //   window_frame_bottom,
  //   window_setting.frame.helper_color
  // );
  // windows.add(window_frame_bottom_helper);

  var window_frame_right = new THREE.Mesh(
    new THREE.BoxBufferGeometry(
      window_setting.frame.depth,
      window_setting.height,
      window_setting.frame.thickness
    ),
    material
  );
  window_frame_right.position.set(
    window_setting.frame.depth / 2,
    0,
    -(window_setting.width + window_setting.frame.thickness) / 2
  );
  windows.add(window_frame_right);

  var window_frame_left = window_frame_right.clone();
  window_frame_left.position.set(
    window_setting.frame.depth / 2,
    0,
    (window_setting.width + window_setting.frame.thickness) / 2
  );
  windows.add(window_frame_left);

  var smaller_window = new THREE.Group();

  material = new THREE.MeshStandardMaterial(window_setting.frame.inner_color);

  var smaller_window_frame_top = new THREE.Mesh(
    new THREE.BoxBufferGeometry(
      window_setting.frame.depth / 2,
      window_setting.frame.thickness,
      (window_setting.width / 2 + window_setting.frame.thickness) / 2
    ),
    material
  );
  smaller_window_frame_top.position.set(
    0, // (window_setting.frame.depth * 3) / 4,
    (window_setting.height - window_setting.frame.thickness) / 2,
    0 // (window_setting.width - window_setting.frame.thickness) / 4
  );
  smaller_window.add(smaller_window_frame_top);

  var smaller_window_frame_bottom = smaller_window_frame_top.clone();
  smaller_window_frame_bottom.position.set(
    0,
    -(window_setting.height - window_setting.frame.thickness) / 2,
    0
  );
  smaller_window.add(smaller_window_frame_bottom);

  var smaller_window_frame_right = new THREE.Mesh(
    new THREE.BoxBufferGeometry(
      window_setting.frame.depth / 2,
      window_setting.height - 2 * window_setting.frame.thickness,
      window_setting.frame.thickness
    ),
    material
  );
  smaller_window_frame_right.position.set(
    0,
    0,
    -(window_setting.width / 2 - window_setting.frame.thickness) / 4
  );
  smaller_window.add(smaller_window_frame_right);

  var smaller_window_frame_left = smaller_window_frame_right.clone();
  smaller_window_frame_left.position.set(
    0,
    0,
    (window_setting.width / 2 - window_setting.frame.thickness) / 4
  );
  smaller_window.add(smaller_window_frame_left);

  var glass_material = new THREE.MeshStandardMaterial({
    color: window_setting.glass.color,
    opacity: window_setting.glass.opacity,
    transparent: window_setting.glass.transparent,
  });

  var smaller_window_glass = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(
      (window_setting.width / 2 - 2 * window_setting.frame.thickness) / 2,
      window_setting.height - 2 * window_setting.frame.thickness
    ),
    glass_material
  );
  smaller_window_glass.rotation.y = Math.PI / 2;
  smaller_window_glass.position.set(0, 0, 0);
  smaller_window.add(smaller_window_glass);

  var window_right = smaller_window.clone();
  window_right.id = "window_right";
  window_right.position.set(
    (window_setting.frame.depth + window_setting.frame.depth / 2) / 2,
    0,
    -(
      window_setting.width +
      window_setting.width / 2 -
      window_setting.frame.thickness
    ) / 4
  );
  windows.add(window_right);
  domEvents.addEventListener(window_right, "click", (event) => {
    if (window_right_open == false) {
      var count = 0;
      function move_left() {
        count += 1;
        if (count % window_setting.motion_frame != 0) {
          window_right.position.set(
            (window_setting.frame.depth + window_setting.frame.depth / 2) / 2,
            0,
            -(
              window_setting.width +
              window_setting.width / 2 -
              window_setting.frame.thickness -
              window_setting.width * (count / window_setting.motion_frame)
            ) / 4
          );
          console.log(count);
          moving_left = requestAnimationFrame(move_left);
        } else {
          cancelAnimationFrame(moving_left);
          window_right_open = true;
          check_window_open();
        }
      }
      moving_left = requestAnimationFrame(move_left);
    }
    // else {
    //   window_right.position.set(
    //     (window_setting.frame.depth + window_setting.frame.depth / 2) / 2,
    //     0,
    //     -(
    //       window_setting.width +
    //       window_setting.width / 2 -
    //       window_setting.frame.thickness
    //     ) / 4
    //   );
    // }

    console.log("window_right open");
  });

  var window_left = smaller_window.clone();
  window_left.id = "window_left";
  window_left.position.set(
    (window_setting.frame.depth + window_setting.frame.depth / 2) / 2,
    0,
    (window_setting.width +
      window_setting.width / 2 -
      window_setting.frame.thickness) /
      4
  );
  windows.add(window_left);

  domEvents.addEventListener(window_left, "click", (event) => {
    if (window_left_open == false) {
      var count = 0;
      function move_right() {
        count += 1;
        if (count % window_setting.motion_frame != 0) {
          window_left.position.set(
            (window_setting.frame.depth + window_setting.frame.depth / 2) / 2,
            0,
            (window_setting.width +
              window_setting.width / 2 -
              window_setting.frame.thickness -
              window_setting.width * (count / window_setting.motion_frame)) /
              4
          );
          console.log(count);
          moving_right = requestAnimationFrame(move_right);
        } else {
          cancelAnimationFrame(moving_right);
          window_left_open = true;
          check_window_open();
        }
      }
      moving_left = requestAnimationFrame(move_right);
    }
    // else {
    //   window_right.position.set(
    //     (window_setting.frame.depth + window_setting.frame.depth / 2) / 2,
    //     0,
    //     -(
    //       window_setting.width +
    //       window_setting.width / 2 -
    //       window_setting.frame.thickness
    //     ) / 4
    //   );
    // }

    console.log("window_left open");
  });

  var window_middle = new THREE.Group();
  var window_middle_frame_top = new THREE.Mesh(
    new THREE.BoxBufferGeometry(
      window_setting.frame.depth / 2,
      window_setting.frame.thickness,
      window_setting.width / 2
    ),
    material
  );
  window_middle_frame_top.position.set(
    0,
    (window_setting.height - window_setting.frame.thickness) / 2,
    0
  );
  window_middle.add(window_middle_frame_top);

  var window_middle_frame_bottom = window_middle_frame_top.clone();
  window_middle_frame_bottom.position.set(
    0,
    -(window_setting.height - window_setting.frame.thickness) / 2,
    0
  );
  window_middle.add(window_middle_frame_bottom);

  var window_middle_frame_right = smaller_window_frame_right.clone();
  window_middle_frame_right.position.set(
    0,
    0,
    -(window_setting.width / 2 - window_setting.frame.thickness) / 2
  );
  window_middle.add(window_middle_frame_right);

  var window_middle_frame_left = window_middle_frame_right.clone();
  window_middle_frame_left.position.set(
    0,
    0,
    (window_setting.width / 2 - window_setting.frame.thickness) / 2
  );
  window_middle.add(window_middle_frame_left);

  var window_middle_glass = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(
      (window_setting.width - 2 * window_setting.frame.thickness) / 2,
      window_setting.height - 2 * window_setting.frame.thickness
    ),
    glass_material
  );
  window_middle_glass.rotation.y = Math.PI / 2;
  window_middle_glass.position.set(0, 0, 0);
  window_middle.add(window_middle_glass);

  window_middle.position.set(
    (window_setting.frame.depth - window_setting.frame.depth / 2) / 2,
    0,
    0
  );
  windows.add(window_middle);

  windows.position.set(-room_setting.width / 2, room_setting.height / 2, 0);

  scene.add(windows);
}

function setBlackboard() {
  //setting blackboard
  var blackboard = new THREE.Group();

  var blackboard_board = new THREE.Mesh(
    new THREE.BoxBufferGeometry(
      blackboard_setting.board.width,
      blackboard_setting.board.height,
      blackboard_setting.board.depth
    ),
    new THREE.MeshStandardMaterial({ color: blackboard_setting.board.color })
  );
  blackboard_board.position.set(
    0,
    0, // room_setting.height / 2,
    blackboard_setting.board.depth / 2 // -(room_setting.depth - blackboard_setting.board.depth) / 2
  );
  blackboard.add(blackboard_board);

  geometry = new THREE.BoxBufferGeometry(
    blackboard_setting.frame.thickness,
    blackboard_setting.board.height,
    blackboard_setting.frame.depth
  );
  material = new THREE.MeshStandardMaterial({
    color: blackboard_setting.frame.color,
  });

  var blackboard_frame_right = new THREE.Mesh(geometry, material);
  blackboard_frame_right.position.set(
    (blackboard_setting.board.width + blackboard_setting.frame.thickness) / 2,
    0, // room_setting.height / 2,
    blackboard_setting.frame.depth / 2 // -(room_setting.depth - blackboard_setting.frame.depth) / 2
  );
  blackboard.add(blackboard_frame_right);

  var blackboard_frame_left = blackboard_frame_right.clone(); //new THREE.Mesh(geometry, material);
  blackboard_frame_left.position.set(
    -(blackboard_setting.board.width + blackboard_setting.frame.thickness) / 2,
    0, // room_setting.height / 2,
    blackboard_setting.frame.depth / 2 // -(room_setting.depth - blackboard_setting.frame.depth) / 2
  );
  blackboard.add(blackboard_frame_left);

  geometry = new THREE.BoxBufferGeometry(
    blackboard_setting.board.width + 2 * blackboard_setting.frame.thickness,
    blackboard_setting.frame.thickness,
    blackboard_setting.frame.depth
  );

  var blackboard_frame_top = new THREE.Mesh(geometry, material);
  blackboard_frame_top.position.set(
    0,
    (blackboard_setting.board.height + blackboard_setting.frame.thickness) / 2, // (room_setting.height +
    //   blackboard_setting.board.height +
    //   blackboard_setting.frame.thickness) /
    //   2,
    blackboard_setting.frame.depth / 2 // -(room_setting.depth - blackboard_setting.frame.depth) / 2
  );
  blackboard.add(blackboard_frame_top);

  var blackboard_frame_bottom = blackboard_frame_top.clone(); //new THREE.Mesh(geometry, material);
  blackboard_frame_bottom.position.set(
    0,
    -(blackboard_setting.board.height + blackboard_setting.frame.thickness) / 2, // (room_setting.height -
    //   blackboard_setting.board.height -
    //   blackboard_setting.frame.thickness) /
    //   2,
    blackboard_setting.frame.depth / 2 // -(room_setting.depth - blackboard_setting.frame.depth) / 2
  );
  blackboard.add(blackboard_frame_bottom);

  blackboard.position.set(0, room_setting.height / 2, -room_setting.depth / 2);

  scene.add(blackboard);
}

function setDesks() {
  //make desk
  var desk = new THREE.Group();
  desk.id = "desk";

  geometry = new THREE.BoxBufferGeometry(
    desk_setting.frame.width,
    desk_setting.frame.height,
    desk_setting.depth
  );
  material = new THREE.MeshStandardMaterial({
    color: desk_setting.frame.color,
  });

  var desk_base_left = new THREE.Mesh(geometry, material);
  desk_base_left.position.set(
    desk_setting.frame.width / 2,
    desk_setting.frame.height / 2,
    -desk_setting.depth / 2
  );
  desk.add(desk_base_left);

  var desk_base_right = new THREE.Mesh(geometry, material);
  desk_base_right.position.set(
    -desk_setting.frame.width / 2 + desk_setting.width,
    desk_setting.frame.height / 2,
    -desk_setting.depth / 2
  );
  desk.add(desk_base_right);

  geometry = new THREE.BoxBufferGeometry(
    desk_setting.width,
    desk_setting.frame.height,
    desk_setting.frame.width
  );
  var desk_base_front = new THREE.Mesh(geometry, material);
  desk_base_front.position.set(
    desk_setting.width / 2,
    desk_setting.frame.height / 2,
    -(desk_setting.depth - desk_setting.frame.width / 2)
  );
  desk.add(desk_base_front);
  // geometry = new THREE.CylinderBufferGeometry(10, 10, 200, 50);

  geometry = new THREE.BoxBufferGeometry(
    desk_setting.frame.width,
    desk_setting.height,
    desk_setting.frame.width
  );

  var desk_leg_right = new THREE.Mesh(geometry, material);
  desk_leg_right.position.set(
    -desk_setting.frame.width / 2 + desk_setting.width,
    desk_setting.height / 2,
    -desk_setting.depth + desk_setting.frame.height / 2
  );
  desk.add(desk_leg_right);

  var desk_leg_left = new THREE.Mesh(geometry, material);
  desk_leg_left.position.set(
    desk_setting.frame.width / 2,
    desk_setting.height / 2,
    -desk_setting.depth + desk_setting.frame.height / 2
  );
  desk.add(desk_leg_left);

  geometry = new THREE.BoxBufferGeometry(
    desk_setting.frame.width,
    desk_setting.width,
    desk_setting.frame.height
  );

  var chair_leg_1 = new THREE.Mesh(geometry, material);
  chair_leg_1.position.set(
    -desk_setting.frame.width / 2 + desk_setting.width,
    desk_setting.width / 2,
    -(desk_setting.depth - desk_setting.frame.height) / 2
  );
  desk.add(chair_leg_1);

  var chair_leg_2 = new THREE.Mesh(geometry, material);
  chair_leg_2.position.set(
    desk_setting.frame.width / 2,
    desk_setting.width / 2,
    -(desk_setting.depth - desk_setting.frame.height) / 2
  );
  desk.add(chair_leg_2);

  var chair_leg_3 = new THREE.Mesh(geometry, material);
  chair_leg_3.position.set(
    desk_setting.frame.width / 2,
    desk_setting.width / 2,
    -desk_setting.frame.height / 2
  );
  desk.add(chair_leg_3);

  var chair_leg_4 = new THREE.Mesh(geometry, material);
  chair_leg_4.position.set(
    -desk_setting.frame.width / 2 + desk_setting.width,
    desk_setting.width / 2,
    -desk_setting.frame.height / 2
  );
  desk.add(chair_leg_4);

  geometry = new THREE.BoxBufferGeometry(
    desk_setting.width,
    desk_setting.panel.height,
    desk_setting.width
  );
  material = new THREE.MeshStandardMaterial({
    color: desk_setting.panel.chair_color,
  });

  var chair_botton = new THREE.Mesh(geometry, material);
  chair_botton.position.set(
    desk_setting.width / 2,
    desk_setting.width - desk_setting.panel.height / 2,
    -desk_setting.width / 2
  );
  desk.add(chair_botton);

  geometry = new THREE.BoxBufferGeometry(
    desk_setting.width,
    desk_setting.width,
    desk_setting.panel.height
  );

  var chair_back = new THREE.Mesh(geometry, material);
  chair_back.position.set(
    desk_setting.width / 2,
    desk_setting.width + desk_setting.width / 2,
    -desk_setting.panel.height / 2
  );
  desk.add(chair_back);

  geometry = new THREE.BoxBufferGeometry(
    desk_setting.panel.width,
    desk_setting.panel.height,
    desk_setting.panel.depth
  );
  material = new THREE.MeshStandardMaterial({
    color: desk_setting.panel.desk_color,
  });

  var desk_pannel = new THREE.Mesh(geometry, material);
  desk_pannel.position.set(
    desk_setting.width / 2,
    desk_setting.height + desk_setting.panel.height / 2,
    -(desk_setting.depth - desk_setting.panel.depth / 2)
  );
  desk.add(desk_pannel);

  for (i = 0; i < desk_position.row; i++) {
    for (j = 0; j < desk_position.col; j++) {
      desk_clone = desk.clone();
      desk_clone.position.set(
        desk_position.start.hor +
          j * (desk_position.margin.width + desk_setting.width),
        0,
        desk_position.start.ver +
          i * (desk_position.margin.depth + 2 * desk_setting.width)
      );
      scene.add(desk_clone);
    }
  }

  // scene.add(desk);
}
