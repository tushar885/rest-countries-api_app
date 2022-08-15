// this window .loaction.search gives the query string that is present in the
// https link you are currently on so we get query string of type "?name={name}" so
// by doing substring(6) we will get the name of the country only.

const name = window.location.search.substring(6);
const flagImg = document.querySelector(".flagImg");
const loader = document.querySelector("#preloader");
const backBtn = document.querySelector(".btn");

// console.log(name);
const showCountry = async (data) => {
  //   console.log(data[0].name.common);
  let {
    flags,
    region,
    capital,
    population,
    subregion,
    tld,
    currencies,
    languages,
    borders,
  } = data[0];

  // making img div
  const countryFlag = document.createElement("img");
  flagImg.prepend(countryFlag);
  countryFlag.setAttribute("src", flags.svg);

  // adding title
  const countryTitle = document.querySelector(".country_title");
  countryTitle.textContent = data[0].name.official;
  const span1 = document.querySelector("#span1");

  // adding common name, population, region, subregion, capital, tld
  span1.textContent = `Common Name : ${data[0].name.common}`;
  const span2 = document.querySelector("#span2");
  span2.textContent = `Population : ${population}`;
  const span3 = document.querySelector("#span3");
  span3.textContent = `Region : ${region}`;
  const span4 = document.querySelector("#span4");
  span4.textContent = `Sub Region : ${subregion}`;
  const span5 = document.querySelector("#span5");
  if (capital) {
    span5.textContent = `Capital : ${capital[0]}`;
  }
  const span6 = document.querySelector("#span6");
  span6.textContent = `Top Level Domain : ${tld[0]}`;

  // adding currencies i have used this [curr] bcz curr is a variable whose value i want to use
  // and for that we use [], read about javascript objects from notes.
  const span7 = document.querySelector("#span7");
  const curr = Object.keys(currencies).shift();
  span7.textContent = `Currencies : ${currencies[curr].name}`;
  const span8 = document.querySelector("#span8");
  const countryLangs = Object.values(languages);
  span8.textContent = `Languages : ${countryLangs[0]}`;
  countryLangs.shift();
  for (const countryLang of countryLangs) {
    span8.textContent += `, ${countryLang}`;
  }

  // doing all this bcz "borders" array from data contains border countries alpha-3 code, not the
  // name so, with help of alpha code i am find countires name.
  const borderCountries = document.querySelector(".border_countries");
  borderCountries.textContent = `Border Countries : `;
  if (!borders) {
    const span = document.createElement("span");
    span.textContent = "It's an Island";
    borderCountries.append(span);
    // borderCountries.textContent += `Border Countries : `;
  } else {
    for (let border of borders) {
      const span = document.createElement("span");
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
      const dataForName = await res.json();
      span.textContent = dataForName[0].name.common;
      borderCountries.append(span);
    }
  }
};

const countriesByFullNameToShow = async (name) => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    const d = await res.json();
    showCountry(d);
    // for stopping loader
    loader.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

countriesByFullNameToShow(name);

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
