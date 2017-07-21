import { toastr } from 'react-redux-toastr';

export function handleError(type: string, errors: string[]) {
    toastr.error(type, errors.join('. '));
}
