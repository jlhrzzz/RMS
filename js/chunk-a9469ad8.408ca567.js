(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9469ad8"],{"3f0e":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("el-scrollbar",{attrs:{"wrap-class":"scrollWrap","view-class":"scrollView",native:!1,id:"content"}},[e("ul",{staticClass:"legend"},[e("li",[e("div",[e("span",{staticClass:"iconfont"},[t._v("")])]),e("span",[t._v("空闲")])]),e("li",[e("div",[e("span",{staticClass:"iconfont"},[t._v("")])]),e("span",[t._v("点餐中")])]),e("li",[e("div",[e("span",{staticClass:"iconfont"},[t._v("")])]),e("span",[t._v("用餐中")])])]),e("ul",{staticClass:"table"},t._l(t.tables.list,(function(s){return e("li",{key:s.table_id,class:{ordering:1==s.status,eating:2==s.status},on:{click:function(e){return t.chooseTable(s)}}},[e("div",[e("span",{staticClass:"iconfont"},[t._v("")])]),e("span",[t._v(t._s(s.table_id)+"号桌")])])})),0)])},n=[],i={computed:{tables:function(){return this.$store.getters.getTables}},methods:{chooseTable:function(t){var s=this;1!=t.status?2!=t.status?this.$prompt("请输入人数",{inputPattern:/^(10|[1-9])$/,inputErrorMessage:"输入的人数不正确"}).then((function(e){s.requestTable(t.table_id,e.value)})).catch((function(){})):this.$alert("正在就餐，不能点菜"):this.requestTable(t.table_id,t.people_number)},requestTable:function(t,s){var e=this;this.$fetch({url:"/api/choose_table",method:"POST",data:{table_id:t,people_number:s}}).then((function(t){var s=e;e.$getTable(),e.$message({message:"选座成功，即将跳转至点菜页",type:"success",duration:1e3,onClose:function(){s.$router.push("/")}})}))}}},l=i,o=(e("5812"),e("2877")),c=Object(o["a"])(l,a,n,!1,null,"24a181b0",null);s["default"]=c.exports},5812:function(t,s,e){"use strict";e("a118")},a118:function(t,s,e){}}]);
//# sourceMappingURL=chunk-a9469ad8.408ca567.js.map