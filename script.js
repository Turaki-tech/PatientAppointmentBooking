// Function to handle user registration
function signUp() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create a user object
    const user = {
        firstName,
        lastName,
        email,
        password,
    };

    // Store user in local storage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Sign Up Successful! You can now Sign In.");
    window.location.href = "signIn.html";
}

// Function to handle user login
function login() {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
        // Store login status
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("lastLogin", Date.now());
        alert("Login Successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

// Function to handle booking submission
function submitBooking() {
    const patientName = document.getElementById("patientName").value;
    const patientAge = document.getElementById("patientAge").value;
    const patientState = document.getElementById("patientState").value;
    const patientLGA = document.getElementById("patientLGA").value;
    const patientCity = document.getElementById("patientCity").value;
    const patientPhone = document.getElementById("patientPhone").value;

    // Create booking object
    const booking = {
        patientName,
        patientAge,
        patientState,
        patientLGA,
        patientCity,
        patientPhone,
        ticketId: Date.now(), // Simple unique ID
    };

    // Store booking in local storage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Show booking confirmation
    document.getElementById("bookingStatus").innerText = "Booking submitted successfully!";
    document.getElementById("ticketId").style.display = "block";
    document.getElementById("ticketId").children[0].innerText = booking.ticketId;
    document.getElementById("bookingForm").reset();
}

// Function to logout the user
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("lastLogin");
    alert("You have logged out successfully.");
    window.location.href = "signIn.html";
}

// Check for logged-in status and handle session expiration
document.addEventListener("DOMContentLoaded", function () {
    const loggedIn = localStorage.getItem("loggedIn");
    const lastLogin = localStorage.getItem("lastLogin");
    const sessionDuration = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

    if (loggedIn && lastLogin) {
        const now = Date.now();
        if (now - lastLogin > sessionDuration) {
            // Session expired
            alert("Your session has expired. Please sign in again.");
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("lastLogin");
            window.location.href = "signIn.html";
        }
    }
});

// Global bookings array
let bookings = [];

// Function to show forgot password alert
function showForgotPassword() {
    alert("Please contact support for password assistance.");
}

// Function to manage section visibility
function showSection(section) {
    const sections = ["initialPage", "signUpPage", "homepage", "myBookings", "support"];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === section ? "block" : "none";
    });

    // If showing homepage, reset forms
    if (section === "homepage") {
        document.getElementById("bookingForm").style.display = "none";
        document.getElementById("myBookings").style.display = "none";
        document.getElementById("support").style.display = "none";
    }
}

// Function to show booking form
function showBookingForm() {
    document.getElementById("bookingForm").style.display = "block";
    document.getElementById("myBookings").style.display = "none";
    document.getElementById("support").style.display = "none";
}

// Function to handle sign-up process with password validation
function handleSignUp() {
    const password = document.getElementById("signUpPassword").value;

    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters with no spaces.");
        return;
    }

    alert("Sign-up successful. Please log in.");
    document.getElementById("signUpForm").reset();
    showSection("initialPage");
}

// Function to submit a booking with validation
function submitBooking() {
    const phone = document.getElementById("patientPhone").value.trim();

    if (!validatePhoneNumber(phone)) {
        alert("Phone number must start with +234 and be 14 digits (including country code).");
        return;
    }

    const ticketId = "TID" + Math.floor(Math.random() * 10000);
    const patientName = document.getElementById("patientName").value;
    const patientAge = document.getElementById("patientAge").value;
    const patientState = document.getElementById("patientState").value;
    const patientLGA = document.getElementById("patientLGA").value;
    const patientCity = document.getElementById("patientCity").value;

    const booking = {
        ticketId: ticketId,
        name: patientName,
        age: patientAge,
        state: patientState,
        lga: patientLGA,
        city: patientCity,
        phone: phone
    };

    bookings.push(booking);
    document.getElementById("ticketId").style.display = "block";
    document.getElementById("ticketId").querySelector("span").textContent = ticketId;

    // Update the booking list
    displayBookings();

    alert("Booking successful. Ticket ID: " + ticketId);
    document.getElementById("bookingForm").reset();
}

// Function to display all bookings
function displayBookings() {
    const bookingList = document.getElementById("bookingList");
    bookingList.innerHTML = ""; // Clear the list

    if (bookings.length === 0) {
        document.getElementById("bookingStatus").style.display = "block";
        return;
    } else {
        document.getElementById("bookingStatus").style.display = "none";
    }

    bookings.forEach(booking => {
        const li = document.createElement("li");
        li.textContent = `Ticket ID: ${booking.ticketId}, Name: ${booking.name}, Age: ${booking.age}, Phone: ${booking.phone}`;
        bookingList.appendChild(li);
    });
}

// Function to validate phone number format
function validatePhoneNumber(phone) {
    return phone.startsWith("+234") && phone.length === 14;
}

// Function to validate password format
function validatePassword(password) {
    return password.length >= 8 && !password.includes(" ");
}