use gaokao;

drop table if exists user; /*用户表*/
create table user(
 userid varchar(20) primary key not null,
 password varchar(20) not null,
 root int /*权限：0为管理员 1为普通用户 2为学长学姐*/
);

truncate table user;
insert into user(userid,password,root) values('admin',123,0);
insert into user(userid,password,root) values('123',123,1);
insert into user(userid,password,root) values('456',123,1);
insert into user(userid,password,root) values('789',123,1);
insert into user(userid,password,root) values('111',123,2);
insert into user(userid,password,root) values('222',123,2);
insert into user(userid,password,root) values('333',123,2);

select * from user;

drop table if exists userinfo; /*用户信息*/
create table userinfo(
 userid varchar(20) primary key not null,
 name varchar(20) not null,
 avatar varchar(100) not null,
 cateid varchar(20),
 curplace varchar(40),
 subject varchar(20),
 score varchar(20),
 preapp varchar(50),
 prereg varchar(500),
 premajor varchar(500)
);

truncate table userinfo;

insert into userinfo (userid,name,avatar) values('123','白','');
insert into userinfo (userid,name,avatar) values('111','大白','');
insert into userinfo (userid,name,avatar) values('222','小白','');
insert into userinfo (userid,name,avatar) values('333','小小白','');

drop table if exists identity; /*身份认证*/
create table identity(
 userid varchar(20) primary key not null,
 school varchar(100) not null,
 major varchar(100) not null,
 year varchar(10) not null,
 imgStr varchar(100) not null,
 imgStrs varchar(100) not null,
 exam int  /* 审核: 0为未审核 1为已通过 2为未通过*/
);

truncate table identity;

drop table if exists seniors; /*学长学姐表*/
create table seniors(
 userid varchar(20) primary key not null,
 school varchar(50) not null,
 major varchar(50) not null,
 year char(5) not null
 );
 
truncate table seniors;

insert into seniors(userid,school,major,year) values('111','浙江理工大学','信息管理与信息系统','2016');
insert into seniors(userid,school,major,year) values('222','杭州电子科技大学','电子商务','2017');
insert into seniors(userid,school,major,year) values('333','浙江理工大学','电子商务','2015');

select * from seniors;

drop table if exists topic; /*存放测试题目*/
create table topic(
 tid varchar(20) primary key not null,
 id varchar(20) not null, /*类型*/
 title varchar(100), /*题目*/
 introduce varchar(1000),/*介绍*/
 img varchar(100)
);

truncate table topic;
insert into topic(tid,id,title,introduce,img) values('1','1','霍兰德兴趣测评','','');
insert into topic(tid,id,title,introduce,img) values('2','2','MBTI性格测评','','');

drop table if exists cate; /*类型*/
create table cate(
 cateid varchar(20) not null,
 id varchar(20) not null,
 catename varchar(20) not null,
 catekey varchar(20) not null,
 primary key(cateid,id)
);

truncate table cate;
insert into cate(cateid,id,catename,catekey) values('1','1','常规型','C');
insert into cate(cateid,id,catename,catekey) values('2','1','现实型','R');
insert into cate(cateid,id,catename,catekey) values('3','1','研究型','I');
insert into cate(cateid,id,catename,catekey) values('4','1','管理型','E');
insert into cate(cateid,id,catename,catekey) values('5','1','社会型','S');
insert into cate(cateid,id,catename,catekey) values('6','1','艺术型','A');

drop table if exists questions; /*题目*/
create table questions(
 qid varchar(20) not null,
 id varchar(20) not null,
 cateid varchar(20) not null,
 title varchar(100) not null,
 score int,
 primary key(qid,id)
);

truncate table questions;
insert into questions(qid,id,cateid,title,score) values('1','1','1','对别人借我的和我借别人的东西，我都能记得很清楚','1');
insert into questions(qid,id,cateid,title,score) values('2','1','1','我喜欢经常请示上级','1');
insert into questions(qid,id,cateid,title,score) values('3','1','1','我是一个沉静而不易动感情的人','1');
insert into questions(qid,id,cateid,title,score) values('4','1','1','我喜欢按部就班地完成要做的工作','1');
insert into questions(qid,id,cateid,title,score) values('5','1','1','我总留有充裕的时间去赴约会','1');
insert into questions(qid,id,cateid,title,score) values('6','1','1','我喜欢把一切安排得整整齐齐、井井有条','1');
insert into questions(qid,id,cateid,title,score) values('7','1','1','对于急躁、爱发脾气的人，我仍能以礼相待','1');
insert into questions(qid,id,cateid,title,score) values('8','1','1','每次写信我都一挥而就，不再重复','0');
insert into questions(qid,id,cateid,title,score) values('9','1','1','我办事很少思前想后','0');
insert into questions(qid,id,cateid,title,score) values('10','1','1','我希望能经常换不同的工作来做','0');
insert into questions(qid,id,cateid,title,score) values('11','1','2','在工作中我喜欢独自筹划，不愿受别人干涉','1');
insert into questions(qid,id,cateid,title,score) values('12','1','2','我喜欢在做事情前，对此事情做出细致的安排','1');
insert into questions(qid,id,cateid,title,score) values('13','1','2','我喜欢亲自动手制作一些东西，从中得到乐趣','1');
insert into questions(qid,id,cateid,title,score) values('14','1','2','我喜欢使用榔头一类的工具','1');
insert into questions(qid,id,cateid,title,score) values('15','1','2','如果掌握一门手艺并能以此为生，我会感到非常满意','1');
insert into questions(qid,id,cateid,title,score) values('16','1','2','我讨厌修理自行车、电器一类的工作','0');
insert into questions(qid,id,cateid,title,score) values('17','1','2','我的动手能力很差','0');
insert into questions(qid,id,cateid,title,score) values('18','1','2','我曾渴望当一名汽车司机','0');
insert into questions(qid,id,cateid,title,score) values('19','1','2','我讨厌跟各类机械打交道','0');
insert into questions(qid,id,cateid,title,score) values('20','1','2','我小时候经常把玩具拆开，把里面看个究竟','0');
insert into questions(qid,id,cateid,title,score) values('21','1','3','我经常不停地思考某一问题，直到想出正确的答案','1');
insert into questions(qid,id,cateid,title,score) values('22','1','3','我喜欢抽象思维的工作，不喜欢动手的工作','1');
insert into questions(qid,id,cateid,title,score) values('23','1','3','我喜欢需要运用智力的游戏','1');
insert into questions(qid,id,cateid,title,score) values('24','1','3','当我工作时，我喜欢避免干扰','1');
insert into questions(qid,id,cateid,title,score) values('25','1','3','我的理想是当一名科学家','1');
insert into questions(qid,id,cateid,title,score) values('26','1','3','我喜欢阅读自然科学方面的书籍和杂志','1');
insert into questions(qid,id,cateid,title,score) values('27','1','3','我很难做那种需要持续集中注意力的工作','0');
insert into questions(qid,id,cateid,title,score) values('28','1','3','我讨厌学数学','0');
insert into questions(qid,id,cateid,title,score) values('29','1','3','在实验室里独自做实验会令我寂寞难耐','0');
insert into questions(qid,id,cateid,title,score) values('30','1','3','遇到难解答的问题时，我常常放弃','0');
insert into questions(qid,id,cateid,title,score) values('31','1','4','我曾经渴望有机会参加探险','1');
insert into questions(qid,id,cateid,title,score) values('32','1','4','和不熟悉的人交谈对我来说毫不困难','1');
insert into questions(qid,id,cateid,title,score) values('33','1','4','当我开始做一件事情后，即使碰到再多的困难，我也要执著地干下去','1');
insert into questions(qid,id,cateid,title,score) values('34','1','4','我总是主动地向别人提出自己的建议','1');
insert into questions(qid,id,cateid,title,score) values('35','1','4','我更喜欢自己下了赌注的比赛或游戏','1');
insert into questions(qid,id,cateid,title,score) values('36','1','4','如果待遇相同，我宁愿当商品推销员，而不愿当图书管理员','1');
insert into questions(qid,id,cateid,title,score) values('37','1','4','我喜欢在人事部门工作','1');
insert into questions(qid,id,cateid,title,score) values('38','1','4','在集体讨论中，我往往保持沉默','0');
insert into questions(qid,id,cateid,title,score) values('39','1','4','我愿意从事虽然工资少、但是比较稳定的职业','0');
insert into questions(qid,id,cateid,title,score) values('40','1','4','和别人谈判时，我总是很容易放弃自己的观点','0');
insert into questions(qid,id,cateid,title,score) values('41','1','5','我很容易结识同性朋友','1');
insert into questions(qid,id,cateid,title,score) values('42','1','5','我乐于解除别人的痛苦','1');
insert into questions(qid,id,cateid,title,score) values('43','1','5','我喜欢作一名教师','1');
insert into questions(qid,id,cateid,title,score) values('44','1','5','大家公认我是一名勤劳踏实的、愿为大家服务的人','1');
insert into questions(qid,id,cateid,title,score) values('45','1','5','我喜欢把一件事情做完后再做另一件事','0');
insert into questions(qid,id,cateid,title,score) values('46','1','5','当我一个独处时，会感到更愉快','0');
insert into questions(qid,id,cateid,title,score) values('47','1','5','我喜欢参加各种各样的聚会','0');
insert into questions(qid,id,cateid,title,score) values('48','1','5','对于社会问题，我通常持中庸的态度','0');
insert into questions(qid,id,cateid,title,score) values('49','1','5','听别人谈“家中被盗”一类的事，很难引起我的同情','0');
insert into questions(qid,id,cateid,title,score) values('50','1','5','和一群人在一起的时候，我总想不出恰当的话来说','0');
insert into questions(qid,id,cateid,title,score) values('51','1','6','我喜欢做戏剧、音乐、歌舞、新闻采访等方面的工作','1');
insert into questions(qid,id,cateid,title,score) values('52','1','6','我喜欢成为人们注意的焦点','1');
insert into questions(qid,id,cateid,title,score) values('53','1','6','我喜欢不时地夸耀一下自己取得的好成就','1');
insert into questions(qid,id,cateid,title,score) values('54','1','6','音乐能使我陶醉','1');
insert into questions(qid,id,cateid,title,score) values('55','1','6','有些人太霸道，有时明明知道他们是对的，也要和他们对着干','1');
insert into questions(qid,id,cateid,title,score) values('56','1','6','我爱幻想','1');
insert into questions(qid,id,cateid,title,score) values('57','1','6','当接受新任务后，我喜欢以自己的独特方法去完成它','1');
insert into questions(qid,id,cateid,title,score) values('58','1','6','我有文艺方面的天赋','1');
insert into questions(qid,id,cateid,title,score) values('59','1','6','看情感影片时，我常禁不住眼圈红润','1');
insert into questions(qid,id,cateid,title,score) values('60','1','6','与言情小说相比，我更喜欢推理小说','0');

drop table if exists result; /*结果*/
create table result(
 rid varchar(20) not null,
 id varchar(20) not null,
 cateid varchar(20) not null, /*总体的类型*/
 inclination varchar(1000) not null, /*人格倾向*/
 major varchar(1000) not null, /*专业*/
 occupation varchar(1000) not null, /*职业*/
 primary key(rid,id)
);

truncate table result;
insert into result(rid,id,cateid,inclination,major,occupation) values
('1','1','1','尊重权威和规章制度，喜欢按计划办事，细心、有条理，习惯接受他人的指挥和领导，自己不谋求领导职务。喜欢关注实际和细节情况，通常较为谨慎和保守，缺乏创造性，不喜欢冒险和竞争，富有自我牺牲精神。','电子商务类','秘书、办公室人员、记事员、会计、行政助理、图书馆管理员、出纳员、打字员、投资分析员'),
('2','1','2','愿意使用工具从事操作性工作，动手能力强，做事手脚灵活，动作协调。偏好于具体任务，不善言辞，做事保守，较为谦虚。缺乏社交能力，通常喜欢独立做事。','经济与贸易类、民族学类、公安学类、心理学类、机械类、自动化类、水利类、纺织类、轻工类、交通运输类、建筑类、公安技术类、林学类','计算机硬件人员、摄影师'),
('3','1','3','思想家而非实干家,抽象思维能力强，求知欲强，肯动脑，善思考，不愿动手。喜欢独立的和富有创造性的工作。知识渊博，有学识才能，不善于领导他人。考虑问题理性，做事喜欢精确，喜欢逻辑分析和推理，不断探讨未知的领域。','经济学类、财政学类、金融学类、法学类、物理学类、化学类、地理科学类、大气科学类、
海洋科学类、地球物理学类、地质学类、生物科学类、统计学类、力学类、机械类、仪器类、材料类、能源动力类、电气类、电子信息类、计算机类、土木类、测绘类、化工与制药类、地质类、矿业类、交通运输类、海洋工程类、航空航天类、兵器类、核工程类、农业工程类、林业工程类、环境科学与工程类、生物医学工程类、食品科学与工程类、生物工程类、
公安技术类、植物生产类、动物生产类、水产类、草学类、临床医学类、口腔医学类、公共卫生与预防医学类、中医学类、中西医结合类、药学类、中药学类、法医学类、医学技术类、农业经济管理类、工业工程类','科学研究人员、教师、工程师、电脑编程人员、医生、系统分析员'),
('4','1','4','追求权力、权威和物质财富，具有领导才能。喜欢竞争、敢冒风险、有野心、抱负。为人务实，习惯以利益得失，权利、地位、金钱等来衡量做事的价值，做事有较强的目的性。','管理科学与工程类、工商管理类、公共管理类、图书情报与档案管理类、物流管理与工程类、旅游管理类','如项目经理、销售人员，营销管理人员、政府官员、企业领导、法官、律师'),
('5','1','5','喜欢与人交往、不断结交新的朋友、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用。寻求广泛的人际关系，比较看重社会义务和社会道德。','哲学类、经济与贸易类、政治学类、马克思主义理论类、教育学类、体育学类、历史学类、植物生产类、自然保护与环境生态类、护理学类、设计学类','教育工作者、社会工作者'),
('6','1','6','有创造力，乐于创造新颖、与众不同的成果，渴望表现自己的个性，实现自身的价值。做事理想化，追求完美，不重实际。具有一定的艺术才能和个性。善于表达、怀旧、心态较为复杂。','中国语言文学类、外国语言文学类、新闻传播学类、轻工类、基础医学类、艺术学理论类、音乐与舞蹈学类、戏剧与影视学类、美术学类、设计学类','艺术、音乐、文学方面');

drop table if exists province; /*省份*/
create table province(
 id int PRIMARY KEY AUTO_INCREMENT,
 name varchar(20) not null,
 premark varchar(20) not null
);

truncate table province;
insert into province(name,premark) values('北京','市');
insert into province(name,premark) values('天津','市');
insert into province(name,premark) values('河北','省');
insert into province(name,premark) values('河南','省');
insert into province(name,premark) values('山东','省');
insert into province(name,premark) values('山西','省');
insert into province(name,premark) values('陕西','省');
insert into province(name,premark) values('内蒙古','自治区');
insert into province(name,premark) values('辽宁','省');
insert into province(name,premark) values('吉林','省');
insert into province(name,premark) values('黑龙江','省');
insert into province(name,premark) values('上海','市');
insert into province(name,premark) values('江苏','省');
insert into province(name,premark) values('安徽','省');
insert into province(name,premark) values('江西','省');
insert into province(name,premark) values('湖北','省');
insert into province(name,premark) values('湖南','省');
insert into province(name,premark) values('重庆','市');
insert into province(name,premark) values('四川','省');
insert into province(name,premark) values('贵州','省');
insert into province(name,premark) values('云南','省');
insert into province(name,premark) values('广东','省');
insert into province(name,premark) values('广西','壮族自治区');
insert into province(name,premark) values('福建','省');
insert into province(name,premark) values('甘肃','省');
insert into province(name,premark) values('宁夏','回族自治区');
insert into province(name,premark) values('新疆','维吾尔自治区');
insert into province(name,premark) values('西藏','自治区');
insert into province(name,premark) values('海南','省');
insert into province(name,premark) values('浙江','省');
insert into province(name,premark) values('青海','省');

drop table if exists nationline; /*省份历年国家线*/
create table nationline(
 id int PRIMARY KEY AUTO_INCREMENT,
 year varchar(20),
 curplace varchar(50),
 subject varchar(20),
 batch varchar(50), /*批次*/
 line varchar(20) /*省控线*/
);

truncate table nationline;

select * from nationline where year = '2013';

drop table if exists univerinfo; /*学校基本信息*/
create table univerinfo(
 id int PRIMARY KEY AUTO_INCREMENT,
 school varchar(100) not null,
 img varchar(200),
 curplace varchar(50),
 type varchar(20), /*学校类型*/
 nature varchar(20), /*学校性质*/
 property varchar(30), /*学校特色*/
 lishuyu varchar(50),
 website varchar(100)
);

truncate table univerinfo;

drop table if exists univerpoint; /*各学校省份分数线 81260条*/
create table univerpoint(
 id int PRIMARY KEY AUTO_INCREMENT,
 school varchar(100) not null,
 curplace varchar(50),
 subject varchar(20),
 year varchar(20),
 lowest varchar(20),
 average varchar(20),
 line varchar(20), /*省控线*/
 batch varchar(50)
);

truncate table univerpoint;
select * from univerpoint where subject = '理科' or subject = '文科' and  line <> '';

drop table if exists majors; /*专业 81190条*/
create table majors(
 id int PRIMARY KEY AUTO_INCREMENT,
 school varchar(100) not null,
 major varchar(100) not null,
 keymajor varchar(10) not null, /*重点专业*/
 lishuyu varchar(10) not null,
 flag985 varchar(10) not null,
 flag211 varchar(10) not null
);
truncate table majors;
select * from majors;

drop table if exists pubArticle; /*发布文章*/
create table pubArticle(
 id varchar(100) primary key not null,
 userid varchar(20) not null,
 title varchar(100) not null,
 markdown text not null,
 html text not null,
 date datetime not null
);

truncate table pubArticle;

drop table if exists forDiff; /*线差预测*/
create table forDiff(
 id int PRIMARY KEY AUTO_INCREMENT,
 school varchar(100) not null,
 curplace varchar(50),
 subject varchar(20),
 year varchar(20),
 diff varchar(20),
 batch varchar(50)
);
truncate table forDiff;
select * from forDiff where id = '3000';

drop table if exists forLine; /*省控线预测*/
create table forLine(
 id int PRIMARY KEY AUTO_INCREMENT,
 curplace varchar(50),
 subject varchar(20),
 year varchar(20),
 batch varchar(50),
 line varchar(20)
);
truncate table forLine;
select * from forLine where curplace = '山西';

select *,(diff+line) as score from forDiff a join forLine b 
where a.curplace = b.curplace and a.subject = b.subject and a.batch = b.batch 
and a.curplace = '山西' and a.subject = '理科' and (diff+line) >= 500 and (diff+line) < 700;

drop table if exists preReg; /*地域偏好*/
create table preReg(
  id varchar(20) primary key not null,
  region varchar(20) not null,
  ancestor varchar(20) not null,
  parentnodeid varchar(20) not null,
  isparentflag int not null,
  level int not null
);
truncate table preReg;
insert into preReg (id,region,ancestor,parentnodeid,isparentflag,level) values
('01','热门','','',1,1),('0101','北京','01#','01',0,2),('0102','上海','01#','01',0,2),('0103','广东','01#','01',0,2),
('02','华北','','',1,1),('0201','北京','02#','02',0,2),('0202','天津','02#','02',0,2),('0203','河北','02#','02',0,2),('0204','山西','02#','02',0,2),('0205','内蒙古','02#','02',0,2),
('03','东北','','',1,1),('0301','辽宁','03#','03',0,2),('0302','吉林','03#','03',0,2),('0303','黑龙江','03#','03',0,2),
('04','华东','','',1,1),('0401','上海','04#','04',0,2),('0402','江苏','04#','04',0,2),('0403','浙江','04#','04',0,2),('0404','安徽','04#','04',0,2),('0405','福建','04#','04',0,2),('0406','江西','04#','04',0,2),('0407','山东','04#','04',0,2),
('05','华中','','',1,1),('0501','河南','05#','05',0,2),('0502','湖北','05#','05',0,2),('0503','湖南','05#','05',0,2),
('06','华南','','',1,1),('0601','广东','06#','06',0,2),('0602','广西','06#','06',0,2),('0603','海南','06#','06',0,2),
('07','西南','','',1,1),('0701','重庆','07#','07',0,2),('0702','四川','07#','07',0,2),('0703','贵州','07#','07',0,2),('0704','云南','07#','07',0,2),
('08','西北','','',1,1),('0801','西藏','08#','08',0,2),('0802','陕西','08#','08',0,2),('0803','甘肃','08#','08',0,2),('0804','青海','08#','08',0,2),('0805','宁夏','08#','08',0,2),('0806','新疆','08#','08',0,2);

drop table if exists preMajor; /*专业偏好*/
create table preMajor(
  id varchar(20) primary key not null,
  major varchar(20) not null,
  ancestor varchar(20) not null,
  parentnodeid varchar(20) not null,
  isparentflag int not null,
  level int not null
);
truncate table preMajor;
insert into preMajor (id,major,ancestor,parentnodeid,isparentflag,level) values
('01','哲学','','',1,1),('0101','哲学类','01#','01',0,2),
('02','经济学','','',1,1),('0201','经济学类','02#','02',0,2),('0202','财政学类','02#','02',0,2),('0203','金融学类','02#','02',0,2),('0204','经济与贸易类','02#','02',0,2),
('03','法学','','',1,1),('0301','法学类','03#','03',0,2),('0302','政治学类','03#','03',0,2),('0303','社会学类','03#','03',0,2),('0304','民族学类','03#','03',0,2),('0305','马克思主义理论类','03#','03',0,2),('0306','公安学类','03#','03',0,2),
('04','教育学','','',1,1),('0401','教育学类','04#','04',0,2),('0402','体育学类','04#','04',0,2),
('05','文学','','',1,1),('0501','中国语言文学类','05#','05',0,2),('0502','外国语言文学类','05#','05',0,2),('0503','新闻传播学类','05#','05',0,2),
('06','历史学','','',1,1),('0601','历史学类','06#','06',0,2),
('07','理学','','',1,1),('0701','数学类','07#','07',0,2),('0702','物理学类','07#','07',0,2),('0703','化学类','07#','07',0,2),('0704','天文学类','07#','07',0,2),('0705','地理科学类','07#','07',0,2),('0706','大气科学类','07#','07',0,2),('0707','海洋科学类','07#','07',0,2),('0708','地址学类','07#','07',0,2),
('0709','生物科学类','07#','07',0,2),('0710','心理学类','07#','07',0,2),('0711','统计学类','07#','07',0,2),
('08','工学','','',1,1),('0801','力学类','08#','08',0,2),('0802','机械类','08#','08',0,2),('0803','仪器学类','08#','08',0,2),('0804','材料类','08#','08',0,2),('0805','能源动力类','08#','08',0,2),('0806','电气类','08#','08',0,2),('0807','电子信息类','08#','08',0,2),('0808','自动化类','08#','08',0,2),
('0809','计算机类','08#','08',0,2),('0810','土木类','08#','08',0,2),('0811','水利类','08#','08',0,2),('0812','测绘类','08#','08',0,2),('0813','化工与制药类','08#','08',0,2),('0814','地质类','08#','08',0,2),('0815','矿业类','08#','08',0,2),('0816','纺织类','08#','08',0,2),('0817','轻工类','08#','08',0,2),
('0818','交通运输类','08#','08',0,2),('0819','海洋工程类','08#','08',0,2),('0820','航空航天类','08#','08',0,2),('0821','兵器类','08#','08',0,2),('0822','核工程类','08#','08',0,2),('0823','农业工程类','08#','08',0,2),('0824','林业工程类','08#','08',0,2),('0825','环境科学与工程类','08#','08',0,2),('0826','生物医学工程类','08#','08',0,2),
('0827','食品科学与工程类','08#','08',0,2),('0828','建筑类','08#','08',0,2),('0829','安全科学与工程类','08#','08',0,2),('0830','生物工程类','08#','08',0,2),('0831','公安技术类','08#','08',0,2),
('09','农学','','',1,1),('0901','植物生产类','09#','09',0,2),('0902','自然保护与环境生态类','09#','09',0,2),('0903','动物生产类','09#','09',0,2),('0904','动物医学类','09#','09',0,2),('0905','林学类','09#','09',0,2),('0906','水产类','09#','09',0,2),('0907','草学类','09#','09',0,2),
('10','医学','','',1,1),('1001','基础医学类','10#','10',0,2),('1002','临床医学类','10#','10',0,2),('1003','口腔医学类','10#','10',0,2),('1004','公共卫生与预防医学类','10#','10',0,2),('1005','中医学类','10#','10',0,2),('1006','中西医结合类','10#','10',0,2),('1007','药学类','10#','10',0,2),('1008','中药学类','10#','10',0,2),
('1009','法医学类','10#','10',0,2),('1010','医学技术类','10#','10',0,2),('1011','护理学类','10#','10',0,2),
('11','管理学','','',1,1),('1101','管理科学与工程类','11#','11',0,2),('1102','工商管理类','11#','11',0,2),('1103','农业经济管理类','11#','11',0,2),('1104','公共管理类','11#','11',0,2),('1105','图书情报与档案管理类','11#','11',0,2),('1106','物流管理与工程类','11#','11',0,2),('1107','工业工程类','11#','11',0,2),('1108','电子商务类','11#','11',0,2),('1109','旅游管理类','11#','11',0,2),
('12','艺术学','','',1,1),('1201','艺术学理论类','12#','12',0,2),('1202','音乐与舞蹈学类','12#','12',0,2),('1203','戏剧与影视学类','12#','12',0,2),('1204','美术学类','12#','12',0,2),('1205','设计学类','12#','12',0,2);

drop table if exists recoList; /*推荐学校*/
create table recoList(
  userid varchar(20) not null,
  school varchar(100) not null,
  rate float,
  collect int, /*0:未收藏 1:已收藏*/
  cate int, /*0:保底, 1:稳妥, 2:冲刺 3:感兴趣*/
  primary key(userid,school)
);
truncate table recoList;
