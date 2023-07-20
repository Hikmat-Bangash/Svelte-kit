<script>
  import { onMount } from "svelte";
  import { currentPageNumber, randomNumber } from "../lib/pageSteps";
  import { ThirdScreen } from "../constants/constants";
  //---- function method to triggered next page whenever user click on continue button
  const NextPageHandler = () => {
    currentPageNumber.set(3);
  };

  let randomWord = ""; // Variable to store the random word

  // Function to generate a random five-character word
  function generateRandomWord() {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let word = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      word += characters.charAt(randomIndex);
    }
    return word;
  }

  // Use onMount to call the generateRandomWord function and assign to global variable when the component is mounted
  onMount(() => {
    randomWord = generateRandomWord().toLowerCase();
    randomNumber.set(randomWord);
  });
</script>

<!-- CONTENT SECTION -->
<div
  class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
  <div
    class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700"
  >
    <p class="flex-wrap text-center">{ThirdScreen.WARNING_MESSAGE}</p>

    <p class="flex-wrap text-center">
      Please enter the word <b class="uppercase">{randomWord}</b> in lowercase letters
      to Box1.
    </p>

    <p>{ThirdScreen.BOX2_MESSAGE}</p>

    <button
      on:click={NextPageHandler}
      class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
      >{ThirdScreen.BUTTON}</button
    >
  </div>
</div>
