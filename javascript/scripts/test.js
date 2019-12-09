var pdfUtil = require('pdf-to-text');
var pdf_path = process.cwd() + "/class-files/text/bigAss.pdf";
 

pdfUtil.pdfToText(pdf_path, function(err, data) {
  if (err) throw(err);
  console.log(data); //print all text    
});

pdfUtil.pdfToText(pdf_path);