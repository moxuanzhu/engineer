<template>
    <div class="equipment">
        <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="fdEquipmentName"
                    align="center"
                    label="设备名称">
                </el-table-column>
                <el-table-column
                    prop="fdTotal"
                    align="center"
                    label="总量">
                </el-table-column>
                <el-table-column
                    prop="fdTotalAOG"
                    align="center"
                    label="累计到货">
                </el-table-column>
                <el-table-column  label="本月到货" align="center">
                    <el-table-column
                        prop="fdPlanToArrive"
                        align="center"
                        label="计划到货">
                        <template slot-scope="props">
                            <el-input v-model="props.row.fdPlanToArrive"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="fdActualArrival"
                        align="center"
                        label="实际到货">
                        <template slot-scope="props">
                            <el-input v-model="props.row.fdActualArrival"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100">
                    <template slot-scope="scope">
                        <el-button type="text"  class="el-icon-check"  @click.native="compilebtn(scope.row)" size="small" ></el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!--  弹出框~~   -->
            <el-dialog
                title="总览-设备到货统计表"
                :visible.sync="dialogVisible" id="dialogs">
                <el-table
                    :data="tableDateres">
                    <el-table-column
                        prop="fdEquipmentName"
                        label="设备名称"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="fdTotal"
                        label="总量"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="fdTotalAOG"
                        align="center"
                        label="累计到货">
                    </el-table-column>
                        <el-table-column align="center"  v-for="(item,index) in equipmentArrivalList" :key="index" :label="item.fdArrivalTime">
                            <el-table-column
                                align="center"
                                label="计划到货">
                                <template slot-scope="scope">
                                    {{scope.row.equipmentArrivalList[index].fdPlanToArrive}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="实际到货">
                                <template slot-scope="scope">
                                    {{scope.row.equipmentArrivalList[index].fdActualArrival}}
                                </template>
                            </el-table-column>
                        </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                dialogVisible:false,
                tableData: [],      //设备到货统计表data数据
                tableDateres:[],    //查看详情
                fontId:this.$parent.$parent.$parent.$parent.popData.fdProid,
                equipmentArrivalList:[],
            }

        },
        created(){
             this.headData();
            this.btner();
        },
        mounted(){
           
        },
        methods:{
            pandect(){
                this.dialogVisible=true;
            },
            btner(){
                var _this=this;
                var params={
                    fdProid:_this.fontId,//项目id
                };
                _this.$http.post('/engineer/equipmentArrival/getEquipmentArrivalInfo', params)
                .then(res => {
                    if(res.data.status=200){
                        _this.tableDateres=res.data.data.list
                        _this.equipmentArrivalList=res.data.data.list[0].equipmentArrivalList;
                    }
                }).catch(err => {
                    console.log("数据请求失败")
                })

            },
            compilebtn(row){        //保存
                 var params={
                        fdProid:this.fontId,//项目id
                        fdFacilityid:row.fdFacilityid,  //设备表示ID
                        fdEquipmentArrivalId:row.fdEquipmentArrivalId,//设备到货id
                        fdEquipmentId:row.fdEquipmentId,              //设备id 
                        fdEquipmentName:row.fdEquipmentName,//设备名称  
                        fdPlanToArrive:Number(row.fdPlanToArrive), //计划到货  
                        fdActualArrival:Number(row.fdActualArrival) //实际到货 
                    };
                this.$http.post('/engineer/equipmentArrival/updateEquipmentArrivalInfoByid', params)
                .then(res => {
                    if(res.status==200){
                        this.$message({
                            message: '恭喜你，这是一条成功消息',
                            type: 'success'
                        });
                        this.headData()
                    }else{
                        this.$message({
                            message: '后台接口报错',
                            type: 'warning'
                        });
                    }
                }).catch(err => {
                    console.log("数据请求失败")
                })
                
            },
            headData(){          //列表数据
                var params={
                        fdProid:this.fontId,//项目id
                    };
                this.$http.post('/engineer/equipmentArrival/queryEquipmentArrivalInfo', params)
                .then(res => {
                    if(res.data.status==200){
                        this.tableData=res.data.data;
                    }else{
                        this.$message({
                            message: '后台接口报错',
                            type: 'warning'
                        });
                    }
                }).catch(err => {
                    console.log("数据请求失败")
                })
            }   
        },
        watch(){
        }
    }
</script>
<style scoped>
    .equipment{
        padding: 15px;
    }
    .showedit{
        width: 100%;
        height: 100%;
        background: #000;
        position: absolute;
        left: 0px;
        top: 0px;
    }
     #dialogs /deep/ .el-dialog__body{
        padding:10px 20px !important;
    }
    #dialogs /deep/ .el-dialog__body{
        padding:10px 20px !important;
    }
    #dialogs /deep/ .el-dialog__body{
         padding:10px!important;
    }
    #dialogs /deep/ .el-dialog{
        margin-top: 14vh!important;
    }
</style>


