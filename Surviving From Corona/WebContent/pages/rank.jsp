<%@page import="java.sql.SQLException"%>
<%@ page language="java" 
	contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.util.ArrayList" %>
<!DOCTYPE html>
<html>
	<head>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
            rel="stylesheet">
		
		<meta charset="UTF-8">
		<title>코로나에서 살아남기</title>
		
	</head>
	<body>
		<%
		request.setCharacterEncoding("utf-8");
		int virus = Integer.parseInt(request.getParameter("virus")) ;
		int money = Integer.parseInt(request.getParameter("money"));
		String name = request.getParameter("user_name");
	  	%>
	  	<%-- <%
		  	int virus = 58 ;
			int money = 18000;
			String name = "유희선";
	  	%>--%>
	  	<% int point = 100000 - (virus*1000) + (money/200);
	  		if(point<0){point=0;}
	  	%>
		
		<nav class="navbar navbar-expand navbar-dark bg-dark">
            <div class="container">
                <div class="navbar-header">
                    <a class ="navbar-brand" href="./index.html">Home</a>
                </div>
            </div>
        </nav>
        
        <div class="jumbotron" style="background-color:#E0F8F1;">
            <div class="container">
            <h1 class="display-3" 
            style="width:0 auto; text-align:center; color:#6E6E6E;">Rank</h1></div>
        </div>
	
	
		
		
		<%
			 //DB JSP 연동
			String url = "jdbc:mysql://localhost:3306/Sun";
			String user = "root" ;
			String pswd = "2522";
			Connection conn=null;
			try{
				Class.forName("com.mysql.jdbc.Driver");
				conn = DriverManager.getConnection(url,user,pswd);
				
				System.out.println("DB connection is successful!");
			}catch(SQLException e){
				//out.println("Error occured!");
				//out.println("SQL Exception : "+e.getMessage());
			}finally{
				
			}
			
			String sql = "insert into Lab14 (name, points) values(?, ?)";
			//statement 객체
			PreparedStatement pstmt = conn.prepareStatement(sql);
			String usr_name = "";
			int points = 0;
			
			// name 명이 있다면,
			if(request.getParameter("user_name") != null){
			//if(true){
				usr_name = name;
				points = point;
				//points = Integer.parseInt(request.getParameter("points"));
				
				pstmt.setString(1,usr_name); //첫번쨰 물음표에!
				pstmt.setInt(2,points); //두번째 물음표에!
				ResultSet rs = null;
				pstmt.executeUpdate();
				
				
				if(rs != null){
					rs.close();
				}
			}
			
			
			
			
			
			
			
			//ResultSet 은 쿼리의 성공여부 반환 객체 int 로 해도 무방
			
			/* if(rs!=null){
				while(rs.next()){
					out.println("rs(id) : " + rs.getString("id"));	
					out.println("rs(names) : " + rs.getString("names"));
				}
			} */
			
			
			
			
		%>
		
		<% //랭킹 
			String qu = "select * from Lab14 order by points desc";
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery(qu);
		%>	
		<p style="margin-top:10px; background-color:#FA5858;
        color:white;width:0 auto;text-align:center;
        "/>Top 10
		<div style="overflow:scroll; width:0 auto; height:300px;">
		<% 	
			int cnt = 1;
			for(int i=0;i<10;i++){
				rs.next();
				String user_name = rs.getString("name");
				int user_point =  rs.getInt("points");
		%>		
		
			<div class="container col-8 alert alert-info" style="float:left;margin-left:200px;" >
	            <div style="clear:both;">
	                <div style="float:left;width:100%;">
	                    <div style="width:50%; float:left;">
	                        <p/><%=cnt %>. <%=user_name %>
	                        
	                    
	                    </div>
	                    
	                    <div style="width:50%; float:left;">
	                        <p/><%=user_point %> points
	                    </div>
	       			</div>
	       		</div>
	       	</div>
	       	<% cnt+=1; %>
		
		<%
			}
			
			if(pstmt != null){
				pstmt.close();
			}
			
			if(conn != null){
				conn.close();
			} 
		%>
		
		
		</div>
		
		
		
		<p>
			<div id="disqus_thread"></div>
			<script>
			
			/**
			*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
			*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
			/*
			var disqus_config = function () {
			this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
			this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
			};
			*/
			(function() { // DON'T EDIT BELOW THIS LINE
			var d = document, s = d.createElement('script');
			s.src = 'https://lab-final.disqus.com/embed.js';
			s.setAttribute('data-timestamp', +new Date());
			(d.head || d.body).appendChild(s);
			})();
			</script>
			<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
			                            
		
		</p>
	
	</body>
</html>
