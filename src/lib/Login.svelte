<script>
  import { db } from "../routes/firebaseConfig";
  import { collection, getDoc, doc, setDoc } from "firebase/firestore";
  import { createEventDispatcher } from "svelte";
  import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import { notification } from "../routes/store";
  import { authStatus } from "../routes/store";
  import { userAuthData } from "../routes/store";

  const dispatch = createEventDispatcher();
  var userData = {
    email: "",
    password: "",
  };
  var loading = false;
  const auth = getAuth();

  function googleAuth() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((e) => {
      dispatch("close");
    });
  }
  const submitData = async () => {
    loading = true;

    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        $userAuthData = user;
        $notification = {
          color: "#17c21d",
          sysmbol: "correct",
          text: "Successfully Login",
        };
        loading = false;
        dispatch("close");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        $notification = {
          text: errorCode,
          symbol: "wrong",
          color: "#FF6465",
        };
        loading = false;
        userData = {
          email: "",
          password: "",
        };
      });
  };
</script>

<div class=" flex p-8  bg-white w-[700px] rounded-md shadow-md ">
  <div class="w-full  pr-8">
    <h1 class="text-3xl mb-5">Log In</h1>
    <input bind:value={userData.email} type="email" placeholder="Email" />
    <input
      bind:value={userData.password}
      type="Password"
      placeholder="Password"
    />
    <button class="loginButton" on:click={submitData}>
      {#if loading}
        <div class="w-full flex justify-center">
          <img src="/loading.svg" alt="" />
        </div>
      {:else}
        Sign Up
      {/if}</button
    >
    <div class="my-2 w-full flex items-center justify-center">
      <hr class="border w-full " />
      <h1 class=" mx-2 text-lg font-bold">Or</h1>
      <hr class="border w-full " />
    </div>

    <div class="w-full flex justify-center">
      <button
        on:click={googleAuth}
        class="border-2 flex  border-black py-1.5 px-4 mt-1 rounded-md text-lg"
      >
        <div class="mr-2 ">
          <img
            class="h-7"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            alt=""
          />
        </div>

        <h1 class=" ">Sign in Google</h1>
      </button>
    </div>
  </div>
  <div
    class=" border-l border-black pl-3 w-full flex items-center justify-center "
  >
    <img class="w-full" src="/Login.svg" alt="" />
  </div>
</div>

<style>
  h1 {
    font-weight: 800;
  }
  input::placeholder {
    color: rgb(110, 110, 110);
  }
  input {
    font-family: monospace;
    width: 100%;
    margin: 10px 0;
    color: white;
    height: 50px;
    background-color: #333;
    outline: none;
    border: none;
    padding: 0 20px;
    border-radius: 5px;
  }
  .loginButton {
    margin-top: 20px;
    font-weight: 800;
    font-size: 1.2rem;
    width: 100%;

    color: white;
    height: 50px;
    background-color: rgb(202, 56, 68);
    outline: none;
    border: none;
    padding: 0 20px;
    border-radius: 5px;
  }
</style>
