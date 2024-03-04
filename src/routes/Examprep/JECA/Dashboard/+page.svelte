<script>
    import { Heading } from "flowbite-svelte";

    var now = new Date().getTime();
    var countDownDate = new Date("July 14, 2024 10:0:0").getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // timervalue = `${days}Days ${hours}Hours ${minutes}Minutes ${seconds}Seconds`;
    var timervalue = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };

    timer();
    function timer() {
        setInterval(() => {
            now = new Date().getTime();

            distance = countDownDate - now;

            days = Math.floor(distance / (1000 * 60 * 60 * 24));
            hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // timervalue = `${days}Days ${hours}Hours ${minutes}Minutes ${seconds}Seconds`;
            timervalue = {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            };

            if (distance < 0) {
                clearInterval(x);
                timervalue = "EXPIRED";
            }
        }, 1000);
    }
</script>

<svelte:head>
    <title>JECA - Dashboard</title>
</svelte:head>

<!-- <Heading
    customSize=" text-3xl md:text-4xl  font-bold "
    class="text-white text-right md:text-left pb-2 border-b">Dashboard</Heading
> -->

<div class="bg-gray-900 p-4 rounded-lg">
    <h1
        class="text-2xl mb-4 font-bold leading-none tracking-tight text-blue-400 dark:text-white"
    >
        Remaining Time
    </h1>

    <div class="flex">
        <div class="flex-1">
            <Heading
                customSize="text-3xl md:text-5xl lg:text-7xl font-bold "
                class="text-white mb-2 text-center">{timervalue.days}</Heading
            >
            <Heading
                customSize="text-sm md:text-lg lg:text-xl  font-bold"
                class="text-white text-center">Days</Heading
            >
        </div>
        <div class="flex-1">
            <Heading
                customSize="text-3xl md:text-5xl lg:text-7xl font-bold "
                class="text-white mb-2 text-center">{timervalue.hours}</Heading
            >
            <Heading
                customSize="text-sm md:text-lg lg:text-xl  font-bold"
                class="text-white text-center">Hours</Heading
            >
        </div>
        <div class="flex-1">
            <Heading
                customSize="text-3xl md:text-5xl lg:text-7xl font-bold "
                class="text-white mb-2 text-center"
                >{timervalue.minutes}</Heading
            >
            <Heading
                customSize="text-sm md:text-lg lg:text-xl  font-bold"
                class="text-white text-center">Minutes</Heading
            >
        </div>

        <div class="flex-1">
            <Heading
                customSize="text-3xl md:text-5xl lg:text-7xl font-bold "
                class="text-white mb-2 text-center"
                >{timervalue.seconds}</Heading
            >
            <Heading
                customSize="text-sm md:text-lg lg:text-xl  font-bold"
                class="text-white text-center">Seconds</Heading
            >
        </div>
    </div>
</div>

<div class="mt-6 flex gap-2 md:gap-4 lg:gap-6">
    <div class="bg-gray-900 flex-1 p-2 md:p-4 rounded-lg">
        <Heading
            customSize="text-xl md:text-2xl lg:text-4xl font-extrabold"
            class="text-white">8th July</Heading
        >
        <h1
            class="text-lg mt-2 font-bold leading-none tracking-tight text-blue-400 dark:text-white"
        >
            Exam Date
        </h1>
    </div>
    <div class="bg-gray-900 flex-1 p-2 md:p-4 rounded-lg">
        <Heading
            customSize="text-xl md:text-2xl lg:text-4xl font-extrabold"
            class="text-white">120 min</Heading
        >
        <h1
            class="text-lg mt-2 font-bold leading-none tracking-tight text-blue-400 dark:text-white"
        >
            Total Time
        </h1>
    </div>

    <div class="bg-gray-900 flex-1 p-2 md:p-4 rounded-lg">
        <Heading
            customSize="text-xl md:text-2xl lg:text-4xl font-extrabold"
            class="text-white">120</Heading
        >
        <h1
            class="text-lg mt-2 font-bold leading-none tracking-tight text-blue-400 dark:text-white"
        >
            Total Marks
        </h1>
    </div>
</div>
