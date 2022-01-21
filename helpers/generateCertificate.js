import { getCookie } from './cookieHandler';

export default async function generateCertificate() {
  // Check to see if a certificate should be generated
  let user = getCookie('user');
  let forms = await fetch('/api/get-forms');
  let submitted_forms = await fetch('/api/get-submitted-forms', {
    method: 'POST',
    body: JSON.stringify({
      membership_id: user.membership_id,
    }),
  });

  forms = await forms.json();
  submitted_forms = await submitted_forms.json();

  if (forms.length == submitted_forms.length) {
    let paid = true;
    for (let i in submitted_forms) {
      if (submitted_forms[i].status !== 'paid') {
        paid = false;
      }
    }

    if (paid) {
      // id	creation_time	update_time	membership_id	certification_id certification_date

      let req = await fetch('/api/assign-certificate', {
        method: 'POST',
        body: JSON.stringify({
          membership_id: user.membership_id,
          certification_id: user.membership_type_id,
          certifcation_date: new Date().getDate(),
        }),
      });
    }
  }
}
