export const openFile = (content: string) => {
  try {
    const base64Data = content.includes(",") ? content.split(",")[1] : content;

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");
  } catch (error) {
    console.error("Erro ao abrir o documento:", error);
    alert("Não foi possível visualizar o documento.");
  }
};
