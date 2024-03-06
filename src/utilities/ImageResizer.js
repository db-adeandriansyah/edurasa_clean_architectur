export default class ImageResizer {
    constructor(maxWidth, maxHeight, keepOriginalSize = false) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.keepOriginalSize = keepOriginalSize;
    }

    resizeImageToDataURL(file, callback) {
        if (this.keepOriginalSize) {
            this.getFileDataURL(file, callback);
        } else {
            const img = new Image();

            img.onload = () => {
                const { width, height } = this.calculateAspectRatioFit(
                img.width,
                img.height,
                this.maxWidth,
                this.maxHeight
                );

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                this.getCanvasDataURL(canvas, file.type, callback);
            };

            img.src = URL.createObjectURL(file);
        }
    }

    getFileDataURL(file, callback) {
        const reader = new FileReader();
        reader.onload = (event) => {
        callback(file.type, event.target.result);
        };
        reader.readAsDataURL(file);
    }

    getCanvasDataURL(canvas, mimeType, callback) {
        const dataURL = canvas.toDataURL(mimeType);
        callback(mimeType, dataURL);
    }

    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: srcWidth * ratio, height: srcHeight * ratio };
    }
}
  
  
  
/**
    // Gunakan contoh class ImageResizer untuk mengurangi ukuran gambar
  const maxWidth = 800; // Ganti dengan lebar maksimum yang diinginkan
  const maxHeight = 600; // Ganti dengan tinggi maksimum yang diinginkan
  
  // Ganti nilai parameter terakhir menjadi `true` jika Anda ingin mempertahankan ukuran asli gambar
  const imageResizer = new ImageResizer(maxWidth, maxHeight, false);
  
  document.querySelector("input[type='file']").addEventListener("change", (event) => {
    const file = event.target.files[0];
  
    if (file) {
      imageResizer.resizeImageToDataURL(file, (mimeType, dataURL) => {
        console.log("Mime Type:", mimeType);
        console.log("File Content:", dataURL);
      });
    }
  });

 */
