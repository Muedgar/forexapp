(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8542],{65338:function(e){e.exports=function(e,t,r,n){for(var i=-1,o=null==e?0:e.length;++i<o;){var s=e[i];t(n,s,r(s),e)}return n}},12825:function(e,t,r){var n=r(24303);e.exports=function(e,t,r,i){return n(e,function(e,n,o){t(i,e,r(e),o)}),i}},24303:function(e,t,r){var n=r(26548),i=r(92019)(n);e.exports=i},26548:function(e,t,r){var n=r(15308),i=r(90249);e.exports=function(e,t){return e&&n(e,t,i)}},36740:function(e,t,r){var n=r(65338),i=r(12825),o=r(68286),s=r(86152);e.exports=function(e,t){return function(r,a){var c=s(r)?n:i,l=t?t():{};return c(r,e,o(a,2),l)}}},92019:function(e,t,r){var n=r(67878);e.exports=function(e,t){return function(r,i){if(null==r)return r;if(!n(r))return e(r,i);for(var o=r.length,s=t?o:-1,a=Object(r);(t?s--:++s<o)&&!1!==i(a[s],s,a););return r}}},3440:function(e,t,r){var n=r(13940),i=r(36740),o=Object.prototype.hasOwnProperty,s=i(function(e,t,r){o.call(e,r)?e[r].push(t):n(e,r,[t])});e.exports=s},18038:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/project/_/[[...routeSlug]]",function(){return r(44127)}])},56006:function(e,t,r){"use strict";var n=r(52322),i=r(39097),o=r.n(i),s=r(95492),a=r(32079),c=r(70847);t.Z=e=>{var t;let{projectRef:r,subject:i,error:l,className:u}=e,d=null==i?void 0:i.replace(/ /g,"%20"),p="/support/new?category=dashboard_bug";r&&(p+="&ref=".concat(r)),d&&(p+="&subject=".concat(d)),l&&(p+="&message=Error:%20".concat(l.message));let f=(null==l?void 0:null===(t=l.message)||void 0===t?void 0:t.includes("503"))?"503 Service Temporarily Unavailable":null==l?void 0:l.message;return(0,n.jsxs)(s.bZ,{className:u,variant:"warning",title:i,children:[(0,n.jsx)(c.aN,{className:"h-4 w-4",strokeWidth:2}),(0,n.jsx)(s.Cd,{children:i}),(0,n.jsxs)(s.X,{className:"flex flex-col gap-3 break-words",children:[(0,n.jsxs)("div",{children:[(null==l?void 0:l.message)&&(0,n.jsxs)("p",{children:["Error: ",f]}),(0,n.jsx)("p",{children:"Try refreshing your browser, but if the issue persists, please reach out to us via support."})]}),(0,n.jsx)("div",{children:(0,n.jsx)(a.z,{asChild:!0,type:"warning",children:(0,n.jsx)(o(),{href:p,children:"Contact support"})})})]})]})}},43276:function(e,t,r){"use strict";var n=r(52322),i=r(39097),o=r.n(i);r(2784);var s=r(84447),a=r(52905),c=r(54383);t.Z=e=>{let t,{title:r,description:i,children:l,footer:u,url:d="",linkHref:p="",imgUrl:f,imgAlt:h,icon:g,className:m,loading:y=!1,fixedHeight:v=!0,hideChevron:x=!1,titleClass:b="",...j}=e,w=d||p||j.onClick,O={};j.onClick?(t="button",O=j):p?(t=o(),O={href:p,...j}):d?(t="a",O={href:d,...j}):(t="div",O=j);let k=["group relative text-left","bg-surface-100","border border-surface","rounded-md p-5 flex flex-row","transition ease-in-out duration-150"];w&&(k=[...k,"cursor-pointer","hover:bg-surface-200","hover:border-control"]),v&&(k=[...k,"h-32"]);let C=e=>{let{children:t}=e;return(0,n.jsx)("div",{className:"mr-4 flex flex-col",children:t})},P=(0,n.jsxs)(n.Fragment,{children:[f&&(0,n.jsx)(C,{children:(0,n.jsx)("img",{className:" transition-all group-hover:scale-110 ",src:"".concat(f),alt:"".concat(h),width:"26"})}),g&&(0,n.jsx)(C,{children:g}),(0,n.jsxs)("div",{className:"flex h-full w-full flex-col space-y-2",children:["string"==typeof r?(0,n.jsx)("h5",{className:"text-foreground pr-5 ".concat(b),children:r}):r,(l||i)&&(0,n.jsxs)("div",{className:"flex w-full flex-1 flex-col",children:[(0,n.jsx)("p",{className:"text-sm text-foreground-light",children:i}),(0,n.jsx)("div",{className:"w-full",children:l&&l})]}),u&&(0,n.jsx)("div",{className:"w-full !mt-auto",children:u})]}),w&&(0,n.jsx)("div",{className:" absolute right-4 top-4 text-foreground-lighter transition-all duration-200 group-hover:right-3 group-hover:text-foreground ",children:y?(0,n.jsx)(s.Z,{className:"animate-spin"}):x?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(a.Z,{})})]});return(0,n.jsx)(t,{...O,className:(0,c.cn)(k,m),children:P})}},94865:function(e,t,r){"use strict";r.d(t,{x:function(){return n}});let n={is_readonly_mode_enabled:{bannerContent:{warning:{title:"Your project is currently in read-only mode and is no longer accepting write requests",description:"You will need to manually override read-only mode and reduce the disk size to below 95%"},critical:{title:"Your project is currently in read-only mode and is no longer accepting write requests",description:"You will need to manually override read-only mode and reduce the disk size to below 95%"}},cardContent:{warning:{title:"Project is in read-only mode",description:"Database is no longer accepting write requests."},critical:{title:"Project is in read-only mode",description:"Database is no longer accepting write requests."}},docsUrl:"https://supabase.com/docs/guides/platform/database-size#disabling-read-only-mode",buttonText:"View database settings",metric:"read_only"},disk_io_exhaustion:{bannerContent:{warning:{title:"Your project is about to deplete its Disk IO Budget, and may become unresponsive once fully exhausted",description:"You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics."},critical:{title:"Your project has depleted its Disk IO Budget, and may become unresponsive",description:"You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics."}},cardContent:{warning:{title:"Project is depleting its Disk IO Budget",description:"It may become unresponsive if fully exhausted"},critical:{title:"Project has depleted its Disk IO Budget",description:"It may become unresponsive"}},docsUrl:"https://supabase.com/docs/guides/platform/exhaust-disk-io",buttonText:"Check usage",metric:"disk_io"},disk_space_exhaustion:{bannerContent:{warning:{title:"Your project is about to exhaust its available disk space, and may become unresponsive once fully exhausted",description:"You can opt to increase your disk size up to 200GB on the database settings page."},critical:{title:"Your project has exhausted its available disk space, and may become unresponsive",description:"You can opt to increase your disk size up to 200GB on the database settings page."}},cardContent:{warning:{title:"Project is exhausting its available disk space",description:"It may become unresponsive if fully exhausted"},critical:{title:"Project has exhausted its available disk space",description:"It may become unresponsive"}},docsUrl:"https://supabase.com/docs/guides/platform/database-size#disk-management",buttonText:void 0,metric:"disk_space"},cpu_exhaustion:{bannerContent:{warning:{title:"Your project is currently facing high CPU usage, and its performance is affected",description:"You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics."},critical:{title:"Your project's CPU usage is at 100% and its performance is affected",description:"You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics."}},cardContent:{warning:{title:"Project has high CPU usage",description:"Performance is affected"},critical:{title:"Project CPU usage is at 100%",description:"Performance is affected"}},docsUrl:"https://supabase.com/docs/guides/platform/exhaust-cpu",buttonText:"Check usage",metric:"cpu"},memory_and_swap_exhaustion:{bannerContent:{warning:{title:"Your project is currently facing high memory usage, and its performance is affected",description:"You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics."},critical:{title:"Your project's memory usage is at 100%, and its performance is affected",description:"You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics."}},cardContent:{warning:{title:"Project has high memory usage",description:"Performance is affected"},critical:{title:"Project memory usage is at 100%",description:"Performance is affected"}},docsUrl:"https://supabase.com/docs/guides/platform/exhaust-ram",buttonText:"Check usage",metric:"ram"},auth_rate_limit_exhaustion:{bannerContent:{warning:{title:"Your project has exceeded email rate limits in the past 24 hours and may not reliably send auth related emails to users",description:"Set up a custom SMTP and adjust rate limits where necessary to ensure that emails are sent out reliably."},critical:{title:void 0,description:void 0}},cardContent:{warning:{title:"Your project has exceeded email rate limits",description:"You will need to set up a custom SMTP provider and adjust rate limits where necessary"},critical:{title:void 0,description:void 0}},docsUrl:"https://supabase.com/docs/guides/platform/going-into-prod#auth-rate-limits",buttonText:"Enable Custom SMTP",metric:"auth_email_rate_limit"},multiple_resource_warnings:{bannerContent:{warning:{title:"Your project is currently exhausting multiple resources, and its performance is affected",description:"Check which resources are reaching their threshold on your project's usage page."},critical:{title:"Your project has exhausted multiple resources, and its performance is affected",description:"Check which resources have reached their threshold on your project's usage page."}},cardContent:{warning:{title:"Project is exhausting multiple resources",description:"Performance is affected."},critical:{title:"Project has exhausted multiple resources",description:"Performance is affected."}},docsUrl:void 0,buttonText:"Check usage",metric:null}}},22293:function(e,t,r){"use strict";r.d(t,{L:function(){return i}});var n=r(94865);let i=(e,t,r)=>{var i,o;if("is_readonly_mode_enabled"===t)return n.x.is_readonly_mode_enabled.cardContent.warning;let s=e[t];if("string"==typeof s)return null===(o=n.x[t])||void 0===o?void 0:null===(i=o[r])||void 0===i?void 0:i[s]}},61660:function(e,t,r){"use strict";r.d(t,{q:function(){return a}});var n=r(36492),i=r(31696),o=r(90301);async function s(e,t){let{organizationId:r}=e;if(!r)throw Error("organizationId is required");let{data:n,error:o}=await (0,i.U2)("/platform/integrations/github/connections",{params:{query:{organization_id:r}},signal:t});return o&&(0,i.S3)(o),n.connections}let a=function(e){let{organizationId:t}=e,{enabled:r=!0,...i}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(0,n.a)(o.F.githubConnectionsList(t),e=>{let{signal:r}=e;return s({organizationId:t},r)},{enabled:r&&void 0!==t,...i})}},90301:function(e,t,r){"use strict";r.d(t,{F:function(){return n}});let n={integrationsListWithOrg:e=>["organizations",e,"integrations"],integrationsList:()=>["organizations","integrations"],vercelProjectList:e=>["organizations",e,"vercel-projects"],vercelConnectionsList:e=>["organizations",e,"vercel-connections"],githubBranch:(e,t,r,n)=>["organizations",e,"branches",t,r,n],githubAuthorization:()=>["github-authorization"],githubRepositoriesList:()=>["github-repositories"],githubBranchesList:e=>["github-branches",e],githubConnectionsList:e=>["organizations",e,"github-connections"]}},99445:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});let n={usage:e=>["projects",e,"usage"],orgUsage:(e,t,r,n)=>["organizations",e,"usage",t,r,n],resourceWarnings:()=>["projects","resource-warnings"]}},43683:function(e,t,r){"use strict";r.d(t,{q:function(){return c}});var n=r(36492),i=r(99959),o=r(31696),s=r(99445);async function a(e){let{data:t,error:r}=await (0,o.U2)("/platform/projects-resource-warnings",{signal:e});return r&&(0,o.S3)(r),t}let c=function(){let{enabled:e=!0,...t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.a)(s.Z.resourceWarnings(),e=>{let{signal:t}=e;return a(t)},{enabled:i.Qy&&e,staleTime:18e5,...t})}},44127:function(e,t,r){"use strict";r.r(t);var n=r(52322),i=r(39097),o=r.n(i),s=r(5632),a=r(3610),c=r(14528),l=r(99248);let u=()=>(0,n.jsx)("div",{className:"border-default border-b p-3",children:(0,n.jsx)("div",{className:"flex items-center space-x-2",children:(0,n.jsx)(o(),{href:"/projects",children:(0,n.jsx)("img",{src:"".concat(l.GW,"/img/supabase-logo.svg"),alt:"Supabase",className:"border-default rounded border p-1 hover:border-white",style:{height:24}})})})});t.default=(0,c.QO)(()=>{let{routeSlug:e,...t}=(0,s.useRouter)().query,r=Object.keys(t).length?"?".concat(new URLSearchParams(t)):void 0;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u,{}),(0,n.jsxs)("div",{className:"flex flex-col mx-auto w-full max-w-5xl",children:[(0,n.jsx)("h1",{className:"mt-8 text-2xl",children:"Select a project to continue"}),(0,n.jsx)("div",{className:"flex-grow py-6 space-y-8 overflow-y-auto",style:{maxHeight:"calc(100vh - 49px - 64px)"},children:(0,n.jsx)(a.l,{rewriteHref:t=>{let n=location.hash;if(!Array.isArray(e))return["/project/".concat(t),r,n].filter(Boolean).join("");let i=e.join("/");return["/project/".concat(t,"/").concat(i),r,n].filter(Boolean).join("")},search:""})})]})]})})},52905:function(e,t,r){"use strict";var n=r(52322);r(2784);var i=r(65),o=r(2515);t.Z=function(e){return(0,n.jsx)(o.Z,{icon:i.Z,...e})}},84447:function(e,t,r){"use strict";var n=r(52322);r(2784);var i=r(69967),o=r(2515);t.Z=function(e){return(0,n.jsx)(o.Z,{icon:i.Z,...e})}},25633:function(e,t,r){"use strict";var n=r(52322);r(2784);var i=r(70523),o=r(2515);t.Z=function(e){return(0,n.jsx)(o.Z,{icon:i.Z,...e})}},31654:function(e,t,r){"use strict";var n=r(52322);r(2784);var i=r(38872),o=r(2515);t.Z=function(e){return(0,n.jsx)(o.Z,{icon:i.Z,...e})}},65:function(e,t,r){"use strict";var n=r(2784),i=r(13980),o=r.n(i);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var a=(0,n.forwardRef)(function(e,t){var r=e.color,i=e.size,o=void 0===i?24:i,a=function(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(e,["color","size"]);return n.createElement("svg",s({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:void 0===r?"currentColor":r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},a),n.createElement("polyline",{points:"9 18 15 12 9 6"}))});a.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},a.displayName="ChevronRight",t.Z=a},69967:function(e,t,r){"use strict";var n=r(2784),i=r(13980),o=r.n(i);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var a=(0,n.forwardRef)(function(e,t){var r=e.color,i=e.size,o=void 0===i?24:i,a=function(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(e,["color","size"]);return n.createElement("svg",s({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:void 0===r?"currentColor":r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},a),n.createElement("line",{x1:"12",y1:"2",x2:"12",y2:"6"}),n.createElement("line",{x1:"12",y1:"18",x2:"12",y2:"22"}),n.createElement("line",{x1:"4.93",y1:"4.93",x2:"7.76",y2:"7.76"}),n.createElement("line",{x1:"16.24",y1:"16.24",x2:"19.07",y2:"19.07"}),n.createElement("line",{x1:"2",y1:"12",x2:"6",y2:"12"}),n.createElement("line",{x1:"18",y1:"12",x2:"22",y2:"12"}),n.createElement("line",{x1:"4.93",y1:"19.07",x2:"7.76",y2:"16.24"}),n.createElement("line",{x1:"16.24",y1:"7.76",x2:"19.07",y2:"4.93"}))});a.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},a.displayName="Loader",t.Z=a},70523:function(e,t,r){"use strict";var n=r(2784),i=r(13980),o=r.n(i);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var a=(0,n.forwardRef)(function(e,t){var r=e.color,i=e.size,o=void 0===i?24:i,a=function(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(e,["color","size"]);return n.createElement("svg",s({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:void 0===r?"currentColor":r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},a),n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("line",{x1:"10",y1:"15",x2:"10",y2:"9"}),n.createElement("line",{x1:"14",y1:"15",x2:"14",y2:"9"}))});a.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},a.displayName="PauseCircle",t.Z=a},38872:function(e,t,r){"use strict";var n=r(2784),i=r(13980),o=r.n(i);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var a=(0,n.forwardRef)(function(e,t){var r=e.color,i=e.size,o=void 0===i?24:i,a=function(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(e,["color","size"]);return n.createElement("svg",s({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:void 0===r?"currentColor":r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},a),n.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),n.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}))});a.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},a.displayName="Plus",t.Z=a}},function(e){e.O(0,[8183,3610,9774,2888,179],function(){return e(e.s=18038)}),_N_E=e.O()}]);