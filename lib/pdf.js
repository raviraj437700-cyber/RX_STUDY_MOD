export async function downloadPDF(id,name){
  const el=document.getElementById(id);if(!el)throw new Error("PDF content not found");
  const html2pdf=(await import("html2pdf.js")).default;
  const source=el.cloneNode(true);
  source.querySelectorAll("[data-pdf-ignore]").forEach(x=>x.remove());
  const wrap=document.createElement("div");
  wrap.style.cssText="position:fixed;left:-100000px;top:0;width:794px;background:#070b19;color:#eef2ff;padding:1px;z-index:-1";
  wrap.appendChild(source);document.body.appendChild(wrap);
  try{
    const worker=html2pdf().set({margin:[10,10,18,10],filename:name+"_Created_by_Ravi.pdf",image:{type:"jpeg",quality:.96},html2canvas:{scale:1.5,useCORS:true,backgroundColor:"#070b19",logging:false},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},pagebreak:{mode:["css","legacy"]}});
    await worker.from(wrap).toPdf();
    const pdf=await worker.get("pdf");
    const pages=pdf.internal.getNumberOfPages(),w=pdf.internal.pageSize.getWidth(),h=pdf.internal.pageSize.getHeight();
    pdf.setPage(pages);pdf.setFont("helvetica","bold");pdf.setFontSize(9);pdf.setTextColor(103,232,249);pdf.text("Created by Ravi",w/2,h-8,{align:"center"});
    pdf.save(name+"_Created_by_Ravi.pdf");
  }finally{wrap.remove()}
}