$(function(){
	$(".btn").click(function(){
		$("#currentPage").prop("value", "1");
	});
	$(".query").click(function(){
		$("#currentPage").prop("value", $(this).attr("value"));
		$("#form").submit();
	});
	$("#prev").click(function(){
		$("#currentPage").prop("value", $(this).attr("value"));
		if($("#currentPage").attr("value") != 0) {
			$("#form").submit();
		}
	});
	$("#next").click(function(){
		$("#currentPage").prop("value", $(this).attr("value"));
		if($("#currentPage").attr("value") != (parseInt($("#last").attr("value")) + 1)) {
			$("#form").submit();
		}
	});
});