<%@ page contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>코로나에서 살아남기</title>
    <link rel="stylesheet" href="../src/css/main.css" />
    <link rel="stylesheet" href="../src/css/atTestRoom.css" />
    <script src="../src/js/main.js"></script>
    <script src="../src/js/options.js"></script>
    <script src="../src/js/atTestRoom.js"></script>
    <script src="../src//js/lib/threeJS/build/three.js"></script>
    <!-- <script
      type="module"
      src="../src/js/lib/threeJS/examples/jsm/controls/PointerLockControls.js"
    ></script> -->
    <script src="../src/js/lib/threeJS/build/threex.domevents.js"></script>
    <script
      type="module"
      src="../src/js/lib/threeJS/src/geometries/TextGeometry.js"
    ></script>
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
          >시험</span
        >
        <div>
          <span class="loc-item">장소: </span>
          <span class="loc-item" id="loc-now">강의실</span>
        </div>
      </div>
      <div id="status" class="nav-item"></div>
      <div id="option" class="nav-item"></div>
    </nav>
    <div id="container"></div>
    <script>
      make_form();
      setStatus();
      setOption();
      init();
      setRoom();
      // controls.update();
    </script>
    <script>
    		current_gauge = <%=virus%>;
		money_amount = <%=money%>;
		user_name = "<%=name%>";
		change_gauge(0);
		change_money_amount(0);
    </script>
  </body>
</html>
