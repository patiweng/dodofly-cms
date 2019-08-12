package com.dodofly.cms.webdto;

import com.dodofly.cms.bean.BaseDTO;
import lombok.Data;

import java.io.Serializable;

@Data
public class LogSysMenuDTO extends BaseDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	//菜单名称
	private String menuName;
	//是否为根菜单
	private String isRoot;
	//父菜单
	private String parentId;
	//菜单URL
	private String menuUrl;
	//菜单样式
	private String menuClass;
}
