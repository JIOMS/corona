<%@ page contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../src/css/main.css" />
    <link rel="stylesheet" href="../src/css/bus.css" />
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
          <span class="loc-item" id="loc-now">버스</span>
        </div>
      </div>
      <div id="status" class="nav-item"></div>
      <div id="option" class="nav-item"></div>
    </nav>

    <div class="background-bus">
      <div class="main-box">
        <div class="intro-box">
          <h1>사회적 거리 두기 게임 안내</h1>
          다른 사람과의 대면 접촉을 제한하는 것이 코로나바이러스 감염증
          2019(COVID-19) 전파를 줄이는 가장 좋은 방법입니다. 사회적 거리두기는
          "물리적 거리두기"라고도 하며 집 밖에서 다른 사람들과의 거리를 유지하는
          것입니다. 사회적 또는 물리적 거리두기를 실천하기 위해서는 다른
          사람들과 최소
          <b style="background-color: yellow;">6피트 거리(대략 팔 2개 길이)</b
          >를 유지해야 합니다. <br />
          <h3>버스에 사람이 많습니다!</h3>
          <h3>
            버스에 있는 사람들과 적절한 거리를 두어 사회적 거리두기를
            실천하세요!
          </h3>
          <h3>
            버스 우측 아래에 보이는 노란색 아이콘(플레이어)을 드래그하여
            움직이세요.
          </h3>
          <h3>
            플레이어를 적절히 움직여 모든 승객과의 거리를 250 이상으로
            만드세요!!
          </h3>

          <h2 id="click-go" onclick="go()">클릭하여 게임 진행하기</h2>
        </div>

        <div class="bus">
          <img src="../src/images//transportation/bus.png" alt="bus" />
        </div>

        <section>
          <b
            >사회적 거리두기: 캐릭터를 움직여 <br />
            모든 승객과의 거리를 <br />
            '250' 이상으로 만드세요!</b
          >
          <p>승객1와의 거리: <span></span></p>
          <p>승객2와의 거리: <span></span></p>
          <p>승객3와의 거리: <span></span></p>
          <p>승객4와의 거리: <span></span></p>
          <p>승객5와의 거리: <span></span></p>
          <p>승객6와의 거리: <span></span></p>
          <p>승객7와의 거리: <span></span></p>
          <p>승객8와의 거리: <span></span></p>
        </section>

        <img
          class="person1"
          src="../src/images/transportation/person-1.png"
          style="left: 857px; top: 346px;"
        />
        <img
          class="person2"
          src="../src/images/transportation/person-2.png"
          style="left: 1285px; top: 687px;"
        />
        <img
          class="person3"
          src="../src/images/transportation/person-3.png"
          style="left: 545px; top: 566px;"
        />
        <img
          class="person4"
          src="../src/images/transportation/person-4.png"
          style="left: 655px; top: 417px;"
        />
        <img
          class="person5"
          src="../src/images/transportation/person-5.png"
          style="left: 1134px; top: 327px;"
        />
        <img
          class="person6"
          src="../src/images/transportation/person-6.png"
          style="left: 759px; top: 677px;"
        />
        <img
          class="person7"
          src="../src/images/transportation/person-7.png"
          style="left: 1528px; top: 527px;"
        />
        <img
          class="person8"
          src="../src/images/transportation/person-8.png"
          style="left: 1359px; top: 343px;"
        />
        <img
          class = "player"
          src="../src/images/transportation/me.png"
          style="left: 1524px; top: 684px; width: 85px;"
          onmousedown="startDrag(event, this)"
        />
      </div>
    </div>
    <script>
      make_form();
      setStatus();
      setOption();

      const CHANGE_OF_VIRUS = 3;

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
      var img_L = 0;
      var img_T = 0;
      var targetObj;
      var sumDistance = 0;

      // 처음 화면에서 진행하기
      function go() {
        $(".main-box").children(":first").remove();
      }

      // 좌표 얻기
      function getLeft(o) {
        return parseInt(o.style.left.replace("px", ""));
      }
      function getTop(o) {
        return parseInt(o.style.top.replace("px", ""));
      }

      // 드래그 시작
      function startDrag(e, obj) {
        console.log("dragStart");
        targetObj = obj;
        var e_obj = window.event ? window.event : e;
        img_L = getLeft(obj) - e_obj.clientX;
        img_T = getTop(obj) - e_obj.clientY;

        document.onmousemove = moveDrag; // 버튼을 누르고 있을 때
        document.onmouseup = stopDrag; // 버튼에서 떨어짐

        if (e_obj.preventDefault) e_obj.preventDefault();
      }

      // 이미지 움직이는 함수 정의
      function moveDrag(e) {
        var e_obj = window.event ? window.event : e;
        var dmvx = parseInt(e_obj.clientX + img_L);
        var dmvy = parseInt(e_obj.clientY + img_T);
        targetObj.style.left = dmvx + "px";
        targetObj.style.top = dmvy + "px";

        console.log(targetObj.style.top, targetObj.style.left);
        return false;
      }

      // 드래그 멈추기
      // 드래그 멈추기
      function stopDrag(){
          document.onmousemove = null;
          document.onmouseup = null;
          console.log("dragStop");


          // 이동시킨 객체 좌표 구하기
          var getXObjMoved = targetObj.getBoundingClientRect().x;
          var getYObjMoved = targetObj.getBoundingClientRect().y;

          // 종료조건 
          var cnt=0;
          // 버스 범위 밖으로 벗어나면 경고
          if( getXObjMoved < 490 || getXObjMoved > 1555 || getYObjMoved < 330 || getYObjMoved > 700){

            $(".player").css("top", "684px"); $(".player").css("left", "1524px"); // 플레이어 위치 초기화
            alert("버스 밖으로 벗어나면 안 돼요!");

          }else{ // 범위 안에서 움직였을 때 계속 진행
            document.querySelector("section").remove();
            document.querySelector(".main-box").appendChild(document.createElement("section")).innerHTML = "<b>사회적 거리두기: 캐릭터를 움직여 <br> 모든 승객과의 거리를 <br> '250' 이상으로 만드세요!</b>";

            for(var i=0; i<8; i++){ // 거리 출력하기

              // 다른 객체 좌표 구하기
              var getXOtherObj = parseInt(document.querySelector(".person"+(i+1)).style.left.replace('px', ''));
              var getYOtherObj = parseInt(document.querySelector(".person"+(i+1)).style.top.replace('px', ''));

              // 거리 구하기
              var distance = Math.sqrt(Math.pow((getXObjMoved-getXOtherObj),2)+Math.pow((getYObjMoved-getYOtherObj),2));

              // 거리 출력
              let para = document.createElement('p');
              if(distance <= 250){
                para.innerHTML  = "승객"+(i+1)+"와의 거리: " + "<span>" + distance.toFixed(2) + "</span>";
              }else{
                para.innerHTML  = "승객"+(i+1)+"와의 거리: " + distance.toFixed(2);
                cnt+=1;
              }
              document.querySelector("section").appendChild(para);
            }// for

            
            
            
            
            
            // 성공 메시지 출력 & 전환 
            if(cnt == 8){
              setTimeout(function success(){
            	  alert("사회적 거리 두기에 성공했습니다!")
            	  // 게이지 연산 
	            if (current_gauge > CHANGE_OF_VIRUS) {
	            change_gauge(-CHANGE_OF_VIRUS);
	          	} else if (current_gauge > 0) {
	            change_gauge(-current_gauge);
	        	}
            	  
            	  go_to_next();	  
              
              }, 500);

            }else{
            	change_gauge(CHANGE_OF_VIRUS);
                check_life();
            }
            
          } // else문 
      } // stopDrag End
            
        
        
        /* if (current_gauge > CHANGE_OF_VIRUS) {
            change_gauge(-CHANGE_OF_VIRUS);
          } else if (current_gauge > 0) {
            change_gauge(-current_gauge);
        } */
        // 성공 메시지 출력
/*          if (document.querySelector("span") == null) {
          setTimeout(function success() {
            alert("사회적 거리 두기에 성공했습니다!");
            //location.href = 'atCorridor.html';
            go_to_next();
          }, 500);

          // 다음 단계로 넘어가는 기능 작성하기
        } *//*  else {
          change_gauge(CHANGE_OF_VIRUS);
          check_life();
          
        } */
      </script>
  </body>
</html>
