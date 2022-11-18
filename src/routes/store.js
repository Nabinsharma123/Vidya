import { writable } from "svelte/store";

export var authStatus = writable(false)
export var notification = writable(false)
export var userAuthData = writable()
export var options = writable([
    {
        name: "Python",
        endpoint: "/Python"
    },
    {
        name: "JavaScript",
        endpoint: "/JavaScript"
    },
    {
        name: "C",
        endpoint: "/C"
    },
    {
        name: "SQL",
        endpoint: "/SQL"
    },
    {
        name: "Java",
        endpoint: "/Java"
    },
    {
        name: "Machine Learning",
        endpoint: "/Machine-Learning"
    },
    {
        name: "DSA",
        endpoint: "/DSA"
    },
    {

        name: "Operating System",
        endpoint: "/Operating-System"
    },
    {

        name: "Computer Architecture",
        endpoint: "/Computer-Architecture"
    },

])