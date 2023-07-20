<!-- VideoDisplay.svelte -->
<script>
   let videoUrl = "https://d1q27hl3unfcop.cloudfront.net/CopsDontCry.mp4";

  // Function to handle the visibility change event
  function handleVisibilityChange() {
    if (document.hidden) {
      // Pause the video when the page becomes hidden
      const video = document.querySelector("video");
      if (video) {
        window.alert("To complete this trial, all videos must remain visible and audible.");
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
    }
  }

  // Add event listener for visibility change
  document.addEventListener("visibilitychange", handleVisibilityChange);
</script>

<div class="container w-full h-screen flex flex-col gap-4 justify-center items-center">
  <div class="wrapper w-[40rem] h-[25rem] bg-black border border-gray-700">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video controls autoplay class="w-full h-full">
      <source src={videoUrl} type="video/mp4" />
     
    </video>
  </div>
</div>
