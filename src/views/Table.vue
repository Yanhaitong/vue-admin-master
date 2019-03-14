<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<div class="block" style="width: 260px">
						<el-date-picker
								v-model="filters.name"
								type="daterange"
								align="right"
								unlink-panels
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								:picker-options="pickerOptions2">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column prop="date" label="日期" style="width: 50%;">
			</el-table-column>
			<el-table-column prop="count" label="注册数据" style="width: 50%;">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	export default {
		data() {
			return {
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
			}

		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				var user = sessionStorage.getItem('user');
				let myData = {
					startTime: this.formatDateTime(this.filters.name[0]),
					endTime: this.formatDateTime(this.filters.name[1]),
					clientName : JSON.parse(user).clientName,
					pageNum: 1,
				 	pageSize: 2
				}
				this.listLoading = true;
				this.$http.post('http://47.93.225.228:8080/sysManager/getH5UserRegster', myData, {emulateJSON: true}).then(result => {
					console.log(result)
					this.total = result.body.data.total;
					this.users = result.body.data.records;
					this.listLoading = false;
				})
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			pickerOptions2: function() {},
			formatSex: function() {},
			formatDateTime : function (date) {
				if (date) {
					var y = date.getFullYear();
					var m = date.getMonth() + 1;
					m = m < 10 ? ('0' + m) : m;
					var d = date.getDate();
					d = d < 10 ? ('0' + d) : d;
					return y + '-' + m + '-' + d;
				}else {
					return null;
				}
			}

	},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>