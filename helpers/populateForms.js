import index from '../components/_constructor';
import returnReactElements from './returnReactElement';
export default function populateForms(form_data, func, admin = false) {
  let arr = [];
  for (let i in form_data) {
    let form = form_data[i];

    // console.log(func);
    if (admin) {
      // ANCHOR - BOARD MEMBER
      // FORM RETURN IF USER IS A BOARD MEMBER
      arr.push(
        <tr className="tableSection">
          <td>Test</td>
          <td className="tableSection--spanner" rowSpan="1">
            {form.year}
          </td>
          <td>
            <a
              onClick={async () => {
                window.localStorage.setItem('currentForm', form.name);
                window.localStorage.setItem('currentFormID', form.form_id);
                window.localStorage.setItem(
                  'currentFormSubmissionID',
                  form.submission_id
                );

                // Hide #form Table TODO - Fix with nested components
                document.getElementById('form_table').style.display = 'none';
                document.getElementById('back-button').style.display = 'block';
                document.getElementById('form_main').style.display = 'block';

                // TODO - Only open form if status = due/rejected
                func(returnReactElements(form.instructions));

                // populate fields start

                let req = await fetch('/api/get-field-saved', {
                  method: 'POST',
                  body: form.submission_id,
                });
                let res = await req.json();

                for (let i in res) {
                  document.getElementById(res[i].property).value = res[i].value;
                  document.getElementById(res[i].property).disabled = true;
                }

                // populate fields stop

                // Unhide form status handler
                document.getElementById(
                  'form_status_handler'
                ).style.visibility = 'visible';
              }}
            >
              {form.name}
            </a>
          </td>
          <td>{form.status}</td>
        </tr>
      );
    } else {
      // ANCHOR - CLIENT

      // FORM RETURN IF A USER IS A CLIENT
      arr.push(
        <tr className="tableSection">
          <td className="tableSection--spanner" rowSpan="1">
            {form.year}
          </td>
          <td>
            <a
              className="table_link"
              onClick={async () => {
                window.localStorage.setItem('currentForm', form.name);
                window.localStorage.setItem('currentFormID', form.form_id);
                window.localStorage.setItem('currentFormStatus', form.status);

                document.getElementById('submit-form').style.display = 'none';

                // Hide #form Table TODO - Fix with nested components
                document.getElementById('form_table').style.display = 'none';
                document.getElementById('back-button').style.display = 'block';
                document.getElementById('form_main').style.display = 'block';

                // TODO - Only open form if status = due/rejected

                // API CALL
                let req = await fetch('/api/get-field-saved', {
                  method: 'POST',
                  body: form.submission_id,
                });
                let res = await req.json();

                // Set Form Rejection Messages

                let RejectionMessages = [];

                console.log(form);

                if (form.status == 'rejected') {
                  window.localStorage.setItem(
                    'currentFormSubmissionID',
                    form.submission_id
                  );

                  console.log('test');
                  // 	id	creation_time	update_time	form_submission_id	rejection_message
                  let req = await fetch('/api/get-rejection-messages');
                  let res = await req.json();

                  console.log(res);
                  for (let i in res) {
                    let message = res[i];

                    if (message.form_submission_id == form.submission_id) {
                      RejectionMessages.push(
                        <div className="rejection_message_container">
                          <p>{message.rejection_message}</p>
                          <p>{message.creation_time}</p>
                        </div>
                      );
                    }
                  }
                }

                func([
                  <div id="rejection_message_wrapper">{RejectionMessages}</div>,
                  returnReactElements(form.instructions),
                ]);
                console.log(form);
                let form_id_list = [];
                if (form.status !== 'due') {
                  // populate fields start

                  for (let i in res) {
                    console.log(res[i]);
                    document.getElementById(res[i].property).value =
                      res[i].value;

                    if (form.status == 'rejected') {
                      form_id_list.push(res[i].id);
                      document.getElementById(res[i].property).disabled = false;
                      document.getElementById('submit-form').style.display =
                        'block';
                    } else {
                      document.getElementById(res[i].property).disabled = true;
                    }
                  }

                  window.localStorage.setItem(
                    'form_id_list',
                    JSON.stringify(form_id_list)
                  );

                  // populate fields stop
                } else {
                  let inputs = document.getElementsByTagName('input');
                  inputs = Array.prototype.slice.call(inputs);
                  inputs.shift(); // TODO - remove search bar
                  inputs.pop(); // TODO - Remove submit form button
                  for (let i in inputs) {
                    document.getElementById(inputs[i].id).value = '';
                    document.getElementById(inputs[i].id).disabled = false;
                  }
                  document.getElementById('submit-form').style.display =
                    'block';
                }
              }}
            >
              {form.name}
            </a>
          </td>
          <td>{form.status}</td>
        </tr>
      );
    }
  }

  return arr;
}
