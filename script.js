 var currentPerson = 1;
    var consecutiveSixes = 0;

    function makeMove() {
        // Generate two random numbers between 1 and 6
        var randomNumber1 = Math.floor(Math.random() * 6) + 1;
        var randomNumber2 = Math.floor(Math.random() * 6) + 1;

        // Update the person's portion
        updatePersonPortion(currentPerson, randomNumber1, randomNumber2);

        // Read the generated numbers out loud
        var colorName = getColorName(currentPerson);
        var message = colorName + ": Your turn. You got " + randomNumber1 + " and " + randomNumber2;
        var utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);

        // Check for consecutive 6s
        if (randomNumber1 === 6 && randomNumber2 === 6) {
            consecutiveSixes++;

            if (consecutiveSixes === 2) {
                var message = colorName + " got 6 Two times in a row. Skipping to the next player.";
                var utterance = new SpeechSynthesisUtterance(message);
                window.speechSynthesis.speak(utterance);

                consecutiveSixes = 0;
                nextPerson();
                makeMove();
            } else {
                // If two consecutive 6s, rerun the function
                makeMove();
            }
        } else {
            consecutiveSixes = 0;
            nextPerson();
        }
    }

    function updatePersonPortion(person, number1, number2) {
        var personElement = document.getElementById("person" + person);
        var numberElement1 = document.getElementById("person" + person + "Number1");
        var numberElement2 = document.getElementById("person" + person + "Number2");

        numberElement1.innerText = number1;
        numberElement2.innerText = number2;

        personElement.classList.add("glow");

        // Remove glow effect after a delay
        setTimeout(function() {
            personElement.classList.remove("glow");
        }, 1000);

        personElement.style.backgroundColor = "#6C8E85";
        setTimeout(function() {
            personElement.style.backgroundColor = "#8AA39B";
        }, 1000);
    }

    function nextPerson() {
        currentPerson++;
        if (currentPerson > 4) {
            currentPerson = 1;
        }
    }

    function getColorName(person) {
        switch (person) {
            case 1:
                return "Red";
            case 2:
                return "Yellow";
            case 3:
                return "Green";
            case 4:
                return "Blue";
            default:
                return "";
        }
    }
