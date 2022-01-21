import { jsPDF } from 'jspdf';

// DOCUMENTATION

export default async function checkCertificateGeneration() {
  // TODO - Check form_submission table to see if all form submissions are fuffiled
  //

  let req = await fetch('/api/check-certificate-generation');
  let res = await req.json();

  const FORMAT = [12, 8];
  const LEFT_MARGIN = 1;
  const RIGHT_MARGIN = FORMAT[0] - LEFT_MARGIN;

  const MAX_WIDTH = FORMAT[0] - LEFT_MARGIN * 2;

  if (res.status) {
    const doc = new jsPDF({
      // format: 'letter',
      unit: 'in',
      format: FORMAT,
    });

    // TODO - Use documentation on https://artskydj.github.io/jsPDF/docs/jsPDF.html to format.
    // HEADER
    doc.text('Year:', LEFT_MARGIN, 1, {
      maxWidth: MAX_WIDTH,
    });

    doc.text('Units:', RIGHT_MARGIN - 6, 1, {
      maxWidth: MAX_WIDTH,
    });

    doc.text('Certificate of Membership', 3, 2, {
      maxWidth: MAX_WIDTH,
    });

    doc.text(
      'South Platte Water Related Activities Program, Inc.',
      LEFT_MARGIN,
      2.5,
      {
        maxWidth: MAX_WIDTH,
      }
    );
    doc.text(`Class ${res.class.toUpperCase()}`, FORMAT[0] / 2, 2, {
      maxWidth: MAX_WIDTH,
    });

    // BODY
    doc.text(res.body, LEFT_MARGIN, 4, {
      maxWidth: MAX_WIDTH,
    });

    // Save
    doc.save(`class-${res.class}-certificate.pdf`);
  } else {
    console.log(res);
  }
}
