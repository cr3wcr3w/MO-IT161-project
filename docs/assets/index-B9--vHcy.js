(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=0,n=null,r=4,i=globalThis.nanostoresGlobal||={epoch:0},a=()=>{let n;for(t=0;t<e.length;t+=r)try{e[t](e[t+1].value,e[t+2],e[t+3])}catch(e){n=e}if(e.length=0,n)throw n},o=o=>{let s=[],c={eq:Object.is,get(){return c.lc||c.listen(()=>{})(),c.value},init:o,lc:0,listen(n){return c.lc=s.push(n),()=>{for(let i=t+r;i<e.length;)e[i]===n?e.splice(i,r):i+=r;let i=s.indexOf(n);~i&&(s.splice(i,1),--c.lc||c.off())}},notify(t,r){i.epoch++;let o=!e.length&&!0;for(let i of s)n?.has(i)||(n?.add(i),e.push(i,c,t,r));o&&a()},off(){},set(e){let t=c.value;c.eq(t,e)||(c.value=e,c.notify(t))},subscribe(e){let t=c.listen(e);return e(c.value),t},value:o};return c},s=`auth`;function c(e){if(typeof window>`u`)return null;try{let t=window.sessionStorage.getItem(e);return t?JSON.parse(t):null}catch{return window.sessionStorage.removeItem(e),null}}function l(e,t){if(!(typeof window>`u`)){if(t===null){window.sessionStorage.removeItem(e);return}window.sessionStorage.setItem(e,JSON.stringify(t))}}function u(){return c(s)}function d(e){l(s,e),p.set(e)}function f(){l(s,null),p.set(null)}var p=o(u()),ee=String.raw;function te(){let e=document.querySelector(`#logout-button`);e&&e.addEventListener(`click`,()=>{e.disabled=!0,setTimeout(()=>{f(),Q(``)},5),e.disabled=!1})}function m(){return ee`
    <main>
      <p>This is the dashboard page.</p>
      <button id="logout-button" class="btn btn-danger">Logout</button>
    </main>
  `}var h=[{id:`IRS-2026-0000-0000-0001`,title:`CSRF token missing in api/v1/reports endpoint`,severity:`high`,status:`open`,DisclosedOn:`2026-06-01`},{id:`IRS-2026-0000-0000-0002`,title:`Sensitive data exposure in api/v1/reports endpoint`,severity:`medium`,status:`open`,DisclosedOn:`2026-06-02`},{id:`IRS-2026-0000-0000-0003`,title:`Broken access control in api/v1/users endpoint`,severity:`critical`,status:`resolved`,DisclosedOn:`2026-06-04`},{id:`IRS-2026-0000-0000-0004`,title:`Reflected XSS in search parameter`,severity:`high`,status:`triaged`,DisclosedOn:`2026-06-07`},{id:`IRS-2026-0000-0000-0005`,title:`Rate limiting missing on authentication endpoint`,severity:`medium`,status:`open`,DisclosedOn:`2026-06-10`},{id:`IRS-2026-0000-0000-0006`,title:`Improper authorization allows access to other user profiles`,severity:`high`,status:`resolved`,DisclosedOn:`2026-06-13`},{id:`IRS-2026-0000-0000-0007`,title:`Information disclosure through verbose API error messages`,severity:`low`,status:`closed`,DisclosedOn:`2026-06-16`},{id:`IRS-2026-0000-0000-0008`,title:`Stored XSS in user profile description`,severity:`high`,status:`triaged`,DisclosedOn:`2026-06-19`},{id:`IRS-2026-0000-0000-0009`,title:`Insecure direct object reference in api/v1/invoices endpoint`,severity:`critical`,status:`resolved`,DisclosedOn:`2026-06-22`},{id:`IRS-2026-0000-0000-0010`,title:`Missing security headers on application responses`,severity:`low`,status:`closed`,DisclosedOn:`2026-06-25`}],g=String.raw,_={display:`text-[clamp(2rem,2vw+1vh,4rem)] leading-[1.1] tracking-tight`,heroTitle:`text-[clamp(1.8rem,1.5vw+1vh,3.5rem)] leading-[1.15] tracking-tight`,heading:`text-[clamp(1.15rem,0.9vw+0.5vh,1.8rem)] leading-[1.35] font-semibold`,body:`text-[clamp(0.95rem,0.8vw+0.6vh,1.75rem)] leading-[1.5]`,bodySmall:`text-[clamp(0.9rem,0.7vw+0.45vh,1.3rem)] leading-[1.5]`,label:`text-[clamp(0.8rem,0.5vw+0.35vh,1rem)] leading-[1.4] font-medium`,button:`text-[clamp(1rem,0.7vw+0.5vh,1.35rem)] leading-[1.4] font-bold`,brand:`text-[clamp(1rem,0.8vw+0.4vh,1.7rem)] leading-[1.2] font-bold tracking-tight`,meta:`text-[clamp(0.7rem,0.45vw+0.35vh,0.9rem)] leading-[1.4]`};function v({as:e=`p`,variant:t=`body`,className:n=``,content:r=``}={}){return g`<${e} class="${[_[t],n].filter(Boolean).join(` `)}">${r}</${e}>`}var y=String.raw,b={critical:4,high:3,medium:2,low:1},x={critical:`badge-error`,high:`badge-warning`,medium:`badge-warning`,low:`badge-success`},S={open:`badge-info`,triaged:`badge-secondary`,resolved:`badge-success`,closed:`badge-neutral`};function C({query:e=``,status:t=``,severity:n=``,sort:r=`newest`}={}){let i=e.trim().toLowerCase();return h.filter(e=>{let r=i.length===0||e.id.toLowerCase().includes(i)||e.title.toLowerCase().includes(i),a=t.length===0||e.status===t,o=n.length===0||e.severity===n;return r&&a&&o}).sort((e,t)=>{if(r===`severity`)return b[t.severity]-b[e.severity];let n=new Date(e.DisclosedOn).getTime(),i=new Date(t.DisclosedOn).getTime();return r===`oldest`?n-i:i-n})}function w(){let e=document.querySelector(`[data-report-search]`),t=document.querySelector(`[data-report-status]`),n=document.querySelector(`[data-report-severity]`),r=document.querySelector(`[data-report-sort]`),i=document.querySelector(`[data-report-rows]`);if(!e||!t||!n||!r||!i)return;let a=()=>{i.innerHTML=T(C({query:e.value,status:t.value,severity:n.value,sort:r.value}))};e.addEventListener(`input`,a),t.addEventListener(`change`,a),n.addEventListener(`change`,a),r.addEventListener(`change`,a)}function ne(e){return new Intl.DateTimeFormat(`en-US`,{month:`short`,day:`numeric`,year:`numeric`}).format(new Date(`${e}T00:00:00`))}function T(e){return e.length===0?y`
      <tr>
        <td colspan="5" class="px-4 py-12 text-center text-sm text-slate-400">
          No reports match your filters.
        </td>
      </tr>
    `:e.map(e=>y`
        <tr class="border-b border-white/10 text-sm text-slate-300 last:border-0 hover:bg-white/5">
          <td class="whitespace-nowrap px-4 py-4 font-mono text-xs text-slate-400">${e.id}</td>
          <td class="min-w-64 px-4 py-4 font-medium text-white">${e.title}</td>
          <td class="px-4 py-4">
            <span class="badge ${x[e.severity]} badge-sm capitalize"
              >${e.severity}</span
            >
          </td>
          <td class="px-4 py-4">
            <span class="badge ${S[e.status]} badge-sm capitalize"
              >${e.status}</span
            >
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-right text-slate-400">
            ${ne(e.DisclosedOn)}
          </td>
        </tr>
      `).join(``)}function E(){return y`
    <main class="min-h-[calc(100vh-5rem)] bg-slate-950 px-4 py-8 text-white sm:px-8 lg:px-12">
      <section class="mx-auto w-full max-w-7xl">
        <div class="mb-7">
          ${v({as:`h1`,variant:`display`,className:`font-bold text-white`,content:`Public Reports`})}
          ${v({variant:`bodySmall`,className:`mt-2 max-w-2xl text-slate-300`,content:`Browse and search publicly disclosed incident reports.`})}
        </div>

        <div id="report-filters" class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label
            class="input input-bordered flex h-11 w-full items-center gap-2 border-white/15 bg-slate-900 text-white shadow-sm sm:max-w-md"
          >
            <svg
              class="h-4 w-4 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-4-4"></path>
            </svg>
            <span class="sr-only">Search reports</span>
            <input
              data-report-search
              type="search"
              placeholder="Search reports by title or ID..."
              class="grow text-sm placeholder:text-slate-500 focus:outline-none"
            />
          </label>
          <select
            data-report-status
            class="select select-bordered h-11 w-full border-white/15 bg-slate-900 text-sm text-slate-200 shadow-sm sm:w-40"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="triaged">Triaged</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            data-report-severity
            class="select select-bordered h-11 w-full border-white/15 bg-slate-900 text-sm text-slate-200 shadow-sm sm:w-40"
          >
            <option value="">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            data-report-sort
            class="select select-bordered h-11 w-full border-white/15 bg-slate-900 text-sm text-slate-200 shadow-sm sm:w-44"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="severity">Highest severity</option>
          </select>
        </div>

        <div
          class="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 shadow-xl shadow-black/20"
        >
          <table class="table table-zebra table-sm min-w-160">
            <caption class="sr-only">
              Publicly disclosed incident reports
            </caption>
            <thead>
              <tr class="border-b border-white/10 text-xs uppercase tracking-normal text-slate-400">
                <th class="px-4 py-4 font-semibold">ID</th>
                <th class="px-4 py-4 font-semibold">Title</th>
                <th class="px-4 py-4 font-semibold">Severity</th>
                <th class="px-4 py-4 font-semibold">Status</th>
                <th class="px-4 py-4 text-right font-semibold">Disclosed On</th>
              </tr>
            </thead>
            <tbody data-report-rows>
              ${T(C())}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  `}var D=String.raw,O={center:`left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,"bottom-right":`right-5 bottom-5`,"bottom-left":`left-5 bottom-5`,"top-right":`right-5 top-5`,"top-left":`left-5 top-5`};function k({position:e=`center`,header:t=`Notice`,description:n=`This is a popup message.`,footer:r=``}={}){let i=r?`<div class="mt-4 border-t border-slate-200 pt-3 ${_.meta} font-medium text-slate-500">${r}</div>`:``;return D`
    <div
      class="fixed z-50 ${O[e]} w-[min(90vw,24rem)] rounded-2xl border border-slate-200 bg-white p-5 shadow-gray-600"
      role="alertdialog"
      aria-live="polite"
      aria-modal="false"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p
            class="${_.meta} font-semibold uppercase tracking-[0.12em] text-sky-700"
          >
            ${t}
          </p>
        </div>
        <button
          type="button"
          data-close-popup
          class="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close popup"
        >
          ×
        </button>
      </div>

      <p class="mt-3 ${_.bodySmall} text-slate-600">${n}</p>
      ${i}
    </div>
  `}function A(e={}){let{closeAfterMs:t=4e3}=e,n=document.createElement(`div`);n.innerHTML=k(e);let r=n.firstElementChild;if(!r)return;document.body.appendChild(r);let i=()=>{r.remove()};r.querySelector(`[data-close-popup]`)?.addEventListener(`click`,i),t>0&&window.setTimeout(i,t)}var j=String.raw;function M(e,t){e.querySelectorAll(`input, button`).forEach(e=>{e.disabled=t}),document.querySelectorAll(`a[href="/signin"], a[href="/signup"]`).forEach(e=>{if(t){e.setAttribute(`aria-disabled`,`true`),e.tabIndex=-1,e.classList.add(`pointer-events-none`,`opacity-50`,`cursor-not-allowed`),e.onclick=e=>{e.preventDefault()};return}e.setAttribute(`aria-disabled`,`false`),e.tabIndex=0,e.classList.remove(`pointer-events-none`,`opacity-50`,`cursor-not-allowed`),e.onclick=null})}function re(){return j`
    <form id="signin-form" class="flex flex-col" autocomplete="off">
      <label class="mb-2 ${_.label} font-medium text-slate-700">
        Email
        <input
          id="signin-email"
          name="email"
          type="text"
          placeholder="Enter your email"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${_.label} font-medium text-slate-700">
        Password
        <input
          id="signin-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <button
        type="submit"
        class="${_.button} transition delay-150 duration-300 ease-in-out hover:scale-105 btn h-14 w-full rounded-2xl border-0 bg-slate-950 text-white shadow-xl hover:bg-slate-900 mb-3"
      >
        Sign In
      </button>
    </form>
  `}function N(){let e=document.querySelector(`#signin-form`);e&&e.addEventListener(`submit`,t=>{t.preventDefault(),M(e,!0);let n=document.querySelector(`#signin-email`),r=document.querySelector(`#signin-password`),i=n?.value.trim()??``,a=r?.value??``,o=()=>{M(e,!1)};if(!i||!a){console.log(`Please fill in both email and password fields`),A({position:`bottom-right`,header:`Error`,description:`Please fill in both email and password fields.`,footer:``,closeAfterMs:3e3}),window.setTimeout(o,3e3);return}if(!/^\S+@\S+\.\S+$/.test(i)){console.log(`Please enter a valid email address`),A({position:`bottom-right`,header:`Error`,description:`Please enter a valid email address.`,footer:``,closeAfterMs:3e3}),window.setTimeout(o,3e3);return}console.log(`Sign in submitted`,{email:i,password:a}),A({position:`bottom-right`,header:`Signed in`,description:`You have successfully signed in.`,footer:`Welcome back.`,closeAfterMs:3e3}),d({fullName:`John Doe`,email:i,role:`guest`,verified:!0,authenticated:!0}),window.setTimeout(()=>{o(),Q(`/dashboard`)},1500)})}var P={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`},F=([e,t,n])=>{let r=document.createElementNS(`http://www.w3.org/2000/svg`,e);return Object.keys(t).forEach(e=>{r.setAttribute(e,String(t[e]))}),n?.length&&n.forEach(e=>{let t=F(e);r.appendChild(t)}),r},I=(e,t={})=>F([`svg`,{...P,...t},e]),L=[[`path`,{d:`M18 6 7 17l-5-5`}],[`path`,{d:`m22 10-7.5 7.5L13 16`}]],R=[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`}],[`path`,{d:`m9 14 2 2 4-4`}]],z=[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`}],[`path`,{d:`m9 12 2 2 4-4`}]],B=[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`}],[`path`,{d:`M16 3.128a4 4 0 0 1 0 7.744`}],[`path`,{d:`M22 21v-2a4 4 0 0 0-3-3.87`}],[`circle`,{cx:`9`,cy:`7`,r:`4`}]];function V(e,t={}){let{size:n=20,strokeWidth:r=2,color:i=`currentColor`,className:a=``,title:o,ariaLabel:s}=t;return I(e,{size:n,strokeWidth:r,color:i,class:a,title:o,"aria-label":s,role:s?`img`:void 0})}var H=String.raw;function U({showText:e=!0,text:t=`Incident Report System`,textColor:n=`black`,size:r=18,wrapperClassName:i=`flex items-center gap-3 text-slate-900`,textClassName:a=_.brand,iconClassName:o=`text-white`}={}){let s=V(z,{size:r,strokeWidth:2,color:`white`,className:o}).outerHTML;return e?H`
    <div class="${i}" aria-label="${t} brand">
      <span
        class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 shadow-inner ring-1 ring-white/20"
        aria-hidden="true"
      >
        ${s}
      </span>
      <span class="${a} ${n===`white`?`text-white`:`text-black`}">${t}</span>
    </div>
  `:H`
      <span
        class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 shadow-inner ring-1 ring-white/20"
        aria-hidden="true"
      >
        ${s}
      </span>
    `}var W=String.raw;function G(){return W`
    <main class="bg-slate-200 h-screen flex items-center justify-center px-2 text-black ">
      <section
        class="w-full max-w-7xl bg-slate-100 h-10/12 rounded-3xl shadow-x flex flex-col md:flex-row"
      >
        <div
          class="flex-1 p-4 md:p-10 bg-white/70 flex-col rounded-tl-3xl md:rounded-bl-3xl rounded-tr-3xl md:rounded-tr-non"
        >
          ${U()}

          <div class="w-full h-full flex justify-center items-center">
            <div class="max-w-md">
              <h1 class="${_.display} mb-3 font-bold text-slate-900">
                Sign in to your account
              </h1>
              <h2 class="${_.body} text-slate-500">
                Access your incident reports and manage your account
              </h2>

              ${re()}

              <p class="${_.bodySmall} text-slate-700">
                Don't have an account yet?
                <a href="/signup" class="text-sky-600 hover:underline">Sign up</a>
              </p>
            </div>
          </div>
        </div>

        <div
          class="md:rounded-tr-3xl overflow-hidden rounded-br-3xl rounded-bl-3xl md:rounded-bl-none flex-1 flex p-4 relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white"
        >
          <div
            class="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full border border-white/10 bg-white/5"
            aria-hidden="true"
          ></div>

          <div
            class="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full border border-white/10 bg-white/5"
            aria-hidden="true"
          ></div>

          <div class="absolute *:inset-0 flex items-center justify-center h-full">
            <div class="relative z-10 mx-auto max-w-xl">
              <div
                class="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-inner"
                aria-hidden="true"
              >
                ${V(z,{size:38,strokeWidth:2,color:`white`,className:`text-white`}).outerHTML}
              </div>

              <h2 class="${_.heroTitle} text-center font-bold text-white">
                Secure. Transparent. Accountable.
              </h2>
              <p class="${_.body} mt-5 text-slate-300">
                The Incident Report System allows researchers to submit reports and triagers to
                review, validate, and track incidents efficiently.
              </p>

              <div class="mt-8 space-y-5 sm:space-y-6">
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${V(B,{size:20,strokeWidth:2,color:`white`,className:`text-white`}).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${_.heading} text-white">Submit</h3>
                    <p class="${_.bodySmall} text-slate-300">
                      Report security issues quickly and easily.
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${V(R,{size:20,strokeWidth:2,color:`white`,className:`text-white`}).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${_.heading} text-white">Review</h3>
                    <p class="${_.bodySmall} text-slate-300">
                      Triagers review and validate reports.
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${V(L,{size:20,strokeWidth:2,color:`white`,className:`text-white`}).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${_.heading} text-white">Track</h3>
                    <p class="${_.bodySmall} text-slate-300">
                      Track the status and resolution of reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `}var K=String.raw;function q(e,t){e.querySelectorAll(`input, button`).forEach(e=>{e.disabled=t}),document.querySelectorAll(`a[href="/signin"], a[href="/signup"]`).forEach(e=>{if(t){e.setAttribute(`aria-disabled`,`true`),e.tabIndex=-1,e.classList.add(`pointer-events-none`,`opacity-50`,`cursor-not-allowed`),e.onclick=e=>{e.preventDefault()};return}e.setAttribute(`aria-disabled`,`false`),e.tabIndex=0,e.classList.remove(`pointer-events-none`,`opacity-50`,`cursor-not-allowed`),e.onclick=null})}function J(){return K`
    <form id="signup-form" class="flex flex-col" autocomplete="off">
      <label class="mb-2 ${_.label} font-medium text-slate-700">
        Full name
        <input
          id="signup-full-name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${_.label} font-medium text-slate-700">
        Email
        <input
          id="signup-email"
          name="email"
          type="text"
          placeholder="Enter your email"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${_.label} font-medium text-slate-700">
        Password
        <input
          id="signup-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${_.label} font-medium text-slate-700">
        Confirm password
        <input
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${_.label} font-medium text-slate-700">
        Sign up as
        <select
          id="signup-role"
          name="role"
          class="select select-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        >
          <option value="researcher">Researcher</option>
          <option value="triage">Triage</option>
        </select>
      </label>

      <button
        type="submit"
        class="${_.button} transition delay-150 duration-300 ease-in-out hover:scale-105 btn h-14 w-full rounded-2xl border-0 bg-slate-950 text-white shadow-xl hover:bg-slate-900 mb-3"
      >
        Sign Up
      </button>
    </form>
  `}function Y(){let e=document.querySelector(`#signup-form`);e&&e.addEventListener(`submit`,t=>{t.preventDefault(),q(e,!0);let n=document.querySelector(`#signup-full-name`),r=document.querySelector(`#signup-email`),i=document.querySelector(`#signup-password`),a=document.querySelector(`#signup-confirm-password`),o=document.querySelector(`#signup-role`),s=n?.value.trim()??``,c=r?.value.trim()??``,l=i?.value??``,u=a?.value??``,f=o?.value??`researcher`,p=()=>{q(e,!1)};if(!s||!c||!l||!u){console.log(`Please fill in all fields`),A({position:`bottom-right`,header:`Error`,description:`Please fill in all fields.`,footer:``,closeAfterMs:3e3}),window.setTimeout(p,3e3);return}if(!/^\S+@\S+\.\S+$/.test(c)){console.log(`Please enter a valid email address`),A({position:`bottom-right`,header:`Error`,description:`Please enter a valid email address.`,footer:``,closeAfterMs:3e3}),window.setTimeout(p,3e3);return}if(l!==u){console.log(`Passwords do not match`),A({position:`bottom-right`,header:`Error`,description:`Passwords do not match. Please try again.`,footer:``,closeAfterMs:3e3}),window.setTimeout(p,3e3);return}console.log(`Form submitted`,{fullName:s,email:c,password:l,role:f}),A({position:`bottom-right`,header:`Account created`,description:`Your account has been created successfully.`,footer:`You can now sign in with your new credentials.`,closeAfterMs:3e3}),d({fullName:s,email:c,role:f,verified:!0,authenticated:!0}),window.setTimeout(()=>{p(),Q(`/dashboard`)},1500)})}var ie=String.raw;function ae(){return ie`
    <main class="bg-slate-200 h-screen flex items-center justify-center px-2 text-black ">
      <section
        class="w-full max-w-7xl bg-slate-100 h-10/12 rounded-3xl shadow-x flex flex-col md:flex-row"
      >
        <div
          class="flex-1 p-4 md:p-10 bg-white/70 flex-col rounded-tl-3xl md:rounded-bl-3xl rounded-tr-3xl md:rounded-tr-non"
        >
          ${U()}

          <div class="w-full h-full flex justify-center items-center">
            <div class="max-w-md">
              <h1 class="${_.display} mb-3 font-bold text-slate-900">
                Create your account
              </h1>
              <h2 class="${_.body} text-slate-500">
                Sign up to manage secure incident reports
              </h2>

              ${J()}

              <p class="${_.bodySmall} text-slate-700">
                Already have an account?
                <a href="/signin" class="text-sky-600 hover:underline">Sign in</a>
              </p>
            </div>
          </div>
        </div>

        <div
          class="md:rounded-tr-3xl overflow-hidden rounded-br-3xl rounded-bl-3xl md:rounded-bl-none flex-1 flex p-4 relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white"
        >
          <div
            class="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full border border-white/10 bg-white/5"
            aria-hidden="true"
          ></div>

          <div
            class="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full border border-white/10 bg-white/5"
            aria-hidden="true"
          ></div>

          <div class="absolute *:inset-0 flex items-center justify-center h-full">
            <div class="relative z-10 mx-auto max-w-xl">
              <div
                class="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-inner"
                aria-hidden="true"
              >
                ${V(z,{size:38,strokeWidth:2,color:`white`,className:`text-white`}).outerHTML}
              </div>

              <h2 class="${_.heroTitle} text-center font-bold text-white">
                Secure. Transparent. Accountable.
              </h2>
              <p class="${_.body} mt-5 text-slate-300">
                The Incident Report System allows researchers to submit reports and triagers to
                review, validate, and track incidents efficiently.
              </p>

              <div class="mt-8 space-y-5 sm:space-y-6">
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${V(B,{size:20,strokeWidth:2,color:`white`,className:`text-white`}).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${_.heading} text-white">Submit</h3>
                    <p class="${_.bodySmall} text-slate-300">
                      Report security issues quickly and easily.
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${V(R,{size:20,strokeWidth:2,color:`white`,className:`text-white`}).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${_.heading} text-white">Review</h3>
                    <p class="${_.bodySmall} text-slate-300">
                      Triagers review and validate reports.
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${V(L,{size:20,strokeWidth:2,color:`white`,className:`text-white`}).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${_.heading} text-white">Track</h3>
                    <p class="${_.bodySmall} text-slate-300">
                      Track the status and resolution of reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `}var X=String.raw;function Z({authenticated:e}){return e===!1?X`
      <nav
        class="border-b border-white/10 bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 text-white shadow-lg shadow-slate-950/10"
      >
        <div
          class="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        >
          ${U({textColor:`white`,wrapperClassName:`flex min-w-0 items-center gap-3 text-white`,textClassName:_.brand})}

          <div class="flex items-center">
            <a
              href="/signin"
              class="btn btn-sm border-0 bg-white px-4 text-slate-950 shadow-md shadow-slate-950/30 hover:bg-slate-200 sm:btn-md"
            >
              ${v({as:`span`,variant:`button`,className:`text-sm sm:text-base`,content:`Sign in`})}
            </a>
          </div>
        </div>
      </nav>
    `:X`
    <nav class="">
      <a href="/">authenticated</a>
    </nav>
  `}var oe=String.raw;function se(){return oe`
    <main class="min-h-screen bg-slate-100">
      <section class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-cyan-600">
          404 Not Found
        </h1>
        <a
          href="/"
          class="mt-4 text-lg text-cyan-700 hover:text-cyan-500 hover:scale-110 transition delay-150 duration-300 ease-in-out"
          >Go back to home</a
        >
      </section>
    </main>
  `}var ce=String.raw;function le(){return window.location.pathname.split(`/`).filter(Boolean)}function Q(e){window.history.pushState({},``,e),$()}function $(){let e=document.querySelector(`#app`);if(!e)return;let t=le();console.log(`Current route:`,t);let n;switch(t[0]){case void 0:n=Z({authenticated:!1})+E();break;case`signin`:if(p.get()!==null){Q(`dashboard`);return}n=G();break;case`signup`:if(p.get()!==null){Q(`dashboard`);return}n=ae();break;case`dashboard`:if(p.get()===null){Q(``);return}n=Z({authenticated:!0})+m();break;default:n=se()}switch(e.innerHTML=ce`${n}`,t[0]){case void 0:w();break;case`signin`:N(),A({position:`bottom-right`,description:`Just put random email and password to sign in, the auth put in session storage to mimic`});break;case`signup`:Y(),A({position:`bottom-right`,description:`Signup is not functional, just for demo purpose`});break;case`dashboard`:te(),A({position:`bottom-right`,description:`Theres no dashboard content available, to remove the session storage you can manually remove or click the logout button`})}}function ue(){window.addEventListener(`hashchange`,$),$()}ue();