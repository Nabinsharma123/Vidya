<script>
  import Login from "./Login.svelte";
  import { clickOutside } from "./click_outside.js";
  import { fade, fly } from "svelte/transition";
  import Sighup from "./Sighup.svelte";
  import { authStatus, userAuthData } from "../routes/store";
  import { getAuth, signOut } from "firebase/auth";
  import { notification } from "../routes/store";

  var LoginClicked = false;
  var SighupClicked = false;

  function SignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        $authStatus = false;
        $notification = {
          color: "#17c21d",
          sysmbol: "correct",
          text: "Successfully Signout",
        };
      })
      .catch((error) => {});
  }
</script>

<nav class=" w-full bg-white ">
  <!-- nav bar container -->
  <div class=" flex mx-24 justify-between items-center py-2 ">
    <!-- left side -->
    <div class="flex items-center ">
      <!-- logo -->
      <div class="w-32">
        <a href="/">
          <img src="/logo.jpeg" alt="" />
        </a>
      </div>

      <!-- course and tutorials -->
      <div class="flex  ">
        <div class="  navBarOptions">
          <h1>Course</h1>
        </div>
        <div class="navBarOptions">
          <h1>Tutorials</h1>
        </div>
      </div>
    </div>
    <!-- left side -->

    <!-- right side -->

    {#if $authStatus}
      <div class="flex justify-center items-center ">
        <img
          class="w-10 mr-2 rounded-full"
          src={$userAuthData.photoURL}
          alt=""
        />
        <h1 class="mr-4">{$userAuthData.displayName}</h1>
        <button
          class="border-2 border-black rounded-lg py-0.5 px-2 text-lg font-semibold hover:bg-black hover:text-white "
          on:click={SignOut}>Sign Out</button
        >
      </div>
    {:else}
      <div class="flex items-center ">
        <button
          on:click={() => {
            LoginClicked = true;
          }}
          class="transition ease-in-out duration-300 Login py-1 px-3 mr-4"
        >
          Log In
        </button>
        <button
          on:click={() => {
            SighupClicked = true;
          }}
          class=" transition ease-in-out duration-300 Sighup border py-1 px-2 bg-[#6c63ff] text-white"
        >
          Sigh Up
        </button>
      </div>
    {/if}

    <!-- right side -->
  </div>
</nav>

{#if LoginClicked}
  <div transition:fade class="PopUp-bg">
    <div
      transition:fly={{ y: 500, duration: 500 }}
      use:clickOutside
      on:outclick={() => (LoginClicked = false)}
    >
      <Login
        on:close={() => {
          LoginClicked = false;
        }}
      />
    </div>
  </div>
{/if}

{#if SighupClicked}
  <div transition:fade class="PopUp-bg">
    <div
      transition:fly={{ y: 500, duration: 500 }}
      use:clickOutside
      on:outclick={() => (SighupClicked = false)}
    >
      <Sighup
        on:close={() => {
          SighupClicked = false;
        }}
      />
    </div>
  </div>
{/if}

<style>
  .PopUp-bg {
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 40;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .navBarOptions h1 {
    margin-left: 3rem;
    font-family: sans-serif;
    font-size: 1.1rem;
  }
  .navBarOptions:hover {
    color: #0556f3;
    cursor: pointer;
  }
  .Login {
    font-size: 1.2rem;
    font-weight: 800;
    border: 2px solid rgb(202, 56, 68);
    border-radius: 10px;
    color: rgb(202, 56, 68);
  }
  .Login:hover {
    color: #fff;
    background-color: rgb(202, 56, 68);
  }
  .Sighup {
    font-size: 1.2rem;
    font-weight: 800;
    border: 2px solid #6c63ff;
    border-radius: 10px;
  }
  .Sighup:hover {
    background-color: #fff;
    color: #6c63ff;
  }
</style>
