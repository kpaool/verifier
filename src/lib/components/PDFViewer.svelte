<!-- PDFViewer.svelte -->
<script lang="ts">
    // Define the path to your PDF file
    export let pdfPath:any; 
  </script>
  
  <style>
    /* Style the iframe as needed */
    iframe {
      width: 100%;
      height: 1000px; /* Set the desired height */
    }
  </style>
  
  <iframe title="CV" src={pdfPath} frameborder="0"></iframe>
  