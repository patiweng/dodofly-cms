
//搜索
$("#select").click(function() {
	$("#currentPage").prop("value", "1");
});
// 首页,尾页
$(".query").click(function() {
	$("#currentPage").prop("value", $(this).attr("value"));
	$("#form").submit();
});
// 上一页
$("#prev").click(function() {
	$("#currentPage").prop("value", $(this).attr("value"));
	if ($("#currentPage").attr("value") != 0) {
		$("#form").submit();
	}
});
// 下一页
$("#next").click(
		function() {
			$("#currentPage").prop("value", $(this).attr("value"));
			if ($("#currentPage").attr("value") != (parseInt($("#last").attr(
					"value")) + 1)) {
				$("#form").submit();
			}
		});

// 新增
$("#save")
		.click(
				function() {
					var $container = $("#inputcontent").parent();
					$(".formtips").remove();
					if ($("#customer_address").val().replace(/^\s+|\s+$/g, "") == "") {
						$container
								.append('<span class="formtips" style="color:red;">地址不得为空</span>');
						return false;
					}
				});

function postData() {
	$("#eventForm").ajaxSubmit(function(data) {
		location.reload();
	});
	return false;
}

// 修改
$(".edit").click(function() {
	$(".formtips").remove();
	var url = "/run/cms/activity/select/selectawardrecordone";
	var id = $(this).attr("value");
	$.get(url, {
		id : id
	}, function(data) {
		$("#id").prop("value", data.id);
		$("#customer_address").prop("value", data.customerAddress);
	});
	$("#totalModal").modal("show");
});
// 渲染礼物名称下拉框
$("#identify_").blur(function() {
	// $("#present_id").append("<option value='1'>苹果手机</option>");
	var identify_val = $("#identify_").val();
	$.ajax({
		type : "GET",
		url : "/run/cms/activity/getpresentnamearrlist",
		data:{identify:identify_val},
		dataType : "json",
		success : function(data) {
			var flag = data.success;
			$("#present_id").empty();//清空所有选项
			$("#present_id").append("<option value='0'>请选择</option>");
			if (flag) {
				var jsonStr = data.value;
				var jsonarr = eval(jsonStr);
				for (var i = 0; i < jsonarr.length; i++) {
					$("#present_id").append("<option value='"+jsonarr[i].id+"'>"+jsonarr[i].name+"</option>");
				}
			}
		}
	});
});

$("#doexcel").click(function(){
	var identify_ = $("#identify_").val();
	var presentId_ = $("#present_id").val();
	var customerPhone_ = $("#customer_phone").val();
	var channelFrom_ = $("#channel_no").val();
	var sdate_=$("#sdate").val();
	var edate_=$("#edate").val();
	var url="/run/cms/activity/excel/doexportexcel";
	if (identify_!="") {
		url=url + "/" + identify_;
	}else{
		url=url + "/null";
	}
	url=url+ "/" + presentId_;  //不可能为空
	if (customerPhone_!="") {
		url=url + "/" + customerPhone_;
	}else{
		url=url + "/null";
	}
	url=url+ "/" + channelFrom_;  //不可能为空
	if(sdate_!=null){
		url=url + "/" + sdate_;
	}else{
		url=url + "/null";
	}
	if(edate_!=null){
		url=url + "/" + edate_;
	}else{
		url=url + "/null";
	}
	window.location.href = url;
});

$(function(){
	alert(1);
});