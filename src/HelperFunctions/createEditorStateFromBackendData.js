import {convertStringToJson} from './convertStringToJson';
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';

export var createEditorStateFromBackendData = (inputVal=null) => {
    let inputValJson = typeof inputVal === "string" ? convertStringToJson(inputVal) : inputVal;
    let returnStateVal = '';
    try {
            returnStateVal = EditorState.createWithContent(convertFromRaw(inputValJson)) ;
        }
    catch (err) {
            const plainText = '';
            const content = ContentState.createFromText(plainText);
            returnStateVal = EditorState.createWithContent(content) ;
        }
    return returnStateVal;
}