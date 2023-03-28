import {useRef, useEffect} from 'react'

function useCloseToggleMenus() {

    const open_menus = useRef([])
    const el_handler = useRef(null)
    const is_enter = useRef(null)
    const div_ref = useRef(null)

    useEffect(() => {

        // componentDidMount()  
        const handleMouseEnter = e => is_enter.current=true
        const handleMouseLeave = e => is_enter.current=false

       const enableMouseListeners = () => {       
           if (div_ref && div_ref.current) {
                div_ref.current.addEventListener('mouseenter', handleMouseEnter);
                div_ref.current.addEventListener('mouseleave', handleMouseLeave);
           }
       };
       const disableMouseListeners = () => {
            if (div_ref && div_ref.current) {
                div_ref.current.removeEventListener('mouseenter', handleMouseEnter);
                div_ref.current.removeEventListener('mouseleave', handleMouseLeave);
            }
       };
      
       enableMouseListeners();
       return () => {
        
           // componentWillUnmount()
           disableMouseListeners();
       };
   }, []);

    const closeWindows = () =>{
        if(!is_enter.current){
            open_menus.current.forEach(closeMenu)
            open_menus.current = []
            removeEL()   
        }
    }

    function closeMenu(target){
        target.classList.remove("active");
        target.nextElementSibling.style.maxHeight = null
    }

    function removeEL(){
        window.removeEventListener("mousemove", el_handler.current, false)
        el_handler.current = null
    }

    function addEL(){
        window.addEventListener("mousemove", closeWindows, false)
        el_handler.current = closeWindows
    }

    function registerMenu(target){
        if(open_menus.current.includes(target))
            open_menus.current = open_menus.current.filter( t => t !== target)
        else
            open_menus.current.push(target )

        if(open_menus.current.length > 0 && !el_handler.current) addEL()
        if(open_menus.current.length === 0) removeEL()
    }

  return [div_ref, {registerMenu, }]
}

export default useCloseToggleMenus