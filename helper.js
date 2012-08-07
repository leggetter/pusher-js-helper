/*
 * Include the script and set the following attribute on the script for the desired result:
 *
 * - data-log - Assigns a function handler to Pusher.log which outputs all calls to `window.console.log`
 *              and appends the messages to an element with and id of `pusher_debug` or the the end of
 *              the document.body.
 */
( function( window ) {
  
  if( !window['Pusher'] ) {
    return;
  }
  
  var _scriptNameCheck = '/helper.js';

  function log(msg) {
    
    msg = new Date().toUTCString() + ' > ' + msg;

    try {
      if( window.console && window.console.log ) {
        window.console.log( msg );
      }
    }
    catch( e ) { }

    var debugEl = document.getElementById( 'pusher_debug' );
    if( !debugEl ) {
      debugEl = document.createElement( 'div' );
      debugEl.setAttribute( 'id', 'pusher_debug' );
      document.body.appendChild( debugEl );
    }
    
   var el = document.createElement( 'div' );
   el.appendChild( document.createTextNode( msg ) );
   if( debugEl.firstChild ) {
     debugEl.insertBefore( el, debugEl.firstChild );
   }
   else {
     debugEl.appendChild( el );
   }
   
  };

  function _getScript() {
    var scripts = document.getElementsByTagName( 'script' );
    var script, srcAttr, scriptEndIndex;
    for( var i = 0, l = scripts.length; i < l; ++i ) {
      script = scripts[ i ];
      srcAttr = script.getAttribute('src');
      if( srcAttr ) { 
        scriptEndIndex = srcAttr.indexOf( _scriptNameCheck ) + _scriptNameCheck.length;
        if( scriptEndIndex === srcAttr.length  ) {
          return script;
        }
      }
    }
    throw 'the ' + PusherHelper_scriptNameCheck + ' could not be found';
  }
  
  function _hasValue( value ) {
    return ( value !== null && value !== undefined );
  }
  
  var script = _getScript();
  if( _hasValue( script.getAttribute('data-log') ) ) {
    Pusher.log = log;
  }
  
} )( window );