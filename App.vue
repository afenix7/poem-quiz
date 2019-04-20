<script>
	import Bmob from "hydrogen-js-sdk";
	export default {
		onLaunch: function () {
			//#ifdef MP-WEIXIN
			Bmob.User.auth().then(res => {
			  console.log(res);
			  let usr = res;
			  console.log('一键登陆成功');
			}).catch(err => {
			  console.log(err);
			});
			//#endif
		},
		onShow: function () {
		},
		onHide: function () {
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
        min-height: 100%;
        display: flex;
    }
	.bg{
		width:100%;
		height:100%;
	}
	.main{
		display:flex;
		flex-direction:column;
		width:100%;
		position:relative;
		background-color: rgb(253,250,243);
	}
	.middle-absolute2{
		position:absolute;
		display:flex;
		justify-content: center;
		left:50%;
		transform: translate(-50%, 0%);
	}
	.middle{
		display:flex;
		justify-content:center;
		margin-left:auto;
		margin-right:auto;
	}
	.middle-absolute-v{
		display:flex;
		position:absolute;
		display:flex;
		top:50%;
		transform: translate(0%, -50%);
	}
	.middle-v{
		display:flex;
		align-items: center;
		margin-top:auto;
		margin-bottom:auto;
	}
	.round-border{
		border:3upx solid rgba(13, 4, 8, 1);
		border-radius: 50upx;
	}
	.base-button{
		margin-top:40upx;
		font-size: 35upx;
		width:400upx;
		height:85upx;
	}
	.clear-button{
		border:none;
		overflow: hidden;
		background:none;
	}
	.clear-button :after{
		border:none;
	}
	.layout-column{
		display:flex;
		flex-direction:column;
	}
	.layout-row{
		display:flex;
		flex-direction:row;
	}
</style>
