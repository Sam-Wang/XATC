/* global macro chilipeppr $ */
// get external js macro one times and run it


/* ------------Spindle DC Controller Macro ---------------------------------- */
var mspc = window["SpindleControlMacro"];
if(! mspc){
  $.getScript( "http://rawgit.com/xpix/XTC/master/chilipeppr/spindle.js", 
    function( data, textStatus, jqxhr ) {
      console.log( "Load Spindle controller was performed.", data );
      mspc = window["SpindleControlMacro"];
      setSPCParams(mspc);
      mspc.init(); // start macro
    });
}
else {
  setSPCParams(mspc);
}

function setSPCParams(macro){
  // here you can set your Parameters
  macro.serialPortXTC = '/dev/ttyUSB1';
}

/* -----------Automatic Toolchanger Macro ----------------------------------- */
var mxtc = window["myXTCMacro"];
if(! mxtc){
  $.getScript( "http://rawgit.com/xpix/XTC/master/chilipeppr/macro.js", 
    function( data, textStatus, jqxhr ) {
      console.log( "Load XATC macro was performed.", data );
      mxtc = window["myXTCMacro"];
      setXTCParams(mxtc);
      mxtc.init();
    });
}
else {
  setXTCParams(mxtc);
  mxtc.toolinuse = 0;
  console.log('INIT MACRO', mxtc);
}

function setXTCParams(macro){
  // here you can set your Parameters
   macro.serialPortXTC =   "/dev/ttyUSB1";   // XTC Controler
   macro.atcParameters.safetyHeight = 42;
   macro.atcParameters.jitter.z = -5;
   macro.atcParameters.nutZ = -7;
   macro.atcParameters.slow = 30;   // value for minimum rpm

   macro.carousel = {
      enabled: true,
      center:{ x:-206.8, y:73.7, z: -5, r: 53.5},  // center of carousel and radius of the diameter center circle
      servo: { block:123, unblock:84}, // position values are in degress
      torqueDegrees: 50,              // maximum arc degrees to torque collet
   };
   macro.atcMillHolder = [
      // Center Position holder, catch height, tighten val, tighten ms,    deg
      // ---------------|-------------|-------------|-------------|---------|------
      {posX :   53.50,  posY :  0,     posZ: 5,   tourque: 200, time: 100, deg: 360},  // 1. endmill holder
      {posX :       0,  posY : -53.50, posZ: 5,   tourque: 200, time: 100, deg: 270},  // 2, endmill holder
      {posX :  -53.50,  posY :  0,     posZ: 5,   tourque: 200, time: 100, deg: 180},  // 3. endmill holder
      {posX :       0,  posY :  53.50, posZ: 5,   tourque: 200, time: 100, deg: 90},   // 4. endmill holder
   ];

   macro.tls = {
      // Postion for TLS = Tool length sensor
      enabled: false,                       // use tls?
      center:{ x:-100, y:15, z:-10 },       // position of the center from tool length sensor    
   };

}