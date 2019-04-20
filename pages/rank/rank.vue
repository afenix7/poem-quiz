<template>
	<view class="main">
		<image src="../../static/image/bg3.jpg" style="margin-top:0upx;position:absolute;" class="bg"></image>
		<!--
		<view v-if="Bmob.User.current()" class="middle-absolute2" style="top:150upx;display:flex;flex-direction:column;">
			<Image class="me-avatar" :src="Bmob.User.current().userPic"></Image>
			<text class="me-info">我的名字:{{Bmob.User.current().nickName}}</text>
			<text v-if="Bmob.User.current().coin>0" class="me-info">我的小红花 {{Bmob.User.current().coin>999999?'999999+':Bmob.User.current().coin}}</text>
			<text v-if="!Bmob.User.current().coin||Bmob.User.current().coin==0" class="me-info">小红花 0</text>
			<text v-if="Bmob.User.current().exp>0" class="me-info">我的阅历 {{Bmob.User.current().exp>999999?'999999+':Bmob.User.current().exp}}</text>
			<text v-if="!Bmob.User.current().exp||Bmob.User.current().exp==0" class="me-info">阅历 0</text>
		</view>
		-->
		<text class="middle-absolute2" style="top:120upx;">天下榜</text>
		<view class="tab middle-absolute2" :style="{top:(windowHeight>700?470:370)+pxUnit}">
			<text :style="{color:currTab==0?'#333':'#666',fontSize:currTab==0?('35'+pxUnit):('28'+pxUnit)}" @click="changeTab(0)" class="tab-text">名士榜</text>
			<text :style="{color:currTab==1?'#333':'#666',fontSize:currTab==1?('35'+pxUnit):('28'+pxUnit)}" @click="changeTab(1)" class="tab-text">小红花榜</text>
		</view>
		<scroll-view scroll-y="true" class="rank middle-absolute2" :style="{top:(windowHeight>700?520:420)+pxUnit,height:(windowHeight>700?600:500)+pxUnit}">
			<view class="rank-item" v-for="(it,no) in currRank" :key="it.objectId" style="display:flex;flex-direction:row;width:100%;">
				<text style="margin-top:30upx;" class="rank-info">{{no+1}}.</text>
				<Image style="margin-left:16upx;" class="rank-avatar" :src="it.userPic"></Image>
				<text style="margin-top:30upx;margin-left:30upx;width:160upx;" class="rank-info">{{it.nickName}}</text>
				<text class="rank-content" style="margin-top:18upx;margin-left:16upx;">{{currTab==1?(it.coin>999999?'999999+':it.coin):rankTitle(it.exp)}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import rankTitleMixin from '../../mixin/rankTitle.js';
	import Bmob from "hydrogen-js-sdk";
	export default {
		data() {
			return {
				currTab:0,
				currRank:[],
				rankCoin:[],
				rankExp:[]
			}
		},
		mixins:[rankTitleMixin],
		computed:{
			...mapState(['windowHeight','pxUnit'])
		},
		filters:{
			rankTitle:function(value){
				console.log('过滤器');
				const titleObj = this.rankTitles.find(it=>{
					return it.upstream==0?it.exp<=value:(it.exp<=value&&it.upstream>value);
				});
				if(titleObj){
					return titleObj.title;
				}
				else{
					return this.rankTitles[0];
				}
			}
		},
		onLoad(){
			let coinQuery = Bmob.Query('_User');
			let expQuery = Bmob.Query('_User');
			coinQuery.order("-coin");
			coinQuery.limit(20);
			coinQuery.skip(0);
			expQuery.order("-exp");
			expQuery.limit(20);
			expQuery.skip(0);
			Promise.all([coinQuery.find(),expQuery.find()]).then(resArr=>{
				this.rankCoin = resArr[0];
				this.rankExp = resArr[1];
				this.currTab = 0;
				this.currRank = this.rankCoin;
				//this.currRank[0].nickName="克苏鲁咿呀";
				//this.currRank[0].coin = '999999+';
				/*
				if(this.currRank.length==1){
					for(let i =0;i<20;i++){this.currRank.push(this.currRank[0]);}
				}
				* */
			});
		},
		methods: {
			changeTab(tab){
				this.currTab = tab;
				this.currRank = tab==1?this.rankCoin:this.rankExp;
			}
		}
	}
</script>

<style>
	.tab{
		width:60%;
		height:60upx;
	}
	.tab-text{
		font-size:32upx;
		text-align: center;
		flex:1;
	}
	.me-avatar{
		width:100upx;
		height:100upx;
	}
	.me-info{
		font-size:30upx;
	}
	.rank{
		width:70%;
		display:flex;
		flex-direction: column;
	}
	.rank-item{
		margin-top:20upx;
		width:100%;
		height:120upx;
	}
	.rank-avatar{
		width:80upx;
		height:80upx;
		border-radius: 60upx;
	}
	.rank-info{
		font-size:28upx;
		color:#333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.rank-content{
		font-size:40upx;
		color:#666;
	}
</style>
