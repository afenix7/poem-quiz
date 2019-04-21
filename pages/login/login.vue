<template>
	<view class="main">
		<image src="../../static/image/bg3.jpg" style="margin-top:0upx;position:absolute;" class="bg"></image>
		<view class="layout-column middle-absolute2" :style="{top:titleTop}">
			<view class="layout-row"><text>用户名</text><input placeholder="请输入用户名" /></view>
			<view class="layout-row"><text>密码</text><input placeholder="请输入用户名" /></view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapActions,mapMutations} from 'vuex';
	import Bmob from "hydrogen-js-sdk";
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
