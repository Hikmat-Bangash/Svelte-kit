<!-- VideoDisplay.svelte -->
<script>
  import {
    currentPageNumber,
    EmotionScaleModel,
    videoCurrentTime,
    videoTimeStamp,
    selectedRecords
  } from "../lib/pageSteps";
  import { onMount, onDestroy } from "svelte";
  import EmotionScaleTesting from "../components/EmotionScaleTesting.svelte";

  let videoUrl = "https://d1q27hl3unfcop.cloudfront.net/CopsDontCry.mp4";
  let videoDuration = 0;
  let videoElement; // Reference to the video element
  let timeUpdateListener;
  let iteration = 0;
  let isVideoPlaying = true;
  // Array to store timestamps for emotion component display
  const emotionTimestamps = [
    { start: 5, end: 5.3 },
    { start: 10, end: 10.3 },
    { start: 41.5, end: 42 },
  ];

  function handleVisibilityChange() {
    if (document.hidden) {
      // Pause the video when the page becomes hidden
      const video = document.querySelector("video");
      if (video && !video.paused) {
        isVideoPlaying = false;
        window.alert(
          "To complete this trial, all videos must remain visible and audible."
        );
      }
    } else {
      // Page is visible again, resume video if it was playing before
      const video = document.querySelector("video");
      if (video && !isVideoPlaying) {
        video.play();
        isVideoPlaying = true;
      }
    }
  }
  // Add event listener for visibility change
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Function to handle the loadedmetadata event of the video element
  function handleMetadataLoaded() { 
    if (videoElement) {
      videoDuration = videoElement.duration; // Get the video duration in seconds
      videoElement.currentTime = $videoCurrentTime; // Set the initial video time
      timeUpdateListener = updateTime;
      videoElement.addEventListener("timeupdate", timeUpdateListener); // Add event listener for time updates
    }
  }

  // Function to update videoCurrentTime when the video is playing
  function updateTime() {
    if (videoElement) {
      $videoCurrentTime = videoElement.currentTime; // Update the videoCurrentTime store
      // Check if the video has reached its end
      if ($videoCurrentTime == videoDuration) {
        currentPageNumber.set(10);
      }

      if (
        (videoElement.currentTime >= 25 &&
          videoElement.currentTime <= 25.3 &&
          iteration == 0) ||
        (videoElement.currentTime >= 75 &&
          videoElement.currentTime <= 75.3 &&
          iteration == 1) ||
        (videoElement.currentTime >= 180 &&
          videoElement.currentTime <= 180.3 &&
          iteration == 2) ||
        (videoElement.currentTime >= 460 &&
          videoElement.currentTime <= 460.3 &&
          iteration == 3) ||
        (videoElement.currentTime >= 610 &&
          videoElement.currentTime <= 610.3 &&
          iteration == 4)
      ) {
        videoTimeStamp.set(videoElement.currentTime);
        EmotionScaleModel.set(true);
        iteration += 1;
      }
    }
  }

  onMount(() => {
    console.log($selectedRecords)
    handleMetadataLoaded();

  });

  onDestroy(() => {
    if (videoElement) {
      videoElement.removeEventListener("timeupdate", timeUpdateListener); // Remove event listener on component unmount
    }
  });
</script>

{#if $EmotionScaleModel}
  <EmotionScaleTesting />
{:else}
  <div
    class="container w-full h-screen flex flex-col gap-4 justify-center items-center"
  >
    <div class="wrapper w-[40rem] h-[25rem] bg-black border border-gray-700">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        autoplay
        controls
        class="w-full h-full"
        on:loadedmetadata={handleMetadataLoaded}
        bind:this={videoElement}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  </div>
{/if}
