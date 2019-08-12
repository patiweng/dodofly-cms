$(function(){
	function pwdBlurCheck(pwd){
		if(/^(?![^a-zA-Z]+$)(?!\D+$).{8,8}$/.test(pwd)){
			return true;
		}
		return false;
	}
	
    $('#modify').on('click', function () {
        var oldPassWd = $('#oldPassWd').val();
        var newPassWd = $('#newPassWd').val();
        var newPassWd2 = $('#newPassWd2').val();
        if (!oldPassWd.length) {
            $('.mpwd-tishi').text('请输入原密码');
            return false;
        }
        if (!newPassWd.length) {
            $('.mpwd-tishi').text('请您填写新密码');
            return false
        }
        if(!pwdBlurCheck(newPassWd)){
        	$('.mpwd-tishi').text('密码必须为由字母和数字组成的8位字符');
            return false
        }
        if (!newPassWd2.length) {
            $('.mpwd-tishi').text('请您填写确认密码');
            return false
        }
        
        if(newPassWd != newPassWd2){
        	$('.mpwd-tishi').text('两次密码不一致，请重新输入');
            return false
        }

        
        return true;
    })
});
