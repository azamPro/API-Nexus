

function sendMail(){
    if(validateForm()){
        let email = document.getElementById("email_id").value;
        
        if(canSendMoreMessages(email)){
            let params ={
                from_name: document.getElementById("fullName").value,
                email_id: email,
                message: document.getElementById("message").value,
            };
            emailjs.send("service_jwze3l9","template_hzj19fp",params).then(function(res){
                alert("Success " + res.status);
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
    if (Number(count) < 12) {
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