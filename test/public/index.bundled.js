!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.SW=e()}(this,function(){"use strict";var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,e){return t(e={exports:{}},e.exports),e.exports}var s=e(function(e,s){e.exports=function(){var e={absolute:(t,e)=>{let s=t.split("/"),r=e.split("/");s.pop();for(let t=0;t<r.length;t++)"."!=r[t]&&(".."==r[t]?s.pop():s.push(r[t]));return s.join("/")},getRoutes:t=>{"/"!=t[0]&&(t="/"+t);let e=t.indexOf("?");return-1!=e&&(t=t.substring(0,e)),t.split("/")}};const s={parse:t=>{let e={};if("string"==typeof t){try{e=JSON.parse(t)}catch(e){return t}return s.parse(e)}if(Array.isArray(t))e=[],t.forEach((t,r)=>{e[r]=s.parse(t)});else{if("object"!=typeof t)return t;for(const r in t)e[r]=s.parse(t[r])}return e},stringify:t=>"string"==typeof t?t:JSON.stringify(t),shallowEqual:(t,e)=>{for(let s in t)if(!(s in e)||t[s]!=e[s])return!1;for(let s in e)if(!(s in t)||t[s]!=e[s])return!1;return!0},deepClone:t=>{if(Array.isArray(t))return t.map(t=>s.deepClone(t));if("object"!=typeof t||null===t)return t;let e={};for(let r in t)e[r]=s.deepClone(t[r]);return e}};var r=s,o={updateAttribute:function(t,e,s){if("class"===e){const e=t.className;e!=s&&(t.className="null"!=s&&"undefined"!=s&&"false"!=s&&s?s:"")}else{const r=t.getAttribute(e);r!=s&&("null"!=s&&"undefined"!=s&&"false"!=s&&s?t.setAttribute(e,s):r&&t.removeAttribute(e)),"SELECT"!=t.nodeName&&"INPUT"!=t.nodeName||"value"!=e||(t.value=s)}}},i={SIFRR_NODE:window.document.createElement("template"),TEXT_NODE:3,COMMENT_NODE:8,ELEMENT_NODE:1};const{updateAttribute:n}=o,{shallowEqual:a}=r,{TEXT_NODE:u,COMMENT_NODE:c}=i;function l(t,e){const s=t.childNodes.length,r=e.length;if(s>r){let e=s;for(;e>r;)t.removeChild(t.lastChild),e--}else if(s<r){let o=s;for(;o<r;)t.appendChild(e[o]),o++}const o=Math.min(r,s);for(let s,r=0,i=t.firstChild;r<o;r++)s=e[r],i=p(i,s).nextSibling}function p(t,e){if(null===e)return t;if("stateChange"===e.type)return a(t.state,e.state)||(t.state=e.state),t;if(t.nodeName!==e.nodeName)return t.replaceWith(e),e;if(t.nodeType===u||t.nodeType===c)return t.data!==e.data&&(t.data=e.data),t;e.state&&(t.state=e.state);let s,r=t.attributes,o=e.attributes;for(let e=o.length-1;e>=0;--e)n(t,o[e].name,o[e].value);for(let o=r.length-1;o>=0;--o)s=r[o],e.hasAttribute(s.name)||!1===s.specified||t.removeAttribute(s.name);return l(t,e.childNodes),t}var h={makeEqual:p,makeChildrenEqual:l};const f=window.document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1);f.roll=function(t,e=!1){let s=this.currentNode;for(;--t;)s=e&&e(s)?f.nextSibling()||f.parentNode():f.nextNode();return s};class d{constructor(t,e){this.idx=t,this.ref=e}}var g={walker:f,collect:function(t,e=t.stateMap,s){const r=[];return f.currentNode=t,e.map(t=>r.push(f.roll(t.idx,s))),r},create:function(t,e,s=!1){let r,o=[],i=0;for(f.currentNode=t;t;)(r=e(t))?(o.push(new d(i+1,r)),i=1):i++,t=s&&s(t)?f.nextSibling()||f.parentNode():f.nextNode();return o},klass:d};const{makeChildrenEqual:y}=h,{updateAttribute:b}=o,{collect:_,create:m}=g,{SIFRR_NODE:E,TEXT_NODE:S,COMMENT_NODE:v,ELEMENT_NODE:N}=i;function x(t){return t.dataset&&"true"==t.dataset.sifrrHtml||"true"==t.contentEditable||"TEXTAREA"==t.nodeName||"STYLE"==t.nodeName||t.dataset&&t.dataset.sifrrRepeat}function T(t){if(t.nodeType===S){const e=t.nodeValue;if(e.indexOf("${")>-1)return{html:!1,text:e}}else{if(t.nodeType===v&&"$"==t.nodeValue.trim()[0])return{html:!1,text:t.nodeValue.trim()};if(t.nodeType===N){const e={};if(x(t)){const s=t.innerHTML;s.indexOf("${")>=0&&(e.html=!0,e.text=s.replace(/<!--(.*)-->/g,"$1"))}const s=t.attributes||[],r=s.length,o={};for(let t=0;t<r;t++){const e=s[t];e.value.indexOf("${")>=0&&(o[e.name]=e.value)}if(Object.keys(o).length>0&&(e.attributes=o),Object.keys(e).length>0)return e}}return 0}const O={collectRefs:(t,e)=>_(t,e,x),createStateMap:t=>{let e;return e=t.useShadowRoot?t.shadowRoot:t,m(e,T,x)},updateState:t=>{if(!t._refs)return!1;const e=t._refs.length;for(let s=0;s<e;s++){const e=t.constructor.stateMap[s].ref,r=t._refs[s];if(e.attributes)for(let s in e.attributes){const o=O.evaluateString(e.attributes[s],t);b(r,s,o)}if(void 0===e.html)continue;const o=O.evaluateString(e.text,t);if(o)if(e.html){let t;if(Array.isArray(o))t=o;else if(o.nodeType)t=[o];else{const e=E.cloneNode();e.innerHTML=o.toString().replace(/(&lt;)(((?!&gt;).)*)(&gt;)(((?!&lt;).)*)(&lt;)\/(((?!&gt;).)*)(&gt;)/g,"<$2>$5</$8>").replace(/(&lt;)(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(((?!&gt;).)*)(&gt;)/g,"<$2$3>"),t=Array.prototype.slice.call(e.content.childNodes)}t.length<1?r.textContent="":y(r,t)}else r.nodeValue!=o&&(r.nodeValue=o);else r.textContent=""}t.onStateChange(t.state)},twoWayBind:t=>{const e=t.path?t.path[0]:t.target;if(!e.dataset.sifrrBind)return;const s=void 0===e.value?e.innerHTML:e.value;let r={};r[e.dataset.sifrrBind]=s,e.getRootNode().host.state=r},evaluateString:(t,e)=>{return t.indexOf("${")<0?t:(t=t.trim()).match(/^\${([^{}$]|{([^{}$])*})*}$/)?s(t):s("`"+t+"`");function s(t){let s;return"$"==t[0]&&(t=t.slice(2,-1)),(s=t.indexOf("return ")>=0?new Function(t).bind(e):new Function("return "+t).bind(e))()}}};var A=O;"undefined"!=typeof window?window:void 0!==t||"undefined"!=typeof self&&self;var C,j=(function(t,e){var s;t.exports=(s=class{constructor(t,e,s){this.type=t,this._options=s,this._url=e}get response(){return window.fetch(this.url,this.options).then(t=>{let e=t.headers.get("content-type");if(e&&e.includes("application/json")&&(t=t.json()),t.ok)return t;{let e=Error(t.statusText);throw e.response=t,e}})}get url(){let t=delete this._options.params;return t&&Object.keys(t).length>0?this._url+"?"+Object.keys(t).map(e=>encodeURIComponent(e)+"="+encodeURIComponent(t[e])).join("&"):this._url}get options(){return Object.assign(this._options,{method:this.type,headers:Object.assign({accept:"application/json"},this._options.headers||{}),mode:"cors",redirect:"follow"})}},class{static get(t,e={}){return new s("GET",t,e).response}static post(t,e={}){return new s("POST",t,e).response}static put(t,e={}){return new s("PUT",t,e).response}static delete(t,e={}){return new s("DELETE",t,e).response}static file(t,e={}){return e.headers=e.headers||{},e.headers.accept=e.headers.accept||"*/*",new s("GET",t,e).response}})}(C={exports:{}},C.exports),C.exports);class M{constructor(t,e={}){if(this.constructor.all[t])return this.constructor.all[t].instance;this.elementName=t,this.config=e,this.constructor.urls[t]=this.htmlUrl}get html(){const t=this;return j.file(this.htmlUrl).then(t=>t.text()).then(t=>(new window.DOMParser).parseFromString(t,"text/html")).then(e=>(M.add(t.elementName,{instance:t,template:e.querySelector("template")}),e))}get htmlUrl(){return this.config.url||`${this.config.baseUrl||"/"}elements/${this.elementName.split("-").join("/")}.html`}executeScripts(){return this.html.then(t=>{t.querySelectorAll("script").forEach(t=>{const e=new Function(t.text).bind(window);e()})})}static add(t,e){M._all[t]=e}static get all(){return M._all}}M._all={},M.urls={};var $=M;const{collect:w,create:L}=g,{SIFRR_NODE:P}=i;function k(t){if(3!==t.nodeType){if(void 0!==t.attributes){const e=Array.from(t.attributes),s=e.length,r=[];for(let t=0;t<s;t++){const s=e[t].value;"$"===s[0]&&r.push({name:e[t].name,text:s.slice(2,-1)})}if(r.length>0)return r}return 0}{let e=t.nodeValue;return"$"===e[0]?(t.nodeValue="",e.slice(2,-1)):0}}function D(t){const e=t._refs,s=t.stateMap,r=s.length,o=t.state,i=t._oldState;for(let t=0;t<r;t++){const r=s[t].ref,n=e[t];if(Array.isArray(r)){const t=r.length;for(let e=0;e<t;e++){const t=r[e];i[t.text]!==o[t.text]&&("class"===t.name?n.className=o[t.text]||"":n.setAttribute(t.name,o[t.text]))}}else i[r]!=o[r]&&(n.nodeValue=o[r])}}var R=function(t,e){return"string"==typeof t&&(P.innerHTML=t,t=P.content.firstElementChild||P.content.firstChild),t.isSifrr&&t.isSifrr()?t:(t.stateMap=L(t,k),t._refs=w(t,t.stateMap),Object.defineProperty(t,"state",{get:()=>t._state,set:e=>{t._oldState=Object.assign({},t._state),t._state=Object.assign(t._state||{},e),D(t)}}),e&&(t.state=e),t.sifrrClone=function(e){const s=t.cloneNode(e);return s.stateMap=t.stateMap,s._refs=w(s,t.stateMap),Object.defineProperty(s,"state",{get:()=>s._state,set:t=>{s._oldState=Object.assign({},s._state),s._state=Object.assign(s._state||{},t),D(s)}}),t.state&&(s.state=t.state),s},t)},q=class extends window.HTMLElement{static get observedAttributes(){return["data-sifrr-state"].concat(this.observedAttrs())}static observedAttrs(){return[]}static get template(){return $.all[this.elementName].template}static get stateMap(){return this._stateMap=this._stateMap||A.createStateMap(this.template.content),this._stateMap}static get elementName(){return this.name.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}static onStateChange(){}constructor(){super(),this._state=Object.assign({},this.constructor.defaultState,this.state);const t=this.constructor.template.content.cloneNode(!0);this._refs=A.collectRefs(t,this.constructor.stateMap),this.useShadowRoot="false"!==this.constructor.template.dataset.sr&&!!window.document.head.attachShadow&&this.constructor.useShadowRoot,this.useShadowRoot?(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t),this.shadowRoot.addEventListener("change",A.twoWayBind)):this.appendChild(t)}connectedCallback(){this.hasAttribute("data-sifrr-state")||this.updateState(),this.onConnect()}onConnect(){}disconnectedCallback(){this.useShadowRoot&&this.shadowRoot.removeEventListener("change",A.twoWayBind),this.onDisconnect()}onDisconnect(){}attributeChangedCallback(t,e,s){"data-sifrr-state"===t&&(this.state=r.parse(s)),this.onAttributeChange(t,e,s)}onAttributeChange(){}get state(){return this._state}set state(t){Object.assign(this._state,t),this.updateState()}updateState(){A.updateState(this),this.constructor.onStateChange(this)}onStateChange(){}isSifrr(t=null){return!t||t===this.constructor.elementName}sifrrClone(t){const e=this.cloneNode(t);return e.state=this.state,e}clearState(){this._state={},this.updateState()}qs(t,e=!0){return this.useShadowRoot&&e?this.shadowRoot.querySelector(t):this.querySelector(t)}qsAll(t,e=!0){return this.useShadowRoot&&e?this.shadowRoot.querySelectorAll(t):this.querySelectorAll(t)}static addArrayToDom(t,e){this._arrayToDom=this._arrayToDom||{},this._arrayToDom[t]=R(e)}arrayToDom(t,e=this.state[t]){this._domL=this._domL||{};const s=this._domL[t]||0,r=[],o=e.length;for(let i=0;i<o;i++)if(i<s)r.push({type:"stateChange",state:e[i]});else{const s=this.constructor._arrayToDom[t].sifrrClone(!0);s.state=e[i],r.push(s)}return this._domL[t]=o,r}};const U={},W=(t,e,s)=>{function r(e){e.forEach(e=>e(t,s))}for(let t in U[e])("function"==typeof s.matches&&s.matches(t)||9===s.nodeType&&"document"===t)&&r(U[e][t])};var H={add:t=>!U[t]&&(window.document.addEventListener(t,e=>((t,e)=>Promise.resolve((()=>{let s=t.path?t.path[0]:t.target;for(;s;){const r=s[`$${e}`];r&&r(t,s),W(t,e,s),s=s.parentNode||s.host}})()))(e,t),{capture:!0,passive:!0}),U[t]={},!0),addListener:(t,e,s)=>{const r=U[t][e]||[];return r.indexOf(s)<0&&r.push(s),U[t][e]=r,!0},removeListener:(t,e,s)=>{const r=U[t][e]||[],o=r.indexOf(s);return o>=0&&r.splice(o,1),U[t][e]=r,!0},trigger:(t,e,s)=>{t.dispatchEvent(new window.Event(e,Object.assign({bubbles:!0,composed:!0},s)))}};let B={elements:{}};return B.Element=q,B.Parser=A,B.makeEqual=h,B.Loader=$,B.SimpleElement=R,B.Event=H,B.register=function(t){t.useShadowRoot=B.config.useShadowRoot;const e=t.elementName;if(e)if(window.customElements.get(e))window.console.warn(`Error creating Element: ${e} - Custom Element with this name is already defined.`);else if(e.indexOf("-")<1)window.console.warn(`Error creating Element: ${e} - Custom Element name must have one dash '-'`);else try{return window.customElements.define(e,t),B.elements[e]=t,!0}catch(t){return window.console.warn(`Error creating Custom Element: ${e} - ${t}`),!1}else window.console.warn("Error creating Custom Element: No name given.",t);return!1},B.setup=function(t){B.config=Object.assign({baseUrl:"/",useShadowRoot:!0},t),B.Event.add("input"),B.Event.add("change"),B.Event.addListener("change","document",B.Parser.twoWayBind),B.Event.addListener("input","document",B.Parser.twoWayBind)},B.load=function(t,e={baseUrl:B.config.baseUrl}){return new Promise(s=>{new B.Loader(t,e).executeScripts().then(()=>s())})},B.Url=e,B.Json=r,B.relativeTo=function(t,e){if("string"==typeof t)return B.Url.absolute(B.Loader.urls[t],e)},B}()}),r=e(function(t,e){t.exports=function(){var t=class{static parse(t){let e={};if("string"==typeof t){try{e=JSON.parse(t)}catch(e){return t}return this.parse(e)}if(Array.isArray(t))e=[],t.forEach((t,s)=>{e[s]=this.parse(t)});else{if("object"!=typeof t)return t;for(const s in t)e[s]=this.parse(t[s])}return e}static stringify(t){return"string"==typeof t?t:JSON.stringify(t)}},e=class{constructor(t){this._options=t}_parseKeyValue(t,e){let s={}.constructor;if(void 0===e){if(Array.isArray(t))return t;if("string"==typeof t)return[t];if(t.constructor===s)return t;throw Error("Invalid Key")}if("string"==typeof t){let s={};return s[t]=e,s}throw Error("Invalid Key")}_select(t){return this.data().then(e=>{let s={};return t.forEach(t=>s[t]=e[t]),s})}_upsert(t){let e=this.table;for(let s in t)e[s]=t[s];this.table=e}_delete(t){let e=this.table;t.forEach(t=>delete e[t]),this.table=e}_clear(){this.table={}}_isEqual(t,e){return this.tableName==t.name+t.version&&this.type==e}get tableName(){return this.name+this.version}get name(){return this._options.name}get version(){return this._options.version}get description(){return this._options.description}get type(){return this.constructor.type}isSupported(){return"undefined"==typeof window||"undefined"==typeof document||!(!window||void 0===this.store)}all(){return this.data()}data(){return Promise.resolve(this._parsedData())}select(t){return Promise.resolve(this._select(this._parseKeyValue(t)))}insert(t,e){return Promise.resolve(this._upsert(this._parseKeyValue(t,e)))}update(t,e){return Promise.resolve(this._upsert(this._parseKeyValue(t,e)))}upsert(t,e){return Promise.resolve(this._upsert(this._parseKeyValue(t,e)))}delete(t){return Promise.resolve(this._delete(this._parseKeyValue(t)))}deleteAll(){return Promise.resolve(this._clear())}clear(){return Promise.resolve(this._clear())}static stringify(e){return t.stringify(e)}static parse(e){return t.parse(e)}},s=class extends e{constructor(t){super(t)}_parsedData(){return this._tx("readonly","getAll").then(t=>this.parse(t))}_select(t){let e={},s=[];return t.forEach(t=>s.push(this._tx("readonly","get",t).then(s=>e[t]=this.parse(s)))),Promise.all(s).then(()=>e)}_upsert(t){let e=[];for(let s in t){let r=this._tx("readonly","get",s).then(e=>e&&e.key==s?this._tx("readwrite","put",{key:s,value:t[s]}):this._tx("readwrite","add",{key:s,value:t[s]}));e.push(r)}return Promise.all(e)}_delete(t){let e=[];return t.forEach(t=>e.push(this._tx("readwrite","delete",t))),Promise.all(e)}_clear(){return this._tx("readwrite","clear")}_tx(t,e,s){let r=this;return this.createStore(r.tableName).then(o=>new Promise((i,n)=>{let a=o.transaction(r.tableName,t).objectStore(r.tableName),u=a[e].call(a,s);u.onsuccess=(t=>i(t.target.result)),u.onerror=(t=>n(t.error))}))}get store(){return window.indexedDB}createStore(t){return new Promise((e,s)=>{const r=this.store.open(t,1);r.onupgradeneeded=(e=>{let s=e.target.result;s.createObjectStore(t,{keyPath:"key"})}),r.onsuccess=(()=>e(r.result)),r.onerror=(()=>s(r.error))})}parse(t){let e={};return Array.isArray(t)?(t.forEach(t=>{e[t.key]=t.value}),e):t&&t.value?t.value:void 0}static get type(){return"indexeddb"}},r=class extends e{constructor(t){super(t),this.createStore()}_parsedData(){let t=this;return new Promise(e=>{this.store.transaction(function(s){s.executeSql(`SELECT * FROM ${t.tableName}`,[],(s,r)=>{e(t.parse(r))})})})}_select(t){let e=t.map(()=>"?").join(", ");return this.execSql(`SELECT key, value FROM ${this.tableName} WHERE key in (${e})`,t)}_upsert(t){let e=this.tableName;this.store.transaction(s=>{for(let r in t)s.executeSql(`INSERT OR IGNORE INTO ${e}(key, value) VALUES (?, ?)`,[r,t[r]]),s.executeSql(`UPDATE ${e} SET value = ? WHERE key = ?`,[this.constructor.stringify(t[r]),r])})}_delete(t){let e=this.tableName,s=t.map(()=>"?").join(", ");return this.execSql(`DELETE FROM ${e} WHERE key in (${s})`,t)}_clear(){let t=this.tableName;return this.execSql(`DELETE FROM ${t}`)}get store(){return"undefined"==typeof window||window.openDatabase("bs",1,this._options.description,this._options.size)}createStore(){let t=this.tableName;if("undefined"!=typeof window)return this.execSql(`CREATE TABLE IF NOT EXISTS ${t} (key unique, value)`)}execSql(t,e=[]){let s=this;return new Promise(r=>{s.store.transaction(function(o){o.executeSql(t,e,(t,e)=>{r(s.parse(e))})})})}parse(t){let e,s={},r=t.rows.length;for(e=0;e<r;e++)s[t.rows.item(e).key]=this.constructor.parse(t.rows.item(e).value);return s}static get type(){return"websql"}},o=class extends e{constructor(t){super(t)}_parsedData(){return this.table}get table(){return this.constructor.parse(this.store.getItem(this.tableName))}set table(t){this.store.setItem(this.tableName,this.constructor.stringify(t))}get store(){return window.localStorage}static get type(){return"localstorage"}},i=class extends e{constructor(t){super(t)}_parsedData(){return this.table}get table(){let t=this.store,e={};return(t=t.split("; ")).forEach(t=>{let[s,r]=t.split("=");r&&(e[s]=this.constructor.parse(r))}),e[this.tableName]||{}}set table(t){document.cookie=`${this.tableName}=${e.stringify(t)}; path=/`}get store(){return document.cookie}static get type(){return"cookies"}},n=class extends e{constructor(t,e={}){super(t),this._upsert(this.constructor.parse(e))}_parsedData(){return this._table}get store(){return this._table}get table(){return this._table||{}}set table(t){this._table=t}static get type(){return"jsonstorage"}};let a={};a[s.type]=s,a[r.type]=r,a[o.type]=o,a[i.type]=i,a[n.type]=n;var u=a;return class{constructor(t){return t="string"==typeof t?{priority:[t]}:t||{},this._options=Object.assign(this.constructor.defaultOptions,t),this.storage}get storage(){let t=this.supportedStore();if(void 0===t)throw new Error("No available storage supported in this browser");let e=this.constructor._matchingInstance(this._options,t.type);if(e)return e;{let e=new t(this._options);return this.constructor._add(e),e}}get priority(){return this._options.priority.concat(["indexeddb","websql","localstorage","cookies","jsonstorage"])}supportedStore(){for(let t=0;t<this.priority.length;t++){let e=this.constructor.availableStores[this.priority[t]];if(e&&new e(this._options).isSupported())return e}}static _matchingInstance(t,e){let s,r=this.all,o=r.length;for(s=0;s<o;s++)if(r[s]._isEqual(t,e))return r[s];return!1}static _add(t){this._all=this._all||[],this._all.push(t)}static get availableStores(){return u}static get defaultOptions(){return{priority:[],name:"SifrrStorage",version:1,description:"Sifrr Storage",size:5242880}}static get all(){return this._all||[]}static json(t){return new n({},t)}}}()});window.Sifrr=window.Sifrr||{},window.Sifrr.Dom=s,window.Sifrr.Storage=r;const o=window.Sifrr;o.Dom.setup(),o.Dom.load("sifrr-stater"),o.Dom.load("sifrr-test");return{}});
//# sourceMappingURL=index.bundled.js.map