<%@ page contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <link rel="stylesheet" href="../src/css/main.css" />
    <link rel="stylesheet" href="../src/css/walk.css" />
    <script src="../src/js/main.js"></script>
    <script src="../src/js/options.js"></script>
    <script src="../src/js/lib/jquery-3.5.1.min.js"></script>
    <title>코로나에서 살아남기</title>
  </head>
  <body>
  <%
	request.setCharacterEncoding("utf-8");
	int virus = Integer.parseInt(request.getParameter("virus")) ;
	int money = Integer.parseInt(request.getParameter("money"));
	String name = request.getParameter("user_name");
  %>
    <nav id="nav">
      <div id="location" class="nav-item">
        <span class="loc-item" id="theme" style="display: block;"
          >학교가는 길</span
        >
        <div>
          <span class="loc-item">장소: </span>
          <span class="loc-item" id="loc-now">걸어가는 길</span>
        </div>
      </div>
      <div id="status" class="nav-item"></div>
      <div id="option" class="nav-item"></div>
    </nav>
    <div id="container" class="background-running">
      <div class="main-box">
        <div class="player-walking">
          <img
            src="../src/images/transportation/man-walking.gif"
            alt="player"
            onclick="jump()"
          />
        </div>
        <div class="intro-box">
          <h1>퀴즈 풀어서 마주치는 사람 피하기!</h1>
          다른 사람과의 대면 접촉을 제한하는 것이 코로나바이러스 감염증
          2019(COVID-19) 전파를 줄이는 가장 좋은 방법입니다. 사회적 거리두기는
          "물리적 거리두기"라고도 하며 집 밖에서 다른 사람들과의 거리를 유지하는
          것입니다. 사회적 또는 물리적 거리두기를 실천하기 위해서는 다른
          사람들과 최소
          <b style="background-color: yellow;">6피트 거리(대략 팔 2개 길이)</b
          >를 유지해야 합니다.
          <h3>길가에 사람이 많습니다!</h3>
          <h3>
            길가에 있는 사람들과 적절한 거리를 두어 사회적 거리두기를
            실천하세요!
          </h3>
          <h3>퀴즈의 정답을 맞춰 사람들을 피해 이동하세요!</h3>
        </div>
        <div class="quiz-boxes">
          <div class="quiz-box-1">
            <h1>코로나 일반 국민 예방 수칙 중 <b>옳은 것</b>은 무엇일까?</h1>
            <h2 onclick="incorrectAnswer()">
              1. 고인 물에 비누로 꼼꼼히 손 씻기
            </h2>
            <h2 onclick="correctAnswer()">
              2. 기침, 재채기할 때 옷소매로 입과 코 가리기
            </h2>
            <h2 onclick="incorrectAnswer()">
              3. 씻지 않은 손으로 눈, 코, 입 만지기
            </h2>
            <h3>정답을 클릭하세요!</h3>
          </div>

          <div class="quiz-box-2">
            <h1>코로나 일반 국민 예방 수칙 중 <b>틀린 것</b>은 무엇일까?</h1>
            <h2 onclick="incorrectAnswer()">
              1. 의료기관 방문 시 마스크 착용하기
            </h2>
            <h2 onclick="correctAnswer()">
              2. 사람 많은 곳은 눈치 보며 기꺼이 방문하기
            </h2>
            <h2 onclick="incorrectAnswer()">
              3. 발열, 호흡기 증상이 있는 사람과 접촉 피하기
            </h2>
            <h3>정답을 클릭하세요!</h3>
          </div>

          <div class="quiz-box-3">
            <h1>다음 중 <b>올바른</b> 마스크 착용법은 무엇일까?</h1>
            <h2 onclick="incorrectAnswer()">
              1. 수건이나 휴지를 덧대서 밀착력을 높여 성능을 강화하기
            </h2>
            <h2 onclick="correctAnswer()">
              2. 얼굴 크기에 맞는 마스크를 선택해 잘 밀착되도록 착용하기
            </h2>
            <h2 onclick="incorrectAnswer()">
              3. 착용 후 마스크 겉면을 골고루 만져서 얼굴과 밀착시키기
            </h2>
            <h3>정답을 클릭하세요!</h3>
          </div>
        </div>
        <div class="result-boexes">
          <!--응답 결과-->
          <div class="result-correct">
            <h1>정답입니다!</h1>
          </div>
          <div class="result-incorrect">
            <h1>오답입니다 ...</h1>
          </div>
        </div>
      </div>
    </div>

    <script>
    make_form();
    setStatus();
    setOption();

    const CHAGNE_OF_VIRUS = 3;

    function go_to_next() {
      put_input();
      const form = document.getElementById("status_form");
      form.setAttribute("action", "atCorridor.jsp");
      form.submit();
    }
  </script>
   <script>
    	current_gauge = <%=virus%>;
		money_amount = <%=money%>;
		user_name = "<%=name%>";
		change_gauge(0);
		change_money_amount(0);
    </script>
  <script type="text/javascript">
    // 첫 화면, 설명 박스 사라지게 하기
    function start() {
      setTimeout(function () {
        $(".intro-box").css("display", "none");
      }, 4500);
    }

    // 플레이어 클릭하면 점프하기
    var player = document.querySelector(".player-walking");
    function jumpUp() {
      player.style.top = "150px";
    }
    function jumpDown() {
      player.style.top = "350px";
    }
    function jump() {
      jumpUp();
      setTimeout(jumpDown, 500);
    }

    // 재시작 아이콘 클릭하면 배경 정지/재생하기
    $("#icon-retry").click(function (e) {
      e.preventDefault();
      $(".background-running").toggleClass("background-paused");
    });

    // 퀴즈 이벤트 발생
    var quizBoxSelected = $(".quiz-boxes").children(":first");

    function quiz() {
      if ($(".quiz-boxes").children().length === 0) {
        setTimeout(function () {
          alert("시험장 도착 성공");
          go_to_next();
        }, 6000);
      } else {
        setTimeout(stopForQuiz, 4500);
      }
    }

    // 다음 단계로 넘어가는 기능

    function stopForQuiz() {
      // 멈추고 퀴즈 이벤트
      $(".background-running").addClass("background-paused");
      $(".quiz-boxes").children(":first").css("display", "block");
    }

    function incorrectAnswer() {
      // 오답
      $(".background-running").removeClass().addClass("background-running");
      $(".quiz-boxes").children(":first").remove();

      change_gauge(CHAGNE_OF_VIRUS);

      $(".result-incorrect").css("display", "block"); // 오답 알림 표시
      setTimeout(function () {
        $(".result-incorrect").css("display", "none");
        check_life();
      }, 1000);

      quiz();
    }

    function correctAnswer() {
      // 정답
      $(".background-running").removeClass().addClass("background-running");
      $(".quiz-boxes").children(":first").remove();

      $(".result-correct").css("display", "block"); // 정답 알림 표시
      setTimeout(function () {
        $(".result-correct").css("display", "none");
      }, 1000);

      if (current_gauge > CHAGNE_OF_VIRUS) {
        change_gauge(-CHAGNE_OF_VIRUS);
      } else if (current_gauge > 0) {
        change_gauge(-current_gauge);
      }

      player.style.top = "550px";
      setTimeout(jumpDown, 1000); // 사람을 피해가는 플레이어 동작
      quiz();
    }
    start();
    quiz();
  </script>
  </body>

</html>
