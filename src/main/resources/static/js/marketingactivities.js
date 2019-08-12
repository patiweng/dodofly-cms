$(function(){
  $("#add").click(function(){
	$(".formtips").remove();
	$("#activity-name").prop("value", "");
	$("#area-text").find("option[value=0]").prop("selected",true);
	$("#activity-type").find("option[value=0]").prop("selected",true);
	$(":radio[value=1][class=inlineRadio]").prop("checked",true);
	$("#totalModal").modal("show");
  });
});

$(function(){
  $(".edit").click(function(){
	$(".formtips").remove();
	var url = "/b2g/bops/marketingactivities/selectbyid/marketingactivity/" + $(this).attr("value");
    $.get(url, function (data) {
      $("#activity-id").prop("value", data.id);
	  $("#activity-name").prop("value", data.marketingActivitiesName);
	  $("#area-text").find("option[value=" + data.accessPartyId + "]").prop("selected",true);
	  $("#activity-type").find("option[value=" + data.marketingActivitiesType + "]").prop("selected",true);
	  $(":radio[value=" + data.marketingActivitiesStatus + "][class=inlineRadio]").prop("checked",true);
  	});
	$("#totalModal").modal("show");
  });
});

$(function(){
	$(".btn").click(function(){
		$(".formtips").remove();
		var $parentName = $("#activity-name").parent();
		if($("#activity-name").val().replace(/^\s+|\s+$/g,"") == "") {
			$parentName.append("<span class='formtips'>*活动名称不得为空</span>");
			return false;
		}
		
		var $parentArea = $("#area-text").parent();
		if($("#area-text").val() == 0) {
			$parentArea.append("<span class='formtips'>*接入方不能为空</span>");
			return false;
		}
		
		var $parentAct = $("#activity-type").parent();
		if($("#activity-type").val() == 0) {
			$parentAct.append("<span class='formtips'>*活动类型不能为空</span>");
			return false;
		}
	});
	
	$(".selectAct").change(function(){
    	$(".formtips").remove();
    });
});