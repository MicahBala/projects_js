// let linksArray = [
//   {
//     title: "Micah's Blog",
//     url: "https://micahbala.com.ng",
//     author: "Micah",
//   },
//   {
//     title: "Public APIs",
//     url: "https://publicapis.com",
//     author: "John",
//   },
//   {
//     title: "Creative Designs",
//     url: "https://creativedesigns.com.ng",
//     author: "Bala",
//   },
// ];

let linksArray = [];
let formCreated = false;

class Link {
  constructor(title, url, author) {
    // Check if url does not have http or https and add
    if (url.indexOf("https://") == -1 && url.indexOf("http://") == -1) {
      this.url = `https://${url}`;
    } else {
      this.url = url;
    }

    // Add data properties
    this.title = title;
    this.author = author;
  }

  // Return link properties
  toString() {
    return `${this.title}, ${this.url}, ${this.author}`;
  }
}

// Push links into the array as objects
linksArray.push(new Link("Micah's Blog", "https://micahbala.com.ng", "Micah"));
linksArray.push(new Link("Public APIs", "https://publicapis.com", "John"));
linksArray.push(new Link("Designs", "http://createdesigns.com.ng", "Bala"));

let newsContent = document.getElementById("newsContent");

/* 
  Create DOM Element <div> to hold link with the following:
  <h4> tag to hold Title
  <a> to hold actual link
  <span> tag to hold
  This function takes as parameter a link object containing 3 properties:
   (Title, url, author). This object is what was returned from the Link class above
*/
const createLinkElement = (link) => {
  // Create a <span> element for the author
  const authorElement = document.createElement("span");
  authorElement.setAttribute("class", "authorName");
  authorElement.appendChild(
    document.createTextNode(`Submitted by ${link.author}`)
  );

  // Create a <h4> element
  const titleElement = document.createElement("h4");
  titleElement.setAttribute("class", "itemHead");
  titleElement.appendChild(document.createTextNode(link.title));

  // Create <a> element to hold link url
  const urlElement = document.createElement("a");
  urlElement.href = link.url;
  urlElement.appendChild(document.createTextNode(link.url));

  // Create a <div> element and append the <h4>, <span> and <a> elements
  const newsItemElement = document.createElement("div");
  newsItemElement.setAttribute("class", "newsItem");
  newsItemElement.appendChild(titleElement);
  newsItemElement.appendChild(urlElement);
  newsItemElement.appendChild(authorElement);

  // Return the created div element holding the title, url, and author
  return newsItemElement;
};

// Add the links to the page
linksArray.forEach((link) => {
  // Create a news item link using the Link class
  const newsItem = createLinkElement(link);
  newsContent.appendChild(newsItem);
});

// Create input element for form with each having name, placeholder text, size and id
const createInputElement = (name, placeholder, id, size) => {
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.setAttribute("name", name);
  inputElement.setAttribute("placeholder", placeholder);
  inputElement.setAttribute("size", size);
  inputElement.setAttribute("id", id);
  inputElement.setAttribute("required", "true");

  return inputElement;
};

// Dynamically create a form element with 3 input elements and a submit button
const createFormElement = () => {
  const titleInputElement = createInputElement(
    "title",
    "Enter title",
    "input1",
    40
  );
  const urlInputElement = createInputElement("url", "Enter url", "input2", 40);
  const authorInputElement = createInputElement(
    "author",
    "Enter author first name",
    "input3",
    20
  );

  // Create submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.value = "Add link";
  submitButton.textContent = "Add Link";
  submitButton.setAttribute("id", "addLink");

  // Create form element and append the created inputs and button
  const formElement = document.createElement("form");
  formElement.classList.add("inputForm");
  formElement.appendChild(titleInputElement);
  formElement.appendChild(urlInputElement);
  formElement.appendChild(authorInputElement);
  formElement.appendChild(submitButton);

  formCreated = true;

  // Handle form submission
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    let newLink = new Link(
      titleInputElement.value,
      urlInputElement.value,
      authorInputElement.value
    );

    // Create a link element to hold the new item on the page
    newLink = createLinkElement(newLink);

    // Replace the form with the new element
    newsContent.replaceChild(newLink, e.target);

    // Create and show a success message on the page
    const messageElement = document.createElement("div");
    messageElement.setAttribute("class", "success");
    messageElement.textContent = `New link added SUCCESSFULLY!`;
    newsContent.insertBefore(messageElement, newLink);

    // Success message disappears after 2 second
    setTimeout(() => {
      newsContent.removeChild(messageElement);
    }, 4000);

    formCreated = false;
  });

  // Return the created form
  return formElement;
};

// Handle click event to show form
document.getElementById("submitButton").addEventListener("click", (e) => {
  e.preventDefault();

  // Prevent the creation of form multiple times
  if (!formCreated) {
    const form = createFormElement();

    // Insert the form as a next sibbling of the page header, i.e below the page header
    newsContent.insertBefore(
      form,
      document.getElementById("header").nextSibling
    );
  }
});
