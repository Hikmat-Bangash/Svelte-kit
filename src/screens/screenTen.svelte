<!-- VideoDisplay.svelte -->
<script>
  import { currentPageNumber, EmotionScaleModel } from "../lib/pageSteps";
  import { onMount, onDestroy } from "svelte";
  import EmotionScale from "../components/EmotionScale.svelte";

  let videoUrl = "https://d1q27hl3unfcop.cloudfront.net/CopsDontCry.mp4";
  let videoDuration = 0;
  let videoCurrentTime = 0.0;
  let iteration = -2;
    let videoElement; // Reference to the video element
    let timeUpdateListener;
// Array to store timestamps for emotion component display
  const emotionTimestamps = [
    { start: 19.5, end: 20 },
    { start: 30, end: 31 },
    { start: 41.5, end: 42 },
  ];

  // Function to handle the visibility change event
  function handleVisibilityChange() {
    if (document.hidden) {
      // Pause the video when the page becomes hidden
      const video = document.querySelector("video");
      if (video) {
        window.alert(
          "To complete this trial, all videos must remain visible and audible."
        );
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      }
    }
  }
  // Add event listener for visibility change
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Function to handle the loadedmetadata event of the video element
  function handleMetadataLoaded() {
    const video = document.querySelector("video");
    if (video) {
     
        videoDuration = video.duration; // Get the video duration in seconds
        videoElement.currentTime = videoCurrentTime;
      iteration += 1;
    }
  }

  // Function to update videoCurrentTime when the video is playing
  // function updateTime() {
  //   console.log(videoElement.currentTime)
  //   console.log(videoElement)
  //   if (videoElement) {
  //     console.log("inside the if body")
  //    videoCurrentTime = videoElement.currentTime; // Get the current time of the video in seconds
  //     // Check if the video has reached its end
  //     if (videoCurrentTime === videoDuration) {
  //       currentPageNumber.set(10);
  //     }

  //      // Check if the current video time falls within any of the specified ranges
  //   for (const timestamp of emotionTimestamps) {
  //       if (videoElement.currentTime >= timestamp.start && videoElement.currentTime <= timestamp.end) {
  //         EmotionScaleModel.set(true);
  //         break; // Break the loop once an emotion timestamp is found
  //       }
  //     }

  //   }
  // }


  // Function to update videoCurrentTime when the video is playing
  function updateTime() {
    console.log(videoElement.currentTime)
    if (videoElement) {
    console.log("inside the if-condition body")

      videoCurrentTime = videoElement.currentTime; // Get the current time of the video in seconds

      // Check if the video has reached its end
      if (videoCurrentTime === videoDuration) {
        currentPageNumber.set(10);
      }

      // Check if the current video time falls within any of the specified ranges
      for (const timestamp of emotionTimestamps) {
        if (videoElement.currentTime >= timestamp.start && videoElement.currentTime <= timestamp.end) {
          EmotionScaleModel.set(true);
          break; // Break the loop once an emotion timestamp is found
        }
      }
    }
  }



  onMount(() => {
     handleMetadataLoaded();
    if (videoElement) {
      videoElement.addEventListener("timeupdate", updateTime); // Add event listener for time updates
      videoElement.currentTime = videoCurrentTime; // Set the initial video time
    };
  });

  onDestroy(() => {
    if (videoElement) {
      videoElement.removeEventListener("timeupdate", updateTime); // Remove event listener on component unmount
    }
  });
</script>

{#if $EmotionScaleModel}
<EmotionScale/>
{:else}
<div
  class="container w-full h-screen flex flex-col gap-4 justify-center items-center"
>
  <div class="wrapper w-[40rem] h-[25rem] bg-black border border-gray-700">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
    controls
      autoplay
      class="w-full h-full"
      on:loadedmetadata={handleMetadataLoaded}
      bind:this={videoElement}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>

    <p>VIDEO TIMESTAMPS: {videoCurrentTime}</p>
  </div>
</div>
{/if}