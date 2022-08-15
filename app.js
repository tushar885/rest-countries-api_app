const cardsContainer = document.querySelector(".main_grid");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const countrySearch = document.querySelector(".form-control");
const loader = document.querySelector("#preloader");

const countriesAll = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const d = await res.json();
    homePageCards(d);
    loader.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

countriesAll();

const homePageCards = (data) => {
  // adding home page countires card
  //   removing all the cards first

  cardsContainer.innerHTML = "";

  let numberOfCards = data.length;
  if (data.length > 100) {
    numberOfCards = 8;
  }
  for (let i = 0; i < numberOfCards; i++) {
    //   making the card wrapper
    const card_div = document.createElement("div");
    card_div.classList.add("card");
    cardsContainer.append(card_div);
    //   adding image
    const card_div_img = document.createElement("img");
    let { flags, region, capital, population } = data[i];
    card_div_img.setAttribute("src", flags.png);
    card_div_img.classList.add("card-img-top");
    card_div.appendChild(card_div_img);
    //   making div for the card body
    const card_div_body = document.createElement("div");
    card_div_body.classList.add("card-body");
    card_div.appendChild(card_div_body);
    // adding title of the card
    const card_div_title = document.createElement("div");
    card_div_title.classList.add("card-title");
    card_div_title.innerHTML = `<a href="show.html?name=${data[i].name.common}">${data[i].name.common}</a>`;
    card_div_body.appendChild(card_div_title);
    //   adding detail text div of the card
    const card_div_text = document.createElement("div");
    card_div_text.classList.add("card-text");
    card_div_body.appendChild(card_div_text);
    //   population span
    const card_div_text_span1 = document.createElement("span");
    card_div_text_span1.classList.add("home-country-card-span");
    card_div_text_span1.textContent = `Population : ${population}`;
    card_div_text.appendChild(card_div_text_span1);
    //   region span
    const card_div_text_span2 = document.createElement("span");
    card_div_text_span2.classList.add("home-country-card-span");
    card_div_text_span2.textContent = `Region : ${region}`;
    card_div_text.appendChild(card_div_text_span2);
    //   capital span
    const card_div_text_span3 = document.createElement("span");
    card_div_text_span3.classList.add("home-country-card-span");
    if (capital) {
      card_div_text_span3.textContent = `Capital : ${capital[0]}`;
    }

    card_div_text.appendChild(card_div_text_span3);
  }
};

const countriesByRegion = async (region) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const d = await res.json();
    homePageCards(d);
    loader.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

for (const dropdownItem of dropdownItems) {
  dropdownItem.addEventListener("click", (e) => {
    const region = e.target.innerText;
    document.querySelector(".btn").textContent = region;
    countriesByRegion(region.toLowerCase());
    loader.style.display = "block";
  });
}
const countriesByName = async (name) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const d = await res.json();
    if (!d.status) {
      homePageCards(d);
    } else {
      cardsContainer.innerHTML =
        "<p>No match found... Search for something else.</p>";
    }
    loader.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

countrySearch.addEventListener("change", (e) => {
  loader.style.display = "block";
  const name = countrySearch.value;
  countriesByName(name);
});
