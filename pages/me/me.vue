<template>
	<view class="main">
		<image src="../../static/image/bg3.jpg" style="margin-top:0upx;position:absolute;" class="bg"></image>
		<view class="middle-absolute2" style="width:500upx;">
			<image :src="user.userPic"></image>
			<text>{{user.nickName}}</text>
			<text v-if="user.coin">金币 {{user.coin}}</text>
			<text v-if="user.exp">经验值 {{user.exp}}</text>
			<button open-type="share" class="base-button clear-button">分享</button>
		</view>
	</view>
</template>

<script>
	import Bmob from "hydrogen-js-sdk";
	export default {
		data() {
			return {
				user:null
			}
		},
		onLoad() {
			this.user = Bmob.User.current();
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
