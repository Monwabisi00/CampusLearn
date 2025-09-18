class Resource {
  constructor(resourceId, type, filePath, uploadedBy, uploadedAt = new Date()) {
    this.resourceId = resourceId;  
    this.type = type;             
    this.filePath = filePath;      
    this.uploadedBy = uploadedBy; 
    this.uploadedAt = uploadedAt;  
  }

  upload() {
    // Logic for uploading the material
  }

  download() {
    // Logic for downloading the material
  }

  view() {
    // Logic for previewing the content
  }
}

export default Resource;
