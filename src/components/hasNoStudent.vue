<template>
    <div class="hasNoStudent">
        <div class="img-box">
            <img :src="popupimg" style="max-width:100%">
            <p class="title">关联学生</p>
        </div>
        <div class="popupText">
            <div class="content">
                <el-form>
                    <el-form-item>
                        <el-input v-model="data.truename" placeholder="请输入学生姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="data['student_id']" placeholder="请输入学生学号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <template>
                            <el-radio class="radio" v-model="data.type" label="1">爸爸</el-radio>
                            <el-radio class="radio" v-model="data.type" label="2">妈妈</el-radio>
                            <el-radio class="radio" v-model="data.type" label="3">爷爷</el-radio>
                            <el-radio class="radio" v-model="data.type" label="4">奶奶</el-radio>
                            <el-radio class="radio" v-model="data.type" label="5">家人</el-radio>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div class="footer">
                <div class="btn">
                    <el-button type="success" @click="submitAdd">确认添加</el-button>
                </div>
            </div>
            <!-- <div class="popbtn" @click="$router.push('/user/linkchild'),showAddStudent=false">关联孩子</div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'hasNoStudent',
    data() {
        return {
            popupimg: require('@/assets/popupbg.png'),
            data: {
                truename: '',
                'student_id': '',
                type: '1'
            },
        }
    },
    methods: {
        submitAdd() {
            if (this.data.truename == '') {
                this.$message.error('请填写学生姓名')
            } else if (this.data['student_id'] == '') {
                this.$message.error('请填写学生学号')
            } else {
                this.$API.addStudent(this.data).then(res => {
                    this.$message.success('学生绑定成功！')
                    this.$store.dispatch('getCurrentUser')
                    this.$router.push('/class')
                    this.getData()
                }).catch(err => {
                    this.$message.error(err.msg)
                })
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import '../style/theme.less';
.hasNoStudent {
    width: 500px;
    margin: 100px auto;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    .img-box {
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        background: #00c06f;
        padding: 10px 0;
        img {
            width: 280px;
            background: transparent;
        }
        .title {
            font-size: 24px;
            font-weight: 500;
            margin-top: 15px;
            color: #fff;
        }
        .subcon {
            font-size: 14px;
            color: #fff;
            li {
                span {
                    position: relative;
                    margin-right: 10px;
                    &:before {
                        content: "";
                        width: 4px;
                        height: 4px;
                        background: #fff;
                        border-radius: 50%;
                        position: absolute;
                        top: 8px;
                        left: 0;
                    }
                }
            }
        }
    }
    .popupText {
        padding: 10px 0 20px;
        background: #fff;
        border-radius: 0 0 8px 8px;
        h3 {
            font-size: 1.6em;
            line-height: 1.6em;
            font-weight: 400;
        }

        .content {
            padding: 0 50px;
            margin-top: 20px;
            .el-form-item {
                margin-bottom: 15px;
            }
        }
    }
    .popclose {
        position: absolute;
        top: -46px;
        right: 0;
        font-size: 1.6rem;
        color: #fff;
        z-index: 9999;
        opacity: .6;
        span {
            &:before {
                content: "";
                position: absolute;
                width: 1px;
                height: 18px;
                background: #fff;
                right: 12px;
                bottom: -4px;
            }
        }
    } // .vux-close {
    //   margin-top: 8px;
    //   margin-bottom: 8px;
    // }
}
</style>
