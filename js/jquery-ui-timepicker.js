!function(c){function t(){this._curInst=null,this._disabledInputs=[],this._inDialog=this._timepickerShowing=!1,this._dialogClass="ui-timepicker-dialog",this._mainDivId="ui-timepicker-div",this._inlineClass="ui-timepicker-inline",this._currentClass="ui-timepicker-current",this._dayOverClass="ui-timepicker-days-cell-over",this.regional=[],this.regional[""]={hourText:"Hour",minuteText:"Minute",amPmText:["AM","PM"],closeButtonText:"Done",nowButtonText:"Now",deselectButtonText:"Deselect"},this._defaults={showOn:"focus",button:null,showAnim:"fadeIn",showOptions:{},appendText:"",beforeShow:null,onSelect:null,onClose:null,timeSeparator:":",periodSeparator:" ",showPeriod:!1,showPeriodLabels:!0,showLeadingZero:!0,showMinutesLeadingZero:!0,altField:"",defaultTime:"now",myPosition:"left top",atPosition:"left bottom",onHourShow:null,onMinuteShow:null,hours:{starts:0,ends:23},minutes:{starts:0,ends:55,interval:5},rows:4,showHours:!0,showMinutes:!0,optionalMinutes:!1,showCloseButton:!1,showNowButton:!1,showDeselectButton:!1},c.extend(this._defaults,this.regional[""]),this.tpDiv=c('<div id="'+this._mainDivId+'" class="ui-timepicker ui-widget ui-helper-clearfix ui-corner-all " style="display: none"></div>')}function r(e,t){for(var i in c.extend(e,t),t)null!=t[i]&&null!=t[i]||(e[i]=t[i]);return e}c.extend(c.ui,{timepicker:{version:"0.3.1"}});var z=(new Date).getTime();c.extend(t.prototype,{markerClassName:"hasTimepicker",log:function(){},_widgetTimepicker:function(){return this.tpDiv},setDefaults:function(e){return r(this._defaults,e||{}),this},_attachTimepicker:function(a,b){var d=null;for(var e in this._defaults){var f=a.getAttribute("time:"+e);if(f){d=d||{};try{d[e]=eval(f)}catch(t){d[e]=f}}}e=a.nodeName.toLowerCase(),f="div"==e||"span"==e,a.id||(this.uuid+=1,a.id="tp"+this.uuid);var h=this._newInst(c(a),f);h.settings=c.extend({},b||{},d||{}),"input"==e?(this._connectTimepicker(a,h),this._setTimeFromField(h)):f&&this._inlineTimepicker(a,h)},_newInst:function(e,t){return{id:e[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:e,inline:t,tpDiv:t?c('<div class="'+this._inlineClass+' ui-timepicker ui-widget  ui-helper-clearfix"></div>'):this.tpDiv}},_connectTimepicker:function(e,t){var i=c(e);t.append=c([]),t.trigger=c([]),i.hasClass(this.markerClassName)||(this._attachments(i,t),i.addClass(this.markerClassName).keydown(this._doKeyDown).keyup(this._doKeyUp).bind("setData.timepicker",function(e,i,s){t.settings[i]=s}).bind("getData.timepicker",function(e,i){return this._get(t,i)}),c.data(e,"timepicker",t))},_doKeyDown:function(e){var t=c.timepicker._getInst(e.target),i=!0;if(t._keyEvent=!0,c.timepicker._timepickerShowing)switch(e.keyCode){case 9:c.timepicker._hideTimepicker(),i=!1;break;case 13:return c.timepicker._updateSelectedValue(t),c.timepicker._hideTimepicker(),!1;case 27:c.timepicker._hideTimepicker();break;default:i=!1}else 36==e.keyCode&&e.ctrlKey?c.timepicker._showTimepicker(this):i=!1;i&&(e.preventDefault(),e.stopPropagation())},_doKeyUp:function(e){e=c.timepicker._getInst(e.target),c.timepicker._setTimeFromField(e),c.timepicker._updateTimepicker(e)},_attachments:function(e,t){var i=this._get(t,"appendText"),s=this._get(t,"isRTL");t.append&&t.append.remove(),i&&(t.append=c('<span class="'+this._appendClass+'">'+i+"</span>"),e[s?"before":"after"](t.append)),e.unbind("focus.timepicker",this._showTimepicker),e.unbind("click.timepicker",this._adjustZIndex),t.trigger&&t.trigger.remove(),"focus"!=(i=this._get(t,"showOn"))&&"both"!=i||(e.bind("focus.timepicker",this._showTimepicker),e.bind("click.timepicker",this._adjustZIndex)),"button"!=i&&"both"!=i||(i=this._get(t,"button"),c(i).bind("click.timepicker",function(){return c.timepicker._timepickerShowing&&c.timepicker._lastInput==e[0]?c.timepicker._hideTimepicker():t.input.is(":disabled")||c.timepicker._showTimepicker(e[0]),!1}))},_inlineTimepicker:function(e,t){var i=c(e);i.hasClass(this.markerClassName)||(i.addClass(this.markerClassName).append(t.tpDiv).bind("setData.timepicker",function(e,i,s){t.settings[i]=s}).bind("getData.timepicker",function(e,i){return this._get(t,i)}),c.data(e,"timepicker",t),this._setTimeFromField(t),this._updateTimepicker(t),t.tpDiv.show())},_adjustZIndex:function(e){e=e.target||e,c.timepicker._getInst(e).tpDiv.css("zIndex",c.timepicker._getZIndex(e)+1)},_showTimepicker:function(e){if("input"!=(e=e.target||e).nodeName.toLowerCase()&&(e=c("input",e.parentNode)[0]),!c.timepicker._isDisabledTimepicker(e)&&c.timepicker._lastInput!=e){c.timepicker._hideTimepicker();var t=c.timepicker._getInst(e);c.timepicker._curInst&&c.timepicker._curInst!=t&&c.timepicker._curInst.tpDiv.stop(!0,!0);var i=c.timepicker._get(t,"beforeShow");r(t.settings,i?i.apply(e,[e,t]):{}),t.lastVal=null,c.timepicker._lastInput=e,c.timepicker._setTimeFromField(t),c.timepicker._inDialog&&(e.value=""),c.timepicker._pos||(c.timepicker._pos=c.timepicker._findPos(e),c.timepicker._pos[1]+=e.offsetHeight);var s=!1;if(c(e).parents().each(function(){return!(s|="fixed"==c(this).css("position"))}),s&&c.browser.opera&&(c.timepicker._pos[0]-=document.documentElement.scrollLeft,c.timepicker._pos[1]-=document.documentElement.scrollTop),i={left:c.timepicker._pos[0],top:c.timepicker._pos[1]},c.timepicker._pos=null,t.tpDiv.css({position:"absolute",display:"block",top:"-1000px"}),c.timepicker._updateTimepicker(t),t.inline||"object"!=typeof c.ui.position||(t.tpDiv.position({of:t.input,my:c.timepicker._get(t,"myPosition"),at:c.timepicker._get(t,"atPosition"),collision:"flip"}),i=t.tpDiv.offset(),c.timepicker._pos=[i.top,i.left]),t._hoursClicked=!1,t._minutesClicked=!1,i=c.timepicker._checkOffset(t,i,s),t.tpDiv.css({position:c.timepicker._inDialog&&c.blockUI?"static":s?"fixed":"absolute",display:"none",left:i.left+"px",top:i.top+"px"}),!t.inline){i=c.timepicker._get(t,"showAnim");var n=c.timepicker._get(t,"duration"),a=function(){c.timepicker._timepickerShowing=!0;var e=c.timepicker._getBorders(t.tpDiv);t.tpDiv.find("iframe.ui-timepicker-cover").css({left:-e[0],top:-e[1],width:t.tpDiv.outerWidth(),height:t.tpDiv.outerHeight()})};c.timepicker._adjustZIndex(e),c.effects&&c.effects[i]?t.tpDiv.show(i,c.timepicker._get(t,"showOptions"),n,a):t.tpDiv[i||"show"](i?n:null,a),i&&n||a(),t.input.is(":visible")&&!t.input.is(":disabled")&&t.input.focus(),c.timepicker._curInst=t}}},_getZIndex:function(e){e=c(e);for(var t;e.length&&e[0]!==document;){if(("absolute"===(t=e.css("position"))||"relative"===t||"fixed"===t)&&(t=parseInt(e.css("zIndex"),10),!isNaN(t)&&0!==t))return t;e=e.parent()}},_refreshTimepicker:function(e){(e=this._getInst(e))&&this._updateTimepicker(e)},_updateTimepicker:function(e){e.tpDiv.empty().append(this._generateHTML(e)),this._rebindDialogEvents(e)},_rebindDialogEvents:function(e){var t=c.timepicker._getBorders(e.tpDiv),i=this;e.tpDiv.find("iframe.ui-timepicker-cover").css({left:-t[0],top:-t[1],width:e.tpDiv.outerWidth(),height:e.tpDiv.outerHeight()}).end().find(".ui-timepicker-minute-cell").unbind().bind("click",{fromDoubleClick:!1},c.proxy(c.timepicker.selectMinutes,this)).bind("dblclick",{fromDoubleClick:!0},c.proxy(c.timepicker.selectMinutes,this)).end().find(".ui-timepicker-hour-cell").unbind().bind("click",{fromDoubleClick:!1},c.proxy(c.timepicker.selectHours,this)).bind("dblclick",{fromDoubleClick:!0},c.proxy(c.timepicker.selectHours,this)).end().find(".ui-timepicker td a").unbind().bind("mouseout",function(){c(this).removeClass("ui-state-hover"),-1!=this.className.indexOf("ui-timepicker-prev")&&c(this).removeClass("ui-timepicker-prev-hover"),-1!=this.className.indexOf("ui-timepicker-next")&&c(this).removeClass("ui-timepicker-next-hover")}).bind("mouseover",function(){i._isDisabledTimepicker(e.inline?e.tpDiv.parent()[0]:e.input[0])||(c(this).parents(".ui-timepicker-calendar").find("a").removeClass("ui-state-hover"),c(this).addClass("ui-state-hover"),-1!=this.className.indexOf("ui-timepicker-prev")&&c(this).addClass("ui-timepicker-prev-hover"),-1!=this.className.indexOf("ui-timepicker-next")&&c(this).addClass("ui-timepicker-next-hover"))}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end().find(".ui-timepicker-now").bind("click",function(e){c.timepicker.selectNow(e)}).end().find(".ui-timepicker-deselect").bind("click",function(e){c.timepicker.deselectTime(e)}).end().find(".ui-timepicker-close").bind("click",function(){c.timepicker._hideTimepicker()}).end()},_generateHTML:function(e){var t,i,s,n,r=1==this._get(e,"showPeriod"),a=1==this._get(e,"showPeriodLabels"),o=1==this._get(e,"showLeadingZero");i=1==this._get(e,"showHours");var u=1==this._get(e,"showMinutes"),p=this._get(e,"amPmText"),l=this._get(e,"rows"),d=0,h=0,m=n=0,k=0,_=0,f=Array(),g=this._get(e,"hours");t=null;var v=0;s=this._get(e,"hourText");var b=this._get(e,"showCloseButton"),w=this._get(e,"closeButtonText"),T=this._get(e,"showNowButton"),C=this._get(e,"nowButtonText"),D=this._get(e,"showDeselectButton"),I=this._get(e,"deselectButtonText"),y=b||T||D;for(t=g.starts;t<=g.ends;t++)f.push(t);if(t=Math.ceil(f.length/l),a){for(v=0;v<f.length;v++)f[v]<12?n++:m++;v=0,l!=(d=Math.floor(n/f.length*l))+(h=Math.floor(m/f.length*l))&&(n&&(!m||!d||h&&n/d>=m/h)?d++:h++),k=Math.min(d,1),_=d+1,t=Math.ceil(Math.max(n/d,m/h))}if(n='<table class="ui-timepicker-table ui-widget-content ui-corner-all"><tr>',i){for(n+='<td class="ui-timepicker-hours"><div class="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">'+s+'</div><table class="ui-timepicker">',i=1;i<=l;i++){for(n+="<tr>",i==k&&a&&(n+='<th rowspan="'+d.toString()+'" class="periods" scope="row">'+p[0]+"</th>"),i==_&&a&&(n+='<th rowspan="'+h.toString()+'" class="periods" scope="row">'+p[1]+"</th>"),s=1;s<=t;s++)a&&i<_&&f[v]>=12?n+=this._generateHTMLHourCell(e,void 0,r,o):(n+=this._generateHTMLHourCell(e,f[v],r,o),v++);n+="</tr>"}n+="</tr></table></td>"}return u&&(n+='<td class="ui-timepicker-minutes">',n+=this._generateHTMLMinutes(e),n+="</td>"),n+="</tr>",y&&(r='<tr><td colspan="3"><div class="ui-timepicker-buttonpane ui-widget-content">',T&&(r+='<button type="button" class="ui-timepicker-now ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" >'+C+"</button>"),D&&(r+='<button type="button" class="ui-timepicker-deselect ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" >'+I+"</button>"),b&&(r+='<button type="button" class="ui-timepicker-close ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" >'+w+"</button>"),n+=r+"</div></td></tr>"),n+="</table>",n+=c.browser.msie&&parseInt(c.browser.version,10)<7&&!e.inline?'<iframe src="javascript:false;" class="ui-timepicker-cover" frameborder="0"></iframe>':""},_updateMinuteDisplay:function(e){var t=this._generateHTMLMinutes(e);e.tpDiv.find("td.ui-timepicker-minutes").html(t),this._rebindDialogEvents(e)},_generateHTMLMinutes:function(e){var t,i,s="",n=this._get(e,"rows"),r=Array();i=this._get(e,"minutes");var c,a=0,o=1==this._get(e,"showMinutesLeadingZero"),u=this._get(e,"onMinuteShow"),p=this._get(e,"minuteText");for(i.starts||(i.starts=0),i.ends||(i.ends=59),t=i.starts;t<=i.ends;t+=i.interval)r.push(t);if(c=Math.round(r.length/n+.49),u&&0==u.apply(e.input?e.input[0]:null,[e.hours,e.minutes]))for(a=0;a<r.length;a+=1)if(t=r[a],u.apply(e.input?e.input[0]:null,[e.hours,t])){e.minutes=t;break}for(s+='<div class="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">'+p+'</div><table class="ui-timepicker">',a=0,i=1;i<=n;i++){for(s+="<tr>";a<i*c;)u="",void 0!==(t=r[a])&&(u=t<10&&o?"0"+t.toString():t.toString()),s+=this._generateHTMLMinuteCell(e,t,u),a++;s+="</tr>"}return s+="</table>"},_generateHTMLHourCell:function(e,t,i,s){var n=t;return t>12&&i&&(n=t-12),0==n&&i&&(n=12),n<10&&s&&(n="0"+n),i="",i=!0,s=this._get(e,"onHourShow"),null==t?'<td><span class="ui-state-default ui-state-disabled">&nbsp;</span></td>':(s&&(i=s.apply(e.input?e.input[0]:null,[t])),i?'<td class="ui-timepicker-hour-cell" data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" data-hour="'+t.toString()+'"><a class="ui-state-default '+(t==e.hours?"ui-state-active":"")+'">'+n.toString()+"</a></td>":'<td><span class="ui-state-default ui-state-disabled '+(t==e.hours?" ui-state-active ":" ")+'">'+n.toString()+"</span></td>")},_generateHTMLMinuteCell:function(e,t,i){var s="";s=!0;var n=this._get(e,"onMinuteShow");return n&&(s=n.apply(e.input?e.input[0]:null,[e.hours,t])),null==t?'<td><span class="ui-state-default ui-state-disabled">&nbsp;</span></td>':s?'<td class="ui-timepicker-minute-cell" data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" data-minute="'+t.toString()+'" ><a class="ui-state-default '+(t==e.minutes?"ui-state-active":"")+'" >'+i+"</a></td>":'<td><span class="ui-state-default ui-state-disabled" >'+i+"</span></td>"},_destroyTimepicker:function(e){var t=c(e),i=c.data(e,"timepicker");if(t.hasClass(this.markerClassName)){var s=e.nodeName.toLowerCase();c.removeData(e,"timepicker"),"input"==s?(i.append.remove(),i.trigger.remove(),t.removeClass(this.markerClassName).unbind("focus.timepicker",this._showTimepicker).unbind("click.timepicker",this._adjustZIndex)):"div"!=s&&"span"!=s||t.removeClass(this.markerClassName).empty()}},_enableTimepicker:function(e){var t=c(e),i=t.attr("id"),s=c.data(e,"timepicker");if(t.hasClass(this.markerClassName)){var n=e.nodeName.toLowerCase();"input"==n?(e.disabled=!1,e=this._get(s,"button"),c(e).removeClass("ui-state-disabled").disabled=!1,s.trigger.filter("button").each(function(){this.disabled=!1}).end()):"div"!=n&&"span"!=n||((s=t.children("."+this._inlineClass)).children().removeClass("ui-state-disabled"),s.find("button").each(function(){this.disabled=!1})),this._disabledInputs=c.map(this._disabledInputs,function(e){return e==i?null:e})}},_disableTimepicker:function(e){var t=c(e),i=c.data(e,"timepicker");if(t.hasClass(this.markerClassName)){var s=e.nodeName.toLowerCase();"input"==s?(s=this._get(i,"button"),c(s).addClass("ui-state-disabled").disabled=!0,e.disabled=!0,i.trigger.filter("button").each(function(){this.disabled=!0}).end()):"div"!=s&&"span"!=s||((i=t.children("."+this._inlineClass)).children().addClass("ui-state-disabled"),i.find("button").each(function(){this.disabled=!0})),this._disabledInputs=c.map(this._disabledInputs,function(t){return t==e?null:t}),this._disabledInputs[this._disabledInputs.length]=t.attr("id")}},_isDisabledTimepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]==e)return!0;return!1},_checkOffset:function(e,t,i){var s=e.tpDiv.outerWidth(),n=e.tpDiv.outerHeight(),r=e.input?e.input.outerWidth():0,a=e.input?e.input.outerHeight():0,o=document.documentElement.clientWidth+c(document).scrollLeft(),u=document.documentElement.clientHeight+c(document).scrollTop();return t.left-=this._get(e,"isRTL")?s-r:0,t.left-=i&&t.left==e.input.offset().left?c(document).scrollLeft():0,t.top-=i&&t.top==e.input.offset().top+a?c(document).scrollTop():0,t.left-=Math.min(t.left,t.left+s>o&&o>s?Math.abs(t.left+s-o):0),t.top-=Math.min(t.top,t.top+n>u&&u>n?Math.abs(n+a):0),t},_findPos:function(e){for(var t=this._get(this._getInst(e),"isRTL");e&&("hidden"==e.type||1!=e.nodeType);)e=e[t?"previousSibling":"nextSibling"];return[(e=c(e).offset()).left,e.top]},_getBorders:function(e){var t=function(e){return{thin:1,medium:2,thick:3}[e]||e};return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkExternalClick:function(e){c.timepicker._curInst&&(e=c(e.target))[0].id!=c.timepicker._mainDivId&&0==e.parents("#"+c.timepicker._mainDivId).length&&!e.hasClass(c.timepicker.markerClassName)&&!e.hasClass(c.timepicker._triggerClass)&&c.timepicker._timepickerShowing&&(!c.timepicker._inDialog||!c.blockUI)&&c.timepicker._hideTimepicker()},_hideTimepicker:function(e){var t=this._curInst;if(t&&(!e||t==c.data(e,"timepicker"))&&this._timepickerShowing){e=this._get(t,"showAnim");var i=this._get(t,"duration"),s=function(){c.timepicker._tidyDialog(t),this._curInst=null};c.effects&&c.effects[e]?t.tpDiv.hide(e,c.timepicker._get(t,"showOptions"),i,s):t.tpDiv["slideDown"==e?"slideUp":"fadeIn"==e?"fadeOut":"hide"](e?i:null,s),e||s(),this._timepickerShowing=!1,this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),c.blockUI&&(c.unblockUI(),c("body").append(this.tpDiv))),this._inDialog=!1,(e=this._get(t,"onClose"))&&e.apply(t.input?t.input[0]:null,[t.input?t.input.val():"",t])}},_tidyDialog:function(e){e.tpDiv.removeClass(this._dialogClass).unbind(".ui-timepicker")},_getInst:function(e){try{return c.data(e,"timepicker")}catch(e){throw"Missing instance data for this timepicker"}},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setTimeFromField:function(e){if(e.input.val()!=e.lastVal){var t=this._get(e,"defaultTime");if(t="now"==t?this._getCurrentTimeRounded(e):t,0==e.inline&&""!=e.input.val()&&(t=e.input.val()),t instanceof Date)e.hours=t.getHours(),e.minutes=t.getMinutes();else{var i=e.lastVal=t;""==t?(e.hours=-1,e.minutes=-1):(t=this.parseTime(e,i),e.hours=t.hours,e.minutes=t.minutes)}c.timepicker._updateTimepicker(e)}},_optionTimepicker:function(e,t,i){var s=this._getInst(e);if(2==arguments.length&&"string"==typeof t)return"defaults"==t?c.extend({},c.timepicker._defaults):s?"all"==t?c.extend({},s.settings):this._get(s,t):null;var n=t||{};"string"==typeof t&&((n={})[t]=i),s&&(this._curInst==s&&this._hideTimepicker(),r(s.settings,n),this._updateTimepicker(s))},_setTimeTimepicker:function(e,t){(e=this._getInst(e))&&(this._setTime(e,t),this._updateTimepicker(e),this._updateAlternate(e,t))},_setTime:function(e,t,i){var s=e.hours,n=e.minutes;t=this.parseTime(e,t),e.hours=t.hours,e.minutes=t.minutes,s==e.hours&&n==e.minuts||i||e.input.trigger("change"),this._updateTimepicker(e),this._updateSelectedValue(e)},_getCurrentTimeRounded:function(){var e=new Date,t=e.getMinutes();return t=5*Math.round(t/5),e.setMinutes(t),e},parseTime:function(e,t){var i={hours:-1,minutes:-1},s=this._get(e,"timeSeparator"),n=this._get(e,"amPmText"),r=this._get(e,"showHours"),c=this._get(e,"showMinutes"),a=this._get(e,"optionalMinutes");return e=1==this._get(e,"showPeriod"),-1!=(s=t.indexOf(s))?(i.hours=parseInt(t.substr(0,s),10),i.minutes=parseInt(t.substr(s+1),10)):!r||c&&!a?!r&&c&&(i.minutes=parseInt(t,10)):i.hours=parseInt(t,10),r&&(t=t.toUpperCase(),i.hours<12&&e&&-1!=t.indexOf(n[1].toUpperCase())&&(i.hours+=12),12==i.hours&&e&&-1!=t.indexOf(n[0].toUpperCase())&&(i.hours=0)),i},selectNow:function(e){e=c(e.target).attr("data-timepicker-instance-id"),e=this._getInst(c(e)[0]);var t=new Date;e.hours=t.getHours(),e.minutes=t.getMinutes(),this._updateSelectedValue(e),this._updateTimepicker(e),this._hideTimepicker()},deselectTime:function(e){e=c(e.target).attr("data-timepicker-instance-id"),(e=this._getInst(c(e)[0])).hours=-1,e.minutes=-1,this._updateSelectedValue(e),this._hideTimepicker()},selectHours:function(e){var t=c(e.currentTarget),i=t.attr("data-timepicker-instance-id"),s=parseInt(t.attr("data-hour"));e=e.data.fromDoubleClick,i=c(i);var n=this._getInst(i[0]),r=1==this._get(n,"showMinutes");return!c.timepicker._isDisabledTimepicker(i.attr("id"))&&(t.parents(".ui-timepicker-hours:first").find("a").removeClass("ui-state-active"),t.children("a").addClass("ui-state-active"),n.hours=s,this._get(n,"onMinuteShow")&&this._updateMinuteDisplay(n),this._updateSelectedValue(n),n._hoursClicked=!0,(n._minutesClicked||e||0==r)&&c.timepicker._hideTimepicker(),!1)},selectMinutes:function(e){var t=c(e.currentTarget),i=t.attr("data-timepicker-instance-id"),s=parseInt(t.attr("data-minute"));e=e.data.fromDoubleClick,i=c(i);var n=this._getInst(i[0]),r=1==this._get(n,"showHours");return!c.timepicker._isDisabledTimepicker(i.attr("id"))&&(t.parents(".ui-timepicker-minutes:first").find("a").removeClass("ui-state-active"),t.children("a").addClass("ui-state-active"),n.minutes=s,this._updateSelectedValue(n),n._minutesClicked=!0,!(!n._hoursClicked&&!e&&0!=r)&&(c.timepicker._hideTimepicker(),!1))},_updateSelectedValue:function(e){var t=this._getParsedTime(e);e.input&&(e.input.val(t),e.input.trigger("change"));var i=this._get(e,"onSelect");return i&&i.apply(e.input?e.input[0]:null,[t,e]),this._updateAlternate(e,t),t},_getParsedTime:function(e){if(-1==e.hours&&-1==e.minutes)return"";(e.hours<e.hours.starts||e.hours>e.hours.ends)&&(e.hours=0),(e.minutes<e.minutes.starts||e.minutes>e.minutes.ends)&&(e.minutes=0);var t="",i=1==this._get(e,"showPeriod"),s=1==this._get(e,"showLeadingZero"),n=1==this._get(e,"showHours"),r=1==this._get(e,"showMinutes"),c=1==this._get(e,"optionalMinutes"),a=this._get(e,"amPmText"),o=e.hours?e.hours:0,u=e.minutes?e.minutes:0,p=o||0;return o="",i&&(0==e.hours&&(p=12),e.hours<12?t=a[0]:(t=a[1],p>12&&(p-=12))),i=p.toString(),s&&p<10&&(i="0"+i),s=u.toString(),u<10&&(s="0"+s),n&&(o+=i),!n||!r||c&&0==s||(o+=this._get(e,"timeSeparator")),!r||c&&0==s||(o+=s),n&&t.length>0&&(o+=this._get(e,"periodSeparator")+t),o},_updateAlternate:function(e,t){(e=this._get(e,"altField"))&&c(e).each(function(e,i){c(i).val(t)})},_getTimeTimepicker:function(e){return this._getParsedTime(this._getInst(e))},_getHourTimepicker:function(e){return null==(e=this._getInst(e))?-1:e.hours},_getMinuteTimepicker:function(e){return null==(e=this._getInst(e))?-1:e.minutes}}),c.fn.timepicker=function(e){c.timepicker.initialized||(c(document).mousedown(c.timepicker._checkExternalClick).find("body").append(c.timepicker.tpDiv),c.timepicker.initialized=!0);var t=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"getTime"!=e&&"getHour"!=e&&"getMinute"!=e?"option"==e&&2==arguments.length&&"string"==typeof arguments[1]?c.timepicker["_"+e+"Timepicker"].apply(c.timepicker,[this[0]].concat(t)):this.each(function(){"string"==typeof e?c.timepicker["_"+e+"Timepicker"].apply(c.timepicker,[this].concat(t)):c.timepicker._attachTimepicker(this,e)}):c.timepicker["_"+e+"Timepicker"].apply(c.timepicker,[this[0]].concat(t))},c.timepicker=new t,c.timepicker.initialized=!1,c.timepicker.uuid=(new Date).getTime(),c.timepicker.version="0.3.1",window["TP_jQuery_"+z]=c,jQuery.browser={},jQuery.browser.msie=!1,jQuery.browser.version=0,navigator.userAgent.match(/MSIE ([0-9]+)\./)&&(jQuery.browser.msie=!0,jQuery.browser.version=RegExp.$1)}(jQuery);