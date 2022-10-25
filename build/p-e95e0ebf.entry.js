import{r as t,h as s,g as e,a as o}from"./p-ce29c58b.js";import{m as i,a as n,s as a,b as r,c as h,d as c,e as l,f as u,g as p,h as d,i as f,j as g,k as m,l as y,n as b,o as w,p as P}from"./p-073ac660.js";import{A as v}from"./p-7f993afd.js";let O=class{constructor(s){t(this,s)}render(){return s("main",null,s("stencil-router",null,s("stencil-route-switch",{scrollTopOffset:0},s("stencil-route",{url:"/",component:"dnd-slides",componentProps:{className:"slide-container"},exact:!0}),s("stencil-route",{url:"/demo",component:"app-demo"}))))}};O.style=".slide-container{display:block;height:100vh}";let j=class{constructor(s){t(this,s),this.group=null,this.match=null,this.componentProps={},this.exact=!1,this.scrollOnNextRender=!1,this.previousMatch=null}computeMatch(t){const s=null!=this.group||null!=this.el.parentElement&&"stencil-route-switch"===this.el.parentElement.tagName.toLowerCase();if(t&&!s)return this.previousMatch=this.match,this.match=i(t.pathname,{path:this.url,exact:this.exact,strict:!0})}async loadCompleted(){let t={};this.history&&this.history.location.hash?t={scrollToId:this.history.location.hash.substr(1)}:this.scrollTopOffset&&(t={scrollTopOffset:this.scrollTopOffset}),"function"==typeof this.componentUpdated?this.componentUpdated(t):this.match&&!n(this.match,this.previousMatch)&&this.routeViewsUpdated&&this.routeViewsUpdated(t)}async componentDidUpdate(){await this.loadCompleted()}async componentDidLoad(){await this.loadCompleted()}render(){if(!this.match||!this.history)return null;const t=Object.assign({},this.componentProps,{history:this.history,match:this.match});return this.routeRender?this.routeRender(Object.assign({},t,{component:this.component})):this.component?s(this.component,Object.assign({},t)):void 0}get el(){return e(this)}static get watchers(){return{location:["computeMatch"]}}};v.injectProps(j,["location","history","historyType","routeViewsUpdated"]),j.style="stencil-route.inactive{display:none}";const k=t=>"STENCIL-ROUTE"===t.tagName;let T=class{constructor(s){t(this,s),this.group=((1e17*Math.random()).toString().match(/.{4}/g)||[]).join("-"),this.subscribers=[],this.queue=o(this,"queue")}componentWillLoad(){null!=this.location&&this.regenerateSubscribers(this.location)}async regenerateSubscribers(t){if(null==t)return;let s=-1;if(this.subscribers=Array.prototype.slice.call(this.el.children).filter(k).map(((e,o)=>{const n=i(t.pathname,{path:e.url,exact:e.exact,strict:!0});return n&&-1===s&&(s=o),{el:e,match:n}})),-1===s)return;if(this.activeIndex===s)return void(this.subscribers[s].el.match=this.subscribers[s].match);this.activeIndex=s;const e=this.subscribers[this.activeIndex];this.scrollTopOffset&&(e.el.scrollTopOffset=this.scrollTopOffset),e.el.group=this.group,e.el.match=e.match,e.el.componentUpdated=t=>{this.queue.write((()=>{this.subscribers.forEach(((t,s)=>{if(t.el.componentUpdated=void 0,s===this.activeIndex)return t.el.style.display="";this.scrollTopOffset&&(t.el.scrollTopOffset=this.scrollTopOffset),t.el.group=this.group,t.el.match=null,t.el.style.display="none"}))})),this.routeViewsUpdated&&this.routeViewsUpdated(Object.assign({scrollTopOffset:this.scrollTopOffset},t))}}render(){return s("slot",null)}get el(){return e(this)}static get watchers(){return{location:["regenerateSubscribers"]}}};v.injectProps(T,["location","routeViewsUpdated"]);const L=(t,...s)=>{t||console.warn(...s)},S=()=>{let t,s=[];return{setPrompt:s=>(L(null==t,"A history supports only one prompt at a time"),t=s,()=>{t===s&&(t=null)}),confirmTransitionTo:(s,e,o,i)=>{if(null!=t){const n="function"==typeof t?t(s,e):t;"string"==typeof n?"function"==typeof o?o(n,i):(L(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),i(!0)):i(!1!==n)}else i(!0)},appendListener:t=>{let e=!0;const o=(...s)=>{e&&t(...s)};return s.push(o),()=>{e=!1,s=s.filter((t=>t!==o))}},notifyListeners:(...t)=>{s.forEach((s=>s(...t)))}}},U=(t,s="scrollPositions")=>{let e=new Map;const o=(s,o)=>{if(e.set(s,o),a(t,"sessionStorage")){const s=[];e.forEach(((t,e)=>{s.push([e,t])})),t.sessionStorage.setItem("scrollPositions",JSON.stringify(s))}};if(a(t,"sessionStorage")){const o=t.sessionStorage.getItem(s);e=o?new Map(JSON.parse(o)):e}return"scrollRestoration"in t.history&&(history.scrollRestoration="manual"),{set:o,get:t=>e.get(t),has:t=>e.has(t),capture:s=>{o(s,[t.scrollX,t.scrollY])}}},H={hashbang:{encodePath:t=>"!"===t.charAt(0)?t:"!/"+w(t),decodePath:t=>"!"===t.charAt(0)?t.substr(1):t},noslash:{encodePath:w,decodePath:l},slash:{encodePath:l,decodePath:l}},A=(t,s)=>{const e=0==t.pathname.indexOf(s)?"/"+t.pathname.slice(s.length):t.pathname;return Object.assign({},t,{pathname:e})},E={browser:(t,s={})=>{let e=!1;const o=t.history,i=t.location,n=t.navigator,a=r(t),b=!h(n),w=U(t),P=null!=s.forceRefresh&&s.forceRefresh,v=null!=s.getUserConfirmation?s.getUserConfirmation:m,O=null!=s.keyLength?s.keyLength:6,j=s.basename?c(l(s.basename)):"",k=()=>{try{return t.history.state||{}}catch(t){return{}}},T=t=>{t=t||{};const{key:s,state:e}=t,{pathname:o,search:n,hash:a}=i;let r=o+n+a;return L(!j||d(r,j),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+r+'" to begin with "'+j+'".'),j&&(r=f(r,j)),u(r,e,s||p(O))},H=S(),A=t=>{w.capture(D.location.key),Object.assign(D,t),D.location.scrollPosition=w.get(D.location.key),D.length=o.length,H.notifyListeners(D.location,D.action)},E=t=>{y(n,t)||M(T(t.state))},x=()=>{M(T(k()))},M=t=>{if(e)e=!1,A();else{const s="POP";H.confirmTransitionTo(t,s,v,(e=>{e?A({action:s,location:t}):C(t)}))}},C=t=>{let s=_.indexOf(D.location.key),o=_.indexOf(t.key);-1===s&&(s=0),-1===o&&(o=0);const i=s-o;i&&(e=!0,V(i))},R=T(k());let _=[R.key],B=0,N=!1;const Y=t=>j+g(t),V=t=>{o.go(t)},q=s=>{B+=s,1===B?(t.addEventListener("popstate",E),b&&t.addEventListener("hashchange",x)):0===B&&(t.removeEventListener("popstate",E),b&&t.removeEventListener("hashchange",x))},D={length:o.length,action:"POP",location:R,createHref:Y,push:(t,s)=>{L(!("object"==typeof t&&void 0!==t.state&&void 0!==s),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");const e="PUSH",n=u(t,s,p(O),D.location);H.confirmTransitionTo(n,e,v,(t=>{if(!t)return;const s=Y(n),{key:r,state:h}=n;if(a)if(o.pushState({key:r,state:h},"",s),P)i.href=s;else{const t=_.indexOf(D.location.key),s=_.slice(0,-1===t?0:t+1);s.push(n.key),_=s,A({action:e,location:n})}else L(void 0===h,"Browser history cannot push state in browsers that do not support HTML5 history"),i.href=s}))},replace:(t,s)=>{L(!("object"==typeof t&&void 0!==t.state&&void 0!==s),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");const e="REPLACE",n=u(t,s,p(O),D.location);H.confirmTransitionTo(n,e,v,(t=>{if(!t)return;const s=Y(n),{key:r,state:h}=n;if(a)if(o.replaceState({key:r,state:h},"",s),P)i.replace(s);else{const t=_.indexOf(D.location.key);-1!==t&&(_[t]=n.key),A({action:e,location:n})}else L(void 0===h,"Browser history cannot replace state in browsers that do not support HTML5 history"),i.replace(s)}))},go:V,goBack:()=>V(-1),goForward:()=>V(1),block:(t="")=>{const s=H.setPrompt(t);return N||(q(1),N=!0),()=>(N&&(N=!1,q(-1)),s())},listen:t=>{const s=H.appendListener(t);return q(1),()=>{q(-1),s()}},win:t};return D},hash:(t,s={})=>{let e=!1,o=null,i=0,n=!1;const a=t.location,r=t.history,h=b(t.navigator),y=null!=s.keyLength?s.keyLength:6,{getUserConfirmation:w=m,hashType:v="slash"}=s,O=s.basename?c(l(s.basename)):"",{encodePath:j,decodePath:k}=H[v],T=()=>{const t=a.href,s=t.indexOf("#");return-1===s?"":t.substring(s+1)},U=t=>{const s=a.href.indexOf("#");a.replace(a.href.slice(0,s>=0?s:0)+"#"+t)},A=()=>{let t=k(T());return L(!O||d(t,O),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+t+'" to begin with "'+O+'".'),O&&(t=f(t,O)),u(t,void 0,p(y))},E=S(),x=t=>{Object.assign(D,t),D.length=r.length,E.notifyListeners(D.location,D.action)},M=()=>{const t=T(),s=j(t);if(t!==s)U(s);else{const t=A(),s=D.location;if(!e&&P(s,t))return;if(o===g(t))return;o=null,C(t)}},C=t=>{if(e)e=!1,x();else{const s="POP";E.confirmTransitionTo(t,s,w,(e=>{e?x({action:s,location:t}):R(t)}))}},R=t=>{let s=Y.lastIndexOf(g(D.location)),o=Y.lastIndexOf(g(t));-1===s&&(s=0),-1===o&&(o=0);const i=s-o;i&&(e=!0,V(i))},_=T(),B=j(_);_!==B&&U(B);const N=A();let Y=[g(N)];const V=t=>{L(h,"Hash history go(n) causes a full page reload in this browser"),r.go(t)},q=(t,s)=>{i+=s,1===i?t.addEventListener("hashchange",M):0===i&&t.removeEventListener("hashchange",M)},D={length:r.length,action:"POP",location:N,createHref:t=>"#"+j(O+g(t)),push:(t,s)=>{L(void 0===s,"Hash history cannot push state; it is ignored");const e="PUSH",i=u(t,void 0,p(y),D.location);E.confirmTransitionTo(i,e,w,(t=>{if(!t)return;const s=g(i),n=j(O+s);if(T()!==n){o=s,(t=>{a.hash=t})(n);const t=Y.lastIndexOf(g(D.location)),r=Y.slice(0,-1===t?0:t+1);r.push(s),Y=r,x({action:e,location:i})}else L(!1,"Hash history cannot PUSH the same path; a new entry will not be added to the history stack"),x()}))},replace:(t,s)=>{L(void 0===s,"Hash history cannot replace state; it is ignored");const e="REPLACE",i=u(t,void 0,p(y),D.location);E.confirmTransitionTo(i,e,w,(t=>{if(!t)return;const s=g(i),n=j(O+s);T()!==n&&(o=s,U(n));const a=Y.indexOf(g(D.location));-1!==a&&(Y[a]=s),x({action:e,location:i})}))},go:V,goBack:()=>V(-1),goForward:()=>V(1),block:(s="")=>{const e=E.setPrompt(s);return n||(q(t,1),n=!0),()=>(n&&(n=!1,q(t,-1)),e())},listen:s=>{const e=E.appendListener(s);return q(t,1),()=>{q(t,-1),e()}},win:t};return D}};let x=class{constructor(s){t(this,s),this.root="/",this.historyType="browser",this.titleSuffix="",this.routeViewsUpdated=(t={})=>{if(this.history&&t.scrollToId&&"browser"===this.historyType){const s=this.history.win.document.getElementById(t.scrollToId);if(s)return s.scrollIntoView()}this.scrollTo(t.scrollTopOffset||this.scrollTopOffset)},this.isServer=o(this,"isServer"),this.queue=o(this,"queue")}componentWillLoad(){this.history=E[this.historyType](this.el.ownerDocument.defaultView),this.history.listen((t=>{t=A(t,this.root),this.location=t})),this.location=A(this.history.location,this.root)}scrollTo(t){const s=this.history;if(null!=t&&!this.isServer&&s)return"POP"===s.action&&Array.isArray(s.location.scrollPosition)?this.queue.write((()=>{s&&s.location&&Array.isArray(s.location.scrollPosition)&&s.win.scrollTo(s.location.scrollPosition[0],s.location.scrollPosition[1])})):this.queue.write((()=>{s.win.scrollTo(0,t)}))}render(){if(this.location&&this.history)return s(v.Provider,{state:{historyType:this.historyType,location:this.location,titleSuffix:this.titleSuffix,root:this.root,history:this.history,routeViewsUpdated:this.routeViewsUpdated}},s("slot",null))}get el(){return e(this)}};export{O as app_root,j as stencil_route,T as stencil_route_switch,x as stencil_router}