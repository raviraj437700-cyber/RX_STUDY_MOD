export async function downloadPDF(id,name){
  const el=document.getElementById(id);if(!el)return;
  const html2pdf=(await import("html2pdf.js")).default;
  const footer=document.createElement("div");footer.className="pdf-brand";footer.textContent="Created by Ravi";
  el.appendChild(footer);
  await html2pdf().set({margin:10,filename:name+"_Created_by_Ravi.pdf",image:{type:"jpeg",quality:.96},html2canvas:{scale:1.5,useCORS:true,backgroundColor:"#070b19"},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},pagebreak:{mode:["css","legacy"]}}).from(el).save();
  footer.remove();
}