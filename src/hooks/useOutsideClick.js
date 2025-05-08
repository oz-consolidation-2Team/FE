import { useEffect } from 'react';

/**
 * @param ref 적용할 DOM
 * @param callback 외부 클릭 시 실행할 함수
 */
export function useOutsideClick(ref, callback) {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}
