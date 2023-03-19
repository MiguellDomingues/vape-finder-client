import {useRef} from 'react'

/*
used for CollapsibleMenu component to control a single menu appearing at a time
*/
function useToggleMenu(){

    const open_menu_ref = useRef(null)

    function openMenu(target){
        target.classList.add("active");
        target.nextElementSibling.style.maxHeight = "33%"
        open_menu_ref.current = target
    }

    function closeMenu(target){
        target.classList.remove("active");
        target.nextElementSibling.style.maxHeight = null
        open_menu_ref.current = null
    }

    function toggleMenu(target){
        if(!open_menu_ref.current)openMenu(target)
        else if(target === open_menu_ref.current) closeMenu(target)
        else{
            closeMenu(open_menu_ref.current)
            openMenu(target)
        }
    }

    return [{toggleMenu}]
}

export default useToggleMenu