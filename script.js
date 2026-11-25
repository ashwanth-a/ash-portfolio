const menuButton=document.querySelector(".menu-toggle");
const navigation=document.querySelector(".nav");
if(menuButton&&navigation){
  menuButton.addEventListener("click",()=>{
    const open=navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded",String(open));
    menuButton.textContent=open?"×":"☰";
  });
  navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
    menuButton.textContent="☰";
  }));
}
const year=document.querySelector("#year");
if(year) year.textContent=new Date().getFullYear();
const revealItems=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.08});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add("visible"));
}

// Stagger project and skill reveals for a more polished scroll experience.
document.querySelectorAll(".projects-grid .project-card, .skills-grid .skill-card").forEach((item,index)=>{
  item.style.transitionDelay = (index % 4) * 70 + "ms";
});

// Give in-page navigation a gentle active-state response.
const sectionLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
const observedSections=sectionLinks.map(link=>document.querySelector(link.getAttribute("href"))).filter(Boolean);
if("IntersectionObserver" in window && observedSections.length){
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        sectionLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
      }
    });
  },{rootMargin:"-35% 0px -55% 0px"});
  observedSections.forEach(section=>sectionObserver.observe(section));
}
