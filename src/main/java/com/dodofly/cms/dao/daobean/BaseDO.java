package com.dodofly.cms.dao.daobean;

import com.dodofly.common.constants.YesOrNoEnum;
import lombok.Data;

import java.util.Date;

@Data
public abstract class BaseDO {

    private Long   id;

    private String creator;

    private Date   gmtCreated;

    private String modifier;

    private Date   gmtModified;

    private String isDeleted = YesOrNoEnum.NO.getCode();

}
