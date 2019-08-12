//弹出新增窗口
$("#add").click(function(){
	$(".formtips").remove();
	$("#id").prop("value","");
	$("#require_id").prop("value","");
	$("#description").prop("value","");
	$("#min_play_times").prop("value","");
	$("#max_play_times").prop("value","");
	$("#totalModal").modal("show");
});
//新增
$("#select").click(function() {
	$("#currentPage").prop("value", "1");
});
//首页,尾页
$(".query").click(function() {
	$("#currentPage").prop("value", $(this).attr("value"));
	$("#form").submit();
});
//上一页
$("#prev").click(function() {
	$("#currentPage").prop("value", $(this).attr("value"));
	if ($("#currentPage").attr("value") != 0) {
		$("#form").submit();
	}
});
//下一页
$("#next").click(
		function() {
			$("#currentPage").prop("value", $(this).attr("value"));
			if ($("#currentPage").attr("value") != (parseInt($("#last").attr(
					"value")) + 1)) {
				$("#form").submit();
			}
		});
		
//新增
$("#save").click(function(){					
	//var r = /^[0-9]*[1-9][0-9]*$/;　　//正整数包含0
	var r=/^[0-9]\d{0,5}$/;
	var $container = $("#inputcontent").parent();
	$(".formtips").remove();
 	if($("#require_id").val().replace(/^\s+|\s+$/g,"") == "") {
		$container.append('<span class="formtips" style="color:red;">requireid不得为空</span>');
		return false;
	}
 	if(!r.test($("#require_id").val())) {
		$container.append('<span class="formtips" style="color:red;">*requireid必须为正整数(最大6位)</span>');
		return false;
	} 
	if($("#description").val().replace(/^\s+|\s+$/g,"") == "") {
		$container.append('<span class="formtips" style="color:red;">*特殊奖励描述不得为空</span>');
		return false;
	}	
	if($("#min_play_times").val().replace(/^\s+|\s+$/g,"") == "") {
		$container.append('<span class="formtips" style="color:red;">*最小抽奖次数不得为空</span>');
		return false;
	}	
	if(!r.test($("#min_play_times").val())) {
		$container.append('<span class="formtips" style="color:red;">*最小抽奖次数必须为正整数(最大6位)</span>');
		return false;
	} 
	if($("#max_play_times").val().replace(/^\s+|\s+$/g,"") == "") {
		$container.append('<span class="formtips" style="color:red;">*最大抽奖次数不得为空</span>');
		return false;
	}	
	if(!r.test($("#max_play_times").val())) {
		$container.append('<span class="formtips" style="color:red;">*最大抽奖次数必须为正整数(最大6位)</span>');
		return false;
	} 
});

function postData() {
$("#eventForm").ajaxSubmit(function(data) {  	
	 location.reload();
}); 
return false;
}
//删除
$(".deleteOne").click(function(){
    var id_ = $(this).attr("value");
    if(window.confirm('你确定要删除吗？')){
    	var url = "/run/cms/activity/delete/deleteonebyid";
    	$.post(url,{id:id_},function(msg){
    		if(null != msg){
    			alert(msg.errorMessage);
    			location.reload(); 
    		}
    	});
    }else{
    	return false;
    }
});
//修改
$(".edit").click(function(){
	$(".formtips").remove();
	var url = "/run/cms/activity/select/selectspecialawardone";
	var id = $(this).attr("value");
   $.get(url,{id:id}, function (data) {
	  $("#id").prop("value", data.id);
	  $("#description").prop("value", data.description);
	  $("#min_play_times").prop("value", data.minPlayTimes);
	  $("#max_play_times").prop("value", data.maxPlayTimes);
	  $("#require_id").prop("value", data.requireid);
	});
	$("#totalModal").modal("show");
});