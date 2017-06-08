### 编写模版

使用一个type="text/html"的script标签存放模板，或者放到字符串中：

	<script id="tpl" type="text/html">
	<ul>
		<%for(var i = 0; i < list.length; i++) {%>
		<li><%:=list[i].name%></li>
		<%}%>
	</ul>
	</script>

### 渲染模板

	var tpl = document.getElementById('tpl').innerHTML;
	template(tpl, {list: [{name: "Julian"},{name: "anla"}]});

输出结果：

	<ul>
		<li>Julian</li>
		<li>anla</li>
	</ul>