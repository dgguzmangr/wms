import{b as a,c as l,d,e as s,f as e,w as o,h as c}from"./index-54a80644.js";const p=s("h2",{class:"text-center"},"ADMINISTRACIÓN DE CLIENTES",-1),h={class:"card"},f={__name:"Client_manager",setup(m){return(n,u)=>{const r=a("Button"),t=a("Column"),i=a("DataTable");return l(),d(c,null,[p,s("div",h,[e(i,{value:n.users,paginator:"",rows:5,rowsPerPageOptions:[5,10,20,50],tableStyle:"min-width: 50rem",paginatorTemplate:"RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",currentPageReportTemplate:"{first} to {last} of {totalRecords}"},{paginatorstart:o(()=>[e(r,{type:"button",icon:"pi pi-refresh",text:""})]),paginatorend:o(()=>[e(r,{type:"button",icon:"pi pi-download",text:""})]),default:o(()=>[e(t,{field:"NIT",header:"NIT",sortable:"",style:{width:"25%"}}),e(t,{field:"name",header:"Nombres",sortable:"",style:{width:"25%"}}),e(t,{field:"country",header:"País",sortable:"",style:{width:"25%"}}),e(t,{field:"City",header:"Ciudad",sortable:"",style:{width:"25%"}}),e(t,{field:"neighborhood",header:"Barrio",sortable:"",style:{width:"25%"}}),e(t,{field:"address",header:"Direcciòn",sortable:"",style:{width:"25%"}}),e(t,{field:"phone",header:"Teléfono",sortable:"",style:{width:"25%"}})]),_:1},8,["value"])])],64)}}};export{f as default};
