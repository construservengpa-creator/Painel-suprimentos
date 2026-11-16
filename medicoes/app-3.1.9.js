/* CAP-Refeições 3.1.9 — programa e conexão com o servidor (as bibliotecas de PDF e QR ficam em pdf-3.1.9.js e qr-3.1.9.js) */
/* o sistema não deve ser aberto dentro de outra página (proteção contra cliques induzidos) */
if(window.top!==window.self){try{window.top.location=window.self.location}catch(e){}document.documentElement.style.display='none'}

/* ===== supabase-js 2.117.2 ===== */
var supabase=(function(e){function t(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function n(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}let r=e=>e?(...t)=>e(...t):(...e)=>fetch(...e);var i=class extends Error{constructor(e,t=`FunctionsError`,n){super(e),this.name=t,this.context=n}toJSON(){return{name:this.name,message:this.message,context:this.context}}},a=class extends i{constructor(e){super(`Failed to send a request to the Edge Function`,`FunctionsFetchError`,e)}},o=class extends i{constructor(e){super(`Relay Error invoking the Edge Function`,`FunctionsRelayError`,e)}},s=class extends i{constructor(e){super(`Edge Function returned a non-2xx status code`,`FunctionsHttpError`,e)}},c;(function(e){e.Any=`any`,e.ApNortheast1=`ap-northeast-1`,e.ApNortheast2=`ap-northeast-2`,e.ApSouth1=`ap-south-1`,e.ApSoutheast1=`ap-southeast-1`,e.ApSoutheast2=`ap-southeast-2`,e.CaCentral1=`ca-central-1`,e.EuCentral1=`eu-central-1`,e.EuWest1=`eu-west-1`,e.EuWest2=`eu-west-2`,e.EuWest3=`eu-west-3`,e.SaEast1=`sa-east-1`,e.UsEast1=`us-east-1`,e.UsWest1=`us-west-1`,e.UsWest2=`us-west-2`})(c||={});var l=class{constructor(e,{headers:t={},customFetch:n,region:i=c.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=r(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return n(this,arguments,void 0,function*(e,t={}){var n;let r,i,c;try{let{headers:n,method:l,body:u,signal:d,timeout:f}=t,p={},{region:m}=t;m||=this.region;let h=new URL(`${this.url}/${e}`);m&&m!==`any`&&(p[`x-region`]=m,h.searchParams.set(`forceFunctionRegion`,m));let g,ee=!!n&&Object.keys(n).some(e=>e.toLowerCase()===`content-type`);u&&!ee?typeof Blob<`u`&&u instanceof Blob||u instanceof ArrayBuffer?(p[`Content-Type`]=`application/octet-stream`,g=u):typeof u==`string`?(p[`Content-Type`]=`text/plain`,g=u):typeof FormData<`u`&&u instanceof FormData?g=u:(p[`Content-Type`]=`application/json`,g=JSON.stringify(u)):g=u&&typeof u!=`string`&&!(typeof Blob<`u`&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<`u`&&u instanceof FormData)?JSON.stringify(u):u;let te=d;f&&(i=new AbortController,r=setTimeout(()=>i.abort(),f),d?(te=i.signal,c=()=>i.abort(),d.addEventListener(`abort`,c)):te=i.signal);let _=yield this.fetch(h.toString(),{method:l||`POST`,headers:Object.assign(Object.assign(Object.assign({},p),this.headers),n),body:g,signal:te}).catch(e=>{throw new a(e)}),ne=_.headers.get(`x-relay-error`);if(ne&&ne===`true`)throw new o(_);if(!_.ok)throw new s(_);let re=(_.headers.get(`Content-Type`)??`text/plain`).split(`;`)[0].trim().toLowerCase(),ie;return ie=re===`application/json`?yield _.json():re===`application/octet-stream`||re===`application/pdf`?yield _.blob():re===`text/event-stream`?_:re===`multipart/form-data`?yield _.formData():yield _.text(),{data:ie,error:null,response:_}}catch(e){return{data:null,error:e,response:e instanceof s||e instanceof o?e.context:void 0}}finally{r&&clearTimeout(r),c&&((n=t.signal)==null||n.removeEventListener(`abort`,c))}})}},u=class extends Error{constructor(e){super(e.message),this.name=`PostgrestError`,this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};let d=e=>Math.min(1e3*2**e,3e4),f=[520,503],p=[`GET`,`HEAD`,`OPTIONS`];function m(e){"@babel/helpers - typeof";return m=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},m(e)}function h(e,t){if(m(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(m(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function g(e){var t=h(e,`string`);return m(t)==`symbol`?t:t+``}function ee(e,t,n){return(t=g(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function te(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?te(Object(n),!0).forEach(function(t){ee(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):te(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ne(e,t){return new Promise(n=>{if(t?.aborted){n();return}let r=setTimeout(()=>{t?.removeEventListener(`abort`,i),n()},e);function i(){clearTimeout(r),n()}t?.addEventListener(`abort`,i)})}function re(e,t,n,r){return!(!r||n>=3||!p.includes(e)||!f.includes(t))}async function ie(e,t,n,r){let i=0;for(;;){let a=_({},n.headers);i>0&&(a[`X-Retry-Count`]=String(i));let o;try{o=await e(t,{method:n.method,headers:a,body:n.body,signal:n.signal})}catch(e){if(e?.name===`AbortError`||e?.code===`ABORT_ERR`||!p.includes(n.method))throw e;if(r&&i<3){let e=d(i);i++,await ne(e,n.signal);continue}throw e}if(re(n.method,o.status,i,r)){let e=o.headers?.get(`Retry-After`)??null,t=e===null?d(i):Math.max(0,parseInt(e,10)||0)*1e3;await o.text(),i++,await ne(t,n.signal);continue}return o}}var ae=class{constructor(e){this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError??!1,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle??!1,this.shouldStripNulls=e.shouldStripNulls??!1,this.urlLengthLimit=e.urlLengthLimit??8e3,this.retryEnabled=e.retry??!0,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get(`Accept`)===`text/csv`)throw Error(`stripNulls() cannot be used with csv()`);return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var n=this;if(this.schema===void 0||([`GET`,`HEAD`].includes(this.method)?this.headers.set(`Accept-Profile`,this.schema):this.headers.set(`Content-Profile`,this.schema)),this.method!==`GET`&&this.method!==`HEAD`&&this.headers.set(`Content-Type`,`application/json`),this.shouldStripNulls){let e=this.headers.get(`Accept`);e===`application/vnd.pgrst.object+json`?this.headers.set(`Accept`,`application/vnd.pgrst.object+json;nulls=stripped`):(!e||e===`application/json`)&&this.headers.set(`Accept`,`application/vnd.pgrst.array+json;nulls=stripped`)}let r=this.fetch,i=(async()=>{let e={};n.headers.forEach((t,n)=>{e[n]=t});let t=await ie(r,n.url.toString(),{method:n.method,headers:e,body:JSON.stringify(n.body,(e,t)=>typeof t==`bigint`?t.toString():t),signal:n.signal},n.retryEnabled);return await n.processResponse(t)})();return this.shouldThrowOnError||(i=i.catch(e=>{let t=``,n=``,r=``,i=e?.cause;if(i){let n=i?.message??``,r=i?.code??``;t=`${e?.name??`FetchError`}: ${e?.message}`,t+=`\n\nCaused by: ${i?.name??`Error`}: ${n}`,r&&(t+=` (${r})`),i?.stack&&(t+=`\n${i.stack}`)}else t=e?.stack??``;let a=this.url.toString().length;return e?.name===`AbortError`||e?.code===`ABORT_ERR`?(r=``,n=`Request was aborted (timeout or manual cancellation)`,a>this.urlLengthLimit&&(n+=`. Note: Your request URL is ${a} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(i?.name===`HeadersOverflowError`||i?.code===`UND_ERR_HEADERS_OVERFLOW`)&&(r=``,n=`HTTP headers exceeded server limits (typically 16KB)`,a>this.urlLengthLimit&&(n+=`. Your request URL is ${a} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${e?.name??`FetchError`}: ${e?.message}`,details:t,hint:n,code:r},data:null,count:null,status:0,statusText:``}})),i.then(e,t)}async processResponse(e){var t=this;let n=null,r=null,i=null,a=e.status,o=e.statusText;if(e.ok){if(t.method!==`HEAD`){let i=await e.text();if(i!==``)if(t.headers.get(`Accept`)===`text/csv`)r=i;else if(t.headers.get(`Accept`)&&t.headers.get(`Accept`)?.includes(`application/vnd.pgrst.plan+text`))r=i;else try{r=JSON.parse(i)}catch{if(n={message:i},r=null,t.shouldThrowOnError)throw new u({message:i,details:``,hint:``,code:``})}}let s=t.headers.get(`Prefer`)?.match(/count=(exact|planned|estimated)/),c=e.headers.get(`content-range`)?.split(`/`);if(s&&c&&c.length>1&&(i=parseInt(c[1])),t.isMaybeSingle&&Array.isArray(r))if(r.length>1){if(n={code:`PGRST116`,details:`Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:`JSON object requested, multiple (or no) rows returned`},r=null,i=null,a=406,o=`Not Acceptable`,t.shouldThrowOnError)throw new u(_(_({},n),{},{hint:n.hint??``}))}else r=r.length===1?r[0]:null}else{let i=await e.text();try{n=JSON.parse(i),Array.isArray(n)&&e.status===404&&(r=[],n=null,a=200,o=`OK`)}catch{e.status===404&&i===``?(a=204,o=`No Content`):n={message:i}}if(n&&t.shouldThrowOnError)throw new u(n)}return{success:n===null,error:n,data:r,count:i,status:a,statusText:o}}returns(){return this}overrideTypes(){return this}},oe=class extends ae{throwOnError(){return super.throwOnError()}select(e){let t=!1,n=(e??`*`).split(``).map(e=>/\s/.test(e)&&!t?``:(e===`"`&&(t=!t),e)).join(``);return this.url.searchParams.set(`select`,n),this.headers.append(`Prefer`,`return=representation`),this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:r,referencedTable:i=r}={}){let a=i?`${i}.order`:`order`,o=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${o?`${o},`:``}${e}.${t?`asc`:`desc`}${n===void 0?``:n?`.nullsfirst`:`.nullslast`}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){let r=n===void 0?`limit`:`${n}.limit`;return this.url.searchParams.set(r,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:r=n}={}){let i=r===void 0?`offset`:`${r}.offset`,a=r===void 0?`limit`:`${r}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set(`Accept`,`application/vnd.pgrst.object+json`),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set(`Accept`,`text/csv`),this}geojson(){return this.headers.set(`Accept`,`application/geo+json`),this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:r=!1,wal:i=!1,format:a=`text`}={}){let o=[e?`analyze`:null,t?`verbose`:null,n?`settings`:null,r?`buffers`:null,i?`wal`:null].filter(Boolean).join(`|`),s=this.headers.get(`Accept`)??`application/json`;return this.headers.set(`Accept`,`application/vnd.pgrst.plan+${a}; for="${s}"; options=${o};`),this}rollback(){return this.headers.append(`Prefer`,`tx=rollback`),this}returns(){return this}maxAffected(e){return this.headers.append(`Prefer`,`handling=strict`),this.headers.append(`Prefer`,`max-affected=${e}`),this}};let se=RegExp(`[,()]`);var ce=class extends oe{throwOnError(){return super.throwOnError()}eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(`,`)}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(`,`)}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(`,`)}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(`,`)}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&se.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`in.(${n})`),this}notIn(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&se.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`not.in.(${n})`),this}contains(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t==`string`?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(`,`)}}`),this}textSearch(e,t,{config:n,type:r}={}){let i=``;r===`plain`?i=`pl`:r===`phrase`?i=`ph`:r===`websearch`&&(i=`w`);let a=n===void 0?``:`(${n})`;return this.url.searchParams.append(e,`${i}fts${a}.${t}`),this}match(e){return Object.entries(e).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){let r=n?`${n}.or`:`or`;return this.url.searchParams.append(r,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}},le=class{constructor(e,{headers:t={},schema:n,fetch:r,urlLengthLimit:i=8e3,retry:a}){this.url=e,this.headers=new Headers(t),this.schema=n,this.fetch=r,this.urlLengthLimit=i,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){let{head:n=!1,count:r}=t??{},i=n?`HEAD`:`GET`,a=!1,o=(e??`*`).split(``).map(e=>/\s/.test(e)&&!a?``:(e===`"`&&(a=!a),e)).join(``),{url:s,headers:c}=this.cloneRequestState();return s.searchParams.set(`select`,o),r&&c.append(`Prefer`,`count=${r}`),new ce({method:i,url:s,headers:c,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:n=!0}={}){let{url:r,headers:i}=this.cloneRequestState();if(t&&i.append(`Prefer`,`count=${t}`),n||i.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);r.searchParams.set(`columns`,e.join(`,`))}}return new ce({method:`POST`,url:r,headers:i,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:r,defaultToNull:i=!0}={}){let{url:a,headers:o}=this.cloneRequestState();if(o.append(`Prefer`,`resolution=${n?`ignore`:`merge`}-duplicates`),t!==void 0&&a.searchParams.set(`on_conflict`,t),r&&o.append(`Prefer`,`count=${r}`),i||o.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);a.searchParams.set(`columns`,e.join(`,`))}}return new ce({method:`POST`,url:a,headers:o,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){let{url:n,headers:r}=this.cloneRequestState();return t&&r.append(`Prefer`,`count=${t}`),new ce({method:`PATCH`,url:n,headers:r,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){let{url:t,headers:n}=this.cloneRequestState();return e&&n.append(`Prefer`,`count=${e}`),new ce({method:`DELETE`,url:t,headers:n,schema:this.schema,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function ue(e,t){try{let t=JSON.parse(e);if(t&&typeof t==`object`&&!Array.isArray(t))return new u({message:String(t.message??e),details:t.details??``,hint:t.hint??``,code:t.code??``})}catch{}return new u({message:e||t,details:``,hint:``,code:``})}function de(e,t,n){let r=e;return{success:!1,error:new u({message:`${r?.name??`FetchError`}: ${r?.message}`,details:``,hint:``,code:``}),data:null,count:null,status:t,statusText:n}}var fe=class e{constructor(e,{headers:t={},schema:n,fetch:r,timeout:i,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(t),this.schemaName=n,this.urlLengthLimit=a;let s=r??globalThis.fetch;i!==void 0&&i>0?this.fetch=(e,t)=>{let n=new AbortController,r=setTimeout(()=>n.abort(),i),a=t?.signal;if(a){if(a.aborted)return clearTimeout(r),s(e,t);let i=()=>{clearTimeout(r),n.abort()};return a.addEventListener(`abort`,i,{once:!0}),s(e,_(_({},t),{},{signal:n.signal})).finally(()=>{clearTimeout(r),a.removeEventListener(`abort`,i)})}return s(e,_(_({},t),{},{signal:n.signal})).finally(()=>clearTimeout(r))}:this.fetch=s,this.retry=o}from(e){if(!e||typeof e!=`string`||e.trim()===``)throw Error(`Invalid relation name: relation must be a non-empty string.`);return new le(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new e(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}async getOpenApiSpec(){var e=this;let t=new Headers(e.headers);t.set(`Accept`,`application/openapi+json`),e.schemaName&&t.set(`Accept-Profile`,e.schemaName);let n={};t.forEach((e,t)=>{n[t]=e});let r=e.fetch??globalThis.fetch,i;try{i=await ie(r,`${e.url}/`,{method:`GET`,headers:n},e.retry??!0)}catch(e){return de(e,0,``)}let a;try{a=await i.text()}catch(e){return de(e,i.status,i.statusText)}if(i.ok)try{return{success:!0,error:null,data:JSON.parse(a),count:null,status:i.status,statusText:i.statusText}}catch{}return{success:!1,error:ue(a,i.statusText),data:null,count:null,status:i.status,statusText:i.statusText}}rpc(e,t={},{head:n=!1,get:r=!1,count:i}={}){let a,o=new URL(`${this.url}/rpc/${e}`),s,c=e=>typeof e==`object`&&!!e&&(!Array.isArray(e)||e.some(c)),l=n&&Object.values(t).some(c);l?(a=`POST`,s=t):n||r?(a=n?`HEAD`:`GET`,Object.entries(t).filter(([e,t])=>t!==void 0).map(([e,t])=>[e,Array.isArray(t)?`{${t.join(`,`)}}`:`${t}`]).forEach(([e,t])=>{o.searchParams.append(e,t)})):(a=`POST`,s=t);let u=new Headers(this.headers);return l?u.set(`Prefer`,i?`count=${i},return=minimal`:`return=minimal`):i&&u.set(`Prefer`,`count=${i}`),new ce({method:a,url:o,headers:u,schema:this.schemaName,body:s,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},pe=class{constructor(){}static detectEnvironment(){if(typeof WebSocket<`u`)return{type:`native`,wsConstructor:WebSocket};let e=globalThis;if(typeof globalThis<`u`&&e.WebSocket!==void 0)return{type:`native`,wsConstructor:e.WebSocket};let t=typeof global<`u`?global:void 0;if(t&&t.WebSocket!==void 0)return{type:`native`,wsConstructor:t.WebSocket};if(typeof globalThis<`u`&&e.WebSocketPair!==void 0&&globalThis.WebSocket===void 0)return{type:`cloudflare`,error:`Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.`,workaround:`Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.`};if(typeof globalThis<`u`&&e.EdgeRuntime||typeof navigator<`u`&&navigator.userAgent?.includes(`Vercel-Edge`))return{type:`unsupported`,error:`Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.`,workaround:`Use serverless functions or a different deployment target for WebSocket functionality.`};let n=globalThis.process;if(n){let e=n.versions;if(e&&e.node)return{type:`unsupported`,error:`Node.js detected but native WebSocket not found.`,workaround:`Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option.`}}return{type:`unsupported`,error:`Unknown JavaScript runtime without WebSocket support.`,workaround:`Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.`}}static getWebSocketConstructor(){let e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let t=e.error||`WebSocket not supported in this environment.`;throw e.workaround&&(t+=`\n\nSuggested solution: ${e.workaround}`),Error(t)}static isWebSocketSupported(){try{return this.detectEnvironment().type===`native`}catch{return!1}}};let v={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},me={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`,access_token:`access_token`},he={connecting:`connecting`,open:`open`,closing:`closing`,closed:`closed`};var ge=class{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT=`broadcast`,this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event==`string`)return t(this._binaryEncodeUserBroadcastPush(e));let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(e){return this._isArrayBuffer(e.payload?.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){let t=e.payload?.payload??new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,t)}_encodeJsonUserBroadcastPush(e){let t=e.payload?.payload??{},n=new TextEncoder().encode(JSON.stringify(t)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,n){let r=new TextEncoder,i=r.encode(e.topic),a=r.encode(e.ref??``),o=r.encode(e.join_ref??``),s=r.encode(e.payload.event),c=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},l=r.encode(Object.keys(c).length===0?``:JSON.stringify(c));if(o.length>255)throw Error(`joinRef length ${o.length} exceeds maximum of 255`);if(a.length>255)throw Error(`ref length ${a.length} exceeds maximum of 255`);if(i.length>255)throw Error(`topic length ${i.length} exceeds maximum of 255`);if(s.length>255)throw Error(`userEvent length ${s.length} exceeds maximum of 255`);if(l.length>255)throw Error(`metadata length ${l.length} exceeds maximum of 255`);let u=this.USER_BROADCAST_PUSH_META_LENGTH+o.length+a.length+i.length+s.length+l.length,d=new ArrayBuffer(this.HEADER_LENGTH+u),f=new DataView(d),p=new Uint8Array(d),m=0;f.setUint8(m++,this.KINDS.userBroadcastPush),f.setUint8(m++,o.length),f.setUint8(m++,a.length),f.setUint8(m++,i.length),f.setUint8(m++,s.length),f.setUint8(m++,l.length),f.setUint8(m++,t),p.set(o,m),m+=o.length,p.set(a,m),m+=a.length,p.set(i,m),m+=i.length,p.set(s,m),m+=s.length,p.set(l,m),m+=l.length;var h=new Uint8Array(d.byteLength+n.byteLength);return h.set(new Uint8Array(d),0),h.set(new Uint8Array(n),d.byteLength),h.buffer}decode(e,t){if(this._isArrayBuffer(e))return t(this._binaryDecode(e));if(typeof e==`string`){let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}return t({})}_binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+4,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=e.slice(s,e.byteLength),f=o===this.JSON_ENCODING?JSON.parse(n.decode(d)):d,p={type:this.BROADCAST_EVENT,event:l,payload:f};return a>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){return e instanceof ArrayBuffer||e?.constructor?.name===`ArrayBuffer`}_pick(e,t){return!e||typeof e!=`object`?{}:Object.fromEntries(Object.entries(e).filter(([e])=>t.includes(e)))}},y;(function(e){e.abstime=`abstime`,e.bool=`bool`,e.date=`date`,e.daterange=`daterange`,e.float4=`float4`,e.float8=`float8`,e.int2=`int2`,e.int4=`int4`,e.int4range=`int4range`,e.int8=`int8`,e.int8range=`int8range`,e.json=`json`,e.jsonb=`jsonb`,e.money=`money`,e.numeric=`numeric`,e.oid=`oid`,e.reltime=`reltime`,e.text=`text`,e.time=`time`,e.timestamp=`timestamp`,e.timestamptz=`timestamptz`,e.timetz=`timetz`,e.tsrange=`tsrange`,e.tstzrange=`tstzrange`})(y||={});let _e=(e,t,n={})=>{let r=n.skipTypes??[];return t?Object.keys(t).reduce((n,i)=>(n[i]=ve(i,e,t,r),n),{}):{}},ve=(e,t,n,r)=>{let i=t.find(t=>t.name===e)?.type,a=n[e];return i&&!r.includes(i)?ye(i,a):be(a)},ye=(e,t)=>{if(e.charAt(0)===`_`)return we(t,e.slice(1,e.length));switch(e){case y.bool:return xe(t);case y.float4:case y.float8:case y.int2:case y.int4:case y.int8:case y.numeric:case y.oid:return Se(t);case y.json:case y.jsonb:return Ce(t);case y.timestamp:return Te(t);case y.abstime:case y.date:case y.daterange:case y.int4range:case y.int8range:case y.money:case y.reltime:case y.text:case y.time:case y.timestamptz:case y.timetz:case y.tsrange:case y.tstzrange:return be(t);default:return be(t)}},be=e=>e,xe=e=>{switch(e){case`t`:return!0;case`f`:return!1;default:return e}},Se=e=>{if(typeof e==`string`){let t=parseFloat(e);if(!Number.isNaN(t))return t}return e},Ce=e=>{if(typeof e==`string`)try{return JSON.parse(e)}catch{return e}return e},we=(e,t)=>{if(typeof e!=`string`)return e;let n=e.length-1,r=e[n];if(e[0]===`{`&&r===`}`){let r,i=e.slice(1,n);try{r=JSON.parse(`[`+i+`]`)}catch{r=i?i.split(`,`):[]}return r.map(e=>ye(t,e))}return e},Te=e=>typeof e==`string`?e.replace(` `,`T`):e,Ee=e=>{let t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,`http`),t.pathname=t.pathname.replace(/\/+$/,``).replace(/\/socket\/websocket$/i,``).replace(/\/socket$/i,``).replace(/\/websocket$/i,``),t.pathname===``||t.pathname===`/`?t.pathname=`/api/broadcast`:t.pathname+=`/api/broadcast`,t.href};var b=e=>typeof e==`function`?e:function(){return e},De=typeof self<`u`?self:null,Oe=typeof window<`u`?window:null,x=De||Oe||globalThis,ke=`2.0.0`,Ae=1e4,je=1e3,Me=100,S={connecting:0,open:1,closing:2,closed:3},C={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},w={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`},Ne={longpoll:`longpoll`,websocket:`websocket`},Pe={complete:4},Fe=`base64url.bearer.phx.`,Ie=class{constructor(e,t,n,r){this.channel=e,this.event=t,this.payload=n||function(){return{}},this.receivedResp=null,this.timeout=r,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived(`timeout`)||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:n}){this.recHooks.filter(t=>t.status===e).forEach(e=>e.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger(`timeout`,{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},Le=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries+=1,this.callback()},this.timerCalc(this.tries+1))}},Re=class{constructor(e,t,n){this.state=C.closed,this.topic=e,this.params=b(t||{}),this.socket=n,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Ie(this,w.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Le(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive(`ok`,()=>{this.state=C.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(e=>e.send()),this.pushBuffer=[]}),this.joinPush.receive(`error`,e=>{this.state=C.errored,this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log(`channel`,`close ${this.topic}`),this.state=C.closed,this.socket.remove(this)}),this.onError(e=>{this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.isJoining()&&this.joinPush.reset(),this.state=C.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive(`timeout`,()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`timeout ${this.topic}`,this.joinPush.timeout),new Ie(this,w.leave,b({}),this.timeout).send(),this.state=C.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(w.reply,(e,t)=>{this.trigger(this.replyEventName(t),e)})}join(e=this.timeout){if(this.joinedOnce)throw Error(`tried to join multiple times. 'join' can only be called a single time per channel instance`);return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=C.closed,this.bindings=[]}onClose(e){this.on(w.close,e)}onError(e){return this.on(w.error,t=>e(t))}on(e,t){let n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}off(e,t){this.bindings=this.bindings.filter(n=>!(n.event===e&&(t===void 0||t===n.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,n=this.timeout){if(t||={},!this.joinedOnce)throw Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let r=new Ie(this,e,function(){return t},n);return this.canPush()?r.send():(r.startTimeout(),this.pushBuffer.push(r)),r}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=C.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`leave ${this.topic}`),this.trigger(w.close,`leave`)},n=new Ie(this,w.leave,b({}),e);return n.receive(`ok`,()=>t()).receive(`timeout`,()=>t()),n.send(),this.canPush()||n.trigger(`ok`,{}),n}onMessage(e,t,n){return t}filterBindings(e,t,n){return!0}isMember(e,t,n,r){return this.topic===e?r&&r!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log(`channel`,`dropping outdated message`,{topic:e,event:t,payload:n,joinRef:r}),!1):!0:!1}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=C.joining,this.joinPush.resend(e))}trigger(e,t,n,r){let i=this.onMessage(e,t,n,r);if(t&&!i)throw Error(`channel onMessage callbacks must return the payload, modified or unmodified`);let a=this.bindings.filter(r=>r.event===e&&this.filterBindings(r,t,n));for(let e=0;e<a.length;e++)a[e].callback(i,n,r||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===C.closed}isErrored(){return this.state===C.errored}isJoined(){return this.state===C.joined}isJoining(){return this.state===C.joining}isLeaving(){return this.state===C.leaving}},ze=class{static request(e,t,n,r,i,a,o){if(x.XDomainRequest){let n=new x.XDomainRequest;return this.xdomainRequest(n,e,t,r,i,a,o)}else if(x.XMLHttpRequest){let s=new x.XMLHttpRequest;return this.xhrRequest(s,e,t,n,r,i,a,o)}else if(x.fetch&&x.AbortController)return this.fetchRequest(e,t,n,r,i,a,o);else throw Error(`No suitable XMLHttpRequest implementation found`)}static fetchRequest(e,t,n,r,i,a,o){let s={method:e,headers:n,body:r},c=null;return i&&(c=new AbortController,setTimeout(()=>c.abort(),i),s.signal=c.signal),x.fetch(t,s).then(e=>e.text()).then(e=>this.parseJSON(e)).then(e=>o&&o(e)).catch(e=>{e.name===`AbortError`&&a?a():o&&o(null)}),c}static xdomainRequest(e,t,n,r,i,a,o){return e.timeout=i,e.open(t,n),e.onload=()=>{let t=this.parseJSON(e.responseText);o&&o(t)},a&&(e.ontimeout=a),e.onprogress=()=>{},e.send(r),e}static xhrRequest(e,t,n,r,i,a,o,s){e.open(t,n,!0),e.timeout=a;for(let[t,n]of Object.entries(r))e.setRequestHeader(t,n);return e.onerror=()=>s&&s(null),e.onreadystatechange=()=>{e.readyState===Pe.complete&&s&&s(this.parseJSON(e.responseText))},o&&(e.ontimeout=o),e.send(i),e}static parseJSON(e){if(!e||e===``)return null;try{return JSON.parse(e)}catch{return console&&console.log(`failed to parse JSON response`,e),null}}static serialize(e,t){let n=[];for(var r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let i=t?`${t}[${r}]`:r,a=e[r];typeof a==`object`?n.push(this.serialize(a,i)):n.push(encodeURIComponent(i)+`=`+encodeURIComponent(a))}return n.join(`&`)}static appendParams(e,t){return Object.keys(t).length===0?e:`${e}${e.match(/\?/)?`&`:`?`}${this.serialize(t)}`}},Be=e=>{let t=``,n=new Uint8Array(e),r=n.byteLength;for(let e=0;e<r;e++)t+=String.fromCharCode(n[e]);return btoa(t)},Ve=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(Fe)&&(this.authToken=atob(t[1].slice(Fe.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=S.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace(`ws://`,`http://`).replace(`wss://`,`https://`).replace(RegExp(`(.*)/`+Ne.websocket),`$1/`+Ne.longpoll)}endpointURL(){return ze.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,n){this.close(e,t,n),this.readyState=S.connecting}ontimeout(){this.onerror(`timeout`),this.closeAndRetry(1005,`timeout`,!1)}isActive(){return this.readyState===S.open||this.readyState===S.connecting}poll(){let e={Accept:`application/json`};this.authToken&&(e[`X-Phoenix-AuthToken`]=this.authToken),this.ajax(`GET`,e,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:n,messages:r}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,`session_gone`,!1);return}this.token=n}else t=0;switch(t){case 200:r.forEach(e=>{setTimeout(()=>this.onmessage({data:e}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=S.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,`forbidden`,!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,`internal server error`,500);break;default:throw Error(`unhandled poll status ${t}`)}})}send(e){typeof e!=`string`&&(e=Be(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e,t=0){this.awaitingBatchAck=!0;let n=t+Me,r=e.slice(t,n);this.ajax(`POST`,{"Content-Type":`application/x-ndjson`},r.join(`
`),()=>this.onerror(`timeout`),t=>{!t||t.status!==200?(this.awaitingBatchAck=!1,this.onerror(t&&t.status),this.closeAndRetry(1011,`internal server error`,!1)):n<e.length?this.batchSend(e,n):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(e,t,n){for(let e of this.reqs)e.abort();this.readyState=S.closed;let r=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:n});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<`u`?this.onclose(new CloseEvent(`close`,r)):this.onclose(r)}ajax(e,t,n,r,i){let a;a=ze.request(e,this.endpointURL(),t,n,this.timeout,()=>{this.reqs.delete(a),r()},e=>{this.reqs.delete(a),this.isActive()&&i(e)}),this.reqs.add(a)}},He=class e{constructor(t,n={}){let r=n.events||{state:`presence_state`,diff:`presence_diff`};this.state=Object.create(null),this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(r.state,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.joinRef=this.channel.joinRef(),this.state=e.syncState(this.state,t,n,r),this.pendingDiffs.forEach(t=>{this.state=e.syncDiff(this.state,t,n,r)}),this.pendingDiffs=[],i()}),this.channel.on(r.diff,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(t):(this.state=e.syncDiff(this.state,t,n,r),i())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(t){return e.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,n,r){let i=this.toNullProtoObj(this.clone(e));t=this.toNullProtoObj(t);let a=Object.create(null),o=Object.create(null);return this.map(i,(e,n)=>{t[e]||(o[e]=n)}),this.map(t,(e,t)=>{let n=i[e];if(n){let r=t.metas.map(e=>e.phx_ref),i=n.metas.map(e=>e.phx_ref),s=t.metas.filter(e=>i.indexOf(e.phx_ref)<0),c=n.metas.filter(e=>r.indexOf(e.phx_ref)<0);s.length>0&&(a[e]=t,a[e].metas=s),c.length>0&&(o[e]=this.clone(n),o[e].metas=c)}else a[e]=t}),this.syncDiff(i,{joins:a,leaves:o},n,r)}static syncDiff(e,t,n,r){e=this.toNullProtoObj(e);let{joins:i,leaves:a}=this.clone(t);return n||=function(){},r||=function(){},this.map(i,(t,r)=>{let i=e[t];if(e[t]=this.clone(r),i){let n=e[t].metas.map(e=>e.phx_ref),r=i.metas.filter(e=>n.indexOf(e.phx_ref)<0);e[t].metas.unshift(...r)}n(t,i,r)}),this.map(a,(t,n)=>{let i=e[t];if(!i)return;let a=n.metas.map(e=>e.phx_ref);i.metas=i.metas.filter(e=>a.indexOf(e.phx_ref)<0),r(t,i,n),i.metas.length===0&&delete e[t]}),e}static list(e,t){return t||=function(e,t){return t},this.map(e,(e,n)=>t(e,n))}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let t=Object.create(null);return Object.getOwnPropertyNames(e).forEach(n=>{t[n]=e[n]}),t}static clone(e){return JSON.parse(JSON.stringify(e))}},Ue={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}},binaryEncode(e){let{join_ref:t,ref:n,event:r,topic:i,payload:a}=e,o=new TextEncoder,s=o.encode(t),c=o.encode(n),l=o.encode(i),u=o.encode(r);this.assertFieldSize(s.byteLength,`join_ref`),this.assertFieldSize(c.byteLength,`ref`),this.assertFieldSize(l.byteLength,`topic`),this.assertFieldSize(u.byteLength,`event`);let d=this.META_LENGTH+s.byteLength+c.byteLength+l.byteLength+u.byteLength,f=new ArrayBuffer(this.HEADER_LENGTH+d),p=new Uint8Array(f),m=new DataView(f),h=0;m.setUint8(h++,this.KINDS.push),m.setUint8(h++,s.byteLength),m.setUint8(h++,c.byteLength),m.setUint8(h++,l.byteLength),m.setUint8(h++,u.byteLength),p.set(s,h),h+=s.byteLength,p.set(c,h),h+=c.byteLength,p.set(l,h),h+=l.byteLength,p.set(u,h),h+=u.byteLength;var g=new Uint8Array(f.byteLength+a.byteLength);return g.set(p,0),g.set(new Uint8Array(a),f.byteLength),g.buffer},assertFieldSize(e,t){if(e>255)throw Error(`unable to convert ${t} to binary: must be less than or equal to 255 bytes, but is ${e} bytes`)},binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.push:return this.decodePush(e,t,r);case this.KINDS.reply:return this.decodeReply(e,t,r);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,r)}},decodePush(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,s=n.decode(e.slice(o,o+r));o+=r;let c=n.decode(e.slice(o,o+i));o+=i;let l=n.decode(e.slice(o,o+a));return o+=a,{join_ref:s,ref:null,topic:c,event:l,payload:e.slice(o,e.byteLength)}},decodeReply(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+this.META_LENGTH,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=n.decode(e.slice(s,s+o));s+=o;let f={status:d,response:e.slice(s,e.byteLength)};return{join_ref:c,ref:l,topic:u,event:w.reply,payload:f}},decodeBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=this.HEADER_LENGTH+2,o=n.decode(e.slice(a,a+r));a+=r;let s=n.decode(e.slice(a,a+i));return a+=i,{join_ref:null,ref:null,topic:o,event:s,payload:e.slice(a,e.byteLength)}}},We=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||Ae,this.transport=t.transport||x.WebSocket||Ve,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null;let n=null;try{n=x&&x.sessionStorage}catch{}this.sessionStore=t.sessionStorage||n,this.establishedConnections=0,this.defaultEncoder=Ue.encode.bind(Ue),this.defaultDecoder=Ue.decode.bind(Ue),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||`arraybuffer`,this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport===Ve?(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder):(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder);let r=null;Oe&&Oe.addEventListener&&(Oe.addEventListener(`pagehide`,e=>{this.conn&&(this.disconnect(),r=this.connectClock)}),Oe.addEventListener(`pageshow`,e=>{r===this.connectClock&&(r=null,this.connect())}),Oe.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=e=>t.rejoinAfterMs?t.rejoinAfterMs(e):[1e3,2e3,5e3][e-1]||1e4,this.reconnectAfterMs=e=>t.reconnectAfterMs?t.reconnectAfterMs(e):[10,50,100,150,200,250,500,1e3,2e3][e-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(e,t,n)=>{console.log(`${e}: ${t}`,n)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=b(t.params||{}),this.endPoint=`${e}/${Ne.websocket}`,this.vsn=t.vsn||ke,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Le(()=>{if(this.pageHidden){this.log(`Not reconnecting as page is hidden!`),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken&&b(t.authToken)}getLongPollTransport(){return Ve}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&=(this.conn.close(),null),this.transport=e}protocol(){return location.protocol.match(/^https/)?`wss`:`ws`}endPointURL(){let e=ze.appendParams(ze.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)===`/`?e.charAt(1)===`/`?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`:e}disconnect(e,t,n){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,n)}connect(e){e&&(console&&console.log(`passing params to connect is deprecated. Instead pass :params to the Socket constructor`),this.params=b(e)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Ve?this.connectWithFallback(Ve,this.longPollFallbackMs):this.transportConnect())}log(e,t,n){this.logger&&this.logger(e,t,n)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),n=Date.now();this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:t});let r=this.onMessage(i=>{i.ref===t&&(this.off([r]),e(Date.now()-n))});return!0}transportName(e){switch(e){case Ve:return`LongPoll`;default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=[`phoenix`,`${Fe}${btoa(this.authToken()).replace(/=/g,``)}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let n=!1,r=!0,i,a=this.transportName(e),o=t=>{this.log(`transport`,`falling back to ${a}...`,t),this.off([void 0,i]),r=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o(`memorized`);this.fallbackTimer=setTimeout(o,t),i=this.onError(e=>{this.log(`transport`,`error`,e),r&&!n&&(clearTimeout(this.fallbackTimer),o(e))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(n=!0,!r){let t=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${t}`,`true`),this.log(`transport`,`established ${t} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,t),this.ping(e=>{this.log(`transport`,`connected to primary after`,e),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log(`transport`,`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks(`open`)}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log(`transport`,`heartbeat timeout. Attempting to re-establish connection`);try{this.heartbeatCallback(`timeout`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.triggerChanError(Error(`heartbeat timeout`)),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),je,`heartbeat timeout`)}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,n){if(!this.conn)return e&&e();let r=this.conn;this.waitForBufferDone(r,()=>{t?r.close(t,n||``):r.close(),this.waitForSocketClosed(r,()=>{this.conn===r&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,n=1){if(n===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,n+1)},150*n)}waitForSocketClosed(e,t,n=1){if(n===5||e.readyState===S.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,n+1)},150*n)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log(`transport`,`close`,e),this.triggerChanError(e),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks(`close`,e)}onConnError(e){this.hasLogger()&&this.log(`transport`,`error`,e);let t=this.transport,n=this.establishedConnections;this.triggerStateCallbacks(`error`,e,t,n),(t===this.transport||n>0)&&this.triggerChanError(e)}triggerChanError(e){this.channels.forEach(t=>{t.isErrored()||t.isLeaving()||t.isClosed()||t.trigger(w.error,e)})}connectionState(){switch(this.conn&&this.conn.readyState){case S.connecting:return`connecting`;case S.open:return`open`;case S.closing:return`closing`;default:return`closed`}}isConnected(){return this.connectionState()===`open`}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([t])=>e.indexOf(t)===-1)}channel(e,t={}){let n=new Re(e,t,this);return this.channels.push(n),n}push(e){if(this.hasLogger()){let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;this.log(`push`,`${t} ${n} (${a}, ${i})`,r)}this.isConnected()?this.encode(e,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(e,e=>this.conn.send(e)))}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback(`disconnected`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback(`sent`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,e=>{let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){let e=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status===`ok`?`ok`:`error`,e)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log(`receive`,`${r.status||``} ${t} ${n} ${i&&`(`+i+`)`||``}`.trim(),r);for(let e=0;e<this.channels.length;e++){let o=this.channels[e];o.isMember(t,n,r,a)&&o.trigger(n,r,i,a)}this.triggerStateCallbacks(`message`,e)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([n,r])=>{try{r(...t)}catch(t){this.log(`error`,`error in ${e} callback`,t)}})}catch(t){this.log(`error`,`error triggering ${e} callbacks`,t)}}leaveOpenTopic(e){let t=this.channels.find(t=>t.topic===e&&(t.isJoined()||t.isJoining()));t&&(this.hasLogger()&&this.log(`transport`,`leaving duplicate topic "${e}"`),t.leave())}},Ge=class e{constructor(t,n){let r=Je(n);this.presence=new He(t.getChannel(),r),this.presence.onJoin((n,r,i)=>{let a=e.onJoinPayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onLeave((n,r,i)=>{let a=e.onLeavePayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onSync(()=>{t.getChannel().trigger(`presence`,{event:`sync`})})}get state(){return e.transformState(this.presence.state)}static transformState(e){return e=qe(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{let r=e[n];return t[n]=Ke(r),t},{})}static onJoinPayload(e,t,n){return{event:`join`,key:e,currentPresences:Ye(t),newPresences:Ke(n)}}static onLeavePayload(e,t,n){return{event:`leave`,key:e,currentPresences:Ye(t),leftPresences:Ke(n)}}};function Ke(e){return e.metas.map(e=>{let t=Object.getOwnPropertyDescriptors(e),n=Object.defineProperties({},t);return n.presence_ref=n.phx_ref,delete n.phx_ref,delete n.phx_ref_prev,n})}function qe(e){return JSON.parse(JSON.stringify(e))}function Je(e){return e?.events&&{events:e.events}}function Ye(e){return e?.metas?Ke(e):[]}var Xe;(function(e){e.SYNC=`sync`,e.JOIN=`join`,e.LEAVE=`leave`})(Xe||={});var Ze=class{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new Ge(this.channel.channelAdapter,t)}};function Qe(e){if(e instanceof Error)return e;if(typeof e==`string`)return Error(e);if(e&&typeof e==`object`){let t=e;if(typeof t.code==`number`){let n=typeof t.reason==`string`&&t.reason?` (${t.reason})`:``;return Error(`socket closed: ${t.code}${n}`,{cause:e})}return Error(`channel error: transport failure`,{cause:e})}return Error(`channel error: connection lost`)}var $e=class{constructor(e,t,n){let r=et(n);this.channel=e.getSocket().channel(t,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,n){let r;try{r=this.channel.push(e,t,n)}catch{throw Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>100){let e=this.channel.pushBuffer.shift();e.cancelTimeout(),this.socket.log(`channel`,`discarded push due to buffer overflow: ${e.event}`,e.payload())}return r}updateJoinPayload(e){let t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===v.joined}isJoined(){return this.state===v.joined}isJoining(){return this.state===v.joining}isClosed(){return this.state===v.closed}isLeaving(){return this.state===v.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}};function et(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},e.config)}}let tt=/[,()"\\]/,nt=e=>tt.test(e)||e!==e.trim(),rt=e=>`"${e.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`)}"`,it=e=>{let t=e===null?`null`:String(e);return nt(t)?rt(t):t},at=e=>e===null?`null`:String(e),ot=(e,t)=>{if(e===`in`){let e=Array.isArray(t)?t:[t];if(e.length===0)throw Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(e)).map(e=>it(e)).join(`,`)})`}return e===`is`?`is.${at(t)}`:`${e}.${it(t)}`};var st=class{constructor(){this.filters=[]}add(e,t,n,r=!1){let i=r?`not.`:``;return this.filters.push(`${e}=${i}${ot(t,n)}`),this}eq(e,t){return this.add(e,`eq`,t)}neq(e,t){return this.add(e,`neq`,t)}gt(e,t){return this.add(e,`gt`,t)}gte(e,t){return this.add(e,`gte`,t)}lt(e,t){return this.add(e,`lt`,t)}lte(e,t){return this.add(e,`lte`,t)}in(e,t){return this.add(e,`in`,t)}like(e,t){return this.add(e,`like`,t)}ilike(e,t){return this.add(e,`ilike`,t)}match(e,t){return this.add(e,`match`,t)}imatch(e,t){return this.add(e,`imatch`,t)}is(e,t){return this.add(e,`is`,t)}isDistinct(e,t){return this.add(e,`isdistinct`,t)}not(e,t,n){return this.add(e,t,n,!0)}build(){return this.filters.join(`,`)}toString(){return this.build()}};let ct=()=>new st;var lt;(function(e){e.ALL=`*`,e.INSERT=`INSERT`,e.UPDATE=`UPDATE`,e.DELETE=`DELETE`})(lt||={});var T;(function(e){e.BROADCAST=`broadcast`,e.PRESENCE=`presence`,e.POSTGRES_CHANGES=`postgres_changes`,e.SYSTEM=`system`})(T||={});var E;(function(e){e.SUBSCRIBED=`SUBSCRIBED`,e.TIMED_OUT=`TIMED_OUT`,e.CLOSED=`CLOSED`,e.CHANNEL_ERROR=`CHANNEL_ERROR`})(E||={});let ut=v;var dt=class e{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},n){if(this.topic=e,this.params=t,this.socket=n,this.bindings={},this.subTopic=e.replace(/^realtime:/i,``),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},t.config),this.channelAdapter=new $e(this.socket.socketAdapter,e,this.params),this.presence=new Ze(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Ee(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&this.params.config?.broadcast?.replay)throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){let{config:{broadcast:n,presence:r,private:i,postgres_changes_options:a}}=this.params,o=this.bindings.postgres_changes?.map(e=>e.filter)??[],s=!!this.bindings[T.PRESENCE]&&this.bindings[T.PRESENCE].length>0||this.params.config.presence?.enabled===!0,c={},l=Object.assign({broadcast:n,presence:Object.assign(Object.assign({},r),{enabled:s}),postgres_changes:o,private:i},a?{postgres_changes_options:a}:{});this.socket.accessTokenValue&&(c.access_token=this.socket.accessTokenValue),this._onError(t=>{e?.(E.CHANNEL_ERROR,Qe(t))}),this._onClose(()=>e?.(E.CLOSED)),this.updateJoinPayload(Object.assign({config:l},c)),this._updateFilterMessage();let u=a?.wait&&o.length>0?Math.max(t,(a.timeout??15e3)+1e4):t;this.channelAdapter.subscribe(u).receive(`ok`,async({postgres_changes:t})=>{if(this.socket._isManualToken()||this.socket.setAuth(),t===void 0){e?.(E.SUBSCRIBED);return}this._updatePostgresBindings(t,e)}).receive(`error`,t=>{this.state=v.errored;let n=Object.values(t).join(`, `)||`error`;e?.(E.CHANNEL_ERROR,Error(n,{cause:t}))}).receive(`timeout`,()=>{e?.(E.TIMED_OUT)})}return this}_updatePostgresBindings(t,n){let r=this.bindings.postgres_changes,i=r?.length??0,a=[];for(let o=0;o<i;o++){let i=r[o],{filter:{event:s,schema:c,table:l,filter:u}}=i,d=t&&t[o];if(d&&d.event===s&&e.isFilterValueEqual(d.schema,c)&&e.isFilterValueEqual(d.table,l)&&e.isFilterValueEqual(d.filter,u))a.push(Object.assign(Object.assign({},i),{id:d.id}));else{this.unsubscribe(),this.state=v.errored,n?.(E.CHANNEL_ERROR,Error(`mismatch between server and client bindings for postgres changes`));return}}this.bindings.postgres_changes=a,this.state!=v.errored&&n&&n(E.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:`presence`,event:`track`,payload:e},t)}async untrack(e={}){return await this.send({type:`presence`,event:`untrack`},e)}on(e,t,n){let r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===T.PRESENCE||e===T.POSTGRES_CHANGES;if(r&&i)throw this.socket.log(`channel`,`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,n)}async httpSend(e,t,n={}){if(t==null)return Promise.reject(Error(`Payload is required for httpSend()`));let r=t instanceof ArrayBuffer||ArrayBuffer.isView(t),i={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":r?`application/octet-stream`:`application/json`};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);let a=new URL(this.broadcastEndpointURL);a.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&a.searchParams.set(`private`,`true`);let o={method:`POST`,headers:i,body:r?t:JSON.stringify(t)},s=await this._fetchWithTimeout(a.toString(),o,n.timeout??this.timeout);if(s.status===202)return{success:!0};if(s.status===404)return Promise.reject(Error(`httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md`));let c=s.statusText;try{let e=await s.json();c=e.error||e.message||c}catch{}return Promise.reject(Error(c))}async send(e,t={}){if(!this.channelAdapter.canPush()&&e.type===`broadcast`){let n=`Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.`;this.socket.hasLogger()?this.socket.log(`channel`,n):console.warn(n);let{event:r,payload:i}=e,a={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":`application/json`};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);let o={method:`POST`,headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:i,private:this.private}]})};try{let e=await this._fetchWithTimeout(this.broadcastEndpointURL,o,t.timeout??this.timeout);return await e.body?.cancel(),e.ok?`ok`:`error`}catch(e){return e instanceof Error&&e.name===`AbortError`?`timed out`:`error`}}else return new Promise(n=>{let r=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type===`broadcast`&&!this.params?.config?.broadcast?.ack&&n(`ok`),r.receive(`ok`,()=>n(`ok`)),r.receive(`error`,()=>n(`error`)),r.receive(`timeout`,()=>n(`timed out`))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive(`ok`,()=>t(`ok`)).receive(`timeout`,()=>t(`timed out`)).receive(`error`,()=>t(`error`))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,n){let r=new AbortController,i=setTimeout(()=>r.abort(),n),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(i),a}_on(t,n,r){let i=t.toLocaleLowerCase(),a=n?.filter;if((a instanceof st||typeof a==`object`&&a&&typeof a.build==`function`)&&(n=Object.assign(Object.assign({},n),{filter:a.build()})),i===T.POSTGRES_CHANGES&&this.bindings[i]?.find(t=>e.isSamePostgresFilter(t.filter,n)))return this.socket.log(`error`,`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,n),this;let o=this.channelAdapter.on(t,r),s={type:i,filter:n,callback:r,ref:o};return this.bindings[i]?this.bindings[i].push(s):this.bindings[i]=[s],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,n)=>{let r=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(r,n))return!1;let i=this.bindings[r]?.find(t=>t.ref===e.ref);if(!i)return!0;if([`broadcast`,`presence`,`postgres_changes`].includes(r))if(`id`in i){let e=i.id,n=i.filter?.event;return e&&t.ids?.includes(e)&&(n===`*`||n?.toLocaleLowerCase()===t.data?.type.toLocaleLowerCase())}else{let e=(i?.filter?.event)?.toLocaleLowerCase();return e===`*`||e===(t?.event)?.toLocaleLowerCase()}else return i.type.toLocaleLowerCase()===r})}_notThisChannelEvent(e,t){let{close:n,error:r,leave:i,join:a}=me;return t&&[n,r,i,a].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,n)=>{if(typeof t==`object`&&`ids`in t){let e=t.data,{schema:n,table:r,commit_timestamp:i,type:a,errors:o}=e,s={schema:n,table:r,commit_timestamp:i,eventType:a,new:{},old:{},errors:o};return Object.assign(Object.assign({},s),this._getPayloadRecords(e))}return t})}copyBindings(e){if(this.joinedOnce)throw Error(`cannot copy bindings into joined channel`);for(let t in e.bindings)for(let n of e.bindings[t])this._on(n.type,n.filter,n.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}static isSamePostgresFilter(t,n){let r=(t?.select)?.join()??void 0,i=(n?.select)?.join()??void 0;return t?.event===n?.event&&e.isFilterValueEqual(t?.schema,n?.schema)&&e.isFilterValueEqual(t?.table,n?.table)&&e.isFilterValueEqual(t?.filter,n?.filter)&&r===i}_getPayloadRecords(e){let t={new:{},old:{}};return(e.type===`INSERT`||e.type===`UPDATE`)&&(t.new=_e(e.columns,e.record)),(e.type===`UPDATE`||e.type===`DELETE`)&&(t.old=_e(e.columns,e.old_record)),t}},ft=class{constructor(e,t){this.socket=new We(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,n,r=1e4){return new Promise(i=>{setTimeout(()=>i(`timeout`),r),this.socket.disconnect(()=>{e(),i(`ok`)},t,n)})}push(e){this.socket.push(e)}log(e,t,n){this.socket.log(e,t,n)}hasLogger(){return this.socket.hasLogger()}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==he.connecting}isDisconnecting(){return this.socket.connectionState()==he.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}};let pt={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},mt=[1e3,2e3,5e3,1e4];function ht(){let e=new Map;return{get length(){return e.size},clear(){e.clear()},getItem(t){return e.has(t)?e.get(t):null},key(t){return Array.from(e.keys())[t]??null},removeItem(t){e.delete(t)},setItem(t,n){e.set(t,String(n))}}}function gt(){try{if(typeof globalThis<`u`&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return ht()}var _t=class{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){if(this.channels=[],this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint=``,this.headers={},this.params={},this.ref=0,this.serializer=new ge,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),!t?.params?.apikey)throw Error(`API key is required to connect to Realtime`);this.apiKey=t.params.apikey,this.socketAdapter=new ft(e,this._initializeOptions(t)),this.httpEndpoint=Ee(e),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely(`connect`),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){let t=e.message;throw Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this._cancelPendingDisconnect(),this.isDisconnecting()?`ok`:await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){let t=await e.unsubscribe();return t===`ok`&&e.teardown(),t}async removeAllChannels(){let e=this.channels.map(async e=>{let t=await e.unsubscribe();return e.teardown(),t}),t=await Promise.all(e);return await this.disconnect(),t}log(e,t,n){this.socketAdapter.log(e,t,n)}hasLogger(){return this.socketAdapter.hasLogger()}connectionState(){return this.socketAdapter.connectionState()||he.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){let n=`realtime:${e}`,r=this.getChannels().find(e=>e.topic===n);if(r)return r;{let n=new dt(`realtime:${e}`,t,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){let t=++this._authGeneration,n=this._performAuth(e,t);t===this._authGeneration&&(this._authPromise=n);try{await n}finally{this._authPromise===n&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic),this.channels.length===0&&(this.log(`transport`,`no channels remaining, scheduling disconnect`),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log(`transport`,`disconnecting immediately - no channels`),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log(`transport`,`deferred disconnect fired - no channels, disconnecting`),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log(`transport`,`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log(`transport`,`pending disconnect cancelled - channel activity detected`),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,t){let n,r=!1;if(e)n=e,r=!0;else if(this.accessToken)try{n=await this.accessToken()}catch(e){this.log(`error`,`Error fetching access token from callback`,e),n=this.accessTokenValue}else n=this.accessTokenValue;t===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:r&&(this._manuallySetToken=!0),this.accessTokenValue!=n&&(this.accessTokenValue=n,this.channels.forEach(e=>{let t={access_token:n,version:`realtime-js/2.117.2`};e.updateJoinPayload(t),e.joinedOnce&&e.channelAdapter.isJoined()&&e.channelAdapter.push(me.access_token,{access_token:n})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e=`general`){this._isManualToken()||this.setAuth().catch(t=>{this.log(`error`,`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(e=>{this.log(`error`,`error waiting for auth on connect`,e)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,n)=>{t!==`disconnected`&&(t==`sent`&&this._setAuthSafely(),e&&e(t,n))}}_startWorkerHeartbeat(){this.workerUrl?this.log(`worker`,`starting worker for from ${this.workerUrl}`):this.log(`worker`,`starting default worker`);let e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log(`worker`,`worker error`,e.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=e=>{e.data.event===`keepAlive`&&this.sendHeartbeat()},this.workerRef.postMessage({event:`start`,interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&=(this.log(`worker`,`terminating worker`),this.workerRef.terminate(),void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{let e=new Blob([`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`],{type:`application/javascript`});t=URL.createObjectURL(e)}return t}_initializeOptions(e){this.worker=e?.worker??!1,this.accessToken=e?.accessToken??null;let t={};t.timeout=e?.timeout??1e4,t.heartbeatIntervalMs=e?.heartbeatIntervalMs??pt.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=e?.disconnectOnEmptyChannelsAfterMs??2*(e?.heartbeatIntervalMs??pt.HEARTBEAT_INTERVAL),t.transport=e?.transport??pe.getWebSocketConstructor(),t.params=e?.params,t.logger=e?.logger,t.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),t.sessionStorage=e?.sessionStorage??gt(),t.reconnectAfterMs=e?.reconnectAfterMs??(e=>mt[e-1]||1e4);let n,r,i=e?.vsn??`2.0.0`;switch(i){case`1.0.0`:n=(e,t)=>t(JSON.stringify(e)),r=(e,t)=>t(JSON.parse(e));break;case`2.0.0`:n=this.serializer.encode.bind(this.serializer),r=this.serializer.decode.bind(this.serializer);break;default:throw Error(`Unsupported serializer version: ${t.vsn}`)}if(t.vsn=i,t.encode=e?.encode??n,t.decode=e?.decode??r,t.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,t.params=Object.assign(Object.assign({},t.params),{log_level:this.logLevel})),this.worker){if(typeof window<`u`&&!window.Worker)throw Error(`Web Worker is not supported`);this.workerUrl=e?.workerUrl,t.autoSendHeartbeat=!this.worker}return t}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}},vt=class extends Error{constructor(e,t){super(e),this.name=`IcebergError`,this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType===`CommitStateUnknownException`||[500,502,504].includes(t.status)&&t.icebergType?.includes(`CommitState`)===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function yt(e,t,n){let r=new URL(t,e);if(n)for(let[e,t]of Object.entries(n))t!==void 0&&r.searchParams.set(e,t);return r.toString()}async function bt(e){return!e||e.type===`none`?{}:e.type===`bearer`?{Authorization:`Bearer ${e.token}`}:e.type===`header`?{[e.name]:e.value}:e.type===`custom`?await e.getHeaders():{}}function xt(e){let t=e.fetchImpl??globalThis.fetch;return{async request({method:n,path:r,query:i,body:a,headers:o}){let s=yt(e.baseUrl,r,i),c=await bt(e.auth),l=await t(s,{method:n,headers:{...a?{"Content-Type":`application/json`}:{},...c,...o},body:a?JSON.stringify(a):void 0}),u=await l.text(),d=(l.headers.get(`content-type`)||``).includes(`application/json`),f=d&&u?JSON.parse(u):u;if(!l.ok){let e=d?f:void 0,t=e?.error;throw new vt(t?.message??`Request failed with status ${l.status}`,{status:l.status,icebergType:t?.type,icebergCode:t?.code,details:e})}return{status:l.status,headers:l.headers,data:f}}}}function St(e){return e.join(``)}var Ct=class{constructor(e,t=``){this.client=e,this.prefix=t}async listNamespaces(e){let t=e?{parent:St(e.namespace)}:void 0;return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(e=>({namespace:e}))}async createNamespace(e,t){let n={namespace:e.namespace,properties:t?.properties};return(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(e){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${St(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${St(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${St(e.namespace)}`}),!0}catch(e){if(e instanceof vt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(e){if(e instanceof vt&&e.status===409)return;throw e}}};function wt(e){return e.join(``)}var Tt=class{constructor(e,t=``,n){this.client=e,this.prefix=t,this.accessDelegation=n}async listTables(e){return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${wt(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){let n={};return this.accessDelegation&&(n[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${wt(e.namespace)}/tables`,body:t,headers:n})).data.metadata}async updateTable(e,t){let n=await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${wt(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":n.data[`metadata-location`],metadata:n.data.metadata}}async dropTable(e,t){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${wt(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String(t?.purge??!1)}})}async loadTable(e){let t={};return this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${wt(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){let t={};this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation);try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${wt(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(e){if(e instanceof vt&&e.status===404)return!1;throw e}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(n){if(n instanceof vt&&n.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw n}}},Et=class{constructor(e){let t=`v1`;e.catalogName&&(t+=`/${e.catalogName}`),this.client=xt({baseUrl:e.baseUrl.endsWith(`/`)?e.baseUrl:`${e.baseUrl}/`,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=e.accessDelegation?.join(`,`),this.namespaceOps=new Ct(this.client,t),this.tableOps=new Tt(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function Dt(e){"@babel/helpers - typeof";return Dt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Dt(e)}function Ot(e,t){if(Dt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(Dt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function kt(e){var t=Ot(e,`string`);return Dt(t)==`symbol`?t:t+``}function At(e,t,n){return(t=kt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function jt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?jt(Object(n),!0).forEach(function(t){At(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):jt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Mt=class extends Error{constructor(e,t=`storage`,n,r){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t===`vectors`?`StorageVectorsError`:`StorageError`,this.status=n,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function Nt(e){return typeof e==`object`&&!!e&&`__isStorageError`in e}var Pt=class extends Mt{constructor(e,t,n,r=`storage`,i){super(e,r,t,n),this.name=r===`vectors`?`StorageVectorsApiError`:`StorageApiError`,this.status=t,this.statusCode=n,this.code=i}toJSON(){return D(D({},super.toJSON()),{},{code:this.code})}},Ft=class extends Mt{constructor(e,t,n=`storage`){super(e,n),this.name=n===`vectors`?`StorageVectorsUnknownError`:`StorageUnknownError`,this.originalError=t}};function It(e,t,n){let r=D({},e),i=t.toLowerCase();for(let e of Object.keys(r))e.toLowerCase()===i&&delete r[e];return r[i]=n,r}function Lt(e){let t={};for(let[n,r]of Object.entries(e))t[n.toLowerCase()]=r;return t}let Rt=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),zt=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Bt=e=>{if(Array.isArray(e))return e.map(e=>Bt(e));if(typeof e==`function`||e!==Object(e))return e;let t={};return Object.entries(e).forEach(([e,n])=>{let r=e.replace(/([-_][a-z])/gi,e=>e.toUpperCase().replace(/[-_]/g,``));t[r]=Bt(n)}),t},Vt=e=>!e||typeof e!=`string`||e.length===0||e.length>100||e.trim()!==e||e.includes(`/`)||e.includes(`\\`)?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e),Ht=e=>e.split(`/`).map(encodeURIComponent).join(`/`),Ut=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error;if(typeof t.error==`object`&&t.error!==null){let e=t.error;if(typeof e.message==`string`)return e.message}}return JSON.stringify(e)},Wt=async(e,t,n,r)=>{if(typeof e==`object`&&e&&`json`in e&&typeof e.json==`function`){let n=e,i=parseInt(String(n.status),10);Number.isFinite(i)||(i=500),n.json().then(e=>{let n=e?.statusCode||e?.code||i+``;t(new Pt(Ut(e),i,n,r,e?.code))}).catch(()=>{let e=i+``;t(new Pt(n.statusText||`HTTP ${i} error`,i,e,r))})}else t(new Ft(Ut(e),e,r))},Gt=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};if(e===`GET`||e===`HEAD`||!r)return D(D({},i),n);if(zt(r)){let e=t?.headers||{},n;for(let[t,r]of Object.entries(e))t.toLowerCase()===`content-type`&&(n=r);i.headers=It(e,`Content-Type`,n??`application/json`),i.body=JSON.stringify(r)}else i.body=r;return t?.duplex&&(i.duplex=t.duplex),D(D({},i),n)};async function Kt(e,t,n,r,i,a,o){return new Promise((s,c)=>{e(n,Gt(t,r,i,a)).then(e=>{if(!e.ok)throw e;if(r?.noResolveJson)return e;if(o===`vectors`){let t=e.headers.get(`content-type`);if(e.headers.get(`content-length`)===`0`||e.status===204||!t||!t.includes(`application/json`))return{}}return e.json()}).then(e=>s(e)).catch(e=>Wt(e,c,r,o))})}function qt(e=`storage`){return{get:async(t,n,r,i)=>Kt(t,`GET`,n,r,i,void 0,e),post:async(t,n,r,i,a)=>Kt(t,`POST`,n,i,a,r,e),put:async(t,n,r,i,a)=>Kt(t,`PUT`,n,i,a,r,e),head:async(t,n,r,i)=>Kt(t,`HEAD`,n,D(D({},r),{},{noResolveJson:!0}),i,void 0,e),remove:async(t,n,r,i,a)=>Kt(t,`DELETE`,n,i,a,r,e)}}let{get:O,post:k,put:Jt,head:Yt,remove:A}=qt(`storage`),j=qt(`vectors`);var Xt=class{constructor(e,t={},n,r=`storage`){this.shouldThrowOnError=!1,this.url=e,this.headers=Lt(t),this.fetch=Rt(n),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=It(this.headers,e,t),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Nt(e))return{data:null,error:e};throw e}}};let Zt;Zt=Symbol.toStringTag;var Qt=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[Zt]=`StreamDownloadBuilder`,this.promise=null}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Nt(t))return{data:null,error:t};throw t}}};let $t;$t=Symbol.toStringTag;var en=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[$t]=`BlobDownloadBuilder`,this.promise=null}asStream(){return new Qt(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Nt(t))return{data:null,error:t};throw t}}};let tn={limit:100,offset:0,sortBy:{column:`name`,order:`asc`}},nn={cacheControl:`3600`,contentType:`text/plain;charset=UTF-8`,upsert:!1};var rn=class extends Xt{constructor(e,t={},n,r){super(e,t,r,`storage`),this.bucketId=n}async uploadOrUpdate(e,t,n,r){var i=this;return i.handleOperation(async()=>{let a,o=D(D({},nn),r),s=D(D({},i.headers),e===`POST`&&{"x-upsert":String(o.upsert)}),c=o.metadata;if(typeof Blob<`u`&&n instanceof Blob?(a=new FormData,a.append(`cacheControl`,o.cacheControl),c&&a.append(`metadata`,i.encodeMetadata(c)),a.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(a=n,a.has(`cacheControl`)||a.append(`cacheControl`,o.cacheControl),c&&!a.has(`metadata`)&&a.append(`metadata`,i.encodeMetadata(c))):(a=n,s[`cache-control`]=`max-age=${o.cacheControl}`,s[`content-type`]=o.contentType,c&&(s[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&a instanceof ReadableStream||a&&typeof a==`object`&&`pipe`in a&&typeof a.pipe==`function`)&&!o.duplex&&(o.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))s=It(s,e,t);let l=i._removeEmptyFolders(t),u=i._getFinalPath(l),d=await(e==`PUT`?Jt:k)(i.fetch,`${i.url}/object/${u}`,a,D({headers:s},o?.duplex?{duplex:o.duplex}:{}));return{path:l,id:d.Id,fullPath:d.Key}})}async upload(e,t,n){return this.uploadOrUpdate(`POST`,e,t,n)}async uploadToSignedUrl(e,t,n,r){var i=this;let a=i._removeEmptyFolders(e),o=i._getFinalPath(a),s=new URL(i.url+`/object/upload/sign/${o}`);return s.searchParams.set(`token`,t),i.handleOperation(async()=>{let e,t=D(D({},nn),r),o=D(D({},i.headers),{"x-upsert":String(t.upsert)}),c=t.metadata;if(typeof Blob<`u`&&n instanceof Blob?(e=new FormData,e.append(`cacheControl`,t.cacheControl),c&&e.append(`metadata`,i.encodeMetadata(c)),e.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(e=n,e.has(`cacheControl`)||e.append(`cacheControl`,t.cacheControl),c&&!e.has(`metadata`)&&e.append(`metadata`,i.encodeMetadata(c))):(e=n,o[`cache-control`]=`max-age=${t.cacheControl}`,o[`content-type`]=t.contentType,c&&(o[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&e instanceof ReadableStream||e&&typeof e==`object`&&`pipe`in e&&typeof e.pipe==`function`)&&!t.duplex&&(t.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))o=It(o,e,t);return{path:a,fullPath:(await Jt(i.fetch,s.toString(),e,D({headers:o},t?.duplex?{duplex:t.duplex}:{}))).Key}})}async createSignedUploadUrl(e,t){var n=this;return n.handleOperation(async()=>{let r=n._getFinalPath(e),i=D({},n.headers);t?.upsert&&(i[`x-upsert`]=`true`);let a=await k(n.fetch,`${n.url}/object/upload/sign/${r}`,{},{headers:i}),o=new URL(n.url+a.url),s=o.searchParams.get(`token`);if(!s)throw new Mt(`No token returned by API`);return{signedUrl:o.toString(),path:e,token:s}})}async update(e,t,n){return this.uploadOrUpdate(`PUT`,e,t,n)}async move(e,t,n){var r=this;return r.handleOperation(async()=>await k(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket,sourceVersionId:n?.sourceVersionId},{headers:r.headers}))}async copy(e,t,n){var r=this;return r.handleOperation(async()=>({path:(await k(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket,sourceVersionId:n?.sourceVersionId},{headers:r.headers})).Key}))}async createSignedUrl(e,t,n){var r=this;return r.handleOperation(async()=>{let i=r._getFinalPath(e),a=typeof n?.transform==`object`&&n.transform!==null&&Object.keys(n.transform).length>0,o=await k(r.fetch,`${r.url}/object/sign/${i}`,D(D({expiresIn:t},a?{transform:n.transform}:{}),n?.versionId==null?{}:{versionId:n.versionId}),{headers:r.headers}),s=new URLSearchParams;n?.download&&s.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&s.set(`cacheNonce`,String(n.cacheNonce));let c=s.toString();return{signedUrl:encodeURI(`${r.url}${o.signedURL}${c?`&${c}`:``}`)}})}async createSignedUrls(e,t,n){var r=this;return r.handleOperation(async()=>{let i=await k(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:t,paths:e},{headers:r.headers}),a=new URLSearchParams;n?.download&&a.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&a.set(`cacheNonce`,String(n.cacheNonce));let o=a.toString();return i.map(e=>D(D({},e),{},{signedUrl:e.signedURL?encodeURI(`${r.url}${e.signedURL}${o?`&${o}`:``}`):null}))})}download(e,t,n){let r=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image/authenticated`:`object`,i=new URLSearchParams;t?.transform&&this.applyTransformOptsToQuery(i,t.transform),t?.cacheNonce!=null&&i.set(`cacheNonce`,String(t.cacheNonce)),t?.versionId!=null&&i.set(`versionId`,String(t.versionId));let a=i.toString(),o=this._getFinalPath(e);return new en(()=>O(this.fetch,`${this.url}/${r}/${o}${a?`?${a}`:``}`,{headers:this.headers,noResolveJson:!0},n),this.shouldThrowOnError)}async info(e,t){var n=this;let r=n._getFinalPath(e),i=new URLSearchParams;t?.versionId!=null&&i.set(`versionId`,String(t.versionId));let a=i.toString();return n.handleOperation(async()=>Bt(await O(n.fetch,`${n.url}/object/info/${r}${a?`?${a}`:``}`,{headers:n.headers})))}async exists(e){var t=this;let n=t._getFinalPath(e);try{return await Yt(t.fetch,`${t.url}/object/${n}`,{headers:t.headers}),{data:!0,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Nt(e)){let t=e instanceof Pt?e.status:e instanceof Ft?e.originalError?.status:void 0;if(t!==void 0&&[400,404].includes(t))return{data:!1,error:e}}throw e}}getPublicUrl(e,t){let n=this._getFinalPath(e),r=new URLSearchParams;t?.download&&r.set(`download`,t.download===!0?``:t.download),t?.transform&&this.applyTransformOptsToQuery(r,t.transform),t?.cacheNonce!=null&&r.set(`cacheNonce`,String(t.cacheNonce)),t?.versionId!=null&&r.set(`versionId`,String(t.versionId));let i=r.toString(),a=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image`:`object`;return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}`)+(i?`?${i}`:``)}}}async remove(e){var t=this;return t.handleOperation(async()=>await A(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async purgeCache(e,t,n){var r=this;return r.handleOperation(async()=>{let i=Ht(r._getFinalPath(e)),a=new URLSearchParams;t?.transformations&&a.set(`transformations`,`true`);let o=a.toString();return await A(r.fetch,`${r.url}/cdn/${i}${o?`?${o}`:``}`,{},{headers:r.headers},n)})}async list(e,t,n){var r=this;return r.handleOperation(async()=>{let i=t?.sortBy?D(D({},tn.sortBy),t.sortBy):tn.sortBy,a=D(D(D({},tn),t),{},{sortBy:i,prefix:e||``});return await k(r.fetch,`${r.url}/object/list/${r.bucketId}`,a,{headers:r.headers},n)})}async listV2(e,t){var n=this;return n.handleOperation(async()=>{let r=D({},e);return await k(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,r,{headers:n.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<`u`?Buffer.from(e).toString(`base64`):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,``)}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,``).replace(/\/+/g,`/`)}applyTransformOptsToQuery(e,t){return t.width&&e.set(`width`,t.width.toString()),t.height&&e.set(`height`,t.height.toString()),t.resize&&e.set(`resize`,t.resize),t.format&&e.set(`format`,t.format),t.quality&&e.set(`quality`,t.quality.toString()),e}};let an={"X-Client-Info":`storage-js/2.117.2`};var on=class extends Xt{constructor(e,t={},n,r){let i=new URL(e);r?.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes(`storage.supabase.`)&&(i.hostname=i.hostname.replace(`supabase.`,`storage.supabase.`));let a=i.href.replace(/\/$/,``),o=D(D({},an),t);super(a,o,n,`storage`)}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=t.listBucketOptionsToQueryString(e);return await O(t.fetch,`${t.url}/bucket${n}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await O(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var n=this;return n.handleOperation(async()=>await k(n.fetch,`${n.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes,versioning_status:t.versioningStatus},{headers:n.headers}))}async updateBucket(e,t){var n=this;return n.handleOperation(async()=>await Jt(n.fetch,`${n.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes,versioning_status:t.versioningStatus},{headers:n.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await k(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await A(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}async getBucketLifecycle(e){var t=this;return t.handleOperation(async()=>await O(t.fetch,t.bucketLifecycleUrl(e),{headers:t.headers}))}async updateBucketLifecycle(e,t){var n=this;return n.handleOperation(async()=>await Jt(n.fetch,n.bucketLifecycleUrl(e),t,{headers:n.headers}))}async deleteBucketLifecycle(e){var t=this;return t.handleOperation(async()=>await A(t.fetch,t.bucketLifecycleUrl(e),{},{headers:t.headers}))}async purgeBucketCache(e,t,n){var r=this;return r.handleOperation(async()=>{let i=new URLSearchParams;t?.transformations&&i.set(`transformations`,`true`);let a=i.toString();return await A(r.fetch,`${r.url}/cdn/${Ht(e)}${a?`?${a}`:``}`,{},{headers:r.headers},n)})}bucketLifecycleUrl(e){return`${this.url}/bucket/${Ht(e)}/lifecycle`}listBucketOptionsToQueryString(e){let t={};return e&&(`limit`in e&&(t.limit=String(e.limit)),`offset`in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?`?`+new URLSearchParams(t).toString():``}},sn=class extends Xt{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=D(D({},an),t);super(r,i,n,`storage`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await k(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=new URLSearchParams;e?.limit!==void 0&&n.set(`limit`,e.limit.toString()),e?.offset!==void 0&&n.set(`offset`,e.offset.toString()),e?.sortColumn&&n.set(`sortColumn`,e.sortColumn),e?.sortOrder&&n.set(`sortOrder`,e.sortOrder),e?.search&&n.set(`search`,e.search);let r=n.toString(),i=r?`${t.url}/bucket?${r}`:`${t.url}/bucket`;return await O(t.fetch,i,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await A(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!Vt(e))throw new Mt(`Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.`);let n=new Et({baseUrl:this.url,catalogName:e,auth:{type:`custom`,getHeaders:async()=>t.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(n,{get(e,t){let n=e[t];return typeof n==`function`?async(...t)=>{try{return{data:await n.apply(e,t),error:null}}catch(e){if(r)throw e;return{data:null,error:e}}}:n}})}},cn=class extends Xt{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=D(D({},an),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createIndex(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var n=this;return n.handleOperation(async()=>await j.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var n=this;return n.handleOperation(async()=>await j.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers})||{})}},ln=class extends Xt{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=D(D({},an),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw Error(`Vector batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw Error(`segmentCount must be between 1 and 16`);if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw Error(`Keys batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},un=class extends Xt{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=D(D({},an),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},dn=class extends un{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new fn(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,n=this;return t().call(n,e)}async getBucket(e){var t=()=>super.getBucket,n=this;return t().call(n,e)}async listBuckets(e={}){var t=()=>super.listBuckets,n=this;return t().call(n,e)}async deleteBucket(e){var t=()=>super.deleteBucket,n=this;return t().call(n,e)}},fn=class extends cn{constructor(e,t,n,r){super(e,t,r),this.vectorBucketName=n}async createIndex(e){var t=()=>super.createIndex,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,n=this;return t().call(n,n.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,n=this;return t().call(n,n.vectorBucketName,e)}index(e){return new pn(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},pn=class extends ln{constructor(e,t,n,r,i){super(e,t,i),this.vectorBucketName=n,this.indexName=r}async putVectors(e){var t=()=>super.putVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(e){var t=()=>super.getVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},mn=class extends on{constructor(e,t={},n,r){super(e,t,n,r)}from(e){return new rn(this.url,this.headers,e,this.fetch)}get vectors(){return new dn(this.url+`/vector`,{headers:this.headers,fetch:this.fetch})}get analytics(){return new sn(this.url+`/iceberg`,this.headers,this.fetch)}};let hn=``,gn;typeof Deno<`u`?(hn=`deno`,gn=Deno.version?.deno):typeof document<`u`?hn=`web`:typeof navigator<`u`&&navigator.product===`ReactNative`?hn=`react-native`:(hn=`node`,gn=globalThis.process?.version?.replace(/^v/,``));let _n=[`runtime=${hn}`];gn&&_n.push(`runtime-version=${gn}`);let vn={headers:{"X-Client-Info":`supabase-js/2.117.2; ${_n.join(`; `)}`}},yn={schema:`public`},bn={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:`implicit`},xn={},Sn={enabled:!1,respectSamplingDecision:!0};function Cn(e){if(!e||typeof e!=`string`)return null;let t=e.split(`-`);if(t.length!==4)return null;let[n,r,i,a]=t;if(n.length!==2||r.length!==32||i.length!==16||a.length!==2)return null;let o=/^[0-9a-f]+$/i;return!o.test(n)||!o.test(r)||!o.test(i)||!o.test(a)||r===`00000000000000000000000000000000`||i===`0000000000000000`?null:{version:n,traceId:r,parentId:i,traceFlags:a,isSampled:(parseInt(a,16)&1)==1}}function wn(e,t){if(!e||!t||t.length===0)return!1;let n;if(e instanceof URL)n=e;else try{n=new URL(e)}catch{return!1}for(let e of t)try{if(typeof e==`string`){if(Tn(n.hostname,e))return!0}else if(e instanceof RegExp){if(e.test(n.hostname))return!0}else if(typeof e==`function`&&e(n))return!0}catch{continue}return!1}function Tn(e,t){if(t===e)return!0;if(t.startsWith(`*.`)){let n=t.slice(2);if(e.endsWith(n)&&(e===n||e.endsWith(`.`+n)))return!0}return!1}function En(e){let t=[];try{let n=new URL(e);t.push(n.hostname)}catch{}return t.push(`*.supabase.co`,`*.supabase.in`),t.push(`localhost`,`127.0.0.1`,`[::1]`),t}let Dn=Symbol.for(`@supabase/supabase-js.traceContextExtractor`);function On(){return globalThis[Dn]}let kn=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),An=()=>Headers,jn=e=>e.startsWith(`sb_publishable_`)||e.startsWith(`sb_secret_`),Mn=new Set,Nn=e=>{if(!e.startsWith(`sb_`)||jn(e)||e.startsWith(`sb_temp_`))return;let t=e.match(/^sb_[a-zA-Z0-9]+_/)?.[0]??`unknown`;Mn.has(t)||(Mn.add(t),console.warn(`@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type.`))},Pn=(e,t,n,r,i,a)=>{let o=kn(r),s=An(),c=i?.enabled===!0,l=i?.respectSamplingDecision!==!1,u=c?En(t):null,d=!(a?.omitApiKeyAsBearer&&jn(e));return async(t,r)=>{let i=await n(),a=new s(r?.headers);if(a.has(`apikey`)||a.set(`apikey`,e),!a.has(`Authorization`)){let t=i??(d?e:null);t&&a.set(`Authorization`,`Bearer ${t}`)}if(u){let e=Ln(t,u,l);e&&(e.traceparent&&!a.has(`traceparent`)&&a.set(`traceparent`,e.traceparent),e.tracestate&&!a.has(`tracestate`)&&a.set(`tracestate`,e.tracestate),e.baggage&&!a.has(`baggage`)&&a.set(`baggage`,e.baggage))}return o(t,{...r,headers:a})}},Fn=!1,In=!1;function Ln(e,t,n){let r=On();if(!r)return Fn||(Fn=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!wn(typeof e==`string`||e instanceof URL?e:e.url,t))return null;let i=r();if(!i||!i.traceparent){if(i?.carrierKeys?.length&&!In){In=!0;let e=i.carrierKeys.includes(`sentry-trace`)?" Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it.":` Configure your tracing SDK to emit W3C trace context on outgoing requests.`;console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${i.carrierKeys.join(`, `)}] and no W3C traceparent header, so trace headers will not be attached.`+e)}return null}if(n){let e=Cn(i.traceparent);if(e&&!e.isSampled)return{traceparent:i.traceparent}}return i}function Rn(e){return typeof e==`boolean`?{enabled:e}:e}function zn(e){return e.endsWith(`/`)?e:e+`/`}let Bn=!1;function Vn(e){Bn||typeof e!=`object`||!e||!(`schema`in e)||e.schema===void 0||(Bn=!0,console.warn(`@supabase/supabase-js: The "schema" option must be nested under "db", e.g. createClient(url, key, { db: { schema: 'myschema' } }). A top-level "schema" is ignored and queries go to the default schema.`))}function Hn(e,t){let{db:n,auth:r,realtime:i,global:a}=e,{db:o,auth:s,realtime:c,global:l}=t,u=Rn(e.tracePropagation),d=Rn(t.tracePropagation),f={db:{...o,...n},auth:{...s,...r},realtime:{...c,...i},storage:{},global:{...l,...a,headers:{...l?.headers??{},...a?.headers??{}}},tracePropagation:{enabled:u?.enabled??d?.enabled??!1,respectSamplingDecision:u?.respectSamplingDecision??d?.respectSamplingDecision??!0},accessToken:async()=>``};return e.accessToken?f.accessToken=e.accessToken:delete f.accessToken,f}function Un(e){let t=e?.trim();if(!t)throw Error(`supabaseUrl is required.`);if(!t.match(/^https?:\/\//i))throw Error(`Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.`);try{return new URL(zn(t))}catch{throw Error(`Invalid supabaseUrl: Provided URL is malformed.`)}}let Wn=`2.117.2`,M=30*1e3,Gn=3*M;2*M;let Kn={"X-Client-Info":`gotrue-js/${Wn}`},qn=`X-Supabase-Api-Version`,Jn={"2024-01-01":{timestamp:Date.parse(`2024-01-01T00:00:00.0Z`),name:`2024-01-01`}},Yn=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,N=`sb_flow_id`;var Xn=class extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name=`AuthError`,this.status=t,this.code=n}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}};function P(e){return typeof e==`object`&&!!e&&`__isAuthError`in e}var Zn=class extends Xn{constructor(e,t,n){super(e,t,n),this.name=`AuthApiError`,this.status=t,this.code=n}};function Qn(e){return P(e)&&e.name===`AuthApiError`}var F=class extends Xn{constructor(e,t){super(e),this.name=`AuthUnknownError`,this.originalError=t}},I=class extends Xn{constructor(e,t,n,r){super(e,n,r),this.name=t,this.status=n}},L=class extends I{constructor(){super(`Auth session missing!`,`AuthSessionMissingError`,400,void 0)}};function $n(e){return P(e)&&e.name===`AuthSessionMissingError`}var R=class extends I{constructor(){super(`Auth session or user missing`,`AuthInvalidTokenResponseError`,500,void 0)}},er=class extends I{constructor(e){super(e,`AuthInvalidCredentialsError`,400,void 0)}},tr=class extends I{constructor(e,t=null){super(e,`AuthImplicitGrantRedirectError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}};function nr(e){return P(e)&&e.name===`AuthImplicitGrantRedirectError`}var rr=class extends I{constructor(e,t=null){super(e,`AuthPKCEGrantCodeExchangeError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}},ir=class extends I{constructor(){super(`PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.`,`AuthPKCECodeVerifierMissingError`,400,`pkce_code_verifier_not_found`)}};function ar(e){return P(e)&&e.name===`AuthPKCECodeVerifierMissingError`}var or=class extends I{constructor(e,t){super(e,`AuthRetryableFetchError`,t,void 0)}};function sr(e){return P(e)&&e.name===`AuthRetryableFetchError`}var cr=class extends I{constructor(e=`Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)`){super(e,`AuthRefreshDiscardedError`,409,void 0)}};function lr(e){return P(e)&&e.name===`AuthRefreshDiscardedError`}var ur=class extends I{constructor(e,t,n){super(e,`AuthWeakPasswordError`,t,`weak_password`),this.reasons=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}};function dr(e){return P(e)&&e.name===`AuthWeakPasswordError`}var fr=class extends I{constructor(e){super(e,`AuthInvalidJwtError`,400,`invalid_jwt`)}};let pr=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`.split(``),mr=` 	
\r=`.split(``),hr=(()=>{let e=Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<mr.length;t+=1)e[mr[t].charCodeAt(0)]=-2;for(let t=0;t<pr.length;t+=1)e[pr[t].charCodeAt(0)]=t;return e})();function gr(e,t,n){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;)n(pr[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6;else if(t.queuedBits>0)for(t.queue<<=6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;)n(pr[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6}function _r(e,t,n){let r=hr[e];if(r>-1)for(t.queue=t.queue<<6|r,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else if(r===-2)return;else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}function vr(e){let t=[],n=e=>{t.push(String.fromCodePoint(e))},r={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},a=e=>{xr(e,r,n)};for(let t=0;t<e.length;t+=1)_r(e.charCodeAt(t),i,a);return t.join(``)}function yr(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function br(e,t){for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);if(r>55295&&r<=56319){let t=(r-55296)*1024&65535;r=(e.charCodeAt(n+1)-56320&65535|t)+65536,n+=1}yr(r,t)}}function xr(e,t,n){if(t.utf8seq===0){if(e<=127){n(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw Error(`Invalid UTF-8 sequence`);--t.utf8seq}else if(t.utf8seq>0){if(e<=127)throw Error(`Invalid UTF-8 sequence`);t.codepoint=t.codepoint<<6|e&63,--t.utf8seq,t.utf8seq===0&&n(t.codepoint)}}function Sr(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};for(let t=0;t<e.length;t+=1)_r(e.charCodeAt(t),n,r);return new Uint8Array(t)}function Cr(e){let t=[];return br(e,e=>t.push(e)),new Uint8Array(t)}function z(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};return e.forEach(e=>gr(e,n,r)),gr(null,n,r),t.join(``)}function wr(e){return Math.round(Date.now()/1e3)+e}function Tr(){return Symbol(`auth-callback`)}let B=()=>typeof window<`u`&&typeof document<`u`,V={tested:!1,writable:!1},Er=()=>{if(!B())return!1;try{if(typeof globalThis.localStorage!=`object`)return!1}catch{return!1}if(V.tested)return V.writable;let e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),V.tested=!0,V.writable=!0}catch{V.tested=!0,V.writable=!1}return V.writable};function Dr(e){let t={},n=new URL(e);if(n.hash&&n.hash[0]===`#`)try{new URLSearchParams(n.hash.substring(1)).forEach((e,n)=>{t[n]=e})}catch{}return n.searchParams.forEach((e,n)=>{t[n]=e}),t}let Or=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),kr=e=>typeof e==`object`&&!!e&&`status`in e&&`ok`in e&&`json`in e&&typeof e.json==`function`,H=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},U=async(e,t)=>{let n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch{return null}},W=async(e,t)=>{await e.removeItem(t)};var Ar=class e{constructor(){this.promise=new e.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}};Ar.promiseConstructor=Promise;function jr(e){let t=e.split(`.`);if(t.length!==3)throw new fr(`Invalid JWT structure`);for(let e=0;e<t.length;e++)if(!Yn.test(t[e]))throw new fr(`JWT not in base64url format`);return{header:JSON.parse(vr(t[0])),payload:JSON.parse(vr(t[1])),signature:Sr(t[2]),raw:{header:t[0],payload:t[1]}}}async function Mr(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function Nr(e,t){return new Promise((n,r)=>{(async()=>{for(let i=0;i<1/0;i++)try{let r=await e(i);if(!t(i,null,r)){n(r);return}}catch(e){if(!t(i,e)){r(e);return}}})()})}function Pr(e){return(`0`+e.toString(16)).substr(-2)}function Fr(){let e=new Uint32Array(56);if(typeof crypto>`u`){let e=``;for(let t=0;t<56;t++)e+=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~`.charAt(Math.floor(Math.random()*66));return e}return crypto.getRandomValues(e),Array.from(e,Pr).join(``)}async function Ir(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest(`SHA-256`,t),r=new Uint8Array(n);return Array.from(r).map(e=>String.fromCharCode(e)).join(``)}async function Lr(e){if(!(typeof crypto<`u`&&crypto.subtle!==void 0&&typeof TextEncoder<`u`))return console.warn(`WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.`),e;let t=await Ir(e);return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}let Rr=/^[a-zA-Z0-9_-]{8,64}$/;function zr(e){return typeof e==`string`&&Rr.test(e)?e:null}function Br(){if(typeof crypto<`u`&&typeof crypto.getRandomValues==`function`){let e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,Pr).join(``)}let e=``;for(let t=0;t<32;t++)e+=Math.floor(Math.random()*16).toString(16);return e}let Vr=(e,t)=>`${e}-flow-${t}-code-verifier`,Hr=e=>`${e}-flows-code-verifier`;async function Ur(e,t){let n=await U(e,Hr(t));return Array.isArray(n)?n.filter(e=>zr(e)!==null):[]}async function Wr(e,t,n,r,i){await H(e,Vr(t,n),r);let a=(await Ur(e,t)).filter(e=>e!==n);for(a.push(n);a.length>5;){let n=a.shift();await W(e,Vr(t,n)),i?.(n)}await H(e,Hr(t),a),await H(e,`${t}-code-verifier`,r)}async function Gr(e,t,n){if(n){let r=await U(e,Vr(t,n));return{verifier:typeof r==`string`?r:null,flowId:n}}let r=await U(e,`${t}-code-verifier`);return{verifier:typeof r==`string`?r:null,flowId:null}}async function G(e,t,n){let r=`${t}-code-verifier`;if(!n){await W(e,r);return}let i=Vr(t,n),a=await U(e,i);await W(e,i);let o=await Ur(e,t),s=o.filter(e=>e!==n);s.length!==o.length&&(s.length>0?await H(e,Hr(t),s):await W(e,Hr(t))),a!=null&&a===await U(e,r)&&await W(e,r)}async function Kr(e,t){let n=await Ur(e,t);for(let r of n)await W(e,Vr(t,r));await W(e,Hr(t)),await W(e,`${t}-code-verifier`)}function qr(e,t){let n=e.indexOf(`#`),r=n===-1?e:e.slice(0,n),i=n===-1?``:e.slice(n),a=r.indexOf(`?`);if(a!==-1){let e=r.slice(0,a),t=r.slice(a+1).split(`&`).filter(e=>e!==``&&e!==N&&!e.startsWith(`${N}=`));r=t.length>0?`${e}?${t.join(`&`)}`:e}let o=r.includes(`?`)?`&`:`?`;return`${r}${o}${N}=${encodeURIComponent(t)}${i}`}async function Jr(e,t,n=!1,r){let i=Fr(),a=i;n&&(a+=`/recovery`);let o=Br();await Wr(e,t,o,a,r);let s=await Lr(i);return[s,i===s?`plain`:`s256`,o]}let Yr=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Xr(e){let t=e.headers.get(qn);if(!t||!t.match(Yr))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function Zr(e){if(!e)throw Error(`Missing exp claim`);if(e<=Math.floor(Date.now()/1e3))throw Error(`JWT has expired`)}function Qr(e){switch(e){case`RS256`:return{name:`RSASSA-PKCS1-v1_5`,hash:{name:`SHA-256`}};case`ES256`:return{name:`ECDSA`,namedCurve:`P-256`,hash:{name:`SHA-256`}};default:throw Error(`Invalid alg claim`)}}let $r=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function K(e){if(!$r.test(e))throw Error(`@supabase/auth-js: Expected parameter to be UUID but is not`)}function ei(e){if(!e.recoveryCodes)throw Error("@supabase/auth-js: the MFA recovery codes API is experimental and disabled by default. Enable it by passing `auth: { experimental: { recoveryCodes: true } }` to createClient (or to the GoTrueClient constructor).")}function ti(){return new Proxy({},{get:(e,t)=>{if(t===`__isUserNotAvailableProxy`)return!0;if(typeof t==`symbol`){let e=t.toString();if(e===`Symbol(Symbol.toPrimitive)`||e===`Symbol(Symbol.toStringTag)`||e===`Symbol(util.inspect.custom)`)return}throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function ni(e,t){return new Proxy(e,{get:(e,n,r)=>{if(n===`__isInsecureUserWarningProxy`)return!0;if(typeof n==`symbol`){let t=n.toString();if(t===`Symbol(Symbol.toPrimitive)`||t===`Symbol(Symbol.toStringTag)`||t===`Symbol(util.inspect.custom)`||t===`Symbol(nodejs.util.inspect.custom)`)return Reflect.get(e,n,r)}return!t.value&&typeof n==`string`&&(console.warn(`Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.`),t.value=!0),Reflect.get(e,n,r)}})}function ri(e){return JSON.parse(JSON.stringify(e))}let q=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error}return JSON.stringify(e)},ii=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function ai(e){if(!kr(e))throw new or(q(e),0);let t;try{t=await e.json()}catch(t){throw ii.includes(e.status)?new or(e.statusText||`HTTP ${e.status}`,e.status):new F(q(t),t)}if(ii.includes(e.status))throw new or(q(t),e.status);let n,r=Xr(e);if(r&&r.getTime()>=Jn[`2024-01-01`].timestamp&&typeof t==`object`&&t&&typeof t.code==`string`?n=t.code:typeof t==`object`&&t&&typeof t.error_code==`string`&&(n=t.error_code),n){if(n===`weak_password`)throw new ur(q(t),e.status,t.weak_password?.reasons||[]);if(n===`session_not_found`)throw new L}else if(typeof t==`object`&&t&&typeof t.weak_password==`object`&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0))throw new ur(q(t),e.status,t.weak_password.reasons);throw new Zn(q(t),e.status||500,n)}let oi=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};return e===`GET`?i:(i.headers=Object.assign({"Content-Type":`application/json;charset=UTF-8`},t?.headers),i.body=JSON.stringify(r),Object.assign(Object.assign({},i),n))};async function J(e,t,n,r){let i=Object.assign({},r?.headers);i[qn]||(i[qn]=Jn[`2024-01-01`].name),r?.jwt&&(i.Authorization=`Bearer ${r.jwt}`);let a=r?.query??{};r?.redirectTo&&(a.redirect_to=r.redirectTo);let o=await si(e,t,n+(Object.keys(a).length?`?`+new URLSearchParams(a).toString():``),{headers:i,noResolveJson:r?.noResolveJson},{},r?.body);return r?.xform?r?.xform(o):{data:Object.assign({},o),error:null}}async function si(e,t,n,r,i,a){let o=oi(t,r,i,a),s;try{s=await e(n,Object.assign({},o))}catch(e){throw new or(q(e),0)}if(s.ok||await ai(s),r?.noResolveJson)return s;try{return await s.json()}catch(e){await ai(e)}}function Y(e){let t=null;fi(e)&&(t=Object.assign({},e),e.expires_at||(t.expires_at=wr(e.expires_in)));let n=e.user??(typeof e?.id==`string`?e:null);return{data:{session:t,user:n},error:null}}function ci(e){let t=Y(e);return!t.error&&e.weak_password&&typeof e.weak_password==`object`&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message==`string`&&e.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0)&&(t.data.weak_password=e.weak_password),t}function X(e){return{data:{user:e.user??e},error:null}}function li(e){return{data:e,error:null}}function ui(e){let{action_link:n,email_otp:r,hashed_token:i,redirect_to:a,verification_type:o}=e,s=t(e,[`action_link`,`email_otp`,`hashed_token`,`redirect_to`,`verification_type`]);return{data:{properties:{action_link:n,email_otp:r,hashed_token:i,redirect_to:a,verification_type:o},user:Object.assign({},s)},error:null}}function di(e){return e}function fi(e){return!!e.access_token&&!!e.refresh_token&&!!e.expires_in}let pi=[`global`,`local`,`others`];var mi=class{constructor({url:e=``,headers:t={},fetch:n,experimental:r}){this.url=e,this.headers=t,this.fetch=Or(n),this.experimental=r??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,t=pi[0]){if(pi.indexOf(t)<0)throw Error(`@supabase/auth-js: Parameter scope must be one of ${pi.join(`, `)}`);try{return await J(this.fetch,`POST`,`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}async inviteUserByEmail(e,t={}){try{return await J(this.fetch,`POST`,`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async generateLink(e){try{let{options:n}=e,r=t(e,[`options`]),i=Object.assign(Object.assign({},r),n);return`newEmail`in r&&(i.new_email=r?.newEmail,delete i.newEmail),await J(this.fetch,`POST`,`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:ui,redirectTo:n?.redirectTo})}catch(e){if(P(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/users`,{body:e,headers:this.headers,xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async listUsers(e){try{let t={nextPage:null,lastPage:0,total:0},n=await J(this.fetch,`GET`,`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:di});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(P(e))return{data:{users:[]},error:e};throw e}}async getUserById(e){K(e);try{return await J(this.fetch,`GET`,`${this.url}/admin/users/${e}`,{headers:this.headers,xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async updateUserById(e,t){K(e);try{return await J(this.fetch,`PUT`,`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async deleteUser(e,t=!1){K(e);try{return await J(this.fetch,`DELETE`,`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async _listFactors(e){K(e.userId);try{let{data:t,error:n}=await J(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:n}}catch(e){if(P(e))return{data:null,error:e};throw e}}async _deleteFactor(e){K(e.userId),K(e.id);try{return{data:await J(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}async _listOAuthClients(e){try{let t={nextPage:null,lastPage:0,total:0},n=await J(this.fetch,`GET`,`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:di});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(P(e))return{data:{clients:[]},error:e};throw e}}async _createOAuthClient(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _getOAuthClient(e){try{return await J(this.fetch,`GET`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _updateOAuthClient(e,t){try{return await J(this.fetch,`PUT`,`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _deleteOAuthClient(e){try{return await J(this.fetch,`DELETE`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}async _regenerateOAuthClientSecret(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _listCustomProviders(e){try{let t={};return e?.type&&(t.type=e.type),await J(this.fetch,`GET`,`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:e=>({data:{providers:e?.providers??[]},error:null})})}catch(e){if(P(e))return{data:{providers:[]},error:e};throw e}}async _createCustomProvider(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _getCustomProvider(e){try{return await J(this.fetch,`GET`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _updateCustomProvider(e,t){try{return await J(this.fetch,`PUT`,`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _deleteCustomProvider(e){try{return await J(this.fetch,`DELETE`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}async _adminListPasskeys(e){K(e.userId);try{return await J(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _adminDeletePasskey(e){K(e.userId),K(e.passkeyId);try{return await J(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}};function hi(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}let Z={debug:!!(globalThis&&Er()&&globalThis.localStorage&&globalThis.localStorage.getItem(`supabase.gotrue-js.locks.debug`)===`true`)};var gi=class extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}},_i=class extends gi{},vi=class extends gi{};async function yi(e,t,n){Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquire lock`,e,t);let r=new globalThis.AbortController,i;t>0&&(i=setTimeout(()=>{r.abort(),Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock acquire timed out`,e)},t)),await Promise.resolve();try{return await globalThis.navigator.locks.request(e,t===0?{mode:`exclusive`,ifAvailable:!0}:{mode:`exclusive`,signal:r.signal},async r=>{if(r){clearTimeout(i),Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquired`,e,r.name);try{return await n()}finally{Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: released`,e,r.name)}}else if(t===0)throw Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: not immediately available`,e),new _i(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);else{if(Z.debug)try{let e=await globalThis.navigator.locks.query();console.log(`@supabase/gotrue-js: Navigator LockManager state`,JSON.stringify(e,null,`  `))}catch(e){console.warn(`@supabase/gotrue-js: Error when querying Navigator LockManager state`,e)}return console.warn(`@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request`),clearTimeout(i),await n()}})}catch(a){if(clearTimeout(i),typeof a==`object`&&a&&`name`in a&&a.name===`AbortError`){if(r.signal.aborted)return Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock`,e),console.warn(`@supabase/gotrue-js: Lock "${e}" was not released within ${t}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,{mode:`exclusive`,steal:!0},async t=>{if(t){Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: recovered (stolen)`,e,t.name);try{return await n()}finally{Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: released (stolen)`,e,t.name)}}else return console.warn(`@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true`),await n()}));throw Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: lock was stolen by another request`,e),new _i(`Lock "${e}" was released because another request stole it`)}throw a}}let bi={};async function xi(e,t,n){let r=bi[e]??Promise.resolve(),i=(async()=>{try{return await r,null}catch{return null}})(),a=(async()=>{let r=null;try{let n=t>=0?new Promise((n,i)=>{r=setTimeout(()=>{console.warn(`@supabase/gotrue-js: Lock "${e}" acquisition timed out after ${t}ms. This may be caused by another operation holding the lock. Consider increasing lockAcquireTimeout or checking for stuck operations.`),i(new vi(`Acquiring process lock with name "${e}" timed out`))},t)}):null;await Promise.race([i,n].filter(e=>e)),r!==null&&clearTimeout(r)}catch(e){if(r!==null&&clearTimeout(r),e instanceof gi)throw e}return await n()})();return bi[e]=(async()=>{try{return await a}catch(e){if(e instanceof gi){try{await r}catch{}return null}throw e}})(),await a}function Si(){if(typeof globalThis!=`object`)try{Object.defineProperty(Object.prototype,`__magic__`,{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<`u`&&(self.globalThis=self)}}function Ci(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function wi(e){return parseInt(e,16)}function Ti(e){let t=new TextEncoder().encode(e);return`0x`+Array.from(t,e=>e.toString(16).padStart(2,`0`)).join(``)}function Ei(e){let{chainId:t,domain:n,expirationTime:r,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:s,resources:c,scheme:l,uri:u,version:d}=e;if(!Number.isInteger(t))throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!n)throw Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);if(a&&a.length<8)throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);if(d!==`1`)throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(e.statement?.includes(`
`))throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`);let f=Ci(e.address),p=`${l?`${l}://${n}`:n} wants you to sign in with your Ethereum account:\n${f}\n\n${e.statement?`${e.statement}\n`:``}`,m=`URI: ${u}\nVersion: ${d}\nChain ID: ${t}${a?`\nNonce: ${a}`:``}\nIssued At: ${i.toISOString()}`;if(r&&(m+=`\nExpiration Time: ${r.toISOString()}`),o&&(m+=`\nNot Before: ${o.toISOString()}`),s&&(m+=`\nRequest ID: ${s}`),c){let e=`
Resources:`;for(let t of c){if(!t||typeof t!=`string`)throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t}`);e+=`\n- ${t}`}m+=e}return`${p}\n${m}`}var Q=class extends Error{constructor({message:e,code:t,cause:n,name:r}){super(e,{cause:n}),this.__isWebAuthnError=!0,this.name=r??(n instanceof Error?n.name:void 0)??`Unknown Error`,this.code=t}toJSON(){return{name:this.name,message:this.message,code:this.code}}},Di=class extends Q{constructor(e,t){super({code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:t,message:e}),this.name=`WebAuthnUnknownError`,this.originalError=t}};function Oi({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new Q({message:`Registration ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`ConstraintError`){if(n.authenticatorSelection?.requireResidentKey===!0)return new Q({message:`Discoverable credentials were required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT`,cause:e});if(t.mediation===`conditional`&&n.authenticatorSelection?.userVerification===`required`)return new Q({message:`User verification was required during automatic registration but it could not be performed`,code:`ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE`,cause:e});if(n.authenticatorSelection?.userVerification===`required`)return new Q({message:`User verification was required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT`,cause:e})}else if(e.name===`InvalidStateError`)return new Q({message:`The authenticator was previously registered`,code:`ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED`,cause:e});else if(e.name===`NotAllowedError`)return new Q({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`NotSupportedError`)return n.pubKeyCredParams.filter(e=>e.type===`public-key`).length===0?new Q({message:`No entry in pubKeyCredParams was of type "public-key"`,code:`ERROR_MALFORMED_PUBKEYCREDPARAMS`,cause:e}):new Q({message:`No available authenticator supported any of the specified pubKeyCredParams algorithms`,code:`ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(Fi(t)){if(n.rp.id!==t)return new Q({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else return new Q({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e})}else if(e.name===`TypeError`){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new Q({message:`User ID was not between 1 and 64 characters`,code:`ERROR_INVALID_USER_ID_LENGTH`,cause:e})}else if(e.name===`UnknownError`)return new Q({message:`The authenticator was unable to process the specified options, or could not create a new credential`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new Q({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}function ki({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new Q({message:`Authentication ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`NotAllowedError`)return new Q({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(Fi(t)){if(n.rpId!==t)return new Q({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else return new Q({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e})}else if(e.name===`UnknownError`)return new Q({message:`The authenticator was unable to process the specified options, or could not create a new assertion signature`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new Q({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}let Ai=new class{createNewAbortSignal(){if(this.controller){let e=Error(`Cancelling existing WebAuthn API call for new one`);e.name=`AbortError`,this.controller.abort(e)}let e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){let e=Error(`Manually cancelling existing WebAuthn API call`);e.name=`AbortError`,this.controller.abort(e),this.controller=void 0}}};function ji(e){if(!e)throw Error(`Credential creation options are required`);if(typeof PublicKeyCredential<`u`&&`parseCreationOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON==`function`)return PublicKeyCredential.parseCreationOptionsFromJSON(e);let{challenge:n,user:r,excludeCredentials:i}=e,a=t(e,[`challenge`,`user`,`excludeCredentials`]),o=Sr(n).buffer,s=Object.assign(Object.assign({},r),{id:Sr(r.id).buffer}),c=Object.assign(Object.assign({},a),{challenge:o,user:s});if(i&&i.length>0){c.excludeCredentials=Array(i.length);for(let e=0;e<i.length;e++){let t=i[e];c.excludeCredentials[e]=Object.assign(Object.assign({},t),{id:Sr(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return c}function Mi(e){if(!e)throw Error(`Credential request options are required`);if(typeof PublicKeyCredential<`u`&&`parseRequestOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON==`function`)return PublicKeyCredential.parseRequestOptionsFromJSON(e);let{challenge:n,allowCredentials:r}=e,i=t(e,[`challenge`,`allowCredentials`]),a=Sr(n).buffer,o=Object.assign(Object.assign({},i),{challenge:a});if(r&&r.length>0){o.allowCredentials=Array(r.length);for(let e=0;e<r.length;e++){let t=r[e];o.allowCredentials[e]=Object.assign(Object.assign({},t),{id:Sr(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return o}function Ni(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e;return{id:e.id,rawId:e.id,response:{attestationObject:z(new Uint8Array(e.response.attestationObject)),clientDataJSON:z(new Uint8Array(e.response.clientDataJSON))},type:`public-key`,clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:t.authenticatorAttachment??void 0}}function Pi(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e,n=e.getClientExtensionResults(),r=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:z(new Uint8Array(r.authenticatorData)),clientDataJSON:z(new Uint8Array(r.clientDataJSON)),signature:z(new Uint8Array(r.signature)),userHandle:r.userHandle?z(new Uint8Array(r.userHandle)):void 0},type:`public-key`,clientExtensionResults:n,authenticatorAttachment:t.authenticatorAttachment??void 0}}function Fi(e){return e===`localhost`||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function Ii(){return!!(B()&&`PublicKeyCredential`in window&&window.PublicKeyCredential&&`credentials`in navigator&&typeof(navigator==null?void 0:navigator.credentials)?.create==`function`&&typeof(navigator==null?void 0:navigator.credentials)?.get==`function`)}async function Li(e){try{let t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Di(`Browser returned unexpected credential type`,t)}:{data:null,error:new Di(`Empty credential response`,t)}}catch(t){return{data:null,error:Oi({error:t,options:e})}}}async function Ri(e){try{let t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Di(`Browser returned unexpected credential type`,t)}:{data:null,error:new Di(`Empty credential response`,t)}}catch(t){return{data:null,error:ki({error:t,options:e})}}}let zi={hints:[`security-key`],authenticatorSelection:{authenticatorAttachment:`cross-platform`,requireResidentKey:!1,userVerification:`preferred`,residentKey:`discouraged`},attestation:`direct`},Bi={userVerification:`preferred`,hints:[`security-key`],attestation:`direct`};function Vi(...e){let t=e=>typeof e==`object`&&!!e&&!Array.isArray(e),n=e=>e instanceof ArrayBuffer||ArrayBuffer.isView(e),r={};for(let i of e)if(i)for(let e in i){let a=i[e];if(a!==void 0)if(Array.isArray(a))r[e]=a;else if(n(a))r[e]=a;else if(t(a)){let n=r[e];t(n)?r[e]=Vi(n,a):r[e]=Vi(a)}else r[e]=a}return r}function Hi(e,t){return Vi(zi,e,t||{})}function Ui(e,t){return Vi(Bi,e,t||{})}var Wi=class{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:`webauthn`}))}async _challenge({factorId:e,webauthn:t,friendlyName:n,signal:r},i){try{let{data:a,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:o};let s=r??Ai.createNewAbortSignal();if(a.webauthn.type===`create`){let{user:e}=a.webauthn.credential_options.publicKey;if(!e.name){let t=n;if(t)e.name=`${e.id}:${t}`;else{let t=(await this.client.getUser()).data.user,n=t?.user_metadata?.name||t?.email||t?.id||`User`;e.name=`${e.id}:${n}`}}e.displayName||=e.name}switch(a.webauthn.type){case`create`:{let{data:t,error:n}=await Li({publicKey:Hi(a.webauthn.credential_options.publicKey,i?.create),signal:s});return t?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:t}},error:null}:{data:null,error:n}}case`request`:{let t=Ui(a.webauthn.credential_options.publicKey,i?.request),{data:n,error:r}=await Ri(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:t,signal:s}));return n?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:n}},error:null}:{data:null,error:r}}}}catch(e){return P(e)?{data:null,error:e}:{data:null,error:new F(`Unexpected error in challenge`,e)}}}async _verify({challengeId:e,factorId:t,webauthn:n}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:n})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new Xn(`rpId is required for WebAuthn authentication`)};try{if(!Ii())return{data:null,error:new F(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:n},signal:r},{request:i});if(!a)return{data:null,error:o};let{webauthn:s}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:s.type,rpId:t,rpOrigins:n,credential_response:s.credential_response}})}catch(e){return P(e)?{data:null,error:e}:{data:null,error:new F(`Unexpected error in authenticate`,e)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new Xn(`rpId is required for WebAuthn registration`)};try{if(!Ii())return{data:null,error:new F(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(t=>t.data?.all.find(t=>t.factor_type===`webauthn`&&t.friendly_name===e&&t.status===`unverified`)).then(e=>e?this.client.mfa.unenroll({factorId:e?.id}):void 0),{data:null,error:o};let{data:s,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:n},signal:r},{create:i});return s?this._verify({factorId:a.id,challengeId:s.challengeId,webauthn:{rpId:t,rpOrigins:n,type:s.webauthn.type,credential_response:s.webauthn.credential_response}}):{data:null,error:c}}catch(e){return P(e)?{data:null,error:e}:{data:null,error:new F(`Unexpected error in register`,e)}}}};Si();let Gi={url:`http://localhost:9999`,storageKey:`supabase.auth.token`,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Kn,flowType:`implicit`,debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},$={},Ki=!1;var qi=class e{get jwks(){return $[this.storageKey]?.jwks??{keys:[]}}set jwks(e){$[this.storageKey]=Object.assign(Object.assign({},$[this.storageKey]),{jwks:e})}get jwks_cached_at(){return $[this.storageKey]?.cachedAt??-(2**53-1)}set jwks_cached_at(e){$[this.storageKey]=Object.assign(Object.assign({},$[this.storageKey]),{cachedAt:e})}constructor(t){var n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;let r=Object.assign(Object.assign({},Gi),t);if(this.storageKey=r.storageKey,this.instanceID=e.nextInstanceID[this.storageKey]??0,e.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!r.debug,typeof r.debug==`function`&&(this.logger=r.debug),this.instanceID>0&&B()){let e=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(e),this.logDebugMessages&&console.trace(e)}if(this.persistSession=r.persistSession,this.autoRefreshToken=r.autoRefreshToken,this.experimental=r.experimental??{},this.admin=new mi({url:r.url,headers:r.headers,fetch:r.fetch,experimental:this.experimental}),this.url=r.url,this.headers=r.headers,this.fetch=Or(r.fetch),this.detectSessionInUrl=r.detectSessionInUrl,this.flowType=r.flowType,this.hasCustomAuthorizationHeader=r.hasCustomAuthorizationHeader,this.throwOnError=r.throwOnError,this.lockAcquireTimeout=r.lockAcquireTimeout,r.lock!=null&&(this.lock=r.lock,Ki||(Ki=!0,console.warn(`${this._logPrefix()} The "lock" option is deprecated and will be removed in v3. The client now coordinates session refreshes without a lock, so most apps can drop the option. See https://github.com/supabase/supabase-js/blob/master/packages/core/auth-js/migrations/lockless-coordination.md`))),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=-(2**53-1)),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Wi(this),recoveryCodes:{getStatus:this._getRecoveryCodesStatus.bind(this),generate:this._generateRecoveryCodes.bind(this),verify:this._verifyRecoveryCode.bind(this),regenerate:this._regenerateRecoveryCodes.bind(this),unenroll:this._unenrollRecoveryCodes.bind(this)}},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(r.storage?this.storage=r.storage:Er()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=hi(this.memoryStorage)),r.userStorage&&(this.userStorage=r.userStorage)):(this.memoryStorage={},this.storage=hi(this.memoryStorage)),B()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(e){console.error(`Failed to create a new BroadcastChannel, multi-tab state changes will not be available`,e)}(n=this.broadcastChannel)==null||n.addEventListener(`message`,async e=>{this._debug(`received broadcast notification from other tab or client`,e),(e.data.event===`TOKEN_REFRESHED`||e.data.event===`SIGNED_IN`)&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(e.data.event,e.data.session,!1)}catch(e){this._debug(`#broadcastChannel`,`error`,e)}})}r.skipAutoInitialize||this.initialize().catch(e=>{this._debug(`#initialize()`,`error`,e)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Wn}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock==null?await this._initialize():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))();let e=await this.initializePromise,t=this._pendingInitNotifications??[];this._pendingInitNotifications=null;for(let e of t)await this._notifyAllSubscribers(e.event,e.session,e.broadcast);return e}async _initialize(){try{let e={},t=`none`;if(B()&&(e=Dr(window.location.href),this._isImplicitGrantCallback(e)?t=`implicit`:await this._isPKCECallback(e)&&(t=`pkce`)),B()&&this.detectSessionInUrl&&t!==`none`){let{data:n,error:r}=await this._getSessionFromURL(e,t);if(r){if(this._debug(`#_initialize()`,`error detecting session from URL`,r),nr(r)){let e=r.details?.code;if(e===`identity_already_exists`||e===`identity_not_found`||e===`single_identity_not_deletable`)return{error:r}}return{error:r}}let{session:i,redirectType:a}=n;return this._debug(`#_initialize()`,`detected session in URL`,i,`redirect type`,a),await this._saveSession(i),setTimeout(async()=>{a===`recovery`?await this._notifyAllSubscribers(`PASSWORD_RECOVERY`,i):await this._notifyAllSubscribers(`SIGNED_IN`,i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return P(e)?this._returnResult({error:e}):this._returnResult({error:new F(`Unexpected error during initialization`,e)})}finally{await this._handleVisibilityChange(),this._debug(`#_initialize()`,`end`)}}async signInAnonymously(e){try{let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{data:e?.options?.data??{},gotrue_meta_security:{captcha_token:e?.options?.captchaToken}},xform:Y});if(n||!t)return this._returnResult({data:{user:null,session:null},error:n});let r=t.session,i=t.user;return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,r)),this._returnResult({data:{user:i,session:r},error:null})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signUp(e){let t=null;try{let n;if(`email`in e){let{email:r,password:i,options:a}=e,o=null,s=null;this.flowType===`pkce`&&([o,s,t]=await this._getCodeChallengeAndMethod()),n=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,t),body:{email:r,password:i,data:a?.data??{},gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:s},xform:Y})}else if(`phone`in e){let{phone:t,password:r,options:i}=e;n=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{phone:t,password:r,data:i?.data??{},channel:i?.channel??`sms`,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Y})}else throw new er(`You must provide either an email or phone number and a password`);let{data:r,error:i}=n;if(i||!r)return await G(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:i});let a=r.session,o=r.user;return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(await G(this.storage,this.storageKey,t),P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithPassword(e){try{let t;if(`email`in e){let{email:n,password:r,options:i}=e;t=await J(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:ci})}else if(`phone`in e){let{phone:n,password:r,options:i}=e;t=await J(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:ci})}else throw new er(`You must provide either an email or phone number and a password`);let{data:n,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!n||!n.session||!n.user){let e=new R;return this._returnResult({data:{user:null,session:null},error:e})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(`SIGNED_IN`,n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:r})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOAuth(e){return await this._handleProviderSignIn(e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:e.options?.skipBrowserRedirect})}async exchangeCodeForSession(e,t){return await this.initializePromise,this.lock==null?this._exchangeCodeForSession(e,t):this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,t))}async signInWithWeb3(e){let{chain:t}=e;switch(t){case`ethereum`:return await this.signInWithEthereum(e);case`solana`:return await this.signInWithSolana(e);default:throw Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(B())if(typeof i==`object`)s=i;else{let e=window;if(`ethereum`in e&&typeof e.ethereum==`object`&&`request`in e.ethereum&&typeof e.ethereum.request==`function`)s=e.ethereum;else throw Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`)}else{if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}let c=new URL(o?.url??window.location.href),l=await s.request({method:`eth_requestAccounts`}).then(e=>e).catch(()=>{throw Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`)});if(!l||l.length===0)throw Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);let u=Ci(l[0]),d=o?.signInWithEthereum?.chainId;d||=wi(await s.request({method:`eth_chainId`})),t=Ei({domain:c.host,address:u,statement:a,uri:c.href,version:`1`,chainId:d,nonce:o?.signInWithEthereum?.nonce,issuedAt:o?.signInWithEthereum?.issuedAt??new Date,expirationTime:o?.signInWithEthereum?.expirationTime,notBefore:o?.signInWithEthereum?.notBefore,requestId:o?.signInWithEthereum?.requestId,resources:o?.signInWithEthereum?.resources}),n=await s.request({method:`personal_sign`,params:[Ti(t),u]})}try{let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`ethereum`,message:t,signature:n},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Y});if(i)throw i;if(!r||!r.session||!r.user){let e=new R;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSolana(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(B())if(typeof i==`object`)s=i;else{let e=window;if(`solana`in e&&typeof e.solana==`object`&&(`signIn`in e.solana&&typeof e.solana.signIn==`function`||`signMessage`in e.solana&&typeof e.solana.signMessage==`function`))s=e.solana;else throw Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`)}else{if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}let c=new URL(o?.url??window.location.href);if(`signIn`in s&&s.signIn){let e=await s.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},o?.signInWithSolana),{version:`1`,domain:c.host,uri:c.href}),a?{statement:a}:null)),r;if(Array.isArray(e)&&e[0]&&typeof e[0]==`object`)r=e[0];else if(e&&typeof e==`object`&&`signedMessage`in e&&`signature`in e)r=e;else throw Error(`@supabase/auth-js: Wallet method signIn() returned unrecognized value`);if(`signedMessage`in r&&`signature`in r&&(typeof r.signedMessage==`string`||r.signedMessage instanceof Uint8Array)&&r.signature instanceof Uint8Array)t=typeof r.signedMessage==`string`?r.signedMessage:new TextDecoder().decode(r.signedMessage),n=r.signature;else throw Error(`@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields`)}else{if(!(`signMessage`in s)||typeof s.signMessage!=`function`||!(`publicKey`in s)||typeof s!=`object`||!s.publicKey||!(`toBase58`in s.publicKey)||typeof s.publicKey.toBase58!=`function`)throw Error(`@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API`);t=[`${c.host} wants you to sign in with your Solana account:`,s.publicKey.toBase58(),...a?[``,a,``]:[``],`Version: 1`,`URI: ${c.href}`,`Issued At: ${o?.signInWithSolana?.issuedAt??new Date().toISOString()}`,...o?.signInWithSolana?.notBefore?[`Not Before: ${o.signInWithSolana.notBefore}`]:[],...o?.signInWithSolana?.expirationTime?[`Expiration Time: ${o.signInWithSolana.expirationTime}`]:[],...o?.signInWithSolana?.chainId?[`Chain ID: ${o.signInWithSolana.chainId}`]:[],...o?.signInWithSolana?.nonce?[`Nonce: ${o.signInWithSolana.nonce}`]:[],...o?.signInWithSolana?.requestId?[`Request ID: ${o.signInWithSolana.requestId}`]:[],...o?.signInWithSolana?.resources?.length?[`Resources`,...o.signInWithSolana.resources.map(e=>`- ${e}`)]:[]].join(`
`);let e=await s.signMessage(new TextEncoder().encode(t),`utf8`);if(!e||!(e instanceof Uint8Array))throw Error(`@supabase/auth-js: Wallet signMessage() API returned an recognized value`);n=e}}try{let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`solana`,message:t,signature:z(n)},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Y});if(i)throw i;if(!r||!r.session||!r.user){let e=new R;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _exchangeCodeForSession(e,t){let n=t?.flowId!=null,r=n?zr(t?.flowId):B()?zr(Dr(window.location.href)[N]):null;n&&!r&&this._debug(`#_exchangeCodeForSession()`,`provided flowId is not a valid flow id`,t?.flowId);let{verifier:i,flowId:a}=n&&!r?{verifier:null,flowId:null}:await Gr(this.storage,this.storageKey,r),[o,s]=(i??``).split(`/`);try{if(!o&&this.flowType===`pkce`)throw new ir;let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:Y});if(await G(this.storage,this.storageKey,a),n)throw n;if(!t||!t.session||!t.user){let e=new R;return this._returnResult({data:{user:null,session:null,redirectType:null},error:e})}return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(s===`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,t.session)),this._returnResult({data:Object.assign(Object.assign({},t),{redirectType:s??null}),error:n})}catch(e){if(await G(this.storage,this.storageKey,a),P(e))return this._returnResult({data:{user:null,session:null,redirectType:null},error:e});throw e}}async signInWithIdToken(e){try{let{options:t,provider:n,token:r,access_token:i,nonce:a}=e,{data:o,error:s}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:r,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Y});if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!o||!o.session||!o.user){let e=new R;return this._returnResult({data:{user:null,session:null},error:e})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers(`SIGNED_IN`,o.session)),this._returnResult({data:o,error:s})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOtp(e){let t=null;try{if(`email`in e){let{email:n,options:r}=e,i=null,a=null;this.flowType===`pkce`&&([i,a,t]=await this._getCodeChallengeAndMethod());let{error:o}=await J(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{email:n,data:r?.data??{},create_user:r?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:r?.captchaToken},code_challenge:i,code_challenge_method:a},redirectTo:this._maybeAppendFlowIdToRedirect(r?.emailRedirectTo,t)});return this._returnResult({data:{user:null,session:null},error:o})}if(`phone`in e){let{phone:t,options:n}=e,{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:n?.data??{},create_user:n?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:n?.captchaToken},channel:n?.channel??`sms`}});return this._returnResult({data:{user:null,session:null,messageId:r?.message_id},error:i})}throw new er(`You must provide either an email or phone number.`)}catch(e){if(await G(this.storage,this.storageKey,t),P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async verifyOtp(e){try{let t,n;`options`in e&&(t=e.options?.redirectTo,n=e.options?.captchaToken);let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:t,xform:Y});if(i)throw i;if(!r)throw Error(`An error occurred on token verification.`);let a=r.session,o=r.user;return a?.access_token&&(await this._saveSession(a),await this._notifyAllSubscribers(e.type==`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSSO(e){let t=null;try{let n=null,r=null;this.flowType===`pkce`&&([n,r,t]=await this._getCodeChallengeAndMethod());let i=await J(this.fetch,`POST`,`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},`providerId`in e?{provider_id:e.providerId}:null),`domain`in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect(e.options?.redirectTo,t)}),e?.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:n,code_challenge_method:r}),headers:this.headers,xform:li});return i.data?.url&&B()&&!e.options?.skipBrowserRedirect&&window.location.assign(i.data.url),this._returnResult(i)}catch(e){if(await G(this.storage,this.storageKey,t),P(e))return this._returnResult({data:null,error:e});throw e}}async reauthenticate(){return await this.initializePromise,this.lock==null?await this._reauthenticate():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new L;let{error:r}=await J(this.fetch,`GET`,`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let t=null;try{let n=`${this.url}/resend`;if(`email`in e){let{email:r,type:i,options:a}=e,o=null,s=null;this.flowType===`pkce`&&([o,s,t]=await this._getCodeChallengeAndMethod());let{error:c}=await J(this.fetch,`POST`,n,{headers:this.headers,body:{email:r,type:i,gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:s},redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,t)});return c&&await G(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:c})}else if(`phone`in e){let{phone:t,type:r,options:i}=e,{data:a,error:o}=await J(this.fetch,`POST`,n,{headers:this.headers,body:{phone:t,type:r,gotrue_meta_security:{captcha_token:i?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a?.message_id},error:o})}throw new er(`You must provide either an email or phone number and a type`)}catch(e){if(await G(this.storage,this.storageKey,t),P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async getSession(){return await this.initializePromise,this.lock==null?await this._useSession(async e=>e):await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e))}async _acquireLock(e,t){this._debug(`#_acquireLock`,`begin`,e);try{if(this.lockAcquired){let e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug(`#_acquireLock`,`lock acquired for storage key`,this.storageKey);try{this.lockAcquired=!0;let e=t();for(this.pendingInLock.push((async()=>{try{await e}catch{}})()),await e;this.pendingInLock.length;){let e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug(`#_acquireLock`,`lock released for storage key`,this.storageKey),this.lockAcquired=!1}})}finally{this._debug(`#_acquireLock`,`end`)}}async _useSession(e){this._debug(`#_useSession`,`begin`);try{return await e(await this.__loadSession())}finally{this._debug(`#_useSession`,`end`)}}async __loadSession(){this._debug(`#__loadSession()`,`begin`),this.lock!=null&&!this.lockAcquired&&this._debug(`#__loadSession()`,`used outside of an acquired lock!`,Error().stack);try{let e=null,t=await U(this.storage,this.storageKey);if(this._debug(`#getSession()`,`session from storage`,t),t!==null&&(this._isValidSession(t)?e=t:(this._debug(`#getSession()`,`session from storage is not valid`),await this._removeSession())),!e)return{data:{session:null},error:null};let n=e.expires_at?e.expires_at*1e3-Date.now()<Gn:!1;if(this._debug(`#__loadSession()`,`session has${n?``:` not`} expired`,`expires_at`,e.expires_at),!n)return{data:{session:await this._hydrateSessionUser(e)},error:null};let{data:r,error:i}=await this._callRefreshToken(e.refresh_token);if(i){let e=await U(this.storage,this.storageKey);return e&&this._isValidSession(e)&&e.expires_at&&e.expires_at*1e3>Date.now()?this._returnResult({data:{session:await this._hydrateSessionUser(e)},error:null}):this._returnResult({data:{session:null},error:i})}return this._returnResult({data:{session:r},error:null})}finally{this._debug(`#__loadSession()`,`end`)}}async _hydrateSessionUser(e){if(this.userStorage){let t=await U(this.userStorage,this.storageKey+`-user`);e.user=t?.user?t.user:ti()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){let t={value:this.suppressGetSessionWarning};e.user=ni(e.user,t),t.value&&(this.suppressGetSessionWarning=!0)}return e}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t;return t=this.lock==null?await this._getUser():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()),t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await J(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:e,xform:X}):await this._useSession(async e=>{let{data:t,error:n}=e;if(n)throw n;return!t.session?.access_token&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new L}:await J(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:t.session?.access_token??void 0,xform:X})})}catch(e){if(P(e))return $n(e)&&await this._removeSession(),this._returnResult({data:{user:null},error:e});throw e}}async updateUser(e,t={}){return await this.initializePromise,this.lock==null?await this._updateUser(e,t):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){let n=null;try{return await this._useSession(async r=>{let{data:i,error:a}=r;if(a)throw a;if(!i.session)throw new L;let o=i.session,s=null,c=null;this.flowType===`pkce`&&e.email!=null&&([s,c,n]=await this._getCodeChallengeAndMethod());let{data:l,error:u}=await J(this.fetch,`PUT`,`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t?.emailRedirectTo,n),body:Object.assign(Object.assign({},e),{code_challenge:s,code_challenge_method:c}),jwt:o.access_token,xform:X});if(u)throw u;return o.user=l.user,await this._saveSession(o),await this._notifyAllSubscribers(`USER_UPDATED`,o),this._returnResult({data:{user:o.user},error:null})})}catch(e){if(await G(this.storage,this.storageKey,n),P(e))return this._returnResult({data:{user:null},error:e});throw e}}async setSession(e){return await this.initializePromise,this.lock==null?await this._setSession(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new L;let t=Date.now()/1e3,n=t,r=!0,i=null,{payload:a}=jr(e.access_token);if(a.exp&&(n=a.exp,r=n<=t),r){let{data:t,error:n}=await this._callRefreshToken(e.refresh_token);if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!t)return{data:{user:null,session:null},error:null};i=t}else{let{data:r,error:a}=await this._getUser(e.access_token);if(a)return this._returnResult({data:{user:null,session:null},error:a});i={access_token:e.access_token,refresh_token:e.refresh_token,user:r.user,token_type:`bearer`,expires_in:n-t,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers(`SIGNED_IN`,i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(e){if(P(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}}async refreshSession(e){return await this.initializePromise,this.lock==null?await this._refreshSession(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{if(!e){let{data:n,error:r}=t;if(r)throw r;e=n.session??void 0}if(!e?.refresh_token)throw new L;let{data:n,error:r}=await this._callRefreshToken(e.refresh_token);return r?this._returnResult({data:{user:null,session:null},error:r}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _getSessionFromURL(e,t){try{if(!B())throw new tr(`No browser detected.`);if(e.error||e.error_description||e.error_code)throw new tr(e.error_description||`Error in URL with unspecified error_description`,{error:e.error||`unspecified_error`,code:e.error_code||`unspecified_code`});switch(t){case`implicit`:if(this.flowType===`pkce`)throw new rr(`Not a valid PKCE flow url.`);break;case`pkce`:if(this.flowType===`implicit`)throw new tr(`Not a valid implicit grant flow url.`);break;default:}if(t===`pkce`){if(this._debug(`#_initialize()`,`begin`,`is PKCE flow`,!0),!e.code)throw new rr(`No code detected.`);let{data:t,error:n}=await this._exchangeCodeForSession(e.code,{flowId:e[N]});if(n)throw n;let r=new URL(window.location.href);return r.searchParams.delete(`code`),r.searchParams.delete(N),window.history.replaceState(window.history.state,``,r.toString()),{data:{session:t.session,redirectType:t.redirectType??null},error:null}}let{provider_token:n,provider_refresh_token:r,access_token:i,refresh_token:a,expires_in:o,expires_at:s,token_type:c}=e;if(!i||!o||!a||!c)throw new tr(`No session defined in URL`);let l=Math.round(Date.now()/1e3),u=parseInt(o),d=l+u;s&&(d=parseInt(s));let f=d-l;f*1e3<=M&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${u}s`);let p=d-u;l-p>=120?console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale`,p,d,l):l-p<0&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew`,p,d,l);let{data:m,error:h}=await this._getUser(i);if(h)throw h;let g={provider_token:n,provider_refresh_token:r,access_token:i,expires_in:u,expires_at:d,refresh_token:a,token_type:c,user:m.user};return window.location.hash=``,this._debug(`#_getSessionFromURL()`,`clearing window.location.hash`),this._returnResult({data:{session:g,redirectType:e.type},error:null})}catch(e){if(P(e))return this._returnResult({data:{session:null,redirectType:null},error:e});throw e}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl==`function`?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;let t=zr(e[N]);return t&&await U(this.storage,Vr(this.storageKey,t))?!0:!!await U(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:`global`}){return await this.initializePromise,this.lock==null?await this._signOut(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:`global`}){return await this._useSession(async t=>{let n=async()=>{await this._removeSession()},{data:r,error:i}=t;if(i&&!$n(i))return this._returnResult({error:i});let a=r.session?.access_token;if(a){let{error:t}=await this.admin.signOut(a,e);if(t&&!(Qn(t)&&(t.status===404||t.status===401||t.status===403)||$n(t)))return e!==`others`&&await n(),this._returnResult({error:t})}return e!==`others`&&await n(),this._returnResult({error:null})})}onAuthStateChange(e){let t=Tr(),n={id:t,callback:e,unsubscribe:()=>{this._debug(`#unsubscribe()`,`state change callback with id removed`,t),this.stateChangeEmitters.delete(t)}};return this._debug(`#onAuthStateChange()`,`registered callback with id`,t),this.stateChangeEmitters.set(t,n),(async()=>{await this.initializePromise,this.lock==null?await this._emitInitialSession(t):await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})})(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{try{let{data:{session:n},error:r}=t;if(r)throw r;await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,n),this._debug(`INITIAL_SESSION`,`callback id`,e,`session`,n)}catch(t){if(await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,null),this._debug(`INITIAL_SESSION`,`callback id`,e,`error`,t),lr(t))return;$n(t)||sr(t)||Qn(t)&&(t.code===`refresh_token_not_found`||t.code===`refresh_token_already_used`||t.code===`session_expired`)?console.warn(t):console.error(t)}})}async resetPasswordForEmail(e,t={}){let n=null,r=null,i=null;this.flowType===`pkce`&&([n,r,i]=await this._getCodeChallengeAndMethod(!0));try{return await J(this.fetch,`POST`,`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t.redirectTo,i)})}catch(e){if(await G(this.storage,this.storageKey,i),P(e))return this._returnResult({data:null,error:e});throw e}}async getUserIdentities(){try{let{data:e,error:t}=await this.getUser();if(t)throw t;return this._returnResult({data:{identities:e.user.identities??[]},error:null})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async linkIdentity(e){return`token`in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){let t=null;try{let{data:n,error:r}=await this._useSession(async n=>{let{data:r,error:i}=n;if(i)throw i;let{url:a,flowId:o}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:!0});return t=o,await J(this.fetch,`GET`,a,{headers:this.headers,jwt:r.session?.access_token??void 0})});if(r)throw r;return B()&&!e.options?.skipBrowserRedirect&&window.location.assign(n?.url),this._returnResult({data:{provider:e.provider,url:n?.url,flowId:t},error:null})}catch(n){if(P(n))return this._returnResult({data:{provider:e.provider,url:null,flowId:t},error:n});throw n}}async linkIdentityIdToken(e){return await this._useSession(async t=>{try{let{error:n,data:{session:r}}=t;if(n)throw n;let{options:i,provider:a,token:o,access_token:s,nonce:c}=e,{data:l,error:u}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:r?.access_token??void 0,body:{provider:a,id_token:o,access_token:s,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Y});return u?this._returnResult({data:{user:null,session:null},error:u}):!l||!l.session||!l.user?this._returnResult({data:{user:null,session:null},error:new R}):(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers(`USER_UPDATED`,l.session)),this._returnResult({data:l,error:u}))}catch(e){if(await G(this.storage,this.storageKey,null),P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)throw r;return await J(this.fetch,`DELETE`,`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:n.session?.access_token??void 0})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _refreshAccessToken(e){let t=`#_refreshAccessToken()`;this._debug(t,`begin`);try{let n=Date.now();return await Nr(async n=>(n>0&&await Mr(200*2**(n-1)),this._debug(t,`refreshing attempt`,n),await J(this.fetch,`POST`,`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Y})),(e,t)=>{let r=200*2**e;return t&&sr(t)&&Date.now()+r-n<M})}catch(e){if(this._debug(t,`error`,e),P(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}finally{this._debug(t,`end`)}}_isValidSession(e){return typeof e==`object`&&!!e&&`access_token`in e&&`refresh_token`in e&&`expires_at`in e}async _handleProviderSignIn(e,t){let{url:n,flowId:r}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug(`#_handleProviderSignIn()`,`provider`,e,`options`,t,`url`,n),B()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n,flowId:r},error:null}}async _recoverAndRefresh(){let e=`#_recoverAndRefresh()`;this._debug(e,`begin`);try{let t=await U(this.storage,this.storageKey);if(t&&this.userStorage){let e=await U(this.userStorage,this.storageKey+`-user`);!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!e&&(e={user:t.user},await H(this.userStorage,this.storageKey+`-user`,e)),t.user=e?.user??ti()}else if(t&&!t.user&&!t.user){let e=await U(this.storage,this.storageKey+`-user`);e&&e?.user?(t.user=e.user,await W(this.storage,this.storageKey+`-user`),await H(this.storage,this.storageKey,t)):t.user=ti()}if(this._debug(e,`session from storage`,t),!this._isValidSession(t)){this._debug(e,`session is not valid`),t!==null&&await this._removeSession();return}let n=(t.expires_at??1/0)*1e3-Date.now()<Gn;if(this._debug(e,`session has${n?``:` not`} expired with margin of ${Gn}s`),n){if(this.autoRefreshToken&&t.refresh_token){let{error:n}=await this._callRefreshToken(t.refresh_token);n&&(lr(n)?this._debug(e,`refresh discarded by commit guard`,n):this._debug(e,`refresh failed`,n))}}else if(t.user&&t.user.__isUserNotAvailableProxy===!0)try{let{data:n,error:r}=await this._getUser(t.access_token);!r&&n?.user?(t.user=n.user,await this._saveSession(t),await this._notifyAllSubscribers(`SIGNED_IN`,t)):this._debug(e,`could not get user data, skipping SIGNED_IN notification`)}catch(t){console.error(`Error getting user data:`,t),this._debug(e,`error getting user data, skipping SIGNED_IN notification`,t)}else await this._notifyAllSubscribers(`SIGNED_IN`,t)}catch(t){this._debug(e,`error`,t),sr(t)?console.warn(t):console.error(t);return}finally{this._debug(e,`end`)}}async _callRefreshToken(e){var t,n;if(!e)throw new L;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug(`#_callRefreshToken()`,`returning cached failure (cooldown active)`),this.lastRefreshFailure.result;let r=`#_callRefreshToken()`;this._debug(r,`begin`);try{this.refreshingDeferred=new Ar,this.refreshingDeferred.promise.then(void 0,()=>{});let t=await U(this.storage,this.storageKey),{data:n,error:i}=await this._refreshAccessToken(e);if(i)throw i;if(!n.session)throw new L;let a=await U(this.storage,this.storageKey);if(t!==null&&(a===null||a.refresh_token!==t.refresh_token)){this._debug(r,`commit guard: storage changed since refresh started, discarding rotated tokens`,{startedWith:`present`,nowHolds:a?`replaced`:`cleared`});let e={data:null,error:new cr};return this.refreshingDeferred.resolve(e),e}let o=this._sessionRemovalEpoch;if(await this._saveSession(n.session),this._sessionRemovalEpoch!==o){this._debug(r,`commit guard (post-save): _removeSession ran during _saveSession, undoing write`),await W(this.storage,this.storageKey),this.userStorage&&await W(this.userStorage,this.storageKey+`-user`);let e={data:null,error:new cr};return this.refreshingDeferred.resolve(e),e}await this._notifyAllSubscribers(`TOKEN_REFRESHED`,n.session);let s={data:n.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(s),s}catch(i){if(this._debug(r,`error`,i),P(i)){let n={data:null,error:i};if(!sr(i)){let e=await U(this.storage,this.storageKey);e?.expires_at&&e.expires_at*1e3>Date.now()?this._debug(r,`proactive refresh failed, access token still valid — preserving session`):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:n,expiresAt:Date.now()+6e4},(t=this.refreshingDeferred)==null||t.resolve(n),n}throw(n=this.refreshingDeferred)==null||n.reject(i),i}finally{this.refreshingDeferred=null,this._debug(r,`end`)}}async _notifyAllSubscribers(e,t,n=!0){if(this._pendingInitNotifications!==null&&n){this._pendingInitNotifications.push({event:e,session:t,broadcast:n});return}let r=`#_notifyAllSubscribers(${e})`;this._debug(r,`begin`,t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});let r=[],i=Array.from(this.stateChangeEmitters.values()).map(async n=>{try{await n.callback(e,t)}catch(e){r.push(e)}});if(await Promise.all(i),r.length>0){for(let e=0;e<r.length;e+=1)console.error(r[e]);throw r[0]}}finally{this._debug(r,`end`)}}async _saveSession(e){this._debug(`#_saveSession()`,e),this.suppressGetSessionWarning=!0;let t=Object.assign({},e),n=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&t.user&&await H(this.userStorage,this.storageKey+`-user`,{user:t.user});let e=Object.assign({},t);delete e.user;let r=ri(e);await H(this.storage,this.storageKey,r)}else{let e=ri(t);await H(this.storage,this.storageKey,e)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug(`#_removeSession()`),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await W(this.storage,this.storageKey),await Kr(this.storage,this.storageKey),await W(this.storage,this.storageKey+`-user`),this.userStorage&&await W(this.userStorage,this.storageKey+`-user`),await this._notifyAllSubscribers(`SIGNED_OUT`,null)}_removeVisibilityChangedCallback(){this._debug(`#_removeVisibilityChangedCallback()`);let e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&B()&&window!=null&&window.removeEventListener&&window.removeEventListener(`visibilitychange`,e)}catch(e){console.error(`removing visibilitychange callback failed`,e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug(`#_startAutoRefresh()`);let e=setInterval(()=>this._autoRefreshTokenTick(),M);this.autoRefreshTicker=e,e&&typeof e==`object`&&typeof e.unref==`function`?e.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(e);let t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t==`object`&&typeof t.unref==`function`?t.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug(`#_stopAutoRefresh()`);let e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);let t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)==null||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug(`#_autoRefreshTokenTick()`,`begin`),this.lock!=null){try{await this._acquireLock(0,async()=>{try{let e=Date.now();try{return await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/M);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${M}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}})}catch(e){if(e instanceof gi)this._debug(`auto refresh token tick lock not available`);else throw e}return}if(this.refreshingDeferred!==null){this._debug(`#_autoRefreshTokenTick()`,`refresh already in flight, skipping`);return}try{let e=Date.now();try{await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/M);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${M}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}}async _handleVisibilityChange(){if(this._debug(`#_handleVisibilityChange()`),!B()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug(`#visibilityChangedCallback`,`error`,e)}},window==null||window.addEventListener(`visibilitychange`,this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error(`_handleVisibilityChange`,e)}}async _onVisibilityChanged(e){let t=`#_onVisibilityChanged(${e})`;if(this._debug(t,`visibilityState`,document.visibilityState),document.visibilityState===`visible`){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!==`visible`){this._debug(t,`acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting`);return}await this._recoverAndRefresh()});else{if(document.visibilityState!==`visible`){this._debug(t,`visibilityState is no longer visible, skipping recovery`);return}await this._recoverAndRefresh()}}else document.visibilityState===`hidden`&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){let r=n?.redirectTo,i=null,a=null,o=null;this.flowType===`pkce`&&([i,a,o]=await this._getCodeChallengeAndMethod(),r=this._maybeAppendFlowIdToRedirect(r,o));let s=[`provider=${encodeURIComponent(t)}`];if(r&&s.push(`redirect_to=${encodeURIComponent(r)}`),n?.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),i!=null&&a!=null){let e=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(a)}`});s.push(e.toString())}if(n?.queryParams){let e=new URLSearchParams(n.queryParams);s.push(e.toString())}return n?.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),{url:`${e}?${s.join(`&`)}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,t){return!e||!t||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:qr(e,t)}async _getCodeChallengeAndMethod(e=!1){return Jr(this.storage,this.storageKey,e,e=>this._debug(`#_getCodeChallengeAndMethod()`,`evicted oldest pending PKCE verifier slot`,e))}async _unenroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;return r?this._returnResult({data:null,error:r}):await J(this.fetch,`DELETE`,`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:n?.session?.access_token})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _enroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType===`phone`?{phone:e.phone}:e.factorType===`totp`?{issuer:e.issuer}:{}),{data:a,error:o}=await J(this.fetch,`POST`,`${this.url}/factors`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(e.factorType===`totp`&&a.type===`totp`&&a?.totp?.qr_code&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),this._returnResult({data:a,error:null}))})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _verify(e){let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({challenge_id:e.challengeId},`webauthn`in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type===`create`?Ni(e.webauthn.credential_response):Pi(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:o}=await J(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,a),this._returnResult({data:a,error:o}))})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _challenge(e){let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=await J(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:n?.session?.access_token});if(i.error)return i;let{data:a}=i;if(a.type!==`webauthn`)return{data:a,error:null};switch(a.webauthn.type){case`create`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:ji(a.webauthn.credential_options.publicKey)})})}),error:null};case`request`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Mi(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _challengeAndVerify(e){let{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){let{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};let n={all:[],phone:[],totp:[],webauthn:[],recovery_code:[]};for(let t of e?.factors??[])n.all.push(t),t.status===`verified`&&t.factor_type in n&&Array.isArray(n[t.factor_type])&&n[t.factor_type].push(t);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){if(e)try{let{payload:t}=jr(e),n=null;t.aal&&(n=t.aal);let r=n,{data:{user:i},error:a}=await this.getUser(e);if(a)return this._returnResult({data:null,error:a});((i?.factors)?.filter(e=>e.status===`verified`)??[]).length>0&&(r=`aal2`);let o=t.amr||[];return{data:{currentLevel:n,nextLevel:r,currentAuthenticationMethods:o},error:null}}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}let{data:{session:t},error:n}=await this.getSession();if(n)return this._returnResult({data:null,error:n});if(!t)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let{payload:r}=jr(t.access_token),i=null;r.aal&&(i=r.aal);let a=i;(t.user.factors?.filter(e=>e.status===`verified`)??[]).length>0&&(a=`aal2`);let o=r.amr||[];return{data:{currentLevel:i,nextLevel:a,currentAuthenticationMethods:o},error:null}}async _getRecoveryCodesStatus(){ei(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await J(this.fetch,`GET`,`${this.url}/factors/recovery-codes`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _generateRecoveryCodes(e){ei(this.experimental);try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let{data:i,error:a}=await J(this.fetch,`POST`,`${this.url}/factors/recovery-codes`,{body:e?.friendlyName?{friendly_name:e.friendlyName}:void 0,headers:this.headers,jwt:n?.session?.access_token});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _verifyRecoveryCode(e){ei(this.experimental);let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let{data:i,error:a}=await J(this.fetch,`POST`,`${this.url}/factors/recovery-codes/verify`,{body:{code:e.code},headers:this.headers,jwt:n?.session?.access_token});if(a)return this._returnResult({data:null,error:a});let o=Object.assign({expires_at:wr(i.expires_in)},i);return await this._saveSession(o),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,o),this._returnResult({data:i,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _regenerateRecoveryCodes(){ei(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/factors/recovery-codes/regenerate`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _unenrollRecoveryCodes(){ei(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await J(this.fetch,`DELETE`,`${this.url}/factors/recovery-codes`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?await J(this.fetch,`GET`,`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:n.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new L})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _approveAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new L});let a=await J(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`approve`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&B()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _denyAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new L});let a=await J(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`deny`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&B()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _listOAuthGrants(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;return n?this._returnResult({data:null,error:n}):t?await J(this.fetch,`GET`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new L})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?(await J(this.fetch,`DELETE`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new L})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async fetchJwk(e,t={keys:[]}){let n=t.keys.find(t=>t.kid===e);if(n)return n;let r=Date.now();if(n=this.jwks.keys.find(t=>t.kid===e),n&&this.jwks_cached_at+6e5>r)return n;let{data:i,error:a}=await J(this.fetch,`GET`,`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=r,n=i.keys.find(t=>t.kid===e),!n)?null:n}async getClaims(e,t={}){try{let n=e;if(!n){let{data:e,error:t}=await this.getSession();if(t||!e.session)return this._returnResult({data:null,error:t});n=e.session.access_token}let{header:r,payload:i,signature:a,raw:{header:o,payload:s}}=jr(n);if(!t?.allowExpired)try{Zr(i.exp)}catch(e){throw new fr(e instanceof Error?e.message:`JWT validation failed`)}let c=!r.alg||r.alg.startsWith(`HS`)||!r.kid||!(`crypto`in globalThis&&`subtle`in globalThis.crypto)?null:await this.fetchJwk(r.kid,t?.keys?{keys:t.keys}:t?.jwks);if(!c){let{error:e}=await this.getUser(n);if(e)throw e;return{data:{claims:i,header:r,signature:a},error:null}}let l=Qr(r.alg),u=await crypto.subtle.importKey(`jwk`,c,l,!0,[`verify`]);if(!await crypto.subtle.verify(l,u,a,Cr(`${o}.${s}`)))throw new fr(`Invalid JWT signature`);return{data:{claims:i,header:r,signature:a},error:null}}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async signInWithPasskey(e){try{if(!Ii())return this._returnResult({data:null,error:new F(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyAuthentication({options:{captchaToken:e?.options?.captchaToken}});if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await Ri({publicKey:Mi(t.options),signal:e?.options?.signal??Ai.createNewAbortSignal(),mediation:e?.options?.mediation});if(i||!r)return this._returnResult({data:null,error:i??new F(`WebAuthn ceremony failed`,null)});let a=Pi(r);return this._verifyPasskeyAuthentication({challengeId:t.challenge_id,credential:a})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async registerPasskey(e){try{if(!Ii())return this._returnResult({data:null,error:new F(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyRegistration();if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await Li({publicKey:ji(t.options),signal:e?.options?.signal??Ai.createNewAbortSignal()});if(i||!r)return this._returnResult({data:null,error:i??new F(`WebAuthn ceremony failed`,null)});let a=Ni(r);return this._verifyPasskeyRegistration({challengeId:t.challenge_id,credential:a})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyRegistration(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new L});let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:t.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new L});let{data:i,error:a}=await J(this.fetch,`POST`,`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:n.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyAuthentication(e){try{let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:e?.options?.captchaToken}}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:t,error:null})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyAuthentication(e){try{let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:Y});return n?this._returnResult({data:null,error:n}):(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,t.session)),this._returnResult({data:t,error:null}))}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _listPasskeys(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new L});let{data:r,error:i}=await J(this.fetch,`GET`,`${this.url}/passkeys`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new L});let{data:i,error:a}=await J(this.fetch,`PATCH`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _deletePasskey(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new L});let{error:i}=await J(this.fetch,`DELETE`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}};qi.nextInstanceID={};var Ji=qi,Yi=mi,Xi=Ji,Zi=class extends Xi{constructor(e){super(e)}},Qi=class{constructor(e,t,n){this.supabaseUrl=e,this.supabaseKey=t;let r=Un(e);if(!t)throw Error(`supabaseKey is required.`);Nn(t),Vn(n),this.realtimeUrl=new URL(`realtime/v1`,r),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace(`http`,`ws`),this.authUrl=new URL(`auth/v1`,r),this.storageUrl=new URL(`storage/v1`,r),this.functionsUrl=new URL(`functions/v1`,r);let i=`sb-${r.hostname.split(`.`)[0]}-auth-token`,a={db:yn,realtime:xn,auth:{...bn,storageKey:i},global:vn,tracePropagation:Sn},o=Hn(n??{},a);this.settings=o,this.storageKey=o.auth.storageKey??``,this.headers=o.global.headers??{},o.accessToken?(this.accessToken=o.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(o.auth??{},this.headers,o.global.fetch),this.fetch=Pn(t,e,this._getSessionToken.bind(this),o.global.fetch,o.tracePropagation),this.functionsFetch=Pn(t,e,this._getSessionToken.bind(this),o.global.fetch,o.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch,...o.realtime}),this.accessToken&&Promise.resolve(this.accessToken()).then(e=>this.realtime.setAuth(e)).catch(e=>console.warn(`Failed to set initial Realtime auth token:`,e)),this.rest=new fe(new URL(`rest/v1`,r).href,{headers:this.headers,schema:o.db.schema,fetch:this.fetch,timeout:o.db.timeout,urlLengthLimit:o.db.urlLengthLimit,retry:o.db.retry}),this.storage=new mn(this.storageUrl.href,this.headers,this.fetch,n?.storage),o.accessToken||this._listenForAuthEvents()}get functions(){return new l(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}getOpenApiSpec(){return this.rest.getOpenApiSpec()}rpc(e,t={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){if(this.accessToken)return await this.accessToken();let{data:e}=await this.auth.getSession();return e.session?.access_token??null}async _getAccessToken(){return await this._getSessionToken()??this.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,storageKey:a,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,lockAcquireTimeout:d,skipAutoInitialize:f},p,m){let h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Zi({url:this.authUrl.href,headers:{...h,...p},storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,fetch:m,lockAcquireTimeout:d,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(e=>e.toLowerCase()===`authorization`)})}_initRealtimeClient(e){return new _t(this.realtimeUrl.href,{...e,params:{apikey:this.supabaseKey,...e?.params}})}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,`CLIENT`,t?.access_token)})}_handleTokenChanged(e,t,n){(e===`TOKEN_REFRESHED`||e===`SIGNED_IN`||e===`INITIAL_SESSION`)&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e===`SIGNED_OUT`&&(this.realtime.setAuth(),t==`STORAGE`&&this.auth.signOut(),this.changedAccessToken=void 0)}};let $i=(e,t,n)=>new Qi(e,t,n);function ea(){if(typeof window<`u`||globalThis.Deno!==void 0)return!1;let e=globalThis.process;if(!e)return!1;let t=e.version;if(t==null)return!1;let n=t.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=20:!1}return ea()&&console.warn(`⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715`),e.AuthAdminApi=Yi,e.AuthApiError=Zn,e.AuthClient=Xi,e.AuthError=Xn,e.AuthImplicitGrantRedirectError=tr,e.AuthInvalidCredentialsError=er,e.AuthInvalidJwtError=fr,e.AuthInvalidTokenResponseError=R,e.AuthPKCECodeVerifierMissingError=ir,e.AuthPKCEGrantCodeExchangeError=rr,e.AuthRefreshDiscardedError=cr,e.AuthRetryableFetchError=or,e.AuthSessionMissingError=L,e.AuthUnknownError=F,e.AuthWeakPasswordError=ur,e.CustomAuthError=I,Object.defineProperty(e,`FunctionRegion`,{enumerable:!0,get:function(){return c}}),e.FunctionsError=i,e.FunctionsFetchError=a,e.FunctionsHttpError=s,e.FunctionsRelayError=o,e.GoTrueAdminApi=mi,e.GoTrueClient=Ji,e.NavigatorLockAcquireTimeoutError=_i,e.PostgrestError=u,e.REALTIME_CHANNEL_STATES=ut,Object.defineProperty(e,`REALTIME_LISTEN_TYPES`,{enumerable:!0,get:function(){return T}}),Object.defineProperty(e,`REALTIME_POSTGRES_CHANGES_LISTEN_EVENT`,{enumerable:!0,get:function(){return lt}}),Object.defineProperty(e,`REALTIME_PRESENCE_LISTEN_EVENTS`,{enumerable:!0,get:function(){return Xe}}),Object.defineProperty(e,`REALTIME_SUBSCRIBE_STATES`,{enumerable:!0,get:function(){return E}}),e.RealtimeChannel=dt,e.RealtimeClient=_t,e.RealtimePostgresFilterBuilder=st,e.RealtimePresence=Ze,e.SIGN_OUT_SCOPES=pi,e.StorageApiError=Pt,e.SupabaseClient=Qi,e.WebSocketFactory=pe,e.createClient=$i,e.isAuthApiError=Qn,e.isAuthError=P,e.isAuthImplicitGrantRedirectError=nr,e.isAuthPKCECodeVerifierMissingError=ar,e.isAuthRefreshDiscardedError=lr,e.isAuthRetryableFetchError=sr,e.isAuthSessionMissingError=$n,e.isAuthWeakPasswordError=dr,e.lockInternals=Z,e.navigatorLock=yi,e.postgresChangesFilter=ct,e.processLock=xi,e})({});
;

/* ===== CAP-Refeições ===== */

/* =================== CONSTANTS =================== */
const KEY='refeicoes_app_v3', THEME_KEY='refeicoes_theme';
const APP_VERSAO='3.1.9';
const TIPOS=[
  {id:'cafe',nome:'1. Café',curto:'Café'},
  {id:'almoco',nome:'2. Almoço',curto:'Almoço'},
  {id:'jantar',nome:'3. Jantar',curto:'Jantar'},
  {id:'lanche',nome:'4. Lanche',curto:'Lanche'},
];
const PERMS=[
  {grp:'Restaurante'},
  {id:'rest.registrar',nome:'Registrar refeições (scanner)'},
  {id:'rest.sobras',nome:'Registrar sobras de refeições'},
  {id:'rest.estornar',nome:'Estornar registro do dia (com justificativa)'},
  {id:'rest.data_manual',nome:'Registrar refeição com data manual (retroativa)'},
  {id:'rest.retroativo',nome:'Registros retroativos — vários colaboradores de uma vez, com data passada (exige também “Registrar refeições”)'},
  {id:'rest.validar',nome:'Validar BM (assinatura eletrônica do restaurante)'},
  {grp:'Administrativo'},
  {id:'sup.ver',nome:'Visualizar registros e resumos (antigo — substituído pelos dois acessos abaixo)',oculta:true},
  {id:'sup.registros',nome:'Acessar a parte "Registros" (registros e sobras da semana)'},
  {id:'sup.boletins',nome:'Acessar a parte "Boletins emitidos"'},
  {id:'sup.bm',nome:'Emitir, fechar, imprimir e assinar BM'},
  {id:'sup.nf',nome:'Informar nota fiscal e Nº do título e anexar BM assinado'},
  {id:'bm.rem_ass',nome:'Remover assinatura do BM (com justificativa — exige também “Emitir, fechar, imprimir e assinar BM”)'},
  {id:'sup.fechar',nome:'Fechar refeição sem incluir em BM (com justificativa)'},
  {id:'sup.fechamento',nome:'Validar o fechamento do dia (Administrativo › Fechamento) — reabrir um dia validado é só do administrador'},
  {id:'fotos.ver',nome:'Ver fotos do rosto nos registros'},
  {grp:'Relatórios (um acesso por relatório)'},
  {id:'ana.ver',nome:'Analítico (painel de gráficos)'},
  {id:'rel.registros',nome:'Relatório de Registros'},
  {id:'rel.financeiro',nome:'Relatório Financeiro'},
  {id:'rel.colaboradores',nome:'Relatório de Colaboradores'},
  {grp:'Configurações › Auditoria (um acesso por guia)'},
  {id:'aud.ver',nome:'Guia "Movimentações" (trilha de auditoria)'},
  {id:'aud.arquivos',nome:'Guia "Arquivos compactados"'},
  {id:'aud.usuarios',nome:'Guia "Registro de usuários" (quem está online, último acesso e tempo logado)'},
  {id:'fotos.baixar',nome:'Baixar arquivos compactados de fotos'},
  {grp:'Exclusões'},
  {id:'del.bm',nome:'Excluir boletim de medição (por contrato: só o último de cada contrato e centro de custo; por pedido: qualquer um)'},
  {id:'del.sobras',nome:'Excluir sobras informadas'},
  {id:'del.registros',nome:'Excluir registro de refeição (avulso, de qualquer dia, com justificativa — fora de BM)'},
  {id:'del.empresas',nome:'Excluir empresas'},
  {id:'del.obras',nome:'Excluir obras'},
  {grp:'Configurações'},
  {id:'cfg.contratos',nome:'Modalidades: cadastrar contratos e os vínculos das obras (contrato / pedido) — alterar o vínculo exige também “Cadastrar obras”'},
  {id:'cfg.usuarios',nome:'Cadastrar usuários e permissões'},
  {id:'cfg.colab',nome:'Cadastrar colaboradores'},
  {id:'cfg.empresas',nome:'Cadastrar empresas e logotipos'},
  {id:'cfg.obras',nome:'Cadastrar obras'},
  {id:'cfg.precos',nome:'Alterar preços'},
  {id:'cfg.contratada',nome:'Cadastrar contratadas (restaurantes)'},
  {id:'cfg.horarios',nome:'Definir horário limite de registro das refeições'},
  {grp:'Privacidade (LGPD)'},
  {id:'lgpd.gerir',nome:'Gerir a privacidade: encarregado, prazos de guarda e relatório de dados do titular'},
  {grp:'Jogo'},
  {id:'jogo.jogar',nome:'Jogo da Capivara — tocar na logo da capivara para jogar (pontuação e ranking por usuário)'},
];
const PERFIS={
  Administrador:PERMS.filter(p=>p.id).map(p=>p.id),
  Restaurante:['rest.registrar','rest.sobras','rest.estornar','rest.validar','del.sobras'],
  Suprimentos:['sup.ver','sup.registros','sup.boletins','sup.bm','sup.nf','ana.ver','rel.registros','rel.financeiro','rel.colaboradores','cfg.colab','cfg.empresas','cfg.obras','cfg.contratos','cfg.precos'],
  Personalizado:[]
};
let S=null, USER=null;
/* v2.9.12: modalidade da medição — contrato (como sempre), pedido (um nº novo a cada BM) ou os dois. A empresa define o que é
   permitido (empresa.vinculo, em Configurações › Empresas) e cada obra escolhe dentro disso (obra.vinculo, em Configurações ›
   Modalidades). Sem nada gravado vale "contrato" — o comportamento de antes. */
const VINC=Object.assign(Object.create(null),{contrato:'Somente contratos',pedido:'Somente pedidos',ambos:'Contratos e pedidos'});
const VINC_CURTO=Object.assign(Object.create(null),{contrato:'contratos',pedido:'pedidos',ambos:'contratos e pedidos'});
const PED='#ped';   // a modalidade "pedido" no Emitir BM, nas medições em aberto e em Configurações › Assinaturas

/* =================== HELPERS =================== */
function pad(n){return String(n).padStart(2,'0')}
function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function parse(s){const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)}
/* formatação: só devolvem o que montam — nunca repassam texto recebido (v2.5) */
function br(s){const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(typeof s==='string'?s:'');return m?`${m[3]}/${m[2]}/${m[1]}`:''}
function brdt(iso){const d=new Date(iso);if(isNaN(d))return '—';return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`}
function hm(iso){const d=new Date(iso);if(isNaN(d))return '—';return `${pad(d.getHours())}:${pad(d.getMinutes())}`}
function nOk(v,d){v=typeof v==='number'?v:(typeof v==='string'&&v.trim()!==''?Number(v):NaN);return isFinite(v)?v:(d===undefined?0:d)}
function money(v){return nOk(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function num(v){return nOk(v).toLocaleString('pt-BR')}
function addDays(s,n){const d=parse(s);d.setDate(d.getDate()+n);return ymd(d)}
function mondayOf(s){const d=parse(s);const w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);return ymd(d)}
function today(){return ymd(new Date())}
function uid(){return Math.random().toString(36).slice(2,9)}
/* =================== DADOS TROCADOS COM UMA JANELA ABERTA (v2.6.2) ===================
   A atualização com dados dos outros aparelhos troca todos os dados deste aparelho de uma vez. O que está numa janela aberta
   (um BM, uma confirmação de exclusão…) foi montado com os dados de antes: se a troca acontecesse, a alteração feita ali iria
   para uma cópia solta e não seria gravada, mesmo aparecendo "Sucesso". Por isso:
   1) com uma dessas janelas aberta, a atualização espera a janela fechar;
   2) depois de cada troca, o que estava aberto para alteração volta a apontar para o registro atual (mesmo código);
   3) os botões do BM conferem, antes de agir, se o BM aberto ainda é o que está nos dados do aparelho. */
let ATUALIZAR_AO_FECHAR=false;   // uma atualização ficou esperando a janela fechar
let BM_LENDO=false;               // o BM aberto está sendo conferido no servidor: os botões esperam
function janelaAberta(){try{return !!document.querySelector('#bm-modal.on,#info-modal.on,#anexo-modal.on,#emp-modal.on')}catch(e){return false}}
function aoFecharJanela(n){if(!ATUALIZAR_AO_FECHAR||janelaAberta())return;
  if(USER&&(SYNC.pending||SYNC.running)&&(n||0)<20){setTimeout(()=>aoFecharJanela((n||0)+1),1500);return}   // espera o envio em andamento terminar
  ATUALIZAR_AO_FECHAR=false;atualizarDados()}
/* texto igual para conteúdos iguais, qualquer que seja a ordem dos campos (o banco devolve os campos em outra ordem) */
function canon(v){return JSON.stringify(v,(k,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.keys(x).sort().reduce((o,c)=>{o[c]=x[c];return o},{}):x)}
/* o que define a situação de um BM: situação, as duas assinaturas e a nota fiscal (assinatura com ID é comparada pelo ID) */
function assChave(a){if(!a||typeof a!=='object'||a.vazia||!a.tipo)return '';return typeof a.id==='string'&&a.id?'id:'+a.id:canon([a.tipo,a.usuario||'',a.por||'',a.em||''])}
function bmChave(x){return canon([x.status||'',assChave(x.assRest),assChave(x.assSup),x.nf||''])}
function bmSemEnvio(x){let L=null;try{L=JSON.parse(LAST.bms[x.id])}catch(e){}return !!L&&bmChave(L)===bmChave(x)}   // este aparelho não tem alteração deste BM esperando envio
/* põe nos dados do aparelho a versão de um BM que acabou de ser lida do servidor */
function bmTroca(linha){
  const d0=DESCARTADAS;const novo=limpaTabela('bms',[{...(linha.data&&typeof linha.data==='object'&&!Array.isArray(linha.data)?linha.data:{}),id:linha.id}])[0];DESCARTADAS=d0;if(!novo)return null;
  const i=S.bms.findIndex(x=>x.id===novo.id);if(i<0)return null;S.bms[i]=novo;LAST.bms[novo.id]=JSON.stringify(rowOf('bms',novo));
  if(BM&&BM.id===novo.id){BM=novo;if($('bm-modal').classList.contains('on'))renderBM()}
  try{refreshBadges();if(PAGE==='sup')renderSup();else if(PAGE==='rest')renderRest(true)}catch(e){}
  return novo}
async function bmLer(id){try{const r=await Promise.race([sb.from('bms').select('id,data').eq('id',id).maybeSingle(),new Promise(res=>setTimeout(()=>res({error:{message:'tempo esgotado'}}),5000))]);return r&&!r.error?{ok:true,linha:r.data||null}:{ok:false}}catch(e){return {ok:false}}}
/* antes de assinar / homologar / registrar a nota fiscal: o BM no servidor ainda está como aparece nesta tela?
   (com o BM aberto este aparelho não recebe atualizações; outro aparelho pode ter assinado nesse meio-tempo) */
async function bmAtual(b){
  if(!b||b.status==='rascunho')return true;
  if(!bmSemEnvio(b))return true;                     // este aparelho tem alteração deste BM ainda não enviada: segue (será enviada)
  const antes=bmChave(b);const r=await bmLer(b.id);
  if(!S.bms.includes(b)||bmChave(b)!==antes)return false;   // o BM mudou neste aparelho enquanto era conferido: não faz nada
  if(!r.ok)return true;                              // sem conexão: segue como sempre — a alteração fica guardada no aparelho e é enviada depois
  if(!r.linha){ATUALIZAR_AO_FECHAR=true;$('bm-modal').classList.remove('on');toast('Este BM não existe mais — foi excluído em outro aparelho.','warn');return false}
  const d0=DESCARTADAS;const srv=limpaTabela('bms',[{...(r.linha.data&&typeof r.linha.data==='object'?r.linha.data:{}),id:r.linha.id}])[0];DESCARTADAS=d0;
  if(!srv||bmChave(srv)===antes)return true;
  ATUALIZAR_AO_FECHAR=true;const novo=bmTroca(r.linha);
  toast(`Este BM foi alterado em outro aparelho enquanto estava aberto aqui${novo&&STATUS[novo.status]?' — situação atual: '+STATUS[novo.status][0]:''}. Confira e, se ainda for o caso, repita a ação.`,'warn');
  return false}
/* depois de gravar uma assinatura: o servidor guardou a assinatura com o ID que apareceu na tela? */
async function assConfirma(b,papel){
  const k=ASS_PAPEL[papel].k,meu=b&&b[k]&&b[k].id;if(!meu)return true;
  const r=await bmLer(b.id);if(!r.ok||!r.linha)return true;
  const sv=r.linha.data&&typeof r.linha.data==='object'?r.linha.data[k]:null;if(sv&&sv.id===meu)return true;
  const at=S.bms.find(x=>x.id===b.id);if(!at||!at[k]||at[k].id!==meu)return true;   // o aparelho já foi atualizado e não mostra mais essa assinatura
  if(SYNC.pending||SYNC.running||!bmSemEnvio(at))return true;                       // ainda há envio deste aparelho em andamento
  ATUALIZAR_AO_FECHAR=true;bmTroca(r.linha);
  toast(`A assinatura não ficou gravada como apareceu na tela${sv&&sv.id?' — no servidor consta outra assinatura, com o ID '+sv.id:''}. O BM foi atualizado com o que está no servidor: confira antes de continuar.`,'bad');
  return false}
function souEu(u){return !!(u&&USER&&u.id===USER.id)}
function religar(){
  const re=(v,l,limpar)=>{if(!v||v.id==null)return v;const n=(l||[]).find(x=>x.id===v.id);if(n)return n;try{limpar()}catch(e){}return null};
  UEDIT=re(UEDIT,S.users,()=>{UEDIT=null;fillUser()});CEDIT=re(CEDIT,S.colab,()=>{CEDIT=null;fillColab()});EEDIT=re(EEDIT,S.empresas,()=>{EEDIT=null;fillEmpresa()});
  OEDIT=re(OEDIT,S.obras,()=>{OEDIT=null;fillObra();obraForm(false)});PFEDIT=re(PFEDIT,S.perfis,()=>{PFEDIT=null;fillPerfil()});CTREDIT=re(CTREDIT,S.contratos,()=>{CTREDIT=null;fillContrato()});
  KEDIT=re(KEDIT,S.contratadas,()=>{KEDIT=null;fillContratada()});
  if(BM&&BM.status!=='rascunho'){const v=(S.bms||[]).find(x=>x.id===BM.id);if(v)BM=v}
}
function bmVivo(b){
  if(!b||b.status==='rascunho'||S.bms.includes(b))return true;
  const v=S.bms.find(x=>x.id===b.id);
  if(v){BM=v;renderBM();toast('Os dados deste BM foram atualizados enquanto ele estava aberto. Confira a situação e repita a ação.','warn')}
  else{$('bm-modal').classList.remove('on');toast('Este BM não existe mais — foi excluído em outro aparelho.','warn');try{if(PAGE==='sup')renderSup()}catch(e){}}
  return false}
/* =================== ID DA ASSINATURA DO BM (v2.6.2) ===================
   Cada assinatura do BM (restaurante e Gestor / Engenheiro) tem um ID único, gerado na hora em que ela é feita.
   O ID sai no carimbo (tela e PDF) e serve para conferir a assinatura em "Conferir assinatura (ID)".
   12 caracteres sorteados entre 32 (sem 0, 1, I e O, que se confundem na leitura), no formato XXXX-XXXX-XXXX. */
const ASS_ALFA='23456789ABCDEFGHJKLMNPQRSTUVWXYZ',RX_ASS=/^[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/;
const ASS_PAPEL=Object.assign(Object.create(null),{rest:{k:'assRest',nome:'Restaurante (contratada)'},sup:{k:'assSup',nome:'Gestor / Engenheiro da obra'}});
function assFmt(c){return c.slice(0,4)+'-'+c.slice(4,8)+'-'+c.slice(8,12)}
function assHash(t,semente){let h1=0xdeadbeef^semente,h2=0x41c6ce57^semente;
  for(let i=0;i<t.length;i++){const c=t.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
  return [h1>>>0,h2>>>0]}
/* assinatura feita antes desta versão (sem ID gravado): o ID sai dos dados da própria assinatura — o mesmo em qualquer aparelho */
function assIdAntigo(b,papel,a){
  if(!b||!a||typeof a.em!=='string'||!a.em||!a.tipo)return '';
  const t=[b.id,papel,a.tipo,a.usuario||'',a.por||'',a.em].join('\u001f');
  const p=assHash(t,7).concat(assHash(t,1013));let c='';
  for(let i=0;i<12;i++)c+=ASS_ALFA[(p[i%4]>>>(5*Math.floor(i/4)))&31];
  return assFmt(c)}
function assId(b,papel){const P=ASS_PAPEL[papel];const a=b&&P?b[P.k]:null;if(!a)return '';return typeof a.id==='string'&&RX_ASS.test(a.id)?a.id:assIdAntigo(b,papel,a)}
function assAcharRem(id){const l=[];(S.bms||[]).forEach(b=>(Array.isArray(b.assRemovidas)?b.assRemovidas:[]).forEach(a=>{if(a&&a.id===id)l.push({b,papel:a.papel,a})}));return l}   // v2.9.4
function assAchar(id){const l=[];(S.bms||[]).forEach(b=>['rest','sup'].forEach(p=>{if(b[ASS_PAPEL[p].k]&&assId(b,p)===id)l.push({b,papel:p,a:b[ASS_PAPEL[p].k]})}));return l}
function assNovoId(){
  for(let n=0;n<40;n++){const v=new Uint8Array(12);crypto.getRandomValues(v);const id=assFmt(Array.from(v,x=>ASS_ALFA[x&31]).join(''));if(!assAchar(id).length&&!assAcharRem(id).length)return id}
  throw new Error('não foi possível gerar o ID da assinatura')}
/* grava no BM o ID das assinaturas antigas (chamado quando o BM já vai ser gravado por outro motivo) */
function assFixa(b){['rest','sup'].forEach(p=>{const a=b[ASS_PAPEL[p].k];if(a&&!(typeof a.id==='string'&&RX_ASS.test(a.id))){const i=assIdAntigo(b,p,a);if(i)a.id=i}})}
const WD=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
function wd(s){return WD[parse(s).getDay()]}
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function ini(n){const w=String(n||'?').replace(/[^\p{L}\p{N}\s.]/gu,' ').split(/[\s.]+/).filter(Boolean);return (w.slice(0,2).map(x=>x[0]).join('')||'?').toUpperCase()}
const $=id=>document.getElementById(id);
const TIPO_X={id:'invalido',nome:'(tipo inválido)',curto:'?'};
function tipo(id){return TIPOS.find(t=>t.id===id)||TIPO_X}
function tipoOk(id){return TIPOS.some(t=>t.id===id)}
function emp(id){return S.empresas.find(e=>e.id===id)}
function obra(id){return S.obras.find(o=>o.id===id)}
/* acessos (v2.8.3): perfis e usuários salvos na tela nova levam a marca ACESSO_MARCA e valem exatamente como marcados;
   os de antes (sem a marca) continuam vendo o que já viam — os acessos novos saem das permissões antigas */
const ACESSO_MARCA='acessos.v283';
const ACESSO_LEGADO={'sup.registros':P=>P.includes('sup.ver')||P.includes('sup.bm'),'sup.boletins':P=>P.includes('sup.ver')||P.includes('sup.bm'),
  'aud.arquivos':P=>P.includes('aud.ver'),'aud.usuarios':P=>P.includes('aud.ver')};
function acessoLegado(p){if(ACESSO_LEGADO[p])return ACESSO_LEGADO[p];if(/^rel\./.test(p))return P=>P.includes('sup.ver')||P.includes('ana.ver');return null}
function permsEfetivas(perms){const l=Array.isArray(perms)?perms:[];const P=l.filter(x=>x!==ACESSO_MARCA);if(l.includes(ACESSO_MARCA))return P;
  return P.concat(PERMS.filter(q=>q.id&&!P.includes(q.id)&&acessoLegado(q.id)&&acessoLegado(q.id)(P)).map(q=>q.id))}
function nPerms(l){return permsEfetivas(l).filter(x=>PERMS.some(q=>q.id===x&&!q.oculta)).length}
function permsGrade(){return PERMS.filter(q=>!q.oculta)}   // "sup.ver" fica fora da tela: só serve para os acessos de antes
function can(p){if(!USER)return false;const P=Array.isArray(USER.perms)?USER.perms:[];
  if(isAdm(USER)&&(PERMS.some(q=>q.id===p)||p==='lgpd.gerir'))return true;
  if(P.includes(p))return true;
  if(!P.includes(ACESSO_MARCA)){const f=acessoLegado(p);if(f)return f(P)}
  return false}
function isAdm(u){return !!u&&(u.tipo==='Adm'||u.perfil==='Administrador')}
function perfisQuePosso(){const todos=S.perfis||[];if(isAdm(USER))return todos;return todos.filter(p=>p.tipo!=='Adm'&&permsEfetivas(p.perms).every(x=>can(x)))}
function ativoOk(u){return u&&u.ativo!==false&&u.status!=='pendente'}
function senhaOk(p){return typeof p==='string'&&p.length>=8&&/\d/.test(p)&&/[A-Za-zÀ-ÿ]/.test(p)}
const SENHA_REGRA='no mínimo 8 caracteres, com letras e números';
const TIPOS_PERFIL=['Adm','Suprimentos','Obra','Restaurante'];
function obraOk(obraId){if(!USER||!USER.obras||!USER.obras.length)return true;return USER.obras.includes(obraId)}
function obraNomeOk(nome){if(!USER||!USER.obras||!USER.obras.length)return true;const o=S.obras.find(x=>x.nome===nome);return !!o&&USER.obras.includes(o.id)}
function regOkObra(r){if(!USER||!USER.obras||!USER.obras.length)return true;return r.obraId?USER.obras.includes(r.obraId):obraNomeOk(r.obraNome)}
/* ---- obra ↔ empresa (v2.3): cada obra pertence a uma única empresa ---- */
function obrasDaEmpresa(empId,todas){return S.obras.filter(o=>o.empresaId&&o.empresaId===empId&&(todas||o.ativo!==false)&&obraOk(o.id))}
function obraEmpErro(empId,obraId){const o=obra(obraId);if(!o)return null;
  if(!o.empresaId)return `A obra ${o.nome} ainda não tem empresa definida (Configurações › Obras).`;
  if(empId&&o.empresaId!==empId){const e=emp(o.empresaId),e2=emp(empId);return `A obra ${o.nome} pertence à empresa ${e?e.nome:'—'} e não pode ser usada por ${e2?e2.nome:'outra empresa'}.`}
  return null}
function usoObra(obraId){const m=new Map();const add=(e,k)=>{if(!e)return;const a=m.get(e)||{colab:0,regs:0,sobras:0,bms:0};a[k]++;m.set(e,a)};
  S.colab.forEach(c=>{if(c.obraId===obraId)add(c.empresaId,'colab')});S.registros.forEach(r=>{if(r.obraId===obraId)add(r.empresaId,'regs')});
  (S.sobras||[]).forEach(s=>{if(s.obraId===obraId)add(s.empresaId,'sobras')});S.bms.forEach(b=>{if(b.obraId===obraId)add(b.empresaId,'bms')});return m}
function usoTxt(u){return [u.colab&&`${u.colab} colaborador(es)`,u.regs&&`${u.regs} registro(s)`,u.sobras&&`${u.sobras} sobra(s)`,u.bms&&`${u.bms} BM(s)`].filter(Boolean).join(', ')}
function divergencias(){
  const semEmp=S.obras.filter(o=>!o.empresaId&&obraOk(o.id));
  const colab=S.colab.filter(c=>c.ativo!==false&&c.obraId&&obraOk(c.obraId)&&(obra(c.obraId)||{}).empresaId&&obra(c.obraId).empresaId!==c.empresaId);
  return {semEmp,colab}}
/* ---- contratadas (restaurantes) ---- */
function ct(id){return (S.contratadas||[]).find(c=>c.id===id)}
function ctDefault(){const l=S.contratadas||[];return (l.find(c=>c.id==='ct-legacy')||l[0]||{}).id||null}
function ctOf(x){return (x&&x.contratadaId)||ctDefault()}
function ctOk(id){if(!USER||!USER.contratadas||!USER.contratadas.length)return true;return !id||USER.contratadas.includes(id)}
function ctsAcessiveis(){return (S.contratadas||[]).filter(c=>c.ativo!==false&&ctOk(c.id))}
function regOk(r){return regOkObra(r)&&ctOk(ctOf(r))}
function ctMigrarLegado(){
  if((S.contratadas||[]).length||!S.contratada||!S.contratada.nome||!can('cfg.contratada'))return;
  const K=S.contratada;S.contratadas.push({id:'ct-legacy',nome:K.nome,cnpj:K.cnpj||'',gestor:K.gestor||'',cargo:K.cargo||'',servico:K.servico||'FORNECIMENTO DE REFEIÇÕES',obras:S.obras.map(o=>o.id),ativo:true});
  save();
}
/* ---- balões de mensagem: sucesso (verde ✅), atenção, erro, aviso — todos com X ---- */
const BAL={ok:['✅','Sucesso',6000],warn:['⚠️','Atenção',7000],bad:['❌','Não concluído',0],info:['ℹ️','Aviso',5000]};
function balao(tipo,m){
  const box=$('toasts');if(!box)return;const [ic,tit,ms]=BAL[tipo]||BAL.info;
  const el=document.createElement('div');el.className='tmsg '+tipo;el.setAttribute('role',tipo==='bad'||tipo==='warn'?'alert':'status');
  el.innerHTML=`<span class="ic" aria-hidden="true">${ic}</span><div class="tx"><b>${tit}</b><span></span></div><button type="button" class="xbtn" aria-label="Fechar">×</button>`;
  el.querySelector('.tx span').textContent=m;
  const close=()=>{if(el._c)return;el._c=1;el.classList.add('out');setTimeout(()=>el.remove(),200)};
  el.querySelector('.xbtn').onclick=close;
  box.prepend(el);while(box.children.length>4)box.lastElementChild.remove();
  if(ms){let t=setTimeout(close,ms);el.onmouseenter=()=>clearTimeout(t);el.onmouseleave=()=>{t=setTimeout(close,2500)}}
  return el;
}
function toast(m,tipo){
  tipo=tipo||(/^(Erro|Falha|Não foi possível|Alteração recusada)/.test(m)?'bad':/(…)$|^QR Code lido|^Logotipo carregada|criado — complete|cancelad/.test(m)?'info':'warn');
  return balao(tipo,m);
}
function sucesso(m){return balao('ok',m)}
/* grava e só mostra "Sucesso" depois que o servidor confirmar */
function concluir(msg){
  return save().then(()=>{sucesso(msg);return true},e=>{const m=(e&&e.message)||String(e||'');
    if(/row-level security|permission|policy|42501|violates|JWT|not allowed|denied|Regra obra-empresa|Dados inválidos/i.test(m))toast(`O servidor recusou a gravação — “${msg}” não foi concluído. Verifique suas permissões. (${m.slice(0,90)})`,'bad');
    else toast(`Sem conexão com o servidor: “${msg}” ficou guardado neste aparelho e será enviado automaticamente quando a internet voltar.`,'warn');
    return false});
}
/* ---- avisos (.notice) com X; os avisos fixos (data-hint) ficam fechados neste aparelho ---- */
const HINTS_KEY='sismed_avisos_fechados';
function hintsOff(){try{return JSON.parse(localStorage.getItem(HINTS_KEY))||[]}catch(e){return []}}
function addX(el){if([...el.children].some(c=>c.classList.contains('xbtn')))return;const x=document.createElement('button');x.type='button';x.className='xbtn';x.setAttribute('aria-label','Fechar aviso');x.textContent='×';
  x.onclick=ev=>{ev.stopPropagation();el.hidden=true;const h=el.dataset.hint;if(h){const l=hintsOff();if(!l.includes(h)){l.push(h);try{localStorage.setItem(HINTS_KEY,JSON.stringify(l))}catch(e){}}}};el.appendChild(x)}
function prepNotices(root){const l=[];if(root.classList&&root.classList.contains('notice'))l.push(root);if(root.querySelectorAll)l.push(...root.querySelectorAll('.notice'));
  const off=l.some(e=>e.dataset.hint)?hintsOff():[];l.forEach(el=>{if(el.dataset.hint&&off.includes(el.dataset.hint)){el.hidden=true;return}addX(el)})}
function mostrarAvisos(){try{localStorage.removeItem(HINTS_KEY)}catch(e){}document.querySelectorAll('[data-hint]').forEach(el=>{el.hidden=false;addX(el)})}
prepNotices(document.body);
new MutationObserver(ms=>ms.forEach(m=>{m.addedNodes.forEach(n=>{if(n.nodeType===1&&!n.classList.contains('xbtn'))prepNotices(n)});const t=m.target;if(t&&t.nodeType===1&&t.classList.contains('notice'))addX(t)})).observe(document.body,{childList:true,subtree:true});
/* preço: primeiro o do contrato da obra; se o contrato não tiver preço próprio, usa a tabela geral */
function precoLista(tipoId,data,cid){return S.precos.filter(p=>p.tipo===tipoId&&p.vigencia<=data&&(p.contratoId||'')===(cid||'')).sort((a,b)=>a.vigencia<b.vigencia?1:a.vigencia>b.vigencia?-1:(a.criadoEm<b.criadoEm?1:-1))}
function precoVigente(tipoId,data,cid){
  if(cid){const l=precoLista(tipoId,data,cid);if(l[0])return l[0].valor}
  const g=precoLista(tipoId,data,'');return g[0]?g[0].valor:null;
}
function contrato(id){return (S.contratos||[]).find(c=>c.id===id)}
function vincEmp(E){return E&&VINC[E.vinculo]?E.vinculo:'contrato'}
function vincRaw(o){return o&&VINC[o.vinculo]?o.vinculo:'contrato'}
function vincCalc(raw,ev){return ev==='ambos'?raw:ev}   // o que a empresa permite manda
function vincObra(o){return o?vincCalc(vincRaw(o),vincEmp(emp(o.empresaId))):'contrato'}
function vincTem(v,m){return v==='ambos'||v===m}
function bmPed(b){return !!b&&b.vinculo==='pedido'}
function bmModC(b){return bmPed(b)?PED:((b&&b.contratoId)||SEM_CT)}
function bmModTxt(b){return bmPed(b)?'pedido nº '+(b.pedido||'—'):(b.contratoNumero?'contrato '+b.contratoNumero:'sem contrato')}
function pedNorm(s){return String(s||'').toUpperCase().replace(/[^A-Z0-9./ -]/g,'').replace(/\s+/g,' ').trim().slice(0,20)}
function pedDuplicado(empId,num,exceto){const n=pedNorm(num);if(!n)return null;return (S.bms||[]).find(b=>b.id!==exceto&&b.empresaId===empId&&bmPed(b)&&pedNorm(b.pedido)===n)||null}
function vincTxt(o){const v=vincObra(o),C=contrato(o.contratoId);return VINC[v]+(v!=='pedido'?(C?' — contrato '+C.numero:' — sem contrato'):'')}
/* contrato da obra: só quando a obra mede por contrato (v2.9.12: obra "somente pedidos" não tem contrato — preços da Tabela geral, sem vigência) */
function cidOf(obraId){const o=obra(obraId);return o&&o.contratoId&&vincObra(o)!=='pedido'?o.contratoId:''}
function semCtRot(obraId){return obraId&&vincObra(obra(obraId))==='pedido'?'Por pedido (sem contrato)':'Sem contrato'}
function contratoStatus(c,d){d=d||today();if(!c)return null;if(c.ativo===false)return 'inativo';if(c.fim&&c.fim<d)return 'encerrado';if(c.inicio&&c.inicio>d)return 'a iniciar';return 'vigente'}
function contratoErro(obraId,d){const fe=diaValidadoErro(d,obraId);if(fe)return fe;   // v2.9.9 · v2.9.10: por obra e contrato
  const c=contrato(cidOf(obraId));if(!c||vincObra(obra(obraId))==='ambos')return null;   // v2.9.12: obra com contrato e pedido não é bloqueada pela vigência (pode medir por pedido)
  const st=contratoStatus(c,d);if(st==='vigente')return null;
  return `Contrato ${esc(c.numero)} da obra ${(obra(obraId)||{}).nome||''} está ${st}${st==='encerrado'?' desde '+br(c.fim):st==='a iniciar'?' (início '+br(c.inicio)+')':''} — refeição não registrada.`}
function fillSelect(sel,items,val,allLabel){sel.innerHTML=(allLabel!==undefined?`<option value="">${allLabel}</option>`:'')+items.map(i=>`<option value="${esc(i.id)}"${i.id===val?' selected':''}>${esc(i.nome)}</option>`).join('')}

/* =================== AUDITORIA (núcleo) =================== */
const ABAS=Object.assign(Object.create(null),{login:'Login',rest:'Restaurante',sup:'Administrativo',ana:'Analítico',rel:'Relatórios',aud:'Auditoria',cfg:'Configurações'});
const ACOES=Object.assign(Object.create(null),{
  'obra.vinculo':'Alterou os vínculos da obra (contrato / pedido)',
  'lgpd.ciencia':'Declarou ciência da Política de Privacidade','lgpd.relatorio':'Gerou relatório de dados de titular (LGPD)','lgpd.config':'Alterou dados de privacidade (LGPD)','lgpd.aviso':'Baixou o aviso de privacidade',
  'login.ok':'Login','login.falha':'Tentativa de login inválida','logout':'Logout','nav':'Acessou aba','nav.cfg':'Acessou seção de configurações',
  'refeicao.registrar':'Registrou refeição','refeicao.excluir':'Excluiu refeição (avulsa)','refeicao.corrigir_obra':'Corrigiu a obra da refeição','fechamento.validar':'Validou o dia no Fechamento','fechamento.reabrir':'Reabriu o dia no Fechamento','refeicao.fechar':'Fechou refeição sem BM','refeicao.reabrir':'Reabriu refeição fechada sem BM','refeicao.estornar':'Estornou refeição','refeicao.retroativo':'Registrou refeições retroativas (em lote)','refeicao.retroativo_estornar':'Estornou lote de refeições retroativas','sobra.registrar':'Registrou sobra','bm.compartilhar':'Compartilhou PDF do BM','sobra.excluir':'Excluiu sobra',
  'bm.emitir':'Gerou rascunho de BM','bm.fechar':'Fechou BM','bm.validar':'Validou BM (assinatura eletrônica do restaurante)','bm.homologar':'Homologou assinatura física do restaurante','bm.assinar_sup':'Registrou assinatura física do Gestor / Engenheiro','bm.assinar_sup_e':'Assinou eletronicamente como Gestor / Engenheiro','ass.conferir':'Conferiu assinatura pelo ID','bm.nf':'Informou nota fiscal','bm.titulo':'Informou Nº do título','bm.pdf':'Exportou BM em PDF','relatorio.pdf':'Baixou relatório em PDF','relatorio.visualizar':'Abriu relatório em PDF (visualizar)','relatorio.csv':'Exportou relatório em planilha (CSV)','bm.imprimir':'Imprimiu BM','bm.anexar':'Anexou BM assinado','bm.anexo_remover':'Removeu anexo do BM','bm.anexo_baixar':'Baixou anexo do BM',
  'usuario.salvar':'Cadastrou/alterou usuário','usuario.permissoes':'Alterou permissões (por ação)','colab.salvar':'Cadastrou/alterou colaborador','colab.realocar':'Realocou colaborador (empresa/obra)','colab.qr_copiar':'Copiou o código do QR Code de colaborador','colab.qr_ver':'Viu o QR Code de colaborador','colab.qr_baixar':'Baixou o QR Code de colaborador','colab.qr_imprimir':'Imprimiu o QR Code de colaborador','terceirizada.salvar':'Cadastrou/alterou empresa terceirizada','terceirizada.ativar':'Ativou/desativou empresa terceirizada','registro.corrigir':'Corrigiu empresa/obra de registro','empresa.salvar':'Cadastrou/alterou empresa','obra.salvar':'Cadastrou/alterou obra','preco.salvar':'Cadastrou/alterou preço','contrato.salvar':'Cadastrou/alterou contrato',
  'contratada.salvar':'Cadastrou/alterou contratada (restaurante)','usuario.senha':'Redefiniu senha de usuário','auditoria.csv':'Exportou auditoria em CSV','dados.apagar':'Apagou todos os dados','perfil.salvar':'Cadastrou/alterou perfil','perfil.excluir':'Excluiu perfil','usuario.excluir':'Excluiu usuário','usuario.aprovar':'Aprovou conta','usuario.negar':'Negou conta','bm.excluir':'Excluiu boletim de medição','bm.remover_ass':'Removeu assinatura de BM','usuario.assinaturas':'Alterou os contratos em que o usuário assina o BM','empresa.excluir':'Excluiu empresa','obra.excluir':'Excluiu obra','auditoria.arquivo':'Baixou arquivo compactado da auditoria','foto.ver':'Visualizou foto do registro','horarios.salvar':'Alterou horário limite de registro','fotos.baixar':'Baixou arquivos compactados de fotos','fotos.compactar':'Compactou fotos (rotina do servidor)'
});
let DEVICE='';try{DEVICE=localStorage.getItem('refeicoes_device')||'';if(!DEVICE){DEVICE='DEV-'+Math.random().toString(36).slice(2,8).toUpperCase();localStorage.setItem('refeicoes_device',DEVICE)}}catch(e){DEVICE='DEV-?'}
function audit(acao,descricao,x){
  x=x||{};const e={id:uid(),em:new Date().toISOString(),usuarioId:USER?USER.id:null,usuario:x.usuario||(USER?USER.nome:'—'),perfil:USER?USER.perfil:'',
    acao,descricao:descricao||'',aba:x.aba||abaAtual()||'login',obra:x.obra||'',empresa:x.empresa||'',entidade:x.entidade||'',antes:x.antes===undefined?null:x.antes,depois:x.depois===undefined?null:x.depois,
    dispositivo:DEVICE,ip:null,navegador:(navigator.userAgent||'').slice(0,80)};
  S.audit.push(e);if(S.audit.length>5000)S.audit.splice(0,S.audit.length-5000);
}

/* =================== SUPABASE: conexão e sincronização =================== */
const CFG=window.APP_CONFIG||{};
if(!CFG.SUPABASE_URL||!CFG.SUPABASE_ANON_KEY){document.addEventListener('DOMContentLoaded',()=>{const e=document.getElementById('l-status');if(e){e.textContent='config.js não encontrado ou incompleto (SUPABASE_URL / SUPABASE_ANON_KEY).';e.style.color='var(--bad)'}})}
// v2.9.8: internet fraca — o pedido sai e a resposta não chega: o envio ficava travado. Agora desiste depois de um tempo e tenta de novo
// (fotos: 2 min; o resto: 40 s). O que já foi gravado no servidor não é gravado duas vezes (v2.6.3 / v2.9.6).
function fetchComPrazo(url,o){o=o||{};const ms=/\/storage\/v1\//.test(String(url&&url.url||url))?120000:40000;const c=new AbortController();const t=setTimeout(()=>c.abort(),ms);
  if(o.signal){if(o.signal.aborted)c.abort();else o.signal.addEventListener('abort',()=>c.abort(),{once:true})}
  return fetch(url,{...o,signal:c.signal}).finally(()=>clearTimeout(t))}
const sb=window.supabase.createClient(CFG.SUPABASE_URL||'https://invalid.supabase.co',CFG.SUPABASE_ANON_KEY||'x',{auth:{persistSession:true,autoRefreshToken:true,...(CFG.AUTH_STORAGE_KEY?{storageKey:CFG.AUTH_STORAGE_KEY}:{})},db:{schema:CFG.DB_SCHEMA||'public'},global:{fetch:(u,o)=>fetchComPrazo(u,o)}});
const EMAIL_DOMAIN=CFG.EMAIL_DOMAIN||'refeicoes.app';
function toEmail(login){login=(login||'').trim().toLowerCase();return login.includes('@')?login:login.replace(/[^a-z0-9._-]/g,'')+'@'+EMAIL_DOMAIN}
const TABLES={perfis:'perfis',empresas:'empresas',terceirizadas:'empresas',obras:'obras',colab:'colaboradores',precos:'precos',contratos:'contratos',contratadas:'contratadas',registros:'registros',sobras:'sobras',bms:'bms',users:'usuarios'};
const CACHE_KEY='refeicoes_cache_v1',CACHE_UID='refeicoes_cache_uid';
let LAST={}, AUDIT_SEEN=new Set(), SYNC={pending:false,running:false,offline:false,timer:null,retry:null,gen:0,again:null};
function fresh(){return {perfis:[],auditArq:[],users:[],empresas:[],terceirizadas:[],obras:[],colab:[],precos:[],contratos:[],contratadas:[],registros:[],sobras:[],bms:[],audit:[],contratada:{nome:'',cnpj:'',gestor:'',cargo:'',servico:'FORNECIMENTO DE REFEIÇÕES'},horarios:null,lgpd:null,fech:{}}}
function rowOf(key,r){const o={...r};delete o.senha;if(key==='users')delete o.id;
  if(key==='bms'){if(o.assRest&&o.assRest.vazia)delete o.assRest;if(o.assSup&&o.assSup.vazia)delete o.assSup}   // marcador de tela, não vai para o servidor
  return o}
function snapshot(){LAST={};Object.keys(TABLES).forEach(k=>{LAST[k]={};(S[k]||[]).forEach(r=>LAST[k][r.id]=JSON.stringify(rowOf(k,r)))});LAST.contratada=JSON.stringify(S.contratada);LAST.horarios=JSON.stringify(S.horarios||null);LAST.lgpd=JSON.stringify(S.lgpd||null);AUDIT_SEEN=new Set((S.audit||[]).map(e=>e.id))}
let SYNCST={c:'sync',t:'Sincronizado'};
function applySync(){document.querySelectorAll('[data-sync]').forEach(d=>{d.className=SYNCST.c;d.title=SYNCST.t;d.setAttribute('aria-label','Conexão: '+SYNCST.t)});
  document.querySelectorAll('[data-sync-t]').forEach(t=>{t.textContent=SYNCST.c.includes('off')?'Sem conexão · guardado no aparelho':SYNCST.c.includes('pend')?'Enviando alterações…':'Sincronizado'});try{restEnvio()}catch(e){}}   // v3.0.1
function setSync(state,msg){SYNCST={c:'sync'+(state==='pend'?' pend':state==='off'?' off':''),t:msg||(state==='pend'?'Enviando alterações…':state==='off'?'Sem conexão — alterações guardadas neste aparelho e enviadas quando voltar':'Sincronizado')};applySync()}
/* =================== DADOS VINDOS DO SERVIDOR (v2.5) ===================
   Quem tem acesso à API consegue gravar qualquer JSON nas linhas que a permissão dele alcança. Antes de usar:
   - textos livres (nomes, descrições, justificativas…) ficam como vieram e SEMPRE vão para a tela com esc();
   - todo o resto (códigos, datas, tipos, números gravados como texto, nomes de campos) perde < > " ' ` ;
   - linhas sem o mínimo para funcionar (tipo de refeição inválido, data fora do formato…) são ignoradas. */
const TXT_LIVRE=new Set(['nome','descricao','texto','just','justificativa','motivo','obs','terceirizada','semFoto','usuario','por','cargo','gestor','gestorCargo','servico','endereco','antes','depois','entidade','obra','empresa','empresaNome','obraNome','contratadaNome','colabNome','deEmpresa','deObra','paraEmpresa','paraObra','navegador','user_agent','perfil','fechadoPor','o','de','email','csv','qr','login','controlador','encarregado','telefone','guardaRegistros','guardaAuditoria']);
const RX_ID=/^[\w.:#@-]{1,80}$/,RX_DATA=/^\d{4}-\d{2}-\d{2}$/,RX_HM=/^([01]\d|2[0-3]):[0-5]\d$/,RX_LOGO=/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+\/=]+$/;
/* campos que o app sempre trata como texto: se vier outra coisa (objeto, lista, verdadeiro/falso, nulo), vira texto vazio */
const SO_TEXTO=new Set([...TXT_LIVRE].filter(k=>k!=='antes'&&k!=='depois').concat(['acao','aba','login','qr','cnpj','status','nf','dispositivo','ip','tipo','data','ini','fim','d','vigencia','inicio','registradoEm','em','emitidoEm','fechadoEm','criadoEm','created_at','contratoNumero','empresaCnpj','contratadaCnpj','modalidade','vinculo','pedido','p','name','type','item']));
function dataOk(x){if(typeof x!=='string'||!RX_DATA.test(x))return false;const [y,m,d]=x.split('-').map(Number);if(y<2000||y>2100)return false;const t=new Date(y,m-1,d);return t.getFullYear()===y&&t.getMonth()===m-1&&t.getDate()===d}
function diasEntre(a,b){return Math.round((parse(b)-parse(a))/864e5)}
function limpaAud(e){e=limpa(e,'');if(!e||typeof e!=='object')return null;if(typeof e.acao!=='string'||!/^[\w.]{1,40}$/.test(e.acao))e.acao='invalida';if(typeof e.aba!=='string'||!/^[a-z]{0,12}$/.test(e.aba))e.aba='';if(isNaN(new Date(e.em)))e.em=new Date(0).toISOString();return e}
let DESCARTADAS=0;
function limpaTxt(x){return x.replace(/[<>"'`]/g,'')}
function limpa(v,k,nivel){
  if(typeof v==='string')return TXT_LIVRE.has(k)?(v.length>4000?v.slice(0,4000):v):limpaTxt(v);
  if(v===null||typeof v!=='object')return v;
  if((nivel||0)>12)return null;
  if(Array.isArray(v))return v.map(x=>limpa(x,k,(nivel||0)+1));
  const o={};Object.keys(v).forEach(kk=>{const k2=limpaTxt(kk).slice(0,80);if(!k2||k2==='__proto__'||k2==='constructor'||k2==='prototype')return;let x=limpa(v[kk],k2,(nivel||0)+1);kk=k2;
    if(SO_TEXTO.has(kk)&&typeof x!=='string'&&x!==undefined)x=typeof x==='number'&&isFinite(x)?String(x):'';
    else if((kk==='antes'||kk==='depois')&&x!==null&&typeof x==='object')x=JSON.stringify(x).slice(0,2000);
    o[kk]=x});return o}
function lst(v){return Array.isArray(v)?v.filter(x=>typeof x==='string'):[]}
function txt(v){return typeof v==='string'?v:(v==null?'':String(v))}
function logoOk(v){return typeof v==='string'&&RX_LOGO.test(v)?v:''}
const VALIDA={
  registros:r=>{if(!tipoOk(r.tipo)||!dataOk(r.data)||isNaN(new Date(r.registradoEm)))return null;r.valor=nOk(r.valor);r.nome=txt(r.nome);r.usuario=txt(r.usuario);r.empresaNome=txt(r.empresaNome);r.obraNome=txt(r.obraNome);
    if(r.modalidade!==undefined&&!['presencial','retirada','terceirizado'].includes(r.modalidade))delete r.modalidade;
    if(r.semQr!==undefined&&r.semQr!==true)delete r.semQr;
    if(r.retro!==undefined){if(!r.retro||typeof r.retro!=='object'||Array.isArray(r.retro))delete r.retro;else{r.retro.lote=txt(r.retro.lote).slice(0,40);r.retro.n=Math.max(0,Math.round(nOk(r.retro.n)));if(r.retro.obs!==undefined)r.retro.obs=txt(r.retro.obs).slice(0,200)}}
    if(r.correcoes!==undefined){if(!Array.isArray(r.correcoes))delete r.correcoes;else r.correcoes=r.correcoes.filter(x=>x&&typeof x==='object')}
    if(r.retiradoPor!==undefined){if(!r.retiradoPor||typeof r.retiradoPor!=='object'||Array.isArray(r.retiradoPor))delete r.retiradoPor;else r.retiradoPor.nome=txt(r.retiradoPor.nome)}
    if(r.foto!==undefined&&!(r.foto&&typeof r.foto==='object'&&/^\d{4}-\d{2}-\d{2}\/[\w-]{1,40}\.(webp|jpg)$/.test(r.foto.p||'')))delete r.foto;
    if(r.semFoto!==undefined)r.semFoto=txt(r.semFoto);if(r.terceirizada!==undefined)r.terceirizada=txt(r.terceirizada);
    if(r.fechado!==undefined&&!(r.fechado&&typeof r.fechado==='object'))delete r.fechado;else if(r.fechado){r.fechado.por=txt(r.fechado.por);r.fechado.motivo=txt(r.fechado.motivo)}
    return r},
  sobras:x=>{if(!tipoOk(x.tipo)||!dataOk(x.data))return null;x.qtd=Math.max(0,Math.min(2000,Math.round(nOk(x.qtd))));if(x.valorUnit!=null)x.valorUnit=nOk(x.valorUnit);if(x.valor!=null)x.valor=nOk(x.valor);x.colabNome=txt(x.colabNome);x.usuario=txt(x.usuario);x.empresaNome=txt(x.empresaNome);x.obraNome=txt(x.obraNome);if(isNaN(new Date(x.registradoEm)))x.registradoEm=x.data+'T12:00:00.000Z';return x},
  precos:p=>{if(!tipoOk(p.tipo)||!dataOk(p.vigencia))return null;p.valor=nOk(p.valor);p.just=txt(p.just);p.usuario=txt(p.usuario);return p},
  users:u=>{u.perms=lst(u.perms);u.obras=lst(u.obras);u.contratadas=lst(u.contratadas);if(u.assContratos!==undefined)u.assContratos=lst(u.assContratos);u.nome=txt(u.nome);u.login=txt(u.login);u.perfil=txt(u.perfil);return u},
  perfis:p=>{p.perms=lst(p.perms);p.nome=txt(p.nome);p.tipo=txt(p.tipo);return p},
  colab:c=>{c.nome=txt(c.nome);c.qr=txt(c.qr);if(c.realocacoes!==undefined&&!Array.isArray(c.realocacoes))c.realocacoes=[];else if(c.realocacoes)c.realocacoes=c.realocacoes.filter(x=>x&&typeof x==='object');return c},
  contratadas:c=>{c.nome=txt(c.nome);c.obras=lst(c.obras);return c},
  terceirizadas:e=>{if(e.tipo!=='terceirizada')return null;e.nome=txt(e.nome);e.cnpj=txt(e.cnpj);e.ativa=e.ativa!==false;e.ativo=false;   // ativo:false: versões antigas não a oferecem como empresa
    if(e.logo!==undefined&&!logoOk(e.logo)){delete e.logo;delete e.logoW;delete e.logoH}else if(e.logo){e.logoW=nOk(e.logoW,4);e.logoH=nOk(e.logoH,1)}return e},
  empresas:e=>{e.nome=txt(e.nome);if(e.logo!==undefined&&!logoOk(e.logo)){delete e.logo;delete e.logoW;delete e.logoH}else if(e.logo){e.logoW=nOk(e.logoW,4);e.logoH=nOk(e.logoH,1)}
    if(e.proximoBM!=null)e.proximoBM=Math.max(1,Math.round(nOk(e.proximoBM,1)));
    if(e.vinculo!==undefined&&!VINC[e.vinculo])delete e.vinculo;   // v2.9.12
    if(e.contrato!==undefined){if(!e.contrato||typeof e.contrato!=='object'||Array.isArray(e.contrato))delete e.contrato;else Object.keys(e.contrato).forEach(k=>{const c=e.contrato[k];if(!tipoOk(k)||!c||typeof c!=='object'){delete e.contrato[k];return}['qtd','acumQtd','acumVal'].forEach(f=>{if(c[f]!=null&&c[f]!=='')c[f]=nOk(c[f])})})}
    return e},
  obras:o=>{o.nome=txt(o.nome);if(o.vinculo!==undefined&&!VINC[o.vinculo])delete o.vinculo;return o},
  contratos:c=>{c.numero=txt(c.numero);['inicio','fim'].forEach(k=>{if(c[k]&&!dataOk(c[k]))c[k]=''});return c},
  bms:b=>{if(!dataOk(b.ini)||!dataOk(b.fim)||b.fim<b.ini||diasEntre(b.ini,b.fim)>400)return null;
    if(typeof b.status!=='string'||!(b.status in STATUS))return null;
    ['qtd','valor','liquido','deducoes','adiant','sobrasQtd','sobrasValor'].forEach(k=>{if(b[k]!=null)b[k]=nOk(b[k])});
    const nn=x=>Array.isArray(x)?x.map(v=>nOk(v)):TIPOS.map(()=>0);
    b.dias=(Array.isArray(b.dias)?b.dias:[]).filter(d=>d&&typeof d==='object'&&dataOk(d.d)).slice(0,400).map(d=>({...d,porTipo:nn(d.porTipo),total:nOk(d.total),valor:nOk(d.valor)}));
    b.obras=(Array.isArray(b.obras)?b.obras:[]).filter(o=>o&&typeof o==='object').map(o=>({...o,o:txt(o.o),porTipo:nn(o.porTipo),total:nOk(o.total),valor:nOk(o.valor)}));
    b.itens=(Array.isArray(b.itens)?b.itens:[]).filter(i=>i&&typeof i==='object'&&tipoOk(i.tipo)).map(i=>{const o={...i};Object.keys(o).forEach(k=>{if(k!=='tipo'&&k!=='item'&&o[k]!==null)o[k]=nOk(o[k])});o.item=txt(o.item);return o});
    if(typeof b.numero!=='number')b.numero=txt(b.numero);
    b.empresaNome=txt(b.empresaNome);
    if(b.vinculo!==undefined&&b.vinculo!=='pedido'&&b.vinculo!=='contrato')delete b.vinculo;   // v2.9.12
    if(b.pedido!==undefined){b.pedido=txt(b.pedido).replace(/\s+/g,' ').trim().slice(0,30);if(!b.pedido)delete b.pedido}
    if(b.titulo!==undefined){b.titulo=txt(b.titulo).replace(/\s+/g,' ').trim().slice(0,40);if(!b.titulo)delete b.titulo}
    if(b.anexo!==undefined&&!(b.anexo&&typeof b.anexo==='object'&&typeof b.anexo.type==='string'))delete b.anexo;
    ['assRest','assSup'].forEach(k=>{if(b[k]!==undefined&&!(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])))b[k]=undefined;if(b[k]){b[k].usuario=txt(b[k].usuario);b[k].por=txt(b[k].por);if(b[k].id!==undefined&&!(typeof b[k].id==='string'&&RX_ASS.test(b[k].id)))delete b[k].id;['usuarioId','porId'].forEach(c=>{if(b[k][c]!==undefined&&!(typeof b[k][c]==='string'&&RX_ID.test(b[k][c])))delete b[k][c]})}});
    if(b.assRemovidas!==undefined){b.assRemovidas=(Array.isArray(b.assRemovidas)?b.assRemovidas:[]).filter(a=>a&&typeof a==='object'&&!Array.isArray(a)).slice(-50)
      .map(a=>({...a,papel:a.papel==='rest'?'rest':'sup',id:typeof a.id==='string'&&RX_ASS.test(a.id)?a.id:'',usuario:txt(a.usuario),por:txt(a.por),removidaPor:txt(a.removidaPor),motivo:txt(a.motivo)}));if(!b.assRemovidas.length)delete b.assRemovidas}   // v2.9.4
    // status que pressupõe assinatura sem a assinatura gravada: mostra como "não informada" em vez de quebrar a tela
    const vazia=()=>({tipo:'',usuario:'(assinatura não informada)',em:'',vazia:true});
    if(['assinado_restaurante','assinado','faturado'].includes(b.status)&&!b.assRest)b.assRest=vazia();
    if(['assinado','faturado'].includes(b.status)&&!b.assSup)b.assSup=vazia();
    return b}
};
function limpaLinha(k,row){
  const r=limpa(row,'');
  if(!r||typeof r.id!=='string'||!RX_ID.test(r.id)){DESCARTADAS++;return null}
  let out=r;try{if(VALIDA[k])out=VALIDA[k](r)}catch(e){out=null}
  if(!out)DESCARTADAS++;return out}
function limpaTabela(k,rows){return (Array.isArray(rows)?rows:[]).map(r=>limpaLinha(k,r)).filter(Boolean)}
function limpaHorarios(h){h=limpa(h,'');if(!h||typeof h!=='object'||!h.tipos||typeof h.tipos!=='object')return null;const tipos={};
  TIPOS.forEach(t=>{const c=h.tipos[t.id];if(c&&typeof c==='object')tipos[t.id]={ativo:c.ativo===true,ini:RX_HM.test(c.ini||'')?c.ini:'',fim:RX_HM.test(c.fim||'')?c.fim:''}});return {ativo:h.ativo===true,tipos}}
function limpaLgpd(x){x=limpa(x,'');if(!x||typeof x!=='object')return null;const o={};LGPD_CAMPOS.forEach(([k])=>{o[k]=txt(x[k]).slice(0,300)});return o}
function limpaEstado(o){ // dados guardados no aparelho (cache) passam pelo mesmo tratamento
  const ns=fresh();if(!o||typeof o!=='object')return ns;
  Object.keys(TABLES).forEach(k=>{ns[k]=limpaTabela(k,o[k])});
  if(o.contratada&&typeof o.contratada==='object')ns.contratada={...ns.contratada,...limpa(o.contratada,'')};
  ns.horarios=o.horarios?limpaHorarios(o.horarios):null;ns.lgpd=o.lgpd?limpaLgpd(o.lgpd):null;
  ns.fech=limpaFech(o.fech);   // v2.9.9: dias validados (também sem internet)
  ns.audit=(Array.isArray(o.audit)?o.audit:[]).map(e=>limpaAud(e)).filter(e=>e&&typeof e.id==='string');
  ns.auditArq=(Array.isArray(o.auditArq)?o.auditArq:[]).map(e=>limpa(e,'')).filter(e=>e&&typeof e==='object');
  return ns}
/* v2.9.1: o Supabase entrega no máximo 1.000 linhas por consulta ("Max rows"). Lê em páginas até acabar.
   mk() monta a consulta (com ordem estável) a cada página; max = teto opcional de linhas. */
async function lerTudo(mk,max){
  const P=1000,out=[],vistos=new Set();
  for(let de=0;de<200000;){
    const ate=(max?Math.min(de+P,max):de+P)-1;if(ate<de)break;
    const {data,error}=await mk().range(de,ate);if(error)throw error;
    const d=data||[];let novos=0;d.forEach(r=>{const k=r&&r.id!=null?String(r.id):null;if(k===null||!vistos.has(k)){if(k!==null)vistos.add(k);out.push(r);novos++}});
    if(d.length!==ate-de+1||!novos)break;   // última página (ou servidor que ignora a paginação: nada de novo)
    de+=d.length;if(max&&out.length>=max)break;
  }
  return out}
async function loadAll(){
  if(!(await sessaoValida()))throw new Error('Sem conexão com o servidor (sessão não renovada)');   // v2.9.8: sem sessão o servidor responderia como visitante (tudo vazio)
  const g0=SYNC.gen; // quantas gravações este aparelho já tinha feito quando a leitura começou
  const ns=fresh();
  const LIDAS={};   // v2.9.3: empresas e terceirizadas vêm da mesma tabela — lê uma vez só
  for(const [k,t] of Object.entries(TABLES)){
    const mk=()=>{let q=sb.from(t).select('id,data').order('id');
      if(t==='registros'){const lim=addDays(today(),-(CFG.DIAS_HISTORICO||400));q=q.gte('data->>data',lim)}return q};
    const data=LIDAS[t]||(LIDAS[t]=await lerTudo(mk));   // v2.9.1: em páginas (antes: uma consulta só, cortada em 1.000 linhas)
    const linhas=(data||[]).map(r=>({...(r.data&&typeof r.data==='object'&&!Array.isArray(r.data)?r.data:{}),id:r.id}));
    ns[k]=limpaTabela(k,k==='terceirizadas'?linhas.filter(r=>r.tipo==='terceirizada'):k==='empresas'?linhas.filter(r=>r.tipo!=='terceirizada'):linhas);
  }
  const c=await sb.from('config').select('data').eq('id','contratada').maybeSingle();if(c.error)throw c.error;if(c.data&&c.data.data&&typeof c.data.data==='object')ns.contratada={...ns.contratada,...limpa(c.data.data,'')};
  const hz=await sb.from('config').select('data').eq('id','horarios').maybeSingle();if(!hz.error&&hz.data)ns.horarios=limpaHorarios(hz.data.data);
  const lg=await sb.from('config').select('data').eq('id','lgpd').maybeSingle();if(!lg.error&&lg.data)ns.lgpd=limpaLgpd(lg.data.data);
  {let fc=null;try{fc=await lerTudo(()=>sb.from('config').select('id,data').like('id','fech:%').order('id'))}catch(e){fc=null}ns.fech=fc?limpaFech(fc):((S&&S.fech)||{})}   // v2.9.9 · v2.9.11: dias validados (like — a faixa >= 'fech:' < 'fech;' não funciona com o idioma do banco)
  let a;try{a={data:await lerTudo(()=>sb.from('auditoria').select('id,data,ip,user_agent,created_at').order('created_at',{ascending:false}),3000),error:null}}catch(e){a={data:null,error:e}}
  const arq=await sb.from('auditoria_arquivos').select('id,de,ate,qtd,criado_em').order('criado_em',{ascending:false});ns.auditArq=arq.error?[]:(arq.data||[]).map(r=>limpa(r,''));
  ns.audit=a.error?[]:a.data.map(r=>limpaAud({...(r.data&&typeof r.data==='object'?r.data:{}),id:String(r.id),ip:r.ip,navegador:r.user_agent||(r.data&&r.data.navegador),em:r.created_at||(r.data&&r.data.em)})).filter(Boolean).reverse();
  // Algo foi gravado neste aparelho — ou estava sendo enviado — enquanto os dados eram lidos: o que foi lido pode não ter essa gravação.
  // Não substitui nada (senão o registro recém-feito sumiria da tela e poderia até ser apagado do servidor); a próxima atualização traz tudo.
  if(USER&&(SYNC.gen!==g0||SYNC.pending||SYNC.running))return false;
  // Uma janela foi aberta enquanto os dados eram lidos: não troca agora (o que está nela ficaria apontando para os dados de antes).
  if(USER&&janelaAberta()){ATUALIZAR_AO_FECHAR=true;return false}
  // Entrada no sistema com alterações que ficaram sem enviar (aparelho estava sem internet): mantém no aparelho e CONTINUA devendo o envio
  const pend=[],audPend=[];let hzSrv,ctSrv,lgSrv;
  if(S&&SYNC.pending){
    Object.keys(TABLES).forEach(k=>{const L=LAST[k]||{};const tem=new Set();
      (S[k]||[]).forEach(r=>{tem.add(r.id);if(L[r.id]===JSON.stringify(rowOf(k,r)))return;
        const i=ns[k].findIndex(x=>x.id===r.id);pend.push([k,r.id,i>=0?JSON.stringify(rowOf(k,ns[k][i])):undefined]);if(i>=0)ns[k][i]=r;else ns[k].push(r)});
      if(k!=='users')Object.keys(L).forEach(id=>{if(tem.has(id))return;const i=ns[k].findIndex(x=>x.id===id);if(i>=0){pend.push([k,id,JSON.stringify(rowOf(k,ns[k][i]))]);ns[k].splice(i,1)}})});
    (S.audit||[]).forEach(e=>{if(!AUDIT_SEEN.has(e.id)){ns.audit.push(e);audPend.push(e.id)}});
    if(LAST.horarios!==undefined&&LAST.horarios!==JSON.stringify(S.horarios||null)){hzSrv=JSON.stringify(ns.horarios||null);ns.horarios=S.horarios}
    if(LAST.contratada!==undefined&&LAST.contratada!==JSON.stringify(S.contratada)){ctSrv=JSON.stringify(ns.contratada);ns.contratada=S.contratada}
    if(LAST.lgpd!==undefined&&LAST.lgpd!==JSON.stringify(S.lgpd||null)){lgSrv=JSON.stringify(ns.lgpd||null);ns.lgpd=S.lgpd}
  }
  ns.perfis=ns.perfis||[];ns.users.forEach(u=>{if(isAdm(u))u.perms=[...PERFIS.Administrador]});
  ns.contratadas=ns.contratadas||[];ns.contratos=ns.contratos||[];
  S=ns;snapshot();try{religar()}catch(e){}
  if(DESCARTADAS&&!loadAll.avisou){loadAll.avisou=true;console.warn('CAP-Refeições: '+DESCARTADAS+' linha(s) com dados inválidos foram ignoradas');setTimeout(()=>{if(USER&&isAdm(USER))toast(`${DESCARTADAS} linha(s) com dados fora do padrão vieram do servidor e foram ignoradas. Pode ser tentativa de adulteração — verifique a Auditoria.`,'bad')},1500)}
  DESCARTADAS=0;
  // o que ainda não foi enviado continua marcado como "a enviar" (o retrato acima marcaria tudo como já enviado)
  pend.forEach(([k,id,srv])=>{if(srv===undefined)delete LAST[k][id];else LAST[k][id]=srv});audPend.forEach(id=>AUDIT_SEEN.delete(id));
  if(hzSrv!==undefined)LAST.horarios=hzSrv;if(ctSrv!==undefined)LAST.contratada=ctSrv;if(lgSrv!==undefined)LAST.lgpd=lgSrv;
  try{localStorage.setItem(CACHE_KEY,JSON.stringify(S))}catch(e){}
  return true;
}
/* =================== v2.9.7: O QUE NÃO FOI ENVIADO SOBREVIVE A RECARREGAR A PÁGINA ===================
   Sem internet, as refeições ficam "a enviar". Se a página recarregar (o Safari faz isso sozinho) elas sumiam da memória. Agora registros,
   sobras e linhas da Auditoria ainda não confirmados pelo servidor ficam guardados neste aparelho (só do mesmo usuário, até 3 dias) e são
   reenviados quando o sistema abre de novo. Já no servidor, ou a mesma refeição já lançada de novo: ignorados. Outro usuário: descartados. */
const PEND_KEY='sismed_pendentes',PEND_TABS=['registros','sobras'];
function pendGuardar(){try{if(!USER||!LAST)return;const rows=[],del=[];
    PEND_TABS.forEach(k=>{const tem=new Set();(S[k]||[]).forEach(r=>{tem.add(r.id);if(LAST[k]&&LAST[k][r.id]===undefined)rows.push({k,r:rowOf(k,r)})});
      Object.keys(LAST[k]||{}).forEach(id=>{if(!tem.has(id))del.push({k,id})})});   // v2.9.8: estornos / sobras apagadas ainda não enviados
    const aud=(S.audit||[]).filter(e=>e&&!AUDIT_SEEN.has(e.id)).slice(-500);
    if(!rows.length&&!aud.length&&!del.length){localStorage.removeItem(PEND_KEY);return}
    localStorage.setItem(PEND_KEY,JSON.stringify({uid:USER.id,em:Date.now(),rows,aud,del}))}catch(e){}}
function pendRecuperar(semRede){let P=null;try{P=JSON.parse(localStorage.getItem(PEND_KEY)||'null')}catch(e){}
  const z={n:0,a:0,d:0};if(!P||!USER)return z;
  if(P.uid!==USER.id){try{localStorage.removeItem(PEND_KEY)}catch(e){}return z}   // de outra pessoa: descarta (v2.9.8: sem prazo — antes, 3 dias)
  const d0=DESCARTADAS;
  // semRede: os dados vieram do que está guardado neste aparelho (e não do servidor) — o que está aqui ainda não foi enviado: continua "a enviar"
  (Array.isArray(P.rows)?P.rows:[]).forEach(x=>{const k=x&&x.k,r=x&&x.r;if(!PEND_TABS.includes(k)||!r||typeof r.id!=='string')return;const L=S[k]||(S[k]=[]);
    if(L.some(y=>y.id===r.id)){if(semRede&&LAST[k]&&LAST[k][r.id]!==undefined){delete LAST[k][r.id];z.n++}return}   // com internet: já está no servidor
    if(k==='registros'&&L.some(y=>y.data===r.data&&y.tipo===r.tipo&&(r.colabId?y.colabId===r.colabId:(!y.colabId&&String(y.nome||'').toUpperCase()===String(r.nome||'').toUpperCase()))))return;   // a mesma refeição já foi lançada de novo
    const c=limpaLinha(k,{...r});if(c){L.push(c);z.n++}});
  DESCARTADAS=d0;
  (Array.isArray(P.del)?P.del:[]).forEach(x=>{const k=x&&x.k,id=x&&x.id;if(!PEND_TABS.includes(k)||typeof id!=='string'||!LAST[k])return;const L=S[k]||[];
    if(L.some(y=>y.id===id)){S[k]=L.filter(y=>y.id!==id);if(LAST[k][id]===undefined)LAST[k][id]='(apagado)';z.d++}   // ainda está no servidor: apaga
    else if(semRede&&LAST[k][id]===undefined){LAST[k][id]='(apagado sem internet)';z.d++}});
  const tem=new Set((S.audit||[]).map(e=>e.id));(Array.isArray(P.aud)?P.aud:[]).forEach(e=>{if(!e||typeof e.id!=='string')return;
    if(tem.has(e.id)){if(semRede&&AUDIT_SEEN.has(e.id)){AUDIT_SEEN.delete(e.id);z.a++}return}
    if(!AUDIT_SEEN.has(e.id)){S.audit.push(e);tem.add(e.id);z.a++}});
  return z}
/* v2.9.8: sessão — sem internet, vale a guardada neste aparelho; nada é lido nem enviado sem a sessão renovada */
function ehFalhaRede(e){if(!e)return false;if(navigator.onLine===false)return true;if(e.name==='AuthRetryableFetchError')return true;
  return /Failed to fetch|Load failed|NetworkError|network ?error|internet|ERR_|abort|n[aã]o respondeu|sess[aã]o n[aã]o renovada/i.test(String(e.message||e))}
function sessaoGuardada(){try{const k=(sb.auth&&typeof sb.auth.storageKey==='string'&&sb.auth.storageKey)||Object.keys(localStorage).find(x=>/^sb-.+-auth-token$/.test(x));
    const v=k?JSON.parse(localStorage.getItem(k)||'null'):null;const ss=v&&(v.currentSession||v);
    return ss&&ss.refresh_token&&ss.user&&typeof ss.user.id==='string'?ss:null}catch(e){return null}}
function sessaoGuardadaUid(){const g=sessaoGuardada();return g?g.user.id:null}
// sem internet e com o acesso vencido (vence a cada hora): nem tenta renovar — a biblioteca insiste por até 30 s e trava a abertura
function acessoVencidoSemInternet(){const g=sessaoGuardada();return navigator.onLine===false&&!!g&&!!g.expires_at&&g.expires_at*1000-Date.now()<90000}
let SESS_PRAZO=0;   // a biblioteca ficou presa tentando renovar o acesso (internet fraca): por 30 s, nem espera
async function sessaoRapida(ms){if(Date.now()-SESS_PRAZO<30000)return {session:null,prazo:true};
  try{const r=await Promise.race([sb.auth.getSession(),new Promise(ok=>setTimeout(()=>ok('__prazo'),ms||6000))]);
    if(r==='__prazo'){SESS_PRAZO=Date.now();return {session:null,prazo:true}}return {session:r&&r.data&&r.data.session||null}}catch(e){return {session:null}}}
async function uidAtual(){if(!acessoVencidoSemInternet()){const r=await sessaoRapida(4000);if(r.session&&r.session.user)return r.session.user.id}return sessaoGuardadaUid()}
async function sessaoValida(){if(acessoVencidoSemInternet())return null;const r=await sessaoRapida(8000);return r.session||null}
function save(){
  try{localStorage.setItem(CACHE_KEY,JSON.stringify(S))}catch(e){}
  pendGuardar();
  SYNC.gen++;SYNC.pending=true;if(USER)SYNC.dono=USER.id;setSync('pend');clearTimeout(SYNC.timer);SYNC.timer=setTimeout(sync,350);
  const pr=new Promise((res,rej)=>(SYNC.waiters=SYNC.waiters||[]).push({res,rej}));pr.catch(()=>{});return pr;
}
/* o banco recusa obra de outra empresa ("Regra obra-empresa"): envia linha a linha, descarta só a linha recusada e avisa */
const REGRA_OBRA=/Regra obra-empresa|Dados inválidos/i;
async function upsertComRegra(k,t,rows,cur){
  let {error}=await sb.from(t).upsert(rows);if(!error)return;
  // v2.9.6: linha "nova" que já está no servidor (o envio anterior chegou, mas a resposta se perdeu): para quem não pode alterar
  // (ex.: Restaurante) o servidor recusa o lote inteiro com "USING expression". Reenvia só inserindo: as que já existem ficam como estão.
  if(/USING expression/i.test(String(error.message||''))){const r2=await sb.from(t).upsert(rows,{onConflict:'id',ignoreDuplicates:true});if(!r2.error)return;error=r2.error}
  if(!REGRA_OBRA.test(String(error.message||'')))throw error;
  for(const row of rows){
    const {error:e1}=await sb.from(t).upsert([row]);if(!e1)continue;
    if(!REGRA_OBRA.test(String(e1.message||'')))throw e1;
    S[k]=(S[k]||[]).filter(x=>x.id!==row.id);delete cur[row.id];const d=row.data||{};
    toast(`O servidor recusou ${k==='registros'?'a refeição de '+(d.nome||''):k==='sobras'?'a sobra de '+(d.colabNome||''):k==='colab'?'o colaborador '+(d.nome||''):k==='obras'?'a obra '+(d.nome||''):'a gravação'}: ${String(e1.message||'').replace(/^(Regra obra-empresa|Dados inválidos):\s*/i,'')}`,'bad');
    if(PAGE==='rest')setTimeout(renderRest,50);
  }
}
/* o servidor recusou a alteração de uma linha que já existia: ela volta a ser como estava no servidor e o usuário é avisado */
function desfazLinha(k,id,cur,err){
  try{const bruto=JSON.parse(LAST[k][id]);const d0=DESCARTADAS;const antigo=limpaLinha(k,{...bruto,id})||bruto;DESCARTADAS=d0;const i=(S[k]||[]).findIndex(x=>x.id===id);if(i>=0)S[k][i]=k==='users'?{...antigo,id}:antigo;cur[id]=LAST[k][id]}catch(e){}
  try{religar();if(BM&&$('bm-modal').classList.contains('on')&&k==='bms'&&BM.id===id)renderBM()}catch(e){}
  toast(`O servidor recusou uma alteração (${String(err&&err.message||'').replace(/^(Regra obra-empresa|Dados inválidos):\s*/i,'').slice(0,120)}). Ela foi desfeita neste aparelho; o restante foi enviado.`,'bad');
  setTimeout(()=>{try{if(PAGE==='rest')renderRest();else if(PAGE==='sup'&&!$('bm-modal').classList.contains('on')&&!titEditando())renderSup();else if(PAGE==='cfg')renderCfg()}catch(e){}},60);
}
/* auditoria (v2.6.3): reenviar não trava mais o aparelho. Quando a resposta de um envio se perdia (celular bloqueado, sinal fraco), o reenvio
   era recusado ("duplicate key … auditoria_pkey") e todas as gravações seguintes davam "não concluído" até recarregar a página (10/10/2026, 06:26).
   Lote recusado por evento repetido/inválido: um a um. O que o servidor já tem conta como enviado; o recusado pelo próprio conteúdo é
   descartado (com aviso no console) quando o resto do envio passa; falta de conexão/permissão ou qualquer outra recusa: fica na fila. (ON CONFLICT DO NOTHING não serve: o banco o
   recusa para quem não pode ver a auditoria.) */
const ehRepetido=er=>String(er&&er.code||'')==='23505'&&/auditoria_pkey/.test(String(er&&er.message||''));
const ehInvalido=(er,st)=>{const c=String(er&&er.code||'');return (/^2[23][0-9A-Z]{3}$/.test(c)&&c!=='23505')||st===413};
async function enviaAuditoria(linhas){
  const vistos=new Set();linhas=linhas.filter(l=>!vistos.has(l.id)&&vistos.add(l.id));
  let gravados=0;const recusados=[];
  for(let i=0;i<linhas.length;i+=100){
    const lote=linhas.slice(i,i+100);
    const r=await sb.from('auditoria').insert(lote);
    if(!r.error){lote.forEach(l=>AUDIT_SEEN.add(l.id));gravados+=lote.length;continue}
    if(!ehRepetido(r.error)&&!ehInvalido(r.error,+r.status||0))throw r.error;   // sem conexão, sessão expirada, sem permissão, servidor fora do ar…: fica na fila
    // o servidor recusou o lote por um evento repetido ou inválido e não diz qual (as regras de acesso escondem): um a um, 6 de cada vez, na ordem
    for(let j=0;j<lote.length;j+=6){
      const parte=lote.slice(j,j+6);const rs=await Promise.all(parte.map(l=>sb.from('auditoria').insert([l])));let falha=null;
      rs.forEach((x,n)=>{const l=parte[n];
        if(!x.error){AUDIT_SEEN.add(l.id);gravados++}
        else if(ehRepetido(x.error))AUDIT_SEEN.add(l.id);                              // o servidor já tinha: conta como enviado
        else if(ehInvalido(x.error,+x.status||0))recusados.push({id:l.id,erro:x.error});
        else falha=falha||x.error});
      if(falha)throw falha}
  }
  if(recusados.length){
    if(!gravados)throw recusados[0].erro;                                           // nada foi gravado: o problema pode ser do servidor, não dos eventos — fica na fila
    recusados.forEach(x=>{console.warn('CAP-Refeições: evento de auditoria recusado pelo servidor (descartado para não travar o envio):',x.id,x.erro.message);AUDIT_SEEN.add(x.id)})}
}
async function sync(){
  if(SYNC.running||!USER)return;SYNC.running=true;SYNC.pending=false;clearTimeout(SYNC.retry);
  const batch=(SYNC.waiters||[]).splice(0);let naAuditoria=false;
  try{
    if(!(await sessaoValida()))throw new Error('Sem conexão com o servidor (sessão não renovada)');   // v2.9.8: nunca envia como visitante anônimo
    for(const [k,t] of Object.entries(TABLES)){
      const cur={};(S[k]||[]).forEach(r=>cur[r.id]=JSON.stringify(rowOf(k,r)));
      const ups=[];let dels=[];
      for(const id in cur){if(LAST[k][id]!==cur[id])ups.push({id,data:JSON.parse(cur[id])})}
      if(k!=='users'){for(const id in LAST[k]){if(!(id in cur))dels.push(id)}}
      if(ups.length){
        const velhos=ups.filter(r=>LAST[k][r.id]!==undefined);let resto=ups.filter(r=>LAST[k][r.id]===undefined);
        if(velhos.length){const {data,error}=await sb.rpc('sync_update',{p_table:t,p_rows:velhos});
          if(error&&REGRA_OBRA.test(String(error.message||''))){ // o servidor recusou alguma linha do lote: envia uma a uma e desfaz só a recusada
            for(const row of velhos){const r1=await sb.rpc('sync_update',{p_table:t,p_rows:[row]});
              if(!r1.error){if(!(r1.data||[]).includes(row.id))resto.push(row);continue}
              if(!REGRA_OBRA.test(String(r1.error.message||'')))throw r1.error;
              desfazLinha(k,row.id,cur,r1.error)}
          }else if(error){if(/sync_update|PGRST202|function/i.test((error.message||'')+(error.code||'')))resto=ups;else throw error}
          else{const ok=new Set(data||[]);resto=resto.concat(velhos.filter(r=>!ok.has(r.id)))}}
        if(resto.length)await upsertComRegra(k,t,resto,cur);
      }
      if(dels.length&&k==='registros')dels=await estEnviar(dels,cur);   // v3.1.0: estornos vão pela função do servidor (com a justificativa)
      if(dels.length){const {error}=await sb.from(t).delete().in('id',dels);if(error)throw error}
      LAST[k]=cur;
    }
    const cj=JSON.stringify(S.contratada);if(LAST.contratada!==cj){const {error}=await sb.from('config').upsert({id:'contratada',data:S.contratada});if(error)throw error;LAST.contratada=cj}
    const hj=JSON.stringify(S.horarios||null);if(LAST.horarios!==hj&&S.horarios){const {error}=await sb.from('config').upsert({id:'horarios',data:S.horarios});if(error)throw error;LAST.horarios=hj}
    const lj=JSON.stringify(S.lgpd||null);if(LAST.lgpd!==lj&&S.lgpd){const {error}=await sb.from('config').upsert({id:'lgpd',data:S.lgpd});if(error)throw error;LAST.lgpd=lj}
    const novos=(S.audit||[]).filter(e=>!AUDIT_SEEN.has(e.id));
    if(novos.length){naAuditoria=true;await enviaAuditoria(novos.map(e=>({id:e.id,data:e})));
      if(S.audit.length>=3000){setTimeout(async()=>{if(janelaAberta()){ATUALIZAR_AO_FECHAR=true;return}try{await loadAll();if(audVisivel())renderAud()}catch(e){}},300)}}
    SYNC.offline=false;pendGuardar();setSync(SYNC.pending?'pend':'ok');batch.forEach(w=>w.res());
  }catch(e){
    SYNC.pending=true;SYNC.offline=true;const msg=(e&&e.message)||'';setSync('off',msg?'Falha ao enviar: '+msg:undefined);
    if(batch.length)batch.forEach(w=>naAuditoria?w.res():w.rej(e));else if(!naAuditoria&&/row-level security|permission|policy/i.test(msg))toast('Alteração recusada pelo servidor: sem permissão ('+msg.slice(0,80)+')','bad');
    SYNC.retry=setTimeout(sync,15000);
  }finally{SYNC.running=false;if(SYNC.pending&&!SYNC.offline)setTimeout(sync,200)}
}
window.addEventListener('online',()=>{try{sb.auth.lastRefreshFailure=null}catch(e){}if(SYNC.pending)sync();fotoEnviar();if(!SYNC.pending&&SYNC.offline&&USER)setTimeout(atualizarDados,1500)});   // v2.9.8: atualiza
// atualização periódica com dados de outros aparelhos
async function atualizarDados(){if(!USER||SYNC.pending||SYNC.running||document.hidden)return;if(janelaAberta()){ATUALIZAR_AO_FECHAR=true;return}try{
  if(await loadAll()===false){clearTimeout(SYNC.again);SYNC.again=setTimeout(atualizarDados,8000);return} // houve gravação durante a leitura: tenta de novo em instantes
  if(SYNC.offline&&!SYNC.pending){SYNC.offline=false;setSync('ok')}   // v2.9.8: aberto sem internet, a leitura deu certo
  refreshBadges();if(PAGE==='rest')renderRest(true);else if(PAGE==='sup'&&!$('bm-modal').classList.contains('on')&&!titEditando())renderSup();else if(audVisivel())renderAud();else if(PAGE==='rel')renderRel()}catch(e){}}
setInterval(atualizarDados,45000);
// a atualização que ficou esperando uma janela fechar roda logo depois que ela fecha
try{const ob=new MutationObserver(()=>{if(ATUALIZAR_AO_FECHAR&&!janelaAberta())setTimeout(aoFecharJanela,400)});['bm-modal','info-modal','anexo-modal','emp-modal'].forEach(id=>{const m=$(id);if(m)ob.observe(m,{attributes:true,attributeFilter:['class']})})}catch(e){}

/* =================== THEME =================== */
function isDark(){const t=document.documentElement.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
function applyTheme(t){document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem(THEME_KEY,t)}catch(e){}renderThemeBtn()}
function renderThemeBtn(){const d=isDark();$('theme-txt').textContent=d?'Claro':'Escuro';
  $('theme-ico').innerHTML=d?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>':'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'}
$('theme-btn').onclick=()=>applyTheme(isDark()?'light':'dark');
try{const t=localStorage.getItem(THEME_KEY);if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}
renderThemeBtn();

/* =================== LOGIN (Supabase Auth) =================== */
function lstatus(m,bad){const e=$('l-status');e.textContent=m||'';e.style.color=bad?'var(--bad)':''}
function lshow(which){try{LX.forcar=true}catch(e){}if(which==='l-form')setTimeout(lembrarPreencher,0);['l-form','l-signup','l-sent','l-wait','l-boot'].forEach(id=>$(id).hidden=id!==which);$('l-tabs').hidden=!(which==='l-form'||which==='l-signup');
  $('l-tabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',(b.dataset.lt==='login'&&which==='l-form')||(b.dataset.lt==='signup'&&which==='l-signup')))}
$('l-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{lshow(b.dataset.lt==='login'?'l-form':'l-signup');lstatus('')});
async function enterApp(){
  // alterações que ficaram sem enviar pertencem a quem as fez: se outra pessoa entra, são descartadas (nunca enviadas em nome dela)
  if(SYNC.pending&&SYNC.dono){let quem=null;try{quem=await uidAtual()}catch(e){}
    if(quem&&quem!==SYNC.dono){S=fresh();snapshot();SYNC.pending=false;SYNC.dono=null;(SYNC.waiters||[]).splice(0);setTimeout(()=>toast('Havia alterações não enviadas de outro usuário neste aparelho. Elas foram descartadas.','warn'),1200)}}
  let semRede=false;
  // v2.9.8: internet fraca — se já há dados guardados deste usuário e o servidor não responde em 15 s, entra com eles (a leitura continua e atualiza depois)
  const temCache=(()=>{try{return !!localStorage.getItem(CACHE_KEY)&&localStorage.getItem(CACHE_UID)===sessaoGuardadaUid()}catch(e){return false}})();
  try{const pl=loadAll();pl.catch(()=>{});await (temCache?Promise.race([pl,new Promise((_,nao)=>setTimeout(()=>nao(new Error('o servidor não respondeu em 15 s')),15000))]):pl)}catch(e){
    // sem conexão: usa o que ficou guardado neste aparelho, mas só se for do mesmo usuário
    let cached=null;try{const quem=await uidAtual();const dono=localStorage.getItem(CACHE_UID);
      if(quem&&dono&&dono===quem)cached=JSON.parse(localStorage.getItem(CACHE_KEY))}catch(x){}
    if(!cached){lstatus('Não foi possível carregar os dados: '+(e.message||e),true);return false}
    S=limpaEstado(cached);snapshot();try{religar()}catch(x){}SYNC.offline=true;setSync('off');semRede=true;
    toast('Sem internet — usando os dados guardados neste aparelho. O que for registrado será enviado quando a internet voltar.','warn');
  }
  // v2.9.8: quem é o usuário. Com internet, o servidor confirma; sem internet vale a sessão guardada neste aparelho
  // (antes, a falta de resposta do servidor era tratada como "usuário não liberado" e desconectava).
  let uidU=null,errU=null;
  META_U={};if(!semRede){try{const r=await sb.auth.getUser();uidU=r&&r.data&&r.data.user?r.data.user.id:null;META_U=r&&r.data&&r.data.user&&r.data.user.user_metadata||{};errU=r&&r.error||null}catch(x){errU=x}}
  if(!uidU&&(semRede||ehFalhaRede(errU)))uidU=await uidAtual();
  USER=S.users.find(u=>u.id===uidU);
  if(!USER&&(semRede||ehFalhaRede(errU))){lstatus('Sem conexão com o servidor. Tente de novo quando a internet voltar.',true);return false}
  if(!USER){lstatus('Seu usuário ainda não está liberado no sistema. Peça ao administrador.',true);await sb.auth.signOut();return false}
  if(USER.status==='pendente'){$('l-wait-user').textContent=(USER.login||'').toUpperCase();lshow('l-wait');lstatus('');USER=null;return false}
  if(USER.ativo===false){lstatus('Usuário inativo. Procure o administrador.',true);await sb.auth.signOut();USER=null;return false}
  try{localStorage.setItem(CACHE_UID,USER.id)}catch(e){}
  {const z=pendRecuperar(semRede);if(z.n||z.a||z.d){save();if(z.n&&!semRede)setTimeout(()=>toast(`${z.n} ${z.n===1?'registro feito sem internet foi recuperado':'registros feitos sem internet foram recuperados'} e ${z.n===1?'está sendo enviado':'estão sendo enviados'} ao servidor.`,'warn'),1200)}}   // v2.9.7 / v2.9.8
  estRecuperar();inativToque(true);$('l-inativo').hidden=true;
  $('login').style.display='none';$('app').classList.add('on');
  $('who-name').textContent=USER.nome;$('who-role').textContent=USER.tipo||USER.perfil;
  audit('login.ok','',{aba:'login'});save();
  seedPerfis();buildNav();loadSocial();setTimeout(fotoEnviar,1500);lgpdPedeCiencia();sessaoInicia();
  if(!semRede&&META_U&&META_U.trocar_senha===true)setTimeout(()=>abrirMinhaSenha(true),400);   // v3.1.7: senha provisória — troca obrigatória
  return true;
}
async function resolveEmail(login){login=login.trim();if(login.includes('@'))return login.toLowerCase();
  try{const {data}=await sb.rpc('email_por_login',{p_login:login});if(data)return data}catch(e){}return toEmail(login)}
/* =================== v2.9.4: TELA DE ENTRADA — olho na senha e "Lembrar minha senha" ===================
   A senha NUNCA é gravada pelo sistema. Com "Lembrar minha senha" marcado, o sistema guarda neste aparelho só o usuário (login)
   e pede ao navegador que guarde a senha no gerenciador de senhas dele (Chrome, Edge, Android: API de credenciais; iPhone/Safari e
   Firefox: o próprio navegador oferece guardar, pelo formulário). Na próxima entrada, o usuário vem preenchido e o navegador preenche a senha.
   Desmarcado: o sistema esquece o usuário (a senha guardada no navegador sai pelo gerenciador de senhas do navegador). */
const LEMBRAR_KEY='sismed_lembrar';
function lembrarLer(){try{const v=JSON.parse(localStorage.getItem(LEMBRAR_KEY)||'null');return v&&typeof v.login==='string'&&v.login?v:null}catch(e){return null}}
function olhoSenha(mostrar){const i=$('l-pass'),b=$('l-olho');if(!i||!b)return;i.type=mostrar?'text':'password';const t=mostrar?'Esconder a senha':'Mostrar a senha';
  b.setAttribute('aria-pressed',String(!!mostrar));b.setAttribute('aria-label',t);b.title=t;b.classList.toggle('on',!!mostrar)}
$('l-olho').onclick=()=>{const i=$('l-pass'),p=i.selectionStart;olhoSenha(i.type==='password');i.focus();try{if(p!=null)i.setSelectionRange(p,p)}catch(e){}};
let LEMBRAR_PEDIU=0;
function lembrarPreencher(){const L=lembrarLer();$('l-lembrar').checked=!!L;if(!L||USER)return;
  if(!$('l-user').value)$('l-user').value=L.login;
  // a senha vem do gerenciador de senhas do navegador (só onde há a API de credenciais), uma vez por exibição da tela
  if($('l-pass').value||!window.PasswordCredential||!navigator.credentials||!navigator.credentials.get||Date.now()-LEMBRAR_PEDIU<5000)return;
  LEMBRAR_PEDIU=Date.now();
  setTimeout(async()=>{if(USER||$('login').style.display==='none'||$('l-form').hidden||$('l-pass').value)return;
    try{const c=await Promise.race([navigator.credentials.get({password:true,mediation:'optional'}),new Promise(r=>setTimeout(()=>r(null),8000))]);
      if(c&&c.type==='password'&&c.password&&!USER&&!$('l-pass').value){if(c.id)$('l-user').value=c.id;$('l-pass').value=c.password}}catch(e){}},900)}
function lembrarAoEntrar(login,pass){
  if($('l-lembrar').checked){try{localStorage.setItem(LEMBRAR_KEY,JSON.stringify({login:String(login).slice(0,120)}))}catch(e){}
    try{if(window.PasswordCredential&&navigator.credentials&&navigator.credentials.store)navigator.credentials.store(new PasswordCredential({id:login,password:pass,name:login})).catch(()=>{})}catch(e){}}
  else{try{localStorage.removeItem(LEMBRAR_KEY)}catch(e){}try{if(navigator.credentials&&navigator.credentials.preventSilentAccess)navigator.credentials.preventSilentAccess().catch(()=>{})}catch(e){}}}
async function doLogin(){
  const login=$('l-user').value.trim(),pass=$('l-pass').value;if(!login||!pass||doLogin.ocupado)return;
  doLogin.ocupado=true;$('l-go').disabled=true;$('l-err').hidden=true;lstatus('Entrando…');
  let error=null;try{({error}=await sb.auth.signInWithPassword({email:await resolveEmail(login),password:pass}))}catch(e){error=e}finally{doLogin.ocupado=false}
  $('l-go').disabled=false;
  if(!error){lembrarAoEntrar(login,pass);olhoSenha(false)}
  if(error){$('l-err').hidden=false;$('l-err').textContent=/confirm/i.test(error.message)?'E-mail ainda não confirmado. Abra o link de confirmação que enviamos para o seu e-mail.':'Usuário ou senha inválidos.'+(login.includes('@')?'':' Se você criou a conta com o seu e-mail, entre com o e-mail.');lstatus('');return}
  lstatus('Carregando dados…');await enterApp();lstatus('');
}
async function doSignup(){
  const err=$('su-err');const show=m=>{err.hidden=false;err.textContent=m};
  const login=$('su-user').value.trim().toUpperCase(),email=$('su-email').value.trim().toUpperCase(),p1=$('su-pass').value,p2=$('su-pass2').value;
  if(!/^[A-Z0-9._-]{3,30}$/.test(login))return show('Usuário: de 3 a 30 caracteres, apenas letras, números, ponto, hífen ou sublinhado.');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return show('Informe um e-mail corporativo válido.');
  if(!senhaOk(p1))return show('A senha precisa ter '+SENHA_REGRA+'.');
  if(p1!==p2)return show('As senhas não conferem.');
  if(!$('su-lgpd').checked)return show('Para criar a conta, leia a Política de Privacidade e marque a caixa de ciência.');
  err.hidden=true;$('su-go').disabled=true;
  // o servidor diz se o usuário está livre (sem revelar e-mail de ninguém); em servidor antigo, usa a consulta anterior
  try{const r=await sb.rpc('login_livre',{p_login:login});
    if(!r.error){if(r.data===false){$('su-go').disabled=false;return show('Este usuário já existe. Escolha outro.')}}
    else{const {data:ex}=await sb.rpc('email_por_login',{p_login:login});if(ex){$('su-go').disabled=false;return show('Este usuário já existe. Escolha outro.')}}}catch(e){}
  const {data,error}=await sb.auth.signUp({email:email.toLowerCase(),password:p1,options:{data:{nome:login,login,app:'medicoes'},emailRedirectTo:location.origin+location.pathname}});
  $('su-go').disabled=false;
  if(error)return show(/already|registered/i.test(error.message)?'Já existe uma conta com este e-mail.':/rate/i.test(error.message)?'Limite de envio de e-mails atingido no servidor. Tente novamente em alguns minutos.':'Erro: '+error.message);
  if(data.session){await enterApp();return}
  $('l-sent-email').textContent=email;$('l-sent-sim').hidden=!window.__simularConfirmacao;lshow('l-sent');
}
async function doBootstrap(){
  const nome=$('b-nome').value.trim(),login=$('b-login').value.trim(),pass=$('b-pass').value;const err=$('b-err');
  if(!nome||!login||!senhaOk(pass)){err.hidden=false;err.textContent='Preencha nome, login e uma senha com '+SENHA_REGRA+'.';return}
  err.hidden=true;$('b-go').disabled=true;
  const {data,error}=await sb.auth.signUp({email:toEmail(login),password:pass,options:{data:{nome,login,app:'medicoes'}}});
  $('b-go').disabled=false;
  if(error){err.hidden=false;err.textContent=error.message;return}
  if(!data.session){err.hidden=false;err.textContent='Usuário criado. Confirme o e-mail pelo link enviado e depois entre.';lshow('l-form');return}
  lshow('l-form');await enterApp();
}
/* =================== TELA DE ENTRADA: céu, onda e obra que acompanham a hora do dia (v2.6.4) ===================
   Só desenha com a tela de entrada aberta e a aba visível. Cores por hora em LX_K (interpoladas entre os horários).
   Pré-visualização (só visual): ?hora=18 fixa a hora; ?hora=dia passa as 24 h em 40 s. */
const LX={ult:0,ultTema:-1e9,tema:'',forcada:null,movRed:false,forcar:true,p:null,h:0,rodando:false,toque:0};
const lxHx=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
const lxMix=(a,b,t)=>{const A=lxHx(a),B=lxHx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const lxLum=c=>{const v=lxHx(c).map(x=>{x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4)});return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2]};
const lxRgba=(c,a)=>{const v=lxHx(c);return 'rgba('+v[0]+','+v[1]+','+v[2]+','+a+')'};
const lxClamp=x=>Math.max(0,Math.min(1,x));
// por hora: céu (topo), céu (base), onda (início), onda (fim), cartão, destaque, texto do destaque
const LX_K=(()=>{const n=['#04060F','#0B1033','#2F8CFF','#9B4DFF','#0E1328','#8FB6FF','#0B1634'];return [
  [0,n],[4.5,n],
  [5.5,['#121433','#5B2C5E','#FF6FA0','#6C7BFF','#1A1736','#FF9A7A','#2A0F08']],
  [6.5,['#DCE8F5','#F6D9C8','#3B8FD9','#E0708F','#F7F3F1','#0F5C70','#FFFFFF']],
  [7,['#E6F1FA','#CDE2F4','#1F93C9','#5D74F0','#F5F9FC','#0F5C70','#FFFFFF']],
  [10,['#F2F8FD','#D8E9F7','#1C9AD2','#4C6BF5','#FAFCFE','#0F5C70','#FFFFFF']],
  [11.5,['#FFF3E2','#FFD8AE','#F3802F','#E8466A','#FFFAF3','#B4460C','#FFFFFF']],
  [14,['#FFF0DC','#FFD2A6','#F07A2E','#DD3F6B','#FFF9F1','#B4460C','#FFFFFF']],
  [16,['#FBF0E6','#F1D7C9','#E26D49','#A955B8','#FFFAF6','#A2400F','#FFFFFF']],
  [17.3,['#F7D2B4','#DE9A86','#F0564E','#8E52E0','#FBF0E8','#B33A1A','#FFFFFF']],
  [18,['#1C1840','#5A2A60','#FF5F86','#8A5CFF','#1C1838','#FF9E7A','#2A0F08']],
  [19,['#0B0E2C','#26194D','#C45CFF','#4D7CFF','#121433','#A9B8FF','#0B1634']],
  [20,['#05081A','#0E1442','#3FA9FF','#8A5CFF','#0E1330','#8FB6FF','#0B1634']],
  [24,n]]})();
function lxPaleta(h){let i=0;while(i<LX_K.length-2&&LX_K[i+1][0]<=h)i++;const a=LX_K[i],b=LX_K[i+1],t=lxClamp((h-a[0])/(b[0]-a[0]));
  // céu e onda mudam aos poucos; cartão e botão só se misturam entre horários do mesmo modo (claro/escuro) — na troca de modo,
  // mudam de uma vez no meio do intervalo, para o texto nunca passar por cores de pouco contraste
  const mesmo=(lxLum(a[1][4])<0.2)===(lxLum(b[1][4])<0.2);
  const v=a[1].map((x,j)=>j<4||mesmo?lxMix(x,b[1][j],t):(t<0.5?x:b[1][j]));
  return {ceuTopo:v[0],ceuBase:v[1],ondaA:v[2],ondaB:v[3],cartao:v[4],destaque:v[5],textoDestaque:v[6]}}
const lxContraste=(a,b)=>{const x=lxLum(a),y=lxLum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)};
function lxHoraAgora(ts){
  if(LX.forcada==='dia')return (5+(ts/1000)*(24/40))%24;
  if(typeof LX.forcada==='number')return LX.forcada;
  const d=new Date();return d.getHours()+d.getMinutes()/60+d.getSeconds()/3600}
function lxTema(h){
  const p=lxPaleta(h),esc=lxLum(p.cartao)<0.2,largo=innerWidth>=860&&innerHeight>=600;
  // cor do céu atrás do relógio (no celular ele fica no alto; no computador, no meio da altura) e o texto de maior contraste sobre ela
  const meio=lxMix(p.ceuTopo,p.ceuBase,largo?0.72:0.3),escCeu=lxContraste(meio,'#FFFFFF')>lxContraste(meio,'#000000');
  const txt=escCeu?(lxContraste(meio,'#F2F5FF')>=4.6?'#F2F5FF':'#FFFFFF'):(lxContraste(meio,'#14202C')>=4.6?'#14202C':'#000000');
  const txt2c=escCeu?'#AEB8CC':'#4A5865',txt2=lxContraste(meio,txt2c)>=4.6?txt2c:txt;
  // cartão translúcido: fica mais opaco quando o céu atrás (amanhecer/entardecer) tiraria o contraste dos textos do cartão
  const ink2=esc?'#A8B3C7':'#55626F',erro=esc?'#F08A8A':'#B23A3A';let alfa=esc?0.58:0.76;
  for(const a of [alfa,0.7,0.8,0.88,0.94,1]){if(a<alfa)continue;alfa=a;
    if([p.ceuBase,p.ceuTopo].every(c=>{const f=lxMix(c,p.cartao,a);return [ink2,erro,p.destaque].every(x=>lxContraste(x,f)>=4.6)}))break}
  const v={'--lx-ceu-base':p.ceuBase,'--lx-pilula':lxRgba(lxMix(p.ceuBase,p.ceuTopo,0.3),0.72),'--lx-sombra-texto':escCeu?'rgba(4,6,20,.55)':'rgba(255,255,255,.65)','--lx-texto':txt,'--lx-texto2':txt2,'--lx-rodape':escCeu?'rgba(220,228,245,.62)':'rgba(20,32,44,.62)',
    '--lx-vidro':lxRgba(p.cartao,alfa),'--lx-vidro-solido':lxRgba(p.cartao,0.95),'--lx-borda':esc?'rgba(255,255,255,.12)':'rgba(20,32,44,.08)','--lx-sombra':esc?'0 24px 60px rgba(0,0,0,.45)':'0 24px 60px rgba(30,40,60,.14)',
    '--lx-trilho':esc?'rgba(255,255,255,.05)':'rgba(20,32,44,.05)','--lx-ativo':esc?'rgba(255,255,255,.10)':'#FFFFFF','--lx-sombra-ativo':esc?'none':'0 1px 3px rgba(20,32,44,.12)',
    '--lx-campo':esc?'rgba(255,255,255,.05)':'rgba(255,255,255,.78)','--lx-borda-campo':esc?'rgba(255,255,255,.15)':'rgba(20,32,44,.18)',
    '--accent':p.destaque,'--accent-ink':p.textoDestaque,'--accent-2':p.destaque,'--accent-soft':lxMix(p.cartao,p.destaque,0.16)};
  const chave=(esc?'e':'c')+Object.values(v).join('|');
  if(chave!==LX.tema){LX.tema=chave;const el=$('login');el.setAttribute('data-lx',esc?'escuro':'claro');for(const k in v)el.style.setProperty(k,v[k])}
  return p}
function lxRelogio(h){
  const hh=Math.floor(h),mm=Math.floor((h-hh)*60+1e-6),r=String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0');
  const sd=h>=5&&h<12?'BOM DIA':h>=12&&h<18?'BOA TARDE':'BOA NOITE';
  let d='';try{d=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})}catch(e){}
  [['l-rel',r],['l-saud',sd],['l-data',d]].forEach(([id,t])=>{const e=$(id);if(e&&e.textContent!==t)e.textContent=t})}
// obra da rodovia tocada por capivaras (v2.8.0): avança das 06h às 18h; das 11h30 às 13h param, montam uma barraca e almoçam;
// à noite fica pronta e iluminada e as capivaras dormem; à meia-noite recomeça
function lxObra(g,W,y,s,t,h,escuro,ocupado){
  const clamp=lxClamp,rgba=lxRgba;   // ocupado(x0,y0,x1,y1): área coberta por textos/cartão (opcional)
  const rr=(x,yy,w,hh,r)=>{g.beginPath();g.moveTo(x+r,yy);g.arcTo(x+w,yy,x+w,yy+hh,r);g.arcTo(x+w,yy+hh,x,yy+hh,r);g.arcTo(x,yy+hh,x,yy,r);g.arcTo(x,yy,x+w,yy,r);g.closePath();g.fill()};
  const tinta=escuro?'#E8EDF8':'#1B2633',asfalto=escuro?'#151B28':'#2A333F',ambar='#F2A33A',colete='#FF8A1F',faixa='#F6C343',capa='#FFC21A';
  const olho=escuro?'#151B28':'#F4F6F8',vidro=escuro?'rgba(255,214,140,0.5)':'rgba(255,255,255,0.72)';
  const almoco=h>=11.5&&h<13,trab=h>=6&&h<18,obra=trab&&!almoco;
  const lim=(v,a,b)=>Math.max(a,Math.min(b,v)),feito=lim(h-6,0,5.5)+lim(h-13,0,5),p=clamp(feito/10.5),fx=W*(0.05+0.9*p),esp=5*s;
  const lona='#F26B1D',creme='#FFF3E0',madeira='#9A6B43',termica='#E4572E',suave=x=>x*x*(3-2*x);
  // ---------- capivara (desenhada em unidades; 1 unidade = s px; chão em 0; olhando para a direita) ----------
  const cabeca=(ox,oy,cap,vivo)=>{   // ox,oy = alto da nuca
    g.fillStyle=tinta;g.beginPath();g.arc(ox+0.6,oy-0.1,0.8,0,2*Math.PI);g.fill();   // orelha
    g.beginPath();g.moveTo(ox,oy+0.2);g.quadraticCurveTo(ox+1.6,oy-0.5,ox+3.6,oy-0.1);g.quadraticCurveTo(ox+5.4,oy+0.3,ox+5.9,oy+1.6);
    g.quadraticCurveTo(ox+6.3,oy+3.2,ox+5.6,oy+3.7);g.quadraticCurveTo(ox+4.6,oy+4.1,ox+2.4,oy+3.9);g.quadraticCurveTo(ox+0.4,oy+3.9,ox-0.4,oy+3.4);
    g.quadraticCurveTo(ox-0.6,oy+1.2,ox,oy+0.2);g.closePath();g.fill();
    if(vivo&&s>=1.3){g.fillStyle=olho;g.beginPath();g.arc(ox+3.3,oy+1.2,0.36,0,2*Math.PI);g.fill()}
    if(cap){g.fillStyle=capa;g.beginPath();g.arc(ox+2.4,oy+0.05,1.75,Math.PI,2*Math.PI);g.fill();rr(ox+0.5,oy-0.2,4.5,0.62,0.3)}};
  const coleteEm=(desenhaCorpo,x0,y0,w,hh)=>{g.save();desenhaCorpo();g.clip();g.fillStyle=colete;g.fillRect(x0,y0,w,hh);
    g.fillStyle=rgba('#FFF4C2',0.9);g.fillRect(x0,y0+hh*0.45,w,0.35);g.restore()};
  const carga=(c)=>{
    if(c==='barraca'){g.fillStyle=creme;rr(-7.6,-11.2,10.4,2.7,1.3);g.fillStyle=lona;g.fillRect(-5.6,-11.2,1.3,2.7);g.fillRect(-1.6,-11.2,1.3,2.7);
      g.fillStyle=tinta;g.fillRect(-8.8,-10.1,12.6,0.55)}   // lona enrolada com as varetas
    if(c==='mesa'||c==='mesa+garrafa'){g.fillStyle=madeira;rr(-6.8,-10.4,9.4,1.3,0.5)}   // mesa dobrada nas costas
    if(c==='mesa+garrafa'){g.strokeStyle=tinta;g.lineWidth=0.35;g.beginPath();g.moveTo(7.7,-4.6);g.quadraticCurveTo(8.7,-5.9,9.7,-4.6);g.stroke();
      g.fillStyle=termica;rr(7.3,-4.6,2.9,3.4,0.6);g.fillStyle=tinta;rr(7.2,-4.9,3.1,0.6,0.3)}};   // garrafa térmica pela alça, na boca
  const capi=(x,d,k,pose,fase,leva)=>{
    g.save();g.translate(x,y);g.scale(d*s*k,s*k);g.lineCap='round';
    const passo=pose==='anda'?Math.sin(t*7+fase):0,pulo=pose==='anda'?Math.abs(passo)*0.25:0;
    if(pose==='anda'){
      g.fillStyle=tinta;[[-5.4,1],[-3.8,-1],[2.4,-1],[4.0,1]].forEach(([lx,f])=>rr(lx+0.55*passo*f,-2.8,1.2,2.8,0.5));
      g.translate(0,-pulo);
      const corpo=()=>{g.beginPath();g.ellipse(-1.2,-4.7,6.1,3.0,0.07,0,2*Math.PI)};
      g.fillStyle=tinta;corpo();g.fill();coleteEm(corpo,-2.4,-8,3.2,7);
      cabeca(2.6,-8.4,true,true);
      if(leva)carga(leva);
    }else if(pose==='deitada'){
      const corpo=()=>{g.beginPath();g.ellipse(-1.2,-2.3,6.2,2.3,0.03,0,2*Math.PI)};
      g.fillStyle=tinta;corpo();g.fill();
      cabeca(3.4,-4.4,false,false);
      g.fillStyle=capa;g.beginPath();g.arc(-9.6,0,1.75,Math.PI,2*Math.PI);g.fill();rr(-11.6,-0.55,4.0,0.55,0.25);   // capacete no chão
    }else{   // sentada (como um cachorro sentado): segurando o rodo, a placa ou almoçando
      const corpo=()=>{g.beginPath();g.ellipse(-0.8,-2.7,3.7,2.7,0,0,2*Math.PI);g.ellipse(0.9,-5.6,2.6,3.5,0.4,0,2*Math.PI)};
      g.fillStyle=tinta;rr(1.7,-3.3,1.15,3.3,0.5);rr(2.9,-3.0,1.15,3.0,0.5);
      corpo();g.fill();coleteEm(corpo,-2.2,-8.6,6.4,4.4);
      cabeca(1.0,-11.0,true,true);
      if(pose==='rodo'){const v=1.2*Math.sin(t*2.6+fase);
        g.strokeStyle=tinta;g.lineWidth=0.55;g.beginPath();g.moveTo(2.8,-5.6);g.lineTo(7.6+v,-0.5);g.stroke();
        g.lineWidth=0.8;g.beginPath();g.moveTo(6.4+v,-0.3);g.lineTo(9.0+v,-0.3);g.stroke();
        g.fillStyle=tinta;g.beginPath();g.arc(3.4,-5.2,0.8,0,2*Math.PI);g.fill()}
      if(pose==='placa'){const pare=Math.floor(t/4+fase)%2===0;
        g.strokeStyle=tinta;g.lineWidth=0.5;g.beginPath();g.moveTo(3.6,-4.6);g.lineTo(4.4,-13.2);g.stroke();
        g.fillStyle=pare?'#E5484D':'#2FB36B';g.beginPath();g.arc(4.5,-14.4,1.55,0,2*Math.PI);g.fill();
        g.fillStyle=tinta;g.beginPath();g.arc(3.6,-5.4,0.8,0,2*Math.PI);g.fill()}
      if(pose==='almoco'){   // marmita com vapor
        g.fillStyle=tinta;rr(4.6,-1.8,3.4,1.8,0.4);g.fillStyle=ambar;rr(4.4,-2.3,3.8,0.6,0.3);
        g.strokeStyle=rgba(tinta,0.5);g.lineWidth=0.35;
        for(let i=0;i<2;i++){const f=(t*0.7+i*0.5)%1,vx=5.6+i*1.2;g.globalAlpha=0.95*(1-f);g.beginPath();g.moveTo(vx,-2.8-f*2);
          g.quadraticCurveTo(vx+0.6,-3.6-f*2,vx,-4.4-f*2);g.stroke()}
        g.globalAlpha=0.95}
    }
    g.restore()};
  // barraca sanfonada (f: 0 fechada → 1 armada): primeiro abre para os lados, depois as pernas sobem
  const barraca=(cx,f)=>{
    const e1=suave(clamp(f/0.55)),e2=suave(clamp((f-0.45)/0.55)),hw=(10+14*e1)*s,alt=(7+15*e2)*s,top=y-alt,te=(1+6*e2)*s,ab=hw+3*s*e1;
    g.fillStyle=rgba(tinta,0.10);g.beginPath();g.ellipse(cx,y+0.3*s,hw+2*s,1.1*s,0,0,2*Math.PI);g.fill();   // sombra
    g.fillStyle=tinta;rr(cx-hw-0.55*s,top,1.1*s,alt,0.4*s);rr(cx+hw-0.55*s,top,1.1*s,alt,0.4*s);   // pernas
    rr(cx-hw-1.2*s,y-0.5*s,2.4*s,0.5*s,0.2*s);rr(cx+hw-1.2*s,y-0.5*s,2.4*s,0.5*s,0.2*s);
    g.strokeStyle=tinta;g.lineWidth=0.4*s;g.beginPath();const n=6,hz=2.4*s;   // treliça em X (a sanfona)
    for(let i=0;i<n;i++){const x0=cx-hw+2*hw*i/n,x1=cx-hw+2*hw*(i+1)/n;g.moveTo(x0,top+0.3*s);g.lineTo(x1,top+hz);g.moveTo(x0,top+hz);g.lineTo(x1,top+0.3*s)}g.stroke();
    // lona: telhado listrado + babado recortado
    g.save();g.beginPath();g.moveTo(cx-ab,top+0.4*s);g.lineTo(cx,top-te);g.lineTo(cx+ab,top+0.4*s);g.lineTo(cx+ab,top+2.6*s);
    const nb=Math.max(4,Math.round(2*ab/(4*s))),pb=2*ab/nb;for(let i=nb;i>0;i--){const xm=cx-ab+pb*(i-0.5);g.quadraticCurveTo(cx-ab+pb*i-pb*0.1,top+4.4*s,xm,top+4.4*s);g.quadraticCurveTo(cx-ab+pb*(i-1)+pb*0.1,top+4.4*s,cx-ab+pb*(i-1),top+2.6*s)}
    g.closePath();g.clip();const nl=6,pl=2*ab/nl;for(let i=0;i<nl;i++){g.fillStyle=i%2?creme:lona;g.fillRect(cx-ab+pl*i,top-te-1*s,pl+0.5,te+6*s)}
    g.fillStyle=rgba(tinta,0.16);g.fillRect(cx-ab,top+2.6*s,2*ab,2*s);g.restore();   // sombra do babado
    g.strokeStyle=rgba(tinta,0.55);g.lineWidth=0.35*s;g.beginPath();g.moveTo(cx-ab,top+0.4*s);g.lineTo(cx,top-te);g.lineTo(cx+ab,top+0.4*s);g.stroke();
    if(f>=1){const pt=top-te,ond=Math.sin(t*3.2);   // bandeirinha no topo
      g.strokeStyle=tinta;g.lineWidth=0.35*s;g.beginPath();g.moveTo(cx,pt);g.lineTo(cx,pt-4*s);g.stroke();
      g.fillStyle=faixa;g.beginPath();g.moveTo(cx,pt-4*s);g.quadraticCurveTo(cx+1.8*s,pt-(4.4+0.5*ond)*s,cx+3.6*s,pt-(3.4+0.4*ond)*s);g.lineTo(cx,pt-2.4*s);g.closePath();g.fill()}};
  const mesa=(cx,f)=>{if(f<=0)return;const th=6.4*s*suave(f);
    g.strokeStyle=tinta;g.lineWidth=0.5*s;g.beginPath();g.moveTo(cx-4.4*s,y);g.lineTo(cx+4.4*s,y-th);g.moveTo(cx+4.4*s,y);g.lineTo(cx-4.4*s,y-th);g.stroke();
    g.fillStyle=madeira;rr(cx-6*s,y-th-0.9*s,12*s,0.9*s,0.4*s);
    if(f>=1){const yt=y-th-0.9*s;   // garrafa térmica e um copo
      g.fillStyle=termica;rr(cx-3.4*s,yt-4.6*s,3.2*s,4.6*s,0.7*s);g.fillStyle=tinta;rr(cx-3.6*s,yt-5.2*s,3.6*s,0.7*s,0.3*s);g.fillRect(cx-0.4*s,yt-3.6*s,0.9*s,0.5*s);
      g.fillStyle=creme;rr(cx+1.6*s,yt-1.8*s,1.5*s,1.8*s,0.3*s)}};
  // operador da máquina: janela da cabine com a cabeça da capivara de capacete
  const cabine=(x0,y0,w,hh)=>{g.fillStyle=vidro;rr(x0+1.1*s,y0+1.2*s,w-2.2*s,hh*0.52,0.6*s);
    if(!obra)return;g.save();g.beginPath();g.rect(x0+1.1*s,y0+0.2*s,w-2.2*s,hh*0.52+1*s);g.clip();
    g.translate(x0+w*0.5-2.0*s*0.7,y0+1.2*s+hh*0.52+0.3*s);g.scale(s*0.7,s*0.7);cabeca(-0.4,-4.2,true,false);g.restore()};
  // ---------- terreno e pista ----------
  g.fillStyle=rgba(tinta,0.3);
  for(let x=fx+6*s;x<W+10;x+=7*s)g.fillRect(x,y+esp*0.4,3*s,1.2*s);
  for(let x=fx+52*s;x<W+10;x+=44*s)g.fillRect(x,y-5*s,1.2*s,6.5*s);
  if(fx>1){
    g.fillStyle=asfalto;rr(-4,y,fx+4,esp,1.5*s);
    g.fillStyle=rgba(tinta,escuro?0.28:0.18);g.fillRect(-4,y-0.8*s,fx+4,0.8*s);
    const seco=trab?Math.max(0,fx-36*s):fx;
    if(escuro){g.shadowColor=faixa;g.shadowBlur=6*s}
    g.fillStyle=faixa;for(let x=4*s;x+8*s<seco;x+=16*s)g.fillRect(x,y+esp/2-0.6*s,8*s,1.2*s);
    g.shadowBlur=0}
  const pisca=obra?0.35+0.65*(0.5+0.5*Math.sin(t*6)):0;
  const farol=(x,yy)=>{if(!pisca)return;g.fillStyle=rgba(ambar,pisca);g.shadowColor=ambar;g.shadowBlur=8*s;g.beginPath();g.arc(x,yy,1.5*s,0,2*Math.PI);g.fill();g.shadowBlur=0};
  g.globalAlpha=0.95;
  const a=fx;   // vibroacabadora
  g.fillStyle=tinta;rr(a-28*s,y-11*s,26*s,8*s,2*s);
  g.beginPath();g.moveTo(a-2*s,y-10*s);g.lineTo(a+6*s,y-13*s);g.lineTo(a+6*s,y-4*s);g.lineTo(a-2*s,y-3*s);g.closePath();g.fill();
  rr(a-24*s,y-19*s,9*s,8*s,1.5*s);g.fillRect(a-26*s,y-20.5*s,13*s,1.5*s);g.fillRect(a-32*s,y-7*s,5*s,6*s);
  g.fillStyle=ambar;g.fillRect(a-28*s,y-7.5*s,26*s,1.4*s);g.fillStyle=tinta;rr(a-27*s,y-3.2*s,23*s,3.2*s,1.6*s);
  cabine(a-24*s,y-19*s,9*s,8*s);farol(a-19.5*s,y-22.5*s);
  const b=a-57*s+(obra?6*s*Math.sin(t*0.9):0);   // rolo compactador
  g.fillStyle=tinta;g.beginPath();g.arc(b,y-5*s,5*s,0,2*Math.PI);g.fill();g.beginPath();g.arc(b-21*s,y-5*s,5*s,0,2*Math.PI);g.fill();
  rr(b-23*s,y-13*s,24*s,6*s,2*s);rr(b-16*s,y-21*s,8*s,8*s,1.5*s);g.fillRect(b-18*s,y-22.5*s,12*s,1.5*s);
  g.fillStyle=ambar;g.fillRect(b-2.2*s,y-6*s,4.4*s,2*s);g.fillRect(b-23.2*s,y-6*s,4.4*s,2*s);
  cabine(b-16*s,y-21*s,8*s,8*s);farol(b-12*s,y-24.5*s);
  const c=a+36*s,ang=obra?Math.sin(t*1.6):-0.6;   // escavadeira
  g.fillStyle=tinta;rr(c-11*s,y-4*s,22*s,4*s,2*s);rr(c-9*s,y-12*s,16*s,8*s,2*s);rr(c-7*s,y-19*s,7*s,7*s,1.5*s);
  const bx=c+6*s,by=y-11*s,jx=c+17*s,jy=y-21*s-2*s*ang,kx=c+25*s,ky=y-7*s+4*s*ang;
  g.strokeStyle=tinta;g.lineWidth=2.6*s;g.lineCap='round';g.beginPath();g.moveTo(bx,by);g.lineTo(jx,jy);g.lineTo(kx,ky);g.stroke();
  g.beginPath();g.moveTo(kx-2.5*s,ky-1*s);g.lineTo(kx+3*s,ky-1.5*s);g.lineTo(kx+1*s,ky+3.5*s);g.closePath();g.fill();
  g.fillStyle=ambar;g.fillRect(c-9*s,y-8.5*s,16*s,1.4*s);
  cabine(c-7*s,y-19*s,7*s,7*s);farol(c-3.5*s,y-21*s);
  if(obra)for(let k=0;k<5;k++){const f=(t*0.6+k/5)%1;g.fillStyle=rgba(tinta,0.18*(1-f));g.beginPath();g.arc(kx+(k-2)*2.5*s,ky-f*14*s,(1+f*2.5)*s,0,2*Math.PI);g.fill()}
  // ---------- capivaras ----------
  if(obra){
    const vx=a+15.5*s+2.5*s*Math.sin(t*0.45),dir=Math.cos(t*0.45)>=0?1:-1;
    capi(b-36*s,-1,1,'placa',0.3);          // sinaleira com PARE/SIGA, atrás do rolo
    capi(a-36*s,-1,1,'rodo',0);             // espalha o asfalto atrás da vibroacabadora
    capi(vx,dir,0.92,'anda',1.1);              // vai e volta entre a vibroacabadora e a escavadeira
    capi(c+46*s+3*s*Math.sin(t*0.3),Math.cos(t*0.3)>=0?1:-1,0.92,'anda',2.3);   // vistoria o terreno à frente
  }else if(almoco){
    // barraca no terreno à frente da escavadeira (l=1) ou, se ali estiver coberto pelo cartão de entrada, atrás do rolo (l=-1).
    // E traz a mesa e a garrafa térmica; L e R armam a barraca. m = minutos desde as 11h30.
    const m=(h-11.5)*60,u=v=>suave(clamp(v)),TD=Math.min(a+110*s,W-29*s),TE=b-72*s;
    const livre=(T,l)=>!(ocupado&&ocupado(Math.min(T-46*s*l,T+29*s*l),y-36*s,Math.max(T-46*s*l,T+29*s*l),y+2*s));
    const l=livre(TD,1)||!(TE-29*s>=0&&livre(TE,-1))?1:-1,T=l>0?TD:TE;
    const orig=l>0?{E:b-12*s,L:a-20*s,R:a+32*s}:{E:a+32*s,L:a-20*s,R:b-12*s};
    const esp0={E:T-38*s*l,L:T-6*s*l,R:T+6*s*l},vai=(k,v)=>orig[k]+(esp0[k]-orig[k])*u(v),dir=k=>esp0[k]>=orig[k]?1:-1;
    const fb=m<4?-1:m<14?(m-4)/10:m<86?1:m<88?1-(m-86)/2:-1;   // barraca: -1 = enrolada (sendo levada)
    const hwB=(10+14*suave(clamp(Math.max(0,fb)/0.55)))*s,pux=0.5*s*Math.sin(t*3);
    if(fb>=0)barraca(T,fb);
    const fm=m<14?0:m<15.5?(m-14)/1.5:m<85?1:m<85.5?1-(m-85)*2:0;mesa(T,fm);
    if(m<4){capi(vai('E',m/4),dir('E'),1,'anda',0.2,'mesa+garrafa');capi(vai('L',m/4),dir('L'),1,'anda',1.1,'barraca');capi(vai('R',m/4),dir('R'),1,'anda',2.3)}
    else if(m<14){capi(T-38*s*l,l,1,'sentada',0.2);capi(T-l*(hwB-4*s-pux),-l,1,'anda',1.1);capi(T+l*(hwB-4*s-pux),l,1,'anda',2.3)}
    else if(m<16){const v=u((m-14)/2);capi(T-l*(38*s-10*s*v),l,1,'anda',0.2);capi(T-l*(20*s-5*s*v),l,1,'anda',1.1);capi(T+l*(20*s-5*s*v),-l,1,'anda',2.3)}
    else if(m<85){capi(T-28*s*l,l,1,'almoco',0);capi(T-15*s*l,l,1,'almoco',0.7);capi(T+15*s*l,-l,1,'almoco',1.4)}
    else if(m<86){const v=u(m-85);capi(T-l*(28*s+10*s*v),-l,1,'anda',0.2,m-85>0.5?'mesa+garrafa':null);capi(T-l*(15*s+5*s*v),-l,1,'anda',1.1);capi(T+l*(15*s+5*s*v),l,1,'anda',2.3)}
    else if(m<88){capi(T-38*s*l,l,1,'anda',0.2,'mesa+garrafa');capi(T-l*(hwB-4*s+pux),-l,1,'anda',1.1);capi(T+l*(hwB-4*s+pux),l,1,'anda',2.3)}
    else{const v=1-(m-88)/2;capi(vai('E',v),-dir('E'),1,'anda',0.2,'mesa+garrafa');capi(vai('L',v),-dir('L'),1,'anda',1.1,'barraca');capi(vai('R',v),-dir('R'),1,'anda',2.3)}
  }else{
    capi(b-38*s,1,1,'deitada',0);capi(a-40*s,-1,1,'deitada',0);
  }
  g.globalAlpha=1}
function lxDesenha(t,h,p){
  const cv=$('l-ceu');if(!cv||!cv.getContext)return;
  const W=cv.clientWidth,H=cv.clientHeight;if(!W||!H)return;
  const dpr=Math.min(2,window.devicePixelRatio||1);
  if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
  const escuro=lxLum(p.ceuBase)<0.18,tinta=escuro?'#EEF2FF':'#14202C';
  // geometria: no computador o horizonte fica a 70% da altura; no celular, logo acima do cartão de entrada
  let G;
  const largo=W>=860&&H>=600;
  if(largo){const s=Math.max(1.2,Math.min(1.8,W/900));G={y:H*0.7-2,s,cy:H*0.72,rx:W*0.42,ry:H*0.56,topo:H*0.7,base:H*1.04,A:H*0.04,R:24,C:Math.max(90,Math.min(190,Math.round(W/8))),orbe:[34,26],brilho:[H*0.36,H*0.28],fonte:11,rot:[20,18]}}
  else{const box=document.querySelector('#login .box'),dt=$('l-data');
    const tc=box?box.getBoundingClientRect().top:H*0.52,fh=dt?dt.getBoundingClientRect().bottom:H*0.25;
    const y=Math.max(Math.min(tc-120,H*0.62),fh+70);
    G={y,s:1.3,cy:y+22,rx:W*0.44,ry:Math.max(120,y+22-96),topo:y+4,base:y+156,A:24,R:22,C:Math.max(70,Math.min(120,Math.round(W/4.2))),orbe:[24,18],brilho:[190,150],fonte:10,rot:[16,14]}}
  const ceu=g.createLinearGradient(0,0,0,H);ceu.addColorStop(0,p.ceuTopo);ceu.addColorStop(0.62,p.ceuBase);ceu.addColorStop(1,lxMix(p.ceuBase,p.ceuTopo,0.35));
  g.globalCompositeOperation='source-over';g.fillStyle=ceu;g.fillRect(0,0,W,H);
  const cx=W/2,dia=h>=6&&h<18,ts=(h-6)/12,tm=((((h-18)%24)+24)%24)/12;
  g.lineWidth=1;g.strokeStyle=lxRgba(tinta,escuro?0.13:0.16);g.beginPath();g.ellipse(cx,G.cy,G.rx,G.ry,0,Math.PI,2*Math.PI);g.stroke();
  const tt=lxClamp(dia?ts:tm),thc=Math.PI*(1-tt);
  if(tt>0.002){g.lineWidth=1.5;g.strokeStyle=lxRgba(tinta,escuro?0.45:0.5);g.beginPath();g.ellipse(cx,G.cy,G.rx,G.ry,0,Math.PI,2*Math.PI-thc);g.stroke()}
  const rot=dia?['06','09','12','15','18']:['18','21','00','03','06'];
  g.font='500 '+G.fonte+'px "IBM Plex Mono", monospace';g.textAlign='center';g.textBaseline='middle';
  const livre=(x,y)=>!(LX.rects||[]).some(q=>x>q.l-10&&x<q.r+10&&y>q.t-10&&y<q.b+10);
  for(let k=0;k<5;k++){const th=Math.PI*(1-k/4),x=cx+G.rx*Math.cos(th),y=G.cy-G.ry*Math.sin(th),lx=Math.max(12,Math.min(W-12,cx+(G.rx+G.rot[0])*Math.cos(th))),ly=G.cy-(G.ry+G.rot[1])*Math.sin(th);
    if(livre(x,y)){g.fillStyle=lxRgba(tinta,0.5);g.beginPath();g.arc(x,y,2,0,2*Math.PI);g.fill()}
    if(livre(lx,ly)){g.fillStyle=lxRgba(tinta,0.55);g.fillText(rot[k],lx,ly)}}
  const luz=(tt2,sol)=>{const th=Math.PI*(1-tt2),alt=Math.sin(th);let a=lxClamp((alt+0.04)*4);if(a<=0)return;
    const x=cx+G.rx*Math.cos(th),y=G.cy-G.ry*Math.sin(th);
    const nucleo=sol?lxMix('#FF6A3A',h>11&&h<15?'#FFD27A':'#FFEFC2',lxClamp(alt*1.6)):'#F2F5FF',brilho=sol?(alt<0.3?'#FF7A45':'#FFC46B'):'#9DB7FF';
    const R=sol?G.brilho[0]:G.brilho[1],r0=(sol?G.orbe[0]:G.orbe[1])*1.8;
    // atrás do relógio ou da data a luz fica mais fraca, para o texto continuar legível
    if((LX.rects||[]).slice(0,4).some(q=>x>q.l-r0&&x<q.r+r0&&y>q.t-r0&&y<q.b+r0))a*=0.35;
    const gl=g.createRadialGradient(x,y,0,x,y,R);
    gl.addColorStop(0,lxRgba(brilho,0.55*a));gl.addColorStop(0.35,lxRgba(brilho,0.18*a));gl.addColorStop(1,lxRgba(brilho,0));
    g.fillStyle=gl;g.beginPath();g.arc(x,y,R,0,2*Math.PI);g.fill();
    const r=sol?G.orbe[0]:G.orbe[1],nu=g.createRadialGradient(x,y,0,x,y,r*1.6);
    nu.addColorStop(0,lxRgba('#FFFFFF',a));nu.addColorStop(0.45,lxRgba(nucleo,a));nu.addColorStop(0.62,lxRgba(nucleo,0.9*a));nu.addColorStop(1,lxRgba(nucleo,0));
    g.fillStyle=nu;g.beginPath();g.arc(x,y,r*1.6,0,2*Math.PI);g.fill()};
  luz(ts,true);luz(tm>1.5?tm-2:tm,false);
  const gx=largo?W*0.68:W*0.7,gy=largo?H*0.9:G.y+116,gr=largo?W*0.6:W*0.85,gb=g.createRadialGradient(gx,gy,0,gx,gy,gr);
  gb.addColorStop(0,lxRgba(p.ondaB,escuro?0.33:0.21));gb.addColorStop(1,lxRgba(p.ondaB,0));g.fillStyle=gb;g.fillRect(0,0,W,H);
  // onda de partículas: uma cor por coluna e a transparência por ponto (mais leve para o celular)
  const ca=lxHx(p.ondaA),cb=lxHx(p.ondaB),fat=largo?1.1:1,linhas=[];
  for(let r=0;r<G.R;r++){const d=r/(G.R-1);linhas.push({d,yb:G.topo+(G.base-G.topo)*Math.pow(d,1.5),amp:G.A*(0.35+0.65*d),rad:(0.45+1.4*d)*fat,al:0.16+0.73*d})}
  if(escuro)g.globalCompositeOperation='lighter';
  for(let c=0;c<G.C;c++){const u=c/(G.C-1),x=-0.05*W+u*1.1*W,borda=0.45+0.55*Math.min(1,Math.min(u,1-u)*7),k=lxClamp(u*1.05-0.02);
    const f1=u*5.2+t*0.55,f2=u*11.0-t*0.8,f3=Math.sin(u*2.1+t*0.25+1.3)*0.45;
    g.fillStyle='rgb('+Math.round(ca[0]+(cb[0]-ca[0])*k)+','+Math.round(ca[1]+(cb[1]-ca[1])*k)+','+Math.round(ca[2]+(cb[2]-ca[2])*k)+')';
    for(const L of linhas){const y=L.yb+L.amp*(Math.sin(f1+L.d*2.0)*0.55+Math.sin(f2+L.d*1.1)*0.22+f3),rad=L.rad;
      g.globalAlpha=L.al*borda;
      if(rad<1.1)g.fillRect(x-rad,y-rad,rad*2,rad*2);else{g.beginPath();g.arc(x,y,rad,0,2*Math.PI);g.fill()}}}
  g.globalAlpha=1;
  g.globalCompositeOperation='source-over';
  lxObra(g,W,G.y,G.s,t,h,escuro,(x0,y0,x1,y1)=>(LX.rects||[]).some(q=>x1>q.l-6&&x0<q.r+6&&y1>q.t-6&&y0<q.b+6))}
function lxAtivo(){const el=$('login');return !!el&&el.style.display!=='none'&&!document.hidden}
function lxComecar(){LX.forcar=true;if(LX.rodando||!lxAtivo())return;LX.rodando=true;requestAnimationFrame(lxQuadro)}
function lxQuadro(ts){
  if(!lxAtivo()){LX.rodando=false;return}   // entrou no sistema ou aba escondida: para (lxComecar volta)
  if(LX.forcar||ts-LX.ultTema>=(LX.forcada==='dia'?100:1000)){LX.ultTema=ts;LX.h=lxHoraAgora(ts);LX.p=lxTema(LX.h);lxRelogio(LX.h);
    LX.rects=['l-saud','l-rel','l-data'].map(id=>$(id)).concat([document.querySelector('#login .lx-sis'),document.querySelector('#login .box')]).filter(Boolean).map(e=>{const q=e.getBoundingClientRect();return {l:q.left,r:q.right,t:q.top,b:q.bottom}}).filter(q=>q.r>q.l)}
  const quieto=performance.now()-LX.toque>180000;   // 3 min sem ninguém mexer: 4 quadros por segundo
  if(LX.forcar||ts-LX.ult>=(quieto?250:33)){LX.forcar=false;LX.ult=ts;try{lxDesenha(LX.movRed?2:ts/1000,LX.h,LX.p)}catch(e){}}
  if(LX.movRed)setTimeout(()=>requestAnimationFrame(lxQuadro),15000);else requestAnimationFrame(lxQuadro)}
(function lxIniciar(){
  try{const q=new URLSearchParams(location.search).get('hora');if(q==='dia')LX.forcada='dia';else if(q!==null&&q.trim()!==''&&isFinite(+q))LX.forcada=(((+q)%24)+24)%24}catch(e){}
  try{const mq=matchMedia('(prefers-reduced-motion: reduce)');LX.movRed=mq.matches;const f=e=>{LX.movRed=e.matches;LX.forcar=true};if(mq.addEventListener)mq.addEventListener('change',f);else if(mq.addListener)mq.addListener(f)}catch(e){}
  LX.toque=performance.now();['pointerdown','keydown','touchstart'].forEach(ev=>$('login').addEventListener(ev,()=>{LX.toque=performance.now()},{passive:true}));
  $('login').addEventListener('scroll',()=>{LX.forcar=true},{passive:true});
  const rede=()=>{const on=navigator.onLine!==false;$('l-net').classList.toggle('off',!on);$('l-net-t').textContent=on?'Online':'Sem internet'};
  rede();window.addEventListener('online',rede);window.addEventListener('offline',rede);
  window.addEventListener('resize',()=>{LX.forcar=true});document.addEventListener('visibilitychange',lxComecar);
  try{LX.h=lxHoraAgora(performance.now());LX.p=lxTema(LX.h);lxRelogio(LX.h)}catch(e){}
  lxComecar()})();
$('l-form-f').addEventListener('submit',e=>{e.preventDefault();doLogin()});   // v2.9.4: formulário (o navegador oferece guardar a senha); Enter também entra
$('l-user').addEventListener('input',e=>{if(!e.target.value.includes('@'))e.target.value=e.target.value.toUpperCase()});
$('su-user').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase());$('su-email').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase());
$('su-go').onclick=doSignup;$('b-go').onclick=doBootstrap;
$('l-sent-back').onclick=()=>{lshow('l-form');lstatus('')};
$('l-sent-sim').onclick=async()=>{if(window.__simularConfirmacao){await window.__simularConfirmacao($('l-sent-email').textContent.toLowerCase());await enterApp()}};
$('l-wait-check').onclick=async()=>{lstatus('Verificando…');if(await enterApp())lstatus('');else if(!$('l-wait').hidden)lstatus('Ainda aguardando aprovação.')};
$('l-wait-out').onclick=async()=>{await sb.auth.signOut();lshow('l-form');lstatus('')};
async function doLogout(o){o=o&&o.inativo?o:{};   // o: {inativo:true, motivo} quando é a saída automática por inatividade (v2.8.7)
  closeScanner();try{fotoFechar();mfotoReset()}catch(e){}$('user-menu').hidden=true;if(USER){audit('logout',o.motivo||'');save();if(SYNC.pending){await sync()}
    if(SYNC.pending&&!o.inativo&&!(doLogout.aviso&&Date.now()-doLogout.aviso<30000)){doLogout.aviso=Date.now();
      toast('Há alterações que ainda não foram enviadas ao servidor (sem conexão). Conecte à internet e saia de novo. Para sair mesmo assim, toque em Sair outra vez: elas só serão enviadas quando VOCÊ entrar de novo neste aparelho, e se perdem se outra pessoa entrar antes.','warn');return}}
  doLogout.aviso=0;[()=>{UEDIT=null;fillUser()},()=>{CEDIT=null;fillColab()},()=>{EEDIT=null;fillEmpresa()},()=>{OEDIT=null;fillObra();obraForm(false)},()=>{PFEDIT=null;fillPerfil()},()=>{CTREDIT=null;fillContrato()},()=>{KEDIT=null;fillContratada()}].forEach(f=>{try{f()}catch(e){}});
  await sessaoEncerra();USER=null;await sb.auth.signOut(o.inativo?{scope:'local'}:undefined);$('l-inativo').hidden=true;
  // LGPD/segurança: nada do usuário que saiu fica guardado no aparelho (o que ainda não foi enviado fica só na memória desta aba)
  try{localStorage.removeItem(CACHE_KEY);localStorage.removeItem(CACHE_UID)}catch(e){}
  if(!SYNC.pending){S=fresh();snapshot()}NOTIFS=[];MSGS=[];CUR=null;try{fotoReset()}catch(e){}$('confirm-card').hidden=true;
  document.querySelectorAll('.modal.on').forEach(m=>m.classList.remove('on'));$('app').classList.remove('on');$('login').style.display='grid';try{lxComecar()}catch(e){}$('l-pass').value='';olhoSenha(false);lshow('l-form');lstatus('')}
/* =================== INATIVIDADE — volta na v3.1.0 (26/10/2026): 30 min sem uso, sai ===================
   A v2.8.7 saía depois de 15 min; a v2.9.8 tirou. Na auditoria de segurança (26/10) o Axel pediu de volta, com 30 min.
   Conta como uso: tocar, clicar, digitar ou rolar a tela (e ler um QR Code). Vale com o sistema aberto (confere a cada segundo
   e ao voltar para a aba ou desbloquear o celular) e ao reabrir: a hora do último uso fica guardada neste aparelho. Aviso 1 min antes.
   O que ainda não foi enviado não se perde: fica guardado e vai quando a MESMA pessoa entrar de novo. Para entrar de novo é
   preciso internet. */
const INATIV_MS=30*60*1000,INATIV_AVISO_MS=60*1000,INATIV_KEY='sismed_atividade';
const INATIV={ult:Date.now(),grav:0,saindo:false};
function inativGuardado(uid){try{const v=JSON.parse(localStorage.getItem(INATIV_KEY)||'null');return v&&v.uid===uid&&typeof v.t==='number'?v.t:0}catch(e){return 0}}
function inativExpirou(uid){const t=inativGuardado(uid);return !!t&&Date.now()-t>=INATIV_MS}
function inativUltima(){return Math.max(INATIV.ult,USER?inativGuardado(USER.id):0)}
function inativToque(forca){if(!USER||INATIV.saindo)return;const ag=Date.now();
  if(!forca&&ag-inativUltima()>=INATIV_MS){inativSair();return}   // voltou depois do prazo (celular bloqueado, aba parada): o primeiro toque não renova
  INATIV.ult=ag;inativAvisoFecha();
  if(forca||ag-INATIV.grav>10000){INATIV.grav=ag;try{localStorage.setItem(INATIV_KEY,JSON.stringify({uid:USER.id,t:ag}))}catch(e){}}}
function inativAviso(seg){let el=$('inativ-aviso');
  if(!el){el=document.createElement('div');el.id='inativ-aviso';el.className='inativ-aviso';el.setAttribute('role','alertdialog');el.setAttribute('aria-live','assertive');el.setAttribute('aria-labelledby','inativ-tit');
    el.innerHTML='<div class="inativ-aviso-t"><b id="inativ-tit">Sem uso há quase 30 minutos</b><span>Por segurança, o CAP-Refeições vai sair em <b class="num" id="inativ-seg"></b> s. Toque em qualquer lugar para continuar.</span></div><button type="button" class="btn sm" id="inativ-ficar">Continuar conectado</button>';
    document.body.appendChild(el);$('inativ-ficar').onclick=()=>inativToque(true)}
  $('inativ-seg').textContent=String(seg);el.hidden=false;
  {const tb=document.querySelector('.tabbar');el.style.bottom=matchMedia('(max-width:899px)').matches&&tb&&tb.offsetHeight?(tb.offsetHeight+10)+'px':''}}   // no celular, acima da barra de baixo
function inativAvisoFecha(){const el=$('inativ-aviso');if(el&&!el.hidden)el.hidden=true}
function inativMsgEntrada(){const m=$('l-inativo');if(m){m.innerHTML='<b>Você saiu por inatividade.</b>O CAP-Refeições fecha a sessão depois de 30 minutos sem uso. Entre de novo para continuar.';m.hidden=false}}
async function inativSair(){if(!USER||INATIV.saindo)return;INATIV.saindo=true;inativAvisoFecha();
  try{await doLogout({inativo:true,motivo:'Saída automática: 30 min sem uso'})}catch(e){}
  INATIV.saindo=false;try{localStorage.removeItem(INATIV_KEY)}catch(e){}inativMsgEntrada()}
// ao abrir: parado há mais de 30 min — fecha a sessão guardada (sem esperar a internet) e pede a senha
async function inativSaidaBoot(){try{await Promise.race([sb.auth.signOut({scope:'local'}),new Promise(r=>setTimeout(r,3000))])}catch(e){}
  try{const k=sb.auth&&typeof sb.auth.storageKey==='string'&&sb.auth.storageKey;if(k)localStorage.removeItem(k)}catch(e){}
  try{localStorage.removeItem(CACHE_KEY);localStorage.removeItem(CACHE_UID);localStorage.removeItem(INATIV_KEY)}catch(e){}
  lshow('l-form');lstatus('');inativMsgEntrada()}
function inativConfere(){if(!USER||INATIV.saindo)return;const parado=Date.now()-inativUltima();
  if(parado>=INATIV_MS){inativSair();return}
  if(parado>=INATIV_MS-INATIV_AVISO_MS)inativAviso(Math.max(1,Math.ceil((INATIV_MS-parado)/1000)));else inativAvisoFecha()}
['pointerdown','keydown','wheel','touchstart'].forEach(ev=>document.addEventListener(ev,()=>inativToque(),{passive:true,capture:true}));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)inativConfere()});
window.addEventListener('focus',()=>inativConfere());
window.addEventListener('pageshow',()=>inativConfere());
setInterval(inativConfere,1000);
async function boot(){
  S=fresh();lgpdCarregaPublico();
  try{
    lstatus('Conectando ao servidor…');
    // v2.9.8: sem internet o acesso guardado pode não ter sido renovado (vence a cada hora) — quem já estava conectado entra assim mesmo
    const session=acessoVencidoSemInternet()?null:(await sessaoRapida(6000)).session;
    {const uidG=(session&&session.user&&session.user.id)||sessaoGuardadaUid();if(uidG&&inativExpirou(uidG)){await inativSaidaBoot();return}}   // v3.1.0: parado há mais de 30 min — entra de novo com a senha
    if(session||sessaoGuardadaUid()){lstatus('Carregando dados…');if(await enterApp()){lstatus('');return}if(!$('l-wait').hidden)return}
    const {data:need,error}=await sb.rpc('bootstrap_needed');
    if(error)throw error;
    if(need){lshow('l-boot');lstatus('Nenhum usuário cadastrado ainda.')}
    else{lshow('l-form');lstatus('')}
  }catch(e){lstatus('Sem conexão com o servidor: '+(e.message||e)+(ehFalhaRede(e)?' — para entrar é preciso internet (quem já estava conectado neste aparelho entra mesmo sem internet).':''),true)}
}

/* =================== PRIVACIDADE — LGPD (v2.5) ===================
   Texto-base para validação do jurídico / encarregado. Os dados do controlador e do encarregado vêm de
   Configurações › Privacidade (config "lgpd"); antes do login, de lgpd_publico() no servidor ou de APP_CONFIG.LGPD. */
const LGPD_VERSAO='1.0',LGPD_DATA='2026-10-02';
const LGPD_CAMPOS=[['controlador','Razão social do controlador (empresa responsável pelos dados)'],['cnpj','CNPJ'],['endereco','Endereço'],['encarregado','Encarregado pelo tratamento de dados pessoais (DPO) — nome'],['email','E-mail do encarregado'],['telefone','Telefone do encarregado'],['guardaRegistros','Prazo de guarda dos registros de refeição e Boletins de Medição'],['guardaAuditoria','Prazo de guarda da trilha de auditoria']];
const LGPD_PADRAO={controlador:'',cnpj:'',endereco:'',encarregado:'',email:'',telefone:'',guardaRegistros:'5 anos após o encerramento do contrato com o restaurante',guardaAuditoria:'5 anos'};
let LGPD_PUB=null;
function lgpdDados(){const base=(S&&S.lgpd)||LGPD_PUB||(window.APP_CONFIG&&window.APP_CONFIG.LGPD)||{};const o={};LGPD_CAMPOS.forEach(([k])=>{o[k]=txt(base[k]).trim()||LGPD_PADRAO[k]});return o}
async function lgpdCarregaPublico(){try{const {data,error}=await sb.rpc('lgpd_publico');if(!error&&data&&typeof data==='object')LGPD_PUB=limpaLgpd(data)}catch(e){}}
function lgpdFalta(){const d=lgpdDados();return ['controlador','encarregado','email'].filter(k=>!d[k])}
const SESSOES_GUARDA='12 meses';   // v2.8.4: o servidor apaga as sessões sem sinal há mais tempo que isso (gatilho sessoes_limpar)
function politicaHtml(){
  const d=lgpdDados();const nd=v=>v?esc(v):'<span class="pill warn">a definir pelo administrador</span>';
  return `<div class="pp">
  <p class="small muted">Versão ${LGPD_VERSAO} — vigente a partir de ${br(LGPD_DATA)}.</p>
  <h3>1. Quem é responsável pelos seus dados</h3>
  <p>O CAP-Refeições (Sistema de Medição de Refeições) é usado por <b>${nd(d.controlador)}</b>${d.cnpj?', CNPJ '+esc(d.cnpj):''}${d.endereco?', '+esc(d.endereco):''}, que é a empresa responsável pelo tratamento dos dados pessoais (“controlador”), para controlar e medir as refeições fornecidas aos colaboradores nas obras.</p>
  <p><b>Encarregado pelo tratamento de dados pessoais (DPO):</b> ${nd(d.encarregado)} — e-mail ${nd(d.email)}${d.telefone?' — telefone '+esc(d.telefone):''}.</p>
  <h3>2. Quais dados o sistema trata</h3>
  <ul><li><b>De quem recebe a refeição (colaboradores):</b> nome, código do crachá (QR Code), empresa e obra; data, hora, tipo de refeição e restaurante de cada registro; <b>foto do rosto</b> tirada no momento do registro (ou de quem retira a refeição em nome de outra pessoa); nome de terceirizados informados no registro manual.</li>
  <li><b>De quem opera o sistema (usuários):</b> nome, login, e-mail, perfil e permissões; registro das ações feitas (data e hora, endereço IP, identificador do aparelho e navegador); mensagens trocadas pelo sistema.</li>
  <li><b>De quem assina os Boletins de Medição:</b> nome e cargo do Gestor / Engenheiro de cada obra e nome de quem assina pelo restaurante.</li>
  <li>O sistema <b>não</b> coleta CPF, endereço residencial, dados de saúde ou localização e <b>não</b> faz reconhecimento facial automático.</li></ul>
  <h3>3. Para que os dados são usados e com que base legal</h3>
  <ul><li><b>Controlar as refeições, emitir os Boletins de Medição e conferir a cobrança do restaurante</b> — execução de contrato e legítimo interesse do controlador (LGPD, art. 7º, V e IX).</li>
  <li><b>Foto no registro</b> — comprovar que a refeição foi entregue à pessoa certa e prevenir fraudes e cobranças indevidas: legítimo interesse (art. 7º, IX). A foto não é usada para reconhecimento facial nem para avaliar o colaborador. Quem não quiser ser fotografado pode pedir o <b>registro sem foto</b>; o operador anota a justificativa.</li>
  <li><b>Trilha de auditoria e registros de acesso</b> — segurança do sistema, prevenção a fraudes e cumprimento de obrigações legais (art. 7º, II e IX).</li>
  <li><b>Cadastro de usuários</b> — permitir o acesso e definir o que cada um pode fazer (art. 7º, V).</li></ul>
  <h3>4. Com quem os dados são compartilhados</h3>
  <ul><li><b>Restaurantes contratados</b>, que registram as refeições e validam os Boletins de Medição, e as <b>empresas responsáveis pelas obras e contratos</b>, para conferência e pagamento.</li>
  <li><b>Fornecedores de tecnologia</b> que guardam os dados em nome do controlador: Supabase (banco de dados e arquivos, em servidores na região de São Paulo, Brasil) e GitHub (hospedagem das páginas do sistema, sem os dados do cadastro).</li>
  <li><b>Autoridades</b>, quando houver obrigação legal ou ordem judicial.</li></ul>
  <p>Os dados não são vendidos nem usados para publicidade.</p>
  <h3>5. Por quanto tempo os dados ficam guardados</h3>
  <ul><li><b>Fotos:</b> ficam disponíveis para consulta por ${FOTO_CFG.dias} dias; depois vão para um arquivo de acesso restrito, guardado por até 12 meses, e são apagadas.</li>
  <li><b>Mensagens:</b> 7 dias. <b>Notificações:</b> 30 dias.</li>
  <li><b>Registro de entradas e saídas no sistema (usuários):</b> ${SESSOES_GUARDA}.</li>
  <li><b>Registros de refeição e Boletins de Medição:</b> ${esc(d.guardaRegistros)}, para cumprir obrigações contratuais e fiscais e para defesa em processos.</li>
  <li><b>Trilha de auditoria:</b> ${esc(d.guardaAuditoria)}.</li>
  <li><b>Dados guardados no aparelho:</b> apagados quando o usuário sai do sistema.</li></ul>
  <h3>6. Como os dados são protegidos</h3>
  <p>Acesso com usuário e senha individuais e permissões por perfil; conexão criptografada (HTTPS); regras de acesso aplicadas no servidor; fotos em área privada, visíveis só a quem tem permissão específica; toda consulta a foto e todo download ficam registrados na auditoria.</p>
  <h3>7. Seus direitos</h3>
  <p>Você pode pedir a confirmação do tratamento, o acesso aos seus dados, a correção, a anonimização, o bloqueio ou a eliminação do que for desnecessário ou excessivo, a portabilidade, a informação sobre compartilhamento e pode se opor ao tratamento (LGPD, art. 18). Faça o pedido ao encarregado, pelos contatos do item 1; a resposta é dada em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</p>
  <h3>8. O que fica guardado no aparelho</h3>
  <p>O sistema não usa cookies de publicidade nem rastreadores. Guarda no navegador só o necessário para funcionar: a sessão de acesso, preferências de tela, o seu usuário (login) quando você marca “Lembrar minha senha” — a senha, nesse caso, fica no gerenciador de senhas do próprio navegador, nunca no sistema — e, enquanto não houver internet, os registros e as fotos ainda não enviados.</p>
  <h3>9. Termos de uso (para quem opera o sistema)</h3>
  <ul><li>A conta é pessoal: não compartilhe a senha nem use a conta de outra pessoa.</li>
  <li>Use os dados e as fotos somente para o controle de refeições. Não copie, não fotografe a tela e não envie por aplicativos de mensagem.</li>
  <li>Fotografe apenas o rosto de quem está recebendo ou retirando a refeição.</li>
  <li>Saia do sistema ao terminar, principalmente em aparelho compartilhado.</li>
  <li>Avise imediatamente o administrador ou o encarregado em caso de suspeita de acesso indevido, perda do aparelho ou vazamento de dados.</li>
  <li>Suas ações ficam registradas na auditoria, com usuário, data, hora e aparelho. As mensagens enviadas pelo sistema podem ser consultadas pelo administrador.</li></ul>
  <h3>10. Alterações desta política</h3>
  <p>Esta política pode ser atualizada. A versão vigente fica sempre disponível no sistema e uma nova ciência é pedida quando houver mudança relevante.</p></div>`;
}
let PP_CIENCIA=false;
function abrirPolitica(ciencia){
  PP_CIENCIA=!!ciencia;$('pp-body').innerHTML=politicaHtml();
  $('pp-close').hidden=PP_CIENCIA;$('pp-rodape').hidden=!PP_CIENCIA;$('pp-intro').hidden=!PP_CIENCIA;
  $('pp-modal').classList.add('on');$('pp-modal').querySelector('.sheet').scrollTop=0;
}
$('pp-close').onclick=()=>$('pp-modal').classList.remove('on');
$('pp-ciente').onclick=()=>{
  if(!USER)return;try{localStorage.setItem('sismed_lgpd_'+USER.id,LGPD_VERSAO)}catch(e){}
  audit('lgpd.ciencia',`Política de Privacidade e Termos de Uso — versão ${LGPD_VERSAO} (${br(LGPD_DATA)})`,{entidade:'usuário '+USER.login});save();
  PP_CIENCIA=false;$('pp-modal').classList.remove('on');
};
$('pp-sair').onclick=()=>{PP_CIENCIA=false;$('pp-modal').classList.remove('on');doLogout()};
function lgpdPedeCiencia(){if(!USER)return;let v=null;try{v=localStorage.getItem('sismed_lgpd_'+USER.id)}catch(e){}if(v!==LGPD_VERSAO)abrirPolitica(true)}
document.querySelectorAll('[data-pp]').forEach(b=>b.onclick=e=>{e.preventDefault();abrirPolitica(false)});
/* aviso de privacidade para afixar no restaurante (PDF, A4) */
function avisoPdf(){
  if(!pdfPronto())return;
  const d=lgpdDados();const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'});const M=18,W=210-2*M;let y=22;
  doc.setFont('helvetica','bold');doc.setFontSize(20);doc.setTextColor(15,60,90);doc.text('AVISO DE PRIVACIDADE',M,y);y+=8;
  doc.setFontSize(13);doc.setTextColor(40);doc.text('Registro de refeições — CAP-Refeições',M,y);y+=4;doc.setDrawColor(15,60,90);doc.setLineWidth(.6);doc.line(M,y,210-M,y);y+=9;
  const bloco=(t,txts)=>{doc.setFont('helvetica','bold');doc.setFontSize(12.5);doc.setTextColor(15,60,90);doc.text(t,M,y);y+=6.2;doc.setFont('helvetica','normal');doc.setFontSize(11.5);doc.setTextColor(30);
    txts.forEach(x=>{const l=doc.splitTextToSize(x,W);doc.text(l,M,y);y+=l.length*5.3+1.6});y+=3.2};
  bloco('O que é registrado',['Ao retirar a refeição, o sistema registra seu nome, o código do crachá, a empresa, a obra, a data, a hora, o tipo de refeição e uma FOTO DO SEU ROSTO. Quando alguém retira a refeição para outra pessoa, a foto é de quem está retirando.']);
  bloco('Para que serve',['Para comprovar que a refeição foi entregue à pessoa certa, conferir a cobrança do restaurante e evitar fraudes. A foto NÃO é usada para reconhecimento facial automático nem para avaliar o seu trabalho.']);
  bloco('Quem pode ver',['Somente pessoas autorizadas da empresa responsável. Toda consulta a uma foto fica registrada. Os dados não são vendidos nem usados para publicidade.']);
  bloco('Por quanto tempo',[`A foto fica disponível para consulta por ${FOTO_CFG.dias} dias, depois é guardada em arquivo de acesso restrito por até 12 meses e então é apagada. Os registros de refeição são guardados por: ${d.guardaRegistros}.`]);
  bloco('Se você não quiser ser fotografado',['Avise o operador: o registro pode ser feito sem foto, com a anotação do motivo.']);
  bloco('Seus direitos (Lei nº 13.709/2018 — LGPD)',['Você pode pedir para saber quais dados seus estão guardados, corrigi-los, pedir a eliminação do que for desnecessário e se opor ao uso. A resposta é dada em até 15 dias.']);
  bloco('Com quem falar',[`Responsável pelos dados (controlador): ${d.controlador||'________________________________'}${d.cnpj?' — CNPJ '+d.cnpj:''}`,`Encarregado de dados (DPO): ${d.encarregado||'________________________________'}`,`E-mail: ${d.email||'________________________'}${d.telefone?'      Telefone: '+d.telefone:''}`]);
  doc.setFontSize(9);doc.setTextColor(110);doc.text(`Política de Privacidade do CAP-Refeições — versão ${LGPD_VERSAO} (${br(LGPD_DATA)}). A política completa está disponível no sistema e com o encarregado.`,M,285,{maxWidth:W});
  doc.save('aviso-de-privacidade-sismed.pdf');audit('lgpd.aviso','Aviso de privacidade (PDF) para afixar no restaurante');save();
}
/* Configurações › Privacidade (LGPD) */
function renderLgpd(){
  const d=(S.lgpd&&{...LGPD_PADRAO,...S.lgpd})||{...LGPD_PADRAO,...(LGPD_PUB||{})};
  $('lg-form').innerHTML=LGPD_CAMPOS.map(([k,l])=>`<div class="field"><label for="lg-${k}">${l}</label><input id="lg-${k}" maxlength="300" value="${esc(d[k]||'')}"${k==='email'?' type="email"':''}></div>`).join('');
  const f=lgpdFalta();$('lg-falta').hidden=!f.length;$('lg-falta').textContent=f.length?'Preencha o controlador, o encarregado e o e-mail do encarregado: eles aparecem na Política de Privacidade e no aviso do restaurante.':'';
  const tit=$('lg-tipo').value||'colab';const sel=$('lg-titular');const cur=sel.value;
  const l=tit==='colab'?[...S.colab].sort((a,b)=>a.nome.localeCompare(b.nome)).map(c=>({id:c.id,nome:c.nome+' — '+c.qr})):[...S.users].sort((a,b)=>a.nome.localeCompare(b.nome)).map(u=>({id:u.id,nome:u.nome+' — '+(u.login||'').toUpperCase()}));
  sel.innerHTML='<option value="">Selecione…</option>'+l.map(x=>`<option value="${esc(x.id)}"${x.id===cur?' selected':''}>${esc(x.nome)}</option>`).join('');
  $('lg-guarda').innerHTML=[['Foto para consulta',FOTO_CFG.dias+' dias','automático'],['Foto em arquivo compactado','12 meses','automático'],['Mensagens entre usuários','7 dias','automático'],['Notificações','30 dias','automático'],['Registro de entradas e saídas dos usuários',SESSOES_GUARDA,'automático'],['Dados guardados no aparelho','até o usuário sair','automático'],['Registros de refeição e BMs',d.guardaRegistros,'definido acima — eliminação a pedido'],['Trilha de auditoria',d.guardaAuditoria,'definido acima — eliminação a pedido']]
    .map(r=>`<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td><td class="muted">${esc(r[2])}</td></tr>`).join('');
}
$('lg-tipo').onchange=()=>{$('lg-titular').value='';renderLgpd()};
$('lg-save').onclick=()=>{
  if(!can('lgpd.gerir'))return;const o={};LGPD_CAMPOS.forEach(([k])=>{o[k]=$('lg-'+k).value.trim().replace(/\s+/g,' ')});
  if(o.email&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.email)){toast('E-mail do encarregado inválido');return}
  const antes=JSON.stringify(S.lgpd||null);S.lgpd=o;
  audit('lgpd.config',`Controlador: ${o.controlador||'—'} · Encarregado: ${o.encarregado||'—'} (${o.email||'sem e-mail'})`,{entidade:'privacidade (LGPD)',antes,depois:JSON.stringify(o)});
  concluir('Dados de privacidade salvos');renderLgpd();
};
$('lg-politica').onclick=()=>abrirPolitica(false);$('lg-aviso').onclick=avisoPdf;
$('lg-relatorio').onclick=()=>{const tipoT=$('lg-tipo').value||'colab',id=$('lg-titular').value;if(!id){toast('Selecione o titular dos dados');return}relatorioTitular(tipoT,id)};
/* relatório de dados do titular (LGPD, art. 18 — confirmação e acesso) */
function relatorioTitular(tipoT,id){
  if(!can('lgpd.gerir'))return;
  if(!pdfPronto())return;
  const d=lgpdDados();const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'});const M=14;let y=16;
  const titular=tipoT==='colab'?S.colab.find(c=>c.id===id):S.users.find(u=>u.id===id);if(!titular)return;
  doc.setFont('helvetica','bold');doc.setFontSize(14);doc.text('Relatório de dados pessoais do titular',M,y);y+=6;
  doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.setTextColor(90);
  doc.text(`LGPD, art. 18, I e II (confirmação e acesso) · emitido em ${brdt(new Date().toISOString())} por ${USER.nome} · CAP-Refeições`,M,y);y+=4.5;
  {const l=doc.splitTextToSize(`Controlador: ${d.controlador||'—'}${d.cnpj?' — CNPJ '+d.cnpj:''} · Encarregado: ${d.encarregado||'—'}${d.email?' — '+d.email:''}`,182);doc.text(l,M,y);y+=l.length*4.2+5}doc.setTextColor(20);
  const tab=(head,body,opt)=>{doc.autoTable(Object.assign({startY:y,head:[head],body,theme:'grid',styles:{fontSize:8.5,cellPadding:1.6},headStyles:{fillColor:[18,84,110]},margin:{left:M,right:M}},opt||{}));y=doc.lastAutoTable.finalY+7};
  const tit=t=>{if(y>265){doc.addPage();y=16}doc.setFont('helvetica','bold');doc.setFontSize(11);doc.text(t,M,y);y+=2.5;doc.setFont('helvetica','normal')};
  let nReg=0;
  if(tipoT==='colab'){
    const c=titular,e=emp(c.empresaId),o=obra(c.obraId);
    tit('1. Dados cadastrais');tab(['Dado','Valor'],[['Nome',c.nome],['Código do crachá (QR Code)',c.qr],['Empresa',e?e.nome:'—'],['Obra',o?o.nome:'—'],['Situação',c.ativo===false?'inativo':'ativo']]);
    if((c.realocacoes||[]).length){tit('2. Mudanças de empresa/obra');tab(['Data','De','Para','Motivo','Por'],c.realocacoes.map(x=>[brdt(x.em),`${txt(x.deEmpresa)} / ${txt(x.deObra)}`,`${txt(x.paraEmpresa)} / ${txt(x.paraObra)}`,txt(x.motivo),txt(x.usuario)]))}
    const regs=S.registros.filter(r=>r.colabId===c.id||(r.retiradoPor&&r.retiradoPor.colabId===c.id)).sort((a,b)=>a.registradoEm<b.registradoEm?-1:1);nReg=regs.length;
    tit(`3. Registros de refeição (${regs.length}) — últimos ${CFG.DIAS_HISTORICO||400} dias`);
    tab(['Data','Hora','Refeição','Modalidade','Restaurante','Obra','Registrado por','Foto'],regs.map(r=>[br(r.data),hm(r.registradoEm),tipo(r.tipo).curto,MODS[modOf(r)]+(r.colabId!==c.id?' (retirou para '+r.nome+')':modOf(r)==='retirada'?' (retirada por '+((r.retiradoPor||{}).nome||'—')+')':''),(ct(ctOf(r))||{}).nome||r.contratadaNome||'—',r.obraNome||'—',r.usuario||'—',r.foto?(fotoArquivada(r)?'em arquivo':'disponível'):r.semFoto?'sem foto: '+r.semFoto:'—']),{styles:{fontSize:7.5,cellPadding:1.3}});
    const sob=(S.sobras||[]).filter(x=>x.colabId===c.id);if(sob.length){tit(`4. Sobras lançadas em seu nome (${sob.length})`);tab(['Data','Refeição','Qtd.','Obra','Lançado por'],sob.map(x=>[br(x.data),tipo(x.tipo).curto,String(x.qtd),x.obraNome||'—',x.usuario||'—']))}
  }else{
    const u=titular;
    tit('1. Dados cadastrais');tab(['Dado','Valor'],[['Nome',u.nome],['Login',(u.login||'').toUpperCase()],['E-mail',u.email||'—'],['Tipo / perfil',`${u.tipo||'—'} / ${u.perfil||'—'}`],['Situação',u.status==='pendente'?'aguardando aprovação':u.ativo===false?'inativo':'ativo'],['Permissões',String((u.perms||[]).length)],['Obras liberadas',u.obras&&u.obras.length?u.obras.map(i=>(obra(i)||{}).nome).filter(Boolean).join(', '):'todas'],['Restaurantes liberados',u.contratadas&&u.contratadas.length?u.contratadas.map(i=>(ct(i)||{}).nome).filter(Boolean).join(', '):'todos']]);
    const ev=S.audit.filter(a=>a.usuarioId===u.id);nReg=ev.length;const por={};ev.forEach(a=>{por[a.acao]=(por[a.acao]||0)+1});
    tit(`2. Ações registradas na auditoria (${ev.length} nos eventos mais recentes)`);tab(['Ação','Quantidade'],Object.entries(por).sort((a,b)=>b[1]-a[1]).map(([k,n])=>[ACOES[k]||k,String(n)]));
    const ult=ev.slice(-60).reverse();if(ult.length){tit('3. Últimas ações (até 60)');tab(['Data e hora','Ação','Descrição','IP','Aparelho'],ult.map(a=>[brdt(a.em),ACOES[a.acao]||a.acao,String(a.descricao||'').slice(0,90),a.ip||'—',a.dispositivo||'—']),{styles:{fontSize:7.5,cellPadding:1.3}})}
  }
  tit('Sobre o tratamento');
  tab(['Item','Informação'],[['Finalidade','Controle e medição das refeições fornecidas, conferência da cobrança do restaurante, prevenção a fraudes e segurança do sistema.'],['Base legal','Execução de contrato e legítimo interesse do controlador (LGPD, art. 7º, V e IX); obrigação legal para registros de acesso (art. 7º, II).'],['Compartilhamento','Restaurantes contratados e empresas responsáveis pelas obras; fornecedores de tecnologia (Supabase — servidores em São Paulo; GitHub — hospedagem das páginas).'],['Fotos',`Consulta por ${FOTO_CFG.dias} dias; arquivo de acesso restrito por até 12 meses. As fotos podem ser apresentadas ao titular pelo encarregado, mediante pedido.`],['Prazo de guarda',`Registros e BMs: ${d.guardaRegistros}. Auditoria: ${d.guardaAuditoria}.`],['Direitos','Correção, anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade e oposição: pedido ao encarregado, com resposta em até 15 dias.']],{columnStyles:{0:{cellWidth:36,fontStyle:'bold'}}});
  const n=doc.getNumberOfPages();for(let i=1;i<=n;i++){doc.setPage(i);doc.setFontSize(8);doc.setTextColor(120);doc.text(`Documento com dados pessoais — entregar somente ao titular ou a seu representante legal · página ${i} de ${n}`,M,290)}
  doc.save(`dados-titular-${(titular.nome||'titular').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w]+/g,'-').slice(0,40)}.pdf`);
  audit('lgpd.relatorio',`${tipoT==='colab'?'Colaborador':'Usuário'}: ${titular.nome} — ${nReg} ${tipoT==='colab'?'registro(s) de refeição':'ação(ões) na auditoria'}`,{entidade:(tipoT==='colab'?'colaborador '+titular.qr:'usuário '+titular.login)});save();
  sucesso('Relatório gerado — entregue somente ao titular');
}

/* =================== ALTERAR A PRÓPRIA SENHA (v2.5) =================== */
let META_U={},SENHA_OBRIG=false;
function abrirMinhaSenha(obrig){SENHA_OBRIG=obrig===true;['ms-atual','ms-nova','ms-rep'].forEach(id=>$(id).value='');$('ms-err').hidden=true;
  $('ms-titulo').textContent=SENHA_OBRIG?'Troque a sua senha':'Alterar minha senha';$('ms-obrig').hidden=!SENHA_OBRIG;$('ms-close').hidden=SENHA_OBRIG;
  $('ms-cancel').textContent=SENHA_OBRIG?'Sair':'Cancelar';$('ms-atual-l').textContent=SENHA_OBRIG?'Senha provisória (a que você usou para entrar)':'Senha atual';
  $('ms-modal').classList.add('on');setTimeout(()=>$('ms-atual').focus(),50)}
$('ms-close').onclick=()=>{if(!SENHA_OBRIG)$('ms-modal').classList.remove('on')};
$('ms-cancel').onclick=async()=>{if(!SENHA_OBRIG){$('ms-modal').classList.remove('on');return}
  try{await sb.auth.signOut()}catch(e){}location.reload()};
$('ms-modal').addEventListener('keydown',e=>{if(e.key==='Escape'&&SENHA_OBRIG){e.preventDefault();e.stopPropagation()}},true);
$('ms-go').onclick=async()=>{
  const atual=$('ms-atual').value,nova=$('ms-nova').value,rep=$('ms-rep').value;const err=$('ms-err');const show=m=>{err.hidden=false;err.textContent=m};
  if(!atual)return show('Informe a senha atual.');
  if(!senhaOk(nova))return show('A nova senha precisa ter '+SENHA_REGRA+'.');
  if(nova!==rep)return show('As senhas novas não conferem.');
  if(nova===atual)return show('A nova senha precisa ser diferente da atual.');
  err.hidden=true;$('ms-go').disabled=true;
  try{
    const {data:{user}}=await sb.auth.getUser();if(!user||!user.email)throw new Error('sessão expirada — entre de novo');
    const r1=await sb.auth.signInWithPassword({email:user.email,password:atual});if(r1.error){$('ms-go').disabled=false;return show('Senha atual incorreta.')}
    const r2=await sb.auth.updateUser({password:nova,data:{trocar_senha:false}});if(r2.error)throw r2.error;
    audit('usuario.senha',SENHA_OBRIG?'Trocou a senha provisória (troca obrigatória)':'Alterou a própria senha',{entidade:'usuário '+USER.login});
    const era=SENHA_OBRIG;SENHA_OBRIG=false;META_U.trocar_senha=false;$('ms-close').hidden=false;
    $('ms-modal').classList.remove('on');concluir(era?'Senha trocada — use a nova senha nos próximos acessos':'Senha alterada');
  }catch(e){show('Não foi possível alterar a senha: '+(e.message||e))}
  $('ms-go').disabled=false;
};

/* =================== MENU DO USUÁRIO =================== */
function userMenu(anchor){
  const m=$('user-menu');if(!m.hidden){m.hidden=true;return}
  m.innerHTML=`<div class="row" style="flex-wrap:nowrap"><div class="avatar">${ini(USER.nome)}</div><div style="min-width:0"><b style="display:block">${esc(USER.nome)}</b><span class="small muted mono">${esc((USER.login||'').toUpperCase())}</span></div></div>
    <div class="kv" style="margin:10px 0;display:grid;grid-template-columns:auto 1fr;gap:4px 10px;font-size:12.5px"><span class="muted">Tipo de perfil</span><span><span class="pill ${isAdm(USER)?'warn':'neutral'}">${esc(USER.tipo||'—')}</span></span><span class="muted">Perfil</span><span>${esc(USER.perfil||'—')}</span></div>
    ${hintsOff().length?'<button class="btn sec sm" id="um-avisos" style="width:100%;margin-bottom:8px">Mostrar avisos fechados</button>':''}<button class="btn sec sm" id="um-ass" style="width:100%;margin-bottom:8px">Conferir assinatura (ID)</button><button class="btn sec sm" id="um-senha" style="width:100%;margin-bottom:8px">Alterar minha senha</button><button class="btn sec sm" id="um-pp" style="width:100%;margin-bottom:8px">Política de Privacidade</button><button class="btn sec sm" id="um-tema" style="width:100%;margin-bottom:8px">${isDark()?'Usar modo claro':'Usar modo escuro'}</button><button class="btn danger" id="um-sair" style="width:100%">Sair</button><p class="um-ver">CAP-Refeições v${APP_VERSAO}</p>`;
  $('um-sair').onclick=doLogout;$('um-senha').onclick=()=>{m.hidden=true;abrirMinhaSenha()};$('um-ass').onclick=()=>{m.hidden=true;abrirConferirAss()};$('um-pp').onclick=()=>{m.hidden=true;abrirPolitica(false)};$('um-tema').onclick=()=>{m.hidden=true;applyTheme(isDark()?'light':'dark')};if($('um-avisos'))$('um-avisos').onclick=()=>{mostrarAvisos();m.hidden=true;sucesso('Avisos reexibidos')};
  const r=anchor.getBoundingClientRect();m.hidden=false;
  if(innerWidth>=900){m.style.left=r.left+'px';m.style.top='';m.style.right='';m.style.bottom=(innerHeight-r.top+8)+'px'}
  else{m.style.right='12px';m.style.left='';m.style.bottom='';m.style.top=(r.bottom+8)+'px'}
}
document.addEventListener('click',e=>{const m=$('user-menu');if(!m.hidden&&!m.contains(e.target)&&!e.target.closest('#nav-user,#who-btn'))m.hidden=true});
$('who-btn').onclick=e=>userMenu(e.currentTarget);

/* =================== NOTIFICAÇÕES E MENSAGENS =================== */
let NOTIFS=[],MSGS=[],NTAB='n',MSG_PAIR=null;
function seenGet(k,d){try{const v=localStorage.getItem('sismed_'+k+'_'+USER.id);return v?JSON.parse(v):d}catch(e){return d}}
function seenSet(k,v){try{localStorage.setItem('sismed_'+k+'_'+USER.id,JSON.stringify(v))}catch(e){}}
function pairKey(a,b){return [a,b].sort().join('|')}
function uname(id){const u=S.users.find(x=>x.id===id);return u?u.nome:'(usuário removido)'}
async function loadSocial(){
  if(!USER)return;
  try{const n=await sb.from('notificacoes').select('id,data,created_at').order('created_at',{ascending:false}).limit(150);
    NOTIFS=n.error?[]:(n.data||[]).map(r=>limpa({...(r.data&&typeof r.data==='object'?r.data:{}),id:String(r.id),em:r.created_at||(r.data&&r.data.em)},'')).filter(x=>{x.para=lst(x.para);x.texto=txt(x.texto);x.de=txt(x.de);return x.para.includes(USER.id)}).sort((a,b)=>a.em<b.em?1:-1)}catch(e){}
  try{const since=new Date(Date.now()-7*864e5).toISOString();const m=await sb.from('mensagens').select('id,de,para,texto,created_at').gte('created_at',since).order('created_at',{ascending:true});
    MSGS=m.error?[]:(m.data||[]).map(x=>limpa(x,'')).filter(x=>x&&typeof x.de==='string'&&typeof x.para==='string'&&typeof x.texto==='string'&&typeof x.created_at==='string'&&x.created_at>=since&&(isAdm(USER)||x.de===USER.id||x.para===USER.id)).sort((a,b)=>a.created_at<b.created_at?-1:1)}catch(e){}
  updBell();if(!$('notif-modal').hidden&&$('notif-modal').classList.contains('on'))renderNotif();
}
function unread(){const sn=seenGet('n','');const sm=seenGet('m',{});
  const n=NOTIFS.filter(x=>x.em>sn).length;const m=MSGS.filter(x=>x.para===USER.id&&x.created_at>(sm[pairKey(x.de,x.para)]||'')).length;return {n,m}}
function updBell(){if(!USER)return;const u=unread();const t=u.n+u.m;$('bell-badge').hidden=!t;$('bell-badge').textContent=t>99?'99+':t;
  $('nt-n-b').hidden=!u.n;$('nt-n-b').textContent=u.n;$('nt-m-b').hidden=!u.m;$('nt-m-b').textContent=u.m}
function notify(tipo,texto,para,extra){
  const ids=[...new Set((para||[]).filter(id=>id&&(!USER||id!==USER.id)))];if(!ids.length)return;
  sb.from('notificacoes').insert({id:uid(),data:{tipo,texto,para:ids,de:USER?USER.nome:'CAP-Refeições',em:new Date().toISOString(),...(extra||{})}}).then(()=>{},()=>{});
}
function destRest(ctId){return S.users.filter(u=>ativoOk(u)&&(u.perms||[]).includes('rest.validar')&&(!u.contratadas||!u.contratadas.length||u.contratadas.includes(ctId))).map(u=>u.id)}
function destSup(){return S.users.filter(u=>ativoOk(u)&&((u.perms||[]).includes('sup.bm')||(u.perms||[]).includes('sup.ver')||isAdm(u))).map(u=>u.id)}
$('bell').onclick=()=>{const u=unread();NTAB=u.n?'n':u.m?'m':NTAB;MSG_PAIR=null;$('notif-modal').classList.add('on');renderNotif()};
$('notif-close').onclick=()=>{$('notif-modal').classList.remove('on');MSG_PAIR=null};
$('notif-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{NTAB=b.dataset.nt;MSG_PAIR=null;renderNotif()});
function renderNotif(){
  $('notif-tabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.nt===NTAB));
  const B=$('notif-body');
  if(NTAB==='n'){
    const sn=seenGet('n','');
    B.innerHTML=NOTIFS.length?NOTIFS.map(x=>`<div class="nitem${x.em>sn?'':' lida'}"><span class="dot"></span><div class="t">${esc(x.texto)}<small>${brdt(x.em)} · ${esc(x.de||'')}</small></div>${x.bmId&&S.bms.find(b=>b.id===x.bmId)?`<button class="btn sec sm" data-nbm="${esc(x.bmId)}">Abrir BM</button>`:''}${x.tipo==='conta.pendente'&&can('cfg.usuarios')?`<button class="btn sec sm" data-npend="1">Ver solicitação</button>`:''}</div>`).join(''):'<div class="small muted" style="padding:10px 0">Nenhuma notificação.</div>';
    B.querySelectorAll('[data-nbm]').forEach(b=>b.onclick=()=>{$('notif-modal').classList.remove('on');openBM(S.bms.find(x=>x.id===b.dataset.nbm))});
    B.querySelectorAll('[data-npend]').forEach(b=>b.onclick=()=>{$('notif-modal').classList.remove('on');CFGTAB='usuarios';go('cfg')});
    seenSet('n',new Date().toISOString());updBell();return;
  }
  // mensagens
  const outros=S.users.filter(u=>ativoOk(u)&&u.id!==USER.id).sort((a,b)=>a.nome.localeCompare(b.nome));
  if(MSG_PAIR){
    const [a,b]=MSG_PAIR.split('|');const parte=a===USER.id||b===USER.id;const other=a===USER.id?b:a;
    const l=MSGS.filter(m=>pairKey(m.de,m.para)===MSG_PAIR);
    B.innerHTML=`<div class="row" style="justify-content:space-between;margin-bottom:8px"><button class="btn sec sm" id="msg-back">‹ Conversas</button><b>${parte?esc(uname(other)):esc(uname(a))+' ↔ '+esc(uname(b))}</b></div>
      ${parte?'':'<div class="notice info small" style="margin-bottom:8px">Visualização de administrador — somente leitura.</div>'}
      <div class="thread" id="msg-thread">${l.map(m=>`<div class="bub${m.de===USER.id?' mine':''}">${parte?'':`<b style="font-size:11.5px">${esc(uname(m.de))}</b><br>`}${esc(m.texto)}<small>${brdt(m.created_at)}</small></div>`).join('')||'<div class="small muted">Sem mensagens nos últimos 7 dias.</div>'}</div>
      ${parte?`<div class="row" style="flex-wrap:nowrap;margin-top:8px"><textarea id="msg-reply" rows="2" maxlength="1000" placeholder="Escreva uma mensagem…"></textarea><button class="btn" id="msg-send-r">Enviar</button></div>`:''}`;
    $('msg-back').onclick=()=>{MSG_PAIR=null;renderNotif()};
    const th=$('msg-thread');th.scrollTop=th.scrollHeight;
    if(parte){$('msg-send-r').onclick=()=>sendMsg(other,$('msg-reply').value,$('msg-send-r'));const sm=seenGet('m',{});sm[MSG_PAIR]=new Date().toISOString();seenSet('m',sm);updBell()}
    return;
  }
  const pares={};MSGS.forEach(m=>{const k=pairKey(m.de,m.para);(pares[k]=pares[k]||[]).push(m)});
  const sm=seenGet('m',{});
  const lista=Object.entries(pares).map(([k,l])=>({k,l,last:l[l.length-1]})).sort((x,y)=>x.last.created_at<y.last.created_at?1:-1);
  B.innerHTML=`<div class="card" style="padding:12px;margin-bottom:12px"><div class="stack" style="gap:8px">
      <div class="field"><label for="msg-to">Enviar mensagem para</label><select id="msg-to"><option value="">Selecione o usuário…</option>${outros.map(u=>`<option value="${esc(u.id)}">${esc(u.nome)} — ${esc(u.tipo||u.perfil||'')}</option>`).join('')}</select></div>
      <textarea id="msg-text" rows="2" maxlength="1000" placeholder="Mensagem (guardada por 7 dias; visível para vocês dois e para o administrador)"></textarea>
      <div class="row" style="justify-content:flex-end"><button class="btn" id="msg-send">Enviar</button></div></div></div>
    <div class="small muted" style="margin-bottom:6px">${isAdm(USER)?'Como administrador, você vê todas as conversas (somente leitura). ':''}As mensagens são apagadas depois de 7 dias e podem ser consultadas pelo administrador do sistema.</div>
    <div class="stack" style="gap:6px">${lista.map(({k,l,last})=>{const [a,b]=k.split('|');const parte=a===USER.id||b===USER.id;const other=a===USER.id?b:a;const nu=l.filter(m=>m.para===USER.id&&m.created_at>(sm[k]||'')).length;
      return `<button class="conv" data-pair="${esc(k)}"><div class="avatar">${ini(parte?uname(other):uname(a))}</div><div class="t"><b>${parte?esc(uname(other)):esc(uname(a))+' ↔ '+esc(uname(b))}</b><span>${esc(last.texto)}</span></div><span class="small muted num">${hm(last.created_at)}</span>${nu?`<span class="badge">${nu}</span>`:''}</button>`}).join('')||'<div class="small muted">Nenhuma conversa nos últimos 7 dias.</div>'}</div>`;
  $('msg-send').onclick=()=>sendMsg($('msg-to').value,$('msg-text').value,$('msg-send'),true);
  B.querySelectorAll('[data-pair]').forEach(b=>b.onclick=()=>{MSG_PAIR=b.dataset.pair;renderNotif()});
}
async function sendMsg(para,texto,btn,abrir){
  texto=(texto||'').trim();if(!para){toast('Selecione o destinatário');return}if(!texto){toast('Escreva a mensagem');return}
  btn.disabled=true;
  const {error}=await sb.from('mensagens').insert({id:uid(),de:USER.id,para,texto:texto.slice(0,1000)});
  btn.disabled=false;
  if(error){toast('Não foi possível enviar: '+error.message);return}
  sucesso('Mensagem enviada');await loadSocial();if(abrir)MSG_PAIR=pairKey(USER.id,para);renderNotif();
}
setInterval(()=>{if(USER&&!document.hidden)loadSocial()},30000);

/* =================== NAV =================== */
const ICONS={ana:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 20h18M6 16v-4M11 16V7M16 16v-7M21 16V4"/></svg>',aud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>',rest:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M4 12h16"/></svg>',
 sup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10M15 10v10"/></svg>',
 cfg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>'};
ICONS.rel='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8.5 12.5h7M8.5 16h7M8.5 9h3"/></svg>';
/* v2.8.9: Administrativo e Configurações com as sub-abas no menu (como Relatórios) */
const SUP_NOMES={reg:'Registros',fech:'Fechamento',sob:'Sobras informadas',bol:'Boletins emitidos'};
function supAbaPode(a){return a[1]==='bol'?can('sup.boletins'):a[1]==='fech'?(can('sup.registros')||can('sup.fechamento')):can('sup.registros')}
function supSubs(){return SUP_ABAS.filter(supAbaPode).map(a=>({id:a[0],n:SUP_NOMES[a[0]],badge:a[0]==='bol'?'sup':a[0]==='fech'?'fech':''}))}
function subAtual(p){try{return p==='rel'?REL.aba:p==='sup'?SUP_ABA:p==='cfg'?CFGTAB:null}catch(e){return null}}
function supRotulo(){return 'Administrativo › '+(SUP_NOMES[SUP_ABA]||'')}
function cfgRotulo(){const t=cfgTabs().find(x=>x[0]===CFGTAB);return 'Configurações'+(t?' › '+t[1]:'')}
function subAbrir(p,rt){
  if(p==='rel')return relAbrir(rt);
  NAV_GRUPO[p]=true;const mudou=subAtual(p)!==rt;
  if(p==='sup'){if(PAGE==='sup')supAba(rt);else{SUP_ABA=rt;try{localStorage.setItem('sismed_sup_aba',rt)}catch(e){}go('sup')}}
  else if(p==='cfg'){if(PAGE==='cfg'){if(mudou&&USER){audit('nav.cfg',cfgRotulo().replace(/›.*$/,'')+'› '+((cfgTabs().find(x=>x[0]===rt)||[])[1]||rt));save()}CFGTAB=rt;renderCfg()}else{CFGTAB=rt;go('cfg')}}
  navMarcar(PAGE);const mn=document.querySelector('main');if(mn&&mudou)mn.scrollTop=0}
function navItems(){
  const it=[];
  if(['rest.registrar','rest.sobras','rest.estornar'].some(can))it.push({id:'rest',n:'Restaurante'});
  if(can('sup.registros')||can('sup.boletins')||can('sup.bm')||can('sup.fechamento')){const sb=supSubs();it.push({id:'sup',n:'Administrativo',sub:sb.length?sb:null})}
  if(relPode())it.push({id:'rel',n:'Relatórios',sub:relTiposPode()});
  if(['cfg.usuarios','cfg.colab','cfg.empresas','cfg.obras','cfg.contratos','cfg.precos','cfg.contratada','cfg.horarios','aud.ver','aud.arquivos','aud.usuarios'].some(can)){const cs=cfgTabs().map(t=>({id:t[0],n:t[1]}));it.push({id:'cfg',n:'Configurações',sub:cs.length?cs:null})}
  return it;
}
let PAGE=null;
function buildNav(){
  const it=navItems();
  const bt=i=>`<button data-p="${esc(i.id)}" data-tip="${esc(i.n)}">${ICONS[i.id]}<span>${i.n}</span><span class="badge" data-badge="${esc(i.id)}" hidden></span></button>`;
  // grupo (v2.7.0): botão que abre/fecha os itens de baixo (Relatórios › Registros, Financeiro…)
  const grp=(i,l)=>`<button type="button" class="nav-grupo" data-grupo="${esc(i.id)}" data-tip="${esc(i.n)}" aria-expanded="false" aria-controls="${l}-sub-${esc(i.id)}">${ICONS[i.id]}<span>${i.n}</span><span class="badge" data-badge="${esc(i.id)}" hidden></span><svg class="chev2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>`;
  const subs=(i,l)=>`<div class="${l==='side'?'nav-sub':'tab-sub'}" id="${l}-sub-${esc(i.id)}" role="group" aria-label="${esc(i.n)}" hidden>${i.sub.map(x=>`<button type="button" data-p="${esc(i.id)}" data-rt="${esc(x.id)}"><span>${esc(x.n)}</span>${x.badge?`<span class="badge" data-badge="${esc(x.badge)}" hidden></span>`:''}</button>`).join('')}</div>`;
  const h=it.map((i,k)=>(k===0&&i.id==='rest'?'<div class="nav-sec">Operação</div>':i.id!=='rest'&&k===it.findIndex(z=>z.id!=='rest')?'<div class="nav-sec">Gestão</div>':'')+(i.sub?grp(i,'side')+subs(i,'side'):bt(i))).join('');   // v3.0.1: seções Operação / Gestão
  let tp=$('tab-pop');if(!tp){tp=document.createElement('div');tp.id='tab-pop';document.body.appendChild(tp)}
  tp.innerHTML=it.filter(i=>i.sub).map(i=>subs(i,'tab')).join('');
  $('tabbar').innerHTML=it.map(i=>i.sub?grp(i,'tab'):bt(i)).join('');$('sidenav').innerHTML=NAV_MARCA+h+`<div class="nav-sync"><span class="sync" data-sync></span><span class="nav-sync-t" data-sync-t>Sincronizado</span></div><button class="nav-user" id="nav-user" type="button" aria-haspopup="true"><span class="av">${ini(USER.nome)}</span><span class="nm"><span class="nm-top"><b>${esc(USER.nome)}</b></span><span>${esc(USER.tipo||USER.perfil||'')}</span></span><svg class="nav-user-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg></button>`;
  document.querySelectorAll('#tabbar button[data-p],#sidenav button[data-p],#tab-pop button[data-p]').forEach(b=>b.onclick=()=>{navSubFechar();if(b.dataset.rt)subAbrir(b.dataset.p,b.dataset.rt);else go(b.dataset.p)});
  document.querySelectorAll('#sidenav [data-grupo]').forEach(b=>b.onclick=()=>{const g=b.dataset.grupo;NAV_GRUPO[g]=!NAV_GRUPO[g];if(NAV_GRUPO[g])Object.keys(NAV_GRUPO).forEach(k=>{if(k!==g&&k!==PAGE)NAV_GRUPO[k]=false});navMarcar(PAGE)});
  document.querySelectorAll('#tabbar [data-grupo]').forEach(b=>b.onclick=e=>{e.stopPropagation();navSubAlternar(b)});
  $('nav-user').onclick=e=>userMenu(e.currentTarget);applySync();navLigarRecolher();
  refreshBadges();
  if(it[0]&&it[0].id==='rel')relAbrir(it[0].sub[0].id);else go(it[0]?it[0].id:null);
}
function pendRest(){return S.bms.filter(b=>b.status==='fechado'&&ctOk(ctOf(b)))}
function pendSup(){return S.bms.filter(b=>b.status==='assinado_restaurante'&&ctOk(ctOf(b)))}
function refreshBadges(){const n={rest:can('rest.validar')?pendRest().length:0,sup:can('sup.bm')&&can('sup.boletins')?pendSup().length:0,fech:can('sup.fechamento')?fechPendentes().length:0};
  document.querySelectorAll('[data-badge]').forEach(e=>{const v=n[e.dataset.badge]||0;e.hidden=!v;e.textContent=v})}
/* v2.8.7: Analítico e Auditoria viraram sub-abas (Relatórios › Analítico e Configurações › Auditoria) */
function anaVisivel(){try{return PAGE==='rel'&&REL.aba==='analitico'}catch(e){return false}}
function audVisivel(){try{return PAGE==='cfg'&&CFGTAB==='auditoria'}catch(e){return false}}
function abaAtual(){return anaVisivel()?'ana':audVisivel()?'aud':PAGE}   // a Auditoria continua mostrando "Analítico" / "Auditoria" na coluna Aba
function go(p){
  if(p==='ana'){REL.aba='analitico';NAV_GRUPO.rel=true;p='rel'}
  if(p==='aud'){CFGTAB='auditoria';p='cfg'}
  if(p!==PAGE)obraForm(false);   // v3.1.0: voltando a Obras, aparece a lista
  if(p&&p!==PAGE&&USER){PAGE=p;audit('nav',p==='rel'?relRotulo():p==='sup'?supRotulo():p==='cfg'?cfgRotulo():ABAS[p]||p);save()}
  PAGE=p;if(p==='sup'||p==='cfg'||p==='rel')NAV_GRUPO[p]=true;Object.keys(NAV_GRUPO).forEach(k=>{if(k!==p)NAV_GRUPO[k]=false});   // v3.1.9: um grupo aberto por vez
  document.querySelectorAll('.page').forEach(x=>x.classList.toggle('on',x.id==='page-'+p));
  document.querySelectorAll('#tabbar button,#sidenav button').forEach(b=>b.classList.toggle('on',b.dataset.p===p));navMarcar(p);
  if(p==='rest')renderRest();if(p==='sup')renderSup();if(p==='cfg')renderCfg();if(p==='rel')renderRel();vizTipHide();
}

/* =================== SCANNER (shared) =================== */
let SCAN_CB=null, stream=null, scanTimer=null, canvas=null;
function camMsg(m){const e=$('cam-msg');e.hidden=!m;e.textContent=m||''}
function openScanner(title,cb){carregarLib('qr').catch(()=>{});SCAN_CB=cb;$('scan-title').textContent=title;$('scan-manual').value='';camMsg('');$('scan-modal').classList.add('on');startCam()}
function closeScanner(){stopCam();$('scan-modal').classList.remove('on');SCAN_CB=null}
function scanned(code){code=(code||'').trim();if(!code)return;inativToque();const cb=SCAN_CB;closeScanner();if(cb)cb(code)}
async function startCam(){
  stopCam();
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){camMsg('Câmera indisponível neste navegador. Use a foto do crachá ou digite o código.');$('scan-idle').innerHTML='<div class="small">Sem câmera</div>';return}
  try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}})}
  catch(e){camMsg('A câmera não pôde ser aberta aqui (o visualizador de artefatos bloqueia câmera; no celular, abra o arquivo HTML e permita o acesso). Use a foto do crachá ou digite o código.');$('scan-idle').innerHTML='<div class="small">Câmera bloqueada</div>';stream=null;return}
  const v=$('video');v.srcObject=stream;v.hidden=false;$('scan-idle').hidden=true;$('scan-frame').hidden=false;
  await v.play();
  const det=('BarcodeDetector' in window)?new BarcodeDetector({formats:['qr_code']}):null;
  if(!canvas)canvas=document.createElement('canvas');
  scanTimer=setInterval(async()=>{
    if(!stream||!v.videoWidth)return;
    try{
      if(det){const codes=await det.detect(v);if(codes.length){scanned(codes[0].rawValue);return}}
      if(typeof jsQR==='function'){canvas.width=v.videoWidth;canvas.height=v.videoHeight;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(v,0,0);
        const img=ctx.getImageData(0,0,canvas.width,canvas.height);const r=jsQR(img.data,img.width,img.height,{inversionAttempts:'dontInvert'});if(r&&r.data){scanned(r.data)}}
    }catch(e){}
  },350);
}
function stopCam(){clearInterval(scanTimer);scanTimer=null;if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}
  const v=$('video');v.hidden=true;v.srcObject=null;$('scan-idle').hidden=false;$('scan-idle').innerHTML='<div class="small">Iniciando câmera…</div>';$('scan-frame').hidden=true}
$('scan-close').onclick=closeScanner;$('btn-cam-retry').onclick=startCam;
$('scan-manual-go').onclick=()=>scanned($('scan-manual').value);
$('scan-manual').addEventListener('keydown',e=>{if(e.key==='Enter')scanned(e.target.value)});
$('qr-file').onchange=async e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  try{
    const bmp=await createImageBitmap(f);
    if('BarcodeDetector' in window){const codes=await new BarcodeDetector({formats:['qr_code']}).detect(bmp);if(codes.length){scanned(codes[0].rawValue);return}}
    if(typeof jsQR==='function'){const c=document.createElement('canvas');const scale=Math.min(1,1200/Math.max(bmp.width,bmp.height));c.width=Math.round(bmp.width*scale);c.height=Math.round(bmp.height*scale);const ctx=c.getContext('2d');ctx.drawImage(bmp,0,0,c.width,c.height);
      const img=ctx.getImageData(0,0,c.width,c.height);const r=jsQR(img.data,img.width,img.height);if(r&&r.data){scanned(r.data);return}}
    camMsg('Nenhum QR Code encontrado na foto. Tente aproximar e manter o código nítido.');
  }catch(err){camMsg('Não foi possível ler a foto.')}
};

/* =================== RESTAURANTE =================== */
let CUR=null, CURTIPO=null;
function suggestTipo(){const H=horarios();if(H.ativo){const ok=TIPOS.find(t=>janela(t.id)&&!horarioErro(t.id));if(ok)return ok.id}const h=new Date().getHours();return h<10?'cafe':h<15?'almoco':h<17?'lanche':'jantar'}
let REST_CT=null;try{REST_CT=localStorage.getItem('sismed_rest_ct')}catch(e){}
function restCt(){const l=ctsAcessiveis();if(!l.find(c=>c.id===REST_CT))REST_CT=l[0]?l[0].id:null;return REST_CT?ct(REST_CT):null}
$('rest-ct').onchange=()=>{REST_CT=$('rest-ct').value;try{localStorage.setItem('sismed_rest_ct',REST_CT)}catch(e){}CUR=null;$('confirm-card').hidden=true;RT.ids=[];renderRest()};
function renderRest(bg){ // bg=true: redesenho em segundo plano (atualização periódica, foto enviada) — não apaga a mensagem do formulário
  ctMigrarLegado();const RC=restCt();
  fillSelect($('rest-ct'),ctsAcessiveis(),REST_CT);$('rest-ct-wrap').hidden=ctsAcessiveis().length<2;
  const t=today();const d=parse(t);
  $('rest-date').textContent=`${WD[d.getDay()]}, ${br(t)} · operador: ${USER.nome}${RC?' · restaurante: '+RC.nome:''}`;
  restCabecalho(RC);renderHorariosRest();
  const missing=[];if(!RC)missing.push('uma contratada (restaurante) vinculada às obras');if(!S.colab.length)missing.push('colaboradores');if(!S.precos.length)missing.push('preços das refeições');
  $('rest-setup').hidden=!missing.length;$('rest-setup').textContent=missing.length?`Antes de registrar refeições, cadastre em Configurações: ${missing.join(' e ')}.`:'';
  setupDateManual('dm');
  const regs=S.registros.filter(r=>r.data===t&&regOk(r)&&(!RC||ctOf(r)===RC.id));
  const sobHoje=(S.sobras||[]).filter(s=>s.data===t&&sobraOk(s)&&(!RC||ctOf(s)===RC.id));
  $('rest-tiles').innerHTML=TIPOS.map(tp=>{const l=regs.filter(r=>r.tipo===tp.id);const so=sobHoje.filter(s=>s.tipo===tp.id);const ns=so.reduce((a,s)=>a+s.qtd,0);const v=l.reduce((a,r)=>a+r.valor,0)+so.reduce((a,s)=>a+sobraTotal(s),0);return `<div class="tile ${tp.id}"><div class="k">${tp.curto} hoje</div><div class="v num">${l.length+ns}</div><div class="s num">${money(v)}${ns?` · inclui ${ns} sobra${ns>1?'s':''}`:''}</div></div>`}).join('');
  restTipos(regs,sobHoje);   // v3.0.1: cartões das refeições de hoje e o quadro "hoje"
  // últimos registros (v2.8.1): hoje e os 7 dias anteriores, 10 por página (estornar/excluir só os de hoje, como antes)
  const ini7=addDays(t,-7),diaReg=iso=>{const x=new Date(iso);return isNaN(x)?'':ymd(x)};
  const recent=S.registros.filter(r=>regOk(r)&&(!RC||ctOf(r)===RC.id)&&r.data<=t&&(r.data>=ini7||diaReg(r.registradoEm)>=ini7));
  const sob7=(S.sobras||[]).filter(s=>s.data>=ini7&&s.data<=t&&sobraOk(s)&&(!RC||ctOf(s)===RC.id));
  // notificações de BM fechado
  const pend=pendRest();$('rest-notif').hidden=!(pend.length&&can('rest.validar'));
  $('rest-notif-list').innerHTML=pend.map(b=>`<div class="item"><span class="pill warn">Atenção</span><div class="t"><b>BM nº ${esc(b.numero)} — ${esc(b.empresaNome)}</b><span>${esc(bmK(b).nome)} · Período ${br(b.ini)} à ${br(b.fim)} fechado em ${brdt(b.fechadoEm)} · ${esc(b.qtd)} refeições · ${money(b.liquido)}</span></div><button class="btn sm" data-vbm="${esc(b.id)}">Ver e validar</button></div>`).join('');
  $('rest-notif-list').querySelectorAll('[data-vbm]').forEach(x=>x.onclick=()=>openBM(S.bms.find(b=>b.id===x.dataset.vbm)));
  const itensRec=recent.map(r=>({em:r.registradoEm,r})).concat(sob7.map(o=>({em:o.registradoEm,o}))).sort((a,b)=>a.em<b.em?1:-1);
  const PR=paginate('restRec',itensRec,10);
  const rotDia=dd=>{const dt=parse(dd);return `${dd===t?'Hoje':dd===addDays(t,-1)?'Ontem':WD[dt.getDay()]} · ${br(dd)}`};
  const deHoje=x=>x.data===t||diaReg(x.registradoEm)===t;
  // cada dia é um grupo (título + lista), e o registro mais novo continua sendo o 1º item da sua lista
  const grupos=[];PR.rows.forEach(x=>{const dd=diaReg(x.em)||t;const g=grupos[grupos.length-1];if(g&&g.dd===dd)g.l.push(x);else grupos.push({dd,l:[x]})});
  const itemRec=({r,o})=>(o?(deHoje(o)?sobraItemRec(o):sobraItemRec(o).replace(/<button class="btn sec sm" data-rsdel="[^"]*">Excluir<\/button>/,'')):`<div class="item"><div class="avatar">${ini(r.nome)}</div><div class="t"><b>${esc(r.nome)} ${modPill(r)}${r.semQr?'<span class="pill warn" title="Funcionário sem QR Code — escolhido pelo nome">sem QR</span> ':''}${fotoPill(r)}${r.retro?' <span class="pill warn" title="Registro retroativo (em lote)">retroativo '+br(r.data)+'</span>':r.dataManual?' <span class="pill warn">data '+br(r.data)+'</span>':''}</b><span>${esc(r.empresaNome)} · ${esc(r.obraNome||'obra não informada')}${modOf(r)==='retirada'?' · '+esc(retInfo(r)):''}${r.terceirizada?' · terc.: '+esc(r.terceirizada):''} · ${hm(r.registradoEm)}</span></div><span class="pill ${r.tipo}">${tipo(r.tipo).curto}</span>${r.fechado?'<span class="pill bad">fechada</span>':can('rest.estornar')&&!r.bmId&&deHoje(r)?`<button class="btn sec sm" data-undo="${esc(r.id)}">Estornar</button>`:''}</div>`);
  $('rest-recent').innerHTML=PR.rows.length?grupos.map(g=>`<div class="rest-grupo"><div class="rest-dia">${esc(rotDia(g.dd))}</div><div class="list">${g.l.map(itemRec).join('')}</div></div>`).join(''):'<div class="small muted">Nenhum registro nos últimos 7 dias.</div>';
  travaDiaUI($('rest-recent'));
  renderPager($('rest-pager'),'restRec',PR,['registro','registros'],renderRest);
  $('rest-recent').querySelectorAll('[data-rsdel]').forEach(b=>b.onclick=()=>excluirSobra(b.dataset.rsdel,renderRest));
  $('rest-recent').querySelectorAll('[data-undo]').forEach(b=>b.onclick=()=>estornarRegistro(b.dataset.undo));   // v3.1.0: com justificativa, pelo servidor
  $('btn-scan-rest').disabled=!can('rest.registrar');$('qr-manual-go').disabled=!can('rest.registrar');renderSemQr();
  // registro manual (terceirizados sem QR)
  $('manual-card').hidden=!(can('rest.registrar')||can('rest.sobras'));renderManual(bg===true);
  renderRetro();   // v2.9.0: registros retroativos
  // sobras (modalidade "Sobras" do Registro manual)
  const sob=sobHoje.slice().sort((a,b)=>a.registradoEm<b.registradoEm?1:-1);
  $('sobras-list').innerHTML=sob.length?sob.map(s=>{const bm=s.bmId?S.bms.find(x=>x.id===s.bmId):null;return `<div class="item"><span class="pill ${s.tipo}">${tipo(s.tipo).curto}</span><div class="t"><b>${esc(s.qtd)} ${s.qtd===1?'refeição':'refeições'} — ${esc(s.colabNome)}</b><span>${esc(s.empresaNome||'empresa não informada')} · ${esc(s.obraNome||'obra não informada')} · ${money(sobraTotal(s))} · ${hm(s.registradoEm)}</span></div>${bm?`<span class="pill neutral">BM ${esc(bm.numero)}</span>`:can('del.sobras')?`<button class="btn sec sm" data-sdel="${esc(s.id)}">Excluir</button>`:''}</div>`}).join(''):'<div class="small muted">Nenhuma sobra informada hoje.</div>';
  $('sobras-list').querySelectorAll('[data-sdel]').forEach(b=>b.onclick=()=>excluirSobra(b.dataset.sdel,renderRest));
}
function sobraItemRec(o){const bm=o.bmId?S.bms.find(x=>x.id===o.bmId):null;
  return `<div class="item"><div class="avatar sobra" title="Sobra de refeição">S</div><div class="t"><b>Sobra — ${esc(o.qtd)} ${o.qtd===1?'refeição':'refeições'}${o.colabNome?' · '+esc(o.colabNome):''} <span class="pill warn">sobra</span></b><span>${esc(o.empresaNome||'empresa não informada')} · ${esc(o.obraNome||'obra não informada')} · ${money(sobraTotal(o))} · ${hm(o.registradoEm)}</span></div><span class="pill ${o.tipo}">${tipo(o.tipo).curto}</span>${bm?`<span class="pill neutral">BM ${esc(bm.numero)}</span>`:can('del.sobras')?`<button class="btn sec sm" data-rsdel="${esc(o.id)}">Excluir</button>`:''}</div>`}
/* ---- data manual (permissão rest.data_manual) ---- */
function regDate(prefix){const chk=$(prefix+'-check'),dt=$(prefix+'-date');if(can('rest.data_manual')&&chk&&chk.checked&&dt&&dt.value&&dt.value<=today())return dt.value;return today()}
function setupDateManual(prefix){const row=$(prefix+'-row'),chk=$(prefix+'-check'),dt=$(prefix+'-date');row.hidden=!can('rest.data_manual');dt.max=today();dt.min=addDays(today(),-90);if(!dt.value)dt.value=today();
  chk.onchange=()=>{dt.hidden=!chk.checked;if(prefix==='dm'&&CUR)renderMeal();if(prefix==='mdm')renderManual()};dt.onchange=()=>{if(dt.value>today())dt.value=today();if(prefix==='dm'&&CUR)renderMeal();if(prefix==='mdm')renderManual()}}
function lookup(code){
  code=(code||'').trim();if(!code)return;
  const c=S.colab.find(x=>x.qr.toLowerCase()===code.toLowerCase());
  if(!c){toast('QR Code não cadastrado: '+code.slice(0,40));CUR=null;$('confirm-card').hidden=true;return}
  abrirColab(c,false)}
/* ---- funcionário sem QR Code (v2.8.5): busca pelo nome entre os cadastrados; foto obrigatória ---- */
let CUR_SEMQR=false,SEMQR=false;
function semNorm(t){return String(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim()}
function semQrElegiveis(){const RC=restCt();if(!RC)return [];return S.colab.filter(c=>c.ativo&&obraOk(c.obraId)&&(RC.obras||[]).includes(c.obraId))}
function renderSemQr(){
  const pode=can('rest.registrar');if(!pode)SEMQR=false;
  $('semqr-check').disabled=!pode;$('semqr-check').checked=SEMQR;$('qr-box').hidden=SEMQR;$('semqr-box').hidden=!SEMQR;try{restModosSync()}catch(e){}
  if(!SEMQR)return;
  const el=$('semqr-lista'),q=semNorm($('semqr-busca').value);
  if(!restCt()){el.innerHTML='<div class="small muted">Nenhum restaurante liberado para você.</div>';return}
  if(q.length<2){el.innerHTML='<div class="small muted">Digite pelo menos 2 letras do nome.</div>';return}
  const partes=q.split(' ');
  const L=semQrElegiveis().filter(c=>{const n=semNorm(c.nome);return partes.every(p=>n.includes(p))}).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
  el.innerHTML=L.slice(0,8).map(c=>{const e=emp(c.empresaId),o=obra(c.obraId);return `<button type="button" class="item semqr-item" data-sq="${esc(c.id)}"><div class="avatar">${ini(c.nome)}</div><div class="t"><b>${esc(c.nome)}</b><span>${esc(e?e.nome:'—')} · ${esc(o?o.nome:'—')}</span></div><span class="small muted">escolher ›</span></button>`}).join('')
    +(L.length>8?`<div class="small muted">E mais ${L.length-8} — continue digitando o nome.</div>`:'')
    +(L.length?'':'<div class="small muted">Nenhum funcionário cadastrado com esse nome nas obras deste restaurante. Confira o nome ou peça o cadastro ao Suprimentos.</div>');
  el.querySelectorAll('[data-sq]').forEach(b=>b.onclick=()=>{const c=S.colab.find(x=>x.id===b.dataset.sq);if(c)abrirColab(c,true)});
}
$('semqr-check').onchange=()=>{SEMQR=$('semqr-check').checked;CUR=null;fotoReset();$('confirm-card').hidden=true;$('semqr-busca').value='';renderSemQr();if(SEMQR)setTimeout(()=>$('semqr-busca').focus(),30)};
$('semqr-busca').oninput=renderSemQr;
$('semqr-busca').onkeydown=e=>{if(e.key!=='Enter')return;e.preventDefault();const l=$('semqr-lista').querySelectorAll('[data-sq]');if(l.length===1)l[0].click();else if(l.length)toast('Mais de um funcionário com esse nome — toque no certo.','warn')};
function abrirColab(c,semQr){
  if(!c.ativo){toast('Colaborador inativo — procure o Suprimentos');return}
  const ce=emp(c.empresaId);if(ce&&ce.ativo===false){toast(`Empresa ${ce.nome} está inativa — refeição não registrada`);return}
  if(!obraOk(c.obraId)){toast('Colaborador de obra fora do seu acesso');return}
  const oe=obraEmpErro(c.empresaId,c.obraId);if(oe){toast(`${c.nome}: ${oe} Realoque o colaborador em Configurações › Colaboradores — refeição não registrada.`,'bad');return}
  const RC=restCt();if(!RC){toast('Nenhuma contratada (restaurante) cadastrada ou liberada para você');return}
  if(!(RC.obras||[]).includes(c.obraId)){const o=obra(c.obraId);toast(`O restaurante ${RC.nome} não atende a obra ${o?o.nome:''} deste colaborador`);return}
  CUR=c;CUR_SEMQR=!!semQr;CURTIPO=suggestTipo();fotoReset();
  $('confirm-card').hidden=false;
  renderColabCard();renderMeal();
  $('confirm-card').scrollIntoView({behavior:'smooth',block:'nearest'});
  fotoAbrir();
}
function renderColabCard(){
  if(!CUR)return;const c=CUR,e=emp(c.empresaId),o=obra(c.obraId);
  $('colab-card').innerHTML=`${FOTO.thumb?`<img class="fotothumb" src="${FOTO.thumb}" alt="Foto de ${esc(c.nome)}">`:`<div class="avatar">${ini(c.nome)}</div>`}<div><b>${esc(c.nome)}</b><div class="meta">${esc(e?e.nome:'—')}<br>${esc(o?o.nome:'—')} · ${CUR_SEMQR?'<span class="pill warn">sem QR Code — escolhido pelo nome</span>':`<span class="mono">${esc(c.qr)}</span>`}</div></div>`;
  $('foto-slot').innerHTML=FOTO.raw?`<div class="row" style="gap:10px"><span class="pill ok">📷 Foto tirada</span><button type="button" class="linkbtn" id="fs-tirar">Refazer foto</button></div>`
    :FOTO.skip?`<div class="row" style="gap:8px"><span class="pill warn">Sem foto</span><span class="small">${esc(FOTO.skip)}</span><button type="button" class="linkbtn" id="fs-tirar">Tirar foto</button></div>`
    :`<button type="button" class="btn sec" id="fs-tirar" style="width:100%">📸 Tirar foto do colaborador <span class="small muted">(obrigatória)</span></button>`;
  $('fs-tirar').onclick=()=>fotoAbrir();
}
function renderMeal(){
  const t=regDate('dm');const regs=S.registros.filter(r=>r.data===t&&r.colabId===CUR.id);
  $('mealbtns').innerHTML=TIPOS.map(tp=>{const done=regs.find(r=>r.tipo===tp.id);const p=precoVigente(tp.id,t,cidOf(CUR.obraId));const her=horarioErro(tp.id,t);const off=done||p===null||her;const jn=janela(tp.id);
    return `<button class="mealbtn${CURTIPO===tp.id?' on':''}" data-t="${esc(tp.id)}" ${off?'disabled':''}>${tp.curto}<small>${done?'já registrado '+hm(done.registradoEm):p===null?'sem preço cadastrado':her?'fora do horário '+esc(jn.ini+'–'+jn.fim):money(p)}</small></button>`}).join('');
  $('mealbtns').querySelectorAll('button').forEach(b=>b.onclick=()=>{CURTIPO=b.dataset.t;renderMeal()});
  const dup=regs.find(r=>r.tipo===CURTIPO);const p=precoVigente(CURTIPO,t,cidOf(CUR.obraId));const cerr=contratoErro(CUR.obraId,t);
  const herr=horarioErro(CURTIPO,t);
  $('dup-msg').hidden=!(dup||p===null||cerr||herr);
  if(cerr)$('dup-msg').textContent=cerr;
  else if(herr)$('dup-msg').textContent=herr+' Escolha outro tipo ou procure o administrador.';
  else if(dup)$('dup-msg').textContent=`${tipo(CURTIPO).curto} já registrado em ${br(t)} às ${hm(dup.registradoEm)}. Escolha outro tipo ou cancele.`;
  else if(p===null)$('dup-msg').textContent=`${tipo(CURTIPO).curto} não tem preço cadastrado. Cadastre em Configurações › Preços.`;
  $('btn-confirm').disabled=!!dup||p===null||!!cerr||!!herr||!(FOTO.raw||FOTO.skip);
}
$('btn-confirm').onclick=async()=>{
  if(!CUR||!CURTIPO||FOTO.busy)return;if(!(FOTO.raw||FOTO.skip)){fotoAbrir();return}
  const c=CUR,tp=CURTIPO,raw=FOTO.raw,skip=FOTO.skip,sq=CUR_SEMQR;if(sq&&!raw){fotoAbrir();return}const t=regDate('dm');const p=precoVigente(tp,t,cidOf(c.obraId));const manualDate=t!==today();
  const dup=()=>S.registros.some(r=>r.data===t&&r.colabId===c.id&&r.tipo===tp);
  if(p===null||contratoErro(c.obraId,t)||dup())return;
  const herr=horarioErro(tp,t);if(herr){toast(herr,'warn');renderMeal();return}
  const e=emp(c.empresaId),o=obra(c.obraId);
  const RC=restCt();if(!RC)return;
  const reg={id:uid(),data:t,colabId:c.id,modalidade:'presencial',nome:c.nome,empresaId:c.empresaId,empresaNome:e?e.nome:'',obraId:c.obraId,obraNome:o?o.nome:'',contratoId:cidOf(c.obraId)||undefined,contratoNumero:(contrato(cidOf(c.obraId))||{}).numero||undefined,contratadaId:RC.id,contratadaNome:RC.nome,tipo:tp,valor:p,registradoEm:new Date().toISOString(),usuario:USER.nome,bmId:null,semQr:sq||undefined,dataManual:manualDate||undefined};
  let item=null;
  if(raw){
    // 1º prepara e guarda a foto no aparelho; só depois grava o registro (sem espera entre gravar e sincronizar)
    FOTO.busy=true;$('btn-confirm').disabled=true;$('btn-cancel').disabled=true;
    try{const g=await fotoGerar(raw,fotoLinhas(reg));const fp=`${ymd(new Date(reg.registradoEm))}/${reg.id}.${g.ext}`;reg.foto={p:fp};
      item={p:fp,tipo:g.tipo,c:await g.c.arrayBuffer(),a:await g.a.arrayBuffer(),em:reg.registradoEm};await fotoEnfileirar(item)}
    catch(err){FOTO.busy=false;$('btn-cancel').disabled=false;if(CUR===c)renderMeal();toast('Não foi possível processar a foto: '+(err.message||err)+'. Tire a foto novamente.','bad');return}
    FOTO.busy=false;$('btn-cancel').disabled=false;
  }else reg.semFoto=skip;
  if(dup()){fotoDescartar(item);if(CUR===c)renderMeal();return}
  S.registros.push(reg);
  audit('refeicao.registrar',`${tipo(tp).curto} — ${c.nome} (${money(p)})${manualDate?' — DATA MANUAL '+br(t):''}${reg.semFoto?' — SEM FOTO: '+reg.semFoto:' — com foto'}${sq?' — SEM QR CODE (escolhido pelo nome)':''}`,{obra:o?o.nome:'',empresa:e?e.nome:'',entidade:sq?'colaborador '+c.nome+' (sem QR Code)':'colaborador '+c.qr});
  concluir(`${tipo(tp).curto} registrado — ${c.nome.split(' ')[0]}${manualDate?' ('+br(t)+')':''}${reg.semFoto?' (sem foto)':''}`);
  if(CUR===c){CUR=null;fotoReset();$('confirm-card').hidden=true;$('qr-manual').value='';if(sq){SEMQR=false;$('semqr-busca').value=''}}
  renderRest();
  if(item)fotoEnviar();
};
$('btn-cancel').onclick=()=>{CUR=null;fotoReset();$('confirm-card').hidden=true};
/* =================== REGISTROS RETROATIVOS (v2.9.0) ===================
   Um lote: vários colaboradores cadastrados + data passada + tipo. Cada um vira um registro normal (presencial, sem foto,
   dataManual, retro:{lote,n,obs}). Acesso rest.retroativo (com rest.registrar, que o servidor exige para gravar). */
const RT={aberto:false,ids:[],tipo:'',estornar:null};
function rtDia(iso){const x=new Date(iso);return isNaN(x)?'':ymd(x)}
function rtPode(){return can('rest.registrar')&&can('rest.retroativo')}
function rtLim(){return {min:addDays(today(),-90),max:isAdm(USER)?today():addDays(today(),-1)}}   // v3.1.0: o administrador lança também o dia de hoje
function rtData(){const v=$('rt-data').value,L=rtLim();return v&&dataOk(v)&&v>=L.min&&v<=L.max?v:''}
/* por que o colaborador c não pode entrar no lote (null = pode) */
function rtErro(c,t,tp,RC){
  if(!c||!c.ativo)return 'colaborador inativo';const e=emp(c.empresaId);if(!e||e.ativo===false)return 'empresa inativa';
  if(!obraOk(c.obraId))return 'obra fora do seu acesso';if(!RC||!(RC.obras||[]).includes(c.obraId))return 'obra não atendida por este restaurante';
  if(obraEmpErro(c.empresaId,c.obraId))return 'obra de outra empresa — realoque em Configurações';
  if(!t||!tp)return null;
  if(diaValidadoUn(t,c.obraId,cidOf(c.obraId)))return 'dia '+br(t)+' já validado no Fechamento';   // v2.9.9 · v2.9.10
  const ce=contratoErro(c.obraId,t);if(ce)return 'contrato: '+ce.replace(/\.$/,'');
  if(precoVigente(tp,t,cidOf(c.obraId))===null)return 'sem preço cadastrado';
  const d=S.registros.find(r=>r.data===t&&r.colabId===c.id&&r.tipo===tp);if(d)return `${tipo(tp).curto} já registrado em ${br(t)}`;
  return null}
function rtSugestoes(){
  const q=semNorm($('rt-busca').value);const box=$('rt-sug');if(q.length<2){box.innerHTML='';return []}
  const sel=new Set(RT.ids);const l=semQrElegiveis().filter(c=>!sel.has(c.id)&&(semNorm(c.nome).includes(q)||semNorm(c.qr)===q)).sort((a,b)=>a.nome.localeCompare(b.nome)).slice(0,8);
  box.innerHTML=l.length?l.map(c=>{const e=emp(c.empresaId),o=obra(c.obraId);return `<button type="button" class="item rt-sug-i" data-rtadd="${esc(c.id)}"><div class="avatar">${ini(c.nome)}</div><div class="t"><b>${esc(c.nome)}</b><span>${esc(e?e.nome:'—')} · ${esc(o?o.nome:'—')}</span></div><span class="small muted">+ incluir</span></button>`}).join('')
    :'<div class="small muted" style="padding:6px 0">Nenhum colaborador ativo com esse nome nas obras deste restaurante.</div>';
  box.querySelectorAll('[data-rtadd]').forEach(b=>b.onclick=()=>rtIncluir(b.dataset.rtadd));
  return l}
function rtIncluir(id){if(!RT.ids.includes(id))RT.ids.push(id);PAGES.rtSel=Math.ceil(RT.ids.length/10);$('rt-busca').value='';$('rt-sug').innerHTML='';renderRetro();$('rt-busca').focus()}
function rtLinhas(){const t=rtData(),tp=RT.tipo,RC=restCt();return RT.ids.map(id=>{const c=S.colab.find(x=>x.id===id);const err=c?rtErro(c,t,tp,RC):'colaborador não encontrado';
  return {c,id,err,p:c&&!err&&t&&tp?precoVigente(tp,t,cidOf(c.obraId)):null}})}
function renderRetro(){
  const pode=rtPode();$('retro-card').hidden=!pode;if(!pode){RT.aberto=false;return}
  const L=rtLim(),dt=$('rt-data');dt.min=L.min;dt.max=L.max;{const n=$('rt-adm-hoje');if(n)n.hidden=!isAdm(USER)}
  $('rt-form').hidden=!RT.aberto;$('rt-novo').hidden=RT.aberto;$('rt-novo').setAttribute('aria-expanded',RT.aberto?'true':'false');
  renderRetroLotes();if(!RT.aberto)return;
  $('rt-tipo').innerHTML=TIPOS.map(tp=>`<button type="button" data-t="${esc(tp.id)}" aria-pressed="${RT.tipo===tp.id}"${RT.tipo===tp.id?' class="on"':''}>${tp.curto}</button>`).join('');
  $('rt-tipo').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{RT.tipo=b.dataset.t;renderRetro()});
  const t=rtData(),tp=RT.tipo,RC=restCt();const lin=rtLinhas();const ok=lin.filter(x=>!x.err);const tot=ok.reduce((a,x)=>a+(x.p||0),0);
  $('rt-sel').innerHTML=lin.length?`<div class="small muted" style="margin-bottom:6px">${lin.length} colaborador(es) na lista${lin.length!==ok.length?` · <b style="color:var(--bad)">${lin.length-ok.length} fica(m) de fora</b>`:''}</div><div class="list rt-sel">${paginate('rtSel',lin,10).rows.map(x=>{const e=x.c&&emp(x.c.empresaId),o=x.c&&obra(x.c.obraId);
      return `<div class="item"><div class="avatar">${ini(x.c?x.c.nome:'?')}</div><div class="t"><b>${esc(x.c?x.c.nome:'—')}</b><span>${esc(e?e.nome:'—')} · ${esc(o?o.nome:'—')}</span></div>${x.err?`<span class="pill bad" title="${esc(x.err)}">${esc(x.err)}</span>`:x.p!=null?`<span class="pill ok num">${money(x.p)}</span>`:''}<button type="button" class="btn sec sm" data-rtrem="${esc(x.id)}" aria-label="Tirar ${esc(x.c?x.c.nome:'')} da lista">✕</button></div>`}).join('')}</div><div class="pager rt-pager" id="rt-sel-pager"></div>`
    :'<div class="small muted">Nenhum colaborador incluído ainda.</div>';
  if(lin.length)renderPager($('rt-sel-pager'),'rtSel',paginate('rtSel',lin,10),['colaborador','colaboradores'],renderRetro);   // v2.9.4: 10 por página
  $('rt-sel').querySelectorAll('[data-rtrem]').forEach(b=>b.onclick=()=>{RT.ids=RT.ids.filter(i=>i!==b.dataset.rtrem);renderRetro()});
  // semana da data já tem BM fechado da mesma obra → os registros ficam para um novo BM (aparecem em Emitir BM)
  const bms=t?[...new Set(ok.map(x=>S.bms.filter(b=>b.empresaId===x.c.empresaId&&b.obraId===x.c.obraId&&RC&&ctOf(b)===RC.id&&b.ini<=t&&b.fim>=t).map(b=>`nº ${b.numero} (${b.obraNome||''})`)).flat())]:[];
  const falta=[!$('rt-data').value?'a data':!t?'uma data entre '+br(L.min)+' e '+br(L.max):'',!tp&&'o tipo de refeição',!ok.length&&'pelo menos um colaborador'].filter(Boolean);
  const m=$('rt-msg');m.hidden=!(bms.length||($('rt-data').value&&!t));
  m.innerHTML=$('rt-data').value&&!t?`A data precisa estar entre <b>${br(L.min)}</b> e <b>${br(L.max)}</b> ${isAdm(USER)?'(como administrador, você pode usar também o dia de hoje)':'(registro retroativo é de dia anterior)'}.`
    :bms.length?`Já existe BM fechado nessa semana: ${bms.map(esc).join(', ')}. Estes registros não entram nele — vão aparecer em <b>Emitir BM</b> como medição em aberto, para um novo BM.`:'';
  const sv=$('rt-save');sv.disabled=!!falta.length||RT.salvando;
  sv.textContent=falta.length?'Falta '+falta.join(', ').replace(/, ([^,]*)$/,' e $1'):`Registrar ${ok.length} ${ok.length>1?'refeições retroativas':'refeição retroativa'} · ${money(tot)}`;
}
function renderRetroLotes(){
  const RC=restCt();const ini=addDays(today(),-30);const G=new Map();
  S.registros.forEach(r=>{if(!r.retro||!r.retro.lote||!regOk(r)||(RC&&ctOf(r)!==RC.id)||rtDia(r.registradoEm)<ini)return;let g=G.get(r.retro.lote);if(!g)G.set(r.retro.lote,g={lote:r.retro.lote,data:r.data,tipo:r.tipo,em:r.registradoEm,por:r.usuario,obs:r.retro.obs||'',l:[]});g.l.push(r)});
  const L0=[...G.values()].sort((a,b)=>a.em<b.em?1:-1),PL=paginate('rtLotes',L0,10),L=PL.rows;   // v2.9.4: todos os lançamentos dos 30 dias, 10 por página
  const hoje=today();
  $('rt-lotes').innerHTML=L.length?`<div class="small muted" style="margin-bottom:4px">Lançamentos dos últimos 30 dias · ${L0.length}</div><div class="list">${L.map(g=>{const v=g.l.reduce((a,r)=>a+(r.valor||0),0);const emBM=g.l.some(r=>r.bmId||r.fechado);
      const est=can('rest.estornar')&&rtDia(g.em)===hoje&&!emBM;const conf=RT.estornar===g.lote;
      return `<div class="item"><div class="t"><b><span class="num">${br(g.data)}</span> · ${tipo(g.tipo).curto} · ${g.l.length} ${g.l.length>1?'colaboradores':'colaborador'} · <span class="num">${money(v)}</span></b><span>por ${esc(g.por||'—')} em ${brdt(g.em)}${g.obs?' · '+esc(g.obs):''}${emBM?' · já em BM':''}</span></div><button type="button" class="btn sec sm" data-rtver="${esc(g.lote)}">Ver nomes</button>${est?`<button type="button" class="btn ${conf?'bad':'sec'} sm" data-rtest="${esc(g.lote)}">${conf?'Confirmar estorno':'Estornar'}</button>`:''}</div>`}).join('')}</div><div class="pager rt-pager" id="rt-lotes-pager"></div>`:'';
  if(L.length)renderPager($('rt-lotes-pager'),'rtLotes',PL,['lançamento','lançamentos'],renderRetroLotes);
  travaDiaUI($('rt-lotes'));
  $('rt-lotes').querySelectorAll('[data-rtver]').forEach(b=>b.onclick=()=>rtVerLote(b.dataset.rtver));
  $('rt-lotes').querySelectorAll('[data-rtest]').forEach(b=>b.onclick=()=>rtEstornar(b.dataset.rtest));
}
function rtVerLote(lote){const l=S.registros.filter(r=>r.retro&&r.retro.lote===lote).sort((a,b)=>a.nome.localeCompare(b.nome));if(!l.length)return;const g=l[0];
  $('info-title').textContent=`Registro retroativo — ${tipo(g.tipo).curto} de ${br(g.data)}`;
  $('info-body').innerHTML=`<p class="small muted" style="margin-top:0">${l.length} ${l.length>1?'colaboradores':'colaborador'} · ${money(l.reduce((a,r)=>a+(r.valor||0),0))} · lançado por ${esc(g.usuario||'—')} em ${brdt(g.registradoEm)}${g.retro.obs?' · '+esc(g.retro.obs):''}</p><div class="list">${l.map(r=>`<div class="item"><div class="t"><b>${esc(r.nome)}</b><span>${esc(r.empresaNome)} · ${esc(r.obraNome)}${r.bmId?' · BM '+esc((S.bms.find(b=>b.id===r.bmId)||{}).numero||''):''}</span></div><span class="num">${money(r.valor)}</span></div>`).join('')}</div>`;
  $('info-modal').classList.add('on')}
function rtEstornar(lote){   // v3.1.0: pede a justificativa (a janela substitui o "toque de novo para confirmar")
  RT.estornar=null;clearTimeout(RT.tEst);const l=S.registros.filter(r=>r.retro&&r.retro.lote===lote);
  {const tv=l.find(x=>diaValidadoReg(x));if(tv&&diaTravadoAviso(tv)){renderRetro();return}}   // v2.9.9 · v2.9.10
  if(!l.length||!can('rest.estornar')||l.some(r=>r.bmId||r.fechado)||rtDia(l[0].registradoEm)!==today()){renderRetro();return}
  const g=l[0],v=l.reduce((a,r)=>a+(r.valor||0),0);
  justModal({titulo:'Estornar lançamento retroativo',resumo:`<div class="notice warn">${tipo(g.tipo).curto} de ${br(g.data)} — <b>${l.length} ${l.length>1?'colaboradores':'colaborador'}</b> (${esc(l.slice(0,6).map(r=>r.nome).join(', '))}${l.length>6?'…':''}) · ${money(v)}.<br>As refeições saem do sistema e não entram em BM. A justificativa fica na Auditoria.</div>`,
    botao:`Estornar ${l.length} ${l.length>1?'refeições':'refeição'}`,classe:'danger',
    onOk:motivo=>{const l2=S.registros.filter(r=>r.retro&&r.retro.lote===lote);
      if(!l2.length||l2.some(r=>r.bmId||r.fechado)){toast('O lançamento mudou enquanto a janela estava aberta (entrou em BM ou foi fechado) — não foi estornado.','warn');renderRest();return}
      estMarcar(l2,motivo,lote);const ids=new Set(l2.map(r=>r.id));S.registros=S.registros.filter(r=>!ids.has(r.id));
      concluir(`Lote retroativo estornado — ${l2.length} registro(s)`);renderRest()}})}
async function rtSalvar(){
  if(RT.salvando||!rtPode())return;const t=rtData(),tp=RT.tipo,RC=restCt();if(!t||!tp||!RC)return;
  const ok=rtLinhas().filter(x=>!x.err);if(!ok.length)return;
  const lote=uid(),agora=new Date().toISOString(),obs=$('rt-obs').value.trim().slice(0,200);
  const novos=ok.map(({c})=>{const e=emp(c.empresaId),o=obra(c.obraId),cid=cidOf(c.obraId);
    return {id:uid(),data:t,colabId:c.id,modalidade:'presencial',nome:c.nome,empresaId:c.empresaId,empresaNome:e?e.nome:'',obraId:c.obraId,obraNome:o?o.nome:'',contratoId:cid||undefined,contratoNumero:(contrato(cid)||{}).numero||undefined,
      contratadaId:RC.id,contratadaNome:RC.nome,tipo:tp,valor:precoVigente(tp,t,cid),registradoEm:agora,usuario:USER.nome,bmId:null,dataManual:true,retro:{lote,n:ok.length,obs:obs||undefined}}});
  // confere de novo na hora de gravar (outro aparelho pode ter registrado no meio tempo)
  const grava=novos.filter(r=>!S.registros.some(x=>x.data===r.data&&x.colabId===r.colabId&&x.tipo===r.tipo));if(!grava.length){renderRetro();return}
  grava.forEach(r=>{r.retro.n=grava.length});
  RT.salvando=true;S.registros.push(...grava);
  audit('refeicao.retroativo',`${tipo(tp).curto} de ${br(t)} — ${grava.length} colaborador(es), ${money(grava.reduce((a,r)=>a+r.valor,0))}: ${grava.map(r=>r.nome).join(', ')}${obs?' — obs.: '+obs:''} — restaurante ${RC.nome}`,{obra:[...new Set(grava.map(r=>r.obraNome))].join(', '),empresa:[...new Set(grava.map(r=>r.empresaNome))].join(', '),entidade:'lote retroativo '+lote});
  RT.ids=[];RT.tipo='';RT.aberto=false;$('rt-obs').value='';$('rt-data').value='';$('rt-busca').value='';$('rt-sug').innerHTML='';
  try{await concluir(`${grava.length} ${grava.length>1?'refeições retroativas registradas':'refeição retroativa registrada'} — ${tipo(tp).curto} de ${br(t)}`)}finally{RT.salvando=false;renderRest()}
}
$('rt-novo').onclick=()=>{RT.aberto=true;renderRetro();$('rt-data').focus()};
$('rt-cancel').onclick=()=>{RT.aberto=false;RT.ids=[];RT.tipo='';$('rt-obs').value='';$('rt-data').value='';$('rt-busca').value='';$('rt-sug').innerHTML='';renderRetro();$('rt-novo').focus()};
$('rt-data').onchange=()=>renderRetro();
$('rt-busca').oninput=()=>rtSugestoes();
$('rt-busca').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();const l=rtSugestoes();if(l.length)rtIncluir(l[0].id)}else if(e.key==='Escape'){$('rt-busca').value='';$('rt-sug').innerHTML=''}};
$('rt-save').onclick=rtSalvar;
/* ---- registro manual: Retirada (alguém leva a refeição de outro) ou Terceirizado (sem QR Code) ---- */
let MTIPO=null,MMOD='',MRET=null;
/* foto de quem está retirando (v2.4): vale para a pessoa identificada em "Quem está retirando" — se ela mudar, a foto é descartada */
let MFOTO={raw:null,thumb:null,skip:null,key:null,em:0,busy:false};const MFOTO_MIN=10; // minutos de validade da foto/justificativa ainda não usada
function retKey(){return MRET?(MRET.colabId?'c:'+MRET.colabId:'n:'+MRET.nome.toLowerCase()):null}
function mfotoReset(){MFOTO.raw=null;MFOTO.thumb=null;MFOTO.skip=null;MFOTO.key=null;MFOTO.em=0}
function mfotoVelha(){return !!(MFOTO.raw||MFOTO.skip)&&Date.now()-MFOTO.em>MFOTO_MIN*60000}
function renderRetFoto(){
  const el=$('m-foto-slot');
  el.innerHTML=MFOTO.raw?`<div class="row" style="gap:10px;flex-wrap:nowrap"><img class="fotothumb" src="${MFOTO.thumb}" alt="Foto de quem está retirando"><div><span class="pill ok">📷 Foto tirada</span><div style="margin-top:4px"><button type="button" class="linkbtn" id="mf-tirar">Refazer foto</button></div></div></div>`
    :MFOTO.skip?`<div class="row" style="gap:8px"><span class="pill warn">Sem foto</span><span class="small">${esc(MFOTO.skip)}</span><button type="button" class="linkbtn" id="mf-tirar">Tirar foto</button></div>`
    :`<button type="button" class="btn sec" id="mf-tirar" style="width:100%;white-space:normal;flex-wrap:wrap;text-align:center;line-height:1.3">📸 Tirar foto de quem está retirando <span class="small muted">(obrigatória)</span></button>`;
  $('mf-tirar').onclick=()=>fotoAbrirRet();
}
function fotoAbrirRet(depois){
  resolveRet();const msg=$('m-msg');
  if(!MRET){msg.hidden=false;msg.textContent='Informe quem está retirando (QR Code do crachá ou nome) antes de tirar a foto.';$('m-ret').focus();return}
  const r={...MRET},k=retKey();const e=emp($('m-emp').value),o=obra($('m-obra').value),d=S.colab.find(c=>c.id===$('m-dest').value);
  fotoAbrir({titulo:'Foto de quem está retirando',nome:r.nome,
    quem:`<b>${esc(r.nome)}</b> · retirando a refeição${d?' de <b>'+esc(d.nome)+'</b>':''}`,
    aviso:`A retirada feita por <b>${esc(r.nome)}</b> ficará marcada como <b>sem foto</b>`,
    usarTxt:depois?'✓ Usar esta foto e registrar':'',
    linhas:()=>fotoLinhas({registradoEm:new Date().toISOString(),modalidade:'retirada',retiradoPor:r,empresaNome:e&&e.nome,obraNome:o&&o.nome,nome:d?d.nome:''},true),
    vale:()=>MMOD==='retirada'&&retKey()===k,
    usar:raw=>{MFOTO.raw=raw;MFOTO.skip=null;MFOTO.key=k;MFOTO.em=Date.now();MFOTO.thumb=fotoThumb(raw);msg.hidden=true;renderRetFoto();if(depois)depois()},
    pular:m=>{MFOTO.raw=null;MFOTO.thumb=null;MFOTO.skip=m;MFOTO.key=k;MFOTO.em=Date.now();msg.hidden=true;renderRetFoto();if(depois)depois()},
    fechar:()=>{renderRetFoto();if(depois&&!(MFOTO.raw||MFOTO.skip)){msg.hidden=false;msg.textContent='A foto de quem está retirando é obrigatória. Tire a foto ou registre sem foto, com justificativa.'}}});
}
const MODS=Object.assign(Object.create(null),{presencial:'Presencial',retirada:'Retirada',terceirizado:'Terceirizado'});
function modOf(r){const m=r.modalidade||(r.manual?'terceirizado':'presencial');return typeof m==='string'&&m in MODS?m:(r.manual?'terceirizado':'presencial')}
function modPill(r){const m=modOf(r);return `<span class="pill mod-${m}">${MODS[m]}</span>`}
function retInfo(r){const x=r.retiradoPor||{};return `retirada por ${x.nome||'—'}${x.qr?' (QR '+x.qr+')':' (digitado)'}`}
function resolveRet(){
  const v=$('m-ret').value.trim();const c=v?S.colab.find(x=>x.qr.toLowerCase()===v.toLowerCase()):null;const el=$('m-ret-info');
  if(c){const e=emp(c.empresaId);MRET={nome:c.nome,qr:c.qr,colabId:c.id};el.innerHTML=`<span class="pill ok">✓ QR Code</span> <b>${esc(c.nome)}</b> <span class="muted">· ${esc(e?e.nome:'—')}</span>`}
  else if(v.length>=3){MRET={nome:v.replace(/\s+/g,' '),qr:null,colabId:null};el.innerHTML=`<span class="pill warn">Digitado</span> <span class="muted">sem QR Code — será registrado o nome informado</span>`}
  else{MRET=null;el.innerHTML=''}
  if((MFOTO.raw||MFOTO.skip)&&MFOTO.key!==retKey()){mfotoReset();toast('Quem está retirando mudou — tire a foto novamente.','warn')}
  renderRetFoto();
}
$('m-ret').addEventListener('input',resolveRet);
$('m-ret-scan').onclick=()=>openScanner('Ler QR Code de quem está retirando',code=>{const c=S.colab.find(x=>x.qr.toLowerCase()===String(code).trim().toLowerCase());
  if(!c){toast('QR Code não cadastrado: '+String(code).slice(0,40));return}
  if(!c.ativo){toast('Colaborador inativo — procure o Administrativo');return}
  $('m-ret').value=c.qr;mfotoReset();resolveRet();fotoAbrirRet()});
$('m-mod').querySelectorAll('button').forEach(b=>b.onclick=()=>{MMOD=b.dataset.m;$('m-msg').hidden=true;$('s-msg').hidden=true;renderManual()});
function colabOpts(sel,obraId,val){const l=obraId?S.colab.filter(c=>c.ativo&&c.obraId===obraId).sort((a,b)=>a.nome.localeCompare(b.nome)):[];
  sel.innerHTML=(obraId?(l.length?'<option value="">Selecione o colaborador…</option>':'<option value="">Nenhum colaborador ativo nesta obra</option>'):'<option value="">Selecione a obra primeiro</option>')+l.map(c=>`<option value="${esc(c.id)}"${c.id===val?' selected':''}>${esc(c.nome)} — ${esc(c.qr)}</option>`).join('');sel.disabled=!obraId||!l.length}
function renderManual(manter){
  const podeReg=can('rest.registrar'),podeSob=can('rest.sobras');
  $('m-mod').querySelectorAll('button').forEach(b=>{const m=b.dataset.m;b.hidden=(m==='sobras'&&!podeSob)||((m==='retirada'||m==='terceirizado')&&!podeReg);b.classList.toggle('on',m===MMOD)});try{restAtalhosSync()}catch(e){}
  if((MMOD==='sobras'&&!podeSob)||((MMOD==='retirada'||MMOD==='terceirizado')&&!podeReg))MMOD='';
  $('m-sob').hidden=MMOD!=='sobras';if(MMOD==='sobras')renderSobrasForm();
  $('m-body').hidden=!MMOD||MMOD==='sobras';const ret=MMOD==='retirada';
  $('m-ret-wrap').hidden=!ret;$('m-terc-wrap').hidden=ret;$('m-nome-wrap').hidden=ret;$('m-dest-wrap').hidden=!ret;
  $('m-hint-ret').style.display=ret?'':'none';$('m-hint-terc').style.display=ret?'none':'';
  $('m-nome-lbl').textContent=ret?'Refeição destinada a (nome do colaborador — obrigatório)':'Nome do colaborador';
  $('m-save').textContent=ret?'Registrar retirada':'Registrar refeição manual';if(ret)renderRetFoto();
  setupDateManual('mdm');const t=regDate('mdm');if(!MTIPO)MTIPO=suggestTipo();
  fillSelect($('m-emp'),S.empresas.filter(e=>e.ativo!==false),$('m-emp').value);const RC=restCt();const mObras=obrasDaEmpresa($('m-emp').value).filter(o=>RC&&(RC.obras||[]).includes(o.id));fillSelect($('m-obra'),mObras,$('m-obra').value,mObras.length?undefined:'Nenhuma obra desta empresa neste restaurante');
  $('m-emp').onchange=()=>{$('m-obra').value='';renderManual()};
  const man=S.registros.filter(r=>modOf(r)===(ret?'retirada':'terceirizado'));
  // v2.9.3: terceirizado — colaboradores cadastrados (das obras deste restaurante) + nomes já usados; tudo em MAIÚSCULAS
  const nomes=ret?man.map(r=>r.nome):semQrElegiveis().map(c=>maiusc(c.nome)).concat(man.map(r=>maiusc(r.nome)));
  $('manual-names').innerHTML=[...new Set(nomes.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR')).map(n=>`<option value="${esc(n)}">`).join('');
  $('terc-names').innerHTML=[...new Set(tercAtivas().map(t=>maiusc(t.nome)).concat(man.map(r=>maiusc(r.terceirizada)).filter(Boolean)))].sort((a,b)=>a.localeCompare(b,'pt-BR')).map(n=>`<option value="${esc(n)}">`).join('');
  mTercNomeHint();
  $('m-obra').onchange=renderManual;
  colabOpts($('m-dest'),$('m-obra').value,$('m-dest').value);
  $('m-mealbtns').innerHTML=TIPOS.map(tp=>{const p=precoVigente(tp.id,t,cidOf($('m-obra').value));const her=horarioErro(tp.id,t);const jn=janela(tp.id);return `<button class="mealbtn${MTIPO===tp.id?' on':''}" data-t="${esc(tp.id)}" ${p===null||her?'disabled':''}>${tp.curto}<small>${p===null?'sem preço cadastrado':her?'fora do horário '+esc(jn.ini+'–'+jn.fim):money(p)}</small></button>`}).join('');
  $('m-mealbtns').querySelectorAll('button').forEach(b=>b.onclick=()=>{MTIPO=b.dataset.t;renderManual()});
  if(!manter)$('m-msg').hidden=true;
}
/* v2.9.3: Terceirizado — nome cadastrado ou digitado (MAIÚSCULAS). Nome igual a um colaborador cadastrado: liga ao cadastro
   (empresa e obra vêm dele) e evita refeição repetida do mesmo colaborador. Empresa terceirizada: cadastrada ou digitada. */
function mTercColab(){if(MMOD!=='terceirizado')return null;const n=semNorm($('m-nome').value);if(!n)return null;const l=semQrElegiveis().filter(c=>semNorm(c.nome)===n);return l.length===1?l[0]:null}
function mTercEmpresa(){const n=semNorm($('m-terc').value);if(!n)return null;return tercAtivas().find(t=>semNorm(t.nome)===n)||null}
function mTercNomeHint(){const h=$('m-nome-hint');if(!h)return;const c=mTercColab();h.hidden=!c;
  if(c){const e=emp(c.empresaId),o=obra(c.obraId);h.textContent=`Colaborador cadastrado — ${e?e.nome:'—'} · ${o?o.nome:'—'} (empresa e obra preenchidas pelo cadastro).`}}
maiuscCampo($('m-nome'));maiuscCampo($('m-terc'));
$('m-nome').addEventListener('change',()=>{const c=mTercColab();if(c&&MMOD==='terceirizado'){$('m-emp').value=c.empresaId;renderManual(true);if([...$('m-obra').options].some(o=>o.value===c.obraId)){$('m-obra').value=c.obraId;renderManual(true)}}mTercNomeHint()});
$('m-nome').addEventListener('input',mTercNomeHint);
async function salvarManual(){
  if(MFOTO.busy)return;
  const t=regDate('mdm');const manualDate=t!==today();const nome=maiusc($('m-nome').value).trim().replace(/\s+/g,' ');const empId=$('m-emp').value,obraId=$('m-obra').value,terc=maiusc($('m-terc').value).trim().replace(/\s+/g,' ');const msg=$('m-msg');
  const tcol=MMOD==='terceirizado'?mTercColab():null,temp=MMOD==='terceirizado'?mTercEmpresa():null;   // v2.9.3
  const show=m=>{msg.hidden=false;msg.textContent=m};
  const ret=MMOD==='retirada';if(!MMOD)return;const tp=MTIPO;
  if(ret){resolveRet();if(!MRET)return show('Informe quem está retirando: leia o QR Code do crachá ou digite o código / nome (obrigatório).')}
  const dest=ret?S.colab.find(c=>c.id===$('m-dest').value):null;
  if(ret&&!dest)return show('Selecione o colaborador para quem é a refeição (cadastrado).');
  if(!ret&&!nome)return show('Informe o nome do colaborador.');
  if(!empId||!obraId)return show('Selecione a empresa e a obra (a obra precisa ser da empresa e estar vinculada ao restaurante selecionado).');
  const oe=obraEmpErro(empId,obraId);if(oe)return show(oe);
  const RC=restCt();if(!RC)return show('Nenhuma contratada (restaurante) disponível.');
  const cerr=contratoErro(obraId,t);if(cerr)return show(cerr);
  const p=precoVigente(tp,t,cidOf(obraId));if(p===null)return show(`${tipo(tp).curto} não tem preço cadastrado para o contrato desta obra.`);
  const herr=horarioErro(tp,t);if(herr)return show(herr);
  const nomeR=ret?dest.nome:nome;
  const dupF=()=>S.registros.find(r=>r.data===t&&r.tipo===tp&&(ret?r.colabId===dest.id:((tcol&&r.colabId===tcol.id)||(r.manual&&r.nome.toLowerCase()===nome.toLowerCase()&&r.empresaId===empId))));
  const dupMsg=d=>`${tipo(tp).curto} de ${nomeR} já registrado em ${br(t)} às ${hm(d.registradoEm)} (${MODS[modOf(d)].toLowerCase()}).`;
  let dup=dupF();if(dup)return show(dupMsg(dup));
  // Retirada: foto de quem está retirando é obrigatória (ou justificativa) — abre a câmera e volta para cá ao concluir
  if(ret&&mfotoVelha()){mfotoReset();renderRetFoto();toast(`A foto foi tirada há mais de ${MFOTO_MIN} minutos — tire novamente.`,'warn')}
  if(ret&&!(MFOTO.raw||MFOTO.skip)){fotoAbrirRet(salvarManual);return}
  const mret=ret?{...MRET}:null,k=ret?retKey():null,raw=ret?MFOTO.raw:null,skip=ret?MFOTO.skip:null;
  const e=emp(empId),o=obra(obraId);
  const reg={id:uid(),data:t,colabId:dest?dest.id:(tcol?tcol.id:null),manual:true,modalidade:ret?'retirada':'terceirizado',retiradoPor:mret||undefined,nome:nomeR,empresaId:empId,empresaNome:e?e.nome:'',obraId,obraNome:o?o.nome:'',contratoId:cidOf(obraId)||undefined,contratoNumero:(contrato(cidOf(obraId))||{}).numero||undefined,contratadaId:RC.id,contratadaNome:RC.nome,terceirizada:ret?'':(temp?maiusc(temp.nome):terc),terceirizadaId:ret?undefined:(temp?temp.id:undefined),tipo:tp,valor:p,registradoEm:new Date().toISOString(),usuario:USER.nome,bmId:null,dataManual:manualDate||undefined};
  let item=null;
  if(raw){
    // 1º prepara e guarda a foto no aparelho; só depois grava o registro (sem espera entre gravar e sincronizar)
    MFOTO.busy=true;$('m-save').disabled=true;
    try{const g=await fotoGerar(raw,fotoLinhas(reg));const fp=`${ymd(new Date(reg.registradoEm))}/${reg.id}.${g.ext}`;reg.foto={p:fp};
      item={p:fp,tipo:g.tipo,c:await g.c.arrayBuffer(),a:await g.a.arrayBuffer(),em:reg.registradoEm};await fotoEnfileirar(item)}
    catch(err){return show('Não foi possível processar a foto: '+(err.message||err)+'. Tire a foto novamente.')}
    finally{MFOTO.busy=false;$('m-save').disabled=false}
    dup=dupF();if(dup){fotoDescartar(item);return show(dupMsg(dup))}
  }else if(ret)reg.semFoto=skip;
  S.registros.push(reg);
  audit('refeicao.registrar',ret?`${tipo(tp).curto} — ${nomeR} (${money(p)}) — RETIRADA por ${mret.nome}${mret.qr?' (QR '+mret.qr+')':' (digitado, sem QR Code)'}${manualDate?' — DATA MANUAL '+br(t):''}${reg.semFoto?' — SEM FOTO: '+reg.semFoto:' — com foto de quem retirou'}`:`${tipo(tp).curto} — ${nome} (${money(p)}) — registro manual, terceirizado${terc?' de '+terc:''}${manualDate?' — DATA MANUAL '+br(t):''}`,{obra:o?o.nome:'',empresa:e?e.nome:'',entidade:ret?'retirada':'registro manual'});
  concluir(ret?`${tipo(tp).curto} registrado — ${nomeR.split(' ')[0]} (retirada por ${mret.nome.split(' ')[0]}${reg.semFoto?', sem foto':''})`:`${tipo(tp).curto} registrado — ${nome.split(' ')[0]} (terceirizado)`);
  msg.hidden=true;
  if(!ret){$('m-nome').value='';$('m-terc').value=''}
  else if(retKey()===k){mfotoReset();$('m-ret').value='';$('m-dest').value='';resolveRet()}
  renderRest();
  if(item)fotoEnviar();
}
$('m-save').onclick=()=>salvarManual();
$('btn-scan-rest').onclick=()=>openScanner('Ler QR Code do crachá',lookup);
$('qr-manual-go').onclick=()=>lookup($('qr-manual').value);
$('qr-manual').addEventListener('keydown',e=>{if(e.key==='Enter')lookup(e.target.value)});
/* sobras: cobradas como refeições consumidas — empresa, obra e colaborador cadastrado obrigatórios */
function renderSobrasForm(){
  const RC=restCt();
  if(!$('s-tipo').options.length)TIPOS.forEach(tp=>{const o=document.createElement('option');o.value=tp.id;o.textContent=tp.curto;$('s-tipo').appendChild(o)});
  fillSelect($('s-emp'),S.empresas.filter(e=>e.ativo!==false),$('s-emp').value,'Selecione…');
  const sObras=obrasDaEmpresa($('s-emp').value).filter(o=>RC&&(RC.obras||[]).includes(o.id));fillSelect($('s-obra'),sObras,$('s-obra').value,$('s-emp').value?(sObras.length?'Selecione…':'Nenhuma obra desta empresa neste restaurante'):'Selecione a empresa primeiro');
  colabOpts($('s-colab'),$('s-obra').value,$('s-colab').value);sobraPrecoHint();
}
$('s-obra').addEventListener('change',()=>colabOpts($('s-colab'),$('s-obra').value,$('s-colab').value));
$('s-emp').addEventListener('change',()=>{$('s-obra').value='';renderSobrasForm()});
function sobraPrecoHint(){
  const el=$('s-preco');if(!el)return;const obraId=$('s-obra').value,tp=$('s-tipo').value,q=parseInt($('s-qtd').value,10)||0;
  if(!obraId||!tp){el.textContent='Selecione empresa e obra para ver o preço cobrado.';return}
  const p=precoVigente(tp,today(),cidOf(obraId));
  el.textContent=p===null?`${tipo(tp).curto} sem preço cadastrado para o contrato desta obra.`:`Preço unitário ${money(p)}${q>0?` · total ${money(Math.round(q*p*100)/100)}`:''} — entra no BM da empresa selecionada.`;
}
['s-emp','s-obra','s-tipo'].forEach(id=>$(id).addEventListener('change',()=>{$('s-msg').hidden=true;sobraPrecoHint()}));$('s-qtd').addEventListener('input',sobraPrecoHint);
$('s-save').onclick=()=>{
  const q=parseInt($('s-qtd').value,10),colSel=S.colab.find(x=>x.id===$('s-colab').value),empId=$('s-emp').value,obraId=$('s-obra').value,tp=$('s-tipo').value,t=today();
  const msg=$('s-msg');const show=m=>{msg.hidden=false;msg.textContent=m};msg.hidden=true;
  if(!empId||!obraId)return show('Informe a empresa e a obra da sobra (obrigatórias).');
  const oeS=obraEmpErro(empId,obraId);if(oeS)return show(oeS);
  if(!(q>0))return show('Informe a quantidade que sobrou.');
  if(!colSel)return show('Selecione o colaborador que sobrou (cadastrado).');
  const RC=restCt();if(!RC)return show('Nenhuma contratada (restaurante) disponível.');
  if(!(RC.obras||[]).includes(obraId))return show(`O restaurante ${RC.nome} não atende esta obra.`);
  const E=emp(empId),o=obra(obraId);if(!E||E.ativo===false)return show('Empresa inativa — sobra não registrada.');
  const cerr=contratoErro(obraId,t);if(cerr)return show(cerr.replace('refeição não registrada','sobra não registrada'));
  const p=precoVigente(tp,t,cidOf(obraId));if(p===null)return show(`${tipo(tp).curto} não tem preço cadastrado para o contrato desta obra.`);
  const c=colSel;const total=Math.round(q*p*100)/100;
  S.sobras.push({id:uid(),data:t,contratadaId:RC.id,contratadaNome:RC.nome,tipo:tp,qtd:q,valorUnit:p,valor:total,colabNome:c.nome,colabId:c.id,empresaId:empId,empresaNome:E.nome,obraId,obraNome:o?o.nome:'',contratoId:cidOf(obraId)||undefined,contratoNumero:(contrato(cidOf(obraId))||{}).numero||undefined,registradoEm:new Date().toISOString(),usuario:USER.nome,bmId:null});
  audit('sobra.registrar',`${q} ${tipo(tp).curto} — ${c.nome} — ${money(p)} cada = ${money(total)} (cobrada)`,{empresa:E.nome,obra:o?o.nome:''});
  concluir(`Sobra registrada — ${q} ${tipo(tp).curto} · ${money(total)}`);$('s-qtd').value='';$('s-emp').value='';$('s-obra').value='';$('s-colab').value='';renderRest();
};

/* =================== SUPRIMENTOS =================== */
let WK=mondayOf(today()),WK_FIM=null,SUP_PRE='sem';   // v2.8.9: período editável (WK = início; WK_FIM = fim, ou WK+6)
const SUP_BOL={de:'',ate:'',pre:'todos'};            // Boletins emitidos: período próprio (vazio = sem limite)
const SUP_PRE_REG=[['sem','Semana atual'],['sem-ant','Semana anterior'],['mes','Mês atual'],['mes-ant','Mês anterior']];
const SUP_PRE_BOL=[['mes','Mês atual'],['mes-ant','Mês anterior'],['3m','Últimos 3 meses'],['todos','Todos']];
function supPreset(p){const h=today();if(p==='sem'){const m=mondayOf(h);return [m,addDays(m,6)]}if(p==='sem-ant'){const m=addDays(mondayOf(h),-7);return [m,addDays(m,6)]}
  if(p==='todos')return ['',''];if(p==='3m')return [addDays(h,-90),h];return anaDatas(p)}
function supPer(){return SUP_ABA==='bol'?{de:SUP_BOL.de,ate:SUP_BOL.ate}:{de:WK,ate:WK_FIM||addDays(WK,6)}}
function supPerDefine(de,ate,pre){if(SUP_ABA==='bol'){SUP_BOL.de=de;SUP_BOL.ate=ate;SUP_BOL.pre=pre}else{if(!de||!ate)return;WK=de;WK_FIM=ate;SUP_PRE=pre;PAGES.supRegs=1}renderSup()}
function supDesloca(n){const P=supPer();let de=P.de,ate=P.ate;if(!de||!ate)return;
  const mes=de.slice(8)==='01'&&addDays(ate,1).slice(8)==='01'&&de.slice(0,7)===ate.slice(0,7);   // mês inteiro → mês anterior / seguinte
  if(mes){const d=parse(de);de=ymd(new Date(d.getFullYear(),d.getMonth()+n,1));ate=ymd(new Date(d.getFullYear(),d.getMonth()+n+1,0))}
  else{const span=Math.round((parse(ate)-parse(de))/864e5)+1;de=addDays(de,n*span);ate=addDays(ate,n*span)}
  supPerDefine(de,ate,null)}
function supPerTela(){const bol=SUP_ABA==='bol',P=supPer(),atual=bol?SUP_BOL.pre:SUP_PRE;
  if(document.activeElement!==$('sp-de'))$('sp-de').value=P.de;if(document.activeElement!==$('sp-ate'))$('sp-ate').value=P.ate;
  $('sp-presets').innerHTML=(bol?SUP_PRE_BOL:SUP_PRE_REG).map(([k,n])=>`<button type="button" class="chipbtn${k===atual?' on':''}" data-p="${k}">${n}</button>`).join('')+'<button type="button" class="chipbtn sp-limpar" id="sp-limpar">Limpar filtros</button>';
  $('sp-presets').querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const [d,a]=supPreset(b.dataset.p);supPerDefine(d,a,b.dataset.p)});
  $('sp-limpar').onclick=supLimpar;{const l=$('sp-limpar'),dst=$('sp-limpar-slot');if(l&&dst){dst.textContent='';dst.appendChild(l)}}   // v3.0.1: "Limpar filtros" no fim da linha dos filtros
  $('wk-prev').disabled=$('wk-next').disabled=!P.de||!P.ate;
  $('wk-label').textContent=P.de||P.ate?`${P.de?br(P.de):'…'} a ${P.ate?br(P.ate):'…'}`:'todos';
  $('f-tipo').closest('.field').hidden=bol;$('f-busca').closest('.field').hidden=bol;{const fch=SUP_ABA==='fech';$('f-emp').closest('.field').hidden=fch;$('f-obra').closest('.field').hidden=fch}   // v2.9.10: Fechamento tem a seleção Empresa → Obra → Contrato   // Boletins: sem Tipo e sem Colaborador
  const e=$('f-emp').value;fillSelect($('f-obra'),S.obras.filter(o=>obraOk(o.id)&&(!e||o.empresaId===e)).sort((a,b)=>a.nome.localeCompare(b.nome)),$('f-obra').value,'Todas')}
/* v2.9.4: Limpar filtros — empresa, obra, restaurante, tipo e colaborador voltam a "todos"; o período volta ao padrão da parte aberta */
function supLimpar(){['f-emp','f-obra','f-ct','f-tipo'].forEach(id=>{$(id).value=''});$('f-busca').value='';
  if(SUP_ABA==='bol'){SUP_BOL.de='';SUP_BOL.ate='';SUP_BOL.pre='todos'}else{const [d,a]=supPreset('sem');WK=d;WK_FIM=a;SUP_PRE='sem'}
  PAGES.supRegs=1;PAGES.bms=1;renderSup();const b=$('sp-limpar');if(b)b.focus()}
function bmFiltroOk(b){const e=$('f-emp').value,o=$('f-obra').value,P=SUP_BOL;if(e&&b.empresaId!==e)return false;
  if(o){const ob=obra(o);if(!(b.obraId===o||(!b.obraId&&ob&&b.empresaId===ob.empresaId)))return false}   // BM de todas as obras da empresa também aparece
  if(P.de&&b.fim<P.de)return false;if(P.ate&&b.ini>P.ate)return false;return true}
const STATUS=Object.assign(Object.create(null),{rascunho:['Rascunho','warn'],fechado:['Aguardando restaurante','warn'],assinado_restaurante:['Assinado pelo restaurante','ok'],assinado:['Assinado (ambos)','ok'],faturado:['Faturado','ok']});
function statusPill(b){const s=typeof b.status==='string'&&b.status in STATUS?STATUS[b.status]:[String(b.status||'—'),'neutral'];return `<span class="pill ${s[1]}">${esc(s[0])}</span>`}
const SEM_CT='-';
function cidReg(x){return x.contratoId||cidOf(x.obraId)||SEM_CT}
function noEscopo(x,empId,ctId,obraId,cid){return (!empId||x.empresaId===empId)&&(!ctId||ctOf(x)===ctId)&&(!obraId||x.obraId===obraId)&&(!cid||cidReg(x)===cid)}
function periodRegs(ini,fim,empId,ctId,obraId,cid){return S.registros.filter(r=>r.data>=ini&&r.data<=fim&&noEscopo(r,empId,ctId,obraId,cid))}
/* sobras entram na medição como refeições (1 unidade por refeição que sobrou) */
function sobraOk(s){return ctOk(ctOf(s))&&(s.obraId?obraOk(s.obraId):(!s.obraNome||obraNomeOk(s.obraNome)))}
function sobraUnit(s){if(s.valorUnit!=null)return s.valorUnit;const p=precoVigente(s.tipo,s.data,s.contratoId||cidOf(s.obraId));return p===null?0:p}
function sobraTotal(s){return Math.round((s.qtd||0)*sobraUnit(s)*100)/100}
function sobraUnits(s){const v=sobraUnit(s);return Array.from({length:s.qtd||0},(_,i)=>({id:s.id+'#'+i,data:s.data,tipo:s.tipo,valor:v,empresaId:s.empresaId,empresaNome:s.empresaNome,obraId:s.obraId,obraNome:s.obraNome||'',contratadaId:s.contratadaId,bmId:s.bmId||null,sobra:true,sobraId:s.id,registradoEm:s.registradoEm,usuario:s.usuario,nome:'Sobra'}))}
function periodSobras(ini,fim,empId,ctId,obraId,cid){return (S.sobras||[]).filter(s=>s.empresaId&&s.data>=ini&&s.data<=fim&&noEscopo(s,empId,ctId,obraId,cid))}
function periodItens(ini,fim,empId,ctId,obraId,cid){return periodRegs(ini,fim,empId,ctId,obraId,cid).concat(...periodSobras(ini,fim,empId,ctId,obraId,cid).map(sobraUnits))}
let PREG=null,PBM=null;
/* Administrativo em guias (v2.8.6): Registros / Sobras informadas / Boletins emitidos; a guia escolhida fica lembrada no aparelho */
const SUP_ABAS=[['reg','reg'],['fech','fech'],['sob','reg'],['bol','bol']];
let SUP_ABA='reg';try{const a=localStorage.getItem('sismed_sup_aba');if(['reg','fech','sob','bol'].includes(a))SUP_ABA=a}catch(e){}
function supAba(a){if(SUP_ABA===a)return;SUP_ABA=a;try{localStorage.setItem('sismed_sup_aba',a)}catch(e){}const b=$('sup-abas').querySelector(`[data-sa="${a}"]`);
  if(USER&&b){audit('nav','Administrativo › '+b.firstChild.textContent.trim());save()}renderSup()}
// hora do registro da sobra (se foi registrada em outro dia que não o da sobra — data manual —, mostra também a data)
function sobraHora(s){if(!s.registradoEm||!isFinite(Date.parse(s.registradoEm)))return '—';const d=ymd(new Date(s.registradoEm));return d===s.data?esc(hm(s.registradoEm)):`${esc(hm(s.registradoEm))}<div class="small muted">em ${esc(br(d))}</div>`}
/* Nº do título (v2.8.7): número do BM no sistema paralelo (financeiro), informado à mão na lista de Boletins emitidos.
   Quem tem o acesso sup.nf informa / altera / apaga; fica no BM (data.titulo) e vai para a Auditoria (antes → depois). */
function bmTitCel(b){const v=b.titulo?`<span class="num">${esc(b.titulo)}</span>`:'<span class="muted">—</span>';if(!can('sup.nf'))return v;
  if(!b.nf)return b.titulo?v:`<span class="tit-lock" title="Informe primeiro a nota fiscal do BM">🔒 após a NF</span>`;   // v2.8.9: só depois da nota fiscal
  return b.titulo?`${v} <button type="button" class="tit-ed" data-tit="${esc(b.id)}" title="Alterar o Nº do título" aria-label="Alterar o Nº do título do BM ${esc(b.numero)}">✎</button>`
    :`<button type="button" class="tit-add" data-tit="${esc(b.id)}" aria-label="Informar o Nº do título do BM ${esc(b.numero)}">+ Informar</button>`}
function titEditando(){return !!document.querySelector('#bm-list .tit-f')}
function bmTitEditar(btn){const b=S.bms.find(x=>x.id===btn.dataset.tit);if(!b||!can('sup.nf'))return;if(!b.nf){toast('Informe a nota fiscal do BM antes do Nº do título.','warn');return}const td=btn.closest('td');
  td.innerHTML=`<form class="tit-f" novalidate><input class="tit-in" maxlength="40" autocomplete="off" placeholder="Nº do título" aria-label="Nº do título do BM ${esc(b.numero)}" value="${esc(b.titulo||'')}"><button class="btn sm" type="submit">OK</button><button class="btn sec sm" type="button" data-x aria-label="Cancelar" title="Cancelar (Esc)">✕</button></form>`;
  const f=td.querySelector('form'),i=f.querySelector('input');i.focus();i.select();
  f.onsubmit=e=>{e.preventDefault();f.querySelectorAll('button,input').forEach(x=>x.disabled=true);bmTituloSalva(b.id,i.value)};
  f.querySelector('[data-x]').onclick=()=>renderSup();i.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();renderSup()}}}
async function bmTituloSalva(id,v){
  v=String(v||'').replace(/\s+/g,' ').trim().slice(0,40);const b=S.bms.find(x=>x.id===id);if(!b||!can('sup.nf')){renderSup();return}
  const antes=b.titulo||'';if(v===antes){renderSup();return}
  if(!b.nf){toast('Informe a nota fiscal do BM antes do Nº do título.','warn');renderSup();return}
  if(!(await bmAtual(b))){renderSup();return}   // outro aparelho mexeu neste BM: a tela é atualizada e nada é gravado
  const bb=S.bms.find(x=>x.id===id);if(!bb){renderSup();return}
  assFixa(bb);if(v){bb.titulo=v;bb.tituloEm=new Date().toISOString()}else{delete bb.titulo;delete bb.tituloEm}
  audit('bm.titulo',`BM ${esc(bb.numero)} — Nº do título ${v||'apagado'}`,{empresa:bb.empresaNome,entidade:'BM '+bb.numero,antes:antes||null,depois:v||null});
  renderSup();concluir(v?'Nº do título informado':'Nº do título apagado')}
/* =================== CORREÇÃO DE EMPRESA / OBRA DE UM REGISTRO (v2.8.9) ===================
   Só o administrador; só para registro que ainda não está em BM; justificativa obrigatória. O valor é recalculado pelo preço do
   contrato da obra nova (na data da refeição). Fica no histórico do próprio registro (correcoes) e na Auditoria (antes → depois).
   A foto continua com o texto gravado no momento do registro. */
const ICO_LAPIS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
function regCorrPill(r){const c=r.correcoes||[];if(!c.length)return '';const u=c[c.length-1];
  return ` <span class="pill neutral" title="${esc(`Corrigido em ${brdt(u.em)} por ${u.usuario}: ${u.deEmpresa} / ${u.deObra} → ${u.paraEmpresa} / ${u.paraObra}. Justificativa: ${u.motivo}`)}">corrigido</span>`}
function regEdBtn(r){if(!isAdm(USER))return '';
  if(diaValidadoReg(r))return ` <button type="button" class="reg-ed" disabled title="Dia ${br(r.data)} validado no Fechamento — o administrador precisa reabrir o dia para corrigir">${ICO_LAPIS}</button>`;   // v2.9.9
  if(r.bmId){const b=S.bms.find(x=>x.id===r.bmId);return ` <button type="button" class="reg-ed" disabled title="Já está no BM ${esc(b?b.numero:'')} — não dá para corrigir">${ICO_LAPIS}</button>`}
  return ` <button type="button" class="reg-ed" data-redit="${esc(r.id)}" title="Corrigir empresa e obra deste registro (administrador)" aria-label="Corrigir empresa e obra do registro de ${esc(r.nome)}">${ICO_LAPIS}</button>`}
function regCorrigir(r){
  if(!r||!isAdm(USER))return;if(r.bmId){toast('Este registro já está num BM — não dá para corrigir.','warn');return}
  if(diaTravadoAviso(r))return;   // v2.9.9 · v2.9.10
  const R=ct(ctOf(r));
  infoModal(`Corrigir empresa e obra — ${esc(r.nome)}`,`<div class="stack">
    <div class="notice info small">Registro de <b>${br(r.data)}</b> · ${esc(tipo(r.tipo).curto)} · ${esc((R||{}).nome||r.contratadaNome||'—')} · ${money(r.valor)}<br>Hoje: <b>${esc(r.empresaNome||'—')}</b> / <b>${esc(r.obraNome||'—')}</b></div>
    <div class="notice warn small">Use só quando o registro foi feito com a empresa ou a obra erradas. A correção fica no registro e na Auditoria. A foto continua com o texto gravado na hora do registro. Para mudar o cadastro do colaborador, use Configurações › Colaboradores › Realocar.</div>
    <div class="grid2"><div class="field"><label for="rk-emp">Empresa correta</label><select id="rk-emp"></select></div><div class="field"><label for="rk-obra">Obra correta</label><select id="rk-obra"></select></div></div>
    <div id="rk-info" class="small muted" hidden></div>
    <div class="field"><label for="rk-motivo">Justificativa (obrigatória)</label><textarea id="rk-motivo" rows="3" maxlength="500" placeholder="ex.: registrado na obra errada — o colaborador trabalhou na obra X neste dia"></textarea></div>
    <div id="rk-err" class="notice bad" hidden></div>
    <button class="btn" id="rk-go" type="button">Salvar correção</button></div>`);
  const atende=id=>!R||!(R.obras||[]).length||(R.obras||[]).includes(id);
  const obras=e=>S.obras.filter(o=>o.empresaId===e&&(o.ativo!==false||o.id===r.obraId)).sort((a,b)=>a.nome.localeCompare(b.nome));
  const fillObras=(e,v)=>{$('rk-obra').innerHTML='<option value="">Escolha a obra…</option>'+obras(e).map(o=>`<option value="${esc(o.id)}"${o.id===v?' selected':''}${atende(o.id)?'':' disabled'}>${esc(o.nome)}${atende(o.id)?'':' (o restaurante não atende)'}</option>`).join('');info()};
  const calc=()=>{const no=$('rk-obra').value;if(!no)return {};const p=precoVigente(r.tipo,r.data,cidOf(no));return {no,p,cerr:contratoErro(no,r.data)}};
  const info=()=>{const {no,p,cerr}=calc(),el=$('rk-info');if(!no){el.hidden=true;return}el.hidden=false;
    el.innerHTML=cerr?`<span style="color:var(--bad)">${esc(cerr)}</span>`:p===null?`<span style="color:var(--bad)">${esc(tipo(r.tipo).curto)} não tem preço no contrato desta obra (Configurações › Preços).</span>`:p!==r.valor?`Valor: ${money(r.valor)} → <b>${money(p)}</b> (preço do contrato da obra correta)`:`Valor continua ${money(p)}`};
  fillSelect($('rk-emp'),S.empresas.filter(e=>e.ativo!==false||e.id===r.empresaId).sort((a,b)=>a.nome.localeCompare(b.nome)),r.empresaId);fillObras(r.empresaId,r.obraId);
  $('rk-emp').onchange=()=>fillObras($('rk-emp').value,'');$('rk-obra').onchange=info;
  $('rk-go').onclick=()=>{
    const err=$('rk-err'),fail=m=>{err.hidden=false;err.textContent=m};const x=S.registros.find(y=>y.id===r.id);
    if(!x)return fail('Este registro não existe mais (foi estornado em outro aparelho).');if(x.bmId)return fail('Este registro entrou num BM enquanto a janela estava aberta — não dá mais para corrigir.');
    const ne=$('rk-emp').value,no=$('rk-obra').value,motivo=$('rk-motivo').value.replace(/\s+/g,' ').trim();
    if(!ne||!no)return fail('Escolha a empresa e a obra corretas.');
    if(ne===x.empresaId&&no===x.obraId)return fail('Nada mudou: escolha outra empresa e/ou outra obra.');
    if(motivo.length<10)return fail('Escreva a justificativa (pelo menos 10 letras).');
    const o1=obra(no),e1=emp(ne);if(!o1||o1.empresaId!==ne)return fail('A obra escolhida não é dessa empresa.');
    if(!atende(no))return fail(`O restaurante ${(R||{}).nome||''} não atende a obra ${o1.nome}.`);
    const {p,cerr}=calc();if(cerr)return fail(cerr);if(p===null)return fail(`${tipo(x.tipo).curto} não tem preço no contrato da obra ${o1.nome}.`);
    const c={id:uid(),em:new Date().toISOString(),usuario:USER.nome,deEmpresaId:x.empresaId,deEmpresa:x.empresaNome||'',deObraId:x.obraId,deObra:x.obraNome||'',paraEmpresaId:ne,paraEmpresa:e1?e1.nome:'',paraObraId:no,paraObra:o1.nome,valorAntes:x.valor,valorDepois:p,motivo};
    x.correcoes=(x.correcoes||[]).concat([c]);x.empresaId=ne;x.empresaNome=c.paraEmpresa;x.obraId=no;x.obraNome=o1.nome;
    const cid=cidOf(no);if(cid){x.contratoId=cid;x.contratoNumero=(contrato(cid)||{}).numero||undefined}else{delete x.contratoId;delete x.contratoNumero}x.valor=p;
    audit('registro.corrigir',`${x.nome} — ${br(x.data)} ${tipo(x.tipo).curto}: ${c.deEmpresa} / ${c.deObra} → ${c.paraEmpresa} / ${c.paraObra}${c.valorAntes!==p?` (valor ${money(c.valorAntes)} → ${money(p)})`:''} — justificativa: ${motivo}`,
      {obra:o1.nome,empresa:c.paraEmpresa,entidade:'registro '+x.id,antes:`${c.deEmpresa} / ${c.deObra}`,depois:`${c.paraEmpresa} / ${c.paraObra}`});
    $('info-modal').classList.remove('on');concluir('Registro corrigido');renderSup()};
}
function renderSup(){
  const fim=WK_FIM||addDays(WK,6);
  fillSelect($('f-emp'),S.empresas,$('f-emp').value,'Todas');supPerTela();
  phRot('sup-titulo',supRotulo());
  if($('f-tipo').options.length<2)TIPOS.forEach(t=>{const o=document.createElement('option');o.value=t.id;o.textContent=t.curto;$('f-tipo').appendChild(o)});
  fillSelect($('f-ct'),(S.contratadas||[]).filter(c=>ctOk(c.id)),$('f-ct').value,'Todos');
  const empId=$('f-emp').value,obF=$('f-obra').value,ctF=$('f-ct').value,tp=$('f-tipo').value,q=$('f-busca').value.trim().toLowerCase();
  const regs=periodRegs(WK,fim).filter(r=>regOk(r)&&(!ctF||ctOf(r)===ctF)&&(!empId||r.empresaId===empId)&&(!obF||r.obraId===obF)&&(!tp||r.tipo===tp)&&(!q||r.nome.toLowerCase().includes(q))).sort((a,b)=>a.registradoEm<b.registradoEm?1:-1);
  const fech=regs.filter(r=>r.fechado&&!r.bmId);const tot=regs.filter(r=>!(r.fechado&&!r.bmId)).reduce((s,r)=>s+r.valor,0);const nReg=regs.length-fech.length;
  const sob=S.sobras.filter(s=>s.data>=WK&&s.data<=fim&&sobraOk(s)&&(!ctF||ctOf(s)===ctF)&&(!empId||s.empresaId===empId)&&(!obF||s.obraId===obF)&&(!tp||s.tipo===tp)).sort((a,b)=>a.data<b.data?1:a.data>b.data?-1:(a.registradoEm<b.registradoEm?1:-1));
  const qs=sob.reduce((a,s)=>a+s.qtd,0),vs=sob.reduce((a,s)=>a+sobraTotal(s),0);
  $('sup-count').textContent=(qs?`${nReg} registro(s) + ${qs} sobra(s) = ${nReg+qs} refeições no período · ${money(tot+vs)}`:`${nReg} registro(s) no período · ${money(tot)}`)+(fech.length?` · ${fech.length} fechada(s) sem BM`:'');
  // notificações: assinados pelo restaurante
  const ps=pendSup();$('sup-notif').hidden=!(ps.length&&can('sup.bm'));
  $('sup-notif-list').innerHTML=ps.map(b=>`<div class="item"><span class="pill ok">Assinado</span><div class="t"><b>BM nº ${esc(b.numero)} — ${esc(b.empresaNome)}</b><span>Período ${br(b.ini)} à ${br(b.fim)} · assinatura ${b.assRest.tipo==='eletronica'?'eletrônica':'física homologada'} em ${brdt(b.assRest.em)}${assId(b,'rest')?' · ID '+esc(assId(b,'rest')):''} · ${money(b.liquido)}</span></div><button class="btn sm" data-vbm="${esc(b.id)}">Ver / imprimir</button></div>`).join('');
  $('sup-notif-list').querySelectorAll('[data-vbm]').forEach(x=>x.onclick=()=>openBM(S.bms.find(b=>b.id===x.dataset.vbm)));
  $('sup-table').innerHTML=supTabelaHtml(regs);   // v3.0.1 · v3.0.3: sem os indicadores
  travaDiaUI($('sup-table'));
  renderPager($('sup-pager'),'supRegs',PREG,['registro','registros'],renderSup);
  $('sup-table').querySelectorAll('[data-vbm]').forEach(x=>x.onclick=()=>openBM(S.bms.find(b=>b.id===x.dataset.vbm)));
  $('sup-table').querySelectorAll('[data-redit]').forEach(x=>x.onclick=()=>regCorrigir(S.registros.find(r=>r.id===x.dataset.redit)));
  $('sup-table').querySelectorAll('[data-foto]').forEach(x=>x.onclick=()=>verRegistro(S.registros.find(r=>r.id===x.dataset.foto)));
  $('sup-table').querySelectorAll('[data-fechar]').forEach(x=>x.onclick=()=>fecharRefeicao(S.registros.find(r=>r.id===x.dataset.fechar)));
  $('sup-table').querySelectorAll('[data-reabrir]').forEach(x=>x.onclick=()=>reabrirRefeicao(S.registros.find(r=>r.id===x.dataset.reabrir)));
  $('sup-sobras').innerHTML=`<thead><tr><th>Data</th><th>Hora</th><th>Tipo</th><th class="r">Valor</th><th>Colaborador</th><th>Empresa</th><th>Obra</th><th>Restaurante</th><th>Informado por</th><th>Nº BM</th><th></th></tr></thead><tbody>${sob.map(s=>{const b=s.bmId?S.bms.find(x=>x.id===s.bmId):null;return `<tr><td class="num">${br(s.data)}</td><td class="num">${sobraHora(s)}</td><td><span class="pill ${s.tipo}">${tipo(s.tipo).curto}</span></td><td class="r num">${money(sobraTotal(s))}${(+s.qtd||1)>1?`<div class="small muted">× ${esc(s.qtd)}</div>`:''}</td><td>${esc(s.colabNome)}</td><td>${s.empresaId?esc(s.empresaNome||'—'):'<span class="pill bad" title="Sem empresa: não entra em BM. Exclua e registre novamente.">sem empresa</span>'}</td><td>${s.obraId?esc(s.obraNome||'—'):'<span class="pill warn">não informada</span>'}</td><td>${esc((ct(ctOf(s))||{}).nome||s.contratadaNome||'—')}</td><td>${esc(s.usuario)}</td><td>${b?`<button class="btn sec sm num" data-vbm="${esc(b.id)}">BM ${esc(b.numero)}</button>`:'<span class="pill neutral">em aberto</span>'}</td><td>${can('del.sobras')&&!s.bmId?`<button class="btn danger sm" data-sdel2="${esc(s.id)}">Excluir</button>`:''}</td></tr>`}).join('')||'<tr><td colspan="11" class="empty">Nenhuma sobra informada na semana.</td></tr>'}</tbody>`;
  travaDiaUI($('sup-sobras'));
  $('sup-sobras').querySelectorAll('[data-vbm]').forEach(x=>x.onclick=()=>openBM(S.bms.find(b=>b.id===x.dataset.vbm)));
  $('sup-sobras').querySelectorAll('[data-sdel2]').forEach(b=>b.onclick=()=>excluirSobra(b.dataset.sdel2,renderSup));
  $('btn-emitir').disabled=!can('sup.bm')||!S.empresas.length;
  $('btn-emitir').onclick=openEmitir;bmPendAviso();
  $('bm-list').innerHTML=`<thead><tr><th>Nº</th><th>Empresa</th><th>Obra / contrato ou pedido</th><th>Restaurante</th><th>Período</th><th class="r">Qtd</th><th class="r">Valor líquido</th><th>Situação</th><th>Nota fiscal</th><th>Nº do título</th><th></th></tr></thead><tbody>${(PBM=paginate('bms',[...S.bms].filter(b=>ctOk(ctOf(b))&&(!ctF||ctOf(b)===ctF)&&bmFiltroOk(b)).sort((a,b)=>b.emitidoEm<a.emitidoEm?-1:1),10)).rows.map(b=>`<tr><td class="num"><b>${esc(b.numero)}</b></td><td>${esc(b.empresaNome)}</td><td>${b.obraNome?`${esc(b.obraNome)}<div class="small muted">${esc(bmPed(b)?'pedido nº '+(b.pedido||'—'):b.contratoNumero||'')}</div>`:'<span class="small muted">todas as obras</span>'}</td><td>${esc(bmK(b).nome||'—')}</td><td class="num">${br(b.ini)} – ${br(b.fim)}</td><td class="r num">${esc(b.qtd)}</td><td class="r num">${money(b.liquido)}</td><td>${statusPill(b)}</td><td>${b.nf?esc(b.nf):'<span class="muted">—</span>'}</td><td class="bm-tit">${bmTitCel(b)}</td><td style="white-space:nowrap"><button class="btn sec sm" data-vbm="${esc(b.id)}">Ver BM</button> <button class="btn sec sm bm-anxs" type="button" data-anxs="${esc(b.id)}" title="${b.anexo?'1 anexo — ver ou anexar':'Sem anexo — anexar'}">📎 Anexos${b.anexo?' <span class="anx-n">1</span>':''}</button> ${can('del.bm')?(bmPosterior(b)?`<button class="btn sec sm" disabled title="Existe o BM ${esc(bmPosterior(b).numero)} posterior deste contrato e centro de custo">Excluir</button>`:`<button class="btn danger sm" data-bdel="${esc(b.id)}">Excluir</button>`):''}</td></tr>`).join('')||'<tr><td colspan="11" class="empty">Nenhum BM emitido ainda.</td></tr>'}</tbody>`;
  renderPager($('bm-pager'),'bms',PBM,['boletim','boletins'],renderSup);
  {const vReg=can('sup.registros'),vBol=can('sup.boletins');if(!vBol)$('sup-notif').hidden=true;
   const abas=SUP_ABAS.filter(supAbaPode).map(a=>a[0]);if(!abas.includes(SUP_ABA))SUP_ABA=abas[0]||'reg';
   $('sup-abas').hidden=abas.length<2;$('sup-abas').querySelectorAll('[data-sa]').forEach(b=>{b.hidden=!abas.includes(b.dataset.sa);const on=b.dataset.sa===SUP_ABA;b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on))});
   $('sa-n-reg').textContent=regs.length;$('sa-n-sob').textContent=sob.length;$('sa-n-bol').textContent=PBM.total;$('sa-n-fech').textContent=fechPendentes().length||'';
   navMarcar(PAGE);phRot('sup-titulo',supRotulo());$('sup-reg-card').hidden=!(abas.includes('reg')&&SUP_ABA==='reg');$('sup-sob-card').hidden=!(abas.includes('sob')&&SUP_ABA==='sob');$('sup-bol-card').hidden=!(abas.includes('bol')&&SUP_ABA==='bol');$('sup-fech-card').hidden=!(abas.includes('fech')&&SUP_ABA==='fech');if(!$('sup-fech-card').hidden)renderFech()}
  $('bm-list').querySelectorAll('[data-vbm]').forEach(b=>b.onclick=()=>openBM(S.bms.find(x=>x.id===b.dataset.vbm)));
  $('bm-list').querySelectorAll('[data-anxs]').forEach(b=>b.onclick=()=>bmAnexos(S.bms.find(x=>x.id===b.dataset.anxs)));
  if($('anxs-modal').classList.contains('on')){const ab=S.bms.find(x=>x.id===ANXS_BM);if(ab)bmAnexosRender(ab);else $('anxs-modal').classList.remove('on')}
  $('bm-list').querySelectorAll('[data-tit]').forEach(b=>b.onclick=()=>bmTitEditar(b));
  $('bm-list').querySelectorAll('[data-bdel]').forEach(x=>x.onclick=()=>excluirBM(S.bms.find(b=>b.id===x.dataset.bdel)));
  refreshBadges();
}
$('wk-prev').onclick=()=>supDesloca(-1);$('wk-next').onclick=()=>supDesloca(1);
['sp-de','sp-ate'].forEach(id=>$(id).onchange=()=>{let d=$('sp-de').value,a=$('sp-ate').value;if(d&&a&&d>a){const x=d;d=a;a=x}supPerDefine(d,a,null)});
$('f-obra').onchange=()=>{PAGES.supRegs=1;PAGES.bms=1;renderSup()};
['f-emp','f-ct','f-tipo'].forEach(id=>$(id).onchange=()=>{PAGES.supRegs=1;if(id==='f-ct')PAGES.bms=1;renderSup()});$('f-busca').oninput=()=>{PAGES.supRegs=1;renderSup()};

/* =================== FECHAMENTO DO DIA (v2.9.9 · v2.9.10) ===================
   Administrativo › Fechamento. v2.9.10: antes de ver os dias escolhe-se a EMPRESA, a OBRA e o CONTRATO; o fechamento é por
   DIA + OBRA + CONTRATO — "Validar dia" (acesso sup.fechamento; só dias que já passaram) fecha as refeições e sobras daquela obra e
   contrato na data: a partir daí ninguém inclui, estorna, corrige nem exclui. Só o administrador reabre, com justificativa. A trava é
   feita no aplicativo. Guia "Dias validados": os fechamentos feitos, paginados.
   Gravado na tabela config, uma linha por dia/obra/contrato: id 'fech:AAAA-MM-DD|obraId|contratoId'. Dias validados na v2.9.9
   (id 'fech:AAAA-MM-DD', dia inteiro) continuam valendo para todas as obras. O servidor aceita de quem tem "Cadastrar contratadas"
   — ou, com o ajuste opcional do banco, de quem tem o acesso sup.fechamento. Validar e reabrir precisam de internet; tudo vai para a Auditoria. */
const FECH_DIA_RX=/^\d{4}-\d{2}-\d{2}$/;
function fechChave(d,obraId,ctId){return d+'|'+(obraId||'-')+'|'+(ctId||SEM_CT)}
function limpaFechItem(k,x){const p=String(k).split('|'),d=p[0];if(!FECH_DIA_RX.test(d)||(p.length!==1&&p.length!==3)||!x||typeof x!=='object'||Array.isArray(x))return null;
  const t=(v,n)=>txt(v).slice(0,n||120),dt=v=>{const s0=txt(v);return s0&&isFinite(Date.parse(s0))?s0.slice(0,40):''},q=v=>Math.max(0,Math.round(+v||0)),m=v=>Math.round((+v||0)*100)/100;
  return {chave:p.length===1?d:fechChave(d,p[1].slice(0,60),p[2].slice(0,60)),dia:d,inteiro:p.length===1,obraId:p.length===3?p[1].slice(0,60):'',contratoId:p.length===3?p[2].slice(0,60):'',
    empresaId:t(x.empresaId,60),empresaNome:t(x.empresaNome),obraNome:t(x.obraNome),contratoNumero:t(x.contratoNumero,60),
    validado:x.validado===true,tudo:x.tudo===true,em:dt(x.em),por:t(x.por),porId:t(x.porId,60),qtd:q(x.qtd),valor:m(x.valor),reabertoEm:dt(x.reabertoEm),reabertoPor:t(x.reabertoPor),motivo:t(x.motivo,500),
    hist:(Array.isArray(x.hist)?x.hist:[]).slice(-50).map(h=>h&&typeof h==='object'?{acao:h.acao==='reaberto'?'reaberto':'validado',em:dt(h.em),por:t(h.por),qtd:q(h.qtd),valor:m(h.valor),motivo:t(h.motivo,500)}:null).filter(Boolean)}}
function limpaFech(v){const o={};
  if(Array.isArray(v))v.forEach(r=>{const id=r&&typeof r.id==='string'?r.id:'';if(!id.startsWith('fech:'))return;const it=limpaFechItem(id.slice(5),r.data);if(it)o[it.chave]=it});
  else if(v&&typeof v==='object')Object.keys(v).forEach(k=>{const it=limpaFechItem(k,v[k]);if(it)o[it.chave]=it});
  return o}
// quem vê todos os restaurantes e obras (para comparar o que foi validado com o que existe hoje)
function fechVeTudo(){return !!USER&&!(USER.obras&&USER.obras.length)&&!(USER.contratadas&&USER.contratadas.length)}
// o fechamento que vale para (dia, obra, contrato): o da obra/contrato ou, da v2.9.9, o do dia inteiro
function diaValidadoUn(d,obraId,ctId){if(!S||!S.fech)return null;const f=S.fech[fechChave(d,obraId,ctId)];if(f&&f.validado)return f;const g=S.fech[d];return g&&g.validado?g:null}
function diaValidadoReg(x){return x&&x.data?diaValidadoUn(x.data,x.obraId,cidReg(x)):null}
function fechCtRot(id,obraId){if(!id||id===SEM_CT)return semCtRot(obraId);const c=contrato(id);return c?`${c.numero}${c.inicio||c.fim?` (${c.inicio?br(c.inicio):'…'} a ${c.fim?br(c.fim):'…'})`:''}`:id}
function fechCtNum(f){return f.contratoNumero||(f.contratoId===SEM_CT?semCtRot(f.obraId):((contrato(f.contratoId)||{}).numero||f.contratoId||'—'))}
function fechUnRotulo(f){return f.inteiro?'dia inteiro — todas as obras':`${f.obraNome||(obra(f.obraId)||{}).nome||'obra'} · contrato ${fechCtNum(f)}`}
function diaValidadoErro(d,obraId){const f=diaValidadoUn(d,obraId,cidOf(obraId));return f?`O dia ${br(d)} já foi validado no Fechamento${f.inteiro?'':' para esta obra e contrato'}${f.por?' (por '+f.por+')':''} — refeição não registrada. Para incluir ou retirar, o administrador precisa reabrir o dia.`:null}
function diaTravadoAviso(x){const f=diaValidadoReg(x);if(!f)return false;
  toast(`O dia ${br(x.data)} foi validado no Fechamento (${fechUnRotulo(f)})${f.por?' por '+f.por:''} — nada pode ser incluído, retirado ou corrigido. Para alterar, o administrador precisa reabrir o dia.`,'warn');return true}
function fechBloqueiaExclusao(regs,sob){const dias=[...new Set((regs||[]).concat(sob||[]).filter(x=>diaValidadoReg(x)).map(x=>x.data))].sort();if(!dias.length)return false;
  toast(`Nada foi excluído: há refeições em ${dias.length} dia(s) já validado(s) no Fechamento (${dias.slice(0,5).map(br).join(', ')}${dias.length>5?'…':''}). O administrador precisa reabrir esses dias antes.`,'bad');return true}
// botões que incluiriam/retirariam/corrigiriam uma refeição de dia validado viram um aviso
function regDoBotao(b){const d=b.dataset;const rid=d.undo||d.fechar||d.reabrir||d.redit,sid=d.rsdel||d.sdel2;
  if(rid)return S.registros.find(r=>r.id===rid)||null;if(sid)return (S.sobras||[]).find(o=>o.id===sid)||null;
  if(d.rtest){const l=S.registros.filter(r=>r.retro&&r.retro.lote===d.rtest);return l.find(x=>diaValidadoReg(x))||l[0]||null}return null}
function travaDiaUI(root){if(!root||!S||!S.fech)return;
  root.querySelectorAll('[data-undo],[data-fechar],[data-reabrir],[data-redit],[data-rsdel],[data-sdel2],[data-rtest]').forEach(b=>{const x=regDoBotao(b),f=x&&diaValidadoReg(x);if(!f)return;
    const sp=document.createElement('span');sp.className='pill neutral fch-trava';sp.title=`Dia ${br(x.data)} validado no Fechamento (${fechUnRotulo(f)}) por ${f.por||'—'} em ${brdt(f.em)} — para alterar, o administrador precisa reabrir o dia`;sp.textContent='🔒 dia validado';b.replaceWith(sp)})}
let FECH_UI={aba:'conf',abertos:new Set(),fechados:new Set(),vistos:new Set(),dias:{}},FV_NAV=null;
let FECH_SEL={emp:'',obra:'',ct:''};try{const v=JSON.parse(localStorage.getItem('sismed_fech_sel')||'null');if(v&&typeof v==='object')FECH_SEL={emp:txt(v.emp).slice(0,60),obra:txt(v.obra).slice(0,60),ct:txt(v.ct).slice(0,60)}}catch(e){}
function fechSelGuarda(){try{localStorage.setItem('sismed_fech_sel',JSON.stringify(FECH_SEL))}catch(e){}}
function fechSelOk(){return !!(FECH_SEL.emp&&FECH_SEL.obra&&FECH_SEL.ct)}
// contratos da obra: o atual e os que aparecem nas refeições e sobras dela
function fechCtsDaObra(obraId){const L=new Set();const c0=cidOf(obraId);if(c0)L.add(c0);
  S.registros.forEach(r=>{if(r.obraId===obraId)L.add(cidReg(r))});(S.sobras||[]).forEach(o=>{if(o.obraId===obraId)L.add(cidReg(o))});if(!L.size)L.add(SEM_CT);return [...L]}
function fechSelMontar(){
  const nm=(a,b)=>String(a.nome||'').localeCompare(String(b.nome||''));
  const E=S.empresas.filter(e=>S.obras.some(o=>o.empresaId===e.id&&obraOk(o.id))).sort(nm);
  if(FECH_SEL.emp&&!E.some(e=>e.id===FECH_SEL.emp))FECH_SEL={emp:'',obra:'',ct:''};
  fillSelect($('fs-emp'),E,FECH_SEL.emp,'Escolha a empresa…');
  const O=FECH_SEL.emp?S.obras.filter(o=>o.empresaId===FECH_SEL.emp&&obraOk(o.id)).sort(nm):[];
  if(FECH_SEL.obra&&!O.some(o=>o.id===FECH_SEL.obra)){FECH_SEL.obra='';FECH_SEL.ct=''}
  fillSelect($('fs-obra'),O,FECH_SEL.obra,FECH_SEL.emp?'Escolha a obra…':'Escolha antes a empresa');$('fs-obra').disabled=!FECH_SEL.emp;
  const C=FECH_SEL.obra?fechCtsDaObra(FECH_SEL.obra).map(id=>({id,nome:fechCtRot(id,FECH_SEL.obra)})):[];
  if(FECH_SEL.ct&&!C.some(c=>c.id===FECH_SEL.ct))FECH_SEL.ct='';
  if(!FECH_SEL.ct&&C.length===1)FECH_SEL.ct=C[0].id;   // obra com um contrato só: já vem escolhido
  fillSelect($('fs-ct'),C,FECH_SEL.ct,FECH_SEL.obra?'Escolha o contrato…':'Escolha antes a obra');$('fs-ct').disabled=!FECH_SEL.obra;
  fechSelGuarda();return fechSelOk()}
$('fs-emp').onchange=()=>{FECH_SEL={emp:$('fs-emp').value,obra:'',ct:''};FECH_UI.dias={};renderFech()};
$('fs-obra').onchange=()=>{FECH_SEL.obra=$('fs-obra').value;FECH_SEL.ct='';renderFech()};
$('fs-ct').onchange=()=>{FECH_SEL.ct=$('fs-ct').value;renderFech()};
$('fch-abas').querySelectorAll('[data-fa]').forEach(b=>b.onclick=()=>{if(FECH_UI.aba===b.dataset.fa)return;FECH_UI.aba=b.dataset.fa;if(USER){audit('nav','Administrativo › Fechamento › '+b.textContent.replace(/\d+$/,'').trim());save()}renderFech()});
$('fch-val-reab').onchange=()=>{PAGES.fechVal=1;renderFech()};
function regHora(r){if(!r.registradoEm||!isFinite(Date.parse(r.registradoEm)))return '—';const d=ymd(new Date(r.registradoEm));
  return d===r.data?esc(hm(r.registradoEm)):`${esc(hm(r.registradoEm))}<div class="small muted">em ${esc(br(d))}</div>`}
function fechNaSel(x){return x.obraId===FECH_SEL.obra&&cidReg(x)===FECH_SEL.ct}
function fechFiltrado(){return ['f-ct','f-tipo'].some(id=>$(id).value)||!!$('f-busca').value.trim()}
function fechItens(de,ate){
  const ctF=$('f-ct').value,tp=$('f-tipo').value,q=$('f-busca').value.trim().toLowerCase();
  const ok=x=>x.data>=de&&x.data<=ate&&fechNaSel(x)&&(!ctF||ctOf(x)===ctF)&&(!tp||x.tipo===tp);
  return S.registros.filter(r=>regOk(r)&&ok(r)&&(!q||String(r.nome||'').toLowerCase().includes(q))).map(r=>({k:'r',x:r}))
    .concat((S.sobras||[]).filter(o=>o.empresaId&&sobraOk(o)&&ok(o)&&(!q||('sobra '+(o.colabNome||'')).toLowerCase().includes(q))).map(o=>({k:'s',x:o})))}
// tudo da obra e contrato no dia (sem os filtros da tela) — é o que a validação fecha
function fechUnResumo(d,obraId,ctId){const na=x=>x.data===d&&x.obraId===obraId&&cidReg(x)===ctId;
  const regs=S.registros.filter(r=>na(r)&&regOk(r)),sob=(S.sobras||[]).filter(o=>na(o)&&o.empresaId&&sobraOk(o));
  const nSob=sob.reduce((a,o)=>a+(+o.qtd||0),0);
  const valor=regs.filter(r=>!(r.fechado&&!r.bmId)).reduce((a,r)=>a+(+r.valor||0),0)+sob.reduce((a,o)=>a+sobraTotal(o),0);
  const porTipo=TIPOS.map(t=>[t.curto,regs.filter(r=>r.tipo===t.id).length+sob.filter(o=>o.tipo===t.id).reduce((a,o)=>a+(+o.qtd||0),0)]).filter(x=>x[1]);
  return {nReg:regs.length,nSob,qtd:regs.length+nSob,valor:Math.round(valor*100)/100,porTipo,semFoto:regs.filter(r=>!r.foto).length,
    rests:[...new Set(regs.concat(sob).map(x=>(ct(ctOf(x))||{}).nome||x.contratadaNome||'—'))]}}
// dias/obras/contratos da última semana (antes de hoje) com refeições e ainda sem validação
function fechPendentes(){if(!S)return [];const h=today(),de=addDays(h,-7),un=new Set();
  const ad=x=>{if(x.data>=de&&x.data<h&&!diaValidadoReg(x))un.add(fechChave(x.data,x.obraId,cidReg(x)))};
  S.registros.forEach(r=>{if(regOk(r))ad(r)});(S.sobras||[]).forEach(o=>{if(o.empresaId&&sobraOk(o))ad(o)});return [...un]}
function fechDiaNome(d){const n=['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'][parse(d).getDay()];return `${n}, ${br(d)}`}
function fechLinha(i,d,ix){const x=i.x,vis=FECH_UI.vistos.has(i.k+x.id),rest=esc((ct(ctOf(x))||{}).nome||x.contratadaNome||'—'),a=`class="fch-lin${vis?' visto':''}" data-fi="${esc(d)}|${ix}" tabindex="0"`;
  if(i.k==='s')return `<tr ${a}><td class="num">${sobraHora(x)}</td><td><b>Sobra</b> — ${esc(x.qtd)} ${(+x.qtd)===1?'refeição':'refeições'}${x.colabNome?`<div class="small muted">${esc(x.colabNome)}</div>`:''}</td><td>${esc(x.empresaNome||'—')}</td><td>${esc(x.obraNome||'—')}</td><td>${rest}</td><td><span class="pill ${x.tipo}">${tipo(x.tipo).curto}</span> <span class="pill mod-sobra">sobra</span></td><td class="r num">${money(sobraTotal(x))}</td><td><span class="small muted">—</span></td><td>${esc(x.usuario||'—')}</td></tr>`;
  const m=modOf(x);
  return `<tr ${a}><td class="num">${regHora(x)}</td><td>${esc(x.nome)}${x.retro?' <span class="pill warn">retroativo</span>':x.dataManual?' <span class="pill warn">data manual</span>':''}${m!=='presencial'?`<div class="small muted">${m==='retirada'?esc(retInfo(x)):'terceirizado'+(x.terceirizada?' · terc.: '+esc(x.terceirizada):'')}</div>`:''}${x.semQr?'<div class="small muted">sem QR Code — escolhido pelo nome</div>':''}${x.fechado&&!x.bmId?'<div><span class="pill bad">fechada sem BM</span></div>':''}</td><td>${esc(x.empresaNome||'—')}</td><td>${esc(x.obraNome||'—')}${regCorrPill(x)}</td><td>${rest}</td><td><span class="pill ${x.tipo}">${tipo(x.tipo).curto}</span></td><td class="r num">${money(x.valor)}</td><td>${x.foto?(can('fotos.ver')?'<span title="Com foto — toque na linha">📷</span>':'<span class="small muted">com foto</span>'):x.semFoto?`<span class="pill warn" title="${esc(x.semFoto)}">sem foto</span>`:'<span class="small muted">—</span>'}</td><td>${esc(x.usuario||'—')}</td></tr>`}
function renderFech(){
  const box=$('fch-dias');if(!box||!S)return;const aba=FECH_UI.aba==='val'?'val':'conf';
  $('fch-abas').querySelectorAll('[data-fa]').forEach(b=>{const on=b.dataset.fa===aba;b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on))});
  $('fch-conf').hidden=aba!=='conf';$('fch-val').hidden=aba!=='val';
  const nVal=fechValidados(false).length;$('fch-n-val').textContent=nVal||'';
  if(aba==='val'){fchProgresso(null);fvDocar(false);renderFechVal();return}
  if(!fechSelMontar()){FECH_UI.dias={};$('fch-count').textContent='';box.innerHTML='<div class="notice info fch-escolha">Escolha a <b>empresa</b>, depois a <b>obra</b> e o <b>contrato</b> para ver os dias e fazer o fechamento.</div>';fchProgresso(null);fvDocar(false);return}
  const fim=WK_FIM||addDays(WK,6),hoje=today(),filt=fechFiltrado(),SO=FECH_SEL.obra,SC=FECH_SEL.ct;
  const porDia=new Map();fechItens(WK,fim).forEach(i=>{const d=i.x.data;if(!porDia.has(d))porDia.set(d,[]);porDia.get(d).push(i)});
  if(!filt)Object.values(S.fech||{}).forEach(f=>{if(f.validado&&f.dia>=WK&&f.dia<=fim&&!porDia.has(f.dia)&&(f.inteiro||(f.obraId===SO&&f.contratoId===SC)))porDia.set(f.dia,[])});
  const dias=[...porDia.keys()].sort().reverse();FECH_UI.dias={};
  const nV=dias.filter(d=>diaValidadoUn(d,SO,SC)).length,nP=dias.filter(d=>d<hoje&&!diaValidadoUn(d,SO,SC)).length;
  $('fch-count').textContent=dias.length?`${dias.length} ${dias.length===1?'dia':'dias'} · ${nV} ${nV===1?'validado':'validados'}${nP?` · ${nP} aguardando validação`:''}`:'';
  box.innerHTML=dias.map(d=>{
    const l=porDia.get(d).sort((a,b)=>(a.x.registradoEm||'')<(b.x.registradoEm||'')?-1:(a.x.registradoEm||'')>(b.x.registradoEm||'')?1:0);FECH_UI.dias[d]=l;
    const f=diaValidadoUn(d,SO,SC),fi=S.fech&&S.fech[fechChave(d,SO,SC)],R=fechUnResumo(d,SO,SC),aberto=f?FECH_UI.abertos.has(d):!FECH_UI.fechados.has(d);
    const qL=l.reduce((a,i)=>a+(i.k==='s'?(+i.x.qtd||0):1),0),vL=l.reduce((a,i)=>a+(i.k==='s'?sobraTotal(i.x):(i.x.fechado&&!i.x.bmId?0:(+i.x.valor||0))),0);
    const mudou=f&&!f.inteiro&&f.tudo&&fechVeTudo()&&(R.qtd!==f.qtd||Math.abs(R.valor-f.valor)>0.004);
    const acao=f?`<span class="pill ok">✓ Dia validado${f.inteiro?' (dia inteiro)':''}</span><span class="small muted">por ${esc(f.por||'—')} em ${brdt(f.em)}</span>${mudou?`<span class="pill bad fch-mudou" title="Validado com ${f.qtd} refeições (${money(f.valor)}); agora são ${R.qtd} (${money(R.valor)}). Pode ser um registro feito sem internet e enviado depois da validação. O administrador pode reabrir o dia para conferir.">⚠ mudou depois da validação: ${f.qtd} → ${R.qtd}</span>`:''}${isAdm(USER)?`<button type="button" class="btn sec sm" data-freab="${esc(f.chave)}">Reabrir</button>`:''}`
      :d<hoje?(can('sup.fechamento')?`<button type="button" class="btn sm" data-fval="${esc(d)}">Validar dia</button>`:'<span class="pill warn">Aguardando validação</span>')
      :d===hoje?'<span class="pill neutral" title="Hoje ainda pode ter refeições — a validação fica disponível a partir de amanhã">Hoje — validar a partir de amanhã</span>':'';
    const reab=!f&&fi&&fi.reabertoEm?`<div class="small muted fch-reab">Reaberto por ${esc(fi.reabertoPor||'—')} em ${brdt(fi.reabertoEm)}${fi.motivo?' — '+esc(fi.motivo):''}</div>`:'';
    return `<section class="fch-dia${f?' validado':''}" data-dia="${esc(d)}"><div class="fch-cab">
      <button type="button" class="fch-tog" data-ftog="${esc(d)}" aria-expanded="${aberto}"><span class="fch-chev" aria-hidden="true">${aberto?'▾':'▸'}</span><b class="fch-data">${esc(fechDiaNome(d))}</b><span class="fch-res num">${R.qtd} ${R.qtd===1?'refeição':'refeições'} · ${money(R.valor)}</span><span class="small muted">${esc(R.porTipo.map(([n,q])=>n+' '+q).join(' · '))}${R.nSob?' (com '+R.nSob+' de sobras)':''}</span></button>
      <div class="fch-acao">${acao}</div>${reab}${filt?`<div class="small muted fch-filt">Com os filtros da tela: ${qL} ${qL===1?'refeição':'refeições'} · ${money(vL)} — a validação vale para tudo desta obra e contrato no dia.</div>`:''}</div>
      ${aberto?`<div class="tablewrap fch-tab"><table><thead><tr><th>Hora</th><th>Colaborador</th><th>Empresa</th><th>Obra</th><th>Restaurante</th><th>Tipo</th><th class="r">Valor</th><th>Foto</th><th>Registrado por</th></tr></thead><tbody>${l.map((i,ix)=>fechLinha(i,d,ix)).join('')||'<tr><td colspan="9" class="empty">Nenhuma refeição neste dia com esses filtros.</td></tr>'}</tbody></table></div>`:''}</section>`}).join('')
    ||'<div class="empty" style="padding:18px 4px">Nenhuma refeição desta obra e contrato no período.</div>';
  fchProgresso(dias);   // v3.0.1: barra dos dias da semana e painel da foto ao lado
  box.querySelectorAll('[data-ftog]').forEach(b=>b.onclick=()=>{const d=b.dataset.ftog,ab=b.getAttribute('aria-expanded')==='true';
    if(diaValidadoUn(d,FECH_SEL.obra,FECH_SEL.ct)){if(ab)FECH_UI.abertos.delete(d);else FECH_UI.abertos.add(d)}else{if(ab)FECH_UI.fechados.add(d);else FECH_UI.fechados.delete(d)}renderFech()});
  box.querySelectorAll('[data-fval]').forEach(b=>b.onclick=()=>fechValidar(b.dataset.fval));
  box.querySelectorAll('[data-freab]').forEach(b=>b.onclick=()=>fechReabrir(b.dataset.freab));
  box.querySelectorAll('tr[data-fi]').forEach(tr=>{const p=tr.dataset.fi.split('|'),abre=()=>fechAbrir(p[0],+p[1]);tr.onclick=abre;
    tr.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();abre()}else if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const o=e.key==='ArrowDown'?tr.nextElementSibling:tr.previousElementSibling;if(o&&o.dataset.fi)o.focus()}}});
}
// guia "Dias validados": os fechamentos feitos, do dia mais recente, paginados
function fechValidados(comReab){return Object.values((S&&S.fech)||{}).filter(f=>(f.validado||(comReab&&f.reabertoEm))&&(f.inteiro||!f.obraId||obraOk(f.obraId)))
  .sort((a,b)=>a.dia!==b.dia?(a.dia<b.dia?1:-1):fechUnRotulo(a).localeCompare(fechUnRotulo(b)))}
function renderFechVal(){
  const L=fechValidados($('fch-val-reab').checked),PV=paginate('fechVal',L,15);
  $('fch-count').textContent=`${L.length} ${L.length===1?'fechamento':'fechamentos'}`;
  $('fch-val-tab').innerHTML=`<thead><tr><th>Dia</th><th>Empresa</th><th>Obra</th><th>Contrato</th><th class="r">Refeições</th><th class="r">Valor</th><th>Validado por</th><th>Situação</th><th></th></tr></thead><tbody>${PV.rows.map(f=>`<tr>
    <td class="num" style="white-space:nowrap">${esc(fechDiaNome(f.dia))}</td><td>${f.inteiro?'<span class="muted">todas</span>':esc(f.empresaNome||(emp(f.empresaId)||{}).nome||'—')}</td>
    <td>${f.inteiro?'<span class="muted">todas (dia inteiro)</span>':esc(f.obraNome||(obra(f.obraId)||{}).nome||'—')}</td><td>${f.inteiro?'<span class="muted">todos</span>':esc(fechCtNum(f))}</td>
    <td class="r num">${f.qtd}</td><td class="r num">${money(f.valor)}</td><td>${esc(f.por||'—')}<div class="small muted">${brdt(f.em)}</div></td>
    <td>${f.validado?'<span class="pill ok">✓ validado</span>':`<span class="pill warn">reaberto</span><div class="small muted">por ${esc(f.reabertoPor||'—')} em ${brdt(f.reabertoEm)}${f.motivo?' — '+esc(f.motivo):''}</div>`}</td>
    <td><div class="row" style="gap:6px;flex-wrap:nowrap"><button type="button" class="btn sec sm" data-fver="${esc(f.chave)}">Ver o dia</button>${isAdm(USER)&&f.validado?`<button type="button" class="btn sec sm" data-freab="${esc(f.chave)}">Reabrir</button>`:''}</div></td></tr>`).join('')||'<tr><td colspan="9" class="empty">Nenhum dia validado ainda.</td></tr>'}</tbody>`;
  renderPager($('fch-val-pager'),'fechVal',PV,['fechamento','fechamentos'],renderFech);
  $('fch-val-tab').querySelectorAll('[data-fver]').forEach(b=>b.onclick=()=>fechIrPara(b.dataset.fver));
  $('fch-val-tab').querySelectorAll('[data-freab]').forEach(b=>b.onclick=()=>fechReabrir(b.dataset.freab));
}
function fechIrPara(chave){const f=S.fech[chave];if(!f)return;
  if(!f.inteiro){const o=obra(f.obraId);FECH_SEL={emp:(o&&o.empresaId)||f.empresaId||'',obra:f.obraId,ct:f.contratoId};fechSelGuarda()}
  FECH_UI.aba='conf';FECH_UI.abertos.add(f.dia);FECH_UI.fechados.delete(f.dia);const m=mondayOf(f.dia);WK=m;WK_FIM=addDays(m,6);SUP_PRE=null;PAGES.supRegs=1;renderSup();
  setTimeout(()=>{const s0=document.querySelector(`.fch-dia[data-dia="${f.dia}"]`);if(s0)s0.scrollIntoView({behavior:'smooth',block:'start'})},120)}
// tocar numa linha: foto e detalhes, com anterior / próxima (setas do teclado também)
function verSobra(o){if(!FV_DOCA_AGORA)fvDocar(false);FV_SEQ++;$('fv-title').textContent='Detalhes da sobra';const n=+o.qtd||0,fv=diaValidadoReg(o);
  const linhas=[['Data e hora do registro',`<b class="num">${brdt(o.registradoEm)}</b>`],['Refeição',`${tipo(o.tipo).curto} · ${br(o.data)}`],['Quantidade',`<b>${esc(o.qtd)}</b> ${n===1?'refeição':'refeições'} (sobra)`],
    ['Valor',`<span class="num">${money(sobraTotal(o))}</span>${n>1?` <span class="small muted">(${money(sobraUnit(o))} cada)</span>`:''}`],...(o.colabNome?[['Colaborador',esc(o.colabNome)]]:[]),['Empresa',esc(o.empresaNome||'—')],['Obra',esc(o.obraNome||'—')],
    ['Restaurante',esc((ct(ctOf(o))||{}).nome||o.contratadaNome||'—')],['Informado por',esc(o.usuario||'—')],
    ...(fv?[['Fechamento',`<span class="pill ok">✓ dia validado</span> <span class="small muted">por ${esc(fv.por||'—')} em ${brdt(fv.em)}</span>`]]:[])];
  $('fv-body').innerHTML=`<div class="fvimg sem" id="fv-img"><div class="vazio">Sobra — refeição preparada e não consumida, informada pelo restaurante (sem foto).</div></div><dl class="fvinfo">${linhas.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  $('fv-modal').classList.add('on')}
function fechAbrir(d,ix){const l=FECH_UI.dias[d]||[],i=l[ix];if(!i)return;FV_NAV={d,ix,n:l.length};FECH_UI.vistos.add(i.k+i.x.id);
  fvDocar(fchDocaPode());FV_DOCA_AGORA=true;try{if(i.k==='s')verSobra(i.x);else verRegistro(i.x)}finally{FV_DOCA_AGORA=false}
  const b=$('fv-body');if(b){const nav=document.createElement('div');nav.className='fv-nav';nav.id='fv-nav';
    nav.innerHTML=`<button type="button" class="btn sec sm" id="fv-ant"${ix<=0?' disabled':''}>‹ Anterior</button><span class="small muted num">${ix+1} de ${l.length} · ${esc(br(d))}</span><button type="button" class="btn sec sm" id="fv-prox"${ix>=l.length-1?' disabled':''}>Próxima ›</button>`;
    b.prepend(nav);$('fv-ant').onclick=()=>fechAbrir(d,ix-1);$('fv-prox').onclick=()=>fechAbrir(d,ix+1)}
  document.querySelectorAll('#fch-dias tr.sel').forEach(x=>x.classList.remove('sel'));
  const tr=[...document.querySelectorAll('#fch-dias tr[data-fi]')].find(x=>x.dataset.fi===d+'|'+ix);if(tr){tr.classList.add('sel','visto')}}
document.addEventListener('keydown',e=>{if(!FV_NAV||!$('fv-nav')||!$('fv-modal').classList.contains('on')||$('info-modal').classList.contains('on'))return;
  if(e.key==='ArrowRight'&&FV_NAV.ix<FV_NAV.n-1){e.preventDefault();fechAbrir(FV_NAV.d,FV_NAV.ix+1)}
  else if(e.key==='ArrowLeft'&&FV_NAV.ix>0){e.preventDefault();fechAbrir(FV_NAV.d,FV_NAV.ix-1)}});
// gravação (direto no servidor; precisa de internet): lê a linha, aplica a mudança e grava
async function fechGravar(chave,fn){
  if(navigator.onLine===false)throw new Error('sem internet');
  if(!(await sessaoValida()))throw new Error('sem internet (sessão não renovada)');
  const id='fech:'+chave,r=await sb.from('config').select('id,data').eq('id',id).maybeSingle();if(r.error)throw r.error;
  const atual=r.data&&r.data.data?limpaFechItem(chave,r.data.data):null;if(atual)S.fech[chave]=atual;
  const data=fn(atual);if(!data)return null;
  const w=await sb.from('config').upsert({id,data});if(w.error)throw w.error;
  S.fech[chave]=limpaFechItem(chave,data);try{localStorage.setItem(CACHE_KEY,JSON.stringify(S))}catch(e){}return S.fech[chave]}
function fechErroMsg(e,acao){const m=String((e&&e.message)||e||'');
  if(/row-level security|42501|permission|policy|violates/i.test(m))return `O servidor não aceitou ${acao}: seu usuário ainda não pode gravar o fechamento no banco. Peça ao administrador para liberar também o acesso “Cadastrar contratadas (restaurantes)” — ou para rodar o ajuste opcional do banco da v2.9.9.`;
  if(ehFalhaRede(e)||/sem internet/i.test(m))return `Sem internet — para ${acao} é preciso estar conectado.`;
  return `Não foi possível ${acao}: ${m.slice(0,140)}`}
function fechValidar(d){
  if(!can('sup.fechamento')||!FECH_DIA_RX.test(d)||!(d<today())||!fechSelOk())return;const SO=FECH_SEL.obra,SC=FECH_SEL.ct;if(diaValidadoUn(d,SO,SC)){renderSup();return}
  const R=fechUnResumo(d,SO,SC),filt=fechFiltrado(),O=obra(SO)||{},E=emp(O.empresaId||FECH_SEL.emp)||{},chave=fechChave(d,SO,SC),ctN=SC===SEM_CT?semCtRot(SO):((contrato(SC)||{}).numero||SC);
  infoModal(`Validar o dia ${br(d)}`,`<div class="stack">
    <div class="notice info"><b>${esc(fechDiaNome(d))}</b><br>Empresa: <b>${esc(E.nome||'—')}</b> · Obra: <b>${esc(O.nome||'—')}</b> · Contrato: <b>${esc(ctN)}</b><br>${R.qtd} ${R.qtd===1?'refeição':'refeições'} · <b>${money(R.valor)}</b>${R.porTipo.length?'<br>'+esc(R.porTipo.map(([n,q])=>n+': '+q).join(' · ')):''}${R.nSob?'<br>'+R.nSob+' de sobras':''}${R.semFoto?'<br>'+R.semFoto+' sem foto':''}${R.rests.length?'<br>Restaurante: '+esc(R.rests.join(', ')):''}</div>
    <div class="notice warn small">Valida todas as refeições e sobras desta <b>obra e contrato</b> em ${br(d)}${filt?' (não só o que está filtrado na tela)':''}. Depois de validado, ninguém inclui, estorna, corrige nem exclui. Só o administrador pode reabrir.</div>
    <div id="fq-err" class="notice bad" hidden></div>
    <div class="row" style="justify-content:flex-end"><button type="button" class="btn sec" id="fq-cancel">Cancelar</button><button type="button" class="btn" id="fq-ok">Validar dia</button></div></div>`);
  $('fq-cancel').onclick=()=>$('info-modal').classList.remove('on');
  $('fq-ok').onclick=async()=>{const bt=$('fq-ok');if(bt.disabled)return;bt.disabled=true;bt.textContent='Validando…';const agora=new Date().toISOString();let ja=null;
    try{await fechGravar(chave,atual=>{if(atual&&atual.validado){ja=atual;return null}
        return {dia:d,empresaId:E.id||FECH_SEL.emp,empresaNome:E.nome||'',obraNome:O.nome||'',contratoNumero:ctN,validado:true,tudo:fechVeTudo(),em:agora,por:USER.nome,porId:USER.id,qtd:R.qtd,valor:R.valor,
          hist:((atual&&atual.hist)||[]).concat([{acao:'validado',em:agora,por:USER.nome,qtd:R.qtd,valor:R.valor}]).slice(-50)}});
      $('info-modal').classList.remove('on');
      if(ja){toast(`O dia ${br(d)} (${O.nome||'obra'} · contrato ${ctN}) já tinha sido validado por ${ja.por||'—'} em ${brdt(ja.em)}.`,'info');renderSup();return}
      audit('fechamento.validar',`Dia ${br(d)} validado — ${E.nome||'—'} · ${O.nome||'—'} · contrato ${ctN} — ${R.qtd} refeição(ões) (${R.nReg} registro(s)${R.nSob?' + '+R.nSob+' de sobras':''}) · ${money(R.valor)}${R.porTipo.length?' · '+R.porTipo.map(([n,q])=>n+' '+q).join(', '):''}`,{obra:O.nome||'',empresa:E.nome||'',entidade:'fechamento '+br(d)+' — contrato '+ctN,antes:'em aberto',depois:'validado'});
      concluir(`Dia ${br(d)} validado — ${O.nome||'obra'} · contrato ${ctN}`);renderSup()}
    catch(e){bt.disabled=false;bt.textContent='Validar dia';const el=$('fq-err');el.hidden=false;el.textContent=fechErroMsg(e,'validar o dia')}}}
function fechReabrir(chave){
  if(!isAdm(USER))return;const f=S.fech&&S.fech[chave];if(!f||!f.validado){renderSup();return}
  infoModal(`Reabrir o dia ${br(f.dia)}`,`<div class="stack"><div class="notice info small"><b>${esc(fechUnRotulo(f))}</b><br>Validado por <b>${esc(f.por||'—')}</b> em ${brdt(f.em)} · ${f.qtd} ${f.qtd===1?'refeição':'refeições'} · ${money(f.valor)}.<br>Ao reabrir, essas refeições de ${br(f.dia)} voltam a poder ser incluídas, estornadas, corrigidas ou excluídas. Depois, valide o dia de novo.</div>
    <div class="field"><label for="fq-motivo">Justificativa (obrigatória)</label><textarea id="fq-motivo" rows="3" maxlength="500"></textarea></div><div id="fq-err" class="notice bad" hidden></div>
    <div class="row" style="justify-content:flex-end"><button type="button" class="btn sec" id="fq-cancel">Cancelar</button><button type="button" class="btn danger" id="fq-ok">Reabrir dia</button></div></div>`);
  $('fq-cancel').onclick=()=>$('info-modal').classList.remove('on');
  $('fq-ok').onclick=async()=>{const motivo=$('fq-motivo').value.trim(),el=$('fq-err'),bt=$('fq-ok');if(bt.disabled)return;
    if(motivo.length<5){el.hidden=false;el.textContent='Informe a justificativa (mínimo 5 caracteres).';return}
    bt.disabled=true;bt.textContent='Reabrindo…';const agora=new Date().toISOString();let antes=f,nada=false;
    try{await fechGravar(chave,atual=>{if(!atual||!atual.validado){nada=true;return null}antes=atual;
        return {...atual,validado:false,reabertoEm:agora,reabertoPor:USER.nome,motivo,hist:(atual.hist||[]).concat([{acao:'reaberto',em:agora,por:USER.nome,motivo}]).slice(-50)}});
      $('info-modal').classList.remove('on');
      if(nada){toast(`O dia ${br(f.dia)} já estava reaberto.`,'info');renderSup();return}
      audit('fechamento.reabrir',`Dia ${br(f.dia)} reaberto — ${fechUnRotulo(antes)} — tinha sido validado por ${antes.por||'—'} em ${brdt(antes.em)} — motivo: ${motivo}`,{obra:antes.inteiro?'':(antes.obraNome||''),empresa:antes.inteiro?'':(antes.empresaNome||''),entidade:'fechamento '+br(f.dia)+(antes.inteiro?' — dia inteiro':' — contrato '+fechCtNum(antes)),antes:'validado',depois:'reaberto'});
      concluir(`Dia ${br(f.dia)} reaberto`);renderSup()}
    catch(e){bt.disabled=false;bt.textContent='Reabrir dia';el.hidden=false;el.textContent=fechErroMsg(e,'reabrir o dia')}}}
/* ---- fechar refeição sem incluir em BM (permissão sup.fechar) ---- */
function justModal({titulo,resumo,botao,classe,onOk}){
  infoModal(titulo,`<div class="stack">${resumo}<div class="field"><label for="jm-txt">Justificativa (obrigatória)</label><textarea id="jm-txt" rows="3"></textarea></div><div id="jm-err" class="notice bad" hidden></div>
    <div class="row" style="justify-content:flex-end"><button class="btn sec" id="jm-cancel">Cancelar</button><button class="btn ${classe||''}" id="jm-go">${botao}</button></div></div>`);
  $('jm-cancel').onclick=()=>$('info-modal').classList.remove('on');
  $('jm-go').onclick=()=>{const t=$('jm-txt').value.trim();if(t.length<5){$('jm-err').hidden=false;$('jm-err').textContent='Informe a justificativa (mínimo 5 caracteres).';return}$('info-modal').classList.remove('on');onOk(t)};
}
function fecharRefeicao(r){
  if(!r||!can('sup.fechar')||r.bmId||r.fechado)return;
  if(diaTravadoAviso(r))return;   // v2.9.9 · v2.9.10
  justModal({titulo:'Fechar refeição sem BM',resumo:`<div class="notice warn">${br(r.data)} · ${tipo(r.tipo).curto} — <b>${esc(r.nome)}</b> (${esc(r.empresaNome)} · ${esc(r.obraNome||'—')}) · ${money(r.valor)} · ${MODS[modOf(r)]}.<br>A refeição deixa de entrar em qualquer BM e não pode mais ser estornada pelo restaurante.</div>`,botao:'Fechar refeição',classe:'danger',
    onOk:motivo=>{r.fechado={em:new Date().toISOString(),por:USER.nome,motivo};audit('refeicao.fechar',`${tipo(r.tipo).curto} de ${r.nome} em ${br(r.data)} (${money(r.valor)}) — motivo: ${motivo}`,{obra:r.obraNome,empresa:r.empresaNome,entidade:'registro '+r.id,antes:'em aberto',depois:'fechada sem BM'});concluir(`Refeição de ${r.nome.split(' ')[0]} fechada sem BM`);renderSup()}});
}
function reabrirRefeicao(r){
  if(!r||!can('sup.fechar')||!r.fechado||r.bmId)return;
  if(diaTravadoAviso(r))return;   // v2.9.9 · v2.9.10
  justModal({titulo:'Reabrir refeição',resumo:`<div class="notice info">${br(r.data)} · ${tipo(r.tipo).curto} — <b>${esc(r.nome)}</b> · ${money(r.valor)}. Fechada por ${esc(r.fechado.por)} em ${brdt(r.fechado.em)}: “${esc(r.fechado.motivo)}”.<br>Ao reabrir, ela volta a poder entrar em um BM.</div>`,botao:'Reabrir refeição',
    onOk:motivo=>{const antes=r.fechado.motivo;delete r.fechado;audit('refeicao.reabrir',`${tipo(r.tipo).curto} de ${r.nome} em ${br(r.data)} — motivo: ${motivo}`,{obra:r.obraNome,empresa:r.empresaNome,entidade:'registro '+r.id,antes:'fechada sem BM ('+antes+')',depois:'em aberto'});concluir(`Refeição de ${r.nome.split(' ')[0]} reaberta`);renderSup()}});
}
function excluirSobra(id,after){
  const ss=S.sobras.find(s=>s.id===id);if(!ss||!can('del.sobras'))return;
  if(diaTravadoAviso(ss))return;   // v2.9.9 · v2.9.10
  if(ss.bmId){const b=S.bms.find(x=>x.id===ss.bmId);toast(`Sobra já está no BM nº ${b?b.numero:''} — exclua o BM antes`);return}
  confirmDelete({titulo:'Excluir sobra informada',resumo:`<div class="notice warn">${br(ss.data)} · ${esc(ss.qtd)} ${tipo(ss.tipo).curto} — ${esc(ss.colabNome)} (${esc(ss.empresaNome||'—')} · ${esc(ss.obraNome||'—')}) · ${money(sobraTotal(ss))}, informada por ${esc(ss.usuario)}.</div>`,botao:'Excluir sobra',
    onOk:async(_,motivo)=>{S.sobras=S.sobras.filter(s=>s.id!==id);audit('sobra.excluir',`${br(ss.data)} — ${esc(ss.qtd)} ${tipo(ss.tipo).curto} — ${ss.colabNome} — ${money(sobraTotal(ss))} — motivo: ${motivo}`,{empresa:ss.empresaNome,obra:ss.obraNome||''});concluir('Sobra excluída');after()}});
}
/* ---- exclusão de BM: só o último de cada contrato + centro de custo (v3.1.3: BM de outra obra do mesmo contrato não bloqueia; v2.9.4: por contrato) ----
   O contrato do BM é o gravado nele (contratoId); BM antigo sem contrato gravado: o contrato atual da obra; sem obra/contrato: "Sem contrato".
   A numeração continua por empresa: se a empresa já tem BM posterior (de outro contrato), o número excluído não é reaproveitado. */
function bmPosterior(b){if(bmPed(b))return null;   // v2.9.12: BM por pedido não tem acumulado nem saldo — pode ser excluído mesmo havendo outro depois
  const k=bmCtChave(b),o=b.obraId||'';return S.bms.filter(x=>x.empresaId===b.empresaId&&x.id!==b.id&&bmCtChave(x)===k&&(x.obraId||'')===o&&(x.numero>b.numero||(x.numero===b.numero&&x.emitidoEm>b.emitidoEm))).sort((a,c)=>c.numero-a.numero)[0]||null}
/* v3.1.4: número de BM excluído fica reservado para o próximo BM da mesma obra e contrato (quando a empresa já passou dele) */
function bmChaveNum(obraId,ctKey){return (obraId||'')+'|'+(ctKey||'')}
function bmNumLivre(E,obraId,ctKey){if(!E||!Array.isArray(E.numerosLivres))return null;const k=bmChaveNum(obraId,ctKey);
  const L=E.numerosLivres.filter(l=>l&&bmChaveNum(l.obraId,l.contratoId)===k&&!S.bms.some(x=>x.empresaId===E.id&&x.numero===l.numero)).sort((a,c)=>a.numero-c.numero);
  return L.length?L[0].numero:null}
function excluirBM(b){
  if(!b||!can('del.bm'))return;const post=bmPosterior(b);if(post){toast(`Não é possível: existe o BM ${esc(post.numero)} posterior deste contrato e centro de custo (${ctRotulo(bmCtChave(b))})`);return}
  const Ex=emp(b.empresaId),volta=!!Ex&&(Ex.proximoBM||1)===b.numero+1;
  const nsb=(S.sobras||[]).filter(s=>s.bmId===b.id).reduce((a,s)=>a+s.qtd,0);const n=S.registros.filter(r=>r.bmId===b.id).length+nsb;
  confirmDelete({titulo:`Excluir BM nº ${esc(b.numero)} — ${esc(b.empresaNome)}`,
    resumo:`<div class="notice warn">Período ${br(b.ini)} à ${br(b.fim)} · ${statusPill(b)} · ${money(b.liquido)}.<br>As <b>${n} refeições</b>${nsb?` (${nsb} de sobras)`:''} voltam a ficar "em aberto" (podem entrar em um novo BM), ${b.anexo?'o anexo assinado é apagado, ':''}${volta?`e o próximo número de BM da empresa volta para <b>${esc(b.numero)}</b>`:`e o número <b>${esc(b.numero)}</b> fica reservado para o próximo BM desta obra e contrato${b.obraNome?' ('+esc(b.obraNome)+')':''}`}.${b.nf?`<br><b>Atenção:</b> este BM já tem a nota fiscal ${esc(b.nf)} informada.`:''}</div>`,
    botao:'Excluir BM',
    onOk:async(_,motivo)=>{
      if(b.anexo&&b.anexo.path){try{await sb.storage.from('anexos').remove([b.anexo.path])}catch(e){}}
      S.registros.forEach(r=>{if(r.bmId===b.id)r.bmId=null});(S.sobras||[]).forEach(s=>{if(s.bmId===b.id)s.bmId=null});
      S.bms=S.bms.filter(x=>x.id!==b.id);
      const E=emp(b.empresaId);if(E&&(E.proximoBM||1)===b.numero+1)E.proximoBM=b.numero;
      else if(E)E.numerosLivres=(Array.isArray(E.numerosLivres)?E.numerosLivres:[]).filter(l=>l&&l.numero!==b.numero).concat({numero:b.numero,obraId:b.obraId||null,contratoId:bmPed(b)?'ped':(b.contratoId||null)});   // v3.1.4
      audit('bm.excluir',`BM ${esc(b.numero)} — ${b.empresaNome} — ${br(b.ini)} à ${br(b.fim)} — ${n} refeições liberadas — motivo: ${motivo}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:b.status,depois:'excluído'});
      concluir(`BM ${esc(b.numero)} excluído`);renderSup();
    }});
}
/* ---- anexo do BM assinado ---- */
let ATT_BM=null;
$('bm-anexo-file').onchange=async e=>{
  const f=e.target.files[0];e.target.value='';if(!f||!ATT_BM)return;const b=S.bms.find(x=>x.id===ATT_BM);if(!b)return;
  if(f.size>10*1024*1024){toast('Arquivo acima de 10 MB');return}
  toast('Enviando anexo…');
  const safe=f.name.replace(/[^\w.\-]+/g,'_').slice(0,80);const path=`bm/${b.id}/${Date.now()}-${safe}`;
  const {error}=await sb.storage.from('anexos').upload(path,f,{contentType:f.type||'application/octet-stream',upsert:false});
  if(error){toast('Falha no envio: '+error.message);return}
  // o envio demora: os dados do aparelho podem ter sido trocados nesse meio-tempo — o anexo vai para o BM que está nos dados AGORA
  const bb=S.bms.find(x=>x.id===b.id);
  if(!bb){try{sb.storage.from('anexos').remove([path])}catch(e){}toast('Este BM não existe mais — foi excluído em outro aparelho. O anexo não foi gravado.','warn');renderSup();return}
  const anterior=bb.anexo&&bb.anexo.path;
  bb.anexo={name:f.name,type:f.type,path,size:f.size,em:new Date().toISOString(),usuario:USER.nome};
  audit('bm.anexar',`BM ${esc(bb.numero)} — ${f.name}`,{empresa:bb.empresaNome,entidade:'BM '+bb.numero});
  // só depois de gravado: se o BM ficou mesmo com o anexo novo, apaga o anterior; se a gravação foi desfeita (recusada), apaga o que acabou de subir
  concluir('BM assinado anexado').then(ok=>{if(!ok)return;const at=S.bms.find(x=>x.id===bb.id);const ficou=!!(at&&at.anexo&&at.anexo.path===path);
    try{if(ficou){if(anterior&&anterior!==path)sb.storage.from('anexos').remove([anterior])}else sb.storage.from('anexos').remove([path])}catch(e){}});renderSup();
};
/* v2.9.3: caixa "Anexos" do BM — ver o anexo e anexar (ou substituir) */
let ANXS_BM=null;
function bmAnexoPode(b){return can('sup.nf')&&b.status!=='rascunho'&&b.status!=='fechado'}
function bmAnexos(b){if(!b)return;ANXS_BM=b.id;bmAnexosRender(b);$('anxs-modal').classList.add('on');const f=$('anxs-body').querySelector('button');(f||$('anxs-close')).focus()}
function bmAnexosRender(b){
  $('anxs-title').textContent=`Anexos — BM ${b.numero}`;const a=b.anexo,pode=bmAnexoPode(b);
  const porque=!can('sup.nf')?'Você não tem acesso para anexar (peça o acesso “Informar nota fiscal e Nº do título e anexar BM assinado”).':(b.status==='fechado'||b.status==='rascunho')?'Dá para anexar depois que o restaurante assinar o BM.':'';
  $('anxs-body').innerHTML=`<div class="small muted" style="margin-bottom:10px">${esc(b.empresaNome)}${b.obraNome?' · '+esc(b.obraNome):''} · ${br(b.ini)} a ${br(b.fim)}</div>`+
    (a?`<div class="anx-item"><div class="anx-ico" aria-hidden="true">${a.type&&a.type.startsWith('image/')?'🖼️':'📄'}</div><div class="t"><b>${esc(a.name||'anexo')}</b><span>BM assinado · ${Math.max(1,Math.round((a.size||0)/1024))} KB · ${a.em?brdt(a.em):'—'}${a.usuario?' · '+esc(a.usuario):''}</span></div></div>
      <div class="row" style="gap:8px;margin-top:10px"><button class="btn sm" type="button" id="anxs-ver">Ver anexo</button>${pode?'<button class="btn sec sm" type="button" id="anxs-add">Substituir</button>':''}</div>`
     :`<div class="notice info small">Nenhum anexo neste BM.</div>${pode?'<button class="btn sm" type="button" id="anxs-add" style="margin-top:10px">📎 Anexar BM assinado</button>':''}`)+
    (porque?`<div class="small muted" style="margin-top:10px">${esc(porque)}</div>`:'')+'<div class="small muted" style="margin-top:8px">PDF ou imagem, até 10 MB.</div>';
  const v=$('anxs-ver');if(v)v.onclick=()=>viewAnexo(S.bms.find(x=>x.id===b.id));
  const ad=$('anxs-add');if(ad)ad.onclick=()=>{ATT_BM=b.id;$('bm-anexo-file').click()}}
$('anxs-close').onclick=()=>{$('anxs-modal').classList.remove('on');ANXS_BM=null};
$('anxs-modal').addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('anexo-modal').classList.contains('on')){e.preventDefault();$('anxs-modal').classList.remove('on');ANXS_BM=null}});
async function viewAnexo(b){
  $('anexo-title').textContent=`BM ${esc(b.numero)} assinado — ${b.anexo.name}`;
  $('anexo-body').innerHTML='<div class="small muted">Carregando…</div>';$('anexo-modal').classList.add('on');
  const {data,error}=await sb.storage.from('anexos').createSignedUrl(b.anexo.path,3600);
  if(error){$('anexo-body').innerHTML=`<div class="notice bad">Não foi possível abrir o anexo: ${esc(error.message)}</div>`;return}
  const url=data.signedUrl;
  $('anexo-body').innerHTML=`<div class="small muted" style="margin-bottom:8px">Anexado em ${brdt(b.anexo.em)} por ${esc(b.anexo.usuario)} · ${Math.round((b.anexo.size||0)/1024)} KB</div>${b.anexo.type.startsWith('image/')?`<img src="${esc(url)}" alt="BM assinado" style="width:100%;border-radius:8px;border:1px solid var(--line)">`:`<iframe src="${esc(url)}" style="width:100%;height:60vh;border:1px solid var(--line);border-radius:8px;background:#fff"></iframe>`}<div class="row" style="margin-top:10px"><a class="btn sec sm" href="${esc(url)}" target="_blank" rel="noopener" id="anexo-dl">Abrir / baixar</a>${can('sup.nf')?`<button class="btn danger sm" id="anexo-rm">Remover anexo</button>`:''}</div>`;
  $('anexo-dl').onclick=()=>{audit('bm.anexo_baixar',`BM ${esc(b.numero)} — ${b.anexo.name}`,{empresa:b.empresaNome,entidade:'BM '+b.numero});save()};
  const rm=$('anexo-rm');if(rm)rm.onclick=async()=>{const bb=S.bms.find(x=>x.id===b.id);if(!bb||!bb.anexo){$('anexo-modal').classList.remove('on');renderSup();return}const pth=bb.anexo.path;audit('bm.anexo_remover',`BM ${esc(bb.numero)} — ${bb.anexo.name}`,{empresa:bb.empresaNome,entidade:'BM '+bb.numero});delete bb.anexo;concluir('Anexo removido').then(ok=>{if(!ok||!pth)return;const at=S.bms.find(x=>x.id===bb.id);if(at&&at.anexo&&at.anexo.path===pth)return;try{sb.storage.from('anexos').remove([pth])}catch(e){}});$('anexo-modal').classList.remove('on');renderSup()};
}
$('anexo-close').onclick=()=>$('anexo-modal').classList.remove('on');
/* confirmação de exclusão: motivo obrigatório + escolha opcional */
function confirmDelete({titulo,resumo,opcoes,botao,onOk}){
  infoModal(titulo,`<div class="stack">${resumo}
    ${opcoes?`<div class="stack" id="del-opts" style="gap:8px">${opcoes.map((o,i)=>`<label class="card" style="display:flex;gap:10px;align-items:flex-start;padding:10px 12px;cursor:pointer;text-transform:none;letter-spacing:0;font-size:13px;color:var(--ink);margin:0"><input type="radio" name="del-opt" value="${esc(o.v)}" ${i===0?'checked':''} style="width:auto;margin-top:3px"><span><b>${o.t}</b><br><span class="muted">${o.d}</span></span></label>`).join('')}</div>`:''}
    <div class="field"><label for="del-motivo">Motivo da exclusão (obrigatório)</label><textarea id="del-motivo" rows="2"></textarea></div>
    <div id="del-err" class="notice bad" hidden></div>
    <div class="row" style="justify-content:flex-end"><button class="btn sec" id="del-cancel">Cancelar</button><button class="btn danger" id="del-go">${botao||'Excluir'}</button></div></div>`);
  $('del-cancel').onclick=()=>$('info-modal').classList.remove('on');
  let armed=false;
  $('del-go').onclick=async()=>{const motivo=$('del-motivo').value.trim();if(motivo.length<5){$('del-err').hidden=false;$('del-err').textContent='Informe o motivo (mínimo 5 caracteres).';return}
    if(!armed){armed=true;$('del-go').textContent='Confirmar exclusão definitiva';$('del-go').style.background='var(--bad)';$('del-go').style.color='#fff';return}
    const opt=(document.querySelector('input[name="del-opt"]:checked')||{}).value;$('del-go').disabled=true;
    try{await onOk(opt,motivo);$('info-modal').classList.remove('on');refreshBadges()}catch(e){$('del-err').hidden=false;$('del-err').textContent='Erro: '+(e.message||e);$('del-go').disabled=false}};
}
function infoModal(title,html){$('info-title').innerHTML=title;$('info-body').innerHTML=html;$('info-modal').classList.add('on')}
$('info-close').onclick=()=>$('info-modal').classList.remove('on');
$('bm-conferir').onclick=()=>abrirConferirAss();

/* ---- Emitir BM: empresa → restaurante, obra e contrato vinculados + período ---- */
/* vínculos da empresa: colaboradores (obra) × restaurantes que atendem a obra × contrato da obra, e o que já foi registrado */
function bmTuplas(empId){
  const T=new Map();const add0=(k,o,c)=>{if(!k||!o||!ctOk(k)||!obraOk(o))return;const key=k+'|'+o+'|'+c;if(!T.has(key))T.set(key,{k,o,c})};
  const add=(k,o,c)=>{const v=vincObra(obra(o));if(v!=='pedido')add0(k,o,c);if(v!=='contrato')add0(k,o,PED)};   // v2.9.12: modalidade da obra (contrato, pedido ou os dois)
  const obs=new Set();S.colab.forEach(c=>{if(c.empresaId===empId&&c.obraId)obs.add(c.obraId)});
  ctsAcessiveis().forEach(K=>(K.obras||[]).forEach(o=>{const O=obra(o)||{};if(O.ativo!==false&&(O.empresaId?O.empresaId===empId:obs.has(o)))add(K.id,o,cidOf(o)||SEM_CT)}));
  S.registros.forEach(r=>{if(r.empresaId===empId&&r.obraId)add(ctOf(r),r.obraId,cidReg(r))});
  (S.sobras||[]).forEach(s=>{if(s.empresaId===empId&&s.obraId)add(ctOf(s),s.obraId,cidReg(s))});
  return [...T.values()];
}
function bmCtLabel(c){if(c===PED)return 'Pedido';if(c===SEM_CT)return 'Sem contrato';const C=contrato(c);if(!C)return c;const st=contratoStatus(C);return C.numero+(st&&st!=='vigente'?` (${st})`:'')}
function bmOpcoes(mudou){
  const T=bmTuplas($('bm-emp').value);const sel={k:$('bm-ct').value,o:$('bm-obra').value,c:$('bm-contrato').value};
  // o campo que acabou de mudar manda: limpa os outros que ficaram incompatíveis com ele
  if(mudou&&sel[mudou])['k','o','c'].forEach(f=>{if(f!==mudou&&sel[f]&&!T.some(t=>t[mudou]===sel[mudou]&&t[f]===sel[f]))sel[f]=''});
  for(let volta=0;volta<3;volta++){
    ['k','o','c'].forEach(f=>{const vals=[...new Set(T.filter(t=>['k','o','c'].every(g=>g===f||!sel[g]||t[g]===sel[g])).map(t=>t[f]))];
      if(sel[f]&&!vals.includes(sel[f]))sel[f]='';if(!sel[f]&&vals.length===1)sel[f]=vals[0]});
  }
  const opts=f=>[...new Set(T.filter(t=>['k','o','c'].every(g=>g===f||!sel[g]||t[g]===sel[g])).map(t=>t[f]))];
  const nome={k:v=>(ct(v)||{}).nome||v,o:v=>(obra(v)||{}).nome||v,c:v=>v===PED?'Pedido':v===SEM_CT?'Sem contrato':'Contrato '+bmCtLabel(v)};
  [['k','bm-ct'],['o','bm-obra'],['c','bm-contrato']].forEach(([f,id])=>{const vs=opts(f).sort((a,b)=>String(nome[f](a)||'').localeCompare(String(nome[f](b)||'')));
    $(id).innerHTML=(vs.length>1?'<option value="">Selecione…</option>':vs.length?'':'<option value="">Nenhum vínculo</option>')+vs.map(v=>`<option value="${esc(v)}"${v===sel[f]?' selected':''}>${esc(nome[f](v)||'—')}</option>`).join('');
    $(id).value=sel[f]||'';$(id).disabled=!vs.length});
  $('bm-ped-wrap').hidden=$('bm-contrato').value!==PED;   // v2.9.12: nº do pedido
  previewBM();
}
/* =================== MEDIÇÕES EM ABERTO (v2.9.0) — passo 1 do Emitir BM ===================
   Refeições registradas e sobras ainda sem BM (e não "fechadas sem BM"), agrupadas como o BM é fechado — empresa × restaurante ×
   obra × contrato — e por semana, de segunda a domingo (como as folhas semanais). Semana encerrada = "Pendente"; semana atual =
   "Em andamento". Tocar numa medição abre a tela do Emitir BM já preenchida com ela. */
function bmPendentes(){
  const seg0=mondayOf(today()),G=new Map();const ativas=new Set(S.empresas.filter(e=>e.ativo!==false).map(e=>e.id));
  const put=(x,qtd,valor)=>{
    if(!x.empresaId||!x.obraId||!x.data||!ativas.has(x.empresaId))return;const k=ctOf(x);if(!ctOk(k)||!obraOk(x.obraId))return;
    const c=vincObra(obra(x.obraId))==='pedido'?PED:cidReg(x),de=mondayOf(x.data),key=[x.empresaId,k,x.obraId,c,de].join('|');   // v2.9.12: obra por pedido — uma medição por obra
    let g=G.get(key);if(!g)G.set(key,g={e:x.empresaId,k,o:x.obraId,c,de,ate:addDays(de,6),qtd:0,valor:0,obraNome:x.obraNome||'',empNome:x.empresaNome||''});
    g.qtd+=qtd;g.valor+=valor};
  S.registros.forEach(r=>{if(!r.bmId&&!r.fechado)put(r,1,+r.valor||0)});
  (S.sobras||[]).forEach(s=>{if(!s.bmId&&(s.qtd||0)>0)put(s,s.qtd,sobraUnit(s)*s.qtd)});
  return [...G.values()].map(g=>{const O=obra(g.o),E=emp(g.e),K=ct(g.k);
    g.obraNome=(O&&O.nome)||g.obraNome||'—';g.empNome=(E&&E.nome)||g.empNome||'—';g.ctNome=(K&&K.nome)||'';
    g.vinc=vincObra(O);const amb=g.vinc==='ambos'&&g.c!==PED?' ou pedido':'';
    g.ctRot=g.c===PED?'Pedido':(g.c===SEM_CT?'Sem contrato':'Contrato Nº '+bmCtLabel(g.c))+amb;g.modRot=g.c===PED?'Pedido':(g.c===SEM_CT?'Sem contrato':bmCtLabel(g.c))+amb;g.valor=Math.round(g.valor*100)/100;
    g.st=g.de<seg0?'pend':'and';g.atraso=g.st==='pend'?Math.floor((parse(today())-parse(g.ate))/(7*864e5)):0;   // semanas inteiras desde o domingo
    // semana que já tem BM (refeições lançadas depois do fechamento): avisa qual
    g.bms=S.bms.filter(b=>b.empresaId===g.e&&ctOf(b)===g.k&&(b.obraId||'')===g.o&&(bmModC(b)===g.c||(g.vinc==='ambos'&&bmPed(b)))&&b.ini<=g.ate&&b.fim>=g.de).map(b=>b.numero).sort((a,b)=>a-b);
    return g})
   .sort((a,b)=>(a.st===b.st?0:a.st==='pend'?-1:1)||(a.de<b.de?-1:a.de>b.de?1:0)||a.empNome.localeCompare(b.empNome)||a.obraNome.localeCompare(b.obraNome)||a.ctRot.localeCompare(b.ctRot)||a.ctNome.localeCompare(b.ctNome));
}
function bmpD(d){return d.slice(0,4)===today().slice(0,4)?br(d).slice(0,5):br(d)}
function bmpN(n){return `${n} ${n>1?'medições pendentes':'medição pendente'}`}
const BMP_CHEV='<svg class="bmp-chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
let BMP=[];
function bmPasso(n){$('bm-passo1').hidden=n!==1;$('bm-passo2').hidden=n!==2;{const sh=$('emp-modal').querySelector('.sheet');if(sh)sh.classList.toggle('bmx-larga',n===2)}$('emp-titulo').textContent=n===1?'Emitir BM — medições em aberto':'Emitir BM';
  const sh=$('emp-modal').querySelector('.sheet');if(sh)sh.scrollTop=0}
function bmpPill(g){return g.st==='and'?'<span class="pill neutral">Em andamento</span>':g.atraso>=1?`<span class="pill bad">Pendente há ${g.atraso} ${g.atraso>1?'semanas':'semana'}</span>`:'<span class="pill warn">Pendente</span>'}
function renderBmPend(){
  BMP=bmPendentes();const pend=BMP.filter(g=>g.st==='pend'),and=BMP.filter(g=>g.st==='and');const dom=addDays(mondayOf(today()),6);
  const item=g=>`<button type="button" class="bmp-item ${g.st}" data-bmp="${BMP.indexOf(g)}"><span class="bmp-t"><b>${esc(g.ctRot)} — Obra ${esc(g.obraNome)}</b>`
    +`<span class="bmp-per">Período: <b class="num">${bmpD(g.de)} à ${bmpD(g.ate)}</b> · <span class="num">${num(g.qtd)}</span> ${g.qtd>1?'refeições':'refeição'} · <span class="num">${money(g.valor)}</span></span>`
    +`<span class="bmp-sub">${esc(g.empNome)}${g.ctNome?' · '+esc(g.ctNome):''}${g.bms.length?` · <em>lançada(s) depois do BM nº ${g.bms.map(esc).join(', ')}</em>`:''}</span></span>${bmpPill(g)}${BMP_CHEV}</button>`;
  const sec=(t,sub,l)=>l.length?`<section class="bmp-sec"><h3>${t} <span class="bmp-n">${l.length}</span></h3><p class="small muted">${sub}</p><div class="bmp-list">${l.map(item).join('')}</div></section>`:'';
  const topo=!BMP.length?'<div class="notice ok">Nenhuma medição em aberto: todas as refeições registradas já estão em BM.</div>'
    :`<div class="notice ${pend.length?'warn':'info'}">${pend.length?`<b>${bmpN(pend.length)}</b> de fechamento (semana encerrada)`:'Nenhuma medição pendente de semana encerrada'}${and.length?` · ${and.length} em andamento (semana atual)`:''}. Toque numa medição para conferir e fechar o BM.</div>`;
  const h=topo+sec('Pendentes','Semanas já encerradas, com refeições ainda sem BM.',pend)+sec('Em andamento',`Semana atual — termina no domingo, ${bmpD(dom)}.`,and);
  const B=$('bmp-body');if(B._h===h)return;B._h=h;B.innerHTML=h;   // a recarga automática (45 s) não redesenha à toa
  B.querySelectorAll('[data-bmp]').forEach(b=>b.onclick=()=>bmEscolher(BMP[+b.dataset.bmp]));
}
function bmEscolher(g){
  if(!g)return;const ativas=S.empresas.filter(e=>e.ativo!==false);fillSelect($('bm-emp'),ativas,g.e);
  $('bm-pedido').value='';
  [['bm-ct',g.k],['bm-obra',g.o],['bm-contrato',g.vinc==='ambos'?'':g.c]].forEach(([id,v])=>{$(id).innerHTML=`<option value="${esc(v)}"></option>`;$(id).value=v});
  $('bm-ini').value=g.de;$('bm-fim').value=g.ate;
  const sel=$('bm-sel');sel.hidden=false;sel.className='notice small '+(g.st==='pend'?'warn':'info');
  sel.innerHTML=`<b>${esc(g.ctRot)} — Obra ${esc(g.obraNome)}</b> · ${bmpD(g.de)} à ${bmpD(g.ate)} · ${g.st==='pend'?'pendente':'em andamento — a semana ainda não terminou: o que for lançado depois fica para outro BM'}.`;
  if(g.vinc==='ambos')sel.innerHTML+=' <b>Esta obra mede por contrato ou por pedido: escolha a modalidade.</b>';
  bmPasso(2);bmOpcoes();const go=$('bm-emit-go');if(go&&!go.disabled)go.focus();
}
function bmManual(){
  const ativas=S.empresas.filter(e=>e.ativo!==false);
  fillSelect($('bm-emp'),ativas,$('f-emp').value||ativas[0].id);
  $('bm-ct').innerHTML=`<option value="${esc($('f-ct').value||'')}"></option>`;$('bm-ct').value=$('f-ct').value||'';$('bm-obra').value='';$('bm-contrato').value='';$('bm-pedido').value='';
  $('bm-ini').value=WK;$('bm-fim').value=WK_FIM||addDays(WK,6);$('bm-sel').hidden=true;
  bmPasso(2);bmOpcoes('k');
}
/* aviso no Administrativo + contador no botão Emitir BM */
function bmPendAviso(){
  const np=can('sup.bm')&&S.empresas.length?bmPendentes().filter(g=>g.st==='pend').length:0;
  const bb=$('bm-pend-b');bb.hidden=!np;bb.textContent=np||'';$('btn-emitir').title=np?bmpN(np)+' de fechamento':'';
  const sp=$('sup-pend');sp.hidden=!np;
  if(np){sp.innerHTML=`<b>${bmpN(np)}</b> de fechamento — semana(s) já encerrada(s), com refeições ainda sem BM. <button type="button" class="link" id="sup-pend-ver">Ver medições em aberto</button>`;$('sup-pend-ver').onclick=openEmitir}
  if($('emp-modal').classList.contains('on')&&!$('bm-passo1').hidden)renderBmPend();
}
function openEmitir(){
  const ativas=S.empresas.filter(e=>e.ativo!==false);if(!ativas.length){toast('Nenhuma empresa ativa');return}
  if(!ctsAcessiveis().length){toast('Cadastre uma contratada (restaurante) em Configurações');return}
  renderBmPend();bmPasso(1);$('emp-modal').classList.add('on');   // v2.9.0: começa pela lista das medições em aberto
  const f=$('bmp-body').querySelector('[data-bmp]')||$('bmp-outro');if(f)f.focus();
}
function bmEscolha(){return {ini:$('bm-ini').value,fim:$('bm-fim').value,empId:$('bm-emp').value,ctId:$('bm-ct').value,obraId:$('bm-obra').value,cid:$('bm-contrato').value,pedido:pedNorm($('bm-pedido').value)}}
function previewBM(){try{return previewBM0()}finally{try{bmxPrevia()}catch(e){console.error(e)}}}   // v3.0.1: prévia do boletim ao lado
function previewBM0(){
  const {ini,fim,empId,ctId,obraId,cid}=bmEscolha();const msg=$('bm-prev-msg');
  const falta=[!ctId&&'restaurante',!obraId&&'obra',!cid&&'a modalidade (contrato ou pedido)'].filter(Boolean);
  if(falta.length){$('bm-prev-tiles').innerHTML='';msg.hidden=false;msg.className='notice warn small';msg.textContent=bmTuplas(empId).length?`Selecione ${falta.join(', ').replace(/, ([^,]*)$/,' e $1')} — o BM é fechado por empresa, restaurante, obra e modalidade (contrato ou pedido).`:'Esta empresa não tem obra vinculada (colaboradores ou registros) a um restaurante que você acessa.';$('bm-emit-go').disabled=true;return}
  if(!ini||!fim||fim<ini){$('bm-prev-tiles').innerHTML='';msg.hidden=false;msg.className='notice bad small';msg.textContent='Informe um período válido (fim igual ou posterior ao início).';$('bm-emit-go').disabled=true;return}
  const all=periodItens(ini,fim,empId,ctId,obraId,cid===PED?'':cid);/* v2.9.12: por pedido — todas as refeições em aberto da obra */const livres=all.filter(r=>!r.bmId&&!r.fechado);const fechadas=all.filter(r=>r.fechado&&!r.bmId).length;const presos=all.length-livres.length-fechadas;const nsob=livres.filter(r=>r.sobra).length;const nterc=livres.filter(r=>!r.sobra&&modOf(r)==='terceirizado').length;
  $('bm-prev-tiles').innerHTML=TIPOS.map(t=>{const l=livres.filter(r=>r.tipo===t.id);return `<div class="tile ${t.id}"><div class="k">${t.curto}</div><div class="v num">${l.length}</div><div class="s num">${money(l.reduce((s,r)=>s+r.valor,0))}</div></div>`}).join('')+`<div class="tile total"><div class="k">Total</div><div class="v num">${livres.length}</div><div class="s num">${money(livres.reduce((s,r)=>s+r.valor,0))}</div></div>`;
  const dias=Math.round((parse(fim)-parse(ini))/864e5)+1;
  let t=`${dias} dia(s) · ${livres.length} refeições em aberto${nsob||nterc?` (inclui ${[nsob&&nsob+' de sobras',nterc&&nterc+' de terceirizados'].filter(Boolean).join(' e ')})`:''}.`;if(presos)t+=` ${presos} refeição(ões) do período já pertencem a outro BM e ficam de fora.`;if(fechadas)t+=` ${fechadas} refeição(ões) fechada(s) sem BM também ficam de fora.`;
  msg.hidden=false;msg.className='notice '+(livres.length?'info':'warn')+' small';msg.textContent=t;
  $('bm-emit-go').disabled=!livres.length||dias>62;if(dias>62){msg.className='notice bad small';msg.textContent='Período máximo de 62 dias.'}
  if(cid&&cid!==PED&&cid!==SEM_CT&&livres.length&&dias<=62){const C=contrato(cid);   // v2.9.12: aviso (não bloqueia) — período fora da vigência do contrato
    if(C&&((C.fim&&fim>C.fim)||(C.inicio&&ini<C.inicio))){msg.className='notice warn small';msg.textContent+=` Atenção: a vigência do contrato ${C.numero} é de ${C.inicio?br(C.inicio):'…'} a ${C.fim?br(C.fim):'…'} — o período escolhido passa dela.`}}
  if(cid===PED&&livres.length&&dias<=62){const {pedido}=bmEscolha(),dup=pedDuplicado(empId,pedido);   // v2.9.12
    if(!pedido){msg.className='notice warn small';msg.textContent=t+' Informe o Nº do pedido desta medição — é um número novo a cada BM.';$('bm-emit-go').disabled=true}
    else if(dup){msg.className='notice bad small';msg.textContent=`O pedido nº ${pedido} já foi usado no BM nº ${dup.numero} (${dup.obraNome||dup.empresaNome}) — cada medição tem um pedido novo.`;$('bm-emit-go').disabled=true}}
}
$('bm-emp').onchange=()=>{$('bm-ct').value='';$('bm-obra').value='';$('bm-contrato').value='';bmOpcoes()};
$('bm-ct').onchange=()=>bmOpcoes('k');$('bm-obra').onchange=()=>bmOpcoes('o');$('bm-contrato').onchange=()=>bmOpcoes('c');
['bm-ini','bm-fim'].forEach(id=>$(id).onchange=previewBM);$('bm-pedido').oninput=previewBM;
document.querySelectorAll('#emp-modal [data-q]').forEach(b=>b.onclick=()=>{
  const t=today();const q=b.dataset.q;let ini,fim;
  if(q==='semana'){ini=mondayOf(t);fim=addDays(ini,6)}
  else if(q==='semana-ant'){ini=addDays(mondayOf(t),-7);fim=addDays(ini,6)}
  else if(q==='quinzena'){fim=t;ini=addDays(t,-14)}
  else{const d=parse(t);const first=new Date(d.getFullYear(),d.getMonth()-1,1);const last=new Date(d.getFullYear(),d.getMonth(),0);ini=ymd(first);fim=ymd(last)}
  $('bm-ini').value=ini;$('bm-fim').value=fim;previewBM();
});
$('bm-emit-go').onclick=()=>{const e=bmEscolha();if(!e.ctId||!e.obraId||!e.cid)return;if(e.cid===PED&&(!e.pedido||pedDuplicado(e.empId,e.pedido))){previewBM();return}$('emp-modal').classList.remove('on');const nb=buildBM(e.ini,e.fim,e.empId,e.ctId,e.obraId,e.cid,e.pedido);audit('bm.emitir',`BM ${esc(nb.numero)} — ${nb.empresaNome} — ${nb.obraNome} (${bmModTxt(nb)}) — ${nb.contratadaNome} — ${br(nb.ini)} à ${br(nb.fim)} — ${esc(nb.qtd)} refeições — ${money(nb.valor)}`,{empresa:nb.empresaNome,obra:nb.obraNome,entidade:'BM '+nb.numero});if(can('sup.boletins')){SUP_ABA='bol';try{localStorage.setItem('sismed_sup_aba','bol')}catch(e){}}concluir(`Rascunho do BM nº ${esc(nb.numero)} gerado — confira a lista e feche o BM`);openBM(nb)};
$('emp-close').onclick=()=>$('emp-modal').classList.remove('on');
$('bmp-outro').onclick=bmManual;$('bmp-voltar').onclick=()=>{renderBmPend();bmPasso(1);const f=$('bmp-body').querySelector('[data-bmp]')||$('bmp-outro');if(f)f.focus()};

/* ---- BM build ---- */
function buildBM(ini,fim,empId,ctId,obraId,cid,pedido){
  const ped=cid===PED;if(ped)cid='';   // v2.9.12: BM por pedido — todas as refeições em aberto da obra, sem contrato, sem acumulado nem saldo
  const E=emp(empId);const C=ct(ctId)||{};const O=obra(obraId)||{};const CT=cid&&cid!==SEM_CT?contrato(cid):null;
  const NUM=bmNumLivre(E,obraId,ped?'ped':(cid||''))||E.proximoBM||1;   // v3.1.4
  const regs=periodItens(ini,fim,empId,ctId,obraId,cid).filter(r=>!r.bmId&&!r.fechado);
  const contr=ped?{}:(E.contrato||{});
  // acumulado anterior: BMs anteriores da empresa com o mesmo restaurante (a quantidade contratada fica no cadastro da empresa)
  const prev=new Set(ped?[]:S.bms.filter(x=>!bmPed(x)&&x.empresaId===empId&&ctOf(x)===ctId&&x.numero<NUM).map(x=>x.id));   // v2.9.12: medições por pedido não consomem o saldo do contrato
  const antesAll=S.registros.filter(r=>r.bmId&&prev.has(r.bmId)).concat(...(S.sobras||[]).filter(s=>s.bmId&&prev.has(s.bmId)).map(sobraUnits));
  const itens=TIPOS.map((t,i)=>{
    const c=contr[t.id]||{};const antes=antesAll.filter(r=>r.tipo===t.id);
    const acumQtd=(c.acumQtd||0)+antes.length;const acumVal=(c.acumVal||0)+antes.reduce((s,r)=>s+r.valor,0);
    const atual=regs.filter(r=>r.tipo===t.id);const atualQtd=atual.length;const atualVal=atual.reduce((s,r)=>s+r.valor,0);
    const preco=atual.length?atual[atual.length-1].valor:precoVigente(t.id,fim,cid&&cid!==SEM_CT?cid:cidOf(obraId));const qtdCt=c.qtd||null;const totalCt=qtdCt&&preco!==null?Math.trunc(qtdCt*preco*100)/100:null;
    return {tipo:t.id,item:'1.'+(i+1),preco,qtdCt,totalCt,acumQtd,acumVal,atualQtd,atualVal,totAcQtd:acumQtd+atualQtd,totAcVal:acumVal+atualVal,saldoQtd:qtdCt!==null?qtdCt-acumQtd-atualQtd:null,saldoVal:totalCt!==null?totalCt-acumVal-atualVal:null};
  });
  const dias=[];for(let d=ini;d<=fim;d=addDays(d,1)){const l=regs.filter(r=>r.data===d);dias.push({d,porTipo:TIPOS.map(t=>l.filter(r=>r.tipo===t.id).length),total:l.length,valor:l.reduce((s,r)=>s+r.valor,0)})}
  const obrasN=[...new Set(regs.map(r=>r.obraNome))];
  const obras=obrasN.map(o=>{const l=regs.filter(r=>r.obraNome===o);return {o,porTipo:TIPOS.map(t=>l.filter(r=>r.tipo===t.id).length),total:l.length,valor:l.reduce((s,r)=>s+r.valor,0)}});
  const valor=regs.reduce((s,r)=>s+r.valor,0);const sobU=regs.filter(r=>r.sobra);
  return {id:uid(),sobrasQtd:sobU.length,sobrasValor:sobU.reduce((s,r)=>s+r.valor,0),numero:NUM,empresaId:empId,empresaNome:E.nome,empresaCnpj:E.cnpj||'',obraId:obraId||null,obraNome:O.nome||'',contratoId:cid||null,contratoNumero:CT?CT.numero:cid===SEM_CT?'sem contrato':'',...(ped?{vinculo:'pedido',pedido:pedNorm(pedido)}:{}),contratadaId:ctId,contratadaNome:C.nome||'',contratadaCnpj:C.cnpj||'',gestor:O.gestor||'',cargo:O.gestorCargo||'',servico:C.servico||'FORNECIMENTO DE REFEIÇÕES',ini,fim,itens,dias,obras,qtd:regs.length,valor,deducoes:0,adiant:0,liquido:valor,status:'rascunho',emitidoEm:new Date().toISOString(),usuario:USER.nome,nf:'',obs:'',assRest:null,assSup:null};
}
/* Quem assina o BM pela empresa é o Gestor / Engenheiro da OBRA (Configurações › Obras) — nunca o gestor cadastrado no restaurante.
   Enquanto a assinatura não é registrada vale o cadastro atual da obra; depois de registrada, vale o nome que assinou. */
function bmObraId(b){if(b.obraId)return b.obraId;   // BM antigo, sem obra gravada: vale a obra das refeições, se for uma só
  const ids=[...new Set(S.registros.filter(r=>r.bmId===b.id).map(r=>r.obraId).filter(Boolean))];return ids.length===1?ids[0]:null}
function bmGestor(b){
  if(b.assSup&&(b.status==='assinado'||b.status==='faturado'))return {gestor:b.gestor||'',cargo:b.cargo||''};
  const O=obra(bmObraId(b))||{};return {gestor:O.gestor||'',cargo:O.gestorCargo||''}}
function bmK(b){const C=ct(ctOf(b))||{};const L=S.contratada||{};return {nome:b.contratadaNome||C.nome||L.nome||'',cnpj:b.contratadaCnpj||C.cnpj||L.cnpj||'',...bmGestor(b),servico:b.servico||C.servico||L.servico||'FORNECIMENTO DE REFEIÇÕES'}}
let BM=null, BMTAB='bm'; const LISTA_VISTA=new Set();
function openBM(b){BM=b;BMTAB='bm';   // v3.0.0: rascunho = última escolha deste aparelho (V2 se nunca escolheu); BM fechado = o formato gravado (antigo = V1)
  BMFMT=b.status==='rascunho'?(b.formato==='v1'||b.formato==='v2'?b.formato:bmFmtPref()):(b.formato==='v2'?'v2':'v1');if(b.status==='rascunho')b.formato=BMFMT;renderBM();$('bm-modal').classList.add('on');$('bm-modal').querySelector('.sheet').scrollTop=0}
const TIPO_ORD={cafe:0,almoco:1,jantar:2,lanche:3};
function bmRegs(b){
  const l=b.status==='rascunho'?periodRegs(b.ini,b.fim,b.empresaId,ctOf(b),b.obraId,b.contratoId).filter(r=>!r.bmId&&!r.fechado):S.registros.filter(r=>r.bmId===b.id);
  return l.sort((a,c)=>a.data<c.data?-1:a.data>c.data?1:(TIPO_ORD[a.tipo]-TIPO_ORD[c.tipo])||(a.registradoEm<c.registradoEm?-1:1));
}
function bmSobras(b){
  const l=b.status==='rascunho'?periodSobras(b.ini,b.fim,b.empresaId,ctOf(b),b.obraId,b.contratoId).filter(s=>!s.bmId):(S.sobras||[]).filter(s=>s.bmId===b.id);
  return l.sort((a,c)=>a.data<c.data?-1:a.data>c.data?1:(a.registradoEm<c.registradoEm?-1:1));
}
function bmQtdLista(b){return bmRegs(b).length+bmSobras(b).reduce((a,s)=>a+s.qtd,0)}
function bmGrupos(b){
  const g=[];const regs=bmRegs(b),sob=bmSobras(b);
  for(let d=b.ini;d<=b.fim;d=addDays(d,1))TIPOS.forEach(t=>{const l=regs.filter(r=>r.data===d&&r.tipo===t.id);const so=sob.filter(s=>s.data===d&&s.tipo===t.id);if(l.length||so.length)g.push({d,tipo:t,regs:l,sobras:so,total:l.length+so.reduce((a,s)=>a+s.qtd,0)})});
  return g;
}
function sobraLinha(s){return `Sobra — ${esc(s.qtd)} ${s.qtd===1?'refeição':'refeições'}${s.colabNome?' · '+s.colabNome:''}`}
function sobraAssTxt(s){return `Sobra informada · ${hm(s.registradoEm)} · por ${s.usuario}`}
// v2.8.9: sem o número do QR Code; na retirada, quem retirou e para quem
function retInfoBM(r){const x=r.retiradoPor||{};return `retirou: ${x.nome||'—'}${x.qr?'':' (digitado)'} · para: ${r.nome||'—'}`}
function assinaturaTxt(r){const m=modOf(r);if(m==='retirada')return `Retirada · ${hm(r.registradoEm)} · ${retInfoBM(r)} · lançado por ${r.usuario}`;return m==='terceirizado'?`Manual · ${hm(r.registradoEm)} · ${r.terceirizada?'terc.: '+r.terceirizada+' · ':''}por ${r.usuario}`:`QR Code · ${hm(r.registradoEm)}`}
/* terceirizados: separados por empresa terceirizada (no boletim, na lista e no PDF) */
function tercNome(r){return String(r.terceirizada||'').trim()||'Empresa não informada'}
function tercGrupos(regs){const m=new Map();regs.filter(r=>modOf(r)==='terceirizado').forEach(r=>{const k=tercNome(r);const a=m.get(k)||{nome:k,porTipo:TIPOS.map(()=>0),total:0,valor:0};const ix=TIPOS.findIndex(t=>t.id===r.tipo);if(ix>=0)a.porTipo[ix]++;a.total++;a.valor+=r.valor||0;m.set(k,a)});return [...m.values()].sort((a,b)=>a.nome.localeCompare(b.nome))}
function listaLinhas(regs){const out=[];let i=0;regs.filter(r=>modOf(r)!=='terceirizado').forEach(r=>out.push({i:++i,r}));
  const g=new Map();regs.filter(r=>modOf(r)==='terceirizado').forEach(r=>{const k=tercNome(r);if(!g.has(k))g.set(k,[]);g.get(k).push(r)});
  [...g.keys()].sort((a,b)=>a.localeCompare(b)).forEach(k=>{out.push({sub:k,n:g.get(k).length});g.get(k).forEach(r=>out.push({i:++i,r}))});return out}
function renderLista(b){
  const FT=can('fotos.ver');   // v2.9.4: coluna "Foto" só na tela (o PDF do BM não muda)
  const g=bmGrupos(b);const tot=g.reduce((s,x)=>s+x.total,0);const ts=g.reduce((s,x)=>s+x.sobras.reduce((a,o)=>a+o.qtd,0),0);
  if(!g.length)return '<div class="notice warn">Nenhuma refeição no período.</div>';
  return `<div class="notice info small" style="margin-bottom:10px">${tot} refeições em ${g.length} lista(s) por dia e tipo${ts?`, das quais <b>${ts} são sobras</b>`:''}. <b>Assinatura digital</b> = leitura do QR Code do crachá do colaborador; <b>retirada</b> = refeição levada por outro colaborador, identificado pelo QR Code do crachá (ou digitado); registros <b>manuais</b> são de terceirizados sem crachá, lançados pelo restaurante; <b>sobras</b> são refeições preparadas e não consumidas, informadas pelo restaurante e cobradas.</div>`+
  g.map((x,i)=>`<div class="card" style="margin-bottom:10px"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${i+1}. ${br(x.d)} — ${x.tipo.curto}</h3><span class="pill ${x.tipo.id}">${esc(x.total)} refeições</span></div>
    <div class="tablewrap" style="margin-top:8px"><table><thead><tr><th>#</th><th>Colaborador</th><th>Obra</th><th>Assinatura digital</th>${FT?'<th class="lista-foto">Foto</th>':''}</tr></thead><tbody>
    ${listaLinhas(x.regs).map(l=>l.sub?`<tr class="subgrp"><td colspan="${FT?5:4}">Terceirizada: <b>${esc(l.sub)}</b> · ${l.n} ${l.n===1?'refeição':'refeições'}</td></tr>`:`<tr><td class="num">${l.i}</td><td>${esc(l.r.nome)}${modOf(l.r)!=='presencial'?' '+modPill(l.r):''}</td><td>${esc(l.r.obraNome||'—')}</td><td class="small">${modOf(l.r)==='retirada'?'<span class="pill warn">Retirada</span>':modOf(l.r)==='terceirizado'?'<span class="pill warn">Manual</span>':'<span class="pill ok">✓ QR Code</span>'} <span class="muted">${esc(modOf(l.r)==='presencial'?hm(l.r.registradoEm):assinaturaTxt(l.r).replace(/^(Manual|Retirada) · /,''))}</span></td>${FT?`<td class="lista-foto">${l.r.foto?`<button type="button" class="btn sec sm" data-lfoto="${esc(l.r.id)}" aria-label="Ver a foto do registro de ${esc(l.r.nome)}">📷 Ver</button>`:`<span class="small muted">${l.r.retro?'retroativo':'sem foto'}</span>`}</td>`:''}</tr>`).join('')}
    ${x.sobras.map((s,k)=>`<tr><td class="num">${x.regs.length+k+1}</td><td>${esc(sobraLinha(s))} <span class="pill warn">sobra</span></td><td>${esc(s.obraNome||'—')}</td><td class="small"><span class="pill neutral">Sobra</span> <span class="muted">${esc(sobraAssTxt(s).replace(/^Sobra informada · /,''))}</span></td>${FT?'<td class="lista-foto"></td>':''}</tr>`).join('')}
    </tbody></table></div></div>`).join('');
}
$('bm-close').onclick=()=>$('bm-modal').classList.remove('on');
function stampHtml(a,who,id){
  if(!a)return `<div class="stamp pend">Aguardando assinatura<small>${who}</small></div>`;
  return `<div class="stamp">${a.tipo==='eletronica'?'Assinado eletronicamente':'Assinatura física homologada'}<small>${esc(a.usuario)} · ${brdt(a.em)}${a.tipo==='fisica'?' · homologado por '+esc(a.por):''}</small>${id?`<small class="stamp-id" title="ID único desta assinatura — confira em Conferir assinatura (ID)">ID ${esc(id)}</small>`:''}</div>`;
}
/* ---- ficha, comprovante e conferência da assinatura pelo ID ---- */
function assUsuario(a){const el=a.tipo==='eletronica',cod=el?a.usuarioId:a.porId,nome=el?a.usuario:a.por;const L=S.users||[];
  if(cod)return L.find(x=>x.id===cod)||null;const l=nome?L.filter(x=>x.nome===nome):[];return l.length===1?l[0]:null}
function assFichaHtml(m){const b=m.b,a=m.a,el=a.tipo==='eletronica',u=assUsuario(a);
  return `<div class="ass-kv">
    <span>ID da assinatura</span><span class="ass-id">${esc(assId(b,m.papel))}</span>
    <span>Boletim</span><span><b>BM nº ${esc(b.numero)}</b> — ${esc(b.empresaNome)}${b.obraNome?' — '+esc(b.obraNome):''}</span>
    <span>Período</span><span>${br(b.ini)} à ${br(b.fim)} · ${money(b.liquido)}</span>
    <span>Assinatura de</span><span>${ASS_PAPEL[m.papel].nome}</span>
    <span>Forma</span><span>${el?'Eletrônica — feita pelo próprio usuário no sistema':'Física, no BM impresso — registrada no sistema'}</span>
    <span>Assinado por</span><span><b>${esc(a.usuario)}</b></span>
    ${el?'':`<span>Registrada por</span><span>${esc(a.por||'—')}</span>`}
    ${u?`<span>Usuário (login)</span><span class="mono">${esc((u.login||'').toUpperCase())}</span>`:''}
    ${m.papel==='sup'&&b.gestor&&(el||b.gestor!==a.usuario)?`<span>Gestor / Engenheiro da obra</span><span>${esc(b.gestor)}${b.cargo?' — '+esc(b.cargo):''}</span>`:''}
    <span>Data e hora</span><span>${brdt(a.em)}</span>
    <span>Situação do BM</span><span>${statusPill(b)}</span>
  </div>`}
function assComprovante(b,papel){const P=ASS_PAPEL[papel];const a=b&&P?b[P.k]:null;if(!a)return;
  infoModal('Assinatura registrada',`<div class="notice ok">Sua assinatura foi registrada com o ID <b class="ass-id">${esc(assId(b,papel))}</b>.</div>${assFichaHtml({b,papel,a})}
    <p class="small muted" style="margin-bottom:0">O mesmo ID sai no carimbo do BM (na tela e no PDF). Para conferir depois, abra o menu do seu usuário e escolha <b>Conferir assinatura (ID)</b>.</p>`)}
function abrirConferirAss(){
  infoModal('Conferir assinatura (ID)',`<p class="small muted" style="margin-top:0">Digite o ID que aparece no carimbo da assinatura do BM, na tela ou no PDF impresso.</p>
    <div class="row" style="flex-wrap:nowrap;align-items:flex-end"><div class="field" style="flex:1"><label for="ass-id-in">ID da assinatura</label><input id="ass-id-in" class="mono" maxlength="14" placeholder="XXXX-XXXX-XXXX" autocomplete="off" autocapitalize="characters" spellcheck="false"></div><button class="btn" id="ass-id-go" type="button">Conferir</button></div>
    <div id="ass-id-res" style="margin-top:12px" aria-live="polite"></div>`);
  const i=$('ass-id-in'),R=$('ass-id-res');
  i.oninput=()=>{const c=i.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,12);i.value=c.replace(/(.{4})(?=.)/g,'$1-')};
  const go=()=>{const c=i.value.toUpperCase().replace(/[^A-Z0-9]/g,'');
    if(c.length!==12||Array.from(c).some(x=>!ASS_ALFA.includes(x))){R.innerHTML=`<div class="notice warn">O ID tem 12 caracteres, no formato <span class="ass-id">XXXX-XXXX-XXXX</span>. Ele não usa as letras I e O nem os números 0 e 1 — confira o que foi digitado.</div>`;return}
    const id=assFmt(c),l=assAchar(id);
    if(l.length===1){const m=l[0],pode=can('sup.ver')||can('rest.validar');
      R.innerHTML=`<div class="notice ok"><b>Assinatura válida.</b> Este ID pertence a uma única assinatura, registrada no sistema:</div>${assFichaHtml(m)}${pode?'<div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn sec sm" id="ass-id-abrir" type="button">Abrir o BM</button></div>':''}`;
      if(pode)$('ass-id-abrir').onclick=()=>{$('info-modal').classList.remove('on');openBM(m.b)};
      audit('ass.conferir',`ID ${id} — válida: BM ${m.b.numero} — ${m.b.empresaNome} — ${ASS_PAPEL[m.papel].nome} — ${m.a.usuario}`,{empresa:m.b.empresaNome,entidade:'BM '+m.b.numero})}
    else if(l.length>1){R.innerHTML=`<div class="notice bad"><b>ID repetido.</b> O ID ${esc(id)} aparece em ${l.length} assinaturas (${l.map(m=>'BM nº '+esc(m.b.numero)+' — '+esc(m.b.empresaNome)).join('; ')}). Um ID vale para uma assinatura só: avise o administrador.</div>`;
      audit('ass.conferir',`ID ${id} — repetido em ${l.length} assinaturas`,{})}
    else if(assAcharRem(id).length){const m=assAcharRem(id)[0],a=m.a;
      R.innerHTML=`<div class="notice bad"><b>Assinatura removida — não vale mais.</b> O ID ${esc(id)} foi de uma assinatura do ${esc((ASS_PAPEL[m.papel]||{}).nome||'—')} no <b>BM nº ${esc(m.b.numero)}</b> — ${esc(m.b.empresaNome)}, feita por ${esc(a.usuario||'—')}${a.em?' em '+brdt(a.em):''}, e <b>removida</b> em ${brdt(a.removidaEm)} por ${esc(a.removidaPor||'—')}. Motivo: “${esc(a.motivo||'—')}”.</div>`;
      audit('ass.conferir',`ID ${id} — assinatura removida: BM ${m.b.numero} — ${m.b.empresaNome}`,{empresa:m.b.empresaNome,entidade:'BM '+m.b.numero})}
    else{R.innerHTML=`<div class="notice warn"><b>Nenhuma assinatura com o ID ${esc(id)}</b> nos boletins que o seu perfil pode ver. Confira os caracteres digitados; se estiverem certos, a assinatura não consta no sistema.</div>`;
      audit('ass.conferir',`ID ${id} — não encontrada`,{})}
    save()};
  $('ass-id-go').onclick=go;i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();go()}};setTimeout(()=>{try{i.focus()}catch(e){}},60)}
function renderBM(){
  const b=BM,K=bmK(b),E=emp(b.empresaId);const mes=parse(b.ini).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}).toUpperCase();
  const isDraft=b.status==='rascunho';const st=b.status;
  b.liquido=b.valor-(b.deducoes||0)-(b.adiant||0);
  $('bm-title').textContent=`BM nº ${esc(b.numero)} — ${b.empresaNome}${b.obraNome?' · '+b.obraNome:''}`;
  const TG=tercGrupos(bmRegs(b));
  const tot=k=>b.itens.reduce((s,i)=>s+(i[k]||0),0);const anyCt=b.itens.some(i=>i.qtdCt!==null);
  const dash=v=>v===null||v===undefined?'—':v;
  const order=['rascunho','fechado','assinado_restaurante','assinado','faturado'];const idx=order.indexOf(st);
  const steps=[['Emitido','rascunho'],['Fechado → Restaurante','fechado'],['Assinado Restaurante','assinado_restaurante'],['Assinado Gestor / Eng.','assinado'],['NF / Pagamento','faturado']].map(([n,s])=>{const i=order.indexOf(s);return `<span class="${i<idx?'done':i===idx?'cur':''}">${n}</span>`}).join('');
  let banner='';
  if(st==='rascunho')banner=`<div class="notice warn">Rascunho — confira os quantitativos. Ao <b>fechar</b>, os ${esc(b.qtd)} registros de ${esc(b.empresaNome)} no período ficam vinculados ao BM ${esc(b.numero)}, não podem mais ser estornados, e o restaurante recebe a notificação para validar.</div>`;
  else if(st==='fechado')banner=`<div class="notice warn"><b>Atenção: BM nº ${esc(b.numero)} — Período ${br(b.ini)} à ${br(b.fim)} fechado</b> em ${brdt(b.fechadoEm)} por ${esc(b.fechadoPor)}. Aguardando assinatura do restaurante (eletrônica pelo app ou física, homologada pelo Suprimentos).</div>`;
  else if(st==='assinado_restaurante')banner=`<div class="notice ok">Assinado pelo restaurante em ${brdt(b.assRest.em)}. ${K.gestor?`Agora falta a assinatura do Gestor / Engenheiro da obra (<b>${esc(K.gestor)}</b>)${can('sup.bm')&&gestorPode(b)?`: <b>assine eletronicamente</b> — a assinatura fica registrada em nome do usuário que está logado (<b>${esc(USER.nome)}</b>) — ou imprima o BM, colha a assinatura no papel e <b>registre a assinatura física</b>`:''}.`:''}</div>`+(K.gestor?'':bmObraId(b)?`<div class="notice warn" style="margin-top:8px">A obra <b>${esc((obra(bmObraId(b))||{}).nome||b.obraNome||'—')}</b> ainda não tem Gestor / Engenheiro cadastrado. Cadastre em Configurações › Obras: é o nome que assina este BM.</div>`
    :`<div class="notice warn" style="margin-top:8px">Este BM é antigo e reúne mais de uma obra. Informe abaixo o Gestor / Engenheiro que assina.</div>${can('sup.bm')?'<div class="field" style="margin-top:8px"><label for="bm-gestor-manual">Gestor / Engenheiro que assina este BM</label><input id="bm-gestor-manual" maxlength="80" placeholder="nome completo" autocomplete="off"></div>':''}`);
  else if(st==='assinado')banner=`<div class="notice ok">BM assinado por ambas as partes. Aguardando nota fiscal do restaurante.</div>`;
  else banner=`<div class="notice ok">Nota fiscal ${esc(b.nf)} informada — BM pronto para inclusão em pagamento.</div>`;
  if(st==='assinado_restaurante'&&can('sup.bm')&&!gestorPode(b))banner+=`<div class="notice warn" style="margin-top:8px">${gestorBloqueio(b)}</div>`;   // v2.9.4
  const nRegs=bmQtdLista(b);
  $('bm-body').innerHTML=`
  ${bmFmtHtml(b)}
  <div class="steps">${steps}</div>
  <div style="margin-bottom:10px">${banner}</div>${bmRemHist(b)}
  ${!K.nome?'<div class="notice info small" style="margin-bottom:10px">Dados da contratada ainda não preenchidos (Configurações › Contratadas).</div>':''}
  <div class="subtabs" id="bm-tabs"><button data-t="bm" class="${BMTAB==='bm'?'on':''}">Boletim de Medição</button><button data-t="lista" class="${BMTAB==='lista'?'on':''}">Lista de colaboradores (${nRegs})${isDraft&&!LISTA_VISTA.has(b.id)?' <span class="badge">!</span>':''}</button></div>
  <div id="bm-pane-lista" ${BMTAB==='lista'?'':'hidden'}>${BMTAB==='lista'?renderLista(b):''}</div>
  <div id="bm-pane-bm" ${BMTAB==='bm'?'':'hidden'}>
  ${BMFMT==='v2'?bmDocV2(b):bmDocV1(b)}
  </div>
  <div id="bm-hint" class="notice warn small" style="margin-top:12px" hidden></div>
  <div class="row" style="margin-top:14px;justify-content:flex-end" id="bm-actions"></div>`;
  $('bm-tabs').querySelectorAll('button').forEach(x=>x.onclick=()=>{BMTAB=x.dataset.t;if(BMTAB==='lista')LISTA_VISTA.add(b.id);renderBM();$('bm-modal').querySelector('.sheet').scrollTop=0});
  bmFmtLigar(b);
  $('bm-pane-lista').querySelectorAll('[data-lfoto]').forEach(x=>x.onclick=()=>verRegistro(S.registros.find(r=>r.id===x.dataset.lfoto)));   // v2.9.4
  // actions by status and permission
  const A=$('bm-actions');const acts=[];
  const listaOk=LISTA_VISTA.has(b.id)||nRegs===0;
  if(st==='rascunho'&&can('sup.bm')){acts.push(['bm-fechar','good',`Fechar BM ${esc(b.numero)} e enviar ao restaurante`]);if(!listaOk){$('bm-hint').hidden=false;$('bm-hint').innerHTML='Antes de fechar, confira a aba <b>Lista de colaboradores</b> (nomes, obras e assinaturas digitais por dia e refeição). A lista acompanha o BM na validação do restaurante e no PDF.'}}
  if(st==='fechado'&&can('rest.validar')&&ctOk(ctOf(b)))acts.push(['bm-validar','good','Validar BM (assinar eletronicamente pelo restaurante)']);
  if(st==='fechado'&&can('sup.bm'))acts.push(['bm-homologar','sec','Homologar assinatura física do restaurante']);
  if((st==='assinado_restaurante'||st==='assinado'||st==='faturado')&&can('sup.bm'))acts.push(['bm-print','','Imprimir BM']);
  if(st==='assinado_restaurante'&&can('sup.bm')&&gestorPode(b)){acts.push(['bm-ass-sup-e','good','Assinar eletronicamente (Gestor / Engenheiro)']);acts.push(['bm-ass-sup','sec','Registrar assinatura física do Gestor / Engenheiro'])}
  if(bmRemPode(b)&&bmRemQual(b)&&!b.nf)acts.push(['bm-rem-ass','sec rem-ass','Remover assinatura']);   // v2.9.4
  A.innerHTML=acts.map(a=>`<button class="btn ${a[1]}" id="${a[0]}"${a[0]==='bm-fechar'&&!listaOk?' disabled':''}>${a[2]}</button>`).join('')+((st==='assinado'||st==='faturado')&&can('sup.nf')?`<div class="row" style="flex-wrap:nowrap"><input id="bm-nf" placeholder="nº da nota fiscal" value="${esc(b.nf||'')}" style="width:180px"><button class="btn" id="bm-nf-save">Registrar NF</button></div>`:'');
  const ded=$('bm-ded'),adi=$('bm-adi'),obs=$('bm-obs');
  if(ded)ded.onchange=()=>{b.deducoes=+ded.value||0;renderBM()};if(adi)adi.onchange=()=>{b.adiant=+adi.value||0;renderBM()};if(obs)obs.oninput=()=>b.obs=obs.value;{const pe=$('bm-ped-ed');if(pe)pe.oninput=()=>{b.pedido=pedNorm(pe.value)}}
  const MUDA=new Set(['bm-validar','bm-homologar','bm-ass-sup','bm-ass-sup-e','bm-nf-save']);   // ações que mudam a situação do BM: relê o BM no servidor antes
  const on=(id,fn)=>{const e=$(id);if(e)e.onclick=async()=>{if(BM_LENDO||!bmVivo(b))return;
    if(id==='bm-ass-sup-e'&&e.dataset.armado&&Date.now()-(+e.dataset.armado)<900)return;        // clique duplo não vale como confirmação
    if(MUDA.has(id)&&!(id==='bm-ass-sup-e'&&!e.dataset.armado)){
      BM_LENDO=true;const bts=[...document.querySelectorAll('#bm-actions button,#bm-nf')].map(x=>[x,x.disabled]);bts.forEach(([x])=>{x.disabled=true});let ok=false;
      try{ok=await bmAtual(b)}catch(err){ok=true}finally{BM_LENDO=false;bts.forEach(([x,d])=>{if(x.isConnected)x.disabled=d})}
      if(!ok||!bmVivo(b))return;
      if(BM!==b||!$('bm-modal').classList.contains('on'))return}   // a janela foi fechada (ou outro BM foi aberto) enquanto conferia: não faz nada
    fn()}};
  on('bm-fechar',()=>{
    if(bmPed(b)){const pn=pedNorm(b.pedido),dup=pedDuplicado(b.empresaId,pn,b.id);   // v2.9.12
      if(!pn){toast('Informe o Nº do pedido antes de fechar o BM.','warn');const i=$('bm-ped-ed');if(i)i.focus();return}
      if(dup){toast(`O pedido nº ${pn} já foi usado no BM nº ${dup.numero} — cada medição tem um pedido novo.`,'warn');const i=$('bm-ped-ed');if(i)i.focus();return}
      b.pedido=pn}
    b.formato=BMFMT==='v1'?'v1':'v2';   // v3.0.0: o BM guarda o formato escolhido no rascunho
    b.status='fechado';b.fechadoEm=new Date().toISOString();b.fechadoPor=USER.nome;
    S.registros.forEach(r=>{if(noEscopo(r,b.empresaId,ctOf(b),b.obraId,b.contratoId)&&r.data>=b.ini&&r.data<=b.fim&&!r.bmId&&!r.fechado)r.bmId=b.id});
    (S.sobras||[]).forEach(s=>{if(s.empresaId&&noEscopo(s,b.empresaId,ctOf(b),b.obraId,b.contratoId)&&s.data>=b.ini&&s.data<=b.fim&&!s.bmId){s.valorUnit=sobraUnit(s);s.valor=sobraTotal(s);s.bmId=b.id}});
    S.bms.push(b);{const Ev=emp(b.empresaId);if(Ev){Ev.proximoBM=Math.max(Ev.proximoBM||1,b.numero+1);if(Array.isArray(Ev.numerosLivres))Ev.numerosLivres=Ev.numerosLivres.filter(l=>l&&l.numero!==b.numero)}}audit('bm.fechar',`BM ${esc(b.numero)} — ${b.empresaNome}${b.obraNome?' — '+b.obraNome+' ('+bmModTxt(b)+')':''} — ${br(b.ini)} à ${br(b.fim)} — ${esc(b.qtd)} refeições — líquido ${money(b.liquido)} — formato ${b.formato.toUpperCase()}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,depois:'fechado'});concluir(`BM ${esc(b.numero)} fechado e enviado ao restaurante`);notify('bm.fechado',`BM nº ${esc(b.numero)} — ${b.empresaNome}${bmPed(b)?' — pedido nº '+(b.pedido||'—'):''} — período ${br(b.ini)} à ${br(b.fim)} fechado e aguardando validação do restaurante`,destRest(ctOf(b)),{bmId:b.id});renderBM();renderSup();
  });
  on('bm-validar',()=>{const idA=assNovoId();b.status='assinado_restaurante';b.assRest={id:idA,tipo:'eletronica',usuario:USER.nome,usuarioId:USER.id,em:new Date().toISOString()};audit('bm.validar',`BM ${esc(b.numero)} — ${b.empresaNome} — assinatura eletrônica de ${USER.nome} — ID ${b.assRest.id}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:'fechado',depois:'assinado_restaurante'});concluir(`BM ${esc(b.numero)} validado — devolvido ao Suprimentos assinado (ID da assinatura ${b.assRest.id})`).then(async ok=>{if(ok&&await assConfirma(b,'rest')&&!can('sup.boletins'))assComprovante(b,'rest')});notify('bm.validado',`BM nº ${esc(b.numero)} — ${b.empresaNome} validado (assinatura eletrônica) pelo restaurante ${bmK(b).nome} — ID da assinatura ${b.assRest.id}`,destSup(),{bmId:b.id});$('bm-modal').classList.remove('on');refreshBadges();if(can('sup.ver')){go('sup');openBM(b)}else renderRest()});
  on('bm-homologar',()=>{const idA=assNovoId();b.status='assinado_restaurante';b.assRest={id:idA,tipo:'fisica',usuario:K.nome||'Restaurante',por:USER.nome,porId:USER.id,em:new Date().toISOString()};audit('bm.homologar',`BM ${esc(b.numero)} — ${b.empresaNome} — assinatura física de ${b.assRest.usuario}, registrada por ${USER.nome} — ID ${b.assRest.id}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:'fechado',depois:'assinado_restaurante'});concluir(`Assinatura física do restaurante homologada — ID ${b.assRest.id}`).then(ok=>{if(ok)assConfirma(b,'rest')});notify('bm.validado',`BM nº ${esc(b.numero)} — ${b.empresaNome}: assinatura física do restaurante homologada — ID da assinatura ${b.assRest.id}`,destSup().concat(destRest(ctOf(b))),{bmId:b.id});renderBM();renderSup()});
  // Gestor / Engenheiro: assinatura eletrônica (em nome do usuário logado) ou registro da assinatura física feita no BM impresso
  const assGestor=el=>{if(!gestorPode(b)){toast(gestorBloqueio(b).replace(/<[^>]+>/g,''),'warn');return}const G=bmGestor(b);const oid=bmObraId(b);
    if(!G.gestor&&!oid){G.gestor=(($('bm-gestor-manual')||{}).value||'').trim().replace(/\s+/g,' ');if(!G.gestor){toast('Informe o Gestor / Engenheiro que assina este BM.','warn');const i=$('bm-gestor-manual');if(i)i.focus();return}}
    if(!G.gestor){toast(`Cadastre o Gestor / Engenheiro da obra ${(obra(oid)||{}).nome||b.obraNome||''} em Configurações › Obras antes de registrar a assinatura.`,'warn');return}
    if(el){const bt=$('bm-ass-sup-e');if(bt&&!bt.dataset.armado){bt.dataset.armado=String(Date.now());bt.textContent='Confirmar: assinar em nome de '+USER.nome;
      const h=$('bm-hint');if(h){h.hidden=false;h.textContent='A assinatura eletrônica do Gestor / Engenheiro será registrada em nome do usuário que está logado ('+USER.nome+'), com data, hora e um ID único, e não pode ser desfeita. Clique de novo no botão verde para confirmar.'}return}}
    const idA=assNovoId(),em=new Date().toISOString();assFixa(b);b.gestor=G.gestor;b.cargo=G.cargo;b.status='assinado';
    b.assSup=el?{id:idA,tipo:'eletronica',usuario:USER.nome,usuarioId:USER.id,em}:{id:idA,tipo:'fisica',usuario:G.gestor,por:USER.nome,porId:USER.id,em};
    audit(el?'bm.assinar_sup_e':'bm.assinar_sup',`BM ${esc(b.numero)} — ${b.empresaNome}${b.obraNome?' — '+b.obraNome:''} — Gestor / Engenheiro: ${G.gestor}${el?' — assinatura eletrônica de '+USER.nome:', registrada por '+USER.nome} — ID ${b.assSup.id}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:'assinado_restaurante',depois:'assinado'});
    concluir(el?`BM ${esc(b.numero)} assinado eletronicamente por ${USER.nome} (Gestor / Engenheiro) — ID ${b.assSup.id}`:`Assinatura do Gestor / Engenheiro registrada — ID ${b.assSup.id}`).then(ok=>{if(ok)assConfirma(b,'sup')});
    notify('bm.concluido',`BM nº ${esc(b.numero)} — ${b.empresaNome} concluído: assinado pelo restaurante e pelo Gestor / Engenheiro da obra`,destSup().concat(destRest(ctOf(b))),{bmId:b.id});renderBM();renderSup()};
  on('bm-ass-sup',()=>assGestor(false));on('bm-ass-sup-e',()=>assGestor(true));
  on('bm-print',()=>exportBM(b,true));
  {const rb=$('bm-rem-ass');if(rb)rb.onclick=()=>{if(!BM_LENDO&&bmVivo(b))bmRemAss(b)}}
  on('bm-nf-save',()=>{const nfAntes=b.nf;assFixa(b);b.nf=$('bm-nf').value.trim();if(b.nf)b.status='faturado';if(b.nf&&b.nf!==nfAntes)b.nfEm=new Date().toISOString();audit('bm.nf',`BM ${esc(b.numero)} — NF ${b.nf}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:nfAntes||null,depois:b.nf});concluir('Nota fiscal registrada — pronta para inclusão em pagamento');notify('bm.nf',`BM nº ${esc(b.numero)} — ${b.empresaNome}: nota fiscal ${b.nf} registrada`,destSup(),{bmId:b.id});renderBM();renderSup()});
  $('bm-pdf').disabled=!(can('sup.bm')||can('rest.validar'));
  $('bm-share').hidden=!isMobile();$('bm-share').disabled=$('bm-pdf').disabled;
}

/* v2.9.12: BM por pedido — itens só com a quantidade e o valor desta medição (o pedido é novo a cada BM: sem acumulado nem saldo) */
function bmItensPed(b,K){const tot=k=>b.itens.reduce((s,i)=>s+(i[k]||0),0);
  return `<div class="tablewrap"><table data-sem-ord><thead><tr><th>Item</th><th>Descrição</th><th class="c">Unid</th><th class="r">Preço unit.</th><th class="r">Quantidade</th><th class="r">Valor desta medição</th></tr></thead>
  <tbody><tr class="grp"><td>1</td><td colspan="5">${esc(K.servico||'FORNECIMENTO DE REFEIÇÕES')} — pedido nº ${esc(b.pedido||'—')}</td></tr>
  ${b.itens.map(i=>`<tr><td class="num">${esc(i.item)}</td><td>${tipo(i.tipo).nome}</td><td class="c">un</td><td class="r num">${i.preco===null?'—':money(i.preco)}</td><td class="r num"><b>${num(i.atualQtd)}</b></td><td class="r num"><b>${money(i.atualVal)}</b></td></tr>`).join('')}
  <tr class="tot"><td colspan="4">TOTAL</td><td class="r num">${num(tot('atualQtd'))}</td><td class="r num">${money(tot('atualVal'))}</td></tr></tbody></table></div>`}
/* =================== v2.9.4: QUEM ASSINA O BM POR CONTRATO (Gestor / Engenheiro) ===================
   Configurações › Assinaturas (até a v2.9.9: "Assinaturas por contrato"): para cada usuário, os contratos em que ele registra a assinatura do Gestor / Engenheiro
   (eletrônica ou física). Fica gravado no usuário (assContratos). Contrato sem ninguém liberado: ninguém assina — o BM fica aguardando.
   "Sem contrato" vale para os BMs de obras sem contrato. As assinaturas já feitas não mudam. A validação do restaurante segue como antes. */
function bmCtChave(b){if(bmPed(b))return PED;return (b&&b.contratoId)||(b&&b.obraId&&cidOf(b.obraId))||SEM_CT}   // v2.9.12: BM por pedido — linha "Pedidos" em Assinaturas
function ctRotulo(cid){if(cid===PED)return 'Pedidos';if(cid===SEM_CT)return 'Sem contrato';const C=contrato(cid);return C?C.numero:'contrato excluído'}
function usrAtual(){return (USER&&(S.users||[]).find(u=>u.id===USER.id))||USER}
function assinantesCt(cid){return (S.users||[]).filter(u=>ativoOk(u)&&lst(u.assContratos).includes(cid))}
function gestorPode(b){const u=usrAtual();return !!u&&lst(u.assContratos).includes(bmCtChave(b))}
function gestorBloqueio(b){const cid=bmCtChave(b),L=assinantesCt(cid),rot=ctRotulo(cid);
  return L.length?`Você não está liberado para assinar ${cid===PED?'os BMs por <b>pedido</b>':'pelo contrato <b>'+esc(rot)+'</b>'}. Liberados: <b>${esc(L.map(u=>u.nome).join(', '))}</b>.`
    :`Nenhum usuário está liberado para assinar ${cid===PED?'os BMs por <b>pedido</b>':'pelo contrato <b>'+esc(rot)+'</b>'} — o BM fica aguardando. ${can('cfg.usuarios')?'Libere em <b>Configurações › Assinaturas</b>.':'Peça ao administrador (Configurações › Assinaturas).'}`}
let ASEDIT=null;
const AS_PILL={vigente:'ok','a iniciar':'warn',encerrado:'bad',inativo:'bad'};
function assCtsLista(){const t=today();
  const l=(S.contratos||[]).slice().sort((a,b)=>{const x=contratoStatus(a,t),y=contratoStatus(b,t),r=v=>v==='vigente'?0:v==='a iniciar'?1:2;return r(x)-r(y)||String(a.numero).localeCompare(String(b.numero))})
    .map(c=>{const ob=S.obras.filter(o=>o.contratoId===c.id);return {id:c.id,nome:c.numero,st:contratoStatus(c,t),obras:ob.map(o=>o.nome).join(', '),emps:[...new Set(ob.map(o=>(emp(o.empresaId)||{}).nome).filter(Boolean))].join(', ')}});
  if(S.obras.some(o=>o.ativo!==false&&vincObra(o)!=='pedido'&&!o.contratoId)||(S.bms||[]).some(b=>bmCtChave(b)===SEM_CT)||(S.users||[]).some(u=>lst(u.assContratos).includes(SEM_CT)))
    l.push({id:SEM_CT,nome:'Sem contrato',st:'',obras:S.obras.filter(o=>vincObra(o)!=='pedido'&&!o.contratoId).map(o=>o.nome).join(', ')||'BMs sem contrato',emps:''});
  {const ob=S.obras.filter(o=>vincTem(vincObra(o),'pedido'));   // v2.9.12: quem assina os BMs por pedido
   if(ob.length||(S.bms||[]).some(bmPed)||(S.users||[]).some(u=>lst(u.assContratos).includes(PED)))
     l.push({id:PED,nome:'Pedidos',st:'',obras:ob.map(o=>o.nome).join(', ')||'BMs por pedido',emps:[...new Set(ob.map(o=>(emp(o.empresaId)||{}).nome).filter(Boolean))].join(', ')})}
  return l}
function assSupOk(u){return isAdm(u)||permsEfetivas(u.perms).includes('sup.bm')}
function assUsuariosLista(){return (S.users||[]).filter(u=>u.status!=='pendente'&&(assSupOk(u)||lst(u.assContratos).length)).map(u=>({u,sup:assSupOk(u)}))
  .sort((a,b)=>(b.u.ativo!==false)-(a.u.ativo!==false)||String(a.u.nome).localeCompare(String(b.u.nome),'pt-BR'))}
function renderAssinaturas(){
  const C=assCtsLista(),nomeCt=id=>(C.find(c=>c.id===id)||{nome:ctRotulo(id)}).nome,U=assUsuariosLista();
  $('as-users').innerHTML=`<thead><tr><th>Usuário</th><th>Perfil</th><th>Assina pelos contratos</th><th></th></tr></thead><tbody>${U.map(({u,sup})=>{const cs=lst(u.assContratos);
    return `<tr${ASEDIT===u.id?' class="as-sel"':''}><td><b>${esc(u.nome)}</b><div class="small muted mono">${esc((u.login||'').toUpperCase())}</div></td><td>${esc(u.perfil||u.tipo||'—')}${u.ativo===false?' <span class="pill bad">inativo</span>':''}${sup?'':' <span class="pill warn" title="Sem o acesso “Emitir, fechar, imprimir e assinar BM”, o usuário não assina">sem acesso para assinar BM</span>'}</td>
      <td>${cs.length?cs.map(id=>`<span class="pill neutral mono">${esc(nomeCt(id))}</span>`).join(' '):'<span class="muted small">nenhum</span>'}</td>
      <td><button type="button" class="btn sec sm" data-asu="${esc(u.id)}" aria-label="Alterar os contratos de ${esc(u.nome)}">Alterar</button></td></tr>`}).join('')||'<tr><td colspan="4" class="empty">Nenhum usuário com acesso para assinar BM.</td></tr>'}</tbody>`;
  $('as-users').querySelectorAll('[data-asu]').forEach(b=>b.onclick=()=>{ASEDIT=b.dataset.asu;renderAssinaturas();const f=$('as-form-card');if(f&&f.scrollIntoView)f.scrollIntoView({behavior:'smooth',block:'nearest'});const s=$('as-user');if(s)s.focus()});
  const semN=C.filter(c=>c.st!=='encerrado'&&c.st!=='inativo'&&!assinantesCt(c.id).length).length;
  $('as-resumo').textContent=C.length?(semN?`${semN} sem ninguém liberado (contratos / pedidos)`:'Todos os contratos ativos (e os pedidos) têm quem assine'):'';
  $('as-resumo').classList.toggle('as-alerta',!!semN);
  $('as-cts-table').innerHTML=`<thead><tr><th>Contrato / pedidos</th><th>Obra(s) — empresa</th><th>Situação</th><th>Liberados para assinar</th></tr></thead><tbody>${C.map(c=>{const L=assinantesCt(c.id);
    return `<tr><td class="mono"><b>${esc(c.nome)}</b></td><td class="small">${esc(c.obras||'—')}${c.emps?`<div class="muted">${esc(c.emps)}</div>`:''}</td><td>${c.st?`<span class="pill ${AS_PILL[c.st]||'neutral'}">${esc(c.st)}</span>`:'—'}</td><td>${L.length?esc(L.map(u=>u.nome).join(', ')):c.st==='encerrado'||c.st==='inativo'?'<span class="muted small">ninguém</span>':'<span class="pill warn">ninguém — os BMs ficam aguardando</span>'}</td></tr>`}).join('')||'<tr><td colspan="4" class="empty">Nenhum contrato cadastrado.</td></tr>'}</tbody>`;
  const ops=U.filter(x=>x.u.ativo!==false||x.u.id===ASEDIT);if(ASEDIT&&!ops.some(x=>x.u.id===ASEDIT))ASEDIT=null;
  $('as-user').innerHTML='<option value="">Escolha o usuário…</option>'+ops.map(({u})=>`<option value="${esc(u.id)}">${esc(u.nome)} — ${esc((u.login||'').toUpperCase())}</option>`).join('');$('as-user').value=ASEDIT||'';
  const u=ASEDIT?(S.users||[]).find(x=>x.id===ASEDIT):null,tem=new Set(u?lst(u.assContratos):[]);
  $('as-form-tit').textContent=u?`Contratos de ${u.nome}`:'Liberar contratos';
  $('as-cts').innerHTML=u?(C.map(c=>`<label class="as-ct"><input type="checkbox" value="${esc(c.id)}"${tem.has(c.id)?' checked':''}><span><b class="mono">${esc(c.nome)}</b>${c.st&&c.st!=='vigente'?` <span class="pill ${AS_PILL[c.st]||'neutral'}">${esc(c.st)}</span>`:''}<small>${esc(c.obras||'—')}${c.emps?' · '+esc(c.emps):''}</small></span></label>`).join('')||'<div class="small muted">Nenhum contrato cadastrado.</div>')
    :'<div class="small muted">Escolha o usuário (ou toque em “Alterar” na lista).</div>';
  $('as-save').disabled=!u;$('as-msg').hidden=true}
$('as-user').onchange=()=>{ASEDIT=$('as-user').value||null;renderAssinaturas()};
$('as-cancel').onclick=()=>{ASEDIT=null;renderAssinaturas()};
$('as-save').onclick=()=>{
  const u=ASEDIT?(S.users||[]).find(x=>x.id===ASEDIT):null;if(!u||!can('cfg.usuarios'))return;
  const msg=t=>{const m=$('as-msg');m.hidden=false;m.textContent=t};
  if(!isAdm(USER)&&isAdm(u))return msg('Somente um administrador altera contas de administrador.');
  const antes=lst(u.assContratos),vistos=new Set([...$('as-cts').querySelectorAll('input')].map(i=>i.value));
  const novos=[...$('as-cts').querySelectorAll('input:checked')].map(i=>i.value).concat(antes.filter(x=>!vistos.has(x)));   // o que não aparece na tela (contrato excluído) fica como estava
  const C=assCtsLista(),nm=id=>(C.find(c=>c.id===id)||{nome:ctRotulo(id)}).nome;
  if(novos.length===antes.length&&novos.every(x=>antes.includes(x))){toast('Nada mudou');return}
  u.assContratos=novos;
  audit('usuario.assinaturas',`${u.nome} (${(u.login||'').toUpperCase()}) — assina o BM (Gestor / Engenheiro) pelos contratos: ${novos.map(nm).join(', ')||'nenhum'}`,{entidade:'usuário '+u.login,antes:antes.map(nm).join(', ')||'nenhum',depois:novos.map(nm).join(', ')||'nenhum'});
  ASEDIT=null;concluir(`Contratos de assinatura de ${u.nome} salvos`);renderAssinaturas()};

/* =================== v2.9.4: REMOVER ASSINATURA DO BM ===================
   Acesso "bm.rem_ass" (+ "Emitir, fechar, imprimir e assinar BM"), com justificativa. Remove a última assinatura: a do Gestor / Engenheiro
   (o BM volta para "Assinado pelo restaurante") ou, se só o restaurante assinou, a do restaurante (volta para "Aguardando restaurante").
   Com nota fiscal registrada não remove. A assinatura removida fica no BM (assRemovidas) e na Auditoria; o ID dela, em
   "Conferir assinatura (ID)", aparece como removido. */
function bmRemPode(b){return !!b&&can('bm.rem_ass')&&can('sup.bm')&&ctOk(ctOf(b))}
function bmRemQual(b){return !b?null:b.status==='assinado'?'sup':b.status==='assinado_restaurante'?'rest':null}
function bmRemHist(b){const L=Array.isArray(b.assRemovidas)?b.assRemovidas:[];if(!L.length)return '';
  return `<div class="notice warn small bm-rem-hist" style="margin-bottom:10px"><b>Assinaturas removidas deste BM</b><ul>${L.map(a=>`<li>${esc((ASS_PAPEL[a.papel]||{}).nome||'—')}: ${esc(a.usuario||'—')}${a.em?' · '+brdt(a.em):''}${a.id?` · ID <span class="ass-id">${esc(a.id)}</span>`:''} — removida em ${brdt(a.removidaEm)} por ${esc(a.removidaPor||'—')}: “${esc(a.motivo||'—')}”</li>`).join('')}</ul></div>`}
function bmRemAss(b){
  // v3.1.0: pergunta QUAL assinatura remover — a do Gestor / Engenheiro ou a do restaurante. O restaurante valida antes do
  // Gestor; por isso, tirar a do restaurante de um BM já assinado pelos dois tira também a do Gestor (ela veio depois).
  if(!bmRemPode(b))return;
  if(b.nf||b.status==='faturado'){toast(`O BM nº ${b.numero} já tem a nota fiscal ${b.nf||''} registrada — a assinatura não pode ser removida.`,'warn');return}
  if(!bmRemQual(b))return;
  const st0=b.status,dois=st0==='assinado';
  const linha=p=>{const a=b[ASS_PAPEL[p].k],id=assId(b,p);return a?`${esc(a.usuario||'—')}${a.em?' · '+brdt(a.em):''}${id?` · ID <span class="ass-id">${esc(id)}</span>`:''}`:''};
  const op=(p,tit,det,efeito,ok)=>`<label class="rem-op${ok?'':' off'}"><input type="radio" name="rem-papel" value="${p}" ${ok?'':'disabled'}><span class="rem-op-t"><b>${tit}</b><small>${det}</small><small class="rem-op-ef">${efeito}</small></span></label>`;
  const opSup=op('sup',ASS_PAPEL.sup.nome,dois?linha('sup'):'ainda não assinou',dois?`O BM volta para <b>${STATUS.assinado_restaurante[0]}</b>: o Gestor / Engenheiro assina de novo. A do restaurante continua.`:'Não há assinatura do Gestor / Engenheiro para remover.',dois);
  const opRest=op('rest',ASS_PAPEL.rest.nome,linha('rest'),`O BM volta para <b>${STATUS.fechado[0]}</b>: o restaurante valida (assina) de novo e, depois, o Gestor / Engenheiro.${dois?' <b>A assinatura do Gestor / Engenheiro também sai</b>, porque foi feita depois da validação do restaurante.':''}`,true);
  let papel=dois?null:'rest';
  justModal({titulo:`Remover assinatura — BM nº ${esc(b.numero)}`,
    resumo:`<div class="field" style="margin:0"><label>Qual assinatura remover?</label><div class="rem-opcs" role="radiogroup" aria-label="Qual assinatura remover">${opSup}${opRest}</div></div>
      <div class="small muted">A assinatura removida fica registrada no BM e na Auditoria, e o ID dela passa a constar como removido.${b.anexo?' O anexo (BM assinado) continua no BM — substitua em <b>Anexos</b>, se for o caso.':''}</div>`,
    botao:'Remover assinatura',classe:'danger',
    onOk:async motivo=>{
      if(!(await bmAtual(b))||!bmVivo(b))return;
      if(b.status!==st0||b.nf){toast('O BM mudou enquanto a janela estava aberta — confira e repita, se ainda for o caso.','warn');return}
      const sai=papel==='sup'?['sup']:(b.status==='assinado'?['sup','rest']:['rest']),volta=papel==='sup'?'assinado_restaurante':'fechado';
      assFixa(b);const agora=new Date().toISOString(),rems=[];
      sai.forEach(p=>{const a0=b[ASS_PAPEL[p].k];if(!a0)return;const id=assId(b,p);
        const rem={papel:p,id:typeof a0.id==='string'&&RX_ASS.test(a0.id)?a0.id:(id||''),tipo:a0.tipo||'',usuario:a0.usuario||'',em:a0.em||'',removidaEm:agora,removidaPor:USER.nome,removidaPorId:USER.id,motivo:p===papel?motivo:`${motivo} (removida junto com a do restaurante)`};
        ['usuarioId','por','porId'].forEach(k=>{if(a0[k])rem[k]=a0[k]});rems.push(rem)});
      const antes=b.status;b.assRemovidas=(Array.isArray(b.assRemovidas)?b.assRemovidas:[]).concat(rems);sai.forEach(p=>delete b[ASS_PAPEL[p].k]);b.status=volta;
      const quais=rems.map(r=>`${ASS_PAPEL[r.papel].nome} (${r.usuario||'—'}${r.id?' — ID '+r.id:''})`).join(' e ');
      audit('bm.remover_ass',`BM ${esc(b.numero)} — ${b.empresaNome}${b.obraNome?' — '+b.obraNome:''} — removida${rems.length>1?'s as assinaturas':' a assinatura'} do ${quais} — motivo: ${motivo}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes,depois:volta});
      notify('bm.ass_removida',`${rems.length>1?'Assinaturas do restaurante e do Gestor / Engenheiro removidas':'Assinatura do '+ASS_PAPEL[papel].nome+' removida'} do BM nº ${esc(b.numero)} — ${b.empresaNome}: ${papel==='sup'?'aguarda nova assinatura do Gestor / Engenheiro':'aguarda nova validação do restaurante'}`,papel==='rest'?destRest(ctOf(b)).concat(destSup()):destSup(),{bmId:b.id});
      concluir(`${rems.length>1?'Assinaturas removidas':'Assinatura removida'} — o BM ${esc(b.numero)} voltou para “${STATUS[volta][0]}”`);refreshBadges();if(BM===b&&$('bm-modal').classList.contains('on'))renderBM();if(PAGE==='sup')renderSup()}});
  // escolher é obrigatório (quando só há a do restaurante, ela já vem marcada); o botão diz o que vai sair
  const go=$('jm-go'),okOrig=go.onclick,rot=()=>{go.textContent=!papel?'Remover assinatura':papel==='sup'?'Remover a do Gestor / Engenheiro':dois?'Remover as duas assinaturas':'Remover a do restaurante'};
  document.querySelectorAll('input[name="rem-papel"]').forEach(r=>{if(r.value===papel)r.checked=true;r.onchange=()=>{papel=r.value;$('jm-err').hidden=true;document.querySelectorAll('.rem-op').forEach(l=>l.classList.toggle('on',l.querySelector('input').checked));rot()}});
  document.querySelectorAll('.rem-op').forEach(l=>l.classList.toggle('on',l.querySelector('input').checked));rot();
  go.onclick=()=>{if(!papel){$('jm-err').hidden=false;$('jm-err').textContent='Escolha qual assinatura remover: a do Gestor / Engenheiro ou a do restaurante.';return}okOrig()};
}
/* ---- PDF export / print (jsPDF + AutoTable) ---- */
function bmPdf(b){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
  const K=bmK(b),E=emp(b.empresaId);const W=297,M=10;let y=M;
  const mes=parse(b.ini).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}).toUpperCase();
  let x=M;
  if(E&&logoOk(E.logo)){try{const maxW=42,maxH=18;const ratio=(E.logoW||4)/(E.logoH||1);let w=maxW,h=w/ratio;if(h>maxH){h=maxH;w=h*ratio}
    doc.addImage(E.logo,E.logo.startsWith('data:image/jpeg')?'JPEG':'PNG',M,y,w,h);x=M+w+6}catch(e){}}
  doc.setFont('helvetica','bold');doc.setFontSize(13);doc.text(('MEDIÇÃO DO '+(bmPed(b)?'PEDIDO':'CONTRATO')+' DE '+(K.servico||'FORNECIMENTO DE REFEIÇÕES')).toUpperCase(),x,y+5);
  doc.setFontSize(9);doc.setFont('helvetica','normal');
  doc.text(`Empresa: ${b.empresaNome}${b.empresaCnpj?'   CNPJ: '+b.empresaCnpj:''}`,x,y+11);
  doc.text(`Contratada: ${K.nome||'—'}${K.cnpj?'   CNPJ: '+K.cnpj:''}`,x,y+16);
  if(b.obraNome)doc.text(`Obra: ${b.obraNome}${bmPed(b)?'   Pedido nº: '+(b.pedido||'—'):b.contratoNumero?'   Contrato: '+b.contratoNumero:''}`,x,y+21);
  doc.setFont('helvetica','bold');doc.text(`MEDIÇÃO Nº ${esc(b.numero)}`,W-M,y+5,{align:'right'});
  doc.setFont('helvetica','normal');doc.text(`Período: ${br(b.ini)} à ${br(b.fim)}`,W-M,y+11,{align:'right'});doc.text(`Ref.: ${mes}`,W-M,y+16,{align:'right'});
  y+=b.obraNome?27:22;doc.setDrawColor(23,33,43);doc.setLineWidth(.5);doc.line(M,y,W-M,y);y+=3;
  const anyCt=b.itens.some(i=>i.qtdCt!==null);const dash=v=>v===null||v===undefined?'—':v;
  const head=['Item','Descrição','Unid','Preço unit.'].concat(anyCt?['Qtd contrato','Total contrato']:[]).concat(['Acum. anterior','Atual','Total acum.']).concat(anyCt?['Saldo']:[]).concat(['R$ acum. ant.','R$ desta medição','R$ acum. atual']).concat(anyCt?['R$ saldo']:[]);
  const body=b.itens.map(i=>[i.item,tipo(i.tipo).nome,'un',i.preco===null?'—':money(i.preco)].concat(anyCt?[dash(i.qtdCt&&num(i.qtdCt)),i.totalCt===null?'—':money(i.totalCt)]:[]).concat([num(i.acumQtd),num(i.atualQtd),num(i.totAcQtd)]).concat(anyCt?[i.saldoQtd===null?'—':num(i.saldoQtd)]:[]).concat([money(i.acumVal),money(i.atualVal),money(i.totAcVal)]).concat(anyCt?[i.saldoVal===null?'—':money(i.saldoVal)]:[]));
  const tot=k=>b.itens.reduce((s,i)=>s+(i[k]||0),0);
  body.push(['','TOTAL','',''].concat(anyCt?['',money(tot('totalCt'))]:[]).concat([num(tot('acumQtd')),num(tot('atualQtd')),num(tot('totAcQtd'))]).concat(anyCt?[num(tot('saldoQtd'))]:[]).concat([money(tot('acumVal')),money(tot('atualVal')),money(tot('totAcVal'))]).concat(anyCt?[money(tot('saldoVal'))]:[]));
  if(bmPed(b)){head.splice(0,head.length,'Item','Descrição','Unid','Preço unit.','Quantidade','Valor desta medição');   // v2.9.12: BM por pedido
    body.splice(0,body.length,...b.itens.map(i=>[i.item,tipo(i.tipo).nome,'un',i.preco===null?'—':money(i.preco),num(i.atualQtd),money(i.atualVal)]),['','TOTAL','','',num(tot('atualQtd')),money(tot('atualVal'))])}
  const right={halign:'right'};const colStyles={};head.forEach((h,i)=>{if(i>=3)colStyles[i]=right;if(i===2)colStyles[i]={halign:'center'}});
  const base={theme:'grid',styles:{fontSize:7.5,cellPadding:1.5,lineColor:[200,208,214],lineWidth:.2,textColor:[23,33,43]}};
  doc.autoTable({...base,startY:y,head:[head],body,headStyles:{fillColor:[15,92,112],textColor:255,fontSize:7},columnStyles:colStyles,didParseCell:d=>{if(d.section==='body'&&d.row.index===body.length-1)d.cell.styles.fontStyle='bold'}});
  y=doc.lastAutoTable.finalY+6;
  const leftW=150;
  doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text('RESUMO POR DATA',M,y);
  const dHead=['Data'].concat(TIPOS.map(t=>t.curto)).concat(['Total','Valor']);
  const dBody=b.dias.map(d=>[`${wd(d.d)} ${br(d.d)}`].concat(d.porTipo.map(n=>n||'–')).concat([String(d.total),money(d.valor)]));
  dBody.push(['Total geral'].concat(TIPOS.map((t,i)=>String(b.dias.reduce((s,d)=>s+d.porTipo[i],0)))).concat([String(b.qtd),money(b.valor)]));
  const dCols={};dHead.forEach((h,i)=>{if(i>0)dCols[i]=right});
  const grey={fillColor:[236,241,244],textColor:[23,33,43],fontSize:7};
  doc.autoTable({...base,startY:y+2,head:[dHead],body:dBody,tableWidth:leftW,margin:{left:M,bottom:30},headStyles:grey,columnStyles:dCols,didParseCell:d=>{if(d.section==='body'&&d.row.index===dBody.length-1)d.cell.styles.fontStyle='bold'}});
  let yL=doc.lastAutoTable.finalY;
  if(b.obras.length>1){
    const oHead=['Obra'].concat(TIPOS.map(t=>t.curto)).concat(['Total','Valor']);
    const oBody=b.obras.map(e=>[e.o||'—'].concat(e.porTipo.map(n=>n||'–')).concat([String(e.total),money(e.valor)]));
    doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text('RESUMO POR OBRA',M,yL+7);
    doc.autoTable({...base,startY:yL+9,head:[oHead],body:oBody,tableWidth:leftW,margin:{left:M,bottom:30},headStyles:grey,columnStyles:dCols});
    yL=doc.lastAutoTable.finalY;
  }
  const TGp=tercGrupos(bmRegs(b));
  if(TGp.length){
    const tHead=['Empresa terceirizada'].concat(TIPOS.map(t=>t.curto)).concat(['Total','Valor']);
    const tBody=TGp.map(g=>[g.nome].concat(g.porTipo.map(n=>n||'–')).concat([String(g.total),money(g.valor)]));
    tBody.push(['Total terceirizados'].concat(TIPOS.map((t,i)=>String(TGp.reduce((s,g)=>s+g.porTipo[i],0)))).concat([String(TGp.reduce((s,g)=>s+g.total,0)),money(TGp.reduce((s,g)=>s+g.valor,0))]));
    doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text('TERCEIRIZADOS POR EMPRESA (já incluídos nos totais)',M,yL+7);
    doc.autoTable({...base,startY:yL+9,head:[tHead],body:tBody,tableWidth:leftW,margin:{left:M,bottom:30},headStyles:grey,columnStyles:dCols,didParseCell:d=>{if(d.section==='body'&&d.row.index===tBody.length-1)d.cell.styles.fontStyle='bold'}});
    yL=doc.lastAutoTable.finalY;
  }
  // financial block on the first page position of the resumo (if resumo spilled to a new page, place fin on that page)
  const fx=M+leftW+12,fw=W-M-fx;let fy=y;
  doc.setPage(doc.internal.getNumberOfPages());let lastPage=doc.internal.getNumberOfPages();
  if(lastPage>1){doc.setPage(1)}
  const line=(k,v,bold)=>{doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(bold?10:8.5);doc.text(k,fx,fy);doc.text(v,fx+fw,fy,{align:'right'});fy+=bold?7:6};
  line('VALOR DA MEDIÇÃO:',money(b.valor));line('DEDUÇÕES / DESCONTOS:',money(b.deducoes));line('ADIANTAMENTOS E OUTROS:',money(b.adiant));line('TOTAL DA FATURA:',money(b.liquido));
  doc.setDrawColor(23,33,43);doc.line(fx,fy-3,fx+fw,fy-3);fy+=2.5;line('TOTAL LÍQUIDO DA MEDIÇÃO:',money(b.liquido),true);
  doc.setFont('helvetica','normal');doc.setFontSize(8);doc.text('Obs.: '+([b.obs,b.sobrasQtd?`Inclui ${esc(b.sobrasQtd)} refeições de sobras (${money(b.sobrasValor)}).`:''].filter(Boolean).join(' · ')||'—'),fx,fy+2,{maxWidth:fw});
  if(b.nf)doc.text('Nota fiscal: '+b.nf,fx,fy+12);
  // signatures on the last page
  doc.setPage(lastPage);
  // carimbo: título, "nome · data · quem registrou" (até 2 linhas) e o ID. A linha da assinatura fica logo abaixo do que existe em cada lado
  // (à esquerda as tabelas + carimbo do gestor; à direita o quadro de valores + carimbo do restaurante). Se não couber na página,
  // as assinaturas vão para a página seguinte (antes o carimbo saía por cima das últimas linhas da tabela).
  const detLin=a=>{doc.setFont('helvetica','normal');doc.setFontSize(6.5);return doc.splitTextToSize(`${a.usuario} · ${brdt(a.em)}${a.tipo==='fisica'?' · homologado por '+a.por:''}`,84).slice(0,2)};
  const altCar=(a,papel)=>b.status==='rascunho'?0:!a?5:8.5+detLin(a).length*3+(assId(b,papel)?4:0);
  const linhaAss=folga=>Math.max(yL+folga+altCar(b.assSup,'sup')+2.5,(lastPage>1?0:fy+14)+folga+altCar(b.assRest,'rest')+2.5,(lastPage>1?yL:Math.max(yL,fy+20))+12);
  let sy=linhaAss(5);if(sy>192)sy=linhaAss(1.5);   // 5 mm de respiro entre a tabela e o carimbo; 1,5 mm quando é o que cabe na página
  if(sy>192){doc.addPage();lastPage=doc.internal.getNumberOfPages();doc.setPage(lastPage);doc.setFont('helvetica','bold');doc.setFontSize(10);
    doc.text(`MEDIÇÃO Nº ${esc(b.numero)} — ${b.empresaNome} — Período: ${br(b.ini)} à ${br(b.fim)} — ASSINATURAS`,M,M+5,{maxWidth:W-2*M});doc.setFont('helvetica','normal');sy=M+46}
  const stamp=(a,cx,who,papel)=>{if(!a){doc.setTextColor(150);doc.setFontSize(7);doc.text(`aguardando assinatura — ${who}`,cx,sy-4,{align:'center'});doc.setTextColor(23,33,43);return}
    const id=assId(b,papel),det=detLin(a),h=8.5+det.length*3+(id?4:0),top=sy-2.5-h;
    doc.setDrawColor(35,122,75);doc.setTextColor(35,122,75);doc.setLineWidth(.5);doc.roundedRect(cx-45,top,90,h,1.5,1.5);doc.setFont('helvetica','bold');doc.setFontSize(8);
    doc.text(a.tipo==='eletronica'?'ASSINADO ELETRONICAMENTE':'ASSINATURA FÍSICA HOMOLOGADA',cx,top+4.5,{align:'center'});doc.setFont('helvetica','normal');doc.setFontSize(6.5);
    det.forEach((t,i)=>doc.text(t,cx,top+8.5+i*3,{align:'center'}));
    if(id){doc.setFont('courier','bold');doc.setFontSize(8);doc.text('ID '+id,cx,top+9.2+det.length*3,{align:'center'});doc.setFont('helvetica','normal')}
    doc.setTextColor(23,33,43);doc.setDrawColor(23,33,43)};
  const lx=M+60,rx=W-M-60;
  if(b.status!=='rascunho'){stamp(b.assSup,lx,'Gestor / Engenheiro','sup');stamp(b.assRest,rx,'Restaurante','rest')}
  doc.setLineWidth(.3);doc.line(lx-50,sy,lx+50,sy);doc.line(rx-50,sy,rx+50,sy);
  doc.setFontSize(8);doc.text(K.gestor||'',lx,sy+4,{align:'center'});doc.text(`${K.cargo||'Gestor / Engenheiro'} — ${b.empresaNome}`,lx,sy+8,{align:'center'});
  doc.text(K.nome||'',rx,sy+4,{align:'center'});doc.text('Contratada',rx,sy+8,{align:'center'});
  doc.setFontSize(7);doc.setTextColor(120);doc.text(`Emitido em ${brdt(b.emitidoEm)} por ${b.usuario}${b.status==='rascunho'?' · RASCUNHO':b.fechadoEm?' · fechado em '+brdt(b.fechadoEm)+' por '+b.fechadoPor:''}`,M,205);
  doc.setTextColor(23,33,43);
  // ---- Anexo: lista de colaboradores por dia e refeição ----
  const grupos=bmGrupos(b);
  if(grupos.length){
    doc.addPage();let ly=M+4;
    doc.setFont('helvetica','bold');doc.setFontSize(12);doc.text(`LISTA DE COLABORADORES — BM Nº ${esc(b.numero)} — ${b.empresaNome}`,M,ly);
    doc.setFont('helvetica','normal');doc.setFontSize(8.5);ly+=5;doc.text(`Período ${br(b.ini)} à ${br(b.fim)} · ${grupos.reduce((s,x)=>s+x.total,0)} refeições · Assinatura digital = leitura do QR Code do crachá; "Retirada" = levada por outro colaborador; "Manual" = terceirizado sem crachá, lançado pelo restaurante; "Sobra" = preparada e não consumida, cobrada.`,M,ly,{maxWidth:W-2*M});
    ly+=5;
    grupos.forEach((x,i)=>{
      if(ly>175){doc.addPage();ly=M+4}
      doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.text(`${i+1}. ${br(x.d)} — ${x.tipo.curto} (${esc(x.total)})`,M,ly+4);
      doc.autoTable({startY:ly+6,head:[['#','Colaborador','Obra','Assinatura digital']],
        body:listaLinhas(x.regs).map(l=>l.sub?[{content:`Terceirizada: ${l.sub} — ${l.n} ${l.n===1?'refeição':'refeições'}`,colSpan:4,styles:{fillColor:[245,247,248],fontStyle:'bold',fontSize:7.5,halign:'left'}}]:[String(l.i),l.r.nome,l.r.obraNome||'—',assinaturaTxt(l.r)]).concat(x.sobras.map((o,k)=>[String(x.regs.length+k+1),sobraLinha(o),o.obraNome||'—',sobraAssTxt(o)])),
        theme:'grid',margin:{left:M,right:M,bottom:14},styles:{fontSize:8,cellPadding:1.4,lineColor:[200,208,214],lineWidth:.2,textColor:[23,33,43]},
        headStyles:{fillColor:[236,241,244],textColor:[23,33,43],fontSize:7.5},columnStyles:{0:{cellWidth:10,halign:'right'},1:{cellWidth:110},2:{cellWidth:70}}});
      ly=doc.lastAutoTable.finalY+4;
    });
    const pages=doc.internal.getNumberOfPages();
    for(let pg=lastPage+1;pg<=pages;pg++){doc.setPage(pg);doc.setFontSize(7);doc.setTextColor(120);doc.text(`BM ${esc(b.numero)} — ${b.empresaNome} — lista de colaboradores — página ${pg} de ${pages}`,M,205);doc.setTextColor(23,33,43)}
  }
  return doc;
}
async function exportBM(b,print){
  try{await garantirPdf()}catch(e){toast('Não foi possível preparar o PDF — verifique a internet e tente de novo.','bad');return}
  const btn=print?$('bm-print'):$('bm-pdf');const old=btn?btn.textContent:'';if(btn){btn.disabled=true;btn.textContent='Gerando…'}
  try{
    audit(print?'bm.imprimir':'bm.pdf',`BM ${esc(b.numero)} — ${b.empresaNome} — formato ${bmFmtDe(b).toUpperCase()}`,{empresa:b.empresaNome,entidade:'BM '+b.numero});save();
    const doc=bmPdfFmt(b);const name=bmNomeArq(b);
    const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
    if(dl){try{await dl.save({filename:name,data:doc.output('blob')});sucesso(print?'PDF salvo — abra e imprima para assinatura':'PDF salvo')}catch(e){if(e&&e.code==='declined')toast('Download cancelado');else doc.save(name)}}
    else if(print){doc.autoPrint();const w=window.open(doc.output('bloburl'),'_blank');if(!w){doc.save(name);sucesso('PDF gerado — abra e imprima')}else sucesso('PDF aberto para impressão')}
    else{doc.save(name);sucesso('PDF gerado')}
  }catch(e){toast('Falha ao gerar o PDF')}
  if(btn){btn.disabled=false;btn.textContent=old}
}
$('bm-pdf').onclick=()=>{if(BM)exportBM(BM,false)};
function isMobile(){return matchMedia('(max-width: 899px)').matches||matchMedia('(pointer: coarse)').matches}
function bmNomeArq(b){return `BM-${esc(b.numero)}-${b.empresaNome.replace(/[^\w\-]+/g,'_').slice(0,40)}-${b.ini}.pdf`}
async function shareBM(b){
  try{await garantirPdf()}catch(e){toast('Não foi possível preparar o PDF — verifique a internet e tente de novo.','bad');return}
  const btn=$('bm-share');btn.disabled=true;
  try{
    const doc=bmPdfFmt(b);const name=bmNomeArq(b);const file=new File([doc.output('blob')],name,{type:'application/pdf'});
    const txt=`Boletim de Medição nº ${esc(b.numero)} — ${b.empresaNome} — ${bmK(b).nome||''} — período ${br(b.ini)} à ${br(b.fim)} — ${money(b.liquido)}`;
    if(navigator.canShare&&navigator.canShare({files:[file]})){
      try{await navigator.share({files:[file],title:`BM nº ${esc(b.numero)} — ${b.empresaNome}`,text:txt});
        audit('bm.compartilhar',`BM ${esc(b.numero)} — ${b.empresaNome}`,{empresa:b.empresaNome,entidade:'BM '+b.numero});concluir(`PDF do BM nº ${esc(b.numero)} compartilhado`)}
      catch(e){if(e&&e.name==='AbortError')toast('Compartilhamento cancelado','info');else toast('Não foi possível compartilhar: '+((e&&e.message)||e),'bad')}
    }else{doc.save(name);toast('Este navegador não permite compartilhar arquivos — o PDF foi baixado; envie-o pelo WhatsApp ou outro app','info')}
  }catch(e){toast('Falha ao gerar o PDF','bad')}
  btn.disabled=false;
}
$('bm-share').onclick=()=>{if(BM)shareBM(BM)};

/* =================== CONFIGURAÇÕES =================== */
let CFGTAB=null, UEDIT=null, CEDIT=null, EEDIT=null, OEDIT=null, ELOGO=null;
function renderSetup(){
  const t=today();
  const steps=[
    ['cfg.empresas','empresas',S.empresas.length,'Cadastrar ao menos uma empresa (com logotipo para o BM)'],
    ['cfg.obras','obras',S.obras.length,'Cadastrar ao menos uma obra'],
    ['cfg.obras','obras',S.obras.length&&S.obras.every(o=>o.ativo===false||o.gestor)?1:0,'Informar o Gestor / Engenheiro de cada obra (é quem assina o BM)'],
    ['cfg.contratos','contratos',(S.contratos||[]).length||(S.obras.length&&S.obras.every(o=>vincObra(o)==='pedido'))?1:0,'Cadastrar os contratos (Nº, vigência) e os vínculos das obras — Configurações › Modalidades'],
    ['cfg.precos','precos',S.precos.length,'Cadastrar os preços das refeições por contrato'],
    ['cfg.colab','colab',S.colab.length,'Cadastrar colaboradores lendo o QR Code do crachá'],
    ['cfg.contratada','contratada',(S.contratadas||[]).length,'Cadastrar as contratadas (restaurantes) e as obras que atendem'],
    ['cfg.usuarios','usuarios',S.users.length-1,'Criar usuários do Restaurante e do Suprimentos'],
    ['cfg.usuarios','assinaturas',(((S.contratos||[]).length&&(S.contratos||[]).filter(c=>{const st=contratoStatus(c,t);return st==='vigente'||st==='a iniciar'}).every(c=>assinantesCt(c.id).length))||(S.obras.length&&S.obras.every(o=>vincObra(o)==='pedido')))&&(!S.obras.some(o=>o.ativo!==false&&vincTem(vincObra(o),'pedido'))||assinantesCt(PED).length)?1:0,'Liberar quem assina o BM (Gestor / Engenheiro) em cada contrato e nos pedidos'],
  ].filter(s=>can(s[0]));
  const done=steps.every(s=>s[2]>0);
  $('setup-card').hidden=done||!steps.length;
  $('setup-list').innerHTML=steps.map(s=>`<div class="st ${s[2]>0?'ok':'todo'}"><div class="dot">${s[2]>0?'✓':'!'}</div><button class="link" data-t="${s[1]}" style="background:none;border:0;padding:0;text-align:left;color:inherit;${s[2]>0?'':'font-weight:600'}">${s[3]}</button></div>`).join('');
  $('setup-list').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{CFGTAB=b.dataset.t;renderCfg()});
}
function cfgTabs(){
  const tabs=[];if(can('cfg.usuarios'))tabs.push(['usuarios','Usuários']);if(can('cfg.usuarios'))tabs.push(['permissoes','Permissões']);if(can('cfg.usuarios')&&isAdm(USER))tabs.push(['perfis','Perfis']);if(can('cfg.usuarios'))tabs.push(['assinaturas','Assinaturas']);if(can('cfg.colab'))tabs.push(['colab','Colaboradores']);if(can('cfg.empresas'))tabs.push(['empresas','Empresas']);if(can('cfg.obras'))tabs.push(['obras','Obras']);if(can('cfg.contratos'))tabs.push(['contratos','Modalidades']);if(can('cfg.precos'))tabs.push(['precos','Preços']);if(can('cfg.contratada'))tabs.push(['contratada','Contratadas']);if(can('cfg.horarios'))tabs.push(['horarios','Horários']);if(can('lgpd.gerir'))tabs.push(['lgpd','Privacidade (LGPD)']);if(AUD_ABAS.some(a=>can(a[1])))tabs.push(['auditoria','Auditoria']);
  return tabs}
function renderCfg(){
  const tabs=cfgTabs();
  if(!tabs.some(t=>t[0]===CFGTAB))CFGTAB=tabs[0]&&tabs[0][0];
  phRot('cfg-titulo',cfgRotulo());
  $('cfg-tabs').innerHTML=tabs.map(t=>`<button data-t="${t[0]}" class="${CFGTAB===t[0]?'on':''}">${t[1]}</button>`).join('');
  $('cfg-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(CFGTAB!==b.dataset.t){audit('nav.cfg','Configurações › '+b.textContent);save()}CFGTAB=b.dataset.t;renderCfg()});
  document.querySelectorAll('.cfg-pane').forEach(p=>p.hidden=p.id!=='cfg-'+CFGTAB);
  {const c=$('cfg-tabs'),o=c.querySelector('.on');if(o&&c.scrollWidth>c.clientWidth){const d=o.getBoundingClientRect().left-c.getBoundingClientRect().left;if(d<0||d+o.offsetWidth>c.clientWidth)c.scrollLeft+=d-(c.clientWidth-o.offsetWidth)/2}}   // v2.8.7: a guia escolhida fica à vista no celular
  renderSetup();
  navMarcar(PAGE);
  if(renderCfg.ult!==CFGTAB){renderCfg.ult=CFGTAB;obraForm(false)}   // v3.1.0: ao entrar em Obras, só a lista
  ({perfis:renderPerfis,usuarios:renderUsers,permissoes:renderPermissoes,assinaturas:renderAssinaturas,colab:renderColab,empresas:renderEmpresas,obras:renderObras,precos:renderPrecos,contratos:renderContratos,contratada:renderContratada,horarios:renderHorarios,lgpd:renderLgpd,auditoria:renderAud}[CFGTAB]||(()=>{}))();
}
/* users */
/* perfis */
let PFEDIT=null;
function seedPerfis(){
  if((S.perfis||[]).length||!can('cfg.usuarios')||!isAdm(USER))return;
  const base=[['Administrador','Adm',PERFIS.Administrador],['Suprimentos','Suprimentos',PERFIS.Suprimentos],['Restaurante','Restaurante',PERFIS.Restaurante],['Obra','Obra',['sup.ver']]];
  base.forEach(([nome,tipo,perms])=>S.perfis.push({id:'pf-'+tipo.toLowerCase(),nome,tipo,perms:[...perms]}));
  S.users.forEach(u=>{const pf=S.perfis.find(p=>p.nome===u.perfil);if(pf&&!u.perfilId){u.perfilId=pf.id;u.tipo=u.tipo||pf.tipo}});
  save();
}
function perfil(id){return (S.perfis||[]).find(p=>p.id===id)}
function renderPerfis(){
  $('pf-list').innerHTML=(S.perfis||[]).map(p=>{const n=S.users.filter(u=>u.perfilId===p.id).length;return `<div class="item"><div class="avatar">${ini(p.nome)}</div><div class="t"><b>${esc(p.nome)} <span class="pill ${p.tipo==='Adm'?'warn':'neutral'}">${esc(p.tipo)}</span></b><span>${p.tipo==='Adm'?'todas as':nPerms(p.perms)} permissões · ${n} usuário(s)</span></div><button class="btn sec sm" data-pf="${esc(p.id)}">Editar</button></div>`}).join('')||'<div class="small muted">Nenhum perfil.</div>';
  $('pf-list').querySelectorAll('[data-pf]').forEach(b=>b.onclick=()=>{PFEDIT=perfil(b.dataset.pf);fillPerfil()});
  if(!$('pf-perms').innerHTML)fillPerfil();
}
function fillPerfil(){
  const p=PFEDIT||{nome:'',tipo:'Obra',perms:[]};
  $('pf-form-title').textContent=PFEDIT?'Editar perfil':'Novo perfil';$('pf-nome').value=p.nome;$('pf-tipo').value=p.tipo;$('pf-err').hidden=true;
  $('pf-del').hidden=!PFEDIT;renderPfPerms(new Set(p.tipo==='Adm'?PERFIS.Administrador:permsEfetivas(p.perms)));
}
function renderPfPerms(set){
  const adm=$('pf-tipo').value==='Adm';$('pf-adm-note').hidden=!adm;
  $('pf-perms').innerHTML=permsGrade().map(q=>q.grp?`<div class="grp">${q.grp}</div>`:`<span>${q.nome}</span><button type="button" class="switch${adm||set.has(q.id)?' on':''}" data-pp="${esc(q.id)}" role="switch" aria-checked="${adm||set.has(q.id)}" ${adm?'disabled':''} aria-label="${esc(q.nome)}"></button>`).join('');
  const upd=()=>{$('pf-perms-sum').textContent=`${$('pf-perms').querySelectorAll('.switch.on').length} de ${permsGrade().filter(q=>q.id).length} ligadas`};
  $('pf-perms').querySelectorAll('.switch').forEach(b=>b.onclick=()=>{b.classList.toggle('on');b.setAttribute('aria-checked',b.classList.contains('on'));upd()});upd();
}
$('pf-tipo').onchange=()=>renderPfPerms(new Set([...$('pf-perms').querySelectorAll('.switch.on')].map(b=>b.dataset.pp)));
$('pf-new').onclick=()=>{PFEDIT=null;fillPerfil()};$('pf-cancel').onclick=()=>{PFEDIT=null;fillPerfil()};
$('pf-save').onclick=()=>{
  const err=$('pf-err');const show=m=>{err.hidden=false;err.textContent=m};
  const nome=$('pf-nome').value.trim(),tipo=$('pf-tipo').value;if(!nome)return show('Informe o nome do perfil.');
  if(S.perfis.some(p=>p.nome.toLowerCase()===nome.toLowerCase()&&p!==PFEDIT))return show('Já existe perfil com este nome.');
  const perms=(tipo==='Adm'?[...PERFIS.Administrador]:[...$('pf-perms').querySelectorAll('.switch.on')].map(b=>b.dataset.pp)).concat([ACESSO_MARCA]);
  if(PFEDIT&&PFEDIT.tipo==='Adm'&&tipo!=='Adm'&&S.users.some(u=>u.perfilId===PFEDIT.id&&u.id===USER.id))return show('Você não pode tirar o tipo Adm do seu próprio perfil.');
  audit('perfil.salvar',`${PFEDIT?'Alterou':'Criou'} perfil ${nome} (${tipo}) — ${nPerms(perms)} permissões`,{entidade:'perfil '+nome,antes:PFEDIT?JSON.stringify({nome:PFEDIT.nome,tipo:PFEDIT.tipo,perms:PFEDIT.perms}):null,depois:JSON.stringify({nome,tipo,perms})});
  if(PFEDIT){Object.assign(PFEDIT,{nome,tipo,perms});S.users.filter(u=>u.perfilId===PFEDIT.id).forEach(u=>{u.perms=[...perms];u.perfil=nome;u.tipo=tipo})}
  else S.perfis.push({id:uid(),nome,tipo,perms});
  concluir('Perfil salvo');PFEDIT=null;fillPerfil();renderPerfis();
};
$('pf-del').onclick=()=>{if(!PFEDIT)return;const n=S.users.filter(u=>u.perfilId===PFEDIT.id).length;if(n){toast(`Há ${n} usuário(s) com este perfil — troque o perfil deles antes`);return}
  const p=PFEDIT;confirmDelete({titulo:`Excluir perfil ${esc(p.nome)}`,resumo:'<div class="notice warn">O perfil deixa de aparecer no cadastro de usuários.</div>',botao:'Excluir perfil',onOk:async(_,motivo)=>{S.perfis=S.perfis.filter(x=>x!==p);audit('perfil.excluir',`${p.nome} — motivo: ${motivo}`,{entidade:'perfil '+p.nome});concluir(`Perfil ${p.nome} excluído`);PFEDIT=null;fillPerfil();renderPerfis()}})};
function renderUsers(){
  const pend=S.users.filter(u=>u.status==='pendente');$('u-pend-card').hidden=!pend.length;
  $('u-pend').innerHTML=pend.map(u=>`<div class="item"><div class="avatar">${ini(u.login||u.nome)}</div><div class="t"><b class="mono">${esc((u.login||'').toUpperCase())}</b><span>${esc((u.email||'').toUpperCase())}</span></div><select data-pp-pf="${esc(u.id)}" style="width:auto">${perfisQuePosso().slice().sort((a,b)=>(a.tipo==='Adm')-(b.tipo==='Adm')).map(p=>`<option value="${esc(p.id)}">${esc(p.nome)} (${esc(p.tipo)})</option>`).join('')}</select><button class="btn good sm" data-ap="${esc(u.id)}">Aprovar</button>${isAdm(USER)?`<button class="btn danger sm" data-ng="${esc(u.id)}">Negar</button>`:''}</div>`).join('');
  $('u-pend').querySelectorAll('[data-ap]').forEach(b=>b.onclick=()=>{const u=S.users.find(x=>x.id===b.dataset.ap);const pf=perfil($('u-pend').querySelector(`[data-pp-pf="${u.id}"]`).value);if(!pf){toast(isAdm(USER)?'Cadastre um perfil antes':'Somente o administrador aprova esta conta: os perfis cadastrados têm acessos que você não tem','warn');return}
    Object.assign(u,{status:'aprovado',ativo:true,perfilId:pf.id,perfil:pf.nome,tipo:pf.tipo,perms:pf.tipo==='Adm'?[...PERFIS.Administrador]:[...pf.perms],nome:u.nome||u.login});
    audit('usuario.aprovar',`${(u.login||'').toUpperCase()} (${u.email}) aprovado com o perfil ${pf.nome}`,{entidade:'usuário '+u.login});notify('conta.aprovada',`Sua conta foi aprovada com o perfil ${pf.nome}. Bem-vindo ao CAP-Refeições!`,[u.id]);concluir('Conta aprovada');renderUsers()});
  $('u-pend').querySelectorAll('[data-ng]').forEach(b=>b.onclick=()=>{const u=S.users.find(x=>x.id===b.dataset.ng);
    confirmDelete({titulo:`Negar conta ${esc((u.login||'').toUpperCase())}`,resumo:`<div class="notice warn">A conta ${esc(u.email)} será excluída. A pessoa poderá se cadastrar de novo.</div>`,botao:'Negar e excluir',onOk:async(_,motivo)=>{const {error}=await sb.rpc('admin_delete_user',{target:u.id});if(error)throw error;S.users=S.users.filter(x=>x!==u);audit('usuario.negar',`${(u.login||'').toUpperCase()} (${u.email}) — motivo: ${motivo}`,{entidade:'usuário '+u.login});concluir('Conta negada e excluída');renderUsers()}})});
  $('u-list').innerHTML=S.users.filter(u=>u.status!=='pendente').map(u=>`<div class="item"><div class="avatar">${ini(u.nome)}</div><div class="t"><b>${esc(u.nome)} <span class="pill ${isAdm(u)?'warn':'neutral'}">${esc(u.tipo||'—')}</span></b><span>${esc(u.perfil)} · <span class="mono">${esc(u.login)}</span> · ${isAdm(u)?'todas as':nPerms(u.perms)} permissões · ${u.obras&&u.obras.length?u.obras.length+' obra(s)':'todas as obras'} · ${u.contratadas&&u.contratadas.length?esc(u.contratadas.map(id=>(ct(id)||{}).nome).filter(Boolean).join(', ')):'todos os restaurantes'}</span></div>${u.ativo?'':'<span class="pill bad">inativo</span>'}${isAdm(u)&&!isAdm(USER)?'<span class="small muted" title="Somente um administrador altera contas de administrador">só o Adm altera</span>':`<button class="btn sec sm" data-u="${esc(u.id)}">Editar</button>`}</div>`).join('');
  $('u-list').querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{UEDIT=S.users.find(u=>u.id===b.dataset.u);fillUser()});
  if(!renderUsers.ok){renderUsers.ok=1;fillUser()}   // v3.1.0: o formulário não tem mais as permissões
}
function fillUser(){
  // v3.1.0: aqui é só o cadastro (nome, login, senha, tipo, situação, obras e restaurantes). As permissões ficam em
  // Configurações › Permissões; o perfil vale só como ponto de partida da conta nova.
  const PQ=perfisQuePosso(),pfR=PQ.find(p=>p.tipo==='Restaurante')||PQ[0];
  const u=UEDIT||{nome:'',login:'',senha:'',tipo:pfR?pfR.tipo:'Restaurante',perms:[],ativo:true};
  $('u-form-title').textContent=UEDIT?'Editar usuário':'Novo usuário';
  $('u-perfil-wrap').hidden=!!UEDIT;
  $('u-perfil').innerHTML=PQ.map(p=>`<option value="${esc(p.id)}">${esc(p.nome)}${p.tipo==='Adm'?' (administrador)':''}</option>`).join('')+'<option value="nenhum">Nenhum acesso — liberar depois em Permissões</option>';
  if(!UEDIT)$('u-perfil').value=pfR?pfR.id:'nenhum';
  {const oa=$('u-tipo').querySelector('option[value="Adm"]');if(oa)oa.disabled=!isAdm(USER)}
  $('u-nome').value=u.nome;$('u-login').value=(u.login||'').toUpperCase();$('u-email').value=(UEDIT&&u.email||'').toUpperCase();$('u-email').disabled=!!UEDIT;$('u-senha').value='';$('u-tipo').value=isAdm(u)?'Adm':(['Suprimentos','Obra','Restaurante'].includes(u.tipo)?u.tipo:'Obra');$('u-ativo').value=u.ativo?'1':'0';
  uTipoTrava();
  $('u-del').hidden=!(UEDIT&&isAdm(USER)&&!isAdm(UEDIT)&&!souEu(UEDIT));
  $('u-login').disabled=!!UEDIT;$('u-senha').placeholder=UEDIT?'nova senha — deixe em branco para manter':'mín. 8 caracteres, com letras e números';$('u-senha').disabled=false;$('u-senha').type='password';$('u-senha-hint').hidden=!UEDIT;
  uAcessos(UEDIT);
  renderSwitchList('u-obras',S.obras.map(o=>({id:o.id,nome:o.nome+(o.ativo===false?' (encerrada)':'')})),new Set(u.obras||[]),'data-ob','todas');
  renderSwitchList('u-cts',(S.contratadas||[]).map(c=>({id:c.id,nome:c.nome+(c.ativo===false?' (inativa)':'')})),new Set(u.contratadas||[]),'data-uct','todos');
  document.querySelectorAll('#u-form-card [data-coll], .coll[data-coll]').forEach(c=>{c.classList.remove('open');c.querySelector('.coll-b').hidden=true;c.querySelector('.coll-h').setAttribute('aria-expanded','false')});
}
function renderSwitchList(id,items,sel,attr,todos){
  $(id).innerHTML=items.map(o=>`<span>${esc(o.nome)}</span><button type="button" class="switch${sel.has(o.id)?' on':''}" ${attr}="${esc(o.id)}" role="switch" aria-checked="${sel.has(o.id)}" aria-label="${esc(o.nome)}"></button>`).join('')||'<span class="small muted">Nada cadastrado ainda.</span>';
  const upd=()=>{const n=$(id).querySelectorAll('.switch.on').length;$(id+'-sum').textContent=n?`${n} de ${items.length}`:`${todos} (${items.length})`};
  $(id).querySelectorAll('.switch').forEach(b=>b.onclick=()=>{b.classList.toggle('on');b.setAttribute('aria-checked',b.classList.contains('on'));upd()});upd();
}
document.querySelectorAll('.coll[data-coll] .coll-h').forEach(h=>h.onclick=()=>{const c=h.parentElement;const open=!c.classList.contains('open');c.classList.toggle('open',open);c.querySelector('.coll-b').hidden=!open;h.setAttribute('aria-expanded',open)});
/* v3.1.0: os acessos do usuário aparecem só para consulta — liberar ou tirar é em Configurações › Permissões (por ação) */
function uAcessos(u){const box=$('u-acessos-coll');if(!box)return;box.hidden=!u;if(!u)return;
  const adm=isAdm(u),tem=new Set(permsEfetivas(u.perms)),A=pmAcoes(),n=adm?A.length:A.filter(a=>tem.has(a.id)).length;
  $('u-acessos-sum').textContent=adm?'todos (administrador)':`${n} de ${A.length}`;
  const grp=[];A.forEach(a=>{if(!adm&&!tem.has(a.id))return;let g=grp.find(x=>x.g===a.g);if(!g)grp.push(g={g:a.g,L:[]});g.L.push(a)});
  $('u-acessos').innerHTML=(adm?'<div class="small muted">Administrador: tem todas as ações do sistema.</div>':grp.length?grp.map(g=>`<div class="u-ac-g"><span class="u-ac-gt">${esc(g.g)}</span><div class="u-ac-l">${g.L.map(a=>`<span class="u-ac${a.s?' sens':''}">${esc(a.t)}</span>`).join('')}</div></div>`).join(''):'<div class="small muted">Nenhum acesso liberado ainda.</div>')
    +`<div class="u-ac-ir">${can('cfg.usuarios')?'<button type="button" class="btn sec sm" id="u-ir-perm">Liberar ou tirar acessos em Permissões</button>':''}<span class="small muted">As permissões mudam por ação, em Configurações › Permissões.</span></div>`;
  const b=$('u-ir-perm');if(b)b.onclick=()=>{CFGTAB='permissoes';PM.det=false;PM.ubusca=u.nome||'';renderCfg();window.scrollTo(0,0)}}
function uTipoTrava(){const pf=!UEDIT&&perfil($('u-perfil').value);if(pf)$('u-tipo').value=pf.tipo;$('u-tipo').disabled=!!pf}
$('u-perfil').onchange=uTipoTrava;
$('u-del').onclick=()=>{const u=UEDIT;if(!u||!isAdm(USER)||isAdm(u))return;
  confirmDelete({titulo:`Excluir usuário ${esc(u.nome)}`,resumo:`<div class="notice warn">A conta <b>${esc((u.login||'').toUpperCase())}</b> (${esc(u.email||'')}) perde o acesso imediatamente. Os registros feitos por ela continuam no histórico e na auditoria.</div>`,botao:'Excluir usuário',
    onOk:async(_,motivo)=>{const {error}=await sb.rpc('admin_delete_user',{target:u.id});if(error)throw error;S.users=S.users.filter(x=>x!==u);if(LAST.users)delete LAST.users[u.id];audit('usuario.excluir',`${u.nome} (${u.login}) — motivo: ${motivo}`,{entidade:'usuário '+u.login});concluir('Usuário excluído');UEDIT=null;fillUser();renderUsers()}})};
$('u-new').onclick=()=>{UEDIT=null;fillUser()};
$('u-senha-gen').onclick=()=>{const a='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';let p='';do{p='';const r=new Uint32Array(12);crypto.getRandomValues(r);r.forEach(x=>p+=a[x%a.length])}while(!senhaOk(p));$('u-senha').type='text';$('u-senha').value=p;$('u-senha').select()};$('u-cancel').onclick=()=>{UEDIT=null;fillUser()};
$('u-save').onclick=async()=>{
  const nome=$('u-nome').value.trim(),login=$('u-login').value.trim().toUpperCase(),senha=$('u-senha').value,emailIn=$('u-email').value.trim().toLowerCase();
  if(!nome||!login){toast('Preencha nome e usuário');return}
  if(!UEDIT&&!senhaOk(senha)){toast('Senha: '+SENHA_REGRA);return}
  if(S.users.some(u=>(u.login||'').toUpperCase()===login&&u!==UEDIT)){toast('Já existe usuário com este login');return}
  // v3.1.0: as permissões não mudam por aqui — a conta existente mantém as dela; a nova começa com as do perfil escolhido (ou nenhuma)
  const pfNovo=!UEDIT?perfil($('u-perfil').value):null;
  let perms=UEDIT?[...(UEDIT.perms||[])]:(pfNovo?permsEfetivas(pfNovo.perms).concat([ACESSO_MARCA]):[ACESSO_MARCA]);
  const obras=[...$('u-obras').querySelectorAll('.switch.on')].map(i=>i.dataset.ob);
  const contratadas=[...$('u-cts').querySelectorAll('.switch.on')].map(i=>i.dataset.uct);
  const pf=pfNovo;const tipo=pf?pf.tipo:$('u-tipo').value;
  if(souEu(UEDIT)&&isAdm(USER)&&tipo!=='Adm'){toast('Você não pode tirar o tipo Administrador da própria conta');return}
  if(!isAdm(USER)){ // o servidor aplica as mesmas regras
    if(UEDIT&&isAdm(UEDIT)){toast('Somente um administrador altera contas de administrador');return}
    if(tipo==='Adm'){toast('Somente um administrador pode criar ou promover outro administrador');return}
    if(!UEDIT&&perms.some(x=>x!==ACESSO_MARCA&&!can(x))){toast('Você só pode conceder acessos que você mesmo tem — escolha outro perfil inicial');return}
  }
  // tipo Administrador = todas as ações. Quem deixa de ser administrador fica sem acessos (libere em Permissões).
  const rebaixa=!!UEDIT&&isAdm(UEDIT)&&tipo!=='Adm';if(rebaixa)perms=[ACESSO_MARCA];
  let perfilId=null,perfilNome='Personalizado';
  if(!UEDIT){if(pf){perfilId=pf.id;perfilNome=pf.nome}}
  else if(tipo==='Adm'){if(isAdm(UEDIT)){perfilId=UEDIT.perfilId||null;perfilNome=UEDIT.perfil||'Administrador'}else{const pa=(S.perfis||[]).find(p=>p.tipo==='Adm');perfilId=pa?pa.id:null;perfilNome='Administrador'}}
  else if(!rebaixa){const pu=UEDIT.perfilId&&perfil(UEDIT.perfilId);if(!pu||pu.tipo===tipo){perfilId=UEDIT.perfilId||null;perfilNome=UEDIT.perfil||'Personalizado'}}   // mudou o tipo: deixa o perfil (as permissões continuam)
  const obj={nome,login,perfilId,perfil:perfilNome,tipo,perms:tipo==='Adm'?[...PERFIS.Administrador]:perms,ativo:$('u-ativo').value==='1',obras,contratadas,status:'aprovado'};
  $('u-save').disabled=true;let okMsg=UEDIT?(rebaixa?`Usuário salvo — ${nome} deixou de ser administrador e está sem acessos: libere em Permissões`:'Usuário salvo'):`Usuário ${login} criado`;
  try{
    if(UEDIT){
      if(senha){
        if(!senhaOk(senha))throw new Error('a nova senha precisa ter '+SENHA_REGRA);
        if(souEu(UEDIT)){const {error}=await sb.auth.updateUser({password:senha});if(error)throw error}
        else{const {error}=await sb.rpc('admin_set_password',{target:UEDIT.id,new_password:senha});if(error)throw error}
        if(!UEDIT)throw new Error('este usuário não existe mais (foi excluído em outro aparelho) — a senha chegou a ser alterada');
        audit('usuario.senha',`${souEu(UEDIT)?'Alterou a própria senha':'Redefiniu a senha de '+UEDIT.nome+' ('+UEDIT.login+')'}`,{entidade:'usuário '+UEDIT.login});
        okMsg=souEu(UEDIT)?'Usuário salvo — sua senha foi alterada':`Usuário salvo — senha de ${UEDIT.nome} redefinida, informe ao usuário`;
      }
      if(!UEDIT)throw new Error('este usuário não existe mais (foi excluído em outro aparelho)');
      audit('usuario.salvar',`Alterou usuário ${nome} (${login}) — perfil ${obj.perfil}, ${nPerms(perms)} permissões${obj.ativo?'':', inativo'}`,{entidade:'usuário '+login,antes:JSON.stringify({nome:UEDIT.nome,perfil:UEDIT.perfil,perms:UEDIT.perms,ativo:UEDIT.ativo}),depois:JSON.stringify(obj)});
      Object.assign(UEDIT,obj);if(souEu(UEDIT)&&UEDIT!==USER)Object.assign(USER,obj);
      if(souEu(UEDIT)){$('who-name').textContent=USER.nome;$('who-role').textContent=USER.tipo||USER.perfil;buildNav();CFGTAB='usuarios';go('cfg')}
    }else{
      // conta criada no servidor já com e-mail confirmado (não envia e-mail e não derruba a sessão do administrador)
      const email=emailIn||toEmail(login);
      const {data:newId,error}=await sb.rpc('admin_create_user',{p_email:email,p_password:senha,p_nome:nome,p_login:login});
      if(error)throw error;if(!newId)throw new Error('o servidor não retornou o usuário criado');
      audit('usuario.salvar',`Criou usuário ${nome} (${login}) — perfil ${obj.perfil}, ${nPerms(obj.perms)} permissões`,{entidade:'usuário '+login,depois:JSON.stringify(obj)});
      S.users.push({id:newId,email,...obj});
      // v3.1.8: e-mail que já tinha conta no Painel de Suprimentos — a conta é vinculada e a senha continua a do Painel
      try{const {data:doPainel}=await sb.rpc('conta_do_painel',{p_id:newId});
        if(doPainel===true){const u=S.users.find(x=>x.id===newId);if(u)u.contaPainel=true;
          okMsg=`Usuário ${login} vinculado — este e-mail já tem conta no Painel de Suprimentos: ${nome} entra com a senha que já usa no Painel (a senha digitada aqui não foi usada)`}}catch(e){}
    }
    concluir(okMsg);UEDIT=null;fillUser();renderUsers();renderSetup();
  }catch(e){toast('Erro: '+(e.message||e))}
  $('u-save').disabled=false;
};
/* paginação das listas de Configurações */
const PAGES={};
function paginate(key,list,pp){list=ordLista(key,list);const pages=Math.max(1,Math.ceil(list.length/pp));let pg=PAGES[key]||1;if(pg>pages)pg=pages;if(pg<1)pg=1;PAGES[key]=pg;const i0=(pg-1)*pp;return {rows:list.slice(i0,i0+pp),pg,pages,i0,total:list.length}}
function renderPager(el,key,P,unit,rerender){
  if(!el)return;
  const un=Array.isArray(unit)?(P.total===1?unit[0]:unit[1]):unit;const faixa=P.total?`${P.i0+1}–${P.i0+P.rows.length} de ${esc(P.total)} ${un}`:'';
  // v3.0.1: "Mostrando a–b de N" e as páginas numeradas (1 2 3 … N)
  const pgB=(n,t,ar,dis,cur)=>`<button type="button" class="pg-b${cur?' on':''}" data-pg="${n}" aria-label="${ar}"${cur?' aria-current="page"':''}${dis?' disabled':''}>${t}</button>`;
  const nums=[];if(P.pages>1){const s=new Set([1,P.pages,P.pg-1,P.pg,P.pg+1].filter(n=>n>=1&&n<=P.pages));let ant=0;[...s].sort((a,b)=>a-b).forEach(n=>{if(n-ant>1)nums.push('…');nums.push(n);ant=n})}
  el.classList.add('pgr');
  el.innerHTML=P.pages>1?`<span class="pg-faixa">Mostrando <b class="num">${P.i0+1}–${P.i0+P.rows.length}</b> de <span class="num">${esc(P.total)}</span> ${un}</span><span class="pg-btns">${pgB(P.pg-1,'‹','Página anterior',P.pg===1)}${nums.map(n=>n==='…'?'<span class="pg-gap" aria-hidden="true">…</span>':pgB(n,String(n),'Página '+n,false,n===P.pg)).join('')}${pgB(P.pg+1,'›','Próxima página',P.pg===P.pages)}</span>`:(P.total?`<span class="pg-faixa">${faixa}</span>`:'');
  el.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{PAGES[key]=+b.dataset.pg;rerender()});
}
/* colaboradores */
function renderColab(){
  if(!CEDIT){fillSelect($('c-emp'),S.empresas.filter(e=>e.ativo!==false),$('c-emp').value);colabObraOpts($('c-emp').value,$('c-obra').value)}
  const need=[];if(!S.empresas.length)need.push('empresa');if(!S.obras.length)need.push('obra');
  $('c-need').hidden=!need.length;$('c-need').textContent=need.length?`Cadastre antes ao menos uma ${need.join(' e uma ')} nas abas correspondentes.`:'';
  $('c-save').disabled=!!need.length;
  const q=$('c-busca').value.trim().toLowerCase();
  const l=S.colab.filter(c=>obraOk(c.obraId)).filter(c=>{const e=emp(c.empresaId);return !q||[c.nome,c.qr,e?e.nome:''].some(x=>x.toLowerCase().includes(q))});
  renderRealoc();const P=paginate('colab',l,25);
  $('c-table').innerHTML=`<thead><tr><th>QR Code</th><th>Nome</th><th>Empresa</th><th>Obra</th><th></th></tr></thead><tbody>${P.rows.map(c=>{const e=emp(c.empresaId),o=obra(c.obraId);const dv=o&&o.empresaId&&o.empresaId!==c.empresaId;return `<tr><td>${c.qr?`<button class="btn sec sm qr-copiar" type="button" data-ccp="${esc(c.id)}" title="Copiar o código do QR Code" aria-label="Copiar o código do QR Code de ${esc(c.nome)}">Copiar</button>`:'<span class="muted">—</span>'}</td><td>${esc(c.nome)}${c.ativo?'':' <span class="pill bad">inativo</span>'}</td><td>${esc(e?e.nome:'—')}${e&&e.ativo===false?' <span class="pill bad">inativa</span>':''}</td><td>${esc(o?o.nome:'—')}${dv?` <span class="pill bad" title="A obra pertence a ${esc((emp(o.empresaId)||{}).nome||'outra empresa')} — realoque o colaborador">obra de outra empresa</span>`:o&&!o.empresaId?' <span class="pill warn" title="Defina a empresa da obra em Configurações › Obras">obra sem empresa</span>':''}${c.realocacoes&&c.realocacoes.length?` <span class="pill neutral" title="realocações">${c.realocacoes.length}×</span>`:''}</td><td><button class="btn sec sm" data-c="${esc(c.id)}">Editar</button></td></tr>`}).join('')||'<tr><td colspan="5" class="empty">Nenhum colaborador cadastrado. Leia o QR Code do crachá para começar.</td></tr>'}</tbody>`;
  $('c-table').querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{CEDIT=S.colab.find(c=>c.id===b.dataset.c);fillColab()});
  $('c-table').querySelectorAll('[data-ccp]').forEach(b=>b.onclick=()=>qrCopiar(S.colab.find(c=>c.id===b.dataset.ccp),b));
  renderPager($('c-pager'),'colab',P,['colaborador','colaboradores'],renderColab);
}
function fillColab(){const c=CEDIT||{qr:'',nome:'',empresaId:(S.empresas.find(e=>e.ativo!==false)||{}).id,obraId:(S.obras.find(o=>o.ativo!==false&&obraOk(o.id))||{}).id,ativo:true};
  $('c-form-title').textContent=CEDIT?'Editar colaborador':'Novo colaborador';$('c-qr').value=c.qr;$('c-qr').readOnly=true;$('c-nome').value=c.nome;
  fillSelect($('c-emp'),S.empresas.filter(e=>e.ativo!==false||e.id===c.empresaId),c.empresaId);
  if(CEDIT)fillSelect($('c-obra'),S.obras.filter(o=>o.id===c.obraId),c.obraId);else colabObraOpts(c.empresaId,c.obraId);
  $('c-emp').value=c.empresaId||'';$('c-obra').value=c.obraId||'';$('c-ativo').value=c.ativo?'1':'0';
  $('c-emp').disabled=!!CEDIT;$('c-obra').disabled=!!CEDIT;$('c-realoc-hint').hidden=!CEDIT;$('c-realoc').hidden=!CEDIT}
function colabObraOpts(empId,val,sel){sel=sel||$('c-obra');const l=obrasDaEmpresa(empId);
  sel.innerHTML=l.length?l.map(o=>`<option value="${esc(o.id)}"${o.id===val?' selected':''}>${esc(o.nome)}</option>`).join(''):`<option value="">${empId?'Nenhuma obra desta empresa — cadastre em Obras':'Selecione a empresa'}</option>`;
  if(!l.some(o=>o.id===val))sel.value=l[0]?l[0].id:''}
$('c-emp').addEventListener('change',()=>{if(!CEDIT)colabObraOpts($('c-emp').value,'')});
/* v2.9.3: o código do QR Code não aparece na lista — botão Copiar (fica na Auditoria) */
async function qrCopiar(c,btn){if(!c||!c.qr)return;let ok=false;
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(c.qr);ok=true}}catch(e){}
  if(!ok){try{const t=document.createElement('textarea');t.value=c.qr;t.setAttribute('readonly','');t.style.position='fixed';t.style.top='-100px';t.style.opacity='0';document.body.appendChild(t);t.select();ok=document.execCommand('copy');t.remove()}catch(e){}}
  if(!ok){toast('Não foi possível copiar neste navegador','bad');return}
  const e=emp(c.empresaId),o=obra(c.obraId);audit('colab.qr_copiar',`${c.nome} — código do QR Code copiado`,{empresa:e?e.nome:'',obra:o?o.nome:'',entidade:'colaborador '+c.qr});save();
  if(btn){btn.textContent='Copiado ✓';btn.classList.add('ok');setTimeout(()=>{if(btn.isConnected){btn.textContent='Copiar';btn.classList.remove('ok')}},1600)}sucesso('Código do QR Code copiado')}
function renderRealoc(){
  if(!$('rl-busca')||!$('rl-table'))return;
  const q=($('rl-busca').value||'').trim().toLowerCase();
  const rows=[];S.colab.forEach(c=>(c.realocacoes||[]).forEach(r=>rows.push({...r,colab:c.nome,qr:c.qr})));
  rows.sort((a,b)=>a.em<b.em?1:-1);
  const l=rows.filter(r=>!q||[r.colab,r.deEmpresa,r.paraEmpresa,r.deObra,r.paraObra,r.motivo].join(' ').toLowerCase().includes(q));
  $('rl-table').innerHTML=`<thead><tr><th>Data</th><th>Colaborador</th><th>Empresa</th><th>Obra</th><th>Motivo</th><th>Por</th></tr></thead><tbody>${l.map(r=>`<tr><td class="num">${brdt(r.em)}</td><td>${esc(r.colab)}</td><td>${r.deEmpresa===r.paraEmpresa?esc(r.paraEmpresa):`<span class="muted">${esc(r.deEmpresa)}</span> → <b>${esc(r.paraEmpresa)}</b>`}</td><td>${r.deObra===r.paraObra?esc(r.paraObra):`<span class="muted">${esc(r.deObra)}</span> → <b>${esc(r.paraObra)}</b>`}</td><td>${esc(r.motivo)}</td><td>${esc(r.usuario)}</td></tr>`).join('')||'<tr><td colspan="6" class="empty">Nenhuma realocação registrada.</td></tr>'}</tbody>`;
}
$('rl-busca').oninput=renderRealoc;   // v2.9.4: o histórico voltou para cá
// v2.8.8: ids rc-* — os rl-emp / rl-obra são do relatório de Registros (com os mesmos ids, as opções iam para lá e a janela ficava vazia)
$('c-realoc').onclick=()=>{
  if(!CEDIT)return;const c=CEDIT;const e0=emp(c.empresaId),o0=obra(c.obraId);
  infoModal(`Realocar — ${esc(c.nome)}`,`<div class="stack">
    <div class="notice info small">Atual: <b>${esc(e0?e0.nome:'—')}</b> / <b>${esc(o0?o0.nome:'—')}</b>. Altere a empresa, a obra ou ambas e informe o motivo.</div>
    <div class="grid2"><div class="field"><label for="rc-emp">Nova empresa</label><select id="rc-emp"></select></div><div class="field"><label for="rc-obra">Nova obra</label><select id="rc-obra"></select></div></div>
    <div class="field"><label for="rc-motivo">Motivo da realocação (obrigatório)</label><textarea id="rc-motivo" rows="3" placeholder="ex.: transferido para a obra X a pedido do gestor"></textarea></div>
    <div id="rc-err" class="notice bad" hidden></div>
    <button class="btn" id="rc-go">Confirmar realocação</button></div>`);
  fillSelect($('rc-emp'),S.empresas.filter(e=>e.ativo!==false||e.id===c.empresaId),c.empresaId);colabObraOpts(c.empresaId,c.obraId,$('rc-obra'));
  $('rc-emp').onchange=()=>colabObraOpts($('rc-emp').value,'',$('rc-obra'));
  $('rc-go').onclick=()=>{
    const ne=$('rc-emp').value,no=$('rc-obra').value,motivo=$('rc-motivo').value.trim();const err=$('rc-err');
    if(ne===c.empresaId&&no===c.obraId){err.hidden=false;err.textContent='Nada mudou: escolha outra empresa e/ou outra obra.';return}
    if(motivo.length<5){err.hidden=false;err.textContent='Informe o motivo da realocação.';return}
    if(!no){err.hidden=false;err.textContent='Escolha uma obra da nova empresa.';return}
    const oeR=obraEmpErro(ne,no);if(oeR){err.hidden=false;err.textContent=oeR;return}
    const e1=emp(ne),o1=obra(no);
    const rl={id:uid(),em:new Date().toISOString(),usuario:USER.nome,deEmpresaId:c.empresaId,deEmpresa:e0?e0.nome:'',paraEmpresaId:ne,paraEmpresa:e1?e1.nome:'',deObraId:c.obraId,deObra:o0?o0.nome:'',paraObraId:no,paraObra:o1?o1.nome:'',motivo};
    c.realocacoes=c.realocacoes||[];c.realocacoes.push(rl);c.empresaId=ne;c.obraId=no;
    audit('colab.realocar',`${c.nome}: ${rl.deEmpresa} / ${rl.deObra} → ${rl.paraEmpresa} / ${rl.paraObra} — motivo: ${motivo}`,{obra:rl.paraObra,empresa:rl.paraEmpresa,entidade:'colaborador '+c.qr,antes:`${rl.deEmpresa} / ${rl.deObra}`,depois:`${rl.paraEmpresa} / ${rl.paraObra}`});
    concluir('Colaborador realocado');$('info-modal').classList.remove('on');fillColab();renderColab();
  };
};
$('c-busca').oninput=()=>{PAGES.colab=1;renderColab()};$('c-new').onclick=()=>{CEDIT=null;fillColab()};$('c-cancel').onclick=()=>{CEDIT=null;fillColab()};
$('btn-scan-colab').onclick=()=>openScanner('Ler QR Code do crachá para cadastro',code=>{
  const dup=S.colab.find(x=>x.qr.toLowerCase()===code.toLowerCase()&&x!==CEDIT);
  $('c-qr').value=code;
  if(dup)toast(`Atenção: este QR Code já pertence a ${dup.nome}`);else toast('QR Code lido — complete os dados e salve');
  $('c-nome').focus();
});
$('c-qr-manual').onclick=()=>{$('c-qr').readOnly=false;$('c-qr').placeholder='digite o conteúdo do QR Code';$('c-qr').focus()};
$('c-save').onclick=()=>{
  const qr=$('c-qr').value.trim(),nome=$('c-nome').value.trim();
  if(!qr){toast('Leia o QR Code do crachá antes de salvar');return}
  if(!nome){toast('Informe o nome do colaborador');return}
  if(!$('c-emp').value||!$('c-obra').value){toast('Selecione empresa e obra');return}
  if(!CEDIT){const oeC=obraEmpErro($('c-emp').value,$('c-obra').value);if(oeC){toast(oeC,'bad');return}}
  if(S.colab.some(c=>c.qr.toLowerCase()===qr.toLowerCase()&&c!==CEDIT)){toast('Este QR Code já está cadastrado para outro colaborador');return}
  const obj={qr,nome,empresaId:CEDIT?CEDIT.empresaId:$('c-emp').value,obraId:CEDIT?CEDIT.obraId:$('c-obra').value,ativo:$('c-ativo').value==='1'};
  const ce=emp(obj.empresaId),co=obra(obj.obraId);audit('colab.salvar',`${CEDIT?'Alterou':'Cadastrou'} colaborador ${nome} — QR ${qr} — ${ce?ce.nome:''} / ${co?co.nome:''}${obj.ativo?'':' — inativo'}`,{obra:co?co.nome:'',empresa:ce?ce.nome:'',entidade:'colaborador '+qr,antes:CEDIT?JSON.stringify({nome:CEDIT.nome,qr:CEDIT.qr,empresa:(emp(CEDIT.empresaId)||{}).nome,obra:(obra(CEDIT.obraId)||{}).nome,ativo:CEDIT.ativo}):null,depois:JSON.stringify({nome,qr,empresa:ce&&ce.nome,obra:co&&co.nome,ativo:obj.ativo})});
  if(CEDIT)Object.assign(CEDIT,obj);else S.colab.push({id:uid(),...obj});
  concluir('Colaborador salvo');CEDIT=null;fillColab();renderColab();renderSetup();
};
/* empresas */
/* =================== EMPRESAS TERCEIRIZADAS (v2.9.3) ===================
   Na tabela empresas, com tipo:"terceirizada", ativa:true/false e ativo:false (as versões antigas não as oferecem como empresa).
   Servem para o Registro manual › Terceirizado (de onde veio o terceirizado). Acesso: o mesmo de Empresas (cfg.empresas). */
let EABA='emp',TEDIT=null,TLOGO=null;
function tercAtivas(){return (S.terceirizadas||[]).filter(t=>t.ativa!==false).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'))}
function tercDe(id){return (S.terceirizadas||[]).find(t=>t.id===id)}
function maiusc(v){return String(v||'').toLocaleUpperCase('pt-BR')}
function maiuscCampo(el){el.addEventListener('input',()=>{const a=el.selectionStart,b=el.selectionEnd,v=maiusc(el.value);if(v!==el.value){el.value=v;try{el.setSelectionRange(a,b)}catch(e){}}})}
function empAba(a){EABA=a;$('e-abas').querySelectorAll('[data-ea]').forEach(b=>{const on=b.dataset.ea===a;b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on))});
  $('e-pane').hidden=a!=='emp';$('t-pane').hidden=a!=='terc';if(a==='terc'){renderTerc();if(!TEDIT&&!$('t-nome').value)fillTerc()}}
$('e-abas').querySelectorAll('[data-ea]').forEach(b=>b.onclick=()=>empAba(b.dataset.ea));
function renderTerc(){
  const usos=new Map();S.registros.forEach(r=>{if(r.terceirizadaId)usos.set(r.terceirizadaId,(usos.get(r.terceirizadaId)||0)+1)});
  const l=(S.terceirizadas||[]).slice().sort((a,b)=>(a.ativa===false)-(b.ativa===false)||a.nome.localeCompare(b.nome,'pt-BR'));
  $('t-list').innerHTML=l.length?l.map(t=>`<div class="item">${logoOk(t.logo)?`<img class="logo-thumb" src="${esc(logoOk(t.logo))}" alt="">`:`<div class="avatar">${ini(t.nome)}</div>`}<div class="t"><b>${esc(t.nome)}${t.ativa===false?' <span class="pill bad">inativa</span>':''}</b><span>${t.cnpj?'CNPJ '+esc(t.cnpj)+' · ':''}${usos.get(t.id)||0} refeição(ões) registrada(s)</span></div><button class="btn sec sm" type="button" data-tat="${esc(t.id)}">${t.ativa===false?'Ativar':'Desativar'}</button><button class="btn sec sm" type="button" data-ted="${esc(t.id)}">Editar</button></div>`).join('')
    :'<div class="small muted" style="padding:8px 0">Nenhuma empresa terceirizada cadastrada.</div>';
  $('t-list').querySelectorAll('[data-ted]').forEach(b=>b.onclick=()=>{TEDIT=tercDe(b.dataset.ted);fillTerc();$('t-nome').focus()});
  $('t-list').querySelectorAll('[data-tat]').forEach(b=>b.onclick=()=>{const t=tercDe(b.dataset.tat);if(!t||!can('cfg.empresas'))return;t.ativa=t.ativa===false;
    audit('terceirizada.ativar',`${t.ativa?'Ativou':'Desativou'} a empresa terceirizada ${t.nome}`,{empresa:t.nome,entidade:'terceirizada '+t.nome});concluir(t.ativa?'Empresa terceirizada ativada':'Empresa terceirizada desativada');renderTerc();if(TEDIT===t)fillTerc()})}
function fillTerc(){const t=TEDIT||{nome:'',cnpj:'',ativa:true};
  $('t-form-title').textContent=TEDIT?'Editar empresa terceirizada':'Nova empresa terceirizada';$('t-nome').value=t.nome;$('t-cnpj').value=t.cnpj||'';$('t-ativa').value=t.ativa===false?'0':'1';
  TLOGO=t.logo?{data:t.logo,w:t.logoW,h:t.logoH}:null;showTLogo()}
function showTLogo(){$('t-logo-prev').hidden=!TLOGO;$('t-logo-empty').hidden=!!TLOGO;if(TLOGO)$('t-logo-prev').src=TLOGO.data}
$('t-logo').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const img=new Image();const url=URL.createObjectURL(f);
  img.onload=()=>{const max=600;const sc=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);
    const ctx=c.getContext('2d');if(f.type==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height)}ctx.drawImage(img,0,0,c.width,c.height);
    TLOGO={data:c.toDataURL(f.type==='image/jpeg'?'image/jpeg':'image/png',.9),w:c.width,h:c.height};URL.revokeObjectURL(url);showTLogo();toast('Logotipo carregado — salve a terceirizada')};
  img.onerror=()=>{URL.revokeObjectURL(url);toast('Não foi possível ler a imagem')};img.src=url};
$('t-logo-rm').onclick=()=>{TLOGO=null;showTLogo()};
$('t-new').onclick=()=>{TEDIT=null;fillTerc();$('t-nome').focus()};$('t-cancel').onclick=()=>{TEDIT=null;fillTerc()};
maiuscCampo($('t-nome'));
$('t-save').onclick=()=>{
  if(!can('cfg.empresas'))return;const nome=maiusc($('t-nome').value).trim().replace(/\s+/g,' ');if(!nome){toast('Informe o nome da empresa terceirizada');return}
  if((S.terceirizadas||[]).some(x=>x.nome.toLowerCase()===nome.toLowerCase()&&x!==TEDIT)){toast('Já existe empresa terceirizada com este nome');return}
  const obj={tipo:'terceirizada',nome,cnpj:$('t-cnpj').value.trim(),ativa:$('t-ativa').value==='1',ativo:false,logo:TLOGO?TLOGO.data:null,logoW:TLOGO?TLOGO.w:null,logoH:TLOGO?TLOGO.h:null};
  audit('terceirizada.salvar',`${TEDIT?'Alterou':'Cadastrou'} empresa terceirizada ${nome}${obj.cnpj?' — CNPJ '+obj.cnpj:''}${TLOGO?' — com logotipo':''}${obj.ativa?'':' — INATIVA'}`,{empresa:nome,entidade:'terceirizada '+nome});
  if(TEDIT){const antigo=TEDIT.nome;Object.assign(TEDIT,obj)}else{S.terceirizadas=S.terceirizadas||[];S.terceirizadas.push({id:uid(),...obj})}
  concluir('Empresa terceirizada salva');TEDIT=null;fillTerc();renderTerc()};
function renderEmpresas(){
  empAba(EABA);   // v2.9.3: guias Empresas / Empresas terceirizadas
  $('e-list').innerHTML=S.empresas.map(e=>`<div class="item">${logoOk(e.logo)?`<img class="logo-thumb" src="${esc(logoOk(e.logo))}" alt="">`:`<div class="avatar">${ini(e.nome)}</div>`}<div class="t"><b>${esc(e.nome)}${e.ativo===false?' <span class="pill bad">inativa</span>':''} <span class="pill ${vincEmp(e)==='contrato'?'neutral':'ok'}" title="Vínculo das obras na medição (BM)">${esc(VINC_CURTO[vincEmp(e)])}</span></b><span>${e.cnpj?esc(e.cnpj)+' · ':''}${S.obras.filter(o=>o.empresaId===e.id).length} obra(s) · ${S.colab.filter(c=>c.empresaId===e.id).length} colaboradores · próximo BM ${e.proximoBM||1}${e.logo?'':' · <span style="color:var(--warn)">sem logotipo</span>'}</span></div><button class="btn sec sm" data-e="${esc(e.id)}">Editar</button>${can('del.empresas')?`<button class="btn danger sm" data-edel="${esc(e.id)}">Excluir</button>`:''}</div>`).join('')||'<div class="small muted">Nenhuma empresa cadastrada.</div>';
  $('e-list').querySelectorAll('[data-edel]').forEach(b=>b.onclick=()=>excluirEmpresa(emp(b.dataset.edel)));
  $('e-list').querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{EEDIT=emp(b.dataset.e);fillEmpresa()});
  if(!$('e-ct').parentElement.querySelector('[data-ct]'))fillEmpresa();
}
function fillEmpresa(){
  const e=EEDIT||{nome:'',cnpj:'',proximoBM:1,logo:null,contrato:{}};
  $('e-form-title').textContent=EEDIT?'Editar empresa':'Nova empresa';$('e-nome').value=e.nome;$('e-cnpj').value=e.cnpj||'';$('e-prox').value=e.proximoBM||1;$('e-ativo').value=e.ativo===false?'0':'1';$('e-vinc').value=vincEmp(e);EVINC_ARM=null;$('e-vinc-av').hidden=true;$('e-save').textContent='Salvar empresa';
  ELOGO=e.logo?{data:e.logo,w:e.logoW,h:e.logoH}:null;showLogo();
  const grid=$('e-ct').parentElement;grid.querySelectorAll('[data-ct]').forEach(x=>x.remove());
  TIPOS.forEach(t=>{const c=(e.contrato||{})[t.id]||{};grid.insertAdjacentHTML('beforeend',`<div data-ct>${t.curto}</div><input data-ct data-k="qtd" data-t="${esc(t.id)}" type="number" min="0" value="${esc(c.qtd||'')}" placeholder="—"><input data-ct data-k="acumQtd" data-t="${esc(t.id)}" type="number" min="0" value="${esc(c.acumQtd||'')}" placeholder="0"><input data-ct data-k="acumVal" data-t="${esc(t.id)}" type="number" min="0" step="0.01" value="${esc(c.acumVal||'')}" placeholder="0,00">`)});
}
function showLogo(){$('e-logo-prev').hidden=!ELOGO;$('e-logo-empty').hidden=!!ELOGO;if(ELOGO)$('e-logo-prev').src=ELOGO.data}
$('e-logo').onchange=e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  const img=new Image();const url=URL.createObjectURL(f);
  img.onload=()=>{const max=600;const sc=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);
    const ctx=c.getContext('2d');if(f.type==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height)}ctx.drawImage(img,0,0,c.width,c.height);
    ELOGO={data:c.toDataURL(f.type==='image/jpeg'?'image/jpeg':'image/png',.9),w:c.width,h:c.height};URL.revokeObjectURL(url);showLogo();toast('Logotipo carregada — salve a empresa')};
  img.onerror=()=>{URL.revokeObjectURL(url);toast('Não foi possível ler a imagem')};
  img.src=url;
};
$('e-logo-rm').onclick=()=>{ELOGO=null;showLogo()};
$('e-new').onclick=()=>{EEDIT=null;fillEmpresa()};$('e-cancel').onclick=()=>{EEDIT=null;fillEmpresa()};
$('e-save').onclick=()=>{
  const nome=$('e-nome').value.trim();if(!nome){toast('Informe o nome da empresa');return}
  if(S.empresas.some(x=>x.nome.toLowerCase()===nome.toLowerCase()&&x!==EEDIT)){toast('Já existe empresa com este nome');return}
  const contrato={};$('e-ct').parentElement.querySelectorAll('input[data-ct]').forEach(i=>{const v=parseFloat(i.value);if(!contrato[i.dataset.t])contrato[i.dataset.t]={};contrato[i.dataset.t][i.dataset.k]=isNaN(v)?null:v});
  const obj={nome,cnpj:$('e-cnpj').value.trim(),proximoBM:parseInt($('e-prox').value,10)||1,logo:ELOGO?ELOGO.data:null,logoW:ELOGO?ELOGO.w:null,logoH:ELOGO?ELOGO.h:null,contrato,ativo:$('e-ativo').value==='1'};
  obj.vinculo=VINC[$('e-vinc').value]?$('e-vinc').value:'contrato';   // v2.9.12: o que as obras desta empresa podem usar
  const ajO=EEDIT?empVincAjustes(EEDIT,obj.vinculo):[];
  if(ajO.length){
    if(!can('cfg.obras')){empVincAviso(ajO,'Para mudar o vínculo desta empresa é preciso também o acesso “Cadastrar obras”: as obras abaixo precisam ser ajustadas.',true);return}
    const chave=obj.vinculo+'|'+ajO.map(a=>a.o.id+':'+a.v).join(',');
    if(EVINC_ARM!==chave){EVINC_ARM=chave;empVincAviso(ajO);$('e-save').textContent=`Confirmar e ajustar ${ajO.length} obra${ajO.length>1?'s':''}`;return}
  }
  const vAntes=EEDIT?vincEmp(EEDIT):null;
  audit('empresa.salvar',`${EEDIT?'Alterou':'Cadastrou'} empresa ${nome}${obj.cnpj?' — CNPJ '+obj.cnpj:''}${ELOGO?' — com logotipo':''} — próximo BM ${esc(obj.proximoBM)}${obj.ativo?'':' — INATIVA'}${!EEDIT?' — vínculo: '+VINC[obj.vinculo]:vAntes!==obj.vinculo?' — vínculo: '+VINC[vAntes]+' → '+VINC[obj.vinculo]:''}`,{empresa:nome,entidade:'empresa '+nome,antes:EEDIT&&vAntes!==obj.vinculo?VINC[vAntes]:null,depois:EEDIT&&vAntes!==obj.vinculo?VINC[obj.vinculo]:null});
  if(EEDIT){Object.assign(EEDIT,obj);if(can('sup.bm')||can('del.bm')){S.registros.forEach(r=>{if(r.empresaId===EEDIT.id)r.empresaNome=nome});S.sobras.forEach(s=>{if(s.empresaId===EEDIT.id)s.empresaNome=nome})}}else S.empresas.push({id:uid(),...obj});
  ajO.forEach(a=>{const O=a.o;O.vinculo=a.v;if(a.v==='pedido')delete O.contratoId;   // v2.9.12: obras ajustadas ao novo vínculo da empresa
    audit('obra.vinculo',`${O.nome} — ${a.antes} → ${vincTxt(O)} (ajuste pelo vínculo da empresa ${nome})`,{obra:O.nome,empresa:nome,entidade:'obra '+O.nome,antes:a.antes,depois:vincTxt(O)})});
  concluir(ajO.length?`Empresa salva — ${ajO.length} obra(s) ajustada(s)`:'Empresa salva');EEDIT=null;fillEmpresa();renderEmpresas();renderSetup();
};
/* v2.9.12: a empresa muda o que permite — as obras dela que precisam mudar para continuar coerentes */
let EVINC_ARM=null;
function empVincAjustes(E,nv){const L=[];S.obras.forEach(o=>{if(o.empresaId!==E.id)return;
    const fica=nv==='ambos'?vincObra(o):nv;   // passa a permitir os dois: cada obra continua como está hoje
    if(fica!==vincRaw(o)||(fica==='pedido'&&o.contratoId))L.push({o,v:fica,antes:vincTxt(o)})});
  return L}
function empVincAviso(L,titulo,bloq){const av=$('e-vinc-av');av.hidden=false;av.className='notice '+(bloq?'bad':'warn')+' small';
  av.innerHTML=`<b>${esc(titulo||'Ao salvar, estas obras da empresa mudam de vínculo:')}</b><ul style="margin:6px 0 0 18px;padding:0">${L.map(a=>{const C=contrato(a.o.contratoId);
    return `<li><b>${esc(a.o.nome)}</b>: ${esc(a.antes)} → ${esc(VINC[a.v])}${a.v==='pedido'&&C?` — deixa o contrato ${esc(C.numero)}; as próximas refeições usam os preços da Tabela geral`:''}${a.v!=='pedido'&&!C?' — fica sem contrato: vincule em Configurações › Modalidades':''}</li>`}).join('')}</ul>${bloq?'':'<div style="margin-top:6px">Refeições já registradas e BMs já emitidos não mudam. Confira e toque de novo no botão para confirmar.</div>'}`}
$('e-vinc').onchange=()=>{EVINC_ARM=null;$('e-vinc-av').hidden=true;$('e-save').textContent='Salvar empresa'};
function excluirEmpresa(E){
  if(!E||!can('del.empresas'))return;
  const regs=S.registros.filter(r=>r.empresaId===E.id),sob=S.sobras.filter(s=>s.empresaId===E.id),bms=S.bms.filter(b=>b.empresaId===E.id),col=S.colab.filter(c=>c.empresaId===E.id);
  confirmDelete({titulo:`Excluir empresa — ${esc(E.nome)}`,
    resumo:`<div class="notice info small">Vinculados a esta empresa: <b>${regs.length}</b> refeições registradas, <b>${sob.length}</b> sobras, <b>${bms.length}</b> BMs, <b>${col.length}</b> colaboradores. Em qualquer opção, os colaboradores ficam <b>inativos</b> e sem empresa — para voltarem a comer, use <i>Realocar</i>.</div>`,
    opcoes:[{v:'so',t:'Excluir somente a empresa',d:'Refeições, sobras e BMs continuam no histórico com o nome da empresa.'},
            {v:'tudo',t:'Excluir a empresa e os registros vinculados',d:`Apaga também as ${regs.length} refeições, ${sob.length} sobras e ${bms.length} BMs (com anexos) desta empresa. Não pode ser desfeito.`}],
    botao:'Excluir empresa',
    onOk:async(opt,motivo)=>{
      if(opt==='tudo'&&fechBloqueiaExclusao(regs,sob))return;   // v2.9.9
      if(opt==='tudo'){
        const paths=bms.filter(b=>b.anexo&&b.anexo.path).map(b=>b.anexo.path);if(paths.length){try{await sb.storage.from('anexos').remove(paths)}catch(e){}}
        S.registros=S.registros.filter(r=>r.empresaId!==E.id);S.sobras=S.sobras.filter(s=>s.empresaId!==E.id);S.bms=S.bms.filter(b=>b.empresaId!==E.id);
      }
      col.forEach(c=>{c.ativo=false;c.empresaId=null});
      S.empresas=S.empresas.filter(x=>x.id!==E.id);
      audit('empresa.excluir',`${E.nome} — ${opt==='tudo'?`com ${regs.length} refeições, ${sob.length} sobras e ${bms.length} BMs`:'somente a empresa'} — ${col.length} colaboradores inativados — motivo: ${motivo}`,{empresa:E.nome,entidade:'empresa '+E.nome,antes:'ativa',depois:'excluída'});
      concluir(`Empresa ${E.nome} excluída`);EEDIT=null;fillEmpresa();renderEmpresas();renderSetup();
    }});
}
function excluirObra(O){
  if(!O||!can('del.obras'))return;
  const daObra=r=>r.obraId?r.obraId===O.id:r.obraNome===O.nome;
  const regs=S.registros.filter(daObra),emBM=regs.filter(r=>r.bmId),livres=regs.filter(r=>!r.bmId);
  const col=S.colab.filter(c=>c.obraId===O.id);const colIds=new Set(col.map(c=>c.id));const sobAll=S.sobras.filter(s=>s.obraId?s.obraId===O.id:(s.colabId&&colIds.has(s.colabId)));const sob=sobAll.filter(s=>!s.bmId);
  confirmDelete({titulo:`Excluir obra — ${esc(O.nome)}`,
    resumo:`<div class="notice info small">Vinculados a esta obra: <b>${regs.length}</b> refeições (${emBM.length} já em BMs), <b>${sobAll.length}</b> sobras (${sobAll.length-sob.length} já em BMs), <b>${col.length}</b> colaboradores. Em qualquer opção, os colaboradores ficam <b>inativos</b> e a obra sai dos restaurantes que a atendiam.</div>`,
    opcoes:[{v:'so',t:'Excluir somente a obra',d:'Refeições e sobras continuam no histórico com o nome da obra.'},
            {v:'tudo',t:'Excluir a obra e os registros vinculados',d:`Apaga ${livres.length} refeições em aberto e ${sob.length} sobras em aberto.${emBM.length||sobAll.length>sob.length?` Refeições e sobras que já estão em BMs são mantidas — exclua os BMs antes se quiser apagá-las.`:''} Não pode ser desfeito.`}],
    botao:'Excluir obra',
    onOk:async(opt,motivo)=>{
      if(opt==='tudo'&&fechBloqueiaExclusao(livres,sob))return;   // v2.9.9
      if(opt==='tudo'){const ids=new Set(livres.map(r=>r.id));S.registros=S.registros.filter(r=>!ids.has(r.id));const sids=new Set(sob.map(s=>s.id));S.sobras=S.sobras.filter(s=>!sids.has(s.id))}
      col.forEach(c=>{c.ativo=false;c.obraId=null});
      (S.contratadas||[]).forEach(c=>{if((c.obras||[]).includes(O.id))c.obras=c.obras.filter(x=>x!==O.id)});
      S.obras=S.obras.filter(x=>x.id!==O.id);
      audit('obra.excluir',`${O.nome} — ${opt==='tudo'?`com ${livres.length} refeições e ${sob.length} sobras`:'somente a obra'} — ${col.length} colaboradores inativados — motivo: ${motivo}`,{obra:O.nome,entidade:'obra '+O.nome,antes:'ativa',depois:'excluída'});
      concluir(`Obra ${O.nome} excluída`);OEDIT=null;fillObra();obraForm(false);renderObras();renderSetup();
    }});
}
/* obras */
function renderObras(){
  fillSelect($('o-f-emp'),S.empresas,$('o-f-emp').value,'Todas as empresas');const fEmp=$('o-f-emp').value;if(!$('o-emp').options.length)fillObraEmp();
  renderDivergencias();
  const PO=paginate('obras',S.obras.filter(o=>obraOk(o.id)&&(!fEmp||o.empresaId===fEmp)).sort((a,b)=>((emp(a.empresaId)||{}).nome||'~').localeCompare((emp(b.empresaId)||{}).nome||'~')||a.nome.localeCompare(b.nome)),10);
  $('o-list').innerHTML=PO.rows.map(o=>{const E=emp(o.empresaId);const outros=S.colab.filter(c=>c.obraId===o.id&&c.ativo!==false&&o.empresaId&&c.empresaId!==o.empresaId).length;return `<div class="item"><div class="avatar">${ini(o.nome)}</div><div class="t"><b>${esc(o.nome)} ${obraVincPills(o)}</b><span>${E?`<b style="color:var(--ink)">${esc(E.nome)}</b> · `:'<span class="pill bad">sem empresa</span> · '}${o.gestor?`Gestor / Engenheiro: <span style="color:var(--ink);font-weight:600">${esc(o.gestor)}</span>${o.gestorCargo?' ('+esc(o.gestorCargo)+')':''} · `:o.ativo===false?'':'<span class="pill warn">sem Gestor / Engenheiro</span> · '}${outros?`<span class="pill bad">${outros} colaborador(es) de outra empresa</span> · `:''}${o.endereco?esc(o.endereco)+' · ':''}${S.colab.filter(c=>c.obraId===o.id).length} colaboradores · restaurante: ${esc((S.contratadas||[]).filter(c=>(c.obras||[]).includes(o.id)).map(c=>c.nome).join(', ')||'nenhum')}${o.ativo===false?' · encerrada':''}</span></div><button class="btn sec sm" data-func="${esc(o.id)}">Funcionários</button><button class="btn sec sm" data-o="${esc(o.id)}">Editar</button>${can('del.obras')?`<button class="btn danger sm" data-odel="${esc(o.id)}">Excluir</button>`:''}</div>`}).join('')||`<div class="small muted">${fEmp?'Nenhuma obra desta empresa.':'Nenhuma obra cadastrada.'}</div>`;
  $('o-list').querySelectorAll('[data-odel]').forEach(b=>b.onclick=()=>excluirObra(obra(b.dataset.odel)));
  renderPager($('o-pager'),'obras',PO,['obra','obras'],renderObras);
  $('o-list').querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{OEDIT=obra(b.dataset.o);fillObra()});
  $('o-list').querySelectorAll('[data-func]').forEach(b=>b.onclick=()=>{const o=obra(b.dataset.func);const l=S.colab.filter(c=>c.obraId===o.id).sort((a,c)=>a.nome.localeCompare(c.nome));
    infoModal(`Funcionários — ${esc(o.nome)} (${l.length})`,`<div class="tablewrap"><table><thead><tr><th>#</th><th>Nome</th><th>Empresa</th><th>QR Code</th><th>Situação</th></tr></thead><tbody>${l.map((c,i)=>{const e=emp(c.empresaId);return `<tr><td class="num">${i+1}</td><td>${esc(c.nome)}</td><td>${esc(e?e.nome:'—')}</td><td class="mono">${esc(c.qr)}</td><td>${c.ativo?'<span class="pill ok">ativo</span>':'<span class="pill bad">inativo</span>'}</td></tr>`}).join('')||'<tr><td colspan="5" class="empty">Nenhum colaborador alocado nesta obra.</td></tr>'}</tbody></table></div>`)});
}
function renderDivergencias(){
  const el=$('o-div');const D=divergencias();const partes=[];
  if(D.semEmp.length)partes.push(`<div class="notice warn small" style="margin:0"><b>${D.semEmp.length} obra(s) sem empresa definida.</b> Edite e escolha a empresa dona — enquanto isso, não há registro de refeição nessas obras.<div class="row" style="gap:6px;margin-top:6px">${D.semEmp.map(o=>`<button type="button" class="btn sec sm" data-dobra="${esc(o.id)}">${esc(o.nome)}</button>`).join('')}</div></div>`);
  if(D.colab.length)partes.push(`<div class="notice bad small" style="margin:0"><b>${D.colab.length} colaborador(es) em obra de outra empresa.</b> O registro de refeição deles fica bloqueado até a realocação (Colaboradores › Editar › Realocar).<div class="row" style="gap:6px;margin-top:6px">${D.colab.map(c=>{const o=obra(c.obraId),e=emp(c.empresaId);return `<button type="button" class="btn sec sm" data-dcol="${esc(c.id)}" title="${esc(o?o.nome:'')} pertence a ${esc((emp(o&&o.empresaId)||{}).nome||'')}">${esc(c.nome)} · ${esc(e?e.nome:'—')} → ${esc(o?o.nome:'—')}</button>`}).join('')}</div></div>`);
  {const semCt=S.obras.filter(o=>o.ativo!==false&&obraOk(o.id)&&vincObra(o)!=='pedido'&&!contrato(o.contratoId));   // v2.9.13: modalidade com contrato, sem o nº
   if(semCt.length)partes.push(`<div class="notice warn small" style="margin:0"><b>${semCt.length} obra(s) incompleta(s): modalidade com contrato, mas sem o Nº do contrato.</b> Edite e informe o contrato — enquanto isso, o BM dessa obra sai como “Sem contrato”.<div class="row" style="gap:6px;margin-top:6px">${semCt.map(o=>`<button type="button" class="btn sec sm" data-dctobra="${esc(o.id)}">${esc(o.nome)}</button>`).join('')}</div></div>`)}
  el.innerHTML=partes.join('');el.hidden=!partes.length;
  el.querySelectorAll('[data-dobra]').forEach(b=>b.onclick=()=>{OEDIT=obra(b.dataset.dobra);fillObra();$('o-emp').focus()});
  el.querySelectorAll('[data-dctobra]').forEach(b=>b.onclick=()=>{OEDIT=obra(b.dataset.dctobra);fillObra();$('o-contrato').focus()});
  el.querySelectorAll('[data-dcol]').forEach(b=>b.onclick=()=>{if(!can('cfg.colab')){toast('Sem permissão para alterar colaboradores');return}CFGTAB='colab';renderCfg();CEDIT=S.colab.find(c=>c.id===b.dataset.dcol);fillColab();$('c-realoc').click()});
}
$('o-f-emp').onchange=()=>{PAGES.obras=1;renderObras()};
function obraEmpTravada(o){if(!o||!o.empresaId)return false;const u=usoObra(o.id);return [...u.values()].some(x=>x.colab||x.regs||x.sobras||x.bms)}
function fillObraEmp(){
  const o=OEDIT;const trav=obraEmpTravada(o);const hint=$('o-emp-hint');
  fillSelect($('o-emp'),S.empresas.filter(e=>e.ativo!==false||(o&&e.id===o.empresaId)),o&&o.empresaId||'','Selecione a empresa…');
  $('o-emp').disabled=trav;hint.style.color='';
  if(trav){const u=usoObra(o.id).get(o.empresaId)||{};hint.textContent=`Empresa travada: a obra já tem ${usoTxt(u)||'movimento'} desta empresa. Para outra empresa, cadastre uma nova obra.`}
  else if(o&&!o.empresaId){const u=usoObra(o.id);const l=[...u.entries()];
    if(l.length===1){$('o-emp').value=l[0][0];hint.textContent=`Sugestão pelo uso atual: ${(emp(l[0][0])||{}).nome||''} (${usoTxt(l[0][1])}). Confirme e salve.`}
    else if(l.length>1){hint.style.color='var(--bad)';hint.textContent='Obra usada por mais de uma empresa: '+l.map(([e,x])=>`${(emp(e)||{}).nome||'—'} (${usoTxt(x)})`).join('; ')+'. Escolha a empresa dona; os colaboradores da outra empresa ficarão bloqueados até serem realocados para uma obra da empresa deles.'}
    else hint.textContent='Obra antiga sem empresa: escolha a empresa dona e salve.'}
  else hint.textContent=o?'':'A obra fica vinculada só a esta empresa; não pode ser usada por outra.';
}
function fillObra(){const o=OEDIT||{nome:'',endereco:'',ativo:true};$('o-form-title').textContent=OEDIT?'Editar obra':'Nova obra';fillObraEmp();$('o-nome').value=o.nome;$('o-contrato').value=(contrato(o.contratoId)||{}).numero||'';$('contratos-list').innerHTML=(S.contratos||[]).map(c=>`<option value="${esc(c.numero)}">${esc(c.descricao||'')}</option>`).join('');$('o-end').value=o.endereco||'';$('o-ativo').value=o.ativo===false?'0':'1';$('o-gestor').value=o.gestor||'';$('o-gcargo').value=o.gestorCargo||'';$('o-vinc').value=OEDIT?vincObra(OEDIT):'';$('o-ct-falta').hidden=true;obraVincOpts()}
/* v2.9.12: vínculo da obra no formulário — "somente pedidos" não tem contrato */
function obraVincPills(o){const v=vincObra(o),C=contrato(o.contratoId);const cp=C?`<span class="pill neutral mono">${esc(C.numero)}</span>`:'<span class="pill warn">falta o contrato</span>';
  return v==='pedido'?'<span class="pill ok">por pedido</span>':v==='ambos'?cp+' <span class="pill ok">+ pedido</span>':cp}
/* v2.9.13: no cadastro da obra a MODALIDADE é obrigatória (dentro do que a empresa permite); o Nº do contrato só é pedido em
   "Contrato" e "Contrato e pedido" — em "Pedido" a obra fica sem contrato e o nº do pedido é informado a cada medição. */
const VINC_FORM=Object.assign(Object.create(null),{contrato:'Contrato',pedido:'Pedido',ambos:'Contrato e pedido'});
function obraEmpForm(){const o=OEDIT;return o&&obraEmpTravada(o)?o.empresaId:$('o-emp').value}
function obraVincOpts(){const eid=obraEmpForm(),E=eid?emp(eid):null,ev=E?vincEmp(E):null,sel=$('o-vinc');
  [...sel.options].forEach(op=>{if(!op.value)return;const ok=!ev||ev==='ambos'||ev===op.value;op.disabled=!ok;op.textContent=VINC_FORM[op.value]+(op.value==='pedido'?' (nº novo a cada medição)':'')+(ok?'':' — a empresa não permite')});
  sel.disabled=!E;
  if(sel.value&&sel.selectedOptions[0]&&sel.selectedOptions[0].disabled)sel.value='';
  if(!sel.value&&ev&&ev!=='ambos')sel.value=ev;   // a empresa só permite uma modalidade: já vem escolhida
  obraCtVis()}
function obraCtVis(){const v=$('o-vinc').value,eid=obraEmpForm(),E=eid?emp(eid):null,ev=E?vincEmp(E):null,h=$('o-vinc-hint');
  $('o-ct-wrap').hidden=!(v==='contrato'||v==='ambos');$('o-ped').hidden=v!=='pedido';if(!v)$('o-ct-falta').hidden=true;
  if(!E){h.textContent='Escolha antes a empresa dona da obra.';return}
  let t=`${E.nome} permite: ${VINC_CURTO[ev]}${ev!=='ambos'?' — para outra modalidade, altere a empresa em Configurações › Empresas':''}.`;
  if(OEDIT&&v&&v!==vincObra(OEDIT))t+=' Mudança de modalidade: refeições já registradas e BMs já emitidos não mudam; as próximas seguem a nova modalidade'+(v==='pedido'?' (sem contrato: preços da Tabela geral).':'.');
  h.textContent=t}
$('o-emp').addEventListener('change',()=>{try{obraVincOpts()}catch(e){}});
$('o-vinc').onchange=()=>{$('o-ct-falta').hidden=true;obraCtVis()};
$('o-contrato').addEventListener('input',()=>{$('o-ct-falta').hidden=true});
$('o-new').onclick=()=>{OEDIT=null;fillObra()};$('o-cancel').onclick=()=>{OEDIT=null;fillObra()};
$('o-save').onclick=()=>{
  const nome=$('o-nome').value.trim();if(!nome){toast('Informe o nome da obra');return}
  const empO=OEDIT&&obraEmpTravada(OEDIT)?OEDIT.empresaId:$('o-emp').value;
  if(!empO){toast('Escolha a empresa dona da obra');$('o-emp').focus();return}
  if(S.obras.some(x=>x.nome.toLowerCase()===nome.toLowerCase()&&x!==OEDIT)){toast('Já existe obra com este nome');return}
  const ev=vincEmp(emp(empO)),VF={modo:$('o-vinc').value,ev};   // v2.9.13: modalidade obrigatória; contrato só em "Contrato" e "Contrato e pedido"
  if(!VINC[VF.modo]){toast('Escolha a modalidade da medição da obra: Contrato, Pedido ou Contrato e pedido','warn');$('o-vinc').focus();return}
  if(!(ev==='ambos'||ev===VF.modo)){toast(`A empresa ${(emp(empO)||{}).nome||''} não permite a modalidade “${VINC_FORM[VF.modo]}” (permite: ${VINC_CURTO[ev]}) — altere em Configurações › Empresas`,'warn');$('o-vinc').focus();return}
  const num=VF.modo==='pedido'?'':$('o-contrato').value.trim().toUpperCase();
  if(VF.modo!=='pedido'&&!num){$('o-ct-falta').hidden=false;toast(`Modalidade “${VINC_FORM[VF.modo]}”: informe o Nº do contrato da obra`,'warn');$('o-contrato').focus();return}
  if($('o-ativo').value==='1'&&!$('o-gestor').value.trim()){toast('Informe o Gestor / Engenheiro da obra: é o nome que assina o BM','warn');$('o-gestor').focus();return}
  if(num.length>7){toast('O Nº do contrato tem no máximo 7 caracteres');return}
  let C=num?(S.contratos||[]).find(c=>c.numero.toUpperCase()===num):null;
  if(num&&!C){C={id:uid(),numero:num,descricao:'',inicio:'',fim:'',ativo:true};S.contratos.push(C);audit('contrato.salvar',`Criou contrato ${num} ao cadastrar a obra ${nome}`,{obra:nome,entidade:'contrato '+num});toast(`Contrato ${num} criado — complete as datas em Configurações › Modalidades › Contratos`)}
  const antesCt=OEDIT?(contrato(OEDIT.contratoId)||{}).numero||'':'',vAntes=OEDIT?vincObra(OEDIT):'',mudouV=!!OEDIT&&(antesCt!==num||OEDIT.empresaId!==empO||vAntes!==VF.modo);
  const gestor=$('o-gestor').value.trim().replace(/\s+/g,' '),gestorCargo=$('o-gcargo').value.trim().replace(/\s+/g,' ');
  const obj={nome,endereco:$('o-end').value.trim(),ativo:$('o-ativo').value==='1',contratoId:C?C.id:undefined,vinculo:VF.modo,empresaId:empO,gestor,gestorCargo};
  const EO=emp(empO);const empAntes=OEDIT?(emp(OEDIT.empresaId)||{}).nome||'sem empresa':null;
  audit('obra.salvar',`${OEDIT?'Alterou':'Cadastrou'} obra ${nome} — empresa ${EO?EO.nome:''} — modalidade ${VINC_FORM[VF.modo]}${num?' (contrato '+num+')':''}${gestor?' — Gestor / Engenheiro: '+gestor+(gestorCargo?' ('+gestorCargo+')':''):''}${OEDIT&&(OEDIT.gestor||'')!==gestor?' (antes: '+(OEDIT.gestor||'não informado')+')':''}${obj.ativo?'':' — encerrada'}`,{obra:nome,empresa:EO?EO.nome:'',entidade:'obra '+nome,antes:mudouV?`${empAntes} / ${VINC_FORM[vAntes]||'—'}${antesCt?' '+antesCt:''}`:null,depois:mudouV?`${EO?EO.nome:''} / ${VINC_FORM[VF.modo]}${num?' '+num:''}`:null});
  if(OEDIT){Object.assign(OEDIT,obj);if(can('sup.bm')||can('del.bm')){S.registros.forEach(r=>{const c=S.colab.find(x=>x.id===r.colabId);if(r.obraId?r.obraId===OEDIT.id:(c&&c.obraId===OEDIT.id))r.obraNome=nome});S.sobras.forEach(s=>{if(s.obraId===OEDIT.id)s.obraNome=nome})}}else S.obras.push({id:uid(),...obj});
  concluir('Obra salva');OEDIT=null;fillObra();obraForm(false);renderObras();renderSetup();
};
/* preços (por contrato) */
function pCt(){return $('p-ct').value||''}
function ctLabel(c){return c?`${esc(c.numero)}${c.descricao?' — '+c.descricao:''}${contratoStatus(c)!=='vigente'?' ('+contratoStatus(c)+')':''}`:'Tabela geral'}
function renderPrecos(){
  const t=today();const cur0=$('p-ct').value;
  $('p-ct').innerHTML='<option value="">Tabela geral — obras por pedido e contratos sem preço próprio</option>'+(S.contratos||[]).map(c=>`<option value="${esc(c.id)}"${c.id===cur0?' selected':''}>${esc(ctLabel(c))}</option>`).join('');
  const cid=pCt();const C=contrato(cid);
  $('p-vig-title').textContent='Preços vigentes — '+(C?'contrato '+C.numero:'tabela geral');
  $('p-table').innerHTML=`<thead><tr><th>Refeição</th><th class="r">Valor vigente</th><th>Desde</th><th>Origem</th></tr></thead><tbody>${TIPOS.map(tp=>{
    const own=precoLista(tp.id,t,cid)[0];const ger=cid?precoLista(tp.id,t,'')[0]:null;const cur=own||ger;
    const fut=S.precos.filter(p=>p.tipo===tp.id&&(p.contratoId||'')===cid&&p.vigencia>t).sort((a,b)=>a.vigencia>b.vigencia?1:-1)[0];
    return `<tr><td><span class="pill ${tp.id}">${tp.curto}</span></td><td class="r num">${cur?'<b>'+money(cur.valor)+'</b>':'<span class="muted">não cadastrado</span>'}${fut?`<div class="small" style="color:var(--warn)">→ ${money(fut.valor)} a partir de ${br(fut.vigencia)}</div>`:''}</td><td class="num">${cur?br(cur.vigencia):'—'}</td><td class="small">${own?(cid?'<span class="pill ok">contrato</span>':'tabela geral'):ger?'<span class="pill neutral">tabela geral</span>':'—'}</td></tr>`}).join('')}</tbody>`;
  const h=S.precos.filter(p=>(p.contratoId||'')===cid).sort((a,b)=>a.criadoEm<b.criadoEm?1:-1);
  $('p-hist').innerHTML=`<thead><tr><th>Alterado em</th><th>Refeição</th><th class="r">De</th><th class="r">Para</th><th>Vigência</th><th>Usuário</th><th>Justificativa</th></tr></thead><tbody>${h.map(p=>{const prev=S.precos.filter(x=>x.tipo===p.tipo&&(x.contratoId||'')===cid&&x.criadoEm<p.criadoEm).sort((a,b)=>a.criadoEm<b.criadoEm?1:-1)[0];
    return `<tr><td class="num">${brdt(p.criadoEm)}</td><td>${tipo(p.tipo).curto}</td><td class="r num">${prev?money(prev.valor):'—'}</td><td class="r num"><b>${money(p.valor)}</b></td><td class="num">${br(p.vigencia)}</td><td>${esc(p.usuario)}</td><td>${esc(p.just||'—')}</td></tr>`}).join('')||'<tr><td colspan="7" class="empty">Nenhum preço cadastrado para '+(C?'este contrato':'a tabela geral')+'.</td></tr>'}</tbody>`;
  if(!$('p-tipo').options.length)TIPOS.forEach(tp=>{const o=document.createElement('option');o.value=tp.id;o.textContent=tp.curto;$('p-tipo').appendChild(o)});
  if(!$('p-vig').value)$('p-vig').value=t;
  updJustReq();
}
function updJustReq(){const has=S.precos.some(p=>p.tipo===$('p-tipo').value&&(p.contratoId||'')===pCt());$('p-just-req').textContent=has?'(obrigatória — alteração de preço)':'(opcional no cadastro inicial)'}
$('p-tipo').onchange=updJustReq;$('p-ct').onchange=renderPrecos;
$('p-save').onclick=()=>{
  const tp=$('p-tipo').value,cid=pCt(),C=contrato(cid),v=parseFloat($('p-valor').value),vig=$('p-vig').value,just=$('p-just').value.trim();const err=$('p-err');
  const isChange=S.precos.some(p=>p.tipo===tp&&(p.contratoId||'')===cid);
  if(!(v>0)){err.hidden=false;err.textContent='Informe um valor maior que zero.';return}
  if(!vig){err.hidden=false;err.textContent='Informe a data de vigência.';return}
  if(isChange&&vig<today()){err.hidden=false;err.textContent='A vigência de uma alteração não pode ser retroativa: registros já feitos mantêm o preço da época.';return}
  if(isChange&&just.length<10){err.hidden=false;err.textContent='Em alteração de preço a justificativa é obrigatória (mínimo 10 caracteres).';return}
  const pAntes=(precoLista(tp,today(),cid)[0]||{}).valor;const onde=C?'contrato '+C.numero:'tabela geral';
  audit('preco.salvar',`${tipo(tp).curto} (${onde}): ${pAntes===undefined?'—':money(pAntes)} → ${money(v)} a partir de ${br(vig)}${just?' — '+just:''}`,{entidade:'preço '+tp+' · '+onde,antes:pAntes===undefined?null:pAntes,depois:Math.round(v*100)/100});
  err.hidden=true;S.precos.push({id:uid(),tipo:tp,contratoId:cid||undefined,contratoNumero:C?C.numero:undefined,valor:Math.round(v*100)/100,vigencia:vig,criadoEm:new Date().toISOString(),usuario:USER.nome,just:just||(isChange?'':'Cadastro inicial')});
  concluir(isChange?'Preço alterado — histórico registrado':'Preço cadastrado');$('p-valor').value='';$('p-just').value='';renderPrecos();renderSetup();
};
/* contratos */
let CTREDIT=null;
function renderContratos(){
  mdAbas();renderVinculos();   // v2.9.12: Configurações › Modalidades (guias Vínculos das obras / Contratos)
  const f=$('ctr-filtro').value;const t=today();
  const l=(S.contratos||[]).filter(c=>{const st=contratoStatus(c,t);return !f||(f==='ativos'?(st==='vigente'||st==='a iniciar'):(st==='inativo'||st==='encerrado'))}).sort((a,b)=>a.numero.localeCompare(b.numero));
  const pill={vigente:'ok','a iniciar':'warn',encerrado:'bad',inativo:'bad'};const PC=paginate('contratos',l,25);
  $('ctr-table').innerHTML=`<thead><tr><th>Nº</th><th>Início</th><th>Término</th><th>Situação</th><th>Obras</th><th></th></tr></thead><tbody>${PC.rows.map(c=>{const st=contratoStatus(c,t);const ob=S.obras.filter(o=>o.contratoId===c.id);
    return `<tr><td class="mono"><b>${esc(c.numero)}</b></td><td class="num">${c.inicio?br(c.inicio):'<span class="muted">—</span>'}</td><td class="num">${c.fim?br(c.fim):'<span class="muted">—</span>'}</td><td><span class="pill ${pill[st]}">${st}</span></td><td class="small">${esc(ob.map(o=>o.nome).join(', ')||'—')}</td><td><button class="btn sec sm" data-ctr="${esc(c.id)}">Editar</button></td></tr>`}).join('')||'<tr><td colspan="6" class="empty">Nenhum contrato.</td></tr>'}</tbody>`;
  $('ctr-table').querySelectorAll('[data-ctr]').forEach(b=>b.onclick=()=>{CTREDIT=contrato(b.dataset.ctr);fillContrato()});
  renderPager($('ctr-pager'),'contratos',PC,['contrato','contratos'],renderContratos);
  if(!$('ctr-form-title').dataset.init){$('ctr-form-title').dataset.init=1;fillContrato()}
}
function fillContrato(){const c=CTREDIT||{numero:'',descricao:'',inicio:'',fim:'',ativo:true};
  $('ctr-form-title').textContent=CTREDIT?'Editar contrato':'Novo contrato';$('ctr-num').value=c.numero;$('ctr-ini').value=c.inicio||'';$('ctr-fim').value=c.fim||'';$('ctr-ativo').value=c.ativo===false?'0':'1';$('ctr-err').hidden=true;$('ctr-precos').hidden=!CTREDIT}
$('ctr-filtro').onchange=()=>{PAGES.contratos=1;renderContratos()};$('ctr-new').onclick=()=>{CTREDIT=null;fillContrato()};$('ctr-cancel').onclick=()=>{CTREDIT=null;fillContrato()};
$('ctr-precos').onclick=()=>{if(!CTREDIT||!can('cfg.precos'))return;const id=CTREDIT.id;CFGTAB='precos';renderCfg();$('p-ct').value=id;renderPrecos()};
$('ctr-save').onclick=()=>{
  const err=$('ctr-err');const show=m=>{err.hidden=false;err.textContent=m};
  const numero=$('ctr-num').value.trim().toUpperCase(),ini=$('ctr-ini').value,fim=$('ctr-fim').value;
  if(!numero)return show('Informe o Nº do contrato.');if(numero.length>7)return show('O Nº do contrato tem no máximo 7 caracteres.');
  if((S.contratos||[]).some(c=>c.numero.toUpperCase()===numero&&c!==CTREDIT))return show('Já existe contrato com este número.');
  if(ini&&fim&&fim<ini)return show('A data de término não pode ser anterior à de início.');
  const obj={numero,descricao:CTREDIT?CTREDIT.descricao||'':'',inicio:ini,fim,ativo:$('ctr-ativo').value==='1'};
  audit('contrato.salvar',`${CTREDIT?'Alterou':'Cadastrou'} contrato ${numero} — ${ini?br(ini):'sem início'} a ${fim?br(fim):'sem término'}${obj.ativo?'':' — INATIVO'}`,{entidade:'contrato '+numero,antes:CTREDIT?JSON.stringify({numero:CTREDIT.numero,inicio:CTREDIT.inicio,fim:CTREDIT.fim,ativo:CTREDIT.ativo}):null,depois:JSON.stringify({numero,inicio:ini,fim,ativo:obj.ativo})});
  if(CTREDIT)Object.assign(CTREDIT,obj);else S.contratos.push({id:uid(),...obj});
  concluir('Contrato salvo');CTREDIT=null;fillContrato();renderContratos();renderSetup();
};
/* =================== v2.9.12: CONFIGURAÇÕES › MODALIDADES — vínculos das obras (contrato / pedido) ===================
   Cada obra fecha a medição (BM) por contrato (como sempre), por pedido (um nº novo a cada BM) ou pelos dois, dentro do que a
   empresa permite (Configurações › Empresas). Grava na obra: vinculo + contratoId (obra "somente pedidos" fica sem contrato).
   Gravar a obra no servidor exige "Cadastrar obras": o botão Vínculos exige os dois acessos. */
let MD_ABA='vinc';try{if(localStorage.getItem('sismed_md_aba')==='ctr')MD_ABA='ctr'}catch(e){}
function mdAbas(){$('md-abas').querySelectorAll('[data-ma]').forEach(b=>{const on=b.dataset.ma===MD_ABA;b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on))});$('md-vinc').hidden=MD_ABA!=='vinc';$('md-ctr').hidden=MD_ABA!=='ctr'}
$('md-abas').querySelectorAll('[data-ma]').forEach(b=>b.onclick=()=>{if(MD_ABA===b.dataset.ma)return;MD_ABA=b.dataset.ma;try{localStorage.setItem('sismed_md_aba',MD_ABA)}catch(e){}if(USER){audit('nav.cfg','Configurações › Modalidades › '+b.textContent.trim());save()}mdAbas()});
function vincPode(){return can('cfg.contratos')&&can('cfg.obras')}
function renderVinculos(){
  const fE=$('md-f-emp');fillSelect(fE,S.empresas,fE.value,'Todas as empresas');const f=fE.value;
  const L=S.obras.filter(o=>obraOk(o.id)&&(!f||o.empresaId===f)).sort((a,b)=>((emp(a.empresaId)||{}).nome||'~').localeCompare((emp(b.empresaId)||{}).nome||'~')||a.nome.localeCompare(b.nome));
  const P=paginate('vinculos',L,15),pode=vincPode();
  $('md-table').innerHTML=`<thead><tr><th>Obra</th><th>Empresa</th><th>Vínculo da obra</th><th></th></tr></thead><tbody>${P.rows.map(o=>{const E=emp(o.empresaId),ev=vincEmp(E);
    return `<tr><td><b>${esc(o.nome)}</b>${o.ativo===false?' <span class="pill bad">encerrada</span>':''}</td><td>${E?esc(E.nome):'<span class="pill bad">sem empresa</span>'}<div class="small muted">a empresa permite: ${esc(VINC_CURTO[ev])}</div></td><td>${esc(VINC[vincObra(o)])}<div style="margin-top:4px">${obraVincPills(o)}</div></td><td style="text-align:right"><button type="button" class="btn sec sm" data-vinc="${esc(o.id)}"${pode?'':' disabled title="Exige os acessos “Modalidades” e “Cadastrar obras”"'}>Vínculos</button></td></tr>`}).join('')||'<tr><td colspan="4" class="empty">Nenhuma obra cadastrada.</td></tr>'}</tbody>`;
  $('md-table').querySelectorAll('[data-vinc]').forEach(b=>b.onclick=()=>vincAbrir(b.dataset.vinc));
  renderPager($('md-pager'),'vinculos',P,['obra','obras'],renderVinculos);
}
$('md-f-emp').onchange=()=>{PAGES.vinculos=1;renderVinculos()};
let VB=null;   // obra aberta na caixa "Vínculos"
function vincAbrir(oid){const o=obra(oid);if(!o)return;VB=o.id;const E=emp(o.empresaId),ev=vincEmp(E),v=vincObra(o);
  const op=(k,t,d)=>{const ok=ev==='ambos'||ev===k;return `<label class="vb-op${ok?'':' off'}"><input type="radio" name="vb-v" value="${k}"${k===v?' checked':''}${ok?'':' disabled'}><span><b>${t}</b><small>${d}${ok?'':' — a empresa não permite'}</small></span></label>`};
  const cts=(S.contratos||[]).slice().sort((a,b)=>{const r=x=>{const s=contratoStatus(x);return s==='vigente'?0:s==='a iniciar'?1:2};return r(a)-r(b)||String(a.numero).localeCompare(String(b.numero))});
  infoModal(`Vínculos — ${esc(o.nome)}`,`<div class="stack">
    <div class="small muted">${E?esc(E.nome):'Obra sem empresa'} · a empresa permite: <b>${esc(VINC_CURTO[ev])}</b> (Configurações › Empresas)</div>
    <div class="vb-ops" role="radiogroup" aria-label="Vínculo da obra">${op('contrato','Somente contratos','O BM desta obra é sempre fechado pelo contrato.')}${op('pedido','Somente pedidos','Cada BM pede um nº de pedido novo. Sem contrato: preços da Tabela geral.')}${op('ambos','Contratos e pedidos','Ao emitir o BM, escolhe-se contrato ou pedido.')}</div>
    <div class="field" id="vb-ct-wrap"><label for="vb-ct">Contrato da obra</label><select id="vb-ct"><option value="">Escolha o contrato…</option>${cts.map(c=>`<option value="${esc(c.id)}"${c.id===o.contratoId?' selected':''}>${esc(c.numero)}${contratoStatus(c)!=='vigente'?' ('+esc(contratoStatus(c))+')':''}</option>`).join('')}</select>
      <div class="small muted" style="margin-top:4px">Contrato novo? Cadastre na guia <button type="button" class="link" id="vb-novo">Contratos</button>.</div></div>
    <div id="vb-av" class="stack" style="gap:8px"></div>
    <div id="vb-err" class="notice bad small" hidden></div>
    <div class="row" style="justify-content:flex-end"><button type="button" class="btn sec" id="vb-cancel">Cancelar</button><button type="button" class="btn" id="vb-save"${vincPode()?'':' disabled'}>Salvar vínculos</button></div></div>`);
  document.querySelectorAll('input[name="vb-v"]').forEach(i=>i.onchange=vincAvisos);$('vb-ct').onchange=vincAvisos;
  $('vb-cancel').onclick=()=>{$('info-modal').classList.remove('on');VB=null};
  $('vb-novo').onclick=()=>{$('info-modal').classList.remove('on');VB=null;MD_ABA='ctr';try{localStorage.setItem('sismed_md_aba','ctr')}catch(e){}CTREDIT=null;fillContrato();renderContratos();const n=$('ctr-num');if(n)n.focus()};
  $('vb-save').onclick=vincSalvar;vincAvisos()}
function vincEscolha(){const r=document.querySelector('input[name="vb-v"]:checked');return {v:r?r.value:'',cid:$('vb-ct')?$('vb-ct').value:''}}
function vincAvisos(){const o=obra(VB);if(!o)return;const {v,cid}=vincEscolha();const w=$('vb-ct-wrap');if(w)w.hidden=!v||v==='pedido';
  const atual=vincObra(o),A=[];
  const abertos=S.registros.filter(r=>r.obraId===o.id&&!r.bmId&&!r.fechado).length+(S.sobras||[]).filter(s=>s.obraId===o.id&&!s.bmId).reduce((n,s)=>n+(+s.qtd||0),0);
  if(v==='pedido'&&atual!=='pedido'){const tg=TIPOS.map(t=>{const p=precoVigente(t.id,today(),'');return p===null?null:t.curto+' '+money(p)}),falta=TIPOS.filter((t,i)=>!tg[i]).map(t=>t.curto);
    A.push(`<div class="notice warn small">A obra deixa de ter contrato${contrato(o.contratoId)?' ('+esc(contrato(o.contratoId).numero)+')':''}: as <b>próximas</b> refeições usam os preços da <b>Tabela geral</b>${tg.some(Boolean)?' — hoje: '+esc(tg.filter(Boolean).join(' · ')):''}, e a vigência de contrato deixa de bloquear o registro. As refeições já registradas mantêm o preço e o contrato da época.${falta.length?`<br><b>Sem preço na Tabela geral: ${esc(falta.join(', '))}</b> — o registro desses tipos fica bloqueado até cadastrar em Configurações › Preços.`:''}</div>`)}
  if(v&&v!=='pedido'&&atual==='pedido')A.push('<div class="notice info small">As próximas refeições usam os preços do contrato escolhido (ou da Tabela geral, se ele não tiver preço próprio), e a vigência do contrato passa a valer no registro.</div>');
  if(v&&v!=='pedido'&&cid&&o.contratoId&&cid!==o.contratoId&&atual!=='pedido')A.push(`<div class="notice info small">Troca de contrato: as refeições já registradas continuam com o contrato da época (${esc((contrato(o.contratoId)||{}).numero||'—')}) e são medidas por ele.</div>`);
  if(v&&v!==atual&&abertos)A.push(`<div class="notice info small"><b>${abertos}</b> ${abertos>1?'refeições':'refeição'} desta obra ainda sem BM ${abertos>1?'passam':'passa'} a ser ${v==='pedido'?'medidas por pedido':v==='contrato'?'medidas por contrato':'medidas por contrato ou por pedido (escolha no Emitir BM)'}. BMs já emitidos não mudam.</div>`);
  if(v&&vincTem(v,'pedido')&&!vincTem(atual,'pedido')&&!assinantesCt(PED).length)A.push('<div class="notice warn small">Ninguém está liberado para assinar os BMs por pedido como Gestor / Engenheiro — libere em Configurações › Assinaturas (linha “Pedidos”).</div>');
  $('vb-av').innerHTML=A.join('');$('vb-err').hidden=true}
function vincSalvar(){const o=obra(VB),err=$('vb-err'),show=m=>{err.hidden=false;err.textContent=m};
  if(!o){$('info-modal').classList.remove('on');VB=null;renderContratos();return}
  if(!vincPode())return show('Exige os acessos “Modalidades” e “Cadastrar obras”.');
  const {v,cid}=vincEscolha(),E=emp(o.empresaId),ev=vincEmp(E);
  if(!VINC[v])return show('Escolha o vínculo da obra.');
  if(!(ev==='ambos'||ev===v))return show(`A empresa ${E?E.nome:''} não permite “${VINC[v]}”. Altere em Configurações › Empresas.`);
  if(v!=='pedido'&&!contrato(cid))return show('Escolha o contrato da obra.');
  const novoCid=v==='pedido'?'':cid;
  if(v===vincRaw(o)&&v===vincObra(o)&&novoCid===(o.contratoId||'')){toast('Nada mudou');$('info-modal').classList.remove('on');VB=null;return}
  const antes=vincTxt(o);o.vinculo=v;if(novoCid)o.contratoId=novoCid;else delete o.contratoId;
  audit('obra.vinculo',`${o.nome} — ${antes} → ${vincTxt(o)}`,{obra:o.nome,empresa:E?E.nome:'',entidade:'obra '+o.nome,antes,depois:vincTxt(o)});
  $('info-modal').classList.remove('on');VB=null;concluir('Vínculos da obra salvos');renderContratos();renderSetup()}
/* contratadas (restaurantes) */
let KEDIT=null;
function chipToggle(i){i.parentElement.style.cssText='cursor:pointer;font-family:var(--font);'+(i.checked?'border-style:solid;border-color:var(--accent);color:var(--accent-2)':'')}
function chipsHtml(items,sel,attr){return items.map(o=>`<label class="chip" style="cursor:pointer;font-family:var(--font);${sel.has(o.id)?'border-style:solid;border-color:var(--accent);color:var(--accent-2)':''}"><input type="checkbox" ${attr}="${esc(o.id)}" ${sel.has(o.id)?'checked':''} style="width:auto;margin:0 6px 0 0;vertical-align:middle">${esc(o.nome)}${o.ativo===false?' (inativa)':''}</label>`).join('')}
function renderContratada(){
  ctMigrarLegado();
  $('k-list').innerHTML=(S.contratadas||[]).map(c=>{const ob=(c.obras||[]).map(id=>(obra(id)||{}).nome).filter(Boolean);const nu=S.users.filter(u=>!u.contratadas||!u.contratadas.length||u.contratadas.includes(c.id)).length;
    return `<div class="item"><div class="avatar">${ini(c.nome)}</div><div class="t"><b>${esc(c.nome)}${c.ativo===false?' <span class="pill bad">inativa</span>':''}</b><span>${c.cnpj?esc(c.cnpj)+' · ':''}${ob.length} obra(s): ${esc(ob.join(', ')||'—')} · ${nu} usuário(s) com acesso</span></div><button class="btn sec sm" data-k="${esc(c.id)}">Editar</button></div>`}).join('')||'<div class="small muted">Nenhuma contratada cadastrada.</div>';
  $('k-list').querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{KEDIT=ct(b.dataset.k);fillContratada()});
  if(!$('k-obras').innerHTML)fillContratada();
}
function fillContratada(){
  const c=KEDIT||{nome:'',cnpj:'',gestor:'',cargo:'',servico:'FORNECIMENTO DE REFEIÇÕES',obras:[],ativo:true};
  $('k-form-title').textContent=KEDIT?'Editar contratada':'Nova contratada';
  $('k-contratada').value=c.nome;$('k-cnpj').value=c.cnpj||'';$('k-servico').value=c.servico||'FORNECIMENTO DE REFEIÇÕES';$('k-ativo').value=c.ativo===false?'0':'1';$('k-err').hidden=true;
  $('k-obras').innerHTML=chipsHtml(S.obras.map(o=>({...o,nome:o.nome+' · '+((emp(o.empresaId)||{}).nome||'sem empresa')})),new Set(c.obras||[]),'data-kob')||'<span class="small muted">Cadastre as obras primeiro (aba Obras).</span>';
  $('k-obras').querySelectorAll('input').forEach(i=>i.onchange=()=>chipToggle(i));
}
$('k-new').onclick=()=>{KEDIT=null;fillContratada()};$('k-cancel').onclick=()=>{KEDIT=null;fillContratada()};
$('k-save').onclick=()=>{
  const err=$('k-err');const show=m=>{err.hidden=false;err.textContent=m};
  const nome=$('k-contratada').value.trim();if(!nome)return show('Informe a razão social do restaurante.');
  if((S.contratadas||[]).some(x=>x.nome.toLowerCase()===nome.toLowerCase()&&x!==KEDIT))return show('Já existe contratada com este nome.');
  const obras=[...$('k-obras').querySelectorAll('input:checked')].map(i=>i.dataset.kob);
  if(!obras.length)return show('Vincule a contratada a pelo menos uma obra.');
  const obj={nome,cnpj:$('k-cnpj').value.trim(),servico:$('k-servico').value.trim()||'FORNECIMENTO DE REFEIÇÕES',obras,ativo:$('k-ativo').value==='1'};
  const nomesOb=obras.map(id=>(obra(id)||{}).nome).join(', ');
  audit('contratada.salvar',`${KEDIT?'Alterou':'Cadastrou'} contratada ${nome} — obras: ${nomesOb}${obj.ativo?'':' — INATIVA'}`,{entidade:'contratada '+nome,antes:KEDIT?JSON.stringify({nome:KEDIT.nome,obras:(KEDIT.obras||[]).map(id=>(obra(id)||{}).nome),ativo:KEDIT.ativo}):null,depois:JSON.stringify({nome,obras:nomesOb,ativo:obj.ativo})});
  if(KEDIT)Object.assign(KEDIT,obj);else S.contratadas.push({id:uid(),...obj});
  concluir('Contratada salva');KEDIT=null;fillContratada();renderContratada();renderSetup();
};
/* =================== AUDITORIA (tela) =================== */
let AUD_PAGE=1;const AUD_PP=25;
let AUD_ABA='mov';
const AUD_ABAS=[['mov','aud.ver'],['arq','aud.arquivos'],['usu','aud.usuarios']];   // cada aba da Auditoria tem o seu acesso (v2.8.3)
function renderAud(){
  const abas=AUD_ABAS.filter(a=>can(a[1])).map(a=>a[0]);if(!abas.includes(AUD_ABA))AUD_ABA=abas[0]||'mov';
  $('aud-abas').querySelectorAll('[data-aa]').forEach(b=>{b.hidden=!abas.includes(b.dataset.aa);const on=b.dataset.aa===AUD_ABA;b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on))});
  $('aud-sub').textContent=({mov:'Trilha de tudo que cada usuário fez no sistema. Somente leitura.',arq:'A cada 3.000 eventos o servidor compacta a trilha em um arquivo CSV; as fotos dos registros são compactadas quando as que aguardam somam 3 MB.',usu:'Quem está com o sistema aberto agora, quando cada um acessou pela última vez e quanto tempo ficou logado.'})[AUD_ABA];
  $('aud-p-mov').hidden=AUD_ABA!=='mov';$('arq-card').hidden=AUD_ABA!=='arq';$('aud-p-usu').hidden=AUD_ABA!=='usu';$('aud-csv').hidden=AUD_ABA!=='mov';
  if(AUD_ABA==='arq'){renderAudArq();return}
  if(AUD_ABA==='usu'){renderSessoes();return}
  const A=S.audit;
  const keep=(id)=>$(id).value;
  const users=[...new Set(A.map(e=>e.usuario))].sort();const obras=[...new Set(A.map(e=>e.obra).filter(Boolean))].sort();const emps=[...new Set(A.map(e=>e.empresa).filter(Boolean))].sort();
  const acoes=[...new Set(A.map(e=>e.acao))].sort((a,b)=>(ACOES[a]||a).localeCompare(ACOES[b]||b));
  const setOpts=(id,list,label,fmt)=>{const sel=$(id);const v=sel.value;sel.innerHTML=`<option value="">${label}</option>`+list.map(x=>`<option value="${esc(x)}"${x===v?' selected':''}>${esc(fmt?fmt(x):x)}</option>`).join('')};
  setOpts('a-user',users,'Todos');setOpts('a-obra',obras,'Todas');setOpts('a-emp',emps,'Todas');setOpts('a-acao',acoes,'Todas',x=>ACOES[x]||x);setOpts('a-aba',Object.keys(ABAS).filter(k=>A.some(e=>e.aba===k)),'Todas',x=>ABAS[x]);
  const u=keep('a-user'),ab=keep('a-aba'),ac=keep('a-acao'),ob=keep('a-obra'),em=keep('a-emp'),de=keep('a-de'),ate=keep('a-ate'),q=keep('a-busca').trim().toLowerCase();
  const rows=A.filter(e=>!e.obra||obraNomeOk(e.obra)).filter(e=>{const d=e.em.slice(0,10);return (!u||e.usuario===u)&&(!ab||e.aba===ab)&&(!ac||e.acao===ac)&&(!ob||e.obra===ob)&&(!em||e.empresa===em)&&(!de||d>=de)&&(!ate||d<=ate)&&(!q||[e.descricao,e.entidade,e.usuario,ACOES[e.acao]||''].join(' ').toLowerCase().includes(q))}).sort((a,b)=>a.em<b.em?1:-1);
  const byUser={};rows.forEach(e=>byUser[e.usuario]=(byUser[e.usuario]||0)+1);const top=Object.entries(byUser).sort((a,b)=>b[1]-a[1])[0];
  const mov=rows.filter(e=>!/^nav|^login|^logout/.test(e.acao)).length;
  $('aud-tiles').innerHTML=`<div class="tile total"><div class="k">Eventos filtrados</div><div class="v num">${rows.length}</div><div class="s">de ${A.length} no total</div></div><div class="tile almoco"><div class="k">Movimentações</div><div class="v num">${mov}</div><div class="s">exclui navegação e login</div></div><div class="tile jantar"><div class="k">Usuários</div><div class="v num">${Object.keys(byUser).length}</div><div class="s">${top?esc(top[0])+' · '+top[1]+' eventos':'—'}</div></div><div class="tile lanche"><div class="k">Dispositivos</div><div class="v num">${new Set(rows.map(e=>e.dispositivo)).size}</div><div class="s">${new Set(rows.map(e=>e.ip).filter(Boolean)).size} IP(s) distintos</div></div>`;
  const pages=Math.max(1,Math.ceil(rows.length/AUD_PP));if(AUD_PAGE>pages)AUD_PAGE=pages;if(AUD_PAGE<1)AUD_PAGE=1;
  const i0=(AUD_PAGE-1)*AUD_PP;const pageRows=ordLista('aud',rows).slice(i0,i0+AUD_PP);
  $('aud-count').textContent=rows.length?`${i0+1}–${i0+pageRows.length} de ${rows.length} evento(s)`:'0 eventos';
  $('aud-pager').innerHTML=pages>1?`<button class="btn sec sm" data-pg="1" ${AUD_PAGE===1?'disabled':''}>« Primeira</button><button class="btn sec sm" data-pg="${AUD_PAGE-1}" ${AUD_PAGE===1?'disabled':''}>‹ Anterior</button><span class="small num" style="padding:0 8px">Página <b>${AUD_PAGE}</b> de ${pages}</span><button class="btn sec sm" data-pg="${AUD_PAGE+1}" ${AUD_PAGE===pages?'disabled':''}>Próxima ›</button><button class="btn sec sm" data-pg="${pages}" ${AUD_PAGE===pages?'disabled':''}>Última »</button>`:'';
  $('aud-pager').querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{AUD_PAGE=+b.dataset.pg;renderAud()});
  $('aud-table').innerHTML=`<thead><tr><th>Data / hora</th><th>Usuário</th><th>Aba</th><th>Ação</th><th>Descrição</th><th>Obra</th><th>Empresa</th><th>Antes → Depois</th><th>Dispositivo</th><th>IP</th></tr></thead><tbody>${pageRows.map(e=>`<tr><td class="num">${brdt(e.em)}:${pad(new Date(e.em).getSeconds())}</td><td><b>${esc(e.usuario)}</b><div class="small muted">${esc(e.perfil)}</div></td><td>${esc(ABAS[e.aba]||e.aba)}</td><td>${esc(ACOES[e.acao]||e.acao)}</td><td style="max-width:360px">${esc(e.descricao)}${e.entidade?`<div class="small muted">${esc(e.entidade)}</div>`:''}</td><td>${esc(e.obra||'—')}</td><td>${esc(e.empresa||'—')}</td><td class="small mono" style="max-width:220px;overflow-wrap:anywhere">${e.antes===null&&e.depois===null?'—':`${fmtAD(e.antes)} → ${fmtAD(e.depois)}`}</td><td class="mono">${esc(e.dispositivo)}</td><td class="mono small">${e.ip?esc(e.ip):'<span class="muted">—</span>'}</td></tr>`).join('')||'<tr><td colspan="10" class="empty">Nenhum evento com esses filtros.</td></tr>'}</tbody>`;
}
function renderAudArq(){
  const podeF=can('fotos.baixar');if(!podeF)ARQ_TAB='aud';
  $('arq-tabs').hidden=!podeF;$('arq-tabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.at===ARQ_TAB));
  $('arq-aud').hidden=ARQ_TAB!=='aud';$('arq-fotos').hidden=ARQ_TAB!=='fotos';
  if(ARQ_TAB==='fotos')renderFotosArq();
  const l=S.auditArq||[];
  $('aud-arq').innerHTML=`<thead><tr><th>Compactado em</th><th>Eventos de</th><th>até</th><th class="r">Qtd</th><th></th></tr></thead><tbody>${l.map(a=>`<tr><td class="num">${brdt(a.criado_em)}</td><td class="num">${brdt(a.de)}</td><td class="num">${brdt(a.ate)}</td><td class="r num">${num(a.qtd)}</td><td><button class="btn sec sm" data-arq="${esc(String(a.id))}">Baixar CSV</button></td></tr>`).join('')||'<tr><td colspan="5" class="empty">Nenhum arquivo ainda — a primeira compactação acontece ao atingir 3.000 eventos.</td></tr>'}</tbody>`;
  $('aud-arq').querySelectorAll('[data-arq]').forEach(b=>b.onclick=async()=>{
    b.disabled=true;const id=b.dataset.arq;
    try{const {data,error}=await sb.from('auditoria_arquivos').select('csv,de,ate').eq('id',isNaN(+id)?id:+id).maybeSingle();if(error)throw error;if(!data)throw new Error('arquivo não encontrado');
      const name=`auditoria-${String(data.de).slice(0,10)}_a_${String(data.ate).slice(0,10)}.csv`;const csv='\ufeff'+data.csv;
      audit('auditoria.arquivo',name);save();
      const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
      if(dl){try{await dl.save({filename:name,data:csv});sucesso('CSV salvo')}catch(e){}}else{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=name;a.click();sucesso('CSV baixado')}
    }catch(e){toast('Falha ao baixar: '+(e.message||e))}b.disabled=false});
}
function fmtAD(v){if(v===null||v===undefined)return '—';if(typeof v==='number')return money(v);const s=String(v);return esc(s.length>90?s.slice(0,90)+'…':s)}
['a-user','a-aba','a-acao','a-obra','a-emp','a-de','a-ate'].forEach(id=>$(id).onchange=()=>{AUD_PAGE=1;renderAud()});$('a-busca').oninput=()=>{AUD_PAGE=1;renderAud()};
$('a-limpar').onclick=()=>{AUD_PAGE=1;['a-user','a-aba','a-acao','a-obra','a-emp','a-de','a-ate','a-busca'].forEach(id=>$(id).value='');renderAud()};
$('aud-csv').onclick=async()=>{
  const cols=['Data/hora','Usuário','Perfil','Aba','Ação','Descrição','Obra','Empresa','Entidade','Antes','Depois','Dispositivo','IP','Navegador'];
  const cell=v=>{let t=String(v??'');if(/^[=+\-@\t\r]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"'};
  const lines=[cols.join(';')].concat([...S.audit].sort((a,b)=>a.em<b.em?1:-1).map(e=>[brdt(e.em),e.usuario,e.perfil,ABAS[e.aba]||e.aba,ACOES[e.acao]||e.acao,e.descricao,e.obra,e.empresa,e.entidade,typeof e.antes==='number'?money(e.antes):e.antes,typeof e.depois==='number'?money(e.depois):e.depois,e.dispositivo,e.ip||'',e.navegador].map(cell).join(';')));
  audit('auditoria.csv',`${S.audit.length} eventos`);save();
  const csv='﻿'+lines.join('\r\n');const name=`auditoria-${today()}.csv`;
  const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
  if(dl){try{await dl.save({filename:name,data:csv});sucesso('CSV salvo')}catch(e){if(e&&e.code!=='declined')toast('Não foi possível salvar o CSV')}}
  else{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=name;a.click();sucesso('CSV gerado')}
};

/* =================== FOTO DO ROSTO NO REGISTRO POR QR CODE (v2.1) E NA RETIRADA (v2.4) ===================
   Bucket "fotos" (privado):  c/AAAA-MM-DD/<registro>.webp  consulta 300x400, fica 20 dias
                              a/AAAA-MM-DD/<registro>.webp  cópia 240x320 → vai para um .zip quando as pendentes somam 3 MB
   O texto (data e hora, empresa, obra, colaborador) é gravado na própria imagem. */
const FOTO_CFG={c:{w:300,h:400,q:.45},a:{w:240,h:320,q:.4},dias:20};   // v2.8.9: menores (antes 360x480 q .6 e 240x320 q .5)
let FOTO={raw:null,tmp:null,thumb:null,skip:null,busy:false,stream:null,facing:'environment',camSeq:0};
try{FOTO.facing=localStorage.getItem('sismed_foto_cam')||'environment'}catch(e){}
function fotoReset(){FOTO.raw=null;FOTO.tmp=null;FOTO.thumb=null;FOTO.skip=null;FOTO.busy=false}
/* texto gravado na imagem. Retirada: a foto é de QUEM RETIROU; a refeição é de r.nome. previa=true omite o que ainda não foi escolhido no formulário */
function fotoLinhas(r,previa){
  const up=x=>String(x||'').toUpperCase();
  const eo=previa&&!r.empresaNome&&!r.obraNome?null:up(`${r.empresaNome||'—'} · ${r.obraNome||'—'}`);
  const l=r.modalidade==='retirada'?[brdt(r.registradoEm),eo,'RETIROU: '+up((r.retiradoPor||{}).nome||'—'),previa&&!r.nome?null:'PARA: '+up(r.nome)]:[brdt(r.registradoEm),eo,up(r.nome)+(r.semQr?' · SEM QR CODE':'')];
  return l.filter(x=>x!==null)}
function fotoThumb(raw){return fotoCanvas(raw,96,128).toDataURL('image/jpeg',.75)}
/* recorte central 3:4 em 480x640 (o mesmo enquadramento que aparece na tela) */
function fotoCrop(src,sw,sh){const W=480,H=640;let cw=sw,ch=sw*4/3;if(ch>sh){ch=sh;cw=sh*3/4}
  const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(src,(sw-cw)/2,(sh-ch)/2,cw,ch,0,0,W,H);return c}
function fotoCanvas(raw,w,h,linhas){
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(raw,0,0,w,h);
  if(linhas&&linhas.length){
    const fs=Math.max(8,Math.round(w*.043)),lh=Math.round(fs*1.3),pad=Math.round(fs*.6),bh=lh*linhas.length+pad*2-Math.round(fs*.25);
    x.fillStyle='rgba(0,0,0,.62)';x.fillRect(0,h-bh,w,bh);x.fillStyle='#fff';x.textBaseline='top';
    linhas.forEach((t,i)=>{let f=fs;const fnt=()=>x.font=`${i===0?700:600} ${f}px Arial,Helvetica,sans-serif`;fnt();while(f>6&&x.measureText(t).width>w-pad*2){f--;fnt()}x.fillText(t,pad,h-bh+pad+i*lh+Math.round((fs-f)/2))});
  }
  return c}
function canvasBlob(c,q,tipo){return new Promise(res=>{const jpg=()=>c.toBlob(b=>res(b),'image/jpeg',q);
  if(tipo==='image/jpeg')return jpg();try{c.toBlob(b=>{if(b&&b.type==='image/webp')res(b);else jpg()},'image/webp',q)}catch(e){jpg()}})}
async function fotoGerar(raw,linhas){
  let c=await canvasBlob(fotoCanvas(raw,FOTO_CFG.c.w,FOTO_CFG.c.h,linhas),FOTO_CFG.c.q);
  let a=await canvasBlob(fotoCanvas(raw,FOTO_CFG.a.w,FOTO_CFG.a.h,linhas),FOTO_CFG.a.q,c&&c.type);
  if(!c||!a)throw new Error('o navegador não gerou a imagem');
  if(c.type!==a.type){c=await canvasBlob(fotoCanvas(raw,FOTO_CFG.c.w,FOTO_CFG.c.h,linhas),FOTO_CFG.c.q,'image/jpeg');a=await canvasBlob(fotoCanvas(raw,FOTO_CFG.a.w,FOTO_CFG.a.h,linhas),FOTO_CFG.a.q,'image/jpeg')}
  const tipo=c.type==='image/webp'?'image/webp':'image/jpeg';
  return {c,a,tipo,ext:tipo==='image/webp'?'webp':'jpg'}}

/* ---- câmera ---- */
function fotoMsg(m){const e=$('foto-msg');e.hidden=!m;e.textContent=m||''}
function fotoModo(m){$('foto-acoes-cam').hidden=m!=='cam';$('foto-acoes-ok').hidden=m!=='ok';$('foto-prev').hidden=m!=='ok';
  if(m==='ok'){$('foto-video').hidden=true;$('foto-oval').hidden=true;$('foto-dica').hidden=true;$('foto-idle').hidden=true}}
function fotoCamStop(){FOTO.camSeq++;if(FOTO.stream){FOTO.stream.getTracks().forEach(t=>t.stop());FOTO.stream=null}const v=$('foto-video');v.srcObject=null;v.hidden=true;$('foto-oval').hidden=true;$('foto-dica').hidden=true}
function fotoSemCam(m){$('foto-idle').hidden=false;$('foto-idle').textContent='Sem câmera';$('foto-tirar').disabled=true;fotoMsg(m+' Use “Usar o app de câmera do celular” ou registre sem foto, com justificativa.')}
async function fotoCamStart(){
  fotoCamStop();const seq=FOTO.camSeq;fotoMsg('');$('foto-idle').hidden=false;$('foto-idle').textContent='Iniciando câmera…';$('foto-tirar').disabled=true;
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){fotoSemCam('Câmera indisponível neste navegador.');return}
  let st=null;try{st=await navigator.mediaDevices.getUserMedia({video:{facingMode:FOTO.facing,width:{ideal:1280},height:{ideal:960}},audio:false})}
  catch(e){if(seq===FOTO.camSeq)fotoSemCam('A câmera não pôde ser aberta (permissão negada ou em uso).');return}
  if(seq!==FOTO.camSeq||!$('foto-modal').classList.contains('on')){st.getTracks().forEach(t=>t.stop());return}
  FOTO.stream=st;const v=$('foto-video');v.srcObject=st;v.hidden=false;v.classList.toggle('espelho',FOTO.facing==='user');
  $('foto-idle').hidden=true;$('foto-oval').hidden=false;$('foto-dica').hidden=false;
  try{await v.play()}catch(e){}
  $('foto-tirar').disabled=false;
}
/* contexto do modal: de quem é a foto e o que fazer com ela (usar / pular com justificativa / fechar) */
let FCTX=null;
function fotoCtxColab(){
  const c=CUR;if(!c)return null;const e=emp(c.empresaId),o=obra(c.obraId);
  return {titulo:'Foto do colaborador',nome:c.nome,usarTxt:'',
    quem:`<b>${esc(c.nome)}</b> · ${esc((e||{}).nome||'—')} · ${esc((o||{}).nome||'—')}`,
    aviso:`O registro de <b>${esc(c.nome)}</b> ficará marcado como <b>sem foto</b>`,
    linhas:()=>fotoLinhas({registradoEm:new Date().toISOString(),empresaNome:e&&e.nome,obraNome:o&&o.nome,nome:c.nome,semQr:CUR_SEMQR}),
    semPular:CUR_SEMQR,
    vale:()=>CUR===c,
    usar:raw=>{FOTO.raw=raw;FOTO.skip=null;FOTO.thumb=fotoThumb(raw);renderColabCard();renderMeal()},
    pular:m=>{FOTO.raw=null;FOTO.thumb=null;FOTO.skip=m;renderColabCard();renderMeal()},
    fechar:()=>{renderColabCard();renderMeal()}};
}
function fotoAbrir(ctx){
  ctx=ctx&&typeof ctx.vale==='function'?ctx:fotoCtxColab();if(!ctx)return;
  FCTX=ctx;FOTO.tmp=null;$('foto-pular').hidden=!!ctx.semPular;
  $('foto-titulo').textContent=ctx.titulo;$('foto-quem').innerHTML=ctx.quem;$('foto-usar').textContent=ctx.usarTxt||'✓ Usar esta foto';
  fotoModo('cam');$('foto-modal').classList.add('on');fotoCamStart();
}
function fotoFechar(){fotoCamStop();$('foto-modal').classList.remove('on');FCTX=null}
function fotoPreview(raw){
  if(!FCTX)return;FOTO.tmp=raw;
  $('foto-prev').src=fotoCanvas(raw,FOTO_CFG.c.w,FOTO_CFG.c.h,FCTX.linhas()).toDataURL('image/jpeg',.85);
  fotoCamStop();fotoModo('ok');fotoMsg('');
}
async function imagemDeArquivo(f){
  try{return await createImageBitmap(f,{imageOrientation:'from-image'})}catch(e){}
  try{return await createImageBitmap(f)}catch(e){}
  return await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error('imagem inválida'));i.src=URL.createObjectURL(f)});
}
$('foto-tirar').onclick=()=>{const v=$('foto-video');if(!FOTO.stream||!v.videoWidth)return;fotoPreview(fotoCrop(v,v.videoWidth,v.videoHeight))};
$('foto-refazer').onclick=()=>{FOTO.tmp=null;fotoModo('cam');fotoCamStart()};
$('foto-usar').onclick=()=>{const ctx=FCTX,raw=FOTO.tmp;if(!raw||!ctx)return;FOTO.tmp=null;fotoFechar();if(ctx.vale())ctx.usar(raw)};
$('foto-virar').onclick=()=>{FOTO.facing=FOTO.facing==='user'?'environment':'user';try{localStorage.setItem('sismed_foto_cam',FOTO.facing)}catch(e){}fotoCamStart()};
$('foto-close').onclick=()=>{const ctx=FCTX;fotoFechar();if(ctx&&ctx.vale())ctx.fechar()};
$('foto-file').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
  try{const im=await imagemDeArquivo(f);const w=im.naturalWidth||im.width,h=im.naturalHeight||im.height;fotoPreview(fotoCrop(im,w,h))}catch(err){fotoMsg('Não foi possível ler a foto. Tente de novo.')}};
$('foto-pular').onclick=()=>{
  const ctx=FCTX;if(!ctx)return;fotoFechar();
  justModal({titulo:'Registrar sem foto',resumo:`<div class="notice warn">${ctx.aviso}, com a justificativa, em Administrativo › Registros e na Auditoria.</div><div class="row" style="gap:6px">${['Câmera com defeito','Colaborador recusou a foto','Sem iluminação adequada'].map(m=>`<button type="button" class="btn sec sm" data-jmm="${esc(m)}">${esc(m)}</button>`).join('')}</div>`,
    botao:'Confirmar sem foto',onOk:m=>{if(ctx.vale())ctx.pular(m)}});
  document.querySelectorAll('[data-jmm]').forEach(b=>b.onclick=()=>{$('jm-txt').value=b.dataset.jmm;$('jm-txt').focus()});
};

/* ---- fila de envio (IndexedDB): a foto fica no aparelho até o servidor confirmar ---- */
const FQ={db:undefined,mem:new Map(),pend:new Set(),busy:false,timer:null,avisou:false};
function fqDb(){if(FQ.db!==undefined)return Promise.resolve(FQ.db);
  return new Promise(res=>{try{const r=indexedDB.open('sismed_fotos',1);r.onupgradeneeded=()=>r.result.createObjectStore('fila',{keyPath:'p'});
    r.onsuccess=()=>{FQ.db=r.result;FQ.db.onclose=()=>{FQ.db=undefined};res(FQ.db)};r.onerror=r.onblocked=()=>{FQ.db=null;res(null)}}catch(e){FQ.db=null;res(null)}})}
async function fqOp(mode,fn){const db=await fqDb();if(!db)return fn(null);
  return new Promise((res,rej)=>{let out;try{const tx=db.transaction('fila',mode);out=fn(tx.objectStore('fila'));tx.oncomplete=()=>res(out&&typeof out==='object'&&'result' in out?out.result:out);tx.onerror=tx.onabort=()=>{FQ.db=undefined;rej(tx.error)}}catch(e){FQ.db=undefined;rej(e)}})}
const fqPut=it=>fqOp('readwrite',st=>{if(!st){FQ.mem.set(it.p,it);return}return st.put(it)});
const fqDel=p=>fqOp('readwrite',st=>{if(!st){FQ.mem.delete(p);return}return st.delete(p)});
const fqAll=()=>fqOp('readonly',st=>st?st.getAll():[...FQ.mem.values()]);
function fotoDescartar(it){if(!it)return;FQ.pend.delete(it.p);FQ.mem.delete(it.p);fqDel(it.p).catch(()=>{})}
async function fotoEnfileirar(it){FQ.pend.add(it.p);try{await fqPut(it)}catch(e){FQ.mem.set(it.p,it)}}
async function fotoLocal(p){try{const l=await fqAll();const it=(l||[]).find(i=>i.p===p)||FQ.mem.get(p);return it?new Blob([it.c],{type:it.tipo}):null}catch(e){const it=FQ.mem.get(p);return it?new Blob([it.c],{type:it.tipo}):null}}
async function fotoEnviar(){
  if(FQ.busy||!USER)return;FQ.busy=true;clearTimeout(FQ.timer);let erro=null,enviou=false;
  if(!(await sessaoValida())){FQ.busy=false;FQ.timer=setTimeout(fotoEnviar,30000);return}   // v2.9.8: sem a sessão renovada o servidor recusaria (visitante anônimo): espera
  try{
    let itens=[];try{itens=(await fqAll())||[]}catch(e){}
    FQ.mem.forEach(v=>{if(!itens.some(i=>i.p===v.p))itens.push(v)});
    itens.forEach(i=>FQ.pend.add(i.p));
    for(const it of itens){
      let falhou=null;
      for(const k of ['c','a']){
        if(it['ok_'+k])continue;
        const {error}=await sb.storage.from('fotos').upload(`${k}/${it.p}`,new Blob([it[k]],{type:it.tipo}),{contentType:it.tipo,upsert:false,cacheControl:'86400'});
        if(error&&!/exist|duplicate|409/i.test(`${error.message||''} ${error.statusCode||''} ${error.error||''}`)){falhou=error;break}
        it['ok_'+k]=true;try{await fqPut(it)}catch(e){}
      }
      if(falhou){erro=falhou;const st=String(falhou.statusCode||falhou.status||'');if(!st||/^5/.test(st)||/fetch|network|timeout/i.test(falhou.message||''))break;continue} // sem rede: para; recusa de uma foto: segue com as outras
      try{await fqDel(it.p)}catch(e){}FQ.mem.delete(it.p);FQ.pend.delete(it.p);enviou=true;
    }
  }catch(e){erro=e}
  finally{
    FQ.busy=false;
    if(erro&&!FQ.avisou&&/row-level security|permission|policy|403|Unauthorized/i.test(String(erro.message||erro))){FQ.avisou=true;toast('O servidor recusou o envio da foto (sem permissão). A foto continua guardada neste aparelho.','bad')}
    if(FQ.pend.size)FQ.timer=setTimeout(fotoEnviar,erro?30000:1500);
    if(enviou&&PAGE==='rest'&&USER)renderRest(true);
  }
}
setInterval(()=>{if(FQ.pend.size&&!FQ.busy)fotoEnviar()},60000);

/* ---- indicadores e visualização ---- */
function fotoPill(r){
  if(r.foto)return FQ.pend.has(r.foto.p)?' <span class="pill warn" title="Foto guardada neste aparelho — será enviada quando houver internet">📷 enviando</span>':' <span class="pill neutral" title="Foto registrada">📷</span>';
  return r.semFoto?` <span class="pill warn" title="${esc(r.semFoto)}">sem foto</span>`:'';
}
function fotoBtn(r){
  if(r.foto&&can('fotos.ver'))return `<button class="btn sec sm" data-foto="${esc(r.id)}" title="Foto, data e hora do registro" style="white-space:nowrap">📷 Ver foto</button>`;
  return `<button class="btn sec sm" data-foto="${esc(r.id)}" title="Data, hora e detalhes do registro" style="white-space:nowrap">${r.semFoto?'<span style="color:var(--warn)">Sem foto</span>':'Detalhes'}</button>`;
}
function fotoDia(r){return r.foto&&r.foto.p?r.foto.p.slice(0,10):''}
function fotoArquivada(r){return !!(r.foto&&fotoDia(r)<=addDays(today(),-FOTO_CFG.dias))}
let FV_SEQ=0;
async function verRegistro(r){if(!FV_DOCA_AGORA)fvDocar(false);   // v3.0.1: fora do Fechamento, a foto abre na janela de sempre
  if(!r)return;const m=modOf(r),seq=++FV_SEQ;
  const rp=r.retiradoPor||{};
  $('fv-title').textContent=r.foto&&can('fotos.ver')?(m==='retirada'?'Foto de quem retirou':'Foto do registro'):'Detalhes do registro';
  const linhas=[['Data e hora do registro',`<b class="num">${brdt(r.registradoEm)}</b>`],['Colaborador',`<b>${esc(r.nome)}</b>`],...(m==='retirada'?[['Retirado por',`<b>${esc(rp.nome||'—')}</b><div class="small muted">${rp.qr?'QR '+esc(rp.qr):'nome digitado, sem QR Code'}${r.foto?' · é a pessoa da foto':''}</div>`]]:[]),[m==='terceirizado'?'Empresa (custo)':'Empresa',esc(r.empresaNome||'—')],...(m==='terceirizado'?[['Empresa terceirizada',`<b>${esc(r.terceirizada||'não informada')}</b>`]]:[]),['Obra',esc(r.obraNome||'—')],
    ['Refeição',`${tipo(r.tipo).curto} · ${br(r.data)}${r.retro?' <span class="pill warn">retroativo</span>':r.dataManual?' <span class="pill warn">data manual</span>':''}`],['Valor',`<span class="num">${money(r.valor)}</span>${r.fechado&&!r.bmId?' <span class="pill bad">fechada sem BM</span>':''}`],
    ...(diaValidadoReg(r)?[['Fechamento',`<span class="pill ok">✓ dia validado</span> <span class="small muted">por ${esc(diaValidadoReg(r).por||'—')} em ${brdt(diaValidadoReg(r).em)}</span>`]]:[]),
    ...(r.retro?[['Cadastro',`Registro retroativo — lote de ${esc(r.retro.n||'?')} colaborador(es)${r.retro.obs?' · '+esc(r.retro.obs):''}`]]:[]),
    ['Modalidade',modPill(r)],
    ['Restaurante',esc((ct(ctOf(r))||{}).nome||r.contratadaNome||'—')],['Registrado por',esc(r.usuario||'—')]];
  if(r.semFoto)linhas.push(['Foto',`<span class="pill warn">sem foto</span> ${esc(r.semFoto)}`]);
  $('fv-body').innerHTML=`<div class="fvimg" id="fv-img"><div class="vazio">Carregando a foto…</div></div><dl class="fvinfo">${linhas.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  $('fv-modal').classList.add('on');
  const box=$('fv-img');const vazio=t=>{box.classList.add('sem');box.innerHTML=`<div class="vazio">${t}</div>`};
  if(!r.foto&&r.retro)return vazio('Registro retroativo — lançado depois, sem foto.');
  if(!r.foto)return vazio(r.semFoto?'📷 Registro feito <b>sem foto</b> (justificativa abaixo).':m==='presencial'?'Registro sem foto — feito antes da foto obrigatória.':m==='retirada'?'Retirada sem foto — feita antes da foto obrigatória.':'Registro manual — sem foto.');
  if(!can('fotos.ver'))return vazio('Você não tem permissão para ver fotos.<br>Peça ao administrador a permissão “Ver fotos do rosto nos registros”.');
  if(fotoArquivada(r)){
    vazio(`A foto tem mais de ${FOTO_CFG.dias} dias e foi para o arquivo compactado.<br>Baixe em <b>Auditoria › Arquivos compactados › Fotos</b> — dia <b>${br(fotoDia(r))}</b>.${can('fotos.baixar')&&can('aud.arquivos')?'<div style="margin-top:10px"><button class="btn sec sm" id="fv-ir" type="button">Ir para os arquivos de fotos</button></div>':''}`);
    const b=$('fv-ir');if(b)b.onclick=()=>{$('fv-modal').classList.remove('on');ARQ_TAB='fotos';AUD_ABA='arq';FA_DIA=fotoDia(r);go('aud');setTimeout(()=>{const c=$('arq-card');if(c)c.scrollIntoView({behavior:'smooth',block:'start'})},150)};
    return;
  }
  let url=null;const loc=await fotoLocal(r.foto.p);if(loc)url=URL.createObjectURL(loc);
  if(!url){try{const {data,error}=await sb.storage.from('fotos').createSignedUrl('c/'+r.foto.p,300);if(!error&&data)url=data.signedUrl}catch(e){}}
  if(seq!==FV_SEQ)return;
  const naoChegou='A foto ainda não chegou ao servidor — o aparelho que fez o registro pode estar sem internet. Tente de novo mais tarde.';
  if(!url)return vazio(naoChegou);
  const img=new Image();img.alt=m==='retirada'?`Foto de ${rp.nome||'quem retirou'}, que retirou a refeição de ${r.nome} — ${brdt(r.registradoEm)}`:`Foto de ${r.nome} — ${brdt(r.registradoEm)}`;
  img.onload=()=>{if(seq!==FV_SEQ)return;box.classList.remove('sem');box.innerHTML='';box.appendChild(img)};img.onerror=()=>{if(seq===FV_SEQ)vazio(naoChegou)};img.src=url;
  audit('foto.ver',`${r.nome} — ${tipo(r.tipo).curto} de ${br(r.data)} (registrado em ${brdt(r.registradoEm)})${m==='retirada'?' — foto de quem retirou: '+(rp.nome||'—'):''}`,{obra:r.obraNome,empresa:r.empresaNome,entidade:'registro '+r.id});save();
}
$('fv-close').onclick=()=>{$('fv-modal').classList.remove('on');FV_SEQ++;FV_NAV=null};

/* ---- Auditoria › Arquivos compactados › Fotos ---- */
let ARQ_TAB='aud',FA_DIA=null,FA_KEY='',FA_LIST=[],FA_USO=null,FA_BUSY=false;
function tamanho(b){b=+b||0;if(!b)return '0 KB';return b<1048576?`${Math.max(1,Math.round(b/1024))} KB`:b<1073741824?`${(b/1048576).toFixed(1).replace('.',',')} MB`:`${(b/1073741824).toFixed(2).replace('.',',').replace(/,00$/,'')} GB`}
$('arq-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{ARQ_TAB=b.dataset.at;renderAudArq()});
$('sup-abas').querySelectorAll('[data-sa]').forEach(b=>b.onclick=()=>supAba(b.dataset.sa));
$('aud-abas').querySelectorAll('[data-aa]').forEach(b=>b.onclick=()=>{if(AUD_ABA===b.dataset.aa)return;AUD_ABA=b.dataset.aa;if(USER){audit('nav','Auditoria › '+b.textContent.trim());save()}renderAud()});

/* =================== REGISTRO DE USUÁRIOS (v2.8.3) ===================
   Cada aparelho conectado manda um sinal por minuto para a tabela "sessoes": início da sessão, último sinal e fim (ao tocar em Sair).
   Online = sinal há menos de 2,5 min. Tempo logado = do início ao fim (ou ao último sinal, se a pessoa fechou sem sair).
   Mais de 5 min sem sinal (aparelho dormindo, sem internet) encerra a sessão: a próxima começa do zero. */
const SESSAO_PULSO=60000,SESSAO_ONLINE=150000,SESSAO_PAUSA=300000;let SESSAO=null,SESSAO_T=null,SESSAO_OFF=false;
function sessaoAparelho(){const ua=navigator.userAgent||'';const tipo=/iPad|Tablet/i.test(ua)?'Tablet':/Mobi|Android|iPhone/i.test(ua)?'Celular':'Computador';
  const nav=/Edg\//.test(ua)?'Edge':/OPR\//.test(ua)?'Opera':/SamsungBrowser/.test(ua)?'Samsung Internet':/Chrome\//.test(ua)?'Chrome':/Firefox\//.test(ua)?'Firefox':/Safari\//.test(ua)?'Safari':'navegador';return tipo+' · '+nav}
function sessaoErroTabela(e){return /sessoes|does not exist|42P01|PGRST20[0-9]|schema cache/i.test(String((e&&e.message)||'')+' '+String((e&&e.code)||''))}
async function sessaoGrava(fim){if(!USER||!SESSAO||SESSAO_OFF)return;
  if(!fim&&SESSAO.ultimo&&Date.now()-Date.parse(SESSAO.ultimo)>SESSAO_PAUSA)SESSAO={id:'s-'+uid(),inicio:new Date().toISOString(),ultimo:null,fim:null,aparelho:SESSAO.aparelho};
  const agora=new Date().toISOString();SESSAO.ultimo=agora;if(fim)SESSAO.fim=agora;
  try{sessionStorage.setItem('sismed_sessao',JSON.stringify({...SESSAO,usuarioId:USER.id}))}catch(e){}
  if(navigator.onLine===false)return;
  try{const {error}=await sb.from('sessoes').upsert({id:SESSAO.id,data:{usuarioId:USER.id,nome:USER.nome||'',login:USER.login||'',inicio:SESSAO.inicio,ultimo:SESSAO.ultimo,fim:SESSAO.fim||null,aparelho:SESSAO.aparelho}});
    if(error&&sessaoErroTabela(error))SESSAO_OFF=true}catch(e){}}
function sessaoInicia(){if(!USER)return;let s=null;try{s=JSON.parse(sessionStorage.getItem('sismed_sessao')||'null')}catch(e){}
  if(s&&s.usuarioId===USER.id&&!s.fim&&s.ultimo&&Date.now()-Date.parse(s.ultimo)<SESSAO_PAUSA)SESSAO={id:s.id,inicio:s.inicio,ultimo:s.ultimo,fim:null,aparelho:s.aparelho||sessaoAparelho()};
  else SESSAO={id:'s-'+uid(),inicio:new Date().toISOString(),ultimo:null,fim:null,aparelho:sessaoAparelho()};
  clearInterval(SESSAO_T);SESSAO_T=setInterval(()=>sessaoGrava(),SESSAO_PULSO);sessaoGrava()}
async function sessaoEncerra(){clearInterval(SESSAO_T);SESSAO_T=null;if(SESSAO&&USER){try{await sessaoGrava(true)}catch(e){}}SESSAO=null;try{sessionStorage.removeItem('sismed_sessao')}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&SESSAO&&USER)sessaoGrava()});
const SESS={lista:null,em:0,erro:null,sel:null,carregando:null,t:null};
function sessoesCarrega(){if(SESS.carregando)return SESS.carregando;SESS.carregando=(async()=>{try{const desde=new Date(Date.now()-31*864e5).toISOString();
    const data=await lerTudo(()=>sb.from('sessoes').select('id,data').gte('data->>ultimo',desde).order('id'),20000);
    const t=v=>typeof v==='string'?v:'';
    SESS.lista=(data||[]).map(r=>{const d=r.data&&typeof r.data==='object'&&!Array.isArray(r.data)?r.data:{};return {id:String(r.id),usuarioId:t(d.usuarioId),inicio:t(d.inicio),ultimo:t(d.ultimo)||t(d.inicio),fim:t(d.fim),aparelho:t(d.aparelho)}})
      .filter(x=>x.usuarioId&&x.inicio&&isFinite(Date.parse(x.inicio))&&isFinite(Date.parse(x.ultimo))&&x.ultimo>=desde);SESS.erro=null}
  catch(e){SESS.erro=e;SESS.lista=null}SESS.em=Date.now();SESS.carregando=null})();return SESS.carregando}
function fmtDur(ms){if(ms==null||!isFinite(ms))return '—';const m=Math.round(ms/60000);if(m<1)return 'menos de 1 min';if(m<60)return m+' min';const h=Math.floor(m/60),r=m%60;return h+' h'+(r?' '+pad(r)+' min':'')}
function quandoTxt(iso){const d=new Date(iso);if(!isFinite(d))return '—';const dia=ymd(d),h=today(),on=new Date();on.setDate(on.getDate()-1);
  return dia===h?'hoje, '+hm(iso):dia===ymd(on)?'ontem, '+hm(iso):brdt(iso)}
function renderSessoes(){
  const av=$('usu-aviso');
  if((!SESS.lista&&!SESS.erro)||Date.now()-SESS.em>60000){sessoesCarrega().then(()=>{if(audVisivel()&&AUD_ABA==='usu')renderSessoes()});
    if(!SESS.lista&&!SESS.erro){av.hidden=false;av.className='notice info';av.textContent='Carregando…';$('usu-corpo').hidden=true;return}}
  clearInterval(SESS.t);SESS.t=setInterval(()=>{if(!audVisivel()||AUD_ABA!=='usu'||!USER){clearInterval(SESS.t);return}renderSessoes()},30000);
  if(SESS.erro){av.hidden=false;av.className='notice warn';av.textContent='O registro de usuários começa a funcionar depois da atualização do banco (tabela de sessões). Até lá, os acessos não são gravados.';$('usu-corpo').hidden=true;return}
  av.hidden=true;$('usu-corpo').hidden=false;
  const agora=Date.now(),hoje=today(),por=new Map();SESS.lista.forEach(x=>{if(!por.has(x.usuarioId))por.set(x.usuarioId,[]);por.get(x.usuarioId).push(x)});
  const fimDe=x=>x.fim||x.ultimo||x.inicio,ativa=x=>!x.fim&&agora-Date.parse(x.ultimo||x.inicio)<SESSAO_ONLINE,durDe=x=>Math.max(0,(ativa(x)?agora:Date.parse(fimDe(x)))-Date.parse(x.inicio));
  const L=S.users.filter(u=>u.status!=='pendente').map(u=>{const ss=(por.get(u.id)||[]).slice().sort((a,b)=>fimDe(b).localeCompare(fimDe(a)));const on=ss.find(ativa),ult=on||ss[0];
    return {id:u.id,nome:u.nome||u.login||'—',login:String(u.login||'').toUpperCase(),perfil:u.perfil||u.tipo||'',conta:u.ativo!==false,online:!!on,desde:on?on.inicio:'',
      ultimo:ult?(on?new Date(agora).toISOString():fimDe(ult)):'',dur:ult?durDe(ult):null,n:ss.length,total:ss.reduce((t,x)=>t+durDe(x),0),aparelho:ult?ult.aparelho:'',ss}});
  ORD_COLS.usu=[x=>x.nome,x=>x.perfil,x=>x.online?'Online':'Offline',x=>x.ultimo,x=>x.dur,x=>x.n,x=>x.total,x=>x.aparelho];
  const Lo=ordLista('usu',L.slice().sort((a,b)=>(b.online-a.online)||String(b.ultimo).localeCompare(String(a.ultimo))||a.nome.localeCompare(b.nome,'pt-BR')));
  const nOn=L.filter(x=>x.online).length,nHoje=L.filter(x=>x.ultimo&&ymd(new Date(x.ultimo))===hoje).length,nSem=L.filter(x=>!x.ultimo).length;
  $('usu-tiles').innerHTML=`<div class="tile total"><div class="k">Online agora</div><div class="v num">${nOn}</div><div class="s">${nOn===1?'usuário':'usuários'} com o sistema aberto</div></div><div class="tile almoco"><div class="k">Acessaram hoje</div><div class="v num">${nHoje}</div><div class="s">de ${L.length} usuário(s)</div></div><div class="tile jantar"><div class="k">Sem acesso em 30 dias</div><div class="v num">${nSem}</div><div class="s">nenhuma sessão no período</div></div>`;
  $('usu-table').innerHTML=`<thead><tr><th>Usuário</th><th>Perfil</th><th>Situação</th><th>Último acesso</th><th>Tempo logado</th><th class="r">Sessões (30 dias)</th><th class="r">Tempo total (30 dias)</th><th>Aparelho</th></tr></thead><tbody>${Lo.map(x=>`<tr class="usu-l${SESS.sel===x.id?' sel':''}" data-usu="${esc(x.id)}" tabindex="0"><td><b>${esc(x.nome)}</b><div class="small muted mono">${esc(x.login)}${x.conta?'':' · conta inativa'}</div></td><td>${esc(x.perfil)}</td><td>${x.online?'<span class="pill ok usu-on">● Online</span>':'<span class="pill neutral">Offline</span>'}</td><td class="num">${x.online?`agora<div class="small muted">desde ${hm(x.desde)}</div>`:x.ultimo?esc(quandoTxt(x.ultimo)):'<span class="muted">sem acesso em 30 dias</span>'}</td><td class="num">${x.dur==null?'—':fmtDur(x.dur)}${x.online?'<div class="small muted">sessão atual</div>':x.dur!=null?'<div class="small muted">última sessão</div>':''}</td><td class="r num">${x.n}</td><td class="r num">${x.n?fmtDur(x.total):'—'}</td><td class="small">${esc(x.aparelho||'—')}</td></tr>`).join('')||'<tr><td colspan="8" class="empty">Nenhum usuário.</td></tr>'}</tbody>`;
  $('usu-table').querySelectorAll('[data-usu]').forEach(tr=>{const f=()=>{SESS.sel=SESS.sel===tr.dataset.usu?null:tr.dataset.usu;renderSessoes();if(SESS.sel)$('usu-hist-card').scrollIntoView({block:'nearest'})};tr.onclick=f;tr.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();f()}}});
  const sel=L.find(x=>x.id===SESS.sel);$('usu-hist-card').hidden=!sel;
  if(sel){$('usu-hist-tit').textContent=`Sessões de ${sel.nome} — últimos 30 dias`;
    const como=x=>ativa(x)?'em andamento':x.fim?'saiu pelo botão Sair':'fechou sem sair (último sinal)';
    ORD_COLS.usuHist=[x=>x.inicio,x=>ativa(x)?new Date(agora).toISOString():fimDe(x),x=>durDe(x),x=>x.aparelho,x=>como(x)];
    const H=ordLista('usuHist',sel.ss.slice().sort((a,b)=>b.inicio.localeCompare(a.inicio)));
    $('usu-hist').innerHTML=`<thead><tr><th>Entrou em</th><th>Saiu em / último sinal</th><th>Tempo logado</th><th>Aparelho</th><th>Como terminou</th></tr></thead><tbody>${H.map(x=>`<tr><td class="num">${esc(brdt(x.inicio))}</td><td class="num">${ativa(x)?'— (online)':esc(brdt(fimDe(x)))}</td><td class="num">${fmtDur(durDe(x))}</td><td class="small">${esc(x.aparelho||'—')}</td><td>${ativa(x)?'<span class="pill ok">em andamento</span>':x.fim?'saiu pelo botão Sair':'<span class="muted">fechou sem sair (último sinal)</span>'}</td></tr>`).join('')||'<tr><td colspan="5" class="empty">Nenhuma sessão nos últimos 30 dias.</td></tr>'}</tbody>`}
}
async function renderFotosArq(forcar){
  const de=$('fa-de'),ate=$('fa-ate');
  if(FA_DIA){de.value=FA_DIA;ate.value=FA_DIA;FA_DIA=null;forcar=true}
  if(!de.value)de.value=addDays(today(),-30);if(!ate.value)ate.value=today();
  if(de.value>ate.value){const x=de.value;de.value=ate.value;ate.value=x}
  $('fa-agora').hidden=!isAdm(USER);
  const key=de.value+'|'+ate.value;
  if(forcar||FA_KEY!==key){
    FA_KEY=key;$('fa-table').innerHTML='<tbody><tr><td class="empty">Carregando…</td></tr></tbody>';
    try{
      const sel=c=>sb.from('fotos_arquivos').select(c).gte('dia',de.value).lte('dia',ate.value).order('dia',{ascending:false});
      let [l,u]=await Promise.all([sel('dia,arquivo,qtd,bytes,atualizado_em'),sb.rpc('fotos_uso')]);
      if(l.error&&/arquivo/.test(l.error.message||''))l=await sel('dia,qtd,bytes,atualizado_em');   // banco ainda sem a coluna (antes do v289.sql)
      if(l.error)throw l.error;FA_USO=u&&!u.error?u.data:null;
      // dias de cada arquivo (inclusive os de fora do período escolhido)
      const ds=(l.data||[]).map(r=>({...r,dia:String(r.dia).slice(0,10),arquivo:r.arquivo||`z/${String(r.dia).slice(0,10)}.zip`}));
      const multi=[...new Set(ds.filter(r=>/_a_/.test(r.arquivo)).map(r=>r.arquivo))];
      if(multi.length){const x=await sb.from('fotos_arquivos').select('dia,arquivo,qtd,bytes,atualizado_em').in('arquivo',multi);if(!x.error)(x.data||[]).forEach(r=>{const d=String(r.dia).slice(0,10);if(!ds.some(y=>y.dia===d))ds.push({...r,dia:d})})}
      const m=new Map();ds.forEach(r=>{const a=m.get(r.arquivo)||{arquivo:r.arquivo,dias:[],qtd:0,bytes:0,atualizado_em:''};a.dias.push(r.dia);a.qtd+=r.qtd||0;a.bytes+=+r.bytes||0;if((r.atualizado_em||'')>a.atualizado_em)a.atualizado_em=r.atualizado_em;m.set(r.arquivo,a)});
      FA_LIST=[...m.values()].map(a=>({...a,dias:a.dias.sort(),de:a.dias.slice().sort()[0],ate:a.dias.slice().sort().slice(-1)[0],dia:a.dias.slice().sort()[0]})).sort((a,b)=>a.ate<b.ate?1:-1);
    }catch(e){FA_LIST=[];FA_KEY='';$('fa-table').innerHTML=`<tbody><tr><td class="empty">Não foi possível carregar os arquivos: ${esc(e.message||e)}</td></tr></tbody>`;return}
  }
  const U=FA_USO;
  $('fotos-uso').innerHTML=U?`<div class="tile total"><div class="k">Fotos em consulta</div><div class="v num">${num(U.consulta_qtd)}</div><div class="s">${tamanho(U.consulta_bytes)} · últimos ${FOTO_CFG.dias} dias</div></div>
    <div class="tile almoco"><div class="k">Aguardando compactação</div><div class="v num">${num(U.pendente_qtd)}</div><div class="s">${tamanho(U.pendente_bytes)} · compacta ao juntar 3 MB</div></div>
    <div class="tile jantar"><div class="k">Arquivos compactados</div><div class="v num">${num(U.zip_qtd)}</div><div class="s">${tamanho(U.zip_bytes)} · guardados 12 meses</div></div>
    <div class="tile lanche"><div class="k">Espaço de arquivos usado</div><div class="v num">${((U.total_bytes||0)/(U.limite_bytes||1073741824)*100).toFixed(1).replace('.',',')}%</div><div class="s">${tamanho(U.total_bytes)} de ${tamanho(U.limite_bytes||1073741824)} (inclui anexos de BM)</div></div>`:'';
  const tq=FA_LIST.reduce((s,a)=>s+(a.qtd||0),0),tb=FA_LIST.reduce((s,a)=>s+(+a.bytes||0),0);
  if(!FA_BUSY)$('fa-resumo').textContent=FA_LIST.length?`${FA_LIST.length} arquivo(s) com dias no período · ${num(tq)} foto(s) · ${tamanho(tb)}`:'';
  $('fa-baixar').disabled=!FA_LIST.length||FA_BUSY;
  const per=a=>a.de===a.ate?`${wd(a.de)}, ${br(a.de)}`:`${br(a.de)} a ${br(a.ate)} <span class="small muted">(${a.dias.length} dias)</span>`;
  $('fa-table').innerHTML=`<thead><tr><th>Dias</th><th class="r">Fotos</th><th class="r">Tamanho</th><th>Atualizado em</th><th></th></tr></thead><tbody>${FA_LIST.map((a,i)=>`<tr><td class="num">${per(a)}</td><td class="r num">${num(a.qtd)}</td><td class="r num">${tamanho(a.bytes)}</td><td class="num small">${a.atualizado_em?brdt(a.atualizado_em):'—'}</td><td><button class="btn sec sm" type="button" data-faarq="${i}">Baixar</button></td></tr>`).join('')||`<tr><td colspan="5" class="empty">Nenhum arquivo compactado neste período. As fotos viram arquivo quando as que aguardam somam 3 MB (ou pelo botão "Compactar agora").</td></tr>`}</tbody>`;
  $('fa-table').querySelectorAll('[data-faarq]').forEach(b=>b.onclick=()=>baixarFotos([FA_LIST[+b.dataset.faarq]]));
}
['fa-de','fa-ate'].forEach(id=>$(id).onchange=()=>renderFotosArq());
$('fa-baixar').onclick=()=>baixarFotos(FA_LIST);
function carregarFflate(){
  return window.fflate?Promise.resolve(window.fflate):garantirPdf().then(()=>window.fflate||Promise.reject(new Error('a biblioteca de compactação não carregou — recarregue a página')),()=>Promise.reject(new Error('não foi possível baixar a biblioteca de compactação — verifique a internet')))}
function salvarArquivo(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},5000)}
async function baixarFotos(lista){
  if(!lista.length||FA_BUSY)return;FA_BUSY=true;$('fa-baixar').disabled=true;const st=$('fa-resumo');
  const ord=lista.slice().sort((a,b)=>a.dia<b.dia?-1:1);const de=ord[0].de||ord[0].dia,ate=ord.reduce((m,a)=>(a.ate||a.dia)>m?(a.ate||a.dia):m,'');const qtd=ord.reduce((s,a)=>s+(a.qtd||0),0);
  const arqDe=a=>a.arquivo||`z/${a.dia}.zip`;
  try{
    let blob,name;
    if(ord.length===1){st.textContent=`Baixando ${br(de)}${de!==ate?' a '+br(ate):''}…`;const {data,error}=await sb.storage.from('fotos').download(arqDe(ord[0]));if(error)throw error;blob=data;name=de===ate?`fotos-${de}.zip`:`fotos-${de}_a_${ate}.zip`}
    else{
      if(ord.reduce((s,a)=>s+(+a.bytes||0),0)>350*1048576)throw new Error('período grande demais para um único arquivo (mais de 350 MB). Escolha um período menor.');
      const ff=await carregarFflate();const ent={};
      for(let i=0;i<ord.length;i++){const a=ord[i];st.textContent=`Baixando ${i+1} de ${ord.length} (${br(a.dia)})…`;
        const {data,error}=await sb.storage.from('fotos').download(arqDe(a));if(error)throw new Error(`${br(a.dia)}: ${error.message||error}`);
        const z=ff.unzipSync(new Uint8Array(await data.arrayBuffer()));for(const [k,v] of Object.entries(z))if(!k.endsWith('/'))ent[k]=[v,{level:0}]}
      st.textContent='Montando o arquivo…';await new Promise(r=>setTimeout(r,30));
      blob=new Blob([ff.zipSync(ent)],{type:'application/zip'});name=`fotos-${de}_a_${ate}.zip`;
    }
    audit('fotos.baixar',`${br(de)}${de!==ate?' a '+br(ate):''} — ${ord.length} arquivo(s), ${qtd} foto(s)`,{entidade:'fotos'});   // (um arquivo pode ter vários dias)save();
    salvarArquivo(blob,name);sucesso(`${num(qtd)} foto(s) baixada(s) — ${name}`);
  }catch(e){toast('Não foi possível baixar as fotos: '+(e.message||e),'bad')}
  FA_BUSY=false;renderFotosArq();
}
$('fa-agora').onclick=async()=>{
  const b=$('fa-agora');b.disabled=true;const t=b.textContent;b.textContent='Compactando…';
  try{const {data,error}=await sb.functions.invoke('fotos-compactar',{body:{incluirHoje:true}});if(error)throw error;if(data&&data.error)throw new Error(data.error);
    sucesso(data&&data.fotosCompactadas?`${data.fotosCompactadas} foto(s) compactada(s)`:'Nenhuma foto nova para compactar');
    try{await loadAll()}catch(e){}FA_KEY='';renderAud();
  }catch(e){let m=e.message||String(e);try{if(e.context&&typeof e.context.json==='function'){const j=await e.context.json();if(j&&j.error)m=j.error}}catch(x){}toast('Não foi possível compactar agora: '+m,'bad')}
  b.disabled=false;b.textContent=t;
};

/* =================== HORÁRIO LIMITE DE REGISTRO (v2.2) ===================
   Configurações › Horários (permissão cfg.horarios). Guardado em config id "horarios".
   Bloqueia QR, código digitado e registro manual (Retirada/Terceirizado) fora da janela do tipo, pelo relógio do aparelho.
   Não bloqueia sobras nem registros com data manual (retroativa). */
const HORARIOS_PADRAO={ativo:false,tipos:{cafe:{ativo:true,ini:'06:00',fim:'08:00'},almoco:{ativo:true,ini:'11:00',fim:'13:00'},jantar:{ativo:true,ini:'18:00',fim:'21:00'},lanche:{ativo:false,ini:'15:00',fim:'16:00'}}};
function horarios(){const h=(S&&S.horarios)||{};const tipos={};TIPOS.forEach(t=>{tipos[t.id]=Object.assign({},HORARIOS_PADRAO.tipos[t.id],(h.tipos||{})[t.id]||{})});return {ativo:!!h.ativo,tipos}}
function agoraHM(){const d=new Date();return pad(d.getHours())+':'+pad(d.getMinutes())}
function janela(tipoId){const H=horarios();if(!H.ativo)return null;const c=H.tipos[tipoId];return c&&c.ativo&&c.ini&&c.fim?c:null}
function horarioErro(tipoId,dataRef){
  if(dataRef&&dataRef!==today())return null;const c=janela(tipoId);if(!c)return null;const h=agoraHM();
  const dentro=c.ini<=c.fim?(h>=c.ini&&h<=c.fim):(h>=c.ini||h<=c.fim);
  return dentro?null:`${tipo(tipoId).curto}: registro permitido das ${c.ini} às ${c.fim} (agora são ${h}).`}
function renderHorariosRest(){try{restTiposAtualizar()}catch(e){}
  const el=$('rest-horarios');const H=horarios();el.hidden=!H.ativo;if(!H.ativo){el.innerHTML='';return}
  el.innerHTML='<span class="muted">Horário de registro:</span>'+TIPOS.map(t=>{const c=janela(t.id);const livre=!horarioErro(t.id);return `<span class="pill ${c?(livre?'ok':'neutral'):'neutral'}" title="${c?(livre?'aberto agora':'fechado agora'):'sem limite de horário'}">${t.curto} ${c?esc(c.ini+'–'+c.fim):'livre'}${c&&livre?' · aberto':''}</span>`}).join('');
}
setInterval(()=>{if(!USER||PAGE!=='rest')return;renderHorariosRest();if(CUR&&!$('confirm-card').hidden&&!FOTO.busy)renderMeal()},30000);
/* Configurações › Horários */
let HED=null;
function renderHorarios(){HED=JSON.parse(JSON.stringify(horarios()));$('h-err').hidden=true;desenhaHorarios()}
function desenhaHorarios(){
  const on=HED.ativo;$('h-ativo').classList.toggle('on',on);$('h-ativo').setAttribute('aria-checked',String(on));$('h-ativo-txt').textContent=on?'Limite ativado':'Limite desativado';$('h-ativo-txt').style.color=on?'var(--good)':'var(--ink-3)';
  $('h-tabela').innerHTML=`<div class="hrow hh"><span>Refeição</span><span>Limitar</span><span>Início</span><span>Término</span></div>`+TIPOS.map(t=>{const c=HED.tipos[t.id];return `<div class="hrow${on&&c.ativo?'':' off'}"><span><span class="pill ${t.id}">${t.curto}</span></span><span><button type="button" class="switch${c.ativo?' on':''}" data-ht="${esc(t.id)}" role="switch" aria-checked="${c.ativo===true}" aria-label="Limitar horário — ${t.curto}"></button></span><span data-l="Início"><input type="time" data-hi="${esc(t.id)}" value="${esc(c.ini)}" ${c.ativo?'':'disabled'} aria-label="Início — ${t.curto}"></span><span data-l="Término"><input type="time" data-hf="${esc(t.id)}" value="${esc(c.fim)}" ${c.ativo?'':'disabled'} aria-label="Término — ${t.curto}"></span></div>`}).join('');
  $('h-tabela').querySelectorAll('[data-ht]').forEach(b=>b.onclick=()=>{const c=HED.tipos[b.dataset.ht];c.ativo=!c.ativo;desenhaHorarios()});
  $('h-tabela').querySelectorAll('[data-hi]').forEach(i=>i.onchange=()=>{HED.tipos[i.dataset.hi].ini=i.value});
  $('h-tabela').querySelectorAll('[data-hf]').forEach(i=>i.onchange=()=>{HED.tipos[i.dataset.hf].fim=i.value});
  $('h-save').disabled=!can('cfg.horarios');
}
$('h-ativo').onclick=()=>{HED.ativo=!HED.ativo;desenhaHorarios()};
$('h-reset').onclick=renderHorarios;
$('h-save').onclick=()=>{
  if(!can('cfg.horarios'))return;const err=$('h-err');
  const ruim=TIPOS.filter(t=>{const c=HED.tipos[t.id];return c.ativo&&(!c.ini||!c.fim||c.ini===c.fim)});
  if(ruim.length){err.hidden=false;err.textContent=`Informe início e término diferentes para: ${ruim.map(t=>t.curto).join(', ')}.`;return}
  err.hidden=true;const antes=horarios();
  const txt=H=>(H.ativo?'ATIVADO':'DESATIVADO')+' — '+TIPOS.map(t=>{const c=H.tipos[t.id];return `${t.curto} ${c.ativo?c.ini+'–'+c.fim:'livre'}`}).join(', ');
  S.horarios=JSON.parse(JSON.stringify(HED));
  audit('horarios.salvar',txt(S.horarios),{entidade:'horários de registro',antes:txt(antes),depois:txt(S.horarios)});
  concluir(S.horarios.ativo?'Horários salvos — limite ativado':'Horários salvos — limite desativado');desenhaHorarios();
};

/* =================== ANALÍTICO (v2.2) ===================
   Refeições registradas + sobras cobradas (1 unidade por refeição que sobrou); não inclui as fechadas sem BM.
   Cores dos gráficos: --viz-qtd (quantidade) e --viz-val (valor) — par validado para daltonismo, claro e escuro. */
let ANA={preset:'mes',emps:new Set(),obras:new Set(),tipos:new Set()};   // v2.9.4: empresa, obra e tipo com várias escolhas
function anaDatas(p){const t=today();const d=parse(t);
  if(p==='mes')return [ymd(new Date(d.getFullYear(),d.getMonth(),1)),ymd(new Date(d.getFullYear(),d.getMonth()+1,0))];
  if(p==='mes-ant')return [ymd(new Date(d.getFullYear(),d.getMonth()-1,1)),ymd(new Date(d.getFullYear(),d.getMonth(),0))];
  if(p==='30')return [addDays(t,-29),t];
  if(p==='ano')return [ymd(new Date(d.getFullYear(),0,1)),ymd(new Date(d.getFullYear(),11,31))];
  return null}
function anaFiltros(){const um=x=>x.size===1?[...x][0]:'';return {de:$('an-de').value,ate:$('an-ate').value,emps:new Set(ANA.emps),obras:new Set(ANA.obras),tipos:new Set(ANA.tipos),emp:um(ANA.emps),obra:um(ANA.obras),colab:'',tipo:um(ANA.tipos),ct:$('an-ct').value}}
function anaObrasItens(){const varias=ANA.emps.size!==1;return S.obras.filter(o=>obraOk(o.id)&&(!ANA.emps.size||ANA.emps.has(o.empresaId))).map(o=>{const e=emp(o.empresaId);return {id:o.id,nome:o.nome+(varias&&e?' — '+e.nome:'')+(o.ativo===false?' (inativa)':'')}}).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'))}
function anaItens(F){
  const se=F.emps||new Set(F.emp?[F.emp]:[]),so=F.obras||new Set(F.obra?[F.obra]:[]),st=F.tipos||new Set(F.tipo?[F.tipo]:[]);
  const ok=x=>x.data>=F.de&&x.data<=F.ate&&(!se.size||se.has(x.empresaId))&&(!so.size||so.has(x.obraId))&&(!st.size||st.has(x.tipo))&&(!F.ct||ctOf(x)===F.ct);
  const regs=S.registros.filter(r=>!r.fechado&&regOk(r)&&ok(r)&&(!F.colab||String(r.nome||'').toLowerCase().includes(F.colab)));
  const sob=F.colab?[]:(S.sobras||[]).filter(s=>s.empresaId&&sobraOk(s)&&ok(s)).flatMap(sobraUnits);
  return regs.concat(sob)}
function anaNum(v){return Math.round(v).toLocaleString('pt-BR')}
function anaMoedaCurta(v){return v>=1e6?'R$ '+(v/1e6).toFixed(1).replace('.',',')+' mi':v>=1e4?'R$ '+(v/1e3).toFixed(0)+' mil':v>=1e3?'R$ '+(v/1e3).toFixed(1).replace('.',',')+' mil':'R$ '+Math.round(v)}
function niceMax(v){if(v<=0)return 1;const e=Math.pow(10,Math.floor(Math.log10(v)));const f=v/e;return (f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*e}
/* =================== ANALÍTICO — PAINEL "CENTRAL DE COMANDO" (v2.8.0) ===================
   Mesmos dados (anaItens). Uma medida por vez (Refeições ou Valor) — nunca dois eixos no mesmo gráfico.
   Cores por token (--fx-t-*, --fx-acc…): claras ou escuras conforme o tema; o Fluxo usa sempre as escuras. Validadas (daltonismo
   e visão normal) nos vizinhos do empilhado (café·almoço·jantar·lanche) e do anel (café·almoço·lanche·jantar, com o fecho). */
const FX={m:'q',sig:'',animar:true,colabN:10};
const FX_COR={cafe:'var(--fx-t-cafe)',almoco:'var(--fx-t-almoco)',jantar:'var(--fx-t-jantar)',lanche:'var(--fx-t-lanche)'},FX_ANEL=['cafe','almoco','lanche','jantar'],FX_ACC='var(--fx-acc)',FX_SF='var(--fx-sf)';
const FX_DIAS=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],FX_DIAS_L=['segunda','terça','quarta','quinta','sexta','sábado','domingo'];
function fxVal(x){return FX.m==='v'?(x.valor||0):1}
function fxF(v){return FX.m==='v'?money(v):anaNum(v)}
function fxC(v){return FX.m==='v'?anaMoedaCurta(v):(v>=1e4?anaNum(v/1e3)+' mil':anaNum(v))}
function fxUn(){return FX.m==='v'?'em R$':'refeições'}
function fxRed(){try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}}
function fxP(a,b){return b?(a/b*100).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%':'—'}
/* comparação justa: mesmo número de dias já decorridos. Mês(es) inteiro(s) → mesmos dias do(s) mês(es) anterior(es)
   (ex.: outubro até o dia 15 × 01 a 15 de setembro); outros períodos → janela do mesmo tamanho logo antes, cortada nos dias decorridos. */
function fxComparar(F,B){const hj=today(),fim=F.ate<hj?F.ate:hj;
  const n=F.de>fim?B.dias:Math.round((parse(fim)-parse(F.de))/864e5)+1;
  const pm=s=>+s.slice(0,4)*12+(+s.slice(5,7))-1,dm=k=>`${Math.floor(k/12)}-${String(k%12+1).padStart(2,'0')}-01`;
  let de,limite=addDays(F.de,-1),meses=F.de.slice(8)==='01'&&addDays(F.ate,1).slice(8)==='01';
  if(meses){const k=pm(F.ate)-pm(F.de)+1;de=dm(pm(F.de)-k)}else de=addDays(F.de,-B.dias);
  let ate=meses&&n>=B.dias?limite:addDays(de,n-1);if(ate>limite)ate=limite;
  const c=x=>x.slice(0,4)===F.de.slice(0,4)?br(x).slice(0,5):br(x).slice(0,6)+br(x).slice(8);
  return {de,ate,txt:`${c(de)} a ${c(ate)}`,parcial:n<B.dias}}
function fxDelta(cur,prev){const cmp=FX.cmp||{txt:'período anterior'};if(!prev)return `<span class="fx-dl" title="Comparação com ${esc(cmp.txt)}"><b>—</b> <em>sem dados em ${esc(cmp.txt)}</em></span>`;const d=(cur-prev)/prev*100;
  return `<span class="fx-dl" title="Comparação com ${esc(cmp.txt)}${cmp.parcial?' (mesmo número de dias já decorridos)':''}"><b>${Math.abs(d)<0.05?'=':d>0?'▲':'▼'} ${Math.abs(d).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})}%</b> <em>vs. ${esc(cmp.txt)}</em></span>`}
function fxMedido(x){if(!x.bmId)return false;const b=S.bms.find(y=>y.id===x.bmId);return !b||b.status!=='rascunho'}
function fxBuckets(F){const dias=Math.round((parse(F.ate)-parse(F.de))/864e5)+1,porMes=dias>92,b=[];
  if(porMes){let d=parse(F.de);d=new Date(d.getFullYear(),d.getMonth(),1);const fim=parse(F.ate);
    while(d<=fim){b.push({k:ymd(d).slice(0,7),lab:d.toLocaleDateString('pt-BR',{month:'short'}).replace('.','')+'/'+String(d.getFullYear()).slice(2),tit:d.toLocaleDateString('pt-BR',{month:'long',year:'numeric'}),fds:false});d=new Date(d.getFullYear(),d.getMonth()+1,1)}}
  else for(let d=F.de;d<=F.ate;d=addDays(d,1)){const w=parse(d).getDay();b.push({k:d,lab:String(+d.slice(8)),tit:`${wd(d)}, ${br(d)}`,fds:w===0||w===6,mes:d.slice(8)==='01'?parse(d).toLocaleDateString('pt-BR',{month:'short'}).replace('.',''):''})}
  return {b,porMes,dias,key:x=>porMes?x.data.slice(0,7):x.data}}
function fxAgrega(it,B){const m={};B.b.forEach(x=>{m[x.k]={q:0,v:0,t:{},c:new Set()}});
  it.forEach(x=>{const a=m[B.key(x)];if(!a)return;a.q++;a.v+=x.valor||0;const t=a.t[x.tipo]||(a.t[x.tipo]={q:0,v:0});t.q++;t.v+=x.valor||0;if(!x.sobra)a.c.add(x.colabId||'n:'+x.nome)});return m}
function fxGrupos(it,fk,fn){const m=new Map();it.forEach(x=>{const k=fk(x)||'—';let g=m.get(k);if(!g){g={k,nome:fn(x)||'—',q:0,v:0,t:{},x};m.set(k,g)}g.q++;g.v+=x.valor||0;g.t[x.tipo]=(g.t[x.tipo]||0)+fxVal(x)});
  return [...m.values()].sort((a,b)=>(FX.m==='v'?b.v-a.v:b.q-a.q)||(FX.m==='v'?b.q-a.q:b.v-a.v)||String(a.nome).localeCompare(String(b.nome)))}
function fxConta(el,fim,fmt){if(!FX.animar||fxRed()){el.textContent=fmt(fim);return}const t0=performance.now(),dur=800;
  const st=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=fmt(fim*e);if(k<1)requestAnimationFrame(st)};el.textContent=fmt(0);requestAnimationFrame(st)}
function fxDica(alvo,titulo,linhas,cor){const show=ev=>vizTip(ev,titulo,linhas,cor,alvo);alvo.addEventListener('pointerenter',show);alvo.addEventListener('pointermove',show);alvo.addEventListener('focus',show);alvo.addEventListener('pointerleave',vizTipHide);alvo.addEventListener('blur',vizTipHide)}
function fxSpark(el,vals){vals=vals.filter(v=>v!==null&&isFinite(v));const W=Math.max(60,el.clientWidth||200),H=Math.max(28,el.clientHeight||44),n=vals.length;if(n<2){el.innerHTML='';return}
  const mx=Math.max(...vals)||1,mn=Math.min(0,...vals);const x=i=>4+i*(W-10)/(n-1),y=v=>H-5-((v-mn)/(mx-mn||1))*(H-12);
  const d=vals.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+','+y(v).toFixed(1)).join('');
  el.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true"><defs><linearGradient id="fxsg${el.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:${FX_ACC}" stop-opacity=".22"/><stop offset="1" style="stop-color:${FX_ACC}" stop-opacity="0"/></linearGradient></defs><path d="${d}L${x(n-1).toFixed(1)},${H}L${x(0).toFixed(1)},${H}Z" fill="url(#fxsg${el.id})"/><path d="${d}" fill="none" style="stroke:${FX_ACC}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" class="fx-glow"/><circle cx="${x(n-1).toFixed(1)}" cy="${y(vals[n-1]).toFixed(1)}" r="4" style="fill:${FX_ACC};stroke:${FX_SF}" stroke-width="2"/></svg>`}

function renderAna(){
  if(!$('an-de').value||!$('an-ate').value){const r=anaDatas(ANA.preset)||anaDatas('mes');$('an-de').value=r[0];$('an-ate').value=r[1]}
  if($('an-de').value>$('an-ate').value){const x=$('an-de').value;$('an-de').value=$('an-ate').value;$('an-ate').value=x}
  document.querySelectorAll('#an-presets [data-p]').forEach(b=>b.classList.toggle('on',b.dataset.p===ANA.preset));
  msMontar('an-emp',relEmpresas(),ANA.emps,'Todas',renderAna,{plural:'empresas'});
  msMontar('an-obra',anaObrasItens(),ANA.obras,'Todas',renderAna,{plural:'obras'});
  msMontar('an-tipo',relTiposItens(),ANA.tipos,'Todos',renderAna,{plural:'tipos'});
  fillSelect($('an-ct'),(S.contratadas||[]).filter(c=>ctOk(c.id)),$('an-ct').value,'Todos');
  const F=anaFiltros();const it=anaItens(F);
  const sig=JSON.stringify([F.de,F.ate,[...F.emps],[...F.obras],[...F.tipos],F.ct,FX.m,FX.colabN]);FX.animar=sig!==FX.sig&&!fxRed();FX.sig=sig;
  $('page-ana').classList.remove('fx-anim');if(FX.animar){void $('page-ana').offsetWidth;$('page-ana').classList.add('fx-anim')}
  document.querySelectorAll('#ana-medida [data-m]').forEach(b=>{const on=b.dataset.m===FX.m;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on))});
  const B=fxBuckets(F);
  {const sub=$('ana-sub');if(sub)sub.textContent=`${br(F.de)} a ${br(F.ate)} · ${B.dias} dia${B.dias===1?'':'s'}`}   // v2.8.6: cabeçalho retirado
  const vazio=!it.length;$('ana-vazio').hidden=!vazio;$('ana-kpis').hidden=vazio;$('ana-grid').hidden=vazio;if(vazio){vizTipHide();return}
  FX.cmp=fxComparar(F,B);const prev=anaItens({...F,de:FX.cmp.de,ate:FX.cmp.ate});
  const A=fxAgrega(it,B);
  fxKpis(F,B,A,it,prev);fxTempo(B,A);fxMix(it);fxCalor(it);fxObras(it);fxRest(it);
}
function fxDeltaTxt(cur,prev){const cmp=FX.cmp||{txt:'período anterior'};if(!prev)return `sem dados em ${cmp.txt}`;const d=(cur-prev)/prev*100;
  return `${Math.abs(d)<0.05?'=':d>0?'▲':'▼'} ${Math.abs(d).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})}% vs. ${cmp.txt}`}
/* KPIs (v2.8.7): dentro do card "Fluxo de refeições", na parte de baixo (no tema escuro do card). Só o número principal —
   o resto (por dia, comparação) fica na dica ao passar o mouse —, menos em Sobras, que mostra quantidade, percentual e valor.
   O KPI da medida escolhida em "Mostrar" fica com o rótulo destacado. */
/* ícones dos KPIs (v2.8.8): prato (Refeições), cédula (Valor gasto), prancheta (Medido em BM), prato (Sobras) */
const FX_ICO={prato:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12.5" r="4.7"/><circle cx="12" cy="12.5" r="2.1"/><path d="M3.4 4v4a1.4 1.4 0 0 0 2.8 0V4M4.8 9.4V20.5M20.6 4c-1.5.9-2.2 2.9-2.2 5.3v3.2h2.2v8"/></svg>',
  dinheiro:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12.5" rx="2.2"/><circle cx="12" cy="12.25" r="2.7"/><path d="M6 9.6v5.3M18 9.6v5.3"/></svg>',
  prancheta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4.8" y="4.5" width="14.4" height="17" rx="2.2"/><rect x="9" y="2.6" width="6" height="3.6" rx="1.1"/><path d="M8.6 11h6.8M8.6 14.6h6.8M8.6 18.2h4"/></svg>',
  sobra:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="14.5" rx="9.3" ry="5.3"/><ellipse cx="12" cy="14.5" rx="5" ry="2.6"/><path d="M9.4 3.6c-.8 1 .8 1.8 0 2.9M12.4 3c-.8 1.1.8 2 0 3.1M15.4 3.6c-.8 1 .8 1.8 0 2.9"/></svg>'};
function fxKpis(F,B,A,it,prev){
  const sv=l=>l.reduce((s,x)=>s+(x.valor||0),0);
  const q=it.length,v=sv(it),pq=prev.length,pv=sv(prev),med=sv(it.filter(fxMedido));
  const sob=it.filter(x=>x.sobra),nsob=sob.length,vsob=sv(sob),psob=prev.filter(x=>x.sobra).length;
  const pct=(a,b)=>(b?a/b*100:0).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';
  const fimEf=F.ate<today()?F.ate:today();const dc=F.de>fimEf?0:Math.round((parse(fimEf)-parse(F.de))/864e5)+1;
  const K=[
    {id:'q',lab:'Refeições',ico:FX_ICO.prato,tipos:TIPOS.map(t=>({id:t.id,nome:t.curto,q:it.filter(x=>x.tipo===t.id).length})).filter(t=>t.id!=='lanche'||t.q),val:q,fmt:anaNum,dica:[dc?anaNum(q/dc)+' por dia corrido':'',nsob?`inclui ${anaNum(nsob)} sobra${nsob>1?'s':''}`:'',fxDeltaTxt(q,pq)]},
    {id:'v',lab:'Valor gasto',ico:FX_ICO.dinheiro,val:v,fmt:money,dica:[dc?money(v/dc)+' por dia corrido':'',fxDeltaTxt(v,pv)]},
    {id:'m',lab:'Medido em BM',ico:FX_ICO.prancheta,val:v?med/v*100:0,fmt:x=>x.toLocaleString('pt-BR',{maximumFractionDigits:1})+'%',dica:[`${money(med)} de ${money(v)}`,'em BM fechado, assinado ou faturado'],meter:v?med/v:0},
    {id:'s',lab:'Sobras',ico:FX_ICO.sobra,val:nsob,fmt:anaNum,sub:`${pct(nsob,q)} das refeições · ${money(vsob)}`,
     dica:[`${anaNum(nsob)} sobra${nsob===1?'':'s'} de ${anaNum(q)} refeições no período (${pct(nsob,q)})`,`${money(vsob)} de ${money(v)} (${pct(vsob,v)} do valor)`,fxDeltaTxt(nsob,psob)]}];
  $('ana-kpis').innerHTML=K.map(k=>`<div class="fx-kpi${FX.m===k.id?' ativo':''}" id="fx-k-${k.id}" title="${esc(k.dica.filter(Boolean).join('\n'))}"><div class="fx-k-lab"><span class="fx-k-ico" aria-hidden="true">${k.ico||''}</span>${esc(k.lab)}</div><div class="fx-k-val${String(k.fmt(k.val)).length>10?' longo':''}" data-k="${k.id}">${esc(k.fmt(k.val))}</div>${k.tipos?`<div class="fx-k-tipos">${k.tipos.map(t=>`<span data-t="${t.id}"><i style="background:${FX_COR[t.id]}"></i>${esc(t.nome)} <b class="num">${anaNum(t.q)}</b></span>`).join('')}</div>`:''}${k.sub!==undefined?`<div class="fx-k-sub">${esc(k.sub)}</div>`:''}${k.meter!==undefined?`<div class="fx-meter" role="img" aria-label="${esc(k.fmt(k.val))} do valor já medido em BM"><i style="width:${(Math.max(0,Math.min(1,k.meter))*100).toFixed(1)}%"></i></div>`:''}</div>`).join('');
  K.forEach(k=>{const el=$('ana-kpis').querySelector(`[data-k="${k.id}"]`);fxConta(el,k.val,k.fmt)});
}
/* rótulo curto para cima das colunas: quantidade inteira; em R$, valor compacto sem o símbolo (1,6 mil) */
function fxRotulo(v){if(FX.m!=='v')return anaNum(v);if(v>=1e6)return (v/1e6).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mi';if(v>=1e3)return (v/1e3).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mil';return anaNum(v)}
/* curva suave que passa por todos os pontos sem ultrapassá-los (cúbica monotônica de Fritsch–Carlson) */
function fxCurva(P){const n=P.length;if(n<2)return '';const f=v=>v.toFixed(1);if(n===2)return `M${f(P[0][0])},${f(P[0][1])}L${f(P[1][0])},${f(P[1][1])}`;
  const d=[],m=[];for(let i=0;i<n-1;i++)d.push((P[i+1][1]-P[i][1])/(P[i+1][0]-P[i][0]));
  m[0]=d[0];m[n-1]=d[n-2];for(let i=1;i<n-1;i++)m[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){m[i]=0;m[i+1]=0;continue}const a=m[i]/d[i],b=m[i+1]/d[i],h=a*a+b*b;if(h>9){const t=3/Math.sqrt(h);m[i]=t*a*d[i];m[i+1]=t*b*d[i]}}
  let s=`M${f(P[0][0])},${f(P[0][1])}`;
  for(let i=0;i<n-1;i++){const [x0,y0]=P[i],[x1,y1]=P[i+1],h=(x1-x0)/3;s+=`C${f(x0+h)},${f(y0+m[i]*h)} ${f(x1-h)},${f(y1-m[i+1]*h)} ${f(x1)},${f(y1)}`}
  return s}
/* fluxo: colunas empilhadas por tipo (≤24px, topo arredondado, 2px entre os tipos), média móvel de 7 dias, rolagem para o lado */
function fxTempo(B,A){
  const el=$('fx-tempo'),cel=innerWidth<900;
  const pts=B.b.map(b=>{const a=A[b.k];const seg=TIPOS.map(t=>({id:t.id,nome:t.curto,val:a.t[t.id]?(FX.m==='v'?a.t[t.id].v:a.t[t.id].q):0}));return {...b,seg,tot:seg.reduce((s,x)=>s+x.val,0),q:a.q,v:a.v}});
  $('fx-tempo-tit').textContent=FX.m==='v'?'Fluxo de gastos':'Fluxo de refeições';
  const usaMM=false;   // v2.8.8: sem a linha "Média 7 dias"
  $('fx-tempo-sub').textContent=`${B.porMes?'por mês':'por dia'} · empilhado por tipo de refeição${usaMM?' · linha: média móvel de 7 dias':''}${B.porMes?'':' · faixas claras: fins de semana'}`;
  $('fx-tempo-leg').innerHTML=TIPOS.map(t=>`<span><i style="background:${FX_COR[t.id]}"></i>${esc(t.curto)}</span>`).join('')+(usaMM?'<span><i class="ln"></i>Média 7 dias</span>':'');
  const H=cel?260:320,mt=30,mb=34,n=pts.length,max=niceMax(Math.max(0,...pts.map(p=>p.tot)));
  const ml=Math.max(44,String(fxC(max)).length*7+14),disp=Math.max(200,(el.clientWidth||900)-ml);
  const band=Math.max(disp/n,B.porMes?56:(cel?26:22)),pw=Math.round(band*n),ph=H-mt-mb,y=v=>mt+ph-(v/max)*ph,bw=Math.max(3,Math.min(24,band*.62));
  const ticks=[0,.25,.5,.75,1].map(f=>f*max);
  const ax=`<svg class="fx-svg" width="${ml}" height="${H}" aria-hidden="true">${ticks.map(t=>`<text x="${ml-10}" y="${(y(t)+4).toFixed(1)}" text-anchor="end">${esc(fxC(t))}</text>`).join('')}</svg>`;
  let sv=`<svg class="fx-svg" width="${pw}" height="${H}" role="img" aria-label="${esc($('fx-tempo-tit').textContent+', '+$('fx-tempo-sub').textContent)}">`;
  pts.forEach((p,i)=>{if(p.fds)sv+=`<rect class="fx-fds" x="${(i*band).toFixed(1)}" y="${mt}" width="${band.toFixed(1)}" height="${ph}"/>`});
  sv+=ticks.map((t,i)=>`<line class="${i?'fx-gl':'fx-base'}" x1="0" x2="${pw}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}"/>`).join('');
  sv+=`<line class="fx-cross" id="fx-cross" x1="0" x2="0" y1="${mt-8}" y2="${mt+ph}" visibility="hidden"/>`;
  sv+=`<rect class="fx-selbg" id="fx-selbg" x="0" y="${mt-14}" width="${band.toFixed(1)}" height="${ph+14}" rx="6" visibility="hidden"/>`;
  const passo=Math.max(1,Math.ceil(30/band));
  pts.forEach((p,i)=>{const x=i*band+(band-bw)/2;let acc=0,g='';const vis=p.seg.filter(s=>s.val>0);
    vis.forEach((s,j)=>{const y0=y(acc),y1=y(acc+s.val);acc+=s.val;const top=j===vis.length-1;const yt=top?y1:y1+2,h=y0-yt;if(h<=.4)return;
      if(top){const r=Math.min(4,bw/2,h);g+=`<path style="fill:${FX_COR[s.id]}" d="M${x.toFixed(1)},${y0.toFixed(1)}V${(yt+r).toFixed(1)}Q${x.toFixed(1)},${yt.toFixed(1)} ${(x+r).toFixed(1)},${yt.toFixed(1)}H${(x+bw-r).toFixed(1)}Q${(x+bw).toFixed(1)},${yt.toFixed(1)} ${(x+bw).toFixed(1)},${(yt+r).toFixed(1)}V${y0.toFixed(1)}Z"/>`}
      else g+=`<rect style="fill:${FX_COR[s.id]}" x="${x.toFixed(1)}" y="${yt.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}"/>`});
    sv+=`<g class="fx-col" data-i="${i}" data-k="${esc(p.k)}" style="--d:${Math.min(i*14,600)}ms">${g}</g>`;
    if(i%passo===0||p.mes)sv+=`<text class="${p.mes?'fx-mes':''}" x="${(i*band+band/2).toFixed(1)}" y="${H-12}" text-anchor="middle">${esc(p.mes?p.mes:p.lab)}</text>`});
  if(usaMM){const mm=pts.map((p,i)=>i<6?null:pts.slice(i-6,i+1).reduce((s,q)=>s+q.tot,0)/7);const P=[];mm.forEach((v,i)=>{if(v!==null)P.push([i*band+band/2,y(v)])});const d=fxCurva(P);
    if(d)sv+=`<path class="fx-mm" d="${d}" fill="none" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" style="stroke:var(--fx-ink);filter:drop-shadow(0 0 3px var(--fx-cross))"/>`}
  // quantidade em cima de cada coluna (o tamanho da letra se ajusta à largura da coluna)
  pts.forEach((p,i)=>{if(!(p.tot>0))return;const t=fxRotulo(p.tot),fs=Math.max(8,Math.min(11,band*0.92/(t.length*0.6)));
    sv+=`<text class="fx-lbl fx-qt" x="${(i*band+band/2).toFixed(1)}" y="${(y(p.tot)-5).toFixed(1)}" text-anchor="middle" style="font-size:${fs.toFixed(1)}px">${esc(t)}</text>`});
  pts.forEach((p,i)=>{sv+=`<rect class="fx-hit" data-i="${i}" data-k="${esc(p.k)}" x="${(i*band).toFixed(1)}" y="${mt-14}" width="${band.toFixed(1)}" height="${ph+14}" tabindex="0" role="button" aria-pressed="false" aria-label="${esc(p.tit+': '+fxF(p.tot)+' — toque para marcar e ver o relatório')}"/>`});
  sv+='</svg>';
  el.innerHTML=`<div class="fx-tl"><div>${ax}</div><div class="fx-tl-sc" tabindex="0" aria-label="Gráfico do período — role para o lado para ver tudo">${sv}</div></div><div class="fx-dica" id="fx-tempo-dica" hidden>↔ role para o lado para ver o período inteiro</div>`;
  const sc=el.querySelector('.fx-tl-sc');const rola=sc.scrollWidth>sc.clientWidth+2;$('fx-tempo-dica').hidden=!rola;if(rola)sc.scrollLeft=sc.scrollWidth;
  const cross=el.querySelector('#fx-cross'),cols=el.querySelectorAll('.fx-col');el._band=band;FX.pts=pts;FX.porMes=B.porMes;
  el.querySelectorAll('.fx-hit').forEach(h=>{const i=+h.dataset.i,p=pts[i];
    const show=ev=>{cols.forEach(c=>c.classList.toggle('dim',+c.dataset.i!==i));const cx=(i*band+band/2).toFixed(1);cross.setAttribute('x1',cx);cross.setAttribute('x2',cx);cross.setAttribute('visibility','visible');
      vizTip(ev,`${fxF(p.tot)}`,[p.tit].concat(p.seg.filter(s=>s.val).map(s=>`${s.nome}: ${fxF(s.val)}`)).concat([FX.m==='v'?`${anaNum(p.q)} refeições`:`${money(p.v)}`]),null,h)};
    const hide=()=>{cross.setAttribute('visibility','hidden');vizTipHide();fxSelAplica()};
    const marca=()=>{FX.sel=FX.sel===p.k?null:p.k;fxSelAplica();fxSelBarra()};
    h.addEventListener('pointerenter',show);h.addEventListener('pointermove',show);h.addEventListener('focus',show);h.addEventListener('pointerleave',hide);h.addEventListener('blur',hide);
    h.addEventListener('click',marca);h.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();marca()}else if(ev.key==='Escape'&&FX.sel){FX.sel=null;fxSelAplica();fxSelBarra()}})});
  fxSelAplica();fxSelBarra();
  $('fx-tempo-tab').innerHTML=anaTabela([B.porMes?'Mês':'Dia'].concat(TIPOS.map(t=>t.curto)).concat(['Total (refeições)','Valor']),pts.filter(p=>p.q).map(p=>[p.tit].concat(TIPOS.map(t=>{const a=A[p.k].t[t.id];return a?anaNum(a.q):'–'})).concat([anaNum(p.q),money(p.v)])));
}
/* =================== FLUXO: DIA MARCADO E RELATÓRIO DO DIA (v2.8.8) ===================
   Clicar (ou Enter) numa coluna marca o dia — no período longo, o mês. Clicar de novo, no ✕ ou Esc desmarca.
   "Visualizar relatório" abre numa guia nova o PDF com as refeições daquele dia, com os mesmos filtros do Analítico
   (refeições registradas, menos as fechadas sem BM, + sobras cobradas — os mesmos números da coluna). Pede o acesso
   "Relatório de Registros", porque o PDF traz o nome dos colaboradores. */
const FX_SEL_ICO='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><path d="M8.5 14h3"/></svg>';
function fxSelAplica(){const el=$('fx-tempo');if(!el)return;const k=FX.sel,cols=el.querySelectorAll('.fx-col');
  cols.forEach(c=>{const on=!!k&&c.dataset.k===k;c.classList.toggle('sel',on);c.classList.toggle('dim',!!k&&!on)});
  el.querySelectorAll('.fx-hit').forEach(h=>h.setAttribute('aria-pressed',String(!!k&&h.dataset.k===k)));
  const bg=el.querySelector('#fx-selbg'),i=k&&FX.pts?FX.pts.findIndex(p=>p.k===k):-1;
  if(bg){if(i>=0){bg.setAttribute('x',(i*(el._band||0)).toFixed(1));bg.setAttribute('visibility','visible')}else bg.setAttribute('visibility','hidden')}}
function fxSelBarra(){const bar=$('fx-tempo-sel');if(!bar)return;const p=FX.sel&&FX.pts?FX.pts.find(x=>x.k===FX.sel):null;
  if(!p){FX.sel=null;bar.hidden=true;bar.innerHTML='';return}
  const pode=can('rel.registros'),tem=p.q>0;bar.hidden=false;
  bar.innerHTML=`<div class="fx-sel-t"><span class="fx-sel-ico">${FX_SEL_ICO}</span><div><b>${esc(FX.porMes?p.tit.charAt(0).toUpperCase()+p.tit.slice(1):p.tit)}</b><span>${tem?`${anaNum(p.q)} refeiç${p.q===1?'ão':'ões'} · ${esc(money(p.v))}`:'nenhuma refeição'}</span></div></div>`+
    `<div class="fx-sel-a">${pode?`<button type="button" class="fx-sel-ver" id="fx-sel-ver"${tem?'':' disabled'}>Visualizar relatório</button>`:'<span class="fx-sel-sem">O relatório do dia precisa do acesso “Relatório de Registros”.</span>'}<button type="button" class="fx-sel-x" id="fx-sel-x" aria-label="Desmarcar" title="Desmarcar (Esc)">✕</button></div>`;
  $('fx-sel-x').onclick=()=>{FX.sel=null;fxSelAplica();fxSelBarra()};
  const v=$('fx-sel-ver');if(v)v.onclick=()=>anaDiaVer(p.k)}
function anaHora(data,em){if(!em||!isFinite(Date.parse(em)))return '—';const d=ymd(new Date(em));return d===data?hm(em):`${hm(em)} (em ${br(d)})`}
function anaDiaDados(k){
  const F=anaFiltros(),mes=k.length===7;let de=mes?k+'-01':k,ate=mes?ymd(new Date(+k.slice(0,4),+k.slice(5,7),0)):k;
  if(de<F.de)de=F.de;if(ate>F.ate)ate=F.ate;
  const it=anaItens({...F,de,ate});
  const L=it.map(x=>{const e=emp(x.empresaId),en=x.empresaNome||(e&&e.nome)||'—';
    if(x.sobra){const s=(S.sobras||[]).find(y=>y.id===x.sobraId)||{};const o=obra(x.obraId);
      return {data:x.data,cad:x.registradoEm||'',hora:anaHora(x.data,x.registradoEm),nome:s.colabNome||'—',tipo:x.tipo,tipoNome:tipo(x.tipo).curto,valor:x.valor||0,empId:x.empresaId,emp:en,obra:x.obraNome||(o&&o.nome)||'—',cadTipo:'Sobra',forma:'Sobra informada',sobra:true}}
    const l=relLinha(x);return {data:x.data,cad:x.registradoEm||'',hora:anaHora(x.data,x.registradoEm),nome:l.nome,tipo:x.tipo,tipoNome:l.tipoNome,valor:x.valor||0,empId:x.empresaId,emp:en,obra:l.obra,cadTipo:l.modNome+(l.det?' — '+l.det:''),forma:l.forma,sobra:false}})
   .sort((a,b)=>a.data!==b.data?(a.data<b.data?-1:1):(a.cad<b.cad?-1:a.cad>b.cad?1:String(a.nome).localeCompare(String(b.nome),'pt-BR')));
  return {F,k,mes,de,ate,L}}
function anaFiltrosTxt(F){const c=F.ct?(S.contratadas||[]).find(x=>x.id===F.ct):null;const se=F.emps||new Set(F.emp?[F.emp]:[]),so=F.obras||new Set(F.obra?[F.obra]:[]),st=F.tipos||new Set(F.tipo?[F.tipo]:[]);
  const Es=relEmpsLista(se),Os=[...so].map(obra).filter(Boolean);
  return [`Empresa${Es.length>1?'s':''}: ${Es.length?relEmpsTxt(Es):'todas'}`,`Obra${Os.length>1?'s':''}: ${Os.length?Os.map(o=>o.nome+(Es.length!==1&&emp(o.empresaId)?' ('+emp(o.empresaId).nome+')':'')).join(', '):'todas'}`,`Tipo de refeição: ${st.size?TIPOS.filter(t=>st.has(t.id)).map(t=>t.curto).join(', '):'todos'}`,`Restaurante: ${c?c.nome:'todos'}`]}
function anaDiaTitulo(D){if(D.mes){const t=parse(D.k+'-01').toLocaleDateString('pt-BR',{month:'long',year:'numeric'});return `${t.charAt(0).toUpperCase()+t.slice(1)} (${br(D.de)} a ${br(D.ate)})`}
  const d=parse(D.k).toLocaleDateString('pt-BR',{weekday:'long'});return `${d.charAt(0).toUpperCase()+d.slice(1)}, ${br(D.k)}`}
function anaDiaPdf(D){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4',compress:true});const W=297,H=210,M=10;let y=M;
  const L=D.L,ids=[...new Set(L.map(l=>l.empId).filter(Boolean))],Es=ids.map(emp).filter(Boolean).sort((a,b)=>a.nome.localeCompare(b.nome)),um=Es.length===1?Es[0]:null;
  const x=relPdfLogos(doc,um?[um]:[],M,y);   // logotipo só quando o relatório é de uma empresa só
  const tot=L.reduce((s,l)=>s+l.valor,0);
  doc.setTextColor(23,33,43);doc.setFont('helvetica','bold');doc.setFontSize(13);doc.text(D.mes?'RELATÓRIO DE REFEIÇÕES DO MÊS':'RELATÓRIO DE REFEIÇÕES DO DIA',x,y+5);
  doc.setFont('helvetica','normal');doc.setFontSize(9);
  doc.text(`${D.mes?'Mês':'Dia'}: ${anaDiaTitulo(D)}`,x,y+11);
  const et=doc.splitTextToSize(um?`Empresa: ${um.nome}${um.cnpj?'   CNPJ: '+um.cnpj:''}`:`Empresas: ${Es.map(e=>e.nome).join(', ')||'—'}`,W-M-x-66);doc.text(et,x,y+16);
  const fl=doc.splitTextToSize('Filtros do Analítico: '+anaFiltrosTxt(D.F).join('   ·   ')+'   ·   refeições registradas (menos as fechadas sem BM) e sobras cobradas',W-M-x-66);
  doc.setFontSize(8);doc.setTextColor(90);doc.text(fl,x,y+16+et.length*3.9+1);
  doc.setTextColor(23,33,43);doc.setFontSize(9);
  doc.text(`Emitido em ${brdt(new Date().toISOString())}`,W-M,y+5,{align:'right'});doc.text(`por ${USER?USER.nome:'—'}`,W-M,y+11,{align:'right'});
  doc.setFont('helvetica','bold');doc.text(`${anaNum(L.length)} refeiç${L.length===1?'ão':'ões'} · ${money(tot)}`,W-M,y+16,{align:'right'});doc.setFont('helvetica','normal');
  y=Math.max(y+24,y+17+et.length*3.9+fl.length*3.5+2);doc.setDrawColor(23,33,43);doc.setLineWidth(.5);doc.line(M,y,W-M,y);y+=3;
  const head=['Nº'].concat(D.mes?['Data']:[]).concat(['Colaborador','Tipo de refeição','Horário','Valor','Empresa','Obra','Tipo de cadastro','Forma de cadastro']);
  const body=L.map((l,i)=>[String(i+1)].concat(D.mes?[br(l.data)]:[]).concat([l.nome,l.tipoNome,l.hora,money(l.valor),l.emp,l.obra,l.cadTipo,l.forma]));
  const o=D.mes?1:0,cs={0:{cellWidth:9,halign:'center'}};if(D.mes)cs[1]={cellWidth:17};
  Object.assign(cs,{[1+o]:{cellWidth:D.mes?46:52},[2+o]:{cellWidth:D.mes?18:20},[3+o]:{cellWidth:D.mes?16:18},[4+o]:{cellWidth:20,halign:'right'},[5+o]:{cellWidth:D.mes?34:38},[6+o]:{cellWidth:D.mes?38:42},[7+o]:{cellWidth:D.mes?38:42}});
  const foot=[['','Total'].concat(D.mes?['']:[]).concat(['','',money(tot),'','','',''])];
  doc.autoTable({startY:y,head:[head],body,foot,showFoot:'lastPage',margin:{left:M,right:M,bottom:14},theme:'grid',
    styles:{font:'helvetica',fontSize:7.6,cellPadding:1.4,lineColor:[210,216,222],lineWidth:.1,textColor:[23,33,43],overflow:'linebreak',valign:'middle'},
    headStyles:{fillColor:[23,33,43],textColor:255,fontStyle:'bold',fontSize:7.6},footStyles:{fillColor:[232,236,240],textColor:[23,33,43],fontStyle:'bold'},alternateRowStyles:{fillColor:[244,246,248]},columnStyles:cs,
    didParseCell:d=>{if((d.section==='head'||d.section==='foot')&&d.column.index===4+o)d.cell.styles.halign='right'}});
  let yy=doc.lastAutoTable.finalY+6;if(yy>H-22){doc.addPage();yy=16}
  const porTipo=TIPOS.map(t=>{const l=L.filter(z=>z.tipo===t.id);return [t.curto,l.length,l.reduce((s,z)=>s+z.valor,0)]}).filter(a=>a[1]);const ns=L.filter(l=>l.sobra).length;
  doc.setFontSize(9);doc.setFont('helvetica','bold');doc.text('Resumo:',M,yy);doc.setFont('helvetica','normal');
  doc.text(doc.splitTextToSize(porTipo.map(([n,q,v])=>`${n}: ${anaNum(q)} (${money(v)})`).concat([`Total: ${anaNum(L.length)} (${money(tot)})`]).concat(ns?[`inclui ${anaNum(ns)} sobra${ns>1?'s':''}`]:[]).join('     '),W-2*M-16),M+16,yy);
  relPdfRodape(doc,`CAP-Refeições — Relatório de refeições do ${D.mes?'mês':'dia'}`,W,H,M);
  return doc}
function anaDiaVer(k){
  if(!can('rel.registros')){toast('O relatório do dia precisa do acesso “Relatório de Registros”.','warn');return}
  if(!relPdfPronto())return;const D=anaDiaDados(k);if(!D.L.length){toast('Nenhuma refeição neste dia com os filtros escolhidos.','warn');return}
  try{const doc=anaDiaPdf(D);const nome=`relatorio-refeicoes-${D.mes?'mes-'+D.k:'dia-'+D.k}.pdf`;
    audit('relatorio.visualizar',`Analítico — refeições ${D.mes?'do mês':'do dia'} ${D.mes?anaDiaTitulo(D):br(D.k)} — ${D.L.length} refeição(ões) — ${money(D.L.reduce((s,l)=>s+l.valor,0))}`,{empresa:D.F.emps&&D.F.emps.size?relEmpsTxt(relEmpsLista(D.F.emps)):''});save();
    relVerPdf(doc,`Refeições ${D.mes?'do mês':'do dia'} — ${anaDiaTitulo(D)}`,nome)}catch(e){toast('Falha ao gerar o PDF')}}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&FX.sel&&anaVisivel()&&!document.querySelector('.modal.on')){FX.sel=null;fxSelAplica();fxSelBarra()}});
/* anel por tipo: ordem café·almoço·lanche·jantar (todos os vizinhos, inclusive o fecho, passam no teste de daltonismo) */
function fxMix(it){
  const el=$('fx-mix');const tot={};TIPOS.forEach(t=>{tot[t.id]={q:0,v:0}});it.forEach(x=>{if(tot[x.tipo]){tot[x.tipo].q++;tot[x.tipo].v+=x.valor||0}});
  const val=id=>FX.m==='v'?tot[id].v:tot[id].q,T=TIPOS.reduce((s,t)=>s+val(t.id),0);
  const S0=196,c=S0/2,r=68,w=18,gap=3/r;let a0=-Math.PI/2,arcs='',k=0;const P=a=>[(c+r*Math.cos(a)).toFixed(2),(c+r*Math.sin(a)).toFixed(2)];
  FX_ANEL.forEach(id=>{const v=val(id);if(!v||!T)return;const ang=v/T*2*Math.PI;const ini=a0+(ang>gap*2?gap/2:0),fim=a0+ang-(ang>gap*2?gap/2:0);a0+=ang;
    const [x1,y1]=P(ini),[x2,y2]=P(Math.min(fim,ini+2*Math.PI-.0001));const len=(r*(fim-ini)).toFixed(1);
    arcs+=`<path class="fx-arc" data-t="${id}" d="M${x1},${y1}A${r},${r} 0 ${fim-ini>Math.PI?1:0} 1 ${x2},${y2}" stroke-width="${w}" style="stroke:${FX_COR[id]};--len:${len};--d:${k++*120}ms" tabindex="0"/>`});
  let ticks='';for(let i=0;i<60;i++){const a=i/60*2*Math.PI,r1=r+w/2+7,r2=r1+(i%5?3:7);ticks+=`<line x1="${(c+r1*Math.cos(a)).toFixed(1)}" y1="${(c+r1*Math.sin(a)).toFixed(1)}" x2="${(c+r2*Math.cos(a)).toFixed(1)}" y2="${(c+r2*Math.sin(a)).toFixed(1)}" style="stroke:var(${i%5?'--fx-tk1':'--fx-tk2'})" stroke-width="1"/>`}
  const svg=`<svg class="fx-svg" width="${S0}" height="${S0}" viewBox="0 0 ${S0} ${S0}" role="img" aria-label="Participação por tipo de refeição"><circle cx="${c}" cy="${c}" r="${r}" fill="none" style="stroke:var(--fx-trk)" stroke-width="${w}"/>${ticks}${arcs}<text class="fx-cen" x="${c}" y="${c+6}" text-anchor="middle" style="font-size:${String(fxC(T)).length>8?22:30}px">${esc(fxC(T))}</text><text class="fx-cen2" x="${c}" y="${c+26}" text-anchor="middle">${esc(fxUn().toUpperCase())}</text></svg>`;
  el.innerHTML=`<div class="fx-mix">${svg}<div class="fx-mix-leg">${TIPOS.map(t=>`<div class="fx-mix-row" tabindex="0" data-t="${t.id}"><i style="background:${FX_COR[t.id]}"></i><span>${esc(t.curto)}</span><b>${esc(fxF(val(t.id)))}</b><em>${fxP(val(t.id),T)}</em></div>`).join('')}</div></div>`;
  const arcsEl=el.querySelectorAll('.fx-arc');const foco=id=>arcsEl.forEach(a=>a.classList.toggle('dim',id&&a.dataset.t!==id));
  el.querySelectorAll('[data-t]').forEach(n=>{const id=n.dataset.t,t=tipo(id);const linhas=[`${anaNum(tot[id].q)} refeições · ${fxP(tot[id].q,it.length)}`,`${money(tot[id].v)} · preço médio ${money(tot[id].q?tot[id].v/tot[id].q:0)}`];
    fxDica(n,t.curto,linhas,FX_COR[id]);n.addEventListener('pointerenter',()=>foco(id));n.addEventListener('focus',()=>foco(id));n.addEventListener('pointerleave',()=>foco(null));n.addEventListener('blur',()=>foco(null))});
  $('fx-mix-tab').innerHTML=anaTabela(['Tipo','Refeições','% qtd','Valor','% valor','Preço médio'],TIPOS.map(t=>[t.curto,anaNum(tot[t.id].q),fxP(tot[t.id].q,it.length),money(tot[t.id].v),fxP(tot[t.id].v,it.reduce((s,x)=>s+(x.valor||0),0)),money(tot[t.id].q?tot[t.id].v/tot[t.id].q:0)]));
}
/* mapa de calor: dia da semana × hora do registro (só refeições registradas; sobras não têm horário de consumo) — um só tom, mais forte = mais registros */
function fxCalor(it){
  const el=$('fx-calor');const regs=it.filter(x=>!x.sobra&&x.registradoEm);const M=Array.from({length:7},()=>Array(24).fill(0)),Mv=Array.from({length:7},()=>Array(24).fill(0));
  regs.forEach(r=>{const d=new Date(r.registradoEm);if(isNaN(d))return;const w=(d.getDay()+6)%7,h=d.getHours();M[w][h]++;Mv[w][h]+=r.valor||0});
  const V=FX.m==='v'?Mv:M;let hmin=5,hmax=22;for(let h=0;h<24;h++)for(let w=0;w<7;w++)if(M[w][h]){hmin=Math.min(hmin,h);hmax=Math.max(hmax,h)}
  const cols=hmax-hmin+1,lw=36,W=Math.max(320,el.clientWidth||600),cs=Math.max(18,Math.min(36,Math.floor((W-lw)/cols))),gp=3,H=7*cs+24;
  let mx=0,pk=null;for(let w=0;w<7;w++)for(let h=hmin;h<=hmax;h++)if(V[w][h]>mx){mx=V[w][h];pk=[w,h]}
  let sv=`<svg class="fx-svg" width="${lw+cols*cs}" height="${H}" role="img" aria-label="Mapa de calor por dia da semana e hora">`;
  for(let w=0;w<7;w++){sv+=`<text x="${lw-8}" y="${w*cs+cs/2+4}" text-anchor="end">${FX_DIAS[w]}</text>`;
    for(let h=hmin;h<=hmax;h++){const v=V[w][h],x=lw+(h-hmin)*cs,yy=w*cs,f=mx?v/mx:0;
      sv+=`<rect class="fx-cel" data-w="${w}" data-h="${h}" x="${x+gp/2}" y="${yy+gp/2}" width="${cs-gp}" height="${cs-gp}" rx="4" style="fill:${v?'var(--fx-heat)':'var(--fx-empty)'}${v?`;fill-opacity:${(.14+.86*f).toFixed(3)}`:''}${v&&f>.85?';filter:var(--fx-glow-f2)':''}" tabindex="0" aria-label="${FX_DIAS_L[w]}, ${h}h às ${h+1}h: ${esc(fxF(v))}"/>`}}
  for(let h=hmin;h<=hmax;h++)if((h-hmin)%2===0)sv+=`<text x="${lw+(h-hmin)*cs+cs/2}" y="${7*cs+16}" text-anchor="middle">${h}h</text>`;
  sv+='</svg>';
  el.innerHTML=`<div class="fx-calor-sc" tabindex="0" aria-label="Mapa de calor — role para o lado para ver todas as horas">${sv}</div><div class="fx-dica" id="fx-calor-dica" hidden>↔ role para o lado para ver todas as horas</div><div class="fx-escala"><span>menos</span><i></i><span>mais${mx?` (até ${esc(fxF(mx))} por hora)`:''}</span></div>`;
  {const sc=el.querySelector('.fx-calor-sc');$('fx-calor-dica').hidden=!(sc.scrollWidth>sc.clientWidth+2)}
  $('fx-calor-sub').textContent=pk?`pico: ${FX_DIAS_L[pk[0]]}, das ${pk[1]}h às ${pk[1]+1}h (${fxF(mx)}) · hora em que a refeição foi registrada`:'hora em que a refeição foi registrada';
  el.querySelectorAll('.fx-cel').forEach(c=>{const w=+c.dataset.w,h=+c.dataset.h;const tw=M[w].reduce((s,x)=>s+x,0);fxDica(c,`${FX_DIAS_L[w][0].toUpperCase()+FX_DIAS_L[w].slice(1)}, ${h}h às ${h+1}h`,[`${anaNum(M[w][h])} refeição(ões) registrada(s)`,`${money(Mv[w][h])}`,`${fxP(M[w][h],tw)} do dia da semana`],null)});
  const linhas=[];for(let w=0;w<7;w++)for(let h=hmin;h<=hmax;h++)if(M[w][h])linhas.push([FX_DIAS_L[w],`${h}h às ${h+1}h`,anaNum(M[w][h]),money(Mv[w][h])]);
  $('fx-calor-tab').innerHTML=anaTabela(['Dia da semana','Hora','Refeições','Valor'],linhas);
}
function fxRanking(el,grupos,tot,{max:lim=8,rotulo='Outras',det=false}={}){
  if(!grupos.length){el.innerHTML='<div class="fx-ps" style="padding:8px 0">Sem dados no período.</div>';return []}
  let lista=grupos;if(grupos.length>lim+1){const resto=grupos.slice(lim);lista=grupos.slice(0,lim).concat([{nome:`${rotulo} (${resto.length})`,q:resto.reduce((s,g)=>s+g.q,0),v:resto.reduce((s,g)=>s+g.v,0),outros:true}])}
  const val=g=>FX.m==='v'?g.v:g.q,mx=Math.max(...lista.map(val))||1;
  el.innerHTML=`<div class="fx-rk">${lista.map((g,i)=>`<div class="fx-rk-row" tabindex="0" data-i="${i}"><span class="fx-rk-n">${g.outros?'··':String(i+1).padStart(2,'0')}</span>${det?`<span class="fx-cl-nm"><b title="${esc(g.nome)}">${esc(g.nome)}</b><span>${FX.m==='v'?anaNum(g.q)+' refeições':esc(money(g.v))} · médio ${esc(money(g.q?g.v/g.q:0))}</span></span>`:`<span class="fx-rk-lab" title="${esc(g.nome)}">${esc(g.nome)}</span>`}<span class="fx-rk-tr"><i style="width:${(val(g)/mx*100).toFixed(2)}%;--d:${i*70}ms"></i></span><span class="fx-rk-v">${esc(fxF(val(g)))}</span><span class="fx-rk-p">${fxP(val(g),tot)}</span></div>`).join('')}</div>`;
  el.querySelectorAll('.fx-rk-row').forEach(r=>{const g=lista[+r.dataset.i];fxDica(r,g.nome,[`${anaNum(g.q)} refeições`,`${money(g.v)}`,`preço médio ${money(g.q?g.v/g.q:0)}`,`${fxP(val(g),tot)} do total ${FX.m==='v'?'em R$':'de refeições'}`],null)});
  return lista;
}
function fxObras(it){const tot=it.reduce((s,x)=>s+fxVal(x),0);const g=fxGrupos(it,x=>x.obraId||x.obraNome,x=>(obra(x.obraId)||{}).nome||x.obraNome);
  fxRanking($('fx-obras'),g,tot,{max:10,rotulo:'Outras obras',det:true});$('fx-obras-sub').textContent=`${g.length} obra(s) · do maior para o menor ${FX.m==='v'?'valor':'número de refeições'}`;
  $('fx-obras-tab').innerHTML=anaTabela(['Obra','Refeições','% qtd','Valor','% valor'],g.map(x=>[x.nome,anaNum(x.q),fxP(x.q,it.length),money(x.v),fxP(x.v,it.reduce((s,y)=>s+(y.valor||0),0))]))}
function fxRest(it){const tot=it.reduce((s,x)=>s+fxVal(x),0),vt=it.reduce((s,y)=>s+(y.valor||0),0);
  const gr=fxGrupos(it,x=>ctOf(x),x=>{const c=(S.contratadas||[]).find(k=>k.id===ctOf(x));return c?c.nome:(x.contratadaNome||'—')}),ge=fxGrupos(it,x=>x.empresaId,x=>(emp(x.empresaId)||{}).nome||x.empresaNome);
  const el=$('fx-rest');el.innerHTML='<div class="fx-sub2">Restaurantes</div><div id="fx-rest-r"></div><div class="fx-sub2">Empresas</div><div id="fx-rest-e"></div>';
  fxRanking($('fx-rest-r'),gr,tot,{max:5,rotulo:'Outros'});fxRanking($('fx-rest-e'),ge,tot,{max:5,rotulo:'Outras'});
  $('fx-rest-sub').textContent=`${gr.length} restaurante(s) · ${ge.length} empresa(s)`;
  $('fx-rest-tab').innerHTML=anaTabela(['Restaurante / empresa','Refeições','% qtd','Valor','% valor'],gr.map(x=>['Restaurante: '+x.nome,anaNum(x.q),fxP(x.q,it.length),money(x.v),fxP(x.v,vt)]).concat(ge.map(x=>['Empresa: '+x.nome,anaNum(x.q),fxP(x.q,it.length),money(x.v),fxP(x.v,vt)])))}
function pct(a,b){return b?(a/b*100).toFixed(1).replace('.',',')+'%':'—'}
function anaTabela(cab,linhas){return `<div class="tablewrap"><table><thead><tr>${cab.map((c,i)=>`<th${i?' class="r"':''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${linhas.map(l=>`<tr>${l.map((c,i)=>`<td${i?' class="r num"':''}>${esc(c)}</td>`).join('')}</tr>`).join('')||`<tr><td colspan="${esc(cab.length)}" class="empty">Sem dados no período.</td></tr>`}</tbody></table></div>`}
function vizTip(ev,titulo,linhas,cor,alvo){
  const t=$('viz-tip');t.textContent='';const b=document.createElement('b');b.textContent=titulo;t.appendChild(b);
  (linhas||[]).forEach((l,i)=>{const d=document.createElement('div');if(i===0&&cor){const k=document.createElement('i');k.className='lk';k.style.background=cor;d.appendChild(k)}d.appendChild(document.createTextNode(l));if(i>0||!cor)d.className='m';t.appendChild(d)});
  t.hidden=false;t.__alvo=ev&&ev.type==='focus'?alvo:null;let x,y;
  if(ev&&ev.clientX!==undefined&&ev.type!=='focus'){x=ev.clientX;y=ev.clientY}else{const r=alvo.getBoundingClientRect();x=r.left+r.width/2;y=r.top}
  const w=t.offsetWidth,h=t.offsetHeight;let left=x+14,top=y-h-12;if(left+w>innerWidth-8)left=x-w-14;if(left<8)left=8;if(top<8)top=y+16;t.style.left=left+'px';t.style.top=top+'px';
}
function vizTipHide(){$('viz-tip').hidden=true}
document.querySelectorAll('#an-presets [data-p]').forEach(b=>b.onclick=()=>{ANA.preset=b.dataset.p;const r=anaDatas(ANA.preset);$('an-de').value=r[0];$('an-ate').value=r[1];FX.colabN=10;renderAna()});
['an-de','an-ate'].forEach(id=>$(id).onchange=()=>{ANA.preset='';renderAna()});
$('an-ct').onchange=renderAna;
$('an-limpar').onclick=()=>{ANA.emps.clear();ANA.obras.clear();ANA.tipos.clear();$('an-ct').value='';ANA.preset='mes';FX.colabN=10;const r=anaDatas('mes');$('an-de').value=r[0];$('an-ate').value=r[1];renderAna()};
document.querySelectorAll('#page-ana [data-fx-tab]').forEach(b=>b.onclick=()=>{const c=b.closest('.fx-card');const tab=c.classList.toggle('tabela');b.textContent=tab?'Gráfico':'Tabela';b.setAttribute('aria-pressed',String(tab));vizTipHide();if(!tab)renderAna()});
document.querySelectorAll('#ana-medida [data-m]').forEach(b=>b.onclick=()=>{FX.m=b.dataset.m;FX.colabN=10;renderAna()});
addEventListener('resize',()=>{clearTimeout(ANA.rz);ANA.rz=setTimeout(()=>{if(anaVisivel())renderAna()},200)});
addEventListener('scroll',()=>{const t=$('viz-tip'),a=document.activeElement;if(!t.hidden&&a&&a===t.__alvo)a.dispatchEvent(new FocusEvent('focus'));else vizTipHide()},true);

/* =================== RELATÓRIOS (v2.7.0) ===================
   Menu "Relatórios" com os tipos por baixo (abre/fecha). Cada tipo tem a sua página dentro de #page-rel.
   Usa só o que o usuário já pode ver (regOk / sobraOk). Exporta em PDF (visualizar em outra guia ou baixar) e em CSV. */
// v2.8.7: o Analítico virou o primeiro item de Relatórios (acesso próprio: ana.ver)
const REL_TIPOS=[{id:'analitico',n:'Analítico',perm:'ana.ver'},{id:'registros',n:'Registros'},{id:'financeiro',n:'Financeiro'},{id:'colaboradores',n:'Colaboradores'},{id:'boletins',n:'Boletins de Medição'},{id:'medicoes',n:'Medições em aberto'},{id:'ocorrencias',n:'Ocorrências'},{id:'terceirizados',n:'Terceirizados'}];   // v2.9.3: novos (v2.9.4: Realocações voltou para Configurações › Colaboradores)
REL_TIPOS.forEach(t=>{if(t.perm)return;const id='rel.'+t.id;if(PERMS.some(q=>q.id===id))return;const i=PERMS.reduce((k,q,j)=>q.id&&q.id.startsWith('rel.')?j:k,-1);PERMS.splice(i+1,0,{id,nome:'Relatório '+t.n});PERFIS.Administrador.push(id)});
function relTiposPode(){return REL_TIPOS.filter(t=>can(t.perm||'rel.'+t.id))}
const NAV_GRUPO={};
const REL={emps:new Set(),aba:'registros',preset:'mes',datas:false,cts:new Set(),tipos:new Set(),obras:new Set(),lim:300,aberto:null,ult:null};
const FIN={emps:new Set(),preset:'mes',datas:false,cts:new Set(),tipos:new Set(),obras:new Set(),limColab:30,ult:null,pg:{},sig:''};
/* paginação dos relatórios (v2.8.1): 50, 80, 120, 150 ou todos por página — a escolha fica guardada no aparelho;
   vale só para a tela: o PDF e a planilha trazem sempre tudo */
const REL_TAMS=[50,80,120,150,0];
let REL_TAM=(()=>{try{const v=+localStorage.getItem('sismed_rel_tam');if(REL_TAMS.includes(v)&&localStorage.getItem('sismed_rel_tam')!==null)return v}catch(e){}return 50})();
function relSig(F){return JSON.stringify(F,(k,v)=>v instanceof Set?[...v].sort():v)}
function relPagina(total,pg){const tam=REL_TAM||Math.max(1,total);const pages=Math.max(1,Math.ceil(total/tam));pg=Math.min(Math.max(1,pg||1),pages);const i0=(pg-1)*tam;return {pg,pages,i0,i1:Math.min(total,i0+tam)}}
function relTamHtml(){return `<label class="rel-pag-tam">Linhas por página <select data-tam aria-label="Linhas por página">${REL_TAMS.map(n=>`<option value="${n}"${n===REL_TAM?' selected':''}>${n||'Todas'}</option>`).join('')}</select></label>`}
function relPagHtml(P,total,un,comTam){
  const faixa=total?`${anaNum(P.i0+1)}–${anaNum(P.i1)} de ${anaNum(total)} ${total===1?un[0]:un[1]}`:'';
  const nav=P.pages>1?`<div class="rel-pag-nav"><button class="btn sec sm" type="button" data-pg="1" ${P.pg===1?'disabled':''} aria-label="Primeira página">«</button><button class="btn sec sm" type="button" data-pg="${P.pg-1}" ${P.pg===1?'disabled':''}>‹ Anterior</button><span class="small num rel-pag-n">Página <b>${anaNum(P.pg)}</b> de ${anaNum(P.pages)}</span><button class="btn sec sm" type="button" data-pg="${P.pg+1}" ${P.pg===P.pages?'disabled':''}>Próxima ›</button><button class="btn sec sm" type="button" data-pg="${P.pages}" ${P.pg===P.pages?'disabled':''} aria-label="Última página">»</button></div>`:'';
  return `${comTam?relTamHtml():''}<span class="small muted rel-pag-faixa">${faixa}</span>${nav}`}
function relPagLigar(el,irPara){el.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>irPara(+b.dataset.pg));
  el.querySelectorAll('[data-tam]').forEach(x=>x.onchange=()=>{REL_TAM=+x.value;try{localStorage.setItem('sismed_rel_tam',String(REL_TAM))}catch(e){}irPara(1,true)})}
function relPode(){return relTiposPode().length>0}
function relRotulo(){const t=REL_TIPOS.find(x=>x.id===REL.aba);return 'Relatórios › '+(t?t.n:REL.aba)}
function relAbrir(rt){{const ok=relTiposPode();if(!ok.some(t=>t.id===rt))rt=(ok[0]||REL_TIPOS[0]).id}const mudou=REL.aba!==rt;REL.aba=rt;NAV_GRUPO.rel=true;
  if(PAGE==='rel'&&mudou&&USER){audit('nav',relRotulo());save()}
  msFechar();go('rel');const mn=document.querySelector('main');if(mn&&mudou)mn.scrollTop=0}
// ---- menu: grupo aberto/fechado (computador) e listinha por cima da barra (celular) ----
function navMarcar(p){
  document.querySelectorAll('#tabbar button[data-p],#sidenav button[data-p],#tab-pop button[data-p]').forEach(b=>{const on=b.dataset.rt?(p===b.dataset.p&&subAtual(b.dataset.p)===b.dataset.rt):b.dataset.p===p;b.classList.toggle('on',on);if(b.dataset.rt)b.setAttribute('aria-current',on?'page':'false')});
  document.querySelectorAll('[data-grupo]').forEach(b=>{const g=b.dataset.grupo;
    if(b.closest('#sidenav')){const ab=!!NAV_GRUPO[g];b.setAttribute('aria-expanded',String(ab));const sub=$('side-sub-'+g);if(sub)sub.hidden=!ab;b.classList.toggle('on',p===g&&!ab)}
    else b.classList.toggle('on',p===g)});
  migalhaAtualizar();   // v3.0.0: trilha "Administrativo › Registros" no topo (computador)
}
function navSubFechar(){document.querySelectorAll('#tab-pop .tab-sub').forEach(x=>{x.hidden=true});document.querySelectorAll('#tabbar [data-grupo]').forEach(b=>b.setAttribute('aria-expanded','false'))}
function navSubAlternar(b){const pop=$('tab-sub-'+b.dataset.grupo);if(!pop)return;const abrir=pop.hidden;navSubFechar();if(!abrir)return;
  pop.hidden=false;b.setAttribute('aria-expanded','true');
  const r=b.getBoundingClientRect(),tb=$('tabbar').getBoundingClientRect();pop.style.bottom=Math.round(innerHeight-tb.top+6)+'px';
  const w=pop.offsetWidth;pop.style.left=Math.round(Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2)))+'px';
  const f=pop.querySelector('button.on')||pop.querySelector('button');if(f)f.focus({preventScroll:true})}
document.addEventListener('click',e=>{if(!e.target.closest('#tab-pop')&&!e.target.closest('#tabbar [data-grupo]'))navSubFechar()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const ab=document.querySelector('#tab-pop .tab-sub:not([hidden])');if(ab){navSubFechar();const b=document.querySelector('#tabbar [data-grupo]');if(b)b.focus()}}});

// ---- lista com várias escolhas ----
// opt = 'Todos os …': sem marcar nada, entram todos
const MS_SETA='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
function msResumo(itens,sel,opt,m){
  if(m&&m.ex){if(!sel.size)return m.vazio;if(sel.size===1){const i=itens.find(x=>sel.has(x.id));return i?i.nome:m.vazio}return sel.size===itens.length?`${m.todos} (${sel.size})`:`${sel.size} ${m.plural||'selecionados'}`}
  if(!sel.size)return opt;if(sel.size===1){const i=itens.find(x=>sel.has(x.id));return i?i.nome:opt}return `${sel.size} ${m&&m.plural||'selecionados'}`}
function msFechar(){document.querySelectorAll('.ms').forEach(m=>{const p=m.querySelector('.ms-pop'),b=m.querySelector('.ms-btn');if(p&&!p.hidden){p.hidden=true;if(b)b.setAttribute('aria-expanded','false')}});REL.aberto=null}
function msMontar(id,itens,sel,opt,onMuda,o){
  const box=$(id);const ids=new Set(itens.map(i=>i.id));[...sel].forEach(v=>{if(!ids.has(v))sel.delete(v)});
  o=o||{};const ex=!!o.explicito;   // v2.8.8: explícito = nada marcado é "nenhuma"; o primeiro item marca / desmarca todas
  const topo=ex?(o.todos||opt):opt;
  const sig=JSON.stringify([topo,ex,itens.map(i=>[i.id,i.nome])]);box._ms={itens,sel,opt,ex,vazio:o.vazio||opt,todos:o.todos||opt,plural:o.plural};
  if(box.dataset.sig!==sig){
    box.dataset.sig=sig;const rot=box.dataset.rotulo;
    box.innerHTML=`<button type="button" class="ms-btn" aria-haspopup="true" aria-expanded="false"${rot?` aria-labelledby="${rot} ${id}-res"`:''}><span id="${id}-res"></span>${MS_SETA}</button>`+
      `<div class="ms-pop" role="group"${rot?` aria-labelledby="${rot}"`:''} hidden>`+(itens.length?`<label class="ms-todos"><input type="checkbox" data-todos> ${esc(topo)}</label>`+itens.map(i=>`<label><input type="checkbox" value="${esc(i.id)}"> ${esc(i.nome)}</label>`).join(''):'<div class="small muted" style="padding:8px">Nenhuma opção</div>')+'</div>';
    const btn=box.querySelector('.ms-btn'),pop=box.querySelector('.ms-pop');
    btn.onclick=e=>{e.stopPropagation();const abrir=pop.hidden;msFechar();if(!abrir)return;pop.hidden=false;btn.setAttribute('aria-expanded','true');REL.aberto=id;
      pop.classList.remove('dir');pop.style.left='';const r=pop.getBoundingClientRect(),sai=r.right-(innerWidth-8);if(sai>0)pop.style.left=(-Math.min(sai,Math.max(0,r.left-8)))+'px'};
    const td=pop.querySelector('[data-todos]');
    if(td)td.onchange=()=>{const m=box._ms;m.sel.clear();if(m.ex&&td.checked)m.itens.forEach(i=>m.sel.add(i.id));msMarcar(box);onMuda()};
    pop.querySelectorAll('input[value]').forEach(c=>c.onchange=()=>{const m=box._ms;if(c.checked)m.sel.add(c.value);else m.sel.delete(c.value);if(!m.ex&&m.sel.size===m.itens.length)m.sel.clear();msMarcar(box);onMuda()});
  }
  msMarcar(box);
}
function msMarcar(box){
  const {itens,sel,opt}=box._ms;
  const t=box.querySelector('[data-todos]');if(t)t.checked=box._ms.ex?(itens.length>0&&sel.size===itens.length):!sel.size;
  box.querySelectorAll('input[value]').forEach(c=>{c.checked=sel.has(c.value)});
  const r=box.querySelector('.ms-btn span');if(r)r.textContent=msResumo(itens,sel,opt,box._ms);
  const b=box.querySelector('.ms-btn');if(b)b.classList.toggle('tem',sel.size>0);
}
document.addEventListener('click',e=>{if(REL.aberto&&!e.target.closest('.ms'))msFechar()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&REL.aberto){const id=REL.aberto;msFechar();const b=$(id)&&$(id).querySelector('.ms-btn');if(b)b.focus()}});

// ---- comuns ----
// ---- empresas escolhidas (v2.8.8): várias; logotipo só quando é uma só ----
const MS_EMP={explicito:true,todos:'Todas as empresas',vazio:'Selecione a empresa…',plural:'empresas'};
function relEmpsLista(set){return [...set].map(emp).filter(Boolean).sort((a,b)=>a.nome.localeCompare(b.nome))}
function relEmpsTxt(Es){return Es.length===1?Es[0].nome:Es.map(e=>e.nome).join(', ')}
function relObrasRot(set){const l=relObras(set);return set.size>1?l.map(o=>{const ob=obra(o.id),e=ob&&emp(ob.empresaId);return {...o,nome:o.nome+(e?' — '+e.nome:'')}}):l}
function relCabEmp(Es){return Es.length===1?`<div>Empresa: <b>${esc(Es[0].nome)}</b>${Es[0].cnpj?' · CNPJ '+esc(Es[0].cnpj):''}</div>`:`<div>Empresas (${Es.length}): <b>${esc(relEmpsTxt(Es))}</b></div>`}
function relLogoTela(id,Es){const box=$(id),um=Es.length===1?Es[0]:null;box.parentElement.hidden=!um;   // com mais de uma empresa, sem logotipo
  box.innerHTML=um?(logoOk(um.logo)?`<img src="${esc(logoOk(um.logo))}" alt="Logotipo ${esc(um.nome)}">`:'<div class="rel-semlogo">empresa sem logotipo<br>(Configurações › Empresas)</div>'):''}
function relEmpPdf(doc,Es,x,y,maxW){const t=Es.length===1?`Empresa: ${Es[0].nome}${Es[0].cnpj?'   CNPJ: '+Es[0].cnpj:''}`:`Empresas (${Es.length}): ${relEmpsTxt(Es)}`;const l=doc.splitTextToSize(t,maxW);doc.text(l,x,y);return l.length}
function relEmpSlug(Es){return relSlug(Es.length===1?Es[0].nome:Es.length+' empresas')}
function relEmpresas(){return S.empresas.slice().sort((a,b)=>a.nome.localeCompare(b.nome)).map(e=>({id:e.id,nome:e.nome+(e.ativo===false?' (inativa)':'')}))}
function relObras(empIds){const set=empIds instanceof Set?empIds:new Set(empIds?[empIds]:[]);return set.size?S.obras.filter(o=>set.has(o.empresaId)&&obraOk(o.id)).sort((a,b)=>a.nome.localeCompare(b.nome)).map(o=>({id:o.id,nome:o.nome+(o.ativo===false?' (inativa)':'')})):[]}
function relRestaurantes(){return (S.contratadas||[]).filter(c=>ctOk(c.id)).slice().sort((a,b)=>a.nome.localeCompare(b.nome)).map(c=>({id:c.id,nome:c.nome}))}
function relTiposItens(){return TIPOS.map(t=>({id:t.id,nome:t.curto}))}
function relNomes(itens,sel,todos){return !sel.size?todos:itens.filter(i=>sel.has(i.id)).map(i=>i.nome).join(', ')}
function relPct(v,t){return t?(v/t*100).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%':'—'}
function relSlug(t){return String(t||'').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w]+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'empresa'}
function relCsvCel(v){let t=String(v??'');if(/^[=+\-@\t\r]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"'}
function relNumCsv(v){return (Math.round((v||0)*100)/100).toFixed(2).replace('.',',')}
async function relSalvar(blob,name,okMsg){
  const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
  if(dl){try{await dl.save({filename:name,data:blob});sucesso(okMsg)}catch(e){if(e&&e.code==='declined')toast('Download cancelado');else salvarArquivo(blob,name)}}
  else{salvarArquivo(blob,name);sucesso(okMsg)}
}
// abre o PDF numa guia nova do navegador; se o navegador bloquear, baixa o arquivo
function relVerPdf(doc,titulo,nome){
  doc.setProperties({title:titulo,subject:titulo,creator:'CAP-Refeições'});
  const url=URL.createObjectURL(doc.output('blob'));const w=window.open(url,'_blank');
  if(w){setTimeout(()=>URL.revokeObjectURL(url),300000);sucesso('PDF aberto em outra guia');return}
  URL.revokeObjectURL(url);toast('O navegador bloqueou a nova guia — o PDF foi baixado','warn');salvarArquivo(doc.output('blob'),nome)}
function relPdfLogos(doc,Es,M,y){   // logotipo(s) no alto à esquerda; devolve onde o texto começa
  const com=Es.filter(e=>logoOk(e.logo));let x=M;
  const um=Es.length===1,maxW=um?44:28,maxH=um?19:13;
  com.slice(0,um?1:4).forEach(E=>{try{const ratio=(E.logoW||4)/(E.logoH||1);let w=maxW,h=w/ratio;if(h>maxH){h=maxH;w=h*ratio}
    doc.addImage(E.logo,E.logo.startsWith('data:image/jpeg')?'JPEG':'PNG',x,y+(maxH-h)/2,w,h);x+=w+4}catch(e){}});
  return com.length?x+2:M}
function relPdfRodape(doc,txt,W,H,M){const n=doc.getNumberOfPages();for(let i=1;i<=n;i++){doc.setPage(i);doc.setFontSize(7.5);doc.setTextColor(120);doc.text(txt,M,H-7);doc.text(`Página ${i} de ${n}`,W-M,H-7,{align:'right'})}}
function relDatas(o,px){if(!o.datas){const r=anaDatas(o.preset)||anaDatas('mes');$(px+'-de').value=r[0];$(px+'-ate').value=r[1];o.datas=true}
  if($(px+'-de').value&&$(px+'-ate').value&&$(px+'-de').value>$(px+'-ate').value){const x=$(px+'-de').value;$(px+'-de').value=$(px+'-ate').value;$(px+'-ate').value=x}
  document.querySelectorAll('#'+px+'-presets [data-p]').forEach(b=>b.classList.toggle('on',b.dataset.p===o.preset))}

function renderRel(){
  {const ok=relTiposPode();if(!ok.some(t=>t.id===REL.aba))REL.aba=(ok[0]||REL_TIPOS[0]).id}
  document.querySelectorAll('#page-rel [data-rel]').forEach(x=>{x.hidden=x.dataset.rel!==REL.aba});
  phRot('rel-titulo',relRotulo());$('rel-head').hidden=REL.aba==='analitico';navMarcar(PAGE);
  if(REL.aba==='analitico')renderAna();else if(REL.aba==='financeiro')renderFin();else if(REL.aba==='colaboradores')renderRelCo();else if(RG_DEF[REL.aba])rgRender(REL.aba);else renderRelReg();
}

// =========================== REGISTROS ===========================
function relFiltros(){const es=new Set(REL.emps);return {de:$('rl-de').value,ate:$('rl-ate').value,emps:es,emp:es.size===1?[...es][0]:'',cts:new Set(REL.cts),tipos:new Set(REL.tipos),obras:new Set(REL.obras)}}
function relSitBM(r){const b=r.bmId?S.bms.find(x=>x.id===r.bmId):null;
  if(b)return {num:String(b.numero),sit:b.status==='rascunho'?'Aberto':'Fechado'};
  if(r.bmId)return {num:'-',sit:'Fechado'};
  return {num:'-',sit:r.fechado?'Fechado (sem BM)':'Aberto'}}
function relLinha(r){
  const m=modOf(r),bm=relSitBM(r),ct=(S.contratadas||[]).find(c=>c.id===ctOf(r));
  const det=m==='terceirizado'?(r.terceirizada?r.terceirizada:''):m==='retirada'?(r.retiradoPor&&r.retiradoPor.nome?'retirada por '+r.retiradoPor.nome:''):'';
  return {data:r.data,nome:r.nome||'—',emp:r.empresaNome||(emp(r.empresaId)||{}).nome||'—',obra:r.obraNome||(obra(r.obraId)||{}).nome||'—',rest:r.contratadaNome||(ct&&ct.nome)||'—',tipo:r.tipo,tipoNome:tipo(r.tipo).curto,
    bm:bm.num,sit:bm.sit,usuario:r.usuario||'—',cad:r.registradoEm,forma:r.retro?'Retroativo':r.manual?'Manual':r.semQr?'Sem QR Code (pelo nome)':'QR Code',mod:m,modNome:MODS[m],det};
}
/* v2.9.5: sobra = refeição preparada e não consumida, informada pelo restaurante e cobrada no BM — entra 1 linha por refeição */
function relSobraLinhas(s){const n=Math.max(0,Math.round(+s.qtd||0)),b=s.bmId?S.bms.find(x=>x.id===s.bmId):null,ct=(S.contratadas||[]).find(c=>c.id===ctOf(s));
  const base={data:s.data,nome:'SOBRA'+(s.colabNome?' — '+s.colabNome:''),emp:s.empresaNome||(emp(s.empresaId)||{}).nome||'—',obra:s.obraNome||(obra(s.obraId)||{}).nome||'—',rest:s.contratadaNome||(ct&&ct.nome)||'—',
    tipo:s.tipo,tipoNome:tipo(s.tipo).curto,bm:b?String(b.numero):'-',sit:b?(b.status==='rascunho'?'Aberto':'Fechado'):s.bmId?'Fechado':'Aberto',usuario:s.usuario||'—',cad:s.registradoEm||'',forma:'Sobra',mod:'sobra',modNome:'Sobra',sobra:true};
  return Array.from({length:n},(_,i)=>({...base,det:n>1?`${i+1} de ${n}`:''}))}
function relLinhas(F){
  const ok=x=>x.data>=F.de&&x.data<=F.ate&&F.emps.has(x.empresaId)&&(!F.cts.size||F.cts.has(ctOf(x)))&&(!F.tipos.size||F.tipos.has(x.tipo))&&(!F.obras.size||F.obras.has(x.obraId));
  const regs=S.registros.filter(r=>regOk(r)&&ok(r)).map(relLinha);
  const sob=(S.sobras||[]).filter(x=>x.empresaId&&sobraOk(x)&&ok(x)).flatMap(relSobraLinhas);
  return regs.concat(sob).sort((a,b)=>a.data!==b.data?(a.data<b.data?-1:1):(a.cad<b.cad?-1:a.cad>b.cad?1:0));
}
const REL_FORMAS=[['QR Code','por QR Code'],['Sem QR Code (pelo nome)','sem QR Code'],['Manual','manuais'],['Retroativo','retroativos'],['Sobra','sobras']];
function relFormasConta(L){return REL_FORMAS.map(([f,rot])=>[rot,L.filter(l=>l.forma===f).length]).filter(x=>x[1])}
function relFiltrosTxt(F){return [`Restaurante: ${relNomes(relRestaurantes(),F.cts,'todos')}`,`Tipo de refeição: ${relNomes(relTiposItens(),F.tipos,'todos')}`,`Obra: ${relNomes(relObras(F.emps),F.obras,'todas')}`]}
function renderRelReg(){
  relDatas(REL,'rl');
  const emps=relEmpresas();if(!REL.emps.size&&emps.length===1)REL.emps.add(emps[0].id);
  msMontar('rl-emp',emps,REL.emps,'Selecione a empresa…',()=>{REL.lim=300;renderRelReg()},MS_EMP);
  msMontar('rl-ct',relRestaurantes(),REL.cts,'Todos os restaurantes',relAtualiza);
  msMontar('rl-tipo',relTiposItens(),REL.tipos,'Todos os tipos',relAtualiza);
  msMontar('rl-obra',relObrasRot(REL.emps),REL.obras,REL.emps.size?'Todas as obras':'Escolha a empresa primeiro',relAtualiza);
  relAtualiza();
}
function relAtualiza(){
  const F=relFiltros(),av=$('rl-aviso'),doc=$('rl-doc');
  const falta=[!F.de||!F.ate?'o período':'',!F.emps.size?'a empresa':''].filter(Boolean);
  if(falta.length){av.hidden=false;av.textContent=`Para gerar o relatório, informe ${falta.join(' e ')} (obrigatório).`;doc.hidden=true;REL.ult=null;return}
  av.hidden=true;doc.hidden=false;
  const Es=relEmpsLista(F.emps),L=relLinhas(F);REL.ult={F,L};
  relLogoTela('rl-logo',Es);document.querySelector('#rl-tabwrap table').classList.toggle('so1',Es.length===1);   // coluna Empresa só com mais de uma
  $('rl-cab').innerHTML=`${relCabEmp(Es)}<div>Período: <b>${br(F.de)}</b> a <b>${br(F.ate)}</b></div><div class="small muted">${relFiltrosTxt(F).map(esc).join(' · ')}</div><div class="small muted">Todas as refeições registradas: por QR Code, sem QR Code, manuais (terceirizados e retiradas), retroativas, fechadas sem BM e as sobras cobradas (1 linha por refeição).</div>`;
  const porTipo=TIPOS.map(t=>[t.curto,L.filter(l=>l.tipo===t.id).length]).filter(x=>x[1]);
  const nAb=L.filter(l=>l.sit==='Aberto').length,FO=relFormasConta(L);
  $('rl-resumo').innerHTML=`<div class="rr"><b class="num">${anaNum(L.length)}</b>refeiç${L.length===1?'ão':'ões'}</div>`+porTipo.map(([n,q])=>`<div class="rr"><b class="num">${anaNum(q)}</b>${esc(n)}</div>`).join('')+
    (L.length?`<div class="rr rr-formas">${FO.map(([rot,q])=>`<span><b class="num">${anaNum(q)}</b>${esc(rot)}</span>`).join('')}</div><div class="rr"><b class="num">${anaNum(nAb)}</b>em aberto · <b class="num" style="margin-left:6px">${anaNum(L.length-nAb)}</b>fechados</div>`:'');
  $('rl-vazio').hidden=!!L.length;$('rl-tabwrap').hidden=!L.length;['rl-ver','rl-pdf','rl-csv'].forEach(id=>{$(id).disabled=!L.length});
  const sig=relSig(F);if(sig!==REL.sig){REL.sig=sig;REL.pg=1}
  const Lo=ordLista('rl',L);REL.ult.L=Lo;
  const P=relPagina(L.length,REL.pg);REL.pg=P.pg;const vis=Lo.slice(P.i0,P.i1);
  $('rl-tbody').innerHTML=vis.map(l=>`<tr><td class="num">${br(l.data)}</td><td class="quebra"><b>${esc(l.nome)}</b></td><td class="quebra">${esc(l.emp)}</td><td class="quebra">${esc(l.obra)}</td><td class="quebra">${esc(l.rest)}</td><td><span class="pill ${esc(l.tipo)}">${esc(l.tipoNome)}</span></td><td class="c num">${esc(l.bm)}</td><td><span class="pill ${l.sit==='Aberto'?'warn':'ok'}">${esc(l.sit)}</span></td><td>${esc(l.usuario)}</td><td class="num">${brdt(l.cad)}</td><td>${esc(l.forma)}</td><td class="quebra"><span class="pill mod-${esc(l.mod)}">${esc(l.modNome)}</span>${l.det?` <span class="small muted">${esc(l.det)}</span>`:''}</td></tr>`).join('');
  [['rl-pag-topo',true],['rl-pag',false]].forEach(([id,comTam])=>{const el=$(id);el.hidden=!L.length;el.innerHTML=L.length?relPagHtml(P,L.length,['refeição','refeições'],comTam):'';
    relPagLigar(el,pg=>{REL.pg=pg;relAtualiza();if(!comTam)$('rl-pag-topo').scrollIntoView({block:'nearest'})})});
  $('rl-mostrando').textContent=L.length>vis.length?'O PDF e a planilha trazem todas as refeições.':'';
  $('rl-mais').hidden=true;
}
const REL_COLS=['Data da refeição','Funcionário','Empresa','Obra','Restaurante','Tipo de refeição','Nº BM','Situação BM','Cadastrado por','Data de cadastro','Forma','Tipo de cadastro'];
function relValores(l){return [br(l.data),l.nome,l.emp,l.obra,l.rest,l.tipoNome,l.bm,l.sit,l.usuario,brdt(l.cad),l.forma,l.modNome+(l.det?' — '+l.det:'')]}
function relPdf(F,L){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4',compress:true});const W=297,H=210,M=10;let y=M;
  const Es=relEmpsLista(F.emps),um=Es.length===1;const x=relPdfLogos(doc,um?Es:[],M,y);   // logotipo só com uma empresa
  doc.setTextColor(23,33,43);doc.setFont('helvetica','bold');doc.setFontSize(13);doc.text('RELATÓRIO DE REGISTROS DE REFEIÇÕES',x,y+5);
  doc.setFont('helvetica','normal');doc.setFontSize(9);
  const ne=relEmpPdf(doc,Es,x,y+11,W-M-x-62),ye=(ne-1)*3.9;
  doc.text(`Período: ${br(F.de)} a ${br(F.ate)}`,x,y+16+ye);
  const fl=doc.splitTextToSize(relFiltrosTxt(F).join('   ·   '),W-M-x-62);doc.setFontSize(8);doc.setTextColor(90);doc.text(fl,x,y+21+ye);
  doc.setTextColor(23,33,43);doc.setFontSize(9);
  doc.text(`Emitido em ${brdt(new Date().toISOString())}`,W-M,y+5,{align:'right'});doc.text(`por ${USER?USER.nome:'—'}`,W-M,y+11,{align:'right'});
  doc.setFont('helvetica','bold');doc.text(`${anaNum(L.length)} refeiç${L.length===1?'ão':'ões'}`,W-M,y+16,{align:'right'});doc.setFont('helvetica','normal');
  y+=Math.max(24,21+ye+fl.length*3.6);doc.setDrawColor(23,33,43);doc.setLineWidth(.5);doc.line(M,y,W-M,y);y+=3;
  const tira=a=>um?a.filter((_,i)=>i!==2):a;   // com uma empresa só, sem a coluna Empresa
  doc.autoTable({startY:y,head:[tira(REL_COLS)],body:L.map(l=>tira(relValores(l))),margin:{left:M,right:M,bottom:14},theme:'grid',
    styles:{font:'helvetica',fontSize:7.2,cellPadding:1.3,lineColor:[210,216,222],lineWidth:.1,textColor:[23,33,43],overflow:'linebreak',valign:'middle'},
    headStyles:{fillColor:[23,33,43],textColor:255,fontStyle:'bold',fontSize:7.2},alternateRowStyles:{fillColor:[244,246,248]},
    columnStyles:um?{0:{cellWidth:17},1:{cellWidth:42},2:{cellWidth:43},3:{cellWidth:37},4:{cellWidth:16},5:{cellWidth:11,halign:'center'},6:{cellWidth:17},7:{cellWidth:25},8:{cellWidth:24},9:{cellWidth:15}}
      :{0:{cellWidth:17},1:{cellWidth:36},2:{cellWidth:30},3:{cellWidth:34},4:{cellWidth:30},5:{cellWidth:15},6:{cellWidth:10,halign:'center'},7:{cellWidth:16},8:{cellWidth:22},9:{cellWidth:22},10:{cellWidth:15}}});
  let yy=doc.lastAutoTable.finalY+6;if(yy>186){doc.addPage();yy=16}
  const porTipo=TIPOS.map(t=>[t.curto,L.filter(l=>l.tipo===t.id).length]).filter(x=>x[1]);
  doc.setFontSize(9);doc.setFont('helvetica','bold');doc.text('Resumo:',M,yy);doc.setFont('helvetica','normal');
  doc.text(porTipo.map(([n,q])=>`${n}: ${anaNum(q)}`).concat([`Total: ${anaNum(L.length)}`]).join('     '),M+16,yy);
  doc.text('Por forma: '+relFormasConta(L).map(([rot,q])=>`${anaNum(q)} ${rot}`).join(' · ')+(L.some(l=>l.sobra)?'   (sobra = refeição preparada e não consumida, informada pelo restaurante e cobrada no BM)':''),M+16,yy+5);
  relPdfRodape(doc,'CAP-Refeições — Relatório de registros de refeições',W,H,M);
  return doc;
}
function relRegNome(F,ext){return `relatorio-registros-${relEmpSlug(relEmpsLista(F.emps))}-${F.de}_a_${F.ate}.${ext}`}
function relRegDesc(u){const ns=u.L.filter(l=>l.sobra).length;return `Registros — ${relEmpsTxt(relEmpsLista(u.F.emps))||'—'} — ${br(u.F.de)} a ${br(u.F.ate)} — ${u.L.length} refeição(ões)${ns?' (com '+ns+' de sobras)':''}`}
function relPdfPronto(){return pdfPronto()}
$('rl-ver').onclick=()=>{const u=REL.ult;if(!u||!u.L.length||!relPdfPronto())return;
  try{const en=relEmpsTxt(relEmpsLista(u.F.emps));const doc=relPdf(u.F,u.L);audit('relatorio.visualizar',relRegDesc(u),{empresa:en});save();relVerPdf(doc,`Relatório de registros — ${en} — ${br(u.F.de)} a ${br(u.F.ate)}`,relRegNome(u.F,'pdf'))}catch(e){toast('Falha ao gerar o PDF')}};
$('rl-pdf').onclick=async()=>{
  const u=REL.ult;if(!u||!u.L.length||!relPdfPronto())return;
  const b=$('rl-pdf'),old=b.textContent;b.disabled=true;b.textContent='Gerando…';
  try{const doc=relPdf(u.F,u.L);audit('relatorio.pdf',relRegDesc(u),{empresa:relEmpsTxt(relEmpsLista(u.F.emps))});save();await relSalvar(doc.output('blob'),relRegNome(u.F,'pdf'),'PDF gerado')}
  catch(e){toast('Falha ao gerar o PDF')}
  b.disabled=false;b.textContent=old;
};
$('rl-csv').onclick=async()=>{
  const u=REL.ult;if(!u||!u.L.length)return;
  const linhas=[REL_COLS.map(relCsvCel).join(';')].concat(u.L.map(l=>relValores(l).map(relCsvCel).join(';')));   // v2.8.8: a Empresa é a 3ª coluna (uma por linha)
  audit('relatorio.csv',relRegDesc(u),{empresa:relEmpsTxt(relEmpsLista(u.F.emps))});save();
  await relSalvar(new Blob(['﻿'+linhas.join('\r\n')],{type:'text/csv;charset=utf-8'}),relRegNome(u.F,'csv'),'Planilha gerada');
};
['rl-de','rl-ate'].forEach(id=>$(id).onchange=()=>{REL.preset=null;REL.lim=300;renderRelReg()});
document.querySelectorAll('#rl-presets [data-p]').forEach(b=>b.onclick=()=>{REL.preset=b.dataset.p;const r=anaDatas(REL.preset);$('rl-de').value=r[0];$('rl-ate').value=r[1];REL.lim=300;renderRelReg()});
$('rl-limpar').onclick=()=>{REL.cts.clear();REL.tipos.clear();REL.obras.clear();REL.lim=300;renderRelReg()};
$('rl-mais').onclick=()=>{REL.lim+=300;relAtualiza()};


/* =================== TABELAS (v2.8.3): ordenar pelo título e ajustar a largura das colunas ===================
   Clique no título: crescente (A→Z, mais antigo → mais novo, menor → maior); de novo: decrescente. Vazios ficam sempre no fim.
   Tabelas com páginas ou montadas de uma lista (data-ord + ORD_COLS) se ordenam pela lista inteira; as demais, pelas linhas na tela.
   Arraste a borda direita do título para alargar ou estreitar (mínimo: o título inteiro numa linha); dois cliques: largura automática.
   As larguras ficam guardadas neste aparelho. */
const TORD={},ORD_COLS={};
let TLARG={};try{TLARG=JSON.parse(localStorage.getItem('sismed_larguras')||'{}')||{}}catch(e){TLARG={}}
const ORD_MES=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];const ORD_MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function ordTxt(t){t=String(t==null?'':t).replace(/\s+/g,' ').trim();if(!t||/^[—–-]$/.test(t))return {v:1};
  let m=/^(?:[A-Za-zÀ-ú]{3}\.?,?\s+)?(\d{2})\/(\d{2})\/(\d{4})(?:,?\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/.exec(t);
  if(m)return {n:Date.UTC(+m[3],+m[2]-1,+m[1],+(m[4]||0),+(m[5]||0),+(m[6]||0))};
  m=/^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[a-zç]*\.?\/(\d{2}|\d{4})$/i.exec(t);if(m){const a=+m[2];return {n:(a<100?2000+a:a)*12+ORD_MES.indexOf(m[1].toLowerCase())}}
  m=/^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro) de (\d{4})$/i.exec(t);if(m)return {n:+m[2]*12+ORD_MESES.indexOf(m[1].toLowerCase())};
  m=/^(\d{1,2}):(\d{2})$/.exec(t);if(m)return {n:+m[1]*60+ +m[2]};
  const x=t.replace(/^R\$\s?/,'').replace(/\s?%$/,'');if(/^-?\d{1,3}(\.\d{3})+(,\d+)?$|^-?\d+(,\d+)?$/.test(x))return {n:+x.replace(/\./g,'').replace(',','.')};
  return {s:t}}
function ordValor(v){if(typeof v==='number')return isFinite(v)?{n:v}:{v:1};if(typeof v==='boolean')return {n:v?1:0};if(v==null||v==='')return {v:1};
  const t=String(v);if(/^\d{4}-\d{2}-\d{2}(T|$)/.test(t)){const n=Date.parse(t.length===10?t+'T00:00:00Z':t);if(isFinite(n))return {n}}return ordTxt(t)}
function ordCmp(a,b,dir){if(a.v||b.v)return a.v&&b.v?0:a.v?1:-1;let c;if(a.n!==undefined&&b.n!==undefined)c=a.n-b.n;else if(a.n!==undefined)c=-1;else if(b.n!==undefined)c=1;
  else c=a.s.localeCompare(b.s,'pt-BR',{numeric:true,sensitivity:'base'});return c*dir}
function ordLista(k,l){const e=TORD[k],g=ORD_COLS[k];if(!e||!g||!g[e.col]||!Array.isArray(l))return l;const f=g[e.col];
  return l.map((x,i)=>({x,i,v:ordValor(f(x,i))})).sort((a,b)=>ordCmp(a.v,b.v,e.dir)||a.i-b.i).map(o=>o.x)}
Object.assign(ORD_COLS,{
  supRegs:[r=>r.data,r=>r.nome,r=>(r.empresaNome||'')+' · '+(r.obraNome||''),r=>(ct(ctOf(r))||{}).nome||r.contratadaNome||'',r=>tipo(r.tipo).curto,r=>nOk(r.valor),r=>r.foto?'com foto':'',r=>r.usuario,
    r=>{const b=r.bmId&&S.bms.find(x=>x.id===r.bmId);return b?(Number(b.numero)||String(b.numero)):r.fechado?'fechada sem BM':'em aberto'}],
  bms:[b=>Number(b.numero)||String(b.numero||''),b=>b.empresaNome,b=>b.obraNome||'',b=>bmK(b).nome||'',b=>b.ini,b=>nOk(b.qtd),b=>nOk(b.liquido),b=>String(statusPill(b)).replace(/<[^>]*>/g,''),b=>b.nf||'',b=>b.titulo||''],
  colab:[c=>c.qr,c=>c.nome,c=>(emp(c.empresaId)||{}).nome||'',c=>(obra(c.obraId)||{}).nome||''],
  contratos:[c=>c.numero,c=>c.inicio||'',c=>c.fim||'',c=>contratoStatus(c,today()),c=>S.obras.filter(o=>o.contratoId===c.id).map(o=>o.nome).join(', ')],
  aud:[e=>e.em,e=>e.usuario,e=>ABAS[e.aba]||e.aba,e=>ACOES[e.acao]||e.acao,e=>e.descricao,e=>e.obra||'',e=>e.empresa||'',e=>e.antes===null&&e.depois===null?'':String(e.antes)+' '+String(e.depois),e=>e.dispositivo,e=>e.ip||''],
  rl:[l=>l.data,l=>l.nome,l=>l.emp,l=>l.obra,l=>l.rest,l=>l.tipoNome,l=>l.bm,l=>l.sit,l=>l.usuario,l=>l.cad,l=>l.forma,l=>l.modNome]});
function ordRender(k){if(/^fin:/.test(k))return finAtualiza;if(/^rg:/.test(k))return ()=>rgAtualiza(k.slice(3));return ({supRegs:renderSup,bms:renderSup,colab:renderColab,contratos:renderContratos,aud:renderAud,rl:relAtualiza,co:coAtualiza,usu:renderSessoes,usuHist:renderSessoes})[k]}
function ordPag1(k){if(/^rg:/.test(k)&&RG[k.slice(3)])RG[k.slice(3)].pg=1;if(['supRegs','bms','colab','contratos'].includes(k))PAGES[k]=1;if(k==='aud')AUD_PAGE=1;if(k==='rl')REL.pg=1;if(k==='co')CO.pg=1;if(/^fin:/.test(k))FIN.pg[k.slice(4)]=1}
function tabChave(t){if(t.dataset.ord)return t.dataset.ord;if(t.id)return t.id;const c=t.parentElement&&t.parentElement.closest('[id]');if(!c)return '';return c.id+':'+[...c.querySelectorAll('table')].indexOf(t)}
function tabCab(t){return t&&t.tHead&&t.tHead.rows.length===1?[...t.tHead.rows[0].cells]:null}
function tabFora(t){return !!(t.closest('[data-sem-ord]'))}
function tabOrdDom(t,e){const b=t.tBodies[0],ths=tabCab(t);if(!b||!ths)return;const rows=[...b.rows];if(rows.length<2||rows.some(r=>r.cells.length!==ths.length))return;
  const it=rows.map((r,i)=>{const c=r.cells[e.col];return {r,i,v:ordValor(c.dataset.v!==undefined?c.dataset.v:c.textContent)}}).sort((a,b)=>ordCmp(a.v,b.v,e.dir)||a.i-b.i);
  if(it.every((o,i)=>o.r===rows[i]))return;const f=document.createDocumentFragment();it.forEach(o=>f.appendChild(o.r));b.appendChild(f)}
function tabLarg(t,L){const ths=tabCab(t);if(!ths)return;ths.forEach((th,i)=>{th.style.width=L[i]+'px'});t.style.tableLayout='fixed';t.style.width=L.reduce((a,b)=>a+b,0)+'px';t.style.minWidth='0';t.classList.add('redim');t.dataset.fixo='1'}
function tabSolta(t){(tabCab(t)||[]).forEach(th=>{th.style.width=''});t.style.tableLayout='';t.style.width='';t.style.minWidth='';t.classList.remove('redim');delete t.dataset.fixo}
function tabMin(th){const sp=th.querySelector(':scope>.th-t');if(!sp)return 40;const ws=sp.style.whiteSpace;sp.style.whiteSpace='nowrap';const w=sp.getBoundingClientRect().width;sp.style.whiteSpace=ws;
  const cs=getComputedStyle(th);return Math.ceil(w+parseFloat(cs.paddingLeft||0)+parseFloat(cs.paddingRight||0)+(th.querySelector(':scope>.ord-i')?15:0))}
function tabPrepara(t){if(!t||!t.isConnected||tabFora(t))return;const ths=tabCab(t);if(!ths||!ths.length)return;const k=tabChave(t);if(!k)return;
  ths.forEach(th=>{if(!th.querySelector(':scope>.th-t')){const sp=document.createElement('span');sp.className='th-t';while(th.firstChild)sp.appendChild(th.firstChild);th.appendChild(sp)}
    const tit=th.querySelector(':scope>.th-t').textContent.trim(),pode=!!tit&&(!t.dataset.ord||!!(ORD_COLS[k]&&ORD_COLS[k][ths.indexOf(th)]));
    if(pode&&!th.querySelector(':scope>.ord-i')){const o=document.createElement('span');o.className='ord-i';o.setAttribute('aria-hidden','true');th.appendChild(o);th.classList.add('ord');th.tabIndex=0;if(!th.title)th.title='Ordenar por '+tit}
    if(!th.querySelector(':scope>.th-redim')){const h=document.createElement('span');h.className='th-redim';h.setAttribute('aria-hidden','true');h.title='Arraste para alargar ou estreitar a coluna · dois cliques: largura automática';th.appendChild(h)}});
  const e=TORD[k];ths.forEach((th,i)=>{const o=th.querySelector(':scope>.ord-i');if(!o)return;const at=!!e&&e.col===i,tx=at?(e.dir>0?'▲':'▼'):'',as=at?(e.dir>0?'ascending':'descending'):'none';if(o.textContent!==tx)o.textContent=tx;if(th.getAttribute('aria-sort')!==as)th.setAttribute('aria-sort',as)});
  if(e&&!t.dataset.ord)tabOrdDom(t,e);
  const L=TLARG[k];if(L&&L.length===ths.length){if(!ths.every((th,i)=>th.style.width===L[i]+'px'))tabLarg(t,L)}else if(t.dataset.fixo)tabSolta(t)}
function tabOrdena(th){const t=th.closest('table'),ths=tabCab(t);if(!ths||tabFora(t))return;const col=ths.indexOf(th);if(col<0||!th.querySelector(':scope>.ord-i'))return;
  const k=tabChave(t),e0=TORD[k],dir=e0&&e0.col===col?-e0.dir:1;TORD[k]={col,dir};
  if(t.dataset.ord){ordPag1(k);const f=ordRender(k);if(f)f();const t2=document.querySelector(`table[data-ord="${CSS.escape(k)}"]`);if(t2)tabPrepara(t2);const c2=tabCab(t2);if(c2&&c2[col])c2[col].focus({preventScroll:true})}
  else tabPrepara(t)}
document.addEventListener('click',ev=>{const th=ev.target.closest&&ev.target.closest('th.ord');if(!th||ev.target.closest('.th-redim,button,a,input,select,label'))return;tabOrdena(th)});
document.addEventListener('keydown',ev=>{if((ev.key==='Enter'||ev.key===' ')&&ev.target&&ev.target.matches&&ev.target.matches('th.ord')){ev.preventDefault();tabOrdena(ev.target)}});
document.addEventListener('pointerdown',ev=>{const h=ev.target.closest&&ev.target.closest('.th-redim');if(!h)return;ev.preventDefault();ev.stopPropagation();
  const th=h.parentElement,t=th.closest('table'),ths=tabCab(t);if(!ths)return;const k=tabChave(t);
  if(!t.dataset.fixo)tabLarg(t,ths.map(x=>Math.ceil(x.getBoundingClientRect().width)));
  const x0=ev.clientX,w0=parseFloat(th.style.width)||th.getBoundingClientRect().width,min=tabMin(th);
  try{h.setPointerCapture(ev.pointerId)}catch(e){}document.body.classList.add('redimensionando');h.classList.add('on');
  const mv=e2=>{const w=Math.max(min,Math.round(w0+e2.clientX-x0));th.style.width=w+'px';t.style.width=ths.reduce((a,x)=>a+(parseFloat(x.style.width)||0),0)+'px'};
  const up=()=>{h.removeEventListener('pointermove',mv);h.removeEventListener('pointerup',up);h.removeEventListener('pointercancel',up);document.body.classList.remove('redimensionando');h.classList.remove('on');
    TLARG[k]=ths.map(x=>Math.round(parseFloat(x.style.width)||x.getBoundingClientRect().width));try{localStorage.setItem('sismed_larguras',JSON.stringify(TLARG))}catch(e){}};
  h.addEventListener('pointermove',mv);h.addEventListener('pointerup',up);h.addEventListener('pointercancel',up)},true);
document.addEventListener('dblclick',ev=>{const h=ev.target.closest&&ev.target.closest('.th-redim');if(!h)return;const t=h.closest('table');delete TLARG[tabChave(t)];try{localStorage.setItem('sismed_larguras',JSON.stringify(TLARG))}catch(e){}tabSolta(t)});
new MutationObserver(ms=>{const set=new Set();for(const m of ms){const t=m.target;if(t&&t.nodeType===1){const tb=t.tagName==='TABLE'?t:(t.closest?t.closest('table'):null);if(tb)set.add(tb)}
    m.addedNodes.forEach(n=>{if(n.nodeType!==1)return;if(n.tagName==='TABLE')set.add(n);else if(n.getElementsByTagName){const l=n.getElementsByTagName('table');for(let i=0;i<l.length;i++)set.add(l[i])}})}
  set.forEach(t=>{try{tabPrepara(t)}catch(e){}})}).observe(document.body,{childList:true,subtree:true});
document.querySelectorAll('table').forEach(t=>{try{tabPrepara(t)}catch(e){}});

// =========================== RELATÓRIOS NOVOS (v2.9.3) ===========================
// Boletins de Medição, Medições em aberto, Ocorrências, Terceirizados e Realocações. Cada um é descrito em RG_DEF
// (filtros, linhas, colunas, resumo e quadros); rgRender monta a tela, a tabela paginada e ordenável, o PDF, a planilha
// e registra na Auditoria (relatorio.visualizar / relatorio.pdf / relatorio.csv), como os relatórios de antes.
const RG={};
function rgEst(id){return RG[id]||(RG[id]={emps:new Set(),obras:new Set(),cts:new Set(),x:{},pg:1,sig:'',ult:null,preset:(RG_DEF[id].per||{}).preset||'mes',datas:false})}
function rgPresetDatas(p){const t=today();if(p==='90')return [addDays(t,-89),t];if(p==='365')return [addDays(t,-364),t];return anaDatas(p)||anaDatas('mes')}
function rgD(d){return d?br(d):'—'}
function rgDia(iso){const x=new Date(iso);return isNaN(x)?'':ymd(x)}
function rgDias(de,ate){if(!de)return null;const a=parse(String(de).slice(0,10)),b=parse(String(ate||today()).slice(0,10));return Math.max(0,Math.round((b-a)/864e5))}
function rgObras(emps){return S.obras.filter(o=>obraOk(o.id)&&(!emps.size||emps.has(o.empresaId))).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'))
  .map(o=>({id:o.id,nome:o.nome+(o.ativo===false?' (inativa)':'')+(emps.size!==1&&o.empresaId&&emp(o.empresaId)?' — '+emp(o.empresaId).nome:'')}))}
function rgEmpsDoc(F){return F.emps.size===1?relEmpsLista(F.emps):[]}
function rgFiltros(id){const D=RG_DEF[id],st=rgEst(id),p='rg-'+id;const x={};(D.extras||[]).forEach(e=>{x[e.id]=new Set(st.x[e.id]||[])});
  return {de:D.per?$(p+'-de').value:'',ate:D.per?$(p+'-ate').value:'',emps:new Set(st.emps),obras:new Set(st.obras),cts:new Set(st.cts),x,q:D.busca?$(p+'-q').value.trim():''}}
function rgFiltrosTxt(id,F){const D=RG_DEF[id],t=[];
  if(D.per)t.push(`${D.per.rot||'Período'}: ${br(F.de)} a ${br(F.ate)}`);
  if(D.emp){const Es=relEmpsLista(F.emps);t.push(`${D.emp}: ${Es.length?relEmpsTxt(Es):'todas'}${Es.length===1&&Es[0].cnpj?' — CNPJ '+Es[0].cnpj:''}`)}
  if(D.obra)t.push(`${D.obra}: ${F.obras.size?[...F.obras].map(i=>(obra(i)||{}).nome||'—').join(', '):'todas'}`);
  if(D.ct)t.push(`Restaurante: ${F.cts.size?[...F.cts].map(i=>(ct(i)||{}).nome||'—').join(', '):'todos'}`);
  (D.extras||[]).forEach(e=>{const s=F.x[e.id];if(s&&s.size){const it=e.itens();t.push(`${e.rot}: ${it.filter(i=>s.has(i.id)).map(i=>i.nome).join(', ')}`)}});
  if(D.busca&&F.q)t.push(`${D.busca.rot}: "${F.q}"`);
  return t}
function rgHtml(id){const D=RG_DEF[id],p='rg-'+id;
  const ms=(k,rot)=>`<div class="field"><label id="${p}-${k}-l">${esc(rot)}</label><div class="ms" id="${p}-${k}" data-rotulo="${p}-${k}-l"></div></div>`;
  let f='';
  if(D.per)f+=`<div class="field rg-per"><label for="${p}-de">${esc(D.per.rot||'Período')} <span class="req" aria-hidden="true">*</span></label><div class="periodo"><input id="${p}-de" type="date" aria-label="Início do período (obrigatório)" required><span>a</span><input id="${p}-ate" type="date" aria-label="Fim do período (obrigatório)" required></div>`
    +`<div class="row" id="${p}-presets" style="gap:4px;margin-top:6px">${D.per.presets.map(([k,n])=>`<button type="button" class="chipbtn" data-p="${k}">${esc(n)}</button>`).join('')}</div></div>`;
  if(D.emp)f+=ms('emp',D.emp);if(D.obra)f+=ms('obra',D.obra);if(D.ct)f+=ms('ct','Restaurante');
  (D.extras||[]).forEach(e=>{f+=ms('x-'+e.id,e.rot)});
  if(D.busca)f+=`<div class="field"><label for="${p}-q">${esc(D.busca.rot)}</label><input id="${p}-q" autocomplete="off" placeholder="${esc(D.busca.ph||'')}"></div>`;
  f+=`<button class="btn sec sm" id="${p}-limpar" type="button" style="align-self:flex-end;margin-bottom:4px">Limpar filtros</button>`;
  return `<div class="card"><div class="row rg-filtros" style="align-items:flex-start">${f}</div><div class="small muted" style="margin-top:8px">${D.per?'<span class="req">*</span> obrigatório · ':''}${esc(D.nota||'Nas listas: marque um ou mais; sem marcar, entram todos.')}</div></div>
    <div id="${p}-aviso" class="notice warn" style="margin-top:14px" hidden></div>
    <div class="card" id="${p}-doc" style="margin-top:14px" hidden>
      <div class="rel-cab"><div class="rel-logos"><div class="rel-logo" id="${p}-logo"></div></div><div class="rel-tit"><h3>${esc(D.tit)}</h3><div id="${p}-cab"></div></div>
        <div class="rel-acoes"><button class="btn sec sm" id="${p}-ver" type="button">Visualizar PDF</button><button class="btn sm" id="${p}-pdf" type="button">Baixar PDF</button><button class="btn sec sm" id="${p}-csv" type="button">Planilha (CSV)</button></div></div>
      <div class="rel-resumo" id="${p}-resumo"></div>
      <div class="rg-quadros" id="${p}-quadros"></div>
      <div id="${p}-vazio" class="notice warn" hidden>${esc(D.vazio)}</div>
      <div class="rel-pag" id="${p}-pag-topo" hidden></div>
      <div class="tablewrap rel-tab" id="${p}-tabwrap"><table data-ord="rg:${id}"><thead><tr id="${p}-thead"></tr></thead><tbody id="${p}-tbody"></tbody></table></div>
      <div class="rel-pag" id="${p}-pag" hidden></div>
      <div class="rel-pe"><span class="small muted" id="${p}-nota"></span></div>
    </div>`}
function rgDatas(id){const D=RG_DEF[id],st=rgEst(id),p='rg-'+id;if(!D.per)return;
  if(!st.datas){const r=rgPresetDatas(st.preset);$(p+'-de').value=r[0];$(p+'-ate').value=r[1];st.datas=true}
  if($(p+'-de').value&&$(p+'-ate').value&&$(p+'-de').value>$(p+'-ate').value){const x=$(p+'-de').value;$(p+'-de').value=$(p+'-ate').value;$(p+'-ate').value=x}
  document.querySelectorAll('#'+p+'-presets [data-p]').forEach(b=>b.classList.toggle('on',b.dataset.p===st.preset))}
function rgLigar(id){const D=RG_DEF[id],st=rgEst(id),p='rg-'+id;
  if(D.per){document.querySelectorAll('#'+p+'-presets [data-p]').forEach(b=>b.onclick=()=>{st.preset=b.dataset.p;st.datas=false;rgDatas(id);rgAtualiza(id)});
    [p+'-de',p+'-ate'].forEach(x=>$(x).onchange=()=>{st.preset='';rgDatas(id);rgAtualiza(id)})}
  if(D.busca)$(p+'-q').oninput=()=>rgAtualiza(id);
  $(p+'-limpar').onclick=()=>{st.emps.clear();st.obras.clear();st.cts.clear();Object.values(st.x).forEach(s=>s.clear());if(D.busca)$(p+'-q').value='';if(D.per){st.preset=D.per.preset||'mes';st.datas=false}rgRender(id)};
  const pronto=()=>{const u=st.ult;return u&&u.L.length?u:null};
  $(p+'-ver').onclick=()=>{const u=pronto();if(!u||!relPdfPronto())return;try{const doc=rgPdf(id,u.F,u.L);audit('relatorio.visualizar',rgDesc(id,u),{empresa:relEmpsTxt(rgEmpsDoc(u.F))});save();relVerPdf(doc,D.tit,rgNome(id,u.F,'pdf'))}catch(e){toast('Falha ao gerar o PDF')}};
  $(p+'-pdf').onclick=async()=>{const u=pronto();if(!u||!relPdfPronto())return;const b=$(p+'-pdf'),old=b.textContent;b.disabled=true;b.textContent='Gerando…';
    try{const doc=rgPdf(id,u.F,u.L);audit('relatorio.pdf',rgDesc(id,u),{empresa:relEmpsTxt(rgEmpsDoc(u.F))});save();await relSalvar(doc.output('blob'),rgNome(id,u.F,'pdf'),'PDF gerado')}catch(e){toast('Falha ao gerar o PDF')}
    b.disabled=false;b.textContent=old};
  $(p+'-csv').onclick=async()=>{const u=pronto();if(!u)return;
    const linhas=[D.cols.map(c=>relCsvCel(c.t)).join(';')].concat(u.L.map(l=>D.cols.map(c=>relCsvCel(c.csv?c.csv(l):c.v(l))).join(';')));
    audit('relatorio.csv',rgDesc(id,u),{empresa:relEmpsTxt(rgEmpsDoc(u.F))});save();
    await relSalvar(new Blob(['﻿'+linhas.join('\r\n')],{type:'text/csv;charset=utf-8'}),rgNome(id,u.F,'csv'),'Planilha gerada')}}
function rgDesc(id,u){const D=RG_DEF[id];return `${D.n} — ${rgFiltrosTxt(id,u.F).join(' — ')} — ${u.L.length} ${u.L.length===1?D.un[0]:D.un[1]}`}
function rgNome(id,F,ext){const D=RG_DEF[id],Es=rgEmpsDoc(F);return `relatorio-${D.arq}${Es.length?'-'+relSlug(Es[0].nome):''}-${today()}.${ext}`}
function rgRender(id){const D=RG_DEF[id],st=rgEst(id),p='rg-'+id,box=$('rel-p-'+id);if(!box)return;
  if(!box.dataset.pronto){box.innerHTML=rgHtml(id);box.dataset.pronto='1';rgLigar(id)}
  rgDatas(id);
  if(D.emp)msMontar(p+'-emp',relEmpresas(),st.emps,'Todas as empresas',()=>{st.obras.clear();rgRender(id)});
  if(D.obra)msMontar(p+'-obra',rgObras(st.emps),st.obras,'Todas as obras',()=>rgAtualiza(id));
  if(D.ct)msMontar(p+'-ct',relRestaurantes(),st.cts,'Todos os restaurantes',()=>rgAtualiza(id));
  (D.extras||[]).forEach(e=>{st.x[e.id]=st.x[e.id]||new Set();msMontar(p+'-x-'+e.id,e.itens(),st.x[e.id],e.todos,()=>rgAtualiza(id))});
  rgAtualiza(id)}
function rgAtualiza(id){const D=RG_DEF[id],st=rgEst(id),p='rg-'+id;if(!$(p+'-doc'))return;
  const F=rgFiltros(id),av=$(p+'-aviso'),doc=$(p+'-doc');
  const falta=D.per&&(!F.de||!F.ate)?'Informe o período (início e fim).':null;
  if(falta){av.hidden=false;av.textContent=falta;doc.hidden=true;st.ult=null;return}
  av.hidden=true;doc.hidden=false;
  const L0=D.linhas(F);const Es=rgEmpsDoc(F);relLogoTela(p+'-logo',Es);
  const ft=rgFiltrosTxt(id,F);$(p+'-cab').innerHTML=ft.map(t=>`<div>${esc(t)}</div>`).join('')+`<div class="small muted">emitido em ${esc(brdt(new Date().toISOString()))}</div>`;
  const R=D.resumo(L0,F);$(p+'-resumo').innerHTML=R.map(([v,r])=>`<div class="rr"><b class="num">${esc(v)}</b>${esc(r)}</div>`).join('');
  const Q=L0.length&&D.quadros?D.quadros(L0,F):[];
  $(p+'-quadros').innerHTML=Q.map(q=>`<div class="rg-quadro"><h4>${esc(q.tit)}</h4><div class="tablewrap" data-sem-ord><table><thead><tr>${q.cols.map((c,i)=>`<th${q.al&&q.al[i]?` class="${q.al[i]}"`:''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${q.rows.map(r=>`<tr>${r.map((v,i)=>`<td${q.al&&q.al[i]?` class="${q.al[i]} num"`:''}>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`).join('');
  $(p+'-vazio').hidden=!!L0.length;$(p+'-tabwrap').hidden=!L0.length;[p+'-ver',p+'-pdf',p+'-csv'].forEach(x=>{$(x).disabled=!L0.length});
  const sig=relSig(F);if(sig!==st.sig){st.sig=sig;st.pg=1}
  ORD_COLS['rg:'+id]=D.cols.map(c=>c.o||c.v);const L=ordLista('rg:'+id,L0);st.ult={F,L};
  const P=relPagina(L.length,st.pg);st.pg=P.pg;const vis=L.slice(P.i0,P.i1);
  $(p+'-thead').innerHTML=D.cols.map(c=>`<th${c.a?` class="${c.a}"`:''}>${esc(c.t)}</th>`).join('');
  $(p+'-tbody').innerHTML=vis.map(l=>`<tr>${D.cols.map(c=>{const cls=[c.a||'',c.cls||''].filter(Boolean).join(' ');return `<td${cls?` class="${cls}"`:''}>${c.h?c.h(l):esc(c.v(l))}</td>`}).join('')}</tr>`).join('');
  [[p+'-pag-topo',true],[p+'-pag',false]].forEach(([x,comTam])=>{const el=$(x);el.hidden=!L.length;el.innerHTML=L.length?relPagHtml(P,L.length,D.un,comTam):'';
    relPagLigar(el,pg=>{st.pg=pg;rgAtualiza(id);if(!comTam)$(p+'-pag-topo').scrollIntoView({block:'nearest'})})});
  $(p+'-nota').textContent=[L.length>vis.length?'O PDF e a planilha trazem todas as linhas.':'',D.nota2?D.nota2(F):''].filter(Boolean).join(' ')}
function rgPdf(id,F,L){const D=RG_DEF[id];const {jsPDF}=window.jspdf;const land=D.orient!=='portrait';
  const doc=new jsPDF({orientation:land?'landscape':'portrait',unit:'mm',format:'a4',compress:true});const W=land?297:210,H=land?210:297,M=12;let y=M;
  const Es=rgEmpsDoc(F);const x=relPdfLogos(doc,Es,M,y);
  doc.setTextColor(23,33,43);doc.setFont('helvetica','bold');doc.setFontSize(13);doc.text(D.pdfTit,x,y+5);
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);let yy=y+10.5;
  rgFiltrosTxt(id,F).forEach(t=>{const l=doc.splitTextToSize(t,W-M-x);doc.text(l,x,yy);yy+=l.length*3.7});
  doc.setFontSize(8);doc.setTextColor(90);doc.text(`Emitido em ${brdt(new Date().toISOString())} por ${USER?USER.nome:'—'}`,x,yy);yy+=4.5;
  const R=D.resumo(L,F);doc.setTextColor(23,33,43);doc.setFont('helvetica','bold');doc.setFontSize(9);
  const rl=doc.splitTextToSize('Resumo: '+R.map(([v,r])=>`${v} ${r}`).join('   ·   '),W-M-x);doc.text(rl,x,yy);yy+=rl.length*4;doc.setFont('helvetica','normal');
  y=Math.max(yy,y+21);doc.setDrawColor(23,33,43);doc.setLineWidth(.5);doc.line(M,y,W-M,y);y+=4;
  const est={font:'helvetica',fontSize:7.5,cellPadding:1.2,lineColor:[210,216,222],lineWidth:.1,textColor:[23,33,43],overflow:'linebreak',valign:'middle'};
  const cab={fillColor:[23,33,43],textColor:255,fontStyle:'bold',fontSize:7.5};
  (D.quadros?D.quadros(L,F):[]).forEach(q=>{if(y>H-30){doc.addPage();y=16}
    doc.setFont('helvetica','bold');doc.setFontSize(9);doc.text(q.tit,M,y);y+=2;doc.setFont('helvetica','normal');
    const cs={};(q.al||[]).forEach((a,i)=>{if(a==='r')cs[i]={halign:'right'};if(a==='c')cs[i]={halign:'center'}});
    doc.autoTable({startY:y,head:[q.cols],body:q.rows,margin:{left:M,right:M,bottom:14},theme:'grid',tableWidth:'wrap',styles:est,headStyles:cab,columnStyles:cs});y=doc.lastAutoTable.finalY+6});
  if(y>H-30){doc.addPage();y=16}
  const cw={};D.cols.forEach((c,i)=>{cw[i]={cellWidth:c.w||'auto'};if(c.a==='r')cw[i].halign='right';if(c.a==='c')cw[i].halign='center'});
  doc.autoTable({startY:y,head:[D.cols.map(c=>c.t)],body:L.map(l=>D.cols.map(c=>c.pdf?c.pdf(l):c.v(l))),margin:{left:M,right:M,bottom:14},theme:'grid',styles:est,headStyles:cab,alternateRowStyles:{fillColor:[244,246,248]},columnStyles:cw});
  if(D.nota2&&D.nota2(F)){let y2=doc.lastAutoTable.finalY+5;if(y2>H-16){doc.addPage();y2=16}doc.setFontSize(7.5);doc.setTextColor(90);doc.text(doc.splitTextToSize(D.nota2(F),W-2*M),M,y2)}
  relPdfRodape(doc,'CAP-Refeições — '+D.tit,W,H,M);return doc}
// filtros comuns sobre itens com empresaId / obraId / restaurante
function rgOk(F,x){return (!F.emps.size||F.emps.has(x.empresaId))&&(!F.obras.size||F.obras.has(x.obraId))&&(!F.cts.size||F.cts.has(ctOf(x)))}
function rgPill(txt,cls){return `<span class="pill ${cls}">${esc(txt)}</span>`}
function rgSeta(de,para){return de===para?esc(para||'—'):`<span class="muted">${esc(de||'—')}</span><span class="rg-seta">→</span><b>${esc(para||'—')}</b>`}
function rgGrupo(L,key,nome){const m=new Map();L.forEach(l=>{const k=key(l);let g=m.get(k);if(!g)m.set(k,g={k,nome:nome(l),n:0,v:0,t:{}});g.n++;g.v+=l.valor||0;g.t[l.tipoId]=(g.t[l.tipoId]||0)+1});return [...m.values()].sort((a,b)=>b.v-a.v||b.n-a.n)}

/* ---------- Boletins de Medição: situação de cada BM e há quanto tempo está parado ---------- */
const BM_ETAPAS=[['rest','Aguardando restaurante'],['gestor','Aguardando gestor / engenheiro'],['nf','Aguardando nota fiscal'],['tit','Aguardando nº do título'],['ok','Concluído']];
function bmAudEm(b,acao){let em='';(S.audit||[]).forEach(e=>{if(e.acao===acao&&e.entidade==='BM '+b.numero&&(!e.empresa||e.empresa===b.empresaNome)&&e.em>em)em=e.em});return em}
function bmEtapaInfo(b){const fech=b.fechadoEm||b.emitidoEm||'',restEm=b.assRest&&!b.assRest.vazia?b.assRest.em:'',gestEm=b.assSup&&!b.assSup.vazia?b.assSup.em:'',nf=b.nf?(b.nfEm||bmAudEm(b,'bm.nf')):'',tit=b.titulo?(b.tituloEm||bmAudEm(b,'bm.titulo')):'';
  let k,desde;if(b.status==='fechado'){k='rest';desde=fech}else if(b.status==='assinado_restaurante'){k='gestor';desde=restEm}else if(b.status==='assinado'){k='nf';desde=gestEm}else if(b.status==='faturado'&&!b.titulo){k='tit';desde=nf}else{k='ok';desde=tit}
  return {k,nomeEt:(BM_ETAPAS.find(e=>e[0]===k)||[])[1]||b.status,desde,fech,restEm,gestEm,nf,tit,dias:k==='ok'?null:rgDias(desde)}}
function rgBoletins(F){return S.bms.filter(b=>ctOk(ctOf(b))&&b.ini<=F.ate&&b.fim>=F.de&&(!F.emps.size||F.emps.has(b.empresaId))&&(!F.obras.size||F.obras.has(b.obraId))&&(!F.cts.size||F.cts.has(ctOf(b))))
  .map(b=>{const i=bmEtapaInfo(b);return {b,...i,num:Number(b.numero)||0,emp:b.empresaNome||'—',obra:b.obraNome||'todas as obras',ctr:bmPed(b)?'pedido nº '+(b.pedido||'—'):b.contratoNumero||'',rest:bmK(b).nome||'—',qtd:nOk(b.qtd),valor:nOk(b.liquido)}})
  .filter(l=>!F.x.etapa.size||F.x.etapa.has(l.k)).sort((a,b)=>a.b.ini<b.b.ini?-1:a.b.ini>b.b.ini?1:a.num-b.num)}

/* ---------- Ocorrências: refeições fora do padrão ---------- */
const OC_TIPOS=[['semfoto','Sem foto'],['semqr','Sem QR Code (pelo nome)'],['datamanual','Data manual'],['retro','Retroativa'],['retirada','Retirada por outra pessoa'],['corrigido','Empresa/obra corrigida'],['fechada','Fechada sem BM'],['estorno','Estornada / excluída']];
const OC_NOME=Object.fromEntries(OC_TIPOS);
function rgOcorrencias(F){const L=[],sel=F.x.oc,quer=k=>!sel.size||sel.has(k);
  S.registros.forEach(r=>{if(!(r.data>=F.de&&r.data<=F.ate&&regOk(r)&&rgOk(F,r)))return;
    const base={data:r.data,colab:r.nome||'—',emp:r.empresaNome||(emp(r.empresaId)||{}).nome||'—',obra:r.obraNome||(obra(r.obraId)||{}).nome||'—',rest:(ct(ctOf(r))||{}).nome||r.contratadaNome||'—',tipoId:r.tipo,tipo:tipo(r.tipo).curto,valor:nOk(r.valor),por:r.usuario||'—',em:r.registradoEm||''};
    const add=(k,det)=>{if(quer(k))L.push({...base,k,oc:OC_NOME[k],det:det||''})};
    if(r.semFoto)add('semfoto',r.semFoto);
    if(r.semQr)add('semqr','escolhido pelo nome, sem ler o crachá');
    if(r.retro)add('retro',`lote de ${r.retro.n||'?'} colaborador(es)${r.retro.obs?' — '+r.retro.obs:''}`);else if(r.dataManual)add('datamanual','lançada em '+brdt(r.registradoEm));
    if(modOf(r)==='retirada')add('retirada',retInfo(r));
    (r.correcoes||[]).forEach(c=>add('corrigido',`${c.deEmpresa||'—'} / ${c.deObra||'—'} → ${c.paraEmpresa||'—'} / ${c.paraObra||'—'}${c.motivo?' — '+c.motivo:''}${c.usuario?' — '+c.usuario:''}`));
    if(r.fechado)add('fechada',`${r.fechado.motivo||''}${r.fechado.por?' — '+r.fechado.por:''}`)});
  if(quer('estorno')&&!F.cts.size){const ne=new Set([...F.emps].map(i=>(emp(i)||{}).nome).filter(Boolean)),no=new Set([...F.obras].map(i=>(obra(i)||{}).nome).filter(Boolean));
    const tem=(txt,set)=>!set.size||String(txt||'').split(', ').some(x=>set.has(x));
    (S.audit||[]).forEach(e=>{if(e.acao!=='refeicao.estornar'&&e.acao!=='refeicao.retroativo_estornar'&&e.acao!=='refeicao.excluir')return;const d=rgDia(e.em);if(!d||d<F.de||d>F.ate||!tem(e.empresa,ne)||!tem(e.obra,no))return;
      L.push({data:d,colab:'—',emp:e.empresa||'—',obra:e.obra||'—',rest:'—',tipoId:'',tipo:'—',valor:null,por:e.usuario||'—',em:e.em,k:'estorno',oc:OC_NOME.estorno,det:e.descricao||''})})}
  return L.sort((a,b)=>a.data<b.data?-1:a.data>b.data?1:(a.em<b.em?-1:a.em>b.em?1:0))}

/* ---------- Terceirizados ---------- */
function tercChave(r){return r.terceirizadaId&&tercDe(r.terceirizadaId)?'id:'+r.terceirizadaId:'n:'+semNorm(r.terceirizada||'')}
function tercNomeReg(r){const t=r.terceirizadaId&&tercDe(r.terceirizadaId);return t?maiusc(t.nome):(r.terceirizada?maiusc(r.terceirizada):'(não informada)')}
function rgTercItens(){const m=new Map();(S.terceirizadas||[]).forEach(t=>m.set('id:'+t.id,maiusc(t.nome)+(t.ativa===false?' (inativa)':'')));
  S.registros.forEach(r=>{if(modOf(r)!=='terceirizado')return;const k=tercChave(r);if(!m.has(k))m.set(k,tercNomeReg(r))});
  return [...m.entries()].map(([id,nome])=>({id,nome})).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'))}
function rgTerceirizados(F){return S.registros.filter(r=>modOf(r)==='terceirizado'&&!r.fechado&&regOk(r)&&r.data>=F.de&&r.data<=F.ate&&rgOk(F,r)&&(!F.x.terc.size||F.x.terc.has(tercChave(r))))
  .map(r=>({data:r.data,colab:maiusc(r.nome||'—'),terc:tercNomeReg(r),tk:tercChave(r),emp:r.empresaNome||(emp(r.empresaId)||{}).nome||'—',obra:r.obraNome||(obra(r.obraId)||{}).nome||'—',rest:(ct(ctOf(r))||{}).nome||r.contratadaNome||'—',tipoId:r.tipo,tipo:tipo(r.tipo).curto,valor:nOk(r.valor),bm:relSitBM(r).num,em:r.registradoEm||''}))
  .sort((a,b)=>a.data<b.data?-1:a.data>b.data?1:a.colab.localeCompare(b.colab,'pt-BR'))}


const RG_DEF={
  boletins:{n:'Boletins de Medição',tit:'Relatório de boletins de medição',pdfTit:'RELATÓRIO DE BOLETINS DE MEDIÇÃO',arq:'boletins',un:['boletim','boletins'],
    per:{rot:'Período do BM',preset:'90',presets:[['mes','Mês atual'],['mes-ant','Mês anterior'],['90','Últimos 90 dias'],['ano','Este ano']]},
    emp:'Empresa',obra:'Obra',ct:true,extras:[{id:'etapa',rot:'Situação',todos:'Todas as situações',itens:()=>BM_ETAPAS.map(([id,nome])=>({id,nome}))}],
    nota:'Entram os BMs cujo período toca o período escolhido. Nas listas: marque um ou mais; sem marcar, entram todos.',
    vazio:'Nenhum boletim com esses filtros.',linhas:rgBoletins,
    cols:[{t:'Nº',w:10,a:'c',v:l=>String(l.b.numero),o:l=>l.num},{t:'Empresa',w:26,v:l=>l.emp},{t:'Obra / contrato ou pedido',w:30,v:l=>l.obra+(l.ctr?' — '+l.ctr:''),h:l=>`${esc(l.obra)}${l.ctr?`<div class="small muted">${esc(l.ctr)}</div>`:''}`},
      {t:'Restaurante',w:24,v:l=>l.rest},{t:'Período',w:26,v:l=>`${br(l.b.ini)} a ${br(l.b.fim)}`,o:l=>l.b.ini,cls:'num'},{t:'Refeições',w:16,a:'r',v:l=>anaNum(l.qtd),o:l=>l.qtd,csv:l=>String(l.qtd),cls:'num'},
      {t:'Valor líquido',w:22,a:'r',v:l=>money(l.valor),o:l=>l.valor,csv:l=>relNumCsv(l.valor),cls:'num'},
      {t:'Fechado em',w:17,v:l=>rgD(l.fech),o:l=>l.fech,cls:'num'},{t:'Restaurante assinou',w:17,v:l=>rgD(l.restEm),o:l=>l.restEm,cls:'num'},{t:'Gestor assinou',w:17,v:l=>rgD(l.gestEm),o:l=>l.gestEm,cls:'num'},
      {t:'Nota fiscal',w:16,v:l=>l.b.nf?l.b.nf+(l.nf?' ('+br(l.nf)+')':''):'—',h:l=>l.b.nf?`${esc(l.b.nf)}${l.nf?`<div class="small muted">${br(l.nf)}</div>`:''}`:'<span class="muted">—</span>'},
      {t:'Nº do título',w:16,v:l=>l.b.titulo?l.b.titulo+(l.tit?' ('+br(l.tit)+')':''):'—',h:l=>l.b.titulo?`${esc(l.b.titulo)}${l.tit?`<div class="small muted">${br(l.tit)}</div>`:''}`:'<span class="muted">—</span>'},
      {t:'Situação',w:24,v:l=>l.nomeEt,o:l=>BM_ETAPAS.findIndex(e=>e[0]===l.k),h:l=>rgPill(l.nomeEt,l.k==='ok'?'ok':l.dias!=null&&l.dias>7?'bad':'warn')},
      {t:'Dias parado',w:12,a:'r',v:l=>l.dias==null?'—':String(l.dias),o:l=>l.dias==null?-1:l.dias,cls:'num'}],
    resumo:(L)=>{const c=k=>L.filter(l=>l.k===k).length;const fn=L.filter(l=>l.fech&&l.nf).map(l=>rgDias(l.fech,l.nf));
      return [[anaNum(L.length),L.length===1?'boletim':'boletins'],[money(L.reduce((s,l)=>s+l.valor,0)),'valor líquido']].concat(BM_ETAPAS.map(([k,n])=>[c(k),n.toLowerCase()]).filter(x=>x[0]).map(([v,n])=>[anaNum(v),n]))
        .concat(fn.length?[[Math.round(fn.reduce((a,b)=>a+b,0)/fn.length)+' dias','em média do fechamento à NF']]:[])},
    nota2:()=>'Datas da NF e do título: gravadas a partir da v2.9.3; nos BMs anteriores vêm da Auditoria, quando ainda está lá.'},
  medicoes:{n:'Medições em aberto',tit:'Relatório de medições em aberto',pdfTit:'RELATÓRIO DE MEDIÇÕES EM ABERTO',arq:'medicoes-em-aberto',un:['medição','medições'],
    emp:'Empresa',obra:'Obra',ct:true,extras:[{id:'sit',rot:'Situação',todos:'Pendentes e em andamento',itens:()=>[{id:'pend',nome:'Pendente (semana encerrada)'},{id:'and',nome:'Em andamento (semana atual)'}]}],
    nota:'Refeições e sobras ainda sem BM, por contrato ou pedido, obra e semana (segunda a domingo) — a mesma lista do Emitir BM.',
    vazio:'Nenhuma medição em aberto com esses filtros.',
    linhas:F=>bmPendentes().filter(g=>(!F.emps.size||F.emps.has(g.e))&&(!F.obras.size||F.obras.has(g.o))&&(!F.cts.size||F.cts.has(g.k))&&(!F.x.sit.size||F.x.sit.has(g.st)))
      .map(g=>({...g,dias:g.st==='pend'?rgDias(g.ate):null,restN:g.ctNome||'—',stN:g.st==='pend'?'Pendente':'Em andamento'})),
    cols:[{t:'Modalidade',w:26,v:l=>l.modRot},{t:'Obra',w:40,v:l=>l.obraNome},{t:'Empresa',w:36,v:l=>l.empNome},{t:'Restaurante',w:30,v:l=>l.restN},
      {t:'Período',w:30,v:l=>`${br(l.de)} a ${br(l.ate)}`,o:l=>l.de,cls:'num'},{t:'Refeições',w:16,a:'r',v:l=>anaNum(l.qtd),o:l=>l.qtd,csv:l=>String(l.qtd),cls:'num'},
      {t:'Valor',w:24,a:'r',v:l=>money(l.valor),o:l=>l.valor,csv:l=>relNumCsv(l.valor),cls:'num'},
      {t:'Situação',w:34,v:l=>l.st==='and'?'Em andamento':l.atraso>=1?`Pendente há ${l.atraso} ${l.atraso>1?'semanas':'semana'}`:'Pendente',o:l=>(l.st==='pend'?0:1),h:l=>bmpPill(l)},
      {t:'Dias desde o fim',w:18,a:'r',v:l=>l.dias==null?'—':String(l.dias),o:l=>l.dias==null?-1:l.dias,cls:'num'},
      {t:'Observação',v:l=>l.bms.length?'lançada(s) depois do BM nº '+l.bms.join(', '):''}],
    resumo:(L)=>{const pe=L.filter(l=>l.st==='pend'),an=L.filter(l=>l.st==='and');
      return [[anaNum(pe.length),pe.length===1?'pendente':'pendentes'],[money(pe.reduce((s,l)=>s+l.valor,0)),'a medir (pendentes)'],[anaNum(an.length),'em andamento'],[money(an.reduce((s,l)=>s+l.valor,0)),'em andamento (valor)']]}},
  ocorrencias:{n:'Ocorrências',tit:'Relatório de ocorrências',pdfTit:'RELATÓRIO DE OCORRÊNCIAS',arq:'ocorrencias',un:['ocorrência','ocorrências'],
    per:{rot:'Período',preset:'mes',presets:[['mes','Mês atual'],['mes-ant','Mês anterior'],['30','Últimos 30 dias'],['90','Últimos 90 dias']]},
    emp:'Empresa',obra:'Obra',ct:true,extras:[{id:'oc',rot:'Tipo de ocorrência',todos:'Todos os tipos',itens:()=>OC_TIPOS.map(([id,nome])=>({id,nome}))}],
    nota:'Refeições fora do padrão. Uma refeição pode aparecer em mais de uma linha (uma por tipo de ocorrência).',
    vazio:'Nenhuma ocorrência com esses filtros no período.',linhas:rgOcorrencias,
    cols:[{t:'Data',w:17,v:l=>br(l.data),o:l=>l.data+(l.em||''),cls:'num'},{t:'Ocorrência',w:30,v:l=>l.oc,h:l=>rgPill(l.oc,l.k==='estorno'||l.k==='fechada'?'bad':'warn')},{t:'Colaborador',w:38,v:l=>l.colab},
      {t:'Empresa',w:28,v:l=>l.emp},{t:'Obra',w:28,v:l=>l.obra},{t:'Restaurante',w:24,v:l=>l.rest},{t:'Refeição',w:15,v:l=>l.tipo},
      {t:'Valor',w:16,a:'r',v:l=>l.valor==null?'—':money(l.valor),o:l=>l.valor==null?-1:l.valor,csv:l=>l.valor==null?'':relNumCsv(l.valor),cls:'num'},
      {t:'Lançado por',w:24,v:l=>l.por},{t:'Lançado em',w:22,v:l=>l.em?brdt(l.em):'—',o:l=>l.em,cls:'num'},{t:'Detalhe',v:l=>l.det,cls:'quebra'}],
    resumo:(L)=>[[anaNum(L.length),L.length===1?'ocorrência':'ocorrências']].concat(OC_TIPOS.map(([k,n])=>[L.filter(l=>l.k===k).length,n.toLowerCase()]).filter(x=>x[0]).map(([v,n])=>[anaNum(v),n])),
    quadros:(L)=>[{tit:'Por tipo de ocorrência',cols:['Ocorrência','Qtd'],al:['','r'],rows:OC_TIPOS.map(([k,n])=>[n,L.filter(l=>l.k===k).length]).filter(r=>r[1]).map(r=>[r[0],anaNum(r[1])])},
      {tit:'Por quem lançou',cols:['Usuário','Qtd'],al:['','r'],rows:[...L.reduce((m,l)=>m.set(l.por,(m.get(l.por)||0)+1),new Map()).entries()].sort((a,b)=>b[1]-a[1]).map(([u,n])=>[u,anaNum(n)])}],
    nota2:F=>(!F.x.oc.size||F.x.oc.has('estorno'))?'Estornos: vêm da Auditoria (os eventos mais recentes) e não têm restaurante — com filtro de restaurante, não entram.':''},
  terceirizados:{n:'Terceirizados',tit:'Relatório de refeições de terceirizados',pdfTit:'RELATÓRIO DE REFEIÇÕES DE TERCEIRIZADOS',arq:'terceirizados',un:['refeição','refeições'],
    per:{rot:'Período',preset:'mes',presets:[['mes','Mês atual'],['mes-ant','Mês anterior'],['30','Últimos 30 dias'],['90','Últimos 90 dias']]},
    emp:'Empresa (custo)',obra:'Obra',ct:true,extras:[{id:'terc',rot:'Empresa terceirizada',todos:'Todas as terceirizadas',itens:rgTercItens}],
    nota:'Refeições registradas como Terceirizado (Registro manual), sem as fechadas sem BM. Nas listas: marque um ou mais; sem marcar, entram todos.',
    vazio:'Nenhuma refeição de terceirizado com esses filtros no período.',linhas:rgTerceirizados,
    cols:[{t:'Data',w:18,v:l=>br(l.data),o:l=>l.data+(l.em||''),cls:'num'},{t:'Colaborador',w:48,v:l=>l.colab},{t:'Empresa terceirizada',w:42,v:l=>l.terc},{t:'Empresa (custo)',w:38,v:l=>l.emp},
      {t:'Obra',w:38,v:l=>l.obra},{t:'Restaurante',w:30,v:l=>l.rest},{t:'Refeição',w:17,v:l=>l.tipo},{t:'Valor',w:20,a:'r',v:l=>money(l.valor),o:l=>l.valor,csv:l=>relNumCsv(l.valor),cls:'num'},{t:'Nº BM',w:22,a:'c',v:l=>l.bm}],
    resumo:(L)=>[[anaNum(L.length),L.length===1?'refeição':'refeições'],[money(L.reduce((s,l)=>s+l.valor,0)),'valor'],(n=>[anaNum(n),n===1?'empresa terceirizada':'empresas terceirizadas'])(new Set(L.map(l=>l.tk)).size),(n=>[anaNum(n),n===1?'pessoa':'pessoas'])(new Set(L.map(l=>l.colab)).size)],
    quadros:(L)=>{const tp=TIPOS.filter(t=>L.some(l=>l.tipoId===t.id));
      return [{tit:'Por empresa terceirizada',cols:['Empresa terceirizada'].concat(tp.map(t=>t.curto)).concat(['Refeições','Valor']),al:[''].concat(tp.map(()=> 'r')).concat(['r','r']),
          rows:rgGrupo(L,l=>l.tk,l=>l.terc).map(g=>[g.nome].concat(tp.map(t=>anaNum(g.t[t.id]||0))).concat([anaNum(g.n),money(g.v)]))},
        {tit:'Por empresa (custo)',cols:['Empresa','Refeições','Valor'],al:['','r','r'],rows:rgGrupo(L,l=>l.emp,l=>l.emp).map(g=>[g.nome,anaNum(g.n),money(g.v)])}]}}
};

// =========================== COLABORADORES (v2.8.2) ===========================
const CO={emps:new Set(),pg:1,sig:'',ult:null};
function coComCodigo(){return can('cfg.colab')}   // o código do crachá serve para registrar refeição: só aparece para quem já o vê no cadastro
function coCols(){return ['Nº','Colaborador'].concat(coComCodigo()?['Código do crachá']:[]).concat(['Empresa','Obra','Situação','Última refeição'])}
function coFiltros(){const es=new Set(CO.emps);return {emps:es,emp:es.size===1?[...es][0]:'',obra:$('co-obra').value,sit:$('co-sit').value}}
function coLinhas(F){
  const ult=new Map();S.registros.forEach(r=>{if(!r.colabId||!regOk(r))return;const u=ult.get(r.colabId);if(!u||r.data>u)ult.set(r.colabId,r.data)});
  return S.colab.filter(c=>obraOk(c.obraId)&&(!F.emps.size||F.emps.has(c.empresaId))&&(!F.obra||c.obraId===F.obra)&&(F.sit===''||(F.sit==='1')===!!c.ativo))
    .map(c=>{const e=emp(c.empresaId),o=obra(c.obraId);return {id:c.id,nome:String(c.nome||''),qr:String(c.qr||''),emp:e?e.nome:'—',obra:o?o.nome:'—',ativo:!!c.ativo,ult:ult.get(c.id)||''}})
    .sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR')||a.emp.localeCompare(b.emp,'pt-BR'))}
function coValores(l,i){return [String(i+1),l.nome].concat(coComCodigo()?[l.qr]:[]).concat([l.emp,l.obra,l.ativo?'Ativo':'Inativo',l.ult?br(l.ult):'—'])}
// empresa do relatório (logotipo e CNPJ): só quando é uma só — escolhida, ou a da obra escolhida sem empresa marcada
function coEmpresaDoc(F){if(F.emps.size>1)return null;const o=F.obra?obra(F.obra):null;return emp(F.emp||(o&&o.empresaId))}
function coFiltrosTxt(F){const o=F.obra?obra(F.obra):null,Es=relEmpsLista(F.emps);
  return [`${Es.length>1?'Empresas':'Empresa'}: ${Es.length?relEmpsTxt(Es):'todas'}`,`Obra: ${o?o.nome:'todas'}`,`Situação: ${F.sit==='1'?'só ativos':F.sit==='0'?'só inativos':'ativos e inativos'}`]}
function coDesc(u){return `Colaboradores — ${coFiltrosTxt(u.F).join(' — ')} — ${u.L.length} colaborador(es)`}
function coNome(F,ext){const o=F.obra?obra(F.obra):null,Es=relEmpsLista(F.emps);return `relatorio-colaboradores-${relSlug([Es.length===1?Es[0].nome:Es.length?Es.length+' empresas':'',o&&o.nome].filter(Boolean).join(' '))}-${today()}.${ext}`}
function renderRelCo(){
  msMontar('co-emp',relEmpresas(),CO.emps,'Selecione a empresa…',()=>renderRelCo(),MS_EMP);
  const es=CO.emps;
  const obras=S.obras.filter(o=>obraOk(o.id)&&(!es.size||es.has(o.empresaId))).sort((a,b)=>a.nome.localeCompare(b.nome)).map(o=>({id:o.id,nome:o.nome+(o.ativo===false?' (inativa)':'')+(es.size!==1&&o.empresaId&&emp(o.empresaId)?' — '+emp(o.empresaId).nome:'')}));
  fillSelect($('co-obra'),obras,$('co-obra').value,es.size===1?'Todas as obras da empresa':es.size?'Todas as obras das empresas':'Todas as obras');
  coAtualiza()}
function coAtualiza(){
  const F=coFiltros(),av=$('co-aviso'),doc=$('co-doc');
  if(!F.emps.size&&!F.obra){av.hidden=false;av.textContent='Para gerar o relatório, escolha a empresa, a obra ou as duas.';doc.hidden=true;CO.ult=null;return}
  av.hidden=true;doc.hidden=false;
  const L=coLinhas(F);CO.ult={F,L};const E=coEmpresaDoc(F),o=F.obra?obra(F.obra):null;
  relLogoTela('co-logo',E?[E]:[]);const Es=relEmpsLista(F.emps);   // logotipo só com uma empresa
  $('co-cab').innerHTML=`${Es.length>1?relCabEmp(Es):`<div>Empresa: <b>${esc(F.emp&&E?E.nome:'Todas')}</b>${F.emp&&E&&E.cnpj?' · CNPJ '+esc(E.cnpj):''}</div>`}<div>Obra: <b>${esc(o?o.nome:'Todas')}</b></div><div class="small muted">${esc(coFiltrosTxt(F)[2])} · emitido em ${esc(brdt(new Date().toISOString()))}</div>`;
  const nAt=L.filter(l=>l.ativo).length,nObras=new Set(L.map(l=>l.obra)).size;
  $('co-resumo').innerHTML=`<div class="rr"><b class="num">${anaNum(L.length)}</b>colaborador${L.length===1?'':'es'}</div>`+(L.length?`<div class="rr"><b class="num">${anaNum(nAt)}</b>ativo${nAt===1?'':'s'}</div><div class="rr"><b class="num">${anaNum(L.length-nAt)}</b>inativo${L.length-nAt===1?'':'s'}</div>${F.obra?'':`<div class="rr"><b class="num">${anaNum(nObras)}</b>obra${nObras===1?'':'s'}</div>`}`:'');
  $('co-vazio').hidden=!!L.length;$('co-tabwrap').hidden=!L.length;['co-ver','co-pdf','co-csv'].forEach(id=>{$(id).disabled=!L.length});
  const sig=relSig(F);if(sig!==CO.sig){CO.sig=sig;CO.pg=1}
  L.forEach((l,i)=>{l.n=i+1});ORD_COLS.co=[l=>l.n,l=>l.nome].concat(coComCodigo()?[l=>l.qr]:[]).concat([l=>l.emp,l=>l.obra,l=>l.ativo?'Ativo':'Inativo',l=>l.ult]);
  const Lo=ordLista('co',L);CO.ult.L=Lo;
  const P=relPagina(L.length,CO.pg);CO.pg=P.pg;const vis=Lo.slice(P.i0,P.i1),cod=coComCodigo();
  $('co-thead').innerHTML=coCols().map((c,i)=>`<th${i===0?' class="c"':''}>${esc(c)}</th>`).join('');
  $('co-tbody').innerHTML=vis.map((l,k)=>`<tr><td class="c num">${P.i0+k+1}</td><td class="quebra"><b>${esc(l.nome)}</b></td>${cod?`<td class="mono">${esc(l.qr)}</td>`:''}<td class="quebra">${esc(l.emp)}</td><td class="quebra">${esc(l.obra)}</td><td><span class="pill ${l.ativo?'ok':'bad'}">${l.ativo?'Ativo':'Inativo'}</span></td><td class="num">${l.ult?br(l.ult):'—'}</td></tr>`).join('');
  [['co-pag-topo',true],['co-pag',false]].forEach(([id,comTam])=>{const el=$(id);el.hidden=!L.length;el.innerHTML=L.length?relPagHtml(P,L.length,['colaborador','colaboradores'],comTam):'';
    relPagLigar(el,pg=>{CO.pg=pg;coAtualiza();if(!comTam)$('co-pag-topo').scrollIntoView({block:'nearest'})})});
  $('co-mostrando').textContent=L.length>vis.length?'O PDF e a planilha trazem todos os colaboradores.':'';
}
function coPdf(F,L){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4',compress:true});const W=210,H=297,M=12;let y=M;
  const E=coEmpresaDoc(F);const x=relPdfLogos(doc,E?[E]:[],M,y);
  doc.setTextColor(23,33,43);doc.setFont('helvetica','bold');doc.setFontSize(13);doc.text('RELATÓRIO DE COLABORADORES',x,y+5);
  doc.setFont('helvetica','normal');doc.setFontSize(9);const ft=coFiltrosTxt(F);
  const e0=doc.splitTextToSize(ft[0]+(F.emp&&E&&E.cnpj?'   CNPJ: '+E.cnpj:''),W-M-x-46),ye=(e0.length-1)*3.9;doc.text(e0,x,y+11);doc.text(ft[1],x,y+16+ye);doc.setFontSize(8);doc.setTextColor(90);doc.text(ft[2]+`   ·   emitido em ${brdt(new Date().toISOString())} por ${USER?USER.nome:'—'}`,x,y+21+ye);
  doc.setTextColor(23,33,43);doc.setFont('helvetica','bold');doc.setFontSize(9);doc.text(`${anaNum(L.length)} colaborador${L.length===1?'':'es'}`,W-M,y+5,{align:'right'});doc.setFont('helvetica','normal');
  y+=25+ye;doc.setDrawColor(23,33,43);doc.setLineWidth(.5);doc.line(M,y,W-M,y);y+=3;
  const cod=coComCodigo(),cw=cod?{0:{cellWidth:10,halign:'center'},1:{cellWidth:50},2:{cellWidth:26},3:{cellWidth:34},4:{cellWidth:34},5:{cellWidth:15},6:{cellWidth:17}}:{0:{cellWidth:10,halign:'center'},1:{cellWidth:62},2:{cellWidth:40},3:{cellWidth:40},4:{cellWidth:16},5:{cellWidth:18}};
  doc.autoTable({startY:y,head:[coCols()],body:L.map(coValores),margin:{left:M,right:M,bottom:14},theme:'grid',
    styles:{font:'helvetica',fontSize:8,cellPadding:1.4,lineColor:[210,216,222],lineWidth:.1,textColor:[23,33,43],overflow:'linebreak',valign:'middle'},
    headStyles:{fillColor:[23,33,43],textColor:255,fontStyle:'bold',fontSize:8},alternateRowStyles:{fillColor:[244,246,248]},columnStyles:cw});
  let yy=doc.lastAutoTable.finalY+6;if(yy>H-20){doc.addPage();yy=18}
  const nAt=L.filter(l=>l.ativo).length;doc.setFontSize(9);doc.setFont('helvetica','bold');doc.text('Resumo:',M,yy);doc.setFont('helvetica','normal');
  doc.text(`Ativos: ${anaNum(nAt)}     Inativos: ${anaNum(L.length-nAt)}     Total: ${anaNum(L.length)}`,M+16,yy);
  relPdfRodape(doc,'CAP-Refeições — Relatório de colaboradores',W,H,M);
  return doc}
$('co-obra').onchange=()=>coAtualiza();$('co-sit').onchange=()=>coAtualiza();
$('co-limpar').onclick=()=>{CO.emps.clear();$('co-obra').value='';$('co-sit').value='';renderRelCo()};
$('co-ver').onclick=()=>{const u=CO.ult;if(!u||!u.L.length||!relPdfPronto())return;
  try{const E=coEmpresaDoc(u.F);const doc=coPdf(u.F,u.L);audit('relatorio.visualizar',coDesc(u),{empresa:E?E.nome:''});save();relVerPdf(doc,`Relatório de colaboradores — ${coFiltrosTxt(u.F).slice(0,2).join(' — ')}`,coNome(u.F,'pdf'))}catch(e){toast('Falha ao gerar o PDF')}};
$('co-pdf').onclick=async()=>{const u=CO.ult;if(!u||!u.L.length||!relPdfPronto())return;
  const b=$('co-pdf'),old=b.textContent;b.disabled=true;b.textContent='Gerando…';
  try{const E=coEmpresaDoc(u.F);const doc=coPdf(u.F,u.L);audit('relatorio.pdf',coDesc(u),{empresa:E?E.nome:''});save();await relSalvar(doc.output('blob'),coNome(u.F,'pdf'),'PDF gerado')}catch(e){toast('Falha ao gerar o PDF')}
  b.disabled=false;b.textContent=old};
$('co-csv').onclick=async()=>{const u=CO.ult;if(!u||!u.L.length)return;const E=coEmpresaDoc(u.F);
  const linhas=[coCols().map(relCsvCel).join(';')].concat(u.L.map((l,i)=>coValores(l,i).map(relCsvCel).join(';')));
  audit('relatorio.csv',coDesc(u),{empresa:E?E.nome:''});save();
  await relSalvar(new Blob(['\ufeff'+linhas.join('\r\n')],{type:'text/csv;charset=utf-8'}),coNome(u.F,'csv'),'Planilha gerada')};

// =========================== FINANCEIRO ===========================
function finFiltros(){const es=new Set(FIN.emps);return {de:$('fn-de').value,ate:$('fn-ate').value,emp:es.size===1?[...es][0]:'',emps:es,cts:new Set(FIN.cts),tipos:new Set(FIN.tipos),obras:new Set(FIN.obras),sobras:$('fn-sobras').checked}}
// o que foi gasto: refeições registradas (menos as fechadas sem BM, que não são cobradas) + sobras cobradas
function finItens(F){
  const ok=x=>x.data>=F.de&&x.data<=F.ate&&F.emps.has(x.empresaId)&&(!F.cts.size||F.cts.has(ctOf(x)))&&(!F.tipos.size||F.tipos.has(x.tipo))&&(!F.obras.size||F.obras.has(x.obraId));
  const regs=S.registros.filter(r=>!r.fechado&&regOk(r)&&ok(r));
  const sob=F.sobras?(S.sobras||[]).filter(s=>s.empresaId&&sobraOk(s)&&ok(s)).flatMap(sobraUnits):[];
  return regs.concat(sob);
}
function finMedido(x){if(!x.bmId)return false;const b=S.bms.find(y=>y.id===x.bmId);return !b||b.status!=='rascunho'}
function finAgrupa(it,key,nome,extra){const m=new Map();
  it.forEach(x=>{const k=key(x);let a=m.get(k);if(!a){a={k,nome:nome(x),extra:extra?extra(x):'',qtd:0,valor:0,t:{}};m.set(k,a)}a.qtd++;a.valor+=x.valor||0;a.t[x.tipo]=(a.t[x.tipo]||0)+1});
  return [...m.values()].sort((a,b)=>b.valor-a.valor||b.qtd-a.qtd||String(a.nome).localeCompare(String(b.nome)))}
function finCalcula(F){
  const it=finItens(F);const total=it.reduce((s,x)=>s+(x.valor||0),0),qtd=it.length,nsob=it.filter(x=>x.sobra).length;
  const medido=it.filter(finMedido).reduce((s,x)=>s+(x.valor||0),0);
  const fimEf=F.ate<today()?F.ate:today();const dias=F.de>fimEf?0:Math.round((parse(fimEf)-parse(F.de))/864e5)+1;
  const porObra=finAgrupa(it,x=>x.obraId||('n:'+(x.obraNome||'')),x=>x.obraNome||(obra(x.obraId)||{}).nome||'—');
  const porRest=finAgrupa(it,x=>ctOf(x),x=>{const c=(S.contratadas||[]).find(k=>k.id===ctOf(x));return c?c.nome:(x.contratadaNome||'—')});
  const porTipo=TIPOS.map(t=>{const l=it.filter(x=>x.tipo===t.id);return {k:t.id,nome:t.curto,qtd:l.length,valor:l.reduce((s,x)=>s+(x.valor||0),0)}}).filter(a=>a.qtd);
  const porColab=finAgrupa(it,x=>x.sobra?'#sobra':(x.colabId||('n:'+(x.nome||''))),x=>x.sobra?'Sobras cobradas (sem colaborador)':(x.nome||'—')+(!x.colabId&&modOf(x)==='terceirizado'?' (terceirizado)':''));
  // por dia (até 62 dias) ou por mês
  const nd=Math.round((parse(F.ate)-parse(F.de))/864e5)+1,porMes=nd>62,bk=[];
  if(porMes){let d=parse(F.de);d=new Date(d.getFullYear(),d.getMonth(),1);const fim=parse(F.ate);while(d<=fim){bk.push({k:ymd(d).slice(0,7),nome:d.toLocaleDateString('pt-BR',{month:'long',year:'numeric'})});d=new Date(d.getFullYear(),d.getMonth()+1,1)}}
  else for(let d=F.de;d<=F.ate;d=addDays(d,1))bk.push({k:d,nome:`${br(d)} (${wd(d)})`});
  const ag={};it.forEach(x=>{const k=porMes?x.data.slice(0,7):x.data;const a=ag[k]||(ag[k]={q:0,v:0});a.q++;a.v+=x.valor||0});
  let ac=0;const porPeriodo=bk.map(b=>{const a=ag[b.k]||{q:0,v:0};ac+=a.v;return {k:b.k,nome:b.nome,qtd:a.q,valor:a.v,acum:ac}});
  const porEmp=F.emps.size>1?finAgrupa(it,x=>x.empresaId,x=>x.empresaNome||(emp(x.empresaId)||{}).nome||'—'):null;   // v2.8.8: com mais de uma empresa
  return {it,total,qtd,nsob,medido,aberto:total-medido,dias,porObra,porRest,porTipo,porColab,porPeriodo,porMes,porEmp};
}
function finFiltrosTxt(F){return [`Restaurante: ${relNomes(relRestaurantes(),F.cts,'todos')}`,`Tipo de refeição: ${relNomes(relTiposItens(),F.tipos,'todos')}`,`Obra: ${relNomes(relObras(F.emps),F.obras,'todas')}`,F.sobras?'Inclui sobras cobradas':'Sem sobras cobradas']}
// seções do relatório: [título, colunas, linhas, total, larga?] — as mesmas para a tela, o PDF e a planilha
function finSecoes(R){
  const T=R.total,pct=v=>relPct(v,T),n=anaNum;
  const sec=(tit,cols,lin,tot,larga,num)=>({tit,cols,lin,tot,larga,num});
  return [
    ...(R.porEmp?[sec('Por empresa',['Empresa','Refeições','Valor','% do total'],R.porEmp.map(a=>[a.nome,n(a.qtd),money(a.valor),pct(a.valor)]),['Total',n(R.qtd),money(T),T?'100,0%':'—'],false,[1,2,3])]:[]),
    sec('Por tipo de refeição',['Tipo','Refeições','Preço médio','Valor','% do total'],R.porTipo.map(a=>[a.nome,n(a.qtd),money(a.qtd?a.valor/a.qtd:0),money(a.valor),pct(a.valor)]),['Total',n(R.qtd),money(R.qtd?T/R.qtd:0),money(T),T?'100,0%':'—'],false,[1,2,3,4]),
    sec('Por restaurante',['Restaurante','Refeições','Valor','% do total'],R.porRest.map(a=>[a.nome,n(a.qtd),money(a.valor),pct(a.valor)]),['Total',n(R.qtd),money(T),T?'100,0%':'—'],false,[1,2,3]),
    sec('Por obra',['Obra','Refeições','Valor','% do total'],R.porObra.map(a=>[a.nome,n(a.qtd),money(a.valor),pct(a.valor)]),['Total',n(R.qtd),money(T),T?'100,0%':'—'],true,[1,2,3]),
    sec('Por colaborador',['#','Colaborador'].concat(TIPOS.map(t=>t.curto)).concat(['Refeições','Valor','% do total']),R.porColab.map((a,i)=>[String(i+1),a.nome].concat(TIPOS.map(t=>a.t[t.id]?n(a.t[t.id]):'—')).concat([n(a.qtd),money(a.valor),pct(a.valor)])),['','Total'].concat(TIPOS.map(t=>n(R.it.filter(x=>x.tipo===t.id).length))).concat([n(R.qtd),money(T),T?'100,0%':'—']),true,[0,2,3,4,5,6,7,8]),
    sec(R.porMes?'Por mês':'Por dia',[R.porMes?'Mês':'Dia','Refeições','Valor','Acumulado no período'],R.porPeriodo.map(a=>[a.nome,a.qtd?n(a.qtd):'—',a.qtd?money(a.valor):'—',money(a.acum)]),['Total',n(R.qtd),money(T),money(T)],true,[1,2,3]),
  ];
}
function renderFin(){
  relDatas(FIN,'fn');
  const emps=relEmpresas();if(!FIN.emps.size&&emps.length===1)FIN.emps.add(emps[0].id);
  msMontar('fn-emp',emps,FIN.emps,'Selecione a empresa…',()=>{FIN.limColab=30;renderFin()},MS_EMP);
  msMontar('fn-ct',relRestaurantes(),FIN.cts,'Todos os restaurantes',finAtualiza);
  msMontar('fn-tipo',relTiposItens(),FIN.tipos,'Todos os tipos',finAtualiza);
  msMontar('fn-obra',relObrasRot(FIN.emps),FIN.obras,FIN.emps.size?'Todas as obras':'Escolha a empresa primeiro',finAtualiza);
  finAtualiza();
}
function finAtualiza(){
  const F=finFiltros(),av=$('fn-aviso'),doc=$('fn-doc');
  const falta=[!F.de||!F.ate?'o período':'',!F.emps.size?'a empresa':''].filter(Boolean);
  if(falta.length){av.hidden=false;av.textContent=`Para gerar o relatório, informe ${falta.join(' e ')} (obrigatório).`;doc.hidden=true;FIN.ult=null;return}
  av.hidden=true;doc.hidden=false;
  const R=finCalcula(F);FIN.ult={F,R};const Es=relEmpsLista(F.emps);
  relLogoTela('fn-logo',Es);
  $('fn-cab').innerHTML=`${relCabEmp(Es)}<div>Período: <b>${br(F.de)}</b> a <b>${br(F.ate)}</b></div><div class="small muted">${finFiltrosTxt(F).map(esc).join(' · ')}</div>`;
  $('fn-kpis').innerHTML=`<div class="tile total"><div class="k">Total gasto</div><div class="v num">${money(R.total)}</div><div class="s">${anaNum(R.qtd)} refeições${R.nsob?` · inclui ${anaNum(R.nsob)} sobra${R.nsob>1?'s':''}`:''}</div></div>
    <div class="tile total"><div class="k">Preço médio</div><div class="v num">${R.qtd?money(R.total/R.qtd):'—'}</div><div class="s">por refeição</div></div>
    <div class="tile total"><div class="k">Média por dia</div><div class="v num">${R.dias?money(R.total/R.dias):'—'}</div><div class="s">${R.dias?`${R.dias} dia(s) corrido(s)`:'período futuro'}</div></div>
    <div class="tile total"><div class="k">Já medido em BM</div><div class="v num">${money(R.medido)}</div><div class="s">${relPct(R.medido,R.total)} do total</div></div>
    <div class="tile total"><div class="k">A medir</div><div class="v num">${money(R.aberto)}</div><div class="s">sem BM ou BM em rascunho</div></div>`;
  $('fn-vazio').hidden=!!R.qtd;['fn-ver','fn-pdf','fn-csv'].forEach(id=>{$(id).disabled=!R.qtd});
  if(!R.qtd){$('fn-secoes').innerHTML='';$('fn-pag-tam').hidden=true;return}
  const sig=relSig(F);if(sig!==FIN.sig){FIN.sig=sig;FIN.pg={}}
  const SEC=finSecoes(R),longa=SEC.some(sc=>sc.lin.length>50);
  $('fn-pag-tam').hidden=!longa;$('fn-pag-tam').innerHTML=longa?relTamHtml()+'<span class="small muted">nas tabelas com muitas linhas · o PDF e a planilha trazem tudo</span>':'';relPagLigar($('fn-pag-tam'),()=>{FIN.pg={};finAtualiza()});
  $('fn-secoes').innerHTML=SEC.map((sc,si)=>{
    const colab=sc.tit==='Por colaborador';ORD_COLS['fin:'+sc.tit]=sc.cols.map((c,i)=>l=>l[i]);let lin=ordLista('fin:'+sc.tit,sc.lin);let pe='';
    if(lin.length>(REL_TAM||Infinity)){const P=relPagina(lin.length,FIN.pg[sc.tit]);FIN.pg[sc.tit]=P.pg;pe=`<div class="rel-pag" data-fn-sec="${si}">${relPagHtml(P,lin.length,['linha','linhas'],false)}</div>`;lin=lin.slice(P.i0,P.i1)}
    const td=(v,i)=>`<td${sc.num.includes(i)?' class="r num"':i===0||(colab&&i===1)?' class="quebra"':''}>${esc(v)}</td>`;
    return `<section class="fin-sec${sc.larga?' larga':''}"><h4>${esc(sc.tit)}<span>${colab?anaNum(sc.lin.length)+' linha(s)':''}</span></h4><div class="tablewrap rel-tab"><table data-ord="fin:${esc(sc.tit)}"><thead><tr>${sc.cols.map((c,i)=>`<th${sc.num.includes(i)?' class="r"':''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${lin.map(l=>`<tr>${l.map(td).join('')}</tr>`).join('')}</tbody><tfoot><tr>${sc.tot.map(td).join('')}</tr></tfoot></table></div>${pe}</section>`}).join('');
  $('fn-secoes').querySelectorAll('[data-fn-sec]').forEach(el=>{const sc=SEC[+el.dataset.fnSec];relPagLigar(el,pg=>{FIN.pg[sc.tit]=pg;finAtualiza();const n=$('fn-secoes').querySelector(`[data-fn-sec="${el.dataset.fnSec}"]`);if(n)n.closest('.fin-sec').scrollIntoView({block:'nearest'})})});
}
function finPdf(F,R){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4',compress:true});const W=210,H=297,M=12;let y=M;
  const Es=relEmpsLista(F.emps);const x=relPdfLogos(doc,Es.length===1?Es:[],M,y);   // logotipo só com uma empresa
  doc.setTextColor(23,33,43);doc.setFont('helvetica','bold');doc.setFontSize(12.5);doc.text('RELATÓRIO FINANCEIRO — GASTOS COM REFEIÇÕES',x,y+5);
  doc.setFont('helvetica','normal');doc.setFontSize(8.8);
  const ne=relEmpPdf(doc,Es,x,y+10.5,W-M-x);
  let yy=y+10.5+ne*3.8;doc.text(`Período: ${br(F.de)} a ${br(F.ate)}`,x,yy+0.5);
  const fl=doc.splitTextToSize(finFiltrosTxt(F).join('   ·   ')+`   ·   Emitido em ${brdt(new Date().toISOString())} por ${USER?USER.nome:'—'}`,W-M-x);doc.setFontSize(7.6);doc.setTextColor(90);doc.text(fl,x,yy+5);
  doc.setTextColor(23,33,43);
  y=Math.max(y+24,yy+5+fl.length*3.3+2);doc.setDrawColor(23,33,43);doc.setLineWidth(.5);doc.line(M,y,W-M,y);y+=4;
  const est={font:'helvetica',fontSize:7.6,cellPadding:1.4,lineColor:[210,216,222],lineWidth:.1,textColor:[23,33,43],overflow:'linebreak',valign:'middle'};
  doc.autoTable({startY:y,head:[['Total gasto','Refeições','Preço médio','Média por dia','Já medido em BM','A medir']],body:[[money(R.total),anaNum(R.qtd)+(R.nsob?` (${anaNum(R.nsob)} sobras)`:''),R.qtd?money(R.total/R.qtd):'—',R.dias?money(R.total/R.dias):'—',`${money(R.medido)} (${relPct(R.medido,R.total)})`,money(R.aberto)]],
    margin:{left:M,right:M},theme:'grid',styles:{...est,fontSize:8.6,halign:'center',fontStyle:'bold'},headStyles:{fillColor:[23,33,43],textColor:255,fontSize:7.4,fontStyle:'bold',halign:'center'}});
  y=doc.lastAutoTable.finalY+7;
  finSecoes(R).forEach(sc=>{
    if(y>H-40){doc.addPage();y=16}
    doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.setTextColor(23,33,43);doc.text(sc.tit.toUpperCase(),M,y);y+=2;
    const cs={};sc.num.forEach(i=>{cs[i]={halign:'right'}});if(sc.tit==='Por colaborador'){cs[0]={halign:'right',cellWidth:8};cs[1]={cellWidth:62}}
    doc.autoTable({startY:y,head:[sc.cols],body:sc.lin,foot:[sc.tot],showFoot:'lastPage',margin:{left:M,right:M,bottom:14},theme:'grid',styles:est,
      headStyles:{fillColor:[23,33,43],textColor:255,fontStyle:'bold',fontSize:7.4},footStyles:{fillColor:[232,236,240],textColor:[23,33,43],fontStyle:'bold'},alternateRowStyles:{fillColor:[246,248,250]},columnStyles:cs,
      didParseCell:d=>{if((d.section==='head'||d.section==='foot')&&sc.num.includes(d.column.index))d.cell.styles.halign='right'}});
    y=doc.lastAutoTable.finalY+8});
  relPdfRodape(doc,'CAP-Refeições — Relatório financeiro — gastos com refeições',W,H,M);
  return doc;
}
function finNome(F,ext){return `relatorio-financeiro-${relEmpSlug(relEmpsLista(F.emps))}-${F.de}_a_${F.ate}.${ext}`}
function finEmpAud(u){return relEmpsTxt(relEmpsLista(u.F.emps))}
function finDesc(u){return `Financeiro — ${finEmpAud(u)||'—'} — ${br(u.F.de)} a ${br(u.F.ate)} — ${money(u.R.total)} (${u.R.qtd} refeições)`}
$('fn-ver').onclick=()=>{const u=FIN.ult;if(!u||!u.R.qtd||!relPdfPronto())return;
  try{const doc=finPdf(u.F,u.R);audit('relatorio.visualizar',finDesc(u),{empresa:finEmpAud(u)});save();relVerPdf(doc,`Relatório financeiro — ${br(u.F.de)} a ${br(u.F.ate)}`,finNome(u.F,'pdf'))}catch(e){toast('Falha ao gerar o PDF')}};
$('fn-pdf').onclick=async()=>{
  const u=FIN.ult;if(!u||!u.R.qtd||!relPdfPronto())return;
  const b=$('fn-pdf'),old=b.textContent;b.disabled=true;b.textContent='Gerando…';
  try{const doc=finPdf(u.F,u.R);audit('relatorio.pdf',finDesc(u),{empresa:finEmpAud(u)});save();await relSalvar(doc.output('blob'),finNome(u.F,'pdf'),'PDF gerado')}
  catch(e){toast('Falha ao gerar o PDF')}
  b.disabled=false;b.textContent=old;
};
$('fn-csv').onclick=async()=>{
  const u=FIN.ult;if(!u||!u.R.qtd)return;const R=u.R,F=u.F,c=relCsvCel;
  const Es=relEmpsLista(F.emps),E=Es.length===1?Es[0]:null;
  // números sem "R$", com vírgula, para o Excel somar
  const plano=v=>typeof v==='string'&&/^R\$/.test(v.replace(/ /g,' '))?v.replace(/[^\d,-]/g,''):v;
  const L=[[c('Relatório financeiro — gastos com refeições')],[c(E?'Empresa':'Empresas'),c(E?E.nome+(E.cnpj?' — CNPJ '+E.cnpj:''):relEmpsTxt(Es)||'—')],[c('Período'),c(`${br(F.de)} a ${br(F.ate)}`)],[c('Filtros'),c(finFiltrosTxt(F).join(' · '))],[c('Emitido em'),c(`${brdt(new Date().toISOString())} por ${USER?USER.nome:'—'}`)],[],
    [c('Resumo')],[c('Total gasto (R$)'),c(relNumCsv(R.total))],[c('Refeições'),c(R.qtd)],[c('Preço médio (R$)'),c(relNumCsv(R.qtd?R.total/R.qtd:0))],[c('Média por dia (R$)'),c(relNumCsv(R.dias?R.total/R.dias:0))],[c('Já medido em BM (R$)'),c(relNumCsv(R.medido))],[c('A medir (R$)'),c(relNumCsv(R.aberto))]];
  finSecoes(R).forEach(sc=>{L.push([]);L.push([c(sc.tit)]);L.push(sc.cols.map(x=>c(/^(Valor|Preço médio|Acumulado)/.test(x)?x+' (R$)':x)));sc.lin.concat([sc.tot]).forEach(l=>L.push(l.map(v=>c(plano(v)))))});
  audit('relatorio.csv',finDesc(u),{empresa:finEmpAud(u)});save();
  await relSalvar(new Blob(['﻿'+L.map(l=>l.join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'}),finNome(F,'csv'),'Planilha gerada');
};
['fn-de','fn-ate'].forEach(id=>$(id).onchange=()=>{FIN.preset=null;FIN.limColab=30;renderFin()});
document.querySelectorAll('#fn-presets [data-p]').forEach(b=>b.onclick=()=>{FIN.preset=b.dataset.p;const r=anaDatas(FIN.preset);$('fn-de').value=r[0];$('fn-ate').value=r[1];FIN.limColab=30;renderFin()});
$('fn-limpar').onclick=()=>{FIN.cts.clear();FIN.tipos.clear();FIN.obras.clear();FIN.limColab=30;renderFin()};
$('fn-sobras').onchange=()=>{FIN.limColab=30;finAtualiza()};

/* =================== v3.0.0: NOVO VISUAL — barra lateral recolhível e trilha no topo ===================
   Computador: o botão « no alto da barra lateral recolhe a barra e deixa só os ícones (com o nome ao passar o mouse);
   tocar em qualquer ícone abre a barra de novo. A escolha fica guardada neste aparelho. No celular nada muda (barra de baixo). */
const NAV_MARCA='<div class="nav-marca"><div class="logo" aria-hidden="true"></div><div class="nav-marca-t"><div class="nav-logos"><span class="emp-logos"><img src="../marca/raf.png" alt="RAF"></span></div><b>CAP-Refeições</b></div><button type="button" class="nav-tg" id="nav-tg" aria-label="Recolher a barra lateral" title="Recolher a barra lateral" aria-expanded="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg></button></div>';
let NAV_RECOLHIDA=(()=>{try{return localStorage.getItem('sismed_nav_recolhida')==='1'}catch(e){return false}})();
function navRecolhidaAplicar(){const sn=$('sidenav');if(!sn)return;sn.classList.toggle('recolhida',NAV_RECOLHIDA);
  const app=$('app');if(app)app.classList.toggle('nav-recolhida',NAV_RECOLHIDA);
  const t=$('nav-tg');if(t){const r=NAV_RECOLHIDA?'Abrir a barra lateral':'Recolher a barra lateral';t.setAttribute('aria-label',r);t.title=r;t.setAttribute('aria-expanded',String(!NAV_RECOLHIDA))}}
function navRecolher(v){NAV_RECOLHIDA=!!v;try{localStorage.setItem('sismed_nav_recolhida',NAV_RECOLHIDA?'1':'0')}catch(e){}navRecolhidaAplicar()}
function navLigarRecolher(){const sn=$('sidenav');if(!sn)return;
  const t=$('nav-tg');if(t)t.onclick=e=>{e.stopPropagation();navRecolher(!NAV_RECOLHIDA)};
  if(!sn.dataset.recolherOk){sn.dataset.recolherOk='1';
    // barra recolhida: tocar num ícone abre a barra (e faz o que o botão faz — um grupo abre já mostrando os itens)
    sn.addEventListener('click',e=>{if(!NAV_RECOLHIDA||!matchMedia('(min-width:900px)').matches)return;const b=e.target.closest('button');
      if(!b||b.id==='nav-tg'||b.id==='nav-user')return;if(b.dataset.grupo)NAV_GRUPO[b.dataset.grupo]=false;navRecolher(false)},true)}
  navRecolhidaAplicar()}
const MIGALHA_SEP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
function migalhaAtualizar(){document.querySelectorAll('#sidenav [data-grupo]').forEach(b=>b.classList.toggle('atual',b.dataset.grupo===PAGE));   // barra recolhida: o grupo da página atual fica marcado
  const el=$('migalha');if(!el)return;let t='';
  try{t=PAGE==='sup'?supRotulo():PAGE==='cfg'?cfgRotulo():PAGE==='rel'?relRotulo():(ABAS[PAGE]||'')}catch(e){t=ABAS[PAGE]||''}
  const p=String(t||'').split(' › ').map(x=>x.trim()).filter(Boolean);
  el.innerHTML=p.map((x,i)=>`<span${i===p.length-1?' aria-current="page"':''}>${esc(x)}</span>`).join(MIGALHA_SEP);
  try{topoCel(p)}catch(e){}try{fvDocaNav()}catch(e){}}

/* =================== v3.0.0: FORMATO DO BM — V1 (anterior) ou V2 (atual) ===================
   No alto da janela do BM: "Formato de BM". V1 = boletim e PDF como até a v2.9.13 (paisagem); V2 = boletim e PDF novos (retrato).
   No rascunho, a escolha vale para o BM: ao fechar, o BM guarda o formato (b.formato) e o PDF sai sempre nele. Num BM já fechado,
   a escolha muda só a visualização e o PDF daquela vez — o formato gravado não muda. BM antigo (sem formato gravado) = V1.
   A última escolha fica guardada neste aparelho e é a sugestão do próximo rascunho. Os valores são os mesmos nos dois formatos. */
let BMFMT='v2';
const BMFMT_NOME={v1:'V1 · anterior',v2:'V2 · atual'};
function bmFmtPref(){try{const v=localStorage.getItem('sismed_bm_formato');return v==='v1'?'v1':'v2'}catch(e){return 'v2'}}
function bmFmtDe(b){if(BM===b&&$('bm-modal').classList.contains('on'))return BMFMT;return b&&b.formato==='v2'?'v2':'v1'}
function bmPdfFmt(b){return bmFmtDe(b)==='v2'?bmPdfV2(b):bmPdf(b)}
function bmFmtHtml(b){const rasc=b.status==='rascunho',grav=b.formato==='v2'?'v2':'v1';
  const nota=rasc?'O BM é fechado neste formato — o PDF sai sempre nele. Os valores são os mesmos nos dois.'
    :grav===BMFMT?`Emitido no formato ${grav.toUpperCase()}.`:`Emitido no formato ${grav.toUpperCase()} — você está vendo em ${BMFMT.toUpperCase()}: muda só a visualização e o PDF desta vez.`;
  return `<div class="bm-fmt" role="group" aria-label="Formato de BM"><span class="bm-fmt-l">Formato de BM</span><span class="bm-fmt-seg">${['v1','v2'].map(f=>`<button type="button" data-fmt="${f}" aria-pressed="${BMFMT===f}">${BMFMT_NOME[f]}</button>`).join('')}</span><span class="bm-fmt-n" id="bm-fmt-n">${nota}</span></div>`}
function bmFmtLigar(b){document.querySelectorAll('#bm-body [data-fmt]').forEach(x=>x.onclick=()=>{const f=x.dataset.fmt==='v1'?'v1':'v2';if(f===BMFMT)return;BMFMT=f;
  if(b.status==='rascunho'){b.formato=f;try{localStorage.setItem('sismed_bm_formato',f)}catch(e){}}
  const sh=$('bm-modal').querySelector('.sheet'),st=sh?sh.scrollTop:0;renderBM();if(sh)sh.scrollTop=st;const n=document.querySelector(`#bm-body [data-fmt="${f}"]`);if(n)n.focus()})}
function bmCap(s){s=String(s||'').toLowerCase();return s.charAt(0).toUpperCase()+s.slice(1)}
function bmModV2(b){return bmPed(b)?'Pedido nº '+(b.pedido||'—'):b.contratoNumero&&b.contratoNumero!=='sem contrato'?'Contrato '+b.contratoNumero:'Sem contrato'}
/* V2 na tela: documento com cabeçalho, dados, indicadores, itens desta medição, contrato (acumulado e saldo), resumo, valores e assinaturas */
function bmDocV2(b){
  const K=bmK(b),E=emp(b.empresaId),isDraft=b.status==='rascunho',ped=bmPed(b),anyCt=!ped&&b.itens.some(i=>i.qtdCt!==null);
  const tot=k=>b.itens.reduce((s,i)=>s+(i[k]||0),0),TG=tercGrupos(bmRegs(b));
  const mes=parse(b.ini).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
  const totCt=tot('totalCt'),acum=tot('totAcVal');
  const dot=t=>`<i class="bm2-dot ${esc(t)}" aria-hidden="true"></i>`;
  const pedCel=isDraft&&can('sup.bm')?`<input id="bm-ped-ed" class="mono" maxlength="20" value="${esc(b.pedido||'')}" style="text-transform:uppercase" aria-label="Nº do pedido">`:`<b class="mono">${esc(b.pedido||'—')}</b>`;
  const meta=[['Empresa',`<b>${esc(b.empresaNome)}</b>`,b.empresaCnpj?'CNPJ '+esc(b.empresaCnpj):''],['Contratada (restaurante)',`<b>${esc(K.nome||'—')}</b>`,K.cnpj?'CNPJ '+esc(K.cnpj):''],
    ['Obra',`<b>${esc(b.obraNome||'—')}</b>`,''],[ped?'Pedido':'Contrato',ped?pedCel:`<b class="mono">${esc(b.contratoNumero||'—')}</b>`,ped?'preços da Tabela geral':''],
    ['Gestor / Engenheiro',K.gestor?`<b>${esc(K.gestor)}</b>`:`<span class="pill warn">${bmObraId(b)?'não cadastrado na obra':'não informado'}</span>`,esc(K.cargo||'')],['Emissão',`<b>${esc(b.usuario||'—')}</b>`,brdt(b.emitidoEm)]];
  const itens=`<table class="bm2-t" data-sem-ord><thead><tr><th>Item</th><th>Descrição</th><th class="c">Unid</th><th class="r">Preço unit.</th><th class="r">Quantidade</th><th class="r">Valor desta medição</th></tr></thead><tbody>
    ${b.itens.map(i=>`<tr><td class="num">${esc(i.item)}</td><td>${dot(i.tipo)}${tipo(i.tipo).curto}</td><td class="c">un</td><td class="r num">${i.preco===null?'—':money(i.preco)}</td><td class="r num"><b>${num(i.atualQtd)}</b></td><td class="r num"><b>${money(i.atualVal)}</b></td></tr>`).join('')}
    <tr class="tot"><td colspan="4">Total desta medição</td><td class="r num">${num(tot('atualQtd'))}</td><td class="r num">${money(tot('atualVal'))}</td></tr></tbody></table>`;
  const ctTab=ped?'':`<h3 class="bm2-h">Contrato — acumulado e saldo${b.contratoNumero?` <span class="mono">${esc(b.contratoNumero)}</span>`:''}</h3>
    <div class="tablewrap"><table class="bm2-t" data-sem-ord><thead><tr><th>Item</th><th>Descrição</th>${anyCt?'<th class="r">Qtd contrato</th><th class="r">R$ contrato</th>':''}<th class="r">Acum. anterior</th><th class="r">Esta medição</th><th class="r">Total acum.</th>${anyCt?'<th class="r">Saldo</th>':''}<th class="r">R$ acum. anterior</th><th class="r">R$ acum. atual</th>${anyCt?'<th class="r">R$ saldo</th>':''}</tr></thead><tbody>
    ${b.itens.map(i=>`<tr><td class="num">${esc(i.item)}</td><td>${dot(i.tipo)}${tipo(i.tipo).curto}</td>${anyCt?`<td class="r num">${i.qtdCt===null?'—':num(i.qtdCt)}</td><td class="r num">${i.totalCt===null?'—':money(i.totalCt)}</td>`:''}<td class="r num">${num(i.acumQtd)}</td><td class="r num"><b>${num(i.atualQtd)}</b></td><td class="r num">${num(i.totAcQtd)}</td>${anyCt?`<td class="r num">${i.saldoQtd===null?'—':num(i.saldoQtd)}</td>`:''}<td class="r num">${money(i.acumVal)}</td><td class="r num">${money(i.totAcVal)}</td>${anyCt?`<td class="r num">${i.saldoVal===null?'—':money(i.saldoVal)}</td>`:''}</tr>`).join('')}
    <tr class="tot"><td colspan="2">Total</td>${anyCt?`<td class="r num">${num(tot('qtdCt'))}</td><td class="r num">${money(totCt)}</td>`:''}<td class="r num">${num(tot('acumQtd'))}</td><td class="r num">${num(tot('atualQtd'))}</td><td class="r num">${num(tot('totAcQtd'))}</td>${anyCt?`<td class="r num">${num(tot('saldoQtd'))}</td>`:''}<td class="r num">${money(tot('acumVal'))}</td><td class="r num">${money(acum)}</td>${anyCt?`<td class="r num">${money(tot('saldoVal'))}</td>`:''}</tr></tbody></table></div>`;
  const resumo=(tit,lin,totLin)=>`<h3 class="bm2-h">${tit}</h3><div class="tablewrap"><table class="bm2-t" data-sem-ord><thead><tr><th>${tit==='Resumo por data'?'Data':tit==='Resumo por obra'?'Obra':'Empresa terceirizada'}</th>${TIPOS.map(t=>`<th class="r">${dot(t.id)}${t.curto}</th>`).join('')}<th class="r">Total</th><th class="r">Valor</th></tr></thead><tbody>${lin}${totLin||''}</tbody></table></div>`;
  const linhas=(l,rot)=>l.map(e=>`<tr><td class="num">${rot(e)}</td>${e.porTipo.map(n=>`<td class="r num">${esc(n||'–')}</td>`).join('')}<td class="r num"><b>${esc(e.total)}</b></td><td class="r num">${money(e.valor)}</td></tr>`).join('');
  const totDias=`<tr class="tot"><td>Total</td>${TIPOS.map((t,i)=>`<td class="r num">${b.dias.reduce((s,d)=>s+d.porTipo[i],0)}</td>`).join('')}<td class="r num">${esc(b.qtd)}</td><td class="r num">${money(b.valor)}</td></tr>`;
  const totTerc=`<tr class="tot"><td>Total terceirizados</td>${TIPOS.map((t,i)=>`<td class="r num">${TG.reduce((s,g)=>s+g.porTipo[i],0)}</td>`).join('')}<td class="r num">${TG.reduce((s,g)=>s+g.total,0)}</td><td class="r num">${money(TG.reduce((s,g)=>s+g.valor,0))}</td></tr>`;
  const ass=(papel,tit,a,nome,sub)=>`<div class="bm2-ass"><span class="bm2-ass-k">${tit}</span>${isDraft?'<div class="bm2-ass-pend">assina depois que o BM for fechado</div>':stampHtml(a,papel==='sup'?'Gestor / Engenheiro':'Restaurante',assId(b,papel))}<span class="bm2-ass-l" aria-hidden="true"></span><b>${nome}</b><span class="muted small">${sub}</span></div>`;
  return `<article class="bm2" aria-label="Boletim de Medição nº ${esc(b.numero)} — formato V2">
    <header class="bm2-hd">
      ${E&&logoOk(E.logo)?`<img class="bm2-lg" src="${esc(logoOk(E.logo))}" alt="Logotipo ${esc(E.nome)}">`:`<div class="bm2-lg vazio">logotipo da empresa<br>(Configurações › Empresas)</div>`}
      <div class="bm2-tt"><span class="bm2-eb">Boletim de Medição</span><h2>BM nº <span class="num">${esc(b.numero)}</span>${isDraft?' <span class="pill warn">rascunho</span>':''}</h2><span class="bm2-sub">${esc(bmCap(K.servico||'fornecimento de refeições'))} · ${esc(bmModV2(b))}</span></div>
      <dl class="bm2-per"><div><dt>Período</dt><dd class="num">${br(b.ini)} a ${br(b.fim)}</dd></div><div><dt>Referência</dt><dd>${esc(mes)}</dd></div></dl>
      <div class="bm2-dados">${meta.map(m=>`<div><span class="bm2-meta-k">${m[0]}</span><span class="bm2-meta-v">${m[1]}</span>${m[2]?`<span class="bm2-meta-s">${m[2]}</span>`:''}</div>`).join('')}</div>
    </header>
    <h3 class="bm2-h">Itens desta medição</h3><div class="tablewrap">${itens}</div>
    ${ctTab}
    <div class="bm2-cols">
      <div class="bm2-col">
        ${resumo('Resumo por data',linhas(b.dias,d=>`${wd(d.d)} ${br(d.d)}`),totDias)}
        ${b.sobrasQtd?`<div class="small muted" style="margin-top:6px">Inclui <b>${esc(b.sobrasQtd)}</b> refeições de sobras (${money(b.sobrasValor)}), cobradas pelo preço ${ped?'da Tabela geral':'do contrato da obra'}.</div>`:''}
        ${b.obras.length>1?resumo('Resumo por obra',linhas(b.obras,e=>esc(e.o||'—'))):''}
        ${TG.length?resumo('Terceirizados por empresa',linhas(TG,g=>esc(g.nome)),totTerc)+`<div class="small muted" style="margin-top:6px">Lançados manualmente (sem crachá). Já incluídos nos totais; o custo é de ${esc(b.empresaNome)}.</div>`:''}
      </div>
      <div class="bm2-col">
        <div class="bm2-fin">
          <div><span>Valor da medição</span><b class="num">${money(b.valor)}</b></div>
          <div><span>Deduções / descontos</span>${isDraft?`<input id="bm-ded" type="number" step="0.01" min="0" value="${esc(b.deducoes||0)}" class="num" aria-label="Deduções / descontos">`:`<b class="num">${money(b.deducoes)}</b>`}</div>
          <div><span>Adiantamentos e outros</span>${isDraft?`<input id="bm-adi" type="number" step="0.01" min="0" value="${esc(b.adiant||0)}" class="num" aria-label="Adiantamentos e outros">`:`<b class="num">${money(b.adiant)}</b>`}</div>
          <div><span>Total da fatura</span><b class="num">${money(b.liquido)}</b></div>
          <div class="liq"><span>Total líquido da medição</span><b class="num">${money(b.liquido)}</b></div>
        </div>
        <div class="field bm2-obs"><label for="bm-obs">Observações</label>${isDraft?`<textarea id="bm-obs" rows="3">${esc(b.obs||'')}</textarea>`:`<div class="small">${esc(b.obs||'—')}</div>`}</div>
        ${b.nf?`<div class="small" style="margin-top:8px">Nota fiscal: <b class="mono">${esc(b.nf)}</b></div>`:''}
      </div>
    </div>
    <h3 class="bm2-h">Assinaturas</h3>
    <div class="bm2-sig">
      ${ass('sup','Gestor / Engenheiro da obra',b.assSup,K.gestor?esc(K.gestor):`<span class="pill warn">Gestor / Engenheiro ${bmObraId(b)?'não cadastrado na obra':'não informado'}</span>`,`${esc(K.cargo||'Gestor / Engenheiro')} — ${esc(b.empresaNome)}`)}
      ${ass('rest','Restaurante (contratada)',b.assRest,esc(K.nome||'________________'),'Contratada')}
    </div>
    <footer class="bm2-rod">Emitido em ${brdt(b.emitidoEm)} por ${esc(b.usuario||'—')}${b.fechadoEm?` · fechado em ${brdt(b.fechadoEm)} por ${esc(b.fechadoPor||'—')}`:''} · formato V2</footer>
  </article>`}

/* V2 em PDF (v3.0.1): o BM em A4 DEITADO (paisagem) e a lista de colaboradores (anexo) em A4 EM PÉ (retrato).
   v3.0.2: empresa, contratada, obra, contrato, gestor e emissão no cabeçalho (sem quadros); sem os indicadores.
   v3.1.0: o BM inteiro numa página deitada, como no V1 — itens e contrato numa tabela só (colunas "desta medição" destacadas),
   resumo por data (nos períodos longos, em duas metades lado a lado), valores, obras/terceirizados e assinaturas.
   Antes de gerar, ensaia num rascunho do mais folgado ao mais compacto e fica com o primeiro que cabe numa página. */
const BMV2_NIV=[   // tf/tp: tabela principal (fonte/espaço) · rf/rp: resumos · g: espaço entre blocos · hg: depois do cabeçalho · k: escala dos valores
  {n:0,tf:8,  tp:1.45,hf:7,  rf:7.4,rp:1.2, g:7,  hg:7.5,k:1},
  {n:1,tf:7.6,tp:1.1, hf:6.8,rf:7,  rp:.95, g:6,  hg:6.5,k:.92},
  {n:2,tf:7.4,tp:1,   hf:6.7,rf:6.9,rp:.85, g:5.5,hg:6,  k:.9},
  {n:3,tf:7.2,tp:.85, hf:6.5,rf:6.7,rp:.75, g:5,  hg:5.5,k:.86},
  {n:4,tf:6.8,tp:.65, hf:6.2,rf:6.4,rp:.6,  g:4.5,hg:5,  k:.8},
  {n:5,tf:6.4,tp:.5,  hf:6,  rf:6,  rp:.45, g:4,  hg:4.5,k:.75},
  {n:6,tf:6.2,tp:.4,  hf:5.8,rf:5.8,rp:.35, g:3.5,hg:4,  k:.7, hc:true}];   // hc: cabeçalho mais baixo
const BMV2_COR={TEAL:[15,92,112],TEAL2:[18,78,94],INK:[23,33,43],INK2:[75,90,104],INK3:[95,108,120],LINE:[214,221,226],SOFT:[220,237,241],SURF2:[244,246,248],VERDE:[30,107,65],ATUAL:[232,243,246],ATUAL_H:[196,224,231],
  TIPO:{cafe:[138,90,43],almoco:[15,92,112],jantar:[79,63,138],lanche:[94,107,26]}};
function bmPdfV2(b){
  const {jsPDF}=window.jspdf;
  // páginas novas (também as que a tabela abre sozinha) saem na orientação da parte atual: BM deitado, lista em pé
  const novo=()=>{const d=new jsPDF({orientation:'landscape',unit:'mm',format:'a4',compress:true});d.__ori='landscape';const ad=d.addPage.bind(d);d.addPage=function(f,o){return ad(f||'a4',o||d.__ori)};return d};
  // ordem de preferência: cada nível inteiro; nos períodos de 8 dias ou mais, também com o resumo por data em 2 metades (sp)
  const cand=[];BMV2_NIV.forEach(v=>{cand.push({...v,sp:false});if(b.dias.length>=8&&v.n>=1)cand.push({...v,sp:true})});
  let D=cand[cand.length-1];
  for(const v of cand){if(bmV2Pagina(novo(),b,v)===1){D=v;break}}   // ensaio: o primeiro nível que cabe numa página
  const doc=novo();bmV2Pagina(doc,b,D);const pagBM=doc.internal.getNumberOfPages();doc.__nivel=D.n;
  const {TEAL,TEAL2,INK,INK2,INK3,LINE,SOFT,SURF2}=BMV2_COR;const COR=BMV2_COR.TIPO;
  const font=(st,sz,c)=>{doc.setFont('helvetica',st);doc.setFontSize(sz);doc.setTextColor(...(c||INK))};
  const txt=(t,x,yy,o)=>doc.text(t,x,yy,o||{});
  const W=297,H=210,M=12,rasc=b.status==='rascunho';
  // ---- anexo: lista de colaboradores por dia e refeição — A4 em pé
  const grupos=bmGrupos(b);
  if(grupos.length){doc.__ori='portrait';doc.addPage();const PW=210,PH=297,PM=14,PCW=PW-2*PM;let ly=PM+4;
    const base={theme:'plain',styles:{font:'helvetica',fontSize:7.5,cellPadding:{top:1.4,bottom:1.4,left:1.8,right:1.8},textColor:INK,lineColor:LINE,lineWidth:{bottom:.2}},headStyles:{fillColor:SOFT,textColor:TEAL2,fontStyle:'bold',fontSize:6.8,lineWidth:0}};
    font('bold',7.5,TEAL);txt('ANEXO · LISTA DE COLABORADORES',PM,ly);ly+=6.5;font('bold',14,INK);txt(doc.splitTextToSize(`BM nº ${b.numero} — ${b.empresaNome}`,PCW)[0],PM,ly);ly+=5;
    font('normal',7.5,INK2);const leg=doc.splitTextToSize(`Período ${br(b.ini)} a ${br(b.fim)} · ${grupos.reduce((s,x)=>s+x.total,0)} refeições · Assinatura digital = leitura do QR Code do crachá; "Retirada" = levada por outro colaborador; "Manual" = terceirizado sem crachá, lançado pelo restaurante; "Sobra" = preparada e não consumida, cobrada.`,PCW);txt(leg,PM,ly);ly+=leg.length*3.3+4;
    grupos.forEach((g,i)=>{if(ly>PH-42){doc.addPage();ly=PM+4}
      doc.setFillColor(...(COR[g.tipo.id]||TEAL));doc.circle(PM+1.6,ly+2.7,1.3,'F');font('bold',9.5,INK);txt(`${i+1}. ${wd(g.d)} ${br(g.d)} — ${g.tipo.curto}`,PM+5,ly+4);
      font('normal',8,INK3);txt(`${g.total} ${g.total===1?'refeição':'refeições'}`,PW-PM,ly+4,{align:'right'});
      doc.autoTable({...base,startY:ly+6,head:[['#','Colaborador','Obra','Assinatura digital']],
        body:listaLinhas(g.regs).map(l=>l.sub?[{content:`Terceirizada: ${l.sub} — ${l.n} ${l.n===1?'refeição':'refeições'}`,colSpan:4,styles:{fillColor:SURF2,fontStyle:'bold',fontSize:7.3,halign:'left'}}]:[String(l.i),l.r.nome,l.r.obraNome||'—',assinaturaTxt(l.r)]).concat(g.sobras.map((o,k)=>[String(g.regs.length+k+1),sobraLinha(o),o.obraNome||'—',sobraAssTxt(o)])),
        columnStyles:{0:{cellWidth:9,halign:'right'},1:{cellWidth:64},2:{cellWidth:44}},margin:{left:PM,right:PM,bottom:18}});
      ly=doc.lastAutoTable.finalY+7})}
  // ---- rodapé em todas as páginas (largura de cada página: deitada no BM, em pé na lista)
  const n=doc.internal.getNumberOfPages();
  for(let pg=1;pg<=n;pg++){doc.setPage(pg);const dei=pg<=pagBM,pw=dei?W:210,ph=dei?H:297,pm=dei?M:14;
    doc.setDrawColor(...LINE);doc.setLineWidth(.3);doc.line(pm,ph-10,pw-pm,ph-10);font('normal',6.8,INK3);
    txt(doc.splitTextToSize(`BM nº ${b.numero} — ${b.empresaNome}${b.obraNome?' · '+b.obraNome:''}${bmPed(b)?' · pedido nº '+(b.pedido||'—'):''}${rasc?' · RASCUNHO':''}${dei?'':' · lista de colaboradores'}`,pw-2*pm-36)[0],pm,ph-6);
    txt(`Formato V2 · página ${pg} de ${n}`,pw-pm,ph-6,{align:'right'})}
  return doc;
}
/* desenha o BM (sem o anexo e sem o rodapé) no nível de compactação D; devolve quantas páginas usou */
function bmV2Pagina(doc,b,D){
  const W=297,H=210,M=12,CW=W-2*M;let y=M;
  const K=bmK(b),E=emp(b.empresaId),ped=bmPed(b),anyCt=!ped&&b.itens.some(i=>i.qtdCt!==null),rasc=b.status==='rascunho';
  const tot=k=>b.itens.reduce((s,i)=>s+(i[k]||0),0);
  const {TEAL,TEAL2,INK,INK2,INK3,LINE,SOFT,SURF2,VERDE,ATUAL,ATUAL_H}=BMV2_COR;const COR=BMV2_COR.TIPO;
  const font=(st,sz,c)=>{doc.setFont('helvetica',st);doc.setFontSize(sz);doc.setTextColor(...(c||INK))};
  const txt=(t,x,yy,o)=>doc.text(t,x,yy,o||{});
  const pgAt=()=>doc.internal.getCurrentPageInfo().pageNumber;
  const mes=parse(b.ini).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
  // ---- cabeçalho
  let x=M;
  const z=D.hc?.8:1,yT=3.2+8.4*z,yS=yT+5.8*z;   // z: cabeçalho mais baixo só no último recurso
  if(E&&logoOk(E.logo)){try{const maxW=40*z,maxH=17*z;const ratio=(E.logoW||4)/(E.logoH||1);let w=maxW,h=w/ratio;if(h>maxH){h=maxH;w=h*ratio}
    doc.addImage(E.logo,E.logo.startsWith('data:image/jpeg')?'JPEG':'PNG',M,y+1,w,h);x=M+w+7}catch(e){}}
  font('bold',7.5,TEAL);txt('BOLETIM DE MEDIÇÃO',x,y+3.2);
  font('bold',21*z,INK);const tit='BM nº '+b.numero;txt(tit,x,y+yT);
  if(rasc){const tw=doc.getTextWidth(tit);doc.setFillColor(251,240,218);doc.roundedRect(x+tw+3,y+yT-5.3,22,6,3,3,'F');font('bold',7,[126,82,12]);txt('RASCUNHO',x+tw+14,y+yT-1.3,{align:'center'})}
  font('normal',9,INK2);txt(doc.splitTextToSize(bmCap(K.servico||'fornecimento de refeições')+' · '+bmModV2(b),W-M-x-70)[0],x,y+yS);
  font('bold',6.8,INK3);txt('PERÍODO',W-M,y+3.2,{align:'right'});font('bold',10,INK);txt(`${br(b.ini)} a ${br(b.fim)}`,W-M,y+3.2+4.8*z,{align:'right'});
  font('bold',6.8,INK3);txt('REFERÊNCIA',W-M,y+3.2+9.8*z,{align:'right'});font('normal',9,INK2);txt(mes,W-M,y+yS,{align:'right'});
  y+=yS+3.6;doc.setDrawColor(...LINE);doc.setLineWidth(.3);doc.line(M,y,W-M,y);y+=4.2;
  // ---- dados no próprio cabeçalho (v3.0.2: sem quadros e sem os indicadores)
  const cel=[['EMPRESA',b.empresaNome,b.empresaCnpj?'CNPJ '+b.empresaCnpj:''],['CONTRATADA (RESTAURANTE)',K.nome||'—',K.cnpj?'CNPJ '+K.cnpj:''],['OBRA',b.obraNome||'—',''],
    [ped?'PEDIDO':'CONTRATO',ped?(b.pedido||'—'):(b.contratoNumero||'—'),ped?'preços da Tabela geral':''],['GESTOR / ENGENHEIRO',K.gestor||'—',K.cargo||''],['EMISSÃO',b.usuario||'—',brdt(b.emitidoEm)]];
  const pes=[1.2,1.2,1.25,.75,1,.85],sp=pes.reduce((a,v)=>a+v,0);let cx=M;
  const cols=cel.map((c,i)=>{const w=CW*pes[i]/sp,pl=i?3.2:0,tw=w-pl-2.5;font('bold',8.6,INK);const v=doc.splitTextToSize(String(c[1]),tw).slice(0,2);
    font('normal',6.8,INK2);const s=c[2]?doc.splitTextToSize(String(c[2]),tw)[0]:'';const o={c,x:cx,w,pl,v,s};cx+=w;return o});
  const chH=Math.max(...cols.map(o=>4.7+o.v.length*3.9+(o.s?3.6:0)));
  cols.forEach((o,i)=>{const tx=o.x+o.pl;if(i){doc.setDrawColor(...LINE);doc.setLineWidth(.25);doc.line(o.x,y-.6,o.x,y+chH-1.6)}
    font('bold',6.1,INK3);txt(o.c[0],tx,y+2.4);font('bold',8.6,INK);txt(o.v,tx,y+6.6);
    if(o.s){font('normal',6.8,INK2);txt(o.s,tx,y+6.6+o.v.length*3.9-.4)}});
  y+=chH+1.6;doc.setDrawColor(...TEAL);doc.setLineWidth(.8);doc.line(M,y,W-M,y);y+=D.hg;
  // ---- estilo das tabelas
  const base={theme:'plain',styles:{font:'helvetica',fontSize:D.tf,cellPadding:{top:D.tp,bottom:D.tp,left:2,right:2},textColor:INK,lineColor:LINE,lineWidth:{bottom:.2}},
    headStyles:{fillColor:SOFT,textColor:TEAL2,fontStyle:'bold',fontSize:D.hf,lineWidth:0},margin:{left:M,right:M,bottom:16}};
  const titulo=(t,xx,yy)=>{font('bold',D.k<.9?7.6:8.3,TEAL);txt(t.toUpperCase(),xx,yy)};
  const totLin=(d,n)=>{if(d.section==='body'&&d.row.index===n-1){d.cell.styles.fontStyle='bold';d.cell.styles.fillColor=SURF2}};
  const tps=b.itens.map(i=>i.tipo);
  const ponto=d=>{if(d.section==='body'&&d.column.index===1&&d.row.index<tps.length){doc.setFillColor(...(COR[tps[d.row.index]]||TEAL));doc.circle(d.cell.x+2.9,d.cell.y+d.cell.height/2,1.05,'F')}};
  // ---- itens da medição: no contrato, a mesma tabela traz o acumulado e o saldo (como no V1); no pedido, só os itens, com os valores ao lado
  let head,body;const AT=new Set();
  if(ped){head=['Item','Descrição','Unid','Preço unit.','Quantidade','Valor desta medição'];
    body=b.itens.map(i=>[i.item,tipo(i.tipo).curto,'un',i.preco===null?'—':money(i.preco),num(i.atualQtd),money(i.atualVal)]).concat([['','Total desta medição','','',num(tot('atualQtd')),money(tot('atualVal'))]]);AT.add(4).add(5)}
  else{head=['Item','Descrição','Unid','Preço unit.'].concat(anyCt?['Qtd contrato','R$ contrato']:[]).concat(['Acum. anterior','Esta medição','Total acum.']).concat(anyCt?['Saldo']:[]).concat(['R$ acum. anterior','R$ desta medição','R$ acum. atual']).concat(anyCt?['R$ saldo']:[]);
    body=b.itens.map(i=>[i.item,tipo(i.tipo).curto,'un',i.preco===null?'—':money(i.preco)].concat(anyCt?[i.qtdCt===null?'—':num(i.qtdCt),i.totalCt===null?'—':money(i.totalCt)]:[]).concat([num(i.acumQtd),num(i.atualQtd),num(i.totAcQtd)]).concat(anyCt?[i.saldoQtd===null?'—':num(i.saldoQtd)]:[]).concat([money(i.acumVal),money(i.atualVal),money(i.totAcVal)]).concat(anyCt?[i.saldoVal===null?'—':money(i.saldoVal)]:[]))
      .concat([['','Total','',''].concat(anyCt?[num(tot('qtdCt')),money(tot('totalCt'))]:[]).concat([num(tot('acumQtd')),num(tot('atualQtd')),num(tot('totAcQtd'))]).concat(anyCt?[num(tot('saldoQtd'))]:[]).concat([money(tot('acumVal')),money(tot('atualVal')),money(tot('totAcVal'))]).concat(anyCt?[money(tot('saldoVal'))]:[])]);
    AT.add(head.indexOf('Esta medição')).add(head.indexOf('R$ desta medição'))}
  const LW=172,RXp=M+LW+9,RWp=W-M-RXp;   // pedido: tabela à esquerda e valores à direita
  const yIt=y,pgIt=pgAt();
  titulo(ped?'Itens desta medição':'Itens desta medição — contrato'+(b.contratoNumero&&b.contratoNumero!=='sem contrato'?' '+b.contratoNumero:'')+': acumulado e saldo',M,y);
  doc.autoTable({...base,startY:y+2.2,head:[head],body,...(ped?{tableWidth:LW,margin:{...base.margin,right:W-M-LW}}:{}),columnStyles:{0:{cellWidth:ped?14:11},2:{cellWidth:ped?14:10}},
    didParseCell:d=>{const c=d.column.index;if(c>=3)d.cell.styles.halign='right';if(c===2)d.cell.styles.halign='center';
      if(AT.has(c)){if(d.section==='head')d.cell.styles.fillColor=ATUAL_H;else if(d.row.index<body.length-1)d.cell.styles.fillColor=ATUAL}
      totLin(d,body.length);if(AT.has(c)&&d.section==='body'&&d.row.index===body.length-1)d.cell.styles.fillColor=ATUAL_H;
      if(d.section==='body'&&c===1&&d.row.index<tps.length)d.cell.styles.cellPadding={top:D.tp,bottom:D.tp,right:2,left:6}},didDrawCell:ponto});
  const fimT={y:doc.lastAutoTable.finalY,pg:pgAt()};
  // ---- valores (total líquido em destaque) e observações
  const valores=(xx,yy,ww)=>{const k=D.k,hB=44.5*k;let f=yy;
    doc.setFillColor(...SURF2);doc.roundedRect(xx,f,ww,hB,2.5,2.5,'F');f+=6.6*k;
    const ln=(t,v)=>{font('normal',7.8*Math.max(k,.9),INK2);txt(t,xx+4,f);font('normal',8.6*Math.max(k,.9),INK);txt(v,xx+ww-4,f,{align:'right'});f+=5.8*k};
    ln('Valor da medição',money(b.valor));ln('Deduções / descontos',money(b.deducoes||0));ln('Adiantamentos e outros',money(b.adiant||0));ln('Total da fatura',money(b.liquido));
    doc.setDrawColor(...LINE);doc.setLineWidth(.3);doc.line(xx+4,f-2.8*k,xx+ww-4,f-2.8*k);f+=2.2*k;font('bold',7,TEAL);txt('TOTAL LÍQUIDO DA MEDIÇÃO',xx+4,f);font('bold',17*Math.max(k,.85),INK);txt(money(b.liquido),xx+ww-4,f+8.5*k,{align:'right'});
    f=yy+hB+5*k;
    const obs=[b.obs,b.sobrasQtd?`Inclui ${b.sobrasQtd} refeições de sobras (${money(b.sobrasValor)}).`:''].filter(Boolean).join(' · ');
    if(obs){font('bold',6.8,INK3);txt('OBSERVAÇÕES',xx,f);f+=3.8;font('normal',7.8,INK2);const ol=doc.splitTextToSize(obs,ww).slice(0,D.n>=3?3:5);txt(ol,xx,f);f+=(ol.length-1)*3.4+1.5}
    if(b.nf){f+=2.5;font('bold',8,INK);txt('Nota fiscal: '+b.nf,xx,f);f+=1.5}
    return f};
  // ---- colunas da parte de baixo: resumo por data à esquerda (2 metades nos períodos longos) e valores à direita
  const SP=!!D.sp,RW=SP?96:114,RX=W-M-RW,LA=RX-9-M,RL=SP?(LA-5)/2:150;
  let y0=fimT.y+D.g,pg0=fimT.pg;
  let colR=null;
  if(ped){doc.setPage(pgIt);const fv=valores(RXp,yIt-2.2,RWp);doc.setPage(fimT.pg);if(pgIt===fimT.pg)y0=Math.max(y0,fv+D.g)}
  if(y0>H-55){doc.addPage();y0=M+6;pg0=pgAt()}
  if(!ped){doc.setPage(pg0);colR={x:RX,w:RW,y:valores(RX,y0-2.2,RW),pg:pg0}}
  else colR={x:RX,w:RW,y:y0-D.g,pg:pg0};   // no pedido a coluna da direita começa vazia
  const resumo=(t,cab,lin,temTot,xx,ww,yy)=>{if(t)titulo(t,xx,yy);
    doc.autoTable({...base,styles:{...base.styles,fontSize:D.rf,cellPadding:{top:D.rp,bottom:D.rp,left:1.6,right:1.6}},headStyles:{...base.headStyles,fontSize:D.hf-.2},startY:yy+2.2,head:[[cab].concat(TIPOS.map(t=>t.curto)).concat(['Total','Valor'])],body:lin,tableWidth:ww,margin:{left:xx,right:W-xx-ww,bottom:16},
      didParseCell:d=>{if(d.column.index>0)d.cell.styles.halign='right';if(temTot)totLin(d,lin.length)}});
    return {y:doc.lastAutoTable.finalY,pg:pgAt()}};
  const dl=d=>[`${wd(d.d)} ${SP?br(d.d).slice(0,5):br(d.d)}`].concat(d.porTipo.map(n=>n||'–')).concat([String(d.total),money(d.valor)]);
  const totD=['Total'].concat(TIPOS.map((t,i)=>String(b.dias.reduce((s,d)=>s+d.porTipo[i],0)))).concat([String(b.qtd),money(b.valor)]);
  const antes=(a,c)=>a.pg<c.pg||(a.pg===c.pg&&a.y<=c.y);
  doc.setPage(pg0);let colsE;   // colunas onde cabem as tabelas extras (obras e terceirizados)
  if(SP){const n1=Math.ceil(b.dias.length/2);
    const r1=resumo('Resumo por data','Data',b.dias.slice(0,n1).map(dl),false,M,RL,y0);doc.setPage(pg0);
    const r2=resumo('','Data',b.dias.slice(n1).map(dl).concat([totD]),true,M+RL+5,RL,y0);
    const r=antes(r1,r2)?r2:r1;colsE=[{x:M,w:LA,y:r.y,pg:r.pg},colR]}   // as metades são estreitas para as outras tabelas: elas vão embaixo das duas
  else{const r=resumo('Resumo por data','Data',b.dias.map(dl).concat([totD]),true,M,RL,y0);colsE=[{x:M,w:RL,y:r.y,pg:r.pg},colR]}
  // ---- obras e terceirizados: cada um na coluna que estiver mais curta 
  const TGp=tercGrupos(bmRegs(b));const extra=[];
  if(b.obras.length>1)extra.push(['Resumo por obra','Obra',b.obras.map(e=>[e.o||'—'].concat(e.porTipo.map(n=>n||'–')).concat([String(e.total),money(e.valor)])),false]);
  if(TGp.length)extra.push(['Terceirizados (já nos totais)','Empresa',TGp.map(g=>[g.nome].concat(g.porTipo.map(n=>n||'–')).concat([String(g.total),money(g.valor)]))
    .concat([['Total'].concat(TIPOS.map((t,i)=>String(TGp.reduce((s,g)=>s+g.porTipo[i],0)))).concat([String(TGp.reduce((s,g)=>s+g.total,0)),money(TGp.reduce((s,g)=>s+g.valor,0))])]),true]);
  const curta=()=>colsE.reduce((a,c)=>antes(c,a)?c:a),longa=()=>colsE.reduce((a,c)=>antes(a,c)?c:a);
  extra.forEach(([t,cab,lin,temTot])=>{const c=curta();doc.setPage(c.pg);const ww=Math.min(c.w,150);const r=resumo(t,cab,lin,temTot,c.x,ww,c.y+D.g);c.y=r.y;c.pg=r.pg});
  const fim=longa();
  doc.setPage(fim.pg);
  // ---- assinaturas (o carimbo traz o ID, igual ao V1)
  const detLin=a=>{doc.setFont('helvetica','normal');doc.setFontSize(6.5);return doc.splitTextToSize(`${a.usuario} · ${brdt(a.em)}${a.tipo==='fisica'?' · homologado por '+a.por:''}`,84).slice(0,2)};
  const altCar=(a,papel)=>rasc?0:!a?5:8.5+detLin(a).length*3+(assId(b,papel)?4:0);
  const hEsp=Math.max(altCar(b.assSup,'sup'),altCar(b.assRest,'rest'),D.n>=4?14:16);   // espaço para a assinatura no papel, mesmo sem carimbo
  let sy=fim.y+D.g+(D.hc?3:5)+hEsp;
  if(sy>H-26){doc.addPage();sy=M+14+hEsp}
  titulo('Assinaturas',M,sy-hEsp-4);
  const stamp=(a,cx,who,papel)=>{if(rasc)return;if(!a){font('normal',7,[150,150,150]);txt(`aguardando assinatura — ${who}`,cx,sy-4,{align:'center'});return}
    const id=assId(b,papel),det=detLin(a),h=8.5+det.length*3+(id?4:0),top=sy-2.5-h;
    doc.setDrawColor(...VERDE);doc.setLineWidth(.5);doc.roundedRect(cx-45,top,90,h,1.5,1.5);font('bold',8,VERDE);
    txt(a.tipo==='eletronica'?'ASSINADO ELETRONICAMENTE':'ASSINATURA FÍSICA HOMOLOGADA',cx,top+4.5,{align:'center'});font('normal',6.5,VERDE);
    det.forEach((t,i)=>txt(t,cx,top+8.5+i*3,{align:'center'}));
    if(id){doc.setFont('courier','bold');doc.setFontSize(8);txt('ID '+id,cx,top+9.2+det.length*3,{align:'center'})}};
  const lx=M+CW/4,rx=M+CW*3/4;
  stamp(b.assSup,lx,'Gestor / Engenheiro','sup');stamp(b.assRest,rx,'Restaurante','rest');
  doc.setDrawColor(...INK);doc.setLineWidth(.3);doc.line(lx-52,sy,lx+52,sy);doc.line(rx-52,sy,rx+52,sy);
  font('bold',8.5,INK);txt(K.gestor||'',lx,sy+4.3,{align:'center'});txt(K.nome||'',rx,sy+4.3,{align:'center'});
  font('normal',7.5,INK2);txt(doc.splitTextToSize(`${K.cargo||'Gestor / Engenheiro'} — ${b.empresaNome}`,104)[0],lx,sy+8.1,{align:'center'});txt('Contratada (restaurante)',rx,sy+8.1,{align:'center'});
  font('normal',7,INK3);txt(doc.splitTextToSize(`Emitido em ${brdt(b.emitidoEm)} por ${b.usuario}${rasc?' · RASCUNHO':b.fechadoEm?' · fechado em '+brdt(b.fechadoEm)+' por '+b.fechadoPor:''}`,CW)[0],M,Math.min(sy+13,H-13));
  return doc.internal.getNumberOfPages();
}

/* =================== v3.0.1: TELAS COMO NO "CAP-Refeições — Novo visual" (Claude Design) ===================
   Cabeçalho das páginas (sobretítulo + título), Registros (indicadores e tabela), Restaurante
   (cartões das refeições, QR / nome, atalhos, relógio), Fechamento (painel da foto ao lado), Emitir BM (passos + prévia),
   topo do celular com o nome da página. As regras e os dados não mudam. */

// ---- cabeçalho das páginas
const SUP_SUBS={reg:'Conferência das refeições do período e emissão do Boletim de Medição.',fech:'Confira cada dia da obra e valide. Depois de validado, nada entra nem sai — só a administração reabre, com justificativa.',
  sob:'Refeições preparadas e não consumidas, informadas pelo restaurante — são cobradas no BM.',bol:'Boletins de Medição emitidos: assinaturas, nota fiscal, anexos e PDF.'};
function phEb(h,eb){if(typeof h==='string')h=$(h);if(!h||!h.parentNode)return;let e=h.previousElementSibling;
  if(!e||!e.classList.contains('ph-eb')){e=document.createElement('span');e.className='ph-eb';h.parentNode.insertBefore(e,h)}e.textContent=eb||'';e.hidden=!eb}
function phRot(id,rot){const h=$(id);if(!h)return;const p=String(rot||'').split(' › ').map(s=>s.trim()).filter(Boolean);
  // v3.0.3 · v3.0.4: em todas as guias do Administrativo, só o título (sem "Administrativo" em cima e sem a frase embaixo)
  const so=id==='sup-titulo';
  h.textContent=p.length>1?p.slice(1).join(' › '):(p[0]||'');phEb(h,p.length>1&&!so?p[0]:'');
  if(id==='sup-titulo'){const s=$('sup-sub');if(s){s.textContent=so?'':SUP_SUBS[SUP_ABA]||SUP_SUBS.reg;s.hidden=so}}}
// topo do celular: o nome da página no lugar de "CAP-Refeições" (e a seção / o restaurante embaixo)
function topoCel(p){const h=document.querySelector('.topbar .brand h1');if(!h)return;let s=h.parentNode.querySelector('.brand-sub');
  if(!s){s=document.createElement('span');s.className='brand-sub';h.parentNode.appendChild(s)}
  let t=p.length?p[p.length-1]:'CAP-Refeições',sub=p.length>1?p[0]:'';if(PAGE==='rest'){t='Restaurante';sub=''}   // v3.0.2: sem o nome do restaurante
  h.textContent=t;s.textContent=sub;s.hidden=!sub;try{jgLogos()}catch(e){}}

// ---- Administrativo › Registros: tabela (v3.0.3: sem os indicadores)
let SUP_ULT=[];
const IC_FOTO='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/></svg>';
function supTabelaHtml(regs){SUP_ULT=regs;PREG=paginate('supRegs',regs,30);
  return `<thead><tr><th>Data</th><th>Colaborador</th><th>Empresa · obra</th><th>Restaurante</th><th>Tipo</th><th class="r">Valor</th><th>Foto</th><th>Registrado por</th><th>BM</th></tr></thead><tbody>${PREG.rows.map(supLinhaHtml).join('')||'<tr><td colspan="9" class="empty">Nenhum registro com esses filtros.</td></tr>'}</tbody>`}
function supLinhaHtml(r){const b=r.bmId?S.bms.find(x=>x.id===r.bmId):null,m=modOf(r);
  const sub=m==='retirada'?esc(retInfo(r)):m==='terceirizado'?'Terceirizado'+(r.terceirizada?' · '+esc(r.terceirizada):''):r.semQr?'Sem QR Code · escolhido pelo nome':r.retro?'Retroativo (em lote)':'QR Code · presencial';
  const tag=r.retro?' <span class="pill warn" title="registro retroativo (em lote)">retroativo</span>':r.dataManual?' <span class="pill warn" title="data informada manualmente">data manual</span>':'';
  const foto=r.foto&&can('fotos.ver')?`<button type="button" class="ic-btn" data-foto="${esc(r.id)}" aria-label="Ver a foto do registro de ${esc(r.nome)}" title="Foto, data e hora do registro">${IC_FOTO}</button>`
    :`<button type="button" class="lnk-btn${r.semFoto?' warn':''}" data-foto="${esc(r.id)}" title="Data, hora e detalhes do registro">${r.semFoto?'sem foto':'detalhes'}</button>`;
  const bm=b?`<button type="button" class="bm-pill num" data-vbm="${esc(b.id)}">BM ${esc(b.numero)}</button>`
    :r.fechado?`<div class="row" style="gap:6px"><span class="pill bad" title="${esc(r.fechado.motivo)}">fechada sem BM</span>${can('sup.fechar')?`<button class="btn sec sm" data-reabrir="${esc(r.id)}">Reabrir</button>`:''}</div><div class="small muted" style="margin-top:4px;max-width:210px">${esc(r.fechado.motivo)} — ${esc(r.fechado.por)}, ${brdt(r.fechado.em)}</div>`
    :`<div class="row" style="gap:6px;flex-wrap:nowrap"><span class="pill neutral">em aberto</span>${can('sup.fechar')?`<button class="btn sec sm" data-fechar="${esc(r.id)}">Fechar</button>`:''}</div>`;
  return `<tr><td class="num"><span class="t-dia" title="${br(r.data)}">${br(r.data).slice(0,5)}</span><small class="t-sub">${hm(r.registradoEm)}</small></td>`
    +`<td><div class="t-col"><span class="av-s${m==='terceirizado'?' terc':''}" aria-hidden="true">${ini(r.nome)}</span><div class="t-col-t"><b>${esc(r.nome)}</b>${tag}<small class="t-sub">${sub}</small></div></div></td>`
    +`<td><div>${esc(r.empresaNome)}</div><small class="t-sub">${esc(r.obraNome||'—')}${regCorrPill(r)}${regEdBtn(r)}</small></td>`
    +`<td class="t-mut">${esc((ct(ctOf(r))||{}).nome||r.contratadaNome||'—')}</td><td><span class="pill ${r.tipo} pill-dot">${tipo(r.tipo).curto}</span></td><td class="r num">${money(r.valor)}</td><td>${foto}</td><td class="t-mut">${esc(r.usuario)}</td><td>${bm}${!b&&regExcPode()?`<button type="button" class="lnk-btn reg-exc" data-rexc="${esc(r.id)}" title="Excluir este registro (com justificativa)" aria-label="Excluir o registro de ${esc(r.nome)} de ${br(r.data)}">Excluir</button>`:''}</td></tr>`}   // v3.1.1: excluir registro avulso
// ---- Restaurante: cartões das refeições de hoje, QR / nome, atalhos e "hoje" (v3.0.2: sem relógio, data e nome do restaurante no cabeçalho)
let REST_HOJE={regs:[],sob:[]};
function restCabecalho(RC){restLigar()}
function restTipos(regs,sob){REST_HOJE={regs,sob};restTiposAtualizar();restHoje()}
function restTiposAtualizar(){const el=$('rest-tipos');if(!el||!S)return;const {regs,sob}=REST_HOJE,d=new Date(),agora=`${pad(d.getHours())}:${pad(d.getMinutes())}`;
  el.innerHTML=TIPOS.map(t=>{const l=regs.filter(r=>r.tipo===t.id),so=sob.filter(s=>s.tipo===t.id),n=l.length+so.reduce((a,s)=>a+(+s.qtd||0),0),v=l.reduce((a,r)=>a+(+r.valor||0),0)+so.reduce((a,s)=>a+sobraTotal(s),0);
    const c=janela(t.id),livre=!horarioErro(t.id);const cls=!c?'livre':livre?'agora':agora<c.ini?'antes':'fim';
    return `<div class="rt-card ${t.id} ${cls}" role="listitem"><span class="rt-n">${t.id==='cafe'?'Café da manhã':t.curto}${cls==='agora'?'<span class="rt-agora">agora</span>':''}</span><span class="rt-q"><b class="num">${num(n)}</b> hoje · <span class="num">${money(v)}</span></span></div>`}).join('')}
function restHoje(){const el=$('rest-hoje-st');if(!el)return;const {regs,sob}=REST_HOJE;
  const n=regs.length+sob.reduce((a,s)=>a+(+s.qtd||0),0),v=regs.reduce((a,r)=>a+(+r.valor||0),0)+sob.reduce((a,s)=>a+sobraTotal(s),0);
  el.innerHTML=`<div><span>Refeições hoje</span><b class="num">${num(n)}</b></div><div><span>Valor hoje</span><b class="num">${money(v)}</b></div><div><span>Envio</span><b data-envio></b></div>`;restEnvio();restAtalhosSync()}
function restEnvio(){document.querySelectorAll('[data-envio]').forEach(e=>{const c=(SYNCST&&SYNCST.c)||'sync';e.className=c.includes('off')?'off':c.includes('pend')?'pend':'ok';e.textContent=c.includes('off')?'sem internet':c.includes('pend')?'enviando…':'em dia'})}
function restModosSync(){const q=$('rm-qr'),n=$('rm-nome'),c=$('semqr-check');if(!q||!n||!c)return;const sem=!!c.checked;
  q.setAttribute('aria-selected',String(!sem));n.setAttribute('aria-selected',String(sem));q.classList.toggle('on',!sem);n.classList.toggle('on',sem);n.hidden=c.disabled;q.tabIndex=sem?-1:0;n.tabIndex=sem?0:-1}
function restModo(sem){const c=$('semqr-check');if(!c||c.disabled||c.checked===sem)return;c.checked=sem;if(c.onchange)c.onchange();restModosSync()}
function restAtalho(m){const b=document.querySelector(`#m-mod [data-m="${m}"]`);if(!b||b.hidden)return;if(MMOD!==m)b.click();const c=$('manual-card');if(c&&c.scrollIntoView)c.scrollIntoView({behavior:'smooth',block:'start'})}
function restRetro(){const c=$('retro-card'),b=$('rt-novo');if(!c||c.hidden||!b)return;if(b.getAttribute('aria-expanded')!=='true')b.click();if(c.scrollIntoView)c.scrollIntoView({behavior:'smooth',block:'start'})}
function restAtalhosSync(){[['ra-terc','terceirizado'],['ra-ret','retirada'],['ra-sob','sobras']].forEach(([id,m])=>{const a=$(id),b=document.querySelector(`#m-mod [data-m="${m}"]`);if(a)a.hidden=!b||b.hidden});
  const r=$('ra-retro'),rc=$('retro-card');if(r)r.hidden=!rc||rc.hidden;const ac=document.querySelector('.rest-acoes');if(ac)ac.hidden=[...ac.querySelectorAll('button')].every(x=>x.hidden)}
function restLigar(){const q=$('rm-qr');if(!q||q.dataset.ok)return;q.dataset.ok='1';
  q.onclick=()=>restModo(false);$('rm-nome').onclick=()=>restModo(true);
  [q,$('rm-nome')].forEach(t=>t.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const o=t===q?$('rm-nome'):q;if(!o.hidden){o.click();o.focus()}}});
  $('ra-terc').onclick=()=>restAtalho('terceirizado');$('ra-ret').onclick=()=>restAtalho('retirada');$('ra-sob').onclick=()=>restAtalho('sobras');$('ra-retro').onclick=restRetro;
  restModosSync()}

// ---- Fechamento: semana (barra de dias) e a foto / detalhes num painel ao lado (computador largo)
let FV_DOCA_AGORA=false,FV_SHEET=null;
function fchProgresso(dias){const el=$('fch-prog'),det=$('fch-det');if(det)det.hidden=!dias;if(!el)return;if(!dias){el.hidden=true;el.innerHTML='';return}
  const fim=WK_FIM||addDays(WK,6),h=today(),SO=FECH_SEL.obra,SC=FECH_SEL.ct,tem=new Set(dias),L=[];
  for(let d=WK;d<=fim&&L.length<62;d=addDays(d,1)){const v=diaValidadoUn(d,SO,SC);L.push({d,c:v?'ok':d>h?'fut':d===h?'hoje':tem.has(d)?'pend':'vazio'})}
  const nv=L.filter(x=>x.c==='ok').length,nt=L.filter(x=>x.c==='ok'||x.c==='pend').length;
  el.hidden=false;el.innerHTML=`<div class="fch-prog-t"><span class="num">${br(WK).slice(0,5)} – ${br(fim).slice(0,5)}</span><b>${nv} de ${nt} ${nt===1?'dia validado':'dias validados'}</b></div><div class="fch-prog-b" role="img" aria-label="${nv} de ${nt} dias validados">${L.map(x=>`<i class="${x.c}" title="${wd(x.d)} ${br(x.d).slice(0,5)} — ${({ok:'validado',pend:'aguardando validação',hoje:'hoje',fut:'ainda não chegou',vazio:'sem refeições'})[x.c]}"></i>`).join('')}</div>`}
function fchDocaPode(){const a=$('fch-det');return !!a&&!a.hidden&&PAGE==='sup'&&SUP_ABA==='fech'&&matchMedia('(min-width:1200px)').matches&&a.offsetParent!==null}
function fvDocar(sim){const md=$('fv-modal');if(!md)return;if(!FV_SHEET)FV_SHEET=md.querySelector('.sheet')||document.querySelector('#fch-det .sheet');if(!FV_SHEET)return;const a=$('fch-det');
  if(sim&&a){if(FV_SHEET.parentNode!==a)a.appendChild(FV_SHEET);a.classList.add('com');document.body.classList.add('fv-doca')}
  else{if(FV_SHEET.parentNode!==md)md.appendChild(FV_SHEET);if(a)a.classList.remove('com');if(document.body.classList.contains('fv-doca')){document.body.classList.remove('fv-doca');md.classList.remove('on')}}}
function fvDocaNav(){if(!(PAGE==='sup'&&SUP_ABA==='fech'))fvDocar(false)}
addEventListener('resize',()=>{if(document.body.classList.contains('fv-doca')&&!fchDocaPode())fvDocar(false)});

// ---- Emitir BM: passos à esquerda e a prévia do boletim à direita (no formato escolhido)
let BMX_TMP=null;
function bmxPrevia(){const doc=$('bmx-doc'),go=$('bm-emit-go'),pdf=$('bmx-pdf');if(!doc||!go)return;const f=bmFmtPref();
  document.querySelectorAll('#bmx-fmt [data-xfmt]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.xfmt===f)));
  const e=bmEscolha();BMX_TMP=null;
  if(go.disabled||!e.ctId||!e.obraId||!e.cid){doc.innerHTML='<div class="bmx-vazio">Complete a obra, a modalidade e o período para ver a prévia do boletim.</div>';go.textContent='Gerar BM com este período';if(pdf)pdf.disabled=true;return}
  let nb;try{nb=buildBM(e.ini,e.fim,e.empId,e.ctId,e.obraId,e.cid,e.pedido)}catch(err){doc.innerHTML='';return}
  nb.liquido=nb.valor;BMX_TMP=nb;doc.innerHTML=f==='v2'?bmDocV2(nb):bmDocV1(nb);
  doc.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));doc.querySelectorAll('label[for]').forEach(x=>x.removeAttribute('for'));
  doc.querySelectorAll('input,textarea,select,button').forEach(x=>{x.disabled=true;x.tabIndex=-1});
  go.textContent=`Gerar BM nº ${nb.numero} · ${money(nb.valor)}`;if(pdf)pdf.disabled=false}
document.querySelectorAll('#bmx-fmt [data-xfmt]').forEach(b=>b.onclick=()=>{try{localStorage.setItem('sismed_bm_formato',b.dataset.xfmt==='v1'?'v1':'v2')}catch(e){}bmxPrevia()});
{const p=$('bmx-pdf');if(p)p.onclick=()=>{const nb=BMX_TMP;if(!nb)return;if(!pdfPronto())return;
  const f=bmFmtPref();audit('bm.previa_pdf',`Prévia do BM ${esc(nb.numero)} — ${nb.empresaNome} — ${nb.obraNome} — ${br(nb.ini)} à ${br(nb.fim)} — formato ${f.toUpperCase()}`,{empresa:nb.empresaNome,obra:nb.obraNome});save();
  try{(f==='v2'?bmPdfV2(nb):bmPdf(nb)).save('previa-'+bmNomeArq(nb));sucesso('Prévia do BM baixada (PDF)')}catch(e){toast('Falha ao gerar o PDF','bad')}}}
// prévia some quando a janela de emissão fecha (não deixa um segundo boletim escondido na página)
{const m=$('emp-modal');if(m&&window.MutationObserver)new MutationObserver(()=>{if(!m.classList.contains('on')){const d=$('bmx-doc');if(d&&d.innerHTML)d.innerHTML='';BMX_TMP=null}}).observe(m,{attributes:true,attributeFilter:['class']})}

/* =================== v3.0.3: JOGO DA CAPIVARA — "Capivara Comilona" (toque na logo) ===================
   A capivara da logo (garfo, faca e prato) fica embaixo e pega as refeições que caem. Perdeu mais de 8, acabou.
   A queda acelera com o tempo (um nível a cada 15 s); a comida dourada deixa a capivara maior por 5 s.
   Pontos = refeições pegas. Recorde por usuário: no banco (jogo_pontos + jogo_registrar / jogo_ranking) e,
   enquanto o banco não tiver a tabela, neste aparelho. Não mexe em nenhum dado do sistema.
   v3.0.4: controle de acesso — só joga quem tem o acesso "jogo.jogar" (o administrador sempre tem). */
const JG_SPR='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARQAAAEYCAMAAACqbPkwAAAAkFBMVEXZtADa2gAQEhQAAAD7zAf+1QcFCBT//wAsJxLNpwlTRg+RdwzlughpWA6niQv8zAf/fwD8zAe3lQv8zAdFOhD9zAfbsgn8zAf9ygX8zAd5ZQ06MxH+1ASDbA3/qgD/AACcgQwhHRHCnQr+vAD/0QdeUA9gThB/fwD/5AeqqgD/0Ab/4gAdIBe/fwC/vwDMmQDVu69fAAAAMHRSTlMHB/8A/v7/Af/////////PAq3/jf8r/00Sb///EP8DAf///wcq//8C/wNLCf8EBAW+l9nOAAAgZElEQVR42u1dh3LjSJLFEaiCBwEQBA3o1d0zs3vm///uyjt4GqkQsdiInVa3RLEeK33mS8d9x+O7G+CJB9DHU/5mc0HfY/yMn/uXvuefPPd996ce5w2vcc39g4KIF2ZxHJe1p+Ky2QtUfN+/5NcJR/bzS+5fFwqK7+4kJOExgORZNWnmCVjAeuvm+JziAuy32+2h79ltt7/2AsMFgpL7+zU7PAgjDAd90J+CWMCCUfFz/P2n/Xa3KYq1FLT2g39iXWx22xPB5a/lgSIUCohXHBGOS1ByIQLF/yFAEB7rdYfWMR/+HevigIH5XjFy3iA8W34dUh0SCkvK/xVstps1Oa43+SHAFAcsSd8IyztAYRcFRG1MMCxBDZQzdl6ILulRv8nb7HysXZYCirgo4NiJCUJlFYIe+fCS8FHG5+Mxpc/xeI6zR1h7BjT4uhBY8qWAcqCYlHA1FRV84PoRp1Wwgl3PKqjSOEx0XBAsSLlcL99wX94ASkFBaXogIRKUAM2RiSMOR88PkH+qzqHq6yCte9hSc/dh/+VdoOCLshpAhWlbdMYyDfrRMJFp4hpoeCJj9EV/8QW7xHaC4rsn4qSAavCYMALUtSOIrCY/6Huj0gOa4BWbA/Nf0K+/fAKZV0HJqZ4F4djpYnScWzULEdUF1EMr4tkdtts9Dwfe6/a+C5QYjp2tvAWzEREuoA4L818QNPjSyHDgXci8C5Ro7Lxw9SQkDJZj2Pb6ALs0h93u9MXF6Q0q+F2gBM+feCIuqyoOvU7XjoYDSJz2J4GMDaB4HweFapfonHUiwxTNGiMj9czPggKS1edBYVZ6dUeeXVn3XRp2Z1j8/hwwywJF8eyC6HgjTm8fMjsqTP4TeYcFiU8HNPdGXJq2NCFhYv7MXElaLCiKPDVRXCZtZMjXyDLtqY6x0SR/GpmgDxmPhwbTr8t3OW/fiIwJDBElEkpOheV1UPaT3PxvVMFNSs22cWEKLEfTYHlDQEij5Aiu7Hj4lTGAIddlIizfkzoY/3whhPDNyARpVhu4UFg+DwrP5Y/kDobCGuSmZlmcBhC++8q08lQEltHL8jIoF3dHQQmfCfngKg1FOSM8vt0FhGYoiWDZjV6WdySu1yJxDecBAmGkJ9bqD2gmhEsVJwos3sFx84+XOA7sF84VILjKWl7FEX5E96ILqcBS7IfvyjtAYVVTMBMVeO8ofYAz/JBNiiQsGJX802VTdlWAN+v23+uuUiFI4adMdZqAaXflPQV2kauPZ+jaR0/5tPmUxwNXt2movKcV4yB+WR1NfYex2ebD//z4lABhGZKFbf+zoFyRAEndPs0EwQoooUlSh7RW6r3VOW77hDAQemzXf1XeAYrajTFV2cJQqY415HMMfmfEcr7pqiAPpYkiWpntKOGC9an3rrwFFNmNMVVNsouiVcdw0ojoQvAOrQKrkqVUyrhRYJGoHNxPguL7NCickUGAGQmYvKN+vdEXSNW8Iw8Bj6JZCP0h4zBD7AlQIwTWvXb5rYoWu/rT3nJAGxXa+TrS5PN6HgKmRuaA9FhBpYRLrkr+QT+Fd6hMTkri94yvSfe9f0NyE5p+IQJaRCHM8OGr4n/Ko/UvBZjpd0HcCdenkmHjVS/LT8sxJKgYkG0/BwoLk+ekVIIE1P23ATav35Ss5RkqQskEqFfVvh4l84bRGbUf2BBJgwN+1qugNF4blQwK94VcFeTWfgoUoWX/wBmmoflw9hJW7YK89AqpHu5VKi8nrq88nTIjHwnTz2d0kUvPa6vCdw757aTWr1epvJ645r5sM69B6TsS2KsgitK4FAlJ5aqUgLr6lw+AIhtGz7Zk89vBzz1ltkhoFSzAA5rWec9FsaPu038vS8ORomEGKD4BirwoEVzZ/DBxUTwpEmRtPgPKBszy738MlMCUn/BToCDT471U9PlGVIhrL6WcfA0K//2gqC3otoPSUF1750rlDPodFeclTLgza/1FEdGQ0LTY0wfeqTNQfgUUURwsF4AJy+BEqvn5AChXf18s56IQeZHmh4jTB0DB9ngRpkeJjEVSj5ijj4CyWYSPompakRSH2FF5PyhczYJktYSHZUDlra4/A8puXrLaBvOjhCOfAOXqf7H4OFgIKMSHrdUv3w6KTzsAl2GPpWP/YVCuO285alZmq8W9/sxN2SxIzX4PKDmfHVyKmuXZA+HnfwAU4blViwEl+wZQSICsKK7/gOK7Pu0pzuB/QGm5s9FSQVl9ApTdzKqgddan/gAom0V5bt8Dir8Bn+zv/KBHy95x8PYoWSQig+WAQmOfcPWxfArzUqwugZkP6eoSqQPYvB2Ui/uvhRlknk95fC5H+5e7PJVSaR/jB7L5PnPdqgWB8geofQCkwg7Wp/fVfXKqZ5cTIa9EiTBVmwFBcX1fhZCPmC7IS2nVfcona8m++uig7BaVnRUWWffdngElN6ywanwOCwt8GFWWEHhmi57oT9krz5f64wyUJblurBZWQu3LqZ1MTFpy/3JYK486NHS9klnkZenZs14gjOf0vEnkdjqxY7EXeuXqUlDsKZeOvxGajJR6NgQDMz9OK6jZn9CzP23XxiCoVEpXl1TW7fFn4SgsTIfw9hT25XAfrZ/T5+LuuLyoXBvGK7BOt8+Myz6nRMuxb6HdxCEfLUqBMUh4zZXH0WVm6xn0pyCpeUP3TgXFJicfac2xjlUmPTHUvpSX32/dFJ/wTZOnMDvaj6tVwDoLxSgiB6WCFlmWAI5Kj3jHJERWjA/2awUE6HFIanHdRRAmQwXa3u/xy+ZbZpHxkYVkDPn4tfal6EJH/7ct1OM7dIbJkJk6ZHPNgZRAKT8XEiNPnSv9pqTakNrnN+OsdebzcNC/5hvd0jrGIgBK5YCOS+y615AXudNSesEYCKnvZlGGibY6DgyKh+pHzPP6SKXk5J7kG2PewxEsu1JmMOaQRkxUl/IxSCY/DBR7wkE+kniHQ8UNfpf4DKH3Cx/nijEx1IYEBYRlqLRrEZlhr8NfZsdlcAPsSrsxfzVJYRcfe6bNmXDCYGY48i+BCfAwBEABBV0KPOnJQIEss0vrOqRBTMRPvvtVAMtiZDbqBR6RMTYDYfDQxoNhw2kgiJoVw374Uw4YBBwU+iMEVH5akv2u2vLDUvlW5SKZ2sPT3+dGZRMXOx5wcQOPAB351wUmaeV9AvhwfyCXEAEKOT3NXNLkLs1NnVX5ATtbQcGDu0AuSEnTKAiCKMUUXoJXAv9NLKdQ8UXx8z1XqGLCFUmXEB822EVKRMQBoflunv0W8nMVoNiVTYFNDQyODYN7X1tmADa5rw5ASqcLSaK4KYqdoX+GtJs9gIr3Q7LfdoKCJCibvtACbDD9Qy45Gip1aFmAcoMrzeYgVXtTwKqk/eHlwca2FBNhGJqCCwAbfG6Fo0El2aolKCEUFh+7ZZiCJVKMMr02ZECGg2Jf3g3CKkvMhRWgvfNjfTi5mvAoLhdUdQqZnuZjzPTPWKPzeIHJD/aMKVU+sDIZiXn2Y8bdS54kLOmuICWJuKO0gLl/4gxbgR5dSj8lIuR11Oak9M8lIzOBmv9GzZitrSlkvLRChgc9fzClTErT9iR3Rh6XEUjKiyLtKBQm+cBrZ/zwSGawzaYhBRe3hMvPhRQ4rO7XUbedtIcFL74+FKoKDzE1jnthRRz2T4GkrMakHWIbC7c/e/fLflBaWfzNVVawrsYQiq4HMIj4pvxiJREoS2fMQtWS01vKz56DsoSHBjodVS/hy+pOKFx5FJS9Wi2nMhgrXgv3R5j9cS9LAiUEXh8ondPDxPdwBPUW90gC+Z1UwbBQSMoPBcX6eTAoA+R21atvzJx0IziyT5h5JMIoYwOEvf5QwZDEPxSUBYzdsmn+rlqGuCgGfxrRHgSUXzyMlI5sREBRFYz035YBCpTRUJuSSmoUM/seclBOalefplRSpb7D/bf9EkBBzopYDAmK0199F8XIlNFsLilx0IQcl65Alo3ooGqpp/F21iXeOtwUY1dm3sfWZwRwNEfvKMMHXKOGSmRTq4s2uP9mLygss5RKIpkuTPg1aB+C6A4Gyr9U40Q9/UgxypUhPxsZVtvlwq6CIDpmOtf3us0xlF85WWwrfgs5KLneKqwaYlXBiPzBdmNLilZwywdNlJ6zR9jOLG06iuiCuKJ1UQKP65Srqzc7kg5tVnEjXj+/Qsz+bNY/DIqyxDH6fczKsHNzNV3oeOnChK/tNS8KK/s56vgBNzOlknJ7KAqGyU/xMylaqN2LOM7CJOnZhsqX8+2+uujgey8KUykUFEZvIapFR2mI6Z9T1f4A7zv2tJibPZG6aKr0eI7F6tOe5cL8H9YbvNynY62acEE6jhBKUPjqlVqRLGaI6Z8zZfTBA98yehshAPAi2OP5nJXlI0zU/NnAimWSUcJbffZuz+INMXrfClQ4/RsTny+KXSONMkgC4fXLNv9SVhg/nKINqiMmr/v777+HN04DBYv1hiwqP4nuvaF28Y6PFf4GEhSlSqgYZebdn9GvFH3KqSwxBt8gPquGbcMdSEev18UG72jc7v29bGb8p5er2WdEUh0NAlSl4Ky2OjvKlcpvoDQu/Mki3Qv2vm3MlK9My1q2VlC9b/d7xQG5XPx8ZNmp2KjSthS8PdDhRELq/A5VJLEk5ZQ/J2Ks8HvXyZENyu09e8D7RfKLHW3h4wwn3SoFeFtHjwW47S2RJHd1bwlG4O/28pU9exo0/fTDY4xjbT+Ltwd+MVD8/zL2OZ2zTusi2hp+hiuSQ3O+4aVprNb3NWeh3tXlPMttQ8HaCDa8j5a7b4rIdBNQH1uEnT/kz674tu4BqvchOoKuzAfvOHb0OeMxHn8Bys+Xwrj97G0mn61muUqRoPyi1/E+0o96Bt9ofEZQ4QlYdIzL5IvCyDw63r+kM3aMbx6RCt5saUfejdPMdmRMRljKu1Qi91Lc3DGmr29TOpctaUHnXnnvLGAHKHnRTyRFcwBIGJ2Z1B8hsIg2RTjYuKnPf1HNUscUy6K8KZNIYvhnY0vNlKs4z9vkU+6KcFI6tARjeC5O7tUxNdCgU8Y1vjUJWuk3bfLxuyLWaya9L0VqiU6L1nzI/giFb08T4ENK0NUftcfbAb6+RAyLCVD+mUDwJ6THu9uTs66noyI++I60B5twJ02TjpzU54y7/YkSYZBtarbmnu04KiIW7ApmmUohoZQzg+1dmkCbGiN5W/m4DRIpty5/gs1FkZjBaf1IvwAJJ8WuLgy5jGT4rnByrU4nhUP7Lx0U198P7+mRXoFl2xREt/UwKjw/0umNs5w89QKd9u3qu198IsSi6acOVPots3BSuj5zXr3xDVDc/B8+5UFXbGmDrYro2rd2Q1u6eM37yGIL0O94hspIu6NB+Uu8dmiudBaJfCs7AFVUetYh857zTpXJk8/bFiiE7ULISByoiSZheewZR+6VoO4E5ZCLL9IGpzYoKirov1mq7B6LfiBj/SQq3ctcOTtQvRr28dtj/RcFFQ+AhDdhSFA8WymHFMvclczOmW7ocThqplIu3QQQO4XkAHgN67cWHr69tKI6Kpe+dRCdRQrFx++kCnH3G+WyPIRi4Wmuxtq2LsVAtlHhqfm6P/Us5M7pItjZbiTvQwWNuOdoca+bjIPMDCUvl3dLD5vL5C3ITpdGQrAc1sYKV7ER1OauSLnWHRjcKNzd6LY9gV4WcLrr8q572ujGhjStEzfFZtIhKPMreuWDp1s7nSyaOyOZyCFOJv/Sip5EOGg1PZXosjZQMat9XXl8sRfK6Q+f2H1jLfuiDmY5kRmEKiq5b4ASDRrkMVBEzwofIuSesP1L0zIFFUmEs+mlN+En+zUFlJ0hhVyJ2c5kxg0lbhg9Cc6XTe96d+7j/3sKKCyAEv7bzbqsdR8qRzmTvddIK85wwMf3c3cclH+vdQ7KyL4MbR8qsg1t4zOWlE1/n2tiMOE54+TeGdSLAEuYCVNRYTPIBJQ//Uk3ZSWuM4MGXhjlBdDQIlS0VMLATeFJt9y9TiHUZBt8KqM30mZPvzPttMemuX/0JDRnLwf5aL8Kne2XR8qL4KHV005fFJR63Mcf46M1Ngaw8UJLJ/qHk/zG+EFv0m1Up/g+Uyp3wwFYCBGtWhA68YppZDbzMYOsUtMOuPmYkVZvbxJG+QaDIOjtFrQxwbLxObFBfDfeddKipnX6aYv3/smMokS+IsFPeEvvdsOiJFgOknwpVisVbYPcHyW7+2KN/6dHO9ypFfMUXlbBRdwVFAcV4r17mVSKjA1NS+s6fftt1+rsBCVpgquqBK0hiuwOl6BXwPqgZFk1tqHW3L/Tg4mndcBjDrhVdKu7pilEyt92G7Q7SD7ZDoM8AoqJCfZ5gjjpHz5KF4HKzt0VnjknJxns8kFQLmqdkCGbeUMjN5Yn4yL63nc490zN6W+o6xwkPdfrECi+gklZeRo6QsmaLGqN1aik9KZcLyLVpNseUQXrpYhXMMmgGGVRZjjD+BhVTVNF51AIqc2LfiDLZu/8C+0tVlJNBl1vL0X8aQ1kR5NIYjFEwjgK6BAF+f9IVBSsVSvoTZZcl+Zuzoj+INSys8Vem0p1ujtNOSZVolSW67jSx8TQVzwbF1qrUAQh3rpAD32zR3YQldOvFxQTkwgoPQgmqynlq7c6HIIrhTpR+l3ovzU5jtoS2QeKL9reKCaB3q3SfTtDYG2OEq7Cgcnd+hgIzy3v3bDgS7prfEYoauqEvrbf4NmbowzBIIOkl3ld0mOAcuDfXyr1E5BEQ2Ff4LWoBm15HkD3IsxhVfaX61PeC4p02igmoqI+klIKgZ1KRY544KasKkBPlZ7L2jNcc5yd7QPFd/lOEkYTUnNlMWkuyjpQZH+4d75LLwKugjQzQpZiq7MiOG0lS9P3LEsNyrGMibWgcLtYByYXOAr341pj49lp9Bnt0RbS1YZ+sAaeugu0X8MnwMZiqqACT+6w7UvgoF+J54B3cDvyKblst5a0+VPa/qT1sQyUVDpQPc5EcJatoDihYiauJccX5z9/gGnN1dxPsa3swdcqDExaq1xwmIj0qlcIFbbnUuG0ntB1IQaVrSuQsQ9r8H1B2AhXBhz8iw6KexAdoer2gFHlKWu2tqmUwJuk/6ES8opymEo/xJKXgqd4XCRkJ8jNVoMcjH+uMretdkeySW2FSCaadFFg9bdnaUJFGJ/x9JeoOuPAMJfrsXZG5xZltx49KFzdvB/iUxlHZYpOEaiIkll+paBILSs7IR8TmdxgkAE787Tc+tRwCir8EDs+xdGmStcY80cTW9xxtKtYKPyUKc2covNzvfXJZJh/5VxwshAYgekDYAIVyxaW3D3hLEy4Kzwm2NBxOXlRhE6iwE0zsiKPa5v7pljGKWs+eZcJ7rp2/vL5kHasVYhmaM7AszH6Ee203t8TJEh0CROuAzFFluiwzZAGlr22qxVOaaYtm+lqhbQfOGKaPzXY3KYHeDwmtGpfViUKes00CwAFxf5fjmCX1DOMc/wOvuzQqs1qjxlqVoWREFV9Fa2PGdN9z7ElFoLCL8qc98SzZRvX2bYvCi73zEmPcFAsEh+u5sL5QGKaxKJ9IBwMzPHauU6xSdHWT6g5sd7T6ajaIMjm2B7R9GWPSeYbXpP7vJ9iytnpoC+Aq/ox57VW1s0B8bs78y3xPnunK+sAV3MSrtyjje0DZWboztWz080fP1+jWDWwzEGZG3kwX8V5NZbj7YdWhT7ckMyVaM6b/1p5AsphicAunqanhgj4hoVXEqxIymJg4wwqnJF367DKzvPSg/fsJpY2vXHlX8+UAaqMnCelB3NxnxPZrWtZIwZ3OWZf4Dv+mJ2ncs64FKuu0KmtGwB6liOW7gx7ImaBsIkTrfnFvkZ0mTqIZ8kB3S433260N/DaOFQok0xhNMPtIls6ndndamrLJLCZPkT0+IIymuGOIqXizPeFU7EypM5KO/swaKwia+egjoOJsGCl4jzBZZfGWXmLj78D5OxY3EWrNoyiT3DidcFKxXniQMomIj7UbiV9iEgFcC6yOJhWLXReC+R4XsZK+hBRJJyzfwd7+s5r+kCsObBxtoUnXWu5WmyKVCTAeY24TQy122iUed9OtYqOZ7x+/NhMs1rOi1ELKyXYaJR502u9UvexTdEIzovqQPhI9k36c3030wigEzkvfsaiwJI+FVROe560yMlTXc8ElNdakKDsVp8FAQ5Ig6apqiiK/qToiY0H/92fKKqqqmmCu/kCk7MA8x1LeH4ZFHFJkzGXBi9XxMsF4zjLwjCskySRiwUHH8IiUIdhmcXx+ZhGVRMEurc09Mbmnu8toEQdRlkuHw2qND3HJQJBXa44vFqwb9egilIYPsr4nKYRI6LoAKd+bmaAgPKi3yWM8hlKLO54+WhW4jWTsxGYCRMGqMzOCJ27hs7T7fEUlDelQ0O6ljYli1i9TyAxsrMyScIsTit+c+Inx/iIoq1fQgTexRhufJOrWL0feETsHqKL08g2dPiE9XnSzScbE6NYTUpOAgPMUiwAzNdDxreF52g1BxjsvD0XtuA5omOZzMfBS2pkRx7ZDRsSZEkiYnK7H2ax0yM2WTdismrdYg39UuW3J9kMXJA6eCJ1QDa/Z/U4IFIV1iVC4fwbIRDMcdq6nLgAA5UijMp6suoSuEx0vJy5sRzSImnmDb4RgcWjzNBlaAINh1f1uvJC9wDjU5ahN4oOxiWupnTUojByZjoSU8v0I6JouqPiQHwsKlLcISRktzD0hqBB//BIR68LSzIlMyA51j2/k7yZJLwpNvEbI0SOTtBE5zhMvP5V5PVxxK7QdORkTUuqpKAbDw+5CFG1+m4wusFZVdE5C3sWLIMkHYQFRwfO1Cb8bkiItJRIVqwifSPQ3KuUItO+Lb+H3mlNQZni6MOoxVJFCWZSW0nwqLL5HbeBGWIcY8WwKT1IGuWGtHJpYDspIKT+g0myBeq+I5Pxr0n9KTDQ6SXwFTlXK9tZEiUwqyjTZb8/hR2CaZ1MkmyQvWB4DhYCiIJLWprcdb2JEGfC8K6GCS61LQsR6YdrOqB7AUUpQUlGcv6qjgoWiAjHpVKP0pFrZxlnZ3Q3muRbxwqqWiwkFBb1MG1XnpXPnPGZZoXAq1wtGRKlGNR9aK25eKiYpbzK7LY6K1GRRKkt+RBt6IcR9jo5ike+Z/GoKAJkyo/4/PkQVG8EpBAl9lKRLAoUQuOx7uhzFbXntSNG+use15dWCgr7l9hMjGrJeTYdRpeXxb2tkwvmlLD7GtCbsrZ63d4M81PK4+g3RZnXdhSOnU5UFMVEGN+WjYkWr2g6RUz2e1vfcXP3IPk+YI8MCt/ttmTfLYh1T19x5OXe44ObO3hnQKGsee3IWepJckKatkgvX4dE81OETQLFyfcdnUbTa8sHfJgRclatlgULyR+UJiSUH1PTJ2x/oWMQrrbZEuRWU4Wgk3L1LiVAbo5lF0e3YIvRNtLlnH7IFXcFKdO0b1OymWJqLM+okAxYk2Z1J2s5IZcl3xXVxkZHh6/ykaiQZnb1sDJ1AIzsbHasrMxGssJHdM5M+kzgeRrXsppQwJj8o5DfqahgWFJVOsTo5LrwgMmLnoS3I+O9hrbAgUkzu/L56KtiWwBJFatpX9Ba4/mXe1LXMmCy0kDt9WD82LtNi7iUVjhK3CHygyUOURZr0mPJKj+tNPt6s3VdypxPCDJXzU3tPNZ53tjqml2hMm8Cr4zFOSNqrtD3/ToU6478OC2eP7IYY/Px0qCJBfpFTfT7nJWJ11UII39RbLZ79P4J1xKZ2mrO6ogOKOTeXIWPNkeXZQ1MtVHG8TGKGmyzQOH/D9ZDp92m8LzOShNrLHjcCLd+sHq9ybEPBtZI11RpHGdhPVxrLza7rU8I7RgBVRyXmvpV1jiadM6uu9dhUXbW8JuSEzLOr1+7QzHaeuHh7j0EKu3dC1ZzOkL7vjcQDYWkkW64K4P+7WHrs81WYi2AQeuMaXoV8m/HXAmMYOnbu0FAYa+O10R5wPO8oWK/0UiShI+yzDLcl5JG6KGNKb0cDQE9P2kpRRhkWVk+wtCAfbjxISTmAa8hpKx26q4EVfvu9hp1sbFM4C8My3az7izEclAILv97waCgEPGY8Yr2hDaRjqakpO8Z+qGx35HgFq/qv1OT19sEBb/gZndyh5YJEPHA0rE9bNZrfGj1+bvQ93cTo3/jHoFshXyuzRE808rV7gasS+QiVHdqHlp74wgoyuuvi8OWiYg7uMqGS8d+t0OKQz6b4qAv0CLi8/eNtYriJiPcQvO5PtEB5UX6Ro/S8lFHwmuBcnW/5JEOu90pF+d1RzZB4e/z3eGHg6IE4FoLTZw9SEfx05/96L0iLcYl6cHuahDiLAwaKO3nn7z9d87QGsLLxdefLlBa9UXdZDYRGbbJsK1IvImN533ilOA2wgx3o+OusWA1MLQiaWYNUJTjoONdu47uuE8+amjdX3U1LG9A2/iQNYlvtwzbE/SEXVo2RJcAm6rsdrvh4YUI91EGRhvhkDsTS5rm3J95tqdBUZYP0IUDcKbnNXy214ZccOsIF7mDe3W/DRR9j9Y79u6xbUpveJ2mlvfE9f1vBEXbuJZYU2RGke9NJgMO7mzheQ0UsoEA2NWOYCQDnsLkNVCwBCmhd/zTsEDM16EkA9Zb17+63w0KRkW6zZNH5z+anZZvByehn8HkVVCwDSrUtVxh/BO9cLCFCE4G7F3/uUO9Cgp24pSUHUn136Lv7JokvyoinaFaMmDnurn7Q6DgT+NXYaa0w/g7+o1ZejouE3PrVbHznzDF7wMFp+zIKlUzJA8z3okNP4EGGc5j6Xpg5kdy1/WfP9EbQCG/39+aKW2e0VZHGOB70KCzimXYynCJ7PRzVuetoLhkM8720JG55RlthE1UDUZwE2IDHGDi7MQj6UtPrw8kO/0SJO8CBcOCcMm3u+6knT4iluLY7r6aNCK2IslpMQvWk8eiCaPN4deJiPP1xcO8CxTs35Lq2gkDs/Y8MJwO8chMepjhYcI4Pp/PR/GgLwixx41kZManBjEe681ue1IyZNaAgq5LfvEZMIf1K3nIWZmp9WFHboiLfrv/lnP8P742RZZZDjhiAAAAAElFTkSuQmCC',JG_MAX=8,JG_GRANDE=5,JG_LS='sismed_jogo_v1',JG_IK='#1d2733';
const JG_TIPOS=['cafe','almoco','jantar','lanche'],JG_COR={cafe:'#8A5A2B',almoco:'#0F5C70',jantar:'#4F3F8A',lanche:'#5E6B1A',ouro:'#E0A100'};
const JG={W:360,H:520,st:'ini',t:0,pts:0,perd:0,x:180,alvo:null,toque:false,esq:false,dir:false,itens:[],fx:[],prox:.8,grande:0,esc:1,niv:1,flash:0,treme:0,
  raf:0,ult:0,img:null,srv:null,srvOk:null,foco:null,uid:null,cv:null,ctx:null,sx:1,sy:1,antes:0,novo:false,salvando:false,fonte:'system-ui, sans-serif'};
function jgPode(){return !!USER&&can('jogo.jogar')}
function jgReset(){cancelAnimationFrame(JG.raf);JG.raf=0;Object.assign(JG,{st:'ini',t:0,pts:0,perd:0,itens:[],fx:[],grande:0,esc:1,niv:1,flash:0,treme:0,srv:null,srvOk:null,esq:false,dir:false,toque:false,novo:false,salvando:false})}
const jgRM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};

// ---- recorde: neste aparelho (sempre) e no banco (quando houver)
function jgLoc(){try{const m=JSON.parse(localStorage.getItem(JG_LS)||'{}');return m&&typeof m==='object'&&!Array.isArray(m)?m:{}}catch(e){return {}}}
function jgLocSalva(m){try{localStorage.setItem(JG_LS,JSON.stringify(m))}catch(e){}}
function jgEuLoc(){const u=USER?jgLoc()[USER.id]:null;return u&&typeof u==='object'?u:{recorde:0,partidas:0,refeicoes:0}}
function jgRecorde(){return Math.max(+jgEuLoc().recorde||0,JG.srv&&JG.srv.eu?+JG.srv.eu.recorde||0:0)}
function jgPartidas(){return Math.max(+jgEuLoc().partidas||0,JG.srv&&JG.srv.eu?+JG.srv.eu.partidas||0:0)}
async function jgRanking(){try{const r=await sb.rpc('jogo_ranking');if(r.error||!r.data||!Array.isArray(r.data.top))throw r.error||new Error('sem ranking');JG.srv=r.data;JG.srvOk=true}
  catch(e){JG.srv=null;JG.srvOk=false}
  if(JG.st!=='jog'){jgTela();jgHud()}}
async function jgRegistrar(p){if(!USER)return false;const m=jgLoc(),id=USER.id,u=m[id]&&typeof m[id]==='object'?m[id]:{recorde:0,partidas:0,refeicoes:0},ag=new Date().toISOString();
  u.nome=USER.nome||'';u.partidas=(+u.partidas||0)+1;u.refeicoes=(+u.refeicoes||0)+p;u.ultimaEm=ag;if(p>(+u.recorde||0)){u.recorde=p;u.recordeEm=ag}m[id]=u;jgLocSalva(m);
  try{const r=await sb.rpc('jogo_registrar',{p_pontos:p});if(r.error)throw r.error}catch(e){}
  await jgRanking();return p>0&&p>JG.antes}

// ---- janela do jogo (montada na primeira vez)
function jgMonta(){if($('jogo-modal'))return;const m=document.createElement('div');m.className='modal';m.id='jogo-modal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-labelledby','jg-tit');
  m.innerHTML=`<div class="sheet jogo-sheet">
    <div class="jg-cab"><div><span class="ph-eb">Jogo da Capivara</span><h3 id="jg-tit">Capivara Comilona</h3></div><span class="sp"></span>
      <button type="button" class="btn sec sm" id="jg-pausa" hidden>Pausar</button>
      <button type="button" class="jg-x" id="jg-x" aria-label="Fechar o jogo" title="Fechar (Esc)"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="jg-hud"><div><span>Refeições</span><b class="num" id="jg-pts">0</b></div><div><span>Perdidas</span><b class="num" id="jg-perd">0/${JG_MAX}</b><i class="jg-vidas" id="jg-vidas" aria-hidden="true"></i></div><div><span>Nível</span><b class="num" id="jg-niv">1</b></div><div><span>Recorde</span><b class="num" id="jg-rec">0</b></div></div>
    <div class="jg-palco" id="jg-palco"><canvas id="jg-cv" tabindex="-1" role="img" aria-label="Área do jogo: mova a capivara para pegar as refeições que caem"></canvas><div class="jg-tela" id="jg-tela"></div></div>
    <div class="jg-ctrl"><button type="button" class="btn sec" id="jg-esq" aria-label="Mover para a esquerda">◀</button><span>segure ou arraste o dedo no jogo</span><button type="button" class="btn sec" id="jg-dir" aria-label="Mover para a direita">▶</button></div>
    <div class="vh" id="jg-aviso" aria-live="polite"></div>
  </div>`;
  document.body.appendChild(m);
  JG.cv=$('jg-cv');JG.ctx=JG.cv.getContext('2d');try{JG.fonte=getComputedStyle(document.body).fontFamily||JG.fonte}catch(e){}
  JG.img=new Image();JG.img.onload=()=>jgDesenha();JG.img.src=JG_SPR;
  $('jg-x').onclick=jgFechar;$('jg-pausa').onclick=jgPausa;
  m.addEventListener('click',e=>{if(e.target===m)jgFechar()});
  const cv=JG.cv,px=e=>{const r=cv.getBoundingClientRect();return (e.clientX-r.left)/r.width*JG.W};
  cv.addEventListener('pointermove',e=>{if(JG.st==='jog'&&(e.pointerType==='mouse'||JG.toque))JG.alvo=px(e)});
  cv.addEventListener('pointerdown',e=>{if(JG.st!=='jog')return;JG.toque=true;JG.alvo=px(e);try{cv.setPointerCapture(e.pointerId)}catch(_){}});
  ['pointerup','pointercancel'].forEach(k=>cv.addEventListener(k,()=>{JG.toque=false}));
  [['jg-esq','esq'],['jg-dir','dir']].forEach(([id,k])=>{const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();JG[k]=true;JG.alvo=null});['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>{JG[k]=false}));b.addEventListener('contextmenu',e=>e.preventDefault())});
  // Esc fecha; setas / A D movem; Espaço ou P pausa; Tab fica dentro da janela
  document.addEventListener('keydown',e=>{if(!m.classList.contains('on'))return;const k=e.key;
    if(k==='Escape'){e.preventDefault();jgFechar();return}
    if(k==='Tab'){const f=[...m.querySelectorAll('button:not([hidden]):not([disabled]),[tabindex="0"]')].filter(x=>x.offsetParent!==null);if(!f.length)return;const i=f.indexOf(document.activeElement);
      if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}return}
    if(k==='ArrowLeft'||k==='a'||k==='A'){if(JG.st==='jog'){e.preventDefault();JG.esq=true;JG.alvo=null}}
    else if(k==='ArrowRight'||k==='d'||k==='D'){if(JG.st==='jog'){e.preventDefault();JG.dir=true;JG.alvo=null}}
    else if(k===' '||k==='p'||k==='P'){if(JG.st==='jog'||(JG.st==='pausa'&&!(e.target&&e.target.tagName==='BUTTON'))){e.preventDefault();jgPausa()}}});
  document.addEventListener('keyup',e=>{const k=e.key;if(k==='ArrowLeft'||k==='a'||k==='A')JG.esq=false;if(k==='ArrowRight'||k==='d'||k==='D')JG.dir=false});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&JG.st==='jog')jgPausa()});
  addEventListener('resize',()=>{if(m.classList.contains('on')){jgTam();jgDesenha()}})}
// o palco ocupa a altura que sobra: a largura do jogo é fixa (360) e a altura acompanha a tela (380 a 900)
function jgTam(){const cv=JG.cv,p=$('jg-palco');if(!cv||!p)return;const r=p.getBoundingClientRect();if(!r.width||!r.height)return;
  let w=r.width,h=r.height,H=Math.round(JG.W*h/w);if(H<380){H=380;w=h*JG.W/H}else if(H>900){H=900;h=w*H/JG.W}
  JG.H=H;cv.style.width=w+'px';cv.style.height=h+'px';const d=Math.min(2,window.devicePixelRatio||1);
  cv.width=Math.round(w*d);cv.height=Math.round(h*d);JG.sx=cv.width/JG.W;JG.sy=cv.height/JG.H}
function jgAbrir(){if(!jgPode())return;jgMonta();const m=$('jogo-modal');if(m.classList.contains('on'))return;if(JG.uid!==USER.id){jgReset();JG.uid=USER.id}JG.foco=document.activeElement;m.classList.add('on');
  if(JG.st==='jog')JG.st='pausa';jgTam();jgHud();jgTela();jgDesenha();jgRanking()}
function jgFechar(){const m=$('jogo-modal');if(!m)return;if(JG.st==='jog'){JG.st='pausa';jgTela()}JG.esq=JG.dir=JG.toque=false;m.classList.remove('on');
  try{if(JG.foco&&JG.foco.focus&&document.contains(JG.foco))JG.foco.focus()}catch(e){}}
function jgPausa(){if(JG.st==='jog'){JG.st='pausa';JG.esq=JG.dir=false;jgTela();jgHud()}else if(JG.st==='pausa'){JG.st='jog';jgTela();jgHud();jgLoop()}}
function jgNovo(){Object.assign(JG,{st:'jog',t:0,pts:0,perd:0,x:JG.W/2,alvo:null,toque:false,esq:false,dir:false,itens:[],fx:[],prox:.7,grande:0,esc:1,niv:1,flash:0,treme:0,novo:false,salvando:false,antes:jgRecorde()});
  jgHud();jgTela();jgLoop()}
async function jgFim(){JG.st='fim';JG.esq=JG.dir=JG.toque=false;JG.salvando=true;jgHud();jgTela();
  const a=$('jg-aviso');if(a)a.textContent=`Fim de jogo. Você pegou ${JG.pts} ${JG.pts===1?'refeição':'refeições'}.`;
  try{JG.novo=await jgRegistrar(JG.pts)}catch(e){JG.novo=false}JG.salvando=false;jgHud();jgTela()}

// ---- painel (refeições, perdidas, nível, recorde) e telas (início, pausa, fim)
function jgHud(){const s=(id,v)=>{const e=$(id);if(e)e.textContent=v};s('jg-pts',num(JG.pts));s('jg-perd',`${Math.min(JG.perd,JG_MAX+1)}/${JG_MAX}`);s('jg-niv',num(JG.niv));
  const rec=Math.max(jgRecorde(),JG.st==='ini'?0:JG.pts),r=$('jg-rec');if(r){r.textContent=num(rec);r.classList.toggle('novo',JG.st!=='ini'&&JG.pts>JG.antes&&JG.pts>0)}
  const v=$('jg-vidas');if(v)v.innerHTML=Array.from({length:JG_MAX},(_,i)=>`<i class="${i<JG.perd?'x':''}"></i>`).join('');
  const p=$('jg-pausa');if(p){p.hidden=!(JG.st==='jog'||JG.st==='pausa');p.textContent=JG.st==='pausa'?'Continuar':'Pausar'}}
function jgRankHtml(){const s=JG.srv;let L,loc=!s;
  if(s)L=s.top.map(x=>({nome:x.nome,rec:+x.recorde||0,eu:!!x.eu}));
  else L=Object.entries(jgLoc()).map(([id,u])=>({nome:(u&&u.nome)||'—',rec:+(u&&u.recorde)||0,eu:!!USER&&id===USER.id})).filter(x=>x.rec>0).sort((a,b)=>b.rec-a.rec).slice(0,10);
  const pos=s&&s.eu&&+s.eu.posicao>10?`<p class="jg-eu">Sua posição: ${num(s.eu.posicao)}º · recorde ${num(s.eu.recorde)}</p>`:'';
  return `<div class="jg-rank"><div class="jg-rank-t"><b>Ranking</b><span>${loc?'neste aparelho':'todos os usuários'}</span></div>`
    +(L.length?`<ol>${L.map((x,i)=>`<li class="${x.eu?'eu':''}"><span class="jg-pos num">${i+1}º</span><span class="jg-nm">${esc(x.nome)}${x.eu?' <small>(você)</small>':''}</span><b class="num">${num(x.rec)}</b></li>`).join('')}</ol>`:'<p class="jg-vazio">Ninguém jogou ainda. Seja o primeiro!</p>')+pos+'</div>'}
function jgTempo(s){s=Math.floor(s);return `${Math.floor(s/60)}:${pad(s%60)}`}
function jgTela(){const el=$('jg-tela');if(!el)return;const st=JG.st;el.hidden=st==='jog';if(st==='jog'){try{JG.cv.focus({preventScroll:true})}catch(e){}return}
  const ativo=document.activeElement&&el.contains(document.activeElement)?document.activeElement.id:'';
  const dicas=`<ul class="jg-dicas"><li><span class="jg-k">← →</span>setas, mouse ou arraste o dedo</li><li><span class="jg-ouro" aria-hidden="true"></span>a comida dourada deixa a capivara maior por ${JG_GRANDE}&nbsp;s</li><li><span class="jg-k">Espaço</span>pausa · <span class="jg-k">Esc</span>fecha</li></ul>`;
  let h='';
  if(st==='ini')h=`<img src="${JG_SPR}" alt="" class="jg-cap"><h4>Capivara Comilona</h4><p>Mova a capivara e pegue as refeições que caem. Perdeu mais de ${JG_MAX}, acabou — e a cada nível elas caem mais rápido.</p>${dicas}
      <div class="jg-acoes"><button class="btn" id="jg-go" type="button">Jogar</button></div><p class="jg-meu">Seu recorde: <b class="num">${num(jgRecorde())}</b> · ${num(jgPartidas())} ${jgPartidas()===1?'partida':'partidas'}</p>${jgRankHtml()}`;
  else if(st==='pausa')h=`<h4>Pausado</h4><p><b class="num">${num(JG.pts)}</b> ${JG.pts===1?'refeição':'refeições'} · ${JG.perd}/${JG_MAX} perdidas · nível ${JG.niv}</p>
      <div class="jg-acoes"><button class="btn" id="jg-cont" type="button">Continuar</button><button class="btn sec" id="jg-re" type="button">Recomeçar</button></div>`;
  else h=`<img src="${JG_SPR}" alt="" class="jg-cap pq"><h4>Fim de jogo</h4><p class="jg-res">Você pegou <b class="num">${num(JG.pts)}</b> ${JG.pts===1?'refeição':'refeições'}</p>${JG.novo?'<span class="jg-novo">Novo recorde!</span>':''}
      <p class="jg-det">Perdeu mais de ${JG_MAX} · nível ${JG.niv} · ${jgTempo(JG.t)}</p>
      <div class="jg-acoes"><button class="btn" id="jg-go" type="button">Jogar de novo</button><button class="btn sec" id="jg-sair" type="button">Fechar</button></div>
      ${JG.salvando?'<p class="jg-meu">Salvando a pontuação…</p>':`<p class="jg-meu">Seu recorde: <b class="num">${num(jgRecorde())}</b> · ${num(jgPartidas())} ${jgPartidas()===1?'partida':'partidas'}</p>`}${jgRankHtml()}`;
  el.innerHTML=`<div class="jg-card">${h}</div>`;
  const b=(id,f)=>{const x=$(id);if(x)x.onclick=f};b('jg-go',jgNovo);b('jg-cont',jgPausa);b('jg-re',jgNovo);b('jg-sair',jgFechar);
  const m=$('jogo-modal');if(m&&m.classList.contains('on')){const f=$(ativo)||$('jg-go')||$('jg-cont');if(f)try{f.focus({preventScroll:true})}catch(e){}}}

// ---- o jogo
function jgCapH(){return 96*JG.esc}
function jgCapW(){return jgCapH()*.986}
function jgLoop(){cancelAnimationFrame(JG.raf);JG.ult=0;
  const f=ts=>{if(JG.st!=='jog'){JG.raf=0;jgDesenha();return}const dt=JG.ult?Math.min(.05,(ts-JG.ult)/1000):0;JG.ult=ts;jgPasso(dt);jgDesenha();if(JG.st==='jog')JG.raf=requestAnimationFrame(f);else JG.raf=0};
  JG.raf=requestAnimationFrame(f)}
function jgFx(x,y,txt,tipo){JG.fx.push({x,y,txt,tipo,v:tipo==='niv'?1.6:.9,d:tipo==='niv'?1.6:.9})}
function jgSolta(vel){const W=JG.W,t=JG.t,r=19,ouro=t>6&&JG.grande<=0&&!JG.itens.some(i=>i.tipo==='ouro')&&Math.random()<.08;
  const tipo=ouro?'ouro':JG_TIPOS[Math.floor(Math.random()*JG_TIPOS.length)];let x=W/2;
  for(let k=0;k<6;k++){x=r+8+Math.random()*(W-2*r-16);if(!JG.itens.some(i=>i.y<70&&Math.abs(i.x-x)<2.6*r))break}
  const vx=t>45&&Math.random()<Math.min(.45,(t-45)/90)?(Math.random()<.5?-1:1)*(25+Math.random()*35):0;   // depois de 45 s algumas vêm de lado
  JG.itens.push({tipo,x,y:-r,r,vy:vel*(ouro?.85:.88+Math.random()*.24),vx,rot:Math.random()*6,vr:ouro?2.4:(Math.random()-.5)*2,fim:null})}
function jgPasso(dt){const W=JG.W,H=JG.H;JG.t+=dt;const t=JG.t;
  const niv=1+Math.floor(t/15);if(niv>JG.niv){JG.niv=niv;jgFx(W/2,H*.36,`Nível ${niv} — mais rápido!`,'niv');jgHud()}
  if(JG.grande>0)JG.grande=Math.max(0,JG.grande-dt);
  JG.esc+=((JG.grande>0?1.55:1)-JG.esc)*Math.min(1,dt*8);
  const cw=jgCapW(),ch=jgCapH(),vk=Math.min(660,340+4*t);
  if(JG.esq!==JG.dir){JG.alvo=null;JG.x+=(JG.dir?1:-1)*vk*dt}
  else if(JG.alvo!==null){const d=JG.alvo-JG.x,vm=Math.min(1200,650+6*t)*dt;JG.x+=Math.abs(d)<=vm?d:Math.sign(d)*vm}
  JG.x=Math.max(cw*.31,Math.min(W-cw*.31,JG.x));
  const vel=Math.min(500,105+6.5*t),intv=Math.max(.34,1.05-.0105*t);
  JG.prox-=dt;if(JG.prox<=0){JG.prox=intv*(.75+Math.random()*.5);jgSolta(vel)}
  const top=H-6-ch,bot=H-6;
  for(const it of JG.itens){it.y+=it.vy*dt;it.x+=it.vx*dt;it.rot+=it.vr*dt;
    if(it.x<it.r+4||it.x>W-it.r-4){it.vx=-it.vx;it.x=Math.max(it.r+4,Math.min(W-it.r-4,it.x))}
    if(it.y+it.r>=top+ch*.1&&it.y-it.r<=bot-ch*.2&&Math.abs(it.x-JG.x)<=cw*.46){it.fim='pego';JG.pts++;
      const fy=Math.min(it.y-12,top-14),fx=Math.max(70,Math.min(W-70,it.x));if(it.tipo==='ouro'){JG.grande=JG_GRANDE;jgFx(fx,fy,'Capivara grande!','ouro')}else jgFx(it.x,fy,'+1','ok');jgHud()}
    else if(it.y-it.r>H){it.fim='perdido';if(it.tipo!=='ouro'){JG.perd++;JG.flash=.35;if(!jgRM())JG.treme=.25;jgFx(Math.max(40,Math.min(W-40,it.x)),H-30,'perdeu','mal');jgHud();
      if(JG.perd>JG_MAX){JG.itens=JG.itens.filter(i=>!i.fim);jgFim();return}}}}
  JG.itens=JG.itens.filter(i=>!i.fim);
  JG.fx.forEach(f=>{f.v-=dt});JG.fx=JG.fx.filter(f=>f.v>0);JG.flash=Math.max(0,JG.flash-dt);JG.treme=Math.max(0,JG.treme-dt)}

// ---- desenho
function jgRR(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function jgEstrela(c,x,y,r){c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,q=i%2?r*.38:r;c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}c.closePath();c.fill()}
function jgCafe(c){c.lineWidth=1.4;c.strokeStyle=JG_IK;
  c.beginPath();c.ellipse(0,11,15,3.6,0,0,Math.PI*2);c.fillStyle='#fff';c.fill();c.stroke();
  c.beginPath();c.arc(11.5,1.5,4.8,-Math.PI/2,Math.PI/2);c.lineWidth=2.8;c.strokeStyle='#8A5A2B';c.stroke();c.lineWidth=1.4;c.strokeStyle=JG_IK;
  c.beginPath();c.moveTo(-11,-6);c.lineTo(11,-6);c.lineTo(8,10);c.lineTo(-8,10);c.closePath();c.fillStyle='#8A5A2B';c.fill();c.stroke();
  c.beginPath();c.ellipse(0,-6,11,3,0,0,Math.PI*2);c.fillStyle='#3B2412';c.fill();c.stroke();
  c.strokeStyle='rgba(60,60,60,.45)';c.lineWidth=1.6;c.beginPath();c.moveTo(-4,-11);c.bezierCurveTo(-7,-14,-1,-16,-4,-20);c.moveTo(3,-11);c.bezierCurveTo(0,-14,6,-16,3,-20);c.stroke()}
function jgAlmoco(c){c.lineWidth=1.4;c.strokeStyle=JG_IK;
  c.beginPath();c.ellipse(0,2,17,11.5,0,0,Math.PI*2);c.fillStyle='#fff';c.fill();c.stroke();
  c.beginPath();c.ellipse(0,2,12.5,8,0,0,Math.PI*2);c.strokeStyle='rgba(15,92,112,.5)';c.lineWidth=2;c.stroke();
  c.lineWidth=1;c.strokeStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(-5,0,6.2,4.2,0,0,Math.PI*2);c.fillStyle='#FBF7EC';c.fill();c.stroke();
  c.beginPath();c.ellipse(4.5,-.5,5.4,3.8,0,0,Math.PI*2);c.fillStyle='#4A2A1A';c.fill();
  c.beginPath();c.ellipse(-.5,5.6,5.6,2.9,.2,0,Math.PI*2);c.fillStyle='#A0522D';c.fill();
  c.beginPath();c.arc(7.5,4.8,2.6,0,Math.PI*2);c.fillStyle='#3E8E41';c.fill()}
function jgJantar(c){c.strokeStyle='#9aa3ad';c.lineWidth=2.4;c.beginPath();c.moveTo(4,-3);c.lineTo(13.5,-15);c.stroke();
  c.beginPath();c.ellipse(15,-16.5,2.8,1.9,-.8,0,Math.PI*2);c.fillStyle='#9aa3ad';c.fill();
  c.strokeStyle=JG_IK;c.lineWidth=1.4;c.beginPath();c.moveTo(-15,-3);c.bezierCurveTo(-14,12,14,12,15,-3);c.closePath();c.fillStyle='#4F3F8A';c.fill();c.stroke();
  c.beginPath();c.ellipse(0,-3,15,4.4,0,0,Math.PI*2);c.fillStyle='#E8A33D';c.fill();c.stroke();
  [[-6,-3.5,'#3E8E41'],[1,-2.5,'#C0392B'],[6,-4,'#F4D35E']].forEach(([x,y,k])=>{c.beginPath();c.arc(x,y,1.7,0,Math.PI*2);c.fillStyle=k;c.fill()})}
function jgLanche(c){c.lineWidth=1.4;c.strokeStyle=JG_IK;
  jgRR(c,-15,4,30,6.5,3);c.fillStyle='#D9A24E';c.fill();c.stroke();
  c.fillStyle='#D9667A';c.fillRect(-14,1,28,3.6);
  c.beginPath();c.moveTo(-15,-1.5);c.lineTo(15,-1.5);c.lineTo(15,0);for(let x=15;x>-15;x-=5)c.quadraticCurveTo(x-2.5,3.4,x-5,0);c.closePath();c.fillStyle='#6BA539';c.fill();
  c.beginPath();c.moveTo(-12,-1.5);c.lineTo(12,-1.5);c.lineTo(8,3.4);c.closePath();c.fillStyle='#F4D35E';c.fill();
  jgRR(c,-15,-11,30,9.5,5);c.fillStyle='#E5B865';c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,.75)';[[-7,-7],[0,-8.2],[7,-7]].forEach(([x,y])=>{c.beginPath();c.ellipse(x,y,1.4,.8,0,0,Math.PI*2);c.fill()})}
function jgOuro(c,t){const p=jgRM()?1:1+Math.sin(t*6)*.12;
  c.beginPath();c.arc(0,0,20*p,0,Math.PI*2);c.fillStyle='rgba(255,200,40,.28)';c.fill();
  c.save();c.rotate(-.75);c.strokeStyle='#FFF4D6';c.lineWidth=4.5;c.lineCap='round';c.beginPath();c.moveTo(0,6);c.lineTo(0,16);c.stroke();
  c.fillStyle='#FFF4D6';c.strokeStyle=JG_IK;c.lineWidth=1.1;[[-2.6,17.5],[2.6,17.5]].forEach(([x,y])=>{c.beginPath();c.arc(x,y,2.8,0,Math.PI*2);c.fill();c.stroke()});
  const g=c.createRadialGradient(-3,-6,2,0,-2,14);g.addColorStop(0,'#FFE98A');g.addColorStop(.6,'#F2B705');g.addColorStop(1,'#C98700');
  c.beginPath();c.ellipse(0,-3,10.5,12.5,0,0,Math.PI*2);c.fillStyle=g;c.fill();c.strokeStyle='#7A5200';c.lineWidth=1.4;c.stroke();c.restore();
  c.fillStyle='#fff';const a=jgRM()?0:t*2.2;[[0,-21,4.2],[18,-6,3.2],[-17,7,3]].forEach(([x,y,r],i)=>{c.save();c.translate(x,y);c.rotate(a+i);jgEstrela(c,0,0,r);c.restore()})}
function jgItem(c,it){c.save();c.translate(it.x,it.y);
  if(it.tipo!=='ouro'){c.beginPath();c.arc(0,0,it.r+5,0,Math.PI*2);c.fillStyle=JG_COR[it.tipo];c.globalAlpha=.16;c.fill();c.globalAlpha=1;c.rotate(Math.sin(it.rot)*.22)}
  const k=it.r/16;c.scale(k,k);({cafe:jgCafe,almoco:jgAlmoco,jantar:jgJantar,lanche:jgLanche}[it.tipo]||(cc=>jgOuro(cc,it.rot)))(c);c.restore()}
function jgDesenha(){const c=JG.ctx;if(!c||!JG.cv.width)return;const W=JG.W,H=JG.H;c.setTransform(JG.sx,0,0,JG.sy,0,0);
  c.save();if(JG.treme>0)c.translate((Math.random()-.5)*6*JG.treme/.25,0);
  const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#FFF9E3');g.addColorStop(1,'#FFE9A6');c.fillStyle=g;c.fillRect(-10,0,W+20,H);
  c.strokeStyle='rgba(120,90,0,.07)';c.lineWidth=1;c.beginPath();for(let x=0;x<=W;x+=24){c.moveTo(x+.5,0);c.lineTo(x+.5,H)}for(let y=4;y<=H;y+=24){c.moveTo(0,y+.5);c.lineTo(W,y+.5)}c.stroke();
  const cores=[JG_COR.cafe,JG_COR.almoco,JG_COR.jantar,JG_COR.lanche];c.globalAlpha=.24;for(let i=0,x=0;x<W;i++,x+=24){c.fillStyle=cores[i%4];c.fillRect(x+1,H-10,22,9)}c.globalAlpha=1;
  JG.itens.forEach(it=>jgItem(c,it));
  const h=jgCapH(),w=jgCapW(),y=H-6-h;
  if(JG.img&&JG.img.complete&&JG.img.naturalWidth){if(JG.grande>0){c.save();c.shadowColor='rgba(224,161,0,.9)';c.shadowBlur=20}c.drawImage(JG.img,JG.x-w/2,y,w,h);if(JG.grande>0)c.restore()}
  JG.fx.forEach(f=>{const q=f.v/f.d,yy=f.y-(1-q)*(f.tipo==='niv'?10:26);c.globalAlpha=Math.min(1,q*1.6);c.textAlign='center';
    c.font=`700 ${f.tipo==='niv'?20:f.tipo==='ok'?18:14}px ${JG.fonte}`;c.lineWidth=4;c.strokeStyle='rgba(255,249,227,.95)';c.strokeText(f.txt,f.x,yy);
    c.fillStyle={ok:'#0F5C70',ouro:'#9A6400',mal:'#C62828',niv:JG_IK}[f.tipo];c.fillText(f.txt,f.x,yy)});c.globalAlpha=1;
  if(JG.grande>0){const bw=150,bx=(W-bw)/2;jgRR(c,bx,10,bw,8,4);c.fillStyle='rgba(0,0,0,.12)';c.fill();jgRR(c,bx,10,Math.max(8,bw*JG.grande/JG_GRANDE),8,4);c.fillStyle='#E0A100';c.fill();
    c.font=`600 11px ${JG.fonte}`;c.textAlign='center';c.fillStyle='#7A5200';c.fillText(`capivara grande · ${JG.grande.toFixed(1).replace('.',',')} s`,W/2,32)}
  c.restore();
  if(JG.flash>0){c.strokeStyle=`rgba(198,40,40,${(JG.flash/.35*.55).toFixed(3)})`;c.lineWidth=10;c.strokeRect(0,0,W,H)}}

// ---- a logo vira o botão do jogo (barra lateral e topo do celular) — só para quem tem o acesso
function jgLogos(){const p=jgPode();document.querySelectorAll('.nav-marca .logo, .topbar .brand .logo').forEach(l=>{const nav=!!l.closest('.nav-marca');
    if(p){if(l.classList.contains('jg-logo'))return;l.classList.add('jg-logo');l.removeAttribute('aria-hidden');l.setAttribute('role','button');l.tabIndex=0;l.setAttribute('aria-label','Abrir o jogo da Capivara');l.title='Capivara Comilona — toque para jogar'}
    else{if(!l.classList.contains('jg-logo'))return;l.classList.remove('jg-logo');l.removeAttribute('tabindex');l.removeAttribute('title');
      if(nav){l.removeAttribute('role');l.removeAttribute('aria-label');l.setAttribute('aria-hidden','true')}else{l.setAttribute('role','img');l.setAttribute('aria-label','Logotipo CAP-Refeições')}}});
  if(!p){const m=$('jogo-modal');if(m&&m.classList.contains('on')){jgFechar();jgReset()}}}
document.addEventListener('click',e=>{const l=e.target&&e.target.closest?e.target.closest('.jg-logo'):null;if(l&&jgPode()){e.preventDefault();e.stopPropagation();jgAbrir()}});
document.addEventListener('keydown',e=>{const l=e.target;if((e.key==='Enter'||e.key===' ')&&l&&l.classList&&l.classList.contains('jg-logo')&&jgPode()){e.preventDefault();jgAbrir()}});
// saiu, trocou de usuário ou perdeu o acesso com o jogo aberto: fecha e zera a partida
setInterval(()=>{const m=$('jogo-modal');if(m&&m.classList.contains('on')&&(!USER||USER.id!==JG.uid||!jgPode())){jgFechar();jgReset()}},1500);

/* =================== v3.1.0 (prévia): CONFIGURAÇÕES › PERMISSÕES — liberar por AÇÃO ===================
   Escolhe a ação à esquerda e, à direita, quem tem e quem não tem. As mudanças ficam pendentes (de várias ações) até
   "Revisar e salvar". Grava nas mesmas permissões do usuário (Usuários continua mostrando o mesmo). Regras iguais às de Usuários:
   administrador sempre tem tudo; quem não é administrador não altera administradores, nem a si mesmo, nem uma ação que não tem. */
const PM_INFO={
  'rest.registrar':{t:'Registrar refeições',d:'Ler o crachá (ou escolher pelo nome) e registrar a refeição com a foto.'},
  'rest.sobras':{t:'Informar sobras',d:'Registrar refeições preparadas e não consumidas — são cobradas no BM.'},
  'rest.estornar':{t:'Estornar registro do dia',d:'Desfazer uma refeição registrada hoje, antes de entrar em BM — sempre com justificativa, que fica na Auditoria. O servidor só aceita a refeição do dia.',s:'Apaga uma refeição já registrada.'},
  'rest.data_manual':{t:'Registrar com data manual',d:'Lançar uma refeição com data passada, uma de cada vez.',r:['rest.registrar'],s:'Permite lançar refeição em dia anterior.'},
  'rest.retroativo':{t:'Registros retroativos',d:'Vários colaboradores de uma vez, com data passada.',r:['rest.registrar'],s:'Permite lançar refeições em dias anteriores, em lote.'},
  'rest.validar':{t:'Validar BM (restaurante)',d:'Só assina (eletronicamente) o BM que aguarda o restaurante. Não altera valores, itens, situação nem assinaturas — o servidor recusa.'},
  'sup.registros':{t:'Ver Registros',d:'Administrativo › Registros e Sobras informadas.'},
  'sup.boletins':{t:'Ver Boletins emitidos',d:'Administrativo › Boletins emitidos.'},
  'sup.bm':{t:'Emitir e assinar BM',d:'Emitir, fechar, imprimir e assinar o Boletim de Medição.',s:'Gera o documento de cobrança.'},
  'sup.nf':{t:'Nota fiscal do BM',d:'Informar a nota fiscal e o Nº do título e anexar o BM assinado. Sozinho, não altera valores nem assinaturas.'},
  'bm.rem_ass':{t:'Remover assinatura do BM',d:'Com justificativa. Sem este acesso, o servidor não deixa tirar nem trocar assinatura.',r:['sup.bm'],s:'Desfaz uma assinatura já dada.'},
  'sup.fechar':{t:'Fechar refeição sem BM',d:'Tirar uma refeição da medição, com justificativa.',r:['sup.registros'],s:'A refeição deixa de ser cobrada.'},
  'sup.fechamento':{t:'Validar o fechamento do dia',d:'Administrativo › Fechamento. Reabrir um dia validado é só do administrador.'},
  'fotos.ver':{t:'Ver fotos dos registros',d:'Ver a foto do rosto em cada registro.',s:'Dado pessoal (LGPD).'},
  'ana.ver':{t:'Analítico',d:'Painel de gráficos.'},
  'aud.ver':{t:'Auditoria — Movimentações',d:'Trilha de auditoria: quem fez o quê e quando.',s:'Mostra a atividade de todos os usuários.'},
  'aud.arquivos':{t:'Auditoria — Arquivos compactados',d:'Guia dos arquivos de fotos compactados.'},
  'aud.usuarios':{t:'Auditoria — Registro de usuários',d:'Quem está online, último acesso e tempo logado.',s:'Mostra a atividade de todos os usuários.'},
  'fotos.baixar':{t:'Baixar fotos compactadas',d:'Baixar os arquivos .zip com as fotos.',r:['aud.arquivos'],s:'Dado pessoal (LGPD) em massa.'},
  'del.bm':{t:'Excluir BM',d:'Por contrato: só o último de cada contrato e centro de custo; por pedido: qualquer um.',s:'Exclusão.'},
  'del.sobras':{t:'Excluir sobras',d:'Excluir sobras informadas.',s:'Exclusão.'},
  'del.registros':{t:'Excluir registro de refeição',d:'Excluir uma refeição avulsa em Administrativo › Registros, de qualquer dia, com justificativa (fica na Auditoria). Refeição já em BM não sai.',s:'Apaga uma refeição de qualquer dia.'},
  'del.empresas':{t:'Excluir empresas',d:'Excluir empresas.',s:'Exclusão.'},
  'del.obras':{t:'Excluir obras',d:'Excluir obras.',s:'Exclusão.'},
  'cfg.contratos':{t:'Modalidades e contratos',d:'Cadastrar contratos e os vínculos das obras (contrato / pedido). Alterar o vínculo exige também “Cadastrar obras”.'},
  'cfg.usuarios':{t:'Usuários e permissões',d:'Cadastrar usuários e liberar ou tirar acessos (inclusive nesta tela). Quem não é administrador só dá ou tira o que ele mesmo tem — o servidor confere.',s:'Controla o acesso de todos.'},
  'cfg.colab':{t:'Cadastrar colaboradores',d:'Cadastrar e realocar colaboradores (crachás).'},
  'cfg.empresas':{t:'Cadastrar empresas',d:'Cadastrar empresas e logotipos.'},
  'cfg.obras':{t:'Cadastrar obras',d:'Cadastrar obras e o Gestor / Engenheiro.'},
  'cfg.precos':{t:'Alterar preços',d:'Preços das refeições por contrato.',s:'Muda o valor cobrado.'},
  'cfg.contratada':{t:'Cadastrar contratadas',d:'Restaurantes e as obras que cada um atende.'},
  'cfg.horarios':{t:'Horários de registro',d:'Horário limite para registrar cada refeição.'},
  'lgpd.gerir':{t:'Privacidade (LGPD)',d:'Encarregado, prazos de guarda e relatório de dados do titular.',s:'Dados pessoais.'},
  'jogo.jogar':{t:'Jogo da Capivara',d:'Tocar na logo da capivara para jogar (pontuação e ranking por usuário).'}};
const PM={sel:null,busca:'',filtro:'todas',quem:'todos',ubusca:'',inativos:false,pend:new Map(),det:false,fech:new Set()};
// tópicos recolhidos na lista de ações (lembrado neste aparelho)
const PM_GRP_KEY='sismed_pm_grupos';try{const v=JSON.parse(localStorage.getItem(PM_GRP_KEY)||'[]');if(Array.isArray(v))v.forEach(g=>PM.fech.add(String(g)))}catch(e){}
function pmGrpGuarda(){try{localStorage.setItem(PM_GRP_KEY,JSON.stringify([...PM.fech]))}catch(e){}}
// lista das ações (na ordem de PERMS, com o grupo de cada uma)
function pmAcoes(){const L=[];let g='';PERMS.forEach(q=>{if(q.grp){g=q.grp.replace(/\s*\(.*\)$/,'').replace(/^Configurações › /,'');return}if(q.oculta)return;
  const i=PM_INFO[q.id]||{};const p=String(q.nome).split(' — ');L.push({id:q.id,g,t:i.t||p[0],d:i.d||p.slice(1).join(' — '),r:i.r||[],s:i.s||''})});return L}
function pmAcao(id){return pmAcoes().find(a=>a.id===id)}
function pmUsuarios(){return S.users.filter(u=>u.status!=='pendente').sort((a,b)=>(isAdm(b)-isAdm(a))||(String(a.nome||'').localeCompare(String(b.nome||''),'pt-BR')))}
function pmBase(u,a){return isAdm(u)||permsEfetivas(u.perms).includes(a)}
function pmTem(u,a){if(isAdm(u))return true;const p=PM.pend.get(u.id);if(p){if(p.add.has(a))return true;if(p.del.has(a))return false}return permsEfetivas(u.perms).includes(a)}
function pmTrava(u,a){   // por que esta linha não pode ser alterada por quem está usando ('' = pode)
  if(isAdm(u))return 'Administrador — tem todas as permissões. Para tirar, mude o tipo em Usuários.';
  if(!isAdm(USER)){if(souEu(u))return 'Você não altera as próprias permissões — peça a um administrador.';if(!can(a))return 'Você não tem esta permissão; só quem tem (ou um administrador) pode liberá-la ou tirá-la.'}
  return ''}
function pmNPend(){let n=0;PM.pend.forEach(p=>n+=p.add.size+p.del.size);return n}
function pmAcoesPend(){const s=new Set();PM.pend.forEach(p=>{p.add.forEach(a=>s.add(a));p.del.forEach(a=>s.add(a))});return s}
function pmToggle(u,a,on){if(pmTrava(u,a))return;let p=PM.pend.get(u.id);if(!p){p={add:new Set(),del:new Set()};PM.pend.set(u.id,p)}
  const base=pmBase(u,a);p.add.delete(a);p.del.delete(a);if(on&&!base)p.add.add(a);if(!on&&base)p.del.add(a);
  if(!p.add.size&&!p.del.size)PM.pend.delete(u.id)}
function pmContagem(a){const L=pmUsuarios().filter(u=>u.ativo!==false);return {com:L.filter(u=>pmTem(u,a)).length,tot:L.length}}

function renderPermissoes(){const el=$('cfg-permissoes');if(!el)return;const A=pmAcoes();if(!PM.sel||!A.some(a=>a.id===PM.sel))PM.sel=A[0]&&A[0].id;
  if(!el.dataset.ok){el.dataset.ok='1';el.innerHTML=`<div class="pm" id="pm">
      <aside class="pm-lista card" aria-label="Ações do sistema">
        <div class="pm-lista-cab"><h3>Ações</h3><span class="small muted" id="pm-n-acoes"></span><span class="sp"></span><button type="button" class="lnk-btn pm-tudo-grp" id="pm-tudo-grp"></button></div>
        <div class="pm-busca"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="search" id="pm-busca" placeholder="Buscar ação" aria-label="Buscar ação" autocomplete="off"></div>
        <div class="seg pm-seg" role="group" aria-label="Filtrar ações"><button type="button" data-pf="todas">Todas</button><button type="button" data-pf="sens">Sensíveis</button><button type="button" data-pf="pend">Alteradas</button></div>
        <div class="pm-grupos" id="pm-grupos"></div>
      </aside>
      <section class="pm-det card" id="pm-det" aria-live="polite"></section>
    </div>
    <div class="pm-barra" id="pm-barra" hidden role="region" aria-label="Alterações não salvas"><span class="pm-barra-t" id="pm-barra-t"></span><span class="sp"></span><button type="button" class="btn sec" id="pm-descartar">Descartar</button><button type="button" class="btn" id="pm-revisar">Revisar e salvar</button></div>`;
    $('pm-busca').oninput=e=>{PM.busca=e.target.value;pmLista()};
    el.querySelectorAll('[data-pf]').forEach(b=>b.onclick=()=>{PM.filtro=b.dataset.pf;pmLista()});
    $('pm-descartar').onclick=()=>{const n=pmNPend();if(!n)return;PM.pend.clear();pmTudo();toast(`${n} ${n===1?'alteração descartada':'alterações descartadas'}`)};
    $('pm-revisar').onclick=pmRevisar;
    $('pm-tudo-grp').onclick=()=>{const G=[...new Set(pmAcoes().map(a=>a.g))];const todos=G.every(g=>PM.fech.has(g));if(todos)PM.fech.clear();else G.forEach(g=>PM.fech.add(g));pmGrpGuarda();pmLista()}}
  pmTudo()}
function pmTudo(){pmLista();pmDet();pmBarra()}
function pmLista(){const g=$('pm-grupos');if(!g)return;const A=pmAcoes(),pend=pmAcoesPend(),q=semNorm(PM.busca||'');
  document.querySelectorAll('#cfg-permissoes [data-pf]').forEach(b=>{const on=b.dataset.pf===PM.filtro;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on))});
  const L=A.filter(a=>(!q||semNorm(a.t+' '+a.d+' '+a.g).includes(q))&&(PM.filtro!=='sens'||a.s)&&(PM.filtro!=='pend'||pend.has(a.id)));
  $('pm-n-acoes').textContent=`${L.length} de ${A.length}`;
  // v3.1.0: cada tópico (Restaurante, Administrativo, Exclusões…) recolhe e expande; buscando ou filtrando, tudo fica aberto
  const livre=!q&&PM.filtro==='todas',G=[];L.forEach(a=>{let x=G.find(y=>y.g===a.g);if(!x)G.push(x={g:a.g,L:[]});x.L.push(a)});
  const todosG=[...new Set(A.map(a=>a.g))],tg=$('pm-tudo-grp');if(tg){tg.hidden=!livre;tg.textContent=todosG.every(x=>PM.fech.has(x))?'Expandir todos':'Recolher todos'}
  const item=a=>{const c=pmContagem(a.id);return `<button type="button" class="pm-acao${a.id===PM.sel?' on':''}" data-pa="${esc(a.id)}" aria-current="${a.id===PM.sel?'true':'false'}"><span class="pm-a-t">${esc(a.t)}${a.s?'<i class="pm-sens" title="Sensível" aria-label="sensível"></i>':''}</span>${pend.has(a.id)?'<span class="pm-a-pend" title="alterada, não salva">alterada</span>':''}<span class="pm-a-n num" title="${c.com} de ${c.tot} usuários ativos">${c.com}/${c.tot}</span></button>`};
  g.innerHTML=G.map((x,i)=>{const fech=livre&&PM.fech.has(x.g),np=x.L.filter(a=>pend.has(a.id)).length,sel=x.L.some(a=>a.id===PM.sel);
      return `<div class="pm-gr${fech?' fech':''}"><button type="button" class="pm-grp${sel?' tem-sel':''}" data-pg="${esc(x.g)}" aria-expanded="${!fech}" aria-controls="pm-gb-${i}"${livre?'':' disabled'}><span class="pm-grp-chev" aria-hidden="true">▾</span><span class="pm-grp-t">${esc(x.g)}</span>${np?`<span class="pm-a-pend" title="alterações não salvas neste tópico">${np}</span>`:''}<span class="pm-grp-n">${x.L.length}</span></button>
        <div class="pm-grp-b" id="pm-gb-${i}"${fech?' hidden':''}>${x.L.map(item).join('')}</div></div>`}).join('')
    ||'<div class="pm-vazio small muted">Nenhuma ação com esse filtro.</div>';
  g.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{const k=b.dataset.pg;if(PM.fech.has(k))PM.fech.delete(k);else PM.fech.add(k);pmGrpGuarda();pmLista();const n=[...document.querySelectorAll('#pm-grupos [data-pg]')].find(x=>x.dataset.pg===k);if(n)n.focus()});
  g.querySelectorAll('[data-pa]').forEach(b=>b.onclick=()=>{PM.sel=b.dataset.pa;PM.det=true;pmTudo();const d=$('pm-det');if(d&&matchMedia('(max-width:899px)').matches){const m=document.querySelector('main');if(m)m.scrollTop=0;window.scrollTo(0,0)}})}
function pmDet(){const el=$('pm-det');if(!el)return;const a=pmAcao(PM.sel);$('pm').classList.toggle('det',!!PM.det);if(!a){el.innerHTML='';return}
  const todos=pmUsuarios(),vis=todos.filter(u=>PM.inativos||u.ativo!==false),q=semNorm(PM.ubusca||'');
  const com=vis.filter(u=>pmTem(u,a.id)).length,sem=vis.length-com,nAdm=vis.filter(isAdm).length,nIn=todos.filter(u=>u.ativo===false).length,nPendC=S.users.filter(u=>u.status==='pendente').length;
  const L=vis.filter(u=>(!q||semNorm(u.nome+' '+u.login+' '+(u.perfil||'')+' '+(u.tipo||'')).includes(q))&&(PM.quem==='todos'||(PM.quem==='com')===pmTem(u,a.id)));
  const nome=id=>(pmAcao(id)||{t:id}).t;
  const linha=u=>{const tem=pmTem(u,a.id),tr=pmTrava(u,a.id),p=PM.pend.get(u.id),mud=!!p&&(p.add.has(a.id)||p.del.has(a.id));
    const falta=tem&&!isAdm(u)?a.r.filter(r=>!pmTem(u,r)):[];
    const quebra=!tem&&!isAdm(u)?pmAcoes().filter(x=>x.r.includes(a.id)&&pmTem(u,x.id)).map(x=>x.t):[];
    return `<div class="pm-u${mud?' mud':''}${u.ativo===false?' inat':''}" role="listitem">
      <span class="av-s" aria-hidden="true">${ini(u.nome)}</span>
      <div class="pm-u-t"><b>${esc(u.nome)}${souEu(u)?' <small>(você)</small>':''}</b><small><span class="mono">${esc(u.login||'')}</span> · ${esc(u.perfil||'—')}</small>
        ${falta.length?`<span class="pm-aviso">Precisa também de “${esc(falta.map(nome).join('”, “'))}” <button type="button" class="lnk-btn" data-pmr="${esc(u.id)}" data-r="${esc(falta.join(','))}">liberar também</button></span>`:''}
        ${quebra.length?`<span class="pm-aviso">Sem esta, deixa de funcionar: “${esc(quebra.join('”, “'))}”</span>`:''}</div>
      <div class="pm-u-meta"><span class="pill ${isAdm(u)?'warn':'neutral'} pm-tipo">${esc(u.tipo||'—')}</span>${u.ativo===false?'<span class="pill bad">inativo</span>':''}${mud?`<span class="pm-mud">${tem?'vai ganhar':'vai perder'}</span>`:''}</div>
      <button type="button" class="switch${tem?' on':''}" role="switch" aria-checked="${tem}" data-pmu="${esc(u.id)}" ${tr?'disabled':''} title="${esc(tr||(tem?'Tirar':'Liberar')+' para '+u.nome)}" aria-label="${esc((tem?'Tirar ':'Liberar ')+a.t+' — '+u.nome)}"></button></div>`};
  const req=a.r.length?`<span class="pm-tag">Exige também: ${esc(a.r.map(nome).join(', '))}</span>`:'';
  const usadoPor=pmAcoes().filter(x=>x.r.includes(a.id)).map(x=>x.t);
  el.innerHTML=`<button type="button" class="pm-voltar" id="pm-voltar">‹ Todas as ações</button>
    <div class="pm-det-cab"><span class="ph-eb">${esc(a.g)}</span><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p>
      <div class="pm-tags">${a.s?`<span class="pm-tag sens"><i class="pm-sens" aria-hidden="true"></i>Sensível — ${esc(a.s)}</span>`:''}${req}${usadoPor.length?`<span class="pm-tag">É base para: ${esc(usadoPor.join(', '))}</span>`:''}<span class="pm-tag mono">${esc(a.id)}</span></div></div>
    <div class="pm-resumo"><div><b class="num">${com}</b><span>com acesso</span></div><div><b class="num">${sem}</b><span>sem acesso</span></div><div><b class="num">${nAdm}</b><span>${nAdm===1?'administrador (sempre tem)':'administradores (sempre têm)'}</span></div></div>
    ${!isAdm(USER)&&!can(a.id)?'<div class="notice warn small">Você não tem esta permissão, então só pode ver quem tem. Para mudar, peça a um administrador.</div>':''}
    <div class="pm-ferr"><div class="seg pm-seg" role="group" aria-label="Mostrar"><button type="button" data-pq="todos">Todos (${vis.length})</button><button type="button" data-pq="com">Com acesso (${com})</button><button type="button" data-pq="sem">Sem acesso (${sem})</button></div>
      <div class="pm-busca pm-ubusca"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="search" id="pm-ubusca" placeholder="Buscar usuário" aria-label="Buscar usuário" value="${esc(PM.ubusca)}" autocomplete="off"></div>
      ${nIn?`<label class="pm-inat"><input type="checkbox" id="pm-inat" ${PM.inativos?'checked':''}> Mostrar inativos (${nIn})</label>`:''}</div>
    <div class="pm-us" role="list" aria-label="Usuários e o acesso a ${esc(a.t)}">${L.map(linha).join('')||'<div class="small muted pm-vazio">Nenhum usuário com esse filtro.</div>'}</div>
    ${nPendC?`<p class="small muted pm-nota">${nPendC} ${nPendC===1?'conta aguardando':'contas aguardando'} aprovação — aprove em Configurações › Usuários.</p>`:''}
    <p class="small muted pm-nota">As permissões mudam só aqui (Usuários cuida do cadastro). Quem estava num perfil (ex.: Restaurante) e ficar diferente dele passa a “Personalizado”.</p>`;
  $('pm-voltar').onclick=()=>{PM.det=false;pmDet();const b=document.querySelector(`#pm-grupos [data-pa="${PM.sel}"]`);if(b)b.focus()};
  el.querySelectorAll('[data-pq]').forEach(b=>{const on=b.dataset.pq===PM.quem;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));b.onclick=()=>{PM.quem=b.dataset.pq;pmDet()}});
  const ub=$('pm-ubusca');ub.oninput=()=>{PM.ubusca=ub.value;const p=ub.selectionStart;pmDet();const n=$('pm-ubusca');n.focus();try{n.setSelectionRange(p,p)}catch(e){}};
  const ci=$('pm-inat');if(ci)ci.onchange=()=>{PM.inativos=ci.checked;pmDet()};
  el.querySelectorAll('[data-pmu]').forEach(b=>b.onclick=()=>{const u=S.users.find(x=>x.id===b.dataset.pmu);if(!u)return;pmToggle(u,a.id,!pmTem(u,a.id));pmLista();pmDet();pmBarra();const n=document.querySelector(`#pm-det [data-pmu="${u.id}"]`);if(n)n.focus()});
  el.querySelectorAll('[data-pmr]').forEach(b=>b.onclick=()=>{const u=S.users.find(x=>x.id===b.dataset.pmr);if(!u)return;b.dataset.r.split(',').forEach(r=>{if(!pmTrava(u,r))pmToggle(u,r,true)});pmTudo()})}
function pmBarra(){const b=$('pm-barra');if(!b)return;const n=pmNPend(),na=pmAcoesPend().size;b.hidden=!n;
  {const tb=document.querySelector('.tabbar');b.style.bottom=matchMedia('(max-width:899px)').matches&&tb&&tb.offsetHeight?(tb.offsetHeight+8)+'px':''}   // no celular, logo acima da barra de baixo
  $('pm-barra-t').innerHTML=n?`<b class="num">${n}</b> ${n===1?'alteração não salva':'alterações não salvas'} · ${na} ${na===1?'ação':'ações'} · ${PM.pend.size} ${PM.pend.size===1?'usuário':'usuários'}`:''}
// revisar: o que cada usuário ganha e perde; avisa perfil e dependências; salva tudo de uma vez
function pmRevisar(){const n=pmNPend();if(!n)return;let m=$('pm-modal');
  if(!m){m=document.createElement('div');m.className='modal';m.id='pm-modal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-labelledby','pm-m-tit');
    m.innerHTML=`<div class="sheet narrow"><div class="mh"><h2 id="pm-m-tit">Revisar permissões</h2><button class="btn sec sm" type="button" id="pm-m-x">Fechar</button></div><div id="pm-m-body"></div>
      <div class="row" style="margin-top:14px;justify-content:flex-end;gap:8px"><button class="btn sec" type="button" id="pm-m-cancel">Voltar e continuar editando</button><button class="btn" type="button" id="pm-m-ok">Salvar alterações</button></div></div>`;
    document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('on')});
    $('pm-m-x').onclick=$('pm-m-cancel').onclick=()=>m.classList.remove('on');
    m.addEventListener('keydown',e=>{if(e.key==='Escape')m.classList.remove('on')});
    $('pm-m-ok').onclick=pmSalvar}
  const nome=id=>(pmAcao(id)||{t:id}).t;
  const blocos=[...PM.pend.entries()].map(([id,p])=>{const u=S.users.find(x=>x.id===id);if(!u)return '';
    const novo=pmNovas(u),pf=u.perfilId&&perfil(u.perfilId),sai=pf&&!pmMesmo(novo,permsEfetivas(pf.perms));
    const falta=[...novo].flatMap(a=>((pmAcao(a)||{}).r||[]).filter(r=>!novo.has(r)).map(r=>`“${nome(a)}” precisa de “${nome(r)}”`));
    return `<div class="pm-rev"><div class="pm-rev-u"><span class="av-s" aria-hidden="true">${ini(u.nome)}</span><b>${esc(u.nome)}</b><span class="mono small muted">${esc(u.login||'')}</span></div>
      ${p.add.size?`<div class="pm-rev-l add"><span>Ganha</span><ul>${[...p.add].map(a=>`<li>${esc(nome(a))}</li>`).join('')}</ul></div>`:''}
      ${p.del.size?`<div class="pm-rev-l del"><span>Perde</span><ul>${[...p.del].map(a=>`<li>${esc(nome(a))}</li>`).join('')}</ul></div>`:''}
      ${sai?`<div class="small muted">Sai do perfil “${esc(pf.nome)}” e passa a “Personalizado”.</div>`:''}
      ${falta.length?`<div class="notice warn small">${esc(falta.join('; '))} — não vai funcionar até liberar.</div>`:''}</div>`}).join('');
  $('pm-m-body').innerHTML=`<p class="small muted" style="margin:0 0 10px">${n} ${n===1?'alteração':'alterações'} para ${PM.pend.size} ${PM.pend.size===1?'usuário':'usuários'}. Fica registrado na Auditoria.</p>${blocos}`;
  m.classList.add('on');setTimeout(()=>{const b=$('pm-m-ok');if(b)b.focus()},30)}
function pmNovas(u){const s=new Set(permsEfetivas(u.perms));const p=PM.pend.get(u.id);if(p){p.add.forEach(a=>s.add(a));p.del.forEach(a=>s.delete(a))}s.delete(ACESSO_MARCA);return s}
function pmMesmo(a,b){const B=new Set(b);B.delete(ACESSO_MARCA);return a.size===B.size&&[...a].every(x=>B.has(x))}
function pmSalvar(){const nome=id=>(pmAcao(id)||{t:id}).t;let n=0;
  for(const [id,p] of PM.pend){const u=S.users.find(x=>x.id===id);if(!u||isAdm(u))continue;
    if([...p.add,...p.del].some(a=>pmTrava(u,a))){toast(`Sem permissão para alterar ${u.nome}`,'bad');return}}
  for(const [id,p] of [...PM.pend]){const u=S.users.find(x=>x.id===id);if(!u||isAdm(u))continue;
    const antes={perfil:u.perfil,perms:u.perms},novo=pmNovas(u),pf=u.perfilId&&perfil(u.perfilId);
    u.perms=[...novo,ACESSO_MARCA];if(pf&&!pmMesmo(novo,permsEfetivas(pf.perms))){u.perfilId=null;u.perfil='Personalizado'}
    const partes=[p.add.size?'liberou: '+[...p.add].map(nome).join(', '):'',p.del.size?'tirou: '+[...p.del].map(nome).join(', '):''].filter(Boolean).join(' — ');
    audit('usuario.permissoes',`Permissões de ${u.nome} (${u.login}) — ${partes}`,{entidade:'usuário '+u.login,antes:JSON.stringify(antes),depois:JSON.stringify({perfil:u.perfil,perms:u.perms})});n+=p.add.size+p.del.size}
  PM.pend.clear();const m=$('pm-modal');if(m)m.classList.remove('on');
  concluir(`${n} ${n===1?'permissão alterada':'permissões alteradas'}`);pmTudo()}   // (a própria permissão não muda por aqui: não precisa refazer o menu)

/* =================== v3.1.0 (prévia): Obras — na tela só a lista; o formulário aparece em "Nova obra" ou "Editar" =================== */
function obraForm(on){const c=$('o-cols');if(!c)return;const era=c.classList.contains('o-form');c.classList.toggle('o-lista',!on);c.classList.toggle('o-form',!!on);
  if(on&&!era){const f=c.querySelector('.o-form-card');if(f&&f.scrollIntoView)f.scrollIntoView({block:'start'})}}   // o formulário logo no alto da tela
{const pane=$('cfg-obras');
  // na fase de captura: mostra o formulário ANTES do clique do botão preencher e pôr o foco nos campos
  if(pane)pane.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#o-new,[data-o],[data-dobra],[data-dctobra],#o-voltar,#o-cancel');if(!t)return;
    obraForm(!(t.id==='o-voltar'||t.id==='o-cancel'))},true);
  const v=$('o-voltar');if(v)v.onclick=()=>{OEDIT=null;fillObra()}}

/* =================== v3.1.0: ESTORNO COM JUSTIFICATIVA, PELO SERVIDOR ===================
   O estorno vai pela função estornar_registros do banco: ela exige o acesso "Estornar registro do dia", a justificativa e que a
   refeição seja de hoje, fora de BM e não fechada — e grava a Auditoria (com a justificativa). Sem internet, o estorno fica
   guardado neste aparelho, com a justificativa, e vai quando a internet voltar. Se o servidor recusar (ex.: entrou em BM nesse
   meio-tempo), a refeição volta para a tela e o usuário é avisado. Banco ainda sem a v3.1.0: apaga como antes. */
const EST_KEY='sismed_estornos';let ESTORNOS={};   // id do registro → {motivo, lote, em}
function estGuardar(){try{if(!USER)return;if(!Object.keys(ESTORNOS).length){localStorage.removeItem(EST_KEY);return}localStorage.setItem(EST_KEY,JSON.stringify({uid:USER.id,l:ESTORNOS}))}catch(e){}}
function estRecuperar(){ESTORNOS={};try{const v=JSON.parse(localStorage.getItem(EST_KEY)||'null');if(!v)return;
  if(!USER||v.uid!==USER.id||!v.l||typeof v.l!=='object'){localStorage.removeItem(EST_KEY);return}   // de outra pessoa: descarta
  Object.entries(v.l).forEach(([id,e])=>{if(RX_ID.test(id)&&e&&typeof e.motivo==='string'&&e.motivo.trim().length>=5)ESTORNOS[id]={motivo:e.motivo.trim().slice(0,500),lote:typeof e.lote==='string'&&RX_ID.test(e.lote)?e.lote:null,em:typeof e.em==='string'?e.em:''}})}catch(e){}}
function estMarcar(regs,motivo,lote){const em=new Date().toISOString();regs.forEach(r=>{ESTORNOS[r.id]={motivo:String(motivo).trim().slice(0,500),lote:lote||null,em}});estGuardar()}
// a refeição que o servidor não deixou estornar volta para a tela, como está no servidor
function estVolta(id,cur){delete ESTORNOS[id];try{const bruto=JSON.parse(LAST.registros[id]);const d0=DESCARTADAS;const r=limpaLinha('registros',{...bruto,id})||bruto;DESCARTADAS=d0;
  if(!S.registros.some(x=>x.id===id))S.registros.push(r);cur[id]=LAST.registros[id];return r}catch(e){return null}}
async function estEnviar(dels,cur){
  const est=dels.filter(id=>ESTORNOS[id]),resto=dels.filter(id=>!ESTORNOS[id]);if(!est.length)return resto;
  const G=new Map();est.forEach(id=>{const e=ESTORNOS[id],k=(e.lote||'')+'\u0001'+e.motivo;let g=G.get(k);if(!g)G.set(k,g={motivo:e.motivo,lote:e.lote,ids:[]});g.ids.push(id)});
  const volta=[];
  for(const g of G.values()){
    const {data,error}=await sb.rpc('estornar_registros',{p_ids:g.ids,p_motivo:g.motivo,p_lote:g.lote||null});
    if(error){const m=String(error.message||'')+' '+String(error.code||'');
      if(/PGRST202|Could not find the function|estornar_registros/i.test(m)){   // banco ainda sem a v3.1.0: apaga como antes, com a Auditoria feita aqui
        g.ids.forEach(id=>{let r=null;try{r=JSON.parse(LAST.registros[id])}catch(e){}
          if(r)audit(g.lote?'refeicao.retroativo_estornar':'refeicao.estornar',`${tipo(r.tipo).curto} de ${r.nome} (${money(r.valor)}) registrada às ${hm(r.registradoEm)} — motivo: ${g.motivo}`,{obra:r.obraNome,empresa:r.empresaNome,entidade:g.lote?'lote retroativo '+g.lote:'registro '+id});
          delete ESTORNOS[id]});
        resto.push(...g.ids);continue}
      if(REGRA_OBRA.test(String(error.message||''))){g.ids.forEach(id=>{const r=estVolta(id,cur);if(r)volta.push([r,String(error.message||'').replace(/^Dados inválidos:\s*/i,'')])});continue}
      estGuardar();throw error}
    (data&&Array.isArray(data.recusados)?data.recusados:[]).forEach(x=>{const r=x&&estVolta(x.id,cur);if(r)volta.push([r,String(x.motivo||'recusado')])});
    g.ids.forEach(id=>delete ESTORNOS[id])}
  estGuardar();
  if(volta.length){toast(volta.length===1?`O estorno da refeição de ${volta[0][0].nome} não foi aceito pelo servidor (${volta[0][1]}). Ela continua registrada.`
      :`${volta.length} estornos não foram aceitos pelo servidor (${[...new Set(volta.map(v=>v[1]))].join('; ')}). As refeições continuam registradas.`,'bad');
    setTimeout(()=>{try{if(PAGE==='rest')renderRest();else if(PAGE==='sup'&&!$('bm-modal').classList.contains('on')&&!titEditando())renderSup()}catch(e){}},60)}
  return resto}
// "Estornar" na lista de últimos registros do Restaurante
function estornarRegistro(id){const rr=S.registros.find(r=>r.id===id);if(!rr||!can('rest.estornar')||rr.bmId||rr.fechado)return;if(diaTravadoAviso(rr))return;
  justModal({titulo:'Estornar refeição',
    resumo:`<div class="notice warn">${br(rr.data)} · ${tipo(rr.tipo).curto} — <b>${esc(rr.nome)}</b> (${esc(rr.empresaNome)} · ${esc(rr.obraNome||'—')}) · ${money(rr.valor)} · registrada às ${hm(rr.registradoEm)}.<br>A refeição sai do sistema e não entra em BM. Só vale para a refeição de hoje. A justificativa fica na Auditoria.</div>`,
    botao:'Estornar refeição',classe:'danger',
    onOk:motivo=>{const x=S.registros.find(r=>r.id===id);
      if(!x||x.bmId||x.fechado){toast('A refeição mudou enquanto a janela estava aberta (entrou em BM ou foi fechada) — não foi estornada.','warn');renderRest();return}
      estMarcar([x],motivo);S.registros=S.registros.filter(r=>r.id!==id);concluir('Refeição estornada');renderRest()}})}

/* =================== v3.1.1: EXCLUIR REGISTRO AVULSO (Administrativo › Registros) ===================
   Acesso "Excluir registro de refeição" (del.registros) — o administrador sempre pode. Exclui UMA refeição de qualquer dia
   (inclusive "fechada sem BM"), com justificativa, pela função excluir_registro do banco, que confere o acesso, o restaurante
   e se a refeição está fora de BM — e grava a Auditoria com a justificativa. Precisa de internet (não fica pendente).
   Refeição em BM não sai (o BM já tem os valores); dia validado no Fechamento: o administrador reabre antes. */
function regExcPode(){return !!USER&&(isAdm(USER)||can('del.registros'))}
async function excluirRegistroAvulso(id){const r=S.registros.find(x=>x.id===id);if(!r||!regExcPode())return;
  if(r.bmId){const b=S.bms.find(x=>x.id===r.bmId);toast(`Esta refeição está no BM nº ${b?b.numero:'—'} e não pode ser excluída. Para tirá-la, o BM precisa ser excluído e emitido de novo.`,'warn');return}
  if(diaTravadoAviso(r))return;
  justModal({titulo:'Excluir registro de refeição',
    resumo:`<div class="notice warn">${br(r.data)} · ${tipo(r.tipo).curto} — <b>${esc(r.nome)}</b> (${esc(r.empresaNome)} · ${esc(r.obraNome||'—')}) · ${money(r.valor)} · registrada por ${esc(r.usuario||'—')} em ${brdt(r.registradoEm)}${r.fechado?' · <b>fechada sem BM</b>':''}.<br>A refeição sai do sistema e não entra em BM. Não dá para desfazer; a justificativa fica na Auditoria.</div>`,
    botao:'Excluir registro',classe:'danger',
    onOk:async motivo=>{
      const x=S.registros.find(y=>y.id===id);if(!x){toast('A refeição já não está mais na lista.','warn');renderSup();return}
      if(x.bmId){toast('A refeição entrou num BM enquanto a janela estava aberta — não foi excluída.','warn');renderSup();return}
      if(navigator.onLine===false||!(await sessaoValida())){toast('Sem conexão com o servidor: a exclusão precisa de internet. Nada foi excluído — tente de novo.','warn');return}
      let data=null,error=null;try{({data,error}=await sb.rpc('excluir_registro',{p_id:id,p_motivo:motivo}))}catch(e){error=e}
      if(error){const m=String(error.message||error)+' '+String(error.code||'');
        if(/PGRST202|Could not find the function|excluir_registro/i.test(m)){toast('Falta rodar no Supabase o SQL da v3.1.1 (sismed-v3.1.1-banco-excluir.sql). Nada foi excluído.','bad');return}
        if(ehFalhaRede(error)){toast('Sem conexão com o servidor: nada foi excluído — tente de novo.','warn');return}
        toast('O servidor não excluiu: '+String(error.message||error).replace(/^Dados inválidos:\s*/i,'').slice(0,180),'bad');return}
      // já saiu do servidor: tira deste aparelho sem mandar de novo
      S.registros=S.registros.filter(y=>y.id!==id);if(LAST&&LAST.registros)delete LAST.registros[id];try{delete ESTORNOS[id]}catch(e){}
      try{localStorage.setItem(CACHE_KEY,JSON.stringify(S))}catch(e){}
      sucesso(data&&data.excluido===false?'Esta refeição já tinha sido excluída em outro aparelho':`Registro de ${String(r.nome||'').split(' ')[0]} (${br(r.data)} · ${tipo(r.tipo).curto}) excluído`);
      refreshBadges();renderSup();setTimeout(()=>{try{atualizarDados()}catch(e){}},900)}})}
{const t=$('sup-table');if(t)t.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-rexc]');if(b){e.preventDefault();excluirRegistroAvulso(b.dataset.rexc)}})}

/* v3.0.1: o boletim V1 (o de antes), como função — mesma marcação da tela */
function bmDocV1(b){const K=bmK(b),E=emp(b.empresaId),isDraft=b.status==='rascunho',mes=parse(b.ini).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}).toUpperCase(),TG=tercGrupos(bmRegs(b)),tot=k=>b.itens.reduce((s,i)=>s+(i[k]||0),0),anyCt=b.itens.some(i=>i.qtdCt!==null),dash=v=>v===null||v===undefined?'—':v;
  return `<div class="bmdoc">
    <div class="hd">
      ${E&&logoOk(E.logo)?`<img class="lg" src="${esc(logoOk(E.logo))}" alt="Logotipo ${esc(E.nome)}">`:`<div class="lg-empty">logotipo da empresa<br>(Configurações › Empresas)</div>`}
      <div><h2>Medição do ${bmPed(b)?'pedido':'contrato'} de ${esc((K.servico||'fornecimento de refeições').toLowerCase())}</h2>
      <div class="kv" style="margin-top:6px"><span>Empresa</span><span><b>${esc(b.empresaNome)}</b>${b.empresaCnpj?` · CNPJ ${esc(b.empresaCnpj)}`:''}</span><span>Contratada</span><span>${esc(K.nome||'—')}${K.cnpj?` · CNPJ ${esc(K.cnpj)}`:''}</span>${b.obraNome?`<span>Obra</span><span><b>${esc(b.obraNome)}</b></span>${bmPed(b)?`<span>Pedido</span><span>${isDraft&&can('sup.bm')?`<input id="bm-ped-ed" class="mono" maxlength="20" value="${esc(b.pedido||'')}" style="text-transform:uppercase;width:180px;padding:4px 8px" aria-label="Nº do pedido">`:`<b class="mono">${esc(b.pedido||'—')}</b>`}</span>`:`<span>Contrato</span><span>${esc(b.contratoNumero||'—')}</span>`}`:''}</div></div>
      <div class="kv"><span>Medição</span><span><b class="num">${esc(b.numero)}</b></span><span>Período</span><span class="num">${br(b.ini)} à ${br(b.fim)}</span><span>Ref.</span><span>${mes}</span></div></div>
    ${bmPed(b)?bmItensPed(b,K):''}<div class="tablewrap"${bmPed(b)?' hidden':''}><table data-sem-ord>
      <thead><tr><th>Item</th><th>Descrição</th><th class="c">Unid</th><th class="r">Preço unit.</th>${anyCt?'<th class="r">Qtd contrato</th><th class="r">Total contrato</th>':''}<th class="r">Acum. anterior</th><th class="r">Atual</th><th class="r">Total acum.</th>${anyCt?'<th class="r">Saldo</th>':''}<th class="r">R$ acum. anterior</th><th class="r">R$ desta medição</th><th class="r">R$ acum. atual</th>${anyCt?'<th class="r">R$ saldo</th>':''}</tr></thead>
      <tbody><tr class="grp"><td>1</td><td colspan="${anyCt?13:9}">${esc(K.servico||'FORNECIMENTO DE REFEIÇÕES')}</td></tr>
      ${b.itens.map(i=>`<tr><td class="num">${esc(i.item)}</td><td>${tipo(i.tipo).nome}</td><td class="c">un</td><td class="r num">${i.preco===null?'—':money(i.preco)}</td>${anyCt?`<td class="r num">${dash(i.qtdCt&&num(i.qtdCt))}</td><td class="r num">${i.totalCt===null?'—':money(i.totalCt)}</td>`:''}<td class="r num">${num(i.acumQtd)}</td><td class="r num"><b>${num(i.atualQtd)}</b></td><td class="r num">${num(i.totAcQtd)}</td>${anyCt?`<td class="r num">${i.saldoQtd===null?'—':num(i.saldoQtd)}</td>`:''}<td class="r num">${money(i.acumVal)}</td><td class="r num"><b>${money(i.atualVal)}</b></td><td class="r num">${money(i.totAcVal)}</td>${anyCt?`<td class="r num">${i.saldoVal===null?'—':money(i.saldoVal)}</td>`:''}</tr>`).join('')}
      <tr class="tot"><td colspan="4">TOTAL</td>${anyCt?`<td></td><td class="r num">${money(tot('totalCt'))}</td>`:''}<td class="r num">${num(tot('acumQtd'))}</td><td class="r num">${num(tot('atualQtd'))}</td><td class="r num">${num(tot('totAcQtd'))}</td>${anyCt?`<td class="r num">${num(tot('saldoQtd'))}</td>`:''}<td class="r num">${money(tot('acumVal'))}</td><td class="r num">${money(tot('atualVal'))}</td><td class="r num">${money(tot('totAcVal'))}</td>${anyCt?`<td class="r num">${money(tot('saldoVal'))}</td>`:''}</tr></tbody></table></div>
    <div class="cols" style="margin-top:16px">
      <div>
        <h3>Resumo por data</h3>
        <div class="tablewrap" style="max-height:340px;overflow:auto"><table><thead><tr><th>Data</th>${TIPOS.map(t=>`<th class="r">${t.curto}</th>`).join('')}<th class="r">Total</th><th class="r">Valor</th></tr></thead><tbody>
        ${b.dias.map(d=>`<tr><td class="num">${wd(d.d)} ${br(d.d)}</td>${d.porTipo.map(n=>`<td class="r num">${esc(n||'–')}</td>`).join('')}<td class="r num"><b>${esc(d.total)}</b></td><td class="r num">${money(d.valor)}</td></tr>`).join('')}
        <tr class="tot"><td>Total geral</td>${TIPOS.map((t,i)=>`<td class="r num">${b.dias.reduce((s,d)=>s+d.porTipo[i],0)}</td>`).join('')}<td class="r num">${esc(b.qtd)}</td><td class="r num">${money(b.valor)}</td></tr></tbody></table></div>
        ${b.sobrasQtd?`<div class="small muted" style="margin-top:6px">Inclui <b>${esc(b.sobrasQtd)}</b> refeições de sobras (${money(b.sobrasValor)}), cobradas pelo preço do contrato da obra.</div>`:''}
        ${b.obras.length>1?`<h3 style="margin-top:14px">Resumo por obra</h3>
        <div class="tablewrap"><table><thead><tr><th>Obra</th>${TIPOS.map(t=>`<th class="r">${t.curto}</th>`).join('')}<th class="r">Total</th><th class="r">Valor</th></tr></thead><tbody>
        ${b.obras.map(e=>`<tr><td>${esc(e.o||'—')}</td>${e.porTipo.map(n=>`<td class="r num">${esc(n||'–')}</td>`).join('')}<td class="r num"><b>${esc(e.total)}</b></td><td class="r num">${money(e.valor)}</td></tr>`).join('')}</tbody></table></div>`:''}
        ${TG.length?`<h3 style="margin-top:14px">Terceirizados por empresa</h3>
        <div class="tablewrap"><table><thead><tr><th>Empresa terceirizada</th>${TIPOS.map(t=>`<th class="r">${t.curto}</th>`).join('')}<th class="r">Total</th><th class="r">Valor</th></tr></thead><tbody>
        ${TG.map(g=>`<tr><td>${esc(g.nome)}</td>${g.porTipo.map(n=>`<td class="r num">${esc(n||'–')}</td>`).join('')}<td class="r num"><b>${esc(g.total)}</b></td><td class="r num">${money(g.valor)}</td></tr>`).join('')}
        <tr class="tot"><td>Total terceirizados</td>${TIPOS.map((t,i)=>`<td class="r num">${TG.reduce((s,g)=>s+g.porTipo[i],0)}</td>`).join('')}<td class="r num">${TG.reduce((s,g)=>s+g.total,0)}</td><td class="r num">${money(TG.reduce((s,g)=>s+g.valor,0))}</td></tr></tbody></table></div>
        <div class="small muted" style="margin-top:6px">Refeições lançadas manualmente para terceirizados (sem crachá). Já estão incluídas nos totais acima; o custo é de ${esc(b.empresaNome)}.</div>`:''}
      </div>
      <div>
        <div class="fin">
          <span>Valor da medição</span><span class="num" style="text-align:right">${money(b.valor)}</span>
          <span>Deduções / descontos</span><span style="text-align:right">${isDraft?`<input id="bm-ded" type="number" step="0.01" min="0" value="${esc(b.deducoes||0)}" class="num">`:`<span class="num">${money(b.deducoes)}</span>`}</span>
          <span>Adiantamentos e outros</span><span style="text-align:right">${isDraft?`<input id="bm-adi" type="number" step="0.01" min="0" value="${esc(b.adiant||0)}" class="num">`:`<span class="num">${money(b.adiant)}</span>`}</span>
          <span>Total da fatura</span><span class="num" style="text-align:right">${money(b.liquido)}</span>
          <span>Total líquido da medição</span><span class="num big" style="text-align:right">${money(b.liquido)}</span>
        </div>
        <div class="field" style="margin-top:12px"><label for="bm-obs">Obs.</label>${isDraft?`<textarea id="bm-obs" rows="2">${esc(b.obs||'')}</textarea>`:`<div class="small">${esc(b.obs||'—')}</div>`}</div>
        <div class="sig">
          <div>${isDraft?'':stampHtml(b.assSup,'Gestor / Engenheiro',assId(b,'sup'))}${K.gestor?esc(K.gestor):`<span class="pill warn">Gestor / Engenheiro ${bmObraId(b)?'não cadastrado na obra':'não informado'}</span>`}<br><span class="muted">${esc(K.cargo||'Gestor / Engenheiro')} — ${esc(b.empresaNome)}</span></div>
          <div>${isDraft?'':stampHtml(b.assRest,'Restaurante',assId(b,'rest'))}${esc(K.nome||'________________')}<br><span class="muted">Contratada</span></div>
        </div>
      </div>
    </div>
  </div>`}

/* =================== v3.1.9: BIBLIOTECAS EM SEGUNDO PLANO ===================
   PDF (jsPDF + AutoTable + fflate) e leitor de QR (jsQR) saíram do arquivo principal: a tela abre sem esperar
   ~650 KB que só servem para gerar PDF/ZIP ou ler QR. São baixadas logo depois que a tela aparece e, se alguém
   pedir um PDF antes disso, na hora — o botão tocado é acionado de novo sozinho quando a biblioteca chega. */
const LIBS={};
function carregarLib(nome){
  if(LIBS[nome])return LIBS[nome];
  return LIBS[nome]=new Promise((ok,nao)=>{const s=document.createElement('script');s.src=nome+'-'+APP_VERSAO+'.js';s.async=true;
    s.onload=()=>ok();s.onerror=()=>{LIBS[nome]=null;s.remove();nao(new Error('biblioteca '+nome+' não baixou'))};document.head.appendChild(s)})}
function pdfCarregado(){return !!(window.jspdf&&window.jspdf.jsPDF&&window.jspdf.jsPDF.API&&window.jspdf.jsPDF.API.autoTable)}
function garantirPdf(){return pdfCarregado()?Promise.resolve():carregarLib('pdf').then(()=>{if(!pdfCarregado()){LIBS.pdf=null;throw new Error('biblioteca de PDF incompleta')}})}
let ULT_TOQUE=null;document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('button,a,[role=button]');ULT_TOQUE=b?{el:b,t:Date.now()}:null},true);
function pdfPronto(){if(pdfCarregado())return true;
  const alvo=ULT_TOQUE&&Date.now()-ULT_TOQUE.t<1500?ULT_TOQUE.el:null;toast('Preparando o gerador de PDF…');
  garantirPdf().then(()=>{if(alvo&&alvo.isConnected&&!alvo.disabled)alvo.click()},()=>toast('Não foi possível preparar o PDF — verifique a internet e tente de novo.','bad'));
  return false}
window.addEventListener('load',()=>setTimeout(()=>{carregarLib('qr').catch(()=>{});garantirPdf().catch(()=>{})},800));

/* =================== BOOT =================== */
if('serviceWorker' in navigator&&location.protocol==='https:'){navigator.serviceWorker.register('sw.js').catch(()=>{})}
boot();

/* o arquivo inteiro foi lido e o programa iniciou: some o aviso de 'atualização incompleta' da tela de login */
document.documentElement.setAttribute('data-app','ok');
