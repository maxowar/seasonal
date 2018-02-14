require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});let t=function(t,e){this.start=t,this.end=e};t.prototype.contains=function(t){return this.start.getTime()<t.getTime()&&this.end.getTime()>t.getTime()},t.prototype.toString=function(){return"("+this.start.toDateString()+", "+this.end.toDateString()+")"},exports.default=t;
},{}],4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./period"),t=i(e);function i(e){return e&&e.__esModule?e:{default:e}}let n=function(e,i,n,r){this.constructor=t.default,this.periods=Array.isArray(r)?r:[new t.default(i,n)],this.index={},this.name=e,this.constructor(i,n),this.mergePeriods=function(e,i){return new t.default(e.start,i.end)},this.findPeriod=function(e){let t=this.periods[Symbol.iterator](),i=t.next();for(;!i.done;){if(i.value.contains(e))return i.value;i=t.next()}},this.buildIndex=function(){var e;for(e=0;e<this.periods.length;e++)this.index[this.periods[e].end.getTime()]={index:e,period:this.periods[e]}},this.buildIndex()};n.prototype.count=function(){return this.periods.length},n.prototype.periods=function(){return this.periods},n.prototype.split=function(e){if(e.constructor!==Date)throw new TypeError("Must be of type Date");let i,n=this.periods[Symbol.iterator](),r=n.next(),o=1;for(;!r.done;){if((i=r.value).contains(e)){let n=new t.default(new Date(e.getFullYear(),e.getMonth(),e.getDate()+1),i.end);i.end=e,this.periods.splice(o,0,n),this.buildIndex()}o++,r=n.next()}},n.prototype.unsplit=function(e){if(void 0!==this.index[e.getTime()]){let t=this.index[e.getTime()];t.period.end=this.periods[t.index+1].end,this.periods.splice(t.index+1,1),this.buildIndex()}},n.prototype.toString=function(){var e="";return this.periods.forEach(function(t){e+=t.toString()+"<br>"}),e},exports.default=n;
},{"./period":9}],8:[function(require,module,exports) {
"use strict";function e(e,t){var n=new Date(t.getTime()),i=new Date(e.getTime());this.value=function(){return i},this.next=function(){i=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1)},this.valid=function(){return i.getTime()<=n.getTime()}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./rangeDateIterator"),e=n(t);function n(t){return t&&t.__esModule?t:{default:t}}function a(t,n){var a=t,i=Object.assign({},{root_element:"timeline"},n);function r(t){var e=document.createElement("div");e.setAttribute("data-month",t.value().getMonth()),e.setAttribute("class","month");var n=document.createElement("p");return n.textContent=t.value().toLocaleString("it",{month:"long"}),e.appendChild(n),e}function l(t){t.target.removeEventListener("click",l),t.target.addEventListener("click",s),a.split(new Date(Number(this.getAttribute("data-time")))),this.className="split"}function s(t){this.removeEventListener("click",s),this.addEventListener("click",l),a.unsplit(new Date(Number(this.getAttribute("data-time")))),this.className=""}this.render=function(){!function(){var t,n,o=new e.default(a.start,a.end),d=document.getElementById(i.root_element);for(;o.valid();){var u=o.value(),c=document.createElement("span");t!=o.value().getMonth()&&(t=o.value().getMonth(),n=r(o),d.appendChild(n)),c.textContent=u.getDate(),void 0!==a.index[u.getTime()]?(c.addEventListener("click",s),c.className="split"):c.addEventListener("click",l),c.setAttribute("data-date",u.getFullYear()+"_"+u.getMonth()+"_"+u.getDate()),c.setAttribute("data-time",u.getTime()),c.setAttribute("date-month",u.getMonth()),n.appendChild(c),o.next()}}()}}exports.default=a;
},{"./rangeDateIterator":8}],2:[function(require,module,exports) {

},{}],1:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeasonRender=exports.Season=void 0;var e=require("./season"),s=n(e),r=require("./seasonRender"),o=n(r);function n(e){return e&&e.__esModule?e:{default:e}}require("../scss/seasonal.scss"),exports.Season=s.default,exports.SeasonRender=o.default;
},{"./season":4,"./seasonRender":3,"../scss/seasonal.scss":2}]},{},[1])