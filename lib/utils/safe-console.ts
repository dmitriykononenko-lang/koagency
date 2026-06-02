// CRITICAL: This file must be imported before anything else in App.tsx
// It patches the console to prevent Figma worker crashes caused by 'readFromStdout' errors
// when logging non-serializable objects or just logging in general.

(function() {
  try {
    // 1. Define the silencer function
    const noop = () => {};
    
    // 2. Create a Proxy handler that traps EVERYTHING
    const handler = {
      get: function(target: any, prop: string) {
        // Return noop for functions
        return noop;
      },
      apply: function(target: any, thisArg: any, argumentsList: any[]) {
        return undefined;
      },
      set: function() { return true; }
    };
    
    // 3. Create the silenced console object
    // We use a Proxy to ensure ANY method called on console returns noop
    // even methods we don't know about.
    const safeConsole = new Proxy({}, handler);
    
    // 4. List of known methods to manually overwrite just in case Proxy isn't supported deeply
    // or if we are patching an existing object
    const methods = [
      'assert', 'clear', 'count', 'countReset', 'debug', 'dir', 'dirxml',
      'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeLog',
      'timeStamp', 'trace', 'warn', 'context'
    ];
    
    // 5. Patch helper
    const patch = (target: any) => {
      if (!target) return;
      
      try {
        // Method 1: Direct replacement (most effective)
        if (target.console) {
           try {
             // @ts-ignore
             target.console = safeConsole;
           } catch (e) {
             // If readonly, we go deeper
           }
        }
        
        // Method 2: DefineProperty
        try {
          Object.defineProperty(target, 'console', {
            value: safeConsole,
            writable: false,
            configurable: false
          });
        } catch (e) {}
        
        // Method 3: Overwrite individual methods on the existing object
        // This is a fallback if the console object itself is frozen/sealed but properties aren't
        if (target.console) {
          methods.forEach(m => {
            try {
              // @ts-ignore
              target.console[m] = noop;
            } catch (e) {}
            
            try {
              Object.defineProperty(target.console, m, {
                value: noop,
                writable: false,
                configurable: false
              });
            } catch (e) {}
          });
        }
      } catch (e) {}
    };
    
    // 6. Apply patches to all global contexts
    if (typeof globalThis !== 'undefined') patch(globalThis);
    if (typeof window !== 'undefined') patch(window);
    if (typeof self !== 'undefined') patch(self);
    
    // 7. Direct global patch
    try {
       // @ts-ignore
       if (typeof console !== 'undefined') {
         // @ts-ignore
         console = safeConsole;
       }
    } catch (e) {}
    
    // 8. Unhandled Rejection Handler
    // Crucial for suppressing "Promise@[native code]" errors
    const prevent = (e: any) => {
      try {
        if (e) {
           if (e.preventDefault) e.preventDefault();
           if (e.stopPropagation) e.stopPropagation();
           if (e.stopImmediatePropagation) e.stopImmediatePropagation();
           return true;
        }
      } catch (err) {}
    };

    if (typeof window !== 'undefined') {
      try {
        window.addEventListener('error', prevent, true);
        window.addEventListener('unhandledrejection', prevent, true);
      } catch (e) {}
      
      // Also try setting on* handlers
      try {
        window.onerror = prevent;
        window.onunhandledrejection = prevent;
      } catch (e) {}
    }
    
    if (typeof self !== 'undefined') {
       try {
         self.addEventListener('error', prevent, true);
         self.addEventListener('unhandledrejection', prevent, true);
         self.onerror = prevent;
         self.onunhandledrejection = prevent;
       } catch (e) {}
    }

  } catch (e) {
    // If patching fails, we can't do much, but we shouldn't crash
  }
})();

export const consolePatched = true;
