<template>
    <div>
        <ul class="category">
            <li v-for="category in categorys"
                :key="category.id">
                <div class="icon">
                    <span class="iconfont"
                          v-html="category.icon"></span>
                    <span class="name">{{category.name}}</span>
                </div>
                <div class="edit">
                    <span @click="del(category.id)"
                          class="iconfont">&#xe610;</span>
                    <span @click="showDialog(category)"
                          class="iconfont">&#xe64a;</span>
                </div>
            </li>
            <li class="add"
                @click="showDialog()">
                <span class="iconfont">&#xe608;</span>
            </li>
        </ul>

        <el-dialog :title="dialogTitle"
                   :visible.sync="dialogFormVisible"
                   width="30%"
                   top="30vh">
            <el-form :model="form"
                     label-width="auto"
                     :rules="rules"
                     ref="ruleForm">
                <el-form-item label="名称"
                              prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="icon"
                              prop="icon">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="cancel('ruleForm')">取 消</el-button>
                <el-button type="primary"
                           @click="submit('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogTitle: '编辑分类',
            dialogFormVisible: false,
            form: {},
            rules: {
                name: [
                    {
                        required: true, //是否要验证
                        message: '请输入分类名称', //验证失败后的提示信息
                        trigger: 'blur', //什么方式触发验证
                    },
                ],
                icon: [
                    {
                        required: true, //是否要验证
                        message: '请输入图标对应的代码', //验证失败后的提示信息
                        trigger: 'blur', //什么方式触发验证
                    },
                ],
            },
        }
    },
    mounted() {
        this.$getCategory()
    },
    computed: {
        categorys() {
            return this.$store.getters.getCategory
        },
    },
    methods: {
        del(id) {
            this.$confirm('确认删除，删除后此分类下的所有菜品都将清空！')
                .then(() => {
                    this.$fetch({
                        url: '/api/del_dish_cate',
                        method: 'POST',
                        data: {
                            id,
                        },
                    }).then((res) =>
                        this.$store.commit('updateCategory', res.cate_lists)
                    )
                })
                .catch(() => {})
        },
        showDialog(category) {
            this.dialogFormVisible = true

            this.dialogTitle = category ? '编辑分类' : '添加分类'

            this.form = category ? category : {}
        },
        cancel(form) {
            this.dialogFormVisible = false
            this.$refs[form].resetFields()
        },
        submit(form) {
            this.$refs[form]
                .validate()
                .then(() => {
                    this.form.id
                        ? this.addOrEdit('edit')
                        : this.addOrEdit('add')
                })
                .catch(() => {})
        },
        addOrEdit(action) {
            this.$fetch({
                url: '/api/' + action + '_dish_cate',
                method: 'POST',
                data: this.form,
            }).then((res) => {
                this.dialogFormVisible = false
                this.$store.commit('updateCategory', res.cate_lists)
            })
        },
    },
}
</script>

<style>
.category {
    overflow: hidden;
}
.category li {
    width: 300px;
    height: 300px;
    float: left;
    margin: 0 10px 20px;
    border-radius: 5px;

    background: #fff;
    border: 1px solid #ccc;

    position: relative;
}
.category li div {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
}
.icon {
    justify-content: center;
    flex-direction: column;
}
.icon .iconfont {
    font-size: 150px;
    margin-bottom: 20px;
    color: #ff8400;
}
.icon .name {
    font-size: 30px;
    color: #aaa;
}

.edit {
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.9);
    opacity: 0;
}
.edit span {
    color: #dbdbdb;
    font-size: 80px;
    cursor: pointer;
}
.edit span:hover {
    color: #ff8400;
}
.category li:hover .edit {
    opacity: 1;
    transition: 0.4s;
}

.add {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.add span {
    font-size: 200px;
    color: #ccc;
}
.add:hover {
    background: #eee;
    transition: 0.3s;
}
</style>