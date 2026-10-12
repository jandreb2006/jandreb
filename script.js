const menuButton = document.getElementById("menuButton");
const dropdownMenu = document.getElementById("dropdownMenu");
if (menuButton && dropdownMenu) {
menuButton.addEventListener("click", function () {
if (dropdownMenu.style.display === "block") {
dropdownMenu.style.display = "none";
} else {
dropdownMenu.style.display = "block";
}
});
document.addEventListener("click", function (event) {
    if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
    }
});
}

const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
registrationForm.addEventListener("submit", async function (event) {
event.preventDefault();
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registrationMessage");
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }
    if (password.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        return;
    }
    const users = JSON.parse(localStorage.getItem("Users") || "[]");
    const existingUser = users.find(function (user) {
        return user.email === email;
    });
    if (existingUser) {
        message.textContent = "An account with this email already exists.";
        return;
    }
    const passwordBytes = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBytes);
    const passwordHash = Array.from(new Uint8Array(hashBuffer))
        .map(function (byte) {
            return byte.toString(16).padStart(2, "0");
        })
        .join("");
    users.push({
        name: name,
        email: email,
        passwordHash: passwordHash
    });
    localStorage.setItem("Users", JSON.stringify(users));
    message.textContent = "Registration successful! Redirecting to login...";
    registrationForm.reset();
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1500);
});
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", async function (event) {
event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");
    const users = JSON.parse(localStorage.getItem("Users") || "[]");
    const user = users.find(function (user) {
        return user.email === email;
    });
    if (!user) {
        message.textContent = "Account not found. Please register first.";
        return;
    }
    const passwordBytes = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBytes);
    const passwordHash = Array.from(new Uint8Array(hashBuffer))
        .map(function (byte) {
            return byte.toString(16).padStart(2, "0");
        })
        .join("");

    if (user.passwordHash !== passwordHash) {
        message.textContent = "Incorrect password. Please try again.";
        return;
    }
    sessionStorage.setItem("LoggedIn", "true");
    sessionStorage.setItem("UserEmail", user.email);
    sessionStorage.setItem("UserName", user.name);
    message.textContent = "Login successful! Redirecting...";
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1000);
});
}
if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
const isLoggedIn = sessionStorage.getItem("LoggedIn");
if (isLoggedIn !== "true") {
    window.location.href = "login.html";
}
}
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
logoutButton.addEventListener("click", function (event) {
event.preventDefault();
    sessionStorage.removeItem("LoggedIn");
    sessionStorage.removeItem("UserEmail");
    sessionStorage.removeItem("UserName");
    window.location.href = "login.html";
});
}
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
if (profileName && profileEmail) {
const isLoggedIn = sessionStorage.getItem("LoggedIn");
if (isLoggedIn !== "true") {
    window.location.href = "login.html";
} else {
    profileName.textContent = sessionStorage.getItem("UserName") || "Not available";
    profileEmail.textContent = sessionStorage.getItem("UserEmail") || "Not available";
}
}
