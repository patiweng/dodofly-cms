
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
    $(".delete").click(function(){
    	   var eventid = $(this).attr("value");
			 if(window.confirm('你确定要删除吗？')){
				 var url = "/b2g/bops/eventenroll/deleteeventenroll/"+eventid;
				 $.get(url, function (data){
					 if(data!=null){
						 location.reload(); 
					 }
				 });			
	          }else{            
	             return false;
	         }	 
		});
		
		
    $("#exceldata").click(function(){
 	   var id = $(this).attr("value"); 	  
	   var url = "/b2g/bops/eventenroll/excel/"+id;	   
	   window.location.href="/b2g/bops/eventenroll/excel/"+id;
	});
			
	