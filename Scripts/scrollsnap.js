const homePage = document.querySelector("#home-page");
const aboutSection = document.querySelector("#about-sec");
const eventsSection = document.querySelector("#eventsHere");
const contactsSection = document.querySelector("#contactUs");

let Pages = [homePage, aboutSection, eventsSection, contactsSection];

let activePage = homePage;
let nextPage = aboutSection;
let previousPage = null;

let downscroll = 0;
let upscroll = 1;
//  = aboutSection;

const homePageScrollInfo = homePage.getBoundingClientRect();
const aboutSectionScrollInfo = aboutSection.getBoundingClientRect();
const eventsSectionScrollInfo = eventsSection.getBoundingClientRect();
const contactsSectionScrollInfo = contactsSection.getBoundingClientRect();

let windowHeight = window.innerHeight;
let activeIndex = 0;

// window.localStorage.setItem("active","0")
// let activeIndex=window.localStorage.getItem("active")

function updatePageStatus() {
  Pages.forEach((page, index) => {
    if (page.hasAttribute("activepage")) {
      activePage = page;

      if (index > 0) {
        previousPage = Pages[index - 1];
      } else {
        previousPage = null;
      }

      if (index < Pages.length - 1) {
        nextPage = Pages[index + 1];
      } else {
        nextPage = null;
      }
      if (index !== activeIndex) {
        scrollToActivePage(page);
        activeIndex = index;
      }
    }
  });
}

function checkActivePage() {
  if (percentageInView(nextPage) >= 10 && upscroll === 1) {
    activePage.toggleAttribute("activepage");
    Pages[activeIndex + 1].toggleAttribute("activepage");

    downscroll = 1;
    upscroll = 0;
  }
  // if (percentageInView(previousPage) >= 10 && downscroll === 1) {
  //   activePage.toggleAttribute("activepage");
  //   Pages[activeIndex - 1].toggleAttribute("activepage");
  //   activeIndex--;
  //   upscroll = 1;
  //   downscroll = 0;
  // }

  // if(percentageInView(previousPage) >= 10 &&)
}

function scrollToActivePage(page) {
  // window.scrollTo(page.getBoundingClientRect().top);
}

function percentageInView(page) {
  let pageTop = page.offsetTop;
  let pageHeight = page.getBoundingClientRect().height;

  let docScroll = window.scrollY;

  let hiddenBefore = docScroll - pageTop;
  let hiddenAfter = pageTop + pageHeight - (docScroll + windowHeight);

  if (docScroll > pageTop + pageHeight || pageTop > docScroll + windowHeight) {
    return 0;
  } else {
    let percentView = 100;
    if (hiddenBefore > 0) {
      percentView -= (hiddenBefore * 100) / pageHeight;
    }
    if (hiddenAfter > 0) {
      percentView -= (hiddenAfter * 100) / pageHeight;
    }
    return percentView;
  }
}

window.addEventListener("scroll", () => {
  checkActivePage();
  updatePageStatus();
  activeIndex = Pages.indexOf(activePage);

  console.log(percentageInView(homePage));
  console.log(percentageInView(aboutSection));
  console.log(percentageInView(eventsSection));
  console.log(percentageInView(contactsSection));
});