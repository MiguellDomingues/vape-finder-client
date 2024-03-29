import { useEffect } from 'react'
/*
This hook allows you to detect clicks outside of a specified element. 
Reference: https://usehooks.com/useOnClickOutside/
Note: removed the [ref,handler] dependency arr to address the issue of the ModalLayout component reopening everytime its closed
The ModalLayout is wrapped in a CSSTransition component, so that may be the issue
Removed CSSTransition and tested with and without dependency arr, works in both cases
*/

function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      []
     // [ref, handler]
    );
  }

  export default useOnClickOutside