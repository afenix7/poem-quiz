<template>
	<view class="main">
		<image src="../../static/image/bg3.jpg" style="margin-top:0upx;position:absolute;" class="bg"></image>
		<text v-if="!storyMode&&!loading&&!showSuccess&&!showFailure&&!dead" class="middle-absolute2 info2" :style="{marginTop:titleTop}">还剩{{counter}}秒</text>
		<text v-if="!storyMode&&!loading" :style="{marginTop:titleTop2}" class="middle-absolute2 info">{{currNo+1}}/{{questions.length}}</text>
		<view v-show="!loading&&!showSuccess&&!showFailure&&!dead" class="middle-absolute2 qa" :style="{'top':buttonTop,'width':'600upx'}">
			<text decode v-show="!loading&&!storyMode" class="title" style="max-width: 600upx;">
				{{questions[currNo].title}}
			</text>
			<view v-show="!loading&&!storyMode" class="layout-column" style="margin-top:35upx;">
				<button :v-show="questions[currNo].answer1" id="name" @click="chooseAnswer(1)" :class="['base-button','clear-button',btnClasses[0]]" open-type="getUserInfo">
					A.{{questions[currNo].answer1}}
				</button>
				<button :v-show="questions[currNo].answer2" id="name" @click="chooseAnswer(2)" :class="['base-button','clear-button',btnClasses[1]]" open-type="getUserInfo">
					B.{{questions[currNo].answer2}}
				</button>
				<button :v-show="questions[currNo].answer3" id="name" @click="chooseAnswer(3)" :class="['base-button','clear-button',btnClasses[2]]" open-type="getUserInfo">
					C.{{questions[currNo].answer3}}
				</button>
				<button :v-show="questions[currNo].answer4" id="name" @click="chooseAnswer(4)" :class="['base-button','clear-button',btnClasses[3]]" open-type="getUserInfo">
					D.{{questions[currNo].answer4}}
				</button>
				<text v-if="!storyMode&&!loading" style="margin-top:40upx;" class="info middle">{{statusText}}</text>
			</view>
			<text decode v-show="!loading&&storyMode&&questions[0]" class="title" style="max-width: 600upx;">
				{{questions[0].title}}
			</text>
			<view v-if="!loading&&storyMode&&questions[0]" class="layout-column" style="margin-top:50upx;">
				<button v-if="showAnswer1"  id="name" @click="chooseAnswer(1)" :class="['base-button','clear-button',btnClasses[0]]" open-type="getUserInfo">
					{{questions[0].answer1}}
				</button>
				<button v-if="showAnswer2" id="name" @click="chooseAnswer(2)" :class="['base-button','clear-button',btnClasses[1]]" open-type="getUserInfo">
					{{questions[0].answer2}}
				</button>
				<button  v-if="showAnswer3"  id="name" @click="chooseAnswer(3)" :class="['base-button','clear-button',btnClasses[2]]" open-type="getUserInfo">
					{{questions[0].answer3}}
				</button>
				<button  v-if="showAnswer4" id="name" @click="chooseAnswer(4)" :class="['base-button','clear-button',btnClasses[3]]" open-type="getUserInfo">
					{{questions[0].answer4}}
				</button>
			</view>
		</view>
		<view v-show="showSuccess" class="middle-absolute2 qa" style="top:400upx;">
			<text v-if="!storyMode" class="text">{{successText}}</text>
			<text v-if="storyMode" class="text">剧情结束</text>
			<text style="margin-top:30upx;" class="text">小红花+{{gainCoin}}</text>
			<text style="margin-top:30upx;" class="text">阅历+{{gainExp}}</text>
			<!-- #ifdef MP-WEIXIN -->
			<!--
			<button v-if="canGetMore" open-type="share" @click="getMore(true)" class="base-button clear-button">分享获取{{rule.shareBonus}}倍奖励</button>
			-->
			<button v-if="!canGetMore" open-type="share" class="base-button clear-button">分享</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<!--
			<button v-if="canGetMore" @click="shareGetMore(true)" class="base-button clear-button">分享获取{{rule.shareBonus}}倍奖励</button>
			-->
			<button v-if="!canGetMore" @click="shareGetMore(true)" class="base-button clear-button">分享</button>
			<!-- #endif -->
			<button @click="backToScreen()" class="base-button clear-button">返回首页</button>
		</view>
		<view v-show="showFailure" class="middle-absolute2 qa" style="top:400upx;">
			<text v-if="!storyMode" class="text">{{isCorrectMore?failureText:wholeFailureText}}</text>
			<text v-if="storyMode" class="text">剧情结束</text>
			<text style="margin-top:30upx;" class="text">小红花+{{gainCoin}}</text>
			<text style="margin-top:30upx;" class="text">阅历+{{gainExp}}</text>
			<!-- #ifdef MP-WEIXIN -->
			<!--
			<button v-if="canGetMore" open-type="share" @click="getMore(false)" class="base-button clear-button">分享获取{{rule.shareBonus}}倍奖励</button>
			-->
			<button v-if="!canGetMore" open-type="share" class="base-button clear-button">分享</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<!--
			<button v-if="canGetMore" @click="shareGetMore(false)" class="base-button clear-button">分享获取{{rule.shareBonus}}倍奖励</button>
			-->
			<button v-if="!canGetMore" @click="shareGetMore(false)" class="base-button clear-button">分享</button>
			<!-- #endif -->
			<button @click="backToScreen()" class="base-button clear-button">返回首页</button>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-show="dead" class="middle-absolute2 qa" style="top:400upx;">
			<text class="text">{{relifeText}}</text>
			<!--
			<button open-type="share" @click="relife()" class="base-button clear-button">分享复活</button>
			-->
			<button @click="buyForRelife" style="font-size:27upx;" class="base-button clear-button">支付{{rule.relifeCoin}}小红花复活，共{{Bmob.User.current().coin}}</button>
			<button @click="gameOver" class="base-button clear-button">认输</button>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view v-show="dead" class="middle-absolute2 qa" style="top:400upx;">
			<text class="text">{{relifeText}}</text>
			<!--
			<button @click="shareForRelife" class="base-button clear-button">分享复活</button>
			-->
			<button @click="buyForRelife" class="base-button clear-button">支付{{rule.relifeCoin}}小红花复活，共{{Bmob.User.current().coin}}</button>
			<button @click="gameOver" class="base-button clear-button">认输</button>
		</view>
		<!-- #endif -->
		<view v-show="loading&&!showSuccess&&!showFailure" class="middle-absolute2 qa" style="top:400upx;">
			<text class="title">正在生成题目...</text>
		</view>
	</view>
</template>

<script>
	import {mapState,mapActions} from 'vuex';
	import Bmob from "hydrogen-js-sdk";
	export default {
		data() {
			return {
				height:0,
				category:null,
				questions:[
				],
				btnClasses:['btn','btn','btn','btn'],
				currNo:0,
				showSuccess:false,
				showFailure:false,
				showCorrect:false,
				judgeMode:false,
				dead:false,
				loading:false,
				counter:0,
				timer:null,
				correctNum:0,
				life:1,
				rule:null,
				successText:null,
				failureText:null,
				wholeFailureText:null,
				relifeText:null,
				statusText:'',
				shareText:'',
				storyMode:false,
				usedId:[],
				currSelIdx:1,
				canShare:true,
				shareImgUrl:null,
				firstId:null,
				count:0,
				//剧情模式下使用
				showAnswer1:false,
				showAnswer2:false,
				showAnswer3:false,
				showAnswer4:false,
				lastSel:null,
				gainCoin:0,
				gainExp:0,
				canGetMore:false
			};
		},
		onLoad:function(opt){
			this.height = this.windowHeight;
			this.currNo = 0;
			this.loading = true;
			this.category = opt.category;
			this.storyMode = opt.story==1;
			this.firstId = opt.firstid;
			console.log(this.category);
			this.questions = [];
			console.log(Bmob.User.current());
			this.getData();
		},
		/*
		onBackPress(){
			this.backToScreen();
		},
		* */
		onUnload(){
			//this.backToScreen();
			/*
			Bmob.User.updateStorage(Bmob.User.current().objectId).then(r=>{
				console.log('更新缓存');
				console.log(Bmob.User.current());
			});
			*/
		},
		// #ifdef MP-WEIXIN
		
		onShareAppMessage(opt){
			let path = 'pages/index/index';
			/*
			if(this.uid&&typeof this.uid!='undefined'&&this.uid!=null){
				path = path + '?userId='+this.uid;
			}
			console.log(path);
			*/
			let shareConfig = {
				  title: this.shareText,
				  path: path,
				  success: function (res) {
					uni.showToast({
						title: '分享成功'
					});
					console.log("转发成功:" + JSON.stringify(res));
				  },
				  fail: function (res) {
					// 转发失败
					console.log("转发失败:" + JSON.stringify(res));
				  }
			}
			if(this.shareImgUrl&&this.shareImgUrl!=null){
				shareConfig.imageUrl = this.shareImgUrl;
			}
			else if(!this.storyMode){
				shareConfig.imageUrl = '../../static/image/ico.jpeg';
			}
			return shareConfig;
		},
		
		// #endif
		
		computed:{
			isCorrectMore:function(){
				return this.correctNum>this.questions.length/2-1;
			},
			titleTop:function(){
				let r= (this.height>700?'80':'50')+this.pxUnit;
				console.log(r);
				return r;
			},
			titleTop2:function(){
				let r= (this.height>700?'180':'160')+this.pxUnit;
				console.log(r);
				return r;
			},
			buttonTop:function(){
				let r= (this.height>700?'450':'350')+this.pxUnit;
				console.log(r);
				return r;
			},
			...mapState(['windowHeight','pxUnit'])
		},
		methods:{
			async getData(){
				let promises = [];
				let resArr;
				const query = Bmob.Query('Question');
				query.equalTo('category',"==",this.category);
				const count = await query.count();
				this.count = count;
				if(count==0){
					return;
				}
				const ruleQuery = Bmob.Query("Rule");
				ruleQuery.equalTo('category',"==",this.category);
				const rRes = await ruleQuery.find();
				this.rule = rRes[0];
				console.log(this.rule);
				if(this.storyMode){
					this.next();
				}
				else{
					const txtQuery = Bmob.Query("Text");
					promises = [txtQuery.get('aK1dMMM9'),txtQuery.get('l0tV8889'),txtQuery.get('2SGfgggJ'),txtQuery.get('ow4Sffft'),txtQuery.get('JBemAAAO')];
					resArr = await Promise.all(promises);
					this.successText = resArr[0].content;
					this.failureText = resArr[1].content;
					this.wholeFailureText = resArr[2].content;
					this.relifeText = resArr[3].content;
					this.shareText = resArr[4].content;
					this.shareImgUrl = resArr[4].imgUrl?resArr[4].imgUrl:null;
					this.canShare = true;
					let usedSkips = [];
					//const skip = count<=10?0:Math.round(Math.random()*Math.round(count/10));
					const num = this.rule.max_num<=count?this.rule.max_num:count;
					console.log(this.rule.max_num);
					console.log(count);
					console.log("num="+num);
					promises = [];
					for(let i=0;i<num;i++){
						let skip = Math.round(Math.random()*(count-1));
						while(usedSkips.includes(skip)){
							skip = Math.round(Math.random()*(count-1));
						}
						usedSkips.push(skip);
						query.limit(1);
						query.skip(skip);
						promises.push(query.find());
					}
					resArr = await Promise.all(promises);
					resArr.forEach(it=>{
						this.questions = this.questions.concat(it);
					});
					this.life = this.rule.life;
					this.counter = this.rule.counter;
				}
				this.initOnlyStates();
				
				this.loading = false;
				if(!this.storyMode){
					this.resetTimer();
				}
			},
			initOnlyStates(){
				this.currSelIdx = 1;
				this.btnClasses=['btn','btn','btn','btn'];
				this.showSuccess = false;
				this.showFailure = false;
				this.judgeMode = false;
				this.dead = false;
				this.showCorrect = false;
				this.statusText = '';
			},
			chooseAnswer(idx){
				if(this.storyMode){
					this.currSelIdx = idx;
					this.next();
					return;
				}
				if(this.judgeMode){
					return;
				}
				if(this.showSuccess&&this.showFailure){
					return;
				}
				if(idx==this.questions[this.currNo].correct_no){
					this.btnClasses[idx-1] = 'btn-correct';
					//let correctChar = this.questions[this.currNo].correct_no == 1?'A':(this.questions[this.currNo].correct_no == 2?'B':(this.questions[this.currNo].correct_no == 3?'C':'D'));
					this.statusText = '你答对了';
					this.correctNum++;
					this.judgeMode = true;
					setTimeout(()=>{
						this.next();
					},500);
				}
				else{
					this.btnClasses[idx-1] = 'btn-error';
					this.btnClasses[this.questions[this.currNo].correct_no] = 'btn-correct';
					let correctChar = this.questions[this.currNo].correct_no == 1?'A':(this.questions[this.currNo].correct_no == 2?'B':(this.questions[this.currNo].correct_no == 3?'C':'D'));
					this.statusText = '很遗憾，正确答案是'+correctChar;
					this.judgeMode = true;
					setTimeout(()=>{
						if(this.life<=0){
							this.gameOver();
						}
						else{
							this.dead = true;
						}
					},500);
				}
			},
			async next(){
				if(this.storyMode){
					this.loading = true;
					const query = Bmob.Query('Question');
					this.currNo = 0;
					//this.questions = [];
					this.showAnswer1 = false;
					this.showAnswer2 = false;
					this.showAnswer3 = false;
					this.showAnswer4 = false;
					let res;
					if(this.firstId&&this.firstId!=null){
						res = await query.get(this.firstId);
						console.log(res);
						this.questions = [res];
						this.firstId = null;
					}
					else if(this.questions.length>0&&this.questions[0].nextIdList[this.currSelIdx-1]&&this.questions[0].nextIdList[this.currSelIdx-1]!=null&&this.questions[0].nextIdList[this.currSelIdx-1]!=''){
						if(this.questions[0].nextIdList[0]==1){
							this.canShare = true;
							this.shareText = this.questions[0].title;
							this.questions = [];
							this.stageClear();
						}
						else if(this.questions[0].nextIdList[0]==2){
							this.canShare = true;
							this.shareText = this.questions[0].title;
							this.questions = [];
							this.gameOver();
							/*
							if(this.life<=0){
								this.backToScreen();
							}
							else{
								this.dead = true;
							}
							*/
						}
						else{
							//有bug，点0后还是undefined,解决:数据表内数组不可设[0],故设为[2]
							let objId = this.questions[0].nextIdList[this.currSelIdx-1];
							res = await query.get(objId);
							this.questions = [res];
						}
					}
					else{
						//第一题，以及当前题没有后续题就随机取
						let usedSkips = [];
						query.equalTo('category',"==",this.category);
						this.count = query.count();
						const count = this.count;
						let skip = Math.round(Math.random()*(count-1));
						while(usedSkips.includes(skip)){
							skip = Math.round(Math.random()*(count-1));
						} 
						usedSkips.push(skip);
						query.limit(1);
						query.skip(skip);
						let res2 = await query.find();
						this.questions=[res2];
					}
					if(this.questions[0].answer1){
						this.showAnswer1 = true;
					}
					if(this.questions[0].answer2){
						this.showAnswer2 = true;
					}
					if(this.questions[0].answer3){
						this.showAnswer3 = true;
					}
					if(this.questions[0].answer4){
						this.showAnswer4 = true;
					}
					this.canShare = true;
					this.shareText = this.questions[0].title;
					this.loading = false;
					this.initOnlyStates();
					return;
				}
				//普通问答模式
				if(this.currNo>=this.questions.length-1){
					this.stageClear();
					return;
				}
				this.currNo++;
				this.initOnlyStates();
				this.resetTimer();
			},
			resetTimer(){
				if(this.timer&&this.timer!=null){
					clearInterval(this.timer);
				}
				this.counter = this.rule.counter;
				this.timer = setInterval(()=>{
					this.counterTime();
				},1000);
			},
			counterTime:function(){
				if(this.judgeMode||this.dead||this.showFailure||this.showSuccess){
					clearInterval(this.timer);
				}
				this.counter -= 1;
				if(this.counter<0){
					this.counter = 0;
					clearInterval(this.timer);
					this.timer = null;
					if(this.life<=0){
						this.gameOver();
					}
					else{
						this.dead = true;
					}
				} 
			},
			stageClear(){
				this.getGain(true);
				this.dead = false;
				this.showSuccess = true;
			},
			gameOver(){
				this.getGain(false);
				this.dead = false;
				this.showFailure = true;
			},
			getGain(isSuccess){
				this.gainCoin = isSuccess?this.rule.gainCoin:this.rule.failCoin;
				this.gainExp = isSuccess?this.rule.gainExp:this.rule.failExp;
			},
			backToScreen(){
				if(this.timer&&this.timer!=null){
					clearInterval(this.timer);
					this.timer = null;
				}
				let query = Bmob.Query('_User');
				query.set('id',Bmob.User.current().objectId);
				let coin = Bmob.User.current().coin?Bmob.User.current().coin:0;
				query.set('coin',coin+this.gainCoin);
				let exp = Bmob.User.current().exp?Bmob.User.current().exp:0;
				query.set('exp',exp+this.gainExp);
				query.save().then(res=>{
					Bmob.User.updateStorage(Bmob.User.current().objectId).then(r=>{
						console.log(r);
						uni.reLaunch({
							url:'../index/index'
						});
					});
				})
			},
			getMore(isSuccess){
				console.log('getMore For success:'+isSuccess);
				if(this.canGetMore){
					this.gainCoin = this.rule.shareBonus * this.gainCoin;
					this.gainExp = this.rule.shareBonus * this.gainExp;
					this.canGetMore = false;
				}
			},
			shareGetMore(isSuccess){
				this.share(()=>{
					this.getMore(isSuccess);
				});
			},
			shareForRelife(){
				this.share(()=>{
					this.relife();
				});
			},
			share(cb){
				//#ifdef MP-WEIXIN
				/*
				wx.showShareMenu({
				  withShareTicket: true
				});
				*/
				//#endif
				//#ifdef APP-PLUS
				uni.share({
					provider: "weixin",
					scene:"WXSceneSession",
					summary:this.shareText,
					success:()=>{
						cb();
					}
				});
				//#endif
			},
			buyForRelife(){
				if(this.rule.relifeCoin==0){
					this.relife();
					return;
				}
				if(Bmob.User.current().coin<this.rule.relifeCoin){
					uni.showToast({
						icon:'none',
						title:'小红花不足'
					});
					return;
				}
				else{
					let query = Bmob.Query('_User');
					query.set('id',Bmob.User.current().objectId);
					let coin = Bmob.User.current().coin?Bmob.User.current().coin:0;
					const cost = this.rule.relifeCoin;
					let rCoin = coin-cost>0?(coin-cost):0;
					query.set('coin',rCoin);
					query.save().then(res=>{
						Bmob.User.updateStorage(Bmob.User.current().objectId).then(r=>{
							console.log(Bmob.User.current());
							this.relife();
						});
					});
				}
				
				
			},
			relife(){
				this.life--;
				this.dead = false;
				uni.showToast({
					title:'成功复活',
					icon:'none',
					duration:500
				});
				//this.next();
				this.initOnlyStates();
				this.resetTimer();
				this.btnClasses[this.questions[this.currNo].correct_no-1]='btn-correct';
				let correctChar = this.questions[this.currNo].correct_no == 1?'A':(this.questions[this.currNo].correct_no == 2?'B':(this.questions[this.currNo].correct_no == 3?'C':'D'));
				this.statusText = '正确答案是'+correctChar;
				this.correctNum++;
				this.judgeMode = true;
				setTimeout(()=>{
					this.next();
				},1500);
			}
		}
	}
</script>

<style>
.title{
	font-size:33upx;
	text-align: center;
}
.text{
	font-size:34upx;
	text-align: center;
}
.info{
	font-size:32upx;
	color:#666;
}
.info2{
	font-size:34upx;
	color:#333;
}
.btn{
	color:#000;
	text-decoration:none;
}
.btn-error{
	color:#000;
	text-decoration: line-through;
}
.btn-correct{
	color:#333;
	opacity: 0.8;
}
.qa{
	display:flex;
	flex-direction:column;
}
</style>
