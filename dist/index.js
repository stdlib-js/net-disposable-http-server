"use strict";var v=function(r,t){return function(){return t||r((t={exports:{}}).exports,t),t.exports}};var y=v(function(ce,j){
var b=require('@stdlib/assert-is-buffer/dist'),U=require('@stdlib/assert-is-boolean/dist').isPrimitive,S=require('@stdlib/assert-is-string/dist').isPrimitive,z=require('@stdlib/assert-is-plain-object/dist'),f=require('@stdlib/assert-has-own-property/dist'),c=require('@stdlib/error-tools-fmtprodmsg/dist');function G(r,t){return z(t)?f(t,"html")&&(r.html=t.html,!b(r.html)&&!S(r.html))?new TypeError(c('0kL5v',"html",r.html)):f(t,"javascript")&&(r.javascript=t.javascript,!b(r.javascript)&&!S(r.javascript))?new TypeError(c('0kL5v',"javascript",r.javascript)):f(t,"open")&&(r.open=t.open,!U(r.open))?new TypeError(c('0kL2o',"open",r.open)):null:new TypeError(c('0kL2V',t));}j.exports=G
});var x=v(function(le,C){
var l=require('@stdlib/assert-has-own-property/dist');function I(r){var t={};return l(r,"port")&&(t.port=r.port),l(r,"maxport")&&(t.maxport=r.maxport),l(r,"hostname")&&(t.hostname=r.hostname),l(r,"address")&&(t.address=r.address),t}C.exports=I
});var L=v(function(de,T){
function Q(){return{}}T.exports=Q
});var B=v(function(fe,k){
var W=require("path"),X=require("debug"),Y=require('@stdlib/utils-keys/dist'),Z=require('@stdlib/net-http-server/dist'),$=require('@stdlib/fs-read-file/dist').sync,w=require('@stdlib/assert-is-string/dist').isPrimitive,ee=require('@stdlib/assert-is-function/dist'),re=require('@stdlib/utils-open-url/dist'),te=require('@stdlib/utils-noop/dist'),H=require('@stdlib/buffer-ctor/dist'),O=require('@stdlib/buffer-from-string/dist'),P=require('@stdlib/utils-next-tick/dist'),ne=require('@stdlib/error-tools-fmtprodmsg/dist'),ie=y(),ae=x(),oe=L(),a=X("disposable-http-server");function ue(r){var t,m,u,h,p,s,g,i,d;if(i={},arguments.length>1){if(s=arguments[1],!ee(s))throw new TypeError(ne('0kL2b',s))}else s=te;if(d=ie(i,r),d)throw d;i.html&&w(i.html)&&(i.html=O(i.html)),i.javascript&&w(i.javascript)&&(i.javascript=O(i.javascript)),h=ae(r),a("Serving provided content."),i.html||(a("No HTML content provided."),a("Loading a boilerplate HTML page..."),p=W.resolve(__dirname,"../static/index.html"),i.html=$(p)),g=Z(h,M),a("Starting server..."),g(E),t=oe();function E(n,e){var o;if(n)throw n;a("Server started."),u=e,u.on("connection",F),u.once("close",A),i.open&&(o=u.address(),re("http://"+o.address+":"+o.port)),s(null,u)}function F(n){var e=n.remoteAddress+":"+n.remotePort;a("Received a socket connection: %s.",e),t[e]=n,n.on("close",o);function o(){a("Socket connection closed: %s.",e),delete t[e]}}function M(n,e){if(a("Received a request for %s",n.url),m)return D(n,e);if(n.url==="/bundle.js")return P(o(V)),e.once("finish",q);if(n.url!=="/"&&n.url!=="/index.html")return R(n,e);P(o(J)),i.javascript||e.once("finish",q);function o(K){return N;function N(){K(n,e)}}}function R(n,e){a("Sending 404 response..."),e.statusCode=404,e.end()}function D(n,e){a("Sending 503 response..."),e.statusCode=503,e.end()}function J(n,e){a("Sending HTML..."),e.statusCode=200,e.setHeader("Content-Type","text/html"),e.setHeader("Content-Length",H.byteLength(i.html.toString())),e.end(i.html)}function V(n,e){a("Sending JavaScript..."),e.statusCode=200,e.setHeader("Content-Type","text/javascript"),e.setHeader("Content-Length",H.byteLength(i.javascript.toString())),e.end(i.javascript)}function q(){a("Finished serving content."),m=!0,a("Closing the server..."),u.close(),setTimeout(_,5e3)}function _(){var n,e;for(a("Destroying all connections..."),n=Y(t),e=0;e<n.length;e++)a("Destroying connection %s...",n[e]),t[n[e]].destroy()}function A(){a("Server closed.")}}k.exports=ue
});var se=B();module.exports=se;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map