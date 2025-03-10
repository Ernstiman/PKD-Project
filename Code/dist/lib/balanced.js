import { is_null, length } from './list.js';
export function is_balanced(input) {
    let p_count = 0;
    let s_count = 0;
    let c_count = 0;
    if (is_null(input)) {
        return true;
    }
    else if (length(input) % 2 !== 0) {
        return false;
    }
    else {
    }
}
