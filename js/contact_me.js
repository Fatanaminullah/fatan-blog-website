(function () {
  let form = document.getElementById("contactForm");
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let stringRegex = /^([^0-9]*)$/;
  form.addEventListener("submit", (event) => {
    // ...
    // stop form submission
    event.preventDefault();
    let from_name = form.elements["name"].value;
    let reply_to = form.elements["email"].value;
    let subject = form.elements["subject"].value;
    let message = form.elements["message"].value;
    let nameError, emailError;
    if (!from_name || !reply_to || !subject || !message) {
      alert("Field cannot be empty!");
    } else {
      if (!emailRegex.test(reply_to)) {
        emailError = "Wrong email format!";
      }
      if (!stringRegex.test(from_name)) {
        nameError = "Name cannot include a number!";
      }
      if (emailError || nameError) {
        alert(`${nameError || ""} \n${emailError || ""}`);
      } else {
        $this = $("#sendMessageButton");
        $this.prop("disabled", true);
        $("#loading-img").html(
          '<img alt="" src="img/loader.gif" style="width: 20px" />'
        );
        emailjs
          .send("service_gmail", "template_default", {
            from_name,
            subject,
            reply_to,
            message,
            to_name: "Fatan",
          })
          .then(
            function () {
              alert("Your message has been sent! ");
              $("#contactForm").trigger("reset");
            },
            function (error) {
              alert(
                `Sorry ${
                  from_name.split()[0]
                }, it seems that my mail server is not responding. Please try again later!`
              );
            }
          )
          .finally(function () {
            $("#loading-img").html("");
            setTimeout(function () {
              $this.prop("disabled", false);
            }, 1000);
          });
      }
    }
  });
})();
