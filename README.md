# 微信小程序古诗词挑战答题

使用uniapp开发，使用Bmob作为服务端后台

内容编辑工具 https://github.com/aphx1988/poem-scripter

随机挑选几道古诗词题回答，也有剧情模式，可以支付小红花解锁剧情，获得剧情奖励。

菜单、题目、剧情、文案、规则都可在Bmob后台配置。

![小程序二维码](https://github.com/aphx1988/poem-quiz/blob/master/gh_542e37855713_258.jpg)

## 安装

* clone后需要npm install后才可运行。
* 请在manifest.json里配置微信小程序id为你的id，确保usingComponents为true
* 在Bmob后台新建应用，见[Bmob官方文档](http://doc.bmob.cn/)
* main.js中，Bmob.initialize("你的Application ID", "你的REST API Key")填写你的对应id和key。

## 代码结构
* index.vue为菜单页，包括首页
* game.vue为答题游戏页，包括剧情模式（懒得新建页面，就塞进game，没想到越塞越多）
* rank.vue为排行榜页
* mixin保存了共有的混入
* store保存了共有的vuex数据

## Bmob后台数据

附带csv文件名即数据表名，_User表系统自带不用配置。

大多数表都有category，表示分类，相同分类的数据相关。

Menu.csv为菜单项，url为菜单跳转页面，当前可选跳转到index.vue和game.vue，虽然也可以跳转到rank.vue但我觉得毫无卵用。

Text.csv是胜利、失败、分享等文案，只对古诗词问答有效，对剧情无效。剧情的胜利、失败文案和分享文案都是当前Questions项的title。

Questions.csv用于古诗词答题和剧情模式，correct_no是正确答案序号，只对古诗词问答有效，剧情没有正确答案。必须四个答案。
剧情和古诗词答题是相同的格式，但是correct_no没用，多了nextIdList，是各选项的下一题，对应的是Bmob自动生成的Questions数据项id，Bmob无法在csv里导出id，需要导入数据库后才能填了。胜利和失败结局分别填[1]和[2]。

Rule.csv是设置game.vue页面需要的规则，其中counter倒计时时间、life复活次数、max_num最大题数、relifeCoin复活消耗仅对普通答题有效，对剧情模式无效。

RanlTitle.csv是阅历值转换的排名等级，upstream为上限，不限可填0。
