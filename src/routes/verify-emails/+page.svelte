<script lang="ts">
    import {isValidated} from "$lib/utils"

    let emails= $state("")
    let verifiedEmails= $state("")
    let isUpdating =$state(false)
    let emailCount = $derived(emails==""?0:emails.split("\n").length)
    let verifiedEmailCount = $derived(verifiedEmails==""?0:verifiedEmails.split("\n").length)
    async function validationRun(){  
        emails=emails.trim()      
        let tmpEmails = emails.split("\n")
        if(tmpEmails.length<1 || tmpEmails[0]==''){
          alert("Please enter emails")
          return
        }
        isUpdating=true
        try {
              const response = await fetch('/api/verify-emails', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ emails: tmpEmails })
              });

              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }

              const tmpVerifiedEmails = await response.json();
              verifiedEmails = tmpVerifiedEmails.join("\n");
          } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
          } finally {
              isUpdating = false;
          }
       
    }

</script>

<div class="flex justify-center items-center min-h-screen">
    <div class="space-y-4">
      <div class="flex justify-between">
        <h2 class="text-lg font-bold">Raw Emails ({emailCount})</h2>
        <h2 class="text-lg font-bold">Validated Emails ({verifiedEmailCount})</h2>
      </div>
      <div class="flex space-x-4 items-center">
        <textarea bind:value={emails}
         class="w-full h-64 p-2 border border-gray-300 rounded" placeholder="Enter raw emails here..."></textarea>
        <button 
        class="bg-black hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded h-fit w-fit"
        onclick={validationRun} 
        disabled={isUpdating}>
          {isUpdating?"Please wait":" Validate Emails"}
        </button>
        <textarea bind:value={verifiedEmails} 
        class="w-full h-64 p-2 border border-gray-300 rounded" placeholder="Validated emails will appear here..."></textarea>
      </div>
    </div>
  </div>