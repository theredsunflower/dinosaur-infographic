# view live at www.app.theredsunflower.com

# dinosaur-infographic
An infographic that is derived from provided json data as well as user input data. Pulling in information from a form and using it to complete an array of objects that will then be appended back to the DOM in a 3x3 grid of tiles. 

# Instructions
You will be building an infographic that is derived from data that is provided, as well as user input data. Object-oriented javascript is great for working with complex data, but it’s not of much use without an interface to interact with. You will be pulling in information from a form and using it to complete an array of objects that will then be appended back to the DOM.

This may not sound like a lot, but there are a fair amount of moving pieces that rely on each other to work. You’ll need to plan out the logic of what you are trying to accomplish before you begin developing. If you find this process to be quick, there’s a list of additional functionality that you can add that all strive to improve the users’ experience.

For the project, you will generate a 3x3 grid of tiles (9 in total) with the human in the center tile. Each title will contain the species, an image, and a fact. For the human tile, you will display the name of the human rather than species and no fact is necessary for the human. When the user clicks to generate the infographic from the form, the grid will appear and the form will be hidden. The facts displayed should be random per dinosaur with an opportunity of displaying at least 6 different types of facts (3 should be from the methods you create). One of the titles should be for a pigeon in which the tile should always display, “All birds are considered dinosaurs.”

# Project Requirements

To complete this project, your UI must show the following:
    -The form should contain a button which upon clicking, removes the form
    -The button should append a grid with 9 tiles to the DOM with the Human located in the center
    -The Human tile should display the name of the person and an image, the dino tiles should contain the species, an image and a fact, the bird title should contain the species, image, and "All birds are Dinosaurs."

To complete this project, your backend code must:
    -Contain a class and all necessary objects
    -Contain at least 3 methods for comparing dinosaurs to the human
    -Get user data from the DOM
    -Append tiles with object data to DOM
