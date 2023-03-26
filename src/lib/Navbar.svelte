<script>
  import Login from "./Login.svelte";
  import Leftpannel from "./Leftpannel.svelte";
  import { clickOutside } from "./click_outside.js";
  import { fade, fly } from "svelte/transition";
  import Sighup from "./Sighup.svelte";
  import { authStatus, userAuthData } from "../routes/store";
  import { getAuth, signOut } from "firebase/auth";
  import { notification } from "../routes/store";
  import { Button, Popover } from "flowbite-svelte";
  import { onMount } from "svelte";

  var LoginClicked = false;
  var SighupClicked = false;
  var leftPannelClick = false;

  function SignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        $authStatus = false;
        $userAuthData = false;
        $notification = {
          color: "yellow",

          text: "Successfully Sighout",
        };
      })
      .catch((error) => {});
  }
</script>

<nav
  transition:fly={{ y: -100, duration: 500 }}
  class="fixed z-20 top-0 left-0  w-full   py-1 bg-white border-b shadow-md"
>
  <!-- nav bar container -->
  <div class="mx-5 lg:mx-14 flex  justify-between items-center">
    <!-- left side -->

    <!-- logo -->
    <div class="flex gap-4">
      <button
        class="w-6 md:hidden"
        on:click={() => {
          leftPannelClick = true;
        }}
      >
        <img src="/menu.svg" alt="" />
      </button>
      <a href="/">
        <img class="w-32 hidden sm:block" src="/logo.jpeg" alt="" />
        <img class=" h-7 sm:hidden" src="/logoSmall.jpeg" alt="" />
      </a>
    </div>

    <!-- course and tutorials -->
    <div class="hidden md:flex justify-between items-center gap-10 ">
      <a class=" " href="/">
        <h1 class="font-medium text-xl hover:text-blue-500">Home</h1>
      </a>
      <a class=" " href="/#start">
        <h1 class="font-medium text-xl hover:text-blue-500">Course</h1>
      </a>
      <!-- <a href="/Tutorials">
        <h1 class="font-medium text-xl hover:text-blue-500">Tutorials</h1>
      </a> -->
      <a href="/Examprep">
        <h1 class="font-medium text-xl hover:text-blue-500">Examprep</h1>
      </a>
      <a href="/About">
        <h1 class="font-medium text-xl hover:text-blue-500">About Us</h1>
      </a>
    </div>

    <!-- left side -->

    <!-- right side -->

    {#if $userAuthData}
      <div class="relative">
        <button id="b1" class="h-[52px] ">
          <img
            class="w-10 h-10 mr-2 rounded-full"
            src={$userAuthData.photoURL}
            alt=""
          />
        </button>
        <Popover defaultClass="p-0 m-0" triggeredBy="#b1" placement="bottom">
          <div
            class="z-50  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div class="px-4 py-3">
              <span
                class="block text-md font-semibold text-gray-900 dark:text-white"
                >{$userAuthData.displayName}</span
              >
              <span
                class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"
                >{$userAuthData.email}</span
              >
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <button
                  on:click={SignOut}
                  class="w-full font-semibold block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:text-red-500"
                  >Sign out</button
                >
              </li>
            </ul>
          </div>
        </Popover>
      </div>
    {:else}
      <div>
        <button
          on:click={() => {
            LoginClicked = true;
          }}
          class="mr-2 font-semibold text-lg hover:text-blue-500 translate-y-1"
          >Log in</button
        >
        <button
          on:click={() => {
            SighupClicked = true;
          }}
          type="button"
          class=" translate-y-1 text-md text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 "
          >Register</button
        >
      </div>
    {/if}

    <!-- right side -->
  </div>
</nav>

{#if LoginClicked}
  <Login
    on:close={() => {
      LoginClicked = false;
    }}
    on:newUser={() => {
      LoginClicked = false;
      SighupClicked = true;
    }}
  />
{/if}

{#if SighupClicked}
  <Sighup
    on:close={() => {
      SighupClicked = false;
    }}
    on:oldUser={() => {
      SighupClicked = false;
      LoginClicked = true;
    }}
  />
{/if}

{#if leftPannelClick}
  <Leftpannel
    on:close={() => {
      leftPannelClick = false;
    }}
    on:signout={SignOut}
  />
{/if}
