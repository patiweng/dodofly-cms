package com.dodofly.cms.service.log;

import com.dodofly.cms.bean.BaseResult;
import com.dodofly.cms.webdto.LogCmsUserDTO;

public interface RunUserLoginService {
	
	
	public BaseResult<LogCmsUserDTO> login(String userName, String password);
	public BaseResult<LogCmsUserDTO> checkLogin(String token);
	public BaseResult<String> editPwd(String userName, String oPwd, String nPwd);
}
