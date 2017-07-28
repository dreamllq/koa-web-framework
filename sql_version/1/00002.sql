
CREATE TABLE `th_xcx_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `appid` varchar(128) DEFAULT '',
  `nickname` varchar(255) DEFAULT '' COMMENT '授权方昵称',
  `head_img` text COMMENT '授权方头像',
  `verify_type_info` text COMMENT '授权方认证类型，-1代表未认证，0代表微信认证',
  `service_type_info` text COMMENT '默认为0',
  `user_name` varchar(255) DEFAULT '' COMMENT '小程序的原始ID',
  `signature` text COMMENT '账号介绍',
  `principal_name` text COMMENT '小程序的主体名称',
  `business_info` text,
  `qrcode_url` text,
  `func_info` text COMMENT '小程序授权给开发者的权限集列表',
  `refresh_token` varchar(255) DEFAULT '',
  `access_token` varchar(255) DEFAULT '',
  `expires_in` varchar(255) DEFAULT '',
  `create_time` int(11) DEFAULT '0',
  `update_time` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `appid` (`appid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `admin_menu` (`id`, `k`, `uri`, `name`, `parent`, `icon`, `create_time`, `update_time`)
VALUES
	(24,'24','/admin/third','第三方平台','0','',1496803222,1496803222),
	(25,'25','/admin/third/xcx_list','授权小程序管理','24','bars',1496803222,1496803222);

CREATE TABLE `th_xcx_audit_status` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `appid` varchar(255) DEFAULT '',
  `auditid` varchar(255) DEFAULT '',
  `name` varchar(255) DEFAULT '',
  `status` varchar(255) DEFAULT '' COMMENT '0为审核成功，1为审核失败，2为审核中',
  `page` varchar(255) DEFAULT '',
  `tag` varchar(255) DEFAULT '',
  `title` varchar(255) DEFAULT '',
  `info` text,
  `editor` varchar(255) DEFAULT '',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `admin_menu` (`id`, `k`, `uri`, `name`, `parent`, `icon`, `create_time`, `update_time`)
VALUES
	(26,'26','/admin/third/xcx_audit','小程序审核状态','24','coffee',1496803222,1496803222);

ALTER TABLE `th_xcx_audit_status` ADD `reason` TEXT  NULL;

ALTER TABLE `th_xcx_list` ADD `project_key` varchar(255) DEFAULT '';

ALTER TABLE `th_xcx_list` ADD `api_host` varchar(255) DEFAULT '';

insert into `dbver` (`ver`, `changelog`,`dateline`) values ('2', '初始化',unix_timestamp());