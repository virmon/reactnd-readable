import { _addComment } from '../utils/api'
import { addComment, incrementComment } from './comments'

export function handleNewPost () {

}

export function handleNewComment (url, comment) {
    return (dispatch) => {
        _addComment(url, comment)
            .then((data) => {
                dispatch(addComment(data))
                dispatch(incrementCount())
            })
            .catch(error => console.error(error))
    }
}