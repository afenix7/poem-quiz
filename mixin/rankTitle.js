import {mapState,mapActions} from 'vuex';
import Bmob from "hydrogen-js-sdk";

const rankTitleMixin = {
	
	created:function(){
		this.reqRankTitles();
	},
	computed:{
		...mapState(['rankTitles'])
	},
	methods:{
		rankTitle:function(value){
			const titleObj = this.rankTitles.find(it=>{
				return it.upstream==0?it.exp<=value:(it.exp<=value&&it.upstream>value);
			});
			if(titleObj){
				return titleObj.title;
			}
			else{
				return this.rankTitles[0];
			}
		},
		...mapActions(['reqRankTitles'])
	}
}

export default rankTitleMixin