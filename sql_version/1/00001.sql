DROP TABLE IF EXISTS `admin_menu`;

CREATE TABLE `admin_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `k` varchar(32) NOT NULL DEFAULT '',
  `uri` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `parent` varchar(32) NOT NULL DEFAULT '',
  `icon` varchar(32) NOT NULL DEFAULT '',
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `k` (`k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `admin_menu` (`id`, `k`, `uri`, `name`, `parent`, `icon`, `create_time`, `update_time`)
VALUES
	(1,'1','/admin/sys','系统','0','',1496803222,1496803222),
	(2,'2','/admin/sys/dashboard','Dashboard','1','desktop',1496803222,1496803222),
	(3,'3','/admin/sys/user','管理员','1','user',1496803222,1496803222),
	(4,'4','/admin/sys/right','权限管理','1','lock',1496803222,1496803222),
	(5,'5','/admin/sys/platform','平台基本信息','1','hdd',1496803222,1496803222),
	(10,'10','/admin/wechat','微信公众平台','0','',1496803222,1496803222),
	(11,'11','/admin/wechat/baseSetting','基本信息设置','10','setting',1496803222,1496803222),
	(12,'12','/admin/wechat/user','用户管理','10','user',1496803222,1496803222),
	(13,'13','/admin/wechat/ugroup','用户群组','10','team',1496803222,1496803222),
	(14,'14','/admin/wechat/material','素材管理','10','file',1496803222,1496803222),
	(15,'15','/admin/wechat/qrcode','带参数二维码','10','qrcode',1496803222,1496803222),
	(16,'16','/admin/wechat/mass','群发消息','10','mail',1496803222,1496803222),
	(17,'17','/admin/wechat/shortLink','短连接','10','link',1496803222,1496803222),
	(18,'18','/admin/wechat/menu','自定义菜单','10','',1496803222,1496803222),
	(19,'19','/admin/wechat/kf','客服','10','phone',1496803222,1496803222),
	(20,'20','/admin/sys/commonUser','用户列表','1','team',1496803222,1496803222);



DROP TABLE IF EXISTS `admin_right_base`;

CREATE TABLE `admin_right_base` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uri` varchar(255) DEFAULT '/' COMMENT '权限对应uri',
  `name` varchar(32) DEFAULT NULL COMMENT '权限名',
  `menu_k` int(11) DEFAULT NULL COMMENT '所属menu 表k',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='接口权限表';


INSERT INTO `admin_right_base` (`id`, `uri`, `name`, `menu_k`, `create_time`, `update_time`)
VALUES
	(2,'/admin/sys/user/list','管理员列表',3,1496803222,1496803222),
	(3,'/admin/sys/user/add','添加管理员',3,1496803222,1496803222),
	(10,'/admin/sys/user/edit_user_right','编辑管理员权限',3,1496803222,1496803222),
	(11,'/admin/sys/right/add_group','添加权限分组',4,1496803222,1496803222),
	(12,'/admin/sys/right/add_group_detail','为权限分组配置权限',4,1496803222,1496803222),
	(13,'/admin/sys/right/group_list','权限分组列表',4,1496803222,1496803222),
	(14,'/admin/sys/right/edit_group','编辑权限分组',4,1496803222,1496803222),
	(15,'/admin/sys/right/remove_group','删除权限分组',4,1496803222,1496803222),
	(16,'/admin/sys/right/group_detail_info','权限分组详细信息',4,1496803222,1496803222),
	(17,'/admin/sys/user/get_user_right','获取用户权限分组',3,1496803222,1496803222),
	(18,'/admin/sys/user/reset_passwd','重置密码',3,1496803222,1496803222),
	(19,'/admin/sys/user/remove_user','删除用户',3,1496803222,1496803222),
	(20,'/admin/sys/right/group_all_list','获取所有权限分组',4,1496803222,1496803222),
	(21,'/admin/sys/right/all_right_list','获取所有权限分组',4,1496803222,1496803222);


DROP TABLE IF EXISTS `admin_right_group`;

CREATE TABLE `admin_right_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL COMMENT '权限分组名',
  `is_super` int(11) DEFAULT '0' COMMENT '1是超管 0不是超管',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限分组';


INSERT INTO `admin_right_group` (`id`, `name`, `is_super`, `create_time`, `update_time`)
VALUES
	(1,'超级管理员',1,1496803222,1496803222);


DROP TABLE IF EXISTS `admin_right_group_detail`;

CREATE TABLE `admin_right_group_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rgid` int(11) DEFAULT NULL COMMENT 'admin_right_group 表id',
  `type` int(11) DEFAULT NULL COMMENT '1为接口权限 2为菜单权限',
  `rbid` int(11) DEFAULT NULL COMMENT '1 为 admin_right_base 表 id 2为 admin_menu 表 k',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限分组详情';




DROP TABLE IF EXISTS `admin_user`;

CREATE TABLE `admin_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `admin_user` (`id`, `account`, `password`, `create_time`, `update_time`)
VALUES
	(1,'admin','e10adc3949ba59abbe56e057f20f883e',1496803222,1496803222);



DROP TABLE IF EXISTS `admin_user_right`;

CREATE TABLE `admin_user_right` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT 'admin_user 表id',
  `rgid` int(11) DEFAULT NULL COMMENT 'admin_right_group 表id',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户权限表';


INSERT INTO `admin_user_right` (`id`, `uid`, `rgid`, `create_time`, `update_time`)
VALUES
	(1,1,1,1496803222,1496803222);


DROP TABLE IF EXISTS `admin_webchat_list`;

CREATE TABLE `admin_webchat_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '公众号名称',
  `appid` varchar(32) DEFAULT NULL,
  `appsecret` varchar(128) DEFAULT NULL,
  `is_default` int(11) DEFAULT '0' COMMENT '0 未启动 1 启动',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公众号列表';



DROP TABLE IF EXISTS `dbver`;

CREATE TABLE `dbver` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ver` int(11) DEFAULT NULL,
  `changelog` varchar(255) DEFAULT NULL,
  `dateline` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account` varchar(64) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  `nickname` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `wx_unionid` varchar(64) DEFAULT NULL,
  `status` int(11) DEFAULT '1' COMMENT '1 正常 0封禁',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `wx_material`;

CREATE TABLE `wx_material` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `wechat_id` int(11) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `media_id` varchar(128) DEFAULT NULL,
  `name` varchar(255) DEFAULT '''''',
  `data` text,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `media_id` (`media_id`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='微信永久素材';



DROP TABLE IF EXISTS `wx_qrcode`;

CREATE TABLE `wx_qrcode` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `wechat_id` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '1 永久 2临时',
  `sceneId` int(11) DEFAULT NULL COMMENT '场景id',
  `ticket` varchar(255) DEFAULT NULL,
  `expire_seconds` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




DROP TABLE IF EXISTS `wx_short_link`;

CREATE TABLE `wx_short_link` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `wechat_id` int(11) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `short_link` varchar(255) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `wx_user`;

CREATE TABLE `wx_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wechat_id` int(11) NOT NULL,
  `unionid` varchar(64) NOT NULL DEFAULT '',
  `openid` varchar(64) NOT NULL DEFAULT '',
  `city` varchar(128) DEFAULT NULL,
  `country` varchar(128) DEFAULT NULL,
  `groupid` int(11) DEFAULT NULL,
  `headimgurl` varchar(255) DEFAULT NULL,
  `language` varchar(32) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL COMMENT 'base64编码',
  `province` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `subscribe` int(11) DEFAULT NULL COMMENT '1 关注 0 未关注',
  `subscribe_time` int(11) DEFAULT NULL,
  `tagid_list` text,
  `privilege` text,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `unionid` (`unionid`),
  KEY `openid` (`openid`),
  KEY `wechat_id` (`wechat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='微信公众号用户信息（不适用于 xcx 开放平台）';



DROP TABLE IF EXISTS `wx_user_groups`;

CREATE TABLE `wx_user_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `wechat_id` int(11) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gid` (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


insert into `dbver` (`ver`, `changelog`,`dateline`) values ('1', '初始化',unix_timestamp());