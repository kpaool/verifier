<script lang="ts">
    import { page } from '$app/stores'
  
    $: {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'G-W7352JCVDS', {
          page_title: document.title,
          page_path: $page.url.pathname,
        })
      }
    }
  </script>
  
  <svelte:head>
    <!-- Tracking for google analytics -->
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-W7352JCVDS">
    </script>
    <script>
      window.dataLayer = window.dataLayer || []
  
      function gtag() {
        dataLayer.push(arguments)
      }
  
      gtag('js', new Date())
      gtag('config', 'G-W7352JCVDS')
    </script>
  </svelte:head>
  