<script>
  import { onMount } from "svelte";
  import { db } from "../routes/firebaseConfig";
  import { collection, getDoc, doc, setDoc } from "firebase/firestore";
  import { createEventDispatcher } from "svelte";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import { notification } from "../routes/store";
  import { userAuthData } from "../routes/store";
  const dispatch = createEventDispatcher();
  var avatar;
  var loading = false;
  var userData = {
    userName: "",
    email: "",
    password: "",
  };

  onMount(() => {
    avatar = `https://avatars.dicebear.com/api/croodles/.svg?scale=120`;
  });

  $: avatar = `https://avatars.dicebear.com/api/croodles/${userData.userName}.svg?scale=120`;

  const auth = getAuth();

  function googleAuth() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((e) => {
      dispatch("close");
    });
  }

  const submitData = async () => {
    loading = true;

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: `${userData.userName}`,
          photoURL: avatar,
        })
          .then(() => {
            $userAuthData = auth.currentUser;
            console.log($userAuthData);
            $notification = {
              color: "#17c21d",
              sysmbol: "correct",
              text: "Account created",
            };

            loading = false;
            dispatch("close");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            $notification = {
              text: errorCode,
              symbol: "wrong",
              color: "#FF6465",
            };
            console.log(errorCode);
            console.log(errorMessage);
            loading = false;
            userData = {
              userName: "",
              email: "",
              password: "",
            };
          });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        $notification = {
          text: errorCode,
          symbol: "wrong",
          color: "#FF6465",
        };
        console.log(errorCode);
        console.log(errorMessage);
        loading = false;
        userData = {
          userName: "",
          email: "",
          password: "",
        };

        // ..
      });
  };
</script>

<div
  class=" Sighup  flex p-8 justify-center  bg-white w-[800px] rounded-md shadow-md "
>
  <div class="w-full  pr-8">
    <h1 class="text-3xl mb-5 ">Sign Up</h1>
    <div class="flex items-center  ">
      <div class="w-2/3 ">
        <input
          bind:value={userData.userName}
          type="text"
          placeholder="Username"
        />
      </div>

      <div class="avatar flex justify-center items-center w-1/3">
        <div class="flex flex-col items-center">
          <div class="w-20">
            <img class="rounded-md " src={avatar} alt="" />
          </div>

          <!-- {#if userData.userName == ""}
            <h1>Username</h1>
          {:else}
            <h1 class="">{userData.userName}</h1>
          {/if} -->
        </div>
      </div>
    </div>

    <input bind:value={userData.email} type="email" placeholder="Email" />
    <input
      bind:value={userData.password}
      type="Password"
      placeholder="Password"
    />
    <div
      on:click={() => {
        dispatch("oldUser");
      }}
      class="w-full flex justify-end"
    >
      <h1 class="text-md hover:text-[#29686e] cursor-pointer">
        Already have an account?
      </h1>
    </div>
    <button on:click={submitData} class="Sighup-button ">
      {#if loading}
        <div class="w-full  flex justify-center">
          <img src="/loading.svg" alt="" />
        </div>
      {:else}
        Sign Up
      {/if}
    </button>

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
    class=" Sighup-img border-l border-black pl-3 w-full  flex items-center justify-center "
  >
    <img class="w-full " src="/Sighup.svg" alt="" />
  </div>
</div>

<style>
  h1 {
    font-weight: 800;
  }
  input::placeholder {
    color: rgb(70, 70, 70);
    font-weight: 900;
  }
  input {
    font-family: monospace;
    width: 100%;
    margin: 5px 0;
    color: #000;
    height: 50px;
    font-weight: 900;
    font-size: large;
    /* background-color: #333; */
    outline: none;
    border: 2px solid black;
    padding: 0 20px;
    border-radius: 5px;
  }
  .Sighup-button {
    font-weight: 800;
    font-size: 1.2rem;
    width: 100%;
    margin-top: 20px;
    color: white;
    height: 50px;
    background-color: #29686e;
    outline: none;
    border: none;
    padding: 0 20px;
    border-radius: 5px;
    z-index: 99;
  }

  /* .avatar h1 {
    font-weight: 700;
    margin-top: 5px;
    padding: 2px;
    outline: none;
    color: #000;
    border-radius: 5px;
  } */
</style>
