(this["webpackJsonpsam-scrum"]=this["webpackJsonpsam-scrum"]||[]).push([[0],{108:function(e,t,n){"use strict";n.r(t);var i,c,a=n(0),r=n.n(a),o=n(19),d=n.n(o),b=(n(59),n(3)),s=(n(60),n(61),n(4)),l=n(1),u=n(9),p=n(6),j=n(2),O=s.a.textarea(i||(i=Object(b.a)(["\n  cursor: ",";\n  height: auto;\n  overflow-y: hidden;\n  margin: -4px 0;\n  padding: 4px 8px;\n  border: none;\n  resize: none;\n  border-radius: 3px;\n  width: 100%;\n  background: transparent;\n  &:focus {\n    background: white;\n    box-shadow: inset 0 0 0 2px #0079bf;\n    outline: 0;\n  }\n"])),(function(e){return e.editMode?"text":"pointer"})),x=function(e){var t=e.placeholder,n=e.editMode,i=e.onSave,c=e.updateValue,r=e.onBlur,o=Object(a.useState)(""),d=Object(p.a)(o,2),b=d[0],s=d[1],l=Object(a.useRef)(null);Object(a.useEffect)((function(){s(c)}),[c]),Object(a.useEffect)((function(){l.current&&(l.current.style.height="auto",l.current.style.height="".concat(l.current.scrollHeight,"px"))}),[b]),Object(a.useEffect)((function(){n&&l.current&&(l.current.focus(),l.current.select())}),[n]);return Object(j.jsx)(O,{ref:l,value:b,onChange:function(e){s(e.target.value)},rows:1,onKeyDown:function(e){13===e.keyCode&&l.current&&(e.preventDefault(),i(b),l.current.blur())},onBlur:function(){return r(b)},spellCheck:"false",editMode:n,placeholder:t})},h=n(7),f=n(27),g=n.n(f),I=n(21),A=function(e){var t=e.initialPosition,n=e.finalPosition,i=e.list;return i.position===t?Object(l.a)(Object(l.a)({},i),{},{position:n}):i.position<Math.min(t,n)||i.position>Math.max(t,n)?Object(l.a)({},i):t<n?Object(l.a)(Object(l.a)({},i),{},{position:i.position-1}):Object(l.a)(Object(l.a)({},i),{},{position:i.position+1})},v=function(e){var t=e.sourceIndex,n=e.destinationIndex,i=e.card;return i.position===t?Object(l.a)(Object(l.a)({},i),{},{position:n}):i.position<Math.min(t,n)||i.position>Math.max(t,n)?i:t<n?Object(l.a)(Object(l.a)({},i),{},{position:i.position-1}):Object(l.a)(Object(l.a)({},i),{},{position:i.position+1})};!function(e){e.REORDER_LIST_POSITION="reorderListPosition",e.REORDER_CARD_POSITION="reorderCardPosition",e.ADD_CARD="addCard",e.UPDATE_CARD="updateCard",e.DELETE_CARD="deleteCard",e.ADD_LIST="addList",e.DELETE_LIST="deleteList",e.UPDATE_LIST_TITLE="updateListTitle"}(c||(c={}));var D,E,T,m,C,L,y,R,k,G,w,M,N,P,B,S,Z,J,Y={boardData:{"5cac8c9e-f91b-438a-9e18-00cea4667ee3":{position:0,list_title:"todo",cards:{"52f8d85a-0196-46f0-96f3-5878846851dd":{position:0,card_content:"todo item 1"},"271beef3-8082-4ec2-aa9b-955944aea405":{position:2,card_content:"second todo item"}}},"860c2140-f2cd-4e9a-8b82-179137e19b1e":{position:1,list_title:"done",cards:{"63bdd1d2-aa55-4e69-8f98-b345b5b6bdfd":{position:0,card_content:"some data here"},"8c2b284c-babe-48ce-8eed-12d3fed2334a":{position:2,card_content:"here is more text"},"11c54528-b4d5-4142-8069-3f82b91a7a2e":{position:1,card_content:"Multi-line card example. Multi-line card example. "}}}},dispatch:function(){return null}},X=Object(a.createContext)(Y),U=function(e){var t=e.children;var n=Object(a.useReducer)((function(e,t){switch(t.type){case c.REORDER_LIST_POSITION:return function(e,t,n){return Object.fromEntries(Object.entries(e).map((function(e){var i=Object(p.a)(e,2),c=i[0],a=i[1];return[c,A({list:a,initialPosition:t,finalPosition:n})]})))}(e,t.initialPosition,t.finalPosition);case c.REORDER_CARD_POSITION:return function(e,t,n,i){var c;if(t.droppableId===n.droppableId){var a=e[t.droppableId].cards,r=Object.fromEntries(Object.entries(a).map((function(e){var i=Object(p.a)(e,2),c=i[0],a=i[1];return[c,v({card:a,sourceIndex:t.index,destinationIndex:n.index})]})));return Object(l.a)(Object(l.a)({},e),{},Object(h.a)({},t.droppableId,Object(l.a)(Object(l.a)({},e[t.droppableId]),{},{cards:r})))}var o=Object.fromEntries(Object.entries(e[t.droppableId].cards).map((function(e){var n=Object(p.a)(e,2),i=n[0],c=n[1];return[i,Object(l.a)(Object(l.a)({},c),{},{position:c.position>t.index?c.position-1:c.position})]}))),d=Object.fromEntries(Object.entries(e[n.droppableId].cards).map((function(e){var t=Object(p.a)(e,2),i=t[0],c=t[1];return[i,Object(l.a)(Object(l.a)({},c),{},{position:c.position>=n.index?c.position+1:c.position})]}))),b=Object(l.a)(Object(l.a)({},e[t.droppableId].cards[i]),{},{position:n.index});return Object(I.omit)(Object(l.a)(Object(l.a)({},e),{},(c={},Object(h.a)(c,t.droppableId,Object(l.a)(Object(l.a)({},e[t.droppableId]),{},{cards:o})),Object(h.a)(c,n.droppableId,Object(l.a)(Object(l.a)({},e[n.droppableId]),{},{cards:Object(l.a)(Object(l.a)({},d),{},Object(h.a)({},i,b))})),c)),["".concat(t.droppableId,".cards.").concat(i)])}(e,t.source,t.destination,t.cardId);case c.ADD_CARD:return function(e,t,n){var i=e[t].cards,c={position:Object.keys(i).length,card_content:n},a=g()();return Object(l.a)(Object(l.a)({},e),{},Object(h.a)({},t,Object(l.a)(Object(l.a)({},e[t]),{},{cards:Object(l.a)(Object(l.a)({},e[t].cards),{},Object(h.a)({},a,c))})))}(e,t.listId,t.content);case c.UPDATE_CARD:return function(e,t,n,i){return Object(l.a)(Object(l.a)({},e),{},Object(h.a)({},t,Object(l.a)(Object(l.a)({},e[t]),{},{cards:Object(l.a)(Object(l.a)({},e[t].cards),{},Object(h.a)({},n,Object(l.a)(Object(l.a)({},e[t].cards[n]),{},{card_content:i})))})))}(e,t.listId,t.cardId,t.content);case c.ADD_LIST:return function(e,t){var n={position:Object.keys(e).length,list_title:t,cards:{}},i=g()();return Object(l.a)(Object(l.a)({},e),{},Object(h.a)({},i,n))}(e,t.listTitle);case c.DELETE_LIST:return function(e,t){return Object(I.omit)(e,[t])}(e,t.listId);case c.DELETE_CARD:return function(e,t,n){return Object(I.omit)(e,["".concat(t,".cards.").concat(n)])}(e,t.listId,t.cardId);case c.UPDATE_LIST_TITLE:return function(e,t,n){var i=Object(l.a)(Object(l.a)({},e[t]),{},{listTitle:n});return Object(l.a)(Object(l.a)({},e),{},Object(h.a)({},t,i))}(e,t.listId,t.listTitle);default:return e}}),Y.boardData),i=Object(p.a)(n,2),r=i[0],o=i[1];return Object(j.jsx)(X.Provider,{value:{boardData:r,dispatch:o},children:t})},W=s.a.div(D||(D=Object(b.a)(["\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  font-family: trellicons;\n  border-radius: 3px;\n  height: 23px;\n  width: 23px;\n  line-height: 23px;\n  text-align: center;\n  &:hover {\n    background-color: rgba(9, 30, 66, 0.08);\n  }\n  visibility: hidden;\n  cursor: pointer;\n"]))),z=s.a.div(E||(E=Object(b.a)(["\n  padding-top: 6px;\n  padding-bottom: 2px;\n  /* padding-right: 36px; */\n"]))),F=s.a.div(T||(T=Object(b.a)(["\n  background-color: #fff;\n  border-radius: 3px;\n  box-shadow: ",";\n  margin-bottom: 8px;\n  position: relative;\n  &:hover "," {\n    visibility: visible;\n  }\n"])),(function(e){return e.editMode?"none":"0 2px 4px rgba(2, 2, 2, 0.6)"}),W),Q=function(e){var t=e.listId,n=e.cardId,i=e.cardData,r=Object(a.useState)(!1),o=Object(p.a)(r,2),d=o[0],b=o[1],s=Object(a.useContext)(X).dispatch,O=function(e){s({type:c.UPDATE_CARD,listId:t,cardId:n,content:e}),b(!1)},h=function(){b(!0)},f=function(){s({type:c.DELETE_CARD,listId:t,cardId:n})};return Object(j.jsx)(u.b,{draggableId:n,index:i.position,disableInteractiveElementBlocking:!d,children:function(e){return Object(j.jsxs)(F,Object(l.a)(Object(l.a)(Object(l.a)({ref:e.innerRef},e.draggableProps),e.dragHandleProps),{},{editMode:d,children:[Object(j.jsx)(z,{onClick:h,children:Object(j.jsx)(x,{placeholder:"",onSave:O,updateValue:i.card_content,onBlur:O,editMode:d})}),Object(j.jsx)(W,{onClick:f,children:"\ue918"})]}))}})},V=s.a.div(m||(m=Object(b.a)(["\n  cursor: pointer;\n  padding: 8px;\n  &:hover span:last-child {\n    text-decoration: underline;\n  }\n  &:hover {\n    background-color: rgba(9, 30, 66, 0.08);\n  }\n"]))),H=s.a.div(C||(C=Object(b.a)(["\n  padding: 8px;\n"]))),q=function(e){var t=e.listId,n=Object(a.useState)(!1),i=Object(p.a)(n,2),r=i[0],o=i[1],d=Object(a.useContext)(X).dispatch;if(!r)return Object(j.jsxs)(V,{onClick:function(){return o(!0)},children:[Object(j.jsx)("span",{className:"trellicons",children:"\ue901"})," ",Object(j.jsx)("span",{children:"Add another card"})]});return Object(j.jsx)(H,{children:Object(j.jsx)(x,{onSave:function(e){d({type:c.ADD_CARD,listId:t,content:e}),o(!1)},updateValue:"",onBlur:function(){o(!1)},editMode:!0,placeholder:"Enter a title for this card\u2026"})})},K=s.a.div(L||(L=Object(b.a)(["\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  font-family: trellicons;\n  border-radius: 3px;\n  height: 32px;\n  width: 32px;\n  line-height: 32px;\n  text-align: center;\n  &:hover {\n    background-color: rgba(9, 30, 66, 0.08);\n  }\n  visibility: hidden;\n"]))),_=s.a.div(y||(y=Object(b.a)(["\n  position: relative;\n  && {\n    cursor: pointer;\n  }\n  &:hover "," {\n    visibility: visible;\n  }\n"])),K),$=s.a.div(R||(R=Object(b.a)(["\n  padding: 10px 8px;\n  padding-right: 36px;\n\n  & textarea {\n    font-weight: 600;\n  }\n"]))),ee=function(e){var t=e.setDragBlocking,n=e.dragHandleProps,i=e.listId,r=e.title,o=Object(a.useState)(!1),d=Object(p.a)(o,2),b=d[0],s=d[1],u=Object(a.useState)(r),O=Object(p.a)(u,2),h=O[0],f=O[1],g=Object(a.useContext)(X).dispatch,I=function(e){""===e.trim()?(f(""),setTimeout((function(){return f(r)}),0)):g({type:c.UPDATE_LIST_TITLE,listId:i,listTitle:e}),t(!1),s(!1)};return Object(j.jsxs)(_,Object(l.a)(Object(l.a)({},n),{},{children:[Object(j.jsx)($,{onClick:function(){t(!0),s(!0)},children:Object(j.jsx)(x,{placeholder:"",onSave:I,updateValue:h,onBlur:I,editMode:b})}),Object(j.jsx)(K,{onClick:function(){g({type:c.DELETE_LIST,listId:i})},children:"\ue918"})]}))},te=s.a.div(k||(k=Object(b.a)(["\n  &:first-child {\n    margin-left: 8px;\n  }\n  width: 272px;\n  display: inline-block;\n  flex: 0 0 272px;\n  margin: 0 4px;\n"]))),ne=s.a.div(G||(G=Object(b.a)(["\n  background-color: #ebecf0;\n  border-radius: 3px;\n"]))),ie=s.a.div(w||(w=Object(b.a)(["\n  min-height: 50px;\n  margin: 0 4px;\n  padding: 0 4px;\n"]))),ce=function(e){var t,n=e.listId,i=e.listData,c=Object.keys(i.cards).sort((t=i.cards,function(e,n){return t[e].position-t[n].position})),r=Object(a.useState)(!1),o=Object(p.a)(r,2),d=o[0],b=o[1];return Object(j.jsx)(u.b,{disableInteractiveElementBlocking:!d,draggableId:n,index:i.position,children:function(e){return Object(j.jsx)(te,Object(l.a)(Object(l.a)({ref:e.innerRef},e.draggableProps),{},{children:Object(j.jsxs)(ne,{children:[Object(j.jsx)(ee,{dragHandleProps:e.dragHandleProps,listId:n,title:i.list_title,setDragBlocking:b}),Object(j.jsx)(u.c,{droppableId:n,children:function(e){return Object(j.jsxs)(ie,{ref:e.innerRef,children:[c.map((function(e){return Object(j.jsx)(Q,{cardId:e,listId:n,cardData:i.cards[e]},e)})),e.placeholder]})}}),Object(j.jsx)(q,{listId:n})]})}))}})},ae=s.a.div(M||(M=Object(b.a)(["\n  width: 272px;\n  flex: 0 0 272px;\n  /* instead of margin right for overflow-x scroll */\n  border-right: 8px solid transparent;\n  margin-left: 4px;\n"]))),re=s.a.div(N||(N=Object(b.a)(["\n  border-radius: 3px;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  background-color: ",";\n  color: #fff;\n  &:hover {\n    /* alternative to ternary */\n    background-color: hsla(0, 0%, 100%, 0.32);\n    ","\n  }\n"])),(function(e){return e.compose?"#ebecf0":"hsla(0, 0%, 100%, 0.24)"}),(function(e){return e.compose&&"background-color: #ebecf0;"})),oe=s.a.div(P||(P=Object(b.a)(["\n  cursor: pointer;\n"]))),de=s.a.input(B||(B=Object(b.a)(["\n  border-radius: 3px;\n  margin: -4px 0;\n  padding: 4px 8px;\n  border: none;\n  &:focus {\n    box-shadow: inset 0 0 0 2px #0079bf;\n    outline: 0;\n  }\n"]))),be=function(){var e=Object(a.useState)(!1),t=Object(p.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(""),o=Object(p.a)(r,2),d=o[0],b=o[1],s=Object(a.useRef)(null),l=Object(a.useContext)(X).dispatch;Object(a.useEffect)((function(){n&&s.current&&s.current.focus()}),[n]);return Object(j.jsx)(ae,{children:Object(j.jsxs)(re,{compose:n,children:[n||Object(j.jsxs)(oe,{onClick:function(){return i(!0)},children:[Object(j.jsx)("span",{className:"trellicons",children:"\ue901"})," ",Object(j.jsx)("span",{children:"Add another list"})]}),n&&Object(j.jsx)(de,{ref:s,type:"text",value:d,onChange:function(e){b(e.target.value)},onKeyDown:function(e){13===e.keyCode&&(l({type:c.ADD_LIST,listTitle:d}),b(""),i(!1))},onBlur:function(){d.length>0&&(l({type:c.ADD_LIST,listTitle:d}),b("")),i(!1)},placeholder:"Enter list title..."})]})})},se=s.a.div(S||(S=Object(b.a)(["\n  white-space: nowrap;\n  overflow-x: auto;\n  height: 100%;\n  display: flex;\n"]))),le=function(e){return function(t){if(t.destination){var n=t.source,i=t.destination;n.droppableId===i.droppableId&&n.index===i.index||("COLUMN"!==t.type?e({type:c.REORDER_CARD_POSITION,source:n,destination:i,cardId:t.draggableId}):e({type:c.REORDER_LIST_POSITION,initialPosition:n.index,finalPosition:i.index}))}}},ue=function(){var e=Object(a.useContext)(X),t=e.boardData,n=e.dispatch;if(!t)return Object(j.jsx)("div",{children:"loading"});var i,c=Object.keys(t).sort((i=t,function(e,t){return i[e].position-i[t].position}));return Object(j.jsx)(u.a,{onBeforeDragStart:function(){var e;"TEXTAREA"===(null===(e=document.activeElement)||void 0===e?void 0:e.tagName.toUpperCase())&&document.activeElement instanceof HTMLElement&&document.activeElement.blur()},onDragEnd:le(n),children:Object(j.jsx)(u.c,{droppableId:"board",type:"COLUMN",direction:"horizontal",children:function(e){return Object(j.jsxs)(se,Object(l.a)(Object(l.a)({ref:e.innerRef},e.droppableProps),{},{children:[c.map((function(e){return Object(j.jsx)(ce,{listId:e,listData:t[e]},e)})),e.placeholder,Object(j.jsx)(be,{})]}))}})})},pe=s.a.div(Z||(Z=Object(b.a)(["\n  font-family: roboto;\n  color: white;\n  margin: 8px;\n  text-align: center;\n  font-weight: 600;\n  font-size: 40px;\n  position: relative;\n  & img {\n    position: absolute;\n    background-color: white;\n    left: 0;\n    top: 0;\n    border-radius: 3px;\n    height: 40px;\n    width: 40px;\n    padding: 3px;\n  }\n"]))),je=s.a.div(J||(J=Object(b.a)(["\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n"]))),Oe=function(){return Object(j.jsx)(je,{children:Object(j.jsxs)(U,{children:[Object(j.jsxs)(pe,{children:[Object(j.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/tberghuis/trello-board-clone",children:Object(j.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEzMjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyQTQxNEFCQzk5QTExMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTMwOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTMxOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R7ClIwAADR5JREFUeNrsnQuw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",alt:"Github"})}),Object(j.jsx)("span",{children:"Trello Board Clone"})]}),Object(j.jsx)(ue,{})]})})},xe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,109)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),i(e),c(e),a(e),r(e)}))};d.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(Oe,{})}),document.getElementById("root")),xe()},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){}},[[108,1,2]]]);
//# sourceMappingURL=main.57ab5eab.chunk.js.map