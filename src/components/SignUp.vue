<template>
    <div class="signup-form">
        <input type="text" class="input-field" placeholder="Enter Name" v-model="name" />
        <input type="text" class="input-field" placeholder="Enter email" v-model="email" />
        <input type="password" class="input-field" placeholder="Enter password" v-model="password" />
        <button class="signup-button" v-on:click="signUp">Sign Up</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async signUp() {
            let result = await axios.post("http://localhost:8000/api/users/createUser", {
                email: this.email,
                name: this.name,
                password: this.password
            })
            let data = result.data
            if (data.status == true) {
                this.$router.push({ name: 'LogIn' });
                alert('Success');
            }
            else alert('Something went wrong');
            localStorage.setItem('token', JSON.stringify(data.msg))
        }
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
