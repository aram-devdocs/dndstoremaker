// field: id	creation_time	update_time	slug	type	property	description
// field_saved: id	creation_time	update_time	form_submission_id	field_id	value
// form_submission: 	id	creation_time	update_time	membership_id	status	form_id	user_id	boardmember_id
// form: id	creation_time	update_time	year	name	membership_type_id	assessment_price_per_unit	activation_date	instructions

import {
  addRowToTable,
  selectRowFromTableWithMatch,
  updateRowInTable,
} from '../middleware/database';

export function createFields(fields) {
  /*
  Example fields: [..., {
    slug: id + '_' + formName,
    type: inputType,
    property: id,
    description: #OPTIONAL
  }]

  */

  for (let i in fields) {
    let row = fields[i];
    addRowToTable('field', row);
  }
}

export async function submitForm(form, fields) {
  /*
    Example form: {
    membership_id: membership_id,
    status: "PENDING",
    form_id: form_id,
    user_id: user_id,
    boardmember_id: nulll
  }
  */

  let sql_message = await addRowToTable('formsubmission', form);

  console.log(sql_message.insertId);

  // let successful_submission; // TODO - Verify that submission was successful
  if (sql_message.insertId) {
    // TODO - Create array to pass appropriate date
    submitFields(fields, sql_message.insertId);
  }
  async function submitFields(arr, id) {
    /*
    Example fields: [..., {
    form_submission_id: form_submission_id,
    field_id: field_id ,
    value: field_value,
  }]
  */

    for (let i in arr) {
      let row = arr[i];
      row.form_submission_id = id;
      let field_id = await selectRowFromTableWithMatch(
        'field',
        'slug',
        row.field_id + '_' + row.form_name
      );
      row.field_id = field_id[0].id;
      delete row.form_name;
      let res = await addRowToTable('field_saved', row);
      // console.log(res);
    }
  }
}

export async function updateForm(form, fields) {
  /*
    Example form: {
    membership_id: membership_id,
    status: "PENDING",
    form_id: form_id,
    user_id: user_id,
    boardmember_id: nulll
  }
  */

  let sql_message = await updateRowInTable(
    'formsubmission',
    form.data,
    form.id
  );

  updateFields(fields.data, fields.id_list);

  async function updateFields(arr, ids) {
    /*
    Example fields: [..., {
    form_submission_id: form_submission_id,
    field_id: field_id ,
    value: field_value,
  }]
  */

    for (let i in arr) {
      let row = arr[i];
      let id = ids[i];

      row = {
        value: row.value,
      };

      console.log(row);
      console.log(id);
      let res = await updateRowInTable('field_saved', row, id);
      // res = await res.json();
      // console.log(res);
      // console.log(res);
    }
  }
}

export function getClientForms() {}

export function getAdminForms() {}

export function reviewForm() {}
