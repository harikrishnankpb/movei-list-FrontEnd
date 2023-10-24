<template>
    <div>
        <p>Home</p>
        <button v-on:click="signOut">Log out</button>
    </div>
</template>

<script>
export default {
    methods: {
        signOut() {
            localStorage.removeItem('token');
            this.$router.push({ name: 'LogIn' })
        }
    },
    mounted() {
        let token = localStorage.getItem('token');
        if (!token) this.$router.push({ name: 'LogIn' })
    }
}
</script>