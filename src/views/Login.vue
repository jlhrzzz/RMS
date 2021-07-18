<template>
    <div id="wrap">
        <img src="../assets/images/logo.png"
             class="logo"
             alt="">
        <p>
            <label for="username">账号</label>
            <input type="text"
                   id="username"
                   placeholder="请输入用户名"
                   v-model="form.username"
				   @keyup.enter="userAction('user','登录')">
            <span class="tips"
                  v-show="userTip">请输入正确的用户名</span>
        </p>
        <p>
            <label for="password">密码</label>
            <input type="password"
                   id="password"
                   placeholder="请输入密码"
                   v-model="form.password"
				   @keyup.enter="userAction('user','登录')">
            <span class="tips"
                  v-show="passTip">请输入正确的密码</span>
        </p>
        <div>
            <button @click="userAction('user','登录')">登录</button>
            <button @click="userAction('register','注册')">注册</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            userTip: false,
            passTip: false,
        }
    },
    methods: {
        userAction(action, msg) {
            const require = {
                //验证表单
                un: /^[a-zA-Z][a-zA-Z0-9]{5,15}$/,
                pw: /^[a-zA-Z0-9]{3,10}$/,
            }

            let validate = true //表单是否验证成功
            this.userTip = this.passTip = false //

            //验证用户名
            if (!require.un.test(this.form.username)) {
                this.userTip = true
                validate = false
            }

            //验证密码
            if (!require.pw.test(this.form.password)) {
                this.passTip = true
                validate = false
            }

            //验证失败
            if (!validate) {
                return
            }

            //验证后发送请求
            this.$fetch({
                url: '/auth/' + action,
                method: 'POST',
                data: this.form,
            }).then((res) => {
                // console.log(res)
                if (!res.success) {
                    //失败了
                    this.$message.error(msg + '失败,' + res.info)
                } else {
                    //成功了
                    //存储
                    localStorage.setItem('order:isLogin', this.form.username) //存储用户名
                    localStorage.setItem('order:token', res.token) //存储密码

                    //2、跳转到选座页面
                    this.$message({
                        message: '恭喜你，' + msg + '成功，即将跳转到选座页面',
                        type: 'success',
                        duration: 2000,
                    })
                    setTimeout(() => this.$router.replace('/table'), 2100)
                }
            })
        },
    },
}
</script>
<style scoped>
#wrap {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: #0a0909 url(../assets/images/index_bg.jpg) no-repeat center;
    background-size: cover;
}
.logo {
    width: 400px;
    margin-bottom: 100px;
}
#wrap p {
    width: 550px;
    display: flex;
    margin-bottom: 50px;
    background: #fff;
    font-size: 24px;
    border-radius: 30px;
    line-height: 65px;
    position: relative;
}
#wrap label {
    width: 130px;
    background: #ff8400;
    color: #fff;
    text-align: center;
    border-radius: 30px;
}
#wrap input {
    width: 100%;
    border: none;
    font-size: 20px;
    color: #b2b2b2;
    padding-left: 10px;
    border-radius: 0 30px 30px 0;
}
#wrap .tips {
    position: absolute;
    top: 0;
    right: 20px;
    font-size: 16px;
    color: red;
}
input::placeholder {
    color: #ccc;
    font-size: 16px;
}
#wrap button {
    width: 120px;
    height: 65px;
    margin: 0 10px;
    background: #ff8400;

    font-size: 24px;
    color: #fff;
    border-radius: 30px;
}
#wrap button:nth-child(2) {
    background: #cc2e2a;
    border-radius: 30px;
}
</style>