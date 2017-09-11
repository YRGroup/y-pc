<template>
    <div>
        <div class="card panel">
            <div class="course-row">
                <span class="hd">学科：</span>
                <div class="bd">
                    <ul>
                        <li class="course-item on">
                            <a>全部</a>
                        </li>
                        <li class="course-item">
                            <a>语文</a>
                        </li>
                        <li class="course-item">
                            <a>语文</a>
                        </li>
                        <li class="course-item">
                            <a>语文</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="course-row">
                <span class="hd">学科：</span>
                <div class="bd">
                    <ul>
                        <li class="course-item on">
                            <a>全部</a>
                        </li>
                        <li class="course-item">
                            <a>语文</a>
                        </li>
                        <li class="course-item">
                            <a>语文</a>
                        </li>
                        <li class="course-item">
                            <a>语文</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="course-list">
                <ul class="clearfix">
                    <li class="container">
                        <a class="couse-card">
                            <div class="top">
                                <img class="banner" src="http://img.mukewang.com/576b7afb00019e4906000338-240-135.jpg" style="display: inline;">
                            </div>
                            <div class="content">
                                <h3 class="name">JAVA遇见HTML——JSP篇</h3>
                                <div class="bottom">
                                    <p class="desc">Java Web入门级教程JSP，带你轻松的学习JSP基础知识</p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {},
        }
    },
    computed: {
        summaryScore() {
            return this.data.VueData
        },
        currentClassInfo() {
            if (!this.$store.state.currentClassInfo) {
                return this.$store.dispatch('getCurrentClassInfo')
            } else {
                return this.$store.state.currentClassInfo
            }
        },
    },
    methods: {
    },
    created() {
    },
    mounted() {
    },
    watch: {
        '$route': 'getData'
    }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
    background: #fff;
    .course-row {
        padding: 16px 0 5px;
        border-bottom: 1px solid @border;
        .hd {
            width: 52px;
            height: 20px;
            line-height: 30px;
            font-weight: 700;
            text-align: right;
            float: left;
        }
        .bd {
            margin-left: 60px;
            .course-item {
                display: inline-block;
                margin: 0 4px;
                a {
                    display: block;
                    line-height: 14px;
                    margin-bottom: 10px;
                    padding: 8px;
                }
            }
            .on a {
                background: @main;
                color: #fff;
                border-radius: 2px;
            }
        }
    }
}

.course-list {
    margin: 0 -20px 0;
    padding-left: 10px;
    .container {
        float: left;
        margin: 0 0 10px 28px;
        width: 230px;
        height: 220px;
        transition: .3s all linear;
        overflow: hidden;
        .couse-card {
            .top {
                border-radius: 6px; 
                width: 230px;
                height: 130px;
                position: relative;
                border-radius: 6px;
                transition: all 0.3s;
                overflow: hidden;
                .banner {
                    width: 100%;
                    height: 100%;
                    border-radius: 6px;
                    transition:transform .3s linear 0s;
                    &:hover{
                        transform: scale(1.05);
                    }
                }
            }
            .content{
                padding: 10px 5px;
                .name{
                    font-size: 16px;
                    line-height: 24px;
                    word-wrap:break-word;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    max-height:44px;
                }
                .bottom{
                    font-size: 12px;
                    font-weight:300;
                    color: @grey;
                    line-height: 20px;
                    overflow: hidden;
                    height: 44px;
                    margin-top:4px;
                }
            }
        }
    }
}
</style>
