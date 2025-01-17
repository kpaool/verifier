<script>
    // Your JavaScript logic for handling the share functionality
    async function shareContent() {
      if (navigator.share) {
        // Use the Web Share API if supported
        await navigator.share({
          title: 'Share this article',
          text: 'Check out this amazing article from Katumba Paul',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that do not support the Web Share API
        alert('Sharing is not supported on this browser.');
      }
    }
  </script>
  
  <button on:click={shareContent} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
    Share
  </button>
  