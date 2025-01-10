const profilePictureInput = document.getElementById("profile-picture");
const profilePhoto = document.getElementById("profile-photo");

profilePictureInput.addEventListener("change", function () {
    const file = profilePictureInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePhoto.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const updateContent = (id, content) => {
        const element = document.getElementById(id);
        if (element) element.textContent = content;
    };

    const updateList = (id, items) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = "";
            items.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = item;
                element.appendChild(li);
            });
        }
    };

    const updateTextareaList = (id, elements) => {
        const list = Array.from(elements).map(el => el.value.trim()).filter(item => item); // Trim and filter empty inputs
        updateList(id, list);
    };

    const updateResume = () => {
        updateContent("name", document.getElementById("edit-name").value);
        updateContent("job-title", document.getElementById("edit-job-title").value);
        updateContent("email", document.getElementById("edit-email").value);
        updateContent("phone", document.getElementById("edit-phone").value);
        updateContent("address", document.getElementById("edit-address").value);
        updateContent("about-text", document.getElementById("edit-about").value);

        updateTextareaList("skills-list", document.getElementsByClassName("edit-skills"));
        updateTextareaList("education-list", document.getElementsByClassName("edit-education"));
        updateTextareaList("work-list", document.getElementsByClassName("edit-work"));

        updateList("certifications-list", [document.getElementById("edit-certifications").value.trim()]);
        updateList("languages-list", [document.getElementById("edit-languages").value.trim()]);

        // Update LinkedIn and GitHub links
        updateContent("linkedin-link", document.getElementById("edit-linkedin").value);
        updateContent("github-link", document.getElementById("edit-github").value);
    };

    // Add event listeners to form fields to update the resume in real-time
    document.getElementById("resume-form").addEventListener("input", updateResume);

    // Add PDF download functionality
    document.getElementById("download-pdf-btn").addEventListener("click", function () {
        const doc = new jsPDF();

        // Get form data
        const name = document.getElementById("edit-name").value;
        const jobTitle = document.getElementById("edit-job-title").value;
        const email = document.getElementById("edit-email").value;
        const phone = document.getElementById("edit-phone").value;
        const address = document.getElementById("edit-address").value;
        const linkedin = document.getElementById("edit-linkedin").value;
        const github = document.getElementById("edit-github").value;
        const aboutMe = document.getElementById("edit-about").value;

        // Get dynamic sections: skills, certifications, languages
        const skills = Array.from(document.getElementsByClassName("edit-skills")).map(input => input.value.trim()).filter(item => item);
        const certifications = Array.from(document.getElementsByClassName("edit-certifications")).map(input => input.value.trim()).filter(item => item);
        const languages = Array.from(document.getElementsByClassName("edit-languages")).map(input => input.value.trim()).filter(item => item);
        const education = Array.from(document.getElementsByClassName("edit-education")).map(input => input.value.trim()).filter(item => item);
        const workExperience = Array.from(document.getElementsByClassName("edit-work")).map(input => input.value.trim()).filter(item => item);

        // Add the resume data to the PDF
        doc.setFontSize(22);
        doc.text(20, 20, `Resume: ${name}`);

        doc.setFontSize(16);
        doc.text(20, 40, `Job Title: ${jobTitle}`);
        doc.text(20, 50, `Email: ${email}`);
        doc.text(20, 60, `Phone: ${phone}`);
        doc.text(20, 70, `Address: ${address}`);

        // Set default text color back to black after the white-colored links
        doc.setTextColor(0, 0, 0); // Reset text color to black for the next sections

        // Add LinkedIn and GitHub links with a custom color (e.g., dark gray or black)
        const linkColor = [0, 0, 0]; // Black color for links

        if (linkedin) {
            doc.text(20, 80, `LinkedIn: `);
            doc.setTextColor(linkColor[0], linkColor[1], linkColor[2]); // Set the custom color for the link text
            doc.text(100, 80, linkedin); // Adjust the position to suit
        }

        if (github) {
            doc.text(20, 90, `GitHub: `);
            doc.setTextColor(linkColor[0], linkColor[1], linkColor[2]); // Set the custom color for the link text
            doc.text(100, 90, github); // Adjust the position to suit
        }

        // Reset text color to black for further sections
        doc.setTextColor(0, 0, 0);

        // Add About Me
        doc.text(20, 110, `About Me: ${aboutMe}`);

        // Add Skills
        if (skills.length > 0) {
            doc.text(20, 130, "Skills:");
            skills.forEach((skill, index) => {
                doc.text(20, 140 + (index * 10), `- ${skill}`);
            });
        }

        // Add Certifications
        if (certifications.length > 0) {
            doc.text(20, 160, "Certifications:");
            certifications.forEach((certification, index) => {
                doc.text(20, 170 + (index * 10), `- ${certification}`);
            });
        }

        // Add Languages
        if (languages.length > 0) {
            doc.text(20, 190, "Languages:");
            languages.forEach((language, index) => {
                doc.text(20, 200 + (index * 10), `- ${language}`);
            });
        }

        // Add Education
        if (education.length > 0) {
            doc.text(20, 220, "Education:");
            education.forEach((edu, index) => {
                doc.text(20, 230 + (index * 10), `- ${edu}`);
            });
        }

        // Add Work Experience
        if (workExperience.length > 0) {
            doc.text(20, 250, "Work Experience:");
            workExperience.forEach((work, index) => {
                doc.text(20, 260 + (index * 10), `- ${work}`);
            });
        }

        // Save the document as a PDF
        doc.save("resume.pdf");
    });

    // Initial Resume Update
    updateResume();
});










