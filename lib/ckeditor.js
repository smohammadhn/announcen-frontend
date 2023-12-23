import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'

const editorConfiguration = {
  toolbar: ['bold', 'italic', '|', 'bulletedList', 'numberedList', 'alignment', '|', 'undo', 'redo'],
}

function CustomEditor(props) {
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={props.initialData}
      onBlur={(_, editor) => {
        const data = editor.getData()
        if (props.onBlur) props.onBlur(data)
      }}
    />
  )
}

export default CustomEditor

// onChange={(event, editor) => {
//   const data = editor.getData()
//   console.log({ event, editor, data })
// }}
