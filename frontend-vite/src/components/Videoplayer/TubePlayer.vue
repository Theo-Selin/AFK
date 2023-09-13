<template>
  <div ref="youtubeContainer" id="youtube-video-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  mute: {
    type: Number,
    default: 1
  }
});

const VIDEO_ID = 'TlFfsFBJ74M'; // Replace with your video ID
const API_SCRIPT_LOADED = ref(false);
const player = ref(null);

const onYouTubeIframeAPIReady = () => {
  window.YT.ready(() => {
    API_SCRIPT_LOADED.value = true;
    player.value = new window.YT.Player('youtube-video-container', {
      height: '100%',
      width: '100%',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        showinfo: 0,
        rel: 0,
        mute: 1
      },
      events: {
        onReady: onPlayerReady
      }
    });
  });
  console.log(props.mute);
};

const onPlayerReady = (event) => {
  event.target.playVideo();
};

onMounted(() => {
  if (!API_SCRIPT_LOADED.value) {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
    script.onload = onYouTubeIframeAPIReady;
  } else {
    onYouTubeIframeAPIReady();
  }
});

watch(
  () => props.mute,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      player.value.mute();
    }
  }
);
</script>

<style>
@import './styles/_tube-player.css';
</style>
