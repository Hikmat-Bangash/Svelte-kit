<script>
  import { EmotionScaleModel, videoTimeStamp } from "../lib/pageSteps";
  import { emotions } from "../constants/emotions";
  import { db } from "../firebase-config";
  import { collection, doc, setDoc } from "firebase/firestore";
  import { onMount } from "svelte";

  let fillWidths = Array(emotions.length).fill(0);
  let clickedDivs = Array(emotions.length).fill(false);
  let showSelectedPoints = false;
  let selectedRecords = []; // Array to store selected records
  let selectedTabs = [];
  let timestamps = "7.48";
  // Replace this with your actual user ID
  const userID = "debug4540r0wK";

  onMount(()=>{
    console.log($videoTimeStamp)
  })
  // onMouseMove function to fill div with mentioned color
  function handleMouseMove(index, event) {
    if (!clickedDivs[index]) {
      const mouseX =
        event.clientX - event.currentTarget.getBoundingClientRect().left;
      const divWidth = event.currentTarget.clientWidth;
      fillWidths[index] = Math.floor((mouseX / divWidth) * 100);
      clickedDivs[emotions.length] = true;
    }
  }

  // handleMouseOut function to remove color which are filled the div.
  function handleMouseOut(index) {
    if (!clickedDivs[index]) {
      fillWidths[index] = 0;
    }
    clickedDivs[emotions.length] = false;
  }

  //handleDivClick function to click on the div and filled the div with the color
  function handleDivClick(index) {
    if (clickedDivs[index]) {
      // Reset click state and fill width
      clickedDivs[index] = false;
      fillWidths[index] = 0;
    } else {
      clickedDivs[index] = true;
    }
    clickedDivs[emotions.length] = true;
  }
  // Remove function should be called immediately when the fired space and complete the actions accordingly
 function RemovingEvent() {
    window.removeEventListener("keydown", spaceKeyPressHandler);
  }
  // storing data function for to  create or store data in the firebase.
  const StoringData = async () => {
    //  getting last and latest array
    let latestArray = selectedRecords[selectedRecords.length - 1];

    let mergedArray = emotions.map((emotion, index) => ({
      [emotion]: latestArray[index],
    }));
    // Construct the document reference
    const timestampDocRef = doc(
      collection(doc(collection(db, "users"), userID), "TimeStamps"),
      timestamps
    );
    // Use the set function to store data
    try {
      await setDoc(timestampDocRef, {
        EmotionScale: mergedArray, // Add the merged array data
      });
      console.log("Data stored successfully");
    } catch (error) {
      console.error("Error storing data:", error);
    }

  };

  // Inside the nextPage() function:
  const nextPage = async () => {
    selectedTabs = fillWidths.map((width, index) =>
      clickedDivs[index] ? width : 0
    );

    if (selectedTabs.some((width) => width > 0)) {
      selectedRecords.push(selectedTabs);
      showSelectedPoints = true; // Show the selected points and lines
    }

    fillWidths = fillWidths.map(() => 0);
    clickedDivs = clickedDivs.map(() => false);
    // calling a method to store data in databse.
    EmotionScaleModel.set(false);
    await StoringData();
    RemovingEvent();
  };

  // press space button call nextPage function and save data in database.
  const spaceKeyPressHandler = async (event) => {
    if (event.key === " ") {
      await nextPage();
    }
  };

  window.addEventListener("keydown", spaceKeyPressHandler);

 
</script>

<div class="container w-full h-full flex justify-center items-center">
  <div class="wrapper mt-10 flex justify-center flex-col gap-1">
    <div class="instruction mb-3 text-[19px]">
      Please rate how you're feeling on the following emotions:
    </div>
    <!-- Your existing code for emotion_tabs -->
    {#each emotions as emotion, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->

      <div
        class="emotion_tab flex gap-0.5 justify-center items-center w-[450px]"
      >
        <div
          class="none-tab px-1 text-[19px] bg-[#ff816d] border-2 border-black"
          class:bg-white={clickedDivs[index] || fillWidths[index]}
        >
          None
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div
          class="box w-[400px] h-[32px] relative cursor-pointer border-2 border-black"
          on:mousemove={(e) => handleMouseMove(index, e)}
          on:mouseleave={() => handleMouseOut(index)}
          on:click={() => handleDivClick(index)}
        >
          <div
            class="fill absolute top-0 left-0 w-full h-full bg-[#ff816d]"
            style={`width: ${fillWidths[index]}%; transition: width 0.2s ease;`}
          />

          <!-- JS + HTML section -->
          <!-- Display selected points and vertical lines -->
          {#if showSelectedPoints && selectedRecords.length > 0}
            {#if showSelectedPoints && selectedRecords[selectedRecords.length - 1][index] > 0}
              <div
                class="selected-point"
                style={`left: ${
                  selectedRecords[selectedRecords.length - 1][index]
                }%;`}
              />
            {/if}
          {/if}
        </div>
        <div class="emotion_name flex justify-start ml-1" />
        <p class="w-[220px] justify-start text-[19px]">{emotion}</p>
      </div>
    {/each}

    <!-- press space button -->
    <p class="mt-3 text-[19px]">Press "space" when finished</p>
  </div>
</div>

<style>
  .emotion_tab {
    min-width: 450px;
  }
  .selected-point {
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: black;
    opacity: 0.8;
  }
</style>
