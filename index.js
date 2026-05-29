import{a as m,S as f,i as l}from"./assets/vendor-GgwdjDaY.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function g(o){return m.get("https://pixabay.com/api/",{params:{key:"56037316-398dfc4475139038527660650",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(a=>a.data)}const n={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")},d=new f(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"}),c="is-visible";function y(o){const t=o.map(({webformatURL:s,largeImageURL:a,tags:e,likes:r,views:i,comments:u,downloads:p})=>`
    <li class='gallery-item'>
      <a class='gallery-link' href='${a}'>
        <img class='gallery-image' src='${s}' alt='${e}' />
      </a>
      <div class='image-info'>
        <p><span>Likes</span>${r}</p>
        <p><span>Views</span>${i}</p>
        <p><span>Comments</span>${u}</p>
        <p><span>Downloads</span>${p}</p>
      </div>
    </li>
    `).join("");n.gallery.innerHTML=t,d.refresh()}function h(){n.gallery.innerHTML=""}function L(){n.loader.classList.add(c)}function b(){n.loader.classList.remove(c)}const q={searchForm:document.querySelector(".form")},P="Please, enter query for search!",$="Sorry, there are no images matching your search query. Please try again!",v="An error occurred. Please, try again later!";q.searchForm.addEventListener("submit",o=>{o.preventDefault();const t=o.currentTarget.elements["search-text"].value.trim();if(t===""){l.warning({title:"Warning",message:P,position:"topRight"});return}h(),L(),g(t).then(s=>{s.hits.length===0?l.error({title:"Error",message:$,position:"topRight"}):y(s.hits)}).catch(s=>{l.error({title:"Error",message:v,position:"topRight"})}).finally(()=>{b(),o.target.reset()})});
//# sourceMappingURL=index.js.map
