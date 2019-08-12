package com.dodofly.cms.bean;

import lombok.Data;

import java.util.Date;


@Data
public abstract class BaseDTO {

    private Long   id;

    private String creator;

    private Date   gmtCreated;

    private String modifier;

    private Date   gmtModified;

   // private String isDeleted = YesOrNo.NO.getCode();


}
