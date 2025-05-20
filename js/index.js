document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("emailForm");
    const emailInput = document.getElementById("username");
    const resultCont = document.getElementById("resultCont");
    const submitBtn = document.getElementById("submit-btn");
    const copyBtn = document.getElementById("copyBtn");

    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        if (!email) {
            resultCont.innerHTML = "<div>Please enter an email address.</div>";
            return;
        }

        const key = "ema_live_Xe2kbuTORw2B7z66wyMmwHiqb5NX9hXhYcaucxxN";
        const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

        try {
            const res = await fetch(url);
            const result = await res.json();

            let str = "";
            for (const key in result) {
                str += `<div><strong>${key}</strong>: ${result[key]}</div>`;
            }

            resultCont.innerHTML = str;
            copyBtn.style.display = "inline-block"; // show the button after result loads
            

            copyBtn.addEventListener("click", () => {
                const temp = document.createElement("textarea");
                temp.value = resultCont.innerText;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand("copy");
                document.body.removeChild(temp);
                copyBtn.innerText = "✅ Copied!";
                setTimeout(() => (copyBtn.innerText = "📋 Copy Result"), 2000);
            });


        } catch (err) {
            resultCont.innerHTML = "<div>Error fetching email validation data.</div>";
            console.error(err);
        }
    });
});
