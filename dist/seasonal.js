require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({6:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});let t=function(t,e){this.start=t,this.end=e};t.prototype.contains=function(t){return this.start.getTime()<t.getTime()&&this.end.getTime()>t.getTime()},t.prototype.toString=function(){return"("+this.start.toDateString()+", "+this.end.toDateString()+")"},exports.default=t;
},{}],3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./period"),e=r(t);function r(t){return t&&t.__esModule?t:{default:t}}let o=function(t,r,o,n){this.constructor=e.default,this.periods=Array.isArray(n)?n:[new e.default(r,o)],this.name=t,this.constructor(r,o)};o.prototype.count=function(){return this.periods.length},o.prototype.periods=function(){return this.periods},o.prototype.split=function(t){if(t.constructor!==Date)throw new TypeError("Must be of type Date");let r,o=this.periods[Symbol.iterator](),n=o.next(),i=1;for(;!n.done;){if((r=n.value).contains(t)){let o=new e.default(t,r.end);r.end=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1),this.periods.splice(i,0,o)}i++,n=o.next()}},o.prototype.unsplit=function(){},o.prototype.toString=function(){var t="";return this.periods.forEach(function(e){t+=e.toString()}),t},exports.default=o;
},{"./period":6}],7:[function(require,module,exports) {
"use strict";function e(e,t){var n=new Date(t.getTime()),i=new Date(e.getTime());this.value=function(){return i},this.next=function(){i=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1)},this.valid=function(){return i.getTime()<=n.getTime()}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./rangeDateIterator"),e=n(t);function n(t){return t&&t.__esModule?t:{default:t}}function a(t,n){var a=t,r=Object.assign({},{root_element:"timeline"},n);function i(t){var e=document.createElement("div");e.setAttribute("data-month",t.value().getMonth()),e.setAttribute("class","month");var n=document.createElement("p");return n.textContent=t.value().toLocaleString("it",{month:"long"}),e.appendChild(n),e}this.render=function(){!function(){var t,n,o=new e.default(a.start,a.end),u=document.getElementById(r.root_element);for(;o.valid();){var l=o.value(),d=document.createElement("span");t!=o.value().getMonth()&&(t=o.value().getMonth(),n=i(o),u.appendChild(n)),d.textContent=l.getDate(),d.addEventListener("click",function(t){a.split(new Date(Number(this.getAttribute("data-time")))),this.className="split"}),d.setAttribute("data-date",l.getFullYear()+"_"+l.getMonth()+"_"+l.getDate()),d.setAttribute("data-time",l.getTime()),d.setAttribute("date-month",l.getMonth()),n.appendChild(d),o.next()}}()}}exports.default=a;
},{"./rangeDateIterator":7}],2:[function(require,module,exports) {

},{}],1:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeasonRender=exports.Season=void 0;var e=require("./season"),s=n(e),r=require("./seasonRender"),o=n(r);function n(e){return e&&e.__esModule?e:{default:e}}require("../scss/seasonal.scss"),exports.Season=s.default,exports.SeasonRender=o.default;
},{"./season":3,"./seasonRender":5,"../scss/seasonal.scss":2}]},{},[1])