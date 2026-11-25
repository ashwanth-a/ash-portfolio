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
  },{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add("visible"));
}