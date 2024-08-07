# AI Flappy Bird

## Description
This project is an AI-driven version of the popular Flappy Bird game. It uses a neural network and genetic algorithm to train birds to navigate through pipes. The game showcases how machine learning can be applied to simple games to achieve superhuman performance.

## Features
- Flappy Bird game mechanics
- Neural Network implementation for bird control
- Genetic Algorithm for evolving better birds over generations
- Visual representation of the best-performing bird
- Adjustable game speed
- Display of current generation, alive birds, current score, and all-time high score

## Technologies Used
- HTML5
- CSS3
- JavaScript
- p5.js (for game rendering and animation)

## How It Works
1. A population of birds is initialized with random neural network weights.
2. Each bird uses its neural network to decide when to flap based on inputs like distance to pipes and vertical position.
3. Birds that hit pipes or go out of bounds are removed from the game.
4. The fitness of each bird is calculated based on how far it travels.
5. The best-performing birds are selected to "breed" and create the next generation.
6. Mutations are applied to add variety to the gene pool.
7. This process repeats, with each generation generally performing better than the last.

## How to Use
1. Open `index.html` in a web browser.
2. Watch as the AI birds attempt to navigate through the pipes.
3. Use the speed slider to adjust the game speed.
4. Click the "Run Best" button to see the best-performing bird in action.

## Files
- `index.html`: Main HTML file
- `styles.css`: CSS styling
- `sketch.js`: Main game logic and p5.js setup
- `bird.js`: Bird class definition
- `pipe.js`: Pipe class definition
- `neuralnetwork.js`: Neural network implementation
- `alg.js`: Genetic algorithm functions

## Future Improvements
- Add more complex obstacles
- Implement different types of neural networks
- Allow users to train their own birds
- Add sound effects and background music

## Credits
This project was inspired by Daniel Shiffman's Coding Train series on YouTube.

## License
This project is open source and available under the [MIT License](LICENSE).