<template>
    <div class="signup-form">
        <input type="text" class="input-field" placeholder="Enter email" v-model="email" />
        <input type="password" class="input-field" placeholder="Enter password" v-model="password" />
        <button class="signup-button" v-on:click="signIn">Log In</button>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async signIn() {
            let result = await axios.post("http://localhost:8000/api/users/signIn", {
                email: this.email,
                password: this.password
            });
            // console.log(result)
            let { data } = result
            if (data.status) {
                alert(data.msg);
                if (data.token) {
                    localStorage.setItem('token', JSON.stringify(data.token));
                    let exp = 60 * 60 * 12 * 1000;
                    this.$cookies.set('accessToken', data.token, {
                        sameSite:
                            'none', secure:
                            true, maxAge: exp * 1000,
                        // httpOnly: true
                    });
                }
            }
            else alert(data.msg)
        }
    },
    mounted() {
        let token = localStorage.getItem('token');
        if (token) this.$router.push({ name: 'Home' })
    }
}
</script>

<style scoped>
.signup-form {
    width: 300px;
    margin: 0 auto;
    text-align: center;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.signup-button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    display: block;
    /* Center the button as a block-level element */
    margin: 0 auto;
    margin-left: 12px;
    /* Center horizontally */
}

.signup-button:hover {
    background-color: #0056b3;
}
</style>
