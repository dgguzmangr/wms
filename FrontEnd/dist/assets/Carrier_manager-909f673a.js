import{a as J,r as n,o as W,b as p,c as i,d as r,e as s,f as l,w as u,F as X,n as C,k as m,t as w,l as A}from"./index-54a80644.js";import{a as S}from"./axios-a342f982.js";const H=s("h2",{class:"text-center"},"ADMINISTRACIÓN DE TRANSPORTADORAS",-1),ee={class:"card"},le={class:"flex flex-wrap gap-2 align-items-center justify-content-between"},oe={class:"field"},ae=s("label",{for:"nit"},"NIT",-1),te={key:0,class:"p-error"},se={class:"field"},ie=s("label",{for:"name"},"Nombre",-1),re={key:0,class:"p-error"},ne={class:"field"},ue=s("label",{for:"country",class:"mb-3"},"País",-1),de={key:0},ce={key:1},ve={key:2},pe={class:"field"},me=s("label",{for:"city",class:"mb-3"},"Departamento",-1),fe={key:0},he={key:1},ye={key:2},be={class:"field"},_e=s("label",{for:"city",class:"mb-3"},"Ciudad",-1),ge={key:0},ke={key:1},Ce={key:2},we={class:"field"},Pe=s("label",{for:"neighborhood"},"Barrio",-1),Ve={key:0,class:"p-error"},Te={class:"field"},De=s("label",{for:"address"},"Dirección",-1),Ne={key:0,class:"p-error"},Se={class:"field"},Ue=s("label",{for:"phone"},"Teléfono",-1),qe={key:0,class:"p-error"},Ee={class:"confirmation-content"},Ae=s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Me={key:0},Be={class:"confirmation-content"},Le=s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Re={key:0},$e={__name:"Carrier_manager",setup(Ie){const P=J(),U=n(),b=n(),q=n([]);n([]),n([]);const E=n([]),V=n([]),o=n({country:"",city:""}),_=n(!1),g=n(!1),k=n(!1),f=n(),T=n({global:{value:null,matchMode:X.CONTAINS}}),d=n(!1);W(async()=>{try{const e=await M(),a=await B(e);q.value=a.data;const c=await L(e);E.value=c.data}catch(e){console.error("Error fetching countries and cities:",e),P.add({severity:"error",summary:"Error",detail:"Error al cargar países y ciudades"})}});const M=()=>S.get("https://www.universal-tutorial.com/api/getaccesstoken",{headers:{Accept:"application/json","api-token":"lLQt6gapkTsu8CCjcTUK9ew_LiZZuV47rVJ_GlsQTDE3xq9sm4Os_67WNiX3jD1Lv8","user-email":"dgguzmangr@gmail.com"}}).then(e=>e.data.auth_token),B=e=>S.get("https://www.universal-tutorial.com/api/countries/",{headers:{Authorization:`Bearer ${e}`,Accept:"application/json"}}),L=e=>S.get("https://www.universal-tutorial.com/api/countries/",{headers:{Authorization:`Bearer ${e}`,Accept:"application/json"}}),R=()=>{V.value=E.value.filter(e=>e.country===o.value.country).map(e=>e.name),console.log("País seleccionado:",o.value.country)},I=()=>{o.value={},d.value=!1,_.value=!0},j=()=>{_.value=!1,d.value=!1},z=()=>{d.value=!0},$=e=>{o.value={...e},_.value=!0},x=e=>{o.value=e,g.value=!0},O=()=>{b.value=b.value.filter(e=>e.id!==o.value.id),g.value=!1,o.value={},P.add({severity:"success",summary:"Successful",detail:"Transportadora eliminada",life:3e3})},F=()=>{U.value.exportCSV()},G=()=>{k.value=!0},K=()=>{b.value=b.value.filter(e=>!f.value.includes(e)),k.value=!1,f.value=null,P.add({severity:"success",summary:"Successful",detail:"products Deleted",life:3e3})};return(e,a)=>{const c=p("Button"),Q=p("Toolbar"),h=p("InputText"),v=p("Column"),Y=p("DataTable"),y=p("Tag"),D=p("Dropdown"),N=p("Dialog");return i(),r("div",null,[H,s("div",ee,[l(Q,{class:"mb-4"},{start:u(()=>[l(c,{label:"New",icon:"pi pi-plus",severity:"success",class:"mr-2",onClick:I}),l(c,{label:"Delete",icon:"pi pi-trash",severity:"danger",onClick:G,disabled:!f.value||!f.value.length},null,8,["disabled"])]),end:u(()=>[l(c,{label:"Export",icon:"pi pi-upload",severity:"help",onClick:a[0]||(a[0]=t=>F(t))})]),_:1}),l(Y,{ref_key:"dt",ref:U,value:b.value,selection:f.value,"onUpdate:selection":a[2]||(a[2]=t=>f.value=t),dataKey:"id",paginator:!0,rows:10,filters:T.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} carriers"},{header:u(()=>[s("div",le,[l(h,{modelValue:T.value.global.value,"onUpdate:modelValue":a[1]||(a[1]=t=>T.value.global.value=t),placeholder:"Buscar..."},null,8,["modelValue"])])]),default:u(()=>[l(v,{selectionMode:"multiple",style:{width:"3rem"},exportable:!1}),l(v,{field:"nit",header:"NIT",sortable:"",style:{"min-width":"12rem"}}),l(v,{field:"name",header:"Nombre",sortable:"",style:{"min-width":"16rem"}}),l(v,{field:"country",header:"País",sortable:"",style:{"min-width":"16rem"}}),l(v,{field:"department",header:"Departamento",sortable:"",style:{"min-width":"16rem"}}),l(v,{field:"city",header:"Ciudad",sortable:"",style:{"min-width":"16rem"}}),l(v,{field:"neighborhood",header:"Barrio",sortable:"",style:{"min-width":"16rem"}}),l(v,{field:"address",header:"Dirección",sortable:"",style:{"min-width":"16rem"}}),l(v,{field:"phone",header:"Teléfono",sortable:"",style:{"min-width":"16rem"}}),l(v,{exportable:!1,style:{"min-width":"8rem"}},{body:u(t=>[l(c,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2",onClick:Z=>$(t.data)},null,8,["onClick"]),l(c,{icon:"pi pi-trash",outlined:"",rounded:"",severity:"danger",onClick:Z=>x(t.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters"])]),l(N,{visible:_.value,"onUpdate:visible":a[11]||(a[11]=t=>_.value=t),style:{width:"450px"},header:"Detalles del transportador",modal:!0,class:"p-fluid"},{footer:u(()=>[l(c,{label:"Cancelar",icon:"pi pi-times",text:"",onClick:j}),l(c,{label:"Guardar",icon:"pi pi-check",text:"",onClick:z})]),default:u(()=>[s("div",oe,[ae,l(h,{id:"nit",modelValue:o.value.nit,"onUpdate:modelValue":a[3]||(a[3]=t=>o.value.nit=t),modelModifiers:{trim:!0},required:"true",autofocus:"",class:C({"p-invalid":d.value&&!o.value.nit})},null,8,["modelValue","class"]),d.value&&!o.value.nit?(i(),r("small",te,"El NIT es requerido.")):m("",!0)]),s("div",se,[ie,l(h,{id:"name",modelValue:o.value.name,"onUpdate:modelValue":a[4]||(a[4]=t=>o.value.name=t),modelModifiers:{trim:!0},required:"true",autofocus:"",class:C({"p-invalid":d.value&&!o.value.name})},null,8,["modelValue","class"]),d.value&&!o.value.name?(i(),r("small",re,"El nombre es requerido.")):m("",!0)]),s("div",ne,[ue,l(D,{id:"country",modelValue:o.value.country,"onUpdate:modelValue":a[5]||(a[5]=t=>o.value.country=t),options:q.value,placeholder:"Seleccione un país",onChange:R},{default:u(()=>[s("template",null,[e.slotProps.value&&e.slotProps.value.value?(i(),r("div",de,[l(y,{value:e.slotProps.value.value},null,8,["value"])])):e.slotProps.value&&!e.slotProps.value.value?(i(),r("div",ce,[l(y,{value:e.slotProps.value},null,8,["value"])])):(i(),r("span",ve,w(e.slotProps.placeholder),1))])]),_:1},8,["modelValue","options"])]),s("div",pe,[me,l(D,{id:"city",modelValue:o.value.department,"onUpdate:modelValue":a[6]||(a[6]=t=>o.value.department=t),options:V.value,placeholder:"Seleccione un departamento"},{default:u(()=>[s("template",null,[e.slotProps.value&&e.slotProps.value.value?(i(),r("div",fe,[l(y,{value:e.slotProps.value.value},null,8,["value"])])):e.slotProps.value&&!e.slotProps.value.value?(i(),r("div",he,[l(y,{value:e.slotProps.value},null,8,["value"])])):(i(),r("span",ye,w(e.slotProps.placeholder),1))])]),_:1},8,["modelValue","options"])]),s("div",be,[_e,l(D,{id:"city",modelValue:o.value.city,"onUpdate:modelValue":a[7]||(a[7]=t=>o.value.city=t),options:V.value,placeholder:"Seleccione una ciudad"},{default:u(()=>[s("template",null,[e.slotProps.value&&e.slotProps.value.value?(i(),r("div",ge,[l(y,{value:e.slotProps.value.value},null,8,["value"])])):e.slotProps.value&&!e.slotProps.value.value?(i(),r("div",ke,[l(y,{value:e.slotProps.value},null,8,["value"])])):(i(),r("span",Ce,w(e.slotProps.placeholder),1))])]),_:1},8,["modelValue","options"])]),s("div",we,[Pe,l(h,{id:"neighborhood",modelValue:o.value.neighborhood,"onUpdate:modelValue":a[8]||(a[8]=t=>o.value.neighborhood=t),modelModifiers:{trim:!0},required:"true",autofocus:"",class:C({"p-invalid":d.value&&!o.value.neighborhood})},null,8,["modelValue","class"]),d.value&&!o.value.neighborhood?(i(),r("small",Ve,"El barrio es requerido.")):m("",!0)]),s("div",Te,[De,l(h,{id:"address",modelValue:o.value.address,"onUpdate:modelValue":a[9]||(a[9]=t=>o.value.address=t),modelModifiers:{trim:!0},required:"true",autofocus:"",class:C({"p-invalid":d.value&&!o.value.address})},null,8,["modelValue","class"]),d.value&&!o.value.address?(i(),r("small",Ne,"La dirección es requerida.")):m("",!0)]),s("div",Se,[Ue,l(h,{id:"phone",modelValue:o.value.phone,"onUpdate:modelValue":a[10]||(a[10]=t=>o.value.phone=t),modelModifiers:{trim:!0},required:"true",autofocus:"",class:C({"p-invalid":d.value&&!o.value.phone})},null,8,["modelValue","class"]),d.value&&!o.value.phone?(i(),r("small",qe,"El teléfono es requerido.")):m("",!0)])]),_:1},8,["visible"]),l(N,{visible:g.value,"onUpdate:visible":a[13]||(a[13]=t=>g.value=t),style:{width:"450px"},header:"Confirm",modal:!0},{footer:u(()=>[l(c,{label:"No",icon:"pi pi-times",text:"",onClick:a[12]||(a[12]=t=>g.value=!1)}),l(c,{label:"Yes",icon:"pi pi-check",text:"",onClick:O})]),default:u(()=>[s("div",Ee,[Ae,e.product?(i(),r("span",Me,[A("Está seguro que desea eliminar "),s("b",null,w(o.value.name),1),A("?")])):m("",!0)])]),_:1},8,["visible"]),l(N,{visible:k.value,"onUpdate:visible":a[15]||(a[15]=t=>k.value=t),style:{width:"450px"},header:"Confirm",modal:!0},{footer:u(()=>[l(c,{label:"No",icon:"pi pi-times",text:"",onClick:a[14]||(a[14]=t=>k.value=!1)}),l(c,{label:"Yes",icon:"pi pi-check",text:"",onClick:K})]),default:u(()=>[s("div",Be,[Le,e.product?(i(),r("span",Re,"Esta seguro que desea eliminar los transportadores seleccionados?")):m("",!0)])]),_:1},8,["visible"])])}}};export{$e as default};