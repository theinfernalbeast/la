/**
 * Opens and downloads Lubna Akter's authentic Curriculum Vitae PDF in a new tab for instant downloading/viewing
 */
export const downloadCvFile = () => {
  const pdfUrl = '/Lubna_Akter_BPharm_Resume.pdf';
  
  // Try opening in a new tab (bypasses iframe sandbox download restrictions)
  const newWindow = window.open(pdfUrl, '_blank');
  
  if (!newWindow) {
    // Fallback anchor download if popup blocker interferes
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Lubna_Akter_BPharm_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};



