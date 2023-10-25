<template>
    <div class="signup-form">
        <input type="text" class="input-field" required placeholder="Enter Movie Name" v-model="name" />
        <input type="text" class="input-field" required placeholder="Enter Movie Rating" v-model="rating" />
        <input type="text" class="input-field" required placeholder="Enter Movie Genre" v-model="genre" />
        <input type="date" class="input-field" required v-model="releaseDate" />
        <input type="text" class="input-field" required placeholder="Enter Cast" v-model="cast" />
        <button class="signup-button" @click="createMovie">Create Movie</button>
        <button @click="goHome">Go Back</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            rating: 1,
            genre: '',
            releaseDate: '',
            cast: ''
        }
    },
    computed: {
        isFormValid() {
            return (
                this.name.trim() !== '' &&
                this.rating >= 1 &&
                this.genre.trim() !== '' &&
                this.releaseDate.trim() !== '' &&
                this.cast.trim() !== ''
            );
        },
    },
    methods: {
        async createMovie() {
            if (this.isFormValid) {
                let cast = this.cast.split(',');
                cast = JSON.stringify(cast)
                let result = await axios.post("http://localhost:8000/api/movies/createMovie", {
                    name: this.name,
                    rating: this.rating,
                    cast: cast,
                    genre: this.genre,
                    releaseDate: this.releaseDate,
                },
                    {
                        withCredentials: true
                    }
                );
                let { data } = result;
                this.movieData = data.data
                if (data.status) {
                    alert('Success')
                }
                else alert('Something went wrong')
            }
            else {
                alert('Please Fill All input fields')
            }
        },
        goHome() {
            this.$router.push({ name: 'Home' })
        }
    },
}
</script>

<style scoped>
.signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-field {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
}

input[type="date"] {
    /* Adjust the appearance of the date input */
}

.signup-button {
    background-color: #3a46cf;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.signup-button:hover {
    background-color: #2c36aa;
}
</style>
