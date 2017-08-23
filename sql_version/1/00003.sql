INSERT INTO `admin_menu` (`id`, `k`, `uri`, `name`, `parent`, `icon`, `create_time`, `update_time`)
VALUES
	(27,'27','/admin/sys/file','文件操作','1','file',1496803222,1496803222);


insert into `dbver` (`ver`, `changelog`,`dateline`) values ('3', '初始化',unix_timestamp());