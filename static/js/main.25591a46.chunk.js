(this["webpackJsonpsam-scrum"]=this["webpackJsonpsam-scrum"]||[]).push([[0],{100:function(t,e,n){"use strict";n.r(e);var i,r=n(0),a=n.n(r),o=n(20),c=n.n(o),s=(n(58),n(3)),d=n(4),l=n(2),p=n(10),b=n(101),u=n(6),j=n(7),f=function(t){var e=t.sourceIndex,n=t.destinationIndex,i=t.item;return i.position===e?Object(l.a)(Object(l.a)({},i),{},{position:n}):i.position<Math.min(e,n)||i.position>Math.max(e,n)?i:e<n?Object(l.a)(Object(l.a)({},i),{},{position:i.position-1}):Object(l.a)(Object(l.a)({},i),{},{position:i.position+1})},O=function(t,e){if(Object.keys(t.backlog).includes(e))return{type:"BACKLOG",items:t.backlog[e].items};for(var n in t.sprints)if(Object.prototype.hasOwnProperty.call(t.sprints,n)){var i=t.sprints[n];if(Object.keys(i.data).includes(e))return{type:"SPRINT",sprintId:n,items:t.sprints[n].data[e].items}}return{type:"ERROR"}},x=n(8),m=function(t){return Object.values(t.data).filter((function(t){return"Done"!==t.list_title})).some((function(t){return function(t){return 0!==Object.keys(t.items).length}(t)}))},I={product_title:"Main Product",sprints:{"7cd31ac2-acfc-4912-a6ad-98ecdef9fff5":{data:{"5cac8c9e-f91b-438a-9e18-00cea4667ee3":{position:0,list_title:"Sprint Backlog",items:{"52f8d85a-0196-46f0-96f3-5878846851dd":{position:0,item_content:"todo item 1"},"271beef3-8082-4ec2-aa9b-955944aea405":{position:1,item_content:"second todo item"}}},"860c2140-f2cd-4e9a-8b82-179137e19b1e":{position:1,list_title:"Doing",items:{"63bdd1d2-aa55-4e69-8f98-b345b5b6bdfd":{position:0,item_content:"some data here"},"8c2b284c-babe-48ce-8eed-12d3fed2334a":{position:2,item_content:"here is more text"},"11c54528-b4d5-4142-8069-3f82b91a7a2e":{position:1,item_content:"Multi-line item example. Multi-line item example. "}}},"860c2140-f2cd-4e9a-8b82-179477e19b1e":{position:2,list_title:"Done",items:{"63bdd1d2-aa55-4e69-0f98-b345b5b6bdfd":{position:0,item_content:"some data here"},"562b284c-babe-48ce-8e4d-12d3fed2334a":{position:2,item_content:"here is more text"},"22c54528-b4d5-4142-8069-3f82b91a7a2e":{position:1,item_content:"Multi-line item example. Multi-line item example. "}}}},startDate:new Date("2021-04-12T10:00:00Z"),endDate:new Date("2021-04-12T11:00:00Z"),position:0,goal:"My first sprint !",isOpen:!0}},backlog:{"77c73546-1d0a-4144-a2bb-2247e07a6deb":{list_title:"Product Backlog",position:0,items:{"55d8a49b-6a2a-4d8d-9f9d-369f975ea4d2":{position:0,item_content:"backlog 1"},"f73d0a10-f5ad-4dcf-b6aa-facc0de6f26d":{position:1,item_content:"backlog 2"}}}}};!function(t){t.REORDER_ITEM_POSITION="reorderItemPosition",t.ADD_ITEM="addItem",t.UPDATE_ITEM="updateItem",t.DELETE_ITEM="deleteItem",t.ADD_LIST="addList",t.DELETE_LIST="deleteList",t.UPDATE_LIST_TITLE="updateListTitle",t.CREATE_SPRINT="createSprint",t.DELETE_SPRINT="deleteSprint",t.CLOSE_SPRINT="closeSprint"}(i||(i={}));var g,h,v,D,E,T,y,k,_,w,S,R,C,P,L,M,A,N,B,z,U,H,K,F,V,G,J,Z,X,q,Q,W,Y,$,tt,et,nt=n(1),it={productData:I,dispatch:function(){return null}},rt=Object(r.createContext)(it),at=function(t){var e=t.children;var n=Object(r.useReducer)((function(t,e){switch(e.type){case i.REORDER_ITEM_POSITION:return function(t,e,n,i){if(e.droppableId===n.droppableId){var r=O(t,e.droppableId);if("ERROR"===r.type)throw new Error("ColumnId not found in productData");var a=r.items,o=Object.fromEntries(Object.entries(a).map((function(t){var i=Object(u.a)(t,2),r=i[0],a=i[1];return[r,f({item:a,sourceIndex:e.index,destinationIndex:n.index})]}))),c=Object(j.cloneDeep)(t);return"SPRINT"===r.type?c.sprints[r.sprintId].data[e.droppableId].items=o:"BACKLOG"===r.type&&(c.backlog[e.droppableId].items=o),c}var s=O(t,e.droppableId);if("ERROR"===s.type)throw new Error("ColumnId not found in productData");var d=Object.fromEntries(Object.entries(s.items).map((function(t){var n=Object(u.a)(t,2),i=n[0],r=n[1];return[i,Object(l.a)(Object(l.a)({},r),{},{position:r.position>e.index?r.position-1:r.position})]}))),p=O(t,n.droppableId);if("ERROR"===p.type)throw new Error("ColumnId not found in productData");var b=Object.fromEntries(Object.entries(p.items).map((function(t){var e=Object(u.a)(t,2),i=e[0],r=e[1];return[i,Object(l.a)(Object(l.a)({},r),{},{position:r.position>=n.index?r.position+1:r.position})]}))),x=Object(l.a)(Object(l.a)({},d[i]),{},{position:n.index}),m=Object(j.cloneDeep)(t);return"SPRINT"===s.type?"SPRINT"===p.type?(m.sprints[s.sprintId].data[e.droppableId].items=d,m.sprints[p.sprintId].data[n.droppableId].items=b,m.sprints[p.sprintId].data[n.droppableId].items[i]=x,delete m.sprints[s.sprintId].data[e.droppableId].items[i]):(m.sprints[s.sprintId].data[e.droppableId].items=d,m.backlog[n.droppableId].items=b,m.backlog[n.droppableId].items[i]=x,delete m.sprints[s.sprintId].data[e.droppableId].items[i]):"BACKLOG"===s.type&&("SPRINT"===p.type?(m.backlog[e.droppableId].items=d,m.sprints[p.sprintId].data[n.droppableId].items=b,m.sprints[p.sprintId].data[n.droppableId].items[i]=x,delete m.backlog[e.droppableId].items[i]):(m.backlog[e.droppableId].items=d,m.backlog[n.droppableId].items=b,m.backlog[n.droppableId].items[i]=x,delete m.backlog[e.droppableId].items[i])),m}(t,e.source,e.destination,e.itemId);case i.ADD_ITEM:return function(t){var e=t.productData,n=t.sprintId,i=t.listId,r=t.content,a=void 0===n?e.backlog[i].items:e.sprints[n].data[i].items,o={position:Object.keys(a).length,item_content:r},c=Object(b.a)(),s=Object(j.cloneDeep)(e);return void 0===n?s.backlog[i].items[c]=o:s.sprints[n].data[i].items[c]=o,s}({productData:t,sprintId:e.sprintId,listId:e.listId,content:e.content});case i.UPDATE_ITEM:return function(t){var e=t.productData,n=t.sprintId,i=t.listId,r=t.itemId,a=t.content,o=Object(j.cloneDeep)(e);return void 0===n?(o.backlog[i].items[r].item_content=a,o):(o.sprints[n].data[i].items[r].item_content=a,o)}({productData:t,sprintId:e.sprintId,listId:e.listId,itemId:e.itemId,content:e.content});case i.ADD_LIST:return function(t,e,n,i){var r={position:Object.keys(t.sprints[e].data).length,list_title:i,items:{}},a=Object(j.cloneDeep)(t);return a.sprints[e].data[n]=r,a}(t,e.sprintId,e.listId,e.listTitle);case i.DELETE_LIST:return function(t,e,n){return Object(j.omit)(t,["sprints.".concat(e,".data.").concat(n)])}(t,e.sprintId,e.listId);case i.DELETE_ITEM:return function(t){var e=t.productData,n=t.sprintId,i=t.listId,r=t.itemId;return void 0===n?Object(j.omit)(e,["backlog.".concat(i,".items.").concat(r)]):Object(j.omit)(e,["sprints.".concat(n,".data.").concat(i,".items.").concat(r)])}({productData:t,sprintId:e.sprintId,listId:e.listId,itemId:e.itemId});case i.UPDATE_LIST_TITLE:return function(t,e,n,i){var r=Object(j.cloneDeep)(t);return r.sprints[e].data[n].list_title=i,r}(t,e.sprintId,e.listId,e.listTitle);case i.CREATE_SPRINT:return function(t){var e,n=t.productData,i=t.id,r=t.goal,a=t.startDate,o=t.endDate,c=t.isOpen;if(a>o)throw new Error("End date must be after start date");var s=Object(b.a)(),d=Object(b.a)(),p=Object(b.a)(),u=Object.keys(n.sprints).length;return Object(l.a)(Object(l.a)({},n),{},{sprints:Object(l.a)(Object(l.a)({},n.sprints),{},Object(x.a)({},i,{data:(e={},Object(x.a)(e,s,{items:{},list_title:"Sprint Backlog",position:0}),Object(x.a)(e,d,{items:{},list_title:"Doing",position:1}),Object(x.a)(e,p,{items:{},list_title:"Done",position:2}),e),goal:r,startDate:a,endDate:o,position:u,isOpen:c}))})}({productData:t,id:e.sprintId,goal:e.goal,startDate:e.startDate,endDate:e.endDate,isOpen:!0});case i.CLOSE_SPRINT:return function(t,e,n){try{return t()}catch(i){return alert(n),e}}((function(){return function(t){var e=t.productData,n=t.id;if(m(e.sprints[n]))throw new Error("All items must be in done state in order to close sprint");return Object(l.a)(Object(l.a)({},e),{},{sprints:Object(l.a)(Object(l.a)({},e.sprints),{},Object(x.a)({},n,Object(l.a)(Object(l.a)({},e.sprints[n]),{},{isOpen:!1})))})}({productData:t,id:e.sprintId})}),t,"Sprint with not done elements cannot be closed");case i.DELETE_SPRINT:return function(t){var e=t.productData,n=t.id;return Object(l.a)(Object(l.a)({},e),{},{sprints:Object(j.omit)(e.sprints,[n])})}({productData:t,id:e.sprintId});default:return t}}),it.productData),a=Object(u.a)(n,2),o=a[0],c=a[1];return Object(nt.jsx)(rt.Provider,{value:{productData:o,dispatch:c},children:e})},ot=d.a.textarea(g||(g=Object(s.a)(["\n  cursor: ",";\n  height: auto;\n  width: 100%;\n  overflow-y: hidden;\n  border: none;\n  resize: none;\n  border-radius: 4px;\n  width: 100%;\n  padding: 0;\n  font-weight: ",";\n  text-align: ",";\n  font-size: ",";\n  color: ",";\n  background: transparent;\n"])),(function(t){return t.editMode?"text":"pointer"}),(function(t){return t.isTitle?"600":"400"}),(function(t){return t.isTitle?"center":"start"}),(function(t){return t.isTitle?"22px":"unset"}),(function(t){return t.isTitle?"#40506C":"unset"})),ct=function(t){var e=t.placeholder,n=t.editMode,i=t.onSave,a=t.updateValue,o=t.onBlur,c=t.isTitle,s=Object(r.useState)(""),d=Object(u.a)(s,2),l=d[0],p=d[1],b=Object(r.useRef)(null);Object(r.useEffect)((function(){p(a)}),[a]),Object(r.useEffect)((function(){b.current&&(b.current.style.height="auto",b.current.style.height="".concat(b.current.scrollHeight,"px"))}),[l]),Object(r.useEffect)((function(){n&&b.current&&(b.current.focus(),b.current.select())}),[n]);return Object(nt.jsx)(ot,{isTitle:c,ref:b,value:l,onChange:function(t){p(t.target.value)},rows:1,onKeyDown:function(t){13===t.keyCode&&b.current&&(t.preventDefault(),i(l),b.current.blur())},onBlur:function(){return o(l)},spellCheck:"false",editMode:n,placeholder:e})},st=d.a.div(h||(h=Object(s.a)(["\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  font-size: 16px;\n  line-height: 23px;\n  font-family: trellicons;\n  border-radius: 3px;\n  height: 23px;\n  width: 23px;\n  text-align: center;\n  &:hover {\n    background-color: rgba(9, 30, 66, 0.08);\n  }\n  visibility: hidden;\n  cursor: pointer;\n"]))),dt=d.a.div(v||(v=Object(s.a)(["\n  width: 100%;\n"]))),lt=d.a.div(D||(D=Object(s.a)(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding-top: 12px;\n  padding-bottom: 8px;\n  padding-left: 14px;\n  padding-right: 14px;\n  background-color: #fff;\n  border-radius: 4px;\n  box-shadow: ",";\n  margin-bottom: 8px;\n  &:hover "," {\n    visibility: visible;\n  }\n"])),(function(t){return t.editMode?"none":"0px 2px 0px rgba(0, 0, 0, 0.2)"}),st),pt=function(t){var e=t.listId,n=t.itemId,a=t.itemData,o=t.sprintId,c=Object(r.useState)(!1),s=Object(u.a)(c,2),d=s[0],b=s[1],j=Object(r.useContext)(rt).dispatch,f=function(t){j({type:i.UPDATE_ITEM,sprintId:o,listId:e,itemId:n,content:t}),b(!1)},O=function(){b(!0)},x=function(){j({type:i.DELETE_ITEM,sprintId:o,listId:e,itemId:n})};return Object(nt.jsx)(p.b,{draggableId:n,index:a.position,disableInteractiveElementBlocking:!d,children:function(t){return Object(nt.jsxs)(lt,Object(l.a)(Object(l.a)(Object(l.a)({ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{editMode:d,children:[Object(nt.jsx)(dt,{onClick:O,children:Object(nt.jsx)(ct,{isTitle:!1,placeholder:"",onSave:f,updateValue:a.item_content,onBlur:f,editMode:d})}),Object(nt.jsx)(st,{onClick:x,children:"\ue918"})]}))}})},bt=d.a.div(E||(E=Object(s.a)(["\n  cursor: pointer;\n  padding: 8px;\n  &:hover span:last-child {\n    text-decoration: underline;\n  }\n  &:hover {\n    background-color: rgba(9, 30, 66, 0.08);\n  }\n"]))),ut=d.a.div(T||(T=Object(s.a)(["\n  padding: 8px;\n"]))),jt=function(t){var e=t.listId,n=t.sprintId,a=Object(r.useState)(!1),o=Object(u.a)(a,2),c=o[0],s=o[1],d=Object(r.useContext)(rt).dispatch;if(!c)return Object(nt.jsxs)(bt,{onClick:function(){return s(!0)},children:[Object(nt.jsx)("span",{className:"trellicons",children:"\ue901"})," ",Object(nt.jsx)("span",{children:"Add another item"})]});return Object(nt.jsx)(ut,{children:Object(nt.jsx)(ct,{isTitle:!1,onSave:function(t){d({type:i.ADD_ITEM,sprintId:n,listId:e,content:t}),s(!1)},updateValue:"",onBlur:function(){s(!1)},editMode:!0,placeholder:"Enter a title for this item\u2026"})})},ft=d.a.div(y||(y=Object(s.a)(["\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  font-family: trellicons;\n  font-size: 16px;\n  line-height: 32px;\n  border-radius: 3px;\n  height: 32px;\n  width: 32px;\n  text-align: center;\n  &:hover {\n    background-color: rgba(9, 30, 66, 0.08);\n  }\n  visibility: hidden;\n"]))),Ot=d.a.div(k||(k=Object(s.a)(["\n  && {\n    cursor: pointer;\n  }\n  &:hover "," {\n    visibility: visible;\n  }\n"])),ft),xt=d.a.div(_||(_=Object(s.a)(["\n  padding: 4px 8px;\n"]))),mt=function(t){var e=t.setDragBlocking,n=t.dragHandleProps,a=t.sprintId,o=t.listId,c=t.title,s=Object(r.useState)(!1),d=Object(u.a)(s,2),p=d[0],b=d[1],j=Object(r.useState)(c),f=Object(u.a)(j,2),O=f[0],x=f[1],m=Object(r.useContext)(rt).dispatch,I=void 0===a?function(){}:function(t){""===t.trim()?(x(""),setTimeout((function(){return x(c)}),0)):m({type:i.UPDATE_LIST_TITLE,sprintId:a,listId:o,listTitle:t}),e(!1),b(!1)},g=void 0===a?function(){}:function(){m({type:i.DELETE_LIST,sprintId:a,listId:o})};return Object(nt.jsxs)(Ot,Object(l.a)(Object(l.a)({},n),{},{children:[Object(nt.jsx)(xt,{onClick:function(){e(!0),b(!0)},children:Object(nt.jsx)(ct,{isTitle:!0,placeholder:"",onSave:I,updateValue:O,onBlur:I,editMode:!!a&&p})}),Object(nt.jsx)(ft,{onClick:g,children:"\ue918"})]}))},It=d.a.div(w||(w=Object(s.a)(["\n  position: relative;\n  width: 270px;\n  margin: 0 8px;\n  background-color: #e3e4e6;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  padding-top: 8px;\n  padding-left: 8px;\n  padding-right: 8px;\n  padding-bottom: 2px;\n"]))),gt=d.a.div(S||(S=Object(s.a)(["\n  min-height: 50px;\n"]))),ht=function(t){var e,n=t.listId,i=t.listData,a=t.sprintId,o=Object.keys(i.items).sort((e=i.items,function(t,n){return e[t].position-e[n].position})),c=Object(r.useState)(!1),s=Object(u.a)(c,2),d=s[0],b=s[1];return Object(nt.jsx)(p.b,{disableInteractiveElementBlocking:!d,draggableId:n,index:i.position,children:function(t){return Object(nt.jsxs)(It,Object(l.a)(Object(l.a)({ref:t.innerRef},t.draggableProps),{},{children:[Object(nt.jsx)(mt,{sprintId:a,dragHandleProps:t.dragHandleProps,listId:n,title:i.list_title,setDragBlocking:b}),Object(nt.jsx)(p.c,{droppableId:n,children:function(t){return Object(nt.jsxs)(gt,{ref:t.innerRef,children:[o.map((function(t){return Object(nt.jsx)(pt,{sprintId:a,itemId:t,listId:n,itemData:i.items[t]},t)})),t.placeholder]})}}),a?null:Object(nt.jsx)(jt,{sprintId:a,listId:n})]}))}})},vt=d.a.div(R||(R=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 8px;\n"]))),Dt=function(t){var e=t.listId,n=t.listData;return Object(nt.jsx)(vt,{children:Object(nt.jsx)(ht,{listId:e,listData:n})})},Et=d.a.div(C||(C=Object(s.a)(["\n  width: 272px;\n  flex: 0 0 272px;\n  /* instead of margin right for overflow-x scroll */\n  border-right: 8px solid transparent;\n  margin-left: 4px;\n"]))),Tt=d.a.div(P||(P=Object(s.a)(["\n  border-radius: 3px;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  background: #4e97c2;\n  color: #fff;\n"]))),yt=d.a.div(L||(L=Object(s.a)(["\n  cursor: pointer;\n"]))),kt=d.a.input(M||(M=Object(s.a)(["\n  border-radius: 3px;\n  margin: -4px 0;\n  padding: 4px 8px;\n  border: none;\n  &:focus {\n    box-shadow: inset 0 0 0 2px #0079bf;\n    outline: 0;\n  }\n"]))),_t=function(t){var e=t.sprintId,n=Object(r.useState)(!1),a=Object(u.a)(n,2),o=a[0],c=a[1],s=Object(r.useState)(""),d=Object(u.a)(s,2),l=d[0],p=d[1],j=Object(r.useRef)(null),f=Object(r.useContext)(rt).dispatch;Object(r.useEffect)((function(){o&&j.current&&j.current.focus()}),[o]);return Object(nt.jsx)(Et,{children:Object(nt.jsxs)(Tt,{compose:o,children:[o||Object(nt.jsxs)(yt,{onClick:function(){return c(!0)},children:[Object(nt.jsx)("span",{className:"trellicons",children:"\ue901"})," ",Object(nt.jsx)("span",{children:"Add another list"})]}),o&&Object(nt.jsx)(kt,{ref:j,type:"text",value:l,onChange:function(t){p(t.target.value)},onKeyDown:function(t){13===t.keyCode&&(f({type:i.ADD_LIST,sprintId:e,listId:Object(b.a)(),listTitle:l}),p(""),c(!1))},onBlur:function(){l.length>0&&(f({type:i.ADD_LIST,sprintId:e,listId:Object(b.a)(),listTitle:l}),p("")),c(!1)},placeholder:"Enter list title..."})]})})},wt=d.a.div(A||(A=Object(s.a)(["\n  background-color: rgba(255, 255, 255, 0.87);\n  border-radius: 15px;\n  display: flex;\n  flex-direction: column;\n  margin: 8px;\n"]))),St=d.a.div(N||(N=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 16px;\n  justify-content: space-between;\n"]))),Rt=d.a.div(B||(B=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"]))),Ct=d.a.div(z||(z=Object(s.a)(["\n  font-size: 36px;\n  font-weight: 600;\n  margin-right: 32px;\n"]))),Pt=d.a.div(U||(U=Object(s.a)(["\n  padding-left: 16px;\n  padding-bottom: 16px;\n"]))),Lt=d.a.div(H||(H=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: start;\n"]))),Mt=d.a.button(K||(K=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  padding: 8px;\n  background-color: #c24e4e;\n  border-radius: 4px;\n  border: none;\n  color: white;\n  outline: 0;\n  margin-right: 16px;\n"]))),At=d.a.button(F||(F=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  padding: 8px;\n  background-color: #4e97c2;\n  border-radius: 4px;\n  border: none;\n  color: white;\n  outline: 0;\n"]))),Nt=function(t){var e,n=t.sprintId,a=Object(r.useContext)(rt),o=a.productData,c=a.dispatch,s=o.sprints[n],d=Object.keys(o.sprints[n].data).sort((e=o.sprints[n].data,function(t,n){return e[t].position-e[n].position}));return Object(nt.jsxs)(wt,{children:[Object(nt.jsxs)(St,{children:[Object(nt.jsxs)(Rt,{children:[Object(nt.jsxs)(Ct,{children:["Sprint ",s.position+1]}),Object(nt.jsx)("span",{children:"dur\xe9e - date-debut - date fin"})]}),Object(nt.jsxs)(Rt,{children:[Object(nt.jsx)(Mt,{onClick:function(){return c({type:i.DELETE_SPRINT,sprintId:n})},children:"Delete Sprint"}),Object(nt.jsx)(At,{onClick:function(){return c({type:i.CLOSE_SPRINT,sprintId:n})},children:"Close Sprint"})]})]}),Object(nt.jsx)(Pt,{children:s.goal}),Object(nt.jsxs)(Lt,{children:[d.map((function(t){return Object(nt.jsx)(ht,{sprintId:n,listId:t,listData:o.sprints[n].data[t]},t)})),Object(nt.jsx)(_t,{sprintId:n})]})]})},Bt=d.a.div(V||(V=Object(s.a)(["\n  flex: 1;\n  overflow-x: auto;\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n"]))),zt=d.a.div(G||(G=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  padding: 8px;\n"]))),Ut=d.a.div(J||(J=Object(s.a)(["\n  font-weight: 700;\n  font-size: 30px;\n  color: white;\n  margin-right: 16px;\n"]))),Ht=d.a.div(Z||(Z=Object(s.a)(["\n  flex: 1;\n  overflow-x: auto;\n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n"]))),Kt=d.a.button(X||(X=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  background-color: #4e97c2;\n  border-radius: 4px;\n  border: none;\n  color: white;\n  outline: 0;\n"]))),Ft=d.a.div(q||(q=Object(s.a)(["\n  color: white;\n  font-size: 22px;\n  margin-right: 12px;\n"]))),Vt=function(t){return function(e){if(e.destination){var n=e.source,r=e.destination;n.droppableId===r.droppableId&&n.index===r.index||"COLUMN"!==e.type&&t({type:i.REORDER_ITEM_POSITION,source:n,destination:r,itemId:e.draggableId})}}},Gt=function(){var t=Object(r.useContext)(rt),e=t.productData,n=t.dispatch;if(!e)return Object(nt.jsx)("div",{children:"loading"});var a,o=Object.keys(e.sprints).sort((a=e.sprints,function(t,e){return a[t].position-a[e].position})),c=Object.keys(e.backlog);return Object(nt.jsx)(p.a,{onBeforeDragStart:function(){var t;"TEXTAREA"===(null===(t=document.activeElement)||void 0===t?void 0:t.tagName.toUpperCase())&&document.activeElement instanceof HTMLElement&&document.activeElement.blur()},onDragEnd:Vt(n),children:Object(nt.jsx)(p.c,{droppableId:"board",type:"COLUMN",direction:"horizontal",children:function(t){return Object(nt.jsxs)(Bt,Object(l.a)(Object(l.a)({ref:t.innerRef},t.droppableProps),{},{children:[Object(nt.jsxs)(zt,{children:[Object(nt.jsx)(Ut,{children:e.product_title}),Object(nt.jsxs)(Kt,{type:"button",onClick:function(){return function(){var t=Object(b.a)(),e=new Date,r=new Date;n({type:i.CREATE_SPRINT,sprintId:t,goal:"my goal",startDate:e,endDate:r})}()},children:[Object(nt.jsx)(Ft,{children:"+"}),"Add Sprint"]})]}),Object(nt.jsxs)(Ht,{children:[c.map((function(t){return Object(nt.jsx)(Dt,{listId:t,listData:e.backlog[t]},t)})),o.map((function(t){return Object(nt.jsx)(Nt,{sprintId:t},t)})),t.placeholder]})]}))}})})},Jt=d.a.div(Q||(Q=Object(s.a)(["\n  flex: 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: #026aa7;\n"]))),Zt=d.a.div(W||(W=Object(s.a)(["\n  color: #80b4d3;\n  font-size: 38px;\n  font-style: italic;\n  font-weight: 500;\n  margin-left: 8px;\n"]))),Xt=d.a.div(Y||(Y=Object(s.a)(["\n  position: relative;\n  width: 32px;\n  height: 32px;\n\n  background: #80b4d3;\n  border-radius: 5px;\n"]))),qt=d.a.div($||($=Object(s.a)(["\n  position: absolute;\n  width: 22px;\n  height: 8px;\n  left: 5px;\n  top: 11px;\n\n  background: #026aa7;\n  border-radius: 2px;\n"]))),Qt=d.a.div(tt||(tt=Object(s.a)(["\n  position: absolute;\n  width: 22px;\n  height: 8px;\n  left: 5px;\n  top: 20px;\n\n  background: #026aa7;\n  border-radius: 2px;\n"]))),Wt=d.a.div(et||(et=Object(s.a)(["\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n"]))),Yt=function(){return Object(nt.jsx)(Wt,{children:Object(nt.jsxs)(at,{children:[Object(nt.jsxs)(Jt,{children:[Object(nt.jsxs)(Xt,{children:[Object(nt.jsx)(qt,{}),Object(nt.jsx)(Qt,{})]}),Object(nt.jsx)(Zt,{children:"Sam"})]}),Object(nt.jsx)(Gt,{})]})})},$t=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,102)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),i(t),r(t),a(t),o(t)}))};c.a.render(Object(nt.jsx)(a.a.StrictMode,{children:Object(nt.jsx)(Yt,{})}),document.getElementById("root")),$t()},58:function(t,e,n){}},[[100,1,2]]]);
//# sourceMappingURL=main.25591a46.chunk.js.map