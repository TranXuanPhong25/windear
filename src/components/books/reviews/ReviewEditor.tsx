import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Interweave } from 'interweave';
import "@/assets/quill-override.css"
interface QuillEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      if (!quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow', // or 'bubble'
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'direction': 'rtl' }],
              ['link'],

            ],
          },
          placeholder: 'Start writing your review here...'
        });
      }
      // if(defaultValue){
      //   quillRef.current.root.innerHTML = defaultValue;
      // }

      // Handle changes
      quillRef.current.on(Quill.events.TEXT_CHANGE, () => {
        if (quillRef.current) {
          const html = quillRef.current.root.innerHTML;
          if (onChange) {
            onChange(html);
          }

        }
      });
      quillRef.current.clipboard.addMatcher('img', () => {
        const Delta = Quill.import('delta');
        return new Delta().insert('')
      })
      quillRef.current.clipboard.addMatcher('image', () => {
        const Delta = Quill.import('delta');
        return new Delta().insert('')
      })
      quillRef.current.clipboard.addMatcher('PICTURE', () => {
        const Delta = Quill.import('delta');
        return new Delta().insert('');
      })
      quillRef.current.root.addEventListener('paste', (e) => {
        const clipboardData = e.clipboardData as DataTransfer;
        if (clipboardData && clipboardData.files.length) {
          for (let i = 0; i < clipboardData.files.length; i++) {
            if (clipboardData.files[i].type.startsWith('image/')) {
              e.preventDefault(); // Block image paste
              return;
            }
          }
        }
      });
    }


    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change');
        quillRef.current.root.removeEventListener('paste', () => { });
      }
    };
  }, [value, onChange]);
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);
  return <div ref={editorRef} style={{ minHeight: '150px' }} />;
};

export default function ReviewEditor({ review ,onChange}: { review: string | null,onChange:(html:string)=>void }) {
  const [content, setContent] = useState<string>(review || '');
  const handleChange = (html: string) => {
    setContent(html);
    onChange(html);
  }
  return (
    <div>
      <QuillEditor value={content} onChange={handleChange} />
      <div className="review mb-0 mt-4">
        <h2>Preview:</h2>
        <Interweave content={content} />
      </div>
    </div>
  );
}
