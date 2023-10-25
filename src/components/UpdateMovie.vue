<template>
    <div class="signup-form">
        Name:<input type="text" class="input-field" required placeholder="Enter Movie Name" v-model="name" />
        Rating:<input type="text" class="input-field" required placeholder="Enter Movie Rating" v-model="rating" />
        Genre:<input type="text" class="input-field" required placeholder="Enter Movie Genre" v-model="genre" />
        Release Date:<input type="date" class="input-field" required v-model="releaseDate" />
        Cast:<input type="text" class="input-field" required placeholder="Enter Cast" v-model="cast" />
        <button class="signup-button" @click="updateMovie">Create Movie</button>
        <button @click="goHome">Go Back</button>
    </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns'
export default {
    data() {
        return {
            id: '',
            name: '',
            rating: '',
            genre: '',
            releaseDate: '',
            cast: '',
            movieData: '',
        }
    },
    mounted() {
        let token = localStorage.getItem('token');
        if (!token) this.$router.push({ name: 'LogIn' });
        const id = this.$route.params.id;
        this.id = id
        if (id) localStorage.setItem('updateMovieId', id)
        else this.$router.push({ name: 'Home' })
        this.getMovieById()
    },
    beforeDestroy() {
        localStorage.removeItem('updateMovieId')
    },
    computed: {
        checkAllValid() {
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
        goHome() {
            this.$router.push({ name: 'Home' })
        },
        async getMovieById() {
            let result = await axios.post("http://localhost:8000/api/movies/listMovies", {
                id: this.id
            },
                {
                    withCredentials: true
                }
            );
            let { data } = result
            let movieData = data.data[0];
            console.log(movieData)
            this.name = movieData.name;
            this.rating = movieData.rating;
            this.genre = movieData.genre;
            this.cast = movieData.cast;
            this.releaseDate = this.formatReleaseDate(movieData.releaseDate);
            console.log(this.releaseDate);
        },
        formatReleaseDate(dateFromDb) {
            const formattedDate = new Date(dateFromDb);
            return formattedDate.toISOString().slice(0, 10);
        },
        async updateMovie() {
            let id = this.id || localStorage.getItem('updateMovieId')
            debugger
            let result = await axios.post("http://localhost:8000/api/movies/updateMovie", {
                id,
                name: this.name,
                rating: this.rating,
                cast: this.cast,
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
                alert('Success');
            }
            else alert('Something went wrong');
            // }
            // else {
            //     alert('Please Fill All input fields');
            // }
        }
    }
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
