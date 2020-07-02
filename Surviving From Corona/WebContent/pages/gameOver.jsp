<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>코로나에서 살아남기</title>
    <!--<link rel="stylesheet" type="text/css" href="../src/css/WP07_button.css"> 이건 뭔가요?-->
	<link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" 
				rel="stylesheet">
	<style>
		body {
		  overflow: hidden;
		  font-family: "Jua", sans-serif;
		}
		
		.background-area {
			
		}
			.background-area img{
				height: 120%;
				display: block;
				position:absolute;
				left:0;right:0%;top:0%;bottom:0; margin: auto;
				z-index: -999;
				opacity: 0.5;
				filter: blur(3px);
			}
		
		.page-area{
			position:absolute;
			left:0;right:0;top:25%;bottom:0; margin:auto;
			z-index: 1;
		}
		
		#title-area{
			text-shadow:-3px 0px 0px #fff,3px 0px 0px #fff,0px -3px 0px #fff,0px 3px 0px #fff;
			color: #f09644;
		}
		
		@keyframes title_area_anim {
			0%{background-position:0% 70%}
			50%{background-position:100% 31%}
			100%{background-position:0% 70%}
		}
		
		input[type=text] {
		  background-color: #32d199;
		  color: white;
		}
		
		.gameStartBtn {
			background: rgba(255,255,255,0.5);
			border: 5px solid #eb9f8a;
			border-radius: 30px;
			display: inline-block;
			cursor: pointer;
			color: #eb9f8a;
			font-size: 25px;
			padding: 16px 50px;
			text-decoration: none;
		}
			.gameStartBtn:hover {
			  background: rgba(255, 255, 255, 0.9);
			}
			.gameStartBtn:active {
			  background: rgba(255, 159, 138, 1);
			  color: white;
			}

		#footer{
			color:silver;
			font-size: 9px;
			text-align:center;
			
			position:absolute;
			left:0; bottom: 0;
			width: 100%;
			padding: 10px 0;
			
		}
	</style>
  </head>
  <body>
  	<script>
  		
		function Onclick_btn(){
			document.frm.submit();
			location.href = "./index.html";
		}
  	</script>
  	<nav class="navbar navbar-expand navbar-white bg-white">
  		<div class="container-fluid">
  			<div class="navbar-header">
  				<a class ="navbar-brand" href="/">Home</a>
  			</div>
  			<ul class = "nav navbar-nav">
  				<li><a href="./index.jsp">Rank</a></li>
  			</ul>
  		</div>
  	</nav>

	
	<div class="page-area">
		<div style="width:100%; height:220px; padding:20px;">
	
			<h1 class="display-3" id="title-area" style="text-align:center; 
			">GAME OVER</h1>
		
			<h3 style="text-align:center; width:0 auto;
			margin-top:5px;">당신은 개인방역에 소홀하여 코로나19에 걸리게 되었습니다.</h3>
			

			
			
		</div>
		
		
	
		<button class="gameStartBtn" 
		style=" margin:0 auto; display:block; margin-top:20px;" 
		onclick='Onclick_btn();' >처음으로 돌아가기</button>
		
		<iframe name="iframe" style="display:none;"></iframe>
  	</div>
	
  	
  		
	<footer id="footer"> 2020-1 고급웹프로그래밍 기말과제 김성주 유희선 이수형 홍승현</footer>
    
  </body>
</html>