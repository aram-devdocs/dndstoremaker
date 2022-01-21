import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { setCookie, getCookie } from './cookieHandler';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

export default async function handlePropEditor(Props) {
  let preview = [];

  for (let i in Props) {
    let prop = Props[i];
    console.log(prop);

    preview.push(
      <div>
        ---------------------------------------------------------------------
      </div>
    );
    // Default to input type values, for special cases enter rules here
    switch (prop) {
      case 'text_editor':
        // SunEditor used here, any WYSIWYG editor tool can be subbed here
        // DOCUMENTATION: https://github.com/mkhstar/suneditor-react/blob/master/README.md
        preview.push(
          <SunEditor
            onChange={handleChange}
            autoFocus={true}
            setOptions={{
              imageGalleryUrl: '/api/image-gallery-url',
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['paragraphStyle', 'blockquote'],
                [
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                ],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                // ['table', 'link', 'image', 'video', 'math'], // You must add the 'katex' library at options to use the 'math' plugin.
                ['imageGallery'], // You must add the "imageGalleryUrl".
                ['fullScreen', 'showBlocks', 'codeView'],
                ['preview', 'print'],
                // ['save', 'template'],
                // '/', Line break
              ],
            }}
          />
        );
        preview.push(<br />);
        break;
      case 'image':
        preview.push(<select id={prop}>{await getList()}</select>);

        preview.push(<br />);
        break;

      case 'text_block':
        preview.push(<label> {prop}: </label>);
        preview.push(<br />);
        break;

      case 'text_input':
        // preview.push(<div>)
        preview.push(<label> {prop} ID: </label>);
        preview.push(<input type="text" id={prop + 'ID'} />);
        preview.push(<br />);
        preview.push(<label> {prop} Class Name: </label>);
        preview.push(<input type="text" id={prop + 'className'} />);
        preview.push(<br />);
        preview.push(<label> {prop} Input Type: </label>);
        preview.push(
          <select id={prop + 'inputType'}>
            ); preview.push(<option value="text">Text</option>) preview.push(
            <option value="number">Number</option>) preview.push(
          </select>
        );

        preview.push(<br />);

        preview.push(<label> {prop} Input Type: </label>);
        preview.push(
          <select id={prop + 'inputType'}>
            ); preview.push(<option value="text">Text</option>) preview.push(
            <option value="number">Number</option>) preview.push(
          </select>
        );

        preview.push(<br />);

        // Calculation Start
        preview.push(<label> {prop} Input Type: </label>);
        preview.push(
          <select id={prop + 'calculationType'}>
            ); preview.push(
            <option value="minor_calculation">Minor Calculation</option>)
            preview.push(
            <option value="major_calculation">Major Calculation</option>)
            preview.push(
          </select>
        );

        preview.push(<br />);
        // Calculation Stop

        // Required Start

        preview.push(<label>Required:</label>);
        preview.push(<input id={prop + 'required'} type="checkbox" />);
        // Required Stop

        preview.push(<label> {prop} Label: </label>);
        preview.push(<textarea cols="40" rows="5" id={prop + 'label'} />);
        preview.push(
          <input
            id="add_input_button"
            onClick={() => {
              addInput(prop);
            }}
            type="button"
            value="Add Input"
          />
        );

        preview.push(<br />);
        {
          /* preview.push(</div>) */
        }

        break;

      default:
        preview.push(<label> {i}: </label>);
        preview.push(<input type={prop} id={prop} />);
        preview.push(<br />);
        break;
    }
  }

  return preview;
}

function addInput(prop) {
  let val = document.getElementById(prop + 'label').value;
  let id = document.getElementById(prop + 'ID').value;
  let className = document.getElementById(prop + 'className').value;
  let inputType = document.getElementById(prop + 'inputType').value;
  let calculationType = document.getElementById(prop + 'calculationType').value;

  // JOSH - The calculation type can be used here to manipulate the input that is provided.

  let input = { id: id, val: val, className: className, inputType: inputType };

  // console.log(input);

  let input_array = getCookie('input');
  console.log(input_array);

  if (input_array == undefined) {
    input_array = [];
  }

  input_array.push(input);

  // console.log(input_array);
  setCookie('input', input_array);

  // ANCHOR - Update input elements_whenever you gather data from new input
  document.getElementById(prop + 'label').value = '';
  document.getElementById(prop + 'ID').value = '';
  document.getElementById(prop + 'className').value = '';
  // document.getElementById(prop + "inputType").value = "";

  // Add preview to element

  let Input_preview = document.createElement('div');
  Input_preview.innerHTML = `
    <div className=${'input ' + className}>
      <label htmlFor=${id}>${val}</label>
      <input type=${inputType} id=${id} />
    </div>

  `;
  // Input_preview = <Input_preview />;
  // console.log(Input_preview);
  document.getElementById('input_container').append(Input_preview);
}

async function getList() {
  let options = [];

  let paths = await fetch('/api/get-imgs');
  paths = await paths.json();
  for (let i in paths.message) {
    options.push(<option value={paths.message[i]}>{paths.message[i]}</option>);
  }
  return options;
}

function handleChange(content) {
  console.log(content); //Get Content Inside Editor
  window.localStorage.setItem('text_editor_contents', content);
}
