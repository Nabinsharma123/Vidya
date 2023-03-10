<script>
  import { clickOutside } from "./click_outside.js";
  import { fade, fly } from "svelte/transition";

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
  import { Spinner } from "flowbite-svelte";

  const dispatch = createEventDispatcher();
  var userData = {
    email: "",
    password: "",
  };
  var loading = false;
  const auth = getAuth();

  function googleAuth() {
    loading = true;

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((e) => {
        $notification = {
          color: "green",

          text: "Successfully Login",
        };
        loading = false;

        dispatch("close");
      })
      .catch((e) => {
        $notification = {
          text: e.message,

          color: "red",
        };
        loading = false;
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
          color: "green",

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

          color: "red",
        };
        loading = false;
        userData.email = "";
        userData.password = "";
      });
  };
</script>

<div
  transition:fade
  class="fixed top-0 left-0 flex justify-center items-end md:items-center w-screen h-screen bg-black/50 "
>
  <div
    transition:fly={{ y: 500, duration: 500 }}
    use:clickOutside
    on:outclick={() => dispatch("close")}
    class=" flex relative p-8  bg-white w-full md:w-[700px] rounded-md shadow-md "
  >
    <div class="w-full  md:pr-8">
      <h1 class="text-3xl mb-5">Log In</h1>

      <div class="relative mb-3">
        <input
          bind:value={userData.email}
          type="email"
          id="email"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="email"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Email</label
        >
      </div>
      <div class="relative mb-3">
        <input
          bind:value={userData.password}
          type="password"
          id="password"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="password"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Password</label
        >
      </div>

      <div class="w-full flex justify-end">
        <button
          on:click={() => {
            dispatch("newUser");
          }}
          class="text-md font-semibold hover:text-blue-700 cursor-pointer"
        >
          New? SignUp here
        </button>
      </div>
      <button
        class="w-full mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
        on:click={submitData}
      >
        Log In
      </button>
      <div class="my-2 w-full flex items-center justify-center">
        <hr class="border w-full " />
        <h1 class=" mx-2 text-lg font-bold">Or</h1>
        <hr class="border w-full " />
      </div>

      <div class=" w-full flex justify-center ">
        <button
          class="w-fit p-2 rounded-md"
          style="box-shadow: 0 1px 4px .1px ;"
          on:click={googleAuth}
        >
          <div class="flex w-fit mx-4 items-center justify-around">
            <div class="w-8 mr-3">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
            <h1 class=" text-md font-semibold">Sign in with Google</h1>
          </div>
        </button>
      </div>
    </div>
    <div
      class=" hidden border-l border-gray-600 pl-3 w-full md:flex items-center justify-center "
    >
      <img class="w-full" src="/Login.svg" alt="" />
    </div>
    {#if loading}
      <div
        class="absolute flex justify-center items-center top-0 left-0 z-50 rounded-md w-full h-full bg-white/70"
      >
        <Spinner size="10" />
      </div>
    {/if}
  </div>
</div>

<style>
  h1 {
    font-weight: 600;
  }
</style>
