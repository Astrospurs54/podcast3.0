// sending email
emailjs.init({
        publicKey: "UdccSNSMX8pUGzcOj",
      });

const form = document.forms['contact-form']
const submitButton = form ? form.querySelector('button[type="submit"]') : null
const originalButtonText = submitButton ? submitButton.textContent : 'Send Message'

form.addEventListener('submit',function (e)  {
  e.preventDefault()

  if (submitButton) {
    submitButton.disabled = true
    submitButton.textContent = 'Sending...'
  }
  const templateParams = {
        Name : document.getElementById("Name").value,
        Email : document.getElementById("Email").value,
        Phone : document.getElementById("Phone").value,
        Comment : document.getElementById("Comment").value
  };

  emailjs.send("service_ufbe6nj","template_bmbknfe", templateParams)
  .then((response) => {
    console.log("it worked", response.status, response.text)
        alert("Email sent successfully! We will get back to you as soon as possible.");

        form.reset();


    })

    .catch((error) => {
      alert("Failed to send Email Please try again later.");
    })
    .finally(() => {
      if (submitButton){
         submitButton.disabled = false
          submitButton.textContent = originalButtonText;
      }
    });
});