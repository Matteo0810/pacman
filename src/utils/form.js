const G_FORM_ID = "1-iD9QwsabldSC2bfAiKcAmvWEarniAspTzpvytoGVkI";

const G_FIELD_EMAIL_ID = "1359740161";
const G_FIELD_SCORE_ID = "2021428930";

function createForm() {
    document.body.insertAdjacentHTML("beforeend", `
        <form method="POST">
            <input name="email" type="email" placeholder="Votre email" required />
            <button type="submit">Envoyer mon score</button>
        </form>
    `);

    document.querySelector("form")
        .onsubmit = async event => {
            event.preventDefault();
            const formData = new FormData();
            const emailField = document.querySelector('[name="email"]');
            if(!emailField)
                return;
            const email = emailField.value;
            if(!email || email.trim() === "")
                return;
            if(score < 1)
                return;
            formData.append(`entry.${G_FIELD_EMAIL_ID}`, email);
            formData.append(`entry.${G_FIELD_SCORE_ID}`, score);

            const response = await fetch(
                `https://docs.google.com/forms/d/e/${G_FORM_ID}/formResponse%27`,
                { method: "POST" }
            );
            console.log(response.status)
            if(response.status === 200) {
                event.target.insertAdjacentHTML("beforeend", "<p>Score envoyé !</p>");
                setTimeout(() => document.querySelector("p").remove(), 1e3);
                event.target.clear();
            }
        }
}
