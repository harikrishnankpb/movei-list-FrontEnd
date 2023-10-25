<script>
import axios from 'axios';
import { format } from 'date-fns'
export default {
    name: 'Home',
    data() {
        return {
            searchText: '',
            orderBy: 'createdAt',
            movieData: []
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('token');
            this.$cookies.remove('accessToken');
            this.$router.push({ name: 'LogIn' });
        },
        async getMovies() {
            let result = await axios.post("http://localhost:8000/api/movies/listMovies", {
                searchText: this.searchText,
                orderBy: this.orderBy
            },
                {
                    withCredentials: true
                }
            );
            let { data } = result
            this.movieData = data.data
        },
        formatReleaseDate(dateFromDb) {
            let formattedDate = new Date(dateFromDb);
            formattedDate = format(formattedDate, 'MMMM d, y');
            return formattedDate;
        }
    },
    watch: {
        searchText: 'getMovies',
        orderBy: 'getMovies'
    },
    mounted() {
        this.getMovies()
    }
}
</script>

<template>
    <div class="dashboard">
        <div class="top-bar">
            <button class="logout-button" @click="logOut">Log out</button>
        </div>

        <div class="search-create-row">
            <button class="create-movie-btn">Create Movie</button>
            <input type="text" placeholder="Search" class="search-input" v-model="searchText" />
            <select class="sort-dropdown" v-model="orderBy">
                <option value="createdAt">Created</option>
                <option value="releaseDate">Newest</option>
                <option value="rating">Rating</option>
            </select>
        </div>

        <div class="movie-cards">
            <!-- Example movie card -->
            <div class="movie-card" v-for="movie in movieData" :key="movie.id">
                <div class="movie-details">
                    <h2>{{ movie.name }}</h2>
                    <p>Release Date: {{ formatReleaseDate(movie.releaseDate) }}</p>
                    <p>Rating: {{ movie.rating }}</p>
                    <p>Genre :{{ movie.genre }}</p>
                    <p>Cast:
                    <ul>
                        <li v-for="(actor, index) in movie.cast" :key="index">{{ actor }}</li>
                    </ul>
                    </p>
                </div>
                <div class="edit-delete-buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <!-- Repeat for other movie cards -->
        </div>
    </div>
</template>
  
<style scoped>
.dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
}

.top-bar {
    align-self: flex-start;
    margin-bottom: 20px;
}

.logout-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #e33e3e;
}

.search-create-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.search-input {
    padding: 10px;
    margin-right: 10px;
    margin-left: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex-grow: 1;
}

.sort-dropdown {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex-grow: 1;
}

.create-movie-btn {
    background-color: #3a46cf;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.create-movie-btn:hover {
    background-color: #2c36aa;
}

.movie-card {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin: 10px 0;
    background-color: #fff;
}

.edit-delete-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* You can further customize this as needed */
</style>
  