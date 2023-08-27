    // Add an Event listiner to the button to make code search
    const gamesContainer = document.getElementById("gamesContainer");

    // Your RAWG API key
    const apiKey = "48d12b2d6d294f5baf12072767652717";

    async function fetchGames() {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
        const data = await response.json();
        const games = data.results;

        games.forEach(game => {
          const gameDiv = document.createElement("div");
          gameDiv.classList.add("game");

          const gameImage = document.createElement("img");
          gameImage.src = game.background_image;
          gameDiv.appendChild(gameImage);

          const gameInfo = document.createElement("div");
          const name = document.createElement("h2");
          name.textContent = game.name;
          const releaseDate = document.createElement("p");
          releaseDate.textContent = `Release Date: ${game.released}`;
          const genres = document.createElement("p");
          genres.textContent = `Genres: ${game.genres.map(genre => genre.name).join(", ")}`;

          gameInfo.appendChild(name);
          gameInfo.appendChild(releaseDate);
          gameInfo.appendChild(genres);

          gameDiv.appendChild(gameInfo);

          gamesContainer.appendChild(gameDiv);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchGames();

    // add event lister to 
    //fetch the data
    // render the selected data