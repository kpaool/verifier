<script lang="ts">
    import {isValidated} from "$lib/utils"
    import {emailVariations} from '$lib/data/emails'

    let emails= $state("fefete5253@fanicle.com")
    let verifiedEmails= $state("")
    let product=$state("mash")
    let isUpdating =$state(false)
    let emailCount = $derived(emails==""?0:emails.split("\n").length)
    let verifiedEmailCount = $derived(verifiedEmails==""?0:verifiedEmails.split("\n").length)
    let selectedFiles: FileList | null = null;
    async function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }


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

    async function ValidateEmail(email:string){
      emails=emails.trim()      
      let tmpEmails =[email]
      if(tmpEmails.length<1 || tmpEmails[0]==''){
        alert("Please enter email")
        return
      }
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
            return email
        } catch (error) {            
            console.error('There was a problem with the fetch operation:', error);
            return null
        }
      
    }

    async function sendEmail(to:string,subject:string,text:string) {
      try {

        const attachments = [];
        if (selectedFiles) {
            for (const file of Array.from(selectedFiles)) {
                const base64 = await fileToBase64(file);
                attachments.push({
                    name: file.name,
                    data: base64.split(',')[1], // Remove the data URL prefix
                    content_type: file.type
                });
            }
        }

        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: '"Grace Mostwana" <grace.mostwana@thedticsupplychain.org>',
                to:[to],
                subject,
                plain_body:text,
                attachments
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log("Email sent successfully:", result);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    function capitalizeFirstLetter(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function getRandomEmailResources(product:string,email:string){
      let emailResource= emailVariations[Math.floor(Math.random() * emailVariations.length)];
      return {
        subject:emailResource.subject.replace("{{product}}",product),
        to:email,
        text:emailResource.body.replaceAll("{{product}}",product).replaceAll("{{receiver}}",capitalizeFirstLetter(email.split("@")[0]))
      }
    }



    async function sendBulkEmails(delay:number=2000){  
        emails=emails.trim()      
        let tmpEmails = emails.split("\n")
        if(tmpEmails.length<1 || tmpEmails[0]==''){
          alert("Please enter emails")
          return
        }
        if(product==""){
          alert("Enter product name")
          return
        }

        isUpdating=true
        for (let index = 0; index < tmpEmails.length; index++) {
          const email = tmpEmails[index];
          let validEmail = await ValidateEmail(email)
          if(validEmail){
            console.log(validEmail)
            const {to,subject,text} = getRandomEmailResources(product,validEmail[0])
            await sendEmail(to,subject,text)
            await new Promise(resolve => setTimeout(resolve, delay));
          }          
        }
        isUpdating=false
    }

</script>






<div class="flex justify-center items-center min-w-full min-h-screen">
    <div class="space-y-4">
      <div class="flex justify-between">
        
        <div class="flex flex-col justify-center items-center w-48" >
          
          <h2 class="text-lg font-bold">Raw Emails ({emailCount})</h2>
        </div>
        <h2 class="text-lg font-bold">Validated Emails ({verifiedEmailCount})</h2>
      </div>
      <div class="flex flex-col space-y-4 items-center">
          <textarea bind:value={emails}
         class="w-full h-64 p-2 border border-gray-300 rounded" placeholder="Enter raw emails here..."></textarea>
         <input type="file" multiple bind:files={selectedFiles} class="w-full p-2 border border-gray-300 rounded" />
         <input type="text" bind:value={product} class="w-full p-2 border border-gray-300 rounded" placeholder="Enter product name...">
        
        <button 
        class="bg-black hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded h-fit w-fit"
        onclick={()=>{
          sendBulkEmails()
        }} 
        disabled={isUpdating}>
          {isUpdating?"Please wait,sending emails":" Send Emails"}
        </button>
        <!-- <textarea bind:value={verifiedEmails} 
        class="w-full h-64 p-2 border border-gray-300 rounded" placeholder="Validated emails will appear here..."></textarea> -->
      </div>
    </div>
  </div>