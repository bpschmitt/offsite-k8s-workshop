/*! For license information please see a7629950cb7a18c7593baf47d0acfe798f1cddc4-72066251f04050af0537.js.LICENSE.txt */
(self.webpackChunkgatsby_starter_rocketdocs=self.webpackChunkgatsby_starter_rocketdocs||[]).push([[866],{32993:function(t){var e="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(t,a){if(t===a)return!0;if(t&&a&&"object"==typeof t&&"object"==typeof a){if(t.constructor!==a.constructor)return!1;var u,c,l,s;if(Array.isArray(t)){if((u=t.length)!=a.length)return!1;for(c=u;0!=c--;)if(!i(t[c],a[c]))return!1;return!0}if(n&&t instanceof Map&&a instanceof Map){if(t.size!==a.size)return!1;for(s=t.entries();!(c=s.next()).done;)if(!a.has(c.value[0]))return!1;for(s=t.entries();!(c=s.next()).done;)if(!i(c.value[1],a.get(c.value[0])))return!1;return!0}if(r&&t instanceof Set&&a instanceof Set){if(t.size!==a.size)return!1;for(s=t.entries();!(c=s.next()).done;)if(!a.has(c.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(a)){if((u=t.length)!=a.length)return!1;for(c=u;0!=c--;)if(t[c]!==a[c])return!1;return!0}if(t.constructor===RegExp)return t.source===a.source&&t.flags===a.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===a.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===a.toString();if((u=(l=Object.keys(t)).length)!==Object.keys(a).length)return!1;for(c=u;0!=c--;)if(!Object.prototype.hasOwnProperty.call(a,l[c]))return!1;if(e&&t instanceof Element)return!1;for(c=u;0!=c--;)if(("_owner"!==l[c]&&"__v"!==l[c]&&"__o"!==l[c]||!t.$$typeof)&&!i(t[l[c]],a[l[c]]))return!1;return!0}return t!=t&&a!=a}t.exports=function(t,e){try{return i(t,e)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},51046:function(t,e,n){"use strict";n.d(e,{w_:function(){return l}});var r=n(67294),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=r.createContext&&r.createContext(o),a=function(){return a=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},a.apply(this,arguments)},u=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n};function c(t){return t&&t.map((function(t,e){return r.createElement(t.tag,a({key:e},t.attr),c(t.child))}))}function l(t){return function(e){return r.createElement(s,a({attr:a({},t.attr)},e),c(t.child))}}function s(t){var e=function(e){var n,o=t.attr,i=t.size,c=t.title,l=u(t,["attr","size","title"]),s=i||e.size||"1em";return e.className&&(n=e.className),t.className&&(n=(n?n+" ":"")+t.className),r.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,o,l,{className:n,style:a(a({color:t.color||e.color},e.style),t.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),c&&r.createElement("title",null,c),t.children)};return void 0!==i?r.createElement(i.Consumer,null,(function(t){return e(t)})):e(o)}},24839:function(t,e,n){"use strict";var r,o=n(67294),i=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=!("undefined"==typeof window||!window.document||!window.document.createElement);t.exports=function(t,e,n){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var c,l=[];function s(){c=t(l.map((function(t){return t.props}))),f.canUseDOM?e(c):n&&(c=n(c))}var f=function(t){var e,n;function o(){return t.apply(this,arguments)||this}n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,o.peek=function(){return c},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=c;return c=void 0,l=[],t};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){l.push(this),s()},a.componentDidUpdate=function(){s()},a.componentWillUnmount=function(){var t=l.indexOf(this);l.splice(t,1),s()},a.render=function(){return i.createElement(r,this.props)},o}(o.PureComponent);return a(f,"displayName","SideEffect("+function(t){return t.displayName||t.name||"Component"}(r)+")"),a(f,"canUseDOM",u),f}}},34348:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isNavigator=e.isBrowser=e.off=e.on=e.noop=void 0;e.noop=function(){},e.on=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];t&&t.addEventListener&&t.addEventListener.apply(t,e)},e.off=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];t&&t.removeEventListener&&t.removeEventListener.apply(t,e)},e.isBrowser="undefined"!=typeof window,e.isNavigator="undefined"!=typeof navigator},16372:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(67294);e.default=function(t){r.useEffect(t,[])}},24250:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(74916),o=n(67294),i=r.__importDefault(n(37916));e.default=function(t){var e=o.useRef(0),n=o.useState(t),r=n[0],a=n[1],u=o.useCallback((function(t){cancelAnimationFrame(e.current),e.current=requestAnimationFrame((function(){a(t)}))}),[]);return i.default((function(){cancelAnimationFrame(e.current)})),[r,u]}},37916:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(74916),o=n(67294),i=r.__importDefault(n(16372));e.default=function(t){var e=o.useRef(t);e.current=t,i.default((function(){return function(){return e.current()}}))}},45640:function(t,e,n){"use strict";var r=n(74916),o=n(67294),i=n(34348),a=r.__importDefault(n(24250));e.Z=function(){var t=a.default((function(){return{x:i.isBrowser?window.pageXOffset:0,y:i.isBrowser?window.pageYOffset:0}})),e=t[0],n=t[1];return o.useEffect((function(){var t=function(){n((function(t){var e=window.pageXOffset,n=window.pageYOffset;return t.x!==e||t.y!==n?{x:e,y:n}:t}))};return t(),i.on(window,"scroll",t,{capture:!1,passive:!0}),function(){i.off(window,"scroll",t)}}),[]),e}},64881:function(t,e,n){"use strict";var r=n(74916),o=n(67294),i=r.__importDefault(n(24250)),a=n(34348);e.Z=function(t,e){void 0===t&&(t=1/0),void 0===e&&(e=1/0);var n=i.default({width:a.isBrowser?window.innerWidth:t,height:a.isBrowser?window.innerHeight:e}),r=n[0],u=n[1];return o.useEffect((function(){if(a.isBrowser){var t=function(){u({width:window.innerWidth,height:window.innerHeight})};return a.on(window,"resize",t),function(){a.off(window,"resize",t)}}}),[]),r}},74916:function(t,e,n){"use strict";n.r(e),n.d(e,{__extends:function(){return o},__assign:function(){return i},__rest:function(){return a},__decorate:function(){return u},__param:function(){return c},__metadata:function(){return l},__awaiter:function(){return s},__generator:function(){return f},__createBinding:function(){return p},__exportStar:function(){return d},__values:function(){return h},__read:function(){return m},__spread:function(){return y},__spreadArrays:function(){return g},__spreadArray:function(){return v},__await:function(){return w},__asyncGenerator:function(){return b},__asyncDelegator:function(){return x},__asyncValues:function(){return O},__makeTemplateObject:function(){return T},__importStar:function(){return _},__importDefault:function(){return E},__classPrivateFieldGet:function(){return A},__classPrivateFieldSet:function(){return C}});var r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)};function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var i=function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},i.apply(this,arguments)};function a(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}function u(t,e,n,r){var o,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var u=t.length-1;u>=0;u--)(o=t[u])&&(a=(i<3?o(a):i>3?o(e,n,a):o(e,n))||a);return i>3&&a&&Object.defineProperty(e,n,a),a}function c(t,e){return function(n,r){e(n,r,t)}}function l(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}function s(t,e,n,r){return new(n||(n=Promise))((function(o,i){function a(t){try{c(r.next(t))}catch(e){i(e)}}function u(t){try{c(r.throw(t))}catch(e){i(e)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,u)}c((r=r.apply(t,e||[])).next())}))}function f(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(u){i=[6,u],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}var p=Object.create?function(t,e,n,r){void 0===r&&(r=n),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]};function d(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||p(e,t,n)}function h(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function m(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(u){o={error:u}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function y(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(m(arguments[e]));return t}function g(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),o=0;for(e=0;e<n;e++)for(var i=arguments[e],a=0,u=i.length;a<u;a++,o++)r[o]=i[a];return r}function v(t,e,n){if(n||2===arguments.length)for(var r,o=0,i=e.length;o<i;o++)!r&&o in e||(r||(r=Array.prototype.slice.call(e,0,o)),r[o]=e[o]);return t.concat(r||Array.prototype.slice.call(e))}function w(t){return this instanceof w?(this.v=t,this):new w(t)}function b(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(t,e||[]),i=[];return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r;function a(t){o[t]&&(r[t]=function(e){return new Promise((function(n,r){i.push([t,e,n,r])>1||u(t,e)}))})}function u(t,e){try{(n=o[t](e)).value instanceof w?Promise.resolve(n.value.v).then(c,l):s(i[0][2],n)}catch(r){s(i[0][3],r)}var n}function c(t){u("next",t)}function l(t){u("throw",t)}function s(t,e){t(e),i.shift(),i.length&&u(i[0][0],i[0][1])}}function x(t){var e,n;return e={},r("next"),r("throw",(function(t){throw t})),r("return"),e[Symbol.iterator]=function(){return this},e;function r(r,o){e[r]=t[r]?function(e){return(n=!n)?{value:w(t[r](e)),done:"return"===r}:o?o(e):e}:o}}function O(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t=h(t),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(n){e[n]=t[n]&&function(e){return new Promise((function(r,o){(function(t,e,n,r){Promise.resolve(r).then((function(e){t({value:e,done:n})}),e)})(r,o,(e=t[n](e)).done,e.value)}))}}}function T(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}var S=Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e};function _(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&p(e,t,n);return S(e,t),e}function E(t){return t&&t.__esModule?t:{default:t}}function A(t,e,n,r){if("a"===n&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?r:"a"===n?r.call(t):r?r.value:e.get(t)}function C(t,e,n,r,o){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?o.call(t,n):o?o.value=n:e.set(t,n),n}},58594:function(t,e,n){var r,o,i;i=function(){function t(t){var e=[];if(0===t.length)return"";if("string"!=typeof t[0])throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var n=t.shift();t[0]=n+t[0]}t[0].match(/^file:\/\/\//)?t[0]=t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0]=t[0].replace(/^([^/:]+):\/*/,"$1://");for(var r=0;r<t.length;r++){var o=t[r];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(r>0&&(o=o.replace(/^[\/]+/,"")),o=r<t.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),e.push(o))}var i=e.join("/"),a=(i=i.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return i=a.shift()+(a.length>0?"?":"")+a.join("&")}return function(){return t("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}},t.exports?t.exports=i():void 0===(o="function"==typeof(r=i)?r.call(e,n,e,t):r)||(t.exports=o)},46858:function(t){function e(t,e){return("/"+t+"/"+e).replace(/\/\/+/g,"/")}function n(t){return/^((https?:)?\/\/)/i.test(t)}t.exports={resolveLink:function(t,r){return n(t)?t:e(r,t)},normalizeBasePath:e,isExternalUrl:n}},26718:function(t,e,n){"use strict";n.d(e,{Z:function(){return D}});var r=n(67294),o=n(23431),i=n(65811),a=n(45640),u=n(64881);var c=n(6771);var l=(0,c.Z)("div",{target:"e10o0eax1"})({name:"106zi9a",styles:"position:sticky;top:0;order:2;padding-top:72px;max-height:calc(100vh - 72px);overflow-y:auto;overflow-x:hidden;width:100%;max-width:200px;@media (max-width: 1200px){position:relative;top:auto;order:0;max-width:100%;margin-left:0;padding-top:0;}"}),s=(0,c.Z)("div",{target:"e10o0eax0"})({name:"1gnn5iw",styles:"h2{text-transform:uppercase;font-size:14px;font-weight:bold;letter-spacing:0.142em;margin-top:0rem;border:none;margin:0 0 16px 0;}nav ul{padding-left:0;margin-bottom:0;list-style:none;li{margin-bottom:12px;line-height:1.1;a{font-size:14px;font-weight:400;text-decoration:none;transition:all 0.2s;overflow-wrap:break-word;&:hover{text-decoration:underline;}}}}@media (max-width: 1200px){margin:0 0 24px 0;padding-bottom:16px;border-bottom:1px solid rgba(120, 117, 122, 0.2);}"});function f(t){var e=t.headings,n=t.disableTOC,c=t.contentRef,f=(0,a.Z)().y,p=(0,i.u)(),d=(0,u.Z)(),h=d.width,m=d.height,y=(0,r.useState)([]),g=y[0],v=y[1],w=h<=1200;(0,r.useEffect)((function(){if(!w||n){var t,e=null===(t=c.current)||void 0===t?void 0:t.querySelectorAll("h2, h3");v(e&&Array.from(e).map((function(t){var e=t.querySelector("a");return e?{id:t.id,offset:t.offsetTop+e.offsetTop}:{}})).filter(Boolean))}}),[h,m,c,w,n]);var b=(0,r.useMemo)((function(){if(!w||n){var t=f+m/2;if(g)for(var e=g.length-1;e>=0;e-=1){var r=g[e],o=r.id;if(t>=r.offset)return o}}return null}),[g,m,f,w,n]);return n?(0,o.tZ)(l,null):(0,o.tZ)(l,null,(0,o.tZ)(s,null,(0,o.tZ)("h2",null,"On this page"),(0,o.tZ)("nav",null,(0,o.tZ)("ul",null,e.filter((function(t){return 2===t.depth||3===t.depth})).map((function(t){var e=t.value.toString().toLowerCase().trim().replace(/\s/g,"-").replace(/[^\w\-\u00b4\u00C0-\u00C3\u00c7\u00C9-\u00CA\u00CD\u00D3-\u00D5\u00DA\u00E0-\u00E3\u00E7\u00E9-\u00EA\u00ED\u00F3-\u00F5\u00FA]+/g,"");return(0,o.tZ)("li",{key:t.value,style:{marginLeft:3===t.depth?"8px":null}},(0,o.tZ)("a",{href:"#"+e,style:{color:b===e?p.colors.primary:p.colors.text}},t.value))}))))))}f.defaultProps={headings:null};var p=n(25444),d=n(46858);var h=(0,c.Z)("aside",{target:"e1wh78ri5"})("width:100%;overflow-y:auto;display:flex;justify-content:space-between;align-items:center;flex-direction:column;position:sticky;top:0;padding-top:36px;transition:transform 0.5s;height:calc(100vh - 1px);nav{width:100%;padding-top:24px;align-self:flex-start;flex:1;}@media (max-width: 780px){max-width:75%;min-width:auto;z-index:1001;position:fixed;top:0;bottom:0;left:0;padding-top:32px;background:",(function(t){return t.theme.colors.background}),";transform:translate3d(\n      ",(function(t){return t.isMenuOpen?"0":"-100%"}),",\n      0,\n      0\n    );}"),m=(0,c.Z)("div",{target:"e1wh78ri4"})({name:"2yrou",styles:"width:100%;a{width:100%;padding-left:30px;display:flex;justify-content:flex-start;align-items:center;}"}),y=(0,c.Z)("ul",{target:"e1wh78ri3"})({name:"qmhqz9",styles:"list-style:none;width:100%;padding-left:0;display:flex;justify-content:flex-start;align-items:center;flex-direction:column"}),g=(0,c.Z)("li",{target:"e1wh78ri2"})("padding-left:30px;width:100%;text-transform:uppercase;font-size:14px;font-weight:bold;margin-top:20px;color:",(function(t){return t.theme.colors.title}),";letter-spacing:0.142em;"),v=(0,c.Z)("li",{target:"e1wh78ri1"})("font-size:15px;width:100%;transition:all 200ms ease-in-out;padding:0 20px;cursor:pointer;a,span{display:block;font-size:15px;color:",(function(t){return t.theme.colors.text}),";background-color:",(function(t){return t.theme.colors.background}),";padding:4px 10px;margin:4px 0;border-radius:4px;font-weight:normal;text-decoration:none;width:100%;height:100%;display:flex;justify-content:flex-start;align-items:center;cursor:pointer;margin:0 auto;transition:all 0.2s ease;svg{width:20px;height:20px;margin-right:10px;}&:not(.active-link):hover{color:",(function(t){return t.theme.colors.primary}),";}&.active-link{color:",(function(t){return t.theme.colors.primary}),";background-color:",(function(t){return t.theme.colors.shape}),";}@media (max-width: 780px){&.active-link{background:",(function(t){return t.theme.colors.shape}),";}}}"),w=(0,c.Z)(y,{target:"e1wh78ri0"})({name:"6wyw1u",styles:"margin:5px 0 0 0"}),b=n(15648),x=n(3750);function O(t){var e=t.link,n=t.label;return(0,o.tZ)("a",{href:e,rel:"noopener noreferrer"},n,(0,o.tZ)(x.AlO,{style:{width:"16px",height:"16px",marginLeft:"10px"}}))}function T(t){var e=t.link,n=t.label;return(0,o.tZ)(p.Link,{to:e,activeClassName:"active-link"},n)}var S=n.p+"static/nrlogo2-0dcad078e0767145aa56249192a23a31.png",_=function(){return(0,o.tZ)("img",{src:S,alt:"New Relic Logo",style:{width:180}})};function E(t){var e=t.children,n=t.text;return(0,o.tZ)(r.Fragment,null,(0,o.tZ)(g,null,n),(0,o.tZ)(w,null,e))}function A(t){var e=t.isMenuOpen,n=(0,p.useStaticQuery)("2328931024").site.siteMetadata.basePath,r=function(){var t=(0,p.useStaticQuery)("1954253342"),e=t.site.siteMetadata.basePath,n=t.allSidebarItems.edges;if(e){var r=n.map((function(t){var n=t.node,r=n.label,o=n.link,i=n.items,a=n.id;return Array.isArray(i)&&(i=i.map((function(t){return{label:t.label,link:(0,d.resolveLink)(t.link,e)}}))),{node:{id:a,label:r,items:i,link:(0,d.resolveLink)(o,e)}}}));return r}return n}();function i(t,e){return(0,b.isExternalUrl)(t)?(0,o.tZ)(O,{link:t,label:e}):(0,o.tZ)(T,{link:t,label:e})}return(0,o.tZ)(h,{isMenuOpen:e},(0,o.tZ)(m,null,(0,o.tZ)(p.Link,{to:n,"aria-label":"Go to home page"},(0,o.tZ)(_,{"aria-hidden":"true"}))),(0,o.tZ)("nav",null,(0,o.tZ)(y,null,r.map((function(t){var e=t.node,n=e.label,r=e.link,a=e.items,u=e.id;if(Array.isArray(a)){var c=a.map((function(t){return(0,o.tZ)(v,{key:t.link},i(t.link,t.label))}));return(0,o.tZ)(E,{key:u,text:n},c)}return(0,o.tZ)(v,{key:u},i(r,n))})))))}var C=n(60782);var k=(0,c.Z)("header",{target:"esnpb7p0"})({name:"1p24zom",styles:"display:flex;justify-content:flex-start;align-items:center;height:40px;margin-bottom:24px;h2{margin:0;border:none;padding:0;font-size:18px;@media (max-width: 359px){font-size:14px;}}button{border:none;background:none;cursor:pointer;margin-right:16px;display:flex;justify-content:flex-start;align-items:center;}@media (min-width: 780px){display:none;}"});function j(t){var e=t.handleMenuOpen,n=(0,p.useStaticQuery)("973074209").site.siteMetadata.siteTitle;return(0,o.tZ)(k,null,(0,o.tZ)("button",{"aria-label":"Open sidebar",type:"button",onClick:e},(0,o.tZ)(C.vHB,{size:23,"aria-hidden":"true"})),(0,o.tZ)("h2",null,n))}var Z=n(87462),P=n(63366),L=["isMenuOpen"];function M(t){var e=t.isMenuOpen,n=(0,P.Z)(t,L);return(0,o.tZ)("div",(0,Z.Z)({css:(0,o.iv)("::after{content:'';position:fixed;width:100%;height:100%;left:0;right:0;bottom:0;background-color:rgba(0, 0, 0, 0.8);z-index:999;display:",e?"block":"none",";}",""),"aria-label":"Close menu"},n))}M.defaultProps={isMenuOpen:!1};var I=(0,c.Z)("div",{target:"eees1d52"})({name:"1kjnnqm",styles:"width:100%;max-width:1400px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:280px calc(100% - 320px);grid-auto-flow:row;grid-gap:40px;@media (max-width: 780px){padding:24px;grid-template-columns:100%;}"}),N=(0,c.Z)("main",{target:"eees1d51"})({name:"u8hwp7",styles:"height:100%;padding-top:36px;width:100%;display:flex;justify-content:flex-start;position:relative;@media (max-width: 1200px){flex-direction:column;}@media (max-width: 780px){padding-top:0;}"}),R=(0,c.Z)("div",{target:"eees1d50"})({name:"1h97cat",styles:"width:100%;max-width:calc(75% - 64px);padding-right:64px;@media (max-width: 1200px){max-width:100%;padding-right:0;order:3;}h1,h2,h3,h4,h5,h6{overflow-wrap:break-word;}"});var z={name:"1fdmakl",styles:"@media (max-width: 1200px){display:none;}"},B={name:"1j7nlw4",styles:"display:none;@media (max-width: 1200px){display:block;}"};function D(t){var e=t.children,n=t.disableTableOfContents,i=t.title,a=t.headings,u=(0,r.useRef)(null),c=(0,r.useState)(!1),l=c[0],s=c[1],p=!0===n||!a||0===a.length,d=function(){s(!l)};return(0,o.tZ)(r.Fragment,null,(0,o.tZ)(M,{isMenuOpen:l,onClick:d}),(0,o.tZ)(I,null,(0,o.tZ)(A,{isMenuOpen:l}),(0,o.tZ)(N,null,(0,o.tZ)(j,{handleMenuOpen:d}),i&&(0,o.tZ)("h1",{css:B},i),(0,o.tZ)(R,{ref:u},i&&(0,o.tZ)("h1",{css:z},i),e),(0,o.tZ)(f,{headings:a,disableTOC:p,contentRef:u}))))}D.defaultProps={disableTableOfContents:!1,title:"",headings:null}},49035:function(t,e,n){"use strict";n.d(e,{Z:function(){return xt}});var r,o,i,a,u=n(67294),c=n(45697),l=n.n(c),s=n(24839),f=n.n(s),p=n(32993),d=n.n(p),h=n(46494),m=n.n(h),y="bodyAttributes",g="htmlAttributes",v="titleAttributes",w={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},b=(Object.keys(w).map((function(t){return w[t]})),"charset"),x="cssText",O="href",T="http-equiv",S="innerHTML",_="itemprop",E="name",A="property",C="rel",k="src",j="target",Z={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},P="defaultTitle",L="defer",M="encodeSpecialCharacters",I="onChangeClientState",N="titleTemplate",R=Object.keys(Z).reduce((function(t,e){return t[Z[e]]=e,t}),{}),z=[w.NOSCRIPT,w.SCRIPT,w.STYLE],B="data-react-helmet",D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},F=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},q=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),H=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},U=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},Y=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},$=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===e?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},W=function(t){var e=X(t,w.TITLE),n=X(t,N);if(n&&e)return n.replace(/%s/g,(function(){return Array.isArray(e)?e.join(""):e}));var r=X(t,P);return e||r||void 0},K=function(t){return X(t,I)||function(){}},G=function(t,e){return e.filter((function(e){return void 0!==e[t]})).map((function(e){return e[t]})).reduce((function(t,e){return H({},t,e)}),{})},Q=function(t,e){return e.filter((function(t){return void 0!==t[w.BASE]})).map((function(t){return t[w.BASE]})).reverse().reduce((function(e,n){if(!e.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o].toLowerCase();if(-1!==t.indexOf(i)&&n[i])return e.concat(n)}return e}),[])},V=function(t,e,n){var r={};return n.filter((function(e){return!!Array.isArray(e[t])||(void 0!==e[t]&&rt("Helmet: "+t+' should be of type "Array". Instead found type "'+D(e[t])+'"'),!1)})).map((function(e){return e[t]})).reverse().reduce((function(t,n){var o={};n.filter((function(t){for(var n=void 0,i=Object.keys(t),a=0;a<i.length;a++){var u=i[a],c=u.toLowerCase();-1===e.indexOf(c)||n===C&&"canonical"===t[n].toLowerCase()||c===C&&"stylesheet"===t[c].toLowerCase()||(n=c),-1===e.indexOf(u)||u!==S&&u!==x&&u!==_||(n=u)}if(!n||!t[n])return!1;var l=t[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][l]&&(o[n][l]=!0,!0)})).reverse().forEach((function(e){return t.push(e)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var u=i[a],c=m()({},r[u],o[u]);r[u]=c}return t}),[]).reverse()},X=function(t,e){for(var n=t.length-1;n>=0;n--){var r=t[n];if(r.hasOwnProperty(e))return r[e]}return null},J=(r=Date.now(),function(t){var e=Date.now();e-r>16?(r=e,t(e)):setTimeout((function(){J(t)}),0)}),tt=function(t){return clearTimeout(t)},et="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||J:n.g.requestAnimationFrame||J,nt="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||tt:n.g.cancelAnimationFrame||tt,rt=function(t){return console&&"function"==typeof console.warn&&console.warn(t)},ot=null,it=function(t,e){var n=t.baseTag,r=t.bodyAttributes,o=t.htmlAttributes,i=t.linkTags,a=t.metaTags,u=t.noscriptTags,c=t.onChangeClientState,l=t.scriptTags,s=t.styleTags,f=t.title,p=t.titleAttributes;ct(w.BODY,r),ct(w.HTML,o),ut(f,p);var d={baseTag:lt(w.BASE,n),linkTags:lt(w.LINK,i),metaTags:lt(w.META,a),noscriptTags:lt(w.NOSCRIPT,u),scriptTags:lt(w.SCRIPT,l),styleTags:lt(w.STYLE,s)},h={},m={};Object.keys(d).forEach((function(t){var e=d[t],n=e.newTags,r=e.oldTags;n.length&&(h[t]=n),r.length&&(m[t]=d[t].oldTags)})),e&&e(),c(t,h,m)},at=function(t){return Array.isArray(t)?t.join(""):t},ut=function(t,e){void 0!==t&&document.title!==t&&(document.title=at(t)),ct(w.TITLE,e)},ct=function(t,e){var n=document.getElementsByTagName(t)[0];if(n){for(var r=n.getAttribute(B),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(e),u=0;u<a.length;u++){var c=a[u],l=e[c]||"";n.getAttribute(c)!==l&&n.setAttribute(c,l),-1===o.indexOf(c)&&o.push(c);var s=i.indexOf(c);-1!==s&&i.splice(s,1)}for(var f=i.length-1;f>=0;f--)n.removeAttribute(i[f]);o.length===i.length?n.removeAttribute(B):n.getAttribute(B)!==a.join(",")&&n.setAttribute(B,a.join(","))}},lt=function(t,e){var n=document.head||document.querySelector(w.HEAD),r=n.querySelectorAll(t+"["+"data-react-helmet]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return e&&e.length&&e.forEach((function(e){var n=document.createElement(t);for(var r in e)if(e.hasOwnProperty(r))if(r===S)n.innerHTML=e.innerHTML;else if(r===x)n.styleSheet?n.styleSheet.cssText=e.cssText:n.appendChild(document.createTextNode(e.cssText));else{var u=void 0===e[r]?"":e[r];n.setAttribute(r,u)}n.setAttribute(B,"true"),o.some((function(t,e){return a=e,n.isEqualNode(t)}))?o.splice(a,1):i.push(n)})),o.forEach((function(t){return t.parentNode.removeChild(t)})),i.forEach((function(t){return n.appendChild(t)})),{oldTags:o,newTags:i}},st=function(t){return Object.keys(t).reduce((function(e,n){var r=void 0!==t[n]?n+'="'+t[n]+'"':""+n;return e?e+" "+r:r}),"")},ft=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[Z[n]||n]=t[n],e}),e)},pt=function(t,e,n){switch(t){case w.TITLE:return{toComponent:function(){return t=e.title,n=e.titleAttributes,(r={key:t})[B]=!0,o=ft(n,r),[u.createElement(w.TITLE,o,t)];var t,n,r,o},toString:function(){return function(t,e,n,r){var o=st(n),i=at(e);return o?"<"+t+' data-react-helmet="true" '+o+">"+$(i,r)+"</"+t+">":"<"+t+' data-react-helmet="true">'+$(i,r)+"</"+t+">"}(t,e.title,e.titleAttributes,n)}};case y:case g:return{toComponent:function(){return ft(e)},toString:function(){return st(e)}};default:return{toComponent:function(){return function(t,e){return e.map((function(e,n){var r,o=((r={key:n})[B]=!0,r);return Object.keys(e).forEach((function(t){var n=Z[t]||t;if(n===S||n===x){var r=e.innerHTML||e.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=e[t]})),u.createElement(t,o)}))}(t,e)},toString:function(){return function(t,e,n){return e.reduce((function(e,r){var o=Object.keys(r).filter((function(t){return!(t===S||t===x)})).reduce((function(t,e){var o=void 0===r[e]?e:e+'="'+$(r[e],n)+'"';return t?t+" "+o:o}),""),i=r.innerHTML||r.cssText||"",a=-1===z.indexOf(t);return e+"<"+t+' data-react-helmet="true" '+o+(a?"/>":">"+i+"</"+t+">")}),"")}(t,e,n)}}}},dt=function(t){var e=t.baseTag,n=t.bodyAttributes,r=t.encode,o=t.htmlAttributes,i=t.linkTags,a=t.metaTags,u=t.noscriptTags,c=t.scriptTags,l=t.styleTags,s=t.title,f=void 0===s?"":s,p=t.titleAttributes;return{base:pt(w.BASE,e,r),bodyAttributes:pt(y,n,r),htmlAttributes:pt(g,o,r),link:pt(w.LINK,i,r),meta:pt(w.META,a,r),noscript:pt(w.NOSCRIPT,u,r),script:pt(w.SCRIPT,c,r),style:pt(w.STYLE,l,r),title:pt(w.TITLE,{title:f,titleAttributes:p},r)}},ht=f()((function(t){return{baseTag:Q([O,j],t),bodyAttributes:G(y,t),defer:X(t,L),encode:X(t,M),htmlAttributes:G(g,t),linkTags:V(w.LINK,[C,O],t),metaTags:V(w.META,[E,b,T,A,_],t),noscriptTags:V(w.NOSCRIPT,[S],t),onChangeClientState:K(t),scriptTags:V(w.SCRIPT,[k,S],t),styleTags:V(w.STYLE,[x],t),title:W(t),titleAttributes:G(v,t)}}),(function(t){ot&&nt(ot),t.defer?ot=et((function(){it(t,(function(){ot=null}))})):(it(t),ot=null)}),dt)((function(){return null})),mt=(o=ht,a=i=function(t){function e(){return F(this,e),Y(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.shouldComponentUpdate=function(t){return!d()(this.props,t)},e.prototype.mapNestedChildrenToProps=function(t,e){if(!e)return null;switch(t.type){case w.SCRIPT:case w.NOSCRIPT:return{innerHTML:e};case w.STYLE:return{cssText:e}}throw new Error("<"+t.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},e.prototype.flattenArrayTypeChildren=function(t){var e,n=t.child,r=t.arrayTypeChildren,o=t.newChildProps,i=t.nestedChildren;return H({},r,((e={})[n.type]=[].concat(r[n.type]||[],[H({},o,this.mapNestedChildrenToProps(n,i))]),e))},e.prototype.mapObjectTypeChildren=function(t){var e,n,r=t.child,o=t.newProps,i=t.newChildProps,a=t.nestedChildren;switch(r.type){case w.TITLE:return H({},o,((e={})[r.type]=a,e.titleAttributes=H({},i),e));case w.BODY:return H({},o,{bodyAttributes:H({},i)});case w.HTML:return H({},o,{htmlAttributes:H({},i)})}return H({},o,((n={})[r.type]=H({},i),n))},e.prototype.mapArrayTypeChildrenToProps=function(t,e){var n=H({},e);return Object.keys(t).forEach((function(e){var r;n=H({},n,((r={})[e]=t[e],r))})),n},e.prototype.warnOnInvalidChildren=function(t,e){return!0},e.prototype.mapChildrenToProps=function(t,e){var n=this,r={};return u.Children.forEach(t,(function(t){if(t&&t.props){var o=t.props,i=o.children,a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[R[n]||n]=t[n],e}),e)}(U(o,["children"]));switch(n.warnOnInvalidChildren(t,i),t.type){case w.LINK:case w.META:case w.NOSCRIPT:case w.SCRIPT:case w.STYLE:r=n.flattenArrayTypeChildren({child:t,arrayTypeChildren:r,newChildProps:a,nestedChildren:i});break;default:e=n.mapObjectTypeChildren({child:t,newProps:e,newChildProps:a,nestedChildren:i})}}})),e=this.mapArrayTypeChildrenToProps(r,e)},e.prototype.render=function(){var t=this.props,e=t.children,n=U(t,["children"]),r=H({},n);return e&&(r=this.mapChildrenToProps(e,r)),u.createElement(o,r)},q(e,null,[{key:"canUseDOM",set:function(t){o.canUseDOM=t}}]),e}(u.Component),i.propTypes={base:l().object,bodyAttributes:l().object,children:l().oneOfType([l().arrayOf(l().node),l().node]),defaultTitle:l().string,defer:l().bool,encodeSpecialCharacters:l().bool,htmlAttributes:l().object,link:l().arrayOf(l().object),meta:l().arrayOf(l().object),noscript:l().arrayOf(l().object),onChangeClientState:l().func,script:l().arrayOf(l().object),style:l().arrayOf(l().object),title:l().string,titleAttributes:l().object,titleTemplate:l().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var t=o.rewind();return t||(t=dt({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},a);mt.renderStatic=mt.rewind;var yt=mt,gt=n(58594),vt=n.n(gt),wt=n(25444),bt=n(23431);function xt(t){var e=t.description,n=t.title,r=t.slug,o=t.image,i=t.children,a=(0,wt.useStaticQuery)("2501019404").site.siteMetadata,u=a.siteTitle,c=a.siteTitleShort,l=a.siteUrl,s=a.defaultTitle,f=a.siteImage,p=a.siteDescription,d=a.siteLanguage,h=a.siteAuthor,m=a.siteIcon,y=n?n+" | "+u:s,g=vt()(l,r),v=vt()(l,o||f),w=e||p,b=[{"@context":"http://schema.org","@type":"WebSite",url:g,name:n,alternateName:c}];return(0,bt.tZ)(yt,{htmlAttributes:{lang:d},title:y},m&&(0,bt.tZ)("link",{rel:"icon",href:m}),(0,bt.tZ)("meta",{name:"description",content:w}),(0,bt.tZ)("meta",{name:"image",content:v}),(0,bt.tZ)("meta",{httpEquiv:"x-ua-compatible",content:"IE=edge,chrome=1"}),(0,bt.tZ)("meta",{name:"MobileOptimized",content:"320"}),(0,bt.tZ)("meta",{name:"HandheldFriendly",content:"True"}),(0,bt.tZ)("meta",{name:"google",content:"notranslate"}),(0,bt.tZ)("meta",{name:"referrer",content:"no-referrer-when-downgrade"}),(0,bt.tZ)("meta",{property:"og:url",content:g}),(0,bt.tZ)("meta",{property:"og:type",content:"website"}),(0,bt.tZ)("meta",{property:"og:title",content:y}),(0,bt.tZ)("meta",{property:"og:description",content:w}),(0,bt.tZ)("meta",{property:"og:locale",content:d}),(0,bt.tZ)("meta",{property:"og:site_name",content:u}),(0,bt.tZ)("meta",{property:"og:image",content:v}),(0,bt.tZ)("meta",{property:"og:image:secure_url",content:v}),(0,bt.tZ)("meta",{property:"og:image:alt",content:"Banner"}),(0,bt.tZ)("meta",{property:"og:image:type",content:"image/png"}),(0,bt.tZ)("meta",{property:"og:image:width",content:"1200"}),(0,bt.tZ)("meta",{property:"og:image:height",content:"630"}),(0,bt.tZ)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,bt.tZ)("meta",{name:"twitter:title",content:y}),(0,bt.tZ)("meta",{name:"twitter:site",content:h}),(0,bt.tZ)("meta",{name:"twitter:creator",content:h}),(0,bt.tZ)("meta",{name:"twitter:image",content:v}),(0,bt.tZ)("meta",{name:"twitter:image:src",content:v}),(0,bt.tZ)("meta",{name:"twitter:image:alt",content:"Banner"}),(0,bt.tZ)("meta",{name:"twitter:image:width",content:"1200"}),(0,bt.tZ)("meta",{name:"twitter:image:height",content:"630"}),(0,bt.tZ)("script",{type:"application/ld+json"},JSON.stringify(b)),i)}xt.defaultProps={title:"",description:"",slug:"",image:"",children:""}},15648:function(t){t.exports={isExternalUrl:function(t){return/^((https?:)?\/\/)/i.test(t)}}}}]);
//# sourceMappingURL=a7629950cb7a18c7593baf47d0acfe798f1cddc4-72066251f04050af0537.js.map