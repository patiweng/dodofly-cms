function GetResult() {
	ue.execCommand('preview');
}

function check() {
	$("#messageType").val("101");
	$(".formtips").remove();
	var $msgTitle = $("#msgTitle").parent();
	if($("#msgTitle").val().replace(/^\s+|\s+$/g,"") == "") {
		$msgTitle.append("<span class='formtips'>*发送主题不能为空</span>");
		return false;
	}
    var $container = $("#inputcontent").parent();
	if(ue.hasContents()==false){
		$container.append("<span class='formtips'>*发送内容不得为空</span>");
		return false;
	}
	if(ue.getContentLength(true) >100){
		$container.append("<span class='formtips'>*发送内容不得超过100个字符</span>");
		return false;
	}
	
	$("form :input").focus(function(){
    	$(".formtips").remove();
    });
	$(".conNewModal").modal('toggle');
	$("#send").click(function(){
		$("#form").submit();
	});
}

function postData() {
	$("#form").ajaxSubmit(function(data) {
		myAlert = $('.myalert');
		if(data.errorMessage == "0") {
			location.reload();
		} else {
			alert(data.errorDescription);
		}
	});
    return false;
}





