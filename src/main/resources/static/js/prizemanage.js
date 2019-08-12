$(function(){
  $("#add").click(function(){
	$(".formtips").remove();
	$("#prize-name").prop("value", "");
	$("#probability").prop("value", "");
	$("#prize-num").prop("value", "");
	$(":radio[value=1][class=inlineRadio]").prop("checked",true);
	$(":radio[value=1][class=typeRadio]").prop("checked",true);
	$(":radio[value=Y][class=prizeRadio]").prop("checked",true);
	$("#totalModal").modal("show");
  });
});

$(function(){
  $(".edit").click(function(){
	$(".formtips").remove();
	var url = "/b2g/bops/prizemanage/selectbyid/prizemanage/" + $(this).attr("value");
    $.get(url, function (data) {
      $("#prize-id").prop("value", data.id);
      $("#prize-winno").prop("value", data.prizeWinNo);
	  $("#prize-name").prop("value", data.prizeName);
	  $("#probability").prop("value", data.prizeWeight);
	  $("#prize-num").prop("value", data.prizeTotalNo);
	  $(":radio[value=" + data.distributedFlag + "][class=inlineRadio]").prop("checked",true);
	  $(":radio[value=" + data.status + "][class=typeRadio]").prop("checked",true);
	  $(":radio[value=" + data.prizeType + "][class=prizeRadio]").prop("checked",true);
  	});
	$("#totalModal").modal("show");
  });
});

$(function(){
	$(".btn").click(function(){
		$(".formtips").remove();
		var $parentName = $("#prize-name").parent();
		if($("#prize-name").val().replace(/^\s+|\s+$/g,"") == "") {
			$parentName.append("<span class='formtips'>*奖品名称不得为空</span>");
			return false;
		}
		
		var $parentWeight = $("#probability").parent();
		if($("#probability").val() <= 0 || $("#probability").val() > 100) {
			$parentWeight.append("<span class='formtips'>*中奖权重需在1-100之间</span>");
			return false;
		}
		
		var $parentCount = $("#prize-num").parent();
		if($("#prize-num").val() < 0) {
			$parentCount.append("<span class='formtips'>*奖品数量不得少于0</span>");
			return false;
		} else if(parseInt($("#prize-num").val()) < parseInt($("#prize-winno").val())) {
			$parentCount.append("<span class='formtips'>*奖品数量不得少于已领奖数量</span>");
			return false;
		}
	});
	
	$("form :input").focus(function(){
    	$(".formtips").remove();
    });
});