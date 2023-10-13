const searchingByForm = document.getElementById("searchingByForm")
const theToggleTypeButton = document.getElementById("theToggleTypeButton")

const theSearchingFormer = document.getElementById("theSearchingFormer")

let ourSearchingTypes = "users";


searchingByForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchingQuery = searchingByForm.querySelector("inpute[name='search']").value;

    
    theSearchingFormer.innerHTML = "";
   
    const theResponseToGet = await fetch("htttps://api.github.com/search/${ourSearchingTypes}?q=${searchingQuery}")
    
    if (theResponseToGet.status === 200)
    {
        const ourResponseFromJson = await theResponseToGet.json();
        
         for (const item of ourResponseFromJson.items)
         {
            const theListElement = document.createElement("li");
           
            const imageAvatar = document.createElement("img");
            imageAvatar.src = item.avatar_url;
            theListElement.appendChild(imageAvatar);

            
            const profileNameLink = document.createElement("a");
            profileNameLink.href = item.html_url;
            profileNameLink.textContent = item.login;
            theListElement.appendChild(profileNameLink);

            theSearchingFormer.appendChild(theListElement);
         }   
    }
    else
    {
        const theErrorMessage = document.createElement("li");
        theErrorMessage.textContent = "Failed!";
        theSearchingFormer.appendChild(theErrorMessage);
    }
    console.error("Failed");
});

theToggleTypeButton.addEventListener("click", () => {

    if (ourSearchingTypes === "users")
    {
        ourSearchingTypes = "repositories";
        theToggleTypeButton.textContent = "Search users";
    }
    else
    {
        ourSearchingTypes = "users";
        theToggleTypeButton.textContent = "Search repositories";
    }
});

searchingByForm.dispatchEvent(new Event("submit"));