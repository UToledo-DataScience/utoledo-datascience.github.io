function fadeOut(id, time) {
    var fadeTarget = document.getElementById(id);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, time);
    setTimeout(function () {
        fadeTarget.parentNode.removeChild(fadeTarget);;
    }, time);
}

function sendEmail(event) {
    const emailForm = document.querySelector("#emailForm");
    var name = emailForm.elements.name;
    var email = emailForm.elements.email;
    var mailBody = emailForm.elements.message;

    if (name.value == "" || email.value == "" || mailBody.value == "") {
        document.getElementById("error").style.display = "inline-block";
        fadeOut("error", 3000);
    } else {
        var mailContent = "Name: " + name.value + ". \nEmail: " + email.value + ". \nMessage: " + mailBody.value;
        event.preventDefault();
        Email.send({
            // SecureToken: "96fe0647-3f05-4ab9-aedd-eb8690730f28",
            SecureToken: "c1cca9b4-3d8d-42e7-b682-3fb89ccf7a19",
            From: email.value,
            To: "utoledo.datascience@gmail.com",
            Subject: "Message From Website",
            Body: mailContent
        }).then(function (message) {
            if (message == "OK") {
                document.getElementById("success").style.display = "inline-block";
                fadeOut("success", 3000);
                name.value = "";
                email.value = "";
                mailBody.value = "";
            } else {
                document.getElementById("failure").style.display = "inline-block";
                fadeOut("failure", 4000);
                console.log(message)
            }
        });
    }
}