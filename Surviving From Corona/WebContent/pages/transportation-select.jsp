<%@ page contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../src/css/main.css" />
    <link rel="stylesheet" href="../src/css/transportation-select.css" />
    <title>코로나에서 살아남기</title>
    <script src="../src/js/main.js"></script>
    <script src="../src/js/options.js"></script>
  </head>
  <body>
    <%
	request.setCharacterEncoding("utf-8");
	int virus = Integer.parseInt(request.getParameter("virus"));
	int money = Integer.parseInt(request.getParameter("money"));
	String name = request.getParameter("user_name");
	out.println(name);
 	%>
    <div id="container">
      <h1>이동 수단을 선택하세요</h1>
      <div class="selection">
        <div class="transportation bus" onClick="go_to_next('./bus.jsp');">
          <img
            class="select"
            src="../src/images/transportation/icon-bus.png"
            alt=""
          />
        </div>
        <div class="transportation walk" onClick="go_to_next('./walk.jsp');">
          <img
            class="select"
            src="../src/images/transportation/icon-walk.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <script>
      make_form();
      current_gauge = <%=virus%>;
	  money_amount = <%=money%>;
	  user_name = "<%=name%>";
      function go_to_next(url) {
          put_input();
          const form = document.getElementById("status_form");
          form.setAttribute("action", url);
          form.submit();
        }
    </script>
  </body>
</html>
