
  console.log('main.js loaded');

  const message = document.querySelector('.message-overlay')


function showForm(){
    message.style.display = 'block'
}
    

function sendMail(){
    if(validateForm()){
        let email = document.getElementById("email_id").value;
        
        if(canSendMoreMessages(email)){
            let params ={
                from_name: document.getElementById("fullName").value,
                email_id: email,
                message: document.getElementById("message").value,
            };
            emailjs.send("service_jwze3l9","template_d675cby",params).then(function(res){
                alert("Success " + res.status);
                cancelForm()
            }).catch(function(error) {
                console.error("Error sending email:", error);
                alert("Failed to send email. Please try again later.");
            });
        } else {
            alert("You can't send more than 2 messages");
        }
    }
    
}


function canSendMoreMessages(email) {
    // Get the current count for this user (email)
    let count = localStorage.getItem(email) || 0;

    // Convert count to a number and check if it's less than 2
    if (Number(count) < 3) {
        // If less than 2, increase the count and save it
        localStorage.setItem(email, Number(count) + 1);
        return true;
    } else {
        // If 2 or more, return false
        return false;
    }
}


function validateForm() {
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email_id").value;
    let message = document.getElementById("message").value;

    // Check if inputs are empty
    if (fullName === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return false;
    }

    // Validate email format
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}


document.getElementById('toggleFormButton').addEventListener('click', function() {
    var form = document.getElementById('customForm');
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});


function cancelForm(){
    message.style.display = 'none'
}