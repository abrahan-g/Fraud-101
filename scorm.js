(function(){
  function findAPI(win){let n=0;while(win&&n<10){if(win.API)return win.API;if(win.parent===win)break;win=win.parent;n++}return null}
  const api=findAPI(window)||findAPI(window.opener);
  let initialized=false;
  window.SCORM={
    init(){if(!api)return false;try{initialized=api.LMSInitialize("")==="true";return initialized}catch(e){return false}},
    get(k){if(!initialized)return"";try{return api.LMSGetValue(k)||""}catch(e){return""}},
    set(k,v){if(!initialized)return false;try{return api.LMSSetValue(k,String(v))==="true"}catch(e){return false}},
    save(){if(!initialized)return false;try{return api.LMSCommit("")==="true"}catch(e){return false}},
    complete(){if(!initialized)return;this.set("cmi.core.lesson_status","completed");this.set("cmi.core.score.raw","100");this.save()},
    finish(){if(!initialized)return;try{api.LMSCommit("");api.LMSFinish("");initialized=false}catch(e){}},
    active(){return initialized}
  };
  window.SCORM.init();
  window.addEventListener("beforeunload",()=>window.SCORM.finish());
})();
