import Vue from 'vue'
import Vuex from 'vuex'
import Bmob from "hydrogen-js-sdk";

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		windowHeight:0,
		//userData:null,
		// #ifdef MP-WEIXIN
		pxUnit:'rpx',
		// #endif
		// #ifdef H5
		pxUnit:'px',
		// #endif
		// #ifdef APP-PLUS
		pxUnit:'px',
		// #endif
		//Bmob.User.current的值变化不实时，只好如此
		coinVal:0,
		expVal:0,
		rankTitles:[],
	},
	mutations:{
		setWindowHeight(state,height){
			state.windowHeight = height;
		},
		setCoinVal(state,val){
			state.coinVal = val;
		},
		setExpVal(state,val){
			state.expVal = val;
		},
		setRankTitles(state,titles){
			state.rankTitles = titles;
		},
		setPxUnit(state,pxUnit){
			state.pxUnit = pxUnit;
		}
		/*
		setUserData(state,userData){
			state.userData = userData;
		}
		*/
	},
	actions:{
		reqWindowHeight({ commit }){
			return new Promise((resolve, reject) => {
				uni.getSystemInfo({
					success: function(sys) {
						/*
						if(sys.platform=='android'){
							commit('setPxUnit','dp');
						}
						*/
						commit('setWindowHeight',sys.windowHeight);
						resolve();
					},
					fail:function(err){
						reject(err);
					}
				});
			});
		},
		reqRankTitles({commit}){
			return new Promise((resolve, reject) => {
				let query = Bmob.Query('RankTitle');
				query.limit(1000);
				query.find().then(res=>{
					commit('setRankTitles',res);
					resolve();
				}).catch(err=>{
					reject(err);
				});
			});
		}
		/*
		changeUserData({commit},newData){
			return new Promise((resolve, reject) => {
				let query = Bmob.Query('UserData');
				query.get(Bmob.User.current()).then(res=>{
					
				}).catch(ex=>{
					reject(ex);
				});
			});
		}
		*/
	}
})

export default store