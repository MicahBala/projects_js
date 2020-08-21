let optionOne = "1: Show links";
let optionTwo = "2: Add a link";
let optionThree = "3: Remove a link";
let optionZero = "0: Quit";

let linksArray = [];

let optionChosen = prompt(
  `Choose an option: \n ${optionOne}\n ${optionTwo} \n ${optionThree} \n ${optionZero}`
);
optionChosen = Number(optionChosen);

// Add a link
const addLink = () => {
  // Accept input from the user
  let linkTitle = String(prompt("Enter link TITLE: "));
  let linkUrl = String(prompt("Enter link URL: "));
  if (!linkUrl.startsWith("https://") || !linkUrl.startsWith("http://")) {
    linkUrl = "http://" + linkUrl;
  }

  let linkAuthor = String(prompt("Enter link AUTHOR: "));
  let link = {
    title: linkTitle,
    url: linkUrl,
    author: linkAuthor,
  };

  return link;
};

// Display links
const displayLinks = (links) => {};

switch (optionChosen) {
  case 1:
    // Display all links
    displayLinks(linksArray);
    break;
  case 2:
    // Add a link
    const newLink = addLink();
    linksArray.push(newLink);
    console.log(linksArray);
    break;
  case 3:
    // Remove a link
    break;
  case 0:
    // Quit the program
    break;
  default:
    console.log("Invalid input");
}
