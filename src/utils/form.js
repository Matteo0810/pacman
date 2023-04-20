const G_FORM_ID = "1FAIpQLSfRvX5MvjjHwGEqwD83oZek-dRW9tfBJ5SQjMmptlYMq9UScw";

const G_FIELD_EMAIL_ID = "1359740161";
const G_FIELD_SCORE_ID = "2021428930";

function createForm() {
    document.body.insertAdjacentHTML("beforeend", `
        <form method="POST">
            <img src="src/assets/logo.jpg" alt="logo certideal" />
            <h2>Score final: ${score} points</h2>
            <input name="email" type="email" placeholder="Votre email" required />
            <button type="submit">Envoyer mon score</button>
            <button id="play-again">Rejouer</button>
        </form>
    `);

    document.getElementById("play-again").onclick = initGame;

    document.querySelector("form")
        .onsubmit = async event => {
            event.preventDefault();
            const formData = new FormData();
            let emailField = document.querySelector('[name="email"]');
            if(!emailField)
                return;
            const email = emailField.value;
            if(!email || email.trim() === "")
                return;
            if(score < 1)
                return;
            formData.append(`entry.${G_FIELD_EMAIL_ID}`, email);
            formData.append(`entry.${G_FIELD_SCORE_ID}`, score);

            Array.from(event.target.children)
                .filter(node => node.id !== "play-again")
                .forEach(node => node.remove());

            event.target.insertAdjacentHTML("afterbegin",
                "<img src=\"src/assets/logo.jpg\" alt=\"logo certideal\" />" +
                "<p>Votre score a bien été envoyé</p>"
            );

            emailField.value = "";
            await fetch(
                `https://docs.google.com/forms/d/e/${G_FORM_ID}/formResponse`,
                {
                    method: "POST",
                    body: formData
                }
            ); // même si une erreur de CORS apparaît, le formulaire fonctionne
        }
}
