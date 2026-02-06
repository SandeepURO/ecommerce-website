
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>


$(document).ready(function () {

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const message = $("#message").val().trim();

    let isValid = true;

    $(".error").remove();

    if (name === "") {
      showError("#name", "Name is required");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showError("#email", "Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      showError("#email", "Enter a valid email");
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (phone === "") {
      showError("#phone", "Phone number is required");
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      showError("#phone", "Enter a valid 10-digit number");
      isValid = false;
    }

    if (message === "") {
      showError("#message", "Message cannot be empty");
      isValid = false;
    }

    if (isValid) {
      alert("✅ Message sent successfully!");
      this.reset();
    }
  });
  function showError(inputSelector, message) {
    const error = `<small class="error" style="color:red;font-size:12px;">${message}</small>`;
    $(inputSelector).parent().append(error);
  }

});

