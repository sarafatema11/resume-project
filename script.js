window.addEventListener("load", function () {

    if (document.querySelector("#animatedText")) {
        new Typed('#animatedText', {
            strings: [
                "Create Resume Easily",
                "Build Professional CV",
                "Get Hired Faster"
            ],
            typeSpeed: 60,
            backSpeed: 30,
            loop: true
        });
    }

});

function checkLogin() {

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let error = document.getElementById("loginError");

    if (email === "" || password === "") {
        error.innerText = "Please fill information first!";
        return;
    }

    error.innerText = "";
    enterSite();
}


function enterSite() {

    let loginPage = document.getElementById("loginPage");
    let nav = document.getElementById("nav");
    let hero = document.getElementById("hero");
    let about = document.getElementById("about");
    let resume = document.getElementById("resume");
    let contact = document.getElementById("contact");

    loginPage.style.display = "none";
    nav.style.display = "flex";
    hero.style.display = "flex";
    about.style.display = "block";
    resume.style.display = "block";
    contact.style.display = "block";

    new Typed('#typed', {
        strings: [
            "Build resume in minutes",
            "Choose professional templates",
            "Download • Print • Edit"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

}

function showResumeForm() {
    document.getElementById("resume").style.display = "block";
    document.getElementById("resume").scrollIntoView({ behavior: "smooth" });
}

function v(id) { return document.getElementById(id).value; }

function addSkill() {
    let input = document.getElementById("skillInput");
    let container = document.getElementById("skillsContainer");

    if (input.value.trim() !== "") {
        let li = document.createElement("li");
        li.innerText = input.value;
        container.appendChild(li);
        input.value = "";
    }
}

function addLanguage() {
    let input = document.getElementById("langInput");
    let container = document.getElementById("langContainer");

    if (input.value.trim() !== "") {
        let li = document.createElement("li");
        li.innerText = input.value;
        container.appendChild(li);
        input.value = "";
    }
}

function collectData() {

    let data = {
        name: v("name"),
        title: v("title"),
        address: v("address"),
        phone: v("phone"),
        email: v("email"),
        summary: v("summary"),
        edu: v("edu"),
        exp: v("exp"),

        skills: document.getElementById("skillsContainer").innerHTML,
        languages: document.getElementById("langContainer").innerHTML,

        hobbies: document.querySelector("[name='hobbies']").value,
        projects: document.querySelector("[name='projects']").value,
        strengths: document.querySelector("[name='strengths']").value,

        template: v("tpl"),

    };

    let photo = document.getElementById("photo").files[0];

    if (photo) {
        let reader = new FileReader();
        reader.onload = function (e) {
            data.photo = e.target.result;
            localStorage.setItem("resumeData", JSON.stringify(data));
            window.open("resume.html", "_blank");
        };
        reader.readAsDataURL(photo);
    } else {
        localStorage.setItem("resumeData", JSON.stringify(data));
        window.open("resume.html", "_blank");
    }
}


function generateResume() {
    collectData();
}

function sendMessage() {

    let name = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let message = document.getElementById("contactMessage").value.trim();
    let status = document.getElementById("contactStatus");

    if (name === "" || email === "" || message === "") {
        status.style.color = "red";
        status.innerText = "Please fill all fields!";
        return;
    }

    let params = {
        name: name,
        email: email,
        message: message
    };

    emailjs.send("service_23o7oeo", "template_wgsjx1t", params)
        .then(function () {
            status.style.color = "green";
            status.innerText = "Message sent successfully!";
        })
        .catch(function () {
            status.style.color = "red";
            status.innerText = "Failed to send message!";
        });
}


function limitLines(textareaId, maxLines) {
    const textarea = document.getElementById(textareaId);
    textarea.addEventListener('input', function () {
        let lines = textarea.value.split('\n');

        if (lines.length > maxLines) {
            // Keep only the allowed number of lines
            textarea.value = lines.slice(0, maxLines).join('\n');
        }
    });
}

// Limit Profile Summary to 5 lines
limitLines('summary', 3);

// Limit Experience to 7 lines
limitLines('exp', 5);


// Word limit enforcement for Profile Summary
function enforceWordLimit(textareaId, maxWords, warningId) {
    const textarea = document.getElementById(textareaId);
    const warning = document.getElementById(warningId);

    textarea.addEventListener('input', function () {
        let words = textarea.value.trim().split(/\s+/);
        if (words[0] === "") words = [];

        if (words.length > maxWords) {
            // Show warning with numbers
            warning.innerText = `⚠ You have used ${words.length} words. Maximum allowed is ${maxWords} words!`;
        } else {
            warning.innerText = ""; // clear warning if under limit
        }
    });
}

// Call it for Profile Summary (max 300 words)
enforceWordLimit('summary', 300, 'summaryWarning');