 // Zorgt ervoor dat de verzendknop alleen ingeschakeld wordt als de checkbox is aangevinkt
 document.getElementById("agree").addEventListener("change", function() {
    document.getElementById("submitBtn").disabled = !this.checked;
});

// Event listener voor de submit-knop
document.getElementById("submitBtn").addEventListener("click", function(event) {
    // Controle of de checkbox is aangevinkt
    if (!document.getElementById("agree").checked) {
        event.preventDefault(); // Voorkomt het verzenden van het formulier
        alert("Je moet akkoord gaan met de algemene verklaring voordat je het bericht kunt verzenden.");
        return;
    }

    // Formulier validatie
    if (!validateForm()) {
        event.preventDefault(); // Voorkomt verzenden als de validatie faalt
    }
});

// Functie voor het valideren van formulierinvoer
function validateForm() {
    const forbiddenChars = /[<>"/'`;(){}%]/;
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.querySelector("textarea[name='message']").value;
    
    // Controle op verboden tekens
    if (forbiddenChars.test(name) || forbiddenChars.test(subject) || forbiddenChars.test(message)) {
        alert("Uw invoer bevat ongeldige tekens!");
        return false;
    }
    
    // Controle of het e-mailadres correct is
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Voer een geldig e-mailadres in!");
        return false;
    }
    
    return true; // Formulier is geldig
}


//-----------------------------------------------------------------------------------------------------------------
// Event listener voor het afspelen van de audio
document.querySelectorAll(".audio-container").forEach(container => {
    const button = container.querySelector(".play-button");
    const audio = container.querySelector(".audio-player");

    button.addEventListener("click", () => {
        // Pauzeer alle andere audiobestanden voordat je een nieuwe afspeelt
        document.querySelectorAll(".audio-player").forEach(player => {
            if (player !== audio) {
                player.pause();
                player.closest(".audio-container").querySelector(".play-button").innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        });

        // Speel of pauzeer de audio
        if (audio.paused) {
            audio.play();
            button.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audio.pause();
            button.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });
});