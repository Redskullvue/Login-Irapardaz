<template>
  <div class="login__company-title">
    <h2>irapardaz</h2>
  </div>
  <div class="container">
    <div class="login__title">
      <h3 style="margin-top: 50px">New Here ?</h3>
      <h6 style="margin-top: 10px">
        Sign Up and discover a great amount of oppertunities
      </h6>
      <button class="fake-signup-btn">SignUp</button>
    </div>
    <form @submit.prevent="submitForm" class="login__form">
      <h2 class="mobile__login__title">Hello Again !</h2>
      <label class="login__form--label">UserName </label>
      <input
        class="input"
        type="text"
        v-model="userName"
        placeholder="Type Your User Name"
        required
      />
      <br />
      <label class="login__form--label">Password </label>
      <input
        class="input"
        type="password"
        v-model="userPassWord"
        placeholder="Type Your PassWord"
        required
      />
      <p v-if="showError" class="login__form--error">
        Informations are invalid
      </p>
      <input class="login__form__submit" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
export default {
  name: "YContainer",
  data() {
    return {
      userName: "eve.holt@reqres.in",
      userPassWord: "cityslicka",
      showError: false,
    };
  },

  methods: {
    //This Method is for the login page form submit

    submitForm() {
      this.$axios
        .post("api/login", {
          email: this.userName,
          password: this.userPassWord,
        })
        //Here we Use response
        .then((res) => {
          console.log(res);
          this.$router.push("/panel");
          this.$store.commit("logStat");
          localStorage.loggedInToken = res.data.token;
        })
        //Handeling the Errors in this part
        .catch((err) => {
          this.showError = true;
          console.log(err);
          this.userName = "";
          this.userPassWord = "";
        });
    },
    //remove
    checkUserStatus() {
      this.$emit("loggedStat", this.loggedIn);
    },
  },
};
</script>

<style>
.login__company-title {
  text-align: center;
  color: #d3d3d3;
}
.container {
  margin: auto;
  width: 600px;
  margin-top: 100px;
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: 300px;
  border-radius: 20px;
}
.login__title {
  grid-column: 1/2;
  background-color: rgb(237, 157, 239);
  padding: 10px;
  text-align: center;
  color: rgba(50, 47, 47, 0.727);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.fake-signup-btn {
  background-color: #fff;
  color: rgb(85, 185, 218);
  border: none;
  padding: 5px;
  width: 100px;
  margin-top: 30px;
  border-radius: 10px;
}
.fake-signup-btn:hover {
  cursor: pointer;
}
.login__form {
  background-color: #f5f5f5;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 50px;
}
.input {
  width: 300px;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  outline: none;
  margin: 10px;
}
.login__form--label {
  color: darkgray;
  font-weight: 500;
  font-size: 12px;
  margin: 10px;
}
.login__form__submit {
  width: 260px;
  text-align: center;
  margin-left: 30px;
  margin-top: 30px;
  background-color: rgb(41, 135, 166);
  color: #fff;
  border: none;
  padding: 7px;
  border-radius: 10px;
}
.login__form__submit:hover {
  cursor: pointer;
  background-color: rgb(8, 114, 150);
}
.login__form--error {
  color: red;
  font-size: 12px;
  margin-left: 10px;
}
.mobile__login__title {
  display: none;
}
@media screen and (max-width: 600px) {
  .container {
    width: 300px;
    display: Flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0;
  }
  .login__title {
    display: none;
  }
  .login__form {
    width: 100%;
    border-radius: 10px;
    height: 81vh;
    margin: 0;
  }
  .input {
    width: 100%;
  }
  .login__form__submit {
    width: 100%;
    margin-left: 2px;
  }
  .mobile__login__title {
    display: Block;
    color: rgb(85, 185, 218);
    margin-bottom: 40px;
    text-align: center;
  }
}
</style>
