<script lang="ts">
  import { onMount } from "svelte";
  import Plyr from "plyr";
  export let audio_asset:string;

  let player;

  onMount(() => {
    player = new Plyr("#audio-player");
  });
</script>


<main>
  <audio id="audio-player" controls>
    <source src={audio_asset} type="audio/mp3">
  </audio>
</main>

<style>
  /* Add any styling you want for your audio player */
</style>
