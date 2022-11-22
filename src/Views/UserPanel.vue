<template>
  <div class="container">
    <div v-if="!this.$store.state.loggedIn">
      <p>
        You Need To be Logged In first before you can view this page
        <router-link style="color: blue" to="/">Log In</router-link>
      </p>
    </div>
    <user-search @search-user="searchList" class="search-input" />

    <div v-if="this.$store.state.loggedIn">
      <div v-if="isLoading" class="loading">Loading ...</div>

      <div class="user__container">
        <ul v-if="!searched && !isLoading" class="user__list">
          <li v-for="user in users" class="user__list-item" :key="user.id">
            <img :src="user.avatar" alt="ProfilePic" />
            <p>Name : {{ user.first_name }} {{ user.last_name }}</p>
            <p>Email : {{ user.email }}</p>
          </li>
        </ul>
        <ul v-if="searched && !isLoading" class="user__list">
          <li class="user__list-item">
            <img :src="SingleUserFound.avatar" alt="ProfilePic" />
            <p>
              Name : {{ SingleUserFound.first_name }}
              {{ SingleUserFound.last_name }}
            </p>
            <p>Email : {{ SingleUserFound.email }}</p>
          </li>
        </ul>
      </div>

      <button v-if="searched" @click="returnFromSearch" class="logout-btn">
        Back
      </button>
    </div>
  </div>
</template>

<script>
import userSearch from "../components/userSearch.vue";
export default {
  name: "YPanel",
  components: {
    userSearch,
  },
  data() {
    return {
      //Users List Data
      users: [],
      //Id of the profile that user has searched
      searchIdValue: "",
      //The user has been found by id
      SingleUserFound: [],
      //Checking if search has been triggerd or not
      searched: false,
      isLoading: false,
    };
  },
  //Here We Request for all of the users list
  async mounted() {
    const resp = await this.$axios
      .get("http://localhost:8080/api/users")
      .catch((err) => {
        console.log(err);
      });
    this.users = resp.data.data;
  },
  methods: {
    //Here we find out what profile our user is searching and we return it's ID
    async searchList(text) {
      var newArray = this.users.filter(function (item) {
        return (
          item.first_name == text ||
          item.last_name == text ||
          item.email == text
        );
      });
      this.isLoading = true;
      this.searchIdValue = newArray[0].id;
      this.searched = true;
      await this.$axios
        .get(`http://localhost:8080/api/users/${this.searchIdValue}`)
        .then((res) => {
          this.SingleUserFound = res.data.data;
          console.log(this.SingleUserFound);
          //This is for a loading effect on page so the promis can be fulfiled
          setInterval(() => {
            this.isLoading = false;
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    returnFromSearch() {
      this.searched = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background: linear-gradient(#e66465, #9198e5);
  padding: 60px;
  justify-content: center;
  align-items: center;
}
.user__container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  align-items: center;
  justify-content: center;
}
.user__list-item {
  border: 1px solid blueviolet;
  padding: 10px;
  background: linear-gradient(#f1aaaa, #282b4e);
  color: #fff;
  margin: 10px;
  list-style-type: none;
}
.logout-btn {
  width: 100%;
  background-color: #282b4e;
  color: #fff;
  cursor: pointer;
}
.loading {
  animation: load 1s infinite steps(20);
}
a {
  text-decoration: none;
  color: #fff;
}
img {
  border-radius: 100%;
}
@keyframes load {
  from {
    opacity: 10%;
  }
  50% {
    opacity: 50%;
  }
  to {
    opacity: 100%;
  }
}
</style>
