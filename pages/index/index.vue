<template>
	<view class="main">
        <image src="../../static/image/bg3.jpg" style="margin-top:0upx;position:absolute;" class="bg"></image>
		<view v-show="!loading" class="middle-absolute2 layout-column" :style="{top:titleTop}">
			<!-- #ifdef MP-WEIXIN -->
			<button v-for="it in menus" :key="it.no" :data-costexp="it.costExp" :data-cost="it.costCoin" :data-url="it.url" @getuserinfo="getUserInfoAndGoto" class="base-button clear-button" open-type="getUserInfo">
				{{it.name}}
				<text style="margin-left:20upx;" class="info" v-if="it.costCoin>0&&it.costExp>0">-{{it.costCoin}}小红花, -{{it.costExp}}阅历</text>
				<text style="margin-left:20upx;" class="info" v-if="it.costCoin>0&&(!it.costExp||it.costExp==0)">-{{it.costCoin}}小红花</text>
				<text style="margin-left:20upx;" class="info" v-if="it.costExp>0&&(!it.costCoin||it.costCoin==0)">-{{it.costExp}}阅历</text>
			</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button v-for="it in menus" :key="it.no" @click="goto(it.url,it.costCoin,it.costExp)" class="base-button clear-button" >
				{{it.name}}
				<text style="margin-left:20upx;" class="info" v-if="it.costCoin>0&&it.costExp>0">-{{it.costCoin}}小红花, -{{it.costExp}}阅历</text>
				<text style="margin-left:20upx;" class="info" v-if="it.costCoin>0&&(!it.costExp||it.costExp==0)">-{{it.costCoin}}小红花</text>
				<text style="margin-left:20upx;" class="info" v-if="it.costExp>0&&(!it.costCoin||it.costCoin==0)">-{{it.costExp}}阅历</text>
			</button>
			<!-- #endif -->
		</view>
		<view v-show="loading" class="middle-absolute2 qa" style="top:450upx;">
			<text class="title">加载中...</text>
		</view>
		<view v-if="Bmob.User.current()" class="userinfo" :style="{bottom:(windowHeight>700?180:120)+pxUnit}" >
			<text style="margin-left:30upx;margin-top:20upx;" v-if="Bmob.User.current().coin>0" class="info">小红花 {{coinVal}}</text>
			<text style="margin-left:30upx;margin-top:20upx;" v-if="!Bmob.User.current().coin||Bmob.User.current().coin==0" class="info">小红花 0</text>
			<text style="margin-left:30upx;margin-top:20upx;" v-if="Bmob.User.current().exp>0" class="info">{{rankTitle(expVal)}}</text>
			<text style="margin-left:30upx;margin-top:20upx;" v-if="!Bmob.User.current().exp||Bmob.User.current().exp==0" class="info">{{rankTitle(0)}}</text>
			<view style="display:flex;flex-direction: row;margin-top:40upx;">
				<Image class="me-avatar" :src="Bmob.User.current().userPic"></Image>
				<text style="margin-top:30upx;font-size:32upx;" class="text">{{Bmob.User.current().nickName}}</text>
			</view>
		</view>
		<navigator v-if="Bmob.User.current()" class="text" url="../rank/rank" style="font-size:32upx;position:absolute;right:80upx;top:60upx;">
			天下榜
		</navigator>
	</view>
</template>

<script>
	import {mapState,mapActions,mapMutations} from 'vuex';
	import Bmob from "hydrogen-js-sdk";
	import rankTitleMixin from '../../mixin/rankTitle.js';
	export default {
		data() {
			return {
				loading:false,
				category:'首页',
				menus:[],
			}
		},
		mixins:[rankTitleMixin],
		onLoad(opt) {
			this.loading = true;
			this.category = opt.category?opt.category:'首页';
			this.setCoinVal(this.coin);
			this.setExpVal(this.exp);
			this.reqWindowHeight().then(()=>{
				const query = Bmob.Query("Menu");
				query.equalTo('category',"==",this.category);
				query.order("no");
				query.find().then(res=>{
					this.menus = res;
					this.loading = false;
				});
			});
		},
		onShow(){
			if(Bmob.User.current()){
				Bmob.User.updateStorage(Bmob.User.current().objectId).then(res=>{
					console.log('刷新');
					console.log(Bmob.User.current());
				});
			}
		},
		computed:{
			titleTop:function(){
				let r= (this.height>700?'575':'375')+this.pxUnit;
				console.log(r);
				return r;
			},
			coin:function(){
				if(!Bmob.User.current()) return 0;
				return Bmob.User.current().coin>999999?'999999+':Bmob.User.current().coin;
			},
			exp:function(){
				if(!Bmob.User.current()) return 0;
				return Bmob.User.current().exp>999999?'999999+':Bmob.User.current().exp;
			},
			...mapState(['windowHeight','pxUnit','coinVal','expVal'])
		},
		methods: {
			enterGame(idx){
				switch(idx){
					case 0:
						uni.navigateTo({
							url:'../game/game?category=古诗词&story=0',
						});
						break;
					case 1:
						uni.showToast({
							title:'目前尚未开放',
							icon:'none'
						});
						break;
					case 2:
						if(this.storyMode){
							let storyFirst = this.firstId?'&firstid='+this.firstId:'';
							//storyFirst='';
							uni.navigateTo({
								url:'../game/game?category='+this.storyCategory+'&story=1'+storyFirst,
							});
						}
						else{
							uni.showToast({
								title:'目前尚未开放',
								icon:'none'
							});
						}
						break;
				}
			},
			getUserInfoAndGoto(e){
				console.log(e);
				const url = e.currentTarget.dataset.url;
				const cost = e.currentTarget.dataset.cost;
				const costExp = e.currentTarget.dataset.costexp;
				let userInfo = e.detail.userInfo;
				console.log(userInfo);
				Bmob.User.upInfo(userInfo).then(res=>{
					console.log('upInfo');
					console.log(res);
					if(!Bmob.User.current().coin||!Bmob.User.current().exp){
						let query = Bmob.Query('_User');
						query.set('id',Bmob.User.current().objectId);
						if(!Bmob.User.current().coin) query.set('coin',0);
						if(!Bmob.User.current().exp) query.set('exp',0);
						query.save().then(res2=>{
							console.log('init set to zero');
							console.log(Bmob.User.current());
							this.goto(url,cost,costExp);
						});
					}
					else{
						this.goto(url,cost,costExp);
					}
					
				});
			},
			goto(url,cost,costExp){
				console.log('cost='+cost+',costExp='+costExp);
				if(cost==0&&costExp==0){
					console.log('免费进入'+url);
					uni.navigateTo({
						url:url,
					});
					return;
				}
				if((cost==0)||(Bmob.User.current().coin&&(Bmob.User.current().coin>=cost))){
					if((costExp==0)||(Bmob.User.current().exp&&(Bmob.User.current().exp>=costExp))){
							let needSave = false;
							let query = Bmob.Query('_User');
							query.set('id',Bmob.User.current().objectId);
							if(Bmob.User.current().coin>0&&(Bmob.User.current().coin>=cost)){
								needSave = true;
								let coin = Bmob.User.current().coin?Bmob.User.current().coin:0;
								let rCoin = coin-cost>0?(coin-cost):0;
								query.set('coin',rCoin);
								//Bmob.User.current().coin = rCoin;
								this.setCoinVal(rCoin);
							}
							if(Bmob.User.current().exp>0&&(Bmob.User.current().exp>=costExp)){
								needSave = true;
								let exp = Bmob.User.current().exp?Bmob.User.current().exp:0;
								let rExp = exp-costExp>0? (exp-costExp):0;
								query.set('exp',rExp);
								//Bmob.User.current().exp = rExp;
								this.setExpVal(rExp);
							}
							if(needSave){
								query.save().then(res=>{
									Bmob.User.updateStorage(Bmob.User.current().objectId).then(r=>{
										console.log(r);
										console.log('扣去花费');
										console.log(Bmob.User.current());
										uni.navigateTo({
											url:url,
										});
									});
								});
							}
							else{
								console.log('直接进入'+url);
								uni.navigateTo({
									url:url,
								});
							}
					}
				}
				else{
					uni.showToast({
						icon:'none',
						title:'小红花不足，可答题获取小红花'
					})
				}
			},
			...mapMutations(['setCoinVal','setExpVal']),
			...mapActions(['reqWindowHeight'])
		}
	}
</script>

<style>
	.info{
		font-size:26upx;
		color:#666;
	}
	.userinfo{
		display:flex;
		flex-direction:column;
		position:absolute;
		left:80upx;
		width:200upx;
	}
	.me-avatar{
		width:100upx;
		height:100upx;
		border-radius: 60upx;
	}
</style>
