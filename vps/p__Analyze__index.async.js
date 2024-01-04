"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[637],{509:function(ot,A){var e={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"}}]},name:"search",theme:"outlined"};A.Z=e},89449:function(ot,A,e){e.r(A),e.d(A,{default:function(){return ye}});var j=e(40323),I=e(3381),Q=e(5574),s=e.n(Q),a=e(62435),h=e(30029),G=e(87462),k=e(36688),M=e(84089),w=function(E,u){return a.createElement(M.Z,(0,G.Z)({},E,{ref:u,icon:k.Z}))},z=a.forwardRef(w),q=e(26713),T=e(71577),zt=e(45239),Rt=e(55241),V=e(48141),It=e(68023),Zt=e(30454),Kt=e(8690),qt=e(82739),te=e(31281),Wt=e(76395),ee=e(34584),ae=e(53414),ne=e(55457),se=e(35627),Vt=e(92854),re=e(72127),Jt=e(91416),t=e(86074);function oe(J){var E=J.onDataChange,u="large",O=(0,a.useState)([]),Z=s()(O,2),K=Z[0],W=Z[1],P=(0,a.useState)("\u5E73\u5B89\u94F6\u884C"),F=s()(P,2),b=F[0],U=F[1],L=function(){var f={key:"8140ad230f687daede75a08855e8ae5ff40c3ba8"};(0,V.request)("http://139.159.205.40:8808/quant/sotcklist",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(f)}).then(function(m){W(m.data.map(function(p){return p.split(",")}))}).catch(function(m){console.log(m)})};(0,a.useEffect)(function(){L()},[]);var H=function(f,m,p){U(f),E(m,p)};return(0,t.jsx)("div",{style:{textAlign:"center",height:"88vh",overflow:"auto"},children:(0,t.jsx)(q.Z,{direction:"vertical",children:K.map(function(v,f){return(0,t.jsx)(T.Z,{size:u,type:b===v[0]?"primary":"default",onClick:function(){return H(v[0],v[1],v[2])},children:v[0]},f)})})})}It.D([Kt.N,qt.N,te.N,Wt.N,ee.N,ae.N,ne.N,se.N,Vt.N,Jt.N,re.z]);var le=function(){var E=1,u="large",O="#ec0000",Z="#8A0000",K="#00da3c",W="#008F28",P=(0,a.useRef)(null),F=(0,a.useState)("#5470c6"),b=s()(F,2),U=b[0],L=b[1],H=(0,a.useState)(""),v=s()(H,2),f=v[0],m=v[1],p=(0,a.useState)([]),Y=s()(p,2),X=Y[0],lt=Y[1],Bt=(0,a.useState)({long:[],short:[]}),it=s()(Bt,2),ut=it[0],ct=it[1],kt=(0,a.useState)({}),dt=s()(kt,2),ht=dt[0],vt=dt[1],Tt=(0,a.useState)([]),ft=s()(Tt,2),gt=ft[0],yt=ft[1],mt=(0,a.useState)([]),pt=s()(mt,2),tt=pt[0],xt=pt[1],St=function(g){var d={stock_id:g,with_details:"0",categories:"factor",key:"8140ad230f687daede75a08855e8ae5ff40c3ba8"};(0,V.request)("http://139.159.205.40:8808/quant/stockanalysis",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(d)}).then(function(r){m(r.data.long[0].name);var i=r.data.long||[],D=r.data.short||[];i.forEach(function($){$.struct.children.forEach(function(N){N.value=N.label,N.children.forEach(function(C){C.value=C.label,C.value==="sigma"?C.children.forEach(function(x,B){x.value="\u53D6\u503C".concat(B+1,":")+x.value}):C.children.forEach(function(x,B){x.value="\u53D6\u503C".concat(B+1,":")+(x.value*100).toFixed(2)+"%"})})})}),D.forEach(function($){$.struct.children.forEach(function(N){N.value=N.label,N.children.forEach(function(C){C.value=C.label,C.value==="sigma"?C.children.forEach(function(x,B){x.value="\u53D6\u503C".concat(B+1,":")+x.value}):C.children.forEach(function(x,B){x.value="\u53D6\u503C".concat(B+1,":")+(x.value*100).toFixed(2)+"%"})})})}),ct({long:i,short:D})}).catch(function(r){console.log(r)})},et=function(g){var d={stock_id:g,days:E,key:"8140ad230f687daede75a08855e8ae5ff40c3ba8"};(0,V.request)("http://139.159.205.40:8808/quant/getstock_kline",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(d)}).then(function(r){lt(r.data);var i=[];r.data.forEach(function(D){i.push(D.time)}),xt(i)}).catch(function(r){console.log(r)})},Ct=function(g){var d={stock_id:g,days:E,key:"8140ad230f687daede75a08855e8ae5ff40c3ba8"};(0,V.request)("http://139.159.205.40:8808/quant/historyfactor",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(d)}).then(function(r){vt(r.data[60].factors)}).catch(function(r){console.log(r)})};(0,a.useEffect)(function(){St("000001.SZ"),et("000001"),Ct("000001")},[]),(0,a.useEffect)(function(){Object.keys(ht).length!==0&&f!==""&&yt(ht[f].bins)},[tt,f]),(0,a.useEffect)(function(){console.log(111,"\u7B2C\u4E00\u6B21");var c=X==null?void 0:X.map(function(r){return delete r.time,Object.values(r)}),g={tooltip:{trigger:"axis",axisPointer:{type:"cross"},formatter:function(i){var D="\u25CF",$=i[0].axisValue,N=i[0].value[1],C=i[0].value[2],x=i[0].value[3],B=i[0].value[4],Ft=i[0].value[6],Lt=i[1]?i[1].seriesName:"\u6682\u65E0\u6570\u636E",Dt=i[1]?i[1].value:"\u6682\u65E0\u6570\u636E";return $+"<br>"+D+"\u5F00\u76D8\u4EF7: &nbsp"+B+"<br>"+D+"\u6536\u76D8\u4EF7: &nbsp"+N+"<br>"+D+"\u6700\u4F4E\u4EF7: &nbsp"+x+"<br>"+D+"\u6700\u9AD8\u4EF7: &nbsp"+C+'<br><div style="margin-bottom:6px"></div>'+D+"\u6210\u4EA4\u91CF: &nbsp"+Ft+"<br>"+D+Lt+": &nbsp"+Dt}},loading:{text:"\u6B63\u5728\u52A0\u8F7D\u4E2D...",color:"#000",backgroundColor:"#fff",width:"100%",height:"100%"},legend:{data:["\u65E5K",f]},grid:{left:"10%",right:"10%",bottom:"15%"},xAxis:{type:"category",data:tt,boundaryGap:!1,axisLine:{onZero:!1},splitLine:{show:!1},min:"dataMin",max:"dataMax"},yAxis:[{type:"value",scale:!0,splitArea:{show:!0}},{type:"value"}],dataZoom:[{type:"inside",start:0,end:50},{show:!0,type:"slider",top:"90%",start:0,end:50}],series:[{name:"\u65E5K",type:"candlestick",data:c,itemStyle:{color:O,color0:K,borderColor:Z,borderColor0:W},markPoint:{label:{formatter:function(i){return i!=null?Math.round(i.value)+"":""}},tooltip:{formatter:function(i){return i.name+"<br>"+(i.data.coord||"")}}},yAxisIndex:0},{name:f,type:"line",data:gt,smooth:!0,lineStyle:{opacity:.9},itemStyle:{color:U},yAxisIndex:1}]},d=Zt.S1(P.current);return d.setOption(g),function(){d.dispose()}},[tt,gt]);var at=function(g,d){var r=g.target.textContent;switch(d){case 0:L("#5470c6");break;case 1:L("#91cc75");break;case 2:L("#fac858");break}m(r)},nt=function(g){var d=g.split("\u3002");return d},Pt=function(g,d){et(g),Ct(g),St(g+"."+d)};return(0,t.jsxs)(h.Z,{gutter:16,ghost:!0,wrap:!0,children:[(0,t.jsx)(h.Z,{colSpan:{xs:24,sm:24,md:4,lg:4,xl:3},style:{height:"100%"},children:(0,t.jsx)(oe,{onDataChange:Pt})}),(0,t.jsxs)(h.Z,{gutter:[0,13],colSpan:{xs:24,sm:24,md:20,lg:20,xl:21},direction:"column",children:[(0,t.jsx)(h.Z,{style:{height:460},bordered:!0,children:(0,t.jsx)("div",{ref:P,style:{width:"100%",height:"100%"}})}),(0,t.jsx)(h.Z,{title:"\u770B\u6DA8\u56E0\u5B50",type:"inner",bordered:!0,direction:"column",children:ut.long.map(function(c,g){return(0,t.jsxs)("div",{children:[(0,t.jsxs)(q.Z,{children:[(0,t.jsx)(T.Z,{type:f===c.name?"primary":"default",size:u,onClick:function(r){at(r,g)},children:c.name}),(0,t.jsx)(zt.Z,{style:{width:"100%"},options:c.struct.children,size:u,fieldNames:{label:"value",value:"label"},placeholder:"\u9884\u4F30\u6570\u503C"}),(0,t.jsxs)(T.Z,{type:"primary",size:u,children:["\u63A8\u8350\u6307\u6570",c.rate]}),(0,t.jsx)(Rt.Z,{content:(0,t.jsx)("div",{style:{width:"500px"},children:nt(c.desc).map(function(d,r){return(0,t.jsx)("p",{style:{textIndent:"2em"},children:d},r)})}),title:"\u63CF\u8FF0",children:(0,t.jsx)(T.Z,{size:u,type:"primary",shape:"circle",icon:(0,t.jsx)(z,{})})})]}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{})]},c.name)})}),(0,t.jsx)(h.Z,{title:"\u770B\u8DCC\u56E0\u5B50",type:"inner",bordered:!0,children:ut.short.map(function(c,g){return(0,t.jsxs)("div",{children:[(0,t.jsxs)(q.Z,{children:[(0,t.jsx)(T.Z,{type:f===c.name?"primary":"default",size:u,onClick:function(r){at(r,g)},children:c.name}),(0,t.jsx)(zt.Z,{style:{width:"100%"},options:c.struct.children,size:u,fieldNames:{label:"value",value:"label"},placeholder:"\u9884\u4F30\u6570\u503C"}),(0,t.jsxs)(T.Z,{type:"primary",size:u,children:["\u63A8\u8350\u6307\u6570",c.rate]}),(0,t.jsx)(Rt.Z,{content:(0,t.jsx)("div",{style:{width:"500px"},children:nt(c.desc).map(function(d,r){return(0,t.jsx)("p",{style:{textIndent:"2em"},children:d},r)})}),title:"\u63CF\u8FF0",children:(0,t.jsx)(T.Z,{size:u,type:"primary",shape:"circle",icon:(0,t.jsx)(z,{})})})]}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{})]},c.name)})})]})]})},ie=le;function ue(J){var E=J.onDataChange,u="large",O=(0,a.useState)([]),Z=s()(O,2),K=Z[0],W=Z[1],P=(0,a.useState)("\u5E73\u5B89\u94F6\u884C"),F=s()(P,2),b=F[0],U=F[1],L=function(){var f={key:"8140ad230f687daede75a08855e8ae5ff40c3ba8"};(0,V.request)("http://139.159.205.40:8808/quant/sotcklist",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(f)}).then(function(m){W(m.data.map(function(p){return p.split(",")}))}).catch(function(m){console.log(m)})};(0,a.useEffect)(function(){L()},[]);var H=function(f,m,p){U(f),E(m,p)};return(0,t.jsx)("div",{style:{textAlign:"center",height:"88vh",overflow:"auto"},children:(0,t.jsx)(q.Z,{direction:"vertical",children:K.map(function(v,f){return(0,t.jsx)(T.Z,{size:u,type:b===v[0]?"primary":"default",onClick:function(){return H(v[0],v[1],v[2])},children:v[0]},f)})})})}var bt=e(49129),ce=e(60201),Et=e(83134),de=e(4755);It.D([Kt.N,Wt.N,Jt.N,de.N,Vt.N]);function he(){var J=[10.26,10.26,10.26,10.26,10.26,10.28,10.3,10.28,10.27,10.27,10.26,10.28,10.27,10.28,10.27,10.27,10.25,10.25,10.26,10.25,10.26],E=["2023-11-22 09:30:00","2023-11-22 09:31:00","2023-11-22 09:32:00","2023-11-22 09:33:00","2023-11-22 09:34:00","2023-11-22 09:35:00","2023-11-22 09:36:00","2023-11-22 09:37:00","2023-11-22 09:38:00","2023-11-22 09:39:00","2023-11-22 09:40:00","2023-11-22 09:41:00","2023-11-22 09:42:00","2023-11-22 09:43:00","2023-11-22 09:44:00","2023-11-22 09:45:00","2023-11-22 09:46:00","2023-11-22 09:47:00","2023-11-22 09:48:00","2023-11-22 09:49:00"],u="large",O=new Date,Z=O.getDate(),K=O.getMonth()+1,W=O.getFullYear(),P="".concat(W,"-").concat(K,"-").concat(Z),F=(0,a.useRef)(null),b=(0,a.useRef)(null),U=(0,a.useState)(5),L=s()(U,2),H=L[0],v=L[1],f=(0,a.useState)(0),m=s()(f,2),p=m[0],Y=m[1],X=(0,a.useState)(P),lt=s()(X,2),Bt=lt[0],it=lt[1],ut=(0,a.useState)(1),ct=s()(ut,2),kt=ct[0],dt=ct[1],ht=(0,a.useState)([]),vt=s()(ht,2),Tt=vt[0],ft=vt[1],gt=(0,a.useState)([]),yt=s()(gt,2),mt=yt[0],pt=yt[1],tt=(0,a.useState)(),xt=s()(tt,2),St=xt[0],et=xt[1],Ct=(0,a.useState)(0),at=s()(Ct,2),nt=at[0],Pt=at[1],c=(0,a.useState)(!0),g=s()(c,2),d=g[0],r=g[1],i=(0,a.useState)(),D=s()(i,2),$=D[0],N=D[1],C=(0,a.useState)(),x=s()(C,2),B=x[0],Ft=x[1],Lt=(0,a.useState)(),Dt=s()(Lt,2),me=Dt[0],pe=Dt[1],xe=(0,a.useState)(),Ut=s()(xe,2),Se=Ut[0],Ce=Ut[1],De=(0,a.useState)([]),Ht=s()(De,2),je=Ht[0],Oe=Ht[1],Ze=(0,a.useState)([]),Qt=s()(Ze,2),be=Qt[0],Ee=Qt[1],Be=(0,a.useState)([{name:"",max:""}]),Gt=s()(Be,2),ke=Gt[0],Te=Gt[1],Pe=(0,a.useState)(""),wt=s()(Pe,2),Fe=wt[0],Yt=wt[1],Le=(0,a.useState)([]),Xt=s()(Le,2),$t=Xt[0],Ne=Xt[1],R=[],_=[],Ae=function(){var n={uid:1,key:"8140ad230f687daede75a08855e8ae5ff40c3ba8"};(0,V.request)("http://139.159.205.40:8808/quant/strtegylist",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(n)}).then(function(y){et(y.data.list[0]),Yt(y.data.list[0]),ft(y.data.list),pt(Object.values(y.data.details))}).catch(function(y){console.log(y)})},Me=function l(n){var y={uid:n,key:"8140ad230f687daede75a08855e8ae5ff40c3ba8"};(0,V.request)("http://139.159.205.40:8808/quant/get_strategy_test_result",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(y)}).then(function(o){if(console.log(o),o.code===300)setTimeout(function(){l(n)},5e3);else{var st=[],jt=[],Ot=[],rt=[],_t=[],Nt=[];o.data.result.forEach(function(S){S.indicator_flag==="True"&&(st.push({name:S.name,desc:S.desc,value:S.value.toFixed(4)}),jt.push({name:S.name,max:S.max}),Ot.push(S.value))}),p||o.data.raw_data.forEach(function(S){rt.push(Object.values(S)[0]),_t.push(Object.keys(S)[0]);for(var At=0;At<o.data.decision_long.length;At++)if(o.data.decision_long[At]===Object.keys(S)[0]){Nt.push({coord:[Object.keys(S)[0],Object.values(S)[0]],itemStyle:{color:"red"},label:{formatter:"\u4E70\u5165"}});break}for(var Mt=0;Mt<o.data.decision_short.length;Mt++)if(o.data.decision_short[Mt]===Object.keys(S)[0]){Nt.push({coord:[Object.keys(S)[0],Object.values(S)[0]],itemStyle:{color:"green"},label:{formatter:"\u5356\u51FA"}});break}}),st.push(),console.log(rt);var He=Math.max.apply(Math,rt),Qe=Math.min.apply(Math,rt);pe(He),Ce(Qe),Oe(Nt),Ee(st),Te(jt),Ne(Ot),Ft(rt),N(_t),console.log("\u6210\u529F\uFF01"),r(!0),_=[]}}).catch(function(o){console.log(o)})},ze=function(n){var y={key:"8140ad230f687daede75a08855e8ae5ff40c3ba8",setting:[{strategy_name:St,span:60,kargs:n}],configs:{stock_id:"000001",user_id:"000001",setting_mode:"p",analysis_flag:0,holding_cost:-1,end_date:Bt,cnt_ops:kt,test_days:H,mode:"both"}};(0,V.request)("http://139.159.205.40:8808/quant/strategy_test",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(y)}).then(function(o){console.log(o.uid),o.uid&&Me(o.uid)}).catch(function(o){console.log(o)})};(0,a.useEffect)(function(){Ae()},[]),(0,a.useEffect)(function(){var l={title:{text:"Basic Radar Chart"},radar:{indicator:ke},tooltip:{trigger:"item"},series:[{name:"Budget vs spending",type:"radar",data:[{value:$t,name:"Allocated Budget"}]}]},n=Zt.S1(F.current);n.setOption(l)},[$t]),(0,a.useEffect)(function(){var l={tooltip:{trigger:"axis",axisPointer:{type:"cross"},formatter:function(o){var st='<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:blue;"></span>',jt='<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:red;"></span>',Ot='<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:green;"></span>';return o[1]&&o[1].data!==""?jt+"\u4E70\u5165 :"+o[0].data:o[1]&&o[2].data!==""?Ot+"\u5356\u51FA :"+o[0].data:st+"\u80A1\u7968 :"+o[0].data}},xAxis:{type:"category",data:$},yAxis:{type:"value",min:Se,max:me},dataZoom:[{type:"inside",start:0,end:50},{show:!0,type:"slider",top:"90%",start:0,end:50}],series:[{data:B,type:"line",symbolSize:10,symbol:"circle",markPoint:{label:{show:!0,position:"top"},data:je},lineStyle:{color:"#5470C6",width:3},itemStyle:{borderWidth:3,color:"blue"}}]},n=Zt.S1(b.current);n.setOption(l)},[B]);var Re=function(n){console.log("\u56DE\u6EDA\u6B21\u6570",n.target.value),Y(n.target.value)},Ie=function(n,y){console.log(n,y),it(y)},Ke=function(n){console.log("\u6700\u5927\u4EA4\u6613\u6B21\u6570",n),dt(n)},We=function(){_=[];for(var n=0;n<R.length;n++)R.length>0&&(_.push("".concat(R[0].name,":").concat(R[0].value)),n!==0&&R[n-1].name!==R[n].name&&_.push("".concat(R[0].name,":").concat(R[0].value)));console.log(_),ze(_),r(!1)},Ve=function(n){console.log("\u6D4B\u8BD5\u5929\u6570",n),v(n)},Je=function(n,y){var o=y.target.innerHTML;et(o),Pt(n),Yt(o)},Ue=function(n,y){console.log(n,y),R.unshift({name:n,value:y}),console.log(R)};return(0,t.jsxs)("div",{children:[(0,t.jsxs)(h.Z,{gutter:16,ghost:!0,wrap:!0,children:[(0,t.jsxs)(h.Z,{bordered:!0,style:{textAlign:"center",height:225,overflowY:"scroll"},colSpan:{xs:24,sm:24,md:4,lg:4,xl:10},children:[(0,t.jsx)(q.Z,{wrap:!0,align:"center",children:Tt.map(function(l,n){return(0,t.jsx)(T.Z,{type:Fe===l?"primary":"default",onClick:function(o){Je(n,o)},children:l},n)})}),(0,t.jsx)("div",{children:mt[nt]&&mt[nt].map(function(l,n){return(0,t.jsxs)("div",{style:{marginTop:"20px"},"data-name":l.name,children:[l.desc," : ",(0,t.jsx)(bt.Z,{min:1,defaultValue:l.value,onChange:function(o){Ue(l.name,o)}})," "]},n)})})]}),(0,t.jsxs)(h.Z,{style:{textAlign:"center",height:225},bordered:!0,colSpan:{xs:24,sm:24,md:4,lg:4,xl:14},children:[(0,t.jsxs)("div",{className:"numberSele",children:[(0,t.jsx)(bt.Z,{size:u,min:1,max:10,addonBefore:"\u6D4B\u8BD5\u5929\u6570",addonAfter:"\u5929",defaultValue:5,onChange:Ve}),(0,t.jsx)(bt.Z,{size:u,min:1,addonBefore:"\u6700\u5927\u4EA4\u6613\u6B21\u6570",addonAfter:"\u6B21",defaultValue:1,onChange:Ke})]}),(0,t.jsxs)("div",{className:"numberSele",children:[(0,t.jsx)(ce.Z,{onChange:Ie}),"\u662F\u5426\u6EDA\u52A8\u6D4B\u8BC4:",(0,t.jsxs)(Et.ZP.Group,{onChange:Re,value:p,children:[(0,t.jsx)(Et.ZP,{value:0,children:"\u5426"}),(0,t.jsx)(Et.ZP,{value:1,children:"\u662F"})]})]}),d&&(0,t.jsx)(T.Z,{size:u,style:{background:"rgb(1,108,102)",color:"#fff",marginBottom:20},onClick:We,children:"\u6D4B\u8BD5"}),!d&&(0,t.jsx)(T.Z,{size:u,style:{background:"rgb(1,108,102)",color:"#fff",marginBottom:20},children:"\u6B63\u5728\u6D4B\u8BD5..."})]})]}),(0,t.jsxs)(h.Z,{style:{height:360},children:[(0,t.jsx)(h.Z,{style:{height:"100%"},colSpan:{xs:24,sm:24,md:4,lg:4,xl:11},bordered:!0,children:(0,t.jsxs)("div",{className:"demoResult",children:[(0,t.jsx)("div",{children:"\u6D4B\u8BD5\u7ED3\u679C\uFF1A"}),(0,t.jsx)("br",{}),be.map(function(l,n){return(0,t.jsxs)("div",{style:{fontWeight:"bole"},children:[(0,t.jsxs)("p",{children:[" ",(0,t.jsxs)("span",{children:[n+1,"\u3001"]})," ",l.name?"".concat(l.name,"(").concat(l.value,"):"):""]}),(0,t.jsx)("p",{children:l.desc})]},n)})]})}),(0,t.jsx)(h.Z,{style:{height:"100%"},colSpan:{xs:24,sm:24,md:4,lg:4,xl:12},bordered:!0,children:(0,t.jsx)("div",{ref:F,style:{width:"100%",height:"100%"}})})]}),(0,t.jsx)(h.Z,{style:{height:460,width:"90%"},colSpan:{xs:24,sm:24,md:4,lg:4,xl:12},children:(0,t.jsx)("div",{ref:b,style:{height:"100%"}})})]})}var ve=function(){var E="large",u=(0,a.useState)("000001"),O=s()(u,2),Z=O[0],K=O[1],W=(0,a.useState)("\u770B\u6DA8\u4E70\u5165"),P=s()(W,2),F=P[0],b=P[1],U=function(){b("\u770B\u6DA8\u4E70\u5165")},L=function(){b("\u770B\u8DCC\u6B62\u635F")},H=function(){b("\u7EFC\u5408\u7B56\u7565")},v=function(Y,X){console.log(X,Y),K(Y)},f=[],m=function(){};return(0,t.jsxs)(h.Z,{gutter:16,ghost:!0,wrap:!0,children:[(0,t.jsx)(h.Z,{colSpan:{xs:24,sm:24,md:4,lg:4,xl:3},style:{height:"100%"},children:(0,t.jsx)(ue,{onDataChange:v})}),(0,t.jsx)(h.Z,{gutter:[0,16],colSpan:{xs:24,sm:24,md:20,lg:20,xl:21},direction:"column",children:(0,t.jsx)(he,{ButtonId:Z})})]})},fe=ve,ge=function(){var E=[{key:"1",label:"\u63A8\u8350\u56E0\u5B50",children:(0,t.jsx)(ie,{})},{key:"2",label:"\u7B56\u7565\u751F\u6210\u5668",children:(0,t.jsx)(fe,{})}],u=function(Z){console.log(Z)};return(0,t.jsx)(j._z,{ghost:!0,header:{title:""},children:(0,t.jsx)(I.Z,{defaultActiveKey:"1",items:E,onChange:u})})},ye=ge},9708:function(ot,A,e){e.d(A,{F:function(){return G},Z:function(){return h}});var j=e(4942),I=e(94184),Q=e.n(I),s=e(93355),a=(0,s.b)("warning","error","");function h(k,M,w){var z;return Q()((z={},(0,j.Z)(z,"".concat(k,"-status-success"),M==="success"),(0,j.Z)(z,"".concat(k,"-status-warning"),M==="warning"),(0,j.Z)(z,"".concat(k,"-status-error"),M==="error"),(0,j.Z)(z,"".concat(k,"-status-validating"),M==="validating"),(0,j.Z)(z,"".concat(k,"-has-feedback"),w),z))}var G=function(M,w){return w||M}},35918:function(ot,A,e){e.d(A,{Z:function(){return G}});var j=e(1413),I=e(62435),Q={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"}}]},name:"check",theme:"outlined"},s=Q,a=e(93771),h=function(M,w){return I.createElement(a.Z,(0,j.Z)((0,j.Z)({},M),{},{ref:w,icon:s}))};h.displayName="CheckOutlined";var G=I.forwardRef(h)},25783:function(ot,A,e){var j=e(1413),I=e(62435),Q=e(509),s=e(93771),a=function(G,k){return I.createElement(s.Z,(0,j.Z)((0,j.Z)({},G),{},{ref:k,icon:Q.Z}))};a.displayName="SearchOutlined",A.Z=I.forwardRef(a)}}]);
