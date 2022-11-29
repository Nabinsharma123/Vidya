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
  var leftPannelClick = false;

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

<nav class=" w-full bg-white border">
  <!-- nav bar container -->
  <div class=" flex mx-5 lg:mx-24 justify-between items-center py-2 ">
    <!-- left side -->
    <div class="flex gap-10 items-center ">
      <!-- logo -->
      <div class="flex gap-4">
        <img
          class="w-6 md:hidden"
          on:click={() => {
            leftPannelClick = true;
          }}
          src="menu.svg"
          alt=""
        />
        <a href="/">
          <img class="w-32 hidden sm:block" src="/logo.jpeg" alt="" />
          <img class=" h-7 sm:hidden" src="/logoSmall.jpeg" alt="" />
        </a>
      </div>

      <!-- course and tutorials -->
      <div class="hidden md:flex items-center gap-10 ">
        <a class="navBarOptions" href="/#start">
          <h1>Course</h1>
        </a>
        <a class="navBarOptions" href="/tutorials">
          <h1>Tutorials</h1>
        </a>
        <a class="navBarOptions" href="/about">
          <h1>About Us</h1>
        </a>
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
        <div class="hidden sm:flex sm:items-center">
          <h1 class="mr-4">{$userAuthData.displayName}</h1>
          <button
            class="border-2 border-black rounded-lg py-0.5 px-2 text-lg font-semibold hover:bg-black hover:text-white "
            on:click={SignOut}>Sign Out</button
          >
        </div>
      </div>
    {:else}
      <div class="flex items-center ">
        <button
          on:click={() => {
            LoginClicked = true;
          }}
          class="transition border-2 border-[#29686E]  rounded-md ease-in-out duration-300 text-lg font-semibold
           text-[#29686E] Login py-1 px-3 mr-4 hover:bg-[#29686E]  hover:text-white
          "
        >
          Log In
        </button>
        <button
          on:click={() => {
            SighupClicked = true;
          }}
          class=" transition ease-in-out duration-300 Sighup border-2 rounded-md text-lg font-semibold 
          py-1 px-2 text-white bg-[#29686E] border-[#29686E] hover:text-[#29686E] hover:bg-white"
        >
          Sign Up
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
        on:newUser={() => {
          LoginClicked = false;
          SighupClicked = true;
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
        on:oldUser={() => {
          SighupClicked = false;
          LoginClicked = true;
        }}
      />
    </div>
  </div>
{/if}

{#if leftPannelClick}
  <div
    transition:fade
    class="md:hidden top-0 left-0 fixed h-screen w-full"
    style="background-color: rgba(0, 0, 0, 0.5);"
  >
    <div
      transition:fly={{ x: -300 }}
      use:clickOutside
      on:outclick={() => (leftPannelClick = false)}
      class="p-4 absolute left-0 top-0 h-screen w-[250px] rounded-tr-2xl rounded-br-2xl bg-white"
    >
      <div class="w-full py-2 border-b border-black">
        <a
          on:click={() => {
            leftPannelClick = false;
          }}
          href="/"
        >
          <img class="w-32" src="logo.jpeg" alt="" />
        </a>
      </div>

      <div class="mt-5 flex flex-col gap-3">
        <a
          on:click={() => {
            leftPannelClick = false;
          }}
          class="navBarOptions"
          href="/#start"
        >
          <h1>Course</h1>
        </a>
        <a
          on:click={() => {
            leftPannelClick = false;
          }}
          class="navBarOptions"
          href="/tutorials"
        >
          <h1>Tutorials</h1>
        </a>
        <a
          on:click={() => {
            leftPannelClick = false;
          }}
          class="navBarOptions"
          href="/about"
        >
          <h1>About Us</h1>
        </a>
      </div>
      {#if $authStatus}
        <button
          class="border-2 mt-5 border-black rounded-lg py-0.5 px-2 text-lg font-semibold hover:bg-black hover:text-white "
          on:click={SignOut}>Sign Out</button
        >
      {/if}
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
  .navBarOptions {
    width: fit-content;
  }
  .navBarOptions h1 {
    font-family: sans-serif;
    font-size: 1.1rem;
  }
  .navBarOptions:hover {
    color: #0556f3;
    cursor: pointer;
  }
</style>
