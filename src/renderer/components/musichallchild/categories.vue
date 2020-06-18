<template>
    <div class="categories">
        <div class="mycontainer">
            <el-row class="categoryGroupName">
                <el-col :span="2">
                    <span class="title">分类：</span>
                </el-col>
                <el-col :span="22">
                    <el-row :gutter="10">
                        <el-col :span='4' v-for="(item,index) in categories" :key="item.categories" >
                            <el-tag  @click="getIndex(index)" :class="{'activeGroup':item.categoryGroupName == categoryGroupName}">
                                {{ item.categoryGroupName }}
                            </el-tag>
                        </el-col>
                    </el-row>
               
                </el-col>
            </el-row>
            <el-row class="categoryName">
                <el-col :span="2">
                    <span class="title">标签：</span>
                </el-col>
                <el-col :span="22">
					<el-row :gutter="10">
                        <el-col :span='4' v-for="(item,index) in categories_II" :key="item.categories" style="margin-bottom: 10px;">
                            <el-tag @click="getById(item)" :class="{ 'activeName':categoryName == item.categoryName }">
                                {{ item.categoryName }}
                            </el-tag>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
		
		<div>
			<baseDisco :list='list'></baseDisco>
		</div>
    </div>
</template>
<script>
	
	import baseDisco from '../base_disco/base_disco.vue'
export default {
    data() {
        return {
            categories: [],
            index:-1,
            categories_II:[],
			list:[],
			categoryGroupName:'',
			categoryName:''
        }
    },
    created() {
        this.$Api.getSongListCategories().then(res => {
            // console.log(JSON.parse(res));
            this.categories = JSON.parse(res).data.categories;
            this.index = 0;
            this.categoryGroupName = this.categories[this.index].categoryGroupName;
            this.categories_II = this.categories[this.index].items;
            this.getById(this.categories_II[0])
        })
    },
    methods:{
    	getIndex(index){
    		this.index = index;
    		this.categoryGroupName = this.categories[this.index].categoryGroupName;
            this.categories_II = this.categories[this.index].items;
    	},
    	getById(item){
			this.categoryName = item.categoryName;
    		this.$Api.getDiscList(item.categoryId).then(res=>{
    			// console.log(res)
				this.list = res;
    		})
    	}
    },
	components:{
		baseDisco
	}
}
</script>
<style scoped>
	.categoryGroupName,.categoryName{
		margin-bottom: 10px;
		text-align: center;
	}
	.title{
		font-weight: bold;
		line-height: 32px;
	}
	
</style>


<style>
	.categories .el-tag{
		cursor: pointer;
		background: rgb(227, 227, 227);
		width: 100%;
		color:rgb(0, 0, 0);
		text-align: center;
	}
	.categories .el-tag:hover{
		color: rgb(30, 206, 155);
	}

	.categories .activeGroup{
		background: rgb(30, 205, 153)!important;
		color:#fff;
	}
	.categories .activeName{
		background-color: #fff!important;
	}
</style>